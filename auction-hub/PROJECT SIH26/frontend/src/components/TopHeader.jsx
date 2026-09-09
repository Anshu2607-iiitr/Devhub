import React from 'react';
import { 
  Search, Bell, ShieldCheck, HardHat, Users, 
  LogOut, Sparkles, Globe, Shield 
} from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function TopHeader({ 
  activeNav, 
  onNavigate,
  onSearch, 
  searchQuery = '', 
  currentUser, 
  onSwitchRole, 
  onLogout,
  lang = 'en',
  onToggleLang,
  onOpenSimulator,
  unreadNotifsCount = 3
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const role = currentUser?.role || 'admin';

  return (
    <header className="bg-white border-b border-[#E4E9EF] sticky top-0 z-20 px-6 py-2.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-2xs">
      
      {/* Left: Breadcrumbs & Page Context */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span className="text-[#123B67] font-extrabold">{t.system_title}</span>
            <span>/</span>
            <span className="text-[#1D5D9B] font-semibold">
              {role === 'admin' ? t.role_admin : role === 'contractor' ? t.role_contractor : t.role_citizen}
            </span>
          </div>
          <h2 className="text-xs font-bold text-[#0F2942] mt-0.5">
            {t.system_subtitle}
          </h2>
        </div>
      </div>

      {/* Right Controls: Persona Switcher, Status, Simulator */}
      <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end text-xs">
        
        {/* System Operational Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-[#F0F7F6] border border-[#C6E6E1] rounded-lg text-[10px] font-bold text-[#168A78]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#168A78] animate-pulse"></span>
          <span>SYSTEM OPERATIONAL</span>
        </div>

        {/* 1-Click Live Cross-Portal Simulator Trigger */}
        <button
          onClick={onOpenSimulator}
          className="px-3 py-1.5 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-bold rounded-lg text-[11px] transition shadow-2xs flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{t.live_sim_btn}</span>
        </button>

        {/* Language Switcher (EN / HI) */}
        <button
          onClick={onToggleLang}
          className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-lg text-[11px] transition flex items-center gap-1 border border-[#E4E9EF]"
          title="Toggle English / Hindi"
        >
          <Globe className="w-3.5 h-3.5 text-[#1D5D9B]" />
          <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
        </button>

        {/* Persona Switcher Ribbon */}
        <div className="flex items-center bg-[#F6F8FB] p-0.5 rounded-lg border border-[#E4E9EF] text-[11px]">
          <button
            onClick={() => onSwitchRole('contractor')}
            className={`px-2.5 py-1 rounded-md font-bold transition flex items-center gap-1 ${
              role === 'contractor' 
                ? 'bg-white text-[#C58A2B] shadow-2xs border border-[#E4E9EF]' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <HardHat className="w-3 h-3" />
            <span className="hidden sm:inline">Contractor</span>
          </button>

          <button
            onClick={() => onSwitchRole('admin')}
            className={`px-2.5 py-1 rounded-md font-bold transition flex items-center gap-1 ${
              role === 'admin' 
                ? 'bg-[#123B67] text-white shadow-2xs' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span className="hidden sm:inline">Gov Admin</span>
          </button>

          <button
            onClick={() => onSwitchRole('citizen')}
            className={`px-2.5 py-1 rounded-md font-bold transition flex items-center gap-1 ${
              role === 'citizen' 
                ? 'bg-white text-[#168A78] shadow-2xs border border-[#E4E9EF]' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-3 h-3" />
            <span className="hidden sm:inline">Citizen</span>
          </button>
        </div>

        {/* Notifications Icon Button */}
        <button
          onClick={() => onNavigate('shared-notifications')}
          title="Open Notification Center"
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-[#E4E9EF] relative transition"
        >
          <Bell className="w-4 h-4" />
          {unreadNotifsCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-[#C95752] absolute top-1 right-1 ring-2 ring-white"></span>
          )}
        </button>

        {/* Exit Button */}
        <button
          onClick={onLogout}
          title="Exit to Portal Gateway"
          className="p-1.5 rounded-lg text-slate-400 hover:text-[#C95752] hover:bg-red-50 border border-[#E4E9EF] transition text-[11px] flex items-center gap-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-semibold">Exit</span>
        </button>

      </div>

    </header>
  );
}
