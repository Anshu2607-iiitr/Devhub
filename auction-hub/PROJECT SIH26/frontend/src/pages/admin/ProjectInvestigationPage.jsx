import React, { useState } from 'react';
import { 
  FileSearch, AlertOctagon, CheckCircle2, MapPin, 
  Layers, Camera, Users, ArrowRight, ShieldCheck, 
  Calendar, Check, AlertTriangle, FileText 
} from 'lucide-react';
import GovernancePrincipleBanner from '../../components/GovernancePrincipleBanner';
import SectorProgressBar from '../../components/SectorProgressBar';

export default function ProjectInvestigationPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('01');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider font-mono">
            <span>Project ID: MPLADS-RAN-2026-0042</span>
          </div>
          <h1 className="text-base font-bold text-[#0F2942] mt-0.5">
            Rural Road Improvement (Namkum to Rampur)
          </h1>
          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
            <span>District: <strong>Ranchi</strong></span>
            <span>•</span>
            <span>Type: <strong>Road</strong></span>
            <span>•</span>
            <span>Sanction: <strong>₹1.20 Cr</strong></span>
            <span>•</span>
            <span>Expenditure: <strong>₹96.0 L</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">AI RISK SCORE</span>
            <span className="text-2xl font-extrabold text-[#C95752] font-mono leading-none">82 / 100</span>
          </div>
          <button
            onClick={() => onNavigate('admin-inspection-form')}
            className="px-4 py-2 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-2xs"
          >
            <span>File Inspection Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <GovernancePrincipleBanner />

      {/* 4 Section Navigation Tabs */}
      <div className="flex items-center bg-white border border-[#E4E9EF] p-1 rounded-xl shadow-2xs text-xs font-semibold">
        <button
          onClick={() => setActiveTab('01')}
          className={`flex-1 py-2 rounded-lg transition ${
            activeTab === '01' ? 'bg-[#EBF3FA] text-[#123B67] font-bold shadow-2xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          01 — Project Overview
        </button>
        <button
          onClick={() => setActiveTab('02')}
          className={`flex-1 py-2 rounded-lg transition ${
            activeTab === '02' ? 'bg-[#EBF3FA] text-[#123B67] font-bold shadow-2xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          02 — Evidence & Photos
        </button>
        <button
          onClick={() => setActiveTab('03')}
          className={`flex-1 py-2 rounded-lg transition ${
            activeTab === '03' ? 'bg-[#EBF3FA] text-[#123B67] font-bold shadow-2xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          03 — AI Risk Analysis
        </button>
        <button
          onClick={() => setActiveTab('04')}
          className={`flex-1 py-2 rounded-lg transition ${
            activeTab === '04' ? 'bg-[#EBF3FA] text-[#123B67] font-bold shadow-2xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          04 — Verification History
        </button>
      </div>

      {/* SECTION 01: PROJECT OVERVIEW */}
      {activeTab === '01' && (
        <div className="space-y-5">
          <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F2942]">01 — Comprehensive Project Scope</h3>
            
            <SectorProgressBar type="Road" currentStageIndex={2} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF]">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Executing Agency</span>
                <span className="font-bold text-[#0F2942] block mt-0.5">ABC Infrastructure Ltd.</span>
                <span className="text-[10px] text-slate-500">Vendor ID: JH-CON-2026-089</span>
              </div>
              <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF]">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Financial Progress</span>
                <span className="font-bold text-[#0F2942] font-mono block mt-0.5">80.0% Disbursed (₹96.0 L)</span>
                <span className="text-[10px] text-[#C95752] font-semibold">Physical: 42% (38% Disparity)</span>
              </div>
              <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF]">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Sanction Date</span>
                <span className="font-bold text-[#0F2942] block mt-0.5">14 Jan 2026</span>
                <span className="text-[10px] text-slate-500">Deadline: 30 Nov 2026</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 02: EVIDENCE & PHOTOS */}
      {activeTab === '02' && (
        <div className="space-y-5">
          <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#0F2942]">02 — Photo Verification & Progress Comparison</h3>
                <p className="text-xs text-slate-500 mt-0.5">Side-by-side comparative analysis of monthly evidence submissions.</p>
              </div>
              <span className="text-xs font-bold text-[#C95752] bg-[#FDF2F2] px-2 py-0.5 rounded border border-[#F8D7DA]">
                Stagnation Detected
              </span>
            </div>

            {/* Side by Side Photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Previous Month */}
              <div className="bg-[#F6F8FB] border border-[#E4E9EF] rounded-xl p-3 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Previous Month (July 2026)</span>
                  <span className="font-mono text-slate-500">Stage: Subgrade (35%)</span>
                </div>
                <div className="h-48 rounded-lg overflow-hidden relative bg-slate-200">
                  <img 
                    src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80" 
                    alt="July 2026" 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded">
                    12 Jul 2026 • GPS Match
                  </span>
                </div>
              </div>

              {/* Current Month */}
              <div className="bg-[#F6F8FB] border border-[#E4E9EF] rounded-xl p-3 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Current Month (August 2026)</span>
                  <span className="font-mono text-[#C95752] font-bold">Claimed: 80% • CV: 42%</span>
                </div>
                <div className="h-48 rounded-lg overflow-hidden relative bg-slate-200">
                  <img 
                    src="https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80" 
                    alt="August 2026" 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-[#C95752]/90 text-white text-[9px] font-mono px-2 py-0.5 rounded">
                    28 Aug 2026 • 1.42 km Offset
                  </span>
                </div>
              </div>

            </div>

            {/* Evidence Metadata Table */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs pt-2">
              <div className="p-2 bg-[#F6F8FB] rounded border border-[#E4E9EF]">
                <span className="text-[10px] text-slate-400 block uppercase">Captured</span>
                <span className="font-semibold text-slate-800">12 Aug 2026</span>
              </div>
              <div className="p-2 bg-[#F6F8FB] rounded border border-[#E4E9EF]">
                <span className="text-[10px] text-slate-400 block uppercase">GPS Coords</span>
                <span className="font-semibold font-mono text-slate-800">23.3441° N</span>
              </div>
              <div className="p-2 bg-[#F6F8FB] rounded border border-[#E4E9EF]">
                <span className="text-[10px] text-slate-400 block uppercase">Project ID</span>
                <span className="font-semibold font-mono text-slate-800">RAN-2026-0042</span>
              </div>
              <div className="p-2 bg-[#F6F8FB] rounded border border-[#E4E9EF]">
                <span className="text-[10px] text-slate-400 block uppercase">Authenticity</span>
                <span className="font-bold text-[#168A78]">Verified</span>
              </div>
              <div className="p-2 bg-[#F6F8FB] rounded border border-[#E4E9EF]">
                <span className="text-[10px] text-slate-400 block uppercase">Location</span>
                <span className="font-bold text-[#C95752]">1.42 km Match</span>
              </div>
              <div className="p-2 bg-[#F6F8FB] rounded border border-[#E4E9EF]">
                <span className="text-[10px] text-slate-400 block uppercase">Duplicate</span>
                <span className="font-bold text-[#C95752]">Match (94%)</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 03: AI RISK ANALYSIS */}
      {activeTab === '03' && (
        <div className="space-y-5">
          <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#0F2942]">03 — Why this score? (XAI Risk Contributors)</h3>
                <p className="text-xs text-slate-500 mt-0.5">Factor breakdown contributing to the final 82/100 risk score.</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-[#C95752] font-mono">82 / 100</span>
              </div>
            </div>

            {/* Vertical Evidence Timeline & Contributors */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-[#FDF2F2] rounded-lg border border-[#F8D7DA]">
                <span className="font-semibold text-slate-800">GPS location deviation (1.42 km from alignment)</span>
                <span className="font-bold font-mono text-[#C95752]">+18</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#FDF2F2] rounded-lg border border-[#F8D7DA]">
                <span className="font-semibold text-slate-800">Expenditure (80%) vs physical progress (42%) gap</span>
                <span className="font-bold font-mono text-[#C95752]">+15</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#FEF9EE] rounded-lg border border-[#FDE8B3]">
                <span className="font-semibold text-slate-800">Possible reused photograph vector similarity (94%)</span>
                <span className="font-bold font-mono text-[#C58A2B]">+12</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#FEF9EE] rounded-lg border border-[#FDE8B3]">
                <span className="font-semibold text-slate-800">Milestone timeline delay vs sanctioned schedule</span>
                <span className="font-bold font-mono text-[#C58A2B]">+7</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-[#E4E9EF]">
                <span className="font-semibold text-slate-800">Citizen grievance reports received</span>
                <span className="font-bold font-mono text-slate-700">+4</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#F0F7F6] rounded-lg border border-[#C6E6E1]">
                <span className="font-semibold text-slate-800">Recent verified foundation evidence</span>
                <span className="font-bold font-mono text-[#168A78]">-6</span>
              </div>
            </div>

            <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF] text-xs text-slate-600">
              <span className="font-bold text-[#123B67]">Notice: </span>
              AI-generated assessment — official physical verification required before any administrative action.
            </div>
          </div>
        </div>
      )}

      {/* SECTION 04: VERIFICATION HISTORY */}
      {activeTab === '04' && (
        <div className="space-y-5">
          <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F2942]">04 — Verification & Statutory Audit History</h3>
            
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF] flex items-start justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">AI Automated Triage Run</span>
                  <span className="text-slate-500">Flagged for 38% progress gap and GPS deviation.</span>
                </div>
                <span className="font-mono text-slate-400 text-[11px]">28 Aug 2026, 10:14 IST</span>
              </div>

              <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF] flex items-start justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Citizen Grievance Registered</span>
                  <span className="text-slate-500">Complaint #GRV-JH-2026-9812 filed with counter-photos.</span>
                </div>
                <span className="font-mono text-slate-400 text-[11px]">20 Aug 2026, 16:42 IST</span>
              </div>

              <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF] flex items-start justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">3rd Tranche Fund Release (₹30.00 L)</span>
                  <span className="text-slate-500">Disbursed by District Collectorate Finance Cell.</span>
                </div>
                <span className="font-mono text-slate-400 text-[11px]">02 Jul 2026, 11:30 IST</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
