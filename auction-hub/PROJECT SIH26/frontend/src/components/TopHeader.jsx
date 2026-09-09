import React from 'react';
import { 
  Search, Bell, ShieldCheck, HardHat, Users, 
  LogOut, Sparkles, Globe, ArrowRight 
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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs px-6 py-2.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      
      {/* Left: Brand Identity & Breadcrumb */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <span className="text-blue-900 font-extrabold">{t.system_title}</span>
            <span>/</span>
            <span className="text-slate-700 font-semibold">
              {role === 'admin' ? t.role_admin : role === 'contractor' ? t.role_contractor : t.role_citizen}
            </span>
          </div>
          <h2 className="text-sm font-bold text-slate-900 mt-0.5">
            {t.system_subtitle}
          </h2>
        </div>
      </div>

      {/* Right: Controls & Persona Switcher */}
      <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end text-xs">
        
        {/* 1-Click Live Cross-Portal Simulator Trigger */}
        <button
          onClick={onOpenSimulator}
          className="px-3 py-1.5 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-bold rounded-lg text-[11px] transition shadow-xs flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{t.live_sim_btn}</span>
        </button>

        {/* Language Switcher Button (EN / HI) */}
        <button
          onClick={onToggleLang}
          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-[11px] transition flex items-center gap-1 border border-slate-200"
          title="Toggle English / Hindi"
        >
          <Globe className="w-3.5 h-3.5 text-blue-700" />
          <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
        </button>

        {/* Persona Switcher Ribbon */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px]">
          <button
            onClick={() => onSwitchRole('contractor')}
            className={`px-2.5 py-1 rounded-md font-bold transition flex items-center gap-1 ${
              role === 'contractor' 
                ? 'bg-amber-700 text-white shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HardHat className="w-3 h-3" />
            <span className="hidden sm:inline">1. Contractor</span>
          </button>

          <button
            onClick={() => onSwitchRole('admin')}
            className={`px-2.5 py-1 rounded-md font-bold transition flex items-center gap-1 ${
              role === 'admin' 
                ? 'bg-blue-900 text-white shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span className="hidden sm:inline">2. Govt Admin</span>
          </button>

          <button
            onClick={() => onSwitchRole('citizen')}
            className={`px-2.5 py-1 rounded-md font-bold transition flex items-center gap-1 ${
              role === 'citizen' 
                ? 'bg-emerald-700 text-white shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3 h-3" />
            <span className="hidden sm:inline">3. Citizen</span>
          </button>
        </div>

        {/* Notifications Icon Button */}
        <button
          onClick={() => onNavigate('shared-notifications')}
          title="Open Notification Center"
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 relative transition"
        >
          <Bell className="w-4 h-4" />
          {unreadNotifsCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1 ring-2 ring-white"></span>
          )}
        </button>

        {/* User Profile Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] text-white ${
            role === 'admin' ? 'bg-blue-900' : role === 'contractor' ? 'bg-amber-700' : 'bg-emerald-700'
          }`}>
            {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
          </div>
          <div className="hidden xl:block text-left text-xs">
            <span className="font-bold text-slate-900 block leading-tight truncate max-w-[110px]">
              {currentUser?.name || 'User'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {currentUser?.badge || 'VERIFIED'}
            </span>
          </div>
        </div>

        {/* Exit to Gateway */}
        <button
          onClick={onLogout}
          title="Exit to Portal Gateway"
          className="p-1.5 rounded-lg text-slate-500 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition text-[11px] flex items-center gap-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-semibold">Exit</span>
        </button>

      </div>

    </header>
  );
}
