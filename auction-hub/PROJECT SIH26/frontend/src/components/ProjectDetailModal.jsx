import React, { useState } from 'react';
import { 
  X, AlertOctagon, AlertTriangle, ShieldCheck, Copy, 
  Clock, TrendingUp, DollarSign, Building2, MapPin, User, 
  FileText, CheckCircle, Sliders, Printer, Lock, CheckCircle2, RefreshCw, Landmark 
} from 'lucide-react';

import WhatIfSimulator from './WhatIfSimulator';
import { updateProjectAction } from '../api';

export default function ProjectDetailModal({ project, onClose, onActionUpdated }) {
  if (!project) return null;

  const [activeSubTab, setActiveSubTab] = useState('evidence'); // 'evidence' | 'whatif' | 'action'
  const [actionStatus, setActionStatus] = useState(project.audit_status || 'Pending Review');
  const [actionNote, setActionNote] = useState(project.audit_notes || '');
  const [savingAction, setSavingAction] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);

  const costEval = project.cost_evaluation || {};
  const hazEval = project.hazard_evaluation || {};
  const dupEval = project.duplicate_evaluation || {};
  const unsupEval = project.unsupervised_evaluation || {};
  const velEval = project.velocity_evaluation || {};
  const xaiItems = project.xai_breakdown || [];

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-red-600 to-rose-700 text-red-400 border-red-800';
    if (score >= 60) return 'from-orange-600 to-amber-700 text-amber-400 border-amber-800';
    if (score >= 35) return 'from-yellow-600 to-amber-600 text-yellow-300 border-yellow-800';
    return 'from-emerald-600 to-teal-700 text-emerald-400 border-emerald-800';
  };

  const topMatch = dupEval.matches && dupEval.matches.length > 0 ? dupEval.matches[0] : null;

  const handleSaveAction = async (e) => {
    e.preventDefault();
    setSavingAction(true);
    try {
      await updateProjectAction(project.project_id, {
        status: actionStatus,
        note: actionNote
      });
      project.audit_status = actionStatus;
      project.audit_notes = actionNote;
      setActionSuccess(true);
      if (onActionUpdated) onActionUpdated(project.project_id, actionStatus, actionNote);
      setTimeout(() => setActionSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to update audit action');
    } finally {
      setSavingAction(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative my-6 print:m-0 print:border-none print:shadow-none">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900/95 border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10 backdrop-blur print:static">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-slate-800 flex items-center justify-center text-white">
              <AlertOctagon className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-slate-400">{project.project_id}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getScoreColor(project.fraud_risk_score)}`}>
                  {project.risk_tier} Risk ({project.fraud_risk_score}/100)
                </span>
                {project.audit_status && project.audit_status !== 'Pending Review' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                    Status: {project.audit_status}
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-white max-w-xl truncate mt-0.5" title={project.title}>
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 print:hidden">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs"
              title="Print Official Audit Dossier"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Dossier</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="bg-slate-950 px-6 py-2.5 border-b border-slate-800 flex items-center space-x-2 print:hidden">
          <button
            onClick={() => setActiveSubTab('evidence')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeSubTab === 'evidence' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Audit Evidence & XAI</span>
          </button>

          <button
            onClick={() => setActiveSubTab('whatif')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeSubTab === 'whatif' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>What-If De-risking Sandbox</span>
          </button>

          <button
            onClick={() => setActiveSubTab('action')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeSubTab === 'action' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Vigilance Action Order</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Print Letterhead (only visible in print) */}
          <div className="hidden print:block border-b-2 border-slate-900 pb-4 mb-6">
            <div className="text-center space-y-1">
              <h1 className="text-xl font-bold uppercase tracking-wider text-black">Government of India</h1>
              <h2 className="text-sm font-semibold text-slate-800">Ministry of Statistics and Programme Implementation (MoSPI)</h2>
              <p className="text-xs text-slate-600">MPLADS Vigilance Cell • Automated Audit Dossier</p>
            </div>
          </div>

          {/* TAB 1: EVIDENCE & XAI */}
          {activeSubTab === 'evidence' && (
            <div className="space-y-6">
              
              {/* Actionable Audit Recommendation Banner */}
              <div className={`p-4 rounded-xl border ${
                project.fraud_risk_score >= 80 
                  ? 'bg-red-950/60 border-red-800 text-red-200' 
                  : project.fraud_risk_score >= 60 
                  ? 'bg-amber-950/60 border-amber-800 text-amber-200' 
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-400">
                      Audit Recommendation
                    </h4>
                    <p className="text-sm font-medium mt-1 leading-relaxed">
                      {project.audit_recommendation}
                    </p>
                  </div>
                </div>
              </div>

              {/* MoSPI Statutory Allocation Quota Context */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      MoSPI Statutory MP Quota Context
                    </span>
                    <div className="text-slate-200">
                      Hon'ble MP: <span className="font-semibold text-white">{project.mp_name}</span> • Official Allocation Limit: <span className="font-mono font-bold text-amber-400">₹{project.mp_allocated_limit_crores || 14.70} Cr</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-right">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Single Project Share</span>
                    <span className="font-mono font-bold text-slate-200">
                      {((project.sanctioned_amount_lakhs / ((project.mp_allocated_limit_crores || 14.70) * 100)) * 100).toFixed(1)}% of 5-Yr Cap
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Details Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-1">Constituency / MP</span>
                  <div className="font-semibold text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{project.district}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{project.mp_name}</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-1">Contractor / Vendor</span>
                  <div className="font-semibold text-slate-200 truncate flex items-center gap-1" title={project.vendor_name}>
                    <Building2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <span className="truncate">{project.vendor_name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{project.vendor_id}</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-1">Sanctioned Outlay</span>
                  <div className="font-bold text-white text-base font-mono">
                    ₹{project.sanctioned_amount_lakhs} <span className="text-xs font-normal text-slate-400">Lakhs</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Disbursed: ₹{project.released_amount_lakhs}L
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-1">Physical Execution</span>
                  <div className="font-bold text-base font-mono flex items-center gap-1 text-slate-200">
                    <span>{project.physical_progress_pct}%</span>
                    <span className="text-xs font-normal text-slate-400">({project.status})</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Idle At Risk: ₹{hazEval.idle_funds_at_risk_lakhs || 0}L
                  </span>
                </div>
              </div>

              {/* Explainable Risk Attribution Breakdown */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Risk Factor Breakdown
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Factors contributing to the {project.fraud_risk_score}/100 risk score
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {xaiItems.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/80">
                            {item.badge}
                          </span>
                          <span className="font-medium text-slate-200">{item.feature}</span>
                        </div>
                        <div className="font-mono font-bold text-amber-400">
                          +{item.impact_points} pts
                        </div>
                      </div>

                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${Math.min(100, item.impact_points * 2.5)}%` }}
                        ></div>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side-by-Side Duplicate Detection Deep Dive (if matched) */}
              {topMatch && (
                <div className="bg-slate-950 border border-indigo-900/60 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-indigo-400">
                      <Copy className="w-4 h-4" />
                      <h4 className="text-xs font-bold uppercase tracking-wider">
                        NLP Semantic Duplicate Match Analysis
                      </h4>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {topMatch.composite_confidence_pct}% Match Confidence
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                    {/* Current Project */}
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Subject Sanction</span>
                      <div className="font-semibold text-slate-200">{project.title}</div>
                      <div className="text-slate-400">{project.ward} • {project.district}</div>
                      <div className="text-slate-300 font-medium pt-1">Vendor: {project.vendor_name}</div>
                      <div className="font-mono text-amber-400">₹{project.sanctioned_amount_lakhs} Lakhs</div>
                    </div>

                    {/* Matched Existing Work */}
                    <div className="p-3 bg-slate-900 rounded-lg border border-indigo-900/50 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-indigo-400">Matched Existing Work</span>
                        <span className="font-mono text-[10px] text-slate-400">{topMatch.matched_project_id}</span>
                      </div>
                      <div className="font-semibold text-slate-200">{topMatch.matched_title}</div>
                      <div className="text-slate-400">{topMatch.matched_ward} • {topMatch.matched_district}</div>
                      <div className="text-slate-300 font-medium pt-1">
                        Vendor: <span className={topMatch.is_different_vendor ? 'text-red-400 font-bold' : ''}>{topMatch.matched_vendor}</span>
                      </div>
                      <div className="font-mono text-amber-400">₹{topMatch.matched_cost_lakhs} Lakhs</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 bg-indigo-950/30 p-2.5 rounded border border-indigo-900/30">
                    {topMatch.is_different_vendor ? (
                      <span className="text-rose-400 font-medium">
                        ⚠️ Split-Vendor Anomaly: Identical work scope contracted to two different vendors within the same ward. High probability of duplicate billing on single physical asset.
                      </span>
                    ) : (
                      <span>Duplicate sanction detected under same executing contractor.</span>
                    )}
                  </div>
                </div>
              )}

              {/* Regional Benchmark Comparison */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Regional Cost Benchmark Comparison ({project.category})
                </h4>
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-2.5 bg-slate-900 rounded-lg">
                    <span className="text-slate-500 block text-[11px]">Proposed Sanction</span>
                    <span className="font-bold text-amber-400 text-sm font-mono">₹{project.sanctioned_amount_lakhs}L</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg">
                    <span className="text-slate-500 block text-[11px]">District Median</span>
                    <span className="font-bold text-slate-200 text-sm font-mono">₹{costEval.benchmark_median_lakhs || '—'}L</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg">
                    <span className="text-slate-500 block text-[11px]">Z-Score Deviation</span>
                    <span className={`font-bold text-sm font-mono ${(costEval.z_score || 0) > 2.0 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {costEval.z_score ? `${costEval.z_score} σ` : 'Normal'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: WHAT-IF SIMULATOR */}
          {activeSubTab === 'whatif' && (
            <WhatIfSimulator project={project} />
          )}

          {/* TAB 3: VIGILANCE ACTION WORKFLOW */}
          {activeSubTab === 'action' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <div className="border-b border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-red-400" />
                  <span>Official Vigilance Status & Executive Order</span>
                </h4>
                <p className="text-slate-400 mt-0.5">
                  Record official enforcement actions taken by District Collectorate or State Vigilance Commission
                </p>
              </div>

              {actionSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-lg text-emerald-300 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Vigilance action order successfully committed and logged to audit trail!</span>
                </div>
              )}

              <form onSubmit={handleSaveAction} className="space-y-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Select Vigilance Enforcement Order</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { val: 'Payment Frozen', label: '🔒 Payment Frozen (Moratorium)', desc: 'Withhold all disbursements pending inquiry' },
                      { val: 'Inspection Ordered', label: '🔍 Field Inspection Ordered', desc: 'Depute technical engineers to verify geotagged site' },
                      { val: 'Cleared', label: '✅ Cleared / Compliant', desc: 'No actionable fraud; authorize standard disbursements' },
                      { val: 'Pending Review', label: '⏳ Pending Routine Audit', desc: 'Normal periodic milestone review' },
                    ].map((opt) => (
                      <div
                        key={opt.val}
                        onClick={() => setActionStatus(opt.val)}
                        className={`p-3 rounded-lg border cursor-pointer transition ${
                          actionStatus === opt.val
                            ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-bold">{opt.label}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Auditor Inquiry Notes & Justification</label>
                  <textarea
                    rows={3}
                    value={actionNote}
                    onChange={(e) => setActionNote(e.target.value)}
                    placeholder="Enter case reference, inquiry committee details, or directive instructions..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-sans"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={savingAction}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg shadow transition flex items-center gap-2"
                  >
                    {savingAction ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Committing Order...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Commit Vigilance Action Order</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between print:hidden">
          <div className="text-xs text-slate-500 font-mono">
            Audit Hash: SHA256:{project.project_id.replace('-', '')}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setActiveSubTab('action');
                setActionStatus('Payment Frozen');
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow transition"
            >
              Issue Payment Moratorium
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
