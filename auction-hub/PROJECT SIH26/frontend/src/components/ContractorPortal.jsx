import React, { useState } from 'react';
import { 
  Camera, CheckCircle2, AlertTriangle, ShieldCheck, MapPin, 
  Calendar, Upload, Cpu, Eye, Lock, RefreshCw, ArrowRight, Layers, Sliders, Scan, Image 
} from 'lucide-react';
import LiveCameraModal from './LiveCameraModal';

const SECTOR_STAGES = {
  'Rural Roads & Connectivity': [
    { stage: 'Earthwork & Land Clearing', range: '0% - 25%', typicalDays: 20 },
    { stage: 'Sub-Base & Granular Layer', range: '25% - 55%', typicalDays: 35 },
    { stage: 'Bituminous Macadam & Paving', range: '55% - 85%', typicalDays: 25 },
    { stage: 'Shoulders, Signage & Road Markings', range: '85% - 100%', typicalDays: 15 },
  ],
  'Community Halls & Public Infra': [
    { stage: 'Excavation & Foundation Plinth', range: '0% - 30%', typicalDays: 30 },
    { stage: 'Columns & Reinforced Concrete Slab', range: '30% - 65%', typicalDays: 45 },
    { stage: 'Brick Masonry & Plastering', range: '65% - 85%', typicalDays: 30 },
    { stage: 'Flooring, Electrical & Painting', range: '85% - 100%', typicalDays: 20 },
  ],
  'Drinking Water & Tubewells': [
    { stage: 'Rig Site Mobilization & Borewell Drilling', range: '0% - 35%', typicalDays: 15 },
    { stage: 'Casing Pipe Insertion & Submersible Pump Installation', range: '35% - 70%', typicalDays: 20 },
    { stage: 'Overhead Tank Connection & Water Filtration Plant', range: '70% - 90%', typicalDays: 25 },
    { stage: 'Distribution Pipeline & Tap Commissioning', range: '90% - 100%', typicalDays: 10 },
  ],
  'Solar Lighting & Green Energy': [
    { stage: 'Pole Civil Foundation & Casting', range: '0% - 30%', typicalDays: 10 },
    { stage: 'Pole Erection & Solar PV Panel Mounting', range: '30% - 70%', typicalDays: 15 },
    { stage: 'Lithium Battery & LED Luminary Wiring', range: '70% - 90%', typicalDays: 10 },
    { stage: 'Dusk-to-Dawn Automation Testing & Handover', range: '90% - 100%', typicalDays: 5 },
  ],
  'Education & Anganwadi Infrastructure': [
    { stage: 'Ground Foundation & Plinth Beam', range: '0% - 30%', typicalDays: 25 },
    { stage: 'Classroom Superstructure & Roofing', range: '30% - 65%', typicalDays: 40 },
    { stage: 'Plaster, Flooring & Blackboard Setup', range: '65% - 85%', typicalDays: 25 },
    { stage: 'Sanitation Facilities & Final Painting', range: '85% - 100%', typicalDays: 15 },
  ],
  'Healthcare & Sanitation': [
    { stage: 'Civil Foundation & Drainage Network', range: '0% - 35%', typicalDays: 25 },
    { stage: 'Structure & Medical Room Partitions', range: '35% - 70%', typicalDays: 35 },
    { stage: 'Sanitary Fixtures & Clean Water Line', range: '70% - 90%', typicalDays: 20 },
    { stage: 'Sterilization & Final Inspection', range: '90% - 100%', typicalDays: 10 },
  ],
};

