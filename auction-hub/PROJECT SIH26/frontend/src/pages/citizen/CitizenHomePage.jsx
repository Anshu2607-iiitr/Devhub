import React, { useState } from 'react';
import { 
  Users, Search, ShieldCheck, MapPin, Eye, 
  FileText, MessageSquare, ArrowRight, CheckCircle2, Bot, Sparkles, Building, AlertCircle 
} from 'lucide-react';
import { CITIZEN_PROJECTS_DATA } from '../../data/mockData';

export default function CitizenHomePage({ onNavigate, onSearch, lang = 'en' }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch && onSearch(searchQuery);
      onNavigate('citizen-explorer');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white rounded-2xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#34d399_1px,transparent_1px),linear-gradient(to_bottom,#34d399_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Public Digital Infrastructure • MoSPI MPLADS</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            “Monitor Development. Report Issues. Strengthen Transparency.”
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Empowering citizens across 543 Parliamentary Constituencies to monitor local development works, upload geo-tagged counter-photos, and track public funds in real time.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search your area, project name, or constituency (e.g. Ranchi Road)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:bg-white/20 focus:border-emerald-400 transition"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-md flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Search Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* 4 Big Action Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Tile 1: Explore Projects */}
        <div 
          onClick={() => onNavigate('citizen-explorer')}
          className="bg-white border border-slate-200 hover:border-emerald-500 rounded-xl p-5 shadow-xs cursor-pointer transition hover:shadow-md space-y-3 flex flex-col justify-between group"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
              <Building className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
              1. Explore Projects
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Browse sanctioned schools, roads, water supply, and health centres in your ward.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
            <span>View Public Directory</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </span>
        </div>

        {/* Tile 2: Report an Issue */}
        <div 
          onClick={() => onNavigate('citizen-report')}
          className="bg-white border border-slate-200 hover:border-emerald-500 rounded-xl p-5 shadow-xs cursor-pointer transition hover:shadow-md space-y-3 flex flex-col justify-between group"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
              2. Report an Issue
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload geo-tagged counter-photos of stalled, incomplete, or substandard works.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
            <span>Submit Grievance</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </span>
        </div>

        {/* Tile 3: Track Complaint */}
        <div 
          onClick={() => onNavigate('citizen-tracker')}
          className="bg-white border border-slate-200 hover:border-emerald-500 rounded-xl p-5 shadow-xs cursor-pointer transition hover:shadow-md space-y-3 flex flex-col justify-between group"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5 text-purple-700" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
              3. Track Complaint
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track your grievance lifecycle from AI classification to field inspection resolution.
            </p>
          </div>
          <span className="text-xs font-bold text-purple-700 flex items-center gap-1">
            <span>Enter Grievance ID</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </span>
        </div>

        {/* Tile 4: Ask AI Assistant */}
        <div 
          onClick={() => onNavigate('citizen-ai')}
          className="bg-white border border-slate-200 hover:border-emerald-500 rounded-xl p-5 shadow-xs cursor-pointer transition hover:shadow-md space-y-3 flex flex-col justify-between group"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
              4. Citizen AI Assistant
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Chat in Hindi or English to convert your everyday concerns into structured reports.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
            <span>Start AI Conversation</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </span>
        </div>

      </div>

      {/* Featured Community Projects Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Recent MPLADS Works in Jharkhand
            </h3>
            <p className="text-xs text-slate-500">Live verified milestones and public project records</p>
          </div>
          <button
            onClick={() => onNavigate('citizen-explorer')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
          >
            <span>View All Works</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CITIZEN_PROJECTS_DATA.map((p) => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs space-y-3">
              <img src={p.images[0]} alt={p.name} className="w-full h-44 object-cover" />
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500">{p.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${p.status_color}`}>
                    {p.reported_progress}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                <p className="text-xs text-slate-500">{p.location}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{p.approved_amount}</span>
                  <button
                    onClick={() => onNavigate('citizen-explorer')}
                    className="text-emerald-700 font-bold text-xs hover:underline"
                  >
                    Inspect Details ➔
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
