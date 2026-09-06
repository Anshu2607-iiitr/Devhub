"""
Unsupervised Anomaly Detection Engine
Deploys Isolation Forests and Reconstruction Error Modeling (PCA/Autoencoder equivalent)
to identify anomalous spending, procurement, and execution vectors without labeled data.
"""

from typing import List, Dict, Any, Tuple
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import RobustScaler
from sklearn.decomposition import PCA
from collections import defaultdict

class UnsupervisedAnomalyDetector:
    def __init__(self, contamination: float = 0.18):
        self.contamination = contamination
        self.scaler = RobustScaler()
        self.isolation_forest = IsolationForest(
            n_estimators=120,
            contamination=self.contamination,
            random_state=42,
            n_jobs=-1
        )
        self.pca_reconstructor = PCA(n_components=3, random_state=42)
        self.vendor_counts = defaultdict(int)
        self.total_projects = 0
        self.is_fitted = False

    def _extract_feature_vector(self, project: Dict[str, Any], stat_baseline: Dict[str, Any]) -> np.ndarray:
        """
        Extracts engineered numerical features for unsupervised learning.
        """
        cost = float(project.get("sanctioned_amount_lakhs", 0.0))
        released = float(project.get("released_amount_lakhs", 0.0))
        expenditure = float(project.get("expenditure_lakhs", 0.0))
        progress = float(project.get("physical_progress_pct", 0.0))
        
        # Benchmark ratio
        median_cost = stat_baseline.get("benchmark_median_lakhs", 20.0)
        cost_ratio = cost / max(median_cost, 0.1)
        
        # Fund flow metrics
        disbursed_ratio = released / max(cost, 0.1)
        expenditure_ratio = expenditure / max(released, 0.1)
        divergence = max(0.0, (disbursed_ratio * 100.0) - progress)
        
        # Timeline metrics
        days_delayed = stat_baseline.get("days_past_deadline", 0)
        
        # Vendor concentration
        v_id = project.get("vendor_id", "")
        v_share = (self.vendor_counts.get(v_id, 1) / max(self.total_projects, 1)) * 100.0

        return np.array([
            cost_ratio,
            disbursed_ratio,
            expenditure_ratio,
            progress / 100.0,
            divergence / 100.0,
            min(days_delayed, 365) / 100.0,
            v_share
        ], dtype=float)

    def fit(self, dataset: List[Dict[str, Any]], stat_baselines: List[Dict[str, Any]]):
        """
        Trains Isolation Forest and PCA Reconstructor on the project dataset.
        """
        self.total_projects = len(dataset)
        self.vendor_counts.clear()
        for p in dataset:
            self.vendor_counts[p.get("vendor_id", "")] += 1

        feature_matrix = []
        for p, baseline in zip(dataset, stat_baselines):
            feat = self._extract_feature_vector(p, baseline)
            feature_matrix.append(feat)

        X = np.array(feature_matrix)
        X_scaled = self.scaler.fit_transform(X)

        self.isolation_forest.fit(X_scaled)
        self.pca_reconstructor.fit(X_scaled)
        self.is_fitted = True

    def score_project(self, project: Dict[str, Any], stat_baseline: Dict[str, Any]) -> Dict[str, Any]:
        """
        Scores a project using Isolation Forest and Reconstruction Error.
        """
        if not self.is_fitted:
            return {
                "isolation_anomaly": False,
                "isolation_score": 0.0,
                "reconstruction_error": 0.0,
                "unsupervised_risk_factor": 0.0
            }

        feat = self._extract_feature_vector(project, stat_baseline)
        feat_scaled = self.scaler.transform(feat.reshape(1, -1))

        # Isolation Forest decision score (lower is more anomalous)
        raw_score = float(self.isolation_forest.decision_function(feat_scaled)[0])
        # Decision scores typically range from approx -0.3 (highly anomalous) to +0.25 (very normal)
        # We invert and map to [0, 1]
        norm_isolation_risk = float(np.clip((0.15 - raw_score) / 0.35, 0.0, 1.0))
        is_isolated_outlier = bool(self.isolation_forest.predict(feat_scaled)[0] == -1)

        # Reconstruction Error (MSE between scaled features and PCA reconstruction)
        reconstructed = self.pca_reconstructor.inverse_transform(self.pca_reconstructor.transform(feat_scaled))
        recon_error = float(np.mean((feat_scaled - reconstructed) ** 2))
        # Map reconstruction error to [0, 1]
        norm_recon_risk = float(np.clip(recon_error / 5.0, 0.0, 1.0))

        # Ensemble unsupervised score
        unsupervised_risk = float(0.65 * norm_isolation_risk + 0.35 * norm_recon_risk)

        return {
            "isolation_anomaly": is_isolated_outlier,
            "isolation_score": round(norm_isolation_risk, 3),
            "reconstruction_error": round(recon_error, 3),
            "unsupervised_risk_factor": round(unsupervised_risk, 3)
        }
