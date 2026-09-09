import React, { useState } from 'react';
import { 
  Users, Search, FolderKanban, FileText, CheckCircle2, 
  MapPin, Clock, ArrowRight, ShieldCheck, AlertCircle, 
  Building, Sparkles, MessageSquare, Compass 
} from 'lucide-react';
import { CITIZEN_PROJECTS_DATA } from '../../data/mockData';
import GovernancePrincipleBanner from '../../components/GovernancePrincipleBanner';

export default function CitizenHomePage({ onNavigate, onSearch, lang = 'en' }) {
  const [localSearch, setLocalSearch] = useState('');

  return (
    <div className="space-y-6">
      
      {/* Welcoming Citizen Hero */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="max-w-2xl space-y-1.5">
          <div className="flex items-center gap-2 text-[#168A78] font-bold text-xs uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>MPLADS Citizen Transparency Portal</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#0F2942] tracking-tight">
            Monitor Development. Report Issues. Strengthen Transparency.
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Track local Member of Parliament funded public works in your ward, verify photographic evidence, and submit ground feedback.
          </p>
        </div>

        {/* Big Clean Search Input */}
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by Project Name, Sanction ID, or Ward / Village..."
            className="w-full bg-[#F6F8FB] border border-[#E4E9EF] rounded-xl pl-10 pr-24 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1D5D9B] focus:bg-white transition"
          />
          <button 
            onClick={() => onNavigate('citizen-explorer')}
            className="absolute right-1.5 top-1.5 px-3 py-1.5 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-bold rounded-lg text-xs transition"
          >
            Search
          </button>
        </div>
      </div>

      <GovernancePrincipleBanner />

      {/* 4 Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div 
          onClick={() => onNavigate('citizen-explorer')}
          className="bg-white border border-[#E4E9EF] hover:border-slate-300 p-4 rounded-xl shadow-2xs cursor-pointer transition flex flex-col justify-between"
        >
          <div>
            <FolderKanban className="w-5 h-5 text-[#123B67] mb-2" />
            <h2 className="text-xs font-bold text-[#0F2942]">Explore Public Works</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Browse all sanctioned projects in your district.</p>
          </div>
          <span className="text-xs font-bold text-[#1D5D9B] flex items-center gap-1 mt-3">
            Open Directory <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        <div 
          onClick={() => onNavigate('citizen-report')}
          className="bg-white border border-[#E4E9EF] hover:border-[#D0E2F2] p-4 rounded-xl shadow-2xs cursor-pointer transition flex flex-col justify-between"
        >
          <div>
            <FileText className="w-5 h-5 text-[#1D5D9B] mb-2" />
            <h2 className="text-xs font-bold text-[#0F2942]">Report an Issue</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Submit ground feedback with geo-tagged counter photos.</p>
          </div>
          <span className="text-xs font-bold text-[#1D5D9B] flex items-center gap-1 mt-3">
            File Grievance <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        <div 
          onClick={() => onNavigate('citizen-tracker')}
          className="bg-white border border-[#E4E9EF] hover:border-[#C6E6E1] p-4 rounded-xl shadow-2xs cursor-pointer transition flex flex-col justify-between"
        >
          <div>
            <CheckCircle2 className="w-5 h-5 text-[#168A78] mb-2" />
            <h2 className="text-xs font-bold text-[#0F2942]">Track Complaint</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Check real-time statutory review and inspection findings.</p>
          </div>
          <span className="text-xs font-bold text-[#168A78] flex items-center gap-1 mt-3">
            Track Status <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        <div 
          onClick={() => onNavigate('citizen-ai')}
          className="bg-white border border-[#E4E9EF] hover:border-slate-300 p-4 rounded-xl shadow-2xs cursor-pointer transition flex flex-col justify-between"
        >
          <div>
            <MessageSquare className="w-5 h-5 text-[#123B67] mb-2" />
            <h2 className="text-xs font-bold text-[#0F2942]">Citizen AI Assistant</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Ask questions in English or हिन्दी about local schemes.</p>
          </div>
          <span className="text-xs font-bold text-[#123B67] flex items-center gap-1 mt-3">
            Chat with AI <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Nearby Projects in Your Constituency */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div>
            <h2 className="text-sm font-bold text-[#0F2942]">Nearby MPLADS Projects (Ranchi Circle)</h2>
            <p className="text-xs text-slate-500">Public works sanctioned in your immediate vicinity.</p>
          </div>
          <button 
            onClick={() => onNavigate('citizen-explorer')}
            className="text-xs text-[#1D5D9B] font-semibold hover:underline"
          >
            View All Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CITIZEN_PROJECTS_DATA.map((p) => (
            <div key={p.id} className="p-3.5 bg-[#F6F8FB] border border-[#E4E9EF] rounded-xl space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] text-slate-400 font-bold">{p.id}</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white text-[#168A78] border border-[#C6E6E1]">
                  {p.verification_status}
                </span>
              </div>
              <h4 className="font-bold text-[#0F2942] leading-tight">{p.name}</h4>
              <span className="text-[11px] text-slate-500 block">{p.location}</span>
              <div className="flex justify-between pt-1 border-t border-slate-200 text-[11px]">
                <span>Outlay: <strong className="font-mono text-slate-800">{p.approved_amount}</strong></span>
                <span>Progress: <strong className="font-mono text-[#1D5D9B]">{p.reported_progress}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
