import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  color = 'purple',
  showLabel = false,
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const colorGradients = {
    purple: 'from-purple-500 to-indigo-500',
    cyan: 'from-cyan-500 to-blue-500',
    emerald: 'from-emerald-500 to-teal-400',
    amber: 'from-amber-500 to-orange-400',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-400 mb-1.5">
          <span>Progress</span>
          <span className="font-mono text-slate-200">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden border border-white/5 ${sizeClasses[size] || sizeClasses.md}`}>
        <div
          className={`h-full bg-gradient-to-r ${colorGradients[color] || colorGradients.purple} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
