import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  X,
  Zap,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Flame,
  Grid,
  Filter,
  Layers,
  Clock
} from 'lucide-react';
import { getQuizForLesson, MOCK_QUIZZES } from '../data/mockQuizzes';
import { useProgress } from '../context/ProgressContext';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { QuizTimer } from '../components/quiz/QuizTimer';
import { ProgressBar } from '../components/common/ProgressBar';

export const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { recordQuizCompletion } = useProgress();

  const baseQuiz = MOCK_QUIZZES[quizId] || getQuizForLesson(quizId);

  // Difficulty & Filter state
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);

  // Filter questions by difficulty
  const questions = useMemo(() => {
    const raw = baseQuiz.questions || [];
    if (selectedDifficulty === 'all') return raw;
    return raw.filter((q) => q.difficulty === selectedDifficulty);
  }, [baseQuiz, selectedDifficulty]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [streakCount, setStreakCount] = useState(0);

  const currentQuestion = questions[currentIndex] || questions[0];
  const totalQuestions = questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const selectedAnswer = selectedAnswers[currentIndex];

  const handleSelectAnswer = (optionIdx) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIdx,
    }));
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === undefined) return;
    setIsAnswerSubmitted(true);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setStreakCount((prev) => prev + 1);
    } else {
      setStreakCount(0);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswerSubmitted(selectedAnswers[currentIndex + 1] !== undefined);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsAnswerSubmitted(selectedAnswers[currentIndex - 1] !== undefined);
    }
  };

  const handleJumpToQuestion = (idx) => {
    setCurrentIndex(idx);
    setIsAnswerSubmitted(selectedAnswers[idx] !== undefined);
    setShowQuestionGrid(false);
  };

  const handleDifficultyChange = (diff) => {
    setSelectedDifficulty(diff);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
  };

  const finishQuiz = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });

    const accuracy = Math.round((correct / (totalQuestions || 1)) * 100);
    const score = accuracy;
    const isPassing = score >= (baseQuiz.passingScore || 70);
    const xpEarned = isPassing ? (baseQuiz.xpReward || 150) + (correct * 10) : correct * 10;

    recordQuizCompletion({
      quizId: baseQuiz.id,
      lessonId: baseQuiz.lessonId,
      moduleId: baseQuiz.moduleId,
      score,
      accuracy,
      xpEarned,
      userAnswers: selectedAnswers,
      totalQuestions,
      correctCount: correct,
    });

    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col justify-between">
      {/* Top Header */}
      <header className="glass-nav sticky top-0 z-30 px-4 sm:px-8 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowQuitModal(true)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
            title="Quit Quiz"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <div className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
              <span className="truncate max-w-[200px] sm:max-w-md">{baseQuiz.title}</span>
              {streakCount > 1 && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Flame className="w-3 h-3 fill-amber-400" /> {streakCount} streak!
                </span>
              )}
            </div>
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span>Question {currentIndex + 1} of {totalQuestions}</span>
              <span className="text-purple-400 font-bold">• {selectedDifficulty.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Difficulty Selector Pills */}
        <div className="hidden md:flex items-center space-x-1.5 bg-slate-900/80 p-1 rounded-xl border border-white/5 text-xs font-mono">
          <button
            onClick={() => handleDifficultyChange('all')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedDifficulty === 'all'
                ? 'bg-purple-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All (55)
          </button>
          <button
            onClick={() => handleDifficultyChange('easy')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedDifficulty === 'easy'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Easy (20)
          </button>
          <button
            onClick={() => handleDifficultyChange('medium')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedDifficulty === 'medium'
                ? 'bg-cyan-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Medium (20)
          </button>
          <button
            onClick={() => handleDifficultyChange('hard')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedDifficulty === 'hard'
                ? 'bg-rose-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hard (15)
          </button>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setShowQuestionGrid(!showQuestionGrid)}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-purple-500/40 transition flex items-center gap-1.5 text-xs font-mono"
            title="Question Palette"
          >
            <Grid className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Palette</span>
          </button>

          <QuizTimer
            initialSeconds={baseQuiz.timeLimitSeconds || 600}
            onTimeExpired={finishQuiz}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 max-w-3xl w-full mx-auto relative">
        <div className="w-full space-y-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Progress: {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%</span>
            <span>Answered: {Object.keys(selectedAnswers).length}/{totalQuestions}</span>
          </div>
          <ProgressBar
            value={currentIndex + 1}
            max={totalQuestions}
            color="purple"
            size="sm"
          />

          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleSelectAnswer}
              isAnswerSubmitted={isAnswerSubmitted}
              showExplanation={isAnswerSubmitted}
            />
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 transition flex items-center gap-1.5 border border-white/5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-3">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === undefined}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:hover:bg-purple-600 transition shadow-glow-sm flex items-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Check Answer</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition shadow-glow-sm flex items-center space-x-2"
                >
                  <span>{isLastQuestion ? 'Finish & Review (55 Qs)' : 'Next Question'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 50-Question Palette Drawer Modal */}
      {showQuestionGrid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl glass-card rounded-3xl p-6 border border-white/10 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <Grid className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Question Navigator ({totalQuestions} Questions)</h3>
              </div>
              <button
                onClick={() => setShowQuestionGrid(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 max-h-[340px] overflow-y-auto pr-1 py-1">
              {questions.map((q, idx) => {
                const isCurrent = currentIndex === idx;
                const isAnswered = selectedAnswers[idx] !== undefined;

                return (
                  <button
                    key={idx}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`h-9 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center border ${
                      isCurrent
                        ? 'bg-purple-600 text-white border-purple-400 ring-2 ring-purple-500/50 shadow-glow-sm'
                        : isAnswered
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50'
                        : 'bg-slate-900/80 text-slate-400 hover:text-white border-white/5'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center space-x-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Answered
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-purple-600"></span> Current
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-slate-800"></span> Unanswered
                </span>
              </div>
              <button
                onClick={() => setShowQuestionGrid(false)}
                className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quit Modal */}
      {showQuitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md glass-card rounded-2xl p-6 border border-white/10 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Quit Quiz in Progress?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your progress for this attempt will not be saved and XP rewards will be forfeited.
              </p>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3">
              <button
                onClick={() => setShowQuitModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Continue Quiz
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white"
              >
                Quit to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
