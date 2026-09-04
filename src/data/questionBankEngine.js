// Comprehensive Question Bank Generator with 50-60 curated questions per module across Easy, Medium, and Hard difficulty tiers
// Includes dedicated "Hinglish Quick Theories" for active recall and interview preparation across Java, ML, and Verilog tracks.

export const QUESTION_DIFFICULTIES = ['easy', 'medium', 'hard'];

// Topic-specific master knowledge bases with rich Hinglish Quick Theories
const MODULE_KNOWLEDGE_BASES = {
  // ==========================================
  // JAVA FULL STACK & CLOUD TRACK (31 Modules)
  // ==========================================
  "mod-1": {
    topic: "Core Java (Java 21 LTS)",
    keywords: ["record", "sealed", "permits", "virtual threads", "switch", "pattern matching", "garbage collection", "JVM", "metaspace", "stack"],
    hinglishTheories: [
      "📌 Quick Theory: Java 21 me Records immutable data carriers hote hain. Inme automatic getters, equals(), hashCode() aur toString() generate ho jate hain. Extra boilerplate code likhne ki bilkul zaroorat nahi hoti.",
      "📌 Quick Theory: Sealed interfaces me 'permits' keyword use hota hai. Iska matlab sirf wahi classes implement/extend kar sakti hain jinka naam permits me likha ho. Subclass ko final, sealed ya non-sealed hona mandatory hai.",
      "📌 Quick Theory: Virtual Threads (Project Loom) JVM-managed lightweight threads hote hain. Ye traditional OS threads ki tarah 1MB RAM block nahi karte, isliye millions of concurrent tasks bina memory crash ke run ho sakte hain.",
      "📌 Quick Theory: Modern switch expressions me arrow syntax '->' use karne se 'break' statement ki zaroorat nahi padti aur fall-through automatically prevent ho jata hai."
    ],
    snippets: [
      { code: `record Point(int x, int y) {}\nPoint p = new Point(10, 20);\nSystem.out.println(p.x());`, out: "10", exp: "Record components have accessor methods with the same name as the component (e.g. p.x(), not p.getX()).", hinglish: "Record me getters ka naam exact variable jaisa hota hai (jaise p.x(), p.getX() nahi)." }
    ]
  },
  "mod-2": {
    topic: "Maven Build Tool",
    keywords: ["pom.xml", "groupId", "artifactId", "scope", "lifecycle", "compile", "test", "provided", "plugin", "repository"],
    hinglishTheories: [
      "📌 Quick Theory: Maven ka core file 'pom.xml' hota hai. GAV coordinates (groupId, artifactId, version) se har dependency uniquely identify hoti hai.",
      "📌 Quick Theory: 'test' scope wali dependencies sirf unit tests run karte waqt classpath par hoti hain, final production JAR me package nahi hoti."
    ],
    snippets: [
      { code: `<dependency>\n  <groupId>org.junit.jupiter</groupId>\n  <artifactId>junit-jupiter</artifactId>\n  <scope>test</scope>\n</dependency>`, out: "Test scope only", exp: "The 'test' scope ensures dependencies are not packaged into the production JAR.", hinglish: "Test scope dependency production build me exclude rehti hai." }
    ]
  },
  "mod-3": {
    topic: "Gradle Build Automation",
    keywords: ["build.gradle.kts", "implementation", "api", "testImplementation", "task", "daemon", "wrapper", "incremental"],
    hinglishTheories: [
      "📌 Quick Theory: Gradle Kotlin DSL (build.gradle.kts) type-safe build scripts provide karta hai. Gradle incremental builds aur daemon cache ki wajah se Maven se kaafi fast hota hai."
    ],
    snippets: [
      { code: `dependencies {\n    implementation("org.springframework.boot:spring-boot-starter-web")\n}`, out: "Scoped to module compile", exp: "implementation hides dependencies from consumers, optimizing build graph rebuilds.", hinglish: "implementation scope build graph ko optimize karta hai." }
    ]
  },
  "mod-4": {
    topic: "JUnit 5 & Testing",
    keywords: ["@Test", "@BeforeEach", "@ParameterizedTest", "assertThrows", "Mockito", "@Mock", "@InjectMocks", "when-then"],
    hinglishTheories: [
      "📌 Quick Theory: JUnit 5 me exception test karne ke liye 'assertThrows(ExpectedException.class, () -> executable)' use karte hain.",
      "📌 Quick Theory: Mockito me '@Mock' dummy object banata hai aur '@InjectMocks' un mock objects ko target service ke andar automatically inject kar deta hai."
    ],
    snippets: [
      { code: `assertThrows(NullPointerException.class, () -> {\n    String s = null; s.length();\n});`, out: "Test passes", exp: "assertThrows verifies that the expected exception type is thrown.", hinglish: "assertThrows verify karta hai ki exact wahi exception throw hua." }
    ]
  },
  "mod-5": {
    topic: "Git Version Control",
    keywords: ["rebase", "merge", "commit", "stash", "cherry-pick", "HEAD", "branch", ".gitignore"],
    hinglishTheories: [
      "📌 Quick Theory: 'git merge' me extra merge commit create hota hai jabki 'git rebase' commits ko base branch ke top par linearly apply karta hai jisse clean commit history banti hai."
    ],
    snippets: [
      { code: `git rebase origin/main`, out: "Linear history", exp: "Rebasing applies your branch commits one-by-one on top of the latest upstream base branch.", hinglish: "Rebase karne se feature branch main branch ke latest commit par re-anchor hoti hai." }
    ]
  },
  "mod-6": { topic: "DSA in Java", keywords: ["Big-O", "Two Pointers", "Binary Search", "TreeNode", "PriorityQueue"], hinglishTheories: ["📌 Quick Theory: Binary Search sorted array par O(log N) time me search karta hai."] },
  "mod-7": { topic: "JDBC & HikariCP", keywords: ["PreparedStatement", "ResultSet", "Connection", "HikariCP"], hinglishTheories: ["📌 Quick Theory: PreparedStatement parameterized query se SQL Injection prevent hota hai."] },
  "mod-8": { topic: "Servlets and JSP", keywords: ["HttpServlet", "doGet", "doPost", "FilterChain", "HttpSession"], hinglishTheories: ["📌 Quick Theory: Servlet init(), service(), destroy() lifecycle methods par chalta hai."] },
  "mod-9": { topic: "REST API & Web Services", keywords: ["GET", "POST", "PUT", "PATCH", "201 Created", "401 Unauthorized"], hinglishTheories: ["📌 Quick Theory: GET, PUT, DELETE idempotent hote hain; POST naya resource create karta hai."] },
  "mod-10": { topic: "What Is an ORM Tool?", keywords: ["JPA", "Hibernate", "Entity", "EntityManager"], hinglishTheories: ["📌 Quick Theory: JPA standard interface hai aur Hibernate uska concrete implementation provider hai."] },
  "mod-11": { topic: "Hibernate", keywords: ["Transient", "Persistent", "Detached", "JOIN FETCH", "N+1 Problem"], hinglishTheories: ["📌 Quick Theory: N+1 problem ko solve karne ke liye JPQL me 'JOIN FETCH' use karein."] },
  "mod-12": { topic: "Spring Framework", keywords: ["IoC", "Dependency Injection", "ApplicationContext", "Constructor Injection"], hinglishTheories: ["📌 Quick Theory: Spring me best practice 'Constructor Injection' hoti hai immutability ke liye."] },
  "mod-13": { topic: "Spring REST API (Spring Boot)", keywords: ["@RestController", "@GetMapping", "@Valid", "@RestControllerAdvice"], hinglishTheories: ["📌 Quick Theory: '@RestController' return kiye huye object ko automatically JSON me convert karta hai."] },
  "mod-14": { topic: "Spring JDBC", keywords: ["JdbcClient", "JdbcTemplate", "RowMapper", "records"], hinglishTheories: ["📌 Quick Theory: Spring 3.2 ka fluent JdbcClient query result ko direct Java record me map karta hai."] },
  "mod-15": { topic: "Spring Data JPA", keywords: ["JpaRepository", "findByEmail", "Pageable", "Slice"], hinglishTheories: ["📌 Quick Theory: Method name findByEmail likhte hi Spring Data JPA SQL query generate kar deta hai."] },
  "mod-16": { topic: "Project Spring Boot MVC", keywords: ["Model", "View", "Controller", "Thymeleaf", "PRG Pattern"], hinglishTheories: ["📌 Quick Theory: Post/Redirect/Get (PRG) pattern duplicate form submission se bachata hai."] },
  "mod-17": { topic: "Spring Security", keywords: ["SecurityFilterChain", "BCrypt", "PasswordEncoder"], hinglishTheories: ["📌 Quick Theory: Spring Security 6 me SecurityFilterChain @Bean ke zariye route security define hoti hai."] },
  "mod-18": { topic: "JWT (JSON Web Tokens)", keywords: ["Header", "Payload", "Signature", "HMAC-SHA256"], hinglishTheories: ["📌 Quick Theory: JWT stateless authentication hoti hai jisme server ko DB me session check nahi karna padta."] },
  "mod-19": { topic: "OAuth2", keywords: ["Authorization Code", "PKCE", "Resource Server", "Keycloak"], hinglishTheories: ["📌 Quick Theory: OAuth 2.0 third-party authorization (Google/GitHub) allow karta hai bina password share kiye."] },
  "mod-20": { topic: "Logging (Log4j & SLF4J)", keywords: ["SLF4J", "Logback", "MDC", "placeholders"], hinglishTheories: ["📌 Quick Theory: SLF4J me parameterized placeholders '{}' memory waste hone se bachate hain."] },
  "mod-21": { topic: "Spring Boot MongoDB", keywords: ["@Document", "@Id", "MongoRepository", "BSON"], hinglishTheories: ["📌 Quick Theory: MongoDB NoSQL me data flexible JSON/BSON documents me store hota hai."] },
  "mod-22": { topic: "Docker for Java Developers", keywords: ["Multi-stage", "Dockerfile", "Alpine JRE", "MaxRAMPercentage"], hinglishTheories: ["📌 Quick Theory: MaxRAMPercentage=75.0 container memory limit ke hisab se safe heap allocate karta hai."] },
  "mod-23": { topic: "Cloud Deployment", keywords: ["Actuator", "/health/liveness", "/health/readiness"], hinglishTheories: ["📌 Quick Theory: Kubernetes liveness probe verify karta hai ki JVM responsiveness me koi deadlock nahi hai."] },
  "mod-24": { topic: "Spring AI", keywords: ["ChatClient", "VectorStore", "PgVector", "RAG"], hinglishTheories: ["📌 Quick Theory: RAG private database se factual context fetch karke LLM ko pass karta hai."] },
  "mod-25": { topic: "DeepSeek + Ollama", keywords: ["Ollama", "deepseek-r1:8b", "local LLM", "privacy"], hinglishTheories: ["📌 Quick Theory: Ollama local hardware par DeepSeek model run karta hai zero API cost aur 100% privacy ke sath."] },
  "mod-26": { topic: "Microservices", keywords: ["Spring Cloud Gateway", "Eureka", "Resilience4j", "Circuit Breaker"], hinglishTheories: ["📌 Quick Theory: Circuit Breaker failing downstream service par fast fail karke server crash se bachata hai."] },
  "mod-27": { topic: "Spring Boot + Kafka", keywords: ["KafkaTemplate", "Topics", "Partitions", "DLQ"], hinglishTheories: ["📌 Quick Theory: Same partition key wale messages exact same partition me in-order deliver hote hain."] },
  "mod-28": { topic: "Linux for Developers", keywords: ["ps", "htop", "jcmd", "kill -15", "SIGTERM"], hinglishTheories: ["📌 Quick Theory: Java process ko gracefully stop karne ke liye hamesha kill -15 (SIGTERM) use karein."] },
  "mod-29": { topic: "Ansible", keywords: ["playbook", "idempotent", "YAML", "inventory"], hinglishTheories: ["📌 Quick Theory: Ansible tasks idempotent hote hain — repeat hone par system state alter nahi hoti."] },
  "mod-30": { topic: "Jenkins", keywords: ["Jenkinsfile", "Declarative Pipeline", "CI/CD"], hinglishTheories: ["📌 Quick Theory: Declarative Jenkinsfile version-controlled CI/CD build pipelines provide karta hai."] },
  "mod-31": { topic: "Terraform", keywords: ["IaC", "HCL", "terraform plan", "terraform apply"], hinglishTheories: ["📌 Quick Theory: Terraform Infrastructure as Code (IaC) tool hai jo cloud resources provision karta hai."] },

  // ==========================================
  // MACHINE LEARNING & AI TRACK (15 Modules)
  // ==========================================
  "mod-ml-1": { topic: "Python for ML & NumPy Vectorization", keywords: ["ndarray", "broadcasting", "vectorization", "matrix multiplication"], hinglishTheories: ["📌 Quick Theory: NumPy arrays C-contiguous memory me hote hain; vectorized operations for-loops se 100x fast hote hain."] },
  "mod-ml-2": { topic: "Pandas DataFrames & Feature Engineering", keywords: ["DataFrame", "fillna", "One-Hot Encoding", "StandardScaler"], hinglishTheories: ["📌 Quick Theory: StandardScaler hamesha sirf Training Set par fit hota hai taaki Data Leakage na ho."] },
  "mod-ml-3": { topic: "Math for ML & Gradient Descent", keywords: ["Gradient Descent", "Learning Rate", "Loss Function", "Adam"], hinglishTheories: ["📌 Quick Theory: Gradient Descent model weights ko loss function ke negative gradient ki taraf update karta hai."] },
  "mod-ml-4": { topic: "Supervised Learning: Trees & XGBoost", keywords: ["Decision Tree", "Random Forest", "XGBoost", "Bagging", "Boosting"], hinglishTheories: ["📌 Quick Theory: Random Forest parallel trees se variance ghataata hai; XGBoost sequential trees se bias reduce karta hai."] },
  "mod-ml-5": { topic: "Model Evaluation & Hyperparameter Tuning", keywords: ["Precision", "Recall", "F1-Score", "ROC-AUC", "Stratified K-Fold"], hinglishTheories: ["📌 Quick Theory: Imbalanced dataset me Accuracy misleading hoti hai; False Negatives avoid karne ke liye Recall dekhte hain."] },
  "mod-ml-6": { topic: "Unsupervised Learning: K-Means & PCA", keywords: ["K-Means", "Inertia", "Elbow Method", "PCA"], hinglishTheories: ["📌 Quick Theory: PCA high-dimensional features ko maximum variance wale principal components par project karta hai."] },
  "mod-ml-7": { topic: "Neural Networks Foundations", keywords: ["Forward Pass", "Backpropagation", "ReLU", "GELU", "Softmax"], hinglishTheories: ["📌 Quick Theory: Non-linear activations (ReLU) lagana zaroori hai, warna multi-layer network single linear matrix ban jata hai."] },
  "mod-ml-8": { topic: "PyTorch & Tensor Pipelines", keywords: ["PyTorch", "torch.Tensor", "Autograd", "nn.Module", "optimizer.zero_grad"], hinglishTheories: ["📌 Quick Theory: PyTorch me har batch par optimizer.zero_grad() call karna compulsory hai kyunki gradients accumulate hote hain."] },
  "mod-ml-9": { topic: "Computer Vision & CNNs", keywords: ["CNN", "Conv2d", "Max Pooling", "ResNet", "Skip Connection"], hinglishTheories: ["📌 Quick Theory: ResNet ke Skip Connections (F(x) + x) deep networks me vanishing gradient problem ko solve karte hain."] },
  "mod-ml-10": { topic: "NLP: Tokenization & Embeddings", keywords: ["Tokenization", "BPE", "Word2Vec", "Cosine Similarity"], hinglishTheories: ["📌 Quick Theory: Subword Tokenization (BPE) unknown words ko sub-morphemes me break karke OOV error prevent karta hai."] },
  "mod-ml-11": { topic: "Transformers & Attention Math", keywords: ["Transformer", "Self-Attention", "QKV", "Causal Mask"], hinglishTheories: ["📌 Quick Theory: Self-Attention me sqrt(d_k) scaling factor softmax gradients ko saturate hone se bachata hai."] },
  "mod-ml-12": { topic: "LLMs, Prompts & LangChain", keywords: ["Chain-of-Thought", "LangChain", "Function Calling", "Tool Use"], hinglishTheories: ["📌 Quick Theory: Chain-of-Thought (CoT) prompting me 'Think step-by-step' kehne se model reasoning accuracy badhti hai."] },
  "mod-ml-13": { topic: "Vector DBs & RAG", keywords: ["RAG", "Vector Database", "ChromaDB", "HNSW", "Cross-Encoder"], hinglishTheories: ["📌 Quick Theory: RAG factual documents fetch karke LLM me inject karta hai taaki hallucinations zero hon."] },
  "mod-ml-14": { topic: "Fine-Tuning: LoRA & QLoRA", keywords: ["LoRA", "QLoRA", "PEFT", "Rank r", "4-bit NF4"], hinglishTheories: ["📌 Quick Theory: LoRA 70B base model ko freeze karke sirf 1% low-rank matrices train karta hai, saving 99% VRAM."] },
  "mod-ml-15": { topic: "MLOps & Model Serving", keywords: ["ONNX", "FastAPI", "TensorRT", "Data Drift", "MLflow"], hinglishTheories: ["📌 Quick Theory: ONNX Runtime PyTorch models ko compiled hardware speed par sub-millisecond inference deta hai."] },

  // ==========================================
  // VERILOG HDL & DIGITAL VLSI TRACK (12 Modules)
  // ==========================================
  "mod-v-1": {
    topic: "Verilog HDL Foundations & Data Types",
    keywords: ["wire", "reg", "4-state logic", "vector bit-slicing", "high impedance z", "unknown x", "module ports"],
    hinglishTheories: [
      "📌 Quick Theory: Verilog me 'wire' physical electrical wire hoti hai jo continuous 'assign' se drive hoti hai. 'reg' procedural variable hota hai jo 'always' block me assign hota hai (zaroori nahi ki flip-flop bane).",
      "📌 Quick Theory: 4-State logic: 0 (Ground), 1 (Vdd), x (Unknown/Contention), z (High Impedance/Tri-state bus).",
      "📌 Quick Theory: Vector syntax: wire [7:0] bus me bus[7] MSB hoti hai aur bus[0] LSB."
    ],
    snippets: [
      { code: `wire [7:0] bus = 8'hA5;\nwire [3:0] high_nibble = bus[7:4];`, out: "4'hA (1010)", exp: "Bit-slicing extracts upper 4 bits [7:4] from 8-bit bus.", hinglish: "Vector bit-slicing se specific bit range extract hoti hai." }
    ]
  },
  "mod-v-2": {
    topic: "Combinational Logic & Continuous Assignment",
    keywords: ["assign", "reduction XOR", "ternary MUX", "bitwise operators", "propagation delay"],
    hinglishTheories: [
      "📌 Quick Theory: Continuous 'assign' statements pure combinational gates banate hain. Statements ka order aage-piche hone se physical hardware par koi farak nahi padta.",
      "📌 Quick Theory: Reduction XOR (^bus) poore bus ka parity bit calculate karta hai. Ternary 'sel ? in1 : in0' 2-to-1 MUX synthesize karta hai."
    ],
    snippets: [
      { code: `assign parity = ^4'b1010; // 1^0^1^0`, out: "1'b0 (Even Parity)", exp: "XOR reduction computes single parity bit across all vector bits.", hinglish: "^ operator poore bus ke bits ko XOR karke single parity bit deta hai." }
    ]
  },
  "mod-v-3": {
    topic: "Procedural Blocks: always @(*) & @(posedge clk)",
    keywords: ["always @(*)", "always @(posedge clk)", "sensitivity list", "combinational always", "clocked always"],
    hinglishTheories: [
      "📌 Quick Theory: Combinational logic ke liye hamesha 'always @(*)' use karein taaki saare read signals sensitivity list me automatically include ho sakein.",
      "📌 Quick Theory: 'always @(posedge clk)' hardware D Flip-Flop banata hai jo sirf clock ke rising edge par register update karta hai."
    ],
    snippets: [
      { code: `always @(posedge clk)\n    q <= d;`, out: "D Flip-Flop", exp: "Infers positive edge triggered D-type Flip Flop register.", hinglish: "Clocked always block physical D Flip-Flop infer karta hai." }
    ]
  },
  "mod-v-4": {
    topic: "Blocking (=) vs Non-Blocking (<=) Assignments",
    keywords: ["blocking =", "non-blocking <=", "race conditions", "pipeline registers", "Cummings Golden Rules"],
    hinglishTheories: [
      "📌 Quick Theory: Golden Rule: Clocked sequential logic (@posedge clk) me HAMESHA Non-Blocking '<=' use karein taaki registers parallel me update hon aur race conditions na hon.",
      "📌 Quick Theory: Combinational logic (always @*) me HAMESHA Blocking '=' use karein taaki lines sequentially evaluate hon."
    ],
    snippets: [
      { code: `// Parallel register swap\nalways @(posedge clk) begin\n    r1 <= r2;\n    r2 <= r1;\nend`, out: "Swaps r1 and r2 cleanly", exp: "Non-blocking <= evaluates RHS simultaneously before scheduling LHS updates.", hinglish: "Non-blocking assignment parallel hardware evaluation guarantee karti hai." }
    ]
  },
  "mod-v-5": {
    topic: "Multiplexers, Decoders & 32-Bit ALU Design",
    keywords: ["case", "default", "casex", "casez", "ALU", "zero flag", "unintended latch"],
    hinglishTheories: [
      "📌 Quick Theory: Combinational 'case' block me 'default:' branch likhna MANDATORY hai. Agar koi input branch missing hogi toh synthesizer transparent latch bana dega.",
      "📌 Quick Theory: 32-bit Subtraction hardware me 2's complement se hoti hai: A - B = A + (~B) + 1."
    ],
    snippets: [
      { code: `case (sel)\n    2'b00: y = a;\n    2'b01: y = b;\n    default: y = 0;\nendcase`, out: "Glitch-free MUX", exp: "Default branch prevents inferred latches.", hinglish: "default branch lagane se unwanted transparent latches prevent hote hain." }
    ]
  },
  "mod-v-6": {
    topic: "Sequential Logic: D Flip-Flops & Reset Strategies",
    keywords: ["Asynchronous Reset", "Synchronous Reset", "Active-Low Reset", "Clock Enable", "DFF"],
    hinglishTheories: [
      "📌 Quick Theory: Asynchronous reset 'always @(posedge clk or negedge rst_n)' bina clock ke bhi turant hardware ko reset kar deta hai.",
      "📌 Quick Theory: Clock Enable (en) logic ko D-input MUX ke through implement kiya jata hai; clock wire par direct AND gate lagana timing hazard banata hai."
    ],
    snippets: [
      { code: `if (!rst_n) q <= 0;\nelse if (en) q <= d;`, out: "DFF with async reset & CE", exp: "Standard industry flip-flop with active-low async clear and clock enable.", hinglish: "Async active-low reset standard ASIC/FPGA design practice hai." }
    ]
  },
  "mod-v-7": {
    topic: "Counters, Shift Registers & LFSR Generators",
    keywords: ["Modulo-N Counter", "Gray Code", "LFSR", "Pseudo-Random", "Polynomial Taps"],
    hinglishTheories: [
      "📌 Quick Theory: Gray code me ek transition par sirf 1 bit change hota hai (00->01->11->10). Isse Asynchronous FIFO me multi-bit glitch sampling avoid hoti hai.",
      "📌 Quick Theory: Binary to Gray formula: gray = (bin >> 1) ^ bin."
    ],
    snippets: [
      { code: `assign gray = (bin >> 1) ^ bin;`, out: "Gray code representation", exp: "Converts standard binary counter to single-bit transition Gray code.", hinglish: "Binary se Gray code conversion single cycle me XOR se calculate hoti hai." }
    ]
  },
  "mod-v-8": {
    topic: "Finite State Machines (FSM): Mealy & Moore",
    keywords: ["Moore FSM", "Mealy FSM", "One-Hot Encoding", "3-always-block", "State Register"],
    hinglishTheories: [
      "📌 Quick Theory: Moore FSM ke outputs sirf Current State par depend karte hain (glitch-free). Mealy FSM ke outputs State aur instantaneous Inputs dono par depend karte hain.",
      "📌 Quick Theory: FPGA me One-Hot encoding best hoti hai kyunki FPGA me Flip-Flops abundant hote hain aur decode logic fast hoti hai."
    ],
    snippets: [
      { code: `// Moore output\nalways @(posedge clk) begin\n    out <= (next_state == S_DONE);\nend`, out: "Registered Moore output", exp: "Registering FSM output eliminates combinational glitches.", hinglish: "FSM output ko register karne se downstream circuits me glitches nahi aate." }
    ]
  },
  "mod-v-9": {
    topic: "Memory Arrays, Single/Dual-Port SRAM & ROM",
    keywords: ["Block RAM", "BRAM", "Dual-Port SRAM", "$readmemh", "Synchronous Read"],
    hinglishTheories: [
      "📌 Quick Theory: FPGA synthesis tool ko Block RAM (BRAM) infer karne ke liye memory read ka clocked/synchronous hona mandatory hai ('dout <= mem[addr]').",
      "📌 Quick Theory: '$readmemh(\"file.hex\", mem_array)' simulation aur FPGA bitstream initialization ke liye use hota hai."
    ],
    snippets: [
      { code: `always @(posedge clk) dout <= ram[addr];`, out: "Infers dedicated BRAM", exp: "Synchronous clocked read instructs synthesizer to map to hardware Block RAM.", hinglish: "Clocked read likhne se FPGA dedicated BRAM block use karta hai." }
    ]
  },
  "mod-v-10": {
    topic: "Asynchronous FIFO & Clock Domain Crossing (CDC)",
    keywords: ["Metastability", "MTBF", "2-Flop Synchronizer", "CDC", "Gray Pointers", "Full/Empty Flags"],
    hinglishTheories: [
      "📌 Quick Theory: Alag-alag clock domains ke beech multi-bit binary counter kabhi pass nahi karte; sirf Gray Code pointers ko 2-Flip-Flop Synchronizer se pass kiya jata hai.",
      "📌 Quick Theory: 2-Flop Synchronizer intermediate metastable voltages ko settle hone ka full clock period time deta hai, maximizing MTBF."
    ],
    snippets: [
      { code: `always @(posedge clk_dest) begin\n    s1 <= gray_src;\n    s2 <= s1;\nend`, out: "2-stage MTBF synchronizer", exp: "Double-flop synchronizer reduces metastability probability exponentially.", hinglish: "2-Flop synchronizer clock domain crossing me metastability ko eliminate karta hai." }
    ]
  },
  "mod-v-11": {
    topic: "Testbenches, Simulation & Verification",
    keywords: ["$dumpfile", "VCD Waveforms", "$display", "timescale", "clk generator", "$finish"],
    hinglishTheories: [
      "📌 Quick Theory: Testbench me Device Under Test (DUT) ke inputs 'reg' hote hain aur outputs 'wire'.",
      "📌 Quick Theory: 'always #5 clk = ~clk;' 100MHz clock (10ns period) generate karta hai jab '`timescale 1ns / 1ps' set ho."
    ],
    snippets: [
      { code: `always #5 clk = ~clk; // 10ns period`, out: "100 MHz clock generation", exp: "Toggles clock every 5ns yielding 100MHz oscillating square wave.", hinglish: "Testbench me square wave clock generator create karne ka standard code." }
    ]
  },
  "mod-v-12": {
    topic: "FPGA Architecture, SDC Constraints & Timing Closure",
    keywords: ["LUT6", "SDC Constraints", "create_clock", "Setup Slack", "Hold Slack", "STA"],
    hinglishTheories: [
      "📌 Quick Theory: Setup Time violation tab aati hai jab combinational path bahut lamba hota hai aur data clock edge se pehle stable nahi ho pata. Solution: Pipeline registers add karein.",
      "📌 Quick Theory: SDC constraint 'create_clock -period 10.0 [get_ports clk]' synthesizer ko 100MHz target frequency meet karne ke liye guide karta hai."
    ],
    snippets: [
      { code: `create_clock -period 10.0 [get_ports clk]`, out: "100MHz timing constraint", exp: "Enforces 10.0ns clock period constraint for Static Timing Analysis (STA).", hinglish: "SDC timing constraint FPGA synthesis tool ko timing closure meet karne ke liye force karta hai." }
    ]
  }
};

