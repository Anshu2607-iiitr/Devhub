import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, Search, ArrowRight, 
  MapPin, ShieldCheck, AlertCircle, FileText 
} from 'lucide-react';
import GovernancePrincipleBanner from '../../components/GovernancePrincipleBanner';

export default function ComplaintTrackerPage({ onNavigate }) {
  const [complaintId, setComplaintId] = useState('GRV-JH-2026-9812');

  const stages = [
    { name: 'Submitted', date: '20 Aug 2026', done: true },
    { name: 'AI Classified', date: '20 Aug 2026', done: true },
    { name: 'Gov Review', date: '22 Aug 2026', done: true },
    { name: 'Inspected', date: '28 Aug 2026', done: true },
    { name: 'Findings Logged', date: '29 Aug 2026', done: true, current: true },
    { name: 'Resolved', date: 'Pending', done: false },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#168A78] font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Complaint Lifecycle Tracker</span>
          </div>
          <h1 className="text-base font-bold text-[#0F2942] mt-0.5">
            Transparent Statutory Grievance Resolution Progression
          </h1>
        </div>

        <button
          onClick={() => onNavigate('citizen-report')}
          className="px-4 py-2 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-bold rounded-lg text-xs transition shadow-2xs"
        >
          File New Grievance
        </button>
      </div>

      <GovernancePrincipleBanner />

      {/* Tracker Card */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-6 shadow-2xs space-y-6">
        
        {/* Top Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">TRACKING ID</span>
            <h2 className="text-lg font-extrabold text-[#0F2942] font-mono mt-0.5">{complaintId}</h2>
            <span className="text-xs text-slate-500">Namkum Rural Road Upgrade (MPLAD-JH-2026-089)</span>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FEF9EE] text-[#C58A2B] border border-[#FDE8B3]">
            Inspection Findings Under Technical Review
          </span>
        </div>

        {/* 6-Stage Visual Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {stages.map((stg, i) => (
            <div 
              key={stg.name}
              className={`p-3 rounded-xl border text-center space-y-1 transition ${
                stg.done && !stg.current ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]' :
                stg.current ? 'bg-[#EBF3FA] border-[#1D5D9B] text-[#123B67] font-bold ring-1 ring-[#1D5D9B]' :
                'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-center">
                {stg.done && !stg.current ? <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> :
                 stg.current ? <Clock className="w-4 h-4 text-[#1D5D9B] animate-pulse" /> :
                 <Clock className="w-4 h-4 text-slate-300" />}
              </div>
              <span className="font-bold block text-xs">{stg.name}</span>
              <span className="text-[10px] text-slate-400 font-mono block">{stg.date}</span>
            </div>
          ))}
        </div>

        {/* Inspection Report Summary */}
        <div className="p-4 bg-[#F6F8FB] border border-[#E4E9EF] rounded-xl text-xs space-y-2">
          <span className="font-bold text-[#0F2942] uppercase text-[10px] block">Field Inspection Findings</span>
          <p className="text-slate-700 leading-relaxed">
            Assistant Engineer inspection conducted on 28 Aug 2026 confirmed: Subgrade gravel laid partially (42% physical progress). Dense bitumen blacktopping not executed. Notice served to executing contractor to remedy within 15 days.
          </p>
        </div>

      </div>

    </div>
  );
}
