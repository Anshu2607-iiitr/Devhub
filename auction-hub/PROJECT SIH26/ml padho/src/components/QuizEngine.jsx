import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, XCircle, AlertCircle, RotateCcw, 
  HelpCircle, ChevronRight, Award, Flame, Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizEngine({ topicId, topicTitle, questions, onCompleteTopic }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [revealedExplanations, setRevealedExplanations] = useState({});
  const [difficultyFilter, setDifficultyFilter] = useState('all'); // all, easy, medium, hard, very_hard
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter questions based on difficulty tab if selected
  const filteredQuestions = questions.filter(q => {
    if (difficultyFilter === 'all') return true;
    return q.difficulty === difficultyFilter;
  });

  const currentQ = filteredQuestions[currentIdx] || filteredQuestions[0];

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
    // Reveal explanation upon answering
    setRevealedExplanations(prev => ({
      ...prev,
      [currentQ.id]: true
    }));
  };

  const calculateStats = () => {
    let correct = 0;
    let attempted = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] !== undefined) {
        attempted++;
        if (selectedAnswers[q.id] === q.answer) {
          correct++;
        }
      }
    });
    const incorrect = attempted - correct;
    const scorePct = questions.length > 0 ? (correct / questions.length) * 100 : 0;
    return { correct, incorrect, attempted, scorePct, total: questions.length };
  };

  const stats = calculateStats();

  const handleFinishQuiz = () => {
    setIsSubmitted(true);
    if (stats.scorePct >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (onCompleteTopic) {
        onCompleteTopic(topicId, stats);
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setRevealedExplanations({});
    setIsSubmitted(false);
    setCurrentIdx(0);
  };

  return (
    <div className="space-y-6">
      {/* Quiz Top Bar with Metrics */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800">
                Official 40-MCQ Assessment
              </span>
              <span className="text-xs text-slate-400 font-mono">Topic #{topicId}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Mastery Examination</h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">ATTEMPTED</span>
              <span className="text-white font-bold text-sm">{stats.attempted} / {stats.total}</span>
            </div>
            <div className="bg-slate-950 px-3 py-2 rounded-xl border border-emerald-950">
              <span className="text-emerald-400 block text-[10px]">CORRECT</span>
              <span className="text-emerald-300 font-bold text-sm">{stats.correct}</span>
            </div>
            <div className="bg-slate-950 px-3 py-2 rounded-xl border border-rose-950">
              <span className="text-rose-400 block text-[10px]">INCORRECT</span>
              <span className="text-rose-300 font-bold text-sm">{stats.incorrect}</span>
            </div>
            <div className="bg-slate-950 px-3 py-2 rounded-xl border border-sky-950">
              <span className="text-sky-400 block text-[10px]">SCORE</span>
              <span className="text-sky-300 font-bold text-sm">{stats.scorePct.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Difficulty Filter Tabs */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800 overflow-x-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Difficulty:
          </span>
          {[
            { id: 'all', label: `All 40 MCQs` },
            { id: 'easy', label: '🟢 Easy (Q1-10)' },
            { id: 'medium', label: '🟡 Medium (Q11-20)' },
            { id: 'hard', label: '🟠 Hard (Q21-30)' },
            { id: 'very_hard', label: '🔴 Very Hard (Q31-40)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setDifficultyFilter(tab.id); setCurrentIdx(0); }}
              className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium ${
                difficultyFilter === tab.id
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question Card */}
      {currentQ && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                currentQ.difficulty === 'easy' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                currentQ.difficulty === 'medium' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                currentQ.difficulty === 'hard' ? 'bg-orange-950 text-orange-300 border border-orange-800' :
                'bg-rose-950 text-rose-300 border border-rose-800'
              }`}>
                {currentQ.difficulty.replace('_', ' ')}
              </span>
              <span className="text-xs font-mono text-slate-400">Question #{currentQ.id} of 40</span>
            </div>

            {selectedAnswers[currentQ.id] !== undefined && (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                selectedAnswers[currentQ.id] === currentQ.answer 
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                  : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}>
                {selectedAnswers[currentQ.id] === currentQ.answer ? (
                  <><CheckCircle2 className="w-3.5 h-3.5" /> Correct</>
                ) : (
                  <><XCircle className="w-3.5 h-3.5" /> Incorrect</>
                )}
              </span>
            )}
          </div>

          <div className="text-base sm:text-lg font-semibold text-slate-100 whitespace-pre-line leading-relaxed">
            {currentQ.question}
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, oIdx) => {
              const letter = String.fromCharCode(65 + oIdx);
              const isSelected = selectedAnswers[currentQ.id] === oIdx;
              const isCorrectAnswer = currentQ.answer === oIdx;
              const hasAnswered = selectedAnswers[currentQ.id] !== undefined;

              let btnStyle = "bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-800/60";

              if (hasAnswered) {
                if (isCorrectAnswer) {
                  btnStyle = "bg-emerald-950/70 border-emerald-600 text-emerald-200 font-semibold shadow-emerald-950/50 shadow-md";
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = "bg-rose-950/70 border-rose-600 text-rose-200";
                } else {
                  btnStyle = "bg-slate-950/40 border-slate-900 text-slate-500 opacity-60";
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    hasAnswered && isCorrectAnswer 
                      ? 'bg-emerald-600 text-white'
                      : hasAnswered && isSelected && !isCorrectAnswer
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {letter}
                  </span>
                  <span className="text-sm leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {revealedExplanations[currentQ.id] && (
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 animate-fadeIn">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-sky-400" />
                Detailed Explanation & Analysis:
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Card Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-semibold text-slate-200 transition"
            >
              ← Previous MCQ
            </button>

            {/* Quick Question Jump Pill Grid */}
            <div className="hidden sm:flex gap-1 overflow-x-auto max-w-xs py-1">
              {filteredQuestions.map((q, idx) => {
                const ans = selectedAnswers[q.id];
                const isCorrect = ans === q.answer;
                const isSelected = ans !== undefined;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-6 h-6 text-[10px] font-mono font-bold rounded flex items-center justify-center transition ${
                      currentIdx === idx ? 'ring-2 ring-sky-400 scale-110 z-10 ' : ''
                    } ${
                      !isSelected ? 'bg-slate-800 text-slate-400' :
                      isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                    }`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentIdx(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
              disabled={currentIdx === filteredQuestions.length - 1}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-30 text-xs font-semibold text-white transition flex items-center gap-1"
            >
              Next MCQ →
            </button>
          </div>
        </div>
      )}

      {/* Completion & Score Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Topic Mastery Benchmark
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Achieve 70%+ score to certify Topic #{topicId} mastery and unlock the next milestone badge.
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Retake
          </button>

          <button
            onClick={handleFinishQuiz}
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-1.5 transition"
          >
            <CheckCircle2 className="w-4 h-4" /> Finish & Record Score
          </button>
        </div>
      </div>
    </div>
  );
}
