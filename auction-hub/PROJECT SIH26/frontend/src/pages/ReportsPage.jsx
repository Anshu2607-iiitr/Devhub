import React from 'react';
import { FileBarChart, Download, FileText, CheckCircle2, Calendar } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { title: 'District Risk Summary Report', desc: 'Aggregated anomaly density and high-risk project counts across 24 Jharkhand districts.', format: 'PDF & CSV', date: '2026-09-09' },
    { title: 'Project Risk & Anomaly Register', desc: 'Detailed register of all 1,284 projects with multi-vector score breakdown and evidence links.', format: 'PDF & CSV', date: '2026-09-09' },
    { title: 'Contractor Performance & Delay Audit', desc: 'Historical completion benchmarks, average delay deviations, and repeat anomaly records.', format: 'PDF & CSV', date: '2026-09-08' },
    { title: 'Financial Expenditure Discrepancy Report', desc: 'Projects exhibiting premature tranche disbursement ahead of Computer Vision progress.', format: 'PDF & CSV', date: '2026-09-07' },
    { title: 'Citizen Feedback & Verification Summary', desc: 'Credibility-weighted public reports, resolved grievances, and field audit orders.', format: 'PDF & CSV', date: '2026-09-06' },
    { title: 'Official Statutory Compliance & Clearance Docket', desc: 'Complete state clearance records for Ministry of Statistics and Programme Implementation (MoSPI).', format: 'PDF & CSV', date: '2026-09-05' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <FileBarChart className="w-5 h-5 text-blue-700" />
            <span>Official Governance & Statutory Reports</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Export official audit dockets, district summaries, and compliance filings for MoSPI and District Collectorates
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((r, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400 text-[10px] font-mono">{r.date}</span>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {r.format}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{r.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{r.desc}</p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => alert(`Generating and downloading ${r.title} as PDF...`)}
                className="flex-1 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
              <button
                onClick={() => alert(`Exporting ${r.title} dataset as CSV...`)}
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 transition"
              >
                CSV
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
