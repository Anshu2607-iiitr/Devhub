import React, { useState } from 'react';
import { 
  FolderKanban, CheckCircle2, Clock, AlertTriangle, 
  MapPin, Camera, FileText, ArrowRight, ShieldCheck 
} from 'lucide-react';
import SectorProgressBar from './SectorProgressBar';

export default function ProjectDetailModal({ project, onClose, onNavigate }) {
  const [activeTab, setActiveTab] = useState('01');
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-2xs overflow-y-auto">
      <div className="bg-white border border-[#E4E9EF] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-slate-400">{project.id || project.sanction_id}</span>
            <h2 className="text-base font-bold text-[#0F2942] mt-0.5">{project.name || project.project_name}</h2>
            <span className="text-xs text-slate-500">{project.district} • {project.type || project.work_category}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 font-bold p-1"
          >
            ✕ Close
          </button>
        </div>

        {/* 4 Tabs */}
        <div className="grid grid-cols-4 gap-1.5 bg-[#F6F8FB] p-1 rounded-xl border border-[#E4E9EF] text-xs font-semibold">
          {['01 Overview', '02 Evidence', '03 AI Analysis', '04 History'].map((t, i) => {
            const code = `0${i + 1}`;
            return (
              <button
                key={t}
                onClick={() => setActiveTab(code)}
                className={`py-1.5 rounded-lg transition ${
                  activeTab === code ? 'bg-white text-[#123B67] font-bold shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Tab 01: Overview */}
        {activeTab === '01' && (
          <div className="space-y-4 text-xs">
            <SectorProgressBar type={project.type || 'Road'} currentStageIndex={2} />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF]">
                <span className="text-slate-400 block text-[10px] uppercase">Sanction Outlay</span>
                <span className="font-bold text-[#0F2942] font-mono text-sm">{project.sanctioned_amount || '₹1.20 Cr'}</span>
              </div>
              <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF]">
                <span className="text-slate-400 block text-[10px] uppercase">Physical Progress</span>
                <span className="font-bold text-[#1D5D9B] font-mono text-sm">{project.visual_progress || 42}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 02: Evidence */}
        {activeTab === '02' && (
          <div className="space-y-3 text-xs">
            <span className="font-bold text-[#0F2942] block">Verified Camera Evidence</span>
            <div className="h-44 rounded-xl overflow-hidden bg-slate-200 relative">
              <img 
                src="https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80" 
                alt="Evidence" 
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded">
                Captured: 28 Aug 2026 • 23.3441° N, 85.3096° E
              </span>
            </div>
          </div>
        )}

        {/* Tab 03: AI Analysis */}
        {activeTab === '03' && (
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-3 bg-[#FDF2F2] rounded-lg border border-[#F8D7DA]">
              <span className="font-bold text-[#C95752]">Risk Score: {project.risk_score || 82} / 100</span>
              <span className="text-[10px] font-bold bg-white text-[#C95752] px-2 py-0.5 rounded">High Priority</span>
            </div>
            <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF] text-slate-700">
              Notice: AI-generated assessment — official physical verification required before any administrative action.
            </div>
          </div>
        )}

        {/* Tab 04: History */}
        {activeTab === '04' && (
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-[#F6F8FB] rounded border border-[#E4E9EF] flex justify-between">
              <span>AI Flag Generated</span>
              <span className="font-mono text-slate-400">28 Aug 2026</span>
            </div>
            <div className="p-2.5 bg-[#F6F8FB] rounded border border-[#E4E9EF] flex justify-between">
              <span>Citizen Grievance Linked</span>
              <span className="font-mono text-slate-400">20 Aug 2026</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigate('admin-investigation');
            }}
            className="px-4 py-2 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-semibold rounded-lg text-xs"
          >
            Deep Investigation Dossier
          </button>
        </div>

      </div>
    </div>
  );
}
