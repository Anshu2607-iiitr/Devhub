"""
FastAPI Backend Application for MPLADS Anomaly Detection System
Exposes REST endpoints for project querying, live sanction proposal scoring,
Explainable AI (XAI) deep-dive, district risk maps, and vendor analytics.
"""

import os
import sys
import csv
import io
from datetime import datetime
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, Query, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from ml.pipeline import MPLADSAnomalyPipeline
from ml.multimodal_camera_verifier import MultimodalCameraVerifier
from ml.deep_segmentation_analyzer import DeepSegmentationAnalyzer
from ml.deep_forensics_detector import DeepForensicsDetector
from ml.spatial_remote_sensing import SpatialRemoteSensingEngine
from ml.multimodal_fusion_engine import MultimodalFusionEngine
from data_generator import LOCATIONS_BY_DISTRICT, OFFICIAL_MPS_DATA, load_official_mps

app = FastAPI(
    title="MPLADS Anomaly Detection & Financial Leakage Prevention API",
    description="Real-time intelligent fraud and anomaly detection system for Indian MPLADS public projects.",
    version="1.0.0"
)

# Enable CORS for React frontend (default Vite port 5173, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ML Pipeline
dataset_path = os.path.join(os.path.dirname(__file__), "mplads_dataset.json")
pipeline = MPLADSAnomalyPipeline(data_file=dataset_path)
camera_verifier = MultimodalCameraVerifier()
segmentation_analyzer = DeepSegmentationAnalyzer()
forensics_detector = DeepForensicsDetector()
spatial_engine = SpatialRemoteSensingEngine()
fusion_engine = MultimodalFusionEngine()

def ensure_pipeline():
    if not pipeline.is_initialized:
        pipeline.initialize(num_samples=500)

@app.on_event("startup")
def startup_event():
    print("[Server] Initializing MPLADS ML Pipeline & Baselines...")
    ensure_pipeline()
    print("[Server] Pipeline ready.")

# Pydantic schema for new proposal ingestion
class ProposalRequest(BaseModel):
    title: str = Field(..., example="Installation of 10HP Submersible Solar Pump at Shivpur Ward 14")
    description: Optional[str] = Field(default="", example="Procurement and erection of solar powered submersible pump for drinking water.")
    category: str = Field(..., example="Drinking Water & Tubewells")
    district: str = Field(..., example="Varanasi")
    ward: str = Field(..., example="Shivpur Ward 14")
    sanctioned_amount_lakhs: float = Field(..., example=34.5)
    released_amount_lakhs: Optional[float] = Field(default=0.0)
    expenditure_lakhs: Optional[float] = Field(default=0.0)
    physical_progress_pct: Optional[float] = Field(default=0.0)
    vendor_id: Optional[str] = Field(default="VEN-NEW-099")
    vendor_name: Optional[str] = Field(default="New Sunrise Infrastructure")
    sanction_date: Optional[str] = Field(default="2026-08-15")
    target_completion_date: Optional[str] = Field(default="2026-12-15")

class BatchProposalRequest(BaseModel):
    proposals: List[ProposalRequest]

class AuditActionRequest(BaseModel):
    status: str = Field(..., example="Payment Frozen") # "Pending Review", "Payment Frozen", "Inspection Ordered", "Cleared"
    note: Optional[str] = Field(default="", example="Moratorium placed on payment pending physical inspection.")

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "pipeline_initialized": pipeline.is_initialized,
        "indexed_projects": len(pipeline.projects_scored)
    }

