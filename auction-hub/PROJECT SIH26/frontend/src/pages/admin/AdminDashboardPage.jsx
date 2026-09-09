import React, { useState } from 'react';
import { 
  FolderKanban, AlertOctagon, CheckCircle2, Clock, 
  AlertTriangle, ArrowRight, ShieldAlert, MapPin, Users, FileCheck, Search, Filter, Eye 
} from 'lucide-react';
import { ADMIN_KPI_DATA, MAP_MARKERS_DATA } from '../../data/mockData';

export default function AdminDashboardPage({ onNavigate, onSelectProject }) {
  const [selectedPin, setSelectedPin] = useState(MAP_MARKERS_DATA[0]);
  const [filterTier, setFilterTier] = useState('All');

  const filteredMarkers = MAP_MARKERS_DATA.filter((m) => {
    if (filterTier === 'Critical') return m.tier === 'Critical';
    if (filterTier === 'High') return m.tier === 'High';
    if (filterTier === 'Medium') return m.tier === 'Medium';
    if (filterTier === 'Low') return m.tier === 'Low';
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Hero Notice Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 uppercase font-mono">
              CENTRAL COMMAND CENTRE
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-600 font-medium">MoSPI & District Collectorate Vigilance Node</span>
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 mt-1">
            “AI does not replace government oversight. It helps government identify where oversight is needed most.”
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous automated surveillance of 1,284 sanctioned MPLADS works across Jharkhand State.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('admin-risk-intel')}
            className="px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <span>Open AI Risk Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('admin-flagged')}
            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Review 86 Flagged</span>
          </button>
        </div>
      </div>

      {/* 8 Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        
        <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
          <span className="text-[10px] text-slate-500 font-semibold block uppercase">Total Projects</span>
          <span className="text-xl font-extrabold text-slate-900 font-mono mt-0.5 block">{ADMIN_KPI_DATA.total_projects}</span>
          <span className="text-[9px] text-slate-400">All Works</span>
        </div>

        <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
          <span className="text-[10px] text-slate-500 font-semibold block uppercase">Active Works</span>
          <span className="text-xl font-extrabold text-blue-700 font-mono mt-0.5 block">{ADMIN_KPI_DATA.active_projects}</span>
          <span className="text-[9px] text-blue-600 font-medium">In Progress</span>
        </div>

        <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
          <span className="text-[10px] text-slate-500 font-semibold block uppercase">Completed</span>
          <span className="text-xl font-extrabold text-emerald-700 font-mono mt-0.5 block">{ADMIN_KPI_DATA.completed_projects}</span>
          <span className="text-[9px] text-emerald-600 font-medium">Cleared</span>
        </div>

        <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
          <span className="text-[10px] text-slate-500 font-semibold block uppercase">Under Review</span>
          <span className="text-xl font-extrabold text-amber-700 font-mono mt-0.5 block">{ADMIN_KPI_DATA.projects_under_review}</span>
          <span className="text-[9px] text-amber-600 font-medium">Audit Active</span>
        </div>

        <div 
          onClick={() => onNavigate('admin-flagged')}
          className="bg-white border border-red-200 hover:border-red-400 p-3 rounded-xl shadow-2xs cursor-pointer transition"
        >
          <span className="text-[10px] text-red-700 font-bold block uppercase">High-Risk</span>
          <span className="text-xl font-extrabold text-red-600 font-mono mt-0.5 block">{ADMIN_KPI_DATA.high_risk_projects}</span>
          <span className="text-[9px] text-red-600 font-semibold">Triage Required</span>
        </div>

        <div className="bg-white border border-red-200 p-3 rounded-xl shadow-2xs">
          <span className="text-[10px] text-red-800 font-bold block uppercase">Critical Alerts</span>
          <span className="text-xl font-extrabold text-red-700 font-mono mt-0.5 block">{ADMIN_KPI_DATA.critical_alerts}</span>
          <span className="text-[9px] text-red-600 font-medium">Immediate Order</span>
        </div>

        <div 
          onClick={() => onNavigate('citizen-feedback')}
          className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs cursor-pointer hover:border-slate-300 transition"
        >
          <span className="text-[10px] text-slate-700 font-semibold block uppercase">Grievances</span>
          <span className="text-xl font-extrabold text-slate-800 font-mono mt-0.5 block">{ADMIN_KPI_DATA.citizen_complaints}</span>
          <span className="text-[9px] text-emerald-700 font-medium">Citizen Logs</span>
        </div>

        <div 
          onClick={() => onNavigate('admin-inspections')}
          className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs cursor-pointer hover:border-slate-300 transition"
        >
          <span className="text-[10px] text-blue-900 font-semibold block uppercase">Inspections</span>
          <span className="text-xl font-extrabold text-blue-800 font-mono mt-0.5 block">{ADMIN_KPI_DATA.pending_inspections}</span>
          <span className="text-[9px] text-blue-700 font-medium">Field Orders</span>
        </div>

      </div>

      {/* Main Risk Overview: Interactive Map + Flyout Panel */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-700" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Geospatial MPLADS Risk Heatmap (Jharkhand State Grid)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Green = Low Risk (0-30) • Yellow = Medium (31-60) • Orange = High (61-80) • Red = Critical (81-100)
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Filter Markers:</span>
            {['All', 'Critical', 'High', 'Medium', 'Low'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterTier(t)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  filterTier === t ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 2D Interactive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-xl p-6 relative overflow-hidden min-h-[420px] flex flex-col justify-between">
            {/* 2D Grid Pattern */}
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:28px_28px]"></div>

            <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>WGS84 Projection • 24 Constituency Zones</span>
              <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                Click pin to inspect
              </span>
            </div>

            {/* Map Canvas with Marker Pins */}
            <div className="relative z-10 my-6 flex items-center justify-center">
              <div className="w-full max-w-xl h-64 border border-dashed border-slate-300 rounded-2xl relative bg-white/70 backdrop-blur-2xs p-4">
                
                {filteredMarkers.map((m, idx) => {
                  const isSelected = selectedPin?.id === m.id;
                  const left = 15 + ((idx % 4) * 24);
                  const top = 20 + (Math.floor(idx / 4) * 35) + (idx % 2 === 0 ? 10 : 0);

                  const bgColor = 
                    m.risk >= 80 ? 'bg-red-600 ring-red-300' :
                    m.risk >= 60 ? 'bg-amber-500 ring-amber-300' :
                    m.risk >= 30 ? 'bg-yellow-500 ring-yellow-300' : 'bg-emerald-600 ring-emerald-300';

                  return (
                    <div
                      key={m.id}
                      onClick={() => setSelectedPin(m)}
                      style={{ left: `${left}%`, top: `${top}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition p-1 rounded-full flex flex-col items-center ${
                        isSelected ? 'scale-125 z-20 ring-4' : 'hover:scale-110 z-10'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-extrabold shadow-md ${bgColor}`}>
                        {m.risk}
                      </div>
                      <span className="text-[9px] font-bold text-slate-800 bg-white/95 px-1 rounded shadow-2xs mt-0.5 whitespace-nowrap">
                        {m.district}
                      </span>
                    </div>
                  );
                })}

              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200 pt-2.5">
              <span>Showing {filteredMarkers.length} plotted projects.</span>
              <span>Geofence Tolerance: ±50 meters</span>
            </div>

          </div>

          {/* Right Flyout Project Details Card */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
            {selectedPin ? (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-500">{selectedPin.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedPin.risk >= 80 ? 'bg-red-100 text-red-800 border border-red-200' :
                      selectedPin.risk >= 60 ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      Risk Score: {selectedPin.risk}/100 • {selectedPin.tier}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-1">{selectedPin.name}</h4>
                  <span className="text-xs text-slate-500">{selectedPin.district} Circle</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-500">Executing Contractor:</span>
                    <span className="font-bold text-slate-900">{selectedPin.contractor}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-500">Sanctioned Outlay:</span>
                    <span className="font-bold font-mono text-slate-900">{selectedPin.budget}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-500">Physical Progress:</span>
                    <span className="font-bold font-mono text-blue-700">{selectedPin.progress}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-500">Citizen Complaints:</span>
                    <span className="font-bold text-red-700">{selectedPin.complaints} verified reports</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-500">Inspection Status:</span>
                    <span className="font-bold text-amber-800">{selectedPin.status}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onNavigate('admin-investigation')}
                    className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs transition shadow-sm flex items-center justify-center gap-1"
                  >
                    <span>Open Full Deep Investigation Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onNavigate('admin-inspections')}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs transition"
                  >
                    Create Field Inspection Order
                  </button>
                </div>

              </div>
            ) : (
              <div className="text-center p-8 text-slate-400 text-xs">
                Select any project marker on the map to inspect telemetry.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
