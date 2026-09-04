import React from 'react';
import { Link } from 'react-router-dom';
import { useAuction } from '../context/AuctionContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/currency';
import SquadComposition from '../components/team/SquadComposition';
import LiveIndicator from '../components/common/LiveIndicator';
import {
  Users,
  Award,
  Radio,
  Gavel,
  PieChart,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function TeamDashboard() {
  const { teams, auction, currentPlayer } = useAuction();
  const { managedTeamId, user } = useAuth();

  const activeTeam = teams.find(t => t.id === managedTeamId) || teams[0];
  const squad = activeTeam.squad || [];

  const batsmenCount = squad.filter(p => p.role === 'Batsman').length;
  const bowlersCount = squad.filter(p => p.role === 'Bowler').length;
  const allRoundersCount = squad.filter(p => p.role === 'All-Rounder').length;
  const keeperCount = squad.filter(p => p.role === 'Wicket Keeper').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Franchise Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 bg-slate-950/80 shadow-2xl relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: activeTeam.color }}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-xl border"
              style={{ backgroundColor: activeTeam.color + '25', borderColor: activeTeam.color }}
            >
              {activeTeam.logo}
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                Team Manager Hub
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-white font-display uppercase tracking-wide">
                {activeTeam.name}
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Logged in as Manager: <span className="text-slate-200">{activeTeam.manager}</span>
              </p>
            </div>
          </div>

          <Link
            to={`/live/${auction.id || 'cpl-2026'}`}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm uppercase tracking-wider font-mono shadow-glow-gold flex items-center gap-2 transition-all self-stretch md:self-auto justify-center hover:scale-105"
          >
            <Radio className="w-4 h-4 stroke-[3]" />
            <span>Join Live Auction Arena</span>
          </Link>
        </div>
      </div>

      {/* THREE KEY METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Remaining Purse Card */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/80">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase font-bold mb-2">
            <span>Remaining Purse</span>
            <PieChart className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            {formatCurrency(activeTeam.remainingBudget)}
          </div>
          <div className="flex justify-between text-xs font-mono text-slate-400 mt-3 pt-3 border-t border-slate-800">
            <span>Spent: {formatCurrency(activeTeam.spentBudget, true)}</span>
            <span>Purse: {formatCurrency(activeTeam.totalBudget, true)}</span>
          </div>
        </div>

        {/* Squad Fill Card */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/80">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase font-bold mb-2">
            <span>Squad Roster</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {squad.length} / {activeTeam.squadLimit}
          </div>
          <div className="flex justify-between text-xs font-mono text-slate-400 mt-3 pt-3 border-t border-slate-800">
            <span>Slots Left: <strong className="text-white">{activeTeam.squadLimit - squad.length}</strong></span>
            <span>Min Req: {activeTeam.minSquad}</span>
          </div>
        </div>

        {/* Live Block Snapshot Card */}
        <div className="glass-panel rounded-3xl p-6 border border-amber-500/30 bg-slate-900/80">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase font-bold mb-2">
            <span>Live on Block</span>
            <LiveIndicator size="sm" text="LIVE" />
          </div>
          <div className="flex items-center gap-3">
            <img
              src={currentPlayer?.image}
              alt={currentPlayer?.name}
              className="w-12 h-12 rounded-xl object-cover border border-amber-400"
            />
            <div className="min-w-0">
              <div className="text-sm font-bold text-white truncate uppercase font-display">
                {currentPlayer?.name}
              </div>
              <div className="text-xs font-mono text-amber-400 font-bold">
                Bid: {formatCurrency(auction.currentBid || currentPlayer?.basePrice)}
              </div>
            </div>
          </div>
          <Link
            to={`/live/${auction.id || 'cpl-2026'}`}
            className="text-xs font-mono text-amber-400 hover:text-amber-300 font-bold mt-3 block text-right"
          >
            Place Bid Now →
          </Link>
        </div>

      </div>

      {/* SQUAD COMPOSITION QUOTA SUMMARY */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/80 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white font-display uppercase tracking-wide">
              Squad Quotas & Composition
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Target requirements for team balance
            </p>
          </div>
          <Link to="/team/squad" className="text-xs font-mono text-cyan-400 hover:text-cyan-300">
            Full Squad Page →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center font-mono">
            <div className="text-xs text-blue-400 uppercase font-bold">Batsmen</div>
            <div className="text-2xl font-bold text-white mt-1">{batsmenCount} / 5</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center font-mono">
            <div className="text-xs text-emerald-400 uppercase font-bold">Bowlers</div>
            <div className="text-2xl font-bold text-white mt-1">{bowlersCount} / 5</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center font-mono">
            <div className="text-xs text-amber-400 uppercase font-bold">All-Rounders</div>
            <div className="text-2xl font-bold text-white mt-1">{allRoundersCount} / 3</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center font-mono">
            <div className="text-xs text-purple-400 uppercase font-bold">Keepers</div>
            <div className="text-2xl font-bold text-white mt-1">{keeperCount} / 2</div>
          </div>
        </div>

        <SquadComposition squad={squad} squadLimit={activeTeam.squadLimit} />
      </div>

    </div>
  );
}