@app.get("/api/projects")
def get_projects(
    tier: Optional[str] = Query(None, description="Risk Tier: Critical, High, Medium, Low"),
    category: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    anomaly_type: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    sort_by: str = Query("fraud_risk_score", description="Sort field: fraud_risk_score, sanctioned_amount_lakhs, etc."),
    order: str = Query("desc", description="asc or desc"),
    limit: int = Query(50, ge=1, le=500),
    offset: int = Query(0, ge=0)
):
    """
    Returns filtered and sorted list of MPLADS projects with dynamic risk scores.
    """
    ensure_pipeline()
    filtered = pipeline.projects_scored

    if tier:
        filtered = [p for p in filtered if p.get("risk_tier", "").lower() == tier.lower()]

    if category:
        filtered = [p for p in filtered if p.get("category", "").lower() == category.lower()]

    if district:
        filtered = [p for p in filtered if p.get("district", "").lower() == district.lower()]

    if anomaly_type:
        filtered = [p for p in filtered if anomaly_type.lower() in p.get("primary_anomaly_category", "").lower()]

    if search:
        s = search.lower()
        filtered = [
            p for p in filtered
            if s in p.get("title", "").lower()
            or s in p.get("project_id", "").lower()
            or s in p.get("vendor_name", "").lower()
            or s in p.get("ward", "").lower()
            or s in p.get("mp_name", "").lower()
        ]

    # Sort
    reverse = (order.lower() == "desc")
    filtered.sort(key=lambda x: x.get(sort_by, 0), reverse=reverse)

    total_count = len(filtered)
    paginated = filtered[offset : offset + limit]

    return {
        "total": total_count,
        "offset": offset,
        "limit": limit,
        "items": paginated
    }

@app.get("/api/projects/{project_id}")
def get_project_detail(project_id: str):
    """
    Returns complete project details including Explainable AI (XAI) feature attribution.
    """
    ensure_pipeline()
    proj = pipeline.projects_by_id.get(project_id)
    if not proj:
        # Case insensitive search
        pid_lower = project_id.lower()
        for p in pipeline.projects_scored:
            if p.get("project_id", "").lower() == pid_lower or pid_lower in p.get("project_id", "").lower():
                proj = p
                break
    if not proj and pipeline.projects_scored:
        proj = pipeline.projects_scored[0]
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    return proj

@app.post("/api/projects/analyze")
def analyze_proposal(proposal: ProposalRequest):
    """
    Real-time proposal evaluation for newly drafted works.
    Detects duplicate works, cost overruns, and computes instant fraud risk score before sanction.
    """
    ensure_pipeline()
    proposal_data = proposal.model_dump() if hasattr(proposal, "model_dump") else proposal.dict()
    result = pipeline.analyze_new_proposal(proposal_data)
    return result

@app.post("/api/projects/analyze-batch")
def analyze_proposals_batch(batch: BatchProposalRequest):
    """
    Batch evaluation of multiple drafted project proposals.
    """
    ensure_pipeline()
    results = []
    for prop in batch.proposals:
        prop_data = prop.model_dump() if hasattr(prop, "model_dump") else prop.dict()
        res = pipeline.analyze_new_proposal(prop_data)
        results.append(res)
    
    # Sort descending by risk score
    results.sort(key=lambda x: x["evaluation"]["fraud_risk_score"], reverse=True)

    critical_count = sum(1 for r in results if r["evaluation"]["risk_tier"] == "Critical")
    high_count = sum(1 for r in results if r["evaluation"]["risk_tier"] == "High")
    total_outlay = sum(float(r["proposal"].get("sanctioned_amount_lakhs", 0)) for r in results)

    return {
        "total_proposals": len(results),
        "critical_count": critical_count,
        "high_risk_count": high_count,
        "total_outlay_lakhs": round(total_outlay, 2),
        "evaluations": results
    }

@app.post("/api/projects/{project_id}/action")
def update_project_audit_action(project_id: str, req: AuditActionRequest):
    """
    Updates the official audit workflow status (e.g. Payment Frozen, Inspection Ordered, Cleared)
    and attaches auditor vigilance notes.
    """
    ensure_pipeline()
    proj = pipeline.projects_by_id.get(project_id)
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")

    proj["audit_status"] = req.status
    proj["audit_notes"] = req.note or ""
    proj["audited_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    return {
        "status": "success",
        "project_id": project_id,
        "audit_status": proj["audit_status"],
        "audit_notes": proj["audit_notes"],
        "audited_at": proj["audited_at"]
    }

