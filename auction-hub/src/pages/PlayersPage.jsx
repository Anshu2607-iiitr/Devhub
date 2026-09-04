import React, { useState } from 'react';
import { useAuction } from '../context/AuctionContext';
import { useAuth } from '../context/AuthContext';
import PlayerCard from '../components/player/PlayerCard';
import PlayerFilter from '../components/player/PlayerFilter';
import { Users, Plus, X, Sparkles, UserPlus } from 'lucide-react';

export default function PlayersPage() {
  const { players, setPlayers } = useAuction();
  const { isAdmin } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New Player Form State
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    nickname: '',
    role: 'Batsman',
    category: 'Marquee Pool',
    age: 24,
    country: 'India',
    state: 'Mumbai',
    playingStyle: 'Right-Hand Bat',
    basePrice: 50000,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    matches: 20,
    runs: 450,
    wickets: 0,
    strikeRate: 140.0,
  });

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!newPlayer.name) return;

    const created = {
      id: `p-${Date.now()}`,
      name: newPlayer.name,
      nickname: newPlayer.nickname || '',
      role: newPlayer.role,
      category: newPlayer.category,
      age: Number(newPlayer.age),
      country: newPlayer.country,
      state: newPlayer.state,
      playingStyle: newPlayer.playingStyle,
      basePrice: Number(newPlayer.basePrice),
      image: newPlayer.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      status: 'UPCOMING',
      soldPrice: null,
      soldToTeamId: null,
      soldToTeamName: null,
      statistics: {
        matches: Number(newPlayer.matches) || 0,
        runs: Number(newPlayer.runs) || 0,
        wickets: Number(newPlayer.wickets) || 0,
        battingAverage: 35.0,
        strikeRate: Number(newPlayer.strikeRate) || 135.0,
        economy: 7.5,
        bestBowling: 'N/A',
        highScore: 75,
        fifties: 2,
        catches: 8
      },
      skillRadar: {
        powerHitting: 85,
        deathBowling: 70,
        fielding: 80,
        clutchRate: 80,
        consistency: 80
      },
      bio: 'Newly registered player ready for the live auction draft.'
    };

    setPlayers(prev => [created, ...prev]);
    setAddModalOpen(false);
  };

  const filteredPlayers = players.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.playingStyle?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === 'All' || p.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            Talent Pool
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-wide">
            Player Database
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Showing {filteredPlayers.length} of {players.length} registered players
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono shadow-glow-gold flex items-center gap-2 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Player</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <PlayerFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      {/* Grid of Players */}
      {filteredPlayers.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center text-slate-500 font-mono text-sm border border-slate-800">
          No players match your search and filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}

      {/* Add Player Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl glass-panel bg-slate-900 border border-amber-500/40 p-6 sm:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 className="font-bold text-lg text-white font-display uppercase tracking-wide">
                Register New Player
              </h3>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPlayer} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sanju Samson"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-sans text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Role</label>
                  <select
                    value={newPlayer.role}
                    onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-sans text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
                    <option value="All-Rounder">All-Rounder</option>
                    <option value="Wicket Keeper">Wicket Keeper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Base Price (₹)</label>
                  <input
                    type="number"
                    value={newPlayer.basePrice}
                    onChange={(e) => setNewPlayer({ ...newPlayer, basePrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-bold text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Playing Style</label>
                  <input
                    type="text"
                    placeholder="e.g. Right-Arm Fast"
                    value={newPlayer.playingStyle}
                    onChange={(e) => setNewPlayer({ ...newPlayer, playingStyle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-sans text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">State / Team</label>
                  <input
                    type="text"
                    placeholder="e.g. Kerala"
                    value={newPlayer.state}
                    onChange={(e) => setNewPlayer({ ...newPlayer, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-sans text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Matches</label>
                  <input
                    type="number"
                    value={newPlayer.matches}
                    onChange={(e) => setNewPlayer({ ...newPlayer, matches: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Runs</label>
                  <input
                    type="number"
                    value={newPlayer.runs}
                    onChange={(e) => setNewPlayer({ ...newPlayer, runs: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Wickets</label>
                  <input
                    type="number"
                    value={newPlayer.wickets}
                    onChange={(e) => setNewPlayer({ ...newPlayer, wickets: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
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
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-glow-gold"
                >
                  Save Player
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
