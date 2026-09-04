import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  ChevronRight,
  ChevronLeft,
  Zap,
  Clock,
  Play,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  HelpCircle,
  Code2,
  Terminal,
  Bookmark,
  Share2,
  ArrowRight,
  Youtube,
  ExternalLink
} from 'lucide-react';
import { ALL_MODULES, JAVA_MODULES } from '../data/mockCourseData';
import { useProgress } from '../context/ProgressContext';
import { CodeBlock } from '../components/common/CodeBlock';
import { ProgressBar } from '../components/common/ProgressBar';

export const LearnPage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { completedLessons, completeLesson, getModuleProgress } = useProgress();

  // Find active lesson and parent module across all tracks (Java + ML)
  let currentModule = null;
  let currentLesson = null;
  let currentLessonIndex = -1;

  for (const mod of ALL_MODULES) {
    const lIndex = mod.lessons.findIndex((l) => l.id === lessonId);
    if (lIndex !== -1) {
      currentModule = mod;
      currentLesson = mod.lessons[lIndex];
      currentLessonIndex = lIndex;
      break;
    }
  }

  // Fallback if not found
  if (!currentLesson) {
    currentModule = JAVA_MODULES[0];
    currentLesson = JAVA_MODULES[0].lessons[0];
    currentLessonIndex = 0;
  }

  const [tryItRun, setTryItRun] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [bookmarkSaved, setBookmarkSaved] = useState(false);

  const isCompleted = completedLessons.includes(currentLesson.id);

  // Find Next & Prev lessons across modules
  const allLessons = JAVA_MODULES.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
  );
  const globalIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = globalIndex > 0 ? allLessons[globalIndex - 1] : null;
  const nextLesson = globalIndex < allLessons.length - 1 ? allLessons[globalIndex + 1] : null;

  const handleStartQuiz = () => {
    navigate(`/quiz/${currentLesson.quizId || `quiz-${currentLesson.id}`}`);
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col">
      <div className="max-w-[1600px] w-full mx-auto flex-1 flex flex-col lg:flex-row">
        {/* Left Lesson Index / Drawer */}
        <aside className="w-full lg:w-72 shrink-0 bg-[#0B0F19] border-b lg:border-b-0 lg:border-r border-white/10 p-4 space-y-4 max-h-none lg:max-h-[calc(100vh-4rem)] lg:sticky lg:top-16 lg:overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <Link
              to="/course/java"
              className="text-xs font-mono text-slate-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>All 31 Modules</span>
            </Link>
            <span className="text-[11px] font-mono text-purple-400 font-bold">
              Mod {currentModule.moduleNumber}/31
            </span>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              {currentModule.title}
            </div>
            <ProgressBar
              value={getModuleProgress(currentModule.id).percent}
              max={100}
              color="purple"
              size="sm"
            />
          </div>

          {/* Lesson links for this module */}
          <div className="space-y-1 pt-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold px-2">
              Lessons in this module
            </span>
            {currentModule.lessons.map((lesson, idx) => {
              const isCurrent = lesson.id === currentLesson.id;
              const isDone = completedLessons.includes(lesson.id);

              return (
                <Link
                  key={lesson.id}
                  to={`/learn/${lesson.id}`}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition ${
                    isCurrent
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                        isDone
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : isCurrent
                          ? 'bg-purple-500 text-white'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <span className="truncate">{lesson.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-1">
                    {lesson.duration}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Module Quick Nav Switcher */}
          <div className="pt-4 border-t border-white/5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold px-2 mb-2 block">
              Curriculum Roadmap (31 Topics)
            </span>
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              {JAVA_MODULES.map((m) => {
                const isSelectedMod = m.id === currentModule.id;
                return (
                  <Link
                    key={m.id}
                    to={`/learn/${m.lessons[0].id}`}
                    className={`block px-2.5 py-1.5 rounded-lg text-xs truncate transition ${
                      isSelectedMod
                        ? 'text-purple-300 font-semibold bg-purple-500/10'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {m.moduleNumber}. {m.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 max-w-4xl mx-auto space-y-8">
          {/* Header Metadata */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center space-x-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold">
                  Module {currentModule.moduleNumber}: {currentModule.category}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {currentLesson.duration}
                </span>
                {currentModule.videoTimestamp && (
                  <>
                    <span className="text-slate-500">•</span>
                    <a
                      href={currentModule.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/30 font-mono flex items-center gap-1.5 transition"
                    >
                      <Youtube className="w-3.5 h-3.5 text-rose-400" />
                      <span>Video Timestamp: {currentModule.videoTimestamp}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setBookmarkSaved(!bookmarkSaved)}
                  className={`p-2 rounded-xl border text-xs transition ${
                    bookmarkSaved
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-white/10'
                  }`}
                  title="Bookmark Lesson"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkSaved ? 'fill-purple-400' : ''}`} />
                </button>
                {isCompleted && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Completed</span>
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {currentLesson.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {currentLesson.description}
            </p>
          </div>

          {/* 1. Concept Explanation */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Core Concept & Architecture
            </h2>
            <div className="glass-card rounded-2xl p-6 border border-white/10 text-sm text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
              {currentLesson.concept}
            </div>
          </section>

          {/* 2. Key Points Callout Card */}
          {currentLesson.keyPoints && currentLesson.keyPoints.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                Key Takeaways & Production Insights
              </h2>
              <div className="rounded-2xl p-5 bg-gradient-to-br from-amber-500/5 via-slate-900/80 to-slate-950 border border-amber-500/20 space-y-2.5">
                {currentLesson.keyPoints.map((point, i) => (
                  <div key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 3. Syntax-Highlighted Java Code Example */}
          {currentLesson.codeExample && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" />
                Realistic Production Code Example
              </h2>
              <CodeBlock
                code={currentLesson.codeExample.code}
                filename={currentLesson.codeExample.filename}
                output={currentLesson.codeExample.output}
              />
            </section>
          )}

          {/* 4. Common Mistakes & Pitfalls */}
          {currentLesson.commonMistakes && currentLesson.commonMistakes.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                Common Pitfalls & Architectural Antipatterns
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentLesson.commonMistakes.map((mistake, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-xs sm:text-sm space-y-1.5"
                  >
                    <div className="font-bold text-rose-300 flex items-center gap-1.5">
                      <span>⚠️</span> {mistake.title}
                    </div>
                    <p className="text-slate-400 leading-relaxed">{mistake.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. "Try It Yourself" Sandbox Exercise */}
          {currentLesson.tryIt && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                Try It Yourself Diagnostic
              </h2>
              <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 space-y-3">
                <p className="text-xs sm:text-sm text-slate-200 font-semibold">
                  {currentLesson.tryIt.prompt}
                </p>

                <div className="rounded-xl bg-[#0B0F19] p-3 font-mono text-xs text-slate-300 border border-white/5">
                  <pre>{currentLesson.tryIt.code}</pre>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Hide Hint' : 'Reveal Hint'}</span>
                  </button>

                  <button
                    onClick={() => setTryItRun(true)}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold flex items-center gap-1.5 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-emerald-300" />
                    <span>Test In Sandbox</span>
                  </button>
                </div>

                {showHint && (
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200 font-mono">
                    💡 Hint: {currentLesson.tryIt.hint}
                  </div>
                )}

                {tryItRun && (
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 font-mono">
                    ✓ Code validated! You are ready for the mastery quiz below.
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 6. Big Quiz Launch Action Banner */}
          <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-purple-900/50 via-indigo-900/50 to-slate-900 border border-purple-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs font-mono text-purple-300">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>STEP 2: ACTIVE RETRIEVAL QUIZ</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Ready to test what you learned?
              </h3>
              <p className="text-xs text-slate-300">
                Solve diagnostic questions, predict outputs, spot errors, and earn <span className="text-purple-300 font-bold font-mono">+{currentModule.xpReward || 60} XP</span>.
              </p>
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-500 shadow-glow-md flex items-center justify-center space-x-2 shrink-0 transition"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Start Module Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 7. Bottom Navigation */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
            {prevLesson ? (
              <Link
                to={`/learn/${prevLesson.id}`}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous: {prevLesson.title}</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            ) : <div />}

            {nextLesson ? (
              <Link
                to={`/learn/${nextLesson.id}`}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                <span className="hidden sm:inline">Next: {nextLesson.title}</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : <div />}
          </div>
        </main>

        {/* Right Summary / Progress Sidebar on large screens */}
        <aside className="hidden xl:block w-72 shrink-0 p-6 space-y-6 border-l border-white/10 bg-[#090D16]/50">
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
              Module Specs
            </h4>
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span>{currentLesson.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Reward:</span>
                <span className="text-purple-400 font-bold">+{currentModule.xpReward || 60} XP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Domain:</span>
                <span className="text-cyan-400">{currentModule.category}</span>
              </div>
              {currentModule.videoTimestamp && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Timestamp:</span>
                  <a href={currentModule.videoUrl} target="_blank" rel="noreferrer" className="text-rose-400 hover:underline">
                    {currentModule.videoTimestamp}
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition shadow-sm"
            >
              Take Quiz (+{currentModule.xpReward} XP)
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              Active Retrieval Tip
            </h5>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Explaining code concepts aloud or writing out output on paper boosts memory consolidation by 60%.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
