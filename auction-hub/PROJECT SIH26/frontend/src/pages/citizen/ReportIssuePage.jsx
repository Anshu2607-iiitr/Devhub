import React, { useState } from 'react';
import { 
  FileText, Camera, MapPin, Upload, 
  CheckCircle2, ArrowRight, ShieldCheck, AlertOctagon 
} from 'lucide-react';
import GovernancePrincipleBanner from '../../components/GovernancePrincipleBanner';

export default function ReportIssuePage({ onNavigate }) {
  const [projectId, setProjectId] = useState('MPLAD-JH-2026-089');
  const [category, setCategory] = useState('Physical Progress Gap');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('GRV-JH-2026-9812');

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
            <FileText className="w-4 h-4 text-[#1D5D9B]" />
            <span>Citizen Grievance & Counter-Evidence Filing</span>
          </div>
          <h1 className="text-base font-bold text-[#0F2942] mt-0.5">
            Report a Stalled, Incomplete, or Quality Discrepancy Work
          </h1>
        </div>

        <button
          onClick={() => onNavigate('citizen-tracker')}
          className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs transition border border-[#E4E9EF]"
        >
          Track Existing Grievance
        </button>
      </div>

      <GovernancePrincipleBanner />

      {isSubmitted ? (
        <div className="bg-white border border-[#C6E6E1] rounded-xl p-8 text-center space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-[#F0F7F6] text-[#168A78] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-[#0F2942]">Grievance Successfully Lodged</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your report has been assigned Tracking ID: <strong className="text-[#123B67] font-mono text-sm block mt-1">{generatedId}</strong>
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('citizen-tracker')}
              className="px-4 py-2 bg-[#123B67] text-white font-bold rounded-lg text-xs shadow-2xs"
            >
              Track Complaint Lifecycle
            </button>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs"
            >
              Submit Another Report
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-[#E4E9EF] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Select MPLADS Work</label>
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
              <label className="text-xs font-bold text-slate-700 block">Issue Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg px-3 py-2 text-xs font-semibold text-[#0F2942] focus:outline-none focus:border-[#1D5D9B]"
              >
                <option>Physical Progress Gap (Claimed vs Ground Reality)</option>
                <option>Substandard Materials or Poor Quality</option>
                <option>Work Stalled / Abandoned by Contractor</option>
                <option>Signboard Missing / Erroneous Outlay Info</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Detailed Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the ground observations with date and landmark references..."
              className="w-full bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-[#1D5D9B]"
              required
            />
          </div>

          <div className="p-4 bg-[#F6F8FB] border border-[#E4E9EF] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#E4E9EF] flex items-center justify-center text-[#1D5D9B]">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0F2942] block">Upload On-Site Counter Photographs</span>
                <span className="text-[11px] text-slate-400">Geo-tagged photos will automatically be verified against registered GPS boundary</span>
              </div>
            </div>
            <button
              type="button"
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs border border-[#E4E9EF]"
            >
              Choose Photos
            </button>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('citizen-home')}
              className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-bold rounded-lg text-xs shadow-2xs flex items-center gap-1.5"
            >
              <span>Submit Ground Grievance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
