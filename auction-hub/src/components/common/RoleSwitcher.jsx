import React, { useState } from 'react';
import { useAuth, ROLES } from '../../context/AuthContext';
import { useAuction } from '../../context/AuctionContext';
import { ShieldCheck, Users, Eye, ChevronDown, Check, Sparkles } from 'lucide-react';

export default function RoleSwitcher() {
  const { currentRole, managedTeamId, switchRole, switchManagedTeam } = useAuth();
  const { teams } = useAuction();
  const [isOpen, setIsOpen] = useState(false);

  const activeTeam = teams.find(t => t.id === managedTeamId) || teams[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/90 border border-slate-700/80 hover:border-amber-500/50 transition-all text-slate-200 hover:text-white shadow-sm"
      >
        <div className="flex items-center gap-1.5">
          {currentRole === ROLES.ADMIN && (
            <span className="flex items-center gap-1 text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </span>
          )}
          {currentRole === ROLES.TEAM_MANAGER && (
            <span className="flex items-center gap-1 text-cyan-400">
              <Users className="w-3.5 h-3.5" />
              <span>Manager ({activeTeam?.shortName})</span>
            </span>
          )}
          {currentRole === ROLES.VIEWER && (
            <span className="flex items-center gap-1 text-emerald-400">
              <Eye className="w-3.5 h-3.5" />
              <span>Viewer</span>
            </span>
          )}
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 rounded-2xl glass-panel bg-slate-900/95 border border-slate-700/90 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Select Demo Role
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Real-Time</span>
            </div>

            <div className="space-y-1.5">
              {/* ADMIN */}
              <button
                onClick={() => {
                  switchRole(ROLES.ADMIN);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                  currentRole === ROLES.ADMIN
                    ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300'
                    : 'hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Auctioneer / Admin</div>
                    <div className="text-[10px] text-slate-400">Full control gavel, sold/unsold, queue</div>
                  </div>
                </div>
                {currentRole === ROLES.ADMIN && <Check className="w-4 h-4 text-amber-400" />}
              </button>

              {/* TEAM MANAGER */}
              <div className={`p-2 rounded-xl border transition-all ${
                currentRole === ROLES.TEAM_MANAGER
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                  : 'border-transparent hover:bg-slate-800/50 text-slate-300'
              }`}>
                <button
                  onClick={() => {
                    switchRole(ROLES.TEAM_MANAGER);
                  }}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Team Manager</div>
                      <div className="text-[10px] text-slate-400">Place live bids & manage squad purse</div>
                    </div>
                  </div>
                  {currentRole === ROLES.TEAM_MANAGER && <Check className="w-4 h-4 text-cyan-400" />}
                </button>

                {/* Team Selector submenu */}
                {currentRole === ROLES.TEAM_MANAGER && (
                  <div className="mt-2.5 pt-2 border-t border-cyan-500/20 grid grid-cols-2 gap-1.5">
                    {teams.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          switchManagedTeam(t.id);
                          setIsOpen(false);
                        }}
                        className={`px-2 py-1.5 rounded-lg text-[11px] font-medium flex items-center gap-1.5 transition-all text-left truncate ${
                          managedTeamId === t.id
                            ? 'bg-cyan-500/25 text-white font-bold border border-cyan-400/50'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        <span>{t.logo}</span>
                        <span className="truncate">{t.shortName}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* VIEWER */}
              <button
                onClick={() => {
                  switchRole(ROLES.VIEWER);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                  currentRole === ROLES.VIEWER
                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                    : 'hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Public Spectator / Viewer</div>
                    <div className="text-[10px] text-slate-400">Live stream feed, leaderboards, stats</div>
                  </div>
                </div>
                {currentRole === ROLES.VIEWER && <Check className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
