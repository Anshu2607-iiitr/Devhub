import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, ArrowUpDown, Eye, AlertOctagon, 
  AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, Download, RefreshCw, ShieldAlert, Lock, CheckCircle 
} from 'lucide-react';
import { fetchProjects, getExportCsvUrl } from '../api';

export default function ProjectTable({ initialTier = 'All', onSelectProject }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Filters
  const [tier, setTier] = useState(initialTier);
  const [category, setCategory] = useState('All');
  const [district, setDistrict] = useState('All');
  const [anomalyType, setAnomalyType] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('fraud_risk_score');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(0);
  const limit = 15;

  useEffect(() => {
    setTier(initialTier);
  }, [initialTier]);

  useEffect(() => {
    loadProjects();
  }, [tier, category, district, anomalyType, search, sortBy, order, page]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects({
        tier,
        category,
        district,
        anomalyType,
        search,
        sortBy,
        order,
        limit,
        offset: page * limit
      });
      setProjects(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const quickFilters = [
    { label: 'All Projects', tier: 'All', anomaly: 'All' },
    { label: '🚨 Critical (≥ 80)', tier: 'Critical', anomaly: 'All' },
    { label: '⚠️ High (60-79)', tier: 'High', anomaly: 'All' },
    { label: '📄 Duplicate Works', tier: 'All', anomaly: 'Duplicate' },
    { label: '💰 Cost Overruns', tier: 'All', anomaly: 'Cost' },
    { label: '⏳ Milestone Stalled', tier: 'All', anomaly: 'Execution' },
  ];

  const getTierBadge = (t, score) => {
    switch (t) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-950 text-red-400 border border-red-800">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            {score} • Critical
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950 text-amber-400 border border-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            {score} • High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-950/60 text-yellow-300 border border-yellow-800/60">
            {score} • Medium
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/50 text-emerald-400 border border-emerald-800/50">
            {score} • Low
          </span>
        );
    }
  };

  const getAuditStatusBadge = (status) => {
    if (status === 'Payment Frozen') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-300 border border-red-800">
          <Lock className="w-3 h-3 text-red-400" />
          Frozen
        </span>
      );
    }
    if (status === 'Inspection Ordered') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950 text-amber-300 border border-amber-800">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          Inspection
        </span>
      );
    }
    if (status === 'Cleared') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
          <CheckCircle className="w-3 h-3 text-emerald-400" />
          Cleared
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] text-slate-400 bg-slate-800/60 border border-slate-700/60">
        Review Pending
      </span>
    );
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-4">
      
      {/* Quick Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5 text-amber-400" />
          <span>Presets:</span>
        </span>
        {quickFilters.map((qf, idx) => {
          const isActive = tier === qf.tier && anomalyType === qf.anomaly;
          return (
            <button
              key={idx}
              onClick={() => {
                setTier(qf.tier);
                setAnomalyType(qf.anomaly);
                setPage(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition border ${
                isActive
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {qf.label}
            </button>
          );
        })}
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by Title, Ward, MP, Vendor..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        {/* Filter Dropdowns & Export */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          
          {/* Risk Tier Filter */}
          <select
            value={tier}
            onChange={(e) => { setTier(e.target.value); setPage(0); }}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Risk Tiers</option>
            <option value="Critical">Critical (≥ 80)</option>
            <option value="High">High (60-79)</option>
            <option value="Medium">Medium (35-59)</option>
            <option value="Low">Low (0-34)</option>
          </select>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(0); }}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 max-w-[140px] truncate"
          >
            <option value="All">All Sectors</option>
            <option value="Drinking Water & Tubewells">Drinking Water</option>
            <option value="Solar Lighting & Green Energy">Solar Lighting</option>
            <option value="Rural Roads & Connectivity">Rural Roads</option>
            <option value="Community Halls & Public Infra">Community Infra</option>
            <option value="Education & Anganwadi Infrastructure">Education</option>
            <option value="Healthcare & Sanitation">Healthcare</option>
          </select>

          {/* District Filter */}
          <select
            value={district}
            onChange={(e) => { setDistrict(e.target.value); setPage(0); }}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Constituencies</option>
            <option value="Varanasi">Varanasi</option>
            <option value="Gorakhpur">Gorakhpur</option>
            <option value="Wayanad">Wayanad</option>
            <option value="Baramati">Baramati</option>
            <option value="Patna Sahib">Patna Sahib</option>
            <option value="Bangalore Rural">Bangalore Rural</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Jaipur Rural">Jaipur Rural</option>
          </select>

          {/* Export to CSV Button */}
          <a
            href={getExportCsvUrl({ tier, category, district, search })}
            download="mplads_audit_export.csv"
            className="p-2 bg-slate-950 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 rounded-lg text-slate-300 transition flex items-center gap-1 text-xs"
            title="Export Filtered Projects to CSV"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </a>

          {/* Sort By */}
          <button
            onClick={() => setOrder(order === 'desc' ? 'asc' : 'desc')}
            className="p-2 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-300 transition"
            title={`Sort Order: ${order.toUpperCase()}`}
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>

          <button
            onClick={loadProjects}
            className="p-2 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-300 transition"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

      </div>

      {/* Projects Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Project ID & Title</th>
                <th className="px-4 py-3">Constituency & MP</th>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3 text-right">Sanction (₹L)</th>
                <th className="px-4 py-3">Disbursed vs Progress</th>
                <th className="px-4 py-3 text-center">Risk Score</th>
                <th className="px-4 py-3">Primary Anomaly</th>
                <th className="px-4 py-3 text-center">Audit Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center text-slate-400">
                    Running neural anomaly scoring and filtering...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center text-slate-500">
                    No projects found matching the specified criteria.
                  </td>
                </tr>
              ) : (
                projects.map((proj) => {
                  const disbursedRatio = Math.round((proj.released_amount_lakhs / Math.max(proj.sanctioned_amount_lakhs, 0.01)) * 100);
                  const progress = proj.physical_progress_pct;
                  const isDivergent = disbursedRatio > 60 && progress < 30;

                  return (
                    <tr 
                      key={proj.project_id}
                      className="hover:bg-slate-800/40 transition cursor-pointer"
                      onClick={() => onSelectProject(proj.project_id)}
                    >
                      {/* Title & Ward */}
                      <td className="px-4 py-3 max-w-xs">
                        <div className="font-semibold text-slate-100 truncate" title={proj.title}>
                          {proj.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                          <span className="font-mono text-slate-300">{proj.project_id}</span>
                          <span>•</span>
                          <span className="truncate">{proj.ward}</span>
                        </div>
                      </td>

                      {/* Constituency & MP */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium text-slate-200">{proj.district}</div>
                        <div className="text-[11px] text-slate-400">{proj.mp_name}</div>
                      </td>

                      {/* Vendor */}
                      <td className="px-4 py-3 max-w-[160px] truncate" title={proj.vendor_name}>
                        <div className="text-slate-300 truncate">{proj.vendor_name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{proj.vendor_id}</div>
                      </td>

                      {/* Sanctioned Amount */}
                      <td className="px-4 py-3 text-right whitespace-nowrap font-mono font-medium text-slate-100">
                        ₹{proj.sanctioned_amount_lakhs}
                      </td>

                      {/* Disbursed vs Progress */}
                      <td className="px-4 py-3 w-44">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-slate-300">Paid: {disbursedRatio}%</span>
                          <span className={`font-semibold ${isDivergent ? 'text-red-400' : 'text-slate-400'}`}>
                            Done: {progress}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                          <div 
                            className="bg-blue-500 h-full" 
                            style={{ width: `${Math.min(100, disbursedRatio)}%` }}
                            title={`Disbursed: ${disbursedRatio}%`}
                          ></div>
                          <div 
                            className="bg-emerald-400 h-full -ml-full opacity-75" 
                            style={{ width: `${Math.min(100, progress)}%` }}
                            title={`Progress: ${progress}%`}
                          ></div>
                        </div>
                      </td>

                      {/* Risk Score & Badge */}
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {getTierBadge(proj.risk_tier, proj.fraud_risk_score)}
                      </td>

                      {/* Primary Anomaly */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                          {proj.primary_anomaly_category}
                        </span>
                      </td>

                      {/* Audit Status */}
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {getAuditStatusBadge(proj.audit_status)}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProject(proj.project_id);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 border border-slate-700 transition flex items-center justify-center gap-1 mx-auto text-[11px] font-semibold"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Audit XAI</span>
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="bg-slate-950/90 px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing <span className="text-white font-medium">{projects.length > 0 ? page * limit + 1 : 0}</span> to{' '}
            <span className="text-white font-medium">{Math.min((page + 1) * limit, total)}</span> of{' '}
            <span className="text-white font-medium">{total}</span> flagged sanctions
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono text-slate-300">
              Page {page + 1} of {totalPages || 1}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
