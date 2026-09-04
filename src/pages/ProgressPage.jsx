import React from 'react';
import {
  TrendingUp,
  Award,
  Flame,
  Zap,
  Target,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { ActivityChart } from '../components/common/ActivityChart';
import { ProgressBar } from '../components/common/ProgressBar';
import { StatCard } from '../components/common/StatCard';
import { JAVA_MODULES } from '../data/mockCourseData';
import { INITIAL_USER } from '../data/mockUserData';

export const ProgressPage = () => {
  const { user } = useAuth();
  const { getOverallProgress, getModuleProgress } = useProgress();

  const { percent, completedCount, totalLessons } = getOverallProgress();
  const streak = user?.streak || 7;
  const xp = user?.totalXp || 850;
  const accuracy = user?.quizAccuracy || 92;

  const strongTopics = INITIAL_USER.topicMastery.strong;
  const weakTopics = INITIAL_USER.topicMastery.weak;

  return (
    <div className="space-y-8 pb-16">
      <div>
        <div className="flex items-center space-x-2 text-xs font-mono text-purple-400 font-medium mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PERFORMANCE & DOMAIN COMPETENCIES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Curriculum Mastery & Radar
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Detailed metrics across all 31 full stack, Spring Boot, DevOps, and Spring AI modules.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Progress"
          value={`${percent}%`}
          subvalue={`${completedCount}/${totalLessons} Lessons`}
          icon={Award}
          color="purple"
        />
        <StatCard
          title="Average Accuracy"
          value={`${accuracy}%`}
          subvalue="Across all quiz attempts"
          icon={Target}
          color="emerald"
        />
        <StatCard
          title="Active Streak"
          value={`${streak} Days`}
          subvalue="Consistency index"
          icon={Flame}
          color="amber"
        />
        <StatCard
          title="Total Experience"
          value={xp.toLocaleString()}
          subvalue="XP Earned"
          icon={Zap}
          color="cyan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <ActivityChart data={INITIAL_USER.activityHistory} />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-2xl p-5 border border-emerald-500/20 space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Strong Topics (90%+ Accuracy)
            </span>

            <div className="space-y-2.5">
              {strongTopics.map((topic, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="text-slate-200 font-medium">{topic.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{topic.category}</div>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">{topic.score}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-rose-500/20 space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Priority Review Topics
            </span>

            <div className="space-y-2.5">
              {weakTopics.map((topic, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="text-slate-200 font-medium">{topic.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{topic.category}</div>
                  </div>
                  <span className="font-mono text-rose-400 font-bold">{topic.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">All 31 Modules Mastery Breakdown</h3>
            <p className="text-xs text-slate-400">Track completions and XP rewards across every domain</p>
          </div>
          <span className="text-xs font-mono text-purple-400 font-bold">31 Modules</span>
        </div>

        <div className="space-y-3 pt-2 max-h-[500px] overflow-y-auto pr-2">
          {JAVA_MODULES.map((mod) => {
            const prog = getModuleProgress(mod.id);
            const isCompleted = prog.percent === 100;

            return (
              <div
                key={mod.id}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center space-x-3 min-w-[240px]">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isCompleted ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {mod.moduleNumber}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{mod.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{mod.category}</div>
                  </div>
                </div>

                <div className="flex-1 max-w-md mx-0 sm:mx-4">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>{prog.completed} of {prog.total} lessons</span>
                    <span className={isCompleted ? 'text-emerald-400 font-bold' : 'text-purple-400'}>
                      {prog.percent}%
                    </span>
                  </div>
                  <ProgressBar value={prog.percent} max={100} color={isCompleted ? 'emerald' : 'purple'} size="sm" />
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-purple-300 font-semibold">
                    +{mod.xpReward} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
