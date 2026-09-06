import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Info, AlertOctagon, ArrowRight, Layers, ZoomIn } from 'lucide-react';
import { fetchDistrictHeatmap } from '../api';

export default function GeospatialMap({ onSelectDistrict }) {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePin, setActivePin] = useState(null);

  useEffect(() => {
    fetchDistrictHeatmap()
      .then((data) => {
        setDistricts(data || []);
        if (data && data.length > 0) {
          setActivePin(data[0]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Normalize lat/lng to an SVG viewBox: India bounds approx lat: 8-36N, lng: 68-98E
  const projectCoordinates = (lat, lng) => {
    const minLat = 8.0;
    const maxLat = 36.0;
    const minLng = 68.0;
    const maxLng = 96.0;

    const x = ((lng - minLng) / (maxLng - minLng)) * 700 + 50;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 500 + 50;
    return { x, y };
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-400">Loading Geospatial Risk Visualizer...</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
            <Navigation className="w-5 h-5 text-amber-400" />
            <span>Interactive Geospatial Anomaly Map</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time geospatial plotting of monitored constituencies with coordinate-linked risk radiuses and vulnerability tiers
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            Critical (Score ≥ 55)
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Warning (38-54)
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Normal (&lt; 38)
          </span>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SVG Map Canvas */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-inner flex items-center justify-center min-h-[480px]">
          
          {/* Subtle Grid Lines & Compass */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 text-[11px] text-slate-500 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>MoSPI Geographic Coordinate Projection (WGS84)</span>
          </div>

          <svg viewBox="0 0 800 600" className="w-full h-full max-h-[500px]">
            {/* Outline connection / radar lines */}
            <circle cx="400" cy="300" r="280" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="400" cy="300" r="180" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

            {/* Render Nodes */}
            {districts.map((d) => {
              const { x, y } = projectCoordinates(d.lat, d.lng);
              const isCritical = d.average_risk_score >= 55;
              const isWarning = d.average_risk_score >= 38 && !isCritical;
              const isSelected = activePin?.district === d.district;

              const pinColor = isCritical ? '#ef4444' : isWarning ? '#f59e0b' : '#10b981';

              return (
                <g 
                  key={d.district} 
                  className="cursor-pointer transition-transform hover:scale-110"
                  onClick={() => setActivePin(d)}
                >
                  {/* Heat Radius Circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 32 : isCritical ? 24 : 16}
                    fill={pinColor}
                    fillOpacity={isSelected ? 0.25 : 0.15}
                    className={isCritical ? 'animate-pulse' : ''}
                  />

                  {/* Ring */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 14 : 10}
                    fill="#0f172a"
                    stroke={pinColor}
                    strokeWidth={isSelected ? 3 : 2}
                  />

                  {/* Center Dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 5 : 3.5}
                    fill={pinColor}
                  />

                  {/* Label */}
                  <text
                    x={x + 16}
                    y={y + 4}
                    fill={isSelected ? '#ffffff' : '#94a3b8'}
                    fontSize={isSelected ? '12' : '11'}
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    className="select-none pointer-events-none drop-shadow"
                  >
                    {d.district}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Constituency Details Card */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          {activePin ? (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                  Constituency Intelligence Profile
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>{activePin.district}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activePin.state} • MP: <span className="text-slate-200 font-medium">{activePin.mp_name}</span>
                </p>
              </div>

              {/* Anomaly Badge */}
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                activePin.average_risk_score >= 55
                  ? 'bg-red-950/60 border-red-800 text-red-300'
                  : activePin.average_risk_score >= 38
                  ? 'bg-amber-950/60 border-amber-800 text-amber-300'
                  : 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
              }`}>
                <div className="flex items-center space-x-2">
                  <AlertOctagon className="w-5 h-5" />
                  <div>
                    <span className="text-xs font-bold block">{activePin.risk_tier} Risk Territory</span>
                    <span className="text-[11px] opacity-80">Composite Anomaly Index</span>
                  </div>
                </div>
                <span className="text-xl font-black font-mono">{activePin.average_risk_score}</span>
              </div>

              {/* Numerical Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Monitored Outlay</span>
                  <span className="font-bold text-white font-mono text-sm">₹{activePin.total_crores} Cr</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Active Works</span>
                  <span className="font-bold text-white text-sm">{activePin.total_projects} sanctions</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Critical Flags</span>
                  <span className={`font-bold text-sm ${activePin.critical_projects > 0 ? 'text-red-400' : 'text-slate-400'}`}>
                    {activePin.critical_projects} projects
                  </span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Duplicate Alerts</span>
                  <span className={`font-bold text-sm ${activePin.duplicate_alerts > 0 ? 'text-indigo-400' : 'text-slate-400'}`}>
                    {activePin.duplicate_alerts} detected
                  </span>
                </div>
              </div>

              {/* Coordinates Info */}
              <div className="text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono flex items-center justify-between">
                <span>Geo-Coords:</span>
                <span>{activePin.lat?.toFixed(4)}°N, {activePin.lng?.toFixed(4)}°E</span>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 text-slate-500 text-xs">
              Select a constituency pin on the map to inspect risk data.
            </div>
          )}

          {activePin && (
            <button
              onClick={() => onSelectDistrict(activePin.district)}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition flex items-center justify-center gap-1 text-xs shadow-md"
            >
              <span>Inspect {activePin.district} Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
