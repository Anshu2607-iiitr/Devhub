import React from 'react';
import { 
  GitCommit, CheckCircle2, Clock, AlertTriangle, 
  ArrowRight, ShieldCheck, UserCheck, FileText 
} from 'lucide-react';
import GovernancePrincipleBanner from '../../components/GovernancePrincipleBanner';

export default function InspectionWorkflowPage({ onNavigate }) {
  const steps = [
    { num: '01', name: 'AI Anomaly Flag Detected', role: 'Multi-Signal AI Engine', status: 'Completed', date: '28 Aug 2026', desc: '42% visual vs 80% reported progress discrepancy flagged.' },
    { num: '02', name: 'Officer Preliminary Review', role: 'Assistant Engineer', status: 'Completed', date: '29 Aug 2026', desc: 'Correlated contractor claim with citizen grievance GRV-JH-2026-9812.' },
    { num: '03', name: 'Inspection Assigned', role: 'State Nodal Officer', status: 'Completed', date: '29 Aug 2026', desc: 'Er. Alok Ranjan (Executive Engineer, PWD) formally deputed.' },
    { num: '04', name: 'On-Site Field Verification', role: 'Deputed Field Officer', status: 'Completed', date: '02 Sep 2026', desc: 'Physical cross-sectional core drilling and GPS boundary verification performed.' },
    { num: '05', name: 'Inspection Report Filed', role: 'Inspection Officer', status: 'Completed', date: '05 Sep 2026', desc: 'Comprehensive measurement docket uploaded with laboratory test certificates.' },
    { num: '06', name: 'Contractor Explanation', role: 'ABC Infrastructure Ltd.', status: 'Completed', date: '07 Sep 2026', desc: 'Contractor submitted reply stating monsoon rains delayed final bitumen layer.' },
    { num: '07', name: 'Authorized Decision', role: 'District Collector', status: 'In Progress', date: 'Active', desc: 'Final decision on rectified milestone schedule and payment hold.' },
    { num: '08', name: 'Resolved & Audit Recorded', role: 'Immutable Vault', status: 'Pending', date: 'Upcoming', desc: 'Permanent cryptographic sealing of audit docket.' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#123B67] font-bold text-xs uppercase tracking-wider">
            <GitCommit className="w-4 h-4 text-[#1D5D9B]" />
            <span>Statutory Inspection Lifecycle Workflow</span>
          </div>
          <h1 className="text-base font-bold text-[#0F2942] mt-0.5">
            Human-in-the-Loop Oversight Protocol (MPLAD-JH-2026-089)
          </h1>
        </div>

        <button
          onClick={() => onNavigate('admin-inspection-form')}
          className="px-4 py-2 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-2xs"
        >
          <span>Open Inspection Report Form</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <GovernancePrincipleBanner />

      {/* Steps Timeline Grid */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs space-y-3">
        <div className="space-y-3">
          {steps.map((s, idx) => (
            <div key={idx} className="flex items-start gap-4 p-3.5 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF]">
              <div className="w-8 h-8 rounded-lg bg-[#123B67] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                {s.num}
              </div>
              <div className="flex-1 min-w-0 space-y-1 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-[#0F2942]">{s.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    s.status === 'Completed' ? 'bg-[#F0FDF4] text-[#168A78] border-[#C6E6E1]' :
                    s.status === 'In Progress' ? 'bg-[#FEF9EE] text-[#C58A2B] border-[#FDE8B3]' : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {s.status} • {s.date}
                  </span>
                </div>
                <div className="text-[11px] text-[#1D5D9B] font-semibold">Actor: {s.role}</div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
