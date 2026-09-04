import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Play,
  Flame,
  Zap,
  Target,
  BookOpen,
  Award,
  ArrowRight,
  TrendingUp,
  Clock,
  Compass,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { StatCard } from '../components/common/StatCard';
import { StreakCard } from '../components/common/StreakCard';
import { XPCard } from '../components/common/XPCard';
import { ActivityChart } from '../components/common/ActivityChart';
import { ProgressBar } from '../components/common/ProgressBar';
import { JAVA_MODULES } from '../data/mockCourseData';
import { INITIAL_USER } from '../data/mockUserData';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { getOverallProgress, getModuleProgress, completedLessons } = useProgress();

  const { percent, completedCount, totalLessons } = getOverallProgress();

  const firstIncompleteLesson = (() => {
    for (const mod of JAVA_MODULES) {
      for (const lesson of mod.lessons) {
        if (!completedLessons.includes(lesson.id)) {
          return { ...lesson, moduleTitle: mod.title, moduleId: mod.id };
        }
      }
    }
    return { ...JAVA_MODULES[0].lessons[0], moduleTitle: JAVA_MODULES[0].title, moduleId: JAVA_MODULES[0].id };
  })();

  const currentStreak = user?.streak || 7;
  const currentXp = user?.totalXp || 850;
  const accuracy = user?.quizAccuracy || 92;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-purple-400 font-medium mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LEARNING COCKPIT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {user?.name || "Developer"} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            You're on a <span className="text-amber-400 font-bold font-mono">{currentStreak}-day streak</span> across 31 full stack Java & cloud modules.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to={`/learn/${firstIncompleteLesson.id}`}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-sm flex items-center space-x-2 transition"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Resume Lesson</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Curriculum Progress"
          value={`${percent}%`}
          subvalue={`${completedCount}/${totalLessons} lessons`}
          icon={Award}
          color="purple"
          trend="+12% this week"
        />
        <StatCard
          title="Quiz Accuracy"
          value={`${accuracy}%`}
          subvalue="Avg score"
          icon={Target}
          color="emerald"
          trend="Top 5% of learners"
        />
        <StatCard
          title="Active Streak"
          value={`${currentStreak} Days`}
          subvalue="Fire multiplier active"
          icon={Flame}
          color="amber"
          trend="Next milestone: 10 days"
        />
        <StatCard
          title="Experience Points"
          value={currentXp.toLocaleString()}
          subvalue={`Rank ${user?.rank || "#42"}`}
          icon={Zap}
          color="cyan"
          trend="+190 XP today"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-950/40 via-slate-900/90 to-slate-950 border border-purple-500/30 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <BookOpen className="w-48 h-48 text-purple-400" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between text-xs font-mono text-purple-300 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30">
                  CONTINUE LEARNING
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {firstIncompleteLesson.duration || "15 min"}
                </span>
              </div>

              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-2">
                {firstIncompleteLesson.moduleTitle}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                {firstIncompleteLesson.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 max-w-xl">
                {firstIncompleteLesson.description}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="w-full sm:w-1/2">
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>Module Progress</span>
                    <span className="text-purple-400 font-bold">
                      {getModuleProgress(firstIncompleteLesson.moduleId).percent}%
                    </span>
                  </div>
                  <ProgressBar
                    value={getModuleProgress(firstIncompleteLesson.moduleId).percent}
                    max={100}
                    color="purple"
                    size="sm"
                  />
                </div>

                <Link
                  to={`/learn/${firstIncompleteLesson.id}`}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 transition shadow-glow-sm flex items-center justify-center space-x-2"
                >
                  <span>Enter Lesson & Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <ActivityChart data={INITIAL_USER.activityHistory} />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <StreakCard streak={currentStreak} />
          <XPCard totalXp={currentXp} level={user?.level || 4} levelTitle={user?.levelTitle || "Code Architect"} />

          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Compass className="w-4 h-4" />
                HOT TOPIC: SPRING AI
              </span>
              <span className="text-purple-400 font-bold">+300 XP</span>
            </div>

            <h3 className="text-sm font-bold text-white">
              DeepSeek Open Source with Ollama & Spring AI
            </h3>
            <p className="text-xs text-slate-400">
              Connect local reasoning models to Spring Boot with 100% data privacy.
            </p>

            <Link
              to="/learn/lesson-25-1"
              className="mt-2 w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-between transition"
            >
              <span>Launch DeepSeek Module</span>
              <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Active Curriculum Tracks</h2>
            <p className="text-xs text-slate-400">Explore across 31 modern full-stack modules</p>
          </div>
          <Link
            to="/course/java"
            className="text-xs font-semibold font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            <span>View All 31 Modules</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {JAVA_MODULES.slice(0, 3).map((mod) => {
            const prog = getModuleProgress(mod.id);
            const isCompleted = prog.percent === 100;
            return (
              <div
                key={mod.id}
                className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span className="text-purple-400 font-bold">Module {mod.moduleNumber}</span>
                    {isCompleted ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span>{prog.completed}/{prog.total} lessons</span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">{mod.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{mod.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
                  <ProgressBar value={prog.percent} max={100} color={isCompleted ? 'emerald' : 'purple'} size="sm" />
                  <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
                    <span>{prog.percent}% Done</span>
                    <Link
                      to={`/learn/${mod.lessons[0].id}`}
                      className="text-purple-400 hover:underline font-semibold"
                    >
                      {isCompleted ? 'Review' : 'Continue'}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
