import React, { useState } from 'react';

export default function MetricsCalculator() {
  const [tp, setTp] = useState(85);
  const [fp, setFp] = useState(15);
  const [fn, setFn] = useState(10);
  const [tn, setTn] = useState(90);

  const total = tp + fp + fn + tn;
  const accuracy = total > 0 ? (tp + tn) / total : 0;
  const precision = (tp + fp) > 0 ? tp / (tp + fp) : 0;
  const recall = (tp + fn) > 0 ? tp / (tp + fn) : 0;
  const specificity = (tn + fp) > 0 ? tn / (tn + fp) : 0;
  const f1 = (precision + recall) > 0 ? (2 * precision * recall) / (precision + recall) : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
          Interactive Evaluation Lab
        </span>
        <h3 className="text-xl font-bold mt-1 text-white">Confusion Matrix & Metrics Simulator</h3>
        <p className="text-xs text-slate-400">
          Adjust the 4 quadrants to instantly see how Precision, Recall, Specificity, and F1-Score respond to classification thresholds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Confusion Matrix Table */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <h4 className="text-xs font-semibold uppercase text-slate-400 mb-3 tracking-wider">Confusion Matrix (2×2)</h4>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div></div>
            <div className="font-semibold text-slate-300">Pred Positive</div>
            <div className="font-semibold text-slate-300">Pred Negative</div>

            <div className="font-semibold text-slate-300 text-left flex items-center">Actual Pos</div>
            <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-lg p-3">
              <span className="block text-[11px] text-emerald-400 font-bold">True Positive (TP)</span>
              <input
                type="number"
                min="0"
                value={tp}
                onChange={(e) => setTp(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 text-center font-mono font-bold text-white text-lg rounded py-1 mt-1 border border-emerald-700/50"
              />
            </div>
            <div className="bg-rose-950/60 border border-rose-800/80 rounded-lg p-3">
              <span className="block text-[11px] text-rose-400 font-bold">False Neg (FN / Type II)</span>
              <input
                type="number"
                min="0"
                value={fn}
                onChange={(e) => setFn(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 text-center font-mono font-bold text-white text-lg rounded py-1 mt-1 border border-rose-700/50"
              />
            </div>

            <div className="font-semibold text-slate-300 text-left flex items-center">Actual Neg</div>
            <div className="bg-amber-950/60 border border-amber-800/80 rounded-lg p-3">
              <span className="block text-[11px] text-amber-400 font-bold">False Pos (FP / Type I)</span>
              <input
                type="number"
                min="0"
                value={fp}
                onChange={(e) => setFp(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 text-center font-mono font-bold text-white text-lg rounded py-1 mt-1 border border-amber-700/50"
              />
            </div>
            <div className="bg-sky-950/60 border border-sky-800/80 rounded-lg p-3">
              <span className="block text-[11px] text-sky-400 font-bold">True Negative (TN)</span>
              <input
                type="number"
                min="0"
                value={tn}
                onChange={(e) => setTn(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 text-center font-mono font-bold text-white text-lg rounded py-1 mt-1 border border-sky-700/50"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 text-center">Total Sample Size: <span className="font-mono text-slate-300 font-semibold">{total}</span></p>
        </div>

        {/* Calculated Metrics */}
        <div className="space-y-3">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs text-slate-400">Accuracy</span>
              <div className="text-xs text-slate-500 font-mono">(TP + TN) / Total</div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-mono text-white">{(accuracy * 100).toFixed(1)}%</span>
              <div className="text-[10px] text-slate-400 font-mono">{accuracy.toFixed(4)}</div>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs text-emerald-400 font-semibold">Precision</span>
              <div className="text-xs text-slate-500 font-mono">TP / (TP + FP)</div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-mono text-emerald-400">{(precision * 100).toFixed(1)}%</span>
              <div className="text-[10px] text-slate-400 font-mono">{precision.toFixed(4)}</div>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs text-sky-400 font-semibold">Recall (Sensitivity)</span>
              <div className="text-xs text-slate-500 font-mono">TP / (TP + FN)</div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-mono text-sky-400">{(recall * 100).toFixed(1)}%</span>
              <div className="text-[10px] text-slate-400 font-mono">{recall.toFixed(4)}</div>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs text-purple-400 font-semibold">F1-Score</span>
              <div className="text-xs text-slate-500 font-mono">2 × (P × R) / (P + R)</div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-mono text-purple-400">{(f1 * 100).toFixed(1)}%</span>
              <div className="text-[10px] text-slate-400 font-mono">{f1.toFixed(4)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
