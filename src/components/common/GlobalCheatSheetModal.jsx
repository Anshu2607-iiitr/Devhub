import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  X,
  Copy,
  Check,
  Sparkles,
  Coffee,
  Brain,
  Cpu,
  Layers,
  Terminal,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CHEATSHEET_DATABASE = [
  // --- JAVA 21 ---
  {
    track: "java",
    category: "Java 21 Syntax",
    title: "Java 21 Records (Immutable DTO)",
    syntax: "public record User(String id, String email) {}",
    hinglish: "Automatic getters, equals(), hashCode() aur toString() milta hai. Boilerplate zero ho jata hai.",
    code: `public record OrderRecord(Long id, String status, double amount) {\n    // Compact constructor validation\n    public OrderRecord {\n        if (amount < 0) throw new IllegalArgumentException("Amount must be positive");\n    }\n}`
  },
  {
    track: "java",
    category: "Java 21 Concurrency",
    title: "Project Loom Virtual Threads",
    syntax: "Executors.newVirtualThreadPerTaskExecutor()",
    hinglish: "JVM-managed lightweight threads jo traditional OS thread ki tarah memory block nahi karte.",
    code: `try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n    executor.submit(() -> doWork());\n}`
  },
  {
    track: "java",
    category: "Spring Boot",
    title: "Spring Security 6 FilterChain",
    syntax: "http.authorizeHttpRequests(auth -> auth...)",
    hinglish: "Spring Security 6 me SecurityFilterChain @Bean ke zariye route authorization define hoti hai.",
    code: `@Bean\npublic SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n    return http.authorizeHttpRequests(a -> a.requestMatchers("/public/**").permitAll().anyRequest().authenticated()).build();\n}`
  },
  {
    track: "java",
    category: "Spring Boot",
    title: "Spring 3.2 Fluent JdbcClient",
    syntax: "jdbcClient.sql(query).query(Record.class).list()",
    hinglish: "Bina custom RowMapper likhe query results directly Java 21 records me map ho jate hain.",
    code: `List<UserRecord> users = jdbcClient.sql("SELECT id, name FROM users").query(UserRecord.class).list();`
  },

  // --- MACHINE LEARNING & AI ---
  {
    track: "ml",
    category: "NumPy & PyTorch",
    title: "Matrix Multiplication in NumPy & PyTorch",
    syntax: "C = A @ B  # or np.matmul(A, B) / torch.matmul(A, B)",
    hinglish: "A * B element-wise hota hai; true linear algebra multiplication ke liye A @ B use karein.",
    code: `X = torch.randn(32, 128)  # Batch 32, Dim 128\nW = torch.randn(128, 64)  # Weight\nY = X @ W                 # Output Shape: (32, 64)`
  },
  {
    track: "ml",
    category: "PyTorch Deep Learning",
    title: "Standard PyTorch 4-Step Training Loop",
    syntax: "zero_grad() -> forward -> backward() -> step()",
    hinglish: "Gradients accumulate hote hain isliye har batch ke start me optimizer.zero_grad() compulsory hai.",
    code: `optimizer.zero_grad()\nloss = criterion(model(inputs), targets)\nloss.backward()\noptimizer.step()`
  },
  {
    track: "ml",
    category: "Transformers & GenAI",
    title: "Scaled Dot-Product Attention Formula",
    syntax: "Attention(Q, K, V) = softmax((Q @ K.T) / sqrt(d_k)) @ V",
    hinglish: "sqrt(d_k) scaling factor softmax gradients ko vanishing hone se prevent karta hai.",
    code: `scores = (Q @ K.transpose(-2, -1)) / (d_k ** 0.5)\nweights = torch.softmax(scores, dim=-1)\noutput = weights @ V`
  },
  {
    track: "ml",
    category: "LLM Fine-Tuning",
    title: "PEFT LoRA Adapter Configuration",
    syntax: "LoraConfig(r=16, lora_alpha=32, target_modules=['q_proj', 'v_proj'])",
    hinglish: "Base 70B model ko freeze karke sirf 1% low-rank matrices train karta hai (99% VRAM saved).",
    code: `config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"], task_type="CAUSAL_LM")`
  },

  // --- VERILOG HDL ---
  {
    track: "verilog",
    category: "Verilog Hardware Rules",
    title: "Non-Blocking (<=) in Clocked Blocks",
    syntax: "always @(posedge clk) begin q <= d; end",
    hinglish: "Sequential blocks (@posedge clk) me HAMESHA Non-Blocking '<=' use karein race conditions prevent karne ke liye.",
    code: `// Clocked Register Transfer\nalways @(posedge clk or negedge rst_n) begin\n    if (!rst_n) q <= 1'b0;\n    else q <= d;\nend`
  },
  {
    track: "verilog",
    category: "Combinational Circuits",
    title: "Glitch-Free Case Statement & Default Branch",
    syntax: "always @(*) begin case(sel) ... default: ... endcase end",
    hinglish: "Combinational case me 'default:' branch lagana mandatory hai taaki unwanted transparent latch na bane.",
    code: `always @(*) begin\n    case (sel)\n        2'b00: y = a;\n        2'b01: y = b;\n        default: y = 1'b0; // Prevents latch\n    endcase\nend`
  },
  {
    track: "verilog",
    category: "Clock Domain Crossing",
    title: "Binary to Gray Code Conversion",
    syntax: "assign gray = (bin >> 1) ^ bin;",
    hinglish: "Gray code me transition par sirf 1 bit change hota hai, Async FIFO me metastability avoid hoti hai.",
    code: `wire [3:0] bin = 4'b1011;\nwire [3:0] gray = (bin >> 1) ^ bin; // Output: 4'b1110`
  }
];

