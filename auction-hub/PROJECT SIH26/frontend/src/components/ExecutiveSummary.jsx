import React from 'react';
import { 
  Coins, AlertOctagon, Copy, ShieldCheck, BarChart2 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  CartesianGrid, Cell 
} from 'recharts';

export default function ExecutiveSummary({ summary, onNavigateToProjects, onNavigateToSimulator }) {
  if (!summary || !summary.total_projects) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        Loading analytics...
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
      
      {/* 4 Clean KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Monitored Outlay */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Monitored Outlay</span>
            <Coins className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            ₹{summary.total_monitored_crores} <span className="text-sm font-normal text-slate-400">Cr</span>
          </div>
          <div className="text-xs text-slate-400 mt-2">
            {summary.total_projects} total projects tracked
          </div>
        </div>

        {/* Card 2: Critical & High Flags */}
        <div 
          onClick={() => onNavigateToProjects('Critical')}
          className="bg-slate-900 border border-slate-800 hover:border-red-500/60 rounded-xl p-5 shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-red-400">Critical Flags</span>
            <AlertOctagon className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-red-400">
            {summary.critical_risk_count}
          </div>
          <div className="text-xs text-slate-400 mt-2 flex items-center justify-between">
            <span>Score ≥ 80</span>
            <span className="text-amber-400 font-medium">+{summary.high_risk_count} High Risk</span>
          </div>
        </div>

        {/* Card 3: Duplicate Work Alerts */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Duplicate Works</span>
            <Copy className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-indigo-400">
            {summary.duplicate_work_alerts}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Similar title or ward collision
          </div>
        </div>

        {/* Card 4: Leakage Blocked */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">Potential Leakage Blocked</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            ₹{summary.estimated_leakage_prevented_crores} <span className="text-sm font-normal text-slate-400">Cr</span>
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Under audit freeze / review
          </div>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Risk Distribution Chart */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Risk Distribution</h3>
              <p className="text-xs text-slate-400">Projects grouped by risk score tier</p>
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
              <span className="text-slate-300">Critical: {summary.critical_risk_count}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <span className="text-slate-300">High: {summary.high_risk_count}</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Sector Vulnerability</h3>
              <p className="text-xs text-slate-400">Flagged projects by work domain</p>
            </div>
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
            <span>Drinking Water and Solar Infrastructure have the highest anomaly concentration.</span>
            <button 
              onClick={() => onNavigateToProjects('All')}
              className="text-amber-400 hover:text-amber-300 font-semibold"
            >
              View all projects &rarr;
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