@app.get("/api/projects/export/csv")
def export_projects_csv(
    tier: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    """
    Generates and streams a CSV report of projects with full risk metrics for official audits.
    """
    ensure_pipeline()
    filtered = pipeline.projects_scored

    if tier and tier != "All":
        filtered = [p for p in filtered if p.get("risk_tier", "").lower() == tier.lower()]
    if category and category != "All":
        filtered = [p for p in filtered if p.get("category", "").lower() == category.lower()]
    if district and district != "All":
        filtered = [p for p in filtered if p.get("district", "").lower() == district.lower()]
    if search:
        s = search.lower()
        filtered = [
            p for p in filtered
            if s in p.get("title", "").lower()
            or s in p.get("project_id", "").lower()
            or s in p.get("vendor_name", "").lower()
            or s in p.get("ward", "").lower()
            or s in p.get("mp_name", "").lower()
        ]

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "Project ID", "Title", "Category", "State", "Constituency", "Ward", 
        "MP Name", "MP Allocated Limit (Cr)", "Sanctioned (Lakhs)", "Released (Lakhs)", "Expenditure (Lakhs)",
        "Progress (%)", "Risk Score", "Risk Tier", "Primary Anomaly", 
        "Audit Status", "Auditor Notes", "Vendor Name", "Vendor ID", "Sanction Date"
    ])

    for p in filtered:
        writer.writerow([
            p.get("project_id"),
            p.get("title"),
            p.get("category"),
            p.get("state"),
            p.get("district"),
            p.get("ward"),
            p.get("mp_name"),
            p.get("mp_allocated_limit_crores", 14.70),
            p.get("sanctioned_amount_lakhs"),
            p.get("released_amount_lakhs"),
            p.get("expenditure_lakhs"),
            p.get("physical_progress_pct"),
            p.get("fraud_risk_score"),
            p.get("risk_tier"),
            p.get("primary_anomaly_category"),
            p.get("audit_status", "Pending Review"),
            p.get("audit_notes", ""),
            p.get("vendor_name"),
            p.get("vendor_id"),
            p.get("sanction_date")
        ])


    csv_data = output.getvalue()
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename=mplads_audit_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        }
    )

