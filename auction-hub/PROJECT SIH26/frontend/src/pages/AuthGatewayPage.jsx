import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, HardHat, Users, Landmark, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import GovAdminLogin from '../components/auth/GovAdminLogin';
import ContractorLogin from '../components/auth/ContractorLogin';
import CitizenLogin from '../components/auth/CitizenLogin';

export default function AuthGatewayPage({ onLogin }) {
  const [activePortal, setActivePortal] = useState('admin'); // 'admin', 'contractor', 'citizen'

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between select-none relative overflow-hidden">
      
      {/* Background Subtle Coordinate Lines */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] [background-size:32px_32px]"></div>

      {/* Top Header Bar */}
      <header className="relative z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">FundGuard <span className="text-blue-400">AI</span></h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                SIH 2026
              </span>
            </div>
            <p className="text-xs text-slate-400">
              AI-Powered Risk Intelligence Platform for MPLADS Fund Monitoring
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>MoSPI National Vigilance Node</span>
          </div>
          <span className="text-slate-600">|</span>
          <span>Jharkhand State Deployment</span>
        </div>
      </header>

      {/* Center Auth Container */}
      <div className="relative z-10 max-w-2xl w-full mx-auto px-4 py-8">
        
        {/* Portal Picker Tabs */}
        <div className="bg-slate-950/90 border border-slate-800 p-2 rounded-2xl shadow-2xl mb-6">
          <span className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Select Your Access Portal:
          </span>
          
          <div className="grid grid-cols-3 gap-2 mt-1">
            
            {/* Gov Admin Tab */}
            <button
              onClick={() => setActivePortal('admin')}
              className={`p-3 rounded-xl transition flex flex-col items-center gap-1.5 border ${
                activePortal === 'admin'
                  ? 'bg-blue-900/90 border-blue-500 text-white shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <ShieldCheck className={`w-5 h-5 ${activePortal === 'admin' ? 'text-blue-300' : 'text-slate-400'}`} />
              <span className="text-xs font-bold text-center">1. Govt Authority</span>
              <span className="text-[10px] text-slate-400 hidden sm:block">MoSPI & Collectors</span>
            </button>

            {/* Contractor Tab */}
            <button
              onClick={() => setActivePortal('contractor')}
              className={`p-3 rounded-xl transition flex flex-col items-center gap-1.5 border ${
                activePortal === 'contractor'
                  ? 'bg-amber-900/90 border-amber-500 text-white shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <HardHat className={`w-5 h-5 ${activePortal === 'contractor' ? 'text-amber-300' : 'text-slate-400'}`} />
              <span className="text-xs font-bold text-center">2. Contractor</span>
              <span className="text-[10px] text-slate-400 hidden sm:block">Live Photo Ingestion</span>
            </button>

            {/* Citizen Tab */}
            <button
              onClick={() => setActivePortal('citizen')}
              className={`p-3 rounded-xl transition flex flex-col items-center gap-1.5 border ${
                activePortal === 'citizen'
                  ? 'bg-emerald-900/90 border-emerald-500 text-white shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Users className={`w-5 h-5 ${activePortal === 'citizen' ? 'text-emerald-300' : 'text-slate-400'}`} />
              <span className="text-xs font-bold text-center">3. Citizen</span>
              <span className="text-[10px] text-slate-400 hidden sm:block">Public Transparency</span>
            </button>

          </div>
        </div>

        {/* Selected Role Form Card */}
        <div className="bg-white text-slate-900 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {activePortal === 'admin' && <GovAdminLogin onLogin={onLogin} />}
          {activePortal === 'contractor' && <ContractorLogin onLogin={onLogin} />}
          {activePortal === 'citizen' && <CitizenLogin onLogin={onLogin} />}
        </div>

      </div>

      {/* Bottom Footer */}
      <footer className="relative z-10 border-t border-slate-800 bg-slate-950/80 px-6 py-4 text-center text-xs text-slate-500">
        <p>
          FundGuard AI • Smart India Hackathon 2026 • Ministry of Statistics & Programme Implementation (MoSPI)
        </p>
      </footer>

    </div>
  );
}
