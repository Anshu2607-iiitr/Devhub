import React, { useState } from 'react';
import { 
  Camera, CheckCircle2, AlertTriangle, ShieldAlert, 
  MapPin, Clock, Smartphone, Layers, Eye, RefreshCw, ArrowRight 
} from 'lucide-react';
import { CONTRACTOR_DATA } from '../../data/mockData';

export default function AIEvidenceVerificationPage({ onNavigate }) {
  const [analyzing, setAnalyzing] = useState(false);
  const project = CONTRACTOR_DATA.projects[0];

  const handleReanalyze = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
            <Camera className="w-4 h-4" />
            <span>Screen 4: Photo / Video Upload & AI Evidence Verification</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            Automated Multi-Vector Computer Vision & Geospatial Audit
          </h2>
        </div>

        <button
          onClick={handleReanalyze}
          disabled={analyzing}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs transition flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${analyzing ? 'animate-spin' : ''}`} />
          <span>{analyzing ? 'Scanning...' : 'Re-Run AI Diagnostics'}</span>
        </button>
      </div>

      {/* Main Grid: Live Camera Stream Simulation + AI Evidence Verification Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: In-App Live Camera Capture Simulation */}
        <div className="lg:col-span-5 bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 flex flex-col justify-between relative min-h-[380px]">
          
          <img 
            src="https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=800&auto=format&fit=crop&q=80" 
            alt="Live Progress Work" 
            className="absolute inset-0 w-full h-full object-cover opacity-85"
          />

          {/* HUD Overlay Top */}
          <div className="relative z-10 p-3 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-mono flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>LIVE SENSOR FEED</span>
            </div>
            <span>ID: {project.id}</span>
          </div>

          {/* Target Bounding Frame Center */}
          <div className="relative z-10 pointer-events-none flex items-center justify-center p-6">
            <div className="w-48 h-32 border-2 border-dashed border-amber-400/80 rounded-lg flex flex-col items-center justify-center bg-slate-950/30 backdrop-blur-2xs text-[10px] text-amber-300 font-mono text-center p-2">
              <span>[CV STAGE DETECTED]</span>
              <span className="font-bold text-white text-xs mt-0.5">WMM Grading: 42%</span>
            </div>
          </div>

          {/* HUD Overlay Bottom with Telemetry */}
          <div className="relative z-10 p-3 bg-slate-950/90 backdrop-blur-xs text-white text-[10px] font-mono space-y-1 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-400" /> GPS Coordinates:
              </span>
              <span className="text-amber-300 font-bold">23.3441° N, 85.3096° E</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-blue-400" /> Timestamp (UTC):
              </span>
              <span>2026-08-28 10:14:22 IST</span>
            </div>
            <div className="flex items-center justify-between text-[9px] text-slate-400 pt-0.5 border-t border-slate-800">
              <span>Device: Samsung Galaxy Tab Active4 (Gov Issue)</span>
              <span>Hash: SHA256-8a901f...</span>
            </div>
          </div>

        </div>

        {/* Right: AI Evidence Verification Panel */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          
          <div className="border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                AI Evidence Verification Results
              </h3>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                ⚠ Requires Verification
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated diagnostics run prior to government clearance
            </p>
          </div>

          {/* Detailed Verification Checks List */}
          <div className="space-y-2 text-xs">
            
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <span className="text-slate-700 font-medium">Image Authenticity & Tamper Scan:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Authentic (No ELA edits)
              </span>
            </div>

            <div className="p-2.5 bg-amber-50/70 rounded-lg border border-amber-200 flex items-center justify-between">
              <span className="text-amber-950 font-medium">Duplicate / Reused Image Check:</span>
              <span className="font-bold text-amber-800 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Similar image detected in 2024 archive
              </span>
            </div>

            <div className="p-2.5 bg-amber-50/70 rounded-lg border border-amber-200 flex items-center justify-between">
              <span className="text-amber-950 font-medium">GPS Consistency vs Sanction Geo-fence:</span>
              <span className="font-bold text-amber-800 font-mono">
                ⚠ 1.42 km location deviation
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <span className="text-slate-700 font-medium">Timestamp & EXIF Device Consistency:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified (NTP synced)
              </span>
            </div>

            <div className="p-2.5 bg-amber-50/70 rounded-lg border border-amber-200 flex items-center justify-between">
              <span className="text-amber-950 font-medium">Visual Progress vs Claimed Milestone:</span>
              <span className="font-bold text-red-700 font-mono">
                Estimated 42% vs Claimed 80%
              </span>
            </div>

          </div>

          {/* Safe Non-Accusatory Government Notice */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 space-y-1">
            <span className="font-bold block">Standard Due Process Notice:</span>
            <p className="leading-normal text-[11px]">
              "Anomaly Detected — Additional Review Recommended." System flags discrepancy for physical technical inspection. Contractor has the legal right to submit core compaction test reports.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => onNavigate('contractor-dashboard')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
            >
              Return to Dashboard
            </button>
            <button
              onClick={() => onNavigate('admin-risk-intel')}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs shadow-sm flex items-center gap-1"
            >
              <span>View in Admin Command Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
