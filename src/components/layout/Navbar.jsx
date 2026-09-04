import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Terminal, Flame, Zap, User, LogOut, Menu, X, BookOpen, Trophy, ShieldCheck, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ isApp = false }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-glow-sm transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-purple-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                DevHub
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  JAVA 21
                </span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider -mt-1 font-mono">LEARN BY DOING</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1 font-medium text-sm">
            <Link
              to="/course/java?track=java"
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                location.pathname.startsWith('/course') && location.search.includes('track=java')
                  ? 'text-white bg-purple-500/15 border border-purple-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              <span>Java (31)</span>
            </Link>
            <Link
              to="/course/java?track=ml"
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                location.pathname.startsWith('/course') && location.search.includes('track=ml')
                  ? 'text-white bg-cyan-500/15 border border-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>ML & AI (15)</span>
            </Link>
            <Link
              to="/course/java?track=verilog"
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                location.pathname.startsWith('/course') && location.search.includes('track=verilog')
                  ? 'text-white bg-amber-500/15 border border-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Verilog (12)</span>
            </Link>
            <Link
              to="/practice"
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/practice'
                  ? 'text-white bg-purple-500/15 border border-purple-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Practice Arena
            </Link>
            <Link
              to="/coding"
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                location.pathname === '/coding'
                  ? 'text-white bg-cyan-500/15 border border-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Coding (LC/CP)</span>
            </Link>
            <Link
              to="/playground"
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                location.pathname === '/playground'
                  ? 'text-white bg-emerald-500/15 border border-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Playground</span>
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`px-3.5 py-2 rounded-lg transition-colors ${
                  location.pathname === '/dashboard'
                    ? 'text-white bg-purple-500/15 border border-purple-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs">
                  <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
                  <span className="font-bold">{user?.streak || 7}</span>
                  <span className="text-amber-400/80 text-[10px] hidden lg:inline">Days</span>
                </div>

                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs">
                  <Zap className="w-4 h-4 fill-purple-400 text-purple-400" />
                  <span className="font-bold">{user?.totalXp || 850}</span>
                  <span className="text-purple-400/80 text-[10px]">XP</span>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-800/80 border border-white/10 hover:border-purple-500/30 transition text-xs font-medium text-slate-200"
                  >
                    <img
                      src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                      alt={user?.name || "User"}
                      className="w-6 h-6 rounded-lg object-cover ring-1 ring-purple-500/40"
                    />
                    <span className="max-w-[100px] truncate">{user?.name || "Developer"}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#0F172A] border border-white/10 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-3.5 py-2 border-b border-white/5">
                        <div className="text-xs font-semibold text-white">{user?.name || "Developer"}</div>
                        <div className="text-[11px] text-slate-400 font-mono truncate">{user?.email || "alex@devhub.io"}</div>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center space-x-2 px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-purple-500/15"
                      >
                        <Terminal className="w-4 h-4 text-purple-400" />
                        <span>My Dashboard</span>
                      </Link>
                      <Link
                        to="/progress"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center space-x-2 px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-purple-500/15"
                      >
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <span>Analytics & Radar</span>
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center space-x-2 px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-purple-500/15"
                      >
                        <User className="w-4 h-4 text-cyan-400" />
                        <span>Developer Profile</span>
                      </Link>
                      <div className="border-t border-white/5 my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-3.5 py-2 text-xs text-rose-400 hover:bg-rose-500/10 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2.5">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition border border-transparent"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-sm transition"
                >
                  Start Free
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#090D16] px-4 pt-3 pb-5 space-y-2">
          <Link
            to="/course/java"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5"
          >
            Curriculum (31 Modules)
          </Link>
          <Link
            to="/practice"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5"
          >
            Practice Arena
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-purple-300 font-medium hover:bg-white/5"
              >
                Dashboard
              </Link>
              <Link
                to="/progress"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5"
              >
                Progress Analytics
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5"
              >
                Profile
              </Link>
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-400 hover:bg-rose-500/10"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="pt-2 flex flex-col space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 rounded-lg text-sm text-slate-200 bg-slate-800"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 rounded-lg text-sm text-white bg-purple-600"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
