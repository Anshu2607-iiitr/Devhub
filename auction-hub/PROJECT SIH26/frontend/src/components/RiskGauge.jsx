import React from 'react';
import { RISK_SIGNAL_BREAKDOWN } from '../data/mockData';
import { ShieldAlert, Info } from 'lucide-react';

export default function RiskGauge({ averageScore = 72 }) {
  const angle = (averageScore / 100) * 180;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">AI Multi-Signal Risk Gauge</h3>
          <p className="text-xs text-slate-500 mt-0.5">Composite anomaly index across all active monitored projects</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono">
          State Average: {averageScore}/100
        </span>
      </div>

      {/* Semicircle Gauge Visual */}
      <div className="my-6 flex flex-col items-center justify-center relative">
        <svg viewBox="0 0 200 115" className="w-64 h-36">
          <path
            d="M 20 105 A 80 80 0 0 1 180 105"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M 20 105 A 80 80 0 0 1 180 105"
            fill="none"
            stroke="url(#riskGradient)"
            strokeWidth="16"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * (averageScore / 100))}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Label */}
        <div className="absolute top-14 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-slate-900 font-mono">{averageScore}</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AVERAGE RISK</span>
          <span className="text-[10px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full mt-0.5">
            Elevated Attention
          </span>
        </div>
      </div>

      {/* Signal Weights Breakdown Grid */}
      <div>
        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
          Signal Contribution Weights:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          {RISK_SIGNAL_BREAKDOWN.map((sig) => (
            <div key={sig.name} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 truncate">{sig.name}</span>
                <span className="font-mono font-bold" style={{ color: sig.color }}>{sig.percentage}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ width: `${sig.percentage * 2.5}%`, backgroundColor: sig.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
