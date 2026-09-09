import React, { useState } from 'react';
import { 
  FolderKanban, Search, Filter, MapPin, 
  CheckCircle2, Clock, AlertTriangle, ArrowRight, Eye, Layers 
} from 'lucide-react';
import { CITIZEN_PROJECTS_DATA } from '../../data/mockData';
import GovernancePrincipleBanner from '../../components/GovernancePrincipleBanner';

export default function CitizenProjectExplorerPage({ onNavigate }) {
  const [search, setSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedModal, setSelectedModal] = useState(null);

  const filtered = CITIZEN_PROJECTS_DATA.filter((p) => {
    if (districtFilter !== 'All' && p.district !== districtFilter) return false;
    if (typeFilter !== 'All' && p.type !== typeFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#123B67] font-bold text-xs uppercase tracking-wider">
            <FolderKanban className="w-4 h-4 text-[#1D5D9B]" />
            <span>Public MPLADS Project Explorer</span>
          </div>
          <h1 className="text-base font-bold text-[#0F2942] mt-0.5">
            Transparent Constituency Project Register & Outlay Tracker
          </h1>
        </div>

        <button
          onClick={() => onNavigate('citizen-report')}
          className="px-4 py-2 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-2xs"
        >
          <span>Report Ground Discrepancy</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <GovernancePrincipleBanner />

      {/* Filter Bar */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search works..."
              className="bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#1D5D9B]"
            />
          </div>

          <div className="flex items-center gap-1.5 text-slate-600">
            <span>District:</span>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
            >
              <option value="All">All Districts</option>
              <option value="Ranchi">Ranchi</option>
              <option value="Khunti">Khunti</option>
              <option value="Simdega">Simdega</option>
            </select>
          </div>
        </div>

        <span className="text-slate-400 font-mono text-[11px]">Showing {filtered.length} Public Sanctions</span>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div 
            key={p.id}
            className="bg-white border border-[#E4E9EF] hover:border-slate-300 rounded-xl p-4 shadow-2xs space-y-3 flex flex-col justify-between transition"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400">{p.id}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {p.district}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#0F2942] leading-tight line-clamp-2">{p.name}</h3>
              <span className="text-[11px] text-slate-500 block">{p.type}</span>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Sanctioned Outlay:</span>
                <span className="font-bold font-mono text-slate-800">{p.approved_amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Physical Progress:</span>
                <span className="font-bold font-mono text-[#1D5D9B]">{p.reported_progress}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setSelectedModal(p)}
                className="w-full py-1.5 bg-[#F6F8FB] hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs transition border border-[#E4E9EF] flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Public Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Public Project Details Modal */}
      {selectedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-2xs">
          <div className="bg-white border border-[#E4E9EF] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400">{selectedModal.id}</span>
                <h3 className="text-base font-bold text-[#0F2942] mt-0.5">{selectedModal.name}</h3>
                <span className="text-xs text-slate-500">{selectedModal.district} • {selectedModal.type}</span>
              </div>
              <button
                onClick={() => setSelectedModal(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-[#F6F8FB] rounded border border-[#E4E9EF]">
                <span className="text-slate-500">Sanctioned Outlay:</span>
                <span className="font-bold font-mono text-slate-900">{selectedModal.approved_amount}</span>
              </div>
              <div className="flex justify-between p-2 bg-[#F6F8FB] rounded border border-[#E4E9EF]">
                <span className="text-slate-500">Executing Agency:</span>
                <span className="font-bold text-slate-900">{selectedModal.executing_agency}</span>
              </div>
              <div className="flex justify-between p-2 bg-[#F6F8FB] rounded border border-[#E4E9EF]">
                <span className="text-slate-500">Physical Progress:</span>
                <span className="font-bold text-[#1D5D9B] font-mono">{selectedModal.reported_progress}</span>
              </div>
              <div className="p-2 bg-[#F6F8FB] rounded border border-[#E4E9EF]">
                <span className="text-slate-500 block text-[10px]">Purpose:</span>
                <span className="text-slate-800 font-medium">{selectedModal.purpose}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedModal(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedModal(null);
                  onNavigate('citizen-report');
                }}
                className="px-4 py-2 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-semibold rounded-lg text-xs"
              >
                Report Ground Feedback
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
