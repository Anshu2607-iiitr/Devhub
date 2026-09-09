import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export default function GovernancePrincipleBanner({ compact = false }) {
  return (
    <div className={`bg-[#F0F7F6] border border-[#C6E6E1] rounded-xl text-slate-800 flex items-center justify-between gap-3 ${
      compact ? 'p-2.5 px-3 text-xs' : 'p-3 px-4 text-xs'
    }`}>
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 rounded-full bg-[#168A78]/10 text-[#168A78] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-[#168A78]" />
        </div>
        <div className="leading-snug">
          <span className="font-bold text-[#123B67]">Core Governance Principle: </span>
          <span className="text-slate-700 font-medium">
            AI does not accuse. It prioritizes projects for objective technical and human verification.
          </span>
        </div>
      </div>
      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#168A78] bg-white px-2 py-0.5 rounded border border-[#C6E6E1] hidden sm:inline">
        Statutory Non-Accusatory Rule
      </span>
    </div>
  );
}
