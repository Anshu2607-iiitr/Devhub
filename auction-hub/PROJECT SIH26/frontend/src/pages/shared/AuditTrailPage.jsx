import React from 'react';
import { 
  History, ShieldCheck, CheckCircle2, Lock, 
  FileText, ArrowRight, UserCheck 
} from 'lucide-react';
import { AUDIT_TRAIL_RECORDS } from '../../data/mockData';
import GovernancePrincipleBanner from '../../components/GovernancePrincipleBanner';

export default function AuditTrailPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[#123B67] font-bold text-xs uppercase tracking-wider">
            <History className="w-4 h-4 text-[#1D5D9B]" />
            <span>Immutable Statutory Audit Ledger</span>
          </div>
          <h1 className="text-base font-bold text-[#0F2942] mt-0.5">
            Tamper-Proof Cryptographic Activity Records & State Transitions
          </h1>
        </div>

        <span className="text-xs font-mono font-bold text-[#168A78] bg-[#F0F7F6] px-3 py-1.5 rounded-lg border border-[#C6E6E1]">
          SHA-256 Verified Vault
        </span>
      </div>

      <GovernancePrincipleBanner />

      {/* Ledger Table */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#FAFBFC] border-y border-[#E4E9EF] text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Timestamp (IST)</th>
                <th className="py-2.5 px-3">Project Ref</th>
                <th className="py-2.5 px-3">Actor / Entity</th>
                <th className="py-2.5 px-3">Action Description</th>
                <th className="py-2.5 px-3">State Transition</th>
                <th className="py-2.5 px-3 text-right">Approval Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E9EF]">
              {AUDIT_TRAIL_RECORDS.map((row) => (
                <tr key={row.audit_id} className="hover:bg-slate-50 transition font-medium">
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">{row.timestamp}</td>
                  <td className="py-3 px-3 font-bold text-[#123B67] font-mono whitespace-nowrap">{row.project_id}</td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-slate-900 block">{row.user}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-700">{row.action}</td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                      {row.previous_status} ➔ {row.new_status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-[10px] text-[#168A78]">
                    {row.approval}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
