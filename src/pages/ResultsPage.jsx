import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trophy,
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Code2,
  ChevronRight,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { MOCK_QUIZZES, getQuizForLesson } from '../data/mockQuizzes';

export const ResultsPage = () => {
  const { lastQuizResult, triggerCelebration } = useProgress();
  const navigate = useNavigate();

  const result =
    lastQuizResult ||
    (() => {
      const saved = localStorage.getItem('devhub_last_quiz_result');
      return saved ? JSON.parse(saved) : null;
    })();

  useEffect(() => {
    if (result?.passed) {
      triggerCelebration();
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-[#090D16] flex items-center justify-center p-4">
        <div className="glass-card rounded-2xl p-8 text-center max-w-md border border-white/10 space-y-4">
          <Trophy className="w-12 h-12 text-purple-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">No Recent Quiz Results</h2>
          <p className="text-xs text-slate-400">
            Take a diagnostic quiz across any of the 31 Java topics to earn XP.
          </p>
          <Link
            to="/course/java"
            className="inline-block px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition"
          >
            Explore Curriculum (31 Modules)
          </Link>
        </div>
      </div>
    );
  }

  const {
    quizId,
    lessonId,
    accuracy,
    xpEarned,
    userAnswers = {},
    totalQuestions = 3,
    correctCount = 2,
  } = result;

  const quiz = MOCK_QUIZZES[quizId] || getQuizForLesson(lessonId || 'lesson-1-1');
  const questions = quiz.questions || [];
  const incorrectCount = totalQuestions - correctCount;

  const getVerdict = () => {
    if (accuracy >= 90) return { title: 'Java Guru!', badge: 'Exceptional Mastery' };
    if (accuracy >= 70) return { title: 'Great Effort!', badge: 'Passed & Validated' };
    return { title: 'Needs More Practice', badge: 'Review Suggested' };
  };

  const verdict = getVerdict();

  return (
    <div className="min-h-screen bg-[#090D16] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-purple-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-[1.5px] mx-auto shadow-glow-md">
              <div className="w-full h-full bg-[#090D16] rounded-[14px] flex items-center justify-center">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-semibold">
                {verdict.badge}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                {verdict.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{quiz.title}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-xl mx-auto">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5">
                <div className="text-2xl font-bold font-mono text-white">{accuracy}%</div>
                <div className="text-[11px] text-slate-400 uppercase font-mono">Accuracy</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5">
                <div className="text-2xl font-bold font-mono text-purple-400">+{xpEarned}</div>
                <div className="text-[11px] text-slate-400 uppercase font-mono">XP Earned</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5">
                <div className="text-2xl font-bold font-mono text-emerald-400">{correctCount}</div>
                <div className="text-[11px] text-slate-400 uppercase font-mono">Correct</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5">
                <div className="text-2xl font-bold font-mono text-rose-400">{incorrectCount}</div>
                <div className="text-[11px] text-slate-400 uppercase font-mono">Incorrect</div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate(`/quiz/${quiz.id}`)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>

              <Link
                to="/course/java"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 transition shadow-glow-sm flex items-center justify-center gap-2"
              >
                <span>Continue Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Code2 className="w-5 h-5 text-purple-400" />
              <span>Detailed Question Review</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              {correctCount} of {totalQuestions} Passed
            </span>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const selectedIdx = userAnswers[idx];
              const isCorrect = selectedIdx === q.correctAnswer;

              return (
                <div
                  key={idx}
                  className={`glass-card rounded-2xl p-5 border transition ${
                    isCorrect ? 'border-emerald-500/20' : 'border-rose-500/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                          isCorrect
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-400">
                        Question {idx + 1}
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                        isCorrect
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {isCorrect ? '+10 XP' : '0 XP'}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white">{q.question}</h3>

                  {q.codeSnippet && (
                    <div className="my-2.5 p-3 rounded-xl bg-[#0B0F19] text-xs font-mono text-slate-300 border border-white/5">
                      <pre>{q.codeSnippet}</pre>
                    </div>
                  )}

                  <div className="mt-3 space-y-1.5 text-xs font-mono">
                    <div className="text-emerald-400 font-semibold flex items-start gap-1.5">
                      <span className="text-slate-500">Correct Answer:</span>
                      <span>{q.options[q.correctAnswer]}</span>
                    </div>
                    {!isCorrect && selectedIdx !== undefined && (
                      <div className="text-rose-400 flex items-start gap-1.5">
                        <span className="text-slate-500">Your Selection:</span>
                        <span>{q.options[selectedIdx]}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/5 space-y-2 text-xs">
                    <div className="text-slate-400 leading-relaxed">
                      <span className="text-purple-300 font-bold font-mono">Concept Note: </span>
                      {q.explanation}
                    </div>

                    {q.quickTheoryHinglish && (
                      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200 leading-relaxed font-mono">
                        <span className="text-amber-400 font-bold">💡 Quick Theory (Hinglish): </span>
                        {q.quickTheoryHinglish}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
