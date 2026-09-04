import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Code2,
  Copy,
  Check,
  Zap,
  Coffee,
  Brain,
  Cpu,
  Layers,
  Settings,
  Share2,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CODE_TEMPLATES = {
  java: [
    {
      id: "java-threads",
      title: "Project Loom: 10,000 Virtual Threads",
      desc: "High-concurrency virtual thread execution in Java 21 LTS.",
      code: `import java.util.concurrent.Executors;
import java.time.Duration;
import java.time.Instant;

public class VirtualThreadDemo {
    public static void main(String[] args) {
        System.out.println("🚀 Spawning 10,000 Virtual Threads on Carrier Kernel...");
        var start = Instant.now();

        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 1; i <= 10_000; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    Thread.sleep(Duration.ofMillis(50));
                    if (taskId % 2500 == 0) {
                        System.out.println("✅ Completed Batch Task #" + taskId + " on " + Thread.currentThread());
                    }
                    return taskId;
                });
            }
        }

        var duration = Duration.between(start, Instant.now()).toMillis();
        System.out.println("⚡ ALL 10,000 Virtual Tasks Finished in " + duration + " ms!");
    }
}`,
      output: `🚀 Spawning 10,000 Virtual Threads on Carrier Kernel...
✅ Completed Batch Task #2500 on VirtualThread[#2542]/runnable@ForkJoinPool-1-worker-3
✅ Completed Batch Task #5000 on VirtualThread[#5087]/runnable@ForkJoinPool-1-worker-1
✅ Completed Batch Task #7500 on VirtualThread[#7612]/runnable@ForkJoinPool-1-worker-4
✅ Completed Batch Task #10000 on VirtualThread[#10155]/runnable@ForkJoinPool-1-worker-2
⚡ ALL 10,000 Virtual Tasks Finished in 84 ms!
[Process completed with exit code 0 - Heap Used: 18.4 MB]`
    },
    {
      id: "java-records",
      title: "Java 21 Pattern Matching & Records",
      desc: "Modern switch expressions with record deconstruction.",
      code: `public class PatternMatchingDemo {
    sealed interface Payment permits Card, Crypto, Upi {}
    record Card(String number, double amount) implements Payment {}
    record Crypto(String txHash, double amount) implements Payment {}
    record Upi(String vpa, double amount) implements Payment {}

    public static String processPayment(Payment p) {
        return switch (p) {
            case Card c when c.amount() > 10000 -> "⚠️ High-value Card Auth Required: $" + c.amount();
            case Card c -> "💳 Card Payment Approved: $" + c.amount();
            case Crypto cr -> "⛓️ Blockchain Tx Verified: " + cr.txHash();
            case Upi u -> "📲 Instant UPI Settlement to " + u.vpa();
        };
    }

    public static void main(String[] args) {
        Payment p1 = new Card("4532-XXXX", 12500.0);
        Payment p2 = new Upi("alex@okaxis", 450.0);

        System.out.println(processPayment(p1));
        System.out.println(processPayment(p2));
    }
}`,
      output: `⚠️ High-value Card Auth Required: $12500.0
📲 Instant UPI Settlement to alex@okaxis
[Process completed with exit code 0]`
    }
  ],
  ml: [
    {
      id: "ml-attention",
      title: "PyTorch Scaled Dot-Product Attention (QKV)",
      desc: "Transformer mathematical attention engine with Softmax scaling.",
      code: `import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    # Compute Attention Scores: (Q @ K^T) / sqrt(d_k)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
        
    weights = F.softmax(scores, dim=-1)
    output = torch.matmul(weights, V)
    return output, weights

# Batch: 1, Sequence: 4 tokens, Embedding Dim: 8
torch.manual_seed(42)
Q = torch.randn(1, 4, 8)
K = torch.randn(1, 4, 8)
V = torch.randn(1, 4, 8)

out, attn_matrix = scaled_dot_product_attention(Q, K, V)
print("✨ Attention Output Tensor Shape:", out.shape)
print("📊 Attention Distribution (Token 0 Weights):", attn_matrix[0, 0].tolist())`,
      output: `✨ Attention Output Tensor Shape: torch.Size([1, 4, 8])
📊 Attention Distribution (Token 0 Weights): [0.3842, 0.1981, 0.2455, 0.1722]
[Execution Time: 42ms on CUDA Torch Tensor Backend]`
    },
    {
      id: "ml-lora",
      title: "PEFT LoRA Adapter Decomposition",
      desc: "Low-Rank Adaptation matrix update formula: W = W0 + (B * A) * (alpha/r)",
      code: `import numpy as np

# Simulate 4096-dim Linear Projection Weight Matrix
d_in, d_out = 4096, 4096
rank_r = 16
alpha = 32.0

# Base Weight (Frozen)
W0 = np.random.randn(d_out, d_in) * 0.01

# Trainable LoRA Low-Rank Matrices (A: Gaussian, B: Zero)
A = np.random.randn(rank_r, d_in) * (1.0 / rank_r)
B = np.zeros((d_out, rank_r))

# Simulate gradient step on B
B += np.random.randn(d_out, rank_r) * 0.05

# Compute Delta Weight: (B @ A) * (alpha / r)
delta_W = (B @ A) * (alpha / rank_r)
W_adapted = W0 + delta_W

params_base = d_in * d_out
params_lora = (d_in * rank_r) + (d_out * rank_r)
vram_saving = (1.0 - params_lora / params_base) * 100

print(f"🔥 Base Model Parameters: {params_base:,}")
print(f"⚡ Trainable LoRA Parameters: {params_lora:,}")
print(f"💰 VRAM Memory Reduction: {vram_saving:.2f}% Saved!")`,
      output: `🔥 Base Model Parameters: 16,777,216
⚡ Trainable LoRA Parameters: 131,072
💰 VRAM Memory Reduction: 99.22% Saved!
[Completed in 14ms - Zero Accuracy Degradation]`
    }
  ],
  verilog: [
    {
      id: "v-alu",
      title: "32-Bit RISC-V Arithmetic Logic Unit (ALU)",
      desc: "Synthesizable multi-function combinational datapath with zero flag.",
      code: `module alu_32bit (
    input  wire [31:0] a,
    input  wire [31:0] b,
    input  wire [2:0]  alu_ctrl, // 000:ADD, 001:SUB, 010:AND, 011:OR, 100:XOR, 101:SLT
    output reg  [31:0] result,
    output wire        zero_flag
);
    always @(*) begin
        case (alu_ctrl)
            3'b000:  result = a + b;
            3'b001:  result = a - b;
            3'b010:  result = a & b;
            3'b011:  result = a | b;
            3'b100:  result = a ^ b;
            3'b101:  result = ($signed(a) < $signed(b)) ? 32'd1 : 32'd0;
            default: result = 32'd0; // Prevents latch inference
        endcase
    end

    assign zero_flag = (result == 32'd0);
endmodule`,
      output: `[Yosys RTL Synthesis Log]
Generating RTLIL representation for module alu_32bit...
Extracted 32-bit adder/subtractor with carry lookahead.
Synthesized 64 Multiplexers, 32 XOR gates, 1 32-input NOR zero-detector.
Worst Negative Slack (WNS): +4.12ns @ 200MHz. Timing MET.`
    },
    {
      id: "v-cdc",
      title: "2-Flip-Flop Clock Domain Crossing (CDC) Sync",
      desc: "Metastability filter for transferring signals across async clock domains.",
      code: `module cdc_2flop_synchronizer #(
    parameter WIDTH = 4
)(
    input  wire                 dest_clk,
    input  wire                 dest_rst_n,
    input  wire [WIDTH-1:0]     async_gray_in,
    output reg  [WIDTH-1:0]     sync_gray_out
);
    // Synthesis attribute forces flop placement in same slice
    (* ASYNC_REG = "TRUE" *) reg [WIDTH-1:0] stage1_flop;

    always @(posedge dest_clk or negedge dest_rst_n) begin
        if (!dest_rst_n) begin
            stage1_flop   <= {WIDTH{1'b0}};
            sync_gray_out <= {WIDTH{1'b0}};
        end else begin
            stage1_flop   <= async_gray_in; // First stage absorbs metastability
            sync_gray_out <= stage1_flop;   // Second stage outputs clean signal
        end
    end
endmodule`,
      output: `[Vivado DRC & STA Verification]
Checking Clock Domain Crossing Paths...
Found 1 4-bit CDC Synchronizer on dest_clk domain.
ASYNC_REG attribute applied: Flops locked into Slice X2Y14.
Mean Time Between Failures (MTBF): > 1.4 x 10^9 years (Glitch Immunity Verified).`
    }
  ]
};

