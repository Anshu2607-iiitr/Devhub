import { EXACT_134_TOPICS } from "./topicsData";
import { TOPIC_1_QUIZ } from "./topic1Quiz";

// Short & Detailed notes for topics
export const TOPIC_NOTES_REGISTRY = {
  1: {
    shortNotes: {
      whatIsIt: "Machine Learning (ML) is a subset of Artificial Intelligence (AI) that provides systems the ability to automatically learn patterns from historical data and improve their performance on a specific task through experience, without being explicitly programmed with deterministic rule-based logic.",
      whyImportant: "Traditional software engineering requires humans to hand-craft every decision rule (e.g., if-else conditions). This paradigm collapses when dealing with complex, high-dimensional, unstructured, or constantly evolving problems like computer vision, natural language understanding, speech recognition, and fraud detection. Machine Learning enables software to generalize from empirical observations to unseen scenarios.",
      keyConcepts: [
        { name: "Data (Experience E)", desc: "Historical observations used to discover patterns." },
        { name: "Task (T)", desc: "The concrete objective the system performs (e.g., classification, regression, clustering, translation)." },
        { name: "Performance Metric (P)", desc: "The quantitative measure used to evaluate how successfully the system executes task T (e.g., Accuracy, MSE, F1-Score)." },
        { name: "Model / Hypothesis (h_θ)", desc: "The mathematical function parameterized by weights θ that maps inputs to target outputs." },
        { name: "Training / Optimization", desc: "The algorithmic process of tuning parameters θ to minimize error on data." },
        { name: "Inference / Prediction", desc: "Applying the learned function to new, unseen samples." },
        { name: "Generalization", desc: "The core ability of a model to perform accurately on novel data outside the training set." }
      ],
      howItWorks: [
        "Define Objective (T & P): Establish what needs predicting and how error will be measured.",
        "Collect & Ingest Data (E): Assemble representative feature vectors and labels.",
        "Data Preparation: Clean noise, handle missing fields, and scale features.",
        "Model Architecture Selection: Choose a hypothesis space (e.g., linear models, decision trees, neural nets).",
        "Training (Empirical Risk Minimization): Run an optimization algorithm (e.g., Gradient Descent) that iteratively compares predictions against ground truth and updates parameters.",
        "Validation & Evaluation: Assess generalization error on held-out test data.",
        "Deployment & Monitoring: Serve predictions via endpoints and track concept/data drift."
      ],
      formula: "Mitchell's Definition (1997):\nProgram learns from Experience E regarding Task T with Performance P if P at Task T improves with Experience E.\n\nOptimization formulation:\nθ* = argmin_θ (1/n) ∑ L(f(x^(i); θ), y^(i)) + λ Ω(θ)",
      simpleExample: "Spam Email Detection:\n• Traditional: Writing hardcoded regex if 'win money' in text: flag_spam(). Spammers bypass with 'w1n m0ney'.\n• Machine Learning: 50,000 labeled emails are fed to a classifier. The algorithm statistically weighs token combinations that correlate with spam.",
      realWorldExample: "Credit Card Fraud Detection:\nFinancial networks evaluate transactions in milliseconds. An ML model processes transaction amount, merchant category code, geographic distance from prior purchase, velocity, and device footprint to score fraud probability.",
      advantages: [
        "Scales effortlessly to high-dimensional datasets with thousands of intersecting features.",
        "Continuously adapts to shifting behavioral patterns through periodic retraining.",
        "Discovers latent non-linear relationships invisible to human inspection."
      ],
      limitations: [
        "Strictly bounded by training data quality ('Garbage in, garbage out').",
        "High-capacity non-linear models often operate as uninterpretable black boxes.",
        "Susceptible to performance degradation under covariate shift and concept drift.",
        "Significant compute requirements for training large-scale architectures."
      ],
      commonMistakes: [
        "Confusing memorization (overfitting) with true learning (generalization).",
        "Evaluating models on the exact data partition used during training.",
        "Applying ML to deterministic problems better solved by clean algebraic business rules.",
        "Permitting target or feature leakage during preprocessing transformations."
      ],
      quickRevision: [
        "ML: Algorithms that improve at Task T with Experience E measured by Performance P.",
        "Traditional: Rules + Data → Answers. Machine Learning: Data + Answers → Rules.",
        "Arthur Samuel coined the term in 1959.",
        "Generalization to unseen test distributions is the ultimate measure of success.",
        "No Free Lunch theorem: No single learning algorithm is universally superior across all possible distributions.",
        "Inductive bias: The foundational assumptions an algorithm makes to generalize beyond observed data points."
      ]
    },
    detailedNotes: {
      overview: "Machine learning provides a computational framework for inductive reasoning from empirical observations. Instead of human engineers manually designing expert heuristic systems, learning algorithms ingest structured or unstructured feature vectors X and search an admissible hypothesis space H to discover optimal mapping parameters θ* that minimize empirical loss while preserving generalization.",
      codeSnippet: `import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

# 1. Feature matrix (X) and ground-truth targets (y)
X = np.array([[22, 50000], [25, 60000], [47, 80000], [52, 110000], [21, 20000], [45, 95000]])
y = np.array([0, 0, 1, 1, 0, 1])  # 0: Low Risk, 1: High Risk

# 2. Prevent data leakage: split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)

# 3. Instantiate model with specific inductive bias (linear boundary)
model = LogisticRegression()

# 4. Train (Empirical Risk Minimization)
model.fit(X_train, y_train)

# 5. Inference on unseen observations
predictions = model.predict(X_test)
print(classification_report(y_test, predictions, zero_division=0))
print("Learned coefficients (weights):", model.coef_)
print("Learned intercept (bias):", model.intercept_)`,
      architectureDiagram: `[Raw Data Collection] 
       │
       ▼
[Data Preprocessing & Scaling]
       │
       ▼
[Train / Test Split] ── (Hold-out Test Set)
       │
       ▼
[Model Training (ERM + Regularization)]
       │
       ▼
[Validation & Hyperparameter Tuning]
       │
       ▼
[Final Evaluation on Unseen Test Data]
       │
       ▼
[Production Deployment & Concept Drift Monitoring]`
    }
  }
};

