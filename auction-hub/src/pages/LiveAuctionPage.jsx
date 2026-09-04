import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuction } from '../context/AuctionContext';
import { useAuth } from '../context/AuthContext';
import CurrentPlayerCard from '../components/auction/CurrentPlayerCard';
import BidArea from '../components/auction/BidArea';
import CountdownTimer from '../components/auction/CountdownTimer';
import LiveBidStream from '../components/auction/LiveBidStream';
import TeamBidPanel from '../components/auction/TeamBidPanel';
import BudgetLeaderboard from '../components/auction/BudgetLeaderboard';
import SoldCelebrationModal from '../components/auction/SoldCelebrationModal';
import UnsoldModal from '../components/auction/UnsoldModal';
import AutoBidSimulator from '../components/auction/AutoBidSimulator';
import LiveIndicator from '../components/common/LiveIndicator';
import TiltCard3D from '../components/3d/TiltCard3D';
import { Radio, ShieldCheck, Trophy, Sparkles, ChevronRight } from 'lucide-react';

export default function LiveAuctionPage() {
  const { auctionId } = useParams();
  const {
    auction,
    currentPlayer,
    leadingTeam,
    teams,
    bidFlash,
    soldModalData,
    unsoldModalData,
    setSoldModalData,
    setUnsoldModalData,
    nextPlayer,
    placeBid
  } = useAuction();

  const { isAdmin } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* TOP BROADCAST BANNER */}
      <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-slate-800 bg-slate-950/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <LiveIndicator text="LIVE ARENA" size="md" />
          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
          <div>
            <h1 className="text-lg sm:text-xl font-black text-white font-display uppercase tracking-wide flex items-center gap-2">
              <span>{auction.name}</span>
            </h1>
            <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span className="text-amber-400 font-bold">Round {auction.round} of {auction.totalRounds}</span>
              <span>•</span>
              <span>{auction.sport} League</span>
              <span>•</span>
              <span className="text-slate-500">Purse: ₹50 Lakhs/team</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <AutoBidSimulator />
          
          {isAdmin && (
            <Link
              to="/admin/auction"
              className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Control Room</span>
            </Link>
          )}
        </div>
      </div>

      {/* MAIN AUCTION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Main Player Spotlight & Bidding Interface (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Spotlight Player Card */}
          <TiltCard3D maxTilt={6} scale={1.01}>
            <CurrentPlayerCard
              player={currentPlayer}
              currentBid={auction.currentBid}
            />
          </TiltCard3D>

          {/* Current Highest Bid Area */}
          <BidArea
            currentBid={auction.currentBid}
            leadingTeam={leadingTeam}
            basePrice={currentPlayer?.basePrice}
            bidFlash={bidFlash}
          />

          {/* Team Manager Live Interactive Bidding Cockpit */}
          <TeamBidPanel
            currentPlayer={currentPlayer}
          />

        </div>

        {/* RIGHT COLUMN: Clock, Live Bid Feed, & Franchise Purses (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Large Countdown Clock */}
          <CountdownTimer
            secondsRemaining={auction.timerRemaining}
            totalSeconds={auction.timerDuration || 25}
            isPaused={auction.isPaused}
          />

          {/* Live Real-time Bid Stream */}
          <LiveBidStream
            bidHistory={auction.bidHistory || []}
          />

          {/* Team Budget Leaderboard */}
          <BudgetLeaderboard
            teams={teams}
            leadingTeamId={auction.leadingTeamId}
          />

        </div>

      </div>

      {/* SOLD CELEBRATION MODAL */}
      <SoldCelebrationModal
        soldData={soldModalData}
        onClose={() => setSoldModalData(null)}
        onNextPlayer={() => nextPlayer()}
      />

      {/* UNSOLD NOTICE MODAL */}
      <UnsoldModal
        unsoldData={unsoldModalData}
        onClose={() => setUnsoldModalData(null)}
        onNextPlayer={() => nextPlayer()}
        onRetry={() => {
          setUnsoldModalData(null);
          // reset current player timer
          placeBid(teams[0].id, currentPlayer.basePrice);
        }}
      />

    </div>
  );
}
