import React, { useState } from 'react';
import { 
  HardHat, FolderKanban, CheckCircle2, Clock, AlertTriangle, 
  ArrowRight, ShieldCheck, FileText, Upload, Calendar, Building, Eye, ChevronRight, Camera 
} from 'lucide-react';
import { CONTRACTOR_DATA } from '../../data/mockData';
import GovernancePrincipleBanner from '../../components/GovernancePrincipleBanner';
import SectorProgressBar from '../../components/SectorProgressBar';

export default function ContractorDashboardPage({ onNavigate }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const profile = CONTRACTOR_DATA.profile;
  const projects = CONTRACTOR_DATA.projects;

  return (
    <div className="space-y-6">
      
      {/* Contractor Profile Hero */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#123B67] text-white flex items-center justify-center font-bold text-lg shadow-2xs">
            <HardHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F6F8FB] text-[#123B67] border border-[#E4E9EF] font-mono">
                {profile.id}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F0F7F6] text-[#168A78] border border-[#C6E6E1]">
                {profile.credibility_rating}
              </span>
            </div>
            <h1 className="text-base font-bold text-[#0F2942] mt-0.5">{profile.name}</h1>
            <p className="text-xs text-slate-500">
              Operating Circles: {profile.operating_circle} • GSTIN: {profile.gstin}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('contractor-submit')}
          className="px-4 py-2 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-bold rounded-lg transition text-xs flex items-center gap-2 shadow-2xs"
        >
          <Camera className="w-4 h-4 text-[#168A78]" />
          <span>Submit Monthly Evidence & Progress</span>
        </button>
      </div>

      <GovernancePrincipleBanner />

      {/* 4 Metric Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#E4E9EF] p-4 rounded-xl shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Assigned Works</span>
          <span className="text-2xl font-extrabold text-[#0F2942] font-mono mt-1 block">{profile.total_assigned}</span>
          <span className="text-[10px] text-slate-400">Total Contracts Awarded</span>
        </div>
        <div className="bg-white border border-[#E4E9EF] p-4 rounded-xl shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Active Execution</span>
          <span className="text-2xl font-extrabold text-[#1D5D9B] font-mono mt-1 block">{profile.active_projects}</span>
          <span className="text-[10px] text-[#1D5D9B]">Works in Progress</span>
        </div>
        <div className="bg-white border border-[#E4E9EF] p-4 rounded-xl shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Pending Submissions</span>
          <span className="text-2xl font-extrabold text-[#C58A2B] font-mono mt-1 block">{profile.pending_submissions}</span>
          <span className="text-[10px] text-[#C58A2B]">Monthly Submission Due</span>
        </div>
        <div className="bg-white border border-[#E4E9EF] p-4 rounded-xl shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Completed & Cleared</span>
          <span className="text-2xl font-extrabold text-[#168A78] font-mono mt-1 block">{profile.completed_projects}</span>
          <span className="text-[10px] text-[#168A78]">Final Verification Passed</span>
        </div>
      </div>

      {/* Assigned Projects List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h2 className="text-sm font-bold text-[#0F2942]">
              Assigned MPLADS Work Contracts
            </h2>
            <p className="text-xs text-slate-500">
              Track milestone progress, AI verification audits, and inspection flags in real time.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 font-mono">{projects.length} Active Contracts</span>
        </div>

        <div className="space-y-4">
          {projects.map((p) => {
            const isHighRisk = p.risk_score >= 60;
            return (
              <div 
                key={p.id}
                className="bg-white border border-[#E4E9EF] hover:border-slate-300 rounded-xl p-5 shadow-2xs space-y-4 transition"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold font-mono text-slate-400">{p.id}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">{p.type}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isHighRisk 
                          ? 'bg-[#FDF2F2] text-[#C95752] border-[#F8D7DA]' 
                          : 'bg-[#F0F7F6] text-[#168A78] border-[#C6E6E1]'
                      }`}>
                        AI Risk Score: {p.risk_score}/100 • {p.risk_level}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#0F2942] mt-1">{p.name}</h3>
                    <span className="text-xs text-slate-500">{p.location} • {p.district}</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedProject(p)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs transition flex items-center gap-1.5 border border-[#E4E9EF]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => onNavigate('contractor-submit')}
                      className="px-3.5 py-1.5 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-semibold rounded-lg text-xs transition flex items-center gap-1.5 shadow-2xs"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#168A78]" />
                      <span>Submit Evidence</span>
                    </button>
                  </div>
                </div>

                {/* Progress Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF]">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Sanctioned Budget</span>
                    <span className="text-sm font-bold text-[#0F2942] font-mono">{p.sanctioned_amount}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Disbursed: {p.disbursed_amount}</span>
                  </div>
                  <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF]">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Timeline</span>
                    <span className="text-xs font-bold text-slate-800 block mt-0.5">{p.start_date}</span>
                    <span className="text-[10px] text-slate-500 block">Due: {p.expected_completion}</span>
                  </div>
                  <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF]">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Reported vs Visual</span>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="font-bold text-[#0F2942] font-mono">Claim: {p.claimed_progress}%</span>
                      <span className="font-bold text-[#1D5D9B] font-mono">CV: {p.visual_progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                      <div className="bg-[#1D5D9B] h-full rounded-full" style={{ width: `${p.visual_progress}%` }}></div>
                    </div>
                  </div>
                  <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF]">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Verification Status</span>
                    <span className={`text-xs font-bold block mt-0.5 ${
                      isHighRisk ? 'text-[#C95752]' : 'text-[#168A78]'
                    }`}>
                      {p.verification_status}
                    </span>
                    <span className="text-[10px] text-slate-400 block">Last: {p.last_submission}</span>
                  </div>
                </div>

                <SectorProgressBar type={p.type} currentStageIndex={2} />

              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-2xs overflow-y-auto">
          <div className="bg-white border border-[#E4E9EF] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400">{selectedProject.id}</span>
                <h3 className="text-base font-bold text-[#0F2942] mt-0.5">{selectedProject.name}</h3>
                <span className="text-xs text-slate-500">{selectedProject.location}</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-3.5 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF] text-xs text-slate-700 space-y-1">
              <span className="font-bold text-[#0F2942] block uppercase text-[10px]">Technical Scope</span>
              <p>{selectedProject.scope}</p>
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
                className="px-4 py-2 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-semibold rounded-lg text-xs"
              >
                Submit Evidence
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
