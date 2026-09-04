import React from 'react';
import { useAuction } from '../context/AuctionContext';
import { formatCurrency } from '../utils/currency';
import { Trophy, Award, Users, DollarSign, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuctionResultsPage() {
  const { auction, players, teams, soldPlayers, unsoldPlayers } = useAuction();

  const totalPlayers = players.length;
  const soldCount = soldPlayers.length;
  const unsoldCount = unsoldPlayers.length;
  const totalMoneySpent = teams.reduce((acc, t) => acc + (t.spentBudget || 0), 0);

  // Top 3 most expensive players sold
  const topBuys = [...soldPlayers].sort((a, b) => (b.soldPrice || 0) - (a.soldPrice || 0)).slice(0, 3);

  // Ranked teams by squad strength/value
  const rankedTeams = [...teams].sort((a, b) => b.spentBudget - a.spentBudget);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
          <Trophy className="w-3.5 h-3.5" />
          <span>OFFICIAL AUCTION RECAP</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight">
          Auction Results & Sales Log
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Tournament: {auction.name} • Final Franchise Squads & Leaderboard
        </p>
      </div>

      {/* SUMMARY STATS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-3xl p-5 border border-slate-800 text-center font-mono">
          <div className="text-xs text-slate-500 uppercase font-bold">Total Players</div>
          <div className="text-3xl font-black text-white mt-1">{totalPlayers}</div>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-slate-800 text-center font-mono">
          <div className="text-xs text-slate-500 uppercase font-bold">Players Sold</div>
          <div className="text-3xl font-black text-emerald-400 mt-1">{soldCount}</div>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-slate-800 text-center font-mono">
          <div className="text-xs text-slate-500 uppercase font-bold">Unsold Pool</div>
          <div className="text-3xl font-black text-rose-400 mt-1">{unsoldCount}</div>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-slate-800 text-center font-mono">
          <div className="text-xs text-slate-500 uppercase font-bold">Total Money Spent</div>
          <div className="text-3xl font-black text-amber-400 mt-1">{formatCurrency(totalMoneySpent, true)}</div>
        </div>
      </div>

      {/* TOP 3 MARQUEE BUYS */}
      {topBuys.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white font-display uppercase tracking-wide">
              Top Marquee Buys of the Auction
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topBuys.map((player, index) => (
              <div
                key={player.id}
                className="glass-panel rounded-3xl p-5 border border-amber-500/30 bg-slate-900/80 relative overflow-hidden flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-display font-black text-xl flex items-center justify-center flex-shrink-0 shadow-glow-gold">
                  #{index + 1}
                </div>
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-14 h-14 rounded-xl object-cover border border-amber-400 flex-shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold uppercase">
                    {player.role}
                  </span>
                  <div className="font-bold text-white text-base truncate font-display uppercase mt-0.5">
                    {player.name}
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-400">
                    {formatCurrency(player.soldPrice)}
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans truncate">
                    {player.soldToTeamName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPLETE PLAYER SALES TABLE */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/80 space-y-4">
        <h2 className="text-xl font-bold text-white font-display uppercase tracking-wide flex items-center gap-2">
          <Award className="w-5 h-5 text-cyan-400" />
          <span>Complete Player Sales Ledger</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-800 pb-3">
                <th className="pb-3">Player</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Base Price</th>
                <th className="pb-3">Winning Franchise</th>
                <th className="pb-3 text-right">Final Hammer Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {soldPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 flex items-center gap-3 font-sans">
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-9 h-9 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <div className="font-bold text-white text-sm">{player.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{player.playingStyle}</div>
                    </div>
                  </td>
                  <td className="py-3 text-slate-300 font-sans">{player.role}</td>
                  <td className="py-3 text-slate-400">{formatCurrency(player.basePrice)}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-white font-sans font-bold border border-slate-700">
                      {player.soldToTeamName || 'Franchise'}
                    </span>
                  </td>
                  <td className="py-3 text-right font-black text-emerald-400 text-sm">
                    {formatCurrency(player.soldPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
