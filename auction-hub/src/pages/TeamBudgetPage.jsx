import React from 'react';
import { useAuction } from '../context/AuctionContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/currency';
import { DollarSign, PieChart, ShieldCheck, TrendingDown } from 'lucide-react';

export default function TeamBudgetPage() {
  const { teams } = useAuction();
  const { managedTeamId } = useAuth();

  const activeTeam = teams.find(t => t.id === managedTeamId) || teams[0];
  const pursePercent = (activeTeam.remainingBudget / activeTeam.totalBudget) * 100;
  const spentPercent = (activeTeam.spentBudget / activeTeam.totalBudget) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <div>
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          {activeTeam.name} Financials
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-wide">
          Purse & Expenditure Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
          Detailed breakdown of assigned team salary cap and utilization
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/80 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-slate-500 uppercase font-bold">Total Budget Cap</div>
            <div className="text-2xl font-black text-white mt-1">
              {formatCurrency(activeTeam.totalBudget)}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-slate-500 uppercase font-bold">Remaining Available</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {formatCurrency(activeTeam.remainingBudget)}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-slate-500 uppercase font-bold">Total Spent</div>
            <div className="text-2xl font-black text-amber-400 mt-1">
              {formatCurrency(activeTeam.spentBudget)}
            </div>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div>
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Spent ({spentPercent.toFixed(1)}%)</span>
            <span className="text-emerald-400">Available ({pursePercent.toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden border border-slate-800 flex">
            <div className="h-full bg-slate-600" style={{ width: `${spentPercent}%` }} />
            <div className="h-full bg-emerald-500" style={{ width: `${pursePercent}%` }} />
          </div>
        </div>
      </div>

    </div>
  );
}
