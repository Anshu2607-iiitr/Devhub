import React, { useState, useEffect } from 'react';
import { MapPin, AlertOctagon, AlertTriangle, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { fetchDistrictHeatmap } from '../api';

export default function DistrictHeatmap({ onSelectDistrict }) {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDistrictHeatmap()
      .then((data) => setDistricts(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-12 text-center text-slate-400">Loading constituency risk intelligence...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Constituency Risk Overview</h2>
          <p className="text-xs text-slate-400 mt-1">Risk scores and fund utilization by constituency</p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono">
          {districts.length} Constituencies Monitored
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {districts.map((d) => {
          const isCritical = d.average_risk_score >= 55;
          const isWarning = d.average_risk_score >= 38 && !isCritical;

          return (
            <div
              key={d.district}
              onClick={() => onSelectDistrict(d.district)}
              className={`p-4 rounded-xl border transition cursor-pointer shadow-sm flex flex-col justify-between ${
                isCritical
                  ? 'bg-slate-900 border-red-900/60 hover:border-red-600'
                  : isWarning
                  ? 'bg-slate-900 border-amber-900/60 hover:border-amber-600'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {d.state}
                    </span>
                    <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                      <MapPin className={`w-4 h-4 ${isCritical ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-slate-400'}`} />
                      <span>{d.district}</span>
                    </h3>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                    isCritical
                      ? 'bg-red-950 text-red-400 border-red-800'
                      : isWarning
                      ? 'bg-amber-950 text-amber-400 border-amber-800'
                      : 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                  }`}>
                    {d.average_risk_score} Index
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate">MP: {d.mp_name}</span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Monitored Outlay</span>
                    <span className="font-semibold text-slate-200 font-mono">₹{d.total_crores} Cr</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">MoSPI Limit</span>
                    <span className="font-semibold text-amber-400 font-mono">₹{d.allocated_amount_crores || 14.7} Cr</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Utilization</span>
                    <span className="font-semibold text-emerald-400 font-mono">{d.utilization_pct || 0}%</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Critical Flags</span>
                    <span className={`font-bold font-mono ${d.critical_projects > 0 ? 'text-red-400' : 'text-slate-400'}`}>
                      {d.critical_projects}
                    </span>
                  </div>
                </div>

              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-medium">
                <span>Filter Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
