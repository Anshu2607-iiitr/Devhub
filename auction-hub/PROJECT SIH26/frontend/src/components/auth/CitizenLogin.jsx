import React, { useState } from 'react';
import { Users, ShieldCheck, MapPin, Eye, CheckCircle2, ArrowRight, UserCheck, Lock, Phone } from 'lucide-react';

export default function CitizenLogin({ onLogin }) {
  const [loginMode, setLoginMode] = useState('verified'); // 'verified' or 'anonymous'
  const [mobile, setMobile] = useState('9876543210');
  const [constituency, setConstituency] = useState('Ranchi Parliamentary Constituency');
  const [ward, setWard] = useState('Ward 12 - Namkum');
  const [voterId, setVoterId] = useState('JH/08/042/109283');

  const handleQuickLogin = (name, mode, score, weight) => {
    onLogin({
      role: 'citizen',
      name: name,
      mode: mode,
      constituency: constituency,
      ward: ward,
      credibilityScore: score,
      feedbackWeight: weight,
      badge: mode === 'verified' ? 'VERIFIED-CITIZEN' : 'PUBLIC-GUEST'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginMode === 'verified') {
      onLogin({
        role: 'citizen',
        name: 'Amit Kumar',
        mode: 'verified',
        constituency: constituency,
        ward: ward,
        credibilityScore: 85,
        feedbackWeight: 0.85,
        badge: 'VERIFIED-CITIZEN'
      });
    } else {
      onLogin({
        role: 'citizen',
        name: 'Anonymous Citizen',
        mode: 'anonymous',
        constituency: constituency,
        ward: ward,
        credibilityScore: 50,
        feedbackWeight: 0.50,
        badge: 'PUBLIC-GUEST'
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-emerald-900 text-white p-5 rounded-xl flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-800 border border-emerald-700 flex items-center justify-center font-bold">
            <Users className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">CITIZEN TRANSPARENCY PORTAL</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-800 border border-emerald-600 font-mono text-emerald-200">PUBLIC</span>
            </div>
            <h3 className="text-base font-bold text-white">Track Local Works & Submit Ground Reality Evidence</h3>
          </div>
        </div>
      </div>

      {/* Mode Switcher Ribbon */}
      <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setLoginMode('verified')}
          className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
            loginMode === 'verified'
              ? 'bg-white text-emerald-900 shadow-xs border border-slate-200 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-4 h-4 text-emerald-700" />
          <span>Verified Resident Login</span>
        </button>
        <button
          type="button"
          onClick={() => setLoginMode('anonymous')}
          className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
            loginMode === 'anonymous'
              ? 'bg-white text-blue-900 shadow-xs border border-slate-200 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Eye className="w-4 h-4 text-blue-700" />
          <span>Anonymous Public Access</span>
        </button>
      </div>

      {/* Credibility Info Box */}
      {loginMode === 'verified' ? (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-2.5 text-xs text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Higher Credibility Weighting (85/100)</span>
            <p className="text-[11px] mt-0.5 leading-normal">
              Logging in with mobile OTP & Voter ID assigns your reports a higher audit weight (0.85), expediting district collectorate field inspections.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2.5 text-xs text-blue-900">
          <Eye className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">No Personal Data Required</span>
            <p className="text-[11px] mt-0.5 leading-normal">
              Browse all sanctioned projects in your area anonymously. Ground reports submitted in guest mode are weighted by AI duplicate and visual confidence filters.
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        {loginMode === 'verified' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile Number (OTP Verified)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="9876543210"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Voter ID / EPIC No. (Optional)</label>
              <input
                type="text"
                value={voterId}
                onChange={(e) => setVoterId(e.target.value)}
                placeholder="JH/08/042/109283"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block font-bold text-slate-700 mb-1">Parliamentary Constituency</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={constituency}
              onChange={(e) => setConstituency(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
            >
              <option value="Ranchi Parliamentary Constituency">Ranchi Parliamentary Constituency (Jharkhand)</option>
              <option value="Khunti (ST) Parliamentary Constituency">Khunti (ST) Parliamentary Constituency</option>
              <option value="Lohardaga (ST) Parliamentary Constituency">Lohardaga (ST) Parliamentary Constituency</option>
              <option value="Dhanbad Parliamentary Constituency">Dhanbad Parliamentary Constituency</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Local Ward / Block Selection</label>
          <select
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
          >
            <option value="Ward 12 - Namkum">Ward 12 — Namkum & Hatia Industrial Belt</option>
            <option value="Ward 05 - Kanke">Ward 05 — Kanke & Morabadi Sector</option>
            <option value="Ward 22 - Doranda">Ward 22 — Doranda & Hinoo</option>
            <option value="Block - Ratu">Ratu Rural Development Block</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span>{loginMode === 'verified' ? 'Login as Verified Resident' : 'Enter as Public Guest'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </form>

      {/* 1-Click Demo Profiles */}
      <div className="pt-4 border-t border-slate-200 space-y-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          ⚡ 1-Click Hackathon Demo Profiles
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickLogin('Amit Kumar', 'verified', 85, 0.85)}
            className="p-2.5 text-left bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-lg transition text-xs"
          >
            <strong className="text-slate-900 block font-semibold">Verified Citizen (Score: 85)</strong>
            <span className="text-[10px] text-slate-500">Full ground photo report & status tracking</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('Anonymous Citizen', 'anonymous', 50, 0.50)}
            className="p-2.5 text-left bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 rounded-lg transition text-xs"
          >
            <strong className="text-slate-900 block font-semibold">Public Whistleblower</strong>
            <span className="text-[10px] text-slate-500">Direct open transparency viewer</span>
          </button>
        </div>
      </div>

    </div>
  );
}
