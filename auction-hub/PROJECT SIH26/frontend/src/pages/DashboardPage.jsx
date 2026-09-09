import React from 'react';
import { 
  FolderKanban, AlertOctagon, Clock, CheckCircle2, 
  ArrowRight, ShieldCheck, Info, AlertTriangle, Eye 
} from 'lucide-react';
import { GOV_SUMMARY, PRIORITY_RISK_PROJECTS } from '../data/mockData';
import RiskGauge from '../components/RiskGauge';
import AIPipelineFlowchart from '../components/AIPipelineFlowchart';

export default function DashboardPage({ onSelectProject, onNavigate }) {
  return (
    <div className="space-y-6">
      
      {/* Hero Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 uppercase tracking-wider font-mono">
              AI-POWERED • HUMAN-IN-THE-LOOP
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">SIH 2026 Governance Infrastructure</span>
          </div>

          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            “Monitor projects continuously. Verify what needs attention.”
          </h2>

          <p className="text-xs text-slate-600 leading-relaxed">
            FundGuard AI combines visual (CV), geospatial, financial, timeline, and citizen feedback signals into an explainable project risk score.
          </p>

          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-normal font-medium">
              <strong>Important Notice:</strong> AI detects anomalies and prioritizes verification. It does not declare guilt. Constitutional due process and human review remain final.
            </p>
          </div>
        </div>

        {/* Quick Summary Pill / CTA */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 w-full lg:w-72 shrink-0 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Jurisdiction:</span>
            <span className="font-bold text-slate-900">Jharkhand State</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Active Monitoring:</span>
            <span className="font-bold text-blue-700">1,284 Projects</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Critical Triage:</span>
            <span className="font-bold text-red-600 font-mono">86 Projects</span>
          </div>
          <button
            onClick={() => onNavigate('risk-queue')}
            className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg transition text-xs flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Review Priority Risk Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Clean Key Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Projects */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Projects</span>
            <FolderKanban className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            {GOV_SUMMARY.total_projects.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
            <span>Constituency Active Pool</span>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">DEMO VALUE</span>
          </div>
        </div>

        {/* Card 2: High Risk */}
        <div 
          onClick={() => onNavigate('risk-queue')}
          className="bg-white border border-red-200 hover:border-red-400 rounded-xl p-5 shadow-xs transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700">High Risk (≥ 60)</span>
            <AlertOctagon className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-extrabold text-red-600 font-mono">
            {GOV_SUMMARY.high_risk_count}
          </div>
          <div className="text-[11px] text-red-700 mt-2 flex items-center justify-between">
            <span>Requires Verification Triage</span>
            <span className="text-[10px] font-mono text-red-600 bg-red-50 px-1.5 py-0.2 rounded border border-red-100">DEMO VALUE</span>
          </div>
        </div>

        {/* Card 3: Under Review */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Under Review</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 font-mono">
            {GOV_SUMMARY.under_review_count}
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>Inspector Field Audit Active</span>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">DEMO VALUE</span>
          </div>
        </div>

        {/* Card 4: Verified */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Verified & Compliant</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 font-mono">
            {GOV_SUMMARY.verified_count.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-700 mt-2 flex items-center justify-between">
            <span>Passed AI & Field Clearance</span>
            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">DEMO VALUE</span>
          </div>
        </div>

      </div>

      {/* Center Row: AI Multi-Signal Risk Gauge + Priority Risk Queue Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Risk Gauge Left */}
        <div className="lg:col-span-5">
          <RiskGauge averageScore={GOV_SUMMARY.average_risk_score} />
        </div>

        {/* Priority Risk Queue Table Right */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Priority Risk Queue</h3>
              <p className="text-xs text-slate-500">Highest ranked sanctions requiring immediate authority verification</p>
            </div>
            <button
              onClick={() => onNavigate('risk-queue')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 transition flex items-center gap-1"
            >
              <span>View all {GOV_SUMMARY.high_risk_count} flagged</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Risk Score</th>
                  <th className="py-2.5 px-3">Project</th>
                  <th className="py-2.5 px-3">District / Type</th>
                  <th className="py-2.5 px-3">Risk Signals</th>
                  <th className="py-2.5 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {PRIORITY_RISK_PROJECTS.slice(0, 4).map((p) => {
                  const isCritical = p.risk_score >= 80;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold font-mono text-xs ${
                          isCritical ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {p.risk_score} • {p.risk_tier}
                        </span>
                      </td>
                      <td className="py-3 px-3 max-w-[180px]">
                        <span className="font-bold text-slate-900 block truncate">{p.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{p.id}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-medium text-slate-800 block">{p.district}</span>
                        <span className="text-[10px] text-slate-500">{p.type}</span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {p.risk_signals.map((sig, i) => (
                            <span key={i} className="text-[9px] font-medium bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded border border-slate-200">
                              {sig}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => onSelectProject(p)}
                          className="px-2.5 py-1 rounded bg-blue-50 text-blue-900 hover:bg-blue-600 hover:text-white border border-blue-200 font-semibold text-[11px] transition inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Risk color thresholds: <strong className="text-emerald-700">0–30 Low</strong> • <strong className="text-amber-700">31–60 Med</strong> • <strong className="text-orange-700">61–80 High</strong> • <strong className="text-red-700">81–100 Critical</strong></span>
          </div>
        </div>

      </div>

      {/* AI Pipeline Architecture 2D Flowchart */}
      <AIPipelineFlowchart />

    </div>
  );
}
