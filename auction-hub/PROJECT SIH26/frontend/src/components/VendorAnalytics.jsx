import React, { useState, useEffect } from 'react';
import { Building2, ShieldAlert, AlertTriangle, CheckCircle2, TrendingUp, Search } from 'lucide-react';
import { fetchVendors } from '../api';

export default function VendorAnalytics() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchVendors()
      .then((data) => setVendors(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = vendors.filter((v) => 
    v.vendor_name.toLowerCase().includes(search.toLowerCase()) ||
    v.vendor_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
            <Building2 className="w-5 h-5" />
            <span>Vendor Analytics</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Vendor risk profiles and project distribution
          </p>
        </div>

        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search vendor name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Vendor / Entity Name</th>
                <th className="px-4 py-3">Vendor ID</th>
                <th className="px-4 py-3 text-right">Total Works</th>
                <th className="px-4 py-3 text-right">Awarded (₹ Cr)</th>
                <th className="px-4 py-3 text-center">Territories</th>
                <th className="px-4 py-3 text-center">Critical Flags</th>
                <th className="px-4 py-3 text-center">Duplicate Alerts</th>
                <th className="px-4 py-3 text-center">Avg Risk</th>
                <th className="px-4 py-3 text-center">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-4 py-12 text-center text-slate-400">
                    Loading vendors...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-12 text-center text-slate-500">
                    No vendors found matching search.
                  </td>
                </tr>
              ) : (
                filtered.map((v) => {
                  const isHighRisk = v.vendor_status === 'High Risk';
                  const isModerate = v.vendor_status === 'Moderate';

                  return (
                    <tr key={v.vendor_id} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3 font-semibold text-slate-100 max-w-xs truncate">
                        {v.vendor_name}
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-400">
                        {v.vendor_id}
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {v.total_projects}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-slate-100">
                        ₹{v.total_crores}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-slate-300">
                        {v.distinct_districts}
                      </td>
                      <td className="px-4 py-3 text-center font-mono">
                        <span className={v.critical_projects > 0 ? 'text-red-400 font-bold' : 'text-slate-400'}>
                          {v.critical_projects}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-mono">
                        <span className={v.duplicate_flags > 0 ? 'text-indigo-400 font-bold' : 'text-slate-400'}>
                          {v.duplicate_flags}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold">
                        <span className={isHighRisk ? 'text-red-400' : isModerate ? 'text-amber-400' : 'text-emerald-400'}>
                          {v.average_risk_score}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          isHighRisk
                            ? 'bg-red-950 text-red-400 border-red-800'
                            : isModerate
                            ? 'bg-amber-950 text-amber-400 border-amber-800'
                            : 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                        }`}>
                          {v.vendor_status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
