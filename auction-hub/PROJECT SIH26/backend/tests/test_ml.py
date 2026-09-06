"""
Unit & Integration Tests for MPLADS Anomaly Detection System
Validates:
1. Statistical baseline evaluation on normal vs inflated cost
2. Poisson velocity surge detection
3. NLP duplicate work similarity
4. Isolation Forest & unsupervised outlier scoring
5. Composite fraud risk scoring and XAI attribution
"""

import sys
import os
import unittest

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from data_generator import generate_mplads_dataset
from ml.statistical_engine import StatisticalEngine
from ml.nlp_duplicate_detector import NLPDuplicateDetector
from ml.unsupervised_detector import UnsupervisedAnomalyDetector
from ml.risk_scorer import RiskScorerAndXAI
from ml.pipeline import MPLADSAnomalyPipeline

class TestMPLADSAnomalySystem(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.dataset = generate_mplads_dataset(num_samples=150, anomaly_ratio=0.25, seed=123)
        cls.stat_engine = StatisticalEngine()
        cls.stat_engine.fit(cls.dataset)
        
        cls.nlp_detector = NLPDuplicateDetector(similarity_threshold=0.65)
        cls.nlp_detector.fit(cls.dataset)

    def test_cost_anomaly_detection(self):
        # Test normal cost within drinking water range
        normal_eval = self.stat_engine.evaluate_cost_anomaly(
            category="Drinking Water & Tubewells",
            district="Varanasi",
            amount_lakhs=14.0
        )
        self.assertFalse(normal_eval["is_outlier"])
        self.assertLessEqual(normal_eval["cost_risk_factor"], 0.3)

        # Test heavily inflated cost
        inflated_eval = self.stat_engine.evaluate_cost_anomaly(
            category="Drinking Water & Tubewells",
            district="Varanasi",
            amount_lakhs=85.0
        )
        self.assertTrue(inflated_eval["is_outlier"])
        self.assertGreater(inflated_eval["cost_risk_factor"], 0.7)
        self.assertGreater(inflated_eval["ratio_to_median"], 2.5)

    def test_poisson_velocity(self):
        # Expected count
        normal_vel = self.stat_engine.evaluate_velocity_poisson("Varanasi", sanctions_in_window=2)
        self.assertLess(normal_vel["velocity_risk_factor"], 0.2)

        # Abnormal surge (e.g. 10 approvals in a tight window)
        surge_vel = self.stat_engine.evaluate_velocity_poisson("Varanasi", sanctions_in_window=12)
        self.assertGreater(surge_vel["velocity_risk_factor"], 0.7)
        self.assertLess(surge_vel["poisson_p_value"], 0.01)

    def test_nlp_duplicate_detector(self):
        # Take a real project from dataset
        target_project = self.dataset[0]
        # Query with an exact or paraphrase text
        query_project = {
            "project_id": "TEST-PROJ-999",
            "title": target_project["title"],
            "description": target_project["description"],
            "ward": target_project["ward"],
            "category": target_project["category"],
            "district": target_project["district"],
            "vendor_id": "VEN-DIFFERENT-001"
        }
        res = self.nlp_detector.find_duplicates(query_project, top_k=2)
        self.assertTrue(res["has_duplicate_risk"])
        matched_ids = [m["matched_project_id"] for m in res["matches"]]
        self.assertIn(target_project["project_id"], matched_ids)

    def test_composite_risk_score_bounds_and_xai(self):
        scorer = RiskScorerAndXAI()
        dummy_project = {
            "project_id": "TEST-01",
            "title": "High Risk Construction",
            "district": "Varanasi",
            "sanctioned_amount_lakhs": 90.0,
            "vendor_name": "Test Vendor"
        }
        cost_eval = {"cost_risk_factor": 0.9, "ratio_to_median": 3.5, "benchmark_median_lakhs": 20.0, "amount_lakhs": 90.0, "is_outlier": True}
        vel_eval = {"velocity_risk_factor": 0.8, "ratio_to_expected": 3.0, "poisson_p_value": 0.002}
        haz_eval = {"hazard_risk_factor": 0.85, "disbursed_pct": 95.0, "physical_progress_pct": 10.0, "days_past_deadline": 180, "idle_funds_at_risk_lakhs": 75.0}
        dup_eval = {"duplicate_risk_factor": 0.7, "has_duplicate_risk": True, "matches": [{"composite_confidence_pct": 85.0, "matched_project_id": "MPLADS-1", "matched_vendor": "Other Vendor"}]}
        unsup_eval = {"unsupervised_risk_factor": 0.75, "isolation_anomaly": True, "isolation_score": 0.8, "reconstruction_error": 3.2}

        res = scorer.compute_risk_and_explanation(dummy_project, cost_eval, vel_eval, haz_eval, dup_eval, unsup_eval)
        self.assertGreaterEqual(res["fraud_risk_score"], 80.0)
        self.assertEqual(res["risk_tier"], "Critical")
        self.assertIn("xai_breakdown", res)
        self.assertGreater(len(res["xai_breakdown"]), 2)
        self.assertIn("audit_recommendation", res)

    def test_full_pipeline_initialization(self):
        test_file = "test_mplads_pipeline.json"
        try:
            pipe = MPLADSAnomalyPipeline(data_file=test_file)
            pipe.initialize(num_samples=50, force_regenerate=True)
            self.assertTrue(pipe.is_initialized)
            self.assertEqual(len(pipe.projects_scored), 50)
            
            # Test real-time proposal analysis
            proposal = {
                "title": "Installation of 50 Solar Street Lights at Shivpur Ward 14",
                "category": "Solar Lighting & Green Energy",
                "district": "Varanasi",
                "ward": "Shivpur Ward 14",
                "sanctioned_amount_lakhs": 12.0
            }
            analysis = pipe.analyze_new_proposal(proposal)
            self.assertIn("evaluation", analysis)
            self.assertIn("fraud_risk_score", analysis["evaluation"])
        finally:
            if os.path.exists(test_file):
                os.remove(test_file)

if __name__ == "__main__":
    unittest.main()
