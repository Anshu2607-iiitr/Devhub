import React, { useState } from 'react';
import { 
  HardHat, FolderKanban, CheckCircle2, Clock, AlertTriangle, 
  ArrowRight, ShieldAlert, FileText, Upload, Calendar, Building, Eye, ChevronRight 
} from 'lucide-react';
import { CONTRACTOR_DATA } from '../../data/mockData';

export default function ContractorDashboardPage({ onNavigate, onSelectProject }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const profile = CONTRACTOR_DATA.profile;
  const projects = CONTRACTOR_DATA.projects;

  return (
    <div className="space-y-6">
      
      {/* Contractor Top Profile Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
            <HardHat className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-mono">
                {profile.id}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                {profile.credibility_rating}
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">{profile.name}</h2>
            <p className="text-xs text-slate-500">
              Operating Circles: {profile.operating_circle} • GSTIN: {profile.gstin}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('contractor-submit')}
          className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-lg transition text-xs flex items-center gap-2 shadow-sm"
        >
          <Upload className="w-4 h-4" />
          <span>Submit Monthly Milestone Progress</span>
        </button>
      </div>

      {/* 6 Clean KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold block">Total Assigned</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">{profile.total_assigned}</span>
          <span className="text-[10px] text-slate-400">Awarded Works</span>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold block">Active Projects</span>
          <span className="text-2xl font-extrabold text-blue-700 font-mono mt-1 block">{profile.active_projects}</span>
          <span className="text-[10px] text-blue-600 font-medium">Under Execution</span>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold block">Completed</span>
          <span className="text-2xl font-extrabold text-emerald-700 font-mono mt-1 block">{profile.completed_projects}</span>
          <span className="text-[10px] text-emerald-600 font-medium">Final Cleared</span>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold block">Pending Submissions</span>
          <span className="text-2xl font-extrabold text-amber-700 font-mono mt-1 block">{profile.pending_submissions}</span>
          <span className="text-[10px] text-amber-600 font-medium">Monthly Due</span>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold block">Upcoming Milestones</span>
          <span className="text-2xl font-extrabold text-slate-800 font-mono mt-1 block">{profile.upcoming_milestones}</span>
          <span className="text-[10px] text-slate-500">Next 30 Days</span>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold block">Pending Verification</span>
          <span className="text-2xl font-extrabold text-red-700 font-mono mt-1 block">{profile.pending_verification_docs}</span>
          <span className="text-[10px] text-red-600 font-medium">Authority Review</span>
        </div>
      </div>

      {/* Assigned Projects List Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Assigned MPLADS Work Contracts
            </h3>
            <p className="text-xs text-slate-500">
              Track milestone progress, AI verification audits, and inspection flags in real time
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">{projects.length} Active Contracts</span>
        </div>

        <div className="space-y-4">
          {projects.map((p) => {
            const isHighRisk = p.risk_score >= 60;
            return (
              <div 
                key={p.id}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-5 shadow-xs space-y-4 transition"
              >
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold font-mono text-slate-500">{p.id}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">{p.type}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isHighRisk 
                          ? 'bg-red-100 text-red-800 border border-red-200' 
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        AI Risk Score: {p.risk_score}/100 • {p.risk_level}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mt-1">{p.name}</h4>
                    <span className="text-xs text-slate-500">{p.location} • {p.district}</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedProject(p)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs transition flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Project Details</span>
                    </button>
                    <button
                      onClick={() => onNavigate('contractor-submit')}
                      className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg text-xs transition flex items-center gap-1.5 shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Submit Progress</span>
                    </button>
                  </div>
                </div>

                {/* Progress & Financial Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Sanctioned Budget</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">{p.sanctioned_amount}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Disbursed: {p.disbursed_amount}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Timeline (Start ➔ Target)</span>
                    <span className="text-xs font-bold text-slate-800 block mt-0.5">{p.start_date}</span>
                    <span className="text-[10px] text-slate-500 block">Due: {p.expected_completion}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Reported vs Visual Progress</span>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="font-bold text-slate-900 font-mono">Claimed: {p.claimed_progress}%</span>
                      <span className="font-bold text-blue-700 font-mono">CV: {p.visual_progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${p.visual_progress}%` }}></div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Verification Status</span>
                    <span className={`text-xs font-bold block mt-0.5 ${
                      isHighRisk ? 'text-red-700' : 'text-emerald-700'
                    }`}>
                      {p.verification_status}
                    </span>
                    <span className="text-[10px] text-slate-400 block">Last: {p.last_submission}</span>
                  </div>
                </div>

                {/* Milestone Progress Mini Bar */}
                <div className="p-3 bg-slate-50/60 rounded-lg border border-slate-200/80 space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 block">Milestone Breakdown:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    {p.milestones.map((m, idx) => (
                      <div key={idx} className="p-2 bg-white rounded border border-slate-200 text-[11px] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800 truncate">{m.name}</span>
                          <span className="font-mono text-[10px] font-bold text-slate-600">{m.progress}%</span>
                        </div>
                        <span className={`text-[9px] font-bold block ${
                          m.status.includes('Verified') ? 'text-emerald-700' :
                          m.status.includes('Disputed') ? 'text-red-700' : 'text-slate-500'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Screen 2: Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col p-6 space-y-5">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-800">{selectedProject.id}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{selectedProject.name}</h3>
                <span className="text-xs text-slate-500">{selectedProject.location}</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-700 p-1 font-bold text-sm"
              >
                ✕ Close
              </button>
            </div>

            {/* Scope & Overview */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider block text-[10px]">
                Scope of Work & Technical Specification
              </span>
              <p className="text-slate-700 leading-relaxed">{selectedProject.scope}</p>
            </div>

            {/* AI Verification Status Panel */}
            <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-950 uppercase tracking-wider block text-[10px]">
                  AI Evidence Verification Logs (Last Submission: {selectedProject.last_submission})
                </span>
                <span className="font-mono font-bold text-blue-900">Risk Score: {selectedProject.risk_score}/100</span>
              </div>

              <div className="space-y-1.5 text-slate-800">
                {Object.entries(selectedProject.ai_checks).map(([key, val], i) => (
                  <div key={i} className="flex items-center justify-between p-1.5 bg-white rounded border border-blue-100">
                    <span className="capitalize text-slate-600 font-medium">{key.replace(/_/g, ' ')}:</span>
                    <span className={`font-semibold ${
                      val.includes('Warning') ? 'text-amber-800' : 'text-emerald-700'
                    }`}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  onNavigate('contractor-submit');
                }}
                className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg text-xs"
              >
                Submit New Progress Evidence
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
