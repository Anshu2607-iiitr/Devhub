import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, Code2, AlertTriangle, Lightbulb, BookOpen, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { AudioTutorButton } from '../common/AudioTutorButton';

export const QuestionCard = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isAnswerSubmitted = false,
  showExplanation = false,
}) => {
  const [showTheoryBanner, setShowTheoryBanner] = useState(false);

  const handleSelect = (index) => {
    if (isAnswerSubmitted) return;
    onSelectAnswer(index);
  };

  const getQuestionTypeBadge = (type) => {
    switch (type) {
      case 'predict-output':
        return { label: 'Predict Output', color: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' };
      case 'find-error':
        return { label: 'Find The Error', color: 'bg-rose-500/10 text-rose-300 border-rose-500/30' };
      case 'fill-in-blank':
        return { label: 'Fill in Blank', color: 'bg-amber-500/10 text-amber-300 border-amber-500/30' };
      default:
        return { label: 'Concept Check', color: 'bg-purple-500/10 text-purple-300 border-purple-500/30' };
    }
  };

  const badge = getQuestionTypeBadge(question.type);

  const renderCodeSnippet = (code) => {
    if (!code) return null;
    const lines = code.split('\n');
    return (
      <div className="my-4 rounded-xl border border-white/10 bg-[#0B0F19] p-3.5 overflow-x-auto text-xs sm:text-sm font-mono shadow-inner">
        {lines.map((line, i) => (
          <div key={i} className="leading-relaxed text-slate-200">
            <span className="inline-block w-6 select-none text-slate-600 text-right pr-3">{i + 1}</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
      {/* Top Header & Quick Theory Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-mono font-medium px-3 py-1 rounded-full border ${badge.color}`}>
            {badge.label}
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/5 uppercase">
            {question.difficulty || 'standard'}
          </span>
        </div>

        {question.quickTheoryHinglish && (
          <button
            onClick={() => setShowTheoryBanner(!showTheoryBanner)}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono transition"
            title="Toggle Hinglish Quick Theory"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Quick Theory (Hinglish)</span>
            <span className="sm:hidden">Theory</span>
            {showTheoryBanner ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
          </button>
        )}
      </div>

      {/* Expandable Hinglish Quick Theory Box */}
      {question.quickTheoryHinglish && showTheoryBanner && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-5 p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs sm:text-sm text-amber-200 leading-relaxed space-y-2"
        >
          <div className="flex items-center justify-between font-bold text-amber-300 font-mono text-xs">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>QUICK THEORY & INTERVIEW CONCEPT (HINGLISH)</span>
            </span>
            <AudioTutorButton textToRead={question.quickTheoryHinglish} />
          </div>
          <p className="text-amber-100/90">{question.quickTheoryHinglish}</p>
        </motion.div>
      )}

      {/* Question Title */}
      <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
        {question.question}
      </h3>

      {question.codeSnippet && renderCodeSnippet(question.codeSnippet)}

      {/* Options */}
      <div className="mt-6 space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = question.correctAnswer === idx;

          let optionStyle = "border-white/10 bg-slate-900/60 hover:border-purple-500/40 hover:bg-slate-800/80 text-slate-200";

          if (isAnswerSubmitted) {
            if (isCorrect) {
              optionStyle = "border-emerald-500 bg-emerald-950/30 text-emerald-200 ring-1 ring-emerald-500/50";
            } else if (isSelected && !isCorrect) {
              optionStyle = "border-rose-500 bg-rose-950/30 text-rose-200 ring-1 ring-rose-500/50";
            } else {
              optionStyle = "border-white/5 bg-slate-950/40 text-slate-500 opacity-60";
            }
          } else if (isSelected) {
            optionStyle = "border-purple-500 bg-purple-950/40 text-white ring-1 ring-purple-500/60 shadow-glow-sm";
          }

          const optionLetters = ['A', 'B', 'C', 'D'];

          return (
            <motion.button
              key={idx}
              whileTap={!isAnswerSubmitted ? { scale: 0.99 } : {}}
              onClick={() => handleSelect(idx)}
              disabled={isAnswerSubmitted}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start space-x-3.5 group ${optionStyle}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                  isAnswerSubmitted
                    ? isCorrect
                      ? 'bg-emerald-500 text-slate-950'
                      : isSelected
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-800 text-slate-500'
                    : isSelected
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                }`}
              >
                {isAnswerSubmitted && isCorrect ? (
                  <CheckCircle className="w-4 h-4" />
                ) : isAnswerSubmitted && isSelected && !isCorrect ? (
                  <XCircle className="w-4 h-4" />
                ) : (
                  optionLetters[idx] || idx + 1
                )}
              </div>

              <div className="flex-1 text-sm font-medium font-mono whitespace-pre-wrap leading-relaxed pt-0.5">
                {option}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Submitted Explanation & Hinglish Quick Theory Callout */}
      {isAnswerSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-3"
        >
          {/* Detailed Technical Explanation */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/20 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="flex items-center space-x-2 font-bold text-purple-300 mb-1.5 font-mono">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Explanation & Technical Reasoning</span>
            </div>
            <p className="text-slate-300">{question.explanation}</p>
          </div>

          {/* Dedicated Hinglish Quick Theory Callout */}
          {question.quickTheoryHinglish && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-purple-950/30 border border-amber-500/30 text-xs sm:text-sm text-amber-200 leading-relaxed space-y-2">
              <div className="flex items-center justify-between font-bold text-amber-300 font-mono text-xs">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>💡 Quick Theory & Key Concept (Hinglish)</span>
                </span>
                <AudioTutorButton textToRead={question.quickTheoryHinglish} />
              </div>
              <p className="text-amber-100">{question.quickTheoryHinglish}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
