import React, { useState } from 'react';
import { Sparkles, BrainCircuit, CheckCircle2, RotateCw, Lightbulb } from 'lucide-react';

export default function FlashcardViewer({ topicTitle, concepts = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);

  if (!concepts || concepts.length === 0) {
    return <div className="p-8 text-center text-slate-400">No flashcards available for this topic.</div>;
  }

  const current = concepts[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % concepts.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + concepts.length) % concepts.length);
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-800">
            Active Recall Flashcards
          </span>
          <h3 className="text-lg font-bold text-white mt-1">Core Concepts: {topicTitle.split('|')[0]}</h3>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Card {currentIndex + 1} of {concepts.length}
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer select-none relative h-72 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 transform perspective-1000 border border-slate-700/80 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-800 hover:border-purple-500/50"
      >
        <div className="flex justify-between items-center text-slate-400 text-xs">
          <div className="flex items-center gap-1.5 text-purple-400 font-semibold">
            <BrainCircuit className="w-4 h-4" />
            <span>{isFlipped ? "Answer / Explanation" : "Prompt / Term"}</span>
          </div>
          <span className="text-xs bg-slate-800 px-2.5 py-1 rounded-full text-slate-300">Click to flip ↺</span>
        </div>

        <div className="my-auto text-center px-4">
          {!isFlipped ? (
            <div>
              <div className="text-2xl font-extrabold text-white mb-3">
                {current.name}
              </div>
              <p className="text-sm text-slate-400 flex items-center justify-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                How do you define this concept in your own words?
              </p>
            </div>
          ) : (
            <div className="animate-fadeIn">
              <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-2">{current.name}</div>
              <div className="text-lg text-slate-100 font-medium leading-relaxed">
                {current.desc}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>ML Padho Recall Deck</span>
          <span>Status: {isFlipped ? "Revealed" : "Hidden"}</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePrev}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition"
        >
          ← Previous
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 text-purple-200 border border-purple-500/40 text-sm font-semibold flex items-center gap-1.5"
        >
          <RotateCw className="w-4 h-4" /> Flip
        </button>

        <button
          onClick={handleNext}
          className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition"
        >
          Next Card →
        </button>
      </div>
    </div>
  );
}
