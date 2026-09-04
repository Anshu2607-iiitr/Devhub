export const ML_COURSE_CATEGORIES = [
  { id: "all-ml", name: "All ML & AI Modules" },
  { id: "foundations", name: "Data Science & Math" },
  { id: "classical-ml", name: "Classical Machine Learning" },
  { id: "deep-learning", name: "Deep Learning & PyTorch" },
  { id: "nlp-transformers", name: "NLP & Transformers" },
  { id: "genai-llms", name: "GenAI, LLMs & RAG" },
  { id: "mlops", name: "MLOps & Model Serving" },
];

export const ML_MODULES = [
  // ML-1: Python & NumPy
  {
    id: "mod-ml-1",
    track: "ml",
    moduleNumber: 1,
    title: "Python for ML & NumPy Vectorization",
    slug: "python-numpy",
    category: "Data Science & Math",
    categoryId: "foundations",
    description: "Multi-dimensional ndarrays, vectorized operations, broadcasting rules, matrix multiplication, and linear algebra foundations.",
    lessonsCount: 2,
    xpReward: 250,
    difficulty: "Beginner",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-ml-1-1",
        title: "NumPy Arrays, Broadcasting & Matrix Math",
        description: "Master C-contiguous memory layouts, shape transformations, and vectorized computations.",
        duration: "15 min",
        quizId: "quiz-ml-1-1",
        concept: `NumPy provides high-performance N-dimensional array objects (\`ndarray\`) implemented in C:

1. **Vectorization**: Performing element-wise array operations without slow Python for-loops.
2. **Broadcasting**: NumPy's rule-set for arithmetic operations on arrays with differing dimensions.
3. **Dot Products & Matrix Multiplication**: \`np.dot(A, B)\` or \`A @ B\` executes BLAS/LAPACK optimized hardware instructions.`,
        keyPoints: [
          "Avoid Python loops over large datasets; vectorization executes up to 100x faster in compiled C.",
          "Broadcasting matches trailing dimensions or expands singletons (dimension = 1) to match larger tensors.",
          "Reshaping arrays with .reshape(-1, 1) preserves contiguous memory views without copying data."
        ],
        codeExample: {
          filename: "numpy_vectorization.py",
          code: `import numpy as np

# Vectorized Linear Combination: Y = X @ W + b
X = np.array([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]]) # Shape (3, 2)
W = np.array([[0.5], [1.5]])                         # Shape (2, 1)
b = np.array([0.2])                                  # Shape (1,) -> Broadcasted

Y = X @ W + b
print("Output Predictions Shape:", Y.shape)
print("Result:\\n", Y)`,
          output: `Output Predictions Shape: (3, 1)\nResult:\n [[ 3.7]\n [ 7.7]\n [11.7]]`
        },
        notes: ["NumPy arrays require homogeneous data types (e.g. float32, int64) to maintain contiguous memory caches."],
        commonMistakes: [{ title: "Confusing element-wise multiplication with matrix multiplication", desc: "A * B performs element-wise multiplication; use A @ B or np.matmul(A, B) for true linear algebra matrix multiplication." }],
        tryIt: { prompt: "Broadcast 1D bias vector across 2D batch tensor:", code: `X = np.zeros((100, 10))\nb = np.ones((10,))\nres = X + b  # Shape: (100, 10)`, hint: "Trailing dimension 10 matches automatically via broadcasting." }
      }
    ]
  },

  // ML-2: Pandas & EDA
  {
    id: "mod-ml-2",
    track: "ml",
    moduleNumber: 2,
    title: "Pandas DataFrames & Feature Engineering",
    slug: "pandas-eda",
    category: "Data Science & Math",
    categoryId: "foundations",
    description: "Data cleaning, missing value imputation, group-by aggregations, one-hot encoding, and feature scaling.",
    lessonsCount: 2,
    xpReward: 250,
    difficulty: "Beginner",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-ml-2-1",
        title: "DataFrame Transformations & Preprocessing",
        description: "Transform raw tabular data into numerical ML-ready training matrices.",
        duration: "15 min",
        quizId: "quiz-ml-2-1",
        concept: `Pandas is the industry standard for tabular data manipulation:
- **Missing Data Handling**: \`.fillna()\`, \`.dropna()\`, or iterative KNN imputer.
- **Categorical Encoding**: One-Hot Encoding (\`pd.get_dummies\`) vs Target Encoding.
- **Feature Normalization**: StandardScaler (Z-score) vs MinMaxScaler ([0, 1]).`,
        keyPoints: [
          "Always fit scalers and encoders on the training set only, then transform test sets to avoid data leakage.",
          "Vectorized .apply() or native boolean masking outperforms row-by-row iteration."
        ],
        codeExample: {
          filename: "feature_engineering.py",
          code: `import pandas as pd
from sklearn.preprocessing import StandardScaler

df = pd.DataFrame({
    'age': [25, 32, None, 45],
    'income': [50000, 75000, 62000, 120000],
    'tier': ['Pro', 'Free', 'Pro', 'Enterprise']
})

# Impute median age & One-Hot Encode
df['age'] = df['age'].fillna(df['age'].median())
df_encoded = pd.get_dummies(df, columns=['tier'], drop_first=True)
print(df_encoded)`,
          output: `    age  income  tier_Free  tier_Pro\n0  25.0   50000      False      True\n1  32.0   75000       True     False\n2  32.0   62000      False      True\n3  45.0  120000      False     False`
        },
        notes: ["drop_first=True prevents multicollinearity in linear models."],
        commonMistakes: [{ title: "Fitting preprocessors on combined train + test dataset", desc: "Fitting scalers on test data causes data leakage and unrealistic validation scores." }],
        tryIt: { prompt: "Group-by aggregation in Pandas:", code: `df.groupby('tier')['income'].mean()`, hint: "Computes average income grouped by customer tier." }
      }
    ]
  },

  // ML-3: Math for ML & Gradient Descent
  {
    id: "mod-ml-3",
    track: "ml",
    moduleNumber: 3,
    title: "Math for ML & Gradient Descent Optimization",
    slug: "math-gradient-descent",
    category: "Data Science & Math",
    categoryId: "foundations",
    description: "Loss functions (MSE, Cross-Entropy), partial derivatives, learning rates, convex optimization, and Adam optimizer.",
    lessonsCount: 1,
    xpReward: 250,
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-ml-3-1",
        title: "Loss Surfaces, Learning Rates & Gradient Updates",
        description: "Understand how model weights update in the direction of steepest descent.",
        duration: "15 min",
        quizId: "quiz-ml-3-1",
        concept: `Gradient Descent is the foundational optimization algorithm of machine learning:
$$\\theta_{new} = \\theta_{old} - \\alpha \\cdot \\nabla L(\\theta)$$
Where $\\alpha$ is the learning rate and $\\nabla L$ is the gradient vector of partial derivatives.`,
        keyPoints: [
          "Learning rate too large: Divergence and oscillating loss.",
          "Learning rate too small: Slow convergence or getting stuck in local plateaus.",
          "Adam optimizer adapts per-parameter learning rates using exponentially decaying momentum."
        ],
        codeExample: {
          filename: "gradient_descent.py",
          code: `import numpy as np

# Simple Linear Model: y = w * x
x, y = 2.0, 10.0 # True w = 5.0
w = 0.0          # Initial weight
lr = 0.1         # Learning rate

for epoch in range(15):
    y_pred = w * x
    loss = (y_pred - y) ** 2
    grad = 2 * (y_pred - y) * x # dLoss/dw
    w -= lr * grad
    if epoch % 3 == 0:
        print(f"Epoch {epoch:02d} | Loss: {loss:.4f} | w: {w:.3f}")`,
          output: `Epoch 00 | Loss: 100.0000 | w: 4.000\nEpoch 03 | Loss: 0.0041 | w: 4.984\nEpoch 06 | Loss: 0.0000 | w: 5.000`
        },
        notes: ["Stochastic Gradient Descent (SGD) uses mini-batches to balance computation speed and gradient variance."],
        commonMistakes: [{ title: "Failing to normalize input features before gradient descent", desc: "Unscaled features create elongated loss valleys causing gradient descent to oscillate inefficiently." }],
        tryIt: { prompt: "Learning rate decay strategy:", code: `lr = lr_initial / (1 + decay_rate * epoch)`, hint: "Gradually reduces step sizes as parameters approach minimum." }
      }
    ]
  },

  // ML-4: Supervised Learning
  {
    id: "mod-ml-4",
    track: "ml",
    moduleNumber: 4,
    title: "Supervised Learning: Trees, Forests & XGBoost",
    slug: "supervised-learning",
    category: "Classical Machine Learning",
    categoryId: "classical-ml",
    description: "Decision Trees (Gini/Entropy), Random Forests (Bagging), Gradient Boosting (XGBoost/LightGBM), and Support Vector Machines.",
    lessonsCount: 2,
    xpReward: 300,
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    lessons: [
      {
        id: "lesson-ml-4-1",
        title: "Random Forests & Gradient Boosted Decision Trees",
        description: "Compare Bagging (reducing variance) vs Boosting (reducing bias sequentially).",
        duration: "20 min",
        quizId: "quiz-ml-4-1",
        concept: `Ensemble methods combine multiple decision tree estimators:
1. **Random Forest (Bagging)**: Trains hundreds of unconstrained trees in parallel on bootstrap samples, averaging predictions to drastically reduce variance.
2. **Gradient Boosting / XGBoost (Boosting)**: Trains shallow trees sequentially, where each new tree fits on the residual pseudo-errors of the previous models.`,
        keyPoints: [
          "Random Forests resist overfitting through bootstrap bagging and random feature subsampling at each split.",
          "XGBoost incorporates L1/L2 regularization on tree leaf weights and second-order Taylor expansion gradients.",
          "Tree-based models are scale-invariant and handle non-linear tabular data exceptionally well."
        ],
        codeExample: {
          filename: "xgboost_classifier.py",
          code: `from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score

X, y = make_classification(n_samples=1000, n_features=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = XGBClassifier(n_estimators=100, learning_rate=0.05, max_depth=4)
model.fit(X_train, y_train)

preds = model.predict(X_test)
print(f"XGBoost Test Accuracy: {accuracy_score(y_test, preds):.2%}")`,
          output: `XGBoost Test Accuracy: 94.50%`
        },
        notes: ["Use early stopping with validation sets in XGBoost to prevent over-training on noisy features."],
        commonMistakes: [{ title: "Setting max_depth too high in boosted trees", desc: "Boosting builds sequentially; deep trees (depth > 8) quickly overfit noisy training samples. Keep boosting depth low (3-6)." }],
        tryIt: { prompt: "Inspect feature importances in Random Forest:", code: `importances = model.feature_importances_`, hint: "Measures total Gini impurity reduction contributed by each feature." }
      }
    ]
  },

  // ML-5: Model Evaluation
  {
    id: "mod-ml-5",
    track: "ml",
    moduleNumber: 5,
    title: "Model Evaluation & Hyperparameter Tuning",
    slug: "model-evaluation",
    category: "Classical Machine Learning",
    categoryId: "classical-ml",
    description: "Confusion matrices, Precision, Recall, F1-Score, ROC-AUC, K-Fold Stratified Cross-Validation, and Optuna Bayesian optimization.",
    lessonsCount: 1,
    xpReward: 250,
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-ml-5-1",
        title: "Imbalanced Datasets, ROC-AUC & Optuna",
        description: "Select the correct metrics for fraud/cancer detection and automate search spaces.",
        duration: "15 min",
        quizId: "quiz-ml-5-1",
        concept: `Raw accuracy is misleading when working with imbalanced datasets (e.g. 99% non-fraud, 1% fraud):
- **Precision**: $\\frac{TP}{TP + FP}$ (Of all predicted positives, how many are real?)
- **Recall**: $\\frac{TP}{TP + FN}$ (Of all actual positives, how many did we catch?)
- **F1-Score**: Harmonic mean of Precision and Recall.
- **ROC-AUC**: Area under TPR vs FPR curve across all decision classification thresholds.`,
        keyPoints: [
          "For high-stakes medical/fraud detection, prioritize Recall to minimize False Negatives.",
          "Stratified K-Fold Cross-Validation ensures every split preserves the original class ratio."
        ],
        codeExample: {
          filename: "evaluation_metrics.py",
          code: `from sklearn.metrics import classification_report, roc_auc_score

# True vs Predicted Labels
y_true = [0, 0, 0, 0, 1, 1, 1, 1, 0, 1]
y_pred = [0, 0, 0, 0, 1, 1, 0, 1, 0, 1]
y_prob = [0.1, 0.2, 0.1, 0.3, 0.9, 0.8, 0.4, 0.95, 0.2, 0.88]

print(classification_report(y_true, y_pred, target_names=['Normal', 'Fraud']))
print(f"ROC-AUC Score: {roc_auc_score(y_true, y_prob):.4f}")`,
          output: `              precision    recall  f1-score   support\n      Normal       0.83      1.00      0.91         5\n       Fraud       1.00      0.80      0.89         5\n\n    accuracy                           0.90        10\nROC-AUC Score: 0.9600`
        },
        notes: ["Use Optuna for Bayesian hyperparameter search to converge faster than exhaustive GridSearch."],
        commonMistakes: [{ title: "Evaluating imbalanced models with accuracy alone", desc: "A model predicting all 0s achieves 99% accuracy on a 1% positive dataset while catching zero positives." }],
        tryIt: { prompt: "Stratified K-Fold cross validation split:", code: `from sklearn.model_selection import StratifiedKFold\nskf = StratifiedKFold(n_splits=5)`, hint: "Maintains class balance in each fold." }
      }
    ]
  },

  // ML-6: Unsupervised Learning
  {
    id: "mod-ml-6",
    track: "ml",
    moduleNumber: 6,
    title: "Unsupervised Learning: K-Means & PCA",
    slug: "unsupervised-learning",
    category: "Classical Machine Learning",
    categoryId: "classical-ml",
    description: "K-Means centroid clustering, Elbow method, Silhouette score, DBSCAN density clustering, and PCA dimensionality reduction.",
    lessonsCount: 1,
    xpReward: 250,
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-ml-6-1",
        title: "Centroid Clustering & Dimensionality Reduction",
        description: "Discover hidden segmentations in unlabelled customer data and project 100D vectors into 2D.",
        duration: "15 min",
        quizId: "quiz-ml-6-1",
        concept: `Unsupervised learning finds structural patterns in unlabelled datasets:
1. **K-Means Clustering**: Assigns points to $K$ cluster centroids iteratively minimizing inertia (sum of squared distances).
2. **PCA (Principal Component Analysis)**: Rotates high-dimensional feature space onto orthogonal axes that maximize variance, compressing feature dimensions with minimal information loss.`,
        keyPoints: [
          "Standardize features before PCA; otherwise large numerical scale features dominate variance calculations.",
          "Elbow curve plots inertia versus K to find the inflection point of diminishing returns."
        ],
        codeExample: {
          filename: "pca_kmeans.py",
          code: `from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import numpy as np

X = np.random.rand(100, 20) # 100 samples, 20 features

# Reduce to 2 Principal Components
pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X)

# Cluster into 3 groups
kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X_reduced)
print(f"Explained Variance Ratio: {pca.explained_variance_ratio_.sum():.2%}")
print(f"Cluster Distribution: {np.bincount(labels)}")`,
          output: `Explained Variance Ratio: 24.85%\nCluster Distribution: [34 33 33]`
        },
        notes: ["DBSCAN detects arbitrary shape clusters and automatically flags outliers without requiring K."],
        commonMistakes: [{ title: "Running PCA on unstandardized data", desc: "A feature measured in millions (e.g. salary) will dominate the first principal component over features measured in single digits (e.g. age)." }],
        tryIt: { prompt: "Fit PCA with 95% preserved variance:", code: `pca = PCA(n_components=0.95)`, hint: "Automatically selects the number of dimensions needed to retain 95% information." }
      }
    ]
  },

  // ML-7: Deep Learning Foundations
  {
    id: "mod-ml-7",
    track: "ml",
    moduleNumber: 7,
    title: "Neural Networks & Deep Learning Foundations",
    slug: "neural-networks-foundations",
    category: "Deep Learning & PyTorch",
    categoryId: "deep-learning",
    description: "Multilayer Perceptrons (MLP), Forward Propagation, Activation Functions (ReLU, GELU, Softmax), Backpropagation with Chain Rule.",
    lessonsCount: 2,
    xpReward: 300,
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    lessons: [
      {
        id: "lesson-ml-7-1",
        title: "Feedforward Networks, Non-Linearities & Backprop",
        description: "Understand matrix weight transformations and computational graph derivatives.",
        duration: "20 min",
        quizId: "quiz-ml-7-1",
        concept: `Deep Neural Networks approximate arbitrary non-linear mathematical mappings:
- **Layer Transformation**: $z = Wx + b$, $a = \\sigma(z)$
- **Non-Linear Activations**: Without non-linear activations (ReLU, GELU, Sigmoid), stacking multiple dense layers collapses mathematically into a single linear matrix multiplication.
- **Backpropagation**: Calculates $\\frac{\\partial L}{\\partial W}$ through recursive application of the calculus Chain Rule from output to input layers.`,
        keyPoints: [
          "ReLU ($max(0, x)$) solves vanishing gradient problems in deep layers compared to Sigmoid/Tanh.",
          "Softmax converts unnormalized logit vectors into valid probability distributions summing to 1.0."
        ],
        codeExample: {
          filename: "forward_pass.py",
          code: `import numpy as np

def relu(z): return np.maximum(0, z)
def softmax(z):
    exp_z = np.exp(z - np.max(z))
    return exp_z / exp_z.sum(axis=-1, keepdims=True)

# 2-Layer Forward Pass
x = np.array([[1.0, 2.0]])         # Input (1, 2)
W1 = np.random.randn(2, 4)         # Hidden (2, 4)
W2 = np.random.randn(4, 3)         # Output (4, 3)

h = relu(x @ W1)                   # Hidden activation
logits = h @ W2
probs = softmax(logits)

print("Class Probabilities:", probs)
print("Sum of Probabilities:", np.sum(probs))`,
          output: `Class Probabilities: [[0.184 0.621 0.195]]\nSum of Probabilities: 1.0`
        },
        notes: ["GELU (Gaussian Error Linear Unit) is the standard activation function in modern Transformer architectures (GPT, BERT)."],
        commonMistakes: [{ title: "Using Sigmoid activation in deep hidden layers", desc: "Sigmoid derivatives saturate near 0 for large inputs, causing vanishing gradients and stalling training." }],
        tryIt: { prompt: "Binary Cross-Entropy Loss computation:", code: `loss = -(y * np.log(p) + (1 - y) * np.log(1 - p))`, hint: "Standard loss for binary classification probability outputs." }
      }
    ]
  },

  // ML-8: PyTorch & Tensors
  {
    id: "mod-ml-8",
    track: "ml",
    moduleNumber: 8,
    title: "PyTorch & Deep Learning Tensor Pipelines",
    slug: "pytorch-tensors",
    category: "Deep Learning & PyTorch",
    categoryId: "deep-learning",
    description: "Torch Tensors, GPU CUDA acceleration, Autograd automatic differentiation, nn.Module, DataLoader, and custom training loops.",
    lessonsCount: 2,
    xpReward: 300,
    difficulty: "Advanced",
    estimatedMinutes: 40,
    lessons: [
      {
        id: "lesson-ml-8-1",
        title: "PyTorch nn.Module, Autograd & Training Loop",
        description: "Build robust PyTorch architectures with forward methods and AdamW optimizers.",
        duration: "20 min",
        quizId: "quiz-ml-8-1",
        concept: `PyTorch is the premier research and production deep learning framework:
1. **Tensors & CUDA**: \`tensor.to('cuda')\` shifts computations to NVIDIA GPU tensor cores.
2. **Autograd**: Tracks computational history via \`requires_grad=True\` to compute derivatives on \`loss.backward()\`.
3. **Training Steps**:
   - \`optimizer.zero_grad()\`: Clears accumulated gradients.
   - \`output = model(inputs)\`: Forward pass.
   - \`loss = criterion(output, targets)\`: Loss calculation.
   - \`loss.backward()\`: Computes parameter gradients.
   - \`optimizer.step()\`: Updates weights.`,
        keyPoints: [
          "Always call optimizer.zero_grad() at the beginning of each batch; otherwise PyTorch accumulates gradients across steps.",
          "Use model.eval() and with torch.no_grad(): during validation to disable Dropout and stop tracking Autograd memory."
        ],
        codeExample: {
          filename: "pytorch_classifier.py",
          code: `import torch
import torch.nn as nn
import torch.optim as optim

class DeepClassifier(nn.Module):
    def __init__(self, in_features, num_classes):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, 64),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(64, num_classes)
        )
    def forward(self, x):
        return self.net(x)

model = DeepClassifier(10, 2)
optimizer = optim.AdamW(model.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

# Single Batch Step
x = torch.randn(32, 10)
y = torch.randint(0, 2, (32,))

optimizer.zero_grad()
loss = criterion(model(x), y)
loss.backward()
optimizer.step()

print(f"Batch Loss: {loss.item():.4f}")`,
          output: `Batch Loss: 0.6942`
        },
        notes: ["CrossEntropyLoss in PyTorch combines nn.LogSoftmax and nn.NLLLoss; do not add Softmax to your final model layer."],
        commonMistakes: [{ title: "Forgetting to zero gradients before backpropagation", desc: "PyTorch gradients sum by default. Forgetting optimizer.zero_grad() causes exploding gradients across epochs." }],
        tryIt: { prompt: "Disable Autograd for fast GPU inference:", code: `with torch.inference_mode():\n    preds = model(x)`, hint: "inference_mode is faster and uses less memory than torch.no_grad()." }
      }
    ]
  },

  // ML-9: Computer Vision & CNNs
  {
    id: "mod-ml-9",
    track: "ml",
    moduleNumber: 9,
    title: "Computer Vision: CNNs & Transfer Learning",
    slug: "computer-vision-cnns",
    category: "Deep Learning & PyTorch",
    categoryId: "deep-learning",
    description: "2D Convolutions, Kernel Filters, Max Pooling, ResNet Residual Skip Connections, and Vision Transformers (ViT).",
    lessonsCount: 1,
    xpReward: 250,
    difficulty: "Advanced",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-ml-9-1",
        title: "Convolutional Layers & ResNet Architectures",
        description: "Learn spatial feature extraction, receptive fields, and residual skip connections.",
        duration: "15 min",
        quizId: "quiz-ml-9-1",
        concept: `Convolutional Neural Networks (CNNs) preserve 2D spatial pixel relationships:
- **Kernel / Filter**: Slides over images computing dot products, capturing edges, textures, and object parts.
- **Pooling**: Reduces spatial dimensions (H, W) while retaining dominant feature activations.
- **Residual Skip Connections (ResNet)**: $F(x) + x$ allows gradients to flow directly backward without attenuation, enabling models over 100+ layers deep.`,
        keyPoints: [
          "Transfer learning reuses pre-trained ImageNet feature backbones, fine-tuning only final classification heads.",
          "Data augmentation (random crop, horizontal flip, color jitter) prevents overfitting on visual datasets."
        ],
        codeExample: {
          filename: "cnn_module.py",
          code: `import torch
import torch.nn as nn

class ConvBlock(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, padding=1)
        self.bn = nn.BatchNorm2d(32)
        self.relu = nn.ReLU()
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2)

    def forward(self, x):
        return self.pool(self.relu(self.bn(self.conv(x))))

img = torch.randn(8, 3, 64, 64) # Batch 8, 3 Channels, 64x64
block = ConvBlock()
out = block(img)
print("Output Feature Map Shape:", out.shape)`,
          output: `Output Feature Map Shape: torch.Size([8, 32, 32, 32])`
        },
        notes: ["BatchNorm2d stabilizes training dynamics by normalizing intermediate channel activations."],
        commonMistakes: [{ title: "Using dense linear layers directly on raw high-resolution images", desc: "A dense layer on a 1080p RGB image requires hundreds of millions of weights per neuron; CNNs share local weights." }],
        tryIt: { prompt: "Load pretrained ResNet50 in PyTorch:", code: `import torchvision.models as models\nmodel = models.resnet50(weights='DEFAULT')`, hint: "Loads ImageNet-1k pre-trained weights." }
      }
    ]
  },

  // ML-10: NLP & Word Embeddings
  {
    id: "mod-ml-10",
    track: "ml",
    moduleNumber: 10,
    title: "NLP: Tokenization, Word2Vec & LSTMs",
    slug: "nlp-embeddings",
    category: "NLP & Transformers",
    categoryId: "nlp-transformers",
    description: "Byte-Pair Encoding (BPE), Word2Vec, Dense Embeddings, Cosine Similarity, Recurrent Neural Networks (RNN/LSTM).",
    lessonsCount: 1,
    xpReward: 250,
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-ml-10-1",
        title: "Subword Tokenization & Semantic Vector Spaces",
        description: "Map human language tokens into continuous vector spaces where semantic proximity equates to geometric closeness.",
        duration: "15 min",
        quizId: "quiz-ml-10-1",
        concept: `Natural Language Processing transforms text into dense vector representations:
1. **Tokenization (BPE/WordPiece)**: Breaks strings into subword tokens handling unknown vocabulary gracefully.
2. **Dense Embeddings**: Maps discrete token IDs into continuous vectors (e.g. 768-dimensional space) where $\\vec{King} - \\vec{Man} + \\vec{Woman} \\approx \\vec{Queen}$.
3. **Cosine Similarity**: Measures directional alignment between embedding vectors regardless of magnitude:
   $$Cosine(u, v) = \\frac{u \\cdot v}{\\|u\\| \\|v\\|}$$`,
        keyPoints: [
          "Dot product of L2-normalized vectors is mathematically identical to Cosine Similarity.",
          "Subword tokenization prevents Out-of-Vocabulary (OOV) errors by decomposing rare words into sub-morphemes."
        ],
        codeExample: {
          filename: "embedding_similarity.py",
          code: `import torch
import torch.nn.functional as F

# Simulated Semantic Vector Embeddings
v_java = F.normalize(torch.tensor([0.9, 0.8, 0.1]), p=2, dim=0)
v_spring = F.normalize(torch.tensor([0.85, 0.88, 0.15]), p=2, dim=0)
v_apple = F.normalize(torch.tensor([0.1, 0.2, 0.95]), p=2, dim=0)

sim_java_spring = F.cosine_similarity(v_java.unsqueeze(0), v_spring.unsqueeze(0)).item()
sim_java_apple = F.cosine_similarity(v_java.unsqueeze(0), v_apple.unsqueeze(0)).item()

print(f"Similarity (Java vs Spring Boot): {sim_java_spring:.4f}")
print(f"Similarity (Java vs Apple Fruit): {sim_java_apple:.4f}")`,
          output: `Similarity (Java vs Spring Boot): 0.9942\nSimilarity (Java vs Apple Fruit): 0.3120`
        },
        notes: ["LSTMs introduced input, forget, and output gates to mitigate vanishing gradients in vanilla RNNs."],
        commonMistakes: [{ title: "Using Euclidean distance instead of Cosine similarity on unnormalized embeddings", desc: "Longer documents can produce larger vector magnitudes; Cosine similarity measures angle/meaning rather than length." }],
        tryIt: { prompt: "PyTorch Embedding Layer instantiation:", code: `emb = nn.Embedding(num_embeddings=30000, embedding_dim=768)`, hint: "Lookup table storing 30,000 vocabulary vectors of dimension 768." }
      }
    ]
  },

  // ML-11: Transformers Architecture
  {
    id: "mod-ml-11",
    track: "ml",
    moduleNumber: 11,
    title: "Transformers: Self-Attention & Multi-Head Math",
    slug: "transformers-attention",
    category: "NLP & Transformers",
    categoryId: "nlp-transformers",
    description: "Scaled Dot-Product Attention, Queries, Keys, Values (Q, K, V), Multi-Head Attention, RoPE (Rotary Position Embeddings), and Decoder-only LLMs.",
    lessonsCount: 2,
    xpReward: 350,
    difficulty: "Advanced",
    estimatedMinutes: 45,
    lessons: [
      {
        id: "lesson-ml-11-1",
        title: "Scaled Dot-Product Attention & Multi-Head Mechanism",
        description: "Master the mathematical engine driving modern Generative AI: Attention(Q, K, V).",
        duration: "20 min",
        quizId: "quiz-ml-11-1",
        concept: `The Transformer architecture replaces recurrent sequences with parallel Self-Attention:
$$Attention(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$
Where:
- $Q$ (Query): What this token is looking for.
- $K$ (Key): What this token contains.
- $V$ (Value): The actual information content payload.
- $\\sqrt{d_k}$: Scaling factor preventing softmax gradients from vanishing for large vector dimensions.`,
        keyPoints: [
          "Causal Attention Masking sets upper-triangle attention weights to $-\\infty$ to prevent tokens from cheating by looking ahead into future tokens during generation.",
          "Multi-Head Attention projects Q, K, V into multiple subspaces, allowing the model to attend simultaneously to syntax, semantics, and coreferences."
        ],
        codeExample: {
          filename: "self_attention_math.py",
          code: `import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    scores = (Q @ K.transpose(-2, -1)) / (d_k ** 0.5)
    
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
        
    weights = F.softmax(scores, dim=-1)
    return weights @ V, weights

# Batch 1, Sequence Length 3, Dim 4
Q = torch.randn(1, 3, 4)
K = torch.randn(1, 3, 4)
V = torch.randn(1, 3, 4)

out, weights = scaled_dot_product_attention(Q, K, V)
print("Attention Output Shape:", out.shape)
print("Attention Matrix:\\n", weights[0])`,
          output: `Attention Output Shape: torch.Size([1, 3, 4])\nAttention Matrix:\n tensor([[0.281, 0.412, 0.307],\n        [0.198, 0.514, 0.288],\n        [0.342, 0.211, 0.447]])`
        },
        notes: ["FlashAttention accelerates Transformer execution by tiling QKV computations directly in high-speed GPU SRAM."],
        commonMistakes: [{ title: "Omitting the sqrt(d_k) scaling factor", desc: "For large dimensions d_k, dot products grow large, pushing Softmax into regions with near-zero gradients (vanishing gradient)." }],
        tryIt: { prompt: "Causal lower-triangular attention mask:", code: `mask = torch.tril(torch.ones(seq_len, seq_len))`, hint: "Enforces autoregressive unidirectional attention in LLMs." }
      }
    ]
  },

  // ML-12: LLMs & Prompt Engineering
  {
    id: "mod-ml-12",
    track: "ml",
    moduleNumber: 12,
    title: "LLMs, Prompt Engineering & LangChain",
    slug: "llms-langchain",
    category: "GenAI, LLMs & RAG",
    categoryId: "genai-llms",
    description: "System prompts, Few-shot prompting, Chain-of-Thought (CoT), LangChain/LlamaIndex pipelines, Structured Outputs, and Tool Calling Agents.",
    lessonsCount: 2,
    xpReward: 300,
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-ml-12-1",
        title: "Few-Shot Prompting, Function Calling & Agents",
        description: "Direct LLMs with deterministic JSON schemas, reasoning chains, and external tool execution.",
        duration: "15 min",
        quizId: "quiz-ml-12-1",
        concept: `Prompt Engineering and LLM orchestration bridge models to production software:
1. **Chain-of-Thought (CoT)**: Encourages step-by-step reasoning ("Think step by step") before outputting conclusions.
2. **Function Calling / Tool Use**: LLM outputs a structured JSON function payload matching a developer's API schema. The application executes the tool and feeds results back to the LLM.
3. **Structured Outputs**: Enforcing Pydantic / JSON schema guarantees to avoid hallucinated formatting.`,
        keyPoints: [
          "Temperature controls stochasticity: 0.0 for deterministic classification/extraction, 0.7-1.0 for creative generation.",
          "System messages anchor security bounds against prompt injection attacks."
        ],
        codeExample: {
          filename: "tool_calling_schema.py",
          code: `import json

tool_schema = {
    "name": "fetch_user_quiz_stats",
    "description": "Fetches completed modules and streak score for user",
    "parameters": {
        "type": "object",
        "properties": {
            "user_id": {"type": "string", "description": "Unique UUID of user"},
            "track": {"type": "string", "enum": ["java", "ml"]}
        },
        "required": ["user_id"]
    }
}

# Simulated LLM Tool Call Decision
llm_response = {
    "role": "assistant",
    "tool_calls": [{
        "function": {"name": "fetch_user_quiz_stats", "arguments": "{\\"user_id\\": \\"usr-84\\", \\"track\\": \\"ml\\"}"}
    }]
}

args = json.loads(llm_response["tool_calls"][0]["function"]["arguments"])
print("Executed Tool Call with Arguments:", args)`,
          output: `Executed Tool Call with Arguments: {'user_id': 'usr-84', 'track': 'ml'}`
        },
        notes: ["ReAct (Reason + Act) agents cycle between reasoning thoughts, taking tool actions, and observing outputs."],
        commonMistakes: [{ title: "Relying on regex to parse unstructured LLM strings", desc: "Use schema-enforced Tool Calling or Outlines/Instructor libraries to guarantee valid JSON outputs." }],
        tryIt: { prompt: "Enforce JSON output in system prompt:", code: `Respond exclusively in valid RFC 8259 JSON format matching schema: { "result": str }`, hint: "Combined with temperature=0.0." }
      }
    ]
  },

  // ML-13: Vector DBs & RAG
  {
    id: "mod-ml-13",
    track: "ml",
    moduleNumber: 13,
    title: "Vector Databases & Production RAG Pipelines",
    slug: "vector-dbs-rag",
    category: "GenAI, LLMs & RAG",
    categoryId: "genai-llms",
    description: "Chunking strategies (Recursive, Semantic), Vector Databases (Chroma, PgVector, Qdrant), Hybrid Search (BM25 + Dense), and Re-ranking.",
    lessonsCount: 2,
    xpReward: 300,
    difficulty: "Advanced",
    estimatedMinutes: 40,
    lessons: [
      {
        id: "lesson-ml-13-1",
        title: "Chunking, Vector Search & Cross-Encoder Re-ranking",
        description: "Build enterprise RAG pipelines that prevent hallucinations on private knowledge bases.",
        duration: "20 min",
        quizId: "quiz-ml-13-1",
        concept: `Retrieval-Augmented Generation (RAG) grounds LLMs with external factual context:
1. **Document Ingestion**: Split documents into overlapping chunks (e.g. 512 tokens with 50-token overlap).
2. **Dense Vector Indexing**: Convert chunks into embeddings using models like \`text-embedding-3-small\` and index in Vector DB (HNSW graph).
3. **Retrieval & Re-ranking**: Retrieve Top-20 candidates via Cosine similarity, then re-rank with a Cross-Encoder to pass Top-5 most relevant chunks to the LLM prompt.`,
        keyPoints: [
          "Hybrid search combines keyword BM25 search (exact acronym matches) with dense vector search (semantic concepts).",
          "Include document metadata (source URL, chapter, last_modified) inside chunk headers."
        ],
        codeExample: {
          filename: "rag_pipeline.py",
          code: `import numpy as np

def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Vector database chunk embeddings
chunks = [
    ("Chunk 1: Java 21 Virtual Threads execute on carrier threads.", np.array([0.9, 0.2, 0.1])),
    ("Chunk 2: XGBoost utilizes gradient boosting on residual trees.", np.array([0.1, 0.8, 0.3])),
    ("Chunk 3: PyTorch nn.Module encapsulates trainable parameters.", np.array([0.2, 0.7, 0.6]))
]

query_embedding = np.array([0.15, 0.75, 0.55]) # "How does PyTorch train models?"

# Compute similarity rankings
ranked = sorted(chunks, key=lambda c: cosine_sim(query_embedding, c[1]), reverse=True)

print("Top Retrieved Context Chunk:")
print(ranked[0][0])`,
          output: `Top Retrieved Context Chunk:\nChunk 3: PyTorch nn.Module encapsulates trainable parameters.`
        },
        notes: ["HNSW (Hierarchical Navigable Small World) is the fastest approximate nearest neighbor vector indexing algorithm."],
        commonMistakes: [{ title: "Using chunk sizes that are too small or too large", desc: "Tiny chunks lack necessary context; huge chunks dilute embedding precision and exceed LLM context window limits." }],
        tryIt: { prompt: "RAG Prompt Template with retrieved context:", code: `Answer question using ONLY the provided context:\\nContext: {context}\\nQuestion: {query}`, hint: "Explicitly penalizes ungrounded hallucination." }
      }
    ]
  },

  // ML-14: Fine-Tuning LLMs
  {
    id: "mod-ml-14",
    track: "ml",
    moduleNumber: 14,
    title: "Fine-Tuning LLMs: LoRA, QLoRA & SFT",
    slug: "finetuning-lora-qlora",
    category: "GenAI, LLMs & RAG",
    categoryId: "genai-llms",
    description: "Supervised Fine-Tuning (SFT), LoRA (Low-Rank Adaptation), QLoRA (4-bit NormalFloat), Hugging Face TRL SFTTrainer, and DPO.",
    lessonsCount: 1,
    xpReward: 300,
    difficulty: "Advanced",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-ml-14-1",
        title: "Parameter-Efficient Fine-Tuning with LoRA & QLoRA",
        description: "Fine-tune 8B-70B parameter models on consumer GPUs by decomposing weight update matrices.",
        duration: "15 min",
        quizId: "quiz-ml-14-1",
        concept: `Full fine-tuning of 70B parameter models requires terabytes of VRAM. **LoRA (Low-Rank Adaptation)** solves this:
- Freezes base model weights $W_0 \\in \\mathbb{R}^{d \\times k}$.
- Injects trainable low-rank decomposition matrices $A \\in \\mathbb{R}^{r \\times k}$ and $B \\in \\mathbb{R}^{d \\times r}$ where $r \\ll \\min(d, k)$:
  $$W = W_0 + \\frac{\\alpha}{r} (B \\cdot A)$$
- **QLoRA**: Quantizes frozen base weights to 4-bit NormalFloat (NF4), allowing an 8B model to fine-tune on a single 16GB VRAM GPU.`,
        keyPoints: [
          "LoRA reduces trainable parameter count by over 99% with virtually zero loss in performance.",
          "Targeting all linear projection layers (q_proj, k_proj, v_proj, o_proj, gate_proj) yields highest fine-tuning quality."
        ],
        codeExample: {
          filename: "peft_lora_config.py",
          code: `from peft import LoraConfig, TaskType

lora_config = LoraConfig(
    r=16,                         # Rank dimension
    lora_alpha=32,                # Scaling factor
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM
)

print(f"LoRA Target Rank: {lora_config.r}")
print(f"Target Modules: {lora_config.target_modules}")`,
          output: `LoRA Target Rank: 16\nTarget Modules: ['q_proj', 'v_proj', 'k_proj', 'o_proj']`
        },
        notes: ["Direct Preference Optimization (DPO) aligns models to human preferences directly without training complex RLHF reward models."],
        commonMistakes: [{ title: "Setting rank 'r' excessively high", desc: "Setting r=256 increases memory footprint without significant accuracy gains over r=16 or r=32." }],
        tryIt: { prompt: "Merge LoRA adapter weights back into base model for deployment:", code: `model = model.merge_and_unload()`, hint: "Produces a single standalone checkpoint with zero inference latency overhead." }
      }
    ]
  },

  // ML-15: MLOps & Model Deployment
  {
    id: "mod-ml-15",
    track: "ml",
    moduleNumber: 15,
    title: "MLOps, ONNX Runtime & FastAPI Serving",
    slug: "mlops-model-serving",
    category: "MLOps & Model Serving",
    categoryId: "mlops",
    description: "Exporting models to ONNX/TensorRT, low-latency FastAPI inference servers, Docker containerization, MLflow tracking, and data drift monitoring.",
    lessonsCount: 1,
    xpReward: 250,
    difficulty: "Advanced",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-ml-15-1",
        title: "Model Quantization, Fast Inference & Production Serving",
        description: "Deploy PyTorch/Scikit-Learn models to high-throughput asynchronous microservices.",
        duration: "15 min",
        quizId: "quiz-ml-15-1",
        concept: `MLOps establishes automated lifecycles for machine learning models in production:
1. **Model Serialization**: Exporting PyTorch models to ONNX (Open Neural Network Exchange) enables hardware acceleration on CPU/GPU without Python runtime dependencies.
2. **Asynchronous Serving (FastAPI)**: Non-blocking HTTP endpoints executing batched tensor inferences.
3. **Drift Detection**: Monitoring statistical divergence (Evidently AI, Kolmogorov-Smirnov test) between training data and real-time production input features.`,
        keyPoints: [
          "Dynamic batching combines multiple concurrent client requests into a single GPU matrix multiplication, multiplying throughput.",
          "Track experiment metrics, model artifacts, and hyperparameters with MLflow / Weights & Biases."
        ],
        codeExample: {
          filename: "fastapi_ml_server.py",
          code: `from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np

app = FastAPI(title="DevHub ML Inference API")

class PredictionRequest(BaseModel):
    features: list[float]

# Simulated Model Weights
W = np.array([0.5, -0.2, 0.8, 0.1])
b = 0.3

@app.post("/predict")
async def predict(req: PredictionRequest):
    x = np.array(req.features)
    score = float(x @ W + b)
    return {"prediction_score": score, "status": "SUCCESS"}`,
          output: `POST /predict {"features": [1.0, 2.0, 3.0, 4.0]} -> {"prediction_score": 3.2, "status": "SUCCESS"}`
        },
        notes: ["vLLM and TensorRT-LLM provide PagedAttention for serving multi-user LLM workloads at 10x lower latency."],
        commonMistakes: [{ title: "Loading model weights inside the request handler function", desc: "Loading weights on every HTTP request adds seconds of disk I/O latency. Load models once in app lifespan startup." }],
        tryIt: { prompt: "Health check endpoint for Kubernetes liveness:", code: `@app.get('/health')\ndef health(): return {'status': 'healthy'}`, hint: "Ensures container orchestrator routes traffic only to loaded model instances." }
      }
    ]
  }
];
