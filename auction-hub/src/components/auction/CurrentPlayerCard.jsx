import React from 'react';
import { Shield, Zap, Target, Activity, Award, User, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

export default function CurrentPlayerCard({ player, currentBid }) {
  if (!player) {
    return (
      <div className="glass-panel rounded-3xl p-8 text-center text-slate-400">
        No active player currently on the auction block.
      </div>
    );
  }

  const roleColors = {
    'Batsman': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Bowler': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'All-Rounder': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Wicket Keeper': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  };

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-7 border border-slate-700/80 shadow-2xl relative overflow-hidden group">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center md:items-start">
        
        {/* Player Image with Frame */}
        <div className="relative flex-shrink-0">
          <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-glow-gold relative bg-slate-900">
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            
            {/* Status overlay badge */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 font-mono">
                {player.country} • {player.age} yrs
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-mono uppercase">
                LOT #{player.id.replace('p-', '')}
              </span>
            </div>
          </div>
        </div>

        {/* Player Details & Career Stats */}
        <div className="flex-1 w-full text-center md:text-left">
          
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${roleColors[player.role] || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
              {player.role}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono">
              {player.category || 'Marquee Pool'}
            </span>
            {player.nickname && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-amber-500/10 text-amber-300 border border-amber-500/20 italic">
                <Sparkles className="w-3 h-3 text-amber-400" />
                "{player.nickname}"
              </span>
            )}
          </div>

          {/* Player Name */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display uppercase">
            {player.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1 mb-4 flex items-center justify-center md:justify-start gap-2">
            <span>{player.playingStyle}</span>
            <span>•</span>
            <span className="text-slate-300">{player.state}</span>
          </p>

          {/* Stats Bar Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 my-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Matches</div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono">{player.statistics.matches}</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Runs / HS</div>
              <div className="text-lg sm:text-xl font-bold text-amber-400 font-mono">
                {player.statistics.runs.toLocaleString('en-IN')} <span className="text-xs text-slate-400">({player.statistics.highScore})</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Wickets / BBI</div>
              <div className="text-lg sm:text-xl font-bold text-cyan-400 font-mono">
                {player.statistics.wickets} <span className="text-xs text-slate-400">({player.statistics.bestBowling})</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Strike Rate</div>
              <div className="text-lg sm:text-xl font-bold text-emerald-400 font-mono">{player.statistics.strikeRate}</div>
            </div>
          </div>

          {/* Base Price & Bio Footer */}
          <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-800/80 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 uppercase font-mono font-semibold">Base Price:</span>
              <span className="text-base sm:text-lg font-bold text-amber-400 font-mono">
                {formatCurrency(player.basePrice)}
              </span>
            </div>

            {player.previousTeams && (
              <div className="text-xs text-slate-400 font-medium">
                Prev: <span className="text-slate-300">{player.previousTeams.join(', ')}</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
