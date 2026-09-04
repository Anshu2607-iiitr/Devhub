import React from 'react';
import { formatCurrency, getNextMinIncrement } from '../../utils/currency';
import { Trophy, TrendingUp, Zap, Flame } from 'lucide-react';

export default function BidArea({ currentBid, leadingTeam, basePrice, bidFlash }) {
  const nextMinIncrement = getNextMinIncrement(currentBid || basePrice);
  const nextMinBid = (currentBid || basePrice) + nextMinIncrement;

  return (
    <div className={`glass-panel rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden ${
      bidFlash
        ? 'border-amber-400 bg-amber-950/30 shadow-[0_0_40px_rgba(245,158,11,0.4)] scale-[1.01]'
        : 'border-slate-700/80 bg-slate-900/90 shadow-2xl'
    }`}>
      
      {/* Background glow strip */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
        style={{ backgroundColor: leadingTeam ? leadingTeam.color : '#F59E0B' }}
      />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Giant Current Bid */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase font-mono font-bold text-slate-400 tracking-wider mb-1">
            <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Current Highest Bid</span>
          </div>

          <div className={`text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-white transition-transform ${
            bidFlash ? 'text-amber-300 scale-105' : ''
          }`}>
            {formatCurrency(currentBid || basePrice)}
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-xs text-slate-400 font-mono">
            <span className="text-slate-500">Next Minimum Bid:</span>
            <span className="text-emerald-400 font-bold">{formatCurrency(nextMinBid)}</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">
              (+{formatCurrency(nextMinIncrement, true)})
            </span>
          </div>
        </div>

        {/* Right: Leading Franchise Card */}
        <div className="w-full md:w-auto flex-shrink-0">
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 min-w-[260px] shadow-inner">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Leading Franchise</span>
            </div>

            {leadingTeam ? (
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg border border-white/10"
                  style={{ backgroundColor: leadingTeam.color + '25', borderColor: leadingTeam.color }}
                >
                  <span>{leadingTeam.logo}</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-white font-display uppercase tracking-wide flex items-center gap-1.5">
                    {leadingTeam.name}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Purse left: <span className="text-emerald-400 font-bold">{formatCurrency(leadingTeam.remainingBudget, true)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 py-1">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500">
                  <Zap className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-400">Bidding Opening</div>
                  <div className="text-xs text-slate-500">Awaiting first franchise bid</div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