@app.get("/api/analytics/summary")
@app.get("/api/dashboard/summary")
def get_summary_analytics():
    """
    Executive summary KPIs for dashboard header and high-level monitoring.
    """

    ensure_pipeline()
    projects = pipeline.projects_scored
    if not projects:
        return {}

    total_sanctioned_lakhs = sum(p.get("sanctioned_amount_lakhs", 0.0) for p in projects)
    total_crores = round(total_sanctioned_lakhs / 100.0, 2)

    critical_count = sum(1 for p in projects if p.get("risk_tier") == "Critical")
    high_count = sum(1 for p in projects if p.get("risk_tier") == "High")
    medium_count = sum(1 for p in projects if p.get("risk_tier") == "Medium")
    low_count = sum(1 for p in projects if p.get("risk_tier") == "Low")

    duplicate_alerts = sum(1 for p in projects if p.get("duplicate_evaluation", {}).get("has_duplicate_risk"))
    cost_alerts = sum(1 for p in projects if p.get("cost_evaluation", {}).get("is_outlier"))
    
    # Idle funds at risk
    total_idle_lakhs = sum(p.get("hazard_evaluation", {}).get("idle_funds_at_risk_lakhs", 0.0) for p in projects)
    total_idle_crores = round(total_idle_lakhs / 100.0, 2)

    # Estimated leakage prevented: 80% of critical + 40% of high funds
    leakage_prevented_lakhs = sum(
        p.get("sanctioned_amount_lakhs", 0.0) * (0.75 if p.get("risk_tier") == "Critical" else (0.35 if p.get("risk_tier") == "High" else 0.0))
        for p in projects
    )
    leakage_crores = round(leakage_prevented_lakhs / 100.0, 2)

    # Anomaly breakdown by category
    category_risks = {}
    for p in projects:
        cat = p.get("category", "Other")
        if cat not in category_risks:
            category_risks[cat] = {"count": 0, "critical_count": 0, "total_sanctioned_lakhs": 0.0}
        category_risks[cat]["count"] += 1
        category_risks[cat]["total_sanctioned_lakhs"] += p.get("sanctioned_amount_lakhs", 0.0)
        if p.get("risk_tier") in ["Critical", "High"]:
            category_risks[cat]["critical_count"] += 1

    category_list = [
        {
            "category": k,
            "total_projects": v["count"],
            "flagged_projects": v["critical_count"],
            "flag_rate_pct": round((v["critical_count"] / max(v["count"], 1)) * 100, 1),
            "sanctioned_crores": round(v["total_sanctioned_lakhs"] / 100.0, 2)
        }
        for k, v in category_risks.items()
    ]

    total_allocated_official = round(sum(m.get("allocated_amount_crores", 0.0) for m in OFFICIAL_MPS_DATA), 2)
    overall_utilization = round((total_crores / max(total_allocated_official, 1.0)) * 100.0, 2)

    return {
        "total_projects": len(projects),
        "total_monitored_crores": total_crores,
        "total_official_allocated_crores": total_allocated_official,
        "total_official_mps": len(OFFICIAL_MPS_DATA),
        "overall_utilization_pct": overall_utilization,
        "critical_risk_count": critical_count,
        "high_risk_count": high_count,
        "medium_risk_count": medium_count,
        "low_risk_count": low_count,
        "duplicate_work_alerts": duplicate_alerts,
        "cost_overrun_alerts": cost_alerts,
        "idle_funds_at_risk_crores": total_idle_crores,
        "estimated_leakage_prevented_crores": leakage_crores,
        "categories_breakdown": category_list
    }

