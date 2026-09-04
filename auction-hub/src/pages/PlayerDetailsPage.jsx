import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuction } from '../context/AuctionContext';
import { formatCurrency } from '../utils/currency';
import PlayerStatsRadar from '../components/player/PlayerStatsRadar';
import {
  ArrowLeft,
  Gavel,
  Award,
  Sparkles,
  Shield,
  Activity,
  User,
  Radio,
  Share2
} from 'lucide-react';

export default function PlayerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { players, auction } = useAuction();

  const player = players.find(p => p.id === id) || players[0];

  if (!player) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-400">
        <p>Player not found.</p>
        <Link to="/players" className="text-amber-400 mt-4 inline-block font-mono">
          ← Return to Player Catalog
        </Link>
      </div>
    );
  }

  const roleColors = {
    'Batsman': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Bowler': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'All-Rounder': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Wicket Keeper': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  };

  const statusColors = {
    'LIVE': 'bg-red-500 text-white shadow-glow-red animate-pulse',
    'UPCOMING': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40',
    'SOLD': 'bg-emerald-500 text-slate-950 font-bold',
    'UNSOLD': 'bg-slate-800 text-slate-400 border border-slate-700',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Players</span>
      </button>

      {/* Main Profile Header Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/80 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          
          {/* Portrait */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-glow-gold bg-slate-950 flex-shrink-0 relative">
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-3 right-3">
              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${statusColors[player.status] || 'bg-slate-800'}`}>
                {player.status === 'LIVE' ? '🔴 LIVE AUCTION' : player.status}
              </span>
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${roleColors[player.role] || 'bg-slate-800'}`}>
                {player.role}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                {player.category || 'Marquee'}
              </span>
              {player.nickname && (
                <span className="px-3 py-1 rounded-full text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 italic">
                  "{player.nickname}"
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white font-display uppercase tracking-tight">
              {player.name}
            </h1>

            <p className="text-sm text-slate-300 font-mono">
              {player.playingStyle} • {player.state}, {player.country} ({player.age} Years)
            </p>

            {player.bio && (
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl pt-1">
                {player.bio}
              </p>
            )}

            {/* Live CTA button if active */}
            {player.status === 'LIVE' && (
              <div className="pt-2">
                <Link
                  to={`/live/${auction.id || 'cpl-2026'}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider shadow-glow-gold transition-all"
                >
                  <Radio className="w-4 h-4 stroke-[3]" />
                  <span>Join Live Bidding For This Player</span>
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* DETAILED STATS & AUCTION METRICS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Auction Financial Breakdown (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/80 space-y-4">
            <h3 className="font-bold text-base text-white font-display uppercase tracking-wide flex items-center gap-2">
              <Gavel className="w-4 h-4 text-amber-400" />
              <span>Auction Financials</span>
            </h3>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-850 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 uppercase font-semibold">Base Price:</span>
                <span className="text-base font-bold text-amber-400 font-mono">
                  {formatCurrency(player.basePrice)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-850">
                <span className="text-slate-400 uppercase font-semibold">Status:</span>
                <span className={`px-2 py-0.5 rounded font-bold uppercase ${statusColors[player.status] || 'bg-slate-800'}`}>
                  {player.status}
                </span>
              </div>

              {player.status === 'SOLD' && (
                <>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-850">
                    <span className="text-slate-400 uppercase font-semibold">Sold Price:</span>
                    <span className="text-lg font-black text-emerald-400">
                      {formatCurrency(player.soldPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-850">
                    <span className="text-slate-400 uppercase font-semibold">Franchise:</span>
                    <span className="font-bold text-white font-sans">
                      {player.soldToTeamName || 'Franchise'}
                    </span>
                  </div>
                </>
              )}
            </div>

            {player.previousTeams && (
              <div className="text-xs text-slate-400 font-mono">
                <span className="text-slate-500 uppercase block mb-1">Previous Franchises:</span>
                <span className="text-slate-300 font-medium">{player.previousTeams.join(', ')}</span>
              </div>
            )}
          </div>

          {/* Skill Radar Evaluation */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/80 space-y-4">
            <h3 className="font-bold text-base text-white font-display uppercase tracking-wide flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Skill Ratings (100 Max)</span>
            </h3>
            <PlayerStatsRadar skillRadar={player.skillRadar} />
          </div>
        </div>

        {/* Right Column: Career Statistics (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/80 space-y-6">
            <h3 className="font-bold text-xl text-white font-display uppercase tracking-wide flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Career Performance Statistics</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-850 text-center font-mono">
                <div className="text-xs text-slate-500 uppercase font-bold">Matches Played</div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {player.statistics.matches}
                </div>
              </div>

              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-850 text-center font-mono">
                <div className="text-xs text-slate-500 uppercase font-bold">Total Runs</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
                  {player.statistics.runs.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-850 text-center font-mono">
                <div className="text-xs text-slate-500 uppercase font-bold">Total Wickets</div>
                <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">
                  {player.statistics.wickets}
                </div>
              </div>

              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-850 text-center font-mono">
                <div className="text-xs text-slate-500 uppercase font-bold">Batting Avg</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-200 mt-1">
                  {player.statistics.battingAverage || '34.5'}
                </div>
              </div>

              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-850 text-center font-mono">
                <div className="text-xs text-slate-500 uppercase font-bold">Strike Rate</div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                  {player.statistics.strikeRate}
                </div>
              </div>

              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-850 text-center font-mono">
                <div className="text-xs text-slate-500 uppercase font-bold">Bowling Econ</div>
                <div className="text-2xl sm:text-3xl font-black text-purple-400 mt-1">
                  {player.statistics.economy || '7.2'}
                </div>
              </div>

              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-850 text-center font-mono">
                <div className="text-xs text-slate-500 uppercase font-bold">High Score</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-200 mt-1">
                  {player.statistics.highScore}
                </div>
              </div>

              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-850 text-center font-mono">
                <div className="text-xs text-slate-500 uppercase font-bold">Best Bowling</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-200 mt-1">
                  {player.statistics.bestBowling}
                </div>
              </div>

              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-850 text-center font-mono">
                <div className="text-xs text-slate-500 uppercase font-bold">Catches / Dismissals</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-200 mt-1">
                  {player.statistics.catches}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
