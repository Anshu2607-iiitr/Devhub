import React from 'react';
import { 
  AlertTriangle, AlertOctagon, TrendingUp, CheckCircle2, 
  Coins, Copy, Clock, Cpu, BarChart2, ShieldCheck, ArrowUpRight 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  CartesianGrid, Cell, PieChart, Pie 
} from 'recharts';

export default function ExecutiveSummary({ summary, onNavigateToProjects, onNavigateToSimulator }) {
  if (!summary || !summary.total_projects) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        Loading intelligence analytics...
      </div>
    );
  }

  const riskTierData = [
    { name: 'Low (0-34)', count: summary.low_risk_count, color: '#10b981' },
    { name: 'Medium (35-59)', count: summary.medium_risk_count, color: '#eab308' },
    { name: 'High (60-79)', count: summary.high_risk_count, color: '#f97316' },
    { name: 'Critical (80-100)', count: summary.critical_risk_count, color: '#ef4444' },
  ];

  const categoryData = summary.categories_breakdown || [];

  return (
    <div className="space-y-6">
      
      {/* Top Banner Alert / Value Prop */}
      <div className="bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-900 border border-red-800/40 rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-red-400 font-semibold text-sm">
            <AlertOctagon className="w-5 h-5 text-red-500 animate-pulse" />
            <span>High-Priority Intelligence Advisory</span>
          </div>
          <p className="text-slate-200 text-sm md:text-base font-medium">
            <span className="text-white font-bold">{summary.critical_risk_count} Critical Sanctions</span> flagged for severe financial risk. 
            Estimated <span className="text-amber-400 font-bold">₹{summary.estimated_leakage_prevented_crores} Crores</span> in potential leakage subject to automated audit block.
          </p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={() => onNavigateToProjects('Critical')}
            className="w-full md:w-auto px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg shadow-md transition flex items-center justify-center space-x-1.5"
          >
            <span>Review Critical Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={onNavigateToSimulator}
            className="w-full md:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/40 text-xs font-semibold rounded-lg transition flex items-center justify-center space-x-1.5"
          >
            <span>Evaluate New Proposal</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        
        {/* Card 1: Monitored Outlay */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Monitored Outlay</span>
            <Coins className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            ₹{summary.total_monitored_crores} <span className="text-sm font-normal text-slate-400">Cr</span>
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center space-x-1">
            <span>{summary.total_projects} projects active</span>
          </div>
        </div>

        {/* Card 2: Critical Risk */}
        <div 
          onClick={() => onNavigateToProjects('Critical')}
          className="bg-slate-900 border border-red-900/60 rounded-xl p-4 shadow-sm hover:border-red-600 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-red-400">Critical Risk</span>
            <AlertOctagon className="w-4 h-4 text-red-500 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-red-400">
            {summary.critical_risk_count}
          </div>
          <div className="text-xs text-red-400/80 mt-1">
            Score ≥ 80 • Action Required
          </div>
        </div>

        {/* Card 3: High Risk */}
        <div 
          onClick={() => onNavigateToProjects('High')}
          className="bg-slate-900 border border-amber-900/60 rounded-xl p-4 shadow-sm hover:border-amber-500 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-amber-400">High Risk</span>
            <AlertTriangle className="w-4 h-4 text-amber-500 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-amber-400">
            {summary.high_risk_count}
          </div>
          <div className="text-xs text-amber-400/80 mt-1">
            Score 60-79 • Field Inspection
          </div>
        </div>

        {/* Card 4: Duplicate Work Alerts */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Duplicate Works</span>
            <Copy className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-indigo-400">
            {summary.duplicate_work_alerts}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            NLP Semantic matches
          </div>
        </div>

        {/* Card 5: Idle Funds at Risk */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Idle Funds at Risk</span>
            <Clock className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400">
            ₹{summary.idle_funds_at_risk_crores} <span className="text-sm font-normal text-slate-400">Cr</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Disbursed with stalled works
          </div>
        </div>

        {/* Card 6: Leakage Prevented */}
        <div className="bg-slate-900 border border-emerald-900/60 rounded-xl p-4 shadow-sm hover:border-emerald-600 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">Leakage Blocked</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            ₹{summary.estimated_leakage_prevented_crores} <span className="text-sm font-normal text-slate-400">Cr</span>
          </div>
          <div className="text-xs text-emerald-400/80 mt-1">
            Via Dynamic AI Intercept
          </div>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Risk Distribution Chart */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Risk Score Distribution</h3>
              <p className="text-xs text-slate-400">Multi-factor composite fraud scoring</p>
            </div>
            <BarChart2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskTierData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {riskTierData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-800 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="text-slate-300">Critical: {summary.critical_risk_count} projects</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <span className="text-slate-300">High: {summary.high_risk_count} projects</span>
            </div>
          </div>
        </div>

        {/* Category Vulnerability Breakdown */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sectoral Anomaly Vulnerability</h3>
              <p className="text-xs text-slate-400">Critical & High risk flags by work domain</p>
            </div>
            <span className="text-xs text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
              High Anomaly Density
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={categoryData} 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis 
                  dataKey="category" 
                  type="category" 
                  stroke="#94a3b8" 
                  tick={{ fontSize: 10 }}
                  width={110}
                />
                <Tooltip 
                  formatter={(val, name) => [name === 'flagged_projects' ? `${val} Flagged` : `₹${val} Cr`, name === 'flagged_projects' ? 'Anomalies' : 'Outlay']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="flagged_projects" fill="#ef4444" radius={[0, 4, 4, 0]} name="flagged_projects" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between pt-3 border-t border-slate-800">
            <span>Drinking Water & Tubewells and Solar Infrastructure exhibit highest duplicate text similarity clusters.</span>
            <button 
              onClick={() => onNavigateToProjects('All')}
              className="text-amber-400 hover:text-amber-300 font-semibold"
            >
              Inspect all sectors &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* AI Architecture Pillars Callout */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm mb-3">
          <Cpu className="w-5 h-5 text-amber-400" />
          <span>Underlying AI & Data Engineering Pipeline Architecture</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          
          <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800">
            <div className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Statistical Baselines
            </div>
            <p className="text-slate-400 leading-relaxed">
              Poisson distribution models baseline sanction frequency per constituency. Regional cost Z-scores and IQR detect 200%+ inflation.
            </p>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800">
            <div className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              NLP Duplicate Engine
            </div>
            <p className="text-slate-400 leading-relaxed">
              Sub-word TF-IDF n-grams & cosine similarity scan historical works to identify semantically identical contracts awarded across different vendors.
            </p>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800">
            <div className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Unsupervised ML
            </div>
            <p className="text-slate-400 leading-relaxed">
              Isolation Forests & Reconstruction Autoencoders map multidimensional spending vectors without requiring prior labeled fraud records.
            </p>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800">
            <div className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Explainable AI (XAI)
            </div>
            <p className="text-slate-400 leading-relaxed">
              SHAP-style local feature attribution translates abstract mathematical outliers into human-readable legal & audit recommendations.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
