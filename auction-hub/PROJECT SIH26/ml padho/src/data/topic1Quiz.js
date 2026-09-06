export const TOPIC_1_QUIZ = [
  // 🟢 EASY (Q1-Q10)
  {
    id: 1,
    difficulty: "easy",
    question: "Who formulated the definition: \"A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E\"?",
    options: ["Arthur Samuel", "Tom M. Mitchell", "Alan Turing", "Geoffrey Hinton"],
    answer: 1,
    explanation: "Tom M. Mitchell formalized this operational definition in his seminal 1997 textbook 'Machine Learning'. Arthur Samuel provided an informal definition in 1959."
  },
  {
    id: 2,
    difficulty: "easy",
    question: "In the traditional programming paradigm, what are the primary inputs provided by the software engineer to produce answers?",
    options: ["Data and Labels", "Rules and Answers", "Data and Rules", "Features and Loss Functions"],
    answer: 2,
    explanation: "In traditional software engineering, humans write explicit logic (Rules) and feed in Data to generate Answers. In Machine Learning, Data and Answers are fed into the learner to discover Rules."
  },
  {
    id: 3,
    difficulty: "easy",
    question: "In Tom Mitchell's definition applied to a handwritten digit recognition system, what corresponds to the 'Experience E'?",
    options: ["The percentage of digits correctly classified", "A database of labeled handwritten digit images", "The process of assigning labels 0 through 9", "The cross-entropy loss function"],
    answer: 1,
    explanation: "Experience E represents historical observations. The database of labeled digit images serves as this experience. Assigning labels is Task T, and accuracy is Performance P."
  },
  {
    id: 4,
    difficulty: "easy",
    question: "Who coined the term 'Machine Learning' in 1959 while developing a checkers-playing program?",
    options: ["John von Neumann", "Arthur Samuel", "Marvin Minsky", "Claude Shannon"],
    answer: 1,
    explanation: "Arthur Samuel coined the term 'Machine Learning' in 1959 at IBM, defining it as the study that gives computers the ability to learn without being explicitly programmed."
  },
  {
    id: 5,
    difficulty: "easy",
    question: "What is the primary objective of a machine learning model when trained on a dataset?",
    options: ["Achieving zero error on the training set", "Generalizing accurately to unseen data from the same problem distribution", "Memorizing every training sample's coordinates", "Maximizing the number of learnable parameters"],
    answer: 1,
    explanation: "Generalization to novel, unseen inputs drawn from the underlying distribution is the fundamental goal of machine learning, avoiding rote memorization (overfitting)."
  },
  {
    id: 6,
    difficulty: "easy",
    question: "What type of machine learning task is predicting whether an incoming email is 'Spam' or 'Ham'?",
    options: ["Regression", "Binary Classification", "Density Estimation", "Dimensionality Reduction"],
    answer: 1,
    explanation: "Classifying an input into one of two mutually exclusive categories is defined as binary classification."
  },
  {
    id: 7,
    difficulty: "easy",
    question: "Which of the following problems represents a continuous Regression task?",
    options: ["Categorizing support tickets into Billing, Technical, and General", "Predicting the continuous market price of a house in dollars", "Segmenting e-commerce users by purchasing style", "Filtering malicious network packets"],
    answer: 1,
    explanation: "Regression deals with continuous real-valued targets (e.g., house price in currency). Categorization and filtering are classification tasks; customer segmentation is clustering."
  },
  {
    id: 8,
    difficulty: "easy",
    question: "What does the term 'Feature' mean in tabular machine learning datasets?",
    options: ["The runtime execution speed of training", "An individual measurable property or variable of the observed phenomenon", "The final classification label predicted", "The loss gradient vector"],
    answer: 1,
    explanation: "A feature (or attribute, predictor, independent variable) is an individual measurable property representing an aspect of the phenomenon."
  },
  {
    id: 9,
    difficulty: "easy",
    question: "What is a 'Label' in the context of supervised machine learning?",
    options: ["The primary key index of the database table", "The true ground-truth target variable being predicted", "The learning rate multiplier", "The maximum depth limit of a decision tree"],
    answer: 1,
    explanation: "The label (or target/ground truth) is the true outcome value assigned to an instance that the model learns to predict."
  },
  {
    id: 10,
    difficulty: "easy",
    question: "What does 'Inference' refer to in a machine learning lifecycle?",
    options: ["Computing loss gradients during backpropagation", "Cleaning missing records from CSV files", "Using a trained model to make predictions on new data", "Gathering user telemetry logs"],
    answer: 2,
    explanation: "Inference is the production or evaluation phase where a trained model processes new input features to output predictions without modifying model weights."
  },

  // 🟡 MEDIUM (Q11-Q20)
  {
    id: 11,
    difficulty: "medium",
    question: "How does Machine Learning primarily differ from classical statistical modeling?",
    options: [
      "Statistical modeling uses no calculus, while ML relies exclusively on it",
      "Statistics focuses on inference and interpretable data-generating assumptions; ML prioritizes empirical out-of-sample predictive accuracy",
      "Machine learning cannot handle tabular datasets, whereas statistics can",
      "Statistical models never assume probability distributions"
    ],
    answer: 1,
    explanation: "As formulated by Leo Breiman, classical statistics emphasizes formal mathematical inference about parameters and mechanisms, whereas ML focuses on predictive performance on unseen data."
  },
  {
    id: 12,
    difficulty: "medium",
    question: "Under which condition is a deterministic rule-based program strictly superior to a Machine Learning solution?",
    options: [
      "Predicting user ad click-through rates across 10 million campaigns",
      "Calculating income tax deductions strictly governed by legal statutes",
      "Transcribing human speech audio in noisy conditions",
      "Detecting pedestrians in autonomous vehicle video streams"
    ],
    answer: 1,
    explanation: "Legal tax brackets have exact, unambiguous, deterministic rules. Using ML introduces probabilistic approximations and compliance risks where simple if-else code is 100% correct, fast, and auditable."
  },
  {
    id: 13,
    difficulty: "medium",
    question: "Why is evaluating an ML model exclusively on its training dataset fundamentally flawed?",
    options: [
      "Underfitting will be severely overestimated",
      "Training error is an optimistically biased metric that fails to penalize memorization of noise",
      "It causes GPU hardware memory fragmentation",
      "Gradient descent fails to reach a local minimum"
    ],
    answer: 1,
    explanation: "A high-capacity model can achieve 0% training error by rote memorization while failing catastrophically on test data. Empirical training error does not estimate generalization error."
  },
  {
    id: 14,
    difficulty: "medium",
    question: "In Mitchell's framework (T, P, E), what represents the Performance measure P for an autonomous driving agent?",
    options: [
      "The number of lidar frames ingested per second",
      "The cumulative vehicle miles driven across highway routes",
      "The mean distance or hours driven without requiring human safety intervention",
      "The depth of the convolutional neural network"
    ],
    answer: 2,
    explanation: "Miles between safety disengagements or collisions directly measures driving performance on Task T. Cumulative miles driven represents Experience E."
  },
  {
    id: 15,
    difficulty: "medium",
    question: "What is 'Inductive Bias' in machine learning theory?",
    options: [
      "Ethical bias introduced by human data annotators",
      "The set of foundational assumptions an algorithm uses to predict outputs for unobserved inputs",
      "Floating point truncation errors in numerical computation",
      "The skew towards majority classes in imbalanced datasets"
    ],
    answer: 1,
    explanation: "Inductive bias is the set of assumptions an algorithm adopts to generalize beyond observed training points (e.g., linear models assume linearity; KNN assumes nearby points share labels)."
  },
  {
    id: 16,
    difficulty: "medium",
    question: "What is meant by the 'Hypothesis Space' H of a learning algorithm?",
    options: [
      "The set of all possible datasets that could ever be collected",
      "The set of all mathematical functions mapping inputs to targets that the algorithm can represent",
      "The physical storage required for model weights",
      "The range of random seeds used in cross-validation"
    ],
    answer: 1,
    explanation: "Hypothesis space H represents the set of all candidate functions f(x; θ) that the model architecture can explore and optimize over."
  },
  {
    id: 17,
    difficulty: "medium",
    question: "What does the 'No Free Lunch' (NFL) theorem in machine learning imply?",
    options: [
      "Deep neural networks are universally superior to all other algorithms on any dataset",
      "No single learning algorithm outperforms all others when averaged across all possible data distributions",
      "Training models without cost functions is computationally impossible",
      "Unsupervised learning requires no computational resources"
    ],
    answer: 1,
    explanation: "Wolpert and Macready's No Free Lunch theorem states that if all data distributions are equally probable, no algorithm can claim general superiority over any other, even random guessing."
  },
  {
    id: 18,
    difficulty: "medium",
    question: "How do model parameters differ from model hyperparameters?",
    options: [
      "Parameters are set manually before training; hyperparameters are learned from data",
      "Parameters are internal values learned during optimization; hyperparameters are configuration settings specified before training",
      "Parameters exist only in unsupervised models; hyperparameters exist only in supervised models",
      "Parameters are categorical strings; hyperparameters are always continuous floats"
    ],
    answer: 1,
    explanation: "Parameters (like weights and biases) are adjusted via the optimization algorithm on training data. Hyperparameters (like learning rate, tree depth, and k in KNN) are architectural choices set by the engineer."
  },
  {
    id: 19,
    difficulty: "medium",
    question: "What is Semi-Supervised Learning?",
    options: [
      "Training without any numerical features",
      "Leveraging a small pool of labeled data combined with a large volume of unlabeled data",
      "Using humans in the loop during every production inference",
      "Splitting training data exactly 50/50 between two classes"
    ],
    answer: 1,
    explanation: "Semi-supervised learning utilizes abundant inexpensive unlabeled data alongside limited labeled data to construct stronger decision boundaries than labeled data alone."
  },
  {
    id: 20,
    difficulty: "medium",
    question: "What does 'Concept Drift' mean in production systems?",
    options: [
      "Hardware clock drift in cloud server clusters",
      "A change in the statistical relationship mapping inputs X to target Y over time (P(Y|X) changes)",
      "Database schema changes that drop feature columns",
      "Programmers changing variable names in source code"
    ],
    answer: 1,
    explanation: "Concept drift refers to shifts in the conditional probability distribution P(Y|X), meaning the underlying relationship between features and labels changes over time."
  },

  // 🟠 HARD (Q21-Q30)
  {
    id: 21,
    difficulty: "hard",
    question: "Consider this Python snippet:\nfrom sklearn.neighbors import KNeighborsClassifier\nX = [[1], [2], [3], [4], [5]]\ny = [0, 0, 1, 1, 1]\nclf = KNeighborsClassifier(n_neighbors=1)\nclf.fit(X, y)\nscore = clf.score(X, y)\nWhat is `score` and why?",
    options: [
      "score = 0.6 because of boundary smoothing",
      "score = 1.0 because a 1-NN model queries each point against itself on the training set",
      "score = 0.8 because point 3 is on the boundary",
      "score = 0.0 because nearest neighbors requires normalization first"
    ],
    answer: 1,
    explanation: "With k=1, the nearest neighbor to any point in the training set is the point itself, guaranteeing 100% (1.0) resubstitution accuracy regardless of true generalization capability."
  },
  {
    id: 22,
    difficulty: "hard",
    question: "A fraud detection model was trained on 2018–2019 transaction data. In March 2020, shopping patterns transformed globally overnight. What distribution shifts occurred simultaneously?",
    options: [
      "Only software syntax errors",
      "Both Covariate Shift (P(X) changed) and Concept Drift (P(Y|X) changed)",
      "Only numerical underflow in floating point arithmetic",
      "Deterministic data leakage"
    ],
    answer: 1,
    explanation: "Customer purchasing habits (categories, online vs retail, amounts) shifted (covariate shift P(X)), and what constituted legitimate vs suspicious behavior also changed (concept drift P(Y|X))."
  },
  {
    id: 23,
    difficulty: "hard",
    question: "If a machine learning system minimizes Empirical Risk (ERM), what is it directly minimizing?",
    options: [
      "The true expected risk over the unseen population distribution",
      "The average loss over the finite sample of observed training instances",
      "The total floating-point operations of the inference pipeline",
      "The cross-validation variance across folds"
    ],
    answer: 1,
    explanation: "Empirical Risk Minimization (ERM) replaces the theoretical expected risk over the unknown population distribution with the average sample loss over the training dataset."
  },
  {
    id: 24,
    difficulty: "hard",
    question: "Suppose a model hypothesis space has infinite Vapnik-Chervonenkis (VC) dimension. What does statistical learning theory conclude about its generalization capability?",
    options: [
      "It is guaranteed to have zero generalization error on test data",
      "It can shatter arbitrary dataset sizes and therefore cannot guarantee uniform generalization bounds",
      "It converges in O(1) time complexity",
      "It is invariant to feature scale"
    ],
    answer: 1,
    explanation: "A model with infinite VC dimension can shatter any number of points, meaning it can fit any arbitrary binary labeling and lacks the capacity constraints necessary for PAC-learnability bounds."
  },
  {
    id: 25,
    difficulty: "hard",
    question: "Why can't high-capacity models like 1-NN or unbounded Decision Trees be safely evaluated using resubstitution error?",
    options: [
      "They have zero empirical training error by design, creating a blind spot for overfitting",
      "Their execution time becomes infinite on training data",
      "They cannot calculate classification loss matrices",
      "They automatically delete feature labels during evaluation"
    ],
    answer: 0,
    explanation: "Zero training error gives no signal regarding whether the model discovered true generalizable patterns or simply memorized random noise in the training observations."
  },
  {
    id: 26,
    difficulty: "hard",
    question: "Which of the following describes an inductive bias towards simplicity, prioritizing smaller weight values?",
    options: [
      "Hebbian learning rule",
      "L2 Weight Regularization (Ridge / Weight Decay)",
      "One-hot encoding of categorical variables",
      "K-Means centroid initialization"
    ],
    answer: 1,
    explanation: "L2 regularization imposes a Gaussian prior on the weights, penalizing large coefficient values and enforcing an inductive bias that favors smoother, less complex functions."
  },
  {
    id: 27,
    difficulty: "hard",
    question: "In Mitchell's (T, P, E) formulation for a medical image diagnosis system identifying malignant tumors, which represents Task T?",
    options: [
      "A repository of 100,000 CT scans labeled by radiologists",
      "Classifying an unseen CT scan into 'malignant' or 'benign'",
      "The Area Under the ROC Curve (ROC-AUC)",
      "The stochastic gradient descent optimization algorithm"
    ],
    answer: 1,
    explanation: "Task T is the specific operational job the program executes: classifying an unseen CT scan into malignant or benign. ROC-AUC is Performance P; labeled CT scans are Experience E."
  },
  {
    id: 28,
    difficulty: "hard",
    question: "In a binary classification dataset with 99% Class 0 and 1% Class 1, a dummy model always predicts Class 0. What are its Accuracy and Recall for Class 1?",
    options: [
      "Accuracy = 99%, Recall = 100%",
      "Accuracy = 99%, Recall = 0%",
      "Accuracy = 50%, Recall = 50%",
      "Accuracy = 1%, Recall = 99%"
    ],
    answer: 1,
    explanation: "Accuracy is (99 correct / 100 total) = 99%. However, it identified 0 out of the 1 actual positive cases, making Recall = 0 / 1 = 0%. This illustrates why accuracy is misleading for imbalanced data."
  },
  {
    id: 29,
    difficulty: "hard",
    question: "How does Self-Supervised Learning (SSL) acquire training signals from unlabeled data?",
    options: [
      "By paying human labelers through automated micro-tasks",
      "By formulating pretext tasks where input data is modified and the original structure serves as the pseudo-label",
      "By replacing numerical features with random noise",
      "By using unconstrained genetic algorithms without loss functions"
    ],
    answer: 1,
    explanation: "Self-supervised learning generates pseudo-labels directly from the data itself via pretext tasks (e.g., masked language modeling in BERT, next-token prediction in GPT, contrastive view matching in SimCLR)."
  },
  {
    id: 30,
    difficulty: "hard",
    question: "What is the primary trade-off highlighted by the Bias-Variance decomposition?",
    options: [
      "Memory consumption versus network bandwidth",
      "Error from overly simplistic assumptions (bias) versus error from sensitivity to training set fluctuations (variance)",
      "CPU thread utilization versus GPU kernel occupancy",
      "Dataset download speed versus hard disk write latency"
    ],
    answer: 1,
    explanation: "Expected prediction error decomposes into Bias² + Variance + Irreducible Error. Simple models have high bias and low variance; overly complex models have low bias and high variance."
  },

  // 🔴 VERY HARD (Q31-Q40)
  {
    id: 31,
    difficulty: "very_hard",
    question: "According to PAC (Probably Approximately Correct) learning theory, a concept class C is PAC-learnable if for any epsilon > 0 and delta > 0, an algorithm can find a hypothesis h with P(error(h) <= epsilon) >= 1 - delta in time polynomial in what quantities?",
    options: [
      "1/epsilon, 1/delta, feature dimension n, and size of concept",
      "Training epochs and GPU memory bandwidth",
      "The dataset's Pearson correlation coefficient matrix",
      "The ratio of precision to recall"
    ],
    answer: 0,
    explanation: "Leslie Valiant's PAC learning formulation requires the sample complexity and computational runtime to be polynomial in 1/ε (accuracy parameter), 1/δ (confidence parameter), representation size, and feature dimension."
  },
  {
    id: 32,
    difficulty: "very_hard",
    question: "Why does Empirical Risk Minimization (ERM) fail when the hypothesis class H has unbounded complexity (e.g., all arbitrary lookup functions)?",
    options: [
      "Because gradient descent encounters non-zero hessian matrices",
      "Because the Uniform Law of Large Numbers fails to hold over H, causing the empirical risk to diverge from the true risk",
      "Because the learning rate cannot be decayed to zero",
      "Because matrix inversion becomes numerically unstable"
    ],
    answer: 1,
    explanation: "Generalization requires that empirical risk converges uniformly to true risk across all hypotheses in H: sup_{h in H} |R_emp(h) - R_true(h)| -> 0. With unbounded complexity, uniform convergence fails and ERM overfits arbitrarily."
  },
  {
    id: 33,
    difficulty: "very_hard",
    question: "In production ML monitoring, if P(X) changes while P(Y|X) remains unchanged, what type of distribution shift has occurred, and does the optimal Bayes decision boundary shift?",
    options: [
      "Concept drift; the boundary changes completely",
      "Covariate shift; the true optimal Bayes classifier remains unchanged, though empirical risk estimates and model calibration may degrade",
      "Prior probability shift; the feature matrix becomes singular",
      "Label noise; all parameters must be reinitialized"
    ],
    answer: 1,
    explanation: "When P(X) changes but P(Y|X) is constant, this is pure covariate shift. Because the true conditional label distribution P(Y|X) is identical, the optimal Bayes decision boundary argmax_y P(Y=y|X=x) is fundamentally unchanged."
  },
  {
    id: 34,
    difficulty: "very_hard",
    question: "Consider an ML engineer deploying an LLM-based query router. The engineer claims: 'Because this model is trained on 15 trillion tokens, it exhibits zero inductive bias.' Why is this claim theoretically incorrect?",
    options: [
      "Every learning model that generalizes beyond exact memorized strings requires inductive bias (e.g. transformer causal masking, tokenization, dot-product attention geometry)",
      "Inductive bias only applies to Decision Trees, not neural networks",
      "Large models only have deductive bias",
      "More data causes inductive bias to convert into parameter variance"
    ],
    answer: 0,
    explanation: "By the No Free Lunch theorem, learning from finite observations requires structural priors. A Transformer's architecture (multi-head self-attention, positional encodings, layer norm, residual streams) embodies strong inductive biases."
  },
  {
    id: 35,
    difficulty: "very_hard",
    question: "Suppose a loss function L is convex and L-smooth. What theoretical guarantee does Gradient Descent provide regarding parameter convergence?",
    options: [
      "It guarantees finding the global minimum with linear or sublinear convergence rate O(1/k) for step size eta <= 1/L",
      "It guarantees convergence only if the hypothesis space is non-linear",
      "It guarantees zero generalization error on any test set",
      "It prevents overfitting completely without regularization"
    ],
    answer: 0,
    explanation: "For convex, L-smooth functions, standard gradient descent with a constant step size η ≤ 1/L is mathematically guaranteed to converge to the global minimum with an O(1/k) rate on function value gap."
  },
  {
    id: 36,
    difficulty: "very_hard",
    question: "Under the Data-Centric AI paradigm championed by Andrew Ng, what is the recommended protocol when an ML model plateaus on real-world error analysis?",
    options: [
      "Instantly switch to a model architecture with 10x more parameters",
      "Systematically identify consistency errors, mislabels, and edge-case deficiencies in the training data while holding model code constant",
      "Reduce the training set size to force faster convergence",
      "Ignore validation performance and train on the test set directly"
    ],
    answer: 1,
    explanation: "Data-Centric AI emphasizes systematically engineering the dataset (cleaning labels, standardizing edge-case labeling rules, adding targeted high-quality samples) rather than solely tweaking model architecture."
  },
  {
    id: 37,
    difficulty: "very_hard",
    question: "What is the mathematical consequence of having collinear features (X_1 = 2 * X_2) in an ordinary least squares (OLS) linear model?",
    options: [
      "The loss function becomes non-convex",
      "The Gram matrix (X^T X) becomes singular (non-invertible), rendering the closed-form normal equation (X^T X)^(-1) X^T y unsolvable without regularization",
      "The model's predictions become non-linear",
      "The gradient vector becomes strictly perpendicular to the loss surface"
    ],
    answer: 1,
    explanation: "Perfect multicollinearity makes columns of X linearly dependent, reducing rank(X^T X). Its determinant is zero, meaning (X^T X) cannot be inverted, leading to infinitely many non-unique parameter solutions."
  },
  {
    id: 38,
    difficulty: "very_hard",
    question: "In an Active Learning workflow, what criteria does 'Uncertainty Sampling' use to query an oracle for labels?",
    options: [
      "It selects instances where the current model has the highest predictive entropy or lowest margin between top class probabilities",
      "It randomly picks rows from the bottom of the CSV file",
      "It selects instances that the model is already 99.9% confident about",
      "It chooses instances with the smallest L2 feature norms"
    ],
    answer: 0,
    explanation: "Uncertainty sampling queries the oracle (human annotator) on unlabeled samples where the model is least confident (highest entropy or smallest difference between top class probabilities), maximizing learning efficiency per annotated sample."
  },
  {
    id: 39,
    difficulty: "very_hard",
    question: "A senior ML engineer states: 'We should avoid Data Leakage during target encoding.' Which of the following implementations causes catastrophic target leakage?",
    options: [
      "Computing mean target encoding across the entire dataset prior to performing train/test split",
      "Calculating mean target encoding strictly inside each cross-validation training fold and mapping to validation fold",
      "Adding Gaussian noise to out-of-fold target means",
      "Using K-fold out-of-fold target encoding strictly on the training partition"
    ],
    answer: 0,
    explanation: "Computing target statistics across the entire dataset before splitting leaks the test set's ground-truth targets into the training features, resulting in deceptively high cross-validation scores that collapse in production."
  },
  {
    id: 40,
    difficulty: "very_hard",
    question: "What fundamentally distinguishes an 'Offline Evaluation' from an 'Online A/B Test' in production Machine Learning systems?",
    options: [
      "Offline evaluation measures historical metric approximations (e.g. AUC, RMSE); online A/B testing measures true causal business impact (e.g. CTR, conversion, revenue, latency) on live split user traffic",
      "Offline evaluation uses GPUs; online A/B testing can only use CPUs",
      "Offline evaluation requires user consent forms; online testing does not",
      "Offline testing tests only unsupervised models; online tests only supervised models"
    ],
    answer: 0,
    explanation: "Offline evaluation tests models on fixed retrospective historical benchmarks. Online A/B testing routes live real-world user traffic to candidate models to evaluate actual causal business metrics and operational performance."
  }
];
