import React from 'react';
import { useAuction } from '../../context/AuctionContext';
import { Bot, Play, Pause, Sparkles } from 'lucide-react';

export default function AutoBidSimulator() {
  const { autoSimulation, setAutoSimulation, auction } = useAuction();

  return (
    <div className="glass-panel rounded-2xl p-3 border border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2.5">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
          autoSimulation ? 'bg-amber-500/20 text-amber-400 animate-pulse' : 'bg-slate-800 text-slate-500'
        }`}>
          <Bot className="w-4 h-4" />
        </div>
        <div>
          <div className="font-bold text-slate-200 flex items-center gap-1.5 font-mono">
            <span>Rival AI Bidding</span>
            {autoSimulation && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-bold uppercase">
                Active
              </span>
            )}
          </div>
          <div className="text-[10px] text-slate-400">
            {autoSimulation ? 'Simulating competitor team bids' : 'Enable auto-bidding simulation'}
          </div>
        </div>
      </div>

      <button
        onClick={() => setAutoSimulation(!autoSimulation)}
        className={`px-3 py-1.5 rounded-xl font-bold font-mono text-xs transition-all flex items-center gap-1.5 ${
          autoSimulation
            ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 hover:bg-amber-500/30'
            : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-750 hover:text-white'
        }`}
      >
        {autoSimulation ? (
          <>
            <Pause className="w-3.5 h-3.5" />
            <span>Stop AI</span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5" />
            <span>Start AI</span>
          </>
        )}
      </button>
    </div>
  );
}
