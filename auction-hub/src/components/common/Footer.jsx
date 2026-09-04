import React from 'react';
import { Link } from 'react-router-dom';
import { Gavel, ShieldCheck, Activity, Terminal, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-glow-gold">
                <Gavel className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-display text-xl font-bold text-white tracking-wide">
                AUCTION<span className="text-amber-400">HUB</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Next-generation real-time sports player auction system. Designed for tournaments, college leagues, cricket, football, esports, and fantasy drafts.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              WebSocket Engine Ready
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/live/cpl-2026" className="hover:text-amber-400 transition-colors">
                  Live Auction Arena
                </Link>
              </li>
              <li>
                <Link to="/players" className="hover:text-amber-400 transition-colors">
                  Player Catalog & Stats
                </Link>
              </li>
              <li>
                <Link to="/teams" className="hover:text-amber-400 transition-colors">
                  Participating Teams & Purses
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-amber-400 transition-colors">
                  Auction Sales & Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & Portals */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 font-mono">
              Portals & Control
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/admin/auction" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  Auctioneer Control Room
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-amber-400 transition-colors">
                  Admin Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link to="/team/dashboard" className="hover:text-amber-400 transition-colors">
                  Team Manager Command Center
                </Link>
              </li>
              <li>
                <Link to="/admin/create-auction" className="hover:text-amber-400 transition-colors">
                  Create New Tournament
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Architecture Note */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 font-mono">
              Backend Architecture
            </h4>
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs space-y-1.5 font-mono">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold text-[11px]">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Spring Boot + WebSocket API</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Structured with REST contract endpoints (/api/auctions, /api/bid) and STOMP event dispatchers.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} AuctionHub Live. Built for professional live player auctions.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">v1.0.0 Pro</span>
            <span>•</span>
            <span className="text-amber-500/80">Real-Time Sync</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