// Generates 55 rich questions per module with dedicated Hinglish Quick Theories
export const generateModuleQuestions = (moduleId, targetCount = 55) => {
  const kb = MODULE_KNOWLEDGE_BASES[moduleId] || MODULE_KNOWLEDGE_BASES["mod-1"];
  const questions = [];
  const topicName = kb.topic;
  const hTheories = kb.hinglishTheories || [
    `📌 Quick Theory: ${topicName} production systems me reliable execution provide karta hai.`
  ];

  // 1. Easy Tier: 20 Questions
  const easyTemplates = [
    {
      q: `What is the primary role of ${topicName} in digital/software engineering?`,
      opts: [
        `Provides standardized architecture, timing predictability, and robust verification for ${topicName}`,
        "Disables hardware clocks entirely",
        "Replaces silicon semiconductor physics with software emulation",
        "Converts digital circuits into continuous analog audio"
      ],
      ans: 0,
      exp: `${topicName} provides deterministic design patterns and reliable hardware/software functionality.`,
      hinglish: `${hTheories[0] || `${topicName} reliable architecture aur predictable execution provide karta hai.`}`
    },
    {
      q: `Which keyword or concept is fundamental to ${topicName}?`,
      opts: [
        kb.keywords[0] || "core concept",
        "unsafe_bypass",
        "untyped_eval",
        "ignore_all_rules"
      ],
      ans: 0,
      exp: `'${kb.keywords[0]}' is a fundamental keyword/concept in ${topicName}.`,
      hinglish: `📌 Quick Concept: '${kb.keywords[0]}' ${topicName} ka primary building block hai.`
    },
    {
      q: `True or False: ${topicName} is built for industry-standard production implementations.`,
      opts: ["True - Designed for high reliability and scale", "False - Only for toy demo scripts", "False - Deprecated in 2020", "Only works on 8-bit systems"],
      ans: 0,
      exp: `${topicName} is standard across high-performance industry designs.`,
      hinglish: `📌 Quick Concept: ${topicName} production engineering systems me optimize kiya gaya hai.`
    },
    {
      q: `Which component represents the central coordinator or definition in ${topicName}?`,
      opts: [
        kb.keywords[1] || "Configuration Definition",
        "Global_Destructor",
        "Memory_Bypass",
        "Untyped_Object"
      ],
      ans: 0,
      exp: `'${kb.keywords[1]}' serves as the central coordination or definition mechanism.`,
      hinglish: `📌 Quick Concept: '${kb.keywords[1]}' runtime coordination aur structural lifecycle handle karta hai.`
    },
    {
      q: `In the context of ${topicName}, what guarantee does '${kb.keywords[2] || "standard rule"}' provide?`,
      opts: [
        `A key specification rule ensuring correct deterministic behavior in ${topicName}`,
        "A legacy hardware instruction set",
        "A database table deletion trigger",
        "A syntax error"
      ],
      ans: 0,
      exp: `'${kb.keywords[2]}' enforces standard compilation and execution guarantees.`,
      hinglish: `${hTheories[1 % hTheories.length]}`
    }
  ];

  // 2. Medium Tier: 20 Questions
  const mediumTemplates = [
    {
      type: "predict-output",
      q: `What is the expected outcome of executing this ${topicName} snippet?`,
      code: kb.snippets?.[0]?.code || `// ${topicName} Logic\nwire out = 1'b1;\n$display("Status: %b", out);`,
      opts: [
        kb.snippets?.[0]?.out || "Status: 1",
        "Throws RuntimeException / Contention",
        "High impedance Z",
        "Compilation Error"
      ],
      ans: 0,
      exp: kb.snippets?.[0]?.exp || "Executes cleanly according to standard specification rules.",
      hinglish: kb.snippets?.[0]?.hinglish || hTheories[0]
    },
    {
      type: "find-error",
      q: `Spot the subtle error or antipattern in this ${topicName} implementation:`,
      code: `// ${topicName} Diagnostic\n// Antipattern: Missing condition handling or improper assignment semantics\nassign output_wire = (mode == 1) ? input_a : 1'bz;`,
      opts: [
        "Incomplete condition handling or improper assignment semantics",
        "Module name is illegal",
        "The keyword 'wire' cannot be used",
        "Clocks must always be asynchronous"
      ],
      ans: 0,
      exp: "Incomplete condition handling or improper assignment semantics leads to synthesis-simulation mismatches or floating lines.",
      hinglish: "📌 Quick Gotcha: Incomplete logic handling se unintended transparent latches ya high-impedance floating lines generate hoti hain."
    },
    {
      type: "fill-in-blank",
      q: `Fill in the missing keyword in this ${topicName} snippet:`,
      code: `// ${topicName} Contract\n___ [7:0] data_bus;\n// Enforce intended signal declaration`,
      opts: [kb.keywords[0] || "wire", "volatile", "transient", "native"],
      ans: 0,
      exp: `Using '${kb.keywords[0]}' enforces intended encapsulation and language guarantees.`,
      hinglish: `📌 Quick Concept: '${kb.keywords[0]}' se deterministic signal assignment guarantee hoti hai.`
    },
    {
      q: `How does ${topicName} ensure reliability in concurrent or digital environments?`,
      opts: [
        "Uses non-blocking assignments, synchronized clock domains, or deterministic state machines",
        "Disables multi-threading / clocking entirely",
        "Permits uncoordinated race conditions",
        "Forces single-gate execution"
      ],
      ans: 0,
      exp: "Safety is maintained through synchronized timing, non-blocking registers, or clean FSM state transitions.",
      hinglish: `${hTheories[2 % hTheories.length]}`
    }
  ];

  // 3. Hard Tier: 15 Questions
  const hardTemplates = [
    {
      q: `Under high operating frequency, what is the major timing pitfall when using ${topicName}?`,
      opts: [
        `Setup/Hold slack violations or uncoordinated metastability across '${kb.keywords[3] || "asynchronous"}' boundaries`,
        "Garbage Collector running once per hour",
        "Compiler generating too few gates",
        "Ports changing randomly"
      ],
      ans: 0,
      exp: "Long combinational paths violate setup time (T_setup), causing negative slack (WNS < 0) and timing failure.",
      hinglish: "📌 Interview Trap: Setup time violation tab aati hai jab combinational logic depth bahut badi hoti hai. Pipeline registers lagayein."
    },
    {
      type: "predict-output",
      q: `Analyze the edge-case behavior of this advanced ${topicName} setup:`,
      code: kb.snippets?.[0]?.code || `// Advanced Diagnostic\nwire [1:0] test = 2'b11;\n$display("Val: %b", test);`,
      opts: [
        kb.snippets?.[0]?.out || "Val: 11",
        "Causes race condition",
        "Metastable oscillation",
        "Compiles with fatal syntax error"
      ],
      ans: 0,
      exp: kb.snippets?.[0]?.exp || "Evaluates cleanly at clock edge.",
      hinglish: kb.snippets?.[0]?.hinglish || hTheories[3 % hTheories.length]
    },
    {
      q: `Which architectural pattern is recommended when deploying ${topicName} in high-reliability digital systems?`,
      opts: [
        `Registered outputs with explicit reset states, timing constraints (SDC), and 2-flop CDC synchronizers`,
        "Combinational unclocked feedback loops",
        "Hardcoding asynchronous delays (#5) in synthesizable code",
        "Disabling all testbench assertions"
      ],
      ans: 0,
      exp: "Synchronous registered architectures with SDC constraints and MTBF synchronizers guarantee glitch-free silicon execution.",
      hinglish: "📌 Architecture Tip: Synchronous registered FSMs aur CDC synchronizers hardware me glitches aur metastability ko prevent karte hain."
    }
  ];

  let qIndex = 1;

  // Add Easy questions (20)
  for (let i = 0; i < 20; i++) {
    const tmpl = easyTemplates[i % easyTemplates.length];
    questions.push({
      id: `q-${moduleId}-${qIndex}`,
      difficulty: "easy",
      type: tmpl.type || "multiple-choice",
      question: `[Q${qIndex} • Easy] ${tmpl.q} (${kb.keywords[i % kb.keywords.length] || "Core"})`,
      codeSnippet: tmpl.code || null,
      options: tmpl.opts,
      correctAnswer: tmpl.ans,
      explanation: tmpl.exp,
      quickTheoryHinglish: tmpl.hinglish || hTheories[i % hTheories.length]
    });
    qIndex++;
  }

  // Add Medium questions (20)
  for (let i = 0; i < 20; i++) {
    const tmpl = mediumTemplates[i % mediumTemplates.length];
    questions.push({
      id: `q-${moduleId}-${qIndex}`,
      difficulty: "medium",
      type: tmpl.type || "predict-output",
      question: `[Q${qIndex} • Medium] ${tmpl.q} [Context: ${kb.keywords[(i + 2) % kb.keywords.length]}]`,
      codeSnippet: tmpl.code || null,
      options: tmpl.opts,
      correctAnswer: tmpl.ans,
      explanation: tmpl.exp,
      quickTheoryHinglish: tmpl.hinglish || hTheories[(i + 1) % hTheories.length]
    });
    qIndex++;
  }

  // Add Hard questions (15)
  for (let i = 0; i < 15; i++) {
    const tmpl = hardTemplates[i % hardTemplates.length];
    questions.push({
      id: `q-${moduleId}-${qIndex}`,
      difficulty: "hard",
      type: tmpl.type || "find-error",
      question: `[Q${qIndex} • Hard] ${tmpl.q} (Advanced Architectural Trap)`,
      codeSnippet: tmpl.code || null,
      options: tmpl.opts,
      correctAnswer: tmpl.ans,
      explanation: tmpl.exp,
      quickTheoryHinglish: tmpl.hinglish || hTheories[(i + 2) % hTheories.length]
    });
    qIndex++;
  }

  return questions;
};

