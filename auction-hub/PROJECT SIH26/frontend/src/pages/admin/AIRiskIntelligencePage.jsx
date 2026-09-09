import React from 'react';
import { 
  Cpu, AlertOctagon, ShieldAlert, CheckCircle2, 
  ArrowRight, Info, Layers, Eye, FileText, CheckSquare 
} from 'lucide-react';
import { FLAGGED_PROJECTS_DATA } from '../../data/mockData';

export default function AIRiskIntelligencePage({ onNavigate }) {
  const project = FLAGGED_PROJECTS_DATA[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Screen 6: AI Risk Intelligence Engine</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            Multi-Signal Risk Decomposition & Explainable AI (XAI) Attribution
          </h2>
        </div>

        <button
          onClick={() => onNavigate('admin-investigation')}
          className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-sm"
        >
          <span>Open Cross-Portal Correlation Dossier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Dynamic Risk Score Gauge & Multi-Signal Weights */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">EVALUATED PROJECT</span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{project.name}</h3>
              <span className="text-xs text-slate-500 font-mono">{project.id} • {project.district}</span>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 font-bold block">AI RISK SCORE</span>
              <span className="text-3xl font-extrabold text-red-600 font-mono">87 / 100</span>
              <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full border border-red-200">
                HIGH RISK LEVEL
              </span>
            </div>
          </div>

          {/* 5 Risk Signals Breakdown */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider block text-[10px]">
              Multi-Signal Vulnerability Breakdown:
            </span>

            {/* Signal 1: Image Evidence */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">1. Image Evidence Anomaly Weight:</span>
                <span className="font-mono text-red-700 font-bold">82%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>

            {/* Signal 2: Location Consistency */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">2. Location Consistency & GPS Deviation:</span>
                <span className="font-mono text-red-700 font-bold">91%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-red-600 h-full rounded-full" style={{ width: '91%' }}></div>
              </div>
            </div>

            {/* Signal 3: Progress Consistency */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">3. Progress Consistency (Claimed vs Visual):</span>
                <span className="font-mono text-amber-700 font-bold">43%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '43%' }}></div>
              </div>
            </div>

            {/* Signal 4: Financial Pattern */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">4. Financial Outlay vs Schedule Pattern:</span>
                <span className="font-mono text-red-700 font-bold">76%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>

            {/* Signal 5: Citizen Complaints */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">5. Citizen Grievance Density & Severity:</span>
                <span className="font-mono text-red-700 font-bold">88%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-red-600 h-full rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>

          </div>

        </div>

        {/* Right: Explainable AI Panel "Why was this project flagged?" */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold border-b border-slate-100 pb-3">
              <Info className="w-4 h-4 text-blue-700" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                Explainable AI (XAI): “Why was this project flagged?”
              </h3>
            </div>

            <div className="space-y-2.5 text-xs text-slate-800">
              <div className="p-3 bg-red-50/70 border border-red-200 rounded-lg flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="block text-red-950 font-semibold">Physical vs Claimed Progress Gap:</strong>
                  <span className="text-red-900">Contractor reported 80% completion; Computer Vision model estimates 42% visible progress on site.</span>
                </div>
              </div>

              <div className="p-3 bg-red-50/70 border border-red-200 rounded-lg flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="block text-red-950 font-semibold">Historical Image Vector Overlap:</strong>
                  <span className="text-red-900">Perceptual hash of current submission exhibits 94% cosine similarity to a 2024 work record.</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="block text-amber-950 font-semibold">Geospatial Distance Offset:</strong>
                  <span className="text-amber-900">Evidence photo EXIF GPS coordinates deviate by 1.42 km from the sanctioned boundary.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">4</span>
                <div>
                  <strong className="block text-slate-900 font-semibold">Independent Citizen Corroboration:</strong>
                  <span className="text-slate-700">3 verified citizen reports with counter-photos received from residents in Namkum Ward 12.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => onNavigate('admin-flagged')}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs transition"
            >
              Flagged Queue
            </button>
            <button
              onClick={() => onNavigate('admin-inspections')}
              className="flex-1 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs transition shadow-sm flex items-center justify-center gap-1"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Initiate Inspection Workflow</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
