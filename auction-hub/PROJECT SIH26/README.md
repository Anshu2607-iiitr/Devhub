# MPLADS Vigil: Autonomous Anomaly Detection & Financial Leakage Prevention System

**MPLADS Vigil** is a production-grade machine learning and data engineering intelligence platform designed for the **Ministry of Statistics and Programme Implementation (MoSPI)**, State Vigilance Commissions, and District Collectorates to detect public procurement irregularities, inflated cost proposals, duplicate work claims, and stalled projects before financial leakages occur.

---

## System Architecture

```
                                  [Data Ingestion Layer]
                          (Live Proposals & Historical Records)
                                            │
                                            ▼
                     ┌───────────────────────────────────────────────┐
                     │            Feature Engineering & Baselines     │
                     └───────────────────────────────────────────────┘
                             │                      │               │
                             ▼                      ▼               ▼
                   [Regional Cost Baselines]  [Poisson Sanctions] [Disbursement vs
                   • District & State Medians • Rate λ Modeling   Milestone Divergence]
                   • Z-Scores & IQR Bounds    • Velocity Surges   • Idle Fund Hazards
                             │                      │               │
                             └──────────────────────┼───────────────┘
                                                    │
                             ┌──────────────────────┴──────────────────────┐
                             ▼                                             ▼
                 [Unsupervised ML Engine]                     [NLP Duplicate Work Engine]
                 • Isolation Forest Outliers                  • Sub-word TF-IDF Vectorizer
                 • PCA Reconstruction Error                   • Cosine Distance Index
                 • Multi-Vector Spending Manifold             • Cross-Vendor Ward Overlap
                             │                                             │
                             └──────────────────────┬──────────────────────┘
                                                    │
                                                    ▼
                                  [Dynamic Fraud Risk Scorer (0-100)]
                                  • Critical Risk (≥ 80)
                                  • High Risk (60-79)
                                  • Medium Risk (35-59)
                                  • Low Risk (0-34)
                                                    │
                                                    ▼
                                  [Explainable AI (XAI) Engine]
                                  • SHAP-Style Feature Attribution
                                  • Natural Language Vigilance Directives
                                                    │
                                                    ▼
                     ┌───────────────────────────────────────────────┐
                     │            FastAPI REST Server (:8000)        │
                     └───────────────────────────────────────────────┘
                                            │
                                            ▼
                     ┌───────────────────────────────────────────────┐
                     │          React + Vite Dashboard (:5173)       │
                     └───────────────────────────────────────────────┘
```

---

## Key Core AI & ML Capabilities

1. **Statistical Baselines & Velocity Modeling**:
   - **Poisson Sanction Rate**: Models historical monthly sanction approvals ($P(X \ge k \mid \lambda)$) to flag unnatural sanction clusters preceding fiscal year ends or election cycles.
   - **Regional Cost IQR & Z-score**: Dynamically computes median and standard deviation for each category across constituencies to flag 200%+ inflated budgets.
   - **Idle Fund Hazard Metric**: Evaluates the mathematical divergence between disbursement percentage and actual physical execution, flagging projects where 80%+ funds were drawn while works stalled for over 200 days.

2. **Unsupervised Outlier Detection**:
   - **Isolation Forest**: Identifies multi-dimensional anomalies across spending, progress velocity, and vendor concentration without requiring labeled fraud data.
   - **Reconstruction Error Modeling**: Evaluates structural variance from normative procurement patterns.

3. **NLP Semantic Duplicate Work Detection**:
   - Sub-word and character n-gram TF-IDF vectorizer + Cosine Similarity Matrix.
   - Catches duplicate works or split-contract billing where identical civil scope (e.g. submersible pump, solar lighting) was awarded to different contractors in the same ward.

4. **Explainable AI (XAI) Attribution**:
   - Computes exact numerical points contributed by each risk factor (SHAP-style local attribution).
   - Generates natural-language legal/audit recommendations (e.g. *"Issue payment moratorium on pending tranche"*, *"Cross-verify geotagged photos with Project #MP-4921"*).

---

## Quick Start Guide

### Prerequisites
- Python 3.10+ (Tested on Python 3.14)
- Node.js 18+ (Tested on Node v24)
- uv or standard pip & npm

### Starting the Backend
```bash
# Activate virtual environment
.venv\Scripts\activate

# Launch FastAPI Server
uvicorn api:app --reload --port 8000 --app-dir backend
```
- API Health: `http://127.0.0.1:8000/api/health`
- Interactive Swagger UI: `http://127.0.0.1:8000/docs`

### Starting the Frontend Dashboard
```bash
cd frontend
npm run dev
```
- Open browser at: `http://localhost:5173`

---

## Interactive Dashboard Highlights

1. **Executive Overview**: Monitored outlay (₹ Cr), Critical & High risk counts, Duplicate work alerts, Idle funds at risk, and estimated leakage prevented.
2. **Flagged Projects Explorer**: Searchable, filterable table by Risk Tier (Critical, High, Medium, Low), Sector, Constituency, and Contractor.
3. **Deep Dive XAI Modal**: SHAP-aligned attribution bars, regional benchmark comparisons, and side-by-side text comparisons for duplicate candidates.
4. **Constituency Risk Zones**: Territorial risk index mapping out anomaly density across parliamentary districts.
5. **Duplicate Work Clusters**: Side-by-side comparison cards highlighting split-vendor asset duplications.
6. **Vendor Concentration**: Vendor monopoly profiling, multi-territory footprint, and repeat anomaly rates.
7. **Live Sanction Proposal Sandbox**: Real-time evaluator allowing an auditor or user to input a draft proposal (or load 1-click test presets) and immediately obtain a pre-clearance risk verdict before funds are disbursed.

---

## Test Suite Execution

Run the automated test suite covering statistical models, NLP duplicate detection, Isolation Forest, and REST endpoints:

```bash
# Run ML Engine unit tests
.venv\Scripts\python -m unittest backend/tests/test_ml.py

# Run FastAPI integration tests
.venv\Scripts\python -m unittest backend/tests/test_api.py
```
