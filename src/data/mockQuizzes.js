import { generateModuleQuestions, getQuestionsForModule } from './questionBankEngine';

// Master Quiz metadata for all 31 Java modules + 15 ML modules
const BASE_QUIZ_METADATA = [
  // --- JAVA FULL STACK TRACK ---
  { id: "quiz-1-1", lessonId: "lesson-1-1", moduleId: "mod-1", title: "Java 21 Records, Switch & Virtual Threads Quiz", desc: "Test your mastery over modern Java 21 LTS syntax, pattern matching, and sealed hierarchies." },
  { id: "quiz-2-1", lessonId: "lesson-2-1", moduleId: "mod-2", title: "Maven Lifecycles & Dependency Scopes Quiz", desc: "Demonstrate knowledge of POM.xml coordinates, plugins, and dependency scopes." },
  { id: "quiz-3-1", lessonId: "lesson-3-1", moduleId: "mod-3", title: "Gradle Kotlin DSL & Incremental Build Quiz", desc: "Test understanding of Gradle task DAGs, implementation vs api, and multi-project builds." },
  { id: "quiz-4-1", lessonId: "lesson-4-1", moduleId: "mod-4", title: "JUnit 5 & Mockito Unit Testing Quiz", desc: "Validate automated test assertions, mock stubs, and exception verification." },
  { id: "quiz-5-1", lessonId: "lesson-5-1", moduleId: "mod-5", title: "Git Branching, Rebasing & Conflict Resolution Quiz", desc: "Test rebase mechanics, git stash, interactive commits, and cherry-picking." },
  { id: "quiz-6-1", lessonId: "lesson-6-1", moduleId: "mod-6", title: "DSA in Java: Two Pointers, BST & Heaps Quiz", desc: "Solve algorithmic complexity questions, graph traversals, and priority queue operations." },
  { id: "quiz-7-1", lessonId: "lesson-7-1", moduleId: "mod-7", title: "JDBC, PreparedStatement & Connection Pooling Quiz", desc: "Verify SQL injection immunity, transaction commit/rollback, and HikariCP tuning." },
  { id: "quiz-8-1", lessonId: "lesson-8-1", moduleId: "mod-8", title: "Servlets, FilterChains & Session Management Quiz", desc: "Test low-level HTTP servlet handling, filter pipelines, and JSESSIONID cookies." },
  { id: "quiz-9-1", lessonId: "lesson-9-1", moduleId: "mod-9", title: "REST API Design & HTTP Status Codes Quiz", desc: "Demonstrate mastery over REST verbs, RFC 7807 problem details, and idempotent endpoints." },
  { id: "quiz-10-1", lessonId: "lesson-10-1", moduleId: "mod-10", title: "ORM Concepts & Object-Relational Mapping Quiz", desc: "Test understanding of Impedance Mismatch, JPA specifications, and entity lifecycles." },
  { id: "quiz-11-1", lessonId: "lesson-11-1", moduleId: "mod-11", title: "Hibernate Entity States & N+1 Query Resolution Quiz", desc: "Test Transient/Persistent/Detached states, First-Level Cache, and JOIN FETCH optimization." },
  { id: "quiz-12-1", lessonId: "lesson-12-1", moduleId: "mod-12", title: "Spring IoC Container & Bean Lifecycle Quiz", desc: "Validate constructor injection, Bean scopes, and ApplicationContext assembly." },
  { id: "quiz-13-1", lessonId: "lesson-13-1", moduleId: "mod-13", title: "Spring Boot REST Controller & Validation Quiz", desc: "Test @RestController, Jakarta @Valid annotations, and @RestControllerAdvice error handling." },
  { id: "quiz-14-1", lessonId: "lesson-14-1", moduleId: "mod-14", title: "Spring JDBC & Fluent JdbcClient Quiz", desc: "Test modern JdbcClient querying, parameter binding, and auto-mapping to Java records." },
  { id: "quiz-15-1", lessonId: "lesson-15-1", moduleId: "mod-15", title: "Spring Data JPA & Repository Methods Quiz", desc: "Verify derived query creation, JPQL @Query, Pagination, and Slice queries." },
  { id: "quiz-16-1", lessonId: "lesson-16-1", moduleId: "mod-16", title: "Spring Boot MVC & Thymeleaf Web App Quiz", desc: "Test Model-View-Controller request binding, form validation, and Post/Redirect/Get flow." },
  { id: "quiz-17-1", lessonId: "lesson-17-1", moduleId: "mod-17", title: "Spring Security 6 & FilterChain Architecture Quiz", desc: "Test SecurityFilterChain DSL, BCrypt password hashing, and role authorization." },
  { id: "quiz-18-1", lessonId: "lesson-18-1", moduleId: "mod-18", title: "JWT Authentication & Stateless Security Filter Quiz", desc: "Validate JWT header/payload/signature decoding, expiration, and OncePerRequestFilter." },
  { id: "quiz-19-1", lessonId: "lesson-19-1", moduleId: "mod-19", title: "OAuth 2.0 & OpenID Connect Authorization Quiz", desc: "Test Authorization Code Flow with PKCE, Social Login redirects, and token exchange." },
  { id: "quiz-20-1", lessonId: "lesson-20-1", moduleId: "mod-20", title: "Logging with Log4j2, Logback & SLF4J Quiz", desc: "Test parameterized logging, MDC distributed trace IDs, and log appender tuning." },
  { id: "quiz-21-1", lessonId: "lesson-21-1", moduleId: "mod-21", title: "Spring Boot MongoDB & Document Database Quiz", desc: "Verify @Document mapping, MongoRepository operations, and BSON queries." },
  { id: "quiz-22-1", lessonId: "lesson-22-1", moduleId: "mod-22", title: "Docker Containerization for Java Developers Quiz", desc: "Test multi-stage Docker builds, Alpine JRE optimization, and cgroup memory limits." },
  { id: "quiz-23-1", lessonId: "lesson-23-1", moduleId: "mod-23", title: "Cloud Deployment & Spring Boot Actuator Probes Quiz", desc: "Test /health/liveness & /health/readiness probes, RDS failover, and Canary deployments." },
  { id: "quiz-24-1", lessonId: "lesson-24-1", moduleId: "mod-24", title: "Spring AI, Vector Databases & RAG Pipelines Quiz", desc: "Validate ChatClient fluent API, vector store embeddings, and LLM function calling." },
  { id: "quiz-25-1", lessonId: "lesson-25-1", moduleId: "mod-25", title: "DeepSeek Open Source with Ollama & Spring AI Quiz", desc: "Test local Ollama integration, zero-cost private LLMs, and streaming responses." },
  { id: "quiz-26-1", lessonId: "lesson-26-1", moduleId: "mod-26", title: "Microservices, API Gateway & Circuit Breakers Quiz", desc: "Test Resilience4j state transitions (CLOSED, OPEN, HALF-OPEN), Eureka, and OpenFeign." },
  { id: "quiz-27-1", lessonId: "lesson-27-1", moduleId: "mod-27", title: "Spring Boot + Apache Kafka Event Streaming Quiz", desc: "Test partition key hashing, consumer group rebalancing, and Dead Letter Queues (DLQ)." },
  { id: "quiz-28-1", lessonId: "lesson-28-1", moduleId: "mod-28", title: "Linux Server Administration for Java Developers Quiz", desc: "Verify process monitoring (htop, ps), jcmd thread dumps, and systemd service management." },
  { id: "quiz-29-1", lessonId: "lesson-29-1", moduleId: "mod-29", title: "Ansible Configuration Management & Playbooks Quiz", desc: "Test idempotent YAML tasks, agentless SSH execution, and handler triggers." },
  { id: "quiz-30-1", lessonId: "lesson-30-1", moduleId: "mod-30", title: "Jenkins Declarative CI/CD Pipelines Quiz", desc: "Test Jenkinsfile stages, Docker build steps, test reporting, and webhook automation." },
  { id: "quiz-31-1", lessonId: "lesson-31-1", moduleId: "mod-31", title: "Terraform Infrastructure as Code (IaC) Quiz", desc: "Test HCL syntax, terraform plan/apply, remote tfstate locking, and cloud resource provisioning." },

  // --- MACHINE LEARNING & AI TRACK ---
  { id: "quiz-ml-1-1", lessonId: "lesson-ml-1-1", moduleId: "mod-ml-1", title: "Python for ML & NumPy Vectorization Quiz", desc: "Test ndarray broadcasting, vectorization speedups, and matrix dot products." },
  { id: "quiz-ml-2-1", lessonId: "lesson-ml-2-1", moduleId: "mod-ml-2", title: "Pandas DataFrames & Feature Engineering Quiz", desc: "Validate missing value imputation, one-hot encoding, and StandardScaler data leakage rules." },
  { id: "quiz-ml-3-1", lessonId: "lesson-ml-3-1", moduleId: "mod-ml-3", title: "Math for ML & Gradient Descent Optimization Quiz", desc: "Test cost functions, partial derivatives, learning rate divergence, and Adam momentum." },
  { id: "quiz-ml-4-1", lessonId: "lesson-ml-4-1", moduleId: "mod-ml-4", title: "Supervised Learning: Trees, Forests & XGBoost Quiz", desc: "Compare Bagging vs Boosting, Gini impurity splits, and gradient boosted residual trees." },
  { id: "quiz-ml-5-1", lessonId: "lesson-ml-5-1", moduleId: "mod-ml-5", title: "Model Evaluation & Hyperparameter Tuning Quiz", desc: "Test Precision, Recall, F1-Score, ROC-AUC, Stratified K-Fold, and Optuna tuning." },
  { id: "quiz-ml-6-1", lessonId: "lesson-ml-6-1", moduleId: "mod-ml-6", title: "Unsupervised Learning: K-Means & PCA Quiz", desc: "Validate K-Means inertia, Silhouette scores, and PCA variance preservation." },
  { id: "quiz-ml-7-1", lessonId: "lesson-ml-7-1", moduleId: "mod-ml-7", title: "Neural Networks & Deep Learning Foundations Quiz", desc: "Test Feedforward MLPs, non-linear activations (ReLU/GELU), and Backpropagation chain rules." },
  { id: "quiz-ml-8-1", lessonId: "lesson-ml-8-1", moduleId: "mod-ml-8", title: "PyTorch & Deep Learning Tensor Pipelines Quiz", desc: "Test Autograd derivatives, nn.Module forward passes, and optimizer.zero_grad steps." },
  { id: "quiz-ml-9-1", lessonId: "lesson-ml-9-1", moduleId: "mod-ml-9", title: "Computer Vision: CNNs & Transfer Learning Quiz", desc: "Validate 2D Conv kernels, Max Pooling, and ResNet skip connections." },
  { id: "quiz-ml-10-1", lessonId: "lesson-ml-10-1", moduleId: "mod-ml-10", title: "NLP: Tokenization, Word2Vec & LSTMs Quiz", desc: "Test Byte-Pair Encoding (BPE), semantic vector spaces, and Cosine similarity math." },
  { id: "quiz-ml-11-1", lessonId: "lesson-ml-11-1", moduleId: "mod-ml-11", title: "Transformers: Self-Attention & Multi-Head Math Quiz", desc: "Master QKV attention formulas, Causal attention masking, and FlashAttention." },
  { id: "quiz-ml-12-1", lessonId: "lesson-ml-12-1", moduleId: "mod-ml-12", title: "LLMs, Prompt Engineering & LangChain Quiz", desc: "Test Few-Shot prompting, Chain-of-Thought, and JSON tool calling schemas." },
  { id: "quiz-ml-13-1", lessonId: "lesson-ml-13-1", moduleId: "mod-ml-13", title: "Vector Databases & Production RAG Pipelines Quiz", desc: "Test chunking strategies, HNSW vector search, and Cross-Encoder re-ranking." },
  { id: "quiz-ml-14-1", lessonId: "lesson-ml-14-1", moduleId: "mod-ml-14", title: "Fine-Tuning LLMs: LoRA, QLoRA & SFT Quiz", desc: "Validate low-rank decomposition rank r, 4-bit NF4 quantization, and adapter merges." },
  { id: "quiz-ml-15-1", lessonId: "lesson-ml-15-1", moduleId: "mod-ml-15", title: "MLOps, ONNX Runtime & FastAPI Serving Quiz", desc: "Test ONNX runtime serialization, asynchronous FastAPI endpoints, and data drift detection." },

  // --- VERILOG HDL & DIGITAL VLSI TRACK ---
  { id: "quiz-v-1-1", lessonId: "lesson-v-1-1", moduleId: "mod-v-1", title: "Verilog HDL Foundations & Data Types Quiz", desc: "Test 4-state logic (0, 1, x, z), wire vs reg, vector bit-slicing, and module port contracts." },
  { id: "quiz-v-2-1", lessonId: "lesson-v-2-1", moduleId: "mod-v-2", title: "Combinational Logic & Continuous Assignment Quiz", desc: "Validate assign statements, reduction XOR parity, and ternary conditional multiplexers." },
  { id: "quiz-v-3-1", lessonId: "lesson-v-3-1", moduleId: "mod-v-3", title: "Procedural Blocks: always @(*) & @(posedge clk) Quiz", desc: "Test sensitivity lists, combinational always blocks, and clocked D Flip-Flop synthesis." },
  { id: "quiz-v-4-1", lessonId: "lesson-v-4-1", moduleId: "mod-v-4", title: "Blocking (=) vs Non-Blocking (<=) Assignments Quiz", desc: "Demonstrate mastery over Cummings' Golden Rules, race conditions, and pipeline registers." },
  { id: "quiz-v-5-1", lessonId: "lesson-v-5-1", moduleId: "mod-v-5", title: "Multiplexers, Decoders & 32-Bit ALU Design Quiz", desc: "Test case/default branches, priority encoders, 2's complement subtraction, and ALU zero flags." },
  { id: "quiz-v-6-1", lessonId: "lesson-v-6-1", moduleId: "mod-v-6", title: "Sequential Logic: D Flip-Flops & Reset Strategies Quiz", desc: "Compare synchronous vs active-low asynchronous resets, clock enables, and DFF storage." },
  { id: "quiz-v-7-1", lessonId: "lesson-v-7-1", moduleId: "mod-v-7", title: "Counters, Shift Registers & LFSR Generators Quiz", desc: "Test Modulo-N counters, Gray code transition math, and pseudo-random LFSR polynomial taps." },
  { id: "quiz-v-8-1", lessonId: "lesson-v-8-1", moduleId: "mod-v-8", title: "Finite State Machines (FSM): Mealy & Moore Quiz", desc: "Validate Moore vs Mealy glitch dynamics, 3-always-block design patterns, and One-Hot state encoding." },
  { id: "quiz-v-9-1", lessonId: "lesson-v-9-1", moduleId: "mod-v-9", title: "Memory Arrays, Single/Dual-Port SRAM & ROM Quiz", desc: "Test synchronous Block RAM (BRAM) inference, dual-port access, and $readmemh initialization." },
  { id: "quiz-v-10-1", lessonId: "lesson-v-10-1", moduleId: "mod-v-10", title: "Asynchronous FIFO & Clock Domain Crossing (CDC) Quiz", desc: "Master 2-Flop synchronizers, metastability MTBF calculations, and Gray code pointer FIFO flags." },
  { id: "quiz-v-11-1", lessonId: "lesson-v-11-1", moduleId: "mod-v-11", title: "Testbenches, Simulation & Verification Quiz", desc: "Test $dumpfile, VCD waveform debugging, 100MHz clock generators, and self-checking assertions." },
  { id: "quiz-v-12-1", lessonId: "lesson-v-12-1", moduleId: "mod-v-12", title: "FPGA Architecture, SDC Constraints & Timing Closure Quiz", desc: "Test 6-input LUTs, create_clock SDC constraints, Setup/Hold slack, and Static Timing Analysis." },
];

export const MOCK_QUIZZES = {};

BASE_QUIZ_METADATA.forEach((meta) => {
  const fullQuestions = generateModuleQuestions(meta.moduleId, 55);

  MOCK_QUIZZES[meta.id] = {
    id: meta.id,
    lessonId: meta.lessonId,
    moduleId: meta.moduleId,
    title: meta.title,
    description: meta.desc,
    timeLimitSeconds: 600, // 10 min for challenge
    xpReward: 150,
    passingScore: 70,
    totalQuestionsCount: fullQuestions.length,
    questions: fullQuestions,
    difficulties: {
      easy: fullQuestions.filter(q => q.difficulty === 'easy').length,
      medium: fullQuestions.filter(q => q.difficulty === 'medium').length,
      hard: fullQuestions.filter(q => q.difficulty === 'hard').length,
    }
  };
});

export const getQuizForLesson = (lessonId) => {
  const found = Object.values(MOCK_QUIZZES).find(q => q.lessonId === lessonId);
  return found || MOCK_QUIZZES["quiz-1-1"];
};
