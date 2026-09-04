import React from 'react';
import { Volume2, VolumeX, Megaphone } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export default function SoundToggle({ className = "" }) {
  const { soundEnabled, toggleSound, triggerFaahSound } = useSound();

  return (
    <div className="flex items-center gap-1.5">
      {/* 1-Click FAAAH Hype Button */}
      <button
        onClick={() => triggerFaahSound(1.2, 1.4)}
        title="Play FAAAAAAAAAAAAAAAH Sound Effect!"
        className="px-2.5 py-1.5 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 text-amber-300 hover:text-amber-200 text-xs font-mono font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.2)] transition-all active:scale-95"
      >
        <span>📣 FAAAH!</span>
      </button>

      {/* Mute/Unmute toggle */}
      <button
        onClick={toggleSound}
        title={soundEnabled ? "Mute Auction Sound Effects" : "Enable Auction Sound Effects"}
        className={`relative p-2 rounded-xl border transition-all duration-200 flex items-center justify-center ${
          soundEnabled
            ? "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
            : "bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
        } ${className}`}
      >
        {soundEnabled ? (
          <Volume2 className="w-4 h-4 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
        <span className="sr-only">Toggle Sound</span>
      </button>
    </div>
  );
}
