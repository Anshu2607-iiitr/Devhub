import React, { useState } from 'react';
import { 
  Upload, Camera, MapPin, Clock, ShieldCheck, 
  FileText, CheckCircle2, ArrowRight, Sparkles, HardHat 
} from 'lucide-react';
import GovernancePrincipleBanner from '../../components/GovernancePrincipleBanner';

export default function ProgressSubmissionPage({ onNavigate }) {
  const [projectId, setProjectId] = useState('MPLAD-JH-2026-089');
  const [milestone, setMilestone] = useState('Milestone 3: Base Course & WMM Layer');
  const [progressPct, setProgressPct] = useState(80);
  const [description, setDescription] = useState('Completed aggregate grading and mechanical compaction across 3.8 km stretch.');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#123B67] font-bold text-xs uppercase tracking-wider">
            <Upload className="w-4 h-4 text-[#1D5D9B]" />
            <span>Contractor Milestone Submission</span>
          </div>
          <h1 className="text-base font-bold text-[#0F2942] mt-0.5">
            Submit Monthly Progress Evidence & Geo-Tagged Measurement Book
          </h1>
        </div>

        <button
          onClick={() => onNavigate('contractor-ai-verify')}
          className="px-4 py-2 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-2xs"
        >
          <Camera className="w-3.5 h-3.5 text-[#168A78]" />
          <span>Launch Camera AI Verification</span>
        </button>
      </div>

      <GovernancePrincipleBanner />

      {isSubmitted ? (
        <div className="bg-white border border-[#C6E6E1] rounded-xl p-8 text-center space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-[#F0F7F6] text-[#168A78] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-[#0F2942]">Milestone Progress Record Ingested</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your monthly progress submission for <strong className="text-slate-800">{projectId}</strong> has been logged to the verification queue.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('contractor-ai-verify')}
              className="px-4 py-2 bg-[#123B67] text-white font-bold rounded-lg text-xs shadow-2xs"
            >
              Verify Visual Evidence with Camera
            </button>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs"
            >
              Submit Another Milestone
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-[#E4E9EF] rounded-xl p-6 shadow-2xs space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Select Work Contract</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg px-3 py-2 text-xs font-semibold text-[#0F2942] focus:outline-none focus:border-[#1D5D9B]"
              >
                <option value="MPLAD-JH-2026-089">MPLAD-JH-2026-089: Rural Road Upgrade (Namkum)</option>
                <option value="MPLAD-JH-2026-104">MPLAD-JH-2026-104: Community Health Sub-Centre (Murhu)</option>
                <option value="MPLAD-JH-2026-312">MPLAD-JH-2026-312: Deep Borewell & Solar Pump (Dhanbad)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Milestone Target</label>
              <select
                value={milestone}
                onChange={(e) => setMilestone(e.target.value)}
                className="w-full bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg px-3 py-2 text-xs font-semibold text-[#0F2942] focus:outline-none focus:border-[#1D5D9B]"
              >
                <option>Milestone 1: Earthwork & Excavation</option>
                <option>Milestone 2: Subgrade Granular Sub-base</option>
                <option>Milestone 3: Base Course & WMM Layer</option>
                <option>Milestone 4: Bituminous Blacktopping</option>
              </select>
            </div>

          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="font-bold text-slate-700">Claimed Cumulative Physical Progress: <span className="text-[#123B67] font-mono font-extrabold">{progressPct}%</span></label>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progressPct} 
              onChange={(e) => setProgressPct(Number(e.target.value))}
              className="w-full accent-[#123B67]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Work Description & Material Quantities</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-[#1D5D9B]"
              placeholder="Describe executed work, material consumption, and equipment deployed on site..."
            />
          </div>

          <div className="p-4 bg-[#F6F8FB] border border-[#E4E9EF] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#E4E9EF] flex items-center justify-center text-[#1D5D9B]">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0F2942] block">Measurement Book (MB) & Invoice Upload</span>
                <span className="text-[11px] text-slate-400">PDF, scanned MB entries, or lab test certificates (Max 25MB)</span>
              </div>
            </div>
            <button
              type="button"
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs border border-[#E4E9EF]"
            >
              Choose File
            </button>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('contractor-dashboard')}
              className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-bold rounded-lg text-xs shadow-2xs flex items-center gap-1.5"
            >
              <span>Submit Progress Claim</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
