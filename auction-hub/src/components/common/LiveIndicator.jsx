import React from 'react';

export default function LiveIndicator({ text = "LIVE AUCTION", pulse = true, size = "md" }) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1.5",
    md: "px-3 py-1 text-xs md:text-sm gap-2 font-bold",
    lg: "px-4 py-1.5 text-sm md:text-base gap-2.5 font-bold tracking-wider"
  };

  return (
    <div className={`inline-flex items-center rounded-full bg-red-500/10 border border-red-500/40 text-red-400 font-mono tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.25)] ${sizeClasses[size] || sizeClasses.md}`}>
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        )}
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_8px_#ef4444]"></span>
      </span>
      <span>{text}</span>
    </div>
  );
}
