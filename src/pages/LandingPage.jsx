import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Zap,
  Flame,
  CheckCircle2,
  Code2,
  BrainCircuit,
  Target,
  Trophy,
  ArrowRight,
  Sparkles,
  PlayCircle,
  HelpCircle,
  Clock,
  Layers,
  ChevronRight,
  ShieldCheck,
  Youtube,
  Box,
  Film,
  Coffee,
  Brain,
  Cpu
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CodeBlock } from '../components/common/CodeBlock';
import { ALL_MODULES, JAVA_MODULES, ML_MODULES, VERILOG_MODULES, COURSE_CATEGORIES, ML_COURSE_CATEGORIES, VERILOG_COURSE_CATEGORIES } from '../data/mockCourseData';
import { OpeningAnimation3D } from '../components/3d/OpeningAnimation3D';
import { Hero3DCanvas } from '../components/3d/Hero3DCanvas';
import { ScrollSite3DExperience } from '../components/3d/ScrollSite3DExperience';
import { motion } from 'framer-motion';

export const LandingPage = () => {
  const [showOpening3D, setShowOpening3D] = useState(true);
  const [heroQuizSelected, setHeroQuizSelected] = useState(null);
  const [heroQuizSubmitted, setHeroQuizSubmitted] = useState(false);
  const [activeHomeTrack, setActiveHomeTrack] = useState('java'); // 'java', 'ml', 'verilog'
  const [selectedHomeCategory, setSelectedHomeCategory] = useState('all');

  const heroSampleQuiz = activeHomeTrack === 'verilog' ? {
    question: "Why should you use non-blocking '<=' inside 'always @(posedge clk)' sequential blocks?",
    code: `always @(posedge clk) begin\n    q1 <= d;\n    q2 <= q1; // Parallel hardware update\nend`,
    options: [
      "Evaluates RHS simultaneously, preventing simulation race conditions and synthesizing true pipeline registers",
      "Converts registers into pure combinational wires",
      "Disables clock distribution on FPGA",
      "Increases propagation delay by 10ns"
    ],
    correct: 0,
    explanation: "Non-blocking assignments (<=) evaluate all right-hand sides concurrently at the active clock edge, faithfully modeling physical parallel D-Flip-Flop register transfers without race conditions."
  } : activeHomeTrack === 'ml' ? {
    question: "What is the key benefit of LoRA (Low-Rank Adaptation) in LLM fine-tuning?",
    code: `config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"])`,
    options: [
      "Freezes 99% of base parameters and trains low-rank adapter matrices (A x B)",
      "Converts Python PyTorch models to pure HTML",
      "Deletes weights randomly to speed up GPU inference",
      "Increases model file size by 10x"
    ],
    correct: 0,
    explanation: "LoRA freezes original base model weights and only trains low-rank decomposition matrices, saving over 99% VRAM memory with zero degradation in accuracy."
  } : {
    question: "What is the output of this Java String pool comparison?",
    code: `String a = "DevHub";\nString b = "Dev" + "Hub";\nSystem.out.println(a == b);`,
    options: [
      "true (Compiler optimizes constant string literals into the pool)",
      "false (Always creates distinct heap addresses)",
      "NullPointerException",
      "Compile Error"
    ],
    correct: 0,
    explanation: "Compile-time constant expressions are resolved and interned directly in the String Constant Pool, making 'a' and 'b' point to the identical reference."
  };

  const currentTrackModules = activeHomeTrack === 'verilog'
    ? VERILOG_MODULES
    : activeHomeTrack === 'ml'
    ? ML_MODULES
    : JAVA_MODULES;

  const currentCategories = activeHomeTrack === 'verilog'
    ? [{ id: 'all', name: 'All Verilog Modules' }, ...VERILOG_COURSE_CATEGORIES.filter(c => c.id !== 'all-verilog')]
    : activeHomeTrack === 'ml'
    ? [{ id: 'all', name: 'All ML Modules' }, ...ML_COURSE_CATEGORIES.filter(c => c.id !== 'all-ml')]
    : COURSE_CATEGORIES;

  const displayedModules = selectedHomeCategory === 'all'
    ? currentTrackModules
    : currentTrackModules.filter(m => m.categoryId === selectedHomeCategory);

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
      {/* 3D Cinematic Opening Animation */}
      {showOpening3D && (
        <OpeningAnimation3D onComplete={() => setShowOpening3D(false)} />
      )}

      <Navbar />

      {/* Apple-Style 3D Scroll Film Storytelling Section */}
      <ScrollSite3DExperience />

      {/* Hero Section with Interactive 3D Canvas Background */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden border-t border-white/10">
        {/* Interactive Three.js 3D Mesh in background */}
        <Hero3DCanvas />

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>3 Specialized Tracks: Java Full Stack • ML & AI • Verilog VLSI</span>
                </motion.div>

                <button
                  onClick={() => setShowOpening3D(true)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono transition"
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Replay 3D Intro</span>
                </button>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
              >
                Master Software, AI & Hardware,{' '}
                <span className="gradient-text">By Doing Not Watching.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Stop drowning in passive video tutorials. DevHub delivers complete interactive learning across three dedicated engineering tracks: **31 Java Full Stack Modules**, **15 Machine Learning & AI Modules**, and **12 Verilog HDL & Digital VLSI Modules** — backed by 3,100+ difficulty-tiered quizzes with Hinglish Quick Theories.
              </motion.p>

              {/* Track Switcher Pills on Hero */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                <button
                  onClick={() => {
                    setActiveHomeTrack('java');
                    setSelectedHomeCategory('all');
                    setHeroQuizSelected(null);
                    setHeroQuizSubmitted(false);
                  }}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition ${
                    activeHomeTrack === 'java'
                      ? 'bg-purple-600 text-white shadow-glow-sm'
                      : 'bg-slate-900 text-slate-400 border border-white/10 hover:text-white'
                  }`}
                >
                  <Coffee className="w-3.5 h-3.5 text-amber-400" />
                  <span>Java (31)</span>
                </button>

                <button
                  onClick={() => {
                    setActiveHomeTrack('ml');
                    setSelectedHomeCategory('all');
                    setHeroQuizSelected(null);
                    setHeroQuizSubmitted(false);
                  }}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition ${
                    activeHomeTrack === 'ml'
                      ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-glow-sm'
                      : 'bg-slate-900 text-slate-400 border border-white/10 hover:text-white'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5 text-cyan-300" />
                  <span>ML & AI (15)</span>
                </button>

                <button
                  onClick={() => {
                    setActiveHomeTrack('verilog');
                    setSelectedHomeCategory('all');
                    setHeroQuizSelected(null);
                    setHeroQuizSubmitted(false);
                  }}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition ${
                    activeHomeTrack === 'verilog'
                      ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-glow-sm'
                      : 'bg-slate-900 text-slate-400 border border-white/10 hover:text-white'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-amber-300" />
                  <span>Verilog & VLSI (12)</span>
                </button>
              </div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <Link
                  to="/signup"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-md flex items-center justify-center space-x-2 transition"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to={`/course/java?track=${activeHomeTrack}`}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 flex items-center justify-center space-x-2 transition"
                >
                  <Code2 className="w-4 h-4 text-purple-400" />
                  <span>Explore {activeHomeTrack === 'verilog' ? '12 Verilog Modules' : activeHomeTrack === 'ml' ? '15 ML Modules' : '31 Java Modules'}</span>
                </Link>
              </motion.div>
            </div>

            {/* Right Interactive Diagnostic Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="glass-card rounded-3xl p-6 sm:p-7 border border-purple-500/30 shadow-2xl relative">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center space-x-2 text-xs font-mono text-purple-300">
                    <Terminal className="w-4 h-4 text-purple-400" />
                    <span className="font-bold">LIVE DIAGNOSTIC ARENA</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {activeHomeTrack.toUpperCase()} TRACK
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <h3 className="text-sm font-bold text-white">
                    {heroSampleQuiz.question}
                  </h3>

                  <div className="p-3 rounded-xl bg-[#0B0F19] text-xs font-mono text-slate-300 border border-white/5">
                    <pre className="overflow-x-auto">{heroSampleQuiz.code}</pre>
                  </div>

                  <div className="space-y-2 pt-1">
                    {heroSampleQuiz.options.map((opt, i) => {
                      const isSelected = heroQuizSelected === i;
                      const isCorrect = heroSampleQuiz.correct === i;
                      let btnStyle = "bg-slate-900/60 border-white/10 text-slate-300 hover:border-purple-500/40";

                      if (heroQuizSubmitted) {
                        if (isCorrect) btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-300";
                        else if (isSelected) btnStyle = "bg-rose-950/40 border-rose-500 text-rose-300";
                      } else if (isSelected) {
                        btnStyle = "bg-purple-950/50 border-purple-500 text-white";
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (!heroQuizSubmitted) setHeroQuizSelected(i);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono transition-all flex items-start space-x-2 ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center font-bold shrink-0">
                            {['A', 'B', 'C', 'D'][i]}
                          </span>
                          <span className="pt-0.5">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    {!heroQuizSubmitted ? (
                      <button
                        onClick={() => {
                          if (heroQuizSelected !== null) setHeroQuizSubmitted(true);
                        }}
                        disabled={heroQuizSelected === null}
                        className="w-full py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-40 transition"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <div className="w-full space-y-2">
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-purple-500/20 text-xs text-slate-300 leading-relaxed">
                          <span className="font-bold text-purple-300">Explanation: </span>
                          {heroSampleQuiz.explanation}
                        </div>
                        <Link
                          to="/signup"
                          className="w-full py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition flex items-center justify-center gap-1.5"
                        >
                          <span>Claim +50 XP & Continue</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning Statistics Strip */}
      <section id="stats" className="border-y border-white/10 bg-[#0B0F19]/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl glass-card">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-purple-400">58</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">
                Java, ML & Verilog Modules
              </div>
            </div>
            <div className="p-4 rounded-2xl glass-card">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400">3,100+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">
                Active Recall Diagnostics
              </div>
            </div>
            <div className="p-4 rounded-2xl glass-card">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">Hinglish</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">
                Quick Theory & Concept Notes
              </div>
            </div>
            <div className="p-4 rounded-2xl glass-card">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400">100% Free</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">
                Open Access Platform
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Roadmap Interactive Syllabus Showcase */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-purple-400 flex items-center gap-2">
              <span>EXPLORE ALL MODULES</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {activeHomeTrack.toUpperCase()} TRACK
              </span>
            </h2>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">
              {activeHomeTrack === 'verilog'
                ? 'From Logic Gates to Dual-Clock Async FIFOs & FPGAs'
                : activeHomeTrack === 'ml'
                ? 'From Python & PyTorch to Transformers & MLOps'
                : 'From Core Java to Cloud Microservices & Spring AI'}
            </h3>
            <p className="text-sm text-slate-400">
              Browse lessons, read Hinglish quick theories, test code snippets, and solve tiered quizzes.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Track Switcher */}
            <div className="p-1 rounded-xl bg-slate-900 border border-white/10 flex items-center overflow-x-auto">
              <button
                onClick={() => {
                  setActiveHomeTrack('java');
                  setSelectedHomeCategory('all');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeHomeTrack === 'java' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Java (31)
              </button>
              <button
                onClick={() => {
                  setActiveHomeTrack('ml');
                  setSelectedHomeCategory('all');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeHomeTrack === 'ml' ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                ML & AI (15)
              </button>
              <button
                onClick={() => {
                  setActiveHomeTrack('verilog');
                  setSelectedHomeCategory('all');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeHomeTrack === 'verilog' ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Verilog (12)
              </button>
            </div>

            <Link
              to={`/course/java?track=${activeHomeTrack}`}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 font-mono"
            >
              <span>Full Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Domain Category Filter Tabs on Landing Page */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6">
          {currentCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedHomeCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition whitespace-nowrap ${
                selectedHomeCategory === cat.id
                  ? activeHomeTrack === 'verilog'
                    ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-glow-sm'
                    : activeHomeTrack === 'ml'
                    ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-glow-sm'
                    : 'bg-purple-600 text-white shadow-glow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedModules.map((mod) => (
            <Link
              key={mod.id}
              to={`/learn/${mod.lessons[0].id}`}
              className="glass-card glass-card-hover rounded-2xl p-5 border border-white/10 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className={activeHomeTrack === 'verilog' ? 'text-amber-400 font-bold' : activeHomeTrack === 'ml' ? 'text-cyan-400 font-bold' : 'text-purple-400 font-bold'}>
                    Module {mod.moduleNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-white/5">{mod.category}</span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                  {mod.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                  {mod.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-500">
                {mod.videoTimestamp ? (
                  <span className="flex items-center gap-1 text-rose-400">
                    <Youtube className="w-3.5 h-3.5" />
                    <span>{mod.videoTimestamp}</span>
                  </span>
                ) : (
                  <span>+{mod.xpReward} XP</span>
                )}
                <span className="text-purple-400 flex items-center gap-1 font-semibold">
                  Start Module <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
