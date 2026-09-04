import React from 'react';
import { useAuction } from '../context/AuctionContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/currency';
import { Activity, Clock, Gavel, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TeamBidsPage() {
  const { teams, auction, players } = useAuction();
  const { managedTeamId } = useAuth();

  const activeTeam = teams.find(t => t.id === managedTeamId) || teams[0];
  
  // Filter bids by active team from current session or squad history
  const teamPurchases = players.filter(p => p.soldToTeamId === activeTeam.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <div>
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          {activeTeam.name}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-wide">
          Bidding & Acquisition History
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
          Detailed log of successful player auction acquisitions
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/80">
        <h3 className="font-bold text-base text-white font-display uppercase tracking-wide mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Purchased Players ({teamPurchases.length})</span>
        </h3>

        {teamPurchases.length === 0 ? (
          <div className="text-center py-12 text-slate-500 font-mono text-sm">
            No players purchased yet. Head over to the Live Auction to place your first bid!
            <div className="mt-4">
              <Link
                to={`/live/${auction.id || 'cpl-2026'}`}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase font-mono shadow-glow-gold"
              >
                Join Live Auction
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {teamPurchases.map((player) => (
              <div
                key={player.id}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-12 h-12 rounded-xl object-cover border border-amber-500/40 shadow-glow-gold"
                  />
                  <div>
                    <div className="font-bold text-base text-white font-display uppercase tracking-wide">
                      {player.name}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      {player.role} • {player.playingStyle}
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xs text-slate-500 uppercase">Winning Bid</div>
                  <div className="text-lg font-black text-emerald-400">
                    {formatCurrency(player.soldPrice)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
