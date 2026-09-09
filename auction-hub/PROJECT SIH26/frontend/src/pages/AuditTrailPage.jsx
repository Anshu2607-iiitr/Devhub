import React from 'react';
import { History, ShieldCheck, Lock, User, FileText } from 'lucide-react';
import { AUDIT_TRAIL_DATA } from '../data/mockData';

export default function AuditTrailPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <History className="w-5 h-5 text-blue-700" />
            <span>Immutable Audit Trail Activity Log</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically sealed, tamper-proof record of all authority orders, status updates, and risk parameter changes
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200">
          <Lock className="w-3.5 h-3.5 text-blue-700" />
          <span>Tamper-Proof Audit Vault</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Audit ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Authorized User</th>
                <th className="py-3 px-4">Action Committed</th>
                <th className="py-3 px-4">Project ID</th>
                <th className="py-3 px-4">Reason & Justification</th>
                <th className="py-3 px-4">Approval Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {AUDIT_TRAIL_DATA.map((log) => (
                <tr key={log.audit_id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-mono font-bold text-blue-800 text-[11px]">{log.audit_id}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[10px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{log.user}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{log.project_id}</td>
                  <td className="py-3 px-4 max-w-xs text-slate-700 leading-normal">{log.reason}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[10px]">{log.approval}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
