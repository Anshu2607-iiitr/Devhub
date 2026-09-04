import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuction } from '../context/AuctionContext';
import { formatCurrency } from '../utils/currency';
import SquadComposition from '../components/team/SquadComposition';
import { ArrowLeft, Users, DollarSign, Award, Radio, Shield, TrendingUp } from 'lucide-react';

export default function TeamDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { teams, auction } = useAuction();

  const team = teams.find(t => t.id === id) || teams[0];

  if (!team) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-400">
        <p>Team not found.</p>
        <Link to="/teams" className="text-amber-400 mt-4 inline-block font-mono">
          ← Return to Teams Overview
        </Link>
      </div>
    );
  }

  const pursePercent = (team.remainingBudget / team.totalBudget) * 100;
  const spentPercent = (team.spentBudget / team.totalBudget) * 100;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Teams</span>
      </button>

      {/* Main Franchise Header Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/80 shadow-2xl relative overflow-hidden">
        
        {/* Brand Top Bar */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{ backgroundColor: team.color }}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center text-4xl sm:text-5xl shadow-2xl border-2"
              style={{ backgroundColor: team.color + '20', borderColor: team.color }}
            >
              {team.logo}
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                {team.shortName} FRANCHISE
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display uppercase tracking-wide">
                {team.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
                Franchise Manager: <span className="text-white font-semibold">{team.manager}</span>
              </p>
            </div>
          </div>

          <Link
            to={`/live/${auction.id || 'cpl-2026'}`}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono shadow-glow-gold flex items-center gap-2 transition-all self-stretch md:self-auto justify-center"
          >
            <Radio className="w-4 h-4 stroke-[3]" />
            <span>Watch Live Auction</span>
          </Link>
        </div>

        {/* Financial Overview Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800 font-mono">
          <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-850">
            <div className="text-xs text-slate-500 uppercase font-bold">Total Purse Assigned</div>
            <div className="text-2xl font-black text-white mt-1">
              {formatCurrency(team.totalBudget)}
            </div>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-850">
            <div className="text-xs text-slate-500 uppercase font-bold">Remaining Available Purse</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {formatCurrency(team.remainingBudget)}
            </div>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-850">
            <div className="text-xs text-slate-500 uppercase font-bold">Spent on Squad</div>
            <div className="text-2xl font-black text-amber-400 mt-1">
              {formatCurrency(team.spentBudget)}
            </div>
          </div>
        </div>

        {/* Progress Bar of Budget */}
        <div className="mt-4">
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
            <span>Spent ({spentPercent.toFixed(1)}%)</span>
            <span className="text-emerald-400">Remaining ({pursePercent.toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 flex">
            <div className="h-full bg-slate-600" style={{ width: `${spentPercent}%` }} />
            <div className="h-full" style={{ width: `${pursePercent}%`, backgroundColor: team.color }} />
          </div>
        </div>

      </div>

      {/* SQUAD COMPOSITION SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white font-display uppercase tracking-wide flex items-center gap-2">
              <Users className="w-6 h-6 text-cyan-400" />
              <span>Purchased Squad Roster ({team.squad.length} / {team.squadLimit})</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Categorized squad breakdown with position allocations
            </p>
          </div>
        </div>

        <SquadComposition squad={team.squad} squadLimit={team.squadLimit} />
      </div>

    </div>
  );
}
