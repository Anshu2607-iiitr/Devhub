import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Gavel, Flame, Users, UserCheck, ShieldCheck, Trophy, Plus, Menu, X, Radio } from 'lucide-react';
import { useAuth, ROLES } from '../../context/AuthContext';
import { useAuction } from '../../context/AuctionContext';
import RoleSwitcher from './RoleSwitcher';
import SoundToggle from './SoundToggle';
import LiveIndicator from './LiveIndicator';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRole, isAdmin, isTeamManager, user } = useAuth();
  const { auction } = useAuction();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: 'Live Auction', path: `/live/${auction.id || 'cpl-2026'}`, isLive: true },
    { name: 'Players', path: '/players' },
    { name: 'Teams', path: '/teams' },
    { name: 'Results', path: '/results' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.35)] group-hover:scale-105 transition-transform duration-200">
              <Gavel className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1 font-display">
                AUCTION<span className="text-amber-400">HUB</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 -mt-1 uppercase font-mono font-medium">
                Live Sports Arena
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                isActive('/') && location.pathname === '/'
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              Home
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive(link.path)
                    ? 'text-amber-400 bg-amber-500/10 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-850'
                }`}
              >
                {link.isLive && (
                  <span className="relative flex h-2 w-2 mr-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
                {link.name}
              </Link>
            ))}

            {/* Contextual Role Link */}
            {isAdmin && (
              <Link
                to="/admin/auction"
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive('/admin/auction')
                    ? 'text-amber-300 bg-amber-500/20 border border-amber-500/40 shadow-glow-gold'
                    : 'text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Control Room</span>
              </Link>
            )}

            {isTeamManager && (
              <Link
                to="/team/dashboard"
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive('/team')
                    ? 'text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 shadow-glow-cyan'
                    : 'text-cyan-400/90 hover:text-cyan-300 hover:bg-cyan-500/10'
                }`}
              >
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Manager Hub</span>
              </Link>
            )}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <SoundToggle />

            {/* Interactive Role Switcher */}
            <RoleSwitcher />

            {/* Create Auction button for Admin */}
            {isAdmin && (
              <Link
                to="/admin/create-auction"
                className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all hover:scale-105"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>New Auction</span>
              </Link>
            )}

            {/* Mobile Hamburger Menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-2xl p-4 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900"
          >
            Home
          </Link>
          <Link
            to={`/live/${auction.id || 'cpl-2026'}`}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium text-amber-400 hover:bg-amber-500/10"
          >
            <span>Live Auction Arena</span>
            <LiveIndicator size="sm" />
          </Link>
          <Link
            to="/players"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900"
          >
            Player Catalog
          </Link>
          <Link
            to="/teams"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900"
          >
            Franchise Teams
          </Link>
          <Link
            to="/results"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900"
          >
            Auction Results & History
          </Link>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <Link
              to="/admin/auction"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/30"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Admin Auction Control Room</span>
            </Link>
            <Link
              to="/team/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-cyan-300 bg-cyan-500/15 border border-cyan-500/30"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Team Manager Dashboard</span>
            </Link>
            <Link
              to="/admin/create-auction"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Auction Event</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
