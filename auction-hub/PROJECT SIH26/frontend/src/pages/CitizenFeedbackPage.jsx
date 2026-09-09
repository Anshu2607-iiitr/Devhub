import React, { useState } from 'react';
import { Users, ShieldCheck, CheckCircle2, AlertTriangle, ThumbsUp, Send } from 'lucide-react';
import { CITIZEN_FEEDBACK_DATA } from '../data/mockData';

export default function CitizenFeedbackPage() {
  const [feed, setFeed] = useState(CITIZEN_FEEDBACK_DATA);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <Users className="w-5 h-5 text-blue-700" />
            <span>Citizen Feedback & Anti-Abuse Credibility Verification</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Decentralized citizen ground reality reporting weighted by credibility scoring to prevent false spam
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Anti-Abuse Engine Active</span>
        </div>
      </div>

      {/* Anti-Abuse System Explanation Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            How FundGuard AI Credibility Weighting Works
          </h3>
          <span className="text-[10px] font-mono text-slate-500">Citizen Credibility: 82 / 100 (Weight: 0.82)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-600">
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <strong className="text-slate-800 block text-[11px]">Daily Report Cap</strong>
            Maximum 5 different projects reported per citizen per day.
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <strong className="text-slate-800 block text-[11px]">30-Day Project Cooldown</strong>
            Same citizen cannot repeatedly report the same project within 30 days.
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <strong className="text-slate-800 block text-[11px]">Credibility Adjustment</strong>
            Repeated false or unsupported reports gradually lower citizen score.
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <strong className="text-slate-800 block text-[11px]">No Auto-Suppression</strong>
            Credibility affects risk weighting — it never silences legitimate reports.
          </div>
        </div>
      </div>

      {/* Citizen Feedback Feed */}
      <div className="space-y-3">
        {feed.map((f) => (
          <div key={f.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-mono">{f.id} • {f.submitted_date}</span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">{f.project_name}</h4>
                <span className="text-xs text-blue-700 font-semibold">{f.issue_category}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                {f.status}
              </span>
            </div>

            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
              "{f.description}"
            </p>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
              <span>Reported by: <strong className="text-slate-800">{f.citizen_name}</strong> (Score: {f.credibility_score}/100, Weight: {f.feedback_weight})</span>
              <span className="font-mono text-[11px] text-emerald-700">Photo GPS: {f.photo_gps}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
