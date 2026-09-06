import React, { useState } from 'react';
import { 
  CheckCircle2, Circle, ChevronRight, Search, 
  BookOpen, Trophy, Sparkles, Filter, Award, ChevronDown
} from 'lucide-react';

export default function Sidebar({ 
  topics, 
  currentTopicId, 
  onSelectTopic, 
  completedTopics, 
  isOpen, 
  onClose 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('All');

  // Extract unique modules
  const modules = ['All', ...new Set(topics.map(t => t.module))];

  const filteredTopics = topics.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toString() === searchQuery.trim();
    const matchesModule = selectedModule === 'All' || t.module === selectedModule;
    return matchesSearch && matchesModule;
  });

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-80 bg-slate-950 border-r border-slate-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } flex flex-col`}>
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-lg shadow-sky-500/20">
              ML
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                ML Padho
                <span className="text-[10px] uppercase font-bold tracking-widest bg-sky-950 text-sky-400 border border-sky-800 px-1.5 py-0.5 rounded">134</span>
              </h1>
              <p className="text-[11px] text-slate-400">Complete 134-Topic ML Syllabus</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        {/* Global Search */}
        <div className="mt-3 relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search all 134 topics, PCA, KNN, MICE..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Module Filter Dropdown */}
        <div className="mt-2">
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 focus:outline-none focus:border-sky-500"
          >
            {modules.map(mod => (
              <option key={mod} value={mod}>{mod}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Topics List Scrollable Container */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredTopics.map((topic) => {
          const isSelected = topic.id === currentTopicId;
          const isCompleted = completedTopics.includes(topic.id);

          return (
            <button
              key={topic.id}
              onClick={() => {
                onSelectTopic(topic.id);
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 group ${
                isSelected
                  ? 'bg-sky-600/20 text-white border border-sky-500/50 shadow-sm'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <div className={`w-4 h-4 rounded-full border text-[9px] font-mono flex items-center justify-center ${
                    isSelected ? 'border-sky-400 text-sky-400 font-bold' : 'border-slate-700 text-slate-500'
                  }`}>
                    {topic.id}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-mono text-slate-400">Day {topic.day}</span>
                  <span className="text-[10px] text-slate-500">•</span>
                  <span className="text-[10px] text-sky-400 truncate">{topic.category}</span>
                </div>
                <div className="text-xs font-medium leading-snug line-clamp-2">
                  {topic.title}
                </div>
              </div>

              <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                isSelected ? 'text-sky-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
              }`} />
            </button>
          );
        })}

        {filteredTopics.length === 0 && (
          <div className="p-6 text-center text-xs text-slate-500">
            No topics matching your filter.
          </div>
        )}
      </div>

      {/* Progress Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 shrink-0">
        <div className="flex items-center justify-between text-[11px] mb-1.5 font-mono">
          <span className="text-slate-400">Course Progress</span>
          <span className="text-sky-400 font-bold">
            {((completedTopics.length / 134) * 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-sky-500 to-emerald-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${(completedTopics.length / 134) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5">
          <span>{completedTopics.length} of 134 Completed</span>
          <span>{134 - completedTopics.length} Remaining</span>
        </div>
      </div>
    </aside>
  );
}
