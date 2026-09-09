import React from 'react';
import { 
  LayoutDashboard, FolderKanban, AlertOctagon, MapPin, 
  Image as ImageIcon, Building2, Users, FileBarChart, 
  History, ShieldAlert, ShieldCheck, HardHat, Landmark, UserCheck 
} from 'lucide-react';

export default function Sidebar({ activeNav, setActiveNav, highRiskCount = 86, feedbackCount = 3 }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'risk-queue', label: 'Risk Queue', icon: AlertOctagon, badge: highRiskCount, badgeColor: 'bg-red-100 text-red-700 border-red-200' },
    { id: 'map', label: 'Map Monitoring', icon: MapPin },
    { id: 'evidence', label: 'Evidence', icon: ImageIcon },
    { id: 'contractors', label: 'Contractors', icon: Building2 },
    { id: 'citizen-feedback', label: 'Citizen Feedback', icon: Users, badge: feedbackCount, badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
    { id: 'audit-trail', label: 'Audit Trail', icon: History },
  ];

  const portalItems = [
    { id: 'contractor-portal', label: 'Contractor Portal', icon: HardHat },
    { id: 'citizen-portal', label: 'Citizen Portal', icon: UserCheck },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col border-r border-slate-800 shrink-0 select-none min-h-screen">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-bold text-white tracking-tight">FundGuard <span className="text-blue-400">AI</span></h1>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">SIH 2026</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">MPLADS Risk Intelligence</p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        <div>
          <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            GOVERNMENT AUTHORITY
          </span>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full border ${
                      isActive ? 'bg-white text-blue-900 border-white' : item.badgeColor
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Portals Section */}
        <div>
          <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            EXTERNAL PORTALS
          </span>
          <nav className="space-y-1">
            {portalItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom User / Workspace Stamp */}
      <div className="p-3.5 bg-slate-950 border-t border-slate-800 text-[11px]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs">
            JH
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-white font-semibold truncate block">Government Authority</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </div>
            <p className="text-[10px] text-slate-400 truncate">Jharkhand • State Admin</p>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-900 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Secure Gov Workspace</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>
      </div>

    </aside>
  );
}
