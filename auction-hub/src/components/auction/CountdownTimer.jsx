import React from 'react';
import { Timer, AlertTriangle } from 'lucide-react';

export default function CountdownTimer({ secondsRemaining, totalSeconds = 25, isPaused = false }) {
  const isUrgent = secondsRemaining <= 8 && secondsRemaining > 0;
  const isCritical = secondsRemaining <= 4 && secondsRemaining > 0;
  const progressPercent = Math.max(0, Math.min(100, (secondsRemaining / totalSeconds) * 100));

  // Format mm:ss
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const getUrgencyMessage = () => {
    if (isPaused) return 'AUCTION PAUSED';
    if (secondsRemaining === 0) return 'HAMMER DOWN!';
    if (secondsRemaining <= 4) return '⚡ FINAL CALL!';
    if (secondsRemaining <= 8) return 'GOING TWICE...';
    if (secondsRemaining <= 14) return 'GOING ONCE...';
    return 'BIDDING OPEN';
  };

  return (
    <div className={`glass-panel rounded-3xl p-5 border transition-all duration-300 relative overflow-hidden text-center ${
      isCritical
        ? 'border-red-500 bg-red-950/40 shadow-glow-red animate-pulse'
        : isUrgent
        ? 'border-amber-500/80 bg-amber-950/25 shadow-glow-gold'
        : 'border-slate-800 bg-slate-900/80'
    }`}>
      
      {/* Top status indicator */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <Timer className={`w-4 h-4 ${isCritical ? 'text-red-400 animate-spin' : isUrgent ? 'text-amber-400' : 'text-slate-400'}`} />
        <span className={`text-xs font-mono font-bold tracking-widest uppercase ${
          isCritical ? 'text-red-400 animate-bounce' : isUrgent ? 'text-amber-300' : 'text-slate-400'
        }`}>
          {getUrgencyMessage()}
        </span>
      </div>

      {/* Large Digital Clock */}
      <div className={`font-mono font-black text-4xl sm:text-5xl md:text-6xl tracking-tight transition-all duration-200 ${
        isCritical
          ? 'text-red-400 drop-shadow-[0_0_20px_#ef4444]'
          : isUrgent
          ? 'text-amber-400 drop-shadow-[0_0_15px_#f59e0b]'
          : 'text-white'
      }`}>
        {formattedTime}
      </div>

      {/* Dynamic Progress Bar */}
      <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden mt-3 p-0.5 border border-slate-700/50">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isCritical
              ? 'bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_10px_#ef4444]'
              : isUrgent
              ? 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_8px_#f59e0b]'
              : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-1.5 px-1">
        <span>00:00</span>
        <span>{totalSeconds}s clock</span>
      </div>

    </div>
  );
}
