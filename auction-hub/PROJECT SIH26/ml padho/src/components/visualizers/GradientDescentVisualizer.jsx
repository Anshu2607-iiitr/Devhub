import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Activity } from 'lucide-react';

export default function GradientDescentVisualizer() {
  const [learningRate, setLearningRate] = useState(0.15);
  const [iterations, setIterations] = useState(0);
  const [history, setHistory] = useState([4.0]); // initial weight w = 4.0
  const [isRunning, setIsRunning] = useState(false);

  // Target objective function: f(w) = w^2 - 2w + 1 = (w - 1)^2
  // Optimal w* = 1.0, minimum value f(1) = 0
  // Gradient df/dw = 2*(w - 1)

  const currentW = history[history.length - 1];
  const currentLoss = Math.pow(currentW - 1, 2);

  const step = () => {
    setHistory(prev => {
      const last = prev[prev.length - 1];
      const grad = 2 * (last - 1);
      const nextW = last - learningRate * grad;
      return [...prev.slice(-25), nextW];
    });
    setIterations(i => i + 1);
  };

  const reset = () => {
    setIsRunning(false);
    setHistory([4.0]);
    setIterations(0);
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setHistory(prev => {
          const last = prev[prev.length - 1];
          const grad = 2 * (last - 1);
          if (Math.abs(grad) < 0.001 || Math.abs(last) > 15) {
            setIsRunning(false);
            return prev;
          }
          const nextW = last - learningRate * grad;
          return [...prev.slice(-25), nextW];
        });
        setIterations(i => i + 1);
      }, 150);
    }
    return () => clearInterval(timer);
  }, [isRunning, learningRate]);

  // Coordinate mapping for SVG: w in [-2, 5], loss in [0, 16]
  const svgWidth = 480;
  const svgHeight = 220;
  const mapX = (w) => ((w + 2) / 7) * (svgWidth - 40) + 20;
  const mapY = (loss) => svgHeight - 25 - (Math.min(loss, 16) / 16) * (svgHeight - 50);

  // Generate curve path
  const points = [];
  for (let w = -1.8; w <= 4.2; w += 0.2) {
    const l = Math.pow(w - 1, 2);
    points.push(`${mapX(w)},${mapY(l)}`);
  }
  const curveD = `M ${points.join(' L ')}`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded-full border border-sky-800">
            Interactive ML Lab
          </span>
          <h3 className="text-xl font-bold mt-1 text-white">Gradient Descent Optimizer</h3>
          <p className="text-xs text-slate-400">
            Minimizing quadratic loss function <span className="font-mono text-sky-300">L(w) = (w - 1)²</span> with global minimum at <span className="font-mono text-emerald-400">w* = 1.0</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all ${
              isRunning ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-sky-600 hover:bg-sky-500 text-white'
            }`}
          >
            <Play className={`w-4 h-4 ${isRunning ? 'fill-current' : ''}`} />
            {isRunning ? 'Pause' : 'Start Descent'}
          </button>
          <button
            onClick={reset}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative bg-slate-950/90 rounded-xl border border-slate-800 p-2 overflow-hidden mb-5">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-48">
          {/* Grid lines */}
          <line x1="20" y1={svgHeight - 25} x2={svgWidth - 20} y2={svgHeight - 25} stroke="#334155" strokeWidth="1" />
          <line x1={mapX(1.0)} y1="15" x2={mapX(1.0)} y2={svgHeight - 25} stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />

          {/* Loss Curve */}
          <path d={curveD} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

          {/* Minimum Target Label */}
          <text x={mapX(1.0) + 6} y="30" fill="#34d399" fontSize="10" fontFamily="monospace">
            w* = 1.0 (Global Min)
          </text>

          {/* Trajectory lines */}
          {history.map((w, idx) => {
            if (idx === 0) return null;
            const prevW = history[idx - 1];
            return (
              <line
                key={idx}
                x1={mapX(prevW)}
                y1={mapY(Math.pow(prevW - 1, 2))}
                x2={mapX(w)}
                y2={mapY(Math.pow(w - 1, 2))}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
            );
          })}

          {/* Current Ball */}
          <circle
            cx={mapX(currentW)}
            cy={mapY(currentLoss)}
            r="7"
            fill="#f43f5e"
            stroke="#ffffff"
            strokeWidth="2"
            className="animate-pulse"
          />
        </svg>

        <div className="absolute bottom-3 left-4 flex gap-4 text-xs font-mono bg-slate-900/90 px-3 py-1.5 rounded-md border border-slate-800">
          <div>Iter: <span className="text-white font-bold">{iterations}</span></div>
          <div>Weight w: <span className="text-sky-400 font-bold">{currentW.toFixed(4)}</span></div>
          <div>Loss: <span className="text-rose-400 font-bold">{currentLoss.toFixed(4)}</span></div>
          <div>Grad: <span className="text-amber-400 font-bold">{(2 * (currentW - 1)).toFixed(4)}</span></div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-slate-300">Learning Rate (η / Alpha):</span>
            <span className="font-mono text-sky-400">{learningRate}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="1.1"
            step="0.02"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>0.01 (Slow)</span>
            <span>0.15 (Optimal)</span>
            <span>1.0+ (Overshooting)</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={step}
            disabled={isRunning}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5" />
            Take 1 Manual Step
          </button>
        </div>
      </div>
    </div>
  );
}
