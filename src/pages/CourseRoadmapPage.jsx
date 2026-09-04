import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Award,
  Sparkles,
  Zap,
  Filter,
  Layers,
  Search,
  Code2,
  ChevronRight,
  PlayCircle,
  ExternalLink,
  Youtube,
  Coffee,
  Brain,
  Cpu
} from 'lucide-react';
import { ALL_MODULES, JAVA_MODULES, ML_MODULES, VERILOG_MODULES, COURSE_CATEGORIES, ML_COURSE_CATEGORIES, VERILOG_COURSE_CATEGORIES, ALL_TRACKS } from '../data/mockCourseData';
import { useProgress } from '../context/ProgressContext';
import { ModuleCard } from '../components/course/ModuleCard';
import { ProgressBar } from '../components/common/ProgressBar';

export const CourseRoadmapPage = () => {
  const { getModuleProgress, getOverallProgress, isModuleLocked } = useProgress();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Track can be 'all', 'java', 'ml', or 'verilog'
  const currentTrack = searchParams.get('track') || 'java';
  const [selectedTrack, setSelectedTrack] = useState(currentTrack);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // all, in-progress, completed, unlocked
  const [searchQuery, setSearchQuery] = useState('');

  const handleTrackChange = (trackId) => {
    setSelectedTrack(trackId);
    setSelectedCategory('all');
    setSearchParams({ track: trackId });
  };

  const { percent, completedCount, totalLessons } = getOverallProgress();

  // Get active modules by track
  let activeModuleSet = ALL_MODULES;
  if (selectedTrack === 'java') activeModuleSet = JAVA_MODULES;
  else if (selectedTrack === 'ml') activeModuleSet = ML_MODULES;
  else if (selectedTrack === 'verilog') activeModuleSet = VERILOG_MODULES;

  const currentCategories = selectedTrack === 'verilog'
    ? [{ id: 'all', name: 'All Verilog Modules' }, ...VERILOG_COURSE_CATEGORIES.filter(c => c.id !== 'all-verilog')]
    : selectedTrack === 'ml' 
    ? [{ id: 'all', name: 'All ML Modules' }, ...ML_COURSE_CATEGORIES.filter(c => c.id !== 'all-ml')]
    : selectedTrack === 'java'
    ? COURSE_CATEGORIES
    : [{ id: 'all', name: 'All 58 Modules' }, ...COURSE_CATEGORIES.filter(c => c.id !== 'all'), ...ML_COURSE_CATEGORIES.filter(c => c.id !== 'all-ml'), ...VERILOG_COURSE_CATEGORIES.filter(c => c.id !== 'all-verilog')];

  const filteredModules = activeModuleSet.filter((module, idx) => {
    const isLocked = isModuleLocked(idx);
    const prog = getModuleProgress(module.id);

    // Category filter
    if (selectedCategory !== 'all' && module.categoryId !== selectedCategory) {
      return false;
    }

    // Status filter
    if (statusFilter === 'completed' && prog.percent !== 100) return false;
    if (statusFilter === 'in-progress' && (prog.percent === 0 || prog.percent === 100)) return false;
    if (statusFilter === 'unlocked' && isLocked) return false;

    // Search query
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Top Track Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl backdrop-blur-md">
        <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto p-1">
          <button
            onClick={() => handleTrackChange('java')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition whitespace-nowrap ${
              selectedTrack === 'java'
                ? 'bg-purple-600 text-white shadow-glow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Coffee className="w-4 h-4 text-amber-400" />
            <span>Java Full Stack</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/60 text-purple-200 border border-purple-400/30">
              31 Mods
            </span>
          </button>

          <button
            onClick={() => handleTrackChange('ml')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition whitespace-nowrap ${
              selectedTrack === 'ml'
                ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-glow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Brain className="w-4 h-4 text-cyan-300" />
            <span>ML & AI Track</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/60 text-cyan-200 border border-cyan-400/30">
              15 Mods
            </span>
          </button>

          <button
            onClick={() => handleTrackChange('verilog')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition whitespace-nowrap ${
              selectedTrack === 'verilog'
                ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-glow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-4 h-4 text-amber-300" />
            <span>Verilog & VLSI Track</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/60 text-amber-200 border border-amber-400/30">
              12 Mods
            </span>
          </button>

          <button
            onClick={() => handleTrackChange('all')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition whitespace-nowrap ${
              selectedTrack === 'all'
                ? 'bg-slate-800 text-white shadow-glow-sm border border-white/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>All 58 Modules</span>
          </button>
        </div>

        <div className="text-xs font-mono text-slate-400 px-3 hidden md:block">
          Active Track: <span className="text-white font-bold uppercase">{selectedTrack}</span>
        </div>
      </div>

      {/* Course Roadmap Hero Header */}
      <div className={`rounded-3xl p-6 sm:p-8 border relative overflow-hidden shadow-xl ${
        selectedTrack === 'verilog'
          ? 'bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-slate-950 border-amber-500/30'
          : selectedTrack === 'ml'
          ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-slate-950 border-cyan-500/30'
          : 'bg-gradient-to-br from-purple-950/40 via-slate-900/90 to-slate-950 border-purple-500/30'
      }`}>
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          {selectedTrack === 'verilog' ? (
            <Cpu className="w-64 h-64 text-amber-400" />
          ) : selectedTrack === 'ml' ? (
            <Brain className="w-64 h-64 text-cyan-400" />
          ) : (
            <Code2 className="w-64 h-64 text-purple-400" />
          )}
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {selectedTrack === 'verilog'
                ? 'Verilog HDL, Digital VLSI, Async FIFO & FPGA Timing Path'
                : selectedTrack === 'ml'
                ? 'Production Machine Learning, PyTorch, Transformers & GenAI Path'
                : 'Complete Enterprise Java 21, Spring Boot, Microservices & Kafka Path'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {selectedTrack === 'verilog'
              ? 'Verilog HDL & Digital VLSI Engineering Roadmap'
              : selectedTrack === 'ml'
              ? 'Machine Learning & AI Engineering Roadmap'
              : selectedTrack === 'java'
              ? 'Java & Cloud Engineering Roadmap'
              : 'Unified Full Stack, AI & Hardware Engineering Curriculum'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedTrack === 'verilog'
              ? '12 production-grade hardware design modules covering 4-State logic, Non-blocking <= rules, 32-bit ALU design, Mealy/Moore FSMs, Block RAM, Dual-Clock Async FIFO, and FPGA timing closure.'
              : selectedTrack === 'ml'
              ? '15 production-grade ML modules covering NumPy, Pandas, XGBoost, PyTorch, CNNs, Transformers, Prompt Engineering, Vector DBs (RAG), LoRA Fine-Tuning, and MLOps serving.'
              : '31 production-grade modules with interactive concept walkthroughs, code quizzes, and timestamped video references spanning Core Java, Build Tools, Spring Boot, Security, Cloud, Microservices, and Spring AI.'}
          </p>

          {/* Course Overall Progress Tracker */}
          <div className="pt-2">
            <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-1.5 font-medium">
              <span>Roadmap Progress</span>
              <span className="text-purple-400 font-bold">{percent}% ({completedCount}/{totalLessons} Lessons)</span>
            </div>
            <ProgressBar value={completedCount} max={totalLessons || 1} color={selectedTrack === 'verilog' ? 'amber' : selectedTrack === 'ml' ? 'cyan' : 'purple'} size="md" />
          </div>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Curriculum Domains</span>
          <span className="text-slate-500 font-normal">{filteredModules.length} Modules in View</span>
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
          {currentCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium font-mono whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? selectedTrack === 'ml'
                    ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-glow-sm font-bold'
                    : 'bg-purple-600 text-white shadow-glow-sm font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics (e.g. PyTorch, RAG, Kafka, LoRA)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition font-mono"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'all', label: 'All Modules' },
            { id: 'unlocked', label: 'Unlocked' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
          ].map((status) => (
            <button
              key={status.id}
              onClick={() => setStatusFilter(status.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                statusFilter === status.id
                  ? 'bg-slate-800 text-white border border-purple-500/40'
                  : 'bg-slate-950/40 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Module Cards Grid */}
      {filteredModules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module, idx) => {
            const isLocked = isModuleLocked(idx);
            const progress = getModuleProgress(module.id);

            return (
              <ModuleCard
                key={module.id}
                module={module}
                isLocked={false} // Unlocked for exploration
                progress={progress}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl p-12 text-center border border-dashed border-white/10 bg-slate-900/30">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Modules Found</h3>
          <p className="text-xs text-slate-400">
            No modules match your current filters. Try resetting the category or search query.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setStatusFilter('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-purple-600 text-xs font-bold text-white hover:bg-purple-500 transition font-mono"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
