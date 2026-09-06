import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, CheckCircle2, AlertTriangle, 
  Lightbulb, Code, ExternalLink, HelpCircle, Layers, Copy, Check
} from 'lucide-react';

export default function NotesViewer({ notes, topicMeta }) {
  const [activeTab, setActiveTab] = useState('short'); // 'short' | 'detailed'
  const [copiedCode, setCopiedCode] = useState(false);

  const { shortNotes, detailedNotes } = notes;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher: Short Notes vs Detailed Notes */}
      <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab('short')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'short'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Concise Short Notes
        </button>
        <button
          onClick={() => setActiveTab('detailed')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'detailed'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code className="w-4 h-4" />
          Detailed Notes & Implementation
        </button>
      </div>

      {activeTab === 'short' ? (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded-full border border-sky-800">
              Short Notes
            </span>
            <h2 className="text-2xl font-black text-white mt-2">
              {topicMeta.title}
            </h2>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700">
                Module: {topicMeta.module}
              </span>
              <span className="text-xs bg-slate-800 text-sky-300 px-3 py-1 rounded-lg border border-slate-700">
                Category: {topicMeta.category}
              </span>
            </div>
          </div>

          {/* Grid Layout for Concept Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What is it? */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition">
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" /> What is it?
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {shortNotes.whatIsIt}
              </p>
            </div>

            {/* Why is it important? */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition">
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
                <Lightbulb className="w-4 h-4" /> Why is it important?
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {shortNotes.whyImportant}
              </p>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Key Concepts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shortNotes.keyConcepts.map((kc, i) => (
                <div key={i} className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-white font-mono">{kc.name}</div>
                  <div className="text-xs text-slate-400 mt-1 leading-relaxed">{kc.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* How it Works & Formulas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* How It Works */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3">
                How It Works (Step-by-Step)
              </h3>
              <ol className="space-y-2.5">
                {shortNotes.howItWorks.map((step, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Formula */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-400 mb-3">
                Formula & Formal Definition
              </h3>
              <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-sky-200 border border-slate-800 whitespace-pre-line leading-relaxed">
                {shortNotes.formula}
              </div>
            </div>
          </div>

          {/* Examples: Simple & Real World */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
                Simple Beginner Example
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                {shortNotes.simpleExample}
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
                ML / Real-World Enterprise Example
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                {shortNotes.realWorldExample}
              </p>
            </div>
          </div>

          {/* Advantages & Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Important Advantages
              </h4>
              <ul className="space-y-2">
                {shortNotes.advantages.map((adv, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Limitations & Bottlenecks
              </h4>
              <ul className="space-y-2">
                {shortNotes.limitations.map((lim, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Common Beginner Pitfalls to Avoid
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shortNotes.commonMistakes.map((mistake, idx) => (
                <div key={idx} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                  ⚠️ {mistake}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Revision Cheat Sheet */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-sky-900/50 rounded-2xl p-6 shadow-xl">
            <h4 className="text-sm font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Quick Revision Bullets (Exam & Interview Prep)
            </h4>
            <ul className="space-y-2">
              {shortNotes.quickRevision.map((rev, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2">
                  <span className="text-sky-400 font-bold font-mono">#{idx + 1}</span>
                  <span>{rev}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        /* Detailed Notes Tab */
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">Deep Dive & Theoretical Foundation</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {detailedNotes.overview}
            </p>
          </div>

          {/* Architectural Diagram */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              Process & Architectural Workflow
            </h3>
            <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto leading-relaxed">
              {detailedNotes.architectureDiagram}
            </pre>
          </div>

          {/* Interactive Code Snippet */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
                Python / Scikit-Learn Implementation
              </span>
              <button
                onClick={() => handleCopy(detailedNotes.codeSnippet)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedCode ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <pre className="bg-slate-950 p-5 rounded-xl text-xs sm:text-sm font-mono text-sky-300 border border-slate-800 overflow-x-auto leading-relaxed">
              <code>{detailedNotes.codeSnippet}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
