import React, { useState } from 'react';
import { Upload, FileSpreadsheet, RefreshCw, AlertOctagon, CheckCircle2, Copy, Sparkles, Download } from 'lucide-react';
import { analyzeBatchProposals } from '../api';

const SAMPLE_CSV = `Title,Category,District,Ward,Sanctioned_Lakhs,Vendor_Name
"Installation of 50 LED Solar Street Lights in Shivpur Ward 14","Solar Lighting & Green Energy","Varanasi","Shivpur Ward 14",72.5,"Sunrise Power Systems LLP"
"Construction of Community RO Plant at Rohania Block","Drinking Water & Tubewells","Varanasi","Rohania Block",14.5,"Kisan Water Technologies Co."
"Setting up of 10HP Submersible Deep Tubewell and Solar Water Pump in Shivpur Ward 14","Drinking Water & Tubewells","Varanasi","Shivpur Ward 14",18.0,"Ganga Builders & Earthmovers"
"Development of Senior Citizen Recreational Center at Jamwa Ramgarh","Community Halls & Public Infra","Jaipur Rural","Jamwa Ramgarh",115.0,"Apex Civil Engineers"`;

export default function BatchProposalUpload({ onSelectEvaluatedProject }) {
  const [csvText, setCsvText] = useState(SAMPLE_CSV);
  const [loading, setLoading] = useState(false);
  const [batchResults, setBatchResults] = useState(null);

  const handleParseAndEvaluate = async () => {
    try {
      setLoading(true);
      const lines = csvText.trim().split('\n').filter(Boolean);
      if (lines.length <= 1) {
        alert('Please provide a CSV with header and at least one proposal row.');
        setLoading(false);
        return;
      }

      // Simple CSV parser supporting quotes
      const proposals = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        // Match comma-separated values respecting quotes
        const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
        const matches = [];
        let match;
        while ((match = regex.exec(line)) !== null && matches.length < 6) {
          let val = match[1] || '';
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1).replace(/""/g, '"');
          }
          matches.push(val.trim());
          if (regex.lastIndex === 0) break;
        }

        if (matches.length >= 5) {
          proposals.push({
            title: matches[0],
            category: matches[1] || 'Drinking Water & Tubewells',
            district: matches[2] || 'Varanasi',
            ward: matches[3] || 'Ward 1',
            sanctioned_amount_lakhs: parseFloat(matches[4]) || 15.0,
            vendor_name: matches[5] || 'Vendor Consortium'
          });
        }
      }

      if (proposals.length === 0) {
        alert('Could not parse valid proposal rows from CSV.');
        setLoading(false);
        return;
      }

      const res = await analyzeBatchProposals(proposals);
      setBatchResults(res);
    } catch (err) {
      console.error(err);
      alert('Error during batch analysis');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setCsvText(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      
      {/* Upload Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Batch Proposal Upload & Multi-Tender Ingestion</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Paste CSV proposal rows or upload a file to evaluate multiple draft tenders simultaneously
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload CSV File</span>
              <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
            </label>
            <button
              onClick={() => setCsvText(SAMPLE_CSV)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-semibold transition"
            >
              Reset Sample
            </button>
          </div>
        </div>

        <div>
          <textarea
            rows={5}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder="Title,Category,District,Ward,Sanctioned_Lakhs,Vendor_Name"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-amber-500 placeholder-slate-600"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleParseAndEvaluate}
            disabled={loading}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg shadow-md transition flex items-center gap-2 text-xs"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Batch Neural Ingestion...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Evaluate Batch Proposals (AI Multi-Scan)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Batch Results Table */}
      {batchResults && (
        <div className="space-y-4">
          
          {/* Summary KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Total Evaluated</span>
              <span className="text-lg font-bold text-white font-mono">{batchResults.total_proposals} proposals</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-red-900/60">
              <span className="text-red-400 block text-[10px]">Critical Sanctions</span>
              <span className="text-lg font-bold text-red-400 font-mono">{batchResults.critical_count} blocked</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-amber-900/60">
              <span className="text-amber-400 block text-[10px]">High Risk Flags</span>
              <span className="text-lg font-bold text-amber-400 font-mono">{batchResults.high_risk_count} warning</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Total Outlay Tested</span>
              <span className="text-lg font-bold text-amber-400 font-mono">₹{batchResults.total_outlay_lakhs}L</span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Work Title & Location</th>
                    <th className="px-4 py-3">Vendor</th>
                    <th className="px-4 py-3 text-right">Budget (₹L)</th>
                    <th className="px-4 py-3 text-center">Risk Score</th>
                    <th className="px-4 py-3">Primary Diagnosis</th>
                    <th className="px-4 py-3 text-center">Clearance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {batchResults.evaluations.map((item, idx) => {
                    const evalData = item.evaluation;
                    const prop = item.proposal;
                    const isCritical = evalData.risk_tier === 'Critical';
                    const isHigh = evalData.risk_tier === 'High';

                    return (
                      <tr key={idx} className="hover:bg-slate-800/40 transition">
                        <td className="px-4 py-3 max-w-xs">
                          <div className="font-semibold text-slate-100 truncate" title={prop.title}>
                            {prop.title}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {prop.ward} • {prop.district}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-300 max-w-[150px] truncate">
                          {prop.vendor_name}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-amber-400">
                          ₹{prop.sanctioned_amount_lakhs}L
                        </td>
                        <td className="px-4 py-3 text-center font-mono font-bold">
                          <span className={`px-2 py-0.5 rounded text-[11px] border ${
                            isCritical ? 'bg-red-950 text-red-400 border-red-800' :
                            isHigh ? 'bg-amber-950 text-amber-400 border-amber-800' :
                            'bg-emerald-950 text-emerald-400 border-emerald-800'
                          }`}>
                            {evalData.fraud_risk_score}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-300 max-w-xs truncate" title={evalData.primary_anomaly_category}>
                          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">
                            {evalData.primary_anomaly_category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isCritical ? 'bg-red-500/20 text-red-400 border border-red-800' :
                            isHigh ? 'bg-amber-500/20 text-amber-400 border border-amber-800' :
                            'bg-emerald-500/20 text-emerald-400 border border-emerald-800'
                          }`}>
                            {isCritical ? 'REJECTED / BLOCKED' : isHigh ? 'VIGILANCE HOLD' : 'APPROVED'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
