import React, { useState } from 'react';
import { 
  CheckCircle2, Search, Clock, AlertTriangle, 
  MapPin, ShieldCheck, ArrowRight, UserCheck, FileText 
} from 'lucide-react';
import { CITIZEN_COMPLAINTS_LIST } from '../../data/mockData';

export default function ComplaintTrackerPage({ onNavigate }) {
  const [searchId, setSearchId] = useState('GRV-JH-2026-9812');
  const complaint = CITIZEN_COMPLAINTS_LIST[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-800 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Screen 15: Citizen Grievance Lifecycle Tracker</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            Transparent Step-by-Step Public Resolution Pipeline
          </h2>
        </div>

        <button
          onClick={() => onNavigate('citizen-report')}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs"
        >
          Submit Another Grievance
        </button>
      </div>

      {/* Search by Grievance ID */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Enter Grievance Tracking ID (e.g. GRV-JH-2026-9812)..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono font-bold focus:outline-none focus:border-purple-600 focus:bg-white"
          />
        </div>
        <button
          onClick={() => alert(`Found verified complaint: ${searchId}`)}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg text-xs shadow-2xs"
        >
          Track Status
        </button>
      </div>

      {/* Active Complaint Dossier */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                {complaint.complaint_id}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Submitted: {complaint.date_submitted}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">{complaint.project_name}</h3>
            <span className="text-xs text-slate-500">{complaint.location}</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Status</span>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 inline-block mt-0.5">
              {complaint.status}
            </span>
          </div>
        </div>

        {/* 6-Stage Lifecycle Progress Tracker */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            Grievance Lifecycle Progression:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
            {['1. Submitted', '2. AI Classified', '3. Gov Review', '4. Inspection', '5. Findings', '6. Resolved'].map((step, idx) => {
              const isPassed = idx + 1 <= complaint.status_step;
              const isCurrent = idx + 1 === complaint.status_step;
              return (
                <div 
                  key={idx} 
                  className={`p-2 rounded-lg border text-[11px] font-bold ${
                    isCurrent ? 'bg-amber-50 border-amber-300 text-amber-900 ring-2 ring-amber-200' :
                    isPassed ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <span className="block">{step}</span>
                  <span className="text-[9px] font-normal block mt-0.5">
                    {isCurrent ? 'Active Now' : isPassed ? 'Completed' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* History Log Timeline */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
          <span className="font-bold text-slate-800 block">Verified Progress Timeline:</span>
          <div className="space-y-2.5">
            {complaint.history.map((h, i) => (
              <div key={i} className="flex items-start gap-3 p-2 bg-white rounded border border-slate-200/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900">{h.step}</strong>
                    <span className="text-[10px] text-slate-400 font-mono">({h.date})</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{h.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
