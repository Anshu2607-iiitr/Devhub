import React from 'react';
import { formatCurrency } from '../../utils/currency';
import { AlertOctagon, ArrowRight, RotateCcw, X } from 'lucide-react';

export default function UnsoldModal({ unsoldData, onClose, onNextPlayer, onRetry }) {
  if (!unsoldData) return null;

  const { player } = unsoldData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-md rounded-3xl glass-panel bg-slate-900/95 border border-slate-700/80 p-6 sm:p-7 shadow-2xl text-center animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* UNSOLD Banner */}
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 font-display font-black text-2xl uppercase tracking-widest mb-4">
          <AlertOctagon className="w-5 h-5 text-red-400" />
          <span>UNSOLD</span>
        </div>

        {/* Player Info */}
        <div className="flex items-center justify-center gap-4 my-4">
          <img
            src={player.image}
            alt={player.name}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-700 opacity-75 grayscale"
          />
          <div className="text-left">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold uppercase">
              {player.role}
            </span>
            <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide mt-0.5">
              {player.name}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Base Price: {formatCurrency(player.basePrice)}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6">
          No bids were registered above the base price before the auction timer elapsed.
        </p>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => {
              onClose();
              if (onRetry) onRetry();
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-auction</span>
          </button>
          <button
            onClick={() => {
              onClose();
              if (onNextPlayer) onNextPlayer();
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Next Player</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
