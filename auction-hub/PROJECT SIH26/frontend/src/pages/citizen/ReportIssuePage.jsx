import React, { useState } from 'react';
import { 
  FileText, Camera, MapPin, CheckCircle2, AlertTriangle, 
  ArrowRight, ShieldCheck, Upload, AlertOctagon 
} from 'lucide-react';
import { CITIZEN_PROJECTS_DATA } from '../../data/mockData';

export default function ReportIssuePage({ onNavigate }) {
  const [selectedProjectId, setSelectedProjectId] = useState(CITIZEN_PROJECTS_DATA[0].id);
  const [category, setCategory] = useState('Work incomplete');
  const [description, setDescription] = useState('Contractor claimed 80% work done, but only stone gravel has been dumped. No tar or bitumen laid. Road is impassable during rains.');
  const [locationTag, setLocationTag] = useState('Namkum, Ranchi (23.3441° N, 85.3096° E)');
  const [submitted, setSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('GRV-JH-2026-9812');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = `GRV-JH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedId(newId);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-5 shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Citizen Grievance Registered Successfully</h2>
          <p className="text-xs text-slate-500">
            Unique Complaint Tracking ID: <strong className="font-mono text-emerald-800 text-sm">{generatedId}</strong>
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2 text-slate-700">
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="text-slate-500">Project Reference:</span>
            <span className="font-mono font-bold">{selectedProjectId}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="text-slate-500">Issue Category:</span>
            <span className="font-semibold text-amber-800">{category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Credibility Score Assigned:</span>
            <span className="font-bold text-emerald-700">85 / 100 (Verified Resident)</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 italic">
          "Your report has been submitted for verification. You will be notified at each lifecycle milestone."
        </p>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('citizen-tracker')}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs"
          >
            Track Grievance Status
          </button>
          <button
            onClick={() => onNavigate('citizen-home')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
          >
            Citizen Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Screen 14: Citizen Grievance & Counter-Photo Filing</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            Report Project Discrepancy or Irregularity
          </h2>
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
          Credibility-Weighted
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5 text-xs">
        
        {/* Project Picker */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Select Sanctioned Project in Your Area</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
          >
            {CITIZEN_PROJECTS_DATA.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id}: {p.name} ({p.location})
              </option>
            ))}
          </select>
        </div>

        {/* 8 Issue Categories */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Issue Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
          >
            <option value="Work not started">1. Work not started (Signboard erected but zero activity)</option>
            <option value="Work delayed">2. Work delayed (Halted execution past milestone date)</option>
            <option value="Poor quality">3. Poor quality (Substandard gravel/cement/bitumen)</option>
            <option value="Work incomplete">4. Work incomplete (Claimed 80% on board, but left halfway)</option>
            <option value="Suspected misuse of funds">5. Suspected misuse of funds / Diverted materials</option>
            <option value="Incorrect project information">6. Incorrect project information</option>
            <option value="Duplicate/reused work">7. Duplicate / reused work previously completed</option>
            <option value="Other irregularity">8. Other ground irregularity</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Detailed Description of Ground Reality</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>

        {/* Location & GPS */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Location Coordinates & Landmark</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={locationTag}
              onChange={(e) => setLocationTag(e.target.value)}
              required
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Photo Upload Box */}
        <div className="p-4 bg-emerald-50/50 border border-dashed border-emerald-300 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-950 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-emerald-700" />
              <span>Upload On-Site Geo-Tagged Counter-Photograph</span>
            </span>
            <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
              ✓ Photo_Evidence_Namkum.jpg (2.8 MB)
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Ensure your photo shows the project site clearly. EXIF GPS coordinates will be verified by the AI system.
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onNavigate('citizen-home')}
            className="px-4 py-2 text-slate-600 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm"
          >
            <span>Submit Report for Verification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
}
