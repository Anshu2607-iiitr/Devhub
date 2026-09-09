import React, { useState } from 'react';
import { 
  X, AlertTriangle, ShieldCheck, MapPin, Calendar, 
  Lock, ArrowRight, Building2, Layers, CheckCircle2, 
  FileText, Clock, AlertOctagon, TrendingUp 
} from 'lucide-react';
import { CV_SECTOR_PIPELINES } from '../data/mockData';

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState('overview');
  const pipeline = CV_SECTOR_PIPELINES[project.type] || CV_SECTOR_PIPELINES['Building'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col my-6">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-blue-300 font-semibold">{project.id}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                project.risk_score >= 80 ? 'bg-red-500 text-white' :
                project.risk_score >= 60 ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-white'
              }`}>
                Risk Score {project.risk_score}/100 • {project.risk_tier}
              </span>
              <span className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                {project.type}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">{project.name}</h3>
            <p className="text-xs text-slate-400">
              {project.ward}, {project.district} • MP Constituency: {project.constituency}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Subtabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 flex gap-2">
          {[
            { id: 'overview', label: 'Overview & Verification' },
            { id: 'cv-pipeline', label: 'Computer Vision Pipeline' },
            { id: 'financial', label: 'Financial & Timeline' },
            { id: 'evidence', label: 'Photo Evidence Gallery' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 text-xs font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 text-xs text-slate-700 flex-1">
          
          {activeTab === 'overview' && (
            <div className="space-y-5">
              
              {/* Locked Start Date Notice */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
                <Lock className="w-5 h-5 text-blue-800 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-900 uppercase">Actual Start Date: {project.locked_start_date}</span>
                    <span className="text-[10px] font-bold bg-blue-200 text-blue-900 px-1.5 py-0.2 rounded font-mono">LOCKED</span>
                  </div>
                  <p className="text-xs text-blue-800 mt-0.5">
                    Locked after authority confirmation. Changes require high-level approval and are recorded in the immutable audit trail.
                  </p>
                </div>
              </div>

              {/* Key Attributes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Sanctioned Outlay</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">{project.sanctioned_amount}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Reported Expenditure</span>
                  <span className="text-sm font-bold text-amber-700 font-mono">{project.expenditure} ({project.expenditure_pct}%)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Observed Progress</span>
                  <span className="text-sm font-bold text-blue-700 font-mono">{project.physical_progress}%</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Assigned Contractor</span>
                  <span className="text-xs font-bold text-slate-900 truncate block">{project.contractor}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{project.contractor_id}</span>
                </div>
              </div>

              {/* Progress Milestones Timeline */}
              <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                <span className="font-bold text-slate-900 text-xs block">Project Execution Timeline:</span>
                <div className="space-y-2">
                  {project.milestones?.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-slate-800">{m.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-[11px]">{m.date}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          m.status.includes('Completed') ? 'bg-emerald-100 text-emerald-800' :
                          m.status.includes('Delayed') || m.status.includes('Flagged') ? 'bg-red-100 text-red-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'cv-pipeline' && (
            <div className="space-y-5">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{pipeline.title}</span>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Sector-Specific Model</span>
                </div>
                <p className="text-xs text-slate-600">
                  FundGuard AI runs category-tuned Computer Vision pipelines. We do NOT use one generic progress model for all works.
                </p>
              </div>

              {/* Stages Ribbon */}
              <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                <span className="font-bold text-slate-900 block">Classified Construction Stages:</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {pipeline.stages.map((st, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-medium flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">
                        {i + 1}
                      </span>
                      <span className="text-[11px] truncate">{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Features */}
              <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                <span className="font-bold text-slate-900 block">Deep Vision Signatures Analyzed:</span>
                <ul className="space-y-1 text-slate-600 list-disc list-inside">
                  {pipeline.typical_signals.map((sig, i) => (
                    <li key={i}>{sig}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className="space-y-5">
              {/* Financial Progress Mismatch Visual */}
              <div className="p-5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-amber-900 text-xs block">EXPENDITURE VS PHYSICAL PROGRESS DISPARITY</span>
                    <span className="text-xs text-amber-800">Anomaly requiring technical verification</span>
                  </div>
                  <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-1 rounded border border-red-200">
                    ⚠ Mismatch Flagged
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between font-semibold mb-1 text-slate-700">
                      <span>FINANCIAL UTILIZATION DISBURSED</span>
                      <span className="font-mono text-amber-800 font-bold">{project.expenditure_pct}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${project.expenditure_pct}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between font-semibold mb-1 text-slate-700">
                      <span>CV VISUAL PROGRESS OBSERVED</span>
                      <span className="font-mono text-blue-800 font-bold">{project.physical_progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${project.physical_progress}%` }}></div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-amber-900 leading-relaxed pt-1 border-t border-amber-200/80">
                  Note: Disparities indicate milestone risk and schedule slippage. FundGuard AI does not automatically declare fraud — it prioritizes ground technical inspection.
                </p>
              </div>

              {/* Geospatial GPS Match */}
              <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                <span className="font-bold text-slate-900 block">Geospatial Distance Verification:</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Registered Sanction Coords</span>
                    <span className="font-mono font-bold text-slate-800">{project.registered_gps.lat}°N, {project.registered_gps.lng}°E</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Evidence GPS Coords</span>
                    <span className="font-mono font-bold text-slate-800">{project.evidence_gps.lat}°N, {project.evidence_gps.lng}°E</span>
                  </div>
                </div>
                <div className="text-xs text-slate-700 flex items-center justify-between pt-1">
                  <span>Distance Deviation: <strong className="text-red-700 font-mono">{project.deviation_km} km</strong></span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    ⚠ Requires Physical Inspection
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <span className="font-bold text-slate-900 block">Submitted Monthly Photo Evidence Dossier:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.evidence_photos?.map((ev, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <img src={ev.url} alt="Evidence" className="w-full h-40 object-cover" />
                    <div className="p-3 space-y-1.5 bg-slate-50">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">{ev.month}</span>
                        <span className="text-[10px] text-slate-500">{ev.date}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          ✓ {ev.authenticity}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                          {ev.duplicate}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          ev.location_status === 'Warning' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {ev.location_match}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Audit Reference: <strong className="font-mono text-slate-700">DOD-MPLAD-{project.id}</strong>
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert(`Order Dispatched: Field verification inspector assigned to ${project.id}`);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-blue-900 text-white font-semibold text-xs hover:bg-blue-800 transition flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Dispatch Field Verification</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
