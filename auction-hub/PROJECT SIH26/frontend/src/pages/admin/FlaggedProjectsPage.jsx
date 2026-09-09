import React, { useState } from 'react';
import { 
  AlertOctagon, Filter, Search, Eye, CheckSquare, 
  MessageSquare, FileText, ArrowRight, ShieldAlert, ArrowUpDown 
} from 'lucide-react';
import { FLAGGED_PROJECTS_DATA } from '../../data/mockData';
import GovernancePrincipleBanner from '../../components/GovernancePrincipleBanner';

export default function FlaggedProjectsPage({ onNavigate }) {
  const [districtFilter, setDistrictFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [selectedActionModal, setSelectedActionModal] = useState(null);

  const filtered = FLAGGED_PROJECTS_DATA.filter((p) => {
    if (districtFilter !== 'All' && p.district !== districtFilter) return false;
    if (riskFilter !== 'All' && p.risk_level !== riskFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#C95752] font-bold text-xs uppercase tracking-wider">
            <AlertOctagon className="w-4 h-4" />
            <span>Priority Anomaly Triage Queue</span>
          </div>
          <h1 className="text-base font-bold text-[#0F2942] mt-0.5">
            Flagged Projects Requiring Authorized Technical Oversight
          </h1>
        </div>
        <span className="text-xs font-bold text-[#C95752] bg-[#FDF2F2] border border-[#F8D7DA] px-3 py-1.5 rounded-lg font-mono">
          86 High-Priority Flags
        </span>
      </div>

      <GovernancePrincipleBanner />

      {/* Filter Bar */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <span>District:</span>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
          >
            <option value="All">All Districts</option>
            <option value="Ranchi">Ranchi</option>
            <option value="Dhanbad">Dhanbad</option>
            <option value="Hazaribagh">Hazaribagh</option>
          </select>

          <span>Risk Level:</span>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
          >
            <option value="All">All Risk Levels</option>
            <option value="High">High Risk (≥ 60)</option>
            <option value="Medium">Medium Risk</option>
          </select>
        </div>

        <span className="text-slate-400 font-mono text-[11px]">Showing {filtered.length} Flagged Sanctions</span>
      </div>

      {/* List of Flagged Cards */}
      <div className="space-y-4">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white border border-[#E4E9EF] hover:border-slate-300 rounded-xl p-5 shadow-2xs space-y-4 transition">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full font-bold font-mono text-xs ${
                    p.risk_score >= 80 ? 'bg-[#FDF2F2] text-[#C95752] border border-[#F8D7DA]' : 'bg-[#FEF9EE] text-[#C58A2B] border border-[#FDE8B3]'
                  }`}>
                    Risk: {p.risk_score}/100 • {p.risk_level}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{p.id}</span>
                  <span className="text-[10px] font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-700">{p.district}</span>
                </div>
                <h3 className="text-base font-bold text-[#0F2942] mt-1">{p.name}</h3>
                <span className="text-xs text-slate-500">Contractor: {p.contractor}</span>
              </div>

              <button
                onClick={() => setSelectedActionModal(p)}
                className="px-4 py-2 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-2xs"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Take Official Action</span>
              </button>
            </div>

            {/* Triggers & Recommended Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF] space-y-1.5">
                <span className="font-bold text-slate-700 uppercase tracking-wider block text-[10px]">
                  AI Triggers & Signals Flagged:
                </span>
                <ul className="space-y-1 text-slate-800 list-disc list-inside">
                  {p.triggers.map((t, i) => (
                    <li key={i} className="text-[11px] leading-normal text-[#C95752] font-medium">{t}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#F0F7F6] rounded-lg border border-[#C6E6E1] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#123B67] uppercase tracking-wider text-[10px]">
                    Recommended Action:
                  </span>
                  <span className="text-[10px] font-bold text-[#168A78] bg-white px-2 py-0.5 rounded border border-[#C6E6E1]">
                    {p.inspection_status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 leading-normal font-medium">
                  {p.recommended_action}
                </p>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-[#C6E6E1]">
                  Assigned Officer: <strong className="text-slate-800">{p.assigned_officer}</strong>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Action Modal */}
      {selectedActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-2xs">
          <div className="bg-white border border-[#E4E9EF] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">AUTHORITY DISPATCH ACTION</span>
                <h3 className="text-base font-bold text-[#0F2942] mt-0.5">{selectedActionModal.id}</h3>
              </div>
              <button
                onClick={() => setSelectedActionModal(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Select statutory audit procedure for <strong className="text-slate-900">{selectedActionModal.name}</strong>:
            </p>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => {
                  setSelectedActionModal(null);
                  onNavigate('admin-inspections');
                }}
                className="w-full p-3 text-left rounded-lg bg-[#EBF3FA] hover:bg-blue-100 border border-[#1D5D9B]/30 text-[#123B67] font-bold transition flex items-center justify-between"
              >
                <span>1. Create Physical Field Inspection Order</span>
                <ArrowRight className="w-4 h-4 text-[#1D5D9B]" />
              </button>
              <button
                onClick={() => {
                  setSelectedActionModal(null);
                }}
                className="w-full p-3 text-left rounded-lg bg-[#FEF9EE] hover:bg-amber-100 border border-[#FDE8B3] text-[#C58A2B] font-bold transition flex items-center justify-between"
              >
                <span>2. Request Clarification & Lab Compaction Certificate</span>
                <ArrowRight className="w-4 h-4 text-[#C58A2B]" />
              </button>
              <button
                onClick={() => {
                  setSelectedActionModal(null);
                }}
                className="w-full p-3 text-left rounded-lg bg-[#FDF2F2] hover:bg-red-100 border border-[#F8D7DA] text-[#C95752] font-bold transition flex items-center justify-between"
              >
                <span>3. Escalate to State Vigilance Commission</span>
                <ArrowRight className="w-4 h-4 text-[#C95752]" />
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedActionModal(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
