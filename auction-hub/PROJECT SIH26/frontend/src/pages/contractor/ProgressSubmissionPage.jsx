import React, { useState } from 'react';
import { 
  Upload, Camera, CheckCircle2, AlertTriangle, FileText, 
  MapPin, Calendar, Clock, DollarSign, ArrowRight, ShieldCheck, HardHat 
} from 'lucide-react';
import { CONTRACTOR_DATA } from '../../data/mockData';

export default function ProgressSubmissionPage({ onNavigate }) {
  const [selectedProjectId, setSelectedProjectId] = useState(CONTRACTOR_DATA.projects[0].id);
  const [selectedMilestone, setSelectedMilestone] = useState('Wet Mix Macadam (WMM) Base');
  const [completionPct, setCompletionPct] = useState(80);
  const [workDescription, setWorkDescription] = useState('Completed aggregate grading and mechanical compaction across 3.8 km stretch. Water sprinkling and curing ongoing.');
  const [materialInfo, setMaterialInfo] = useState('Grade-II Crushed Stone Aggregate: 420 MT • Bitumen 60/70: 45 MT (Stored at site depot)');
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
          <h2 className="text-xl font-bold text-slate-900">Progress Report Transmitted to AI Engine</h2>
          <p className="text-xs text-slate-500">
            Submission Reference: <strong className="font-mono text-slate-700">SUB-CON-2026-089-M3</strong> • Timestamp: {new Date().toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2 text-slate-700">
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="text-slate-500">Contract ID:</span>
            <span className="font-mono font-bold">{selectedProjectId}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="text-slate-500">Milestone:</span>
            <span className="font-semibold">{selectedMilestone} ({completionPct}%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">AI Verification Status:</span>
            <span className="font-bold text-amber-800">Processing Multi-Signal Audit...</span>
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('contractor-ai-verify')}
            className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <Camera className="w-4 h-4" />
            <span>Open AI Evidence Verification Panel</span>
          </button>
          <button
            onClick={() => onNavigate('contractor-dashboard')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
          >
            Back to Dashboard
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
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
            <HardHat className="w-4 h-4" />
            <span>Guided Milestone Progress Submission</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            Submit Verified Work Measurements & Geotagged Evidence
          </h2>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200">
          Step 1 of 2
        </span>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5 text-xs">
        
        {/* Project Picker */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Select Awarded MPLADS Project</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:outline-none focus:border-amber-600 focus:bg-white"
          >
            {CONTRACTOR_DATA.projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id}: {p.name} ({p.district}) — Sanctioned: {p.sanctioned_amount}
              </option>
            ))}
          </select>
        </div>

        {/* Milestone & Completion % */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Milestone Stage</label>
            <select
              value={selectedMilestone}
              onChange={(e) => setSelectedMilestone(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:outline-none focus:border-amber-600 focus:bg-white"
            >
              <option value="Earthwork & Subgrade Compaction">Milestone 1: Earthwork & Subgrade Compaction</option>
              <option value="Granular Sub-Base (GSB) Layer">Milestone 2: Granular Sub-Base (GSB) Layer</option>
              <option value="Wet Mix Macadam (WMM) Base">Milestone 3: Wet Mix Macadam (WMM) Base</option>
              <option value="Bituminous Concrete Surfacing">Milestone 4: Bituminous Concrete Surfacing</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Claimed Physical Progress (%)</label>
            <input
              type="number"
              min="1"
              max="100"
              value={completionPct}
              onChange={(e) => setCompletionPct(Number(e.target.value))}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono font-bold focus:outline-none focus:border-amber-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Work Description */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Detailed Technical Work Description</label>
          <textarea
            rows={3}
            value={workDescription}
            onChange={(e) => setWorkDescription(e.target.value)}
            required
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-amber-600 focus:bg-white"
          />
        </div>

        {/* Material Consumption Info */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Material Consumption & Batch Information</label>
          <input
            type="text"
            value={materialInfo}
            onChange={(e) => setMaterialInfo(e.target.value)}
            required
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono focus:outline-none focus:border-amber-600 focus:bg-white"
          />
        </div>

        {/* Invoices & Bill Upload */}
        <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">Upload Certified Invoices / Measurement Book (MB) Copies</span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ✓ MB_Scan_Aug2026.pdf (4.2 MB)
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Upload PDF/JPG copies of verified vendor invoices, test laboratory compaction certificates, and junior engineer MB counter-signatures.
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onNavigate('contractor-dashboard')}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm"
          >
            <span>Proceed to In-App Camera AI Verification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
}
