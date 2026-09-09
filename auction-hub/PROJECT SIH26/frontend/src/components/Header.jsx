import React from 'react';
import { ShieldAlert, BarChart3, ListFilter, MapPin, Copy, Building2, Zap, Landmark, Camera, Users, Bot } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, totalMonitored, criticalCount, onOpenGlossary }) {
  const tabs = [
    { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
    { id: 'mps', label: '543 Lok Sabha MPs', icon: Landmark },
    { id: 'projects', label: 'Flagged Projects', icon: ListFilter, badge: criticalCount },
    { id: 'contractor', label: 'Contractor Portal', icon: Camera },
    { id: 'citizen', label: 'Citizen Verification', icon: Users },
    { id: 'chatbot', label: 'Explainable AI Chatbot', icon: Bot },
    { id: 'map', label: 'Constituency Maps', icon: MapPin },
    { id: 'duplicates', label: 'Duplicate Clusters', icon: Copy },
    { id: 'vendors', label: 'Vendors', icon: Building2 },
    { id: 'simulator', label: 'Proposal Sandbox', icon: Zap, highlight: true },
  ];


  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-md backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Info */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500 rounded-lg flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-white tracking-wide">
                  MPLADS <span className="text-amber-400 font-extrabold">VIGIL</span>
                </h1>
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" title="System Active"></span>
              </div>
              <p className="text-xs text-slate-400">
                MPLADS Fund Monitoring Platform
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenGlossary}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-amber-400 text-xs font-semibold transition flex items-center gap-1.5"
              title="Open AI & Statistical Methodology Glossary"
            >
              <span>Methodology & Help</span>
            </button>

            {/* Status Info */}
            <div className="hidden lg:flex items-center text-xs text-slate-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              <span>Monitored: <span className="text-white font-semibold">₹{totalMonitored || '0'} Cr</span></span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-800/80 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                    : tab.highlight
                    ? 'text-amber-400 hover:bg-slate-800 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : tab.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-slate-950 text-amber-400' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
