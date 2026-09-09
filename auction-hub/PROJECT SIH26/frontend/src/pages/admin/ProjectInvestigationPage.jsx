import React from 'react';
import { 
  FileSearch, AlertOctagon, CheckCircle2, MapPin, 
  Layers, Camera, Users, ArrowRight, ShieldCheck, DollarSign 
} from 'lucide-react';
import { FLAGGED_PROJECTS_DATA } from '../../data/mockData';

export default function ProjectInvestigationPage({ onNavigate }) {
  const project = FLAGGED_PROJECTS_DATA[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
            <FileSearch className="w-4 h-4 text-blue-700" />
            <span>Screen 8: Deep Project Investigation Dossier</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            Cross-Portal Correlation Matrix (Contractor + Citizen + Geospatial + Financial)
          </h2>
        </div>

        <button
          onClick={() => onNavigate('admin-inspection-form')}
          className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-sm"
        >
          <span>File Official Field Inspection Report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Pillars Cross-Correlation Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Pillar 1: Contractor Claim */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="font-bold text-amber-900 text-xs uppercase">1. Contractor Reported Milestone</span>
            <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              Claimed: 80%
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            "Completed aggregate grading and mechanical compaction across 3.8 km stretch. Water sprinkling and curing ongoing."
          </p>
          <div className="text-[11px] text-slate-500 pt-1">
            Submitted: 28 Aug 2026 • Billing Tranche Requested: ₹90.00 Lakh
          </div>
        </div>

        {/* Pillar 2: AI Computer Vision Assessment */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="font-bold text-blue-900 text-xs uppercase">2. AI Visual Evidence Scan</span>
            <span className="font-mono text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
              Visible: 42%
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Subgrade gravel base layer partially laid. Wet Mix Macadam thickness is incomplete; bituminous paving is completely absent.
          </p>
          <div className="text-[11px] text-red-700 font-semibold pt-1">
            ⚠ 38% Disparity detected between reported claim and visual estimation.
          </div>
        </div>

        {/* Pillar 3: Citizen Ground Reports */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="font-bold text-emerald-900 text-xs uppercase">3. Independent Citizen Reports</span>
            <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              3 Verified Complaints
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            "Only stone gravel dumped. No tar laid. Road is waterlogged and impassable during rains." (Amit Kumar, Score: 85/100).
          </p>
          <div className="text-[11px] text-slate-500 pt-1">
            Geo-tagged counter-photographs match location coordinates.
          </div>
        </div>

        {/* Pillar 4: Financial & Geospatial Lock */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="font-bold text-slate-900 text-xs uppercase">4. Financial & Geospatial Telemetry</span>
            <span className="font-mono text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
              1.42 km Offset
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Disbursed ₹90.00 Lakh (75% of outlay). Submitted photo GPS deviates by 1.42 km from the sanctioned Namkum alignment.
          </p>
          <div className="text-[11px] text-red-800 font-bold pt-1">
            System Recommendation: Hold 4th payment tranche until technical inspection.
          </div>
        </div>

      </div>

    </div>
  );
}
