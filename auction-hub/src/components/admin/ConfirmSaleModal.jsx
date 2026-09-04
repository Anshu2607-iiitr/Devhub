import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/currency';
import { Gavel, Check, X, AlertTriangle } from 'lucide-react';

export default function ConfirmSaleModal({ isOpen, onClose, onConfirm, player, leadingTeam, currentBid, teams }) {
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [finalPrice, setFinalPrice] = useState('');

  useEffect(() => {
    if (leadingTeam) {
      setSelectedTeamId(leadingTeam.id);
    } else if (teams && teams.length > 0) {
      setSelectedTeamId(teams[0].id);
    }
    setFinalPrice(currentBid || player?.basePrice || 0);
  }, [leadingTeam, currentBid, player, teams, isOpen]);

  if (!isOpen || !player) return null;

  const targetTeam = teams.find(t => t.id === selectedTeamId) || leadingTeam;

  const handleConfirm = () => {
    onConfirm(selectedTeamId, Number(finalPrice));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl glass-panel-glow bg-slate-900/95 border border-amber-500/50 p-6 sm:p-7 shadow-2xl text-left animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-400">
            <Gavel className="w-5 h-5" />
            <h3 className="font-bold text-lg text-white font-display uppercase tracking-wide">
              Confirm Player Sale
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Player Snapshot */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 mb-4">
          <img
            src={player.image}
            alt={player.name}
            className="w-14 h-14 rounded-xl object-cover border border-amber-500/30"
          />
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold uppercase">
              {player.role}
            </span>
            <div className="font-bold text-white text-base mt-0.5">{player.name}</div>
            <div className="text-xs text-slate-400 font-mono">
              Base: {formatCurrency(player.basePrice)}
            </div>
          </div>
        </div>

        {/* Form controls for buyer and price */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase font-bold mb-1.5">
              Award to Franchise:
            </label>
            <select
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm font-semibold text-white focus:outline-none focus:border-amber-500"
            >
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name} (Purse: {formatCurrency(team.remainingBudget, true)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase font-bold mb-1.5">
              Final Hammer Price (₹):
            </label>
            <input
              type="number"
              value={finalPrice}
              onChange={(e) => setFinalPrice(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm font-mono font-bold text-amber-400 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-glow-gold transition-all flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Confirm Sale</span>
          </button>
        </div>

      </div>
    </div>
  );
}
