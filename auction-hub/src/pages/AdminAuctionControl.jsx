import React from 'react';
import { Link } from 'react-router-dom';
import { useAuction } from '../context/AuctionContext';
import { useAuth } from '../context/AuthContext';
import AuctionControlPanel from '../components/admin/AuctionControlPanel';
import PlayerQueueManager from '../components/admin/PlayerQueueManager';
import TeamBudgetMonitor from '../components/admin/TeamBudgetMonitor';
import SoldCelebrationModal from '../components/auction/SoldCelebrationModal';
import UnsoldModal from '../components/auction/UnsoldModal';
import LiveIndicator from '../components/common/LiveIndicator';
import { ShieldCheck, Radio, LayoutDashboard, AlertCircle } from 'lucide-react';

export default function AdminAuctionControl() {
  const { auction, currentPlayer, teams, soldModalData, unsoldModalData, setSoldModalData, setUnsoldModalData, nextPlayer } = useAuction();
  const { isAdmin } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner */}
      <div className="glass-panel rounded-3xl p-5 border border-amber-500/30 bg-slate-950/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-wide">
                Auctioneer Command Room
              </h1>
              <LiveIndicator text="LIVE CONSOLE" size="sm" />
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Tournament: {auction.name} • Master Gavel Control
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/dashboard"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <Link
            to={`/live/${auction.id || 'cpl-2026'}`}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-glow-gold transition-all"
          >
            <Radio className="w-3.5 h-3.5 stroke-[3]" />
            <span>Open Public Arena</span>
          </Link>
        </div>
      </div>

      {!isAdmin && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4 text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>You are viewing this console in preview mode. Switch role to Admin in the top-right menu for full authority.</span>
          </div>
        </div>
      )}

      {/* Control Room Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Gavel & Current Player Decision Desk (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <AuctionControlPanel />
          <TeamBudgetMonitor teams={teams} />
        </div>

        {/* Right Column: Upcoming Player Queue (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <PlayerQueueManager />
        </div>

      </div>

      {/* Sold & Unsold Modals */}
      <SoldCelebrationModal
        soldData={soldModalData}
        onClose={() => setSoldModalData(null)}
        onNextPlayer={() => nextPlayer()}
      />

      <UnsoldModal
        unsoldData={unsoldModalData}
        onClose={() => setUnsoldModalData(null)}
        onNextPlayer={() => nextPlayer()}
      />

    </div>
  );
}
