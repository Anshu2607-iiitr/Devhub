import React from 'react';
import { AlertOctagon, ShieldAlert, CheckCircle2, ArrowRight, Eye, AlertTriangle } from 'lucide-react';
import { PRIORITY_RISK_PROJECTS } from '../data/mockData';

export default function RiskQueuePage({ onSelectProject }) {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
            <AlertOctagon className="w-5 h-5" />
            <span>Priority Verification Risk Queue</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked queue of projects with highest multi-vector anomaly scores requiring on-site technical inspection
          </p>
        </div>
        <span className="text-xs font-bold text-red-800 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg font-mono">
          86 Critical / High Flags
        </span>
      </div>

      {/* Triage Cards List */}
      <div className="space-y-4">
        {PRIORITY_RISK_PROJECTS.map((p) => {
          const isCritical = p.risk_score >= 80;
          return (
            <div
              key={p.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-5 shadow-xs space-y-3 transition"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full font-extrabold font-mono text-xs ${
                    isCritical ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    Risk {p.risk_score}/100 • {p.risk_tier}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                    <span className="text-[11px] text-slate-500">{p.id} • {p.ward}, {p.district}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectProject(p)}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Open Full Audit Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid of 3 Signal Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Risk Signals Flagged</span>
                  <ul className="text-slate-800 space-y-0.5 list-disc list-inside">
                    {p.risk_signals.map((sig, i) => (
                      <li key={i} className="text-[11px] font-medium text-red-700">{sig}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Financial vs Progress</span>
                  <div className="flex items-center justify-between font-mono font-semibold">
                    <span>Disbursed: {p.expenditure_pct}%</span>
                    <span className="text-blue-700">Observed: {p.physical_progress}%</span>
                  </div>
                  <div className="text-[10px] text-slate-500 pt-1">
                    Outlay: {p.sanctioned_amount} • Spent: {p.expenditure}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Geospatial Distance Lock</span>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600">Deviation:</span>
                    <span className="font-bold font-mono text-red-700">{p.deviation_km} km</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Reg: {p.registered_gps.lat}N, {p.registered_gps.lng}E
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
