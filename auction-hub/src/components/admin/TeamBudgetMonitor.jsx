import React from 'react';
import { formatCurrency } from '../../utils/currency';
import { Users, DollarSign, PieChart } from 'lucide-react';

export default function TeamBudgetMonitor({ teams = [] }) {
  return (
    <div className="glass-panel rounded-3xl p-5 border border-slate-800 bg-slate-900/80">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <PieChart className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wider font-mono">
            Team Purse & Squad Matrix
          </h3>
        </div>
      </div>

      {/* Grid of Teams */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {teams.map((team) => {
          const slotsLeft = team.squadLimit - team.squad.length;
          const pursePercent = (team.remainingBudget / team.totalBudget) * 100;

          return (
            <div
              key={team.id}
              className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{team.logo}</span>
                  <span className="font-bold text-xs text-white truncate max-w-[120px]">
                    {team.name}
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  slotsLeft === 0
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {slotsLeft === 0 ? 'Full' : `${slotsLeft} slots`}
                </span>
              </div>

              {/* Purse Numbers */}
              <div className="flex justify-between items-baseline mb-1.5 font-mono">
                <span className="text-[11px] text-slate-400">Purse Left:</span>
                <span className="text-sm font-bold text-emerald-400">
                  {formatCurrency(team.remainingBudget, true)}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pursePercent}%`, backgroundColor: team.color || '#10B981' }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-850">
                <span>Squad: <strong className="text-slate-300">{team.squad.length}/{team.squadLimit}</strong></span>
                <span>Spent: {formatCurrency(team.spentBudget, true)}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
