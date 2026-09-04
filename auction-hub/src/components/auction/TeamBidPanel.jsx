import React, { useState } from 'react';
import { useAuth, ROLES } from '../../context/AuthContext';
import { useAuction } from '../../context/AuctionContext';
import { formatCurrency, getNextMinIncrement } from '../../utils/currency';
import { Gavel, AlertCircle, CheckCircle2, ShieldAlert, ArrowUpRight, Sparkles, UserCheck } from 'lucide-react';

export default function TeamBidPanel({ currentPlayer }) {
  const { currentRole, managedTeamId, switchRole } = useAuth();
  const { teams, auction, placeBid } = useAuction();

  const activeTeam = teams.find(t => t.id === managedTeamId) || teams[0];
  const [customAmount, setCustomAmount] = useState('');
  const [bidError, setBidError] = useState('');
  const [bidSuccess, setBidSuccess] = useState('');

  const minIncrement = getNextMinIncrement(auction.currentBid || currentPlayer?.basePrice || 50000);
  const nextMinBid = (auction.currentBid || currentPlayer?.basePrice || 50000) + (auction.currentBid ? minIncrement : 0);

  const isLeading = auction.leadingTeamId === activeTeam?.id;
  const isSquadFull = activeTeam?.squad?.length >= activeTeam?.squadLimit;
  const hasInsufficientBudget = activeTeam?.remainingBudget < nextMinBid;
  const isAuctionActive = auction.status === 'LIVE' && !auction.isPaused;

  const handleQuickBid = (incrementDelta = null) => {
    setBidError('');
    setBidSuccess('');

    let targetBid;
    if (incrementDelta === null) {
      // standard next min bid
      targetBid = auction.currentBid === 0 ? currentPlayer.basePrice : auction.currentBid + minIncrement;
    } else {
      targetBid = (auction.currentBid || currentPlayer.basePrice) + incrementDelta;
    }

    const res = placeBid(activeTeam.id, targetBid);
    if (!res.success) {
      setBidError(res.error);
    } else {
      setBidSuccess(`Bid placed: ${formatCurrency(targetBid)}`);
      setTimeout(() => setBidSuccess(''), 2500);
    }
  };

  const handleCustomBidSubmit = (e) => {
    e.preventDefault();
    setBidError('');
    setBidSuccess('');

    const num = Number(customAmount);
    if (isNaN(num) || num <= 0) {
      setBidError('Please enter a valid numeric amount.');
      return;
    }

    const res = placeBid(activeTeam.id, num);
    if (!res.success) {
      setBidError(res.error);
    } else {
      setBidSuccess(`Bid placed: ${formatCurrency(num)}`);
      setCustomAmount('');
      setTimeout(() => setBidSuccess(''), 2500);
    }
  };

  // If user is a Viewer, show prompt to join as Manager or test bidding
  if (currentRole === ROLES.VIEWER) {
    return (
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/90 text-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
          <Gavel className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-lg text-white font-display uppercase tracking-wide">
          Spectator Mode
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-4">
          You are currently watching the live auction stream as a public viewer. Switch to a Team Manager role to participate in live bidding wars.
        </p>
        <button
          onClick={() => switchRole(ROLES.TEAM_MANAGER, 'team-1')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-glow-cyan transition-all"
        >
          <UserCheck className="w-4 h-4" />
          <span>Switch to Team Manager ({activeTeam?.shortName})</span>
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30 bg-slate-900/90 shadow-2xl relative">
      
      {/* Active Franchise Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg border"
            style={{ backgroundColor: activeTeam.color + '20', borderColor: activeTeam.color }}
          >
            {activeTeam.logo}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-white font-display uppercase tracking-wide">
                {activeTeam.name}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
                ACTIVE BIDDER
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Manager: <span className="text-slate-200 font-medium">{activeTeam.manager}</span>
            </div>
          </div>
        </div>

        {/* Purse & Squad Stats */}
        <div className="flex items-center gap-4 text-right">
          <div className="bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 font-mono uppercase font-bold">Remaining Purse</div>
            <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
              {formatCurrency(activeTeam.remainingBudget)}
            </div>
          </div>

          <div className="bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 font-mono uppercase font-bold">Squad Size</div>
            <div className="text-sm sm:text-base font-bold text-slate-200 font-mono">
              {activeTeam.squad.length} / {activeTeam.squadLimit}
            </div>
          </div>
        </div>
      </div>

      {/* Notices / Badges */}
      {isLeading && (
        <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-amber-300 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>Your franchise currently holds the highest bid!</span>
        </div>
      )}

      {isSquadFull && (
        <div className="mb-4 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-red-300 text-xs font-semibold">
          <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>Squad limit reached ({activeTeam.squadLimit}/{activeTeam.squadLimit}). You cannot bid on more players.</span>
        </div>
      )}

      {hasInsufficientBudget && (
        <div className="mb-4 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-red-300 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>Insufficient budget for next minimum bid of {formatCurrency(nextMinBid)}.</span>
        </div>
      )}

      {bidError && (
        <div className="mb-4 p-3 rounded-2xl bg-red-500/20 border border-red-500/50 text-red-200 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{bidError}</span>
        </div>
      )}

      {bidSuccess && (
        <div className="mb-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{bidSuccess}</span>
        </div>
      )}

      {/* Main Action Bid Section */}
      <div className="space-y-4">
        
        {/* Main Instant Bid Button */}
        <button
          onClick={() => handleQuickBid(null)}
          disabled={!isAuctionActive || isSquadFull || hasInsufficientBudget}
          className={`w-full py-4 rounded-2xl font-display uppercase tracking-wider text-xl sm:text-2xl font-black shadow-2xl transition-all flex items-center justify-center gap-3 ${
            !isAuctionActive || isSquadFull || hasInsufficientBudget
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-glow-gold hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          <Gavel className="w-6 h-6 stroke-[2.5]" />
          <span>PLACE BID • {formatCurrency(nextMinBid)}</span>
        </button>

        {/* Quick Increment Bids */}
        <div>
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Quick Jump Bids:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[25000, 50000, 100000, 200000].map((inc) => {
              const target = (auction.currentBid || currentPlayer?.basePrice || 50000) + inc;
              const canAfford = activeTeam.remainingBudget >= target && isAuctionActive && !isSquadFull;
              return (
                <button
                  key={inc}
                  onClick={() => handleQuickBid(inc)}
                  disabled={!canAfford}
                  className={`py-2 px-2.5 rounded-xl text-xs font-mono font-bold border transition-all flex flex-col items-center justify-center ${
                    canAfford
                      ? 'bg-slate-800/90 border-slate-700 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 shadow-sm'
                      : 'bg-slate-900 border-slate-800/50 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <span className="text-[10px] text-slate-400">+ {formatCurrency(inc, true)}</span>
                  <span>{formatCurrency(target, true)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Bid Amount Input */}
        <form onSubmit={handleCustomBidSubmit} className="pt-2 border-t border-slate-800">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                placeholder={`Custom Bid (min ${formatCurrency(nextMinBid)})`}
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                disabled={!isAuctionActive || isSquadFull}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={!isAuctionActive || isSquadFull || !customAmount}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <span>Submit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

      </div>

    </div>
  );
}
