import React, { useState } from 'react';
import { 
  FolderKanban, AlertOctagon, CheckCircle2, Clock, 
  AlertTriangle, ArrowRight, ShieldCheck, MapPin, Users, 
  FileCheck, Search, Filter, Eye, Cpu, Activity, TrendingUp, 
  FileText, Shield, Compass, ChevronRight 
} from 'lucide-react';
import { ADMIN_KPI_DATA, MAP_MARKERS_DATA, FLAGGED_PROJECTS_DATA } from '../../data/mockData';
import GovernancePrincipleBanner from '../../components/GovernancePrincipleBanner';

export default function AdminDashboardPage({ onNavigate, onSelectProject }) {
  const [selectedPin, setSelectedPin] = useState(MAP_MARKERS_DATA[0]);
  const [filterTier, setFilterTier] = useState('All');
  const [tableFilter, setTableFilter] = useState('All');

  const filteredMarkers = MAP_MARKERS_DATA.filter((m) => {
    if (filterTier === 'Critical') return m.tier === 'Critical';
    if (filterTier === 'High') return m.tier === 'High';
    if (filterTier === 'Medium') return m.tier === 'Medium';
    if (filterTier === 'Low') return m.tier === 'Low';
    return true;
  });

  const tableProjects = [
    { risk: 82, id: 'MPLADS-RAN-2026-0042', name: 'Rural Road Improvement', district: 'Ranchi', type: 'Road', signals: 'GPS mismatch • Progress gap', status: 'Priority Verification', tier: 'Critical' },
    { risk: 76, id: 'MPLADS-KHU-2026-0104', name: 'Community Health Centre', district: 'Khunti', type: 'Building', signals: 'Photo reuse • Timeline delay', status: 'Under Review', tier: 'High' },
    { risk: 64, id: 'MPLADS-GUM-2026-0219', name: 'Minor Irrigation Works', district: 'Gumla', type: 'Water', signals: 'Financial mismatch', status: 'Under Review', tier: 'High' },
    { risk: 28, id: 'MPLADS-HAZ-2026-0051', name: 'High School Digital Lab', district: 'Hazaribagh', type: 'Building', signals: 'Verified authentic', status: 'Compliant', tier: 'Low' },
    { risk: 22, id: 'MPLADS-DHA-2026-0312', name: 'Solar High-Mast Lighting', district: 'Dhanbad', type: 'Infrastructure', signals: 'Verified authentic', status: 'Compliant', tier: 'Low' },
  ].filter(p => tableFilter === 'All' || p.tier === tableFilter);

  return (
    <div className="space-y-6">
      
      {/* 1. Dashboard Executive Hero Header */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#168A78] bg-[#F0F7F6] px-2 py-0.5 rounded border border-[#C6E6E1] uppercase tracking-wider font-mono">
              ● SYSTEM OPERATIONAL
            </span>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">National Public Infrastructure Monitoring</span>
          </div>
          <h1 className="text-lg font-bold text-[#0F2942] mt-1 tracking-tight">
            Risk Intelligence Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            AI-assisted monitoring for transparent and accountable MPLADS implementation.
          </p>
        </div>

        {/* Right side: Portfolio Summary */}
        <div className="flex items-center gap-4 bg-[#F6F8FB] p-2.5 px-4 rounded-xl border border-[#E4E9EF] text-xs">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Projects Monitored</span>
            <span className="text-sm font-bold text-[#123B67] font-mono">1,284</span>
          </div>
          <div className="h-6 w-px bg-slate-200"></div>
          <div className="text-right">
            <span className="text-[10px] text-[#C95752] font-semibold block uppercase">High-Risk</span>
            <span className="text-sm font-bold text-[#C95752] font-mono">86</span>
          </div>
          <div className="h-6 w-px bg-slate-200"></div>
          <div className="text-right">
            <span className="text-[10px] text-[#C58A2B] font-semibold block uppercase">Under Review</span>
            <span className="text-sm font-bold text-[#C58A2B] font-mono">143</span>
          </div>
        </div>
      </div>

      {/* 2. Governance Principle Banner */}
      <GovernancePrincipleBanner />

      {/* 3. Four Elegant Key Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Projects */}
        <div className="bg-white border border-[#E4E9EF] p-4 rounded-xl shadow-2xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">TOTAL PROJECTS</span>
            <FolderKanban className="w-4 h-4 text-[#123B67]" />
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-[#0F2942] font-mono">1,284</span>
            <span className="text-[10px] font-semibold text-[#168A78] bg-[#F0F7F6] px-1.5 py-0.5 rounded border border-[#C6E6E1]">
              +3.2% vs Baseline
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Sanctioned works active across Jharkhand</p>
        </div>

        {/* Card 2: High Risk */}
        <div 
          onClick={() => onNavigate('admin-flagged')}
          className="bg-white border border-[#E4E9EF] hover:border-[#F8D7DA] p-4 rounded-xl shadow-2xs transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold text-[#C95752] uppercase tracking-wider">HIGH RISK</span>
            <AlertOctagon className="w-4 h-4 text-[#C95752]" />
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-[#C95752] font-mono">86</span>
            <span className="text-[10px] font-semibold text-[#C95752] bg-[#FDF2F2] px-1.5 py-0.5 rounded border border-[#F8D7DA]">
              Priority Audit
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Multi-signal deviation threshold exceeded</p>
        </div>

        {/* Card 3: Under Review */}
        <div 
          onClick={() => onNavigate('admin-inspections')}
          className="bg-white border border-[#E4E9EF] hover:border-[#FCE8E6] p-4 rounded-xl shadow-2xs transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold text-[#C58A2B] uppercase tracking-wider">UNDER REVIEW</span>
            <Clock className="w-4 h-4 text-[#C58A2B]" />
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-[#C58A2B] font-mono">143</span>
            <span className="text-[10px] font-semibold text-[#C58A2B] bg-[#FEF9EE] px-1.5 py-0.5 rounded border border-[#FDE8B3]">
              Active Scrutiny
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Statutory field verifications scheduled</p>
        </div>

        {/* Card 4: Verified */}
        <div className="bg-white border border-[#E4E9EF] p-4 rounded-xl shadow-2xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold text-[#168A78] uppercase tracking-wider">VERIFIED</span>
            <CheckCircle2 className="w-4 h-4 text-[#168A78]" />
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-[#168A78] font-mono">1,055</span>
            <span className="text-[10px] font-semibold text-[#168A78] bg-[#F0F7F6] px-1.5 py-0.5 rounded border border-[#C6E6E1]">
              92.8% Compliant
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Evidence matches sanction schedules</p>
        </div>

      </div>

      {/* 4. Risk Intelligence Centerpiece: Semicircular Gauge + 6-Signal Evidence Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left (5 cols): Semicircular Risk Gauge */}
        <div className="lg:col-span-5 bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="border-b border-slate-100 pb-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CENTERPIECE</span>
            <h2 className="text-sm font-bold text-[#0F2942]">MPLADS Risk Intelligence Score</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Composite risk calculated from multiple independent evidence signals.</p>
          </div>

          {/* Semicircular Gauge Graphic */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative w-48 h-28 flex items-center justify-center">
              <svg viewBox="0 0 100 55" className="w-full h-full">
                {/* Background Arc */}
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#E4E9EF"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Colored Zone Arc (72% fill) */}
                <path
                  d="M 10 50 A 40 40 0 0 1 76 22"
                  fill="none"
                  stroke="#C58A2B"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
              {/* Center Text */}
              <div className="absolute bottom-1 text-center">
                <span className="text-3xl font-extrabold text-[#0F2942] font-mono leading-none block">72</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase block mt-0.5">Average Risk</span>
              </div>
            </div>

            {/* Risk Zone Indicators */}
            <div className="flex items-center justify-center gap-3 mt-3 text-[10px] font-semibold">
              <span className="flex items-center gap-1 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-[#168A78]"></span> Low (0-30)
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-[#1D5D9B]"></span> Medium (31-60)
              </span>
              <span className="flex items-center gap-1 text-[#C58A2B] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#C58A2B]"></span> High (61-80)
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-[#C95752]"></span> Critical (81+)
              </span>
            </div>
          </div>

          <div className="p-2.5 bg-[#F6F8FB] rounded-lg border border-[#E4E9EF] text-[11px] text-slate-600">
            Portfolio risk index aggregated across 24 parliamentary constituencies.
          </div>
        </div>

        {/* Right (7 cols): AI Evidence Panel with 6 Signal Bars */}
        <div className="lg:col-span-7 bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="border-b border-slate-100 pb-2.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">EVIDENCE MATRIX</span>
              <h2 className="text-sm font-bold text-[#0F2942]">6 Independent Anomaly Signals</h2>
            </div>
            <button 
              onClick={() => onNavigate('admin-risk-intel')}
              className="text-xs text-[#1D5D9B] hover:text-[#123B67] font-semibold flex items-center gap-1"
            >
              <span>View XAI Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 6 Signal Thin Horizontal Bars */}
          <div className="space-y-2.5 text-xs">
            
            {/* Signal 1: Computer Vision */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-slate-700">Computer Vision (Progress & Material Check)</span>
                <span className="font-mono font-bold text-[#123B67]">31%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#123B67] h-full rounded-full" style={{ width: '31%' }}></div>
              </div>
            </div>

            {/* Signal 2: Geospatial */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-slate-700">Geospatial Verification (GPS Deviation)</span>
                <span className="font-mono font-bold text-[#1D5D9B]">24%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#1D5D9B] h-full rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>

            {/* Signal 3: Financial Analytics */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-slate-700">Financial Analytics (Tranche vs Milestone Outlay)</span>
                <span className="font-mono font-bold text-[#C58A2B]">19%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#C58A2B] h-full rounded-full" style={{ width: '19%' }}></div>
              </div>
            </div>

            {/* Signal 4: Timeline Analysis */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-slate-700">Timeline & Stagnation Analysis</span>
                <span className="font-mono font-bold text-[#168A78]">14%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#168A78] h-full rounded-full" style={{ width: '14%' }}></div>
              </div>
            </div>

            {/* Signal 5: Citizen + NLP */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-slate-700">Citizen Ground Reports + Signboard OCR NLP</span>
                <span className="font-mono font-bold text-slate-700">7%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-slate-600 h-full rounded-full" style={{ width: '7%' }}></div>
              </div>
            </div>

            {/* Signal 6: Contractor History */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-slate-700">Contractor Historical Reliability & Cluster Index</span>
                <span className="font-mono font-bold text-slate-700">5%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
            <span>Signals normalized against official MoSPI baseline</span>
            <span className="font-mono">Weights Total: 100%</span>
          </div>
        </div>

      </div>

      {/* 5. Enterprise Workflow Process Diagram */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">STATUTORY LIFECYCLE</span>
            <h2 className="text-sm font-bold text-[#0F2942]">AI-Assisted Oversight Workflow</h2>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">End-to-End Governance Protocol</span>
        </div>

        {/* 7-Step Horizontal Connected Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1 text-xs">
          
          <div className="p-2.5 bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg text-center relative">
            <span className="text-[10px] font-bold text-slate-400 block font-mono">01</span>
            <span className="font-bold text-[#123B67] block text-xs mt-0.5">Evidence</span>
            <span className="text-[10px] text-slate-500">Camera / Telemetry</span>
          </div>

          <div className="p-2.5 bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg text-center relative">
            <span className="text-[10px] font-bold text-slate-400 block font-mono">02</span>
            <span className="font-bold text-[#123B67] block text-xs mt-0.5">AI Analysis</span>
            <span className="text-[10px] text-slate-500">CV & OCR NLP</span>
          </div>

          <div className="p-2.5 bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg text-center relative">
            <span className="text-[10px] font-bold text-slate-400 block font-mono">03</span>
            <span className="font-bold text-[#123B67] block text-xs mt-0.5">Risk Fusion</span>
            <span className="text-[10px] text-slate-500">Signal Aggregation</span>
          </div>

          <div className="p-2.5 bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg text-center relative">
            <span className="text-[10px] font-bold text-slate-400 block font-mono">04</span>
            <span className="font-bold text-[#123B67] block text-xs mt-0.5">Explainable Score</span>
            <span className="text-[10px] text-slate-500">XAI Attribution</span>
          </div>

          <div className="p-2.5 bg-[#EBF3FA] border border-[#1D5D9B]/30 rounded-lg text-center relative ring-1 ring-[#1D5D9B]/20">
            <span className="text-[10px] font-bold text-[#1D5D9B] block font-mono">05</span>
            <span className="font-bold text-[#123B67] block text-xs mt-0.5">Gov Review</span>
            <span className="text-[10px] text-[#1D5D9B]">Authority Triage</span>
          </div>

          <div className="p-2.5 bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg text-center relative">
            <span className="text-[10px] font-bold text-slate-400 block font-mono">06</span>
            <span className="font-bold text-[#123B67] block text-xs mt-0.5">Field Verify</span>
            <span className="text-[10px] text-slate-500">Engineer Inspection</span>
          </div>

          <div className="p-2.5 bg-[#F0F7F6] border border-[#C6E6E1] rounded-lg text-center relative">
            <span className="text-[10px] font-bold text-[#168A78] block font-mono">07</span>
            <span className="font-bold text-[#168A78] block text-xs mt-0.5">Final Decision</span>
            <span className="text-[10px] text-[#168A78]">Official Signoff</span>
          </div>

        </div>
      </div>

      {/* 6. Premium Risk Queue Data Table */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TRIAGE QUEUE</span>
            <h2 className="text-sm font-bold text-[#0F2942]">Active MPLADS Verification Queue</h2>
          </div>

          {/* Table Filters */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-semibold text-[11px]">Filter:</span>
            {['All', 'Critical', 'High', 'Low'].map((tab) => (
              <button
                key={tab}
                onClick={() => setTableFilter(tab)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  tableFilter === tab 
                    ? 'bg-[#123B67] text-white shadow-2xs' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-[#E4E9EF]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Enterprise Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#FAFBFC] border-y border-[#E4E9EF] text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Risk</th>
                <th className="py-2.5 px-3">Project</th>
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Primary Signals</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E9EF]">
              {tableProjects.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-bold font-mono text-xs ${
                      row.risk >= 80 ? 'bg-[#FDF2F2] text-[#C95752] border border-[#F8D7DA]' :
                      row.risk >= 60 ? 'bg-[#FEF9EE] text-[#C58A2B] border border-[#FDE8B3]' :
                      'bg-[#F0F7F6] text-[#168A78] border border-[#C6E6E1]'
                    }`}>
                      {row.risk}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#0F2942] block">{row.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{row.id}</span>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700">{row.district}</td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {row.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-600">{row.signals}</td>
                  <td className="py-3 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      row.status === 'Priority Verification' ? 'bg-[#FDF2F2] text-[#C95752] border-[#F8D7DA]' :
                      row.status === 'Under Review' ? 'bg-[#FEF9EE] text-[#C58A2B] border-[#FDE8B3]' :
                      'bg-[#F0F7F6] text-[#168A78] border-[#C6E6E1]'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onNavigate('admin-investigation')}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 text-[#1D5D9B] font-bold text-xs rounded border border-[#E4E9EF] transition shadow-2xs"
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Clean Light Map Monitoring Section */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">GEOSPATIAL LAYER</span>
            <h2 className="text-sm font-bold text-[#0F2942]">Parliamentary Constituency Monitoring Grid</h2>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-semibold text-[11px]">Filter Map:</span>
            {['All', 'Critical', 'High', 'Low'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterTier(t)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  filterTier === t ? 'bg-[#123B67] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-8 bg-[#F6F8FB] border border-[#E4E9EF] rounded-xl p-6 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
            {/* 2D Grid Pattern */}
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:28px_28px]"></div>

            <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>WGS84 Coordinate Grid • Jharkhand Circle</span>
              <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-[#E4E9EF]">
                Click marker to inspect telemetry
              </span>
            </div>

            {/* Pins */}
            <div className="relative z-10 my-4 flex items-center justify-center">
              <div className="w-full max-w-lg h-56 border border-dashed border-slate-300 rounded-2xl relative bg-white/75 backdrop-blur-2xs p-4">
                {filteredMarkers.map((m, idx) => {
                  const isSelected = selectedPin?.id === m.id;
                  const left = 15 + ((idx % 4) * 24);
                  const top = 20 + (Math.floor(idx / 4) * 35) + (idx % 2 === 0 ? 10 : 0);

                  const pinColor = 
                    m.risk >= 80 ? 'bg-[#C95752]' :
                    m.risk >= 60 ? 'bg-[#C58A2B]' :
                    'bg-[#168A78]';

                  return (
                    <div
                      key={m.id}
                      onClick={() => setSelectedPin(m)}
                      style={{ left: `${left}%`, top: `${top}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition p-1 rounded-full flex flex-col items-center ${
                        isSelected ? 'scale-125 z-20 ring-3 ring-[#123B67]' : 'hover:scale-110 z-10'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shadow-xs ${pinColor}`}>
                        {m.risk}
                      </div>
                      <span className="text-[9px] font-bold text-slate-800 bg-white px-1 rounded shadow-2xs mt-0.5 whitespace-nowrap border border-[#E4E9EF]">
                        {m.district}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200 pt-2">
              <span>Registered Location vs Evidence Location Checked</span>
              <span>Verification Radius: 50m</span>
            </div>
          </div>

          {/* Right Map Side Panel */}
          <div className="lg:col-span-4 bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
            {selectedPin ? (
              <div className="space-y-3">
                <div className="border-b border-slate-100 pb-2.5">
                  <span className="font-mono text-[11px] font-bold text-slate-400">{selectedPin.id}</span>
                  <h4 className="text-sm font-bold text-[#0F2942] mt-0.5">{selectedPin.name}</h4>
                  <span className="text-xs text-slate-500">{selectedPin.district} Constituency</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between p-2 bg-[#F6F8FB] rounded border border-[#E4E9EF]">
                    <span className="text-slate-500">Location Match:</span>
                    <span className="font-bold text-[#168A78]">GPS Verified</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#F6F8FB] rounded border border-[#E4E9EF]">
                    <span className="text-slate-500">Distance Deviation:</span>
                    <span className="font-bold font-mono text-slate-900">0.02 km</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#F6F8FB] rounded border border-[#E4E9EF]">
                    <span className="text-slate-500">Last Evidence:</span>
                    <span className="font-medium text-slate-700">28 Aug 2026</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#F6F8FB] rounded border border-[#E4E9EF]">
                    <span className="text-slate-500">Verification Status:</span>
                    <span className="font-bold text-[#1D5D9B]">{selectedPin.status}</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('admin-investigation')}
                  className="w-full py-2 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-bold rounded-lg text-xs transition shadow-2xs flex items-center justify-center gap-1"
                >
                  <span>Open Deep Investigation Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-center p-6 text-slate-400 text-xs">
                Select a marker on the map to view verification telemetry.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
