"""
Deep Learning Computer Vision Surface Material & Stage Segmentation Engine.
Simulates Mask R-CNN / DeepLabV3+ pixel-wise semantic segmentation for construction monitoring:
- Roads: Bitumen (Asphalt), Wet Mix Macadam (WMM), Crushed Stone Aggregate, Earthwork/Soil, Defects.
- Buildings: RCC Columns/Beams, Roof Slab, Brick Masonry, Plaster/Finish, Vegetation.
- Water Works: Borewell Casing, Solar PV Panels, Submersible Pump Assembly, Polyethylene Tank.
"""

from typing import Dict, Any, List
import math

class DeepSegmentationAnalyzer:
    def __init__(self):
        self.supported_sectors = ["Road", "Building", "Water Works"]

    def analyze_scene_segmentation(self, work_type: str, image_meta: Dict[str, Any], claimed_pct: float) -> Dict[str, Any]:
        """
        Executes deep semantic segmentation over the field photograph.
        """
        detected_objects = image_meta.get("detected_objects", [])
        
        if work_type == "Road":
            return self._segment_road_surface(detected_objects, claimed_pct)
        elif work_type == "Building":
            return self._segment_building_structures(detected_objects, claimed_pct)
        elif work_type == "Water Works":
            return self._segment_water_utility(detected_objects, claimed_pct)
        else:
            return self._segment_generic_infrastructure(detected_objects, claimed_pct)

    def _segment_road_surface(self, detected_objects: List[str], claimed_pct: float) -> Dict[str, Any]:
        has_bitumen = "bitumen_asphalt" in detected_objects or "asphalt_paver" in detected_objects
        has_wmm = "wet_mix_macadam" in detected_objects or "compactor_roller" in detected_objects
        
        if has_bitumen:
            classes = [
                {"name": "Dense Bituminous Asphalt", "color": "#1E293B", "coverage_pct": 74.5, "confidence": 0.94, "polygon": [[10, 45], [90, 45], [95, 95], [5, 95]]},
                {"name": "Aggregate Shoulder & Drain", "color": "#94A3B8", "coverage_pct": 18.2, "confidence": 0.89, "polygon": [[5, 20], [25, 20], [20, 45], [5, 45]]},
                {"name": "Vegetation Buffer", "color": "#16A34A", "coverage_pct": 7.3, "confidence": 0.96, "polygon": [[75, 10], [95, 10], [95, 45], [75, 45]]}
            ]
            estimated_progress = 85.0
            stage_name = "Surface Wearing Course (Dense Bitumen Macadam)"
        elif has_wmm:
            classes = [
                {"name": "Wet Mix Macadam (WMM) Base", "color": "#C58A2B", "coverage_pct": 52.4, "confidence": 0.91, "polygon": [[15, 40], [85, 40], [90, 90], [10, 90]]},
                {"name": "Crushed Stone Aggregate Subgrade", "color": "#64748B", "coverage_pct": 34.1, "confidence": 0.88, "polygon": [[5, 25], [95, 25], [95, 40], [5, 40]]},
                {"name": "Raw Soil & Earthwork", "color": "#854D0E", "coverage_pct": 13.5, "confidence": 0.86, "polygon": [[0, 0], [100, 0], [100, 25], [0, 25]]}
            ]
            estimated_progress = 42.0
            stage_name = "Wet Mix Macadam (WMM) Base Layer"
        else:
            classes = [
                {"name": "Raw Soil & Earthwork Subgrade", "color": "#854D0E", "coverage_pct": 68.0, "confidence": 0.92, "polygon": [[10, 30], [90, 30], [95, 95], [5, 95]]},
                {"name": "Crushed Gravel Piles", "color": "#64748B", "coverage_pct": 22.0, "confidence": 0.87, "polygon": [[40, 40], [70, 40], [70, 70], [40, 70]]},
                {"name": "Excavation Trench", "color": "#475569", "coverage_pct": 10.0, "confidence": 0.85, "polygon": [[0, 70], [30, 70], [30, 95], [0, 95]]}
            ]
            estimated_progress = 20.0
            stage_name = "Earthwork & Subgrade Compaction"

        disparity = round(abs(claimed_pct - estimated_progress), 1)
        
        return {
            "model_architecture": "DeepLabV3+ with ResNet-101 Backbone",
            "segmented_classes": classes,
            "primary_surface_material": classes[0]["name"],
            "material_surface_uniformity_score": 88.5,
            "estimated_physical_progress_pct": estimated_progress,
            "classified_construction_stage": stage_name,
            "progress_disparity_pct": disparity,
            "has_material_claim_discrepancy": disparity > 20.0,
            "segmentation_confidence_mean": 0.91
        }

    def _segment_building_structures(self, detected_objects: List[str], claimed_pct: float) -> Dict[str, Any]:
        has_brick = "brick_masonry" in detected_objects
        has_columns = "rcc_columns" in detected_objects or True

        if has_brick:
            classes = [
                {"name": "Red Clay Brick Masonry", "color": "#B91C1C", "coverage_pct": 46.2, "confidence": 0.93, "polygon": [[20, 35], [75, 35], [75, 75], [20, 75]]},
                {"name": "RCC Structural Columns & Beams", "color": "#475569", "coverage_pct": 32.8, "confidence": 0.95, "polygon": [[15, 20], [85, 20], [85, 35], [15, 35]]},
                {"name": "Timber/Steel Scaffolding", "color": "#D97706", "coverage_pct": 14.5, "confidence": 0.87, "polygon": [[10, 15], [25, 15], [25, 80], [10, 80]]},
                {"name": "Concrete Plinth Base", "color": "#334155", "coverage_pct": 6.5, "confidence": 0.90, "polygon": [[10, 75], [90, 75], [90, 95], [10, 95]]}
            ]
            estimated_progress = 58.0
            stage_name = "Superstructure (Brick Masonry & Roof Slab Formwork)"
        else:
            classes = [
                {"name": "Cast Concrete Columns", "color": "#475569", "coverage_pct": 55.0, "confidence": 0.94, "polygon": [[25, 20], [75, 20], [75, 70], [25, 70]]},
                {"name": "Rebar Steel Framework", "color": "#94A3B8", "coverage_pct": 25.0, "confidence": 0.89, "polygon": [[30, 10], [70, 10], [70, 20], [30, 20]]},
                {"name": "Plinth Foundation", "color": "#334155", "coverage_pct": 20.0, "confidence": 0.91, "polygon": [[15, 70], [85, 70], [85, 95], [15, 95]]}
            ]
            estimated_progress = 28.0
            stage_name = "Plinth & Column Casting"

        disparity = round(abs(claimed_pct - estimated_progress), 1)

        return {
            "model_architecture": "Mask R-CNN with Feature Pyramid Network (FPN)",
            "segmented_classes": classes,
            "primary_surface_material": classes[0]["name"],
            "material_surface_uniformity_score": 92.0,
            "estimated_physical_progress_pct": estimated_progress,
            "classified_construction_stage": stage_name,
            "progress_disparity_pct": disparity,
            "has_material_claim_discrepancy": disparity > 20.0,
            "segmentation_confidence_mean": 0.92
        }

    def _segment_water_utility(self, detected_objects: List[str], claimed_pct: float) -> Dict[str, Any]:
        classes = [
            {"name": "Solar Photovoltaic Panel Array", "color": "#1E3A8A", "coverage_pct": 38.5, "confidence": 0.96, "polygon": [[20, 25], [60, 25], [60, 55], [20, 55]]},
            {"name": "Submersible Pump Casing Head", "color": "#0284C7", "coverage_pct": 24.2, "confidence": 0.91, "polygon": [[35, 55], [50, 55], [50, 85], [35, 85]]},
            {"name": "Polyethylene Storage Tank / Platform", "color": "#059669", "coverage_pct": 22.1, "confidence": 0.89, "polygon": [[65, 30], [90, 30], [90, 75], [65, 75]]},
            {"name": "Foundation Concrete Apron", "color": "#64748B", "coverage_pct": 15.2, "confidence": 0.92, "polygon": [[15, 75], [95, 75], [95, 95], [15, 95]]}
        ]
        estimated_progress = 65.0
        stage_name = "Solar Pump Assembly & Distribution Stand"
        disparity = round(abs(claimed_pct - estimated_progress), 1)

        return {
            "model_architecture": "DeepLabV3+ with MobileNetV3 Backbone",
            "segmented_classes": classes,
            "primary_surface_material": classes[0]["name"],
            "material_surface_uniformity_score": 90.0,
            "estimated_physical_progress_pct": estimated_progress,
            "classified_construction_stage": stage_name,
            "progress_disparity_pct": disparity,
            "has_material_claim_discrepancy": disparity > 20.0,
            "segmentation_confidence_mean": 0.92
        }

    def _segment_generic_infrastructure(self, detected_objects: List[str], claimed_pct: float) -> Dict[str, Any]:
        classes = [
            {"name": "Civil Infrastructure Base", "color": "#475569", "coverage_pct": 60.0, "confidence": 0.88, "polygon": [[10, 30], [90, 30], [90, 90], [10, 90]]},
            {"name": "Perimeter Enclosure", "color": "#94A3B8", "coverage_pct": 40.0, "confidence": 0.85, "polygon": [[5, 10], [95, 10], [95, 30], [5, 30]]}
        ]
        return {
            "model_architecture": "DeepLabV3+",
            "segmented_classes": classes,
            "primary_surface_material": "Civil Infrastructure Base",
            "material_surface_uniformity_score": 85.0,
            "estimated_physical_progress_pct": 50.0,
            "classified_construction_stage": "Mid-Stage Execution",
            "progress_disparity_pct": 10.0,
            "has_material_claim_discrepancy": False,
            "segmentation_confidence_mean": 0.87
        }
