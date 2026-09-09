import React, { useState } from 'react';
import { 
  History, ShieldCheck, Lock, Search, Filter, 
  FileText, ArrowRight, CheckCircle2, Calendar 
} from 'lucide-react';
import { AUDIT_TRAIL_RECORDS } from '../../data/mockData';

export default function AuditTrailPage() {
  const [search, setSearch] = useState('');
  const [records, setRecords] = useState(AUDIT_TRAIL_RECORDS);

  const filtered = records.filter((r) => {
    if (search) {
      const q = search.toLowerCase();
      return r.project_id.toLowerCase().includes(q) || r.action.toLowerCase().includes(q) || r.user.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
            <History className="w-4 h-4 text-blue-700" />
            <span>Screen 18: Immutable Audit Trail & Cryptographic Ledger</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            Tamper-Proof Statutory Audit Log of All State Actions
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200">
          <Lock className="w-3.5 h-3.5 text-blue-700" />
          <span>Cryptographically Sealed</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center justify-between gap-3 text-xs">
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search audit ID, project, user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          />
        </div>
        <span className="text-slate-500 font-mono">Total {filtered.length} Immutable Events</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Audit ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Authorized Actor</th>
                <th className="py-3 px-4">Action Committed</th>
                <th className="py-3 px-4">Project ID</th>
                <th className="py-3 px-4">Reason & Measurement Findings</th>
                <th className="py-3 px-4">Approval Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filtered.map((r) => (
                <tr key={r.audit_id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-mono font-bold text-blue-800 text-[11px]">{r.audit_id}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[10px] whitespace-nowrap">{r.timestamp}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{r.user}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                      {r.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{r.project_id}</td>
                  <td className="py-3 px-4 max-w-xs text-slate-700 leading-normal">{r.reason}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[10px]">{r.approval}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
