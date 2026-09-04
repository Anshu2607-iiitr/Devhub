import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Zap,
  Clock,
  Sparkles,
  ChevronRight,
  Youtube,
  Coffee,
  Brain,
  Layers
} from 'lucide-react';
import { MOCK_QUIZZES } from '../data/mockQuizzes';
import { ALL_MODULES, JAVA_MODULES, ML_MODULES, VERILOG_MODULES } from '../data/mockCourseData';

export const PracticePage = () => {
  const [selectedTrack, setSelectedTrack] = useState('all'); // 'all', 'java', 'ml', 'verilog'
  const [searchQuery, setSearchQuery] = useState('');

  const quizList = Object.values(MOCK_QUIZZES);

  const filteredQuizzes = quizList.filter((quiz) => {
    const parentModule = ALL_MODULES.find(m => m.id === quiz.moduleId) || ALL_MODULES[0];

    // Track filter
    if (selectedTrack === 'java' && parentModule.track !== 'java') return false;
    if (selectedTrack === 'ml' && parentModule.track !== 'ml') return false;
    if (selectedTrack === 'verilog' && parentModule.track !== 'verilog') return false;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches = quiz.title.toLowerCase().includes(q) ||
        quiz.description.toLowerCase().includes(q) ||
        parentModule.title.toLowerCase().includes(q);
      if (!matches) return false;
    }

    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-indigo-950/40 via-slate-900/90 to-slate-950 border border-indigo-500/30 relative overflow-hidden shadow-xl">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TOPIC DIAGNOSTIC ARENA • 58 TOPICS</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Practice Arena</h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Sharpen your code diagnostic instincts across 31 Java Full Stack modules, 15 Machine Learning & AI modules, and 12 Verilog HDL & Digital VLSI modules — complete with Hinglish Quick Theories.
          </p>
        </div>
      </div>

      {/* Track Switcher & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Track Pills */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setSelectedTrack('all')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
              selectedTrack === 'all'
                ? 'bg-slate-800 text-white border border-white/20 shadow-glow-sm'
                : 'bg-slate-900/80 text-slate-400 border border-white/5 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>All 58 Quizzes</span>
          </button>

          <button
            onClick={() => setSelectedTrack('java')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
              selectedTrack === 'java'
                ? 'bg-purple-600 text-white shadow-glow-sm'
                : 'bg-slate-900/80 text-slate-400 border border-white/5 hover:text-white'
            }`}
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>Java (31)</span>
          </button>

          <button
            onClick={() => setSelectedTrack('ml')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
              selectedTrack === 'ml'
                ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-glow-sm'
                : 'bg-slate-900/80 text-slate-400 border border-white/5 hover:text-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-cyan-300" />
            <span>ML & AI (15)</span>
          </button>

          <button
            onClick={() => setSelectedTrack('verilog')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
              selectedTrack === 'verilog'
                ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-glow-sm'
                : 'bg-slate-900/80 text-slate-400 border border-white/5 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Verilog (12)</span>
          </button>
        </div>

        {/* Search */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search quizzes (e.g. PyTorch, Kafka, LoRA)..."
            className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
          />
        </div>
      </div>

      {/* Quiz Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuizzes.map((quiz) => {
          const parentModule = ALL_MODULES.find(m => m.id === quiz.moduleId) || ALL_MODULES[0];
          const isML = parentModule.track === 'ml';

          return (
            <div
              key={quiz.id}
              className="glass-card glass-card-hover rounded-2xl p-5 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className={`px-2 py-0.5 rounded-full border font-semibold ${
                    isML
                      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                      : 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                  }`}>
                    {quiz.questions?.length || 55} Questions • {isML ? 'ML & AI' : 'Java Full Stack'}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {Math.floor((quiz.timeLimitSeconds || 600) / 60)}m Challenge
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">{quiz.title}</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{quiz.description}</p>
                
                {parentModule.videoTimestamp && (
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-mono text-rose-400">
                    <Youtube className="w-3.5 h-3.5" />
                    <span>Timestamp: {parentModule.videoTimestamp}</span>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400 font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-purple-400" />
                  +{quiz.xpReward || 150} XP
                </span>

                <Link
                  to={`/quiz/${quiz.id}`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition shadow-sm flex items-center gap-1.5 ${
                    isML
                      ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500'
                      : 'bg-purple-600 hover:bg-purple-500'
                  }`}
                >
                  <span>Launch 55-Q Quiz</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