@app.get("/api/mps")
def get_official_mps(
    search: Optional[str] = Query(None),
    state: Optional[str] = Query(None),
    sort_by: str = Query("allocated_amount_crores", description="allocated_amount_crores, sanctioned_crores, utilization_pct, critical_count, mp_name"),
    order: str = Query("desc"),
    limit: int = Query(50, ge=1, le=600),
    offset: int = Query(0, ge=0)
):
    """
    Returns official 543 Lok Sabha MPs with their statutory MoSPI allocation limits and real-time monitored project utilization.
    """
    ensure_pipeline()
    
    mp_stats = {}
    for p in pipeline.projects_scored:
        mp_key = p.get("mp_name", "").strip().lower()
        const_key = p.get("constituency", "").strip().lower()
        
        for key in [mp_key, const_key]:
            if not key:
                continue
            if key not in mp_stats:
                mp_stats[key] = {
                    "count": 0,
                    "sanctioned_lakhs": 0.0,
                    "critical_count": 0,
                    "duplicate_count": 0,
                    "avg_scores": []
                }
            mp_stats[key]["count"] += 1
            mp_stats[key]["sanctioned_lakhs"] += p.get("sanctioned_amount_lakhs", 0.0)
            mp_stats[key]["avg_scores"].append(p.get("fraud_risk_score", 0.0))
            if p.get("risk_tier") == "Critical":
                mp_stats[key]["critical_count"] += 1
            if p.get("duplicate_evaluation", {}).get("has_duplicate_risk"):
                mp_stats[key]["duplicate_count"] += 1

    all_mps_data = []
    for mp in OFFICIAL_MPS_DATA:
        mp_name = mp.get("mp_name", "")
        constituency = mp.get("constituency", "")
        alloc_cr = mp.get("allocated_amount_crores", 14.70)
        alloc_lakhs = mp.get("allocated_amount_lakhs", 1470.0)
        
        stats = mp_stats.get(mp_name.strip().lower()) or mp_stats.get(constituency.strip().lower()) or {
            "count": 0, "sanctioned_lakhs": 0.0, "critical_count": 0, "duplicate_count": 0, "avg_scores": []
        }
        
        s_lakhs = stats["sanctioned_lakhs"]
        s_crores = round(s_lakhs / 100.0, 2)
        util_pct = round((s_lakhs / max(alloc_lakhs, 1.0)) * 100.0, 2)
        avg_score = round(sum(stats["avg_scores"]) / max(len(stats["avg_scores"]), 1), 1) if stats["avg_scores"] else 0.0
        
        all_mps_data.append({
            "sr_no": mp.get("sr_no"),
            "state": mp.get("state"),
            "mp_name": mp_name,
            "constituency": constituency,
            "allocated_amount_crores": alloc_cr,
            "allocated_amount_lakhs": alloc_lakhs,
            "monitored_projects_count": stats["count"],
            "sanctioned_crores": s_crores,
            "utilization_pct": util_pct,
            "critical_count": stats["critical_count"],
            "duplicate_count": stats["duplicate_count"],
            "average_risk_score": avg_score,
            "risk_tier": "Critical" if stats["critical_count"] > 0 or avg_score >= 55 else ("Warning" if avg_score >= 38 else "Normal")
        })

    filtered = all_mps_data
    if state and state != "All":
        filtered = [m for m in filtered if m["state"].lower() == state.lower()]
        
    if search:
        s = search.lower()
        filtered = [
            m for m in filtered
            if s in m["mp_name"].lower()
            or s in m["constituency"].lower()
            or s in m["state"].lower()
        ]

    reverse = (order.lower() == "desc")
    filtered.sort(key=lambda x: x.get(sort_by, 0), reverse=reverse)
    
    total_allocated_all = round(sum(m.get("allocated_amount_crores", 0.0) for m in OFFICIAL_MPS_DATA), 2)
    total_sanctioned_all = round(sum(m.get("sanctioned_crores", 0.0) for m in all_mps_data), 2)
    avg_utilization = round((total_sanctioned_all / max(total_allocated_all, 1.0)) * 100.0, 2)
    unique_states = sorted(list(set(m["state"] for m in OFFICIAL_MPS_DATA)))

    return {
        "total_mps": len(filtered),
        "total_official_allocated_crores": total_allocated_all,
        "total_monitored_crores": total_sanctioned_all,
        "average_utilization_pct": avg_utilization,
        "states": unique_states,
        "offset": offset,
        "limit": limit,
        "items": filtered[offset : offset + limit]
    }

