import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';
import { Gavel, Users, Sparkles, Mail, Lock, Building, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const { loginAs } = useAuth();
  const [name, setName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAs(ROLES.TEAM_MANAGER, 'team-1');
    navigate('/team/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="glass-panel rounded-3xl p-8 border border-slate-800 bg-slate-900/90 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-slate-950 flex items-center justify-center mx-auto shadow-glow-cyan">
            <Users className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-wide">
            Register Franchise Team
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Join the live auction as an authorized team bidder
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-400 uppercase font-bold mb-1">Manager Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Vikramaditya Singhania"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 uppercase font-bold mb-1">Franchise / Team Name</label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Royal Warriors"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 uppercase font-bold mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="manager@franchise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 uppercase font-bold mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase font-mono shadow-glow-cyan transition-all"
          >
            Create Team Account
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="text-cyan-400 font-bold hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
}
