import React, { useState } from 'react';
import { 
  Search, Filter, MapPin, Building, Calendar, 
  DollarSign, CheckCircle2, Eye, ArrowRight, Image as ImageIcon 
} from 'lucide-react';
import { CITIZEN_PROJECTS_DATA } from '../../data/mockData';

export default function CitizenProjectExplorerPage({ onNavigate }) {
  const [search, setSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = CITIZEN_PROJECTS_DATA.filter((p) => {
    if (districtFilter !== 'All' && p.district !== districtFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <Building className="w-4 h-4" />
            <span>Screen 12 & 13: Citizen Project Explorer & Transparency Dossier</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            Public Directory of Sanctioned MPLADS Works
          </h2>
        </div>

        <button
          onClick={() => onNavigate('citizen-report')}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-sm"
        >
          <span>Report An Issue on Any Project</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search project name, ward, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <span>District:</span>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
          >
            <option value="All">All Districts</option>
            <option value="Ranchi">Ranchi</option>
            <option value="Khunti">Khunti</option>
            <option value="Simdega">Simdega</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <img src={p.images[0]} alt={p.name} className="w-full h-44 object-cover" />
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-slate-400">{p.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${p.status_color}`}>
                    {p.verification_status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{p.location}</span>
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1">{p.purpose}</p>
              </div>
            </div>

            <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 font-mono">{p.approved_amount}</span>
              <button
                onClick={() => setSelectedProject(p)}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold rounded-lg transition"
              >
                Inspect Public Dossier
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Screen 13 Modal: Citizen Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-800">{selectedProject.id}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{selectedProject.name}</h3>
                <span className="text-xs text-slate-500">{selectedProject.location}</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Approved Budget</span>
                <span className="font-bold text-slate-900">{selectedProject.approved_amount}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Reported Progress</span>
                <span className="font-bold text-blue-700">{selectedProject.reported_progress}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Start Date</span>
                <span className="font-bold text-slate-800">{selectedProject.start_date}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Target Completion</span>
                <span className="font-bold text-slate-800">{selectedProject.expected_completion}</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-800 block">Public Purpose & Benefit:</span>
              <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                {selectedProject.purpose}
              </p>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-800 block">Latest Verified Ground Update:</span>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 font-medium">
                {selectedProject.latest_update}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  onNavigate('citizen-report');
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs"
              >
                Report Ground Discrepancy
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
