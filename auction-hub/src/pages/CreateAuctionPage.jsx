import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuction } from '../context/AuctionContext';
import { formatCurrency } from '../utils/currency';
import {
  Gavel,
  Users,
  Trophy,
  Settings,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles
} from 'lucide-react';

export default function CreateAuctionPage() {
  const navigate = useNavigate();
  const { setAuction, setTeams, setPlayers, resetAuction } = useAuction();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    name: 'Premier League Auction 2026',
    tournament: 'National Championship',
    sport: 'Cricket',
    date: '2026-09-05',
    time: '18:00 IST',
    pursePerTeam: 5000000,
    maxSquadSize: 15,
    minSquadSize: 11,
    timerDuration: 25,
    minIncrement: 5000,
  });

  const [customTeams, setCustomTeams] = useState([
    { id: 'team-1', name: 'Royal Warriors', shortName: 'RW', logo: '👑', color: '#F59E0B', manager: 'Vikram Singh' },
    { id: 'team-2', name: 'Titans United', shortName: 'TTN', logo: '⚡', color: '#06B6D4', manager: 'Kabir Roy' },
    { id: 'team-3', name: 'Super Kings', shortName: 'CSK', logo: '🦁', color: '#EAB308', manager: 'Mahesh N' },
    { id: 'team-4', name: 'Knights Brigade', shortName: 'KKB', logo: '🛡️', color: '#8B5CF6', manager: 'Shashank M' }
  ]);

  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamShort, setNewTeamShort] = useState('');
  const [newTeamEmoji, setNewTeamEmoji] = useState('🔥');

  const addTeam = () => {
    if (!newTeamName) return;
    const newTeamObj = {
      id: `team-${Date.now()}`,
      name: newTeamName,
      shortName: newTeamShort || newTeamName.substring(0, 3).toUpperCase(),
      logo: newTeamEmoji || '⚡',
      color: '#10B981',
      manager: 'Franchise Manager'
    };
    setCustomTeams([...customTeams, newTeamObj]);
    setNewTeamName('');
    setNewTeamShort('');
  };

  const removeTeam = (id) => {
    setCustomTeams(customTeams.filter(t => t.id !== id));
  };

  const handleFinishCreate = () => {
    const formattedTeams = customTeams.map(t => ({
      ...t,
      totalBudget: Number(formData.pursePerTeam),
      remainingBudget: Number(formData.pursePerTeam),
      spentBudget: 0,
      squadLimit: Number(formData.maxSquadSize),
      minSquad: Number(formData.minSquadSize),
      squad: [],
      bidsCount: 0,
      active: true
    }));

    const newAuctionObj = {
      id: `auction-${Date.now()}`,
      name: formData.name,
      tournament: formData.tournament,
      sport: formData.sport,
      date: formData.date,
      time: formData.time,
      status: 'LIVE',
      round: 1,
      totalRounds: 10,
      timerDuration: Number(formData.timerDuration),
      minIncrement: Number(formData.minIncrement),
      totalPursePerTeam: Number(formData.pursePerTeam),
      maxSquadSize: Number(formData.maxSquadSize),
      minSquadSize: Number(formData.minSquadSize),
      currentPlayerId: 'p-1',
      currentBid: 50000,
      leadingTeamId: null,
      leadingTeamName: null,
      leadingTeamColor: null,
      timerRemaining: Number(formData.timerDuration),
      isPaused: false,
      bidHistory: []
    };

    setAuction(newAuctionObj);
    setTeams(formattedTeams);

    navigate(`/live/${newAuctionObj.id}`);
  };

  const steps = [
    { num: 1, title: 'Tournament Details', icon: Trophy },
    { num: 2, title: 'Franchise Teams', icon: Users },
    { num: 3, title: 'Player Pool', icon: Gavel },
    { num: 4, title: 'Auction Rules', icon: Settings },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          Auction Setup Wizard
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-wide">
          Create New Live Auction Event
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
          Configure tournament parameters, participating franchises, and bidding rules
        </p>
      </div>

      {/* Wizard Step Progress Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {steps.map((step) => {
          const IconComp = step.icon;
          const isPassed = currentStep > step.num;
          const isCurrent = currentStep === step.num;

          return (
            <div
              key={step.num}
              onClick={() => setCurrentStep(step.num)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                isCurrent
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-glow-gold'
                  : isPassed
                  ? 'bg-slate-900/90 border-slate-700 text-slate-300'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                isCurrent ? 'bg-amber-500 text-slate-950 font-black' : isPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
              }`}>
                {isPassed ? <CheckCircle className="w-4 h-4" /> : step.num}
              </div>
              <div className="text-xs font-bold font-mono truncate">
                {step.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* WIZARD CARD BODY */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/90 shadow-2xl">
        
        {/* STEP 1: Details */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-white font-display uppercase tracking-wide mb-4">
              Step 1: Tournament & Sport Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1.5">Auction Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-sans text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1.5">Tournament Series</label>
                <input
                  type="text"
                  value={formData.tournament}
                  onChange={(e) => setFormData({ ...formData, tournament: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-sans text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1.5">Sport Type</label>
                <select
                  value={formData.sport}
                  onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-sans text-sm focus:border-amber-500 focus:outline-none"
                >
                  <option value="Cricket">Cricket (IPL Style)</option>
                  <option value="Football">Football / Soccer</option>
                  <option value="Esports">Esports Gaming League</option>
                  <option value="Custom">Custom Sports Tournament</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1.5">Purse Per Team (₹)</label>
                <input
                  type="number"
                  value={formData.pursePerTeam}
                  onChange={(e) => setFormData({ ...formData, pursePerTeam: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-bold text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Teams */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-white font-display uppercase tracking-wide mb-4">
              Step 2: Franchise Teams ({customTeams.length})
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Franchise Name"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Code (e.g. RW)"
                value={newTeamShort}
                onChange={(e) => setNewTeamShort(e.target.value)}
                className="w-28 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Emoji"
                value={newTeamEmoji}
                onChange={(e) => setNewTeamEmoji(e.target.value)}
                className="w-20 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-center text-sm focus:border-cyan-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={addTeam}
                className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase font-mono shadow-glow-cyan"
              >
                Add Team
              </button>
            </div>

            <div className="space-y-2 pt-2">
              {customTeams.map((team) => (
                <div
                  key={team.id}
                  className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{team.logo}</span>
                    <span className="font-bold text-sm text-white">{team.name} ({team.shortName})</span>
                  </div>
                  <button
                    onClick={() => removeTeam(team.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Player Pool */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-white font-display uppercase tracking-wide mb-2">
              Step 3: Player Pool Seed
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-4">
              The tournament will be initialized with the 12+ verified marquee players already curated in AuctionHub with realistic statistics.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Default Seed Talent Pool:</span>
              <span className="text-amber-400 font-bold">12 Marquee Athletes Loaded</span>
            </div>
          </div>
        )}

        {/* STEP 4: Rules */}
        {currentStep === 4 && (
          <div className="space-y-4 text-xs font-mono">
            <h3 className="font-bold text-lg text-white font-display uppercase tracking-wide mb-4">
              Step 4: Auction Bidding Rules & Timers
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1.5">Timer Per Bid (Sec)</label>
                <input
                  type="number"
                  value={formData.timerDuration}
                  onChange={(e) => setFormData({ ...formData, timerDuration: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1.5">Min Increment (₹)</label>
                <input
                  type="number"
                  value={formData.minIncrement}
                  onChange={(e) => setFormData({ ...formData, minIncrement: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1.5">Max Squad Limit</label>
                <input
                  type="number"
                  value={formData.maxSquadSize}
                  onChange={(e) => setFormData({ ...formData, maxSquadSize: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 font-bold text-xs uppercase font-mono flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase font-mono shadow-glow-gold flex items-center gap-1.5 transition-all"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishCreate}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm uppercase font-display tracking-wider shadow-glow-green flex items-center gap-2 transition-all hover:scale-105"
            >
              <Gavel className="w-5 h-5 stroke-[2.5]" />
              <span>Launch Live Auction</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
