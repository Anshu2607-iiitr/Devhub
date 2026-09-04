import React from 'react';
import { formatCurrency } from '../../utils/currency';
import { Activity, Clock, Flame, Zap } from 'lucide-react';

export default function LiveBidStream({ bidHistory = [] }) {
  return (
    <div className="glass-panel rounded-3xl p-5 border border-slate-800 bg-slate-900/80 flex flex-col h-[340px]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
          <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wider font-mono">
            Live Bid Stream
          </h3>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
          {bidHistory.length} {bidHistory.length === 1 ? 'Bid' : 'Bids'}
        </span>
      </div>

      {/* Scrollable Bid List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1.5 custom-scrollbar">
        {bidHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 text-xs">
            <Zap className="w-8 h-8 text-slate-600 mb-2 stroke-[1.5]" />
            <p>No bids placed yet for this player.</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Bids will stream in real-time as franchises compete.</p>
          </div>
        ) : (
          bidHistory.map((bid, index) => {
            const isLatest = index === 0;
            return (
              <div
                key={bid.id || index}
                className={`p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                  isLatest
                    ? 'bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border-amber-500/40 shadow-glow-gold'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shadow"
                    style={{ backgroundColor: (bid.teamColor || '#F59E0B') + '25', color: bid.teamColor || '#F59E0B' }}
                  >
                    {isLatest ? '⚡' : '🏷️'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white font-display tracking-wide">
                        {bid.teamName}
                      </span>
                      {isLatest && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-mono">
                          LEADING
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{bid.timestamp}</span>
                      {bid.badge && (
                        <span className="text-amber-400/90 font-medium">({bid.badge})</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-mono font-bold text-base sm:text-lg ${
                    isLatest ? 'text-amber-400 font-extrabold' : 'text-slate-200'
                  }`}>
                    {formatCurrency(bid.amount)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
