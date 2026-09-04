import React from 'react';
import { Zap, ChevronRight } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

export const XPCard = ({ totalXp = 850, level = 4, levelTitle = "Code Architect", className = '' }) => {
  const currentLevelFloor = (level - 1) * 250;
  const nextLevelCeil = level * 250;
  const currentXpInLevel = totalXp - currentLevelFloor;
  const xpNeeded = 250;

  return (
    <div className={`glass-card rounded-2xl p-5 border border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-slate-900/50 to-slate-950/80 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Zap className="w-5 h-5 fill-purple-400" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-300">Level {level}</div>
            <div className="text-lg font-bold text-white">{levelTitle}</div>
          </div>
        </div>

        <div className="text-right font-mono">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            {totalXp.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Total XP</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
          <span>Level Progress</span>
          <span className="font-mono text-purple-300">{currentXpInLevel} / {xpNeeded} XP</span>
        </div>
        <ProgressBar value={currentXpInLevel} max={xpNeeded} color="purple" size="md" />
        <div className="mt-2 flex justify-between items-center text-[11px] text-slate-400">
          <span>{nextLevelCeil - totalXp} XP to Level {level + 1}</span>
          <span className="text-purple-400 flex items-center hover:underline cursor-pointer">
            Rewards <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
