"""
API Endpoint Integration Tests
"""

import sys
import os
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from api import app

class TestMPLADSAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_health(self):
        resp = self.client.get("/api/health")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data["status"], "healthy")
        self.assertTrue(data["pipeline_initialized"])

    def test_get_projects_and_filter(self):
        resp = self.client.get("/api/projects?limit=10")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertIn("items", data)
        self.assertLessEqual(len(data["items"]), 10)
        self.assertGreater(data["total"], 0)

        # Test filtering by Critical tier
        crit_resp = self.client.get("/api/projects?tier=Critical&limit=5")
        self.assertEqual(crit_resp.status_code, 200)
        crit_data = crit_resp.json()
        for item in crit_data["items"]:
            self.assertEqual(item["risk_tier"], "Critical")

    def test_get_project_detail(self):
        # Fetch first project
        resp = self.client.get("/api/projects?limit=1")
        item = resp.json()["items"][0]
        proj_id = item["project_id"]

        detail_resp = self.client.get(f"/api/projects/{proj_id}")
        self.assertEqual(detail_resp.status_code, 200)
        detail = detail_resp.json()
        self.assertEqual(detail["project_id"], proj_id)
        self.assertIn("xai_breakdown", detail)
        self.assertIn("fraud_risk_score", detail)

    def test_analyze_proposal_endpoint(self):
        payload = {
            "title": "Supply and Installation of 50 LED Solar Street Lights in Shivpur Ward 14",
            "description": "MPLADS green energy solar lighting installation.",
            "category": "Solar Lighting & Green Energy",
            "district": "Varanasi",
            "ward": "Shivpur Ward 14",
            "sanctioned_amount_lakhs": 65.0, # Highly inflated for solar lights
            "vendor_id": "VEN-TEST-99",
            "vendor_name": "Test Global Ventures"
        }
        resp = self.client.post("/api/projects/analyze", json=payload)
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertIn("evaluation", data)
        eval_res = data["evaluation"]
        self.assertGreaterEqual(eval_res["fraud_risk_score"], 35.0)
        self.assertIn("xai_breakdown", eval_res)
        self.assertIn("audit_recommendation", eval_res)

    def test_analytics_endpoints(self):
        summary_resp = self.client.get("/api/analytics/summary")
        self.assertEqual(summary_resp.status_code, 200)
        summary = summary_resp.json()
        self.assertIn("total_monitored_crores", summary)
        self.assertIn("critical_risk_count", summary)

        heatmap_resp = self.client.get("/api/analytics/district-heatmap")
        self.assertEqual(heatmap_resp.status_code, 200)
        districts = heatmap_resp.json()
        self.assertIsInstance(districts, list)
        self.assertGreater(len(districts), 0)

        dup_resp = self.client.get("/api/analytics/duplicates")
        self.assertEqual(dup_resp.status_code, 200)
        self.assertIsInstance(dup_resp.json(), list)

        vendor_resp = self.client.get("/api/analytics/vendors")
        self.assertEqual(vendor_resp.status_code, 200)
        self.assertIsInstance(vendor_resp.json(), list)

        # Verify lat/lng in heatmap
        self.assertIn("lat", districts[0])
        self.assertIn("lng", districts[0])

    def test_audit_action(self):
        # Fetch first project
        resp = self.client.get("/api/projects?limit=1")
        item = resp.json()["items"][0]
        proj_id = item["project_id"]

        action_payload = {
            "status": "Payment Frozen",
            "note": "Payment frozen by Vigilance Officer pending technical audit."
        }
        post_resp = self.client.post(f"/api/projects/{proj_id}/action", json=action_payload)
        self.assertEqual(post_resp.status_code, 200)
        res = post_resp.json()
        self.assertEqual(res["audit_status"], "Payment Frozen")
        self.assertIn("Payment frozen", res["audit_notes"])

    def test_analyze_batch(self):
        proposals = [
            {
                "title": "Installation of 50 Solar Street Lights in Shivpur Ward 14",
                "category": "Solar Lighting & Green Energy",
                "district": "Varanasi",
                "ward": "Shivpur Ward 14",
                "sanctioned_amount_lakhs": 65.0
            },
            {
                "title": "Construction of RO Plant in Rohania Block",
                "category": "Drinking Water & Tubewells",
                "district": "Varanasi",
                "ward": "Rohania Block",
                "sanctioned_amount_lakhs": 14.0
            }
        ]
        resp = self.client.post("/api/projects/analyze-batch", json={"proposals": proposals})
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data["total_proposals"], 2)
        self.assertIn("evaluations", data)
        self.assertGreater(data["total_outlay_lakhs"], 0)

    def test_export_csv(self):
        resp = self.client.get("/api/projects/export/csv?tier=Critical")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.headers.get("content-type"), "text/csv; charset=utf-8")
        text = resp.text
        self.assertIn("Project ID", text)
        self.assertIn("Risk Score", text)
        self.assertIn("MP Allocated Limit", text)

    def test_get_official_mps(self):
        resp = self.client.get("/api/mps?limit=10")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertIn("total_mps", data)
        self.assertEqual(data["total_mps"], 543)
        self.assertIn("total_official_allocated_crores", data)
        self.assertGreater(data["total_official_allocated_crores"], 8000.0)
        self.assertEqual(len(data["items"]), 10)
        first = data["items"][0]
        self.assertIn("mp_name", first)
        self.assertIn("constituency", first)
        self.assertIn("allocated_amount_crores", first)
        self.assertIn("utilization_pct", first)

if __name__ == "__main__":
    unittest.main()