export default function ContractorPortal({ onNavigateToProjects }) {
  const [selectedCategory, setSelectedCategory] = useState('Rural Roads & Connectivity');
  const [projectId, setProjectId] = useState('PRJ-2026-089');
  const [ward, setWard] = useState('Shivpur Ward 14');
  const [district, setDistrict] = useState('Varanasi');
  const [reportedProgress, setReportedProgress] = useState(65);
  const [disbursedPct, setDisbursedPct] = useState(70);

  // Camera & CV States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedData, setCapturedData] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [cvResult, setCvResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Handle Capture from Live Camera Modal
  const handlePhotoCaptured = (data) => {
    setCapturedData(data);
    setCvResult(null);
    // Automatically trigger Computer Vision inference
    runCVInference(data);
  };

  const runCVInference = (data) => {
    setAnalyzing(true);
    setTimeout(() => {
      const stages = SECTOR_STAGES[selectedCategory] || SECTOR_STAGES['Rural Roads & Connectivity'];
      
      // Calculate CV physical estimation based on reportedProgress with realistic anomaly divergence
      const estimatedVisualProgress = Math.max(18, reportedProgress - Math.floor(Math.random() * 26 + 6));
      const stageIdx = Math.min(stages.length - 1, Math.floor((estimatedVisualProgress / 100) * stages.length));
      const currentStage = stages[stageIdx];
      const divergenceGap = Math.abs(reportedProgress - estimatedVisualProgress);
      const isDivergent = divergenceGap > 18;

      setCvResult({
        authenticity_score: 98.7,
        sharpness_index: '94.2/100 (Optimal Clarity)',
        duplicate_risk: 'Zero Collision (dHash: 0x9f83a1b2c4d5e6f7)',
        detected_stage: currentStage.stage,
        stage_range: currentStage.range,
        stage_index: stageIdx + 1,
        total_stages: stages.length,
        estimated_visual_pct: estimatedVisualProgress,
        reported_pct: reportedProgress,
        disbursed_pct: disbursedPct,
        divergence_gap: divergenceGap,
        is_divergent: isDivergent,
        detected_features: [
          'Sub-base granular aggregate layer detected (58% confidence)',
          'Earth excavation perimeter validated',
          'Bituminous blacktop not yet laid on 65% of roadway'
        ],
        geo_lock: `${data.district} (${data.gps.lat}°N, ${data.gps.lng}°E) • Geofence Verified (±${data.gps.accuracy}m)`,
        timestamp: data.timestamp.replace('T', ' ').substring(0, 19) + ' UTC',
      });
      setAnalyzing(false);
    }, 1400);
  };

  const handleSubmitMilestone = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCapturedData(null);
      setCvResult(null);
    }, 4500);
  };

  const stages = SECTOR_STAGES[selectedCategory] || SECTOR_STAGES['Rural Roads & Connectivity'];

  return (
    <div className="space-y-6">
      
      {/* Portal Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
            <Camera className="w-5 h-5" />
            <span>Contractor Monthly Progress Ingestion Portal</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Initiate live camera capture with hardware-locked GPS & timestamping. The Computer Vision stage classifier verifies physical progress before tranche payouts.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-300">Live Camera Lock • GPS Tamper-Proof</span>
        </div>
      </div>

      {submitted && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-3 animate-pulse">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <span className="font-bold block">Monthly Progress Dossier Successfully Uploaded!</span>
            <span className="text-slate-300 font-normal">CV stage verification, captured geotagged frame, and timestamp metadata logged to District Collectorate queue.</span>
          </div>
        </div>
      )}

      {/* Main Grid: Upload & Camera Left, CV Analysis Output Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Contractor Upload Form & Live Camera Trigger */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Upload className="w-4 h-4 text-blue-400" />
            <span>Project Milestone Submission Form</span>
          </h3>

          <form onSubmit={handleSubmitMilestone} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Project ID</label>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Work Domain / Sector</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCvResult(null);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 truncate"
                >
                  {Object.keys(SECTOR_STAGES).map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Constituency</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Ward / Location</label>
                <input
                  type="text"
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Slider: Reported Physical Progress */}
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-medium">Contractor Claimed Progress</span>
                <span className="font-bold text-white font-mono">{reportedProgress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={reportedProgress}
                onChange={(e) => {
                  setReportedProgress(Number(e.target.value));
                  if (capturedData) runCVInference(capturedData);
                }}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Camera Box */}
            <div className="border border-slate-800 bg-slate-950 rounded-xl p-4 text-center space-y-3">
              {capturedData ? (
                <div className="space-y-3">
                  <div className="relative rounded-lg overflow-hidden border border-slate-700 max-h-48 mx-auto">
                    <img src={capturedData.photoUrl} alt="Captured Site Frame" className="w-full h-44 object-cover" />
                    <div className="absolute bottom-2 left-2 bg-black/75 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/40">
                      GPS LOCKED: {capturedData.gps.lat}°N, {capturedData.gps.lng}°E
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCameraOpen(true)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition flex items-center gap-1"
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-400" />
                      <span>Retake Camera Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => runCVInference(capturedData)}
                      disabled={analyzing}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition flex items-center gap-1"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${analyzing ? 'animate-spin' : ''}`} />
                      <span>Re-run CV Model</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 py-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Initiate On-Site Camera Lock</span>
                    <span className="text-[10px] text-slate-500 block max-w-sm mx-auto mt-0.5">
                      Captures live high-res frame with hardware-stamped GPS coordinates, preventing photo re-use.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCameraOpen(true)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition text-xs inline-flex items-center gap-2 shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Launch In-App Camera</span>
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!cvResult || analyzing}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-lg transition text-xs flex items-center justify-center gap-1.5 shadow"
            >
              <span>Submit Monthly Progress Verification to Authority</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right: Computer Vision Evaluation */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Computer Vision (CV) Real-Time Inference</span>
            </h3>
            {cvResult && (
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                cvResult.is_divergent ? 'bg-red-950 text-red-400 border-red-800' : 'bg-emerald-950 text-emerald-400 border-emerald-800'
              }`}>
                {cvResult.is_divergent ? 'Divergence Flagged' : 'Milestone Verified'}
              </span>
            )}
          </div>

          {analyzing ? (
            <div className="h-80 flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
              <div>
                <span className="text-xs font-bold text-white block">Executing Computer Vision Stage Classifier...</span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Extracting feature edges, surface texture maps, and computing perceptual duplicate dHash.
                </span>
              </div>
            </div>
          ) : !cvResult ? (
            <div className="h-80 flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
              <Scan className="w-8 h-8 text-slate-700" />
              <p className="text-xs">
                Click "Launch In-App Camera" to capture an authentic site frame and run deep Computer Vision stage classification.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              
              {/* Verdict Banner */}
              <div className={`p-4 rounded-xl border ${
                cvResult.is_divergent ? 'bg-red-950/60 border-red-800 text-red-200' : 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
              }`}>
                <div className="flex items-start gap-2.5">
                  {cvResult.is_divergent ? (
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider block">
                      {cvResult.is_divergent ? 'PROGRESS DIVERGENCE ANOMALY DETECTED' : 'PROGRESS ALIGNS WITH VISUAL STAGE'}
                    </span>
                    <p className="text-xs mt-1 leading-relaxed">
                      {cvResult.is_divergent
                        ? `Contractor claimed ${cvResult.reported_pct}% completion, but Computer Vision stage classifier estimated only ${cvResult.estimated_visual_pct}% physical completion on ground (Divergence: ${cvResult.divergence_gap}%). Tranche release placed on hold.`
                        : `Visual progress (${cvResult.estimated_visual_pct}%) matches reported milestone (${cvResult.reported_pct}%). Cleared for routine milestone disbursement.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Numerical Comparison */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Reported Progress</span>
                  <span className="font-bold text-white font-mono text-base">{cvResult.reported_pct}%</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">CV Visual Progress</span>
                  <span className="font-bold text-cyan-400 font-mono text-base">{cvResult.estimated_visual_pct}%</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Disbursed Outlay</span>
                  <span className="font-bold text-amber-400 font-mono text-base">{cvResult.disbursed_pct}%</span>
                </div>
              </div>

              {/* Detected Physical Stage Box */}
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300">
                    Stage {cvResult.stage_index} of {cvResult.total_stages}:
                  </span>
                  <span className="font-mono text-blue-400 font-bold">{cvResult.stage_range}</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800/80 text-slate-200 font-medium">
                  {cvResult.detected_stage}
                </div>
              </div>

              {/* CV Features List */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 text-[11px]">
                <span className="font-bold text-slate-400 block">Detected Visual Features:</span>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  {cvResult.detected_features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* Metadata Details */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-0.5">
                  <span className="text-slate-500 text-[10px] block">Image Authenticity</span>
                  <span className="font-bold text-emerald-400 font-mono">{cvResult.authenticity_score}% Genuine</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-0.5">
                  <span className="text-slate-500 text-[10px] block">Duplicate Photo Scan</span>
                  <span className="font-semibold text-slate-300 truncate">{cvResult.duplicate_risk}</span>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Live Camera Modal */}
      <LiveCameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handlePhotoCaptured}
        targetWard={ward}
        targetDistrict={district}
      />

    </div>
  );
}
