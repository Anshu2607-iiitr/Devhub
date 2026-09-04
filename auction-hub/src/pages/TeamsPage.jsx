import React, { useState } from 'react';
import { useAuction } from '../context/AuctionContext';
import { useAuth } from '../context/AuthContext';
import TeamCard from '../components/team/TeamCard';
import { formatCurrency } from '../utils/currency';
import { Users, Plus, X, Award, DollarSign } from 'lucide-react';

export default function TeamsPage() {
  const { teams, setTeams, players } = useAuction();
  const { isAdmin } = useAuth();
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New Team Form State
  const [newTeam, setNewTeam] = useState({
    name: '',
    shortName: '',
    manager: '',
    managerEmail: '',
    totalBudget: 5000000,
    color: '#3B82F6',
    logo: '🛡️',
  });

  const handleAddTeam = (e) => {
    e.preventDefault();
    if (!newTeam.name) return;

    const created = {
      id: `team-${Date.now()}`,
      name: newTeam.name,
      shortName: newTeam.shortName || newTeam.name.substring(0, 3).toUpperCase(),
      manager: newTeam.manager || 'Franchise Manager',
      managerEmail: newTeam.managerEmail || 'manager@team.com',
      totalBudget: Number(newTeam.totalBudget),
      remainingBudget: Number(newTeam.totalBudget),
      spentBudget: 0,
      squadLimit: 15,
      minSquad: 11,
      color: newTeam.color,
      logo: newTeam.logo,
      squad: [],
      bidsCount: 0,
      active: true
    };

    setTeams(prev => [...prev, created]);
    setAddModalOpen(false);
  };

  const totalPurse = teams.reduce((acc, t) => acc + (t.totalBudget || 0), 0);
  const totalSpent = teams.reduce((acc, t) => acc + (t.spentBudget || 0), 0);
  const totalRemaining = teams.reduce((acc, t) => acc + (t.remainingBudget || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            Franchises & Purses
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-wide">
            Participating Teams
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            {teams.length} Franchises competing in the auction arena
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider font-mono shadow-glow-cyan flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Franchise</span>
          </button>
        )}
      </div>

      {/* Purse Overview Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/80">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center font-mono">
          <div>
            <div className="text-xs text-slate-500 uppercase font-bold">Total League Purse</div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {formatCurrency(totalPurse)}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase font-bold">Total Purse Spent</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
              {formatCurrency(totalSpent)}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase font-bold">Remaining Purse Pool</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
              {formatCurrency(totalRemaining)}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Teams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>

      {/* Add Team Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl glass-panel bg-slate-900 border border-cyan-500/40 p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 className="font-bold text-lg text-white font-display uppercase tracking-wide">
                Register New Franchise
              </h3>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTeam} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">Franchise Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Phoenix Blasters"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-sans text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Short Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PB"
                    value={newTeam.shortName}
                    onChange={(e) => setNewTeam({ ...newTeam, shortName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Logo Emoji</label>
                  <input
                    type="text"
                    value={newTeam.logo}
                    onChange={(e) => setNewTeam({ ...newTeam, logo: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">Manager Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Dravid"
                  value={newTeam.manager}
                  onChange={(e) => setNewTeam({ ...newTeam, manager: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-sans text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">Total Purse (₹)</label>
                <input
                  type="number"
                  value={newTeam.totalBudget}
                  onChange={(e) => setNewTeam({ ...newTeam, totalBudget: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-bold text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex gap-3">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-glow-cyan"
                >
                  Create Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
