import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/currency';
import { Award, ArrowRight, CheckCircle2, AlertOctagon, Sparkles } from 'lucide-react';

export default function PlayerCard({ player }) {
  const statusBadges = {
    'LIVE': 'bg-red-500/20 text-red-400 border-red-500/40 shadow-glow-red animate-pulse',
    'UPCOMING': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    'SOLD': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'UNSOLD': 'bg-slate-800 text-slate-400 border-slate-700',
  };

  const roleColors = {
    'Batsman': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    'Bowler': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    'All-Rounder': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    'Wicket Keeper': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  };

  return (
    <Link
      to={`/players/${player.id}`}
      className="glass-panel rounded-3xl p-5 border border-slate-800 hover:border-amber-500/50 hover:shadow-glow-gold transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
    >
      
      {/* Top Bar: Role badge & Auction Status */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${roleColors[player.role] || 'text-slate-300 bg-slate-800'}`}>
            {player.role}
          </span>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${statusBadges[player.status] || 'bg-slate-800 text-slate-400'}`}>
            {player.status === 'LIVE' ? '🔴 LIVE' : player.status}
          </span>
        </div>

        {/* Player Image and Details */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={player.image}
              alt={player.name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-700 group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300 shadow-md"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-base sm:text-lg text-white font-display uppercase tracking-wide truncate group-hover:text-amber-400 transition-colors">
              {player.name}
            </h3>
            <p className="text-xs text-slate-400 font-medium truncate">
              {player.playingStyle}
            </p>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              {player.state}, {player.country} • {player.age}y
            </p>
          </div>
        </div>

        {/* Mini Stats Bar */}
        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-2xl bg-slate-950/70 border border-slate-850 text-center font-mono text-xs mb-4">
          <div>
            <div className="text-[9px] text-slate-500 uppercase">Runs</div>
            <div className="font-bold text-slate-200">{player.statistics.runs}</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-500 uppercase">Wkts</div>
            <div className="font-bold text-slate-200">{player.statistics.wickets}</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-500 uppercase">SR</div>
            <div className="font-bold text-amber-400">{player.statistics.strikeRate}</div>
          </div>
        </div>
      </div>

      {/* Footer Pricing & Sale status */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-slate-500 font-mono uppercase font-semibold">
            {player.status === 'SOLD' ? 'Sold Price' : 'Base Price'}
          </div>
          <div className={`text-sm sm:text-base font-bold font-mono ${
            player.status === 'SOLD' ? 'text-emerald-400' : 'text-amber-400'
          }`}>
            {formatCurrency(player.soldPrice || player.basePrice)}
          </div>
        </div>

        {player.status === 'SOLD' && player.soldToTeamName ? (
          <div className="text-right">
            <div className="text-[10px] text-slate-500 font-mono uppercase">Bought By</div>
            <div className="text-xs font-bold text-white truncate max-w-[110px]">
              {player.soldToTeamName}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-amber-400 font-semibold transition-colors">
            <span>Profile</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>

    </Link>
  );
}
