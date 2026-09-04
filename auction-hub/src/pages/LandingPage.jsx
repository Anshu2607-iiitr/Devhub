import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuction } from '../context/AuctionContext';
import { formatCurrency } from '../utils/currency';
import LiveIndicator from '../components/common/LiveIndicator';
import Hero3DCanvas from '../components/3d/Hero3DCanvas';
import TiltCard3D from '../components/3d/TiltCard3D';
import LoadingScreen3D from '../components/3d/LoadingScreen3D';
import {
  Gavel,
  Zap,
  TrendingUp,
  ShieldCheck,
  Trophy,
  Users,
  Activity,
  ArrowRight,
  Sparkles,
  Flame,
  CheckCircle2,
  PieChart,
  Radio,
  Play,
  Rotate3D,
  Layers
} from 'lucide-react';

export default function LandingPage() {
  const { auction, currentPlayer, leadingTeam, teams, players } = useAuction();
  const [show3DLoader, setShow3DLoader] = useState(false);

  const totalPlayers = players.length;
  const soldPlayers = players.filter(p => p.status === 'SOLD').length;
  const totalSpent = teams.reduce((acc, t) => acc + (t.spentBudget || 0), 0);

  return (
    <div className="space-y-24 pb-20 overflow-hidden relative">
      
      {/* Optional Fullscreen 3D Loading Splash Trigger */}
      {show3DLoader && (
        <LoadingScreen3D onComplete={() => setShow3DLoader(false)} duration={1800} />
      )}

      {/* HERO SECTION WITH 3D CANVAS PARTICLES */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* 3D WebGL / Canvas Arena Background */}
        <Hero3DCanvas className="z-0" />

        {/* Ambient colored lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          
          {/* Live Tournament Beacon & 3D Demo Trigger */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg">
              <LiveIndicator size="sm" text="NOW LIVE" />
              <span className="text-xs font-mono text-slate-300">
                {auction.name} • Season 5
              </span>
            </div>

            <button
              onClick={() => setShow3DLoader(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 text-xs font-mono font-bold transition-all shadow-glow-gold"
            >
              <Rotate3D className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>3D Arena Intro</span>
            </button>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase font-display leading-[0.95] drop-shadow-2xl">
            Build Your Dream Team. <br />
            <span className="gold-gradient-text">One Bid at a Time.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Experience the electric thrill of live sports player auctions with real-time 3D stadium physics, instant multi-franchise bidding wars, and rupee-precise purse management.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to={`/live/${auction.id || 'cpl-2026'}`}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-display font-black text-xl uppercase tracking-wider shadow-glow-gold transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3"
            >
              <Radio className="w-5 h-5 text-slate-950 stroke-[3]" />
              <span>Enter Live Auction Arena</span>
            </Link>

            <Link
              to="/admin/create-auction"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm tracking-wide border border-slate-700 hover:border-slate-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Gavel className="w-4 h-4 text-amber-400" />
              <span>Create Tournament Auction</span>
            </Link>
          </div>
        </div>

        {/* 3D TILT LIVE AUCTION PREVIEW HERO COMPONENT */}
        <div className="relative z-10 mt-16 max-w-5xl mx-auto">
          <TiltCard3D maxTilt={8} scale={1.015}>
            <div className="rounded-3xl glass-panel-glow p-6 sm:p-8 border-2 border-amber-500/50 shadow-2xl relative overflow-hidden bg-slate-900/90">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <LiveIndicator text="LIVE MATCH BLOCK" size="sm" />
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    Lot #{currentPlayer?.id.replace('p-', '')} • Round {auction.round}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                  <span className="hidden sm:inline text-slate-500 font-normal">3D Interactive Tilt Active</span>
                  <Link
                    to={`/live/${auction.id || 'cpl-2026'}`}
                    className="hover:text-amber-300 flex items-center gap-1.5"
                  >
                    <span>Full Broadcast Arena</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                
                {/* Current Player Preview with 3D Depth Pop */}
                <div className="flex items-center gap-4 md:col-span-1" style={{ transform: 'translateZ(30px)' }}>
                  <img
                    src={currentPlayer?.image}
                    alt={currentPlayer?.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-amber-400 shadow-glow-gold flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono uppercase">
                      {currentPlayer?.role}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-wide mt-1 truncate">
                      {currentPlayer?.name}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono">
                      Base: {formatCurrency(currentPlayer?.basePrice)}
                    </div>
                  </div>
                </div>

                {/* Current Highest Bid */}
                <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 text-center md:col-span-1 shadow-inner" style={{ transform: 'translateZ(20px)' }}>
                  <div className="text-[11px] font-mono text-slate-400 uppercase font-bold flex items-center justify-center gap-1.5 mb-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    <span>Current Bid</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                    {formatCurrency(auction.currentBid || currentPlayer?.basePrice)}
                  </div>
                  <div className="text-xs text-amber-400 font-bold font-display uppercase mt-1 truncate">
                    Leading: {leadingTeam?.name || 'Awaiting Bid'}
                  </div>
                </div>

                {/* Countdown & Quick Jump */}
                <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 text-center md:col-span-1 flex flex-col justify-center shadow-inner" style={{ transform: 'translateZ(20px)' }}>
                  <div className="text-[11px] font-mono text-slate-400 uppercase font-bold mb-1">
                    Auction Clock
                  </div>
                  <div className="text-3xl font-black text-amber-400 font-mono">
                    00:{String(auction.timerRemaining || 20).padStart(2, '0')}
                  </div>
                  <Link
                    to={`/live/${auction.id || 'cpl-2026'}`}
                    className="mt-2 py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold font-mono uppercase tracking-wider transition-colors inline-block shadow-glow-gold"
                  >
                    Place Live Bid →
                  </Link>
                </div>

              </div>

            </div>
          </TiltCard3D>
        </div>

      </section>

      {/* STATS METRIC RIBBON WITH 3D TILT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TiltCard3D maxTilt={10}>
            <div className="glass-panel rounded-3xl p-5 border border-slate-800 text-center h-full">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">{totalPlayers}</div>
              <div className="text-xs font-mono text-slate-400 uppercase mt-1">Registered Players</div>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={10}>
            <div className="glass-panel rounded-3xl p-5 border border-slate-800 text-center h-full">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{soldPlayers}</div>
              <div className="text-xs font-mono text-slate-400 uppercase mt-1">Players Sold</div>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={10}>
            <div className="glass-panel rounded-3xl p-5 border border-slate-800 text-center h-full">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{formatCurrency(totalSpent, true)}</div>
              <div className="text-xs font-mono text-slate-400 uppercase mt-1">Total Purse Spent</div>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={10}>
            <div className="glass-panel rounded-3xl p-5 border border-slate-800 text-center h-full">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">{teams.length}</div>
              <div className="text-xs font-mono text-slate-400 uppercase mt-1">Franchise Teams</div>
            </div>
          </TiltCard3D>
        </div>
      </section>

      {/* CORE FEATURES SECTION WITH 3D TILT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-2">
            Engineered For High Stakes
          </h2>
          <p className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Professional Auction Features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Feature 1 */}
          <TiltCard3D maxTilt={12}>
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/60 hover:border-amber-500/40 transition-all group h-full">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide mb-2">
                Real-Time Live Bidding
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sub-second bid registrations, dynamic incremental calculations, and animated bid history streams for all competing teams.
              </p>
            </div>
          </TiltCard3D>

          {/* Feature 2 */}
          <TiltCard3D maxTilt={12}>
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 transition-all group h-full">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide mb-2">
                Smart Purse Management
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track franchise budgets in real-time. Automatic checks prevent bidding over remaining purses or violating squad quotas.
              </p>
            </div>
          </TiltCard3D>

          {/* Feature 3 */}
          <TiltCard3D maxTilt={12}>
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/60 hover:border-emerald-500/40 transition-all group h-full">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gavel className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide mb-2">
                Auctioneer Control Desk
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full live console for the admin to strike the gavel, call "SOLD" or "UNSOLD", reorder upcoming player queues, and pause the timer.
              </p>
            </div>
          </TiltCard3D>

          {/* Feature 4 */}
          <TiltCard3D maxTilt={12}>
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/60 hover:border-purple-500/40 transition-all group h-full">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide mb-2">
                Deep Player Analytics
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Explore career statistics, strike rates, bowling averages, and visual radar skill breakdowns before making multi-lakh decisions.
              </p>
            </div>
          </TiltCard3D>

        </div>
      </section>

      {/* USE CASES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TiltCard3D maxTilt={5}>
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-display uppercase tracking-wide mb-4">
              Built For Every Competitive League
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto mb-8">
              Whether organizing an IPL-style cricket cup, university sports fest, corporate football tournament, or esports draft, AuctionHub delivers an unmatched experience.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                '🏏 Cricket Premier Leagues',
                '⚽ Football Tournaments',
                '🎮 Esports & Gaming Drafts',
                '🎓 College & University Fests',
                '🏢 Corporate Sports Leagues',
                '🏆 Fantasy Auction Leagues'
              ].map(item => (
                <span key={item} className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </TiltCard3D>
      </section>

    </div>
  );
}
