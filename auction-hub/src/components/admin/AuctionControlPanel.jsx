import React, { useState } from 'react';
import { useAuction } from '../../context/AuctionContext';
import { formatCurrency, getNextMinIncrement } from '../../utils/currency';
import {
  Gavel,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  CheckCircle,
  XCircle,
  PlusCircle,
  ShieldCheck,
  AlertTriangle,
  Clock
} from 'lucide-react';
import ConfirmSaleModal from './ConfirmSaleModal';

export default function AuctionControlPanel() {
  const {
    auction,
    currentPlayer,
    leadingTeam,
    teams,
    togglePause,
    sellCurrentPlayer,
    markCurrentPlayerUnsold,
    nextPlayer,
    skipCurrentPlayer,
    placeBid,
    setAuction
  } = useAuction();

  const [confirmSaleModalOpen, setConfirmSaleModalOpen] = useState(false);
  const [overrideTeamId, setOverrideTeamId] = useState('');
  const [overrideAmount, setOverrideAmount] = useState('');

  const isPaused = auction.isPaused;
  const isLive = auction.status === 'LIVE';

  const handleManualIncrement = (amount) => {
    if (!leadingTeam && teams.length > 0) {
      // If no leading team, pick first team or prompt
      placeBid(teams[0].id, (auction.currentBid || currentPlayer.basePrice) + amount);
    } else if (leadingTeam) {
      placeBid(leadingTeam.id, (auction.currentBid || currentPlayer.basePrice) + amount);
    }
  };

  const handleResetTimer = (seconds = 25) => {
    setAuction(prev => ({ ...prev, timerRemaining: seconds, timerDuration: seconds }));
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-amber-500/30 bg-slate-900/90 shadow-2xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white font-display uppercase tracking-wide">
              Auctioneer Control Desk
            </h2>
            <div className="text-xs text-slate-400 font-mono">
              Live Console • Round {auction.round} of {auction.totalRounds}
            </div>
          </div>
        </div>

        {/* Live / Pause status toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePause}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition-all ${
              isPaused
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                : 'bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
            }`}
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4" />
                <span>Resume Auction</span>
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause Auction</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Gavel Action Buttons */}
      <div>
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
          Verdict Decision:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* SOLD Button */}
          <button
            onClick={() => setConfirmSaleModalOpen(true)}
            disabled={!leadingTeam && (!auction.currentBid || auction.currentBid === 0)}
            className="py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-slate-950 font-display font-black text-2xl uppercase tracking-wider shadow-glow-green transition-all flex items-center justify-center gap-2.5 active:scale-95"
          >
            <Gavel className="w-7 h-7 stroke-[3]" />
            <span>HAMMER SOLD</span>
          </button>

          {/* UNSOLD Button */}
          <button
            onClick={markCurrentPlayerUnsold}
            className="py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-display font-bold text-2xl uppercase tracking-wider shadow-glow-red transition-all flex items-center justify-center gap-2.5 active:scale-95"
          >
            <XCircle className="w-7 h-7 stroke-[2.5]" />
            <span>MARK UNSOLD</span>
          </button>

        </div>
      </div>

      {/* Timer & Sequence Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <button
          onClick={() => handleResetTimer(25)}
          className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-xs font-mono text-slate-300 flex items-center justify-center gap-2 transition-all"
        >
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Reset Timer (25s)</span>
        </button>

        <button
          onClick={skipCurrentPlayer}
          className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-xs font-mono text-slate-300 flex items-center justify-center gap-2 transition-all"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>Skip Player (Queue End)</span>
        </button>

        <button
          onClick={() => nextPlayer()}
          className="p-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-glow-cyan"
        >
          <span>Next Player</span>
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Manual Bid Increment Controls */}
      <div className="pt-4 border-t border-slate-800">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
          <PlusCircle className="w-4 h-4 text-amber-400" />
          <span>Manual Auctioneer Bid Adjustment</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[10000, 25000, 50000, 100000].map(inc => (
            <button
              key={inc}
              onClick={() => handleManualIncrement(inc)}
              className="py-2.5 px-3 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-amber-500/60 text-xs font-mono font-bold text-slate-200 hover:text-amber-300 transition-all flex items-center justify-center gap-1.5"
            >
              <span>+ {formatCurrency(inc, true)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Confirm Sale Modal */}
      <ConfirmSaleModal
        isOpen={confirmSaleModalOpen}
        onClose={() => setConfirmSaleModalOpen(false)}
        onConfirm={(teamId, price) => {
          sellCurrentPlayer(teamId, price);
          setConfirmSaleModalOpen(false);
        }}
        player={currentPlayer}
        leadingTeam={leadingTeam}
        currentBid={auction.currentBid || currentPlayer?.basePrice}
        teams={teams}
      />

    </div>
  );
}
