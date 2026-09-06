"""
Dynamic Risk Scorer and Explainable AI (XAI) Engine
Combines statistical anomalies, unsupervised isolation scores, NLP duplicate matches,
and execution hazards into an interpretable 0-100 Fraud Risk Score with SHAP-style feature attribution.
"""

from typing import Dict, List, Any

class RiskScorerAndXAI:
    def __init__(self):
        # Weights for risk dimensions
        self.weights = {
            "cost_inflation": 0.28,
            "duplicate_work": 0.26,
            "milestone_hazard": 0.20,
            "unsupervised_outlier": 0.16,
            "velocity_burst": 0.10
        }

    def compute_risk_and_explanation(
        self,
        project: Dict[str, Any],
        cost_eval: Dict[str, Any],
        velocity_eval: Dict[str, Any],
        hazard_eval: Dict[str, Any],
        duplicate_eval: Dict[str, Any],
        unsupervised_eval: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Calculates the 0-100 composite risk score and synthesizes explainability components.
        """
        cost_factor = cost_eval.get("cost_risk_factor", 0.0)
        dup_factor = duplicate_eval.get("duplicate_risk_factor", 0.0)
        hazard_factor = hazard_eval.get("hazard_risk_factor", 0.0)
        unsup_factor = unsupervised_eval.get("unsupervised_risk_factor", 0.0)
        vel_factor = velocity_eval.get("velocity_risk_factor", 0.0)

        # Baseline linear point contributions (out of 100 max)
        c_pts = cost_factor * (self.weights["cost_inflation"] * 100.0)
        d_pts = dup_factor * (self.weights["duplicate_work"] * 100.0)
        h_pts = hazard_factor * (self.weights["milestone_hazard"] * 100.0)
        u_pts = unsup_factor * (self.weights["unsupervised_outlier"] * 100.0)
        v_pts = vel_factor * (self.weights["velocity_burst"] * 100.0)

        raw_score = c_pts + d_pts + h_pts + u_pts + v_pts

        # Multi-flag synergy booster (e.g. Duplicate + Inflated Cost or High Funds + Stalled works)
        synergy_boost = 0.0
        if dup_factor > 0.5 and cost_factor > 0.5:
            synergy_boost += 15.0 # Suspected collusive duplicate with inflated bill
        if hazard_factor > 0.6 and unsup_factor > 0.5:
            synergy_boost += 12.0 # Ghost / abandoned project signature
            
        final_score = round(min(100.0, raw_score + synergy_boost), 1)

        # Determine Tier
        if final_score >= 80.0:
            tier = "Critical"
            status_color = "red"
        elif final_score >= 60.0:
            tier = "High"
            status_color = "amber"
        elif final_score >= 35.0:
            tier = "Medium"
            status_color = "yellow"
        else:
            tier = "Low"
            status_color = "emerald"

        # Generate XAI Feature Attribution (SHAP-style)
        shap_explanations = []
        actionable_reasons = []

        # 1. Cost Inflation
        if cost_eval.get("ratio_to_median", 1.0) > 1.25 or cost_eval.get("is_outlier"):
            pts = round(c_pts + (synergy_boost * 0.4 if synergy_boost > 0 else 0), 1)
            ratio = cost_eval.get("ratio_to_median", 1.0)
            median = cost_eval.get("benchmark_median_lakhs", 0)
            cost_actual = cost_eval.get("amount_lakhs", 0)
            shap_explanations.append({
                "feature": "Cost vs Regional Benchmark",
                "impact_points": pts,
                "importance_pct": round(pts / max(final_score, 1.0) * 100, 1),
                "badge": "Cost Anomaly",
                "details": f"Sanction of ₹{cost_actual}L is {round((ratio - 1.0) * 100)}% above category median (₹{median}L) in {project.get('district')}."
            })
            actionable_reasons.append(f"Proposed cost is {round(ratio, 1)}x higher than typical historical projects in this category.")

        # 2. Duplicate Detection
        if duplicate_eval.get("has_duplicate_risk"):
            pts = round(d_pts + (synergy_boost * 0.4 if synergy_boost > 0 else 0), 1)
            top_match = duplicate_eval["matches"][0] if duplicate_eval.get("matches") else {}
            shap_explanations.append({
                "feature": "NLP Duplicate Work Similarity",
                "impact_points": pts,
                "importance_pct": round(pts / max(final_score, 1.0) * 100, 1),
                "badge": "Duplicate Work",
                "details": f"{top_match.get('composite_confidence_pct', 0)}% semantic overlap with Project {top_match.get('matched_project_id')} awarded to {top_match.get('matched_vendor')}."
            })
            vendor_note = "a different vendor" if top_match.get("is_different_vendor") else "the same vendor"
            actionable_reasons.append(f"Semantically identical work detected under {vendor_note} at {top_match.get('matched_ward', 'nearby location')}.")

        # 3. Milestone & Idle Fund Hazard
        if hazard_eval.get("hazard_risk_factor", 0) > 0.3:
            pts = round(h_pts + (synergy_boost * 0.2 if synergy_boost > 0 else 0), 1)
            idle_lakhs = hazard_eval.get("idle_funds_at_risk_lakhs", 0)
            disbursed = hazard_eval.get("disbursed_pct", 0)
            progress = hazard_eval.get("physical_progress_pct", 0)
            days_late = hazard_eval.get("days_past_deadline", 0)
            shap_explanations.append({
                "feature": "Fund Disbursement vs Execution",
                "impact_points": pts,
                "importance_pct": round(pts / max(final_score, 1.0) * 100, 1),
                "badge": "Execution Hazard",
                "details": f"Disbursed {disbursed}% but progress is only {progress}% ({days_late} days past target). ₹{idle_lakhs}L idle funds."
            })
            actionable_reasons.append(f"Disproportionate fund withdrawal ({disbursed}%) relative to physical milestone ({progress}%).")

        # 4. Unsupervised Isolation Outlier
        if unsupervised_eval.get("isolation_anomaly") or unsupervised_eval.get("unsupervised_risk_factor", 0) > 0.35:
            pts = round(u_pts, 1)
            shap_explanations.append({
                "feature": "Unsupervised Multi-Vector Outlier",
                "impact_points": pts,
                "importance_pct": round(pts / max(final_score, 1.0) * 100, 1),
                "badge": "Isolation Forest",
                "details": f"Multivariate outlier score: Isolation Index {unsupervised_eval.get('isolation_score')}, Reconstruction Error {unsupervised_eval.get('reconstruction_error')}."
            })
            actionable_reasons.append("Unsupervised spending vector deviates significantly from the normative procurement manifold.")

        # 5. Poisson Velocity Surge
        if velocity_eval.get("velocity_risk_factor", 0) > 0.25:
            pts = round(v_pts, 1)
            ratio = velocity_eval.get("ratio_to_expected", 1.0)
            shap_explanations.append({
                "feature": "Poisson Sanction Velocity",
                "impact_points": pts,
                "importance_pct": round(pts / max(final_score, 1.0) * 100, 1),
                "badge": "Velocity Surge",
                "details": f"Sanction approval frequency in this window is {ratio}x above expected Poisson baseline (p={velocity_eval.get('poisson_p_value')})."
            })
            actionable_reasons.append("Irregular cluster of project approvals cleared within an abnormally compressed time window.")

        # If project is normal/low risk and no explanations added
        if not shap_explanations:
            shap_explanations.append({
                "feature": "Normative Compliance Baseline",
                "impact_points": round(final_score, 1),
                "importance_pct": 100.0,
                "badge": "Normal",
                "details": "Project parameters comply within 1 standard deviation of category cost and delivery benchmarks."
            })
            actionable_reasons.append("No critical anomalies detected. Routine periodic milestone tracking advised.")

        # Generate Actionable Audit Recommendation
        if tier == "Critical":
            audit_recommendation = "EMERGENCY AUDIT: Place immediate payment moratorium on pending tranches. Commission joint field inspection by District Planning Officer and State Vigilance Cell."
        elif tier == "High":
            audit_recommendation = "HIGH VIGILANCE: Withhold upcoming tranche pending physical verification of geotagged progress photos and cross-verification of vendor equipment."
        elif tier == "Medium":
            audit_recommendation = "SCHEDULED REVIEW: Request revised milestone completion timeline from executing agency within 15 working days."
        else:
            audit_recommendation = "ROUTINE APPROVAL: Normal risk profile. Authorized for standard scheduled disbursement."

        return {
            "fraud_risk_score": final_score,
            "risk_tier": tier,
            "status_color": status_color,
            "primary_anomaly_category": shap_explanations[0]["badge"] if shap_explanations else "Normal",
            "xai_breakdown": shap_explanations,
            "actionable_reasons": actionable_reasons,
            "audit_recommendation": audit_recommendation,
            "cost_evaluation": cost_eval,
            "hazard_evaluation": hazard_eval,
            "duplicate_evaluation": duplicate_eval,
            "unsupervised_evaluation": unsupervised_eval,
            "velocity_evaluation": velocity_eval
        }
