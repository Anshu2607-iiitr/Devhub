import React from 'react';
import { formatCurrency } from '../../utils/currency';
import { Shield, Award, Users, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SquadComposition({ squad = [], squadLimit = 15 }) {
  const roles = [
    { title: 'Batsmen', roleKey: 'Batsman', target: 5, color: 'text-blue-400 border-blue-500/30' },
    { title: 'Bowlers', roleKey: 'Bowler', target: 5, color: 'text-emerald-400 border-emerald-500/30' },
    { title: 'All-Rounders', roleKey: 'All-Rounder', target: 3, color: 'text-amber-400 border-amber-500/30' },
    { title: 'Wicket Keepers', roleKey: 'Wicket Keeper', target: 2, color: 'text-purple-400 border-purple-500/30' },
  ];

  const getPlayersByRole = (roleKey) => {
    return squad.filter(p => p.role === roleKey);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map(({ title, roleKey, target, color }) => {
          const playersInRole = getPlayersByRole(roleKey);
          return (
            <div key={title} className="glass-panel rounded-3xl p-5 border border-slate-800 bg-slate-900/70">
              
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase font-mono px-2.5 py-0.5 rounded-full border bg-slate-950 ${color}`}>
                    {title}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  <strong className="text-white">{playersInRole.length}</strong> / {target} Recommended
                </span>
              </div>

              {/* Player Roster for this role */}
              {playersInRole.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-500 font-mono">
                  No {title.toLowerCase()} acquired yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {playersInRole.map((player) => (
                    <Link
                      key={player.id}
                      to={`/players/${player.id}`}
                      className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={player.image}
                          alt={player.name}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-700"
                        />
                        <div className="truncate">
                          <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                            {player.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {player.playingStyle}
                          </div>
                        </div>
                      </div>

                      <div className="text-right font-mono flex-shrink-0">
                        <div className="text-xs font-bold text-emerald-400">
                          {formatCurrency(player.soldPrice)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}