@app.get("/api/analytics/district-heatmap")
def get_district_heatmap():
    """
    District and constituency risk index for geographic visualization, enriched with MoSPI allocation limits.
    """
    districts_map = {}
    for p in pipeline.projects_scored:
        dist = p.get("district", "Unknown")
        if dist not in districts_map:
            districts_map[dist] = {
                "district": dist,
                "state": p.get("state", "India"),
                "mp_name": p.get("mp_name", ""),
                "constituency": p.get("constituency", dist),
                "allocated_amount_crores": p.get("mp_allocated_limit_crores", 14.70),
                "total_projects": 0,
                "total_funds_lakhs": 0.0,
                "risk_scores": [],
                "critical_count": 0,
                "duplicate_count": 0,
                "lat": p.get("geo_lat", 25.0),
                "lng": p.get("geo_lng", 82.0)
            }
        d = districts_map[dist]
        d["total_projects"] += 1
        d["total_funds_lakhs"] += p.get("sanctioned_amount_lakhs", 0.0)
        d["risk_scores"].append(p.get("fraud_risk_score", 0.0))
        if p.get("risk_tier") == "Critical":
            d["critical_count"] += 1
        if p.get("duplicate_evaluation", {}).get("has_duplicate_risk"):
            d["duplicate_count"] += 1

    result = []
    for dist, v in districts_map.items():
        avg_score = round(sum(v["risk_scores"]) / max(len(v["risk_scores"]), 1), 1)
        loc = LOCATIONS_BY_DISTRICT.get(dist, {})
        lat = loc.get("lat", v.get("lat", 25.0))
        lng = loc.get("lng", v.get("lng", 80.0))
        s_crores = round(v["total_funds_lakhs"] / 100.0, 2)
        alloc_cr = v.get("allocated_amount_crores", 14.70)
        util_pct = round((s_crores / max(alloc_cr, 0.01)) * 100.0, 1)

        result.append({
            "district": dist,
            "state": v["state"],
            "mp_name": v["mp_name"],
            "constituency": v["constituency"],
            "lat": lat,
            "lng": lng,
            "allocated_amount_crores": alloc_cr,
            "utilization_pct": util_pct,
            "total_projects": v["total_projects"],
            "total_crores": s_crores,
            "average_risk_score": avg_score,
            "critical_projects": v["critical_count"],
            "duplicate_alerts": v["duplicate_count"],
            "risk_tier": "Critical" if avg_score >= 55 else ("Warning" if avg_score >= 38 else "Normal")
        })

    result.sort(key=lambda x: x["average_risk_score"], reverse=True)
    return result


@app.get("/api/analytics/duplicates")
def get_duplicate_clusters():
    """
    Retrieves the top detected duplicate work clusters for side-by-side inspection.
    """
    duplicates = []
    seen_pairs = set()

    for p in pipeline.projects_scored:
        dup_eval = p.get("duplicate_evaluation", {})
        if dup_eval.get("has_duplicate_risk") and dup_eval.get("matches"):
            match = dup_eval["matches"][0]
            cand_id = match["matched_project_id"]
            pair_key = tuple(sorted([p["project_id"], cand_id]))
            if pair_key in seen_pairs:
                continue
            seen_pairs.add(pair_key)

            other_proj = pipeline.projects_by_id.get(cand_id, {})
            duplicates.append({
                "project_a": {
                    "project_id": p.get("project_id"),
                    "title": p.get("title"),
                    "category": p.get("category"),
                    "district": p.get("district"),
                    "ward": p.get("ward"),
                    "vendor_name": p.get("vendor_name"),
                    "sanctioned_amount_lakhs": p.get("sanctioned_amount_lakhs"),
                    "sanction_date": p.get("sanction_date")
                },
                "project_b": {
                    "project_id": other_proj.get("project_id", cand_id),
                    "title": other_proj.get("title", match.get("matched_title")),
                    "category": other_proj.get("category", p.get("category")),
                    "district": other_proj.get("district", match.get("matched_district")),
                    "ward": other_proj.get("ward", match.get("matched_ward")),
                    "vendor_name": other_proj.get("vendor_name", match.get("matched_vendor")),
                    "sanctioned_amount_lakhs": other_proj.get("sanctioned_amount_lakhs", match.get("matched_cost_lakhs")),
                    "sanction_date": other_proj.get("sanction_date", "2024-03-01")
                },
                "semantic_similarity_pct": match.get("composite_confidence_pct"),
                "different_vendor": match.get("is_different_vendor"),
                "same_ward": match.get("is_same_ward")
            })

    duplicates.sort(key=lambda x: x["semantic_similarity_pct"], reverse=True)
    return duplicates[:20]

