import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle2, PlayCircle, Clock, Zap, BookOpen, ChevronRight, Youtube, ExternalLink } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';
import { motion } from 'framer-motion';

export const ModuleCard = ({
  module,
  isLocked = false,
  progress = { percent: 0, completed: 0, total: 0 },
  onSelect
}) => {
  const isCompleted = progress.percent === 100;
  const isStarted = progress.percent > 0 && progress.percent < 100;
  const firstLessonId = module.lessons?.[0]?.id || "lesson-1-1";

  return (
    <motion.div
      whileHover={!isLocked ? { y: -2 } : {}}
      className={`relative glass-card rounded-2xl p-5 sm:p-6 transition-all duration-200 border ${
        isLocked
          ? 'border-white/5 opacity-60 bg-slate-950/40 cursor-not-allowed'
          : isCompleted
          ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-950/10 via-slate-900/60 to-slate-950/80 shadow-glow-emerald/5'
          : isStarted
          ? 'border-purple-500/30 bg-gradient-to-br from-purple-950/15 via-slate-900/60 to-slate-950/80 shadow-glow-sm'
          : 'border-white/10 hover:border-purple-500/30'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Module Number & Title Area */}
        <div className="flex items-start space-x-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-base shrink-0 border ${
              isLocked
                ? 'bg-slate-800/60 text-slate-500 border-white/5'
                : isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : isStarted
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                : 'bg-slate-800 text-slate-300 border-white/10'
            }`}
          >
            {isLocked ? (
              <Lock className="w-5 h-5" />
            ) : isCompleted ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            ) : (
              <span>{String(module.moduleNumber).padStart(2, '0')}</span>
            )}
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono">
                Module {module.moduleNumber}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5 font-mono">
                {module.category}
              </span>
              {module.videoTimestamp && (
                <a
                  href={module.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/30 font-mono flex items-center gap-1 transition"
                  title="Watch timestamp on YouTube"
                >
                  <Youtube className="w-3 h-3 text-rose-400" />
                  <span>{module.videoTimestamp}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </a>
              )}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono flex items-center gap-1">
                <Zap className="w-3 h-3 fill-purple-400" />
                +{module.xpReward} XP
              </span>
            </div>

            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              {module.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
              {module.description}
            </p>
          </div>
        </div>

        {/* Action Button & Meta */}
        <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
          <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              {module.lessonsCount} {module.lessonsCount === 1 ? 'lesson' : 'lessons'}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {module.estimatedMinutes}m
            </span>
          </div>

          {isLocked ? (
            <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/80 text-slate-500 text-xs font-medium border border-white/5 cursor-not-allowed">
              <Lock className="w-3.5 h-3.5" />
              <span>Locked</span>
            </div>
          ) : (
            <Link
              to={`/learn/${firstLessonId}`}
              className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                isCompleted
                  ? 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30'
                  : isStarted
                  ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-glow-sm'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-white/10'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>{isCompleted ? 'Review' : isStarted ? 'Continue' : 'Start'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Progress Bar inside card */}
      {!isLocked && (
        <div className="mt-4 pt-3 border-t border-white/5">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5 font-mono">
            <span>
              {progress.completed} of {progress.total} completed
            </span>
            <span className={isCompleted ? 'text-emerald-400 font-bold' : 'text-purple-400'}>
              {progress.percent}%
            </span>
          </div>
          <ProgressBar
            value={progress.completed}
            max={progress.total || 1}
            color={isCompleted ? 'emerald' : 'purple'}
            size="sm"
          />
        </div>
      )}
    </motion.div>
  );
};
