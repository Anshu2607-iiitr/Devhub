import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

export const StreakCard = ({ streak = 7, className = '' }) => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const activeDays = 6;

  return (
    <div className={`glass-card rounded-2xl p-5 border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-slate-900/50 to-slate-950/80 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Flame className="w-5 h-5 fill-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">Streak Multiplier</div>
            <div className="text-xl font-bold font-mono text-white flex items-center gap-1.5">
              {streak} Days
              <span className="text-xs font-normal text-amber-400 font-sans">On Fire!</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3 h-3 mr-1" />
            +15% XP Boost
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5">
        <div className="flex justify-between items-center text-xs">
          {days.map((day, idx) => {
            const isActive = idx <= activeDays;
            const isToday = idx === activeDays;
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    isToday
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 scale-110'
                      : isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-800 text-slate-500 border border-white/5'
                  }`}
                >
                  {day}
                </div>
                <span className={`text-[10px] ${isToday ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                  {isToday ? 'Today' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