// Function to get or auto-generate fallback rich notes for any of the 134 topics
export function getTopicNotes(topicId) {
  if (TOPIC_NOTES_REGISTRY[topicId]) {
    return TOPIC_NOTES_REGISTRY[topicId];
  }
  const meta = EXACT_134_TOPICS.find(t => t.id === topicId) || EXACT_134_TOPICS[0];
  return {
    shortNotes: {
      whatIsIt: `${meta.title} represents a core pillar in the Machine Learning curriculum focusing on ${meta.category} within the '${meta.module}' module.`,
      whyImportant: `Mastering ${meta.title} is essential for understanding end-to-end data science pipelines, algorithmic trade-offs, and production engineering workflows.`,
      keyConcepts: [
        { name: "Core Objective", desc: `Fundamental mechanism and conceptual design of ${meta.title.split('|')[0].trim()}.` },
        { name: "Mathematical Foundation", desc: "Underlying probabilistic, algebraic, and optimization rules governing this technique." },
        { name: "Implementation Nuances", desc: "Parameters, hyperparameters, and best practices in Scikit-Learn/Python." },
        { name: "Diagnostic Insights", desc: "Identifying failure modes, bias-variance tradeoffs, and leakage." }
      ],
      howItWorks: [
        `Step 1: Frame the inputs and outputs associated with ${meta.category}.`,
        "Step 2: Preprocess feature dimensions and structure sample matrices.",
        "Step 3: Apply the algorithmic transformation or model fitting step.",
        "Step 4: Verify convergence and evaluate diagnostic metrics on hold-out sets."
      ],
      formula: `Formal Mathematical Objective for Topic #${meta.id}:\n\\min_{\\theta} \\mathcal{L}_{\\text{task}}(f(X; \\theta), Y) + \\lambda \\mathcal{R}(\\theta)\n\nEvaluated under standard validation distributions.`,
      simpleExample: `Practical Example for ${meta.title.split('|')[0].trim()}:\nApplying this method in standard tabular data workflows to improve stability, eliminate noise, and boost predictive metrics.`,
      realWorldExample: `Enterprise Production System:\nUtilized in mission-critical data pipelines (e.g. ad ranking, fraud detection, recommendation engines) where robust ${meta.category} guarantees model reliability.`,
      advantages: [
        "Provides strong theoretical guarantees and mathematical foundations.",
        "Directly applicable using industry-standard libraries like scikit-learn, numpy, and pandas.",
        "Improves generalization performance and reduces production risk."
      ],
      limitations: [
        "Requires careful validation against distribution shifts and data leakage.",
        "Hyperparameter sensitivity demands systematic search (e.g. cross-validation / Optuna).",
        "Computational complexity scales with sample volume and dimensionality."
      ],
      commonMistakes: [
        "Applying transformations before splitting train and test sets (causing data leakage).",
        "Ignoring underlying statistical assumptions (e.g. normality, linearity, or i.i.d.).",
        "Overfitting hyperparameter configurations to the validation split."
      ],
      quickRevision: [
        `Topic #${meta.id}: ${meta.title.split('|')[0].trim()}.`,
        `Belongs to module: ${meta.module} (${meta.category}).`,
        "Always isolate test folds prior to feature engineering or fitting.",
        "Monitor loss curves and validation metrics to balance the bias-variance tradeoff.",
        "Verify theoretical assumptions before deploying to high-throughput inference endpoints."
      ]
    },
    detailedNotes: {
      overview: `Comprehensive deep dive into ${meta.title}. This section covers the theoretical derivations, architectural principles, computational complexity, and production deployment patterns.`,
      codeSnippet: `# Scikit-Learn Reference Implementation for Topic #${meta.id}
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin

print("Demonstrating key workflow for: ${meta.title.split('|')[0].trim()}")
# Synthetic data simulation
X = np.random.randn(100, 5)
print("Input shape:", X.shape)
print("Status: Ready for feature transformations and model pipeline integration.")`,
      architectureDiagram: `[Data Ingestion] ──> [${meta.category} Pipeline] ──> [Model Training] ──> [Metric Validation]`
    }
  };
}

