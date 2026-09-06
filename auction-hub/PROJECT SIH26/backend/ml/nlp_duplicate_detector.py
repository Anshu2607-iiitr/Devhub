"""
NLP Duplicate Work Identification Engine
Applies Natural Language Processing (TF-IDF vectorizer + n-gram semantics + cosine distance)
to detect duplicate or split-bill projects filed under different vendors in the same constituency.
"""

from typing import List, Dict, Any, Optional
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class NLPDuplicateDetector:
    def __init__(self, similarity_threshold: float = 0.68):
        self.similarity_threshold = similarity_threshold
        self.vectorizer = TfidfVectorizer(
            ngram_range=(1, 2),
            stop_words="english",
            max_features=5000,
            sublinear_tf=True
        )
        self.corpus_vectors = None
        self.projects_index: List[Dict[str, Any]] = []

    def fit(self, dataset: List[Dict[str, Any]]):
        """
        Builds the semantic inverted vector index from the dataset.
        """
        self.projects_index = dataset
        texts = [self._extract_text(p) for p in dataset]
        if texts:
            self.corpus_vectors = self.vectorizer.fit_transform(texts)

    def _extract_text(self, proj: Dict[str, Any]) -> str:
        title = proj.get("title", "")
        desc = proj.get("description", "")
        ward = proj.get("ward", "")
        category = proj.get("category", "")
        return f"{title} {ward} {category} {desc}".lower()

    def find_duplicates(self, project: Dict[str, Any], top_k: int = 3) -> Dict[str, Any]:
        """
        Queries the vector index to find top semantic duplicate candidates.
        """
        if self.corpus_vectors is None or len(self.projects_index) == 0:
            return {
                "has_duplicate_risk": False,
                "max_similarity": 0.0,
                "duplicate_risk_factor": 0.0,
                "matches": []
            }

        query_text = self._extract_text(project)
        query_vec = self.vectorizer.transform([query_text])
        sims = cosine_similarity(query_vec, self.corpus_vectors)[0]

        proj_id = project.get("project_id", "")
        district = project.get("district", "")
        vendor_id = project.get("vendor_id", "")

        matches = []
        # Sort indices by similarity descending
        sorted_indices = np.argsort(sims)[::-1]

        for idx in sorted_indices:
            candidate = self.projects_index[idx]
            cand_id = candidate.get("project_id", "")
            
            # Skip comparing against self
            if cand_id == proj_id and proj_id != "":
                continue

            sim_score = float(sims[idx])
            if sim_score < 0.35:
                # Early break once similarity drops too low
                break

            same_district = (candidate.get("district") == district)
            different_vendor = (candidate.get("vendor_id") != vendor_id)
            same_ward = (candidate.get("ward") == project.get("ward"))

            # Boost effective duplicate confidence if same location & different contractor
            confidence_boost = 0.0
            if same_district: confidence_boost += 0.08
            if same_ward: confidence_boost += 0.12
            if different_vendor: confidence_boost += 0.05

            composite_similarity = min(1.0, sim_score + confidence_boost)

            if composite_similarity >= self.similarity_threshold:
                matches.append({
                    "matched_project_id": cand_id,
                    "matched_title": candidate.get("title"),
                    "matched_vendor": candidate.get("vendor_name"),
                    "matched_vendor_id": candidate.get("vendor_id"),
                    "matched_district": candidate.get("district"),
                    "matched_ward": candidate.get("ward"),
                    "raw_similarity_pct": round(sim_score * 100, 1),
                    "composite_confidence_pct": round(composite_similarity * 100, 1),
                    "is_different_vendor": different_vendor,
                    "is_same_ward": same_ward,
                    "matched_cost_lakhs": candidate.get("sanctioned_amount_lakhs")
                })
                
                if len(matches) >= top_k:
                    break

        has_duplicate = len(matches) > 0
        top_match_score = (matches[0]["composite_confidence_pct"] / 100.0) if has_duplicate else 0.0

        # Normalized risk factor (0 to 1)
        duplicate_risk_factor = 0.0
        if top_match_score >= self.similarity_threshold:
            duplicate_risk_factor = min(1.0, (top_match_score - self.similarity_threshold) / (1.0 - self.similarity_threshold) * 0.9 + 0.1)

        return {
            "has_duplicate_risk": has_duplicate,
            "max_similarity_pct": round(top_match_score * 100, 1),
            "duplicate_risk_factor": round(float(duplicate_risk_factor), 3),
            "matches": matches
        }
