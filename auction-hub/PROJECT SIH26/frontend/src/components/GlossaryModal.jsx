import React from 'react';
import { X, BookOpen, Cpu, Sparkles, TrendingUp, Copy, ShieldAlert, BarChart2 } from 'lucide-react';

export default function GlossaryModal({ onClose }) {
  const terms = [
    {
      term: 'Poisson Sanction Velocity (λ)',
      badge: 'Statistical Modeling',
      icon: TrendingUp,
      definition: 'A probability distribution model that calculates the expected monthly project sanction rate (λ) for each parliamentary constituency. If an abnormal burst of approvals occurs within a compressed 48-hour window (e.g. preceding fiscal year-ends or elections), the Poisson survival function P(X ≥ k | λ) flags the surge as an un-vetted velocity anomaly.'
    },
    {
      term: 'SHAP Feature Attribution (XAI)',
      badge: 'Explainable AI',
      icon: Sparkles,
      definition: 'Rooted in cooperative game theory (Shapley values), SHAP decomposes the complex black-box anomaly score into exact, transparent contribution points (+X pts) for each feature. This enables human vigilance officers to understand the exact mathematical reasons behind every red flag.'
    },
    {
      term: 'Isolation Forest Anomaly Isolation',
      badge: 'Unsupervised Machine Learning',
      icon: Cpu,
      definition: 'An unsupervised tree-based ensemble algorithm that isolates anomalies instead of profiling normal points. Because fraudulent or aberrant procurement vectors deviate structurally from standard projects, they require significantly fewer random splits to isolate, resulting in high outlier scores without requiring pre-labeled training data.'
    },
    {
      term: 'Regional Cost Z-Score & IQR Benchmark',
      badge: 'Financial Baseline',
      icon: BarChart2,
      definition: 'Evaluates project unit cost against regional and category-specific medians. Projects claiming costs exceeding Q3 + 1.5×IQR or with Z-Scores > 2.0σ are immediately flagged for budget inflation.'
    },
    {
      term: 'NLP Semantic Duplicate Work Detection',
      badge: 'Natural Language Processing',
      icon: Copy,
      definition: 'Transforms work titles, descriptions, and ward localities into sub-word TF-IDF n-gram vectors. By calculating cosine distance between vectors, the engine catches cases where identical works (e.g. submersible pump, solar street lighting) were contracted to different vendors at the same location within overlapping timeframes.'
    },
    {
      term: 'Milestone Divergence & Idle Fund Hazard',
      badge: 'Execution Vigilance',
      icon: ShieldAlert,
      definition: 'Measures the mathematical divergence between disbursement percentages and physical execution. If 80%+ of funds have been drawn while physical progress remains stalled (<20%) for >200 days past target, funds are tagged as idle capital at risk of abandonment.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl relative my-6">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10 backdrop-blur">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400 border border-amber-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Auditor Knowledge Base & Terminology Glossary
              </h3>
              <p className="text-xs text-slate-400">
                Plain-English explanation of mathematical, statistical, and AI algorithms utilized by MPLADS Vigil
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {terms.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-bold text-slate-100">{t.term}</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-slate-900 text-slate-300 border border-slate-700">
                    {t.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.definition}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
}
