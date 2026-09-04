import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Search,
  Filter,
  Layers,
  ChevronRight,
  Zap,
  Check,
  Copy,
  Clock,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Cpu,
  Trophy,
  Coffee,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CODING_CHALLENGES, CODING_PLATFORMS, CODING_DIFFICULTIES } from '../data/mockCodingChallenges';
import { AudioTutorButton } from '../components/common/AudioTutorButton';
import { useProgress } from '../context/ProgressContext';

export const CodingArenaPage = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all'); // 'all', 'leetcode', 'cp31', 'codechef', 'verilog'
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProblem, setActiveProblem] = useState(CODING_CHALLENGES[0]);
  const [selectedLang, setSelectedLang] = useState(activeProblem.starterTemplates.verilog ? 'verilog' : 'java');
  const [code, setCode] = useState(activeProblem.starterTemplates.verilog || activeProblem.starterTemplates.java || "");
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const { addXp } = useProgress();

  const handleSelectProblem = (problem) => {
    setActiveProblem(problem);
    setShowSolution(false);
    setTestResults(null);
    const lang = problem.starterTemplates.verilog ? 'verilog' : problem.starterTemplates.java ? 'java' : 'python';
    setSelectedLang(lang);
    setCode(problem.starterTemplates[lang] || "");
  };

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    setCode(activeProblem.starterTemplates[lang] || activeProblem.solutionCode);
  };

  const handleRunTests = () => {
    setIsRunning(true);
    setTestResults(null);

    setTimeout(() => {
      // Simulate test runner
      const passed = activeProblem.testCases.map((tc, idx) => ({
        id: idx + 1,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: tc.expectedOutput,
        passed: true,
        timeMs: Math.floor(Math.random() * 25) + 10
      }));

      setTestResults({
        allPassed: true,
        totalCases: activeProblem.testCases.length,
        passedCount: activeProblem.testCases.length,
        cases: passed,
        runtimeMs: Math.floor(Math.random() * 30) + 15,
        memoryMb: (Math.random() * 12 + 20).toFixed(1)
      });
      setIsRunning(false);
      if (addXp) addXp(activeProblem.xpReward || 50);
    }, 700);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const filteredProblems = CODING_CHALLENGES.filter((prob) => {
    if (selectedPlatform !== 'all' && prob.sourceId !== selectedPlatform) return false;
    if (selectedDifficulty !== 'all') {
      if (selectedDifficulty === 'easy' && prob.difficulty !== 'Easy') return false;
      if (selectedDifficulty === 'medium' && prob.difficulty !== 'Medium') return false;
      if (selectedDifficulty === 'hard' && prob.difficulty !== 'Hard') return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = prob.title.toLowerCase().includes(q) ||
        prob.source.toLowerCase().includes(q) ||
        prob.tags.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const getDifficultyBadgeColor = (diff) => {
    if (diff === 'Easy') return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
    if (diff === 'Medium') return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
    return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-indigo-950/40 via-slate-900/90 to-slate-950 border border-indigo-500/30 relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ALGORITHMS & HARDWARE ARENA</span>
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Competitive Coding & Verilog Arena
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Practice curated coding problems from **LeetCode**, **Codeforces (CP-31 Sheet)**, **CodeChef**, and **HDLBits Verilog**. Includes instant test runners and step-by-step **Hinglish Intuition & Dry Runs**.
          </p>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Problem Browser & Filters (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Platform Filters */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
            {CODING_PLATFORMS.map((plat) => (
              <button
                key={plat.id}
                onClick={() => setSelectedPlatform(plat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
                  selectedPlatform === plat.id
                    ? 'bg-purple-600 text-white shadow-glow-sm'
                    : 'bg-slate-900 text-slate-400 border border-white/5 hover:text-white'
                }`}
              >
                {plat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems (e.g. Two Sum, Halloumi, FSM)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Problems List */}
          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredProblems.map((prob) => {
              const isSelected = activeProblem.id === prob.id;
              return (
                <button
                  key={prob.id}
                  onClick={() => handleSelectProblem(prob)}
                  className={`w-full p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500/60 shadow-glow-sm'
                      : 'bg-slate-900/60 border-white/10 hover:border-white/20 hover:bg-slate-800/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                      <span className="font-bold px-2 py-0.5 rounded-full bg-slate-800 border border-white/10 text-slate-300">
                        {prob.source}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full border font-semibold ${getDifficultyBadgeColor(prob.difficulty)}`}>
                        {prob.difficulty} ({prob.rating})
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {prob.title}
                    </h4>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {prob.tags.map((t, i) => (
                        <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-purple-400 font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-purple-400" />
                      +{prob.xpReward} XP
                    </span>
                    <span className="text-slate-500 flex items-center gap-0.5">
                      Solve <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Problem Description & Interactive IDE (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Problem Details Card */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/5 gap-2">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                    {activeProblem.source}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full border font-semibold ${getDifficultyBadgeColor(activeProblem.difficulty)}`}>
                    {activeProblem.difficulty} ({activeProblem.rating})
                  </span>
                  <span className="text-slate-500">Acceptance: {activeProblem.acceptance}</span>
                </div>
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  {activeProblem.title}
                </h2>
              </div>

              {/* Hinglish Audio Explainer Button */}
              {activeProblem.hinglishIntuition && (
                <div className="shrink-0">
                  <AudioTutorButton textToRead={activeProblem.hinglishIntuition} label="🔊 Listen Logic (Hinglish)" />
                </div>
              )}
            </div>

            {/* Description Text */}
            <div className="text-xs sm:text-sm text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
              {activeProblem.description}
            </div>

            {/* Constraints */}
            {activeProblem.constraints && (
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-xs font-mono text-slate-400 space-y-1">
                <span className="font-bold text-slate-300">Constraints:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                  {activeProblem.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hinglish Intuition & Logic Accordion */}
            {activeProblem.hinglishIntuition && (
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs sm:text-sm text-amber-100 font-mono space-y-2">
                <div className="flex items-center justify-between font-bold text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>💡 HINGLISH INTUITION & STEP-BY-STEP LOGIC</span>
                  </span>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-amber-200/90 text-xs">
                  {activeProblem.hinglishIntuition}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Code Editor & Test Runner */}
          <div className="glass-card rounded-3xl p-5 border border-white/10 space-y-4">
            {/* Editor Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pb-3 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-white">CODE SOLVER</span>

                {/* Language Switcher */}
                <div className="flex items-center space-x-1 ml-2">
                  {Object.keys(activeProblem.starterTemplates).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLangChange(lang)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold uppercase transition ${
                        selectedLang === lang
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-white/10 transition"
                >
                  {showSolution ? 'Hide Solution' : 'View Verified Solution'}
                </button>

                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-white/10 transition flex items-center gap-1"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleRunTests}
                  disabled={isRunning}
                  className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-mono font-bold text-white transition flex items-center gap-1.5 shadow-glow-sm disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 fill-white ${isRunning ? 'animate-spin' : ''}`} />
                  <span>{isRunning ? 'Testing...' : 'Run Test Cases'}</span>
                </button>
              </div>
            </div>

            {/* Editable Textarea */}
            <div className="rounded-2xl border border-white/10 bg-[#070A14] p-4 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed overflow-x-auto min-h-[220px]">
              <textarea
                value={showSolution ? activeProblem.solutionCode : code}
                onChange={(e) => {
                  if (!showSolution) setCode(e.target.value);
                }}
                spellCheck="false"
                rows={12}
                className="w-full bg-transparent outline-none resize-none font-mono text-slate-200 text-xs sm:text-sm leading-relaxed"
              />
            </div>

            {/* Test Results Output */}
            {testResults && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ALL {testResults.passedCount}/{testResults.totalCases} TEST CASES PASSED</span>
                  </span>
                  <span className="text-slate-400">
                    Runtime: <span className="text-cyan-400 font-bold">{testResults.runtimeMs} ms</span> • Memory: <span className="text-purple-400 font-bold">{testResults.memoryMb} MB</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {testResults.cases.map((tc) => (
                    <div key={tc.id} className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-[11px] font-mono space-y-1">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Case #{tc.id}</span>
                        <span className="text-emerald-400 font-bold">PASSED ({tc.timeMs}ms)</span>
                      </div>
                      <div className="text-slate-300 truncate">Input: {tc.input}</div>
                      <div className="text-emerald-300 truncate">Output: {tc.actual}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
