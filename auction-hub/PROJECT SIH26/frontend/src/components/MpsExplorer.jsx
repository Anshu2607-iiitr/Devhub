import React, { useState, useEffect } from 'react';
import { 
  Landmark, Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, 
  MapPin, ShieldAlert, ArrowRight, UserCheck, BarChart2, CheckCircle2, TrendingUp, Building 
} from 'lucide-react';
import { fetchMps } from '../api';

export default function MpsExplorer({ onSelectMpConstituency }) {
  const [mpsData, setMpsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [sortBy, setSortBy] = useState('allocated_amount_crores');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    loadMps();
  }, [search, selectedState, sortBy, order, page]);

  const loadMps = async () => {
    setLoading(true);
    try {
      const data = await fetchMps({
        search,
        state: selectedState,
        sortBy,
        order,
        limit,
        offset: (page - 1) * limit
      });
      setMpsData(data);
    } catch (err) {
      console.error('Failed to load MPs directory:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setPage(1);
  };

  const totalPages = mpsData ? Math.ceil(mpsData.total_mps / limit) : 1;

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Landmark className="w-5 h-5 text-amber-400" />
            543 Lok Sabha MPs — Allocation Directory
          </h2>
          <p className="text-xs text-slate-400 mt-1">Official MoSPI statutory entitlement limits for the 18th Lok Sabha</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">Total Corpus</span>
            <span className="font-bold text-amber-400 font-mono">₹{mpsData?.total_official_allocated_crores?.toLocaleString('en-IN') || '8,348.37'} Cr</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">Avg Utilization</span>
            <span className="font-bold text-emerald-400 font-mono">{mpsData?.average_utilization_pct || '0'}%</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between shadow-sm">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by MP name, constituency..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        {/* State and Sort Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* State Filter */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition max-w-[170px]"
            >
              <option value="All">All 36 States & UTs</option>
              {mpsData?.states?.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition"
            >
              <option value="allocated_amount_crores">Official Allocation (₹ Cr)</option>
              <option value="sanctioned_crores">Monitored Outlay (₹ Cr)</option>
              <option value="utilization_pct">Utilization Rate (%)</option>
              <option value="critical_count">Critical Anomaly Count</option>
              <option value="mp_name">MP Name (A-Z)</option>
            </select>
          </div>

          {/* Order Toggle */}
          <button
            onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
            className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 hover:text-white transition font-mono"
            title={`Order: ${order.toUpperCase()}`}
          >
            {order === 'asc' ? '↑ ASC' : '↓ DESC'}
          </button>
        </div>
      </div>

      {/* MP Directory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-16 text-center text-slate-400">
            <div className="inline-block animate-spin w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full mb-3"></div>
            <p className="text-xs">Loading MPs directory...</p>
          </div>
        ) : !mpsData?.items || mpsData.items.length === 0 ? (
          <div className="p-16 text-center text-slate-400 text-xs">
            No Members of Parliament found matching current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Hon'ble MP Name</th>
                  <th className="py-3 px-4">Constituency & State</th>
                  <th className="py-3 px-4 text-right">MoSPI Allocated Limit</th>
                  <th className="py-3 px-4 text-right">Monitored Outlay</th>
                  <th className="py-3 px-4">Quota Utilization</th>
                  <th className="py-3 px-4 text-center">Vigilance Flags</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {mpsData.items.map((mp) => {
                  const util = mp.utilization_pct || 0;
                  const isCritical = mp.risk_tier === 'Critical';

                  return (
                    <tr key={mp.sr_no || `${mp.constituency}-${mp.mp_name}`} className="hover:bg-slate-800/40 transition">
                      
                      {/* Sr No */}
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                        {mp.sr_no}
                      </td>

                      {/* MP Name */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-white text-sm">
                          {mp.mp_name}
                        </div>
                      </td>

                      {/* Constituency & State */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-200 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{mp.constituency}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">{mp.state}</span>
                      </td>

                      {/* Allocated Limit */}
                      <td className="py-3 px-4 text-right">
                        <div className="font-bold text-white font-mono text-sm">
                          ₹{mp.allocated_amount_crores?.toFixed(2)} Cr
                        </div>
                      </td>

                      {/* Monitored Outlay */}
                      <td className="py-3 px-4 text-right">
                        <div className="font-semibold text-slate-200 font-mono text-sm">
                          ₹{mp.sanctioned_crores?.toFixed(2)} Cr
                        </div>
                        <span className="text-[10px] text-slate-500">
                          {mp.monitored_projects_count} works tracked
                        </span>
                      </td>

                      {/* Quota Utilization Progress */}
                      <td className="py-3 px-4 min-w-[160px]">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-mono font-semibold text-slate-300">{util}%</span>
                          <span className="text-[10px] text-slate-500">of statutory cap</span>
                        </div>
                        <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full transition-all ${
                              util >= 75 ? 'bg-red-500' : util >= 40 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, Math.max(util, 3))}%` }}
                          ></div>
                        </div>
                      </td>

                      {/* Vigilance Flags */}
                      <td className="py-3 px-4 text-center">
                        {mp.critical_count > 0 ? (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-950 text-red-400 border border-red-800 font-mono">
                            {mp.critical_count} Critical
                          </span>
                        ) : mp.monitored_projects_count > 0 ? (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                            Compliant
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">—</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onSelectMpConstituency(mp.constituency)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-medium text-xs transition flex items-center justify-center gap-1 mx-auto shadow-sm"
                          title={`View sanctions in ${mp.constituency}`}
                        >
                          <span>Inspect</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {mpsData && mpsData.total_mps > limit && (
          <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div>
              Showing <span className="text-white font-medium">{(page - 1) * limit + 1}</span> to{' '}
              <span className="text-white font-medium">{Math.min(page * limit, mpsData.total_mps)}</span> of{' '}
              <span className="text-white font-medium">{mpsData.total_mps}</span> MPs
            </div>

            <div className="flex items-center space-x-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono text-xs">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
