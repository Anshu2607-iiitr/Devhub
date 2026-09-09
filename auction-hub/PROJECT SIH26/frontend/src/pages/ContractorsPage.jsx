import React from 'react';
import { Building2, AlertTriangle, CheckCircle2, ShieldCheck, TrendingUp, Clock } from 'lucide-react';
import { CONTRACTORS_DATA } from '../data/mockData';

export default function ContractorsPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <Building2 className="w-5 h-5 text-blue-700" />
            <span>Contractor Performance & Historical Anomaly Profiles</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-tracked contractor execution benchmarks, completion rates, and repeated risk signals
          </p>
        </div>
        <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 font-semibold">
          AI Principle: Do NOT auto-blacklist solely on AI score
        </div>
      </div>

      {/* Contractor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CONTRACTORS_DATA.map((c) => (
          <div key={c.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 font-mono">{c.id} • {c.reg_id}</span>
                <h3 className="text-base font-bold text-slate-900">{c.name}</h3>
                <span className="text-xs text-slate-500">Operating District: {c.district}</span>
              </div>
              <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                c.risk_status.includes('Flagged') ? 'bg-red-50 text-red-800 border border-red-200' :
                c.risk_status.includes('Verification') ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                {c.risk_status}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Active / Done</span>
                <span className="font-bold text-slate-900">{c.active_projects} / {c.completed_projects}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Avg Delay</span>
                <span className="font-bold text-amber-800 font-mono">+{c.avg_delay_days} days</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Completion Rate</span>
                <span className="font-bold text-blue-700 font-mono">{c.completion_rate}%</span>
              </div>
            </div>

            {/* Anomaly Patterns */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Repeated Anomaly Patterns:</span>
              <ul className="text-slate-700 space-y-0.5 list-disc list-inside">
                {c.anomaly_patterns.map((anom, i) => (
                  <li key={i} className="text-[11px]">{anom}</li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