export const GlobalCheatSheetModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('all'); // 'all', 'java', 'ml', 'verilog'
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Keyboard shortcut Ctrl+K / Cmd+K to open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleCopy = (codeText, idx) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredItems = CHEATSHEET_DATABASE.filter((item) => {
    if (selectedTrack !== 'all' && item.track !== selectedTrack) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        item.title.toLowerCase().includes(q) ||
        item.syntax.toLowerCase().includes(q) ||
        item.hinglish.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      if (!matches) return false;
    }
    return true;
  });

  return (
    <>
      {/* Floating Action Button (Bottom-Right) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white font-mono text-xs font-bold shadow-2xl hover:scale-105 transition-all flex items-center space-x-2 border border-white/20 shadow-glow-md group"
      >
        <BookOpen className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Cheat Sheet</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-black/40 rounded text-[10px] text-slate-300 border border-white/10">
          Ctrl+K
        </kbd>
      </button>

      {/* Modal Backdrop & Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-4xl max-h-[85vh] bg-[#090D16] border border-purple-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Header & Search */}
              <div className="p-5 border-b border-white/10 bg-slate-900/60 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                        Global Engineering Cheat Sheet
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          HINGLISH CODES
                        </span>
                      </h2>
                      <p className="text-xs text-slate-400 font-mono">
                        Instant syntax, rules, and memory hacks across Java, ML, and Verilog
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search keywords (e.g. Virtual Threads, LoRA, Non-blocking <=, RAG)..."
                    autoFocus
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                {/* Track Selector Tabs */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                  {[
                    { id: 'all', label: 'All (Java + ML + Verilog)', icon: Layers },
                    { id: 'java', label: 'Java 21 & Spring', icon: Coffee },
                    { id: 'ml', label: 'Python ML & PyTorch', icon: Brain },
                    { id: 'verilog', label: 'Verilog & Digital VLSI', icon: Cpu },
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = selectedTrack === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTrack(tab.id)}
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition whitespace-nowrap ${
                          isActive
                            ? 'bg-purple-600 text-white shadow-glow-sm'
                            : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-white/5'
                        }`}
                      >
                        <TabIcon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Items List Body */}
              <div className="p-5 overflow-y-auto space-y-4 flex-1">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="glass-card rounded-2xl p-4 border border-white/10 space-y-2.5 hover:border-purple-500/40 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold uppercase ${
                            item.track === 'verilog'
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              : item.track === 'ml'
                              ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                              : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                          }`}>
                            {item.category}
                          </span>
                          <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        </div>

                        <button
                          onClick={() => handleCopy(item.code, idx)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-white/5 transition flex items-center gap-1"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Hinglish Rule Callout */}
                      <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs font-mono text-amber-200">
                        <span className="text-amber-400 font-bold">💡 Quick Rule (Hinglish): </span>
                        {item.hinglish}
                      </div>

                      {/* Code Snippet */}
                      <div className="p-3 rounded-xl bg-[#070A14] text-xs font-mono text-slate-200 border border-white/5 overflow-x-auto">
                        <pre>{item.code}</pre>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500 font-mono text-xs">
                    No cheat codes matched "{searchQuery}". Try searching another keyword!
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
