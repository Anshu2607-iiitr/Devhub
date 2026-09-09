import React, { useState } from 'react';
import { MapPin, AlertTriangle, CheckCircle2, Navigation, Layers } from 'lucide-react';
import { PRIORITY_RISK_PROJECTS } from '../data/mockData';

export default function MapMonitoringPage({ onSelectProject }) {
  const [selectedPin, setSelectedPin] = useState(PRIORITY_RISK_PROJECTS[0]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <Navigation className="w-5 h-5 text-blue-700" />
            <span>Geospatial Map Monitoring & Anomaly Coordinates</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time geospatial distance comparison: Registered Sanction Boundary vs Photo Exif GPS Stamp
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
          WGS84 Coordinate Grid
        </span>
      </div>

      {/* 2D Map Canvas + Side Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 2D Clean Map Visualization */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 relative overflow-hidden shadow-xs min-h-[460px] flex flex-col justify-between">
          
          {/* Subtle 2D Grid Background */}
          <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]"></div>

          <div className="relative z-10 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Jharkhand State Constituency Grid</span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Registered Sanction ●
              </span>
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Evidence Location ●
              </span>
            </div>
          </div>

          {/* Interactive Visual Canvas with Plot Points */}
          <div className="relative z-10 my-8 flex items-center justify-center">
            <div className="w-full max-w-lg h-64 border border-dashed border-slate-300 rounded-2xl relative bg-blue-50/20 p-4">
              
              {/* Plot Pins */}
              {PRIORITY_RISK_PROJECTS.map((p, idx) => {
                const isSelected = selectedPin?.id === p.id;
                const left = 20 + (idx * 18);
                const top = 30 + ((idx % 3) * 22);

                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPin(p)}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition p-1 rounded-full flex items-center justify-center ${
                      isSelected ? 'ring-4 ring-blue-400/50 scale-125 z-20' : 'hover:scale-110 z-10'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md ${
                      p.risk_score >= 80 ? 'bg-red-600' : p.risk_score >= 60 ? 'bg-amber-500' : 'bg-blue-600'
                    }`}>
                      {p.risk_score}
                    </div>
                  </div>
                );
              })}

              {/* Active Pin Deviation Vector Line */}
              {selectedPin && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="bg-white/90 border border-slate-300 rounded-lg p-2.5 shadow-sm text-[10px] font-mono text-slate-700">
                    Distance Gap: <strong className="text-red-600">{selectedPin.deviation_km} km</strong> (Registered vs Evidence)
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-3">
            <span>Click any coordinate pin to inspect location verification metadata.</span>
            <span className="font-mono">Geofence Radius: 500 meters</span>
          </div>

        </div>

        {/* Side Panel: Location Match Details */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          {selectedPin ? (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider block">
                  GEOSPATIAL AUDIT PROFILE
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{selectedPin.name}</h3>
                <span className="text-xs text-slate-500">{selectedPin.id} • {selectedPin.district}</span>
              </div>

              {/* Status Box */}
              <div className={`p-3 rounded-lg border ${
                selectedPin.deviation_km > 0.5 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span className="font-bold text-xs">
                    {selectedPin.deviation_km > 0.5 ? '⚠ Requires Physical Verification' : '✓ Location Match Verified'}
                  </span>
                </div>
                <p className="text-[11px] mt-1 leading-normal">
                  Evidence GPS deviates by <strong className="font-mono">{selectedPin.deviation_km} km</strong> from registered location.
                </p>
              </div>

              {/* Coordinate Comparison */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Registered Sanction Coordinates</span>
                  <span className="font-mono font-bold text-slate-800">
                    {selectedPin.registered_gps.lat}° N, {selectedPin.registered_gps.lng}° E
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Submitted Photo GPS Stamp</span>
                  <span className="font-mono font-bold text-slate-800">
                    {selectedPin.evidence_gps.lat}° N, {selectedPin.evidence_gps.lng}° E
                  </span>
                </div>
              </div>

              <button
                onClick={() => onSelectProject(selectedPin)}
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg text-xs transition shadow-2xs"
              >
                Inspect Full Project Details
              </button>
            </div>
          ) : (
            <div className="text-center p-8 text-slate-400 text-xs">
              Select a project on the map to inspect geospatial evidence.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
