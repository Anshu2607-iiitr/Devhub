import React, { useState } from 'react';
import { Sliders, TrendingDown, CheckCircle, AlertOctagon, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';

export default function WhatIfSimulator({ project }) {
  const originalCost = project.sanctioned_amount_lakhs || 30.0;
  const originalProgress = project.physical_progress_pct || 15.0;
  const originalDisbursed = Math.round(((project.released_amount_lakhs || 0) / Math.max(originalCost, 0.1)) * 100);
  const benchmarkMedian = project.cost_evaluation?.benchmark_median_lakhs || 18.0;

  const [simCost, setSimCost] = useState(originalCost);
  const [simProgress, setSimProgress] = useState(originalProgress);
  const [simDisbursed, setSimDisbursed] = useState(originalDisbursed);

  // Client-side counterfactual recalculation matching ML scoring weights
  const computeCounterfactual = () => {
    // 1. Cost risk
    const ratioToMedian = simCost / Math.max(benchmarkMedian, 0.1);
    let costRisk = 0.0;
    if (ratioToMedian > 2.5) costRisk = 1.0;
    else if (ratioToMedian > 1.8) costRisk = 0.4 + (ratioToMedian - 1.8) / 0.7 * 0.4;
    else if (ratioToMedian > 1.2) costRisk = (ratioToMedian - 1.2) / 0.6 * 0.4;

    const costPts = costRisk * 28.0;

    // 2. Duplicate risk (preserved from original project)
    const dupPts = (project.duplicate_evaluation?.duplicate_risk_factor || 0) * 26.0;

    // 3. Hazard risk
    const gap = Math.max(0, simDisbursed - simProgress);
    let hazRisk = 0.0;
    if (simDisbursed > 50 && simProgress < 25) {
      hazRisk = Math.min(1.0, gap / 75.0);
    } else if (gap > 40) {
      hazRisk = Math.min(1.0, gap / 100.0);
    }
    const hazPts = hazRisk * 20.0;

    // 4. Outlier & velocity (base residual)
    const unsupPts = (project.unsupervised_evaluation?.unsupervised_risk_factor || 0) * (costRisk > 0.4 ? 16.0 : 6.0);
    const velPts = (project.velocity_evaluation?.velocity_risk_factor || 0) * 10.0;

    let total = costPts + dupPts + hazPts + unsupPts + velPts;
    if (dupPts > 12 && costPts > 14) total += 15.0; // Synergy
    return Math.round(Math.min(100.0, Math.max(5.0, total)) * 10) / 10;
  };

  const simScore = computeCounterfactual();
  const diff = Math.round((simScore - project.fraud_risk_score) * 10) / 10;

  const resetSimulation = () => {
    setSimCost(originalCost);
    setSimProgress(originalProgress);
    setSimDisbursed(originalDisbursed);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Interactive "What-If" Counterfactual Simulation</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Adjust budget and progress parameters to observe live de-risking and policy compliance in real time
          </p>
        </div>
        <button
          onClick={resetSimulation}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition flex items-center gap-1 text-[11px]"
          title="Reset Sliders"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Comparison Meter Banner */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Current Risk Score</span>
          <span className={`text-xl font-bold font-mono ${project.fraud_risk_score >= 80 ? 'text-red-400' : 'text-amber-400'}`}>
            {project.fraud_risk_score} / 100
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">{project.risk_tier}</span>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/30">
          <span className="text-[10px] text-amber-400 uppercase font-bold block">Simulated Score</span>
          <span className={`text-xl font-bold font-mono ${simScore < 35 ? 'text-emerald-400' : simScore < 60 ? 'text-amber-400' : 'text-red-400'}`}>
            {simScore} / 100
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            {simScore >= 80 ? 'Critical' : simScore >= 60 ? 'High' : simScore >= 35 ? 'Medium' : 'Low Risk'}
          </span>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Net Variance</span>
          <span className={`text-base font-bold font-mono flex items-center gap-0.5 ${diff < 0 ? 'text-emerald-400' : diff > 0 ? 'text-red-400' : 'text-slate-400'}`}>
            {diff < 0 ? <TrendingDown className="w-4 h-4" /> : null}
            {diff > 0 ? `+${diff}` : `${diff}`} pts
          </span>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-4 text-xs">
        
        {/* Cost Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <span className="font-medium">Sanctioned Budget: ₹{simCost} Lakhs</span>
            <span className="text-[11px] text-slate-500">
              Regional Median: <span className="text-amber-400 font-mono">₹{benchmarkMedian}L</span>
            </span>
          </div>
          <input
            type="range"
            min="5.0"
            max={Math.max(100.0, originalCost * 1.5)}
            step="0.5"
            value={simCost}
            onChange={(e) => setSimCost(parseFloat(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>₹5.0L (Frugal)</span>
            <span>Target Benchmark (~₹{benchmarkMedian}L)</span>
            <span>₹{Math.max(100, Math.round(originalCost * 1.5))}L</span>
          </div>
        </div>

        {/* Physical Progress Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <span className="font-medium">Physical Execution Progress: {simProgress}%</span>
            <span className="text-[11px] text-slate-500">
              Target for Release: <span className="text-slate-200 font-mono">{simDisbursed}%</span>
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={simProgress}
            onChange={(e) => setSimProgress(parseInt(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>0% (Stalled)</span>
            <span>50% (Midway Milestone)</span>
            <span>100% (Completed)</span>
          </div>
        </div>

        {/* Fund Release Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <span className="font-medium">Funds Released (Disbursement): {simDisbursed}%</span>
            <span className="text-[11px] text-slate-500">
              Divergence Gap: <span className={`font-mono font-bold ${simDisbursed - simProgress > 30 ? 'text-red-400' : 'text-emerald-400'}`}>{Math.max(0, simDisbursed - simProgress)}%</span>
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={simDisbursed}
            onChange={(e) => setSimDisbursed(parseInt(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
          />
        </div>

      </div>

      {/* Actionable Simulation Takeaway */}
      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {simScore <= 34 ? (
            <span className="text-emerald-400 font-medium">
              ✅ Compliance Achieved: Aligning sanction budget near regional average (₹{benchmarkMedian}L) and reconciling disbursement with progress reduces the risk score to {simScore}, qualifying for immediate clearance!
            </span>
          ) : (
            <span>
              Adjusting parameters closer to normative regional baselines de-escalates the composite risk score by {Math.abs(diff)} points.
            </span>
          )}
        </p>
      </div>

    </div>
  );
}
