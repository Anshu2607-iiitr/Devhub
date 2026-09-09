import React, { useState } from 'react';
import { HardHat, Camera, MapPin, CheckCircle2, ArrowRight, AlertTriangle, FileText, Phone, Building2 } from 'lucide-react';

export default function ContractorLogin({ onLogin }) {
  const [vendorId, setVendorId] = useState('JH-CON-2026-089');
  const [gstin, setGstin] = useState('20AAACH7409R1ZV');
  const [mobile, setMobile] = useState('9876543210');
  const [selectedWork, setSelectedWork] = useState('MPLAD-JH-2026-089: Rural Road Improvement');

  const handleQuickLogin = (contractorName, vId, contractTitle) => {
    onLogin({
      role: 'contractor',
      name: contractorName,
      vendorId: vId,
      contractTitle: contractTitle,
      designation: 'Authorized General Contractor',
      badge: 'VERIFIED-CONTRACTOR'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      role: 'contractor',
      name: 'ABC Infrastructure Ltd.',
      vendorId: vendorId,
      contractTitle: selectedWork,
      designation: 'Authorized General Contractor',
      badge: 'VERIFIED-CONTRACTOR'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-amber-900 text-white p-5 rounded-xl flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-800 border border-amber-700 flex items-center justify-center font-bold">
            <HardHat className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">CONTRACTOR INGESTION PORTAL</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-800 border border-amber-600 font-mono text-amber-200">VENDORS</span>
            </div>
            <h3 className="text-base font-bold text-white">Direct Progress Photo & Milestone Submission</h3>
          </div>
        </div>
      </div>

      {/* Geofence & In-App Camera Notice */}
      <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg space-y-1.5 text-xs text-blue-900">
        <div className="flex items-center gap-2 font-bold text-blue-950">
          <Camera className="w-4 h-4 text-blue-700" />
          <span>Mandatory In-App Live Camera Requirement</span>
        </div>
        <p className="leading-relaxed text-[11px] text-blue-800">
          Gallery photo uploads are strictly disabled to prevent pre-recorded fraud. Ensure you enable device GPS location and camera permissions before capturing progress at the sanctioned project site.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        <div>
          <label className="block font-bold text-slate-700 mb-1">Contractor Vendor Registration ID</label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={vendorId}
              onChange={(e) => setVendorId(e.target.value)}
              placeholder="e.g. JH-CON-2026-089"
              required
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono font-bold focus:outline-none focus:border-amber-600 focus:bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">GSTIN Number</label>
            <input
              type="text"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              placeholder="20AAACH7409R1ZV"
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono focus:outline-none focus:border-amber-600 focus:bg-white"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Authorized Mobile OTP</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="9876543210"
                required
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono focus:outline-none focus:border-amber-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Active Awarded Sanction Contract</label>
          <div className="relative">
            <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={selectedWork}
              onChange={(e) => setSelectedWork(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-600 focus:bg-white"
            >
              <option value="MPLAD-JH-2026-089: Rural Road Improvement">MPLAD-JH-2026-089: Rural Road Improvement (Ranchi)</option>
              <option value="MPLAD-JH-2026-104: Community Health Center">MPLAD-JH-2026-104: Community Health Center (Khunti)</option>
              <option value="MPLAD-JH-2026-218: High School Science Block">MPLAD-JH-2026-218: High School Science Block (Gumla)</option>
              <option value="MPLAD-JH-2026-042: Solar Micro-Grid Installation">MPLAD-JH-2026-042: Solar Micro-Grid Installation (Simdega)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span>Authenticate & Open Ingestion Camera</span>
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
            onClick={() => handleQuickLogin('ABC Infrastructure Ltd.', 'JH-CON-2026-089', 'MPLAD-JH-2026-089: Rural Road Improvement')}
            className="p-2.5 text-left bg-slate-50 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 rounded-lg transition text-xs"
          >
            <strong className="text-slate-900 block font-semibold">ABC Infrastructure Ltd.</strong>
            <span className="text-[10px] text-slate-500">JH-CON-2026-089 • Active Road Contract</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('Chotanagpur Roadworks Corp', 'JH-CON-2026-042', 'MPLAD-JH-2026-042: Solar Micro-Grid')}
            className="p-2.5 text-left bg-slate-50 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 rounded-lg transition text-xs"
          >
            <strong className="text-slate-900 block font-semibold">Chotanagpur Roadworks</strong>
            <span className="text-[10px] text-slate-500">JH-CON-2026-042 • Clean Track Record</span>
          </button>
        </div>
      </div>

    </div>
  );
}
