import React from 'react';
import {
  Calendar,
  Mail,
  Award,
  Zap,
  Flame,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { INITIAL_USER } from '../data/mockUserData';
import { StatCard } from '../components/common/StatCard';

export const ProfilePage = () => {
  const { user } = useAuth();
  const { getOverallProgress } = useProgress();
  const { percent } = getOverallProgress();

  return (
    <div className="space-y-8 pb-16">
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={user?.avatar || INITIAL_USER.avatar}
            alt={user?.name || "Alex Rivera"}
            className="w-24 h-24 rounded-2xl object-cover ring-2 ring-purple-500 shadow-glow-sm"
          />

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {user?.name || "Alex Rivera"}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-medium">
                {user?.levelTitle || "Code Architect"}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                {user?.email || "alex@devhub.io"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Member since Jan 2026
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Full stack engineer mastering Java 21, Spring Boot 3.2, Kafka event streaming, and DeepSeek Spring AI.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Overall Rank"
          value={user?.rank || "#42"}
          subvalue="Global developer ranking"
          icon={Award}
          color="purple"
        />
        <StatCard
          title="Total Experience"
          value={`${(user?.totalXp || 850).toLocaleString()} XP`}
          subvalue="Level 4 Master"
          icon={Zap}
          color="cyan"
        />
        <StatCard
          title="Daily Streak"
          value={`${user?.streak || 7} Days`}
          subvalue="Active streak"
          icon={Flame}
          color="amber"
        />
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-purple-500/30 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-purple-300">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>ENTERPRISE JAVA & CLOUD CERTIFICATION</span>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">{percent}% Completed</span>
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight">
          DevHub Certified Java Full Stack & AI Architect
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Complete all 31 modules and maintain 80%+ quiz accuracy across Core Java, Spring Boot, Security, Cloud, and Spring AI to unlock your verifiable credential badge.
        </p>

        <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs font-mono">
          <div className="text-slate-400">
            Status: <span className="text-amber-400 font-semibold">{31 - Math.floor((percent/100)*31)} Modules Remaining</span>
          </div>
          <span className="text-slate-500">Credential ID: DHUB-2026-JAVA-31-FULLSTACK</span>
        </div>
      </div>
    </div>
  );
};
