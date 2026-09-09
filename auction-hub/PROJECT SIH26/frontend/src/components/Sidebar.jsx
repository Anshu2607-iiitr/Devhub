import React from 'react';
import { 
  LayoutDashboard, FolderKanban, AlertOctagon, MapPin, 
  Camera, FileText, CheckCircle2, History, Bell, 
  ShieldAlert, ShieldCheck, HardHat, Users, Bot, 
  FileCheck, FileSearch, GitCommit, Upload, Eye 
} from 'lucide-react';

export default function Sidebar({ 
  activeNav, 
  setActiveNav, 
  currentUser,
  onLogout
}) {
  const role = currentUser?.role || 'admin';

  // Government Admin Navigation Items (Screens 5-10, 17, 18)
  const adminNav = [
    { id: 'admin-dashboard', label: '1. Admin Command Hub', icon: LayoutDashboard },
    { id: 'admin-risk-intel', label: '2. AI Risk Intelligence', icon: ShieldAlert, badge: '87/100', badgeColor: 'bg-red-100 text-red-800' },
    { id: 'admin-flagged', label: '3. Flagged Projects Queue', icon: AlertOctagon, badge: '86', badgeColor: 'bg-red-100 text-red-700' },
    { id: 'admin-investigation', label: '4. Deep Investigation', icon: FileSearch },
    { id: 'admin-inspections', label: '5. Inspection Workflow', icon: GitCommit },
    { id: 'admin-inspection-form', label: '6. File Inspection Report', icon: FileCheck },
    { id: 'shared-notifications', label: '7. Notification Feed', icon: Bell },
    { id: 'audit-trail', label: '8. Immutable Audit Trail', icon: History },
  ];

  // Contractor Navigation Items (Screens 1-4, 17)
  const contractorNav = [
    { id: 'contractor-dashboard', label: '1. Contractor Dashboard', icon: LayoutDashboard },
    { id: 'contractor-submit', label: '2. Submit Progress Report', icon: Upload },
    { id: 'contractor-ai-verify', label: '3. AI Evidence Diagnostics', icon: Camera, badge: 'Scan Active', badgeColor: 'bg-amber-100 text-amber-900' },
    { id: 'shared-notifications', label: '4. Notification Alerts', icon: Bell },
  ];

  // Citizen Navigation Items (Screens 11-16, 17)
  const citizenNav = [
    { id: 'citizen-home', label: '1. Citizen Home', icon: LayoutDashboard },
    { id: 'citizen-explorer', label: '2. Project Explorer', icon: FolderKanban },
    { id: 'citizen-report', label: '3. Report an Issue', icon: FileText, badge: 'Grievance', badgeColor: 'bg-emerald-100 text-emerald-800' },
    { id: 'citizen-tracker', label: '4. Track Complaint', icon: CheckCircle2 },
    { id: 'citizen-ai', label: '5. Citizen AI Assistant', icon: Bot },
    { id: 'shared-notifications', label: '6. Citizen Alerts', icon: Bell },
  ];

  const currentNav = role === 'admin' ? adminNav : role === 'contractor' ? contractorNav : citizenNav;

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col border-r border-slate-800 shrink-0 select-none min-h-screen">
      
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm font-bold text-base ${
          role === 'admin' ? 'bg-blue-600' : role === 'contractor' ? 'bg-amber-600' : 'bg-emerald-600'
        }`}>
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-bold text-white tracking-tight">FundGuard <span className="text-blue-400">AI</span></h1>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-800">SIH 2026</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">MPLADS Risk Intelligence</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        <div>
          <span className={`px-3 text-[10px] font-bold uppercase tracking-wider block mb-2 ${
            role === 'admin' ? 'text-blue-400' : role === 'contractor' ? 'text-amber-400' : 'text-emerald-400'
          }`}>
            {role === 'admin' ? 'GOVERNMENT COMMAND CENTRE' : role === 'contractor' ? 'CONTRACTOR INGESTION' : 'CITIZEN TRANSPARENCY'}
          </span>

          <nav className="space-y-1">
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? role === 'admin' ? 'bg-blue-600 text-white font-semibold shadow-sm' :
                        role === 'contractor' ? 'bg-amber-700 text-white font-semibold shadow-sm' : 'bg-emerald-700 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${
                      isActive ? 'bg-white text-slate-900 border-white' : item.badgeColor
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Session Footer */}
      <div className="p-3.5 bg-slate-950 border-t border-slate-800 text-[11px]">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${
            role === 'admin' ? 'bg-blue-950 border-blue-700 text-blue-300' :
            role === 'contractor' ? 'bg-amber-950 border-amber-700 text-amber-300' : 'bg-emerald-950 border-emerald-700 text-emerald-300'
          }`}>
            {role === 'admin' ? 'GA' : role === 'contractor' ? 'CON' : 'CIT'}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-white font-semibold truncate block">
              {currentUser?.name || 'Active Session'}
            </span>
            <p className="text-[10px] text-slate-400 truncate">
              {currentUser?.designation || 'Verified User'}
            </p>
          </div>
        </div>
      </div>

    </aside>
  );
}
