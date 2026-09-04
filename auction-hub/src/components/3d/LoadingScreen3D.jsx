import React, { useEffect, useState } from 'react';
import { Gavel, Sparkles, Trophy, Zap, Radio } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export default function LoadingScreen3D({ onComplete, autoDismiss = true, duration = 1600 }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { triggerBidSound } = useSound();

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        triggerBidSound();
        if (autoDismiss) {
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 500);
          }, 200);
        }
      }
    }, 25);

    return () => clearInterval(interval);
  }, [duration, autoDismiss, onComplete, triggerBidSound]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060912] transition-opacity duration-500 overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 3D Background Lighting Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-slate-950/80 to-[#060912] pointer-events-none" />

      {/* 3D Perspective Wireframe Floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-72 opacity-25 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(245, 158, 11, 0.3) 0%, transparent 100%)',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />

      {/* Center 3D Holographic Gavel & Ring Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        
        {/* 3D Rotating Golden Rings */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center mb-8">
          
          {/* Ring 1 - Fast outer */}
          <div
            className="absolute inset-0 rounded-full border-2 border-amber-500/40 animate-spin"
            style={{ animationDuration: '4s', transformStyle: 'preserve-3d', transform: 'rotateX(65deg)' }}
          />

          {/* Ring 2 - Reverse inner */}
          <div
            className="absolute inset-4 rounded-full border border-cyan-400/50 animate-spin"
            style={{ animationDuration: '3s', animationDirection: 'reverse', transformStyle: 'preserve-3d', transform: 'rotateY(60deg)' }}
          />

          {/* Ring 3 - Glowing amber accent */}
          <div
            className="absolute inset-8 rounded-full border-2 border-dashed border-amber-400/60 animate-spin"
            style={{ animationDuration: '8s', transformStyle: 'preserve-3d', transform: 'rotateX(45deg) rotateY(45deg)' }}
          />

          {/* 3D Glowing Core Gavel Emblem */}
          <div className="relative z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.6)] transform hover:scale-110 transition-transform animate-float border-2 border-white/30">
            <Gavel className="w-10 h-10 sm:w-12 sm:h-12 text-slate-950 stroke-[2.5]" />
          </div>

          {/* Radial Pulse Wave */}
          <div className="absolute inset-0 rounded-full bg-amber-500/10 animate-ping" style={{ animationDuration: '2s' }} />
        </div>

        {/* Title and Digital Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
            <Radio className="w-4 h-4 animate-pulse text-red-500" />
            <span>Connecting to Live Arena Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-wider uppercase">
            AUCTION<span className="text-amber-400">HUB</span> PRO
          </h2>

          <p className="text-xs text-slate-400 font-mono tracking-wide max-w-xs mx-auto">
            {progress < 40 ? 'Synchronizing Franchise Purses...' : progress < 80 ? 'Loading Marquee Athlete Radar Stats...' : 'Finalizing Live Auction Broadcast...'}
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-64 sm:w-80 mt-6 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Loading Assets</span>
            <span className="text-amber-400 font-bold">{progress}%</span>
          </div>

          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 rounded-full transition-all duration-75 shadow-[0_0_12px_#f59e0b]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
