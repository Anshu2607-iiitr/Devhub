import React from 'react';
import { Link } from 'react-router-dom';
import { useAuction } from '../context/AuctionContext';
import { formatCurrency } from '../utils/currency';
import {
  Users,
  Award,
  DollarSign,
  PieChart,
  ShieldCheck,
  Radio,
  Plus,
  ArrowRight,
  Sparkles,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

export default function AdminDashboard() {
  const { auction, players, teams, soldPlayers, unsoldPlayers, resetAuction } = useAuction();

  const totalPlayers = players.length;
  const soldCount = soldPlayers.length;
  const unsoldCount = unsoldPlayers.length;
  const completedCount = soldCount + unsoldCount;
  const progressPercent = totalPlayers > 0 ? (completedCount / totalPlayers) * 100 : 0;

  const totalSpent = teams.reduce((acc, t) => acc + (t.spentBudget || 0), 0);
  const avgSoldPrice = soldCount > 0 ? Math.round(totalSpent / soldCount) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            Executive Overview
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-wide">
            Admin Analytics Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Tournament: {auction.name} • Season 5
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            to="/admin/auction"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider shadow-glow-gold flex items-center gap-2 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Auction Control Desk</span>
          </Link>
          <Link
            to="/admin/create-auction"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs font-mono uppercase tracking-wider border border-slate-700 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Auction</span>
          </Link>
        </div>
      </div>

      {/* STAT CARDS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="glass-panel rounded-3xl p-4 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-mono font-bold">Total Pool</div>
          <div className="text-2xl font-black text-white font-mono mt-1">{totalPlayers}</div>
        </div>

        <div className="glass-panel rounded-3xl p-4 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-mono font-bold">Sold Players</div>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{soldCount}</div>
        </div>

        <div className="glass-panel rounded-3xl p-4 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-mono font-bold">Unsold Pool</div>
          <div className="text-2xl font-black text-rose-400 font-mono mt-1">{unsoldCount}</div>
        </div>

        <div className="glass-panel rounded-3xl p-4 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-mono font-bold">Total Spent</div>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">{formatCurrency(totalSpent, true)}</div>
        </div>

        <div className="glass-panel rounded-3xl p-4 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-mono font-bold">Avg Price</div>
          <div className="text-2xl font-black text-cyan-400 font-mono mt-1">{formatCurrency(avgSoldPrice, true)}</div>
        </div>

        <div className="glass-panel rounded-3xl p-4 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-mono font-bold">Active Teams</div>
          <div className="text-2xl font-black text-purple-400 font-mono mt-1">{teams.length}</div>
        </div>
      </div>

      {/* AUCTION PROGRESS BAR */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/80">
        <div className="flex justify-between items-center mb-2 font-mono">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase text-slate-200">
              Auction Block Progress
            </span>
          </div>
          <span className="text-xs font-bold text-amber-400">
            {completedCount} / {totalPlayers} Players Auctioned ({progressPercent.toFixed(1)}%)
          </span>
        </div>

        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* RECENT SALES TABLE & QUICK SHORTCUTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Sales Table (8 cols) */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/80">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <h3 className="font-bold text-base text-white font-display uppercase tracking-wide">
              Recent Player Sales Log
            </h3>
            <Link to="/results" className="text-xs font-mono text-amber-400 hover:text-amber-300">
              Full Results →
            </Link>
          </div>

          {soldPlayers.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 font-mono">
              No completed player sales yet in this session.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-800 pb-2">
                    <th className="pb-2">Player</th>
                    <th className="pb-2">Role</th>
                    <th className="pb-2">Purchased By</th>
                    <th className="pb-2 text-right">Sold Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {soldPlayers.slice(0, 6).map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40">
                      <td className="py-3 flex items-center gap-2.5 font-sans">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-700"
                        />
                        <span className="font-bold text-white text-sm">{p.name}</span>
                      </td>
                      <td className="py-3 text-slate-400 font-sans">{p.role}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-sans font-bold">
                          {p.soldToTeamName || 'Franchise'}
                        </span>
                      </td>
                      <td className="py-3 text-right font-bold text-emerald-400 text-sm">
                        {formatCurrency(p.soldPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Administration Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/80 space-y-4">
            <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wider font-mono">
              Session Management
            </h3>

            <div className="space-y-2.5">
              <Link
                to="/players"
                className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs transition-all group"
              >
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>Manage Player Database</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/teams"
                className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs transition-all group"
              >
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>View Franchise Purses & Squads</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={resetAuction}
                className="w-full p-3 rounded-2xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-300 flex items-center justify-between text-xs transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-red-400" />
                  <span>Reset Demo Session to Default</span>
                </div>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
