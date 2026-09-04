export const INITIAL_USER = {
  id: "user-devhub-1",
  name: "Alex Rivera",
  username: "alex_dev",
  email: "alex@devhub.io",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  role: "Full Stack Java & AI Engineer",
  joinedDate: "January 2026",
  streak: 7,
  totalXp: 850,
  level: 4,
  levelTitle: "Code Architect",
  rank: "#42 Global",
  quizAccuracy: 92,
  completedLessons: ["lesson-1-1", "lesson-1-2", "lesson-2-1"],
  completedModules: ["mod-1"],
  completedQuizzes: {
    "quiz-1-1": { score: 100, attempts: 1, date: "2026-08-28" },
    "quiz-2-1": { score: 100, attempts: 1, date: "2026-08-29" },
    "quiz-3-1": { score: 85, attempts: 1, date: "2026-08-30" },
  },
  recentLesson: {
    id: "lesson-1-1",
    moduleId: "mod-1",
    title: "OOP, Records & Pattern Matching in Java 21",
    moduleTitle: "Core Java",
    progressPercent: 100,
    estimatedMinutes: 15
  },
  recommendedLesson: {
    id: "lesson-25-1",
    moduleId: "mod-25",
    title: "DeepSeek Open Source with Ollama & Spring AI",
    moduleTitle: "Spring AI & GenAI",
    duration: "15 min",
    xp: 300
  },
  activityHistory: [
    { day: "Mon", fullDate: "Aug 25", xp: 120, quizzesTaken: 2, hoursSpent: 0.8 },
    { day: "Tue", fullDate: "Aug 26", xp: 180, quizzesTaken: 3, hoursSpent: 1.2 },
    { day: "Wed", fullDate: "Aug 27", xp: 90, quizzesTaken: 1, hoursSpent: 0.6 },
    { day: "Thu", fullDate: "Aug 28", xp: 210, quizzesTaken: 4, hoursSpent: 1.5 },
    { day: "Fri", fullDate: "Aug 29", xp: 150, quizzesTaken: 2, hoursSpent: 1.0 },
    { day: "Sat", fullDate: "Aug 30", xp: 260, quizzesTaken: 5, hoursSpent: 2.1 },
    { day: "Sun", fullDate: "Aug 31", xp: 190, quizzesTaken: 3, hoursSpent: 1.4 },
  ],
  topicMastery: {
    strong: [
      { name: "Java 21 Records & Pattern Matching", score: 96, category: "Core Java & DSA" },
      { name: "Spring Boot REST & Validation", score: 94, category: "Spring Boot" },
      { name: "Spring Security & JWT Filter", score: 92, category: "Security & Auth" },
      { name: "Docker Multi-Stage Optimization", score: 90, category: "DevOps & Cloud" }
    ],
    weak: [
      { name: "Kafka Partition Rebalancing", score: 68, category: "Microservices & Kafka" },
      { name: "Ansible Handler Trigger Rules", score: 72, category: "DevOps & Cloud" },
      { name: "Terraform State Locking Mechanics", score: 74, category: "DevOps & Cloud" }
    ]
  },
  badges: [
    { id: "b1", title: "7-Day Ignition", desc: "Maintained a 7-day learning streak across 31 modules", icon: "Flame", tier: "Gold", unlocked: true },
    { id: "b2", title: "Java 21 Pioneer", desc: "Completed Modern Core Java & Virtual Threads", icon: "Cpu", tier: "Gold", unlocked: true },
    { id: "b3", title: "Spring AI Explorer", desc: "Integrated local DeepSeek LLM with Ollama", icon: "Brain", tier: "Platinum", unlocked: true },
    { id: "b4", title: "Kafka Streamer", desc: "Built event-driven consumer groups with DLQ", icon: "Zap", tier: "Silver", unlocked: true },
    { id: "b5", title: "Cloud Architect", desc: "Master Terraform and Kubernetes container probes", icon: "Layers", tier: "Bronze", unlocked: false },
  ]
};
