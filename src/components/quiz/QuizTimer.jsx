import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export const QuizTimer = ({ initialSeconds = 180, onTimeExpired, isPaused = false }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (isPaused) return;

    if (secondsLeft <= 0) {
      if (onTimeExpired) onTimeExpired();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, isPaused, onTimeExpired]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isUrgent = secondsLeft < 30;

  return (
    <div
      className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border transition-colors ${
        isUrgent
          ? 'bg-rose-500/15 border-rose-500/40 text-rose-400 animate-pulse'
          : 'bg-slate-900/80 border-white/10 text-slate-300'
      }`}
    >
      <Clock className={`w-3.5 h-3.5 ${isUrgent ? 'text-rose-400' : 'text-purple-400'}`} />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};
