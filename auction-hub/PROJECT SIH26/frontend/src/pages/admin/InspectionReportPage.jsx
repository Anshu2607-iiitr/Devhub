import React, { useState } from 'react';
import { 
  FileCheck, CheckCircle2, AlertTriangle, MapPin, 
  Calendar, Camera, User, ArrowRight, ShieldCheck, FileText 
} from 'lucide-react';

export default function InspectionReportPage({ onNavigate }) {
  const [officerName, setOfficerName] = useState('Er. Alok Ranjan (Executive Engineer, PWD)');
  const [actualProgress, setActualProgress] = useState(42);
  const [qualityScore, setQualityScore] = useState('B (Subgrade Adequate, WMM Deficient)');
  const [findings, setFindings] = useState('Physical core drilling confirmed only 42% physical completion. WMM thickness is deficient by 40mm across chainage 2.0 to 3.8. Bitumen paving not initiated.');
  const [contractorExplanation, setContractorExplanation] = useState('Contractor cited unseasonal heavy rainfall in Namkum valley during August which halted bitumen hot-mix transport.');
  const [recommendedDecision, setRecommendedDecision] = useState('Hold Tranche 3 Payment & Grant 30-Day Rectification Notice');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-5 shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Official Inspection Report Filed & Sealed</h2>
          <p className="text-xs text-slate-500">
            Inspection Docket ID: <strong className="font-mono text-slate-700">INSP-JH-2026-089-R1</strong> • Recorded in Audit Trail
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2 text-slate-700">
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="text-slate-500">Inspected Physical Progress:</span>
            <span className="font-bold text-blue-700 font-mono">{actualProgress}% (Claimed: 80%)</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="text-slate-500">Statutory Decision:</span>
            <span className="font-bold text-amber-800">{recommendedDecision}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Audit Status:</span>
            <span className="font-bold text-emerald-700">Permanent Cryptographic Log Created</span>
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('admin-dashboard')}
            className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs"
          >
            Return to Command Center
          </button>
          <button
            onClick={() => onNavigate('audit-trail')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
          >
            View in Immutable Audit Trail
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
            <FileCheck className="w-4 h-4 text-blue-700" />
            <span>Screen 10: Official Statutory Inspection Report</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            File Technical Field Observations & Final Authority Decision
          </h2>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5 text-xs">
        
        {/* Project & Officer Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Target MPLADS Project</label>
            <input
              type="text"
              readOnly
              value="MPLAD-JH-2026-089: Namkum to Rampur Rural Road Upgrade"
              className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-800 font-semibold"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Inspecting Officer</label>
            <input
              type="text"
              value={officerName}
              onChange={(e) => setOfficerName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-semibold focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* GPS Verification & Actual Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Observed Physical Progress (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={actualProgress}
              onChange={(e) => setActualProgress(Number(e.target.value))}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono font-bold focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Material & Quality Grading</label>
            <input
              type="text"
              value={qualityScore}
              onChange={(e) => setQualityScore(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Technical Findings */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Field Inspection Observations & Measurements</label>
          <textarea
            rows={3}
            value={findings}
            onChange={(e) => setFindings(e.target.value)}
            required
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        {/* Contractor Explanation & Citizen Grievance Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Contractor Representation Received</label>
            <textarea
              rows={2}
              value={contractorExplanation}
              onChange={(e) => setContractorExplanation(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Citizen Grievance Cross-Reference</label>
            <input
              type="text"
              readOnly
              value="GRV-JH-2026-9812 (Amit Kumar — Waterlogging & missing tar verified)"
              className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-700"
            />
          </div>
        </div>

        {/* Final Decision */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Statutory Authority Final Order</label>
          <select
            value={recommendedDecision}
            onChange={(e) => setRecommendedDecision(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
          >
            <option value="Hold Tranche 3 Payment & Grant 30-Day Rectification Notice">
              Hold Tranche 3 Payment & Grant 30-Day Rectification Notice to Contractor
            </option>
            <option value="Approve Milestone Clearance with Penalty Deduction">
              Approve Milestone Clearance with Penalty Deduction for Schedule Delay
            </option>
            <option value="Issue Blacklisting Notice & Terminate Contract">
              Issue Formal Show-Cause Notice for Contract Termination & Re-Tender
            </option>
          </select>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onNavigate('admin-dashboard')}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>File Sealed Inspection Docket</span>
          </button>
        </div>

      </form>

    </div>
  );
}
