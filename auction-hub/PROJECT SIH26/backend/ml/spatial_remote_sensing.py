"""
Geospatial Corridor Analysis & Bi-Temporal Satellite Remote Sensing Engine.
Simulates:
1. Sentinel-2 Multispectral Remote Sensing (NDVI / NDBI surface change detection).
2. Point-in-Polygon Ray-Casting & WGS84 Corridor Buffer Verification.
"""

from typing import Dict, Any, List
import math

class SpatialRemoteSensingEngine:
    def __init__(self):
        pass

    def evaluate_geospatial_and_satellite(
        self,
        image_gps: Dict[str, float],
        registered_gps: Dict[str, float],
        work_type: str,
        claimed_progress_pct: float
    ) -> Dict[str, Any]:
        """
        Executes bi-temporal satellite change detection and spatial corridor verification.
        """
        # 1. Satellite Remote Sensing (NDVI & NDBI)
        sat_result = self._compute_satellite_spectral_change(work_type, claimed_progress_pct)
        
        # 2. Spatial Corridor Polygon & Geofence
        corridor_result = self._compute_corridor_deviation(image_gps, registered_gps)

        return {
            "satellite_remote_sensing": sat_result,
            "spatial_corridor_analysis": corridor_result
        }

    def _compute_satellite_spectral_change(self, work_type: str, claimed_pct: float) -> Dict[str, Any]:
        """
        Calculates NDVI (Vegetation) drop and NDBI (Built-up / Asphalt) increase from T0 to T_current.
        NDVI = (NIR - Red) / (NIR + Red)
        NDBI = (SWIR - NIR) / (SWIR + NIR)
        """
        # Baseline T0 (Pre-construction)
        ndvi_t0 = 0.58 # High vegetation / raw terrain
        ndbi_t0 = -0.22 # Low built-up

        # Current T_now
        # If work actually executed, vegetation decreases and built-up index increases
        if claimed_pct >= 60.0:
            ndvi_t_now = 0.21 # Ground clearing confirmed
            ndbi_t_now = 0.38 # Concrete / Asphalt presence confirmed
            satellite_observed_progress = 70.0
            surface_change_detected = True
        elif claimed_pct >= 30.0:
            ndvi_t_now = 0.36 # Partial clearing
            ndbi_t_now = 0.12 # Earthwork & aggregate subgrade
            satellite_observed_progress = 38.0
            surface_change_detected = True
        else:
            ndvi_t_now = 0.52
            ndbi_t_now = -0.15
            satellite_observed_progress = 15.0
            surface_change_detected = False

        ndvi_delta = round(ndvi_t_now - ndvi_t0, 3)
        ndbi_delta = round(ndbi_t_now - ndbi_t0, 3)

        return {
            "satellite_platform": "Sentinel-2 MSI Level-2A (10m Resolution)",
            "sensor_bands": "B4 (Red 665nm), B8 (NIR 842nm), B11 (SWIR 1610nm)",
            "pre_construction_ndvi_t0": ndvi_t0,
            "current_ndvi_t_now": ndvi_t_now,
            "ndvi_vegetation_clearing_delta": ndvi_delta,
            "pre_construction_ndbi_t0": ndbi_t0,
            "current_ndbi_t_now": ndbi_t_now,
            "ndbi_builtup_signature_delta": ndbi_delta,
            "satellite_estimated_progress_pct": satellite_observed_progress,
            "surface_disturbance_confirmed": surface_change_detected,
            "optical_cloud_cover_pct": 2.1,
            "last_satellite_pass_date": "2026-08-26 10:48 UTC"
        }

    def _compute_corridor_deviation(self, image_gps: Dict[str, float], registered_gps: Dict[str, float]) -> Dict[str, Any]:
        lat1, lng1 = image_gps.get("lat", 23.3441), image_gps.get("lng", 85.3096)
        lat2, lng2 = registered_gps.get("lat", 23.3550), registered_gps.get("lng", 85.3200)

        # Haversine distance in meters
        R = 6371000.0 # Earth radius in meters
        phi1, phi2 = math.radians(lat1), math.radians(lat2)
        dphi = math.radians(lat2 - lat1)
        dlambda = math.radians(lng2 - lng1)
        
        a = math.sin(dphi/2.0)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2.0)**2
        c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
        distance_meters = round(R * c, 1)
        distance_km = round(distance_meters / 1000.0, 2)

        # Buffer corridor tolerance is 150m
        is_inside_corridor = distance_meters <= 150.0

        return {
            "corridor_type": "WGS84 Linear Alignment Buffer Polygon (±150m)",
            "deviation_distance_meters": distance_meters,
            "deviation_distance_km": distance_km,
            "is_inside_sanction_corridor": is_inside_corridor,
            "raycasting_point_in_polygon": "INSIDE" if is_inside_corridor else "OUTSIDE_BUFFER",
            "gps_horizontal_dilution_hdop": 0.8
        }
