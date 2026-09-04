import React from 'react';
import { Zap, Shield, Target, Award, Flame } from 'lucide-react';

export default function PlayerStatsRadar({ skillRadar = {} }) {
  const skills = [
    { label: 'Power Hitting', value: skillRadar.powerHitting || 80, icon: Flame, color: '#F59E0B' },
    { label: 'Death Bowling', value: skillRadar.deathBowling || 75, icon: Target, color: '#06B6D4' },
    { label: 'Fielding & Agility', value: skillRadar.fielding || 85, icon: Zap, color: '#10B981' },
    { label: 'Clutch / Match Winning', value: skillRadar.clutchRate || 88, icon: Award, color: '#8B5CF6' },
    { label: 'Season Consistency', value: skillRadar.consistency || 82, icon: Shield, color: '#EC4899' },
  ];

  return (
    <div className="space-y-3.5">
      {skills.map((skill) => {
        const IconComponent = skill.icon;
        return (
          <div key={skill.label}>
            <div className="flex items-center justify-between text-xs mb-1 font-mono">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <IconComponent className="w-3.5 h-3.5" style={{ color: skill.color }} />
                <span>{skill.label}</span>
              </span>
              <span className="font-bold text-white">{skill.value} / 100</span>
            </div>

            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${skill.value}%`,
                  backgroundColor: skill.color,
                  boxShadow: `0 0 10px ${skill.color}50`
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
