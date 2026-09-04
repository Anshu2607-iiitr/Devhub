import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { formatCurrency } from '../../utils/currency';
import { Gavel, Trophy, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SoldCelebrationModal({ soldData, onClose, onNextPlayer }) {
  useEffect(() => {
    if (!soldData) return;

    // Trigger double confetti blast
    const count = 200;
    const defaults = {
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#FBBF24', '#06B6D4', '#10B981', '#ffffff']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, [soldData]);

  if (!soldData) return null;

  const { player, team, finalPrice } = soldData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Celebration Container */}
      <div className="relative w-full max-w-lg rounded-3xl glass-panel-glow bg-slate-900/95 border-2 border-amber-500/80 p-6 sm:p-8 shadow-[0_0_80px_rgba(245,158,11,0.35)] text-center animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SOLD Hammer Stamp Banner */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-display font-black text-2xl sm:text-3xl uppercase tracking-widest shadow-2xl mb-4 transform -rotate-1 border-2 border-white/40 animate-gavel-slam">
          <Gavel className="w-6 h-6 stroke-[3]" />
          <span>SOLD!</span>
        </div>

        {/* Player Spotlight */}
        <div className="flex items-center justify-center gap-4 my-4">
          <div className="relative">
            <img
              src={player.image}
              alt={player.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-amber-400 shadow-glow-gold"
            />
            <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg bg-slate-900 border border-amber-400 flex items-center justify-center text-sm shadow">
              {team.logo}
            </div>
          </div>
          <div className="text-left">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold uppercase">
              {player.role}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-wide mt-1">
              {player.name}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Base: {formatCurrency(player.basePrice)}
            </p>
          </div>
        </div>

        {/* Winning Bid Display */}
        <div className="bg-slate-950/90 border border-amber-500/30 rounded-2xl p-4 my-5 shadow-inner">
          <div className="text-xs uppercase font-mono text-slate-400 font-semibold mb-1">
            Sold to Franchise
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-400 font-display uppercase tracking-wider flex items-center justify-center gap-2">
            <span>{team.name}</span>
          </div>
          
          <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
            {formatCurrency(finalPrice)}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Review Details
          </button>
          <button
            onClick={() => {
              onClose();
              if (onNextPlayer) onNextPlayer();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-glow-gold flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <span>Next Player</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
