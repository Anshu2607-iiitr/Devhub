import React, { useState } from 'react';
import { 
  Shield, ShieldCheck, HardHat, Users, 
  ArrowRight, Sparkles, CheckCircle2, Lock 
} from 'lucide-react';
import GovAdminLogin from '../components/auth/GovAdminLogin';
import ContractorLogin from '../components/auth/ContractorLogin';
import CitizenLogin from '../components/auth/CitizenLogin';

export default function AuthGatewayPage({ onLogin }) {
  const [activeTab, setActiveTab] = useState('admin');

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col justify-between p-4 sm:p-6 select-none">
      
      {/* Top Brand Bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#123B67] flex items-center justify-center text-white shadow-2xs">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-extrabold text-[#123B67] tracking-tight">FundGuard <span className="text-[#168A78]">AI</span></span>
            <p className="text-[10px] text-slate-400 font-medium">MPLADS Risk Intelligence</p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-[#E4E9EF]">
          MoSPI Official Portal Gate
        </span>
      </header>

      {/* Main Login Card */}
      <main className="max-w-xl w-full mx-auto my-8 bg-white border border-[#E4E9EF] rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
        
        <div className="text-center space-y-1.5">
          <h1 className="text-xl font-extrabold text-[#0F2942] tracking-tight">
            Digital Public Infrastructure Access
          </h1>
          <p className="text-xs text-slate-500">
            Select your authorized statutory persona to proceed to FundGuard AI
          </p>
        </div>

        {/* 3 Tab Persona Buttons */}
        <div className="grid grid-cols-3 gap-2 bg-[#F6F8FB] p-1 rounded-xl border border-[#E4E9EF]">
          <button
            onClick={() => setActiveTab('admin')}
            className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'admin' 
                ? 'bg-[#123B67] text-white shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Gov Authority</span>
          </button>

          <button
            onClick={() => setActiveTab('contractor')}
            className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'contractor' 
                ? 'bg-[#123B67] text-white shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>Contractor</span>
          </button>

          <button
            onClick={() => setActiveTab('citizen')}
            className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'citizen' 
                ? 'bg-[#123B67] text-white shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Citizen</span>
          </button>
        </div>

        {/* Dynamic Login Form */}
        <div className="pt-2">
          {activeTab === 'admin' && <GovAdminLogin onLogin={onLogin} />}
          {activeTab === 'contractor' && <ContractorLogin onLogin={onLogin} />}
          {activeTab === 'citizen' && <CitizenLogin onLogin={onLogin} />}
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto text-center text-xs text-slate-400 py-3 border-t border-[#E4E9EF]">
        FundGuard AI • Smart India Hackathon 2026 Production Platform • MoSPI Public Digital Infrastructure
      </footer>

    </div>
  );
}
