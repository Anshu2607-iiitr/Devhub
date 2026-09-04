import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';
import { Gavel, ShieldCheck, Users, Eye, Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginAs } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = (role, teamId = 'team-1') => {
    loginAs(role, teamId);
    if (role === ROLES.ADMIN) {
      navigate('/admin/auction');
    } else if (role === ROLES.TEAM_MANAGER) {
      navigate('/team/dashboard');
    } else {
      navigate('/live/cpl-2026');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAs(ROLES.ADMIN);
    navigate('/admin/auction');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="glass-panel rounded-3xl p-8 border border-slate-800 bg-slate-900/90 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-glow-gold">
            <Gavel className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-wide">
            Welcome to AuctionHub
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Sign in to access your franchise command desk
          </p>
        </div>

        {/* 1-Click Fast Demo Login Buttons */}
        <div className="space-y-2 pt-2">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Instant Demo Logins:</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleDemoLogin(ROLES.ADMIN)}
              className="w-full p-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Auctioneer Chief (Admin)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleDemoLogin(ROLES.TEAM_MANAGER, 'team-1')}
              className="w-full p-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Royal Warriors (Manager)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleDemoLogin(ROLES.VIEWER)}
              className="w-full p-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Public Spectator (Viewer)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-[10px] text-slate-500 uppercase font-mono">Or Credentials</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-400 uppercase font-bold mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="manager@franchise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 uppercase font-bold mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase font-mono shadow-glow-gold transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-amber-400 font-bold hover:underline">
            Register Franchise
          </Link>
        </div>

      </div>
    </div>
  );
}