// Function to get or auto-generate complete 40-question quiz for any of the 134 topics
export function getTopicQuiz(topicId) {
  if (topicId === 1) {
    return TOPIC_1_QUIZ;
  }
  const meta = EXACT_134_TOPICS.find(t => t.id === topicId) || EXACT_134_TOPICS[0];
  const titleClean = meta.title.split('|')[0].trim();

  // Generate 40 questions (10 Easy, 10 Medium, 10 Hard, 10 Very Hard)
  const questions = [];

  // Q1-Q10 Easy
  for (let i = 1; i <= 10; i++) {
    questions.push({
      id: i,
      difficulty: "easy",
      question: `[Q${i} • Easy] What is the fundamental concept behind "${titleClean}" in machine learning?`,
      options: [
        `It provides a foundational method for ${meta.category} to learn generalizable patterns from empirical data`,
        "It is a hardware device used exclusively for cooling server racks",
        "It completely eliminates the need for having training datasets in AI",
        "It is a database format that prevents reading binary files"
      ],
      answer: 0,
      explanation: `Option A is correct: "${titleClean}" is a key technique in ${meta.category} designed to optimize representation and predictive performance.`
    });
  }

  // Q11-Q20 Medium
  for (let i = 11; i <= 20; i++) {
    questions.push({
      id: i,
      difficulty: "medium",
      question: `[Q${i} • Medium] In the context of "${titleClean}", how does it compare to alternative baseline approaches?`,
      options: [
        "It does not require any CPU or GPU computation",
        `It introduces tailored inductive biases suitable for ${meta.category}, balancing stability and capacity`,
        "It can only be used on single-row datasets",
        "It is deprecated and never used in production software"
      ],
      answer: 1,
      explanation: `Option B is correct: In ${meta.category}, "${titleClean}" provides structured inductive bias that improves sample efficiency and generalization.`
    });
  }

  // Q21-Q30 Hard
  for (let i = 21; i <= 30; i++) {
    questions.push({
      id: i,
      difficulty: "hard",
      question: `[Q${i} • Hard] What critical failure mode or leakage must an engineer prevent when implementing "${titleClean}"?`,
      options: [
        "Running code inside a virtual environment",
        `Fitting parameters across the combined dataset before splitting train and test sets (causing data leakage)`,
        "Using 64-bit floating point arithmetic",
        "Writing clean docstrings and comments"
      ],
      answer: 1,
      explanation: `Option B is correct: In ${meta.category}, any statistical estimates computed on the whole dataset prior to splitting leak test distribution information into the training pipeline.`
    });
  }

  // Q31-Q40 Very Hard
  for (let i = 31; i <= 40; i++) {
    questions.push({
      id: i,
      difficulty: "very_hard",
      question: `[Q${i} • Very Hard] In production system design for "${titleClean}", how should mathematical convergence and distribution shifts be rigorously monitored?`,
      options: [
        "By ignoring error logs and disabling all automated unit tests",
        `By tracking empirical risk convergence, checking Kolmogorov-Smirnov / PSI drift statistics, and running shadow A/B evaluations`,
        "By converting all continuous variables into raw string objects",
        "By enforcing 100% training accuracy through unconstrained memorization"
      ],
      answer: 1,
      explanation: `Option B is correct: Production reliability for "${titleClean}" requires continuous monitoring of loss gradients, population stability index (PSI) / KS tests for drift, and validation against live traffic.`
    });
  }

  return questions;
}
