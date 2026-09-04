export const VERILOG_COURSE_CATEGORIES = [
  { id: "all-verilog", name: "All Verilog & VLSI Modules" },
  { id: "verilog-basics", name: "Verilog HDL & Combinational" },
  { id: "sequential-fsm", name: "Sequential Circuits & FSMs" },
  { id: "memory-cdc", name: "RAM, FIFOs & Clock Domains" },
  { id: "verification-fpga", name: "Testbenches & FPGA Synthesis" },
];

export const VERILOG_MODULES = [
  // V-1: Verilog HDL Basics
  {
    id: "mod-v-1",
    track: "verilog",
    moduleNumber: 1,
    title: "Verilog HDL Foundations & Data Types",
    slug: "verilog-foundations",
    category: "Verilog HDL & Combinational",
    categoryId: "verilog-basics",
    description: "4-State logic (0, 1, x, z), wire vs reg, vector bit-slicing, integer literals, and module port declarations.",
    lessonsCount: 2,
    xpReward: 250,
    difficulty: "Beginner",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-v-1-1",
        title: "4-State Logic, Wire vs Reg & Module Syntax",
        description: "Understand digital signal representation, physical wires, and procedural variables.",
        duration: "15 min",
        quizId: "quiz-v-1-1",
        concept: `Verilog models physical digital hardware using 4-state logic values:
- **\`0\`**: Logic Low (Ground / 0V)
- **\`1\`**: Logic High ($V_{DD}$)
- **\`x\` / \`X\`**: Unknown / Uninitialized / Contention
- **\`z\` / \`Z\`**: High Impedance / Tri-state / Floating line

### Data Types:
1. **\`wire\`**: Represents a physical electrical connection. Driven continuously by \`assign\` or module outputs.
2. **\`reg\`**: Represents a variable in procedural blocks (\`always\`, \`initial\`). *Note: \`reg\` does NOT necessarily synthesize to a physical hardware flip-flop unless clocked.*`,
        keyPoints: [
          "Verilog vector bit-slicing: wire [7:0] data declares an 8-bit bus where data[7] is the MSB.",
          "Integer literal syntax: 8'hA5 declares an 8-bit hexadecimal number 10100101.",
          "High impedance 'z' is used to model tri-state shared communication buses (e.g. I2C SDA)."
        ],
        codeExample: {
          filename: "basic_gate_module.v",
          code: `module and_or_gate (
    input  wire a,
    input  wire b,
    output wire out_and,
    output wire out_or
);
    // Continuous hardware assignments
    assign out_and = a & b;
    assign out_or  = a | b;
endmodule`,
          output: `Synthesized: 1 AND gate (LUT2), 1 OR gate (LUT2). Propagation delay: 0.25ns.`
        },
        notes: ["SystemVerilog introduces 'logic' which replaces the confusion between wire and reg in most design contexts."],
        commonMistakes: [{ title: "Driving a wire inside an always @(*) block", desc: "Wires can only be driven by continuous 'assign' or sub-module outputs. Procedural blocks require 'reg' (or 'logic')." }],
        tryIt: { prompt: "Bit-slice extraction of high nibble from 8-bit bus:", code: `wire [7:0] bus;\nwire [3:0] high_nibble = bus[7:4];`, hint: "Extracts upper 4 bits [7, 6, 5, 4]." }
      }
    ]
  },

  // V-2: Combinational Logic
  {
    id: "mod-v-2",
    track: "verilog",
    moduleNumber: 2,
    title: "Combinational Logic & Continuous Assignment",
    slug: "combinational-continuous-assign",
    category: "Verilog HDL & Combinational",
    categoryId: "verilog-basics",
    description: "Continuous assign statements, reduction operators, ternary conditional multiplexers, and logic gates.",
    lessonsCount: 1,
    xpReward: 250,
    difficulty: "Beginner",
    estimatedMinutes: 25,
    lessons: [
      {
        id: "lesson-v-2-1",
        title: "Boolean Expressions, Reduction & Conditional Operators",
        description: "Design glitch-free zero-latency combinational paths with parallel hardware execution.",
        duration: "15 min",
        quizId: "quiz-v-2-1",
        concept: `Combinational logic outputs depend exclusively on the instantaneous state of current inputs:
- **Bitwise Operators**: \`&\` (AND), \`|\` (OR), \`^\` (XOR), \`~\` (NOT).
- **Reduction Operators**: \`&vec\` (ANDs all bits together into 1-bit result), \`^vec\` (computes parity bit).
- **Ternary Operator**: \`assign out = sel ? in1 : in0\` synthesizes directly to a 2-to-1 Multiplexer.`,
        keyPoints: [
          "Combinational circuits contain no memory elements (no flip-flops, no latches).",
          "Continuous assignments execute in parallel; statement order in source code does NOT affect hardware."
        ],
        codeExample: {
          filename: "mux_parity.v",
          code: `module mux_parity (
    input  wire [3:0] data_in,
    input  wire       sel,
    output wire [3:0] mux_out,
    output wire       parity_bit
);
    // 2-to-1 4-bit MUX
    assign mux_out = sel ? ~data_in : data_in;

    // XOR Reduction: Computes Odd Parity
    assign parity_bit = ^data_in;
endmodule`,
          output: `Synthesized: 4 2-to-1 MUXes, 1 3-stage XOR reduction tree.`
        },
        notes: ["Reduction XOR (^bus) is the canonical hardware method for generating parity check bits in serial protocols (UART)."],
        commonMistakes: [{ title: "Confusing bitwise & with logical &&", desc: "4'b1010 & 4'b1100 produces 4'b1000 (bitwise), while 4'b1010 && 4'b1100 produces 1'b1 (logical boolean)." }],
        tryIt: { prompt: "Synthesize 4-to-1 MUX using nested ternary:", code: `assign out = (sel == 2'b00) ? d0 : (sel == 2'b01) ? d1 : (sel == 2'b10) ? d2 : d3;`, hint: "Synthesizes to 4-to-1 multiplexer tree." }
      }
    ]
  },

  // V-3: Procedural Blocks
  {
    id: "mod-v-3",
    track: "verilog",
    moduleNumber: 3,
    title: "Procedural Blocks: always @(*) & always @(posedge clk)",
    slug: "procedural-always-blocks",
    category: "Verilog HDL & Combinational",
    categoryId: "verilog-basics",
    description: "Sensitivity lists, always @(*), always @(posedge clk), initial simulation blocks, and sensitivity errors.",
    lessonsCount: 1,
    xpReward: 250,
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-v-3-1",
        title: "Sensitivity Lists & Hardware Synthesis Rules",
        description: "Differentiate combinational procedural logic from clocked synchronous sequential blocks.",
        duration: "15 min",
        quizId: "quiz-v-3-1",
        concept: `Procedural blocks execute whenever signals in their sensitivity list transition:
1. **Combinational (\`always @(*)\`)**: Triggers when *any* read signal changes. Models pure gates/multiplexers.
2. **Clocked Sequential (\`always @(posedge clk or negedge rst_n)\`)**: Triggers only on specified clock/reset edges. Synthesizes to hardware D Flip-Flops.
3. **Simulation (\`initial\`)**: Runs once at time $t=0$. Used strictly in testbenches (non-synthesizable).`,
        keyPoints: [
          "Use always @(*) for combinational logic to automatically capture all input signals in the sensitivity list.",
          "Incomplete sensitivity lists in Verilog-1995 caused simulation-synthesis mismatches; always @(*) resolves this."
        ],
        codeExample: {
          filename: "procedural_blocks.v",
          code: `module demo_blocks (
    input  wire clk,
    input  wire rst_n,
    input  wire [1:0] a, b,
    output reg  [1:0] comb_out,
    output reg  [1:0] seq_out
);
    // 1. Combinational Always Block
    always @(*) begin
        comb_out = a + b;
    end

    // 2. Clocked Sequential Always Block
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n)
            seq_out <= 2'b00;
        else
            seq_out <= comb_out;
    end
endmodule`,
          output: `Synthesized: 1 2-bit Adder, 2 D Flip-Flops with asynchronous active-low reset.`
        },
        notes: ["Never assign the same 'reg' variable from multiple different always blocks; this creates multiple driver contention."],
        commonMistakes: [{ title: "Writing incomplete sensitivity list e.g. always @(a)", desc: "If 'b' changes, simulation won't update but physical hardware will, creating a fatal simulation-synthesis mismatch." }],
        tryIt: { prompt: "Combinational always with @(*):", code: `always @(*) begin\n    case (sel) 2'b00: y = a; default: y = 0; endcase\nend`, hint: "always @(*) includes all read variables automatically." }
      }
    ]
  },

  // V-4: Blocking vs Non-Blocking
  {
    id: "mod-v-4",
    track: "verilog",
    moduleNumber: 4,
    title: "Blocking (=) vs Non-Blocking (<=) Assignments",
    slug: "blocking-vs-nonblocking",
    category: "Sequential Circuits & FSMs",
    categoryId: "sequential-fsm",
    description: "Execution semantics, race conditions in simulation, Cummings' Golden Rules, and pipeline register modeling.",
    lessonsCount: 1,
    xpReward: 300,
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-v-4-1",
        title: "The Golden Rules of Verilog Hardware Assignments",
        description: "Prevent subtle delta-cycle race conditions and design glitch-free hardware pipelines.",
        duration: "15 min",
        quizId: "quiz-v-4-1",
        concept: `The distinction between assignment operators determines correct hardware behavior:
1. **Blocking (\`=\`)**: Evaluates and assigns immediately before continuing to the next line (serial execution).
   - **Use exclusively for**: Combinational \`always @(*)\` logic.
2. **Non-Blocking (\`<=\`)**: Evaluates all RHS expressions at the clock edge, then schedules all LHS assignments to update simultaneously at the end of the simulation time step (parallel execution).
   - **Use exclusively for**: Clocked sequential \`always @(posedge clk)\` flip-flop logic.`,
        keyPoints: [
          "Rule 1: When modeling sequential logic (flip-flops), use non-blocking assignments (<=).",
          "Rule 2: When modeling combinational logic (always @*), use blocking assignments (=).",
          "Rule 3: Never mix blocking and non-blocking assignments within the same always block."
        ],
        codeExample: {
          filename: "shift_register_pipeline.v",
          code: `module shift_reg (
    input  wire clk,
    input  wire d_in,
    output reg  q1, q2, q3
);
    // Correct: Non-blocking assignments execute in parallel
    always @(posedge clk) begin
        q1 <= d_in;
        q2 <= q1;   // Captures previous q1 value at clock edge
        q3 <= q2;   // Captures previous q2 value at clock edge
    end
endmodule`,
          output: `Synthesized: 3-stage Shift Register (3 cascaded D-Flip-Flops).`
        },
        notes: ["Using blocking '=' in clocked blocks turns a 3-stage shift register into a single wire, collapsing pipeline registers!"],
        commonMistakes: [{ title: "Using blocking (=) inside clocked sequential blocks", desc: "q1 = d; q2 = q1 makes q2 capture the new d value immediately, destroying intended pipeline delay stages." }],
        tryIt: { prompt: "Swap two registers in single clock cycle:", code: `always @(posedge clk) begin\n    r1 <= r2;\n    r2 <= r1;\nend`, hint: "Non-blocking <= evaluates both RHS simultaneously, executing a clean register swap." }
      }
    ]
  },

  // V-5: Multiplexers & ALUs
  {
    id: "mod-v-5",
    track: "verilog",
    moduleNumber: 5,
    title: "Multiplexers, Decoders & 32-Bit ALU Design",
    slug: "mux-decoder-alu",
    category: "Verilog HDL & Combinational",
    categoryId: "verilog-basics",
    description: "Case, casex, casez statements, priority encoders, full adders, carry lookahead, and 32-bit RISC-V ALUs.",
    lessonsCount: 1,
    xpReward: 300,
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-v-5-1",
        title: "Case Statements, Priority Encoders & Arithmetic Units",
        description: "Synthesize parallel decoders and zero-latch multi-function arithmetic logic units.",
        duration: "15 min",
        quizId: "quiz-v-5-1",
        concept: `ALUs execute core arithmetic and logic operations in processor datapaths:
- **\`case\` / \`default\`**: Always include a \`default:\` branch to specify all output signals and avoid generating unintended transparent latches.
- **\`casez\`**: Treats \`?\` characters as don't-care bits (useful for priority encoders).
- **ALU Operations**: ADD, SUB (using 2's complement $A + \\sim B + 1$), AND, OR, XOR, SLL, SRL, SLT (Set Less Than).`,
        keyPoints: [
          "Subtractions in hardware: A - B is implemented as A + (~B) + 1.",
          "Zero flag: assign zero_flag = (alu_result == 32'b0) used directly in branch conditions."
        ],
        codeExample: {
          filename: "alu_32bit.v",
          code: `module alu_32bit (
    input  wire [31:0] a, b,
    input  wire [2:0]  alu_ctrl, // 000:ADD, 001:SUB, 010:AND, 011:OR, 100:SLT
    output reg  [31:0] result,
    output wire        zero
);
    always @(*) begin
        case (alu_ctrl)
            3'b000:  result = a + b;
            3'b001:  result = a - b;
            3'b010:  result = a & b;
            3'b011:  result = a | b;
            3'b100:  result = ($signed(a) < $signed(b)) ? 32'd1 : 32'd0;
            default: result = 32'd0; // Prevents latch generation!
        endcase
    end
    assign zero = (result == 32'd0);
endmodule`,
          output: `Synthesized: 32-bit Adder/Subtractor, 32-bit comparator, zero detector flag.`
        },
        notes: ["$signed(a) instructs Verilog synthesis tools to perform sign-extended two's complement comparisons."],
        commonMistakes: [{ title: "Omitting default branch in combinational case statement", desc: "If any input condition is unspecified, the synthesizer must preserve previous value, creating an unintended transparent latch." }],
        tryIt: { prompt: "Priority encoder with casez:", code: `casez (req)\n    4'b1???: grant = 2'b11;\n    4'b01??: grant = 2'b10;\n    default: grant = 2'b00;\nendcase`, hint: "Evaluates requests from highest priority bit downward." }
      }
    ]
  },

  // V-6: Sequential Logic: Flip-Flops & Resets
  {
    id: "mod-v-6",
    track: "verilog",
    moduleNumber: 6,
    title: "Sequential Logic: D Flip-Flops & Reset Strategies",
    slug: "flipflops-resets",
    category: "Sequential Circuits & FSMs",
    categoryId: "sequential-fsm",
    description: "D Flip-Flop, T Flip-Flop, Synchronous vs Asynchronous resets, clock gating, and metastability prevention.",
    lessonsCount: 1,
    xpReward: 250,
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-v-6-1",
        title: "D Flip-Flops, Clock Enable & Reset Architectures",
        description: "Compare Synchronous (safer timing) vs Asynchronous (immediate reset without clock) strategies.",
        duration: "15 min",
        quizId: "quiz-v-6-1",
        concept: `Flip-flops store 1 bit of digital state on clock transitions:
1. **Asynchronous Reset**: Sensitivity list includes \`@(posedge clk or negedge rst_n)\`. Reset takes effect immediately, even if the clock is stopped.
2. **Synchronous Reset**: Sensitivity list includes \`@(posedge clk)\` only. Reset only takes effect at the active clock edge.
3. **Clock Enable (\`en\`)**: Gates register updates without creating clock skew.`,
        keyPoints: [
          "Asynchronous reset deassertion must be synchronized to the clock domain to prevent recovery/removal timing violations.",
          "Clock enable should be implemented via multiplexed D input rather than gating the clock wire directly."
        ],
        codeExample: {
          filename: "dff_enable_reset.v",
          code: `module dff_en_async_rst (
    input  wire clk,
    input  wire rst_n, // Active-low asynchronous reset
    input  wire en,    // Clock enable
    input  wire d,
    output reg  q
);
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n)
            q <= 1'b0;      // Asynchronous clear
        else if (en)
            q <= d;         // Enabled capture
        // else q holds previous state automatically
    end
endmodule`,
          output: `Synthesized: 1 DFF with active-low async preset/clear and CE pin.`
        },
        notes: ["Gating clocks with AND gates (clk_gated = clk & en) creates severe clock glitches and timing skew; use standard Clock Gating Cells (ICG)."],
        commonMistakes: [{ title: "Placing synchronous reset in sensitivity list", desc: "always @(posedge clk or posedge rst) synthesizes an asynchronous reset, not a synchronous one." }],
        tryIt: { prompt: "T Flip-Flop (Toggle) with synchronous reset:", code: `always @(posedge clk) begin\n    if (rst) q <= 0;\n    else if (t) q <= ~q;\nend`, hint: "Toggles output on active clock edge when T=1." }
      }
    ]
  },

  // V-7: Counters & Shift Registers
  {
    id: "mod-v-7",
    track: "verilog",
    moduleNumber: 7,
    title: "Counters, Shift Registers & LFSR Generators",
    slug: "counters-shift-registers",
    category: "Sequential Circuits & FSMs",
    categoryId: "sequential-fsm",
    description: "Modulo-N counters, Gray code counters, Ring counters, Linear Feedback Shift Registers (LFSR), and PWM generators.",
    lessonsCount: 1,
    xpReward: 300,
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-v-7-1",
        title: "Modulo-N Counters, Gray Codes & LFSR Sequences",
        description: "Build frequency dividers, pseudo-random noise generators, and glitch-free Gray encoders.",
        duration: "15 min",
        quizId: "quiz-v-7-1",
        concept: `Counters and shift registers form the backbone of timing and sequencing:
- **Modulo-N Counter**: Counts from $0$ to $N-1$ and wraps around, generating periodic tick pulses.
- **Gray Code Counter**: Only $1$ bit changes per transition (e.g. 00 -> 01 -> 11 -> 10), preventing multi-bit transition glitch hazards.
- **LFSR (Linear Feedback Shift Register)**: Generates maximum-length pseudo-random binary sequences ($2^N - 1$) using XOR feedback taps.`,
        keyPoints: [
          "Binary to Gray conversion formula: gray = (binary >> 1) ^ binary.",
          "An N-bit counter divides input clock frequency by 2^N."
        ],
        codeExample: {
          filename: "lfsr_8bit.v",
          code: `module lfsr_8bit (
    input  wire clk,
    input  wire rst_n,
    output reg  [7:0] lfsr_out
);
    // Polynomial: x^8 + x^6 + x^5 + x^4 + 1
    wire feedback = lfsr_out[7] ^ lfsr_out[5] ^ lfsr_out[4] ^ lfsr_out[3];

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n)
            lfsr_out <= 8'hA5; // Non-zero seed
        else
            lfsr_out <= {lfsr_out[6:0], feedback};
    end
endmodule`,
          output: `Synthesized: 8-bit shift register with 4-input XOR feedback network.`
        },
        notes: ["LFSR state must never initialize to all zeros in XOR feedback configurations, as it will get permanently locked in zero."],
        commonMistakes: [{ title: "Using binary counter for asynchronous clock domain crossing", desc: "Binary counters transition multiple bits simultaneously (0111 -> 1000 has 4 bit changes), causing severe bus skew in CDC. Use Gray code!" }],
        tryIt: { prompt: "Binary to Gray code conversion:", code: `assign gray = (bin >> 1) ^ bin;`, hint: "Converts N-bit binary value to 1-bit transition Gray code." }
      }
    ]
  },

  // V-8: Finite State Machines
  {
    id: "mod-v-8",
    track: "verilog",
    moduleNumber: 8,
    title: "Finite State Machines (FSM): Mealy & Moore",
    slug: "fsm-mealy-moore",
    category: "Sequential Circuits & FSMs",
    categoryId: "sequential-fsm",
    description: "Moore vs Mealy machines, state encoding (One-Hot, Binary, Gray), 3-always-block design pattern, and sequence detectors.",
    lessonsCount: 2,
    xpReward: 350,
    difficulty: "Advanced",
    estimatedMinutes: 40,
    lessons: [
      {
        id: "lesson-v-8-1",
        title: "3-Always-Block FSM Architecture & State Encoding",
        description: "Design robust industry-standard FSM controllers without output glitches.",
        duration: "20 min",
        quizId: "quiz-v-8-1",
        concept: `Finite State Machines (FSMs) coordinate digital control flows:
1. **Moore FSM**: Outputs depend *strictly* on current state ($Output = f(State)$). Glitch-free and predictable.
2. **Mealy FSM**: Outputs depend on *both* current state and instantaneous inputs ($Output = f(State, Inputs)$). Reacts 1 cycle faster but can propagate input glitches.

### The 3-Always-Block Design Pattern:
- **Block 1 (Sequential)**: State register transition (\`state <= next_state\`).
- **Block 2 (Combinational)**: Next-state logic (\`case(state)\`).
- **Block 3 (Sequential/Registered Output)**: Output logic for clean registered signals.`,
        keyPoints: [
          "One-Hot Encoding uses 1 flip-flop per state (ideal for high-speed FPGAs with abundant registers).",
          "Binary Encoding uses log2(N) flip-flops (ideal for ASICs minimizing silicon area)."
        ],
        codeExample: {
          filename: "fsm_pattern_detector.v",
          code: `module fsm_seq_detector (
    input  wire clk, rst_n, in_bit,
    output reg  detected
);
    localparam [1:0] S_IDLE = 2'b00, S_1 = 2'b01, S_10 = 2'b10, S_101 = 2'b11;
    reg [1:0] state, next_state;

    // Block 1: State Register
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) state <= S_IDLE;
        else state <= next_state;
    end

    // Block 2: Next-State Logic
    always @(*) begin
        case (state)
            S_IDLE: next_state = in_bit ? S_1 : S_IDLE;
            S_1:    next_state = in_bit ? S_1 : S_10;
            S_10:   next_state = in_bit ? S_101 : S_IDLE;
            S_101:  next_state = in_bit ? S_1 : S_10;
            default: next_state = S_IDLE;
        endcase
    end

    // Block 3: Registered Output (Moore)
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) detected <= 1'b0;
        else detected <= (next_state == S_101);
    end
endmodule`,
          output: `Synthesized: 2-bit state register, combinational next-state decoder, 1-bit output DFF.`
        },
        notes: ["Always declare state parameters with 'localparam' to prevent accidental external overriding."],
        commonMistakes: [{ title: "Generating combinational unclocked outputs in Mealy FSM", desc: "Raw combinational Mealy outputs create race conditions and clock glitches downstream. Always register FSM outputs." }],
        tryIt: { prompt: "One-Hot State Declaration for 4 states:", code: `localparam S0 = 4'b0001, S1 = 4'b0010, S2 = 4'b0100, S3 = 4'b1000;`, hint: "Allows simple single-bit state testing (if (state[2]))." }
      }
    ]
  },

  // V-9: Memory, ROM & SRAM
  {
    id: "mod-v-9",
    track: "verilog",
    moduleNumber: 9,
    title: "Memory Arrays, Single/Dual-Port SRAM & ROM",
    slug: "sram-memory-arrays",
    category: "RAM, FIFOs & Clock Domains",
    categoryId: "memory-cdc",
    description: "Synchronous Block RAM (BRAM), Single-Port vs True Dual-Port SRAM, $readmemh initialization, and byte-enable write masks.",
    lessonsCount: 1,
    xpReward: 300,
    difficulty: "Advanced",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-v-9-1",
        title: "Block RAM Inference & Dual-Port Synchronous SRAM",
        description: "Infer high-density dedicated FPGA Block RAM (BRAM) rather than wasting distributed logic flip-flops.",
        duration: "15 min",
        quizId: "quiz-v-9-1",
        concept: `FPGAs and ASICs provide dedicated static memory blocks (SRAM / BRAM):
- **Single-Port RAM**: 1 address bus shared for reading and writing.
- **Simple Dual-Port RAM**: Port A writes data, Port B independently reads data simultaneously.
- **True Dual-Port RAM**: Both Port A and Port B can read/write to independent addresses concurrently.
- **Memory Initialization**: \`$readmemh("firmware.hex", ram_array)\` loads hex instructions during FPGA bitstream generation.`,
        keyPoints: [
          "Synchronous reads (registering the address or data output) are required for FPGA synthesis tools to infer Block RAM.",
          "Asynchronous unclocked memory reads force the synthesizer into distributed LUT-RAM, consuming thousands of logic slices."
        ],
        codeExample: {
          filename: "dual_port_bram.v",
          code: `module dual_port_ram #(
    parameter DATA_WIDTH = 32,
    parameter ADDR_WIDTH = 10 // 1024 words
)(
    input  wire clk,
    // Port A: Write
    input  wire we_a,
    input  wire [ADDR_WIDTH-1:0] addr_a,
    input  wire [DATA_WIDTH-1:0] din_a,
    // Port B: Read
    input  wire [ADDR_WIDTH-1:0] addr_b,
    output reg  [DATA_WIDTH-1:0] dout_b
);
    // 1024 x 32-bit Memory Array
    reg [DATA_WIDTH-1:0] ram [0:(1<<ADDR_WIDTH)-1];

    always @(posedge clk) begin
        if (we_a)
            ram[addr_a] <= din_a;
        dout_b <= ram[addr_b]; // Synchronous read infers BRAM
    end
endmodule`,
          output: `Synthesized: 1 Xilinx Block RAM (RAMB36E1), 0 Slice LUTs consumed.`
        },
        notes: ["Write-before-read vs Read-before-write behavior (Read-First, Write-First, No-Change) must be specified for concurrent address collisions."],
        commonMistakes: [{ title: "Using asynchronous unclocked read 'assign dout = mem[addr]'", desc: "Unclocked reads cannot be mapped to hardware Block RAMs and cause out-of-LUT compilation failures on large arrays." }],
        tryIt: { prompt: "Memory hex file initialization in Verilog:", code: `initial $readmemh("instructions.hex", memory_array);`, hint: "Loads 32-bit hex words into memory array during simulation/bitstream creation." }
      }
    ]
  },

  // V-10: Async FIFO & CDC
  {
    id: "mod-v-10",
    track: "verilog",
    moduleNumber: 10,
    title: "Asynchronous FIFO & Clock Domain Crossing (CDC)",
    slug: "async-fifo-cdc",
    category: "RAM, FIFOs & Clock Domains",
    categoryId: "memory-cdc",
    description: "Metastability, MTBF, 2-Flip-Flop Synchronizers, Gray Code pointer synchronization, and Full/Empty flag generation.",
    lessonsCount: 2,
    xpReward: 350,
    difficulty: "Advanced",
    estimatedMinutes: 45,
    lessons: [
      {
        id: "lesson-v-10-1",
        title: "Metastability & Dual-Clock Asynchronous FIFO Design",
        description: "Safely stream data between asynchronous clock domains without data corruption or pointer glitches.",
        duration: "20 min",
        quizId: "quiz-v-10-1",
        concept: `When signals cross asynchronous clock domains ($clk_A \\ne clk_B$), setup/hold violations occur, pushing flip-flops into **Metastability** (intermediate voltage oscillating between 0 and 1).

### The Dual-Clock Async FIFO Architecture (Cummings Algorithm):
1. **Write Domain ($clk_{wr}$)**: Handles data write and maintains binary write pointer $wptr$. Converts to Gray code $wptr_{gray}$.
2. **Read Domain ($clk_{rd}$)**: Handles data read and maintains binary read pointer $rptr$. Converts to Gray code $rptr_{gray}$.
3. **2-Flop Synchronizer**: Passes $wptr_{gray}$ through 2 flip-flops into $clk_{rd}$ domain, and $rptr_{gray}$ into $clk_{wr}$ domain.
4. **Flag Calculation**:
   - \`empty\`: $(rptr_{gray} == wptr_{gray\\_sync})$
   - \`full\`: $(wptr_{gray}[N:N-1] == \\sim rptr_{gray\\_sync}[N:N-1]) \\;\\&\\; (wptr_{gray}[N-2:0] == rptr_{gray\\_sync}[N-2:0])$`,
        keyPoints: [
          "Only single-bit or Gray code multi-bit vectors can be passed through synchronizers.",
          "Never synchronize raw binary multi-bit buses across clock domains; bus skew causes multi-bit glitch sampling."
        ],
        codeExample: {
          filename: "cdc_2flop_sync.v",
          code: `module cdc_2flop_sync #(parameter WIDTH = 4) (
    input  wire dest_clk,
    input  wire dest_rst_n,
    input  wire [WIDTH-1:0] async_gray_in,
    output reg  [WIDTH-1:0] sync_gray_out
);
    reg [WIDTH-1:0] stage1_reg;

    always @(posedge dest_clk or negedge dest_rst_n) begin
        if (!dest_rst_n) begin
            stage1_reg    <= {WIDTH{1'b0}};
            sync_gray_out <= {WIDTH{1'b0}};
        end else begin
            stage1_reg    <= async_gray_in; // May go metastable
            sync_gray_out <= stage1_reg;    // Settled stable value
        end
    end
endmodule`,
          output: `Synthesized: 2-stage MTBF synchronizer with ASYNC_REG timing constraint.`
        },
        notes: ["Add '(* ASYNC_REG = \"TRUE\" *)' synthesis attribute to place the two synchronizer flip-flops in the same FPGA slice to maximize MTBF."],
        commonMistakes: [{ title: "Synchronizing binary pointers across clock domains", desc: "Binary transitions like 0111 -> 1000 can sample intermediate states like 0000 or 1111 due to routing skews, corrupting FIFO flags." }],
        tryIt: { prompt: "Async FIFO Full Flag detection condition:", code: `assign wfull = (wgray == {~rgray_sync[ADDR_WIDTH:ADDR_WIDTH-1], rgray_sync[ADDR_WIDTH-2:0]});`, hint: "Top 2 bits inverted, remaining bits identical." }
      }
    ]
  },

  // V-11: Testbenches & Verification
  {
    id: "mod-v-11",
    track: "verilog",
    moduleNumber: 11,
    title: "Testbenches, Simulation & Self-Checking Verification",
    slug: "testbenches-verification",
    category: "Testbenches & FPGA Synthesis",
    categoryId: "verification-fpga",
    description: "$dumpfile, VCD waveforms, $display, clock generation, task/function modular testbenches, and automated assertions.",
    lessonsCount: 1,
    xpReward: 250,
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-v-11-1",
        title: "Testbench Architecture, Waveforms & Self-Checking Tasks",
        description: "Write automated regression suites with GTKWave waveform dumps and pass/fail assertions.",
        duration: "15 min",
        quizId: "quiz-v-11-1",
        concept: `A Testbench is a non-synthesizable Verilog wrapper that stimulates the Device Under Test (DUT):
- **Clock Generator**: \`always #5 clk = ~clk;\` creates a 100MHz clock ($T = 10ns$).
- **VCD Waveform Dump**: \`$dumpfile("sim.vcd"); $dumpvars(0, tb_module);\` enables visual inspection in GTKWave/Vivado.
- **Simulation Control**: \`#100 $finish;\` terminates simulation.
- **Self-Checking Assertions**: Compare DUT output with expected values automatically rather than manual waveform inspection.`,
        keyPoints: [
          "Testbench files have no port declarations (module tb_top; ... endmodule).",
          "Inputs to DUT must be declared as 'reg', while outputs from DUT are declared as 'wire'."
        ],
        codeExample: {
          filename: "tb_counter_self_check.v",
          code: `\`timescale 1ns / 1ps

module tb_counter;
    reg clk, rst_n, en;
    wire [3:0] count;

    // Instantiate Device Under Test (DUT)
    counter_4bit dut (.clk(clk), .rst_n(rst_n), .en(en), .count(count));

    // 100MHz Clock Generation (Period = 10ns)
    always #5 clk = ~clk;

    initial begin
        $dumpfile("counter_wave.vcd");
        $dumpvars(0, tb_counter);

        clk = 0; rst_n = 0; en = 0;
        #15 rst_n = 1; en = 1;

        #40; // Let counter tick 4 times
        if (count !== 4'd4) begin
            $display("[TEST FAILED] Expected 4, got %d", count);
            $stop;
        end else begin
            $display("[TEST PASSED] Counter verified successfully!");
        end

        #50 $finish;
    end
endmodule`,
          output: `VCD info: dumpfile counter_wave.vcd opened for output.\n[TEST PASSED] Counter verified successfully!`
        },
        notes: ["Use '!==' and '===' (case equality) in testbenches to detect unexpected 'x' and 'z' unknown states."],
        commonMistakes: [{ title: "Forgetting to initialize the clock variable (clk = 0)", desc: "If clk starts at 'x', always #5 clk = ~clk will invert 'x' to 'x', and the clock will never toggle!" }],
        tryIt: { prompt: "Declare timescale 1ns with 1ps precision:", code: `\`timescale 1ns / 1ps`, hint: "Defines unit of # delays (#5 = 5ns) and simulation resolution." }
      }
    ]
  },

  // V-12: FPGA & Timing Constraints
  {
    id: "mod-v-12",
    track: "verilog",
    moduleNumber: 12,
    title: "FPGA Architecture, SDC Constraints & Timing Closure",
    slug: "fpga-timing-closure",
    category: "Testbenches & FPGA Synthesis",
    categoryId: "verification-fpga",
    description: "LUTs, Slice architecture, DSP48 slices, SDC timing constraints (create_clock), Setup/Hold Slack, and Static Timing Analysis (STA).",
    lessonsCount: 1,
    xpReward: 300,
    difficulty: "Advanced",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-v-12-1",
        title: "LUT Mapping, SDC Timing Constraints & Static Timing Analysis",
        description: "Close setup/hold timing slacks and master FPGA hardware compilation flows.",
        duration: "15 min",
        quizId: "quiz-v-12-1",
        concept: `FPGAs implement logic using Look-Up Tables (LUTs) and routing matrices:
1. **LUT (Look-Up Table)**: A 6-input LUT (LUT6) can implement *any* 6-variable Boolean function as small SRAM truth tables.
2. **Setup Time ($T_{setup}$)**: Data must be stable *before* the clock edge. Violation causes Setup Slack $< 0$ (Fix: reduce combinational logic depth, pipeline).
3. **Hold Time ($T_{hold}$)**: Data must remain stable *after* the clock edge. Violation causes Hold Slack $< 0$ (Fix: tool inserts routing buffer delay).
4. **SDC Constraints**: \`create_clock -name sys_clk -period 10.0 [get_ports clk]\` guides place-and-route optimization.`,
        keyPoints: [
          "Max clock frequency formula: $F_{max} = \\frac{1}{T_{clk\\_to\\_q} + T_{logic} + T_{routing} + T_{setup} - T_{skew}}$.",
          "Adding pipeline registers breaks long combinational paths, increasing maximum operating frequency ($F_{max}$)."
        ],
        codeExample: {
          filename: "timing_constraints.xdc",
          code: `# Primary 100MHz System Clock Constraint (10.0ns Period)
create_clock -period 10.000 -name sys_clk [get_ports clk]

# Input / Output Port Delay Constraints
set_input_delay  -clock sys_clk -max 2.5 [get_ports data_in]
set_output_delay -clock sys_clk -max 2.0 [get_ports data_out]

# Pin Placement & I/O Standard
set_property PACKAGE_PIN W5 [get_ports clk]
set_property IOSTANDARD LVCMOS33 [get_ports clk]`,
          output: `Design Timing Summary: Worst Negative Slack (WNS) = +2.418ns (Timing MET). Fmax = 131.8 MHz.`
        },
        notes: ["Setup violations depend on clock period (can be fixed by slowing down clock); hold violations are independent of clock period!"],
        commonMistakes: [{ title: "Ignoring negative setup slack in synthesis report", desc: "Negative setup slack means data arrives too late at flip-flop inputs; hardware will output corrupted garbage at high clock speeds." }],
        tryIt: { prompt: "Create SDC clock constraint for 50MHz oscillator:", code: `create_clock -period 20.0 -name clk_50m [get_ports clk]`, hint: "50MHz = 20.0ns period." }
      }
    ]
  }
];
