import React from 'react';
import { Search, Bell, ShieldCheck, HardHat, Users, LogOut, CheckCircle2 } from 'lucide-react';

export default function TopHeader({ 
  activeNav, 
  onSearch, 
  searchQuery = '', 
  currentUser, 
  onSwitchRole, 
  onLogout 
}) {
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

  const role = currentUser?.role || 'admin';

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs px-6 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      
      {/* Breadcrumb & Title */}
      <div>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          <span className="text-blue-900 font-bold">
            {role === 'admin' ? 'GOVERNMENT AUTHORITY' : role === 'contractor' ? 'CONTRACTOR INGESTION' : 'CITIZEN TRANSPARENCY'}
          </span>
          <span>/</span>
          <span>{pageTitles[activeNav] || 'Dashboard'}</span>
        </div>
        <h2 className="text-base font-bold text-slate-900 mt-0.5">
          {pageTitles[activeNav] || 'Risk Intelligence Dashboard'}
        </h2>
      </div>

      {/* Right Controls & Role Switcher */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        
        {/* Live Hackathon Persona Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <span className="text-[10px] font-bold text-slate-500 px-2 uppercase hidden lg:inline">
            Role:
          </span>
          <button
            onClick={() => onSwitchRole('admin')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1 text-[11px] ${
              role === 'admin' 
                ? 'bg-blue-900 text-white shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Govt Admin</span>
          </button>
          <button
            onClick={() => onSwitchRole('contractor')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1 text-[11px] ${
              role === 'contractor' 
                ? 'bg-amber-700 text-white shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>Contractor</span>
          </button>
          <button
            onClick={() => onSwitchRole('citizen')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1 text-[11px] ${
              role === 'citizen' 
                ? 'bg-emerald-700 text-white shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Citizen</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-48 hidden xl:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* User Badge Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-2xs ${
            role === 'admin' ? 'bg-blue-900' : role === 'contractor' ? 'bg-amber-700' : 'bg-emerald-700'
          }`}>
            {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
          </div>
          <div className="hidden sm:block text-left text-xs">
            <span className="font-bold text-slate-900 block leading-tight truncate max-w-[120px]">
              {currentUser?.name || 'Authorized User'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {currentUser?.badge || 'VERIFIED'}
            </span>
          </div>
        </div>

        {/* Logout / Exit to Gateway */}
        <button
          onClick={onLogout}
          title="Exit to Portal Gateway"
          className="p-1.5 rounded-lg text-slate-500 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition text-xs flex items-center gap-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-medium">Exit</span>
        </button>

      </div>

    </header>
  );
}
