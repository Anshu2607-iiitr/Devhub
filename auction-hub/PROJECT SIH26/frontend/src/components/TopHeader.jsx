import React from 'react';
import { Search, Bell, ShieldCheck, CheckCircle2, User, ChevronDown } from 'lucide-react';

export default function TopHeader({ activeNav, onSearch, searchQuery = '' }) {
  const pageTitles = {
    'overview': 'Risk Intelligence Dashboard',
    'projects': 'Project Monitoring Repository',
    'risk-queue': 'Priority Verification Risk Queue',
    'map': 'Geospatial Map Monitoring & Anomaly Coordinates',
    'evidence': 'Monthly Progress Evidence Gallery',
    'contractors': 'Contractor Performance & Anomaly Analytics',
    'citizen-feedback': 'Citizen Feedback & Anti-Abuse Verification',
    'reports': 'Official Governance & Statutory Reports',
    'audit-trail': 'Immutable Audit Trail Activity Log',
    'contractor-portal': 'Contractor In-App Camera Progress Portal',
    'citizen-portal': 'Citizen Ground Reality Verification Portal',
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs px-6 py-3.5 flex items-center justify-between">
      
      {/* Breadcrumb & Title */}
      <div>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          <span className="text-blue-900 font-bold">MPLADS MONITORING SYSTEM</span>
          <span>/</span>
          <span>{pageTitles[activeNav] || 'Dashboard'}</span>
        </div>
        <h2 className="text-lg font-bold text-slate-900 mt-0.5">
          {pageTitles[activeNav] || 'Risk Intelligence Dashboard'}
        </h2>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3.5">
        
        {/* System Operational Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>System Operational</span>
        </div>

        {/* Search */}
        <div className="relative w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects, districts, contractors..."
            value={searchQuery}
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 relative transition">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5 ring-2 ring-white"></span>
          </button>
        </div>

        {/* Authority Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            GA
          </div>
          <div className="hidden md:block text-left text-xs">
            <span className="font-semibold text-slate-900 block leading-tight">Admin Authority</span>
            <span className="text-[10px] text-slate-500">Jharkhand State Nodal</span>
          </div>
        </div>

      </div>

    </header>
  );
}
