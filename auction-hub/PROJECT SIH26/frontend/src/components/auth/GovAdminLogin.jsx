import React, { useState } from 'react';
import { ShieldCheck, Lock, User, KeyRound, Building, AlertOctagon, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function GovAdminLogin({ onLogin }) {
  const [email, setEmail] = useState('admin.jharkhand@nic.in');
  const [password, setPassword] = useState('••••••••••••');
  const [department, setDepartment] = useState('MoSPI State Nodal Office');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('543210');

  const handleQuickLogin = (roleName, userEmail, dept) => {
    onLogin({
      role: 'admin',
      name: roleName,
      email: userEmail,
      department: dept,
      designation: 'State / District Authority',
      badge: 'GOV-ADMIN-SEC-1'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpStep) {
      setOtpStep(true);
      return;
    }
    onLogin({
      role: 'admin',
      name: 'Dr. Rameshwar Oraon',
      email: email,
      department: department,
      designation: 'State Nodal Officer',
      badge: 'GOV-ADMIN-SEC-1'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Role Header Banner */}
      <div className="bg-blue-900 text-white p-5 rounded-xl flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-800 border border-blue-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">GOVERNMENT AUTHORITY PORTAL</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-800 border border-blue-600 font-mono text-blue-200">RESTRICTED</span>
            </div>
            <h3 className="text-base font-bold text-white">Ministry of Statistics & Programme Implementation (MoSPI)</h3>
          </div>
        </div>
      </div>

      {/* Legal & Security Warning Notice */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
        <AlertOctagon className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Authorized Personnel Only:</strong> Accessing this system without official authorization is a punishable offence under Sections 43 & 66 of the Information Technology Act, 2000. All sessions are cryptographically logged.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        {!otpStep ? (
          <>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Jurisdiction / Department</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                >
                  <option value="MoSPI State Nodal Office">Jharkhand State Nodal Directorate (MoSPI)</option>
                  <option value="District Collectorate, Ranchi">District Collectorate — Ranchi Circle</option>
                  <option value="District Collectorate, Khunti">District Collectorate — Khunti Circle</option>
                  <option value="State Vigilance Commission">State Technical Vigilance & Audit Cell</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Govt Email / NIC ID</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name.officer@nic.in"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password / Digital Token PIN</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter high-security password"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Proceed to 2FA Authentication</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg space-y-1">
              <span className="font-bold text-blue-900 block">Two-Factor Authentication (2FA)</span>
              <p className="text-[11px] text-blue-800">
                A 6-digit secure verification code has been dispatched to your NIC registered mobile and email.
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Enter 6-Digit Gov OTP</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="543210"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono text-center tracking-widest text-base font-bold focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="w-1/3 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold rounded-lg transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify & Enter Dashboard</span>
              </button>
            </div>
          </div>
        )}

      </form>

      {/* 1-Click Evaluation Demo Personas */}
      <div className="pt-4 border-t border-slate-200 space-y-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          ⚡ 1-Click Hackathon Demo Profiles
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickLogin('Dr. Rameshwar Oraon', 'admin.jharkhand@nic.in', 'State Nodal Directorate')}
            className="p-2.5 text-left bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 rounded-lg transition text-xs"
          >
            <strong className="text-slate-900 block font-semibold">Jharkhand State Nodal Officer</strong>
            <span className="text-[10px] text-slate-500">Full 24-district surveillance access</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('Rahul Sharma, IAS', 'dc.ranchi@jharkhand.gov.in', 'District Collectorate Ranchi')}
            className="p-2.5 text-left bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 rounded-lg transition text-xs"
          >
            <strong className="text-slate-900 block font-semibold">District Collector (Ranchi)</strong>
            <span className="text-[10px] text-slate-500">Ranchi circle inspection & audit triage</span>
          </button>
        </div>
      </div>

    </div>
  );
}
