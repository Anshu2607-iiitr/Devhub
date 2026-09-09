"""
Unit test suite for Advanced Deep Learning, Computer Vision, and Satellite Remote Sensing modules.
"""

import unittest
from backend.ml.deep_segmentation_analyzer import DeepSegmentationAnalyzer
from backend.ml.deep_forensics_detector import DeepForensicsDetector
from backend.ml.spatial_remote_sensing import SpatialRemoteSensingEngine
from backend.ml.multimodal_fusion_engine import MultimodalFusionEngine

class TestAdvancedAI(unittest.TestCase):
    def setUp(self):
        self.segmenter = DeepSegmentationAnalyzer()
        self.forensics = DeepForensicsDetector()
        self.spatial = SpatialRemoteSensingEngine()
        self.fusion = MultimodalFusionEngine()

    def test_road_segmentation_disparity(self):
        meta = {"detected_objects": ["wet_mix_macadam", "compactor_roller"]}
        result = self.segmenter.analyze_scene_segmentation("Road", meta, claimed_pct=80.0)
        self.assertEqual(result["estimated_physical_progress_pct"], 42.0)
        self.assertEqual(result["progress_disparity_pct"], 38.0)
        self.assertTrue(result["has_material_claim_discrepancy"])
        self.assertGreater(len(result["segmented_classes"]), 1)

    def test_building_segmentation(self):
        meta = {"detected_objects": ["brick_masonry", "rcc_columns"]}
        result = self.segmenter.analyze_scene_segmentation("Building", meta, claimed_pct=60.0)
        self.assertEqual(result["estimated_physical_progress_pct"], 58.0)
        self.assertEqual(result["progress_disparity_pct"], 2.0)
        self.assertFalse(result["has_material_claim_discrepancy"])

    def test_deep_forensics_duplicate_match(self):
        meta = {"is_duplicate_test": True}
        result = self.forensics.evaluate_image_forensics(meta, "MPLAD-JH-2026-312")
        self.assertTrue(result["deep_vector_similarity"]["is_duplicate_archive_match"])
        self.assertGreaterEqual(result["composite_forensics_risk_score"], 60.0)

    def test_satellite_remote_sensing_change(self):
        image_gps = {"lat": 23.3441, "lng": 85.3096}
        reg_gps = {"lat": 23.3550, "lng": 85.3200}
        result = self.spatial.evaluate_geospatial_and_satellite(image_gps, reg_gps, "Road", 80.0)
        self.assertTrue(result["satellite_remote_sensing"]["surface_disturbance_confirmed"])
        self.assertGreater(result["spatial_corridor_analysis"]["deviation_distance_meters"], 500)
        self.assertFalse(result["spatial_corridor_analysis"]["is_inside_sanction_corridor"])

    def test_multimodal_fusion_engine(self):
        cv = {"progress_disparity_pct": 38.0}
        forensics = {
            "deep_vector_similarity": {"is_duplicate_archive_match": False},
            "error_level_analysis": {"is_pixel_manipulation_suspected": False}
        }
        spatial_sat = {
            "spatial_corridor_analysis": {"deviation_distance_meters": 1420.0},
            "satellite_remote_sensing": {"satellite_estimated_progress_pct": 42.0}
        }
        result = self.fusion.compute_fused_risk(cv, forensics, spatial_sat, claimed_progress_pct=80.0)
        self.assertGreaterEqual(result["composite_risk_score"], 60.0)
        self.assertIn(result["risk_tier"], ["High", "Critical"])
        self.assertIn("Computer Vision Material Disparity", result["shap_feature_attributions"])

if __name__ == "__main__":
    unittest.main()
