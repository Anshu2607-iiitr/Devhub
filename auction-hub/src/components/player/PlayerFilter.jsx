import React from 'react';
import { Search, Filter, Sparkles, X } from 'lucide-react';

export default function PlayerFilter({
  searchTerm,
  setSearchTerm,
  selectedRole,
  setSelectedRole,
  selectedStatus,
  setSelectedStatus,
  roles = ['All', 'Batsman', 'Bowler', 'All-Rounder', 'Wicket Keeper'],
  statuses = ['All', 'LIVE', 'UPCOMING', 'SOLD', 'UNSOLD']
}) {
  const hasActiveFilters = searchTerm !== '' || selectedRole !== 'All' || selectedStatus !== 'All';

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRole('All');
    setSelectedStatus('All');
  };

  return (
    <div className="glass-panel rounded-3xl p-5 border border-slate-800 bg-slate-900/80 mb-8 space-y-4">
      
      {/* Top Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search player by name, state, country or style..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all"
          />
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all self-start sm:self-auto"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Role and Status Chips */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
        
        {/* Roles */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-slate-500 uppercase font-bold mr-1">Role:</span>
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                selectedRole === r
                  ? 'bg-amber-500 text-slate-950 shadow-glow-gold'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Status */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-slate-500 uppercase font-bold mr-1">Status:</span>
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedStatus === s
                  ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}
