import React from 'react';
import { 
  LayoutDashboard, FolderKanban, AlertOctagon, 
  Camera, FileText, CheckCircle2, History, Bell, 
  ShieldCheck, HardHat, Users, Bot, 
  FileCheck, FileSearch, GitCommit, Upload, Shield, LogOut, Cpu 
} from 'lucide-react';

export default function Sidebar({ 
  activeNav, 
  setActiveNav, 
  currentUser,
  onLogout
}) {
  const role = currentUser?.role || 'admin';

  // Government Admin Navigation
  const adminNav = [
    { id: 'admin-dashboard', label: 'Command Hub', icon: LayoutDashboard },
    { id: 'admin-advanced-ai', label: 'Advanced AI & Satellite Lab', icon: Cpu, badge: 'Neural Lab', badgeColor: 'bg-[#F0F7F6] text-[#168A78] border-[#C6E6E1]' },
    { id: 'admin-risk-intel', label: 'AI Risk Intelligence', icon: ShieldCheck, badge: '87/100', badgeColor: 'bg-[#FDF2F2] text-[#C95752] border-[#F8D7DA]' },
    { id: 'admin-flagged', label: 'Flagged Queue', icon: AlertOctagon, badge: '86', badgeColor: 'bg-[#FDF2F2] text-[#C95752] border-[#F8D7DA]' },
    { id: 'admin-investigation', label: 'Deep Investigation', icon: FileSearch },
    { id: 'admin-inspections', label: 'Inspection Workflow', icon: GitCommit },
    { id: 'admin-inspection-form', label: 'File Inspection Report', icon: FileCheck },
    { id: 'shared-notifications', label: 'Notification Feed', icon: Bell },
    { id: 'audit-trail', label: 'Immutable Audit Trail', icon: History },
  ];

  // Contractor Navigation
  const contractorNav = [
    { id: 'contractor-dashboard', label: 'My Projects', icon: LayoutDashboard },
    { id: 'contractor-submit', label: 'Progress Submission', icon: Upload },
    { id: 'contractor-ai-verify', label: 'Camera AI Verification', icon: Camera, badge: 'Active', badgeColor: 'bg-[#F0F7F6] text-[#168A78] border-[#C6E6E1]' },
    { id: 'shared-notifications', label: 'Alerts & Messages', icon: Bell },
  ];

  // Citizen Navigation
  const citizenNav = [
    { id: 'citizen-home', label: 'Citizen Home', icon: LayoutDashboard },
    { id: 'citizen-explorer', label: 'Project Explorer', icon: FolderKanban },
    { id: 'citizen-report', label: 'Report Grievance', icon: FileText, badge: 'Report', badgeColor: 'bg-[#EBF3FA] text-[#1D5D9B] border-[#D0E2F2]' },
    { id: 'citizen-tracker', label: 'Track Complaint', icon: CheckCircle2 },
    { id: 'citizen-ai', label: 'Citizen AI Assistant', icon: Bot },
    { id: 'shared-notifications', label: 'Status Updates', icon: Bell },
  ];

  const currentNav = role === 'admin' ? adminNav : role === 'contractor' ? contractorNav : citizenNav;

  return (
    <aside className="w-64 bg-white text-slate-800 flex flex-col border-r border-[#E4E9EF] shrink-0 select-none min-h-screen">
      
      {/* Brand Header */}
      <div className="p-4 px-5 border-b border-[#E4E9EF] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Minimal Geometric Shield Logo */}
          <div className="w-8 h-8 rounded-lg bg-[#123B67] flex items-center justify-center text-white shadow-2xs">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold text-[#123B67] tracking-tight">FundGuard</span>
              <span className="text-xs font-bold text-[#168A78] bg-[#F0F7F6] px-1 rounded border border-[#C6E6E1]">AI</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">MPLADS Risk Intelligence</p>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        <div>
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
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
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition text-left ${
                    isActive
                      ? 'bg-[#EBF3FA] text-[#123B67] font-bold border-l-3 border-[#123B67] rounded-l-none'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#123B67]' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${item.badgeColor}`}>
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
      <div className="p-3.5 px-4 bg-[#FAFBFC] border-t border-[#E4E9EF] text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#123B67] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
              {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
            </div>
            <div className="min-w-0">
              <span className="text-[#0F2942] font-bold text-xs truncate block leading-tight">
                {currentUser?.name || 'Active Session'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono truncate block">
                {currentUser?.badge || 'OFFICIAL'}
              </span>
            </div>
          </div>
          
          <button 
            onClick={onLogout}
            title="Exit to Portal Gateway"
            className="p-1 rounded text-slate-400 hover:text-[#C95752] transition"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </aside>
  );
}
