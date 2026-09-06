"""
Statistical Baseline Engine
Implements:
1. Category & Regional Cost Baselines (Z-score, IQR, Median Inflation Ratios)
2. Poisson Distribution Sanction Velocity Modeler (detects abnormal bursts)
3. Idle Fund Hazard & Milestone Divergence Metrics
"""

import math
from collections import defaultdict
from datetime import datetime
from typing import Dict, List, Any, Tuple
import numpy as np
from scipy import stats

class StatisticalEngine:
    def __init__(self):
        # Maps (category, district) -> baseline stats, with category fallback
        self.category_district_stats: Dict[Tuple[str, str], Dict[str, float]] = {}
        self.category_global_stats: Dict[str, Dict[str, float]] = {}
        
        # Poisson baseline rates (expected sanctions per month per district)
        self.district_poisson_rates: Dict[str, float] = {}
        self.default_poisson_rate: float = 3.0 # Default ~3 sanctions per month per constituency

    def fit(self, dataset: List[Dict[str, Any]]):
        """
        Computes statistical baselines across legitimate / historical projects in the dataset.
        """
        cat_dist_costs = defaultdict(list)
        cat_global_costs = defaultdict(list)
        
        district_monthly_counts = defaultdict(lambda: defaultdict(int))

        for proj in dataset:
            cat = proj.get("category", "General")
            dist = proj.get("district", "Unknown")
            cost = float(proj.get("sanctioned_amount_lakhs", 0.0))
            
            cat_dist_costs[(cat, dist)].append(cost)
            cat_global_costs[cat].append(cost)
            
            # Sanction date month bucket
            s_date = proj.get("sanction_date", "2024-01-01")
            try:
                month_key = s_date[:7] # YYYY-MM
                district_monthly_counts[dist][month_key] += 1
            except Exception:
                pass

        # Calculate category global statistics
        for cat, costs in cat_global_costs.items():
            arr = np.array(costs)
            q25, q75 = np.percentile(arr, [25, 75])
            self.category_global_stats[cat] = {
                "mean": float(np.mean(arr)),
                "median": float(np.median(arr)),
                "std": float(np.std(arr)) if len(arr) > 1 else 1.0,
                "q25": float(q25),
                "q75": float(q75),
                "iqr": float(max(q75 - q25, 0.5)),
                "count": len(arr)
            }

        # Calculate category + district statistics
        for (cat, dist), costs in cat_dist_costs.items():
            arr = np.array(costs)
            q25, q75 = np.percentile(arr, [25, 75])
            self.category_district_stats[(cat, dist)] = {
                "mean": float(np.mean(arr)),
                "median": float(np.median(arr)),
                "std": float(np.std(arr)) if len(arr) > 1 else 1.0,
                "q25": float(q25),
                "q75": float(q75),
                "iqr": float(max(q75 - q25, 0.5)),
                "count": len(arr)
            }

        # Calculate Poisson baseline rate lambda (average sanctions per active month)
        for dist, monthly_dict in district_monthly_counts.items():
            counts = list(monthly_dict.values())
            if counts:
                self.district_poisson_rates[dist] = float(np.mean(counts))
            else:
                self.district_poisson_rates[dist] = self.default_poisson_rate

    def evaluate_cost_anomaly(self, category: str, district: str, amount_lakhs: float) -> Dict[str, Any]:
        """
        Evaluates whether a project's cost is an outlier compared to regional & category benchmarks.
        """
        # Retrieve baseline: prefer (category, district), fallback to category global
        stats_obj = self.category_district_stats.get((category, district))
        if not stats_obj or stats_obj["count"] < 3:
            stats_obj = self.category_global_stats.get(category, {
                "mean": 20.0, "median": 18.0, "std": 8.0, "iqr": 10.0, "q75": 25.0
            })

        mean = stats_obj["mean"]
        median = stats_obj["median"]
        std = max(stats_obj["std"], 1.0)
        q75 = stats_obj.get("q75", median * 1.3)
        iqr = stats_obj.get("iqr", 5.0)

        # Z-Score
        z_score = (amount_lakhs - mean) / std
        
        # Inflation ratio relative to median
        ratio_to_median = amount_lakhs / max(median, 0.1)
        
        # IQR Upper threshold: Q3 + 1.5*IQR
        upper_whisker = q75 + 1.5 * iqr
        is_iqr_outlier = amount_lakhs > upper_whisker

        # Normalized risk contribution (0 to 1)
        # Ratio 1.0 -> 0 risk; Ratio >= 2.5 -> max risk
        if ratio_to_median <= 1.2:
            cost_risk = 0.0
        elif ratio_to_median <= 1.8:
            cost_risk = (ratio_to_median - 1.2) / 0.6 * 0.4
        elif ratio_to_median <= 2.5:
            cost_risk = 0.4 + (ratio_to_median - 1.8) / 0.7 * 0.4
        else:
            cost_risk = min(1.0, 0.8 + (ratio_to_median - 2.5) * 0.1)

        return {
            "amount_lakhs": amount_lakhs,
            "benchmark_median_lakhs": round(median, 2),
            "benchmark_mean_lakhs": round(mean, 2),
            "z_score": round(z_score, 2),
            "ratio_to_median": round(ratio_to_median, 2),
            "is_outlier": is_iqr_outlier or (z_score > 2.0),
            "cost_risk_factor": round(float(cost_risk), 3)
        }

    def evaluate_velocity_poisson(self, district: str, sanctions_in_window: int = 1) -> Dict[str, Any]:
        """
        Uses Poisson distribution P(X >= k | lambda) to detect unnatural sanction velocity bursts.
        """
        lam = self.district_poisson_rates.get(district, self.default_poisson_rate)
        # Probability of observing >= k sanctions in window under Poisson(lambda)
        # sf = 1 - cdf(k - 1)
        p_value = float(stats.poisson.sf(sanctions_in_window - 1, lam)) if sanctions_in_window > 0 else 1.0
        
        # If sanctions_in_window is heavily above expected rate:
        ratio = sanctions_in_window / max(lam, 0.5)
        
        if ratio <= 1.5:
            velocity_risk = 0.0
        elif ratio <= 3.0:
            velocity_risk = (ratio - 1.5) / 1.5 * 0.5
        else:
            velocity_risk = min(1.0, 0.5 + (ratio - 3.0) * 0.25)

        return {
            "observed_count": sanctions_in_window,
            "poisson_lambda": round(lam, 2),
            "poisson_p_value": round(p_value, 4),
            "ratio_to_expected": round(ratio, 2),
            "velocity_risk_factor": round(float(velocity_risk), 3)
        }

    def evaluate_timeline_and_hazard(self, 
                                     sanctioned_amount: float,
                                     released_amount: float, 
                                     expenditure: float,
                                     physical_progress_pct: float,
                                     sanction_date_str: str, 
                                     target_completion_str: str,
                                     as_of_date_str: str = "2026-08-30") -> Dict[str, Any]:
        """
        Evaluates execution delay, idle funds, and milestone divergence.
        """
        try:
            target_date = datetime.strptime(target_completion_str, "%Y-%m-%d")
            as_of = datetime.strptime(as_of_date_str, "%Y-%m-%d")
            days_past_deadline = max(0, (as_of - target_date).days)
        except Exception:
            days_past_deadline = 0

        # Disbursed percentage
        disbursed_pct = (released_amount / max(sanctioned_amount, 0.01)) * 100.0
        
        # Divergence: High disbursement (>70%) but negligible progress (<25%)
        divergence_gap = max(0.0, disbursed_pct - physical_progress_pct)
        
        # Hazard risk computation
        # Factor 1: Divergence hazard (funds spent vs works done)
        div_hazard = 0.0
        if disbursed_pct > 50 and physical_progress_pct < 25:
            div_hazard = min(1.0, (disbursed_pct - physical_progress_pct) / 75.0)
        elif disbursed_pct > 80 and physical_progress_pct < 40:
            div_hazard = 0.75

        # Factor 2: Timeline stall hazard
        timeline_hazard = 0.0
        if days_past_deadline > 60 and physical_progress_pct < 80:
            timeline_hazard = min(1.0, days_past_deadline / 300.0)

        # Combined delay & idle fund risk factor (0 to 1)
        hazard_risk_factor = min(1.0, max(div_hazard, timeline_hazard * 0.85, (div_hazard + timeline_hazard) * 0.6))
        
        idle_funds_lakhs = round(max(0.0, released_amount - (sanctioned_amount * (physical_progress_pct / 100.0))), 2)

        return {
            "disbursed_pct": round(disbursed_pct, 1),
            "physical_progress_pct": round(physical_progress_pct, 1),
            "divergence_gap_pct": round(divergence_gap, 1),
            "days_past_deadline": days_past_deadline,
            "idle_funds_at_risk_lakhs": idle_funds_lakhs,
            "hazard_risk_factor": round(float(hazard_risk_factor), 3)
        }

    def evaluate_allocation_ceiling(
        self,
        sanctioned_amount_lakhs: float,
        mp_allocated_limit_lakhs: float = 1470.0
    ) -> Dict[str, Any]:
        """
        Evaluates project outlay relative to MP's official MoSPI statutory allocation ceiling.
        Normal individual works rarely exceed 5-10% of total 5-year quota (~₹75L-₹150L).
        Disproportionate allocations (>20% or >₹300L) trigger ceiling risk.
        """
        if mp_allocated_limit_lakhs <= 0:
            mp_allocated_limit_lakhs = 1470.0

        ratio = sanctioned_amount_lakhs / mp_allocated_limit_lakhs
        is_ceiling_risk = (ratio > 0.20) or (sanctioned_amount_lakhs > 350.0)

        # Risk factor scaled from 0.0 to 1.0 for outlays consuming 15% to 50%+ of quota
        risk_factor = 0.0
        if ratio > 0.15:
            risk_factor = min(1.0, (ratio - 0.15) / 0.35)

        return {
            "mp_allocated_limit_lakhs": round(mp_allocated_limit_lakhs, 2),
            "mp_allocated_limit_crores": round(mp_allocated_limit_lakhs / 100.0, 2),
            "allocation_consumption_pct": round(ratio * 100.0, 2),
            "is_ceiling_risk": is_ceiling_risk,
            "ceiling_risk_factor": round(float(risk_factor), 3)
        }