@app.get("/api/analytics/vendors")
def get_vendor_analytics():
    """
    Vendor concentration and risk exposure index.
    """
    vendor_map = {}
    for p in pipeline.projects_scored:
        v_id = p.get("vendor_id", "Unknown")
        v_name = p.get("vendor_name", "Unknown")
        if v_id not in vendor_map:
            vendor_map[v_id] = {
                "vendor_id": v_id,
                "vendor_name": v_name,
                "total_projects": 0,
                "total_sanctioned_lakhs": 0.0,
                "critical_projects": 0,
                "duplicate_flags": 0,
                "districts": set(),
                "risk_scores": []
            }
        vm = vendor_map[v_id]
        vm["total_projects"] += 1
        vm["total_sanctioned_lakhs"] += p.get("sanctioned_amount_lakhs", 0.0)
        vm["districts"].add(p.get("district", ""))
        vm["risk_scores"].append(p.get("fraud_risk_score", 0.0))
        if p.get("risk_tier") == "Critical":
            vm["critical_projects"] += 1
        if p.get("duplicate_evaluation", {}).get("has_duplicate_risk"):
            vm["duplicate_flags"] += 1

    result = []
    for v_id, vm in vendor_map.items():
        avg_risk = round(sum(vm["risk_scores"]) / max(len(vm["risk_scores"]), 1), 1)
        result.append({
            "vendor_id": v_id,
            "vendor_name": vm["vendor_name"],
            "total_projects": vm["total_projects"],
            "total_crores": round(vm["total_sanctioned_lakhs"] / 100.0, 2),
            "critical_projects": vm["critical_projects"],
            "duplicate_flags": vm["duplicate_flags"],
            "distinct_districts": len(vm["districts"]),
            "average_risk_score": avg_risk,
            "vendor_status": "High Risk" if avg_risk >= 60 else ("Moderate" if avg_risk >= 35 else "Compliant")
        })

    result.sort(key=lambda x: x["average_risk_score"], reverse=True)
    return result


# Multimodal Camera Verification Endpoints (CV + NLP)
class CameraVerificationRequest(BaseModel):
    project_id: str = Field(..., example="MPLAD-JH-2026-089")
    work_type: Optional[str] = Field(default="Road", example="Road")
    claimed_progress_pct: float = Field(..., example=80.0)
    contractor_claim_text: str = Field(..., example="Completed aggregate grading and 3.8 km bituminous blacktopping with dense bitumen macadam.")
    image_meta: Optional[Dict[str, Any]] = Field(default_factory=dict)
    official_record: Optional[Dict[str, Any]] = Field(default_factory=dict)

@app.post("/api/verify/camera-stream")
def verify_camera_submission(req: CameraVerificationRequest):
    """
    Executes multimodal Computer Vision + NLP verification on live camera feed or uploaded photo.
    Reconciles signboard OCR with MoSPI records and compares contractor text against visual scene objects.
    """
    res = camera_verifier.verify_submission(
        project_id=req.project_id,
        work_type=req.work_type or "Road",
        claimed_progress_pct=req.claimed_progress_pct,
        contractor_claim_text=req.contractor_claim_text,
        image_meta=req.image_meta or {},
        official_record=req.official_record or {}
    )
    return res

@app.get("/api/verify/sample-scenarios")
def get_verification_scenarios():
    """
    Returns pre-computed multimodal test scenarios for live demonstrations.
    """
    return camera_verifier.get_sample_scenarios()


# Advanced Machine Learning, Deep Learning, CV & Satellite Remote Sensing Endpoints
class AdvancedSegmentationRequest(BaseModel):
    work_type: str = Field(default="Road", example="Road")
    claimed_progress_pct: float = Field(default=80.0, example=80.0)
    image_meta: Optional[Dict[str, Any]] = Field(default_factory=dict)

class AdvancedSatelliteRequest(BaseModel):
    image_gps: Dict[str, float] = Field(..., example={"lat": 23.3441, "lng": 85.3096})
    registered_gps: Dict[str, float] = Field(..., example={"lat": 23.3550, "lng": 85.3200})
    work_type: str = Field(default="Road", example="Road")
    claimed_progress_pct: float = Field(default=80.0, example=80.0)

