import React, { useState, useEffect } from 'react';
import { Copy, AlertTriangle, ArrowRight, Building2, MapPin, Eye } from 'lucide-react';
import { fetchDuplicates } from '../api';

export default function DuplicateClusters({ onSelectProject }) {
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDuplicates()
      .then((data) => setClusters(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-12 text-center text-slate-400">Loading duplicate clusters...</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
            <Copy className="w-5 h-5" />
            <span>Duplicate Work Clusters</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Projects with similar titles or scopes flagged for review
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-bold">
          {clusters.length} Suspicious Pairs Detected
        </span>
      </div>

      {/* Clusters Grid */}
      <div className="space-y-4">
        {clusters.map((pair, idx) => {
          const isSplitVendor = pair.different_vendor;

          return (
            <div 
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-slate-400">Cluster #{idx + 1}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-300 font-medium">{pair.project_a.category}</span>
                </div>

                <div className="flex items-center space-x-3">
                  {isSplitVendor && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                      Split-Vendor Collision
                    </span>
                  )}
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                    {pair.semantic_similarity_pct}% Semantic Match
                  </span>
                </div>
              </div>

              {/* Side-by-Side Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* Project A */}
                <div 
                  onClick={() => onSelectProject(pair.project_a.project_id)}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 hover:border-amber-500/60 transition cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono text-amber-400 font-bold">{pair.project_a.project_id}</span>
                    <span>Sanction: {pair.project_a.sanction_date}</span>
                  </div>
                  <h4 className="font-semibold text-slate-100 text-sm group-hover:text-amber-400 transition leading-snug">
                    {pair.project_a.title}
                  </h4>
                  <div className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{pair.project_a.ward}, {pair.project_a.district}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Building2 className="w-3.5 h-3.5 text-blue-400" />
                      <span className="truncate max-w-[170px]">{pair.project_a.vendor_name}</span>
                    </div>
                    <span className="font-bold text-white font-mono">₹{pair.project_a.sanctioned_amount_lakhs}L</span>
                  </div>
                </div>

                {/* Project B */}
                <div 
                  onClick={() => onSelectProject(pair.project_b.project_id)}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 hover:border-amber-500/60 transition cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono text-amber-400 font-bold">{pair.project_b.project_id}</span>
                    <span>Sanction: {pair.project_b.sanction_date}</span>
                  </div>
                  <h4 className="font-semibold text-slate-100 text-sm group-hover:text-amber-400 transition leading-snug">
                    {pair.project_b.title}
                  </h4>
                  <div className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{pair.project_b.ward}, {pair.project_b.district}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Building2 className={`w-3.5 h-3.5 ${isSplitVendor ? 'text-red-400' : 'text-blue-400'}`} />
                      <span className={`truncate max-w-[170px] ${isSplitVendor ? 'text-red-400 font-semibold' : ''}`}>
                        {pair.project_b.vendor_name}
                      </span>
                    </div>
                    <span className="font-bold text-white font-mono">₹{pair.project_b.sanctioned_amount_lakhs}L</span>
                  </div>
                </div>

              </div>

              {/* Explanatory Banner */}
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
                <span>
                  {isSplitVendor 
                    ? '⚠️ Two distinct contractors billed for virtually identical scope at the same ward within 6 months. High risk of phantom asset replication.'
                    : 'Repetitive sanction issued to the same vendor in the same locality without completion verification.'}
                </span>
                <span className="text-amber-400 font-medium text-[11px] flex items-center gap-1">
                  Click card to inspect full XAI &rarr;
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
