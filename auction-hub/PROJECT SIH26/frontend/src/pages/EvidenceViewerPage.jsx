import React from 'react';
import { Image, CheckCircle2, AlertTriangle, MapPin, Calendar, Layers } from 'lucide-react';
import { PRIORITY_RISK_PROJECTS } from '../data/mockData';

export default function EvidenceViewerPage() {
  const allEvidence = PRIORITY_RISK_PROJECTS.flatMap((p) => 
    p.evidence_photos.map((ev) => ({ ...ev, project_name: p.name, project_id: p.id, district: p.district }))
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <Image className="w-5 h-5 text-blue-700" />
            <span>Monthly Progress Evidence Gallery</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Photographic submissions analyzed by Computer Vision for authenticity, location match, and duplicate detection
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono">
          {allEvidence.length} Submissions Archived
        </span>
      </div>

      {/* Comparison Demonstration Card (Previous Month vs Current Month) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider block">
              VISUAL PROGRESS PROGRESSION COMPARISON
            </span>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              MPLAD-JH-2026-089: Rural Road Improvement (Ranchi)
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            Divergence: 45% vs 85.5% Outlay
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="p-2.5 bg-slate-100 font-bold text-xs text-slate-700 flex justify-between">
              <span>PREVIOUS MONTH (July 2026)</span>
              <span className="font-mono text-slate-500">CV Stage: 25%</span>
            </div>
            <img src={PRIORITY_RISK_PROJECTS[0].evidence_photos[1].url} alt="July Progress" className="w-full h-48 object-cover" />
            <div className="p-3 text-xs bg-white space-y-1">
              <span className="text-slate-500 block text-[11px]">Earthwork & clearing completed. Subgrade grading in progress.</span>
              <span className="text-emerald-700 font-bold text-[10px]">✓ GPS Verified (23.3441°N, 85.3096°E)</span>
            </div>
          </div>

          <div className="border border-amber-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="p-2.5 bg-amber-50 font-bold text-xs text-amber-900 flex justify-between">
              <span>CURRENT MONTH (August 2026)</span>
              <span className="font-mono text-amber-800">CV Stage: 45% (Claimed 85.5%)</span>
            </div>
            <img src={PRIORITY_RISK_PROJECTS[0].evidence_photos[0].url} alt="August Progress" className="w-full h-48 object-cover" />
            <div className="p-3 text-xs bg-white space-y-1">
              <span className="text-slate-500 block text-[11px]">Granular base layer partially laid. Bitumen paving not started.</span>
              <span className="text-red-700 font-bold text-[10px]">⚠ Location Deviation 1.42 km from sanction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of All Archived Evidence Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allEvidence.map((ev, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs space-y-2">
            <img src={ev.url} alt="Evidence" className="w-full h-44 object-cover" />
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{ev.month}</span>
                <span className="text-[10px] text-slate-500 font-mono">{ev.date}</span>
              </div>
              <span className="text-xs font-semibold text-slate-700 block truncate">{ev.project_name}</span>
              <span className="text-[10px] text-slate-400 font-mono block">{ev.project_id} • {ev.district}</span>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  ✓ {ev.authenticity}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                  {ev.duplicate}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  ev.location_status === 'Warning' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {ev.location_match}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
