import React from 'react';
import { Link } from 'react-router-dom';
import { useAuction } from '../context/AuctionContext';
import { useAuth } from '../context/AuthContext';
import SquadComposition from '../components/team/SquadComposition';
import { formatCurrency } from '../utils/currency';
import { Users, Shield, Award, Radio } from 'lucide-react';

export default function TeamSquadPage() {
  const { teams, auction } = useAuction();
  const { managedTeamId } = useAuth();

  const activeTeam = teams.find(t => t.id === managedTeamId) || teams[0];
  const squad = activeTeam.squad || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            {activeTeam.name} Roster
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-wide">
            Squad Composition & Formation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            {squad.length} of {activeTeam.squadLimit} positions acquired
          </p>
        </div>

        <Link
          to={`/live/${auction.id || 'cpl-2026'}`}
          className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono shadow-glow-gold flex items-center gap-2 transition-all"
        >
          <Radio className="w-4 h-4 stroke-[3]" />
          <span>Bid on Players</span>
        </Link>
      </div>

      <SquadComposition squad={squad} squadLimit={activeTeam.squadLimit} />

    </div>
  );
}
