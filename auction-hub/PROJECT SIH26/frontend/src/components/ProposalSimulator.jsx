import React, { useState } from 'react';
import { Zap, AlertOctagon, CheckCircle2, Copy, TrendingUp, Sparkles, RefreshCw, ShieldAlert, FileSpreadsheet, PlusCircle } from 'lucide-react';
import { analyzeProposal } from '../api';
import BatchProposalUpload from './BatchProposalUpload';

export default function ProposalSimulator() {
  const [mode, setMode] = useState('single'); // 'single' or 'batch'
  const [formData, setFormData] = useState({
    title: 'Supply and Installation of 50 LED Solar Street Lights in Shivpur Ward 14',
    description: 'Procurement and civil erection of high efficiency solar street lights with battery backup under MPLADS.',
    category: 'Solar Lighting & Green Energy',
    district: 'Varanasi',
    ward: 'Shivpur Ward 14',
    sanctioned_amount_lakhs: 68.5, // Inflated for demo
    released_amount_lakhs: 0.0,
    expenditure_lakhs: 0.0,
    physical_progress_pct: 0.0,
    vendor_id: 'VEN-NEW-099',
    vendor_name: 'Sunrise Power Systems LLP',
    sanction_date: '2026-09-01',
    target_completion_date: '2026-12-01'
  });

  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  // Quick Preset Scenarios
  const loadPreset = (type) => {
    if (type === 'inflated') {
      setFormData({
        title: 'Supply and Installation of 50 LED Solar Street Lights in Shivpur Ward 14',
        description: 'Procurement and erection of solar street lights with battery storage.',
        category: 'Solar Lighting & Green Energy',
        district: 'Varanasi',
        ward: 'Shivpur Ward 14',
        sanctioned_amount_lakhs: 74.0, // Benchmark is ~12-14L
        released_amount_lakhs: 0.0,
        expenditure_lakhs: 0.0,
        physical_progress_pct: 0.0,
        vendor_id: 'VEN-IN-003',
        vendor_name: 'National Urja & Solar Solutions LLP',
        sanction_date: '2026-09-04',
        target_completion_date: '2026-12-30'
      });
    } else if (type === 'duplicate') {
      setFormData({
        title: 'Setting up of 10HP Submersible Deep Tubewell and Solar Water Pump in Shivpur Ward 14',
        description: 'Drinking water project under MPLADS. Scope includes civil excavation and tubewell commissioning.',
        category: 'Drinking Water & Tubewells',
        district: 'Varanasi',
        ward: 'Shivpur Ward 14',
        sanctioned_amount_lakhs: 18.5,
        released_amount_lakhs: 0.0,
        expenditure_lakhs: 0.0,
        physical_progress_pct: 0.0,
        vendor_id: 'VEN-IN-007', // Different vendor
        vendor_name: 'Ganga Builders & Earthmovers',
        sanction_date: '2026-09-04',
        target_completion_date: '2027-01-15'
      });
    } else {
      // Compliant Normal
      setFormData({
        title: 'Construction of Community RO Drinking Water Filtration Plant at Rohania Block',
        description: 'Standard civil construction of drinking water purification station conforming to MoSPI guidelines.',
        category: 'Drinking Water & Tubewells',
        district: 'Varanasi',
        ward: 'Rohania Block',
        sanctioned_amount_lakhs: 14.2, // Within normal range
        released_amount_lakhs: 0.0,
        expenditure_lakhs: 0.0,
        physical_progress_pct: 0.0,
        vendor_id: 'VEN-IN-004',
        vendor_name: 'Kisan Water Technologies Co.',
        sanction_date: '2026-09-04',
        target_completion_date: '2027-01-30'
      });
    }
    setResult(null);
  };

  const handleEvaluate = async (e) => {
    e.preventDefault();
    setAnalyzing(true);
    try {
      const resp = await analyzeProposal(formData);
      setResult(resp.evaluation);
    } catch (err) {
      console.error(err);
      alert('Error running AI analysis');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner with Subtab Switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Live Sanction Proposal Sandbox (Pre-Clearance AI Audit)</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate a new MPLADS work proposal before sanction clearance. The engine checks regional cost benchmarks, Poisson sanction bursts, and NLP duplicate overlaps in real time.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setMode('single')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition flex items-center gap-1.5 ${
              mode === 'single' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Single Proposal</span>
          </button>
          <button
            onClick={() => setMode('batch')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition flex items-center gap-1.5 ${
              mode === 'batch' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Batch Multi-Scan</span>
          </button>
        </div>
      </div>

      {mode === 'batch' ? (
        <BatchProposalUpload />
      ) : (
        <>
          {/* Quick Presets Bar */}
          <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">1-Click Test Scenarios:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => loadPreset('inflated')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 rounded transition"
              >
                Inflated Cost Tender
              </button>
              <button
                type="button"
                onClick={() => loadPreset('duplicate')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-400 border border-indigo-500/30 rounded transition"
              >
                Duplicate Work Scheme
              </button>
              <button
                type="button"
                onClick={() => loadPreset('normal')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 rounded transition"
              >
                Compliant Proposal
              </button>
            </div>
          </div>

      {/* Main Grid: Form Left, AI Evaluation Output Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Proposal Form */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Draft Sanction Proposal Parameters</span>
          </h3>

          <form onSubmit={handleEvaluate} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Project Work Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Detailed Scope & Description</label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Sector / Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Drinking Water & Tubewells">Drinking Water & Tubewells</option>
                  <option value="Solar Lighting & Green Energy">Solar Lighting & Green Energy</option>
                  <option value="Rural Roads & Connectivity">Rural Roads & Connectivity</option>
                  <option value="Community Halls & Public Infra">Community Halls & Public Infra</option>
                  <option value="Education & Anganwadi Infrastructure">Education & Anganwadi</option>
                  <option value="Healthcare & Sanitation">Healthcare & Sanitation</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Constituency</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Varanasi">Varanasi</option>
                  <option value="Gorakhpur">Gorakhpur</option>
                  <option value="Wayanad">Wayanad</option>
                  <option value="Baramati">Baramati</option>
                  <option value="Patna Sahib">Patna Sahib</option>
                  <option value="Bangalore Rural">Bangalore Rural</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Jaipur Rural">Jaipur Rural</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Ward / Village Cluster</label>
                <input
                  type="text"
                  value={formData.ward}
                  onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Sanction Amount (₹ Lakhs)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.sanctioned_amount_lakhs}
                  onChange={(e) => setFormData({ ...formData, sanctioned_amount_lakhs: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-amber-400 font-bold focus:outline-none focus:border-amber-500 font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Executing Contractor</label>
                <input
                  type="text"
                  value={formData.vendor_name}
                  onChange={(e) => setFormData({ ...formData, vendor_name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Vendor ID</label>
                <input
                  type="text"
                  value={formData.vendor_id}
                  onChange={(e) => setFormData({ ...formData, vendor_id: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-400 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={analyzing}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg shadow-lg transition flex items-center justify-center space-x-2 text-xs"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Multi-Vector Anomaly Diagnostics...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Run Real-Time AI Pre-Clearance Audit</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Real-time AI Evaluation Output */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Real-Time Audit Diagnosis</span>
            </h3>
            {result && (
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                result.fraud_risk_score >= 80 ? 'bg-red-950 text-red-400 border-red-800' :
                result.fraud_risk_score >= 60 ? 'bg-orange-950 text-orange-400 border-orange-800' :
                result.fraud_risk_score >= 35 ? 'bg-yellow-950 text-yellow-300 border-yellow-800' :
                'bg-emerald-950 text-emerald-400 border-emerald-800'
              }`}>
                {result.risk_tier} Risk ({result.fraud_risk_score}/100)
              </span>
            )}
          </div>

          {!result ? (
            <div className="h-80 flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
              <Zap className="w-8 h-8 text-slate-700" />
              <p className="text-xs">
                Enter proposal parameters or choose a preset and click "Run Real-Time AI Pre-Clearance Audit".
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              
              {/* Verdict Banner */}
              <div className={`p-4 rounded-xl border ${
                result.fraud_risk_score >= 80 ? 'bg-red-950/70 border-red-800 text-red-200' :
                result.fraud_risk_score >= 60 ? 'bg-orange-950/70 border-orange-800 text-orange-200' :
                result.fraud_risk_score >= 35 ? 'bg-yellow-950/70 border-yellow-800 text-yellow-200' :
                'bg-emerald-950/70 border-emerald-800 text-emerald-200'
              }`}>
                <div className="flex items-start gap-2.5">
                  {result.fraud_risk_score >= 60 ? (
                    <AlertOctagon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider block">
                      {result.fraud_risk_score >= 60 ? 'PRE-CLEARANCE REJECTION / MORATORIUM ADVISORY' : 'CLEARANCE RECOMMENDED'}
                    </span>
                    <p className="text-xs mt-1 leading-relaxed">
                      {result.audit_recommendation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Regional Cost Comparison */}
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Cost Baseline Assessment
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Proposed</span>
                    <span className="font-bold text-amber-400 font-mono">₹{result.cost_evaluation.amount_lakhs}L</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Regional Median</span>
                    <span className="font-bold text-slate-200 font-mono">₹{result.cost_evaluation.benchmark_median_lakhs}L</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Ratio to Baseline</span>
                    <span className={`font-bold font-mono ${result.cost_evaluation.ratio_to_median > 1.8 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {result.cost_evaluation.ratio_to_median}x
                    </span>
                  </div>
                </div>
              </div>

              {/* Duplicate Work Scan Results */}
              {result.duplicate_evaluation.has_duplicate_risk ? (
                <div className="p-3.5 bg-slate-950 rounded-lg border border-indigo-900/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                      <Copy className="w-3.5 h-3.5" />
                      Duplicate Work Match Detected
                    </span>
                    <span className="font-mono text-xs font-bold text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                      {result.duplicate_evaluation.max_similarity_pct}% Similarity
                    </span>
                  </div>

                  {result.duplicate_evaluation.matches.length > 0 && (
                    <div className="bg-slate-900 p-2.5 rounded border border-indigo-950 text-[11px] text-slate-300 space-y-1">
                      <div className="flex justify-between text-slate-500 text-[10px]">
                        <span>Existing Project: {result.duplicate_evaluation.matches[0].matched_project_id}</span>
                        <span>Ward: {result.duplicate_evaluation.matches[0].matched_ward}</span>
                      </div>
                      <div className="font-semibold text-white">
                        {result.duplicate_evaluation.matches[0].matched_title}
                      </div>
                      <div className="text-slate-400">
                        Awarded to: <span className="text-amber-400 font-medium">{result.duplicate_evaluation.matches[0].matched_vendor}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>No duplicate works detected in regional semantic index.</span>
                </div>
              )}

              {/* SHAP Factor Impact Breakdown */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Factor Contribution Breakdown
                </span>
                <div className="space-y-1.5">
                  {result.xai_breakdown.map((item, idx) => (
                    <div key={idx} className="p-2 bg-slate-950 rounded border border-slate-800 flex items-center justify-between">
                      <div className="space-y-0.5 max-w-[80%]">
                        <div className="font-medium text-slate-200">{item.feature}</div>
                        <div className="text-[10px] text-slate-500 truncate">{item.details}</div>
                      </div>
                      <span className="font-mono font-bold text-amber-400">+{item.impact_points}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
        </>
      )}

    </div>
  );
}
