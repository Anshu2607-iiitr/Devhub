import React, { useState } from 'react';
import { 
  Cpu, Layers, Satellite, ShieldAlert, Sparkles, 
  MapPin, Eye, FileText, CheckCircle2, AlertTriangle, 
  ArrowRight, Compass, RefreshCw, BarChart2, Activity, 
  Search, Shield, Check, Info, Sliders, ChevronRight 
} from 'lucide-react';
import GovernancePrincipleBanner from '../../components/GovernancePrincipleBanner';

export default function AdvancedAILabPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('segmentation');
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  
  // Interactive Vision Layer Toggles
  const [showBitumen, setShowBitumen] = useState(true);
  const [showWMM, setShowWMM] = useState(true);
  const [showAggregate, setShowAggregate] = useState(true);
  const [showEarthwork, setShowEarthwork] = useState(true);

  // Satellite Split Slider Position (0 to 100)
  const [splitPos, setSplitPos] = useState(50);

  // Interactive Bayesian Weights
  const [weightCV, setWeightCV] = useState(35);
  const [weightSat, setWeightSat] = useState(25);
  const [weightGeo, setWeightGeo] = useState(20);
  const [weightForensics, setWeightForensics] = useState(20);

  const scenarios = [
    {
      id: "MPLAD-JH-2026-089",
      name: "Namkum to Rampur Rural Road Upgrade",
      district: "Ranchi",
      type: "Road",
      claimed_progress: 80,
      visual_progress: 42,
      satellite_progress: 38,
      image_url: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=800&auto=format&fit=crop&q=80",
      sat_t0_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
      sat_tnow_url: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=800&auto=format&fit=crop&q=80",
      segmentation: {
        primary_material: "Wet Mix Macadam (WMM) Base Layer",
        uniformity: 88.5,
        classes: [
          { name: "Wet Mix Macadam (WMM)", color: "bg-[#C58A2B]/75 border-[#C58A2B]", border: "border-[#C58A2B]", coverage: "52.4%", confidence: 0.91, top: "45%", left: "15%", width: "70%", height: "45%" },
          { name: "Crushed Stone Aggregate Subgrade", color: "bg-[#1D5D9B]/60 border-[#1D5D9B]", border: "border-[#1D5D9B]", coverage: "34.1%", confidence: 0.88, top: "25%", left: "10%", width: "80%", height: "20%" },
          { name: "Raw Soil & Earthwork", color: "bg-amber-900/60 border-amber-900", border: "border-amber-900", coverage: "13.5%", confidence: 0.86, top: "10%", left: "5%", width: "90%", height: "15%" }
        ]
      },
      satellite: {
        platform: "Sentinel-2 MSI Level-2A (10m)",
        ndvi_t0: 0.58,
        ndvi_t_now: 0.21,
        ndvi_delta: -0.37,
        ndbi_t0: -0.22,
        ndbi_t_now: 0.38,
        ndbi_delta: 0.60,
        surface_clearing: "Verified Ground Disturbance",
        last_pass: "2026-08-26 10:48 UTC"
      },
      forensics: {
        ela_delta: 3.2,
        is_manipulated: false,
        resnet_similarity: 0.142,
        is_duplicate: false,
        camera: "Sony IMX766 50MP Handheld Sensor",
        exif_verified: true
      },
      spatial: {
        corridor_type: "Linear Buffer Corridor (±150m)",
        deviation_m: 1420.0,
        is_inside: false,
        status: "Deviation Offset (1.42 km)"
      },
      risk_score: 82,
      tier: "Critical",
      verdict: "Discrepancy Detected — Additional Technical Field Verification Recommended"
    },
    {
      id: "MPLAD-JH-2026-104",
      name: "Community Health Sub-Centre Construction",
      district: "Khunti",
      type: "Building",
      claimed_progress: 60,
      visual_progress: 58,
      satellite_progress: 60,
      image_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80",
      sat_t0_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
      sat_tnow_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80",
      segmentation: {
        primary_material: "Red Clay Brick Masonry & RCC Beams",
        uniformity: 92.0,
        classes: [
          { name: "Brick Masonry", color: "bg-red-700/60 border-red-700", border: "border-red-700", coverage: "46.2%", confidence: 0.93, top: "35%", left: "20%", width: "55%", height: "40%" },
          { name: "RCC Columns & Slab Formwork", color: "bg-slate-700/60 border-slate-700", border: "border-slate-700", coverage: "32.8%", confidence: 0.95, top: "20%", left: "15%", width: "70%", height: "15%" }
        ]
      },
      satellite: {
        platform: "Sentinel-2 MSI Level-2A (10m)",
        ndvi_t0: 0.62,
        ndvi_t_now: 0.18,
        ndvi_delta: -0.44,
        ndbi_t0: -0.28,
        ndbi_t_now: 0.42,
        ndbi_delta: 0.70,
        surface_clearing: "Building Footprint Verified",
        last_pass: "2026-08-28 10:48 UTC"
      },
      forensics: {
        ela_delta: 2.8,
        is_manipulated: false,
        resnet_similarity: 0.089,
        is_duplicate: false,
        camera: "Samsung ISOCELL GN5 50MP",
        exif_verified: true
      },
      spatial: {
        corridor_type: "Cadastral Parcel Polygon",
        deviation_m: 12.0,
        is_inside: true,
        status: "Inside Boundary (12m offset)"
      },
      risk_score: 22,
      tier: "Low",
      verdict: "Verified & Compliant — Physical Evidence Aligned with Sanction Record"
    },
    {
      id: "MPLAD-JH-2026-312",
      name: "Drinking Water Deep Borewell & Solar Pump Network",
      district: "Dhanbad",
      type: "Water Works",
      claimed_progress: 70,
      visual_progress: 35,
      satellite_progress: 30,
      image_url: "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&auto=format&fit=crop&q=80",
      sat_t0_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
      sat_tnow_url: "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&auto=format&fit=crop&q=80",
      segmentation: {
        primary_material: "Solar PV Panel & Submersible Head Assembly",
        uniformity: 90.0,
        classes: [
          { name: "Solar PV Panel Array", color: "bg-blue-900/60 border-blue-900", border: "border-blue-900", coverage: "38.5%", confidence: 0.96, top: "25%", left: "20%", width: "40%", height: "30%" },
          { name: "Submersible Pump Head", color: "bg-sky-700/60 border-sky-700", border: "border-sky-700", coverage: "24.2%", confidence: 0.91, top: "55%", left: "35%", width: "25%", height: "30%" }
        ]
      },
      satellite: {
        platform: "Sentinel-2 MSI Level-2A (10m)",
        ndvi_t0: 0.54,
        ndvi_t_now: 0.38,
        ndvi_delta: -0.16,
        ndbi_t0: -0.18,
        ndbi_t_now: 0.14,
        ndbi_delta: 0.32,
        surface_clearing: "Minimal Surface Disturbance",
        last_pass: "2026-08-30 10:48 UTC"
      },
      forensics: {
        ela_delta: 14.8,
        is_manipulated: true,
        resnet_similarity: 0.942,
        is_duplicate: true,
        camera: "Reprocessed / Edited EXIF Archive",
        exif_verified: false
      },
      spatial: {
        corridor_type: "Ward Point Buffer (50m)",
        deviation_m: 5.0,
        is_inside: true,
        status: "Coordinates Matched"
      },
      risk_score: 78,
      tier: "High",
      verdict: "Duplicate Image Vector Detected — Potential Recycled Work Claim"
    }
  ];

  const active = scenarios[selectedScenarioIdx];

  // Recalculate dynamic Bayesian Risk based on user sliders
  const dynamicRisk = Math.min(100, Math.max(10, Math.round(
    12 + 
    (active.claimed_progress - active.visual_progress) * (weightCV / 100) * 1.1 +
    (active.forensics.is_duplicate ? 35 : 0) * (weightForensics / 100) * 1.5 +
    (active.spatial.deviation_m > 500 ? 25 : 5) * (weightGeo / 100) * 1.2 +
    Math.abs(active.claimed_progress - active.satellite_progress) * (weightSat / 100) * 0.8
  )));

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner & Scenario Selector */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#123B67] font-bold text-xs uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-[#1D5D9B]" />
            <span>Advanced AI, Deep Learning & Remote Sensing Laboratory</span>
          </div>
          <h1 className="text-base font-bold text-[#0F2942] mt-0.5">
            Neural Material Segmentation, Satellite Spectral Change & Forensics Workbench
          </h1>
        </div>

        {/* Live Scenario Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Evaluation Case:</span>
          <select
            value={selectedScenarioIdx}
            onChange={(e) => setSelectedScenarioIdx(Number(e.target.value))}
            className="px-3 py-1.5 bg-[#F6F8FB] border border-[#E4E9EF] rounded-lg text-xs font-bold text-[#0F2942] focus:outline-none focus:border-[#1D5D9B]"
          >
            {scenarios.map((s, idx) => (
              <option key={s.id} value={idx}>
                {idx + 1}. {s.name} ({s.district})
              </option>
            ))}
          </select>
        </div>
      </div>

      <GovernancePrincipleBanner />

      {/* 2. 5 Diagnostic Workbench Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 bg-white border border-[#E4E9EF] p-1 rounded-xl shadow-2xs text-xs font-semibold">
        <button
          onClick={() => setActiveTab('segmentation')}
          className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
            activeTab === 'segmentation' ? 'bg-[#123B67] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>1. CV Segmentation</span>
        </button>

        <button
          onClick={() => setActiveTab('satellite')}
          className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
            activeTab === 'satellite' ? 'bg-[#123B67] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Satellite className="w-3.5 h-3.5" />
          <span>2. Satellite Change</span>
        </button>

        <button
          onClick={() => setActiveTab('forensics')}
          className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
            activeTab === 'forensics' ? 'bg-[#123B67] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>3. Neural Forensics</span>
        </button>

        <button
          onClick={() => setActiveTab('corridor')}
          className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
            activeTab === 'corridor' ? 'bg-[#123B67] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>4. Spatial Corridor</span>
        </button>

        <button
          onClick={() => setActiveTab('bayesian')}
          className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1 ${
            activeTab === 'bayesian' ? 'bg-[#123B67] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>5. Bayesian Fusion</span>
        </button>
      </div>

      {/* TAB 1: DEEP CV SURFACE SEGMENTATION */}
      {activeTab === 'segmentation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Visual Viewport with Segmentation Overlays */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl overflow-hidden shadow-md border border-slate-800 relative min-h-[420px] flex flex-col justify-between">
            <img 
              src={active.image_url} 
              alt={active.name} 
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />

            {/* Top HUD */}
            <div className="relative z-20 p-3 bg-slate-950/85 backdrop-blur-xs text-white text-[10px] font-mono flex items-center justify-between border-b border-slate-800">
              <span className="text-[#168A78] font-bold">● DEEPLABV3+ RESNET-101 SEGMENTATION</span>
              <span>{active.id}</span>
            </div>

            {/* Polygon Segmentation Masks */}
            <div className="relative z-10 pointer-events-none flex-1 p-4">
              {active.segmentation.classes.map((cls, i) => (
                <div
                  key={i}
                  style={{ top: cls.top, left: cls.left, width: cls.width, height: cls.height }}
                  className={`absolute border-2 rounded-xl backdrop-blur-2xs p-2 flex flex-col justify-between transition ${cls.color} ${cls.border}`}
                >
                  <span className="text-[9px] font-mono font-bold bg-slate-950/90 text-white px-1.5 py-0.5 rounded w-fit">
                    {cls.name} ({cls.coverage}) • {(cls.confidence * 100).toFixed(0)}% Conf
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Surface Metric */}
            <div className="relative z-20 p-3 bg-slate-950/90 backdrop-blur-xs text-white text-[10px] font-mono flex justify-between border-t border-slate-800">
              <span>Primary Surface: <strong className="text-amber-300">{active.segmentation.primary_material}</strong></span>
              <span>Uniformity: <strong>{active.segmentation.uniformity}%</strong></span>
            </div>
          </div>

          {/* Right Metrics Dossier */}
          <div className="lg:col-span-5 bg-white border border-[#E4E9EF] rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PIXEL-WISE EVIDENCE</span>
              <h3 className="text-base font-bold text-[#0F2942] mt-0.5">Physical Stage Classification</h3>
              <span className="text-xs text-slate-500">{active.type} Sector • {active.district}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF] space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Material Area Breakdown</span>
                {active.segmentation.classes.map((c, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-slate-100 last:border-0">
                    <span className="text-slate-700">{c.name}</span>
                    <span className="font-mono font-bold text-[#123B67]">{c.coverage}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF]">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Claimed Progress</span>
                  <span className="text-lg font-extrabold text-slate-900 font-mono mt-0.5 block">{active.claimed_progress}%</span>
                </div>
                <div className="p-3 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF]">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">CV Estimated</span>
                  <span className="text-lg font-extrabold text-[#1D5D9B] font-mono mt-0.5 block">{active.visual_progress}%</span>
                </div>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border text-xs ${
              active.risk_score >= 60 ? 'bg-[#FDF2F2] border-[#F8D7DA] text-[#C95752]' : 'bg-[#F0F7F6] border-[#C6E6E1] text-[#168A78]'
            }`}>
              <span className="font-bold block">Statutory Audit Verdict:</span>
              <p className="mt-0.5 leading-relaxed font-medium">{active.verdict}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SATELLITE REMOTE SENSING CHANGE DETECTION */}
      {activeTab === 'satellite' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Split-Screen Satellite Viewer */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl overflow-hidden shadow-md border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-white">
              <span className="font-mono text-[11px] text-[#168A78]">Sentinel-2 Multispectral Remote Sensing (10m Ground Resolution)</span>
              <span className="text-slate-400 text-[10px]">Pass: {active.satellite.last_pass}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-300 uppercase block">Pre-Sanction Baseline (T0)</span>
                <div className="h-56 rounded-xl overflow-hidden relative bg-slate-900 border border-slate-700">
                  <img src={active.sat_t0_url} alt="T0" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-black/80 text-white text-[9px] font-mono px-2 py-0.5 rounded">
                    NDVI: {active.satellite.ndvi_t0} (Vegetation Baseline)
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-300 uppercase block">Current Satellite Snapshot (T_now)</span>
                <div className="h-56 rounded-xl overflow-hidden relative bg-slate-900 border border-slate-700">
                  <img src={active.sat_tnow_url} alt="T_now" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-[#123B67]/90 text-white text-[9px] font-mono px-2 py-0.5 rounded">
                    NDBI: +{active.satellite.ndbi_delta} (Built-up Delta)
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex justify-between">
              <span>Vegetation Drop: <strong className="text-amber-400">{active.satellite.ndvi_delta} NDVI</strong></span>
              <span>Built-up Reflectance Increase: <strong className="text-[#168A78]">+{active.satellite.ndbi_delta} NDBI</strong></span>
            </div>
          </div>

          {/* Right Spectral Analytics */}
          <div className="lg:col-span-5 bg-white border border-[#E4E9EF] rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">REMOTE SENSING VERIFICATION</span>
              <h3 className="text-base font-bold text-[#0F2942] mt-0.5">Bi-Temporal Spectral Index Delta</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF]">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Vegetation Index (NDVI)</span>
                <div className="flex justify-between mt-1">
                  <span>Pre-Sanction T0: <strong>{active.satellite.ndvi_t0}</strong></span>
                  <span>Current T_now: <strong>{active.satellite.ndvi_t_now}</strong></span>
                </div>
                <span className="text-[11px] text-[#168A78] font-bold block mt-1">
                  {active.satellite.surface_clearing} (Delta: {active.satellite.ndvi_delta})
                </span>
              </div>

              <div className="p-3 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF]">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Built-up Index (NDBI)</span>
                <div className="flex justify-between mt-1">
                  <span>Pre-Sanction T0: <strong>{active.satellite.ndbi_t0}</strong></span>
                  <span>Current T_now: <strong>{active.satellite.ndbi_t_now}</strong></span>
                </div>
                <span className="text-[11px] text-[#1D5D9B] font-bold block mt-1">
                  Concrete / Asphalt Reflectance Increase (+{active.satellite.ndbi_delta})
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF] text-xs text-slate-600">
              Satellite physical progress estimate from orbit: <strong className="text-[#123B67] font-mono">{active.satellite_progress}%</strong>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NEURAL FORENSICS & ELA */}
      {activeTab === 'forensics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white border border-[#E4E9EF] rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">NEURAL IMAGE FORENSICS</span>
              <h3 className="text-base font-bold text-[#0F2942] mt-0.5">Error Level Analysis (ELA) & ResNet-50 Vector Distance</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF] space-y-1.5">
                <span className="font-bold text-[#0F2942] block">Error Level Analysis (ELA)</span>
                <span className="text-slate-500 block">Compression Delta: <strong className="font-mono text-slate-800">{active.forensics.ela_delta}</strong></span>
                <span className={`text-[11px] font-bold block ${
                  active.forensics.is_manipulated ? 'text-[#C95752]' : 'text-[#168A78]'
                }`}>
                  {active.forensics.is_manipulated ? '⚠ Potential Splice / Manipulation Detected' : '✓ Uniform Compression Verified'}
                </span>
              </div>

              <div className="p-3.5 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF] space-y-1.5">
                <span className="font-bold text-[#0F2942] block">ResNet-50 Archive Search</span>
                <span className="text-slate-500 block">Cosine Similarity: <strong className="font-mono text-slate-800">{(active.forensics.resnet_similarity * 100).toFixed(1)}%</strong></span>
                <span className={`text-[11px] font-bold block ${
                  active.forensics.is_duplicate ? 'text-[#C95752]' : 'text-[#168A78]'
                }`}>
                  {active.forensics.is_duplicate ? '⚠ Duplicate Archive Vector Match (2024)' : '✓ Unique Feature Cluster'}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF] text-xs space-y-1">
              <span className="font-bold text-slate-700 block text-[10px] uppercase">Hardware Sensor EXIF Telemetry</span>
              <div className="flex justify-between text-slate-600">
                <span>Sensor: {active.forensics.camera}</span>
                <span className="font-mono text-[#168A78] font-bold">NTP Drift: 0.4s</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-[#E4E9EF] rounded-2xl p-5 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-[#0F2942]">Forensic Authenticity Summary</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Scans multi-compression frequency artifacts and compares 512-dimensional visual embeddings against all 543 Lok Sabha parliamentary constituency work dockets.
            </p>
            <div className="p-4 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF] text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Historical Database Distance</span>
              <span className={`text-2xl font-extrabold font-mono mt-1 block ${
                active.forensics.is_duplicate ? 'text-[#C95752]' : 'text-[#168A78]'
              }`}>
                {(active.forensics.resnet_similarity * 100).toFixed(1)}% Match
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SPATIAL CORRIDOR & GEOFENCING */}
      {activeTab === 'corridor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-[#F6F8FB] border border-[#E4E9EF] rounded-2xl p-6 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:28px_28px]"></div>

            <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>WGS84 Linear Alignment Corridor Buffer (±150m)</span>
              <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-[#E4E9EF]">
                HDOP: 0.8 (High Precision)
              </span>
            </div>

            {/* Corridor Graphic */}
            <div className="relative z-10 my-6 flex items-center justify-center">
              <div className="w-full max-w-md h-48 border-2 border-dashed border-[#1D5D9B] bg-blue-50/40 rounded-2xl relative flex items-center justify-center p-4">
                <span className="text-xs font-bold text-[#123B67] bg-white/90 px-3 py-1 rounded shadow-2xs">
                  Sanctioned Linear Road Corridor (4.8 km)
                </span>
                
                <div className={`absolute p-1.5 rounded-full flex items-center gap-1 shadow-md ${
                  active.spatial.is_inside ? 'bottom-8 left-12 bg-[#168A78] text-white' : '-bottom-4 -right-2 bg-[#C95752] text-white'
                }`}>
                  <MapPin className="w-4 h-4" />
                  <span className="text-[9px] font-bold px-1">{active.spatial.status}</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200 pt-2">
              <span>Ray-Casting Point-in-Polygon Check</span>
              <span>Offset Distance: <strong className="font-mono text-slate-800">{active.spatial.deviation_m} meters</strong></span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-[#E4E9EF] rounded-2xl p-5 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-[#0F2942]">Spatial Corridor Analytics</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF]">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Boundary Corridor Lock</span>
                <span className="font-bold text-[#0F2942] block mt-0.5">{active.spatial.corridor_type}</span>
              </div>
              <div className="p-3 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF]">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Deviation Distance</span>
                <span className={`text-base font-extrabold font-mono mt-0.5 block ${
                  active.spatial.is_inside ? 'text-[#168A78]' : 'text-[#C95752]'
                }`}>
                  {active.spatial.deviation_m} meters
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MULTIMODAL BAYESIAN FUSION & SHAP MATRIX */}
      {activeTab === 'bayesian' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white border border-[#E4E9EF] rounded-2xl p-5 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">BAYESIAN FUSION & SHAP EXPLAINABILITY</span>
              <h3 className="text-base font-bold text-[#0F2942] mt-0.5">Interactive Signal Weight Tuning</h3>
            </div>

            {/* Sliders */}
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>1. Computer Vision Material Segmentation Weight:</span>
                  <span className="font-mono text-[#123B67] font-bold">{weightCV}%</span>
                </div>
                <input type="range" min="10" max="60" value={weightCV} onChange={(e) => setWeightCV(Number(e.target.value))} className="w-full accent-[#123B67]" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>2. Satellite Remote Sensing Spectral Delta Weight:</span>
                  <span className="font-mono text-[#1D5D9B] font-bold">{weightSat}%</span>
                </div>
                <input type="range" min="10" max="60" value={weightSat} onChange={(e) => setWeightSat(Number(e.target.value))} className="w-full accent-[#1D5D9B]" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>3. Spatial Corridor & Ray-Casting Deviation Weight:</span>
                  <span className="font-mono text-[#C58A2B] font-bold">{weightGeo}%</span>
                </div>
                <input type="range" min="10" max="60" value={weightGeo} onChange={(e) => setWeightGeo(Number(e.target.value))} className="w-full accent-[#C58A2B]" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>4. Deep ResNet Forensics & Archive Similarity Weight:</span>
                  <span className="font-mono text-[#168A78] font-bold">{weightForensics}%</span>
                </div>
                <input type="range" min="10" max="60" value={weightForensics} onChange={(e) => setWeightForensics(Number(e.target.value))} className="w-full accent-[#168A78]" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-[#E4E9EF] rounded-2xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">RECALCULATED RISK SCORE</span>
              <h3 className="text-3xl font-extrabold text-[#C95752] font-mono mt-1">{dynamicRisk} / 100</h3>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border inline-block mt-1 ${
                dynamicRisk >= 60 ? 'bg-[#FDF2F2] text-[#C95752] border-[#F8D7DA]' : 'bg-[#F0F7F6] text-[#168A78] border-[#C6E6E1]'
              }`}>
                {dynamicRisk >= 80 ? 'Critical Risk' : dynamicRisk >= 60 ? 'High Risk' : 'Compliant Tier'}
              </span>
            </div>

            <div className="p-3 bg-[#F6F8FB] rounded-xl border border-[#E4E9EF] text-xs space-y-1">
              <span className="font-bold text-[#0F2942] block">Statutory Non-Accusatory Rule:</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                AI calculates mathematical feature attribution to prioritize on-site physical engineering inspections.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
