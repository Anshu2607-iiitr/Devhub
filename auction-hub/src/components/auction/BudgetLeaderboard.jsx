import React from 'react';
import { formatCurrency } from '../../utils/currency';
import { Users, TrendingDown, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BudgetLeaderboard({ teams = [], leadingTeamId = null }) {
  // Sort teams by remaining budget descending
  const sortedTeams = [...teams].sort((a, b) => b.remainingBudget - a.remainingBudget);

  return (
    <div className="glass-panel rounded-3xl p-5 border border-slate-800 bg-slate-900/80">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wider font-mono">
            Team Purses
          </h3>
        </div>
        <Link to="/teams" className="text-xs text-amber-400 hover:text-amber-300 font-mono">
          All Teams →
        </Link>
      </div>

      {/* Team List */}
      <div className="space-y-3">
        {sortedTeams.map((team, index) => {
          const isLeading = team.id === leadingTeamId;
          const pursePercent = (team.remainingBudget / team.totalBudget) * 100;
          const spentPercent = (team.spentBudget / team.totalBudget) * 100;

          return (
            <div
              key={team.id}
              className={`p-3 rounded-2xl border transition-all ${
                isLeading
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-glow-gold'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    #{index + 1}
                  </span>
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                    style={{ backgroundColor: team.color + '25', color: team.color }}
                  >
                    {team.logo}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white">
                      {team.name}
                    </span>
                    {isLeading && (
                      <span className="ml-1.5 text-[9px] px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-extrabold uppercase font-mono">
                        Leading
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold font-mono text-emerald-400">
                    {formatCurrency(team.remainingBudget, true)}
                  </div>
                </div>
              </div>

              {/* Progress Bar of Budget Utilization */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-slate-600"
                  style={{ width: `${spentPercent}%` }}
                  title={`Spent: ${formatCurrency(team.spentBudget)}`}
                />
                <div
                  className="h-full"
                  style={{ width: `${pursePercent}%`, backgroundColor: team.color || '#10B981' }}
                  title={`Remaining: ${formatCurrency(team.remainingBudget)}`}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-1">
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
