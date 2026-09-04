import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/currency';
import { Users, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';

export default function TeamCard({ team }) {
  const pursePercent = (team.remainingBudget / team.totalBudget) * 100;
  const spentPercent = (team.spentBudget / team.totalBudget) * 100;

  return (
    <Link
      to={`/teams/${team.id}`}
      className="glass-panel rounded-3xl p-6 border border-slate-800 hover:border-cyan-500/50 hover:shadow-glow-cyan transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Top Brand Stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300"
        style={{ backgroundColor: team.color }}
      />

      <div>
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/10 group-hover:scale-110 transition-transform"
            style={{ backgroundColor: team.color + '20', borderColor: team.color }}
          >
            {team.logo}
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
              {team.shortName} FRANCHISE
            </div>
            <h3 className="font-bold text-xl text-white font-display uppercase tracking-wide group-hover:text-cyan-400 transition-colors">
              {team.name}
            </h3>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Manager: <span className="text-slate-200">{team.manager}</span>
            </div>
          </div>
        </div>

        {/* Budget Metric Box */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-850 mb-4 space-y-2.5">
          <div className="flex justify-between items-baseline font-mono text-xs">
            <span className="text-slate-400 uppercase">Purse Left</span>
            <span className="text-base font-bold text-emerald-400 font-mono">
              {formatCurrency(team.remainingBudget)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-slate-600"
              style={{ width: `${spentPercent}%` }}
            />
            <div
              className="h-full"
              style={{ width: `${pursePercent}%`, backgroundColor: team.color || '#10B981' }}
            />
          </div>

          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>Spent: {formatCurrency(team.spentBudget, true)}</span>
            <span>Total: {formatCurrency(team.totalBudget, true)}</span>
          </div>
        </div>

        {/* Squad Counter */}
        <div className="flex items-center justify-between text-xs font-mono px-1 text-slate-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Squad: <strong className="text-white">{team.squad.length} / {team.squadLimit}</strong></span>
          </div>
          <span className="text-slate-500">{team.bidsCount || 0} Bids Placed</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t border-slate-850 flex items-center justify-between text-xs text-slate-400 font-semibold group-hover:text-cyan-400 transition-colors">
        <span>View Full Squad & Analytics</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>

    </Link>
  );
}
