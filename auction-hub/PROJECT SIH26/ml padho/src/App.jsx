import React, { useState, useEffect } from 'react';
import { 
  Menu, ChevronLeft, ChevronRight, CheckCircle2, Bookmark, 
  Share2, Trophy, Flame, Sparkles, BookOpen, HelpCircle, 
  Cpu, RotateCcw, Activity
} from 'lucide-react';
import { EXACT_134_TOPICS } from './data/topicsData';
import { getTopicNotes, getTopicQuiz } from './data/contentRegistry';
import Sidebar from './components/Sidebar';
import NotesViewer from './components/NotesViewer';
import QuizEngine from './components/QuizEngine';
import FlashcardViewer from './components/FlashcardViewer';
import GradientDescentVisualizer from './components/visualizers/GradientDescentVisualizer';
import MetricsCalculator from './components/visualizers/MetricsCalculator';

export default function App() {
  const [currentTopicId, setCurrentTopicId] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('notes'); // 'notes' | 'quiz' | 'flashcards' | 'lab'
  
  // Persistent user state
  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem('mlpadho_completed');
    return saved ? JSON.parse(saved) : [];
  });

  const [topicScores, setTopicScores] = useState(() => {
    const saved = localStorage.getItem('mlpadho_scores');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('mlpadho_completed', JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem('mlpadho_scores', JSON.stringify(topicScores));
  }, [topicScores]);

  const currentTopic = EXACT_134_TOPICS.find(t => t.id === currentTopicId) || EXACT_134_TOPICS[0];
  const topicNotes = getTopicNotes(currentTopicId);
  const topicQuiz = getTopicQuiz(currentTopicId);

  const handleNextTopic = () => {
    if (currentTopicId < 134) {
      setCurrentTopicId(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevTopic = () => {
    if (currentTopicId > 1) {
      setCurrentTopicId(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompleteTopic = (topicId, quizStats) => {
    if (!completedTopics.includes(topicId)) {
      setCompletedTopics(prev => [...prev, topicId]);
    }
    setTopicScores(prev => ({
      ...prev,
      [topicId]: quizStats
    }));
  };

  const progressPercent = ((currentTopicId / 134) * 100).toFixed(1);
  const isCurrentCompleted = completedTopics.includes(currentTopicId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Sidebar for 134 topics */}
      <Sidebar
        topics={EXACT_134_TOPICS}
        currentTopicId={currentTopicId}
        onSelectTopic={(id) => {
          setCurrentTopicId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        completedTopics={completedTopics}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-80 flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur border-b border-slate-800 px-4 py-3 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                    Topic {currentTopicId} / 134
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Progress: {progressPercent}%
                  </span>
                </div>
                <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md md:max-w-xl">
                  {currentTopic.title}
                </h1>
              </div>
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevTopic}
                disabled={currentTopicId === 1}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition"
                title="Previous Topic"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleCompleteTopic(currentTopicId, { scorePct: 100 })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  isCurrentCompleted 
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrentCompleted ? 'text-emerald-400' : ''}`} />
                <span className="hidden sm:inline">{isCurrentCompleted ? 'Completed' : 'Mark Done'}</span>
              </button>

              <button
                onClick={handleNextTopic}
                disabled={currentTopicId === 134}
                className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-30 transition"
                title="Next Topic"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800/80 overflow-x-auto">
            <button
              onClick={() => setActiveView('notes')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'notes'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Notes & Theory
            </button>

            <button
              onClick={() => setActiveView('quiz')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'quiz'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              40 MCQs Quiz
              <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 rounded border border-amber-700">40</span>
            </button>

            <button
              onClick={() => setActiveView('flashcards')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'flashcards'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Active Recall Deck
            </button>

            <button
              onClick={() => setActiveView('lab')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'lab'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Interactive Lab Visualizers
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-5xl mx-auto w-full">
          {activeView === 'notes' && (
            <NotesViewer notes={topicNotes} topicMeta={currentTopic} />
          )}

          {activeView === 'quiz' && (
            <QuizEngine
              topicId={currentTopicId}
              topicTitle={currentTopic.title}
              questions={topicQuiz}
              onCompleteTopic={handleCompleteTopic}
            />
          )}

          {activeView === 'flashcards' && (
            <FlashcardViewer
              topicTitle={currentTopic.title}
              concepts={topicNotes.shortNotes.keyConcepts}
            />
          )}

          {activeView === 'lab' && (
            <div className="space-y-8">
              <GradientDescentVisualizer />
              <MetricsCalculator />
            </div>
          )}
        </main>

        {/* Course Progress Footer bar */}
        <footer className="mt-auto border-t border-slate-900 bg-slate-950/60 p-4 text-center text-xs text-slate-500">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>ML Padho 134-Topic Complete Curriculum Platform</span>
            <span>Current: Topic {currentTopicId} of 134 ({progressPercent}%)</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