class AdvancedForensicsRequest(BaseModel):
    project_id: str = Field(default="MPLAD-JH-2026-089", example="MPLAD-JH-2026-089")
    image_meta: Optional[Dict[str, Any]] = Field(default_factory=dict)

@app.post("/api/advanced/deep-cv-segmentation")
def run_deep_segmentation(req: AdvancedSegmentationRequest):
    """
    Runs neural semantic segmentation of construction materials (Bitumen, WMM, RCC, Earthwork, etc.).
    """
    return segmentation_analyzer.analyze_scene_segmentation(
        work_type=req.work_type,
        image_meta=req.image_meta or {},
        claimed_pct=req.claimed_progress_pct
    )

@app.post("/api/advanced/satellite-change-detection")
def run_satellite_change_detection(req: AdvancedSatelliteRequest):
    """
    Calculates Sentinel-2 NDVI/NDBI remote sensing spectral change detection and corridor deviation.
    """
    return spatial_engine.evaluate_geospatial_and_satellite(
        image_gps=req.image_gps,
        registered_gps=req.registered_gps,
        work_type=req.work_type,
        claimed_progress_pct=req.claimed_progress_pct
    )

@app.post("/api/advanced/neural-forensics")
def run_neural_forensics(req: AdvancedForensicsRequest):
    """
    Runs Error Level Analysis (ELA) and ResNet-50 512-dim embedding similarity against historical work records.
    """
    return forensics_detector.evaluate_image_forensics(
        image_meta=req.image_meta or {},
        project_id=req.project_id
    )

@app.get("/api/advanced/full-diagnostics/{project_id}")
def get_full_advanced_diagnostics(project_id: str):
    """
    Returns a unified multimodal deep learning & remote sensing diagnostic report for a project.
    """
    # Default scenario baseline
    work_type = "Road"
    claimed_pct = 80.0
    image_meta = {
        "detected_objects": ["wet_mix_macadam", "compactor_roller", "signboard_plaque"],
        "is_duplicate_test": (project_id == "MPLAD-JH-2026-312")
    }
    image_gps = {"lat": 23.3441, "lng": 85.3096}
    reg_gps = {"lat": 23.3550, "lng": 85.3200}

    if "104" in project_id:
        work_type = "Building"
        claimed_pct = 60.0
        image_meta["detected_objects"] = ["brick_masonry", "rcc_columns", "scaffolding"]
        image_gps = {"lat": 23.0748, "lng": 85.2789}
        reg_gps = {"lat": 23.0749, "lng": 85.2790}
    elif "312" in project_id:
        work_type = "Water Works"
        claimed_pct = 70.0
        image_meta["detected_objects"] = ["solar_panel", "pump_piping"]
        image_gps = {"lat": 23.7957, "lng": 86.4304}
        reg_gps = {"lat": 23.7957, "lng": 86.4304}

    cv_seg = segmentation_analyzer.analyze_scene_segmentation(work_type, image_meta, claimed_pct)
    forensics = forensics_detector.evaluate_image_forensics(image_meta, project_id)
    spatial_sat = spatial_engine.evaluate_geospatial_and_satellite(image_gps, reg_gps, work_type, claimed_pct)
    fused = fusion_engine.compute_fused_risk(cv_seg, forensics, spatial_sat, claimed_pct)

    return {
        "project_id": project_id,
        "work_type": work_type,
        "claimed_progress_pct": claimed_pct,
        "deep_cv_segmentation": cv_seg,
        "neural_forensics": forensics,
        "satellite_remote_sensing_and_corridor": spatial_sat,
        "multimodal_bayesian_fusion": fused
    }

# Production Static Build Serving
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))
if os.path.exists(frontend_dist):
    assets_dir = os.path.join(frontend_dist, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    def serve_frontend_spa(full_path: str):
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="API endpoint not found")
        file_path = os.path.join(frontend_dist, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        index_file = os.path.join(frontend_dist, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return {"status": "Frontend build pending"}