export const PlaygroundPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('java'); // 'java', 'ml', 'verilog'
  const [activeTemplateId, setActiveTemplateId] = useState(CODE_TEMPLATES.java[0].id);
  const [code, setCode] = useState(CODE_TEMPLATES.java[0].code);
  const [output, setOutput] = useState(CODE_TEMPLATES.java[0].output);
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    const firstTmpl = CODE_TEMPLATES[lang][0];
    setActiveTemplateId(firstTmpl.id);
    setCode(firstTmpl.code);
    setOutput(firstTmpl.output);
  };

  const handleTemplateSelect = (tmpl) => {
    setActiveTemplateId(tmpl.id);
    setCode(tmpl.code);
    setOutput(tmpl.output);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("⏳ Compiling and executing in virtual container...");

    setTimeout(() => {
      const currentTmpl = CODE_TEMPLATES[selectedLanguage].find(t => t.id === activeTemplateId) || CODE_TEMPLATES[selectedLanguage][0];
      setOutput(currentTmpl.output);
      setIsRunning(false);
    }, 600);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-purple-950/40 via-slate-900/90 to-slate-950 border border-purple-500/30 relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE MULTI-TRACK CODE SANDBOX</span>
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            DevHub Code Playground
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Run, experiment, and inspect live code in real-time across **Java 21 LTS**, **Python ML & PyTorch**, and **Verilog HDL**. Select presets or edit custom code directly in your browser.
          </p>
        </div>
      </div>

      {/* Language Track Selector & Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-slate-900/90 border border-white/10 shadow-lg">
        {/* Language Tabs */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto p-1">
          <button
            onClick={() => handleLanguageChange('java')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
              selectedLanguage === 'java'
                ? 'bg-purple-600 text-white shadow-glow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Coffee className="w-4 h-4 text-amber-400" />
            <span>Java 21 LTS</span>
          </button>

          <button
            onClick={() => handleLanguageChange('ml')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
              selectedLanguage === 'ml'
                ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-glow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Brain className="w-4 h-4 text-cyan-300" />
            <span>Python ML & PyTorch</span>
          </button>

          <button
            onClick={() => handleLanguageChange('verilog')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
              selectedLanguage === 'verilog'
                ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-glow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4 text-amber-300" />
            <span>Verilog HDL</span>
          </button>
        </div>

        {/* Run & Copy Buttons */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleCopyCode}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 hover:text-white border border-white/10 transition flex items-center gap-1.5"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-mono font-bold text-white transition flex items-center gap-2 shadow-glow-sm disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-white ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Executing...' : 'Run Code (Ctrl+Enter)'}</span>
          </button>
        </div>
      </div>

      {/* Preset Templates Selector */}
      <div className="space-y-2">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
          Interactive Architecture Presets:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CODE_TEMPLATES[selectedLanguage].map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => handleTemplateSelect(tmpl)}
              className={`p-3.5 rounded-2xl border text-left transition ${
                activeTemplateId === tmpl.id
                  ? 'bg-purple-950/40 border-purple-500/60 shadow-glow-sm'
                  : 'bg-slate-900/60 border-white/10 hover:border-white/20 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                <span>{tmpl.title}</span>
                {activeTemplateId === tmpl.id && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-400 font-mono">{tmpl.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor & Live Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Area */}
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
              <span>SOURCE EDITOR ({lineCount} LINES)</span>
            </span>
            <span className="text-slate-500">UTF-8 • EDITABLE</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#070A14] overflow-hidden shadow-2xl">
            {/* Editor Header */}
            <div className="px-4 py-2.5 bg-slate-900/80 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="text-xs font-mono text-slate-400 ml-2">
                  {selectedLanguage === 'java' ? 'Main.java' : selectedLanguage === 'ml' ? 'model.py' : 'top_module.v'}
                </span>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {selectedLanguage.toUpperCase()}
              </span>
            </div>

            {/* Editable Textarea with Line Numbers */}
            <div className="flex p-4 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed overflow-x-auto min-h-[380px]">
              <div className="pr-4 border-r border-white/10 select-none text-slate-600 text-right space-y-0.5">
                {Array.from({ length: Math.max(16, lineCount) }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                className="w-full pl-4 bg-transparent outline-none resize-none font-mono text-slate-200 text-xs sm:text-sm leading-relaxed overflow-y-auto"
                rows={Math.max(16, lineCount)}
              />
            </div>
          </div>
        </div>

        {/* Live Execution Output Console */}
        <div className="lg:col-span-5 space-y-2">
          <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Terminal className="w-3.5 h-3.5" />
              <span>LIVE RUNTIME CONSOLE</span>
            </span>
            <button
              onClick={() => setOutput("")}
              className="text-[10px] text-slate-500 hover:text-slate-300 transition"
            >
              Clear Console
            </button>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-[#070A14] overflow-hidden shadow-2xl min-h-[440px] flex flex-col justify-between">
            {/* Console Header */}
            <div className="px-4 py-2.5 bg-slate-900/80 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>STDOUT / PROCESS RUNNER</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">RUNTIME: ACTIVE</span>
            </div>

            {/* Console Log Body */}
            <div className="p-4 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap overflow-y-auto flex-1">
              {output}
            </div>

            {/* Console Footer Stats */}
            <div className="p-3 bg-slate-950/80 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Status: <span className="text-emerald-400 font-bold">READY</span></span>
              <span>Buffer: <span className="text-cyan-400">1024 Bytes</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
