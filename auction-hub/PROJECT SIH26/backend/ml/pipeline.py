"""
End-to-End MPLADS Anomaly Detection Pipeline
Orchestrates data loading, baseline fitting, NLP index creation, unsupervised training,
and dynamic project scoring / real-time proposal analysis.
"""

import os
import json
from typing import List, Dict, Any, Optional

from data_generator import generate_mplads_dataset
from ml.statistical_engine import StatisticalEngine
from ml.nlp_duplicate_detector import NLPDuplicateDetector
from ml.unsupervised_detector import UnsupervisedAnomalyDetector
from ml.risk_scorer import RiskScorerAndXAI

class MPLADSAnomalyPipeline:
    def __init__(self, data_file: str = "mplads_dataset.json"):
        self.data_file = data_file
        self.statistical_engine = StatisticalEngine()
        self.nlp_detector = NLPDuplicateDetector(similarity_threshold=0.68)
        self.unsupervised_detector = UnsupervisedAnomalyDetector(contamination=0.18)
        self.risk_scorer = RiskScorerAndXAI()
        
        self.projects_raw: List[Dict[str, Any]] = []
        self.projects_scored: List[Dict[str, Any]] = []
        self.projects_by_id: Dict[str, Dict[str, Any]] = {}
        self.is_initialized: bool = False

    def initialize(self, num_samples: int = 500, force_regenerate: bool = False):
        """
        Loads or generates dataset, trains baselines, and computes scores for all records.
        """
        if os.path.exists(self.data_file) and not force_regenerate:
            try:
                with open(self.data_file, "r", encoding="utf-8") as f:
                    self.projects_raw = json.load(f)
            except Exception:
                self.projects_raw = generate_mplads_dataset(num_samples=num_samples)
                with open(self.data_file, "w", encoding="utf-8") as f:
                    json.dump(self.projects_raw, f, indent=2)
        else:
            self.projects_raw = generate_mplads_dataset(num_samples=num_samples)
            with open(self.data_file, "w", encoding="utf-8") as f:
                json.dump(self.projects_raw, f, indent=2)

        # 1. Fit Statistical Engine
        self.statistical_engine.fit(self.projects_raw)

        # 2. Fit NLP Semantic Index
        self.nlp_detector.fit(self.projects_raw)

        # 3. Fit Unsupervised Anomaly Detector (precomputing baseline evaluations)
        stat_baselines = []
        for p in self.projects_raw:
            cost_eval = self.statistical_engine.evaluate_cost_anomaly(
                category=p.get("category", ""),
                district=p.get("district", ""),
                amount_lakhs=float(p.get("sanctioned_amount_lakhs", 0.0))
            )
            haz_eval = self.statistical_engine.evaluate_timeline_and_hazard(
                sanctioned_amount=float(p.get("sanctioned_amount_lakhs", 0.0)),
                released_amount=float(p.get("released_amount_lakhs", 0.0)),
                expenditure=float(p.get("expenditure_lakhs", 0.0)),
                physical_progress_pct=float(p.get("physical_progress_pct", 0.0)),
                sanction_date_str=p.get("sanction_date", "2024-01-01"),
                target_completion_str=p.get("target_completion_date", "2024-12-31")
            )
            combined_base = {**cost_eval, **haz_eval}
            stat_baselines.append(combined_base)

        self.unsupervised_detector.fit(self.projects_raw, stat_baselines)

        # 4. Score all projects in the corpus
        self.projects_scored = []
        self.projects_by_id = {}

        for p, base in zip(self.projects_raw, stat_baselines):
            # Evaluate each dimension
            cost_eval = self.statistical_engine.evaluate_cost_anomaly(
                category=p.get("category", ""),
                district=p.get("district", ""),
                amount_lakhs=float(p.get("sanctioned_amount_lakhs", 0.0))
            )
            
            # Ground truth velocity surge simulation or actual count
            vel_count = 6 if p.get("ground_truth_type") == "burst_velocity" else 2
            vel_eval = self.statistical_engine.evaluate_velocity_poisson(
                district=p.get("district", ""),
                sanctions_in_window=vel_count
            )

            haz_eval = self.statistical_engine.evaluate_timeline_and_hazard(
                sanctioned_amount=float(p.get("sanctioned_amount_lakhs", 0.0)),
                released_amount=float(p.get("released_amount_lakhs", 0.0)),
                expenditure=float(p.get("expenditure_lakhs", 0.0)),
                physical_progress_pct=float(p.get("physical_progress_pct", 0.0)),
                sanction_date_str=p.get("sanction_date", "2024-01-01"),
                target_completion_str=p.get("target_completion_date", "2024-12-31")
            )

            dup_eval = self.nlp_detector.find_duplicates(p, top_k=2)
            unsup_eval = self.unsupervised_detector.score_project(p, base)

            risk_eval = self.risk_scorer.compute_risk_and_explanation(
                project=p,
                cost_eval=cost_eval,
                velocity_eval=vel_eval,
                hazard_eval=haz_eval,
                duplicate_eval=dup_eval,
                unsupervised_eval=unsup_eval
            )

            scored_item = {**p, **risk_eval}
            self.projects_scored.append(scored_item)
            self.projects_by_id[p["project_id"]] = scored_item

        self.is_initialized = True
        print(f"[Pipeline] Successfully indexed and scored {len(self.projects_scored)} projects.")

    def analyze_new_proposal(self, proposal: Dict[str, Any]) -> Dict[str, Any]:
        """
        Real-time risk scoring for a new project sanction proposal before financial clearance.
        """
        if not self.is_initialized:
            self.initialize()

        category = proposal.get("category", "Drinking Water & Tubewells")
        district = proposal.get("district", "Varanasi")
        amount_lakhs = float(proposal.get("sanctioned_amount_lakhs", 15.0))
        released_lakhs = float(proposal.get("released_amount_lakhs", 0.0))
        expenditure_lakhs = float(proposal.get("expenditure_lakhs", 0.0))
        progress_pct = float(proposal.get("physical_progress_pct", 0.0))
        s_date = proposal.get("sanction_date", "2026-08-01")
        t_date = proposal.get("target_completion_date", "2026-12-01")

        cost_eval = self.statistical_engine.evaluate_cost_anomaly(category, district, amount_lakhs)
        vel_eval = self.statistical_engine.evaluate_velocity_poisson(district, sanctions_in_window=1)
        haz_eval = self.statistical_engine.evaluate_timeline_and_hazard(
            sanctioned_amount=amount_lakhs,
            released_amount=released_lakhs,
            expenditure=expenditure_lakhs,
            physical_progress_pct=progress_pct,
            sanction_date_str=s_date,
            target_completion_str=t_date
        )

        dup_eval = self.nlp_detector.find_duplicates(proposal, top_k=3)
        combined_base = {**cost_eval, **haz_eval}
        unsup_eval = self.unsupervised_detector.score_project(proposal, combined_base)

        risk_eval = self.risk_scorer.compute_risk_and_explanation(
            project=proposal,
            cost_eval=cost_eval,
            velocity_eval=vel_eval,
            hazard_eval=haz_eval,
            duplicate_eval=dup_eval,
            unsupervised_eval=unsup_eval
        )

        return {
            "proposal": proposal,
            "evaluation": risk_eval
        }
