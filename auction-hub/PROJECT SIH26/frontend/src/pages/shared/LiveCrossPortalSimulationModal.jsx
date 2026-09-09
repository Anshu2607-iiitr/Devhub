import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, CheckCircle2, AlertOctagon, 
  Camera, Users, ShieldAlert, FileSearch, CheckSquare, History, X 
} from 'lucide-react';

export default function LiveCrossPortalSimulationModal({ isOpen, onClose, onNavigate }) {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState(0);

  const simulationSteps = [
    {
      role: '1. CONTRACTOR PORTAL',
      title: 'Contractor Submits Progress Milestone',
      desc: 'ABC Infrastructure Ltd. uploads monthly report claiming 80% completion and ₹90 Lakh expenditure for Namkum Road.',
      icon: Camera,
      color: 'bg-amber-600 text-white'
    },
    {
      role: '2. AI COMPUTER VISION ENGINE',
      title: 'AI Detects 38% Physical Disparity & GPS Deviation',
      desc: 'Computer Vision models estimate visible progress at only 42%. Evidence photo GPS deviates 1.42 km from registered polygon.',
      icon: ShieldAlert,
      color: 'bg-red-600 text-white'
    },
    {
      role: '3. CITIZEN TRANSPARENCY PORTAL',
      title: 'Independent Citizen Grievance Logged',
      desc: 'Resident Amit Kumar uploads counter-photos showing unpaved gravel and waterlogging (Grievance ID: GRV-JH-2026-9812).',
      icon: Users,
      color: 'bg-emerald-600 text-white'
    },
    {
      role: '4. MULTI-SIGNAL CORRELATION ENGINE',
      title: 'Risk Score Spikes to 87/100 (HIGH RISK)',
      desc: 'Correlating contractor claim + AI CV output + citizen report increases risk score and triggers automated priority triage.',
      icon: AlertOctagon,
      color: 'bg-red-700 text-white'
    },
    {
      role: '5. GOVT ADMIN COMMAND CENTRE',
      title: 'Authority Orders Physical Field Inspection',
      desc: 'State Nodal Officer reviews explainable AI attribution and formally deputes Executive Engineer Er. Alok Ranjan.',
      icon: FileSearch,
      color: 'bg-blue-900 text-white'
    },
    {
      role: '6. STATUTORY RESOLUTION & AUDIT SEAL',
      title: 'Inspection Filed & 30-Day Rectification Notice Issued',
      desc: 'Field inspection confirms 42% progress. Tranche 3 payment held. Citizen notified and audit trail cryptographically sealed.',
      icon: CheckCircle2,
      color: 'bg-emerald-700 text-white'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-5 flex flex-col">
        
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Live Cross-Portal Correlation Simulation</h3>
              <p className="text-[11px] text-slate-400">End-to-End Demonstration of SIH 2026 Core Value Proposition</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression */}
        <div className="p-6 space-y-6 flex-1">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
            <span>Simulation Step {currentStep + 1} of {simulationSteps.length}</span>
            <span className="font-mono text-blue-900 font-bold">Project: MPLAD-JH-2026-089</span>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-xs ${simulationSteps[currentStep].color}`}>
                {React.createElement(simulationSteps[currentStep].icon, { className: 'w-5 h-5' })}
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  {simulationSteps[currentStep].role}
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  {simulationSteps[currentStep].title}
                </h4>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
              {simulationSteps[currentStep].desc}
            </p>
          </div>

          {/* Stepper Dots */}
          <div className="flex justify-center gap-1.5">
            {simulationSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`h-2 rounded-full transition-all ${
                  currentStep === i ? 'w-8 bg-blue-900' : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 disabled:opacity-40"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {currentStep < simulationSteps.length - 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-sm"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onNavigate('admin-investigation');
                }}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-sm"
              >
                <span>View Final Investigation Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
