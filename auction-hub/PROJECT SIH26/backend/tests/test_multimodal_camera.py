import unittest
from backend.ml.multimodal_camera_verifier import MultimodalCameraVerifier

class TestMultimodalCameraVerifier(unittest.TestCase):
    def setUp(self):
        self.verifier = MultimodalCameraVerifier()

    def test_sample_scenarios_exist(self):
        scenarios = self.verifier.get_sample_scenarios()
        self.assertEqual(len(scenarios), 3)
        self.assertEqual(scenarios[0]["project_id"], "MPLAD-JH-2026-089")

    def test_road_discrepancy_detection(self):
        scenario = self.verifier.get_sample_scenarios()[0]
        res = self.verifier.verify_submission(
            project_id=scenario["project_id"],
            work_type=scenario["work_type"],
            claimed_progress_pct=scenario["claimed_progress_pct"],
            contractor_claim_text=scenario["contractor_claim_text"],
            image_meta=scenario["image_meta"],
            official_record=scenario["official_record"]
        )
        
        # Assert CV caught 42% visual vs 80% claim
        self.assertEqual(res["computer_vision"]["estimated_visual_progress_pct"], 42.0)
        self.assertTrue(res["computer_vision"]["is_progress_disparity_flagged"])
        
        # Assert Signboard OCR verified MP and Scheme
        self.assertTrue(res["signboard_ocr_nlp"]["signboard_detected"])
        self.assertGreaterEqual(res["signboard_ocr_nlp"]["overall_entity_match_pct"], 66.0)
        
        # Assert NLP flagged semantic disparity (bitumen claimed vs gravel observed)
        self.assertTrue(res["nlp_semantic_grounding"]["has_semantic_disparity"])
        
        # Assert Composite risk is High/Critical
        self.assertGreaterEqual(res["multimodal_verdict"]["composite_risk_score"], 60.0)

    def test_compliant_building_verification(self):
        scenario = self.verifier.get_sample_scenarios()[1]
        res = self.verifier.verify_submission(
            project_id=scenario["project_id"],
            work_type=scenario["work_type"],
            claimed_progress_pct=scenario["claimed_progress_pct"],
            contractor_claim_text=scenario["contractor_claim_text"],
            image_meta=scenario["image_meta"],
            official_record=scenario["official_record"]
        )
        
        # Disparity should not be flagged (58% vs 60%)
        self.assertFalse(res["computer_vision"]["is_progress_disparity_flagged"])
        self.assertFalse(res["nlp_semantic_grounding"]["has_semantic_disparity"])
        self.assertEqual(res["multimodal_verdict"]["risk_tier"], "Low")

    def test_duplicate_image_hash_detection(self):
        scenario = self.verifier.get_sample_scenarios()[2]
        res = self.verifier.verify_submission(
            project_id=scenario["project_id"],
            work_type=scenario["work_type"],
            claimed_progress_pct=scenario["claimed_progress_pct"],
            contractor_claim_text=scenario["contractor_claim_text"],
            image_meta=scenario["image_meta"],
            official_record=scenario["official_record"]
        )
        
        self.assertTrue(res["computer_vision"]["is_duplicate_flagged"])
        self.assertGreaterEqual(res["computer_vision"]["duplicate_risk_pct"], 90.0)
        self.assertGreaterEqual(res["multimodal_verdict"]["composite_risk_score"], 60.0)

if __name__ == '__main__':
    unittest.main()
