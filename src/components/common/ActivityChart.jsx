import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';

export const ActivityChart = ({ data = [], className = '' }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const maxVal = Math.max(...data.map(d => d.xp || 1), 250);

  return (
    <div className={`glass-card rounded-2xl p-5 border border-white/10 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Learning Activity</h3>
            <p className="text-xs text-slate-400">Challenge & quiz throughput</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-white/5 font-mono">
          <Calendar className="w-3.5 h-3.5 text-purple-400" />
          <span>Last 7 Days</span>
        </div>
      </div>

      <div className="h-44 pt-4 pb-2 flex items-end justify-between gap-2 sm:gap-4 px-2">
        {data.map((item, idx) => {
          const heightPercent = Math.max(12, Math.round((item.xp / maxVal) * 100));
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {isHovered && (
                <div className="absolute -top-12 z-20 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-purple-500/30 text-center shadow-xl pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-xs font-bold text-purple-300 font-mono">+{item.xp} XP</div>
                  <div className="text-[10px] text-slate-400">{item.quizzesTaken} Quizzes ({item.hoursSpent}h)</div>
                </div>
              )}

              <div className="w-full max-w-[36px] bg-slate-800/60 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    isHovered
                      ? 'bg-gradient-to-t from-purple-600 to-cyan-400 shadow-glow-sm'
                      : 'bg-gradient-to-t from-purple-600/70 to-indigo-500/70 group-hover:from-purple-500 group-hover:to-cyan-400'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              <span className={`mt-2 text-xs font-mono transition-colors ${
                isHovered ? 'text-purple-300 font-bold' : 'text-slate-400'
              }`}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-1.5 text-emerald-400">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+24% vs previous week</span>
        </div>
        <div className="font-mono text-slate-400">
          Weekly Total: <span className="text-white font-bold">1,170 XP</span>
        </div>
      </div>
    </div>
  );
};
