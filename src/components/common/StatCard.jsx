import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({
  title,
  value,
  subvalue,
  icon: Icon,
  trend,
  color = 'purple',
  className = '',
  onClick
}) => {
  const colorMap = {
    purple: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/20',
      glow: 'shadow-purple-500/5',
    },
    amber: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/20',
      glow: 'shadow-amber-500/5',
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/20',
      glow: 'shadow-cyan-500/5',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/20',
      glow: 'shadow-emerald-500/5',
    },
    rose: {
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      border: 'border-rose-500/20',
      glow: 'shadow-rose-500/5',
    }
  };

  const c = colorMap[color] || colorMap.purple;

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      onClick={onClick}
      className={`glass-card rounded-2xl p-5 border border-white/10 ${c.glow} ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${c.bg} ${c.text} ${c.border} border`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline space-x-2">
        <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
          {value}
        </div>
        {subvalue && (
          <span className="text-xs font-medium text-slate-400">{subvalue}</span>
        )}
      </div>

      {trend && (
        <div className="mt-2.5 flex items-center space-x-1.5 text-xs text-emerald-400 font-medium">
          <span>{trend}</span>
        </div>
      )}
    </motion.div>
  );
};