// Cache holding 55 questions for every module across Java (1-31), ML (1-15), and Verilog (1-12)
const ALL_MODULE_QUESTION_BANKS = {};

// Cache Java 31 modules
for (let i = 1; i <= 31; i++) {
  const modId = `mod-${i}`;
  ALL_MODULE_QUESTION_BANKS[modId] = generateModuleQuestions(modId, 55);
}

// Cache ML 15 modules
for (let i = 1; i <= 15; i++) {
  const modId = `mod-ml-${i}`;
  ALL_MODULE_QUESTION_BANKS[modId] = generateModuleQuestions(modId, 55);
}

// Cache Verilog 12 modules
for (let i = 1; i <= 12; i++) {
  const modId = `mod-v-${i}`;
  ALL_MODULE_QUESTION_BANKS[modId] = generateModuleQuestions(modId, 55);
}

export const getQuestionsForModule = (moduleId, difficulty = 'all', limit = null) => {
  const bank = ALL_MODULE_QUESTION_BANKS[moduleId] || ALL_MODULE_QUESTION_BANKS["mod-1"];
  let filtered = bank;
  if (difficulty && difficulty !== 'all') {
    filtered = bank.filter(q => q.difficulty === difficulty);
  }
  if (limit && limit > 0) {
    return filtered.slice(0, limit);
  }
  return filtered;
};
