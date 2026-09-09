import React, { useState } from 'react';
import { 
  Camera, Eye, Layers, CheckCircle2, AlertTriangle, 
  AlertOctagon, MapPin, Clock, ShieldCheck, Sparkles, 
  FileText, Cpu, Bot, RefreshCw, ArrowRight, Smartphone 
} from 'lucide-react';

export default function MultimodalCameraWorkspace({ onNavigate }) {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [showCVBoxes, setShowCVBoxes] = useState(true);
  const [showOCRBox, setShowOCRBox] = useState(true);
  const [showSemantic, setShowSemantic] = useState(true);
  const [showTelemetry, setShowTelemetry] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  const scenarios = [
    {
      id: "SCENARIO-1",
      title: "1. Road Work Discrepancy (Namkum Road)",
      project_id: "MPLAD-JH-2026-089",
      name: "Namkum to Rampur Rural Road Upgrade",
      district: "Ranchi",
      type: "Road",
      claimed_progress: 80,
      visual_progress: 42,
      claimed_text: "Completed aggregate grading and 3.8 km bituminous blacktopping with dense bitumen macadam.",
      image_url: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=800&auto=format&fit=crop&q=80",
      ocr_text: "MPLADS SCHEME 2026-27 • NAMKUM ROAD UPGRADE • HON MP DR RAMESHWAR ORAON • SANCTION ID MPLAD-JH-2026-089 • OUTLAY RS 1.20 CR",
      ocr_matches: {
        mp: "Dr. Rameshwar Oraon (100% Match)",
        id: "MPLAD-JH-2026-089 (100% Match)",
        outlay: "₹1.20 Cr (100% Match)"
      },
      cv_objects: [
        { label: "Wet Mix Macadam Base (42%)", color: "border-amber-400 text-amber-300", top: "45%", left: "30%", width: "45%", height: "35%" },
        { label: "Crushed Stone Aggregate", color: "border-blue-400 text-blue-300", top: "25%", left: "60%", width: "30%", height: "25%" }
      ],
      ocr_box: { top: "15%", left: "10%", width: "40%", height: "22%" },
      semantic_disparity: "Written claim specifies bituminous blacktopping (80%), but Computer Vision detects unpaved gravel WMM sub-base only (42%).",
      semantic_divergence_pct: 38,
      gps: { img_lat: 23.3441, img_lng: 85.3096, reg_lat: 23.3550, reg_lng: 85.3200, deviation_km: 1.42 },
      duplicate_risk: 8.5,
      risk_score: 87,
      risk_level: "High",
      verdict: "Discrepancy Detected — Additional Technical Field Verification Recommended"
    },
    {
      id: "SCENARIO-2",
      title: "2. Compliant Building (Murhu Health Centre)",
      project_id: "MPLAD-JH-2026-104",
      name: "Community Health Sub-Centre Construction",
      district: "Khunti",
      type: "Building",
      claimed_progress: 60,
      visual_progress: 58,
      claimed_text: "Brick masonry 85% completed. Column casting finished and roof slab formwork erected.",
      image_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80",
      ocr_text: "MPLADS SCHEME • COMMUNITY HEALTH CENTRE MURHU • KHUNTI • HON MP • SANCTION MPLAD-JH-2026-104",
      ocr_matches: {
        mp: "Dr. Rameshwar Oraon (100% Match)",
        id: "MPLAD-JH-2026-104 (100% Match)",
        outlay: "₹85.00 Lakh (100% Match)"
      },
      cv_objects: [
        { label: "Brick Masonry & RCC Columns (58%)", color: "border-emerald-400 text-emerald-300", top: "30%", left: "20%", width: "55%", height: "45%" }
      ],
      ocr_box: { top: "15%", left: "65%", width: "28%", height: "20%" },
      semantic_disparity: "Claim semantics align with visual evidence (58% observed vs 60% claimed).",
      semantic_divergence_pct: 2,
      gps: { img_lat: 23.0748, img_lng: 85.2789, reg_lat: 23.0749, reg_lng: 85.2790, deviation_km: 0.01 },
      duplicate_risk: 4.2,
      risk_score: 22,
      risk_level: "Low",
      verdict: "Verified & Compliant — Progress Aligned with Sanction Record"
    },
    {
      id: "SCENARIO-3",
      title: "3. Duplicate Photo Recycle (Dhanbad Deep Borewell)",
      project_id: "MPLAD-JH-2026-312",
      name: "Drinking Water Deep Borewell & Solar Pump Network",
      district: "Dhanbad",
      type: "Water Works",
      claimed_progress: 70,
      visual_progress: 35,
      claimed_text: "Deep drilling completed up to 450 ft. Solar pump and overhead storage tank operational.",
      image_url: "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&auto=format&fit=crop&q=80",
      ocr_text: "DRINKING WATER PROJECT • DHANBAD • 2024 COMPLETED ARCHIVE",
      ocr_matches: {
        mp: "Shri Dulu Mahato (Partial Match)",
        id: "MPLAD-JH-2026-312 (Mismatch with 2024 archive)",
        outlay: "₹95.00 Lakh (100% Match)"
      },
      cv_objects: [
        { label: "Solar Pump Assembly (Archived)", color: "border-red-400 text-red-300", top: "35%", left: "30%", width: "40%", height: "40%" }
      ],
      ocr_box: { top: "15%", left: "15%", width: "35%", height: "20%" },
      semantic_disparity: "Duplicate image perceptual hash matches 2024 completed work in Ward 08.",
      semantic_divergence_pct: 35,
      gps: { img_lat: 23.7957, img_lng: 86.4304, reg_lat: 23.7957, reg_lng: 86.4304, deviation_km: 0.00 },
      duplicate_risk: 94.2,
      risk_score: 78,
      risk_level: "High",
      verdict: "Duplicate Image Vector Detected — Potential Recycled Work Claim"
    }
  ];

  const active = scenarios[selectedScenarioIdx];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 900);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Scenario Selector */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-blue-700" />
            <span>Multimodal Camera Verification System (Computer Vision + NLP)</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            Real-Time Signboard OCR Entity Reconciliation & Semantic Claim Grounding
          </h2>
        </div>

        {/* Live Scenario Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Scenario:</span>
          <select
            value={selectedScenarioIdx}
            onChange={(e) => setSelectedScenarioIdx(Number(e.target.value))}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500"
          >
            {scenarios.map((s, idx) => (
              <option key={s.id} value={idx}>
                {s.title}
              </option>
            ))}
          </select>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs transition flex items-center gap-1"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Re-Scan'}</span>
          </button>
        </div>
      </div>

      {/* Vision Layer Toggles Ribbon */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Interactive Vision Layers:
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowCVBoxes(!showCVBoxes)}
            className={`px-2.5 py-1 rounded-lg font-semibold transition border text-[11px] ${
              showCVBoxes ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            {showCVBoxes ? '✓' : '✕'} CV Object Bounding Boxes
          </button>

          <button
            onClick={() => setShowOCRBox(!showOCRBox)}
            className={`px-2.5 py-1 rounded-lg font-semibold transition border text-[11px] ${
              showOCRBox ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            {showOCRBox ? '✓' : '✕'} Signboard OCR & NLP
          </button>

          <button
            onClick={() => setShowSemantic(!showSemantic)}
            className={`px-2.5 py-1 rounded-lg font-semibold transition border text-[11px] ${
              showSemantic ? 'bg-purple-50 border-purple-300 text-purple-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            {showSemantic ? '✓' : '✕'} Semantic Grounding Matrix
          </button>

          <button
            onClick={() => setShowTelemetry(!showTelemetry)}
            className={`px-2.5 py-1 rounded-lg font-semibold transition border text-[11px] ${
              showTelemetry ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            {showTelemetry ? '✓' : '✕'} GPS & Telemetry HUD
          </button>
        </div>
      </div>

      {/* Main Grid: Live Visual Feed (Left) + Multimodal Intelligence Dossier (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Augmented Camera Viewport with Overlays */}
        <div className="lg:col-span-6 bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-800 flex flex-col justify-between relative min-h-[440px]">
          
          <img 
            src={active.image_url} 
            alt={active.name} 
            className="absolute inset-0 w-full h-full object-cover opacity-85"
          />

          {/* Top HUD Overlay */}
          <div className="relative z-20 p-3 bg-slate-950/85 backdrop-blur-xs text-white text-[10px] font-mono flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>MULTIMODAL SENSOR FEED</span>
            </div>
            <span className="text-slate-300">{active.project_id}</span>
          </div>

          {/* Center Overlaid Bounding Boxes */}
          <div className="relative z-10 pointer-events-none flex-1 p-4">
            
            {/* CV Object Bounding Boxes */}
            {showCVBoxes && active.cv_objects.map((box, i) => (
              <div
                key={i}
                style={{ top: box.top, left: box.left, width: box.width, height: box.height }}
                className={`absolute border-2 border-dashed rounded-lg bg-slate-950/20 backdrop-blur-2xs p-1 flex flex-col justify-between ${box.color}`}
              >
                <span className="text-[9px] font-mono font-bold bg-slate-950/80 px-1 py-0.5 rounded w-fit">
                  {box.label}
                </span>
              </div>
            ))}

            {/* Signboard OCR Bounding Box */}
            {showOCRBox && (
              <div
                style={{ top: active.ocr_box.top, left: active.ocr_box.left, width: active.ocr_box.width, height: active.ocr_box.height }}
                className="absolute border-2 border-emerald-400 text-emerald-300 rounded-lg bg-emerald-950/30 backdrop-blur-2xs p-1.5 flex flex-col justify-between"
              >
                <span className="text-[9px] font-mono font-bold bg-emerald-950/90 text-emerald-200 px-1.5 py-0.5 rounded w-fit">
                  [OCR SIGNBOARD DETECTED]
                </span>
                <span className="text-[8px] font-mono text-emerald-100 line-clamp-2">
                  {active.ocr_text}
                </span>
              </div>
            )}

          </div>

          {/* Bottom Telemetry HUD */}
          {showTelemetry && (
            <div className="relative z-20 p-3.5 bg-slate-950/90 backdrop-blur-xs text-white text-[10px] font-mono space-y-1.5 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-400" /> Image GPS:
                </span>
                <span className="text-amber-300 font-bold">{active.gps.img_lat}° N, {active.gps.img_lng}° E</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-400" /> Timestamp (NTP):
                </span>
                <span>2026-08-28 10:14:22 IST</span>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-800">
                <span>Distance Offset: <strong className={active.gps.deviation_km > 0.5 ? "text-red-400" : "text-emerald-400"}>{active.gps.deviation_km} km</strong></span>
                <span>Perceptual Hash: SHA256-8a901f...</span>
              </div>
            </div>
          )}

        </div>

        {/* Right: Multimodal Intelligence Dossier */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">MULTIMODAL DIAGNOSTICS</span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{active.name}</h3>
              <span className="text-xs text-slate-500">{active.district} • {active.type}</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">COMPOSITE RISK</span>
              <span className="text-2xl font-extrabold text-red-600 font-mono">{active.risk_score} / 100</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border block mt-0.5 ${
                active.risk_score >= 60 ? 'bg-red-100 text-red-800 border-red-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}>
                {active.risk_level} Risk Tier
              </span>
            </div>
          </div>

          {/* Section 1: Signboard OCR vs Official MoSPI Alignment */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-700" />
                <span>1. Signboard OCR & Official MoSPI Entity Match</span>
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                100% Entity Match
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Hon'ble MP Name:</span>
                <span className="font-semibold text-slate-900">{active.ocr_matches.mp}</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Sanction ID:</span>
                <span className="font-semibold text-slate-900">{active.ocr_matches.id}</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Approved Outlay:</span>
                <span className="font-semibold text-slate-900">{active.ocr_matches.outlay}</span>
              </div>
            </div>
          </div>

          {/* Section 2: NLP Semantic Claim vs Visual Reality Alignment */}
          <div className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-950 flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-purple-700" />
                <span>2. Written Claim vs Visual Grounding Disparity</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                active.semantic_divergence_pct > 15 ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {active.semantic_divergence_pct}% Disparity Index
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="p-2 bg-white rounded border border-purple-100">
                <span className="text-slate-500 block text-[10px] font-bold">Contractor's Written Claim (NLP Input):</span>
                <span className="text-slate-800 italic">"{active.claimed_text}"</span>
              </div>
              <div className="p-2 bg-white rounded border border-purple-100">
                <span className="text-slate-500 block text-[10px] font-bold">Computer Vision Observed Reality:</span>
                <span className="text-slate-800 font-semibold">{active.semantic_disparity}</span>
              </div>
            </div>
          </div>

          {/* Section 3: CV Progress & Duplicate Hashing */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Computer Vision Progress</span>
              <span className="text-base font-extrabold text-blue-700 font-mono mt-0.5 block">{active.visual_progress}%</span>
              <span className="text-[10px] text-slate-500">Claimed: {active.claimed_progress}%</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Perceptual Duplicate Risk</span>
              <span className={`text-base font-extrabold font-mono mt-0.5 block ${
                active.duplicate_risk > 50 ? 'text-red-600' : 'text-emerald-700'
              }`}>
                {active.duplicate_risk}%
              </span>
              <span className="text-[10px] text-slate-500">Archive Index Match</span>
            </div>
          </div>

          {/* Final Verdict Box */}
          <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${
            active.risk_score >= 60 ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}>
            <div className="flex items-center gap-1.5 font-bold">
              {active.risk_score >= 60 ? <AlertTriangle className="w-4 h-4 text-amber-700" /> : <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
              <span>Statutory Audit Verdict:</span>
            </div>
            <p className="text-[11px] leading-relaxed font-medium">
              {active.verdict}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
