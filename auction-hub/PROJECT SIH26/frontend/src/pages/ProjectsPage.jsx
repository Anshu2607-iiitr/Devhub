import React, { useState } from 'react';
import { Search, Filter, Eye, Download, FileText, ArrowUpDown } from 'lucide-react';
import { PRIORITY_RISK_PROJECTS } from '../data/mockData';

export default function ProjectsPage({ onSelectProject }) {
  const [districtFilter, setDistrictFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = PRIORITY_RISK_PROJECTS.filter((p) => {
    if (districtFilter !== 'All' && p.district !== districtFilter) return false;
    if (typeFilter !== 'All' && p.type !== typeFilter) return false;
    if (riskFilter !== 'All' && p.risk_tier !== riskFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.district.toLowerCase().includes(q) || p.contractor.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-5">
      
      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Project Monitoring Repository</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous surveillance of 1,284 sanctioned works across Jharkhand constituency circles
          </p>
        </div>
        <button
          onClick={() => alert('Exported project monitoring repository to official CSV format.')}
          className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-300 text-xs flex items-center gap-1.5 transition shadow-2xs"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search project name, ID, contractor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          
          <div className="flex items-center gap-1.5 text-slate-600">
            <span>District:</span>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Districts</option>
              <option value="Ranchi">Ranchi</option>
              <option value="Khunti">Khunti</option>
              <option value="Gumla">Gumla</option>
              <option value="Simdega">Simdega</option>
              <option value="Dhanbad">Dhanbad</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600">
            <span>Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Types</option>
              <option value="Road">Road</option>
              <option value="Building">Building</option>
              <option value="Water">Water</option>
              <option value="Solar">Solar</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600">
            <span>Risk Tier:</span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Risk Tiers</option>
              <option value="Critical">Critical (≥ 80)</option>
              <option value="High">High (60-79)</option>
              <option value="Medium">Medium (31-59)</option>
              <option value="Low">Low (0-30)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Projects Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Project ID</th>
                <th className="py-3 px-4">Project Name</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-right">Sanctioned</th>
                <th className="py-3 px-4 text-right">Expenditure</th>
                <th className="py-3 px-4 text-center">Progress</th>
                <th className="py-3 px-4 text-center">Risk Score</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{p.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 max-w-xs truncate">{p.name}</td>
                  <td className="py-3 px-4">{p.district}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700 text-[10px]">
                      {p.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-semibold">{p.sanctioned_amount}</td>
                  <td className="py-3 px-4 text-right font-mono text-amber-800 font-semibold">{p.expenditure}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-blue-700">{p.physical_progress}%</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full font-bold font-mono text-[11px] ${
                      p.risk_score >= 80 ? 'bg-red-100 text-red-800 border border-red-200' :
                      p.risk_score >= 60 ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {p.risk_score}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      p.status.includes('Action') ? 'bg-red-100 text-red-800' :
                      p.status.includes('Verified') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onSelectProject(p)}
                      className="px-2.5 py-1 bg-blue-50 text-blue-900 hover:bg-blue-600 hover:text-white border border-blue-200 rounded font-semibold text-[11px] transition"
                    >
                      Inspect
                    </button>
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
