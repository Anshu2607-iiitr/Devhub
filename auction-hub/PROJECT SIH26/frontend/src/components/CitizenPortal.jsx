import React, { useState } from 'react';
import { 
  Users, MapPin, Camera, AlertOctagon, CheckCircle2, 
  ThumbsUp, ShieldCheck, Flag, Search, Filter 
} from 'lucide-react';

export default function CitizenPortal() {
  const [selectedWard, setSelectedWard] = useState('Shivpur Ward 14');
  const [grievanceType, setGrievanceType] = useState('Stalled Work / Abandoned Site');
  const [description, setDescription] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [submittedGrievance, setSubmittedGrievance] = useState(false);

  // Sample community verified feed
  const [communityReports, setCommunityReports] = useState([
    {
      id: 'CIT-2026-012',
      project_title: '10HP Submersible Solar Pump Installation',
      ward: 'Shivpur Ward 14, Varanasi',
      issue: 'Borewell drilled but solar panels missing since 4 months',
      citizen_reputation: '4.8 / 5.0 (High Credibility)',
      upvotes: 24,
      status: 'Inspection Ordered by Collectorate',
      date: '2026-09-08',
      verified: true
    },
    {
      id: 'CIT-2026-009',
      project_title: 'Bituminous Road Widening & Drainage Layer',
      ward: 'Rohania Block, Varanasi',
      issue: 'Substandard gravel used, road cracked after initial rains',
      citizen_reputation: '4.5 / 5.0 (Verified Resident)',
      upvotes: 19,
      status: 'Under Technical Evaluation',
      date: '2026-09-06',
      verified: true
    },
    {
      id: 'CIT-2026-003',
      project_title: 'Anganwadi Center Child Sanitation Unit',
      ward: 'Bhelupur Ward 8, Varanasi',
      issue: 'Facility functional and well maintained by local panchayat',
      citizen_reputation: '4.9 / 5.0 (Community Champion)',
      upvotes: 31,
      status: 'Compliance Verified',
      date: '2026-09-02',
      verified: true
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: `CIT-2026-${String(communityReports.length + 15).padStart(3, '0')}`,
      project_title: 'Local Public Asset Verification',
      ward: selectedWard,
      issue: description || 'Ground progress disparity reported by verified resident',
      citizen_reputation: '4.7 / 5.0 (GPS Verified Resident)',
      upvotes: 1,
      status: 'Pending AI Credibility Scrutiny',
      date: new Date().toISOString().substring(0, 10),
      verified: false
    };

    setCommunityReports([newReport, ...communityReports]);
    setSubmittedGrievance(true);
    setDescription('');
    setHasPhoto(false);
    setTimeout(() => setSubmittedGrievance(false), 4000);
  };

  const handleUpvote = (id) => {
    setCommunityReports(communityReports.map((r) => r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r));
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <Users className="w-5 h-5" />
            <span>Citizen Ground Verification & Counter-Reporting Portal</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Empowering citizens as decentralized vigilance ground sensors. Submit geo-tagged counter-photos and grievances protected by a credibility-weighted anti-abuse scoring engine.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-300">Credibility Weighting • Anti-Spam Rate Limited</span>
        </div>
      </div>

      {submittedGrievance && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <span className="font-bold block">Grievance Successfully Registered & Authenticated!</span>
            <span className="text-slate-300 font-normal">Your counter-evidence has been weighted with your credibility score and forwarded to the District Vigilance cell.</span>
          </div>
        </div>
      )}

      {/* Main Grid: Submit Grievance Left, Community Transparency Feed Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Submit Counter-Evidence */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Flag className="w-4 h-4 text-emerald-400" />
            <span>Submit Ground Counter-Report</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Select Constituency Ward</label>
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Shivpur Ward 14">Shivpur Ward 14 (Varanasi)</option>
                <option value="Rohania Block">Rohania Block (Varanasi)</option>
                <option value="Bhelupur Ward 8">Bhelupur Ward 8 (Varanasi)</option>
                <option value="Gorakhpur Sadar">Gorakhpur Sadar</option>
                <option value="Wayanad Rural">Wayanad Rural</option>
                <option value="Baramati Ward 3">Baramati Ward 3</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Observed Issue Category</label>
              <select
                value={grievanceType}
                onChange={(e) => setGrievanceType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Stalled Work / Abandoned Site">Stalled Work / Abandoned Site</option>
                <option value="Ghost Asset (No Physical Work on Ground)">Ghost Asset (No Physical Work on Ground)</option>
                <option value="Sub-standard Material & Cracking">Sub-standard Material & Cracking</option>
                <option value="Duplicate Work In Same Locality">Duplicate Work In Same Locality</option>
                <option value="Positive / Work Completed Successfully">Positive / Work Completed Successfully</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Detailed Ground Observations</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe current ground reality, missing components, or completion status..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-sans"
                required
              />
            </div>

            {/* Photo Upload Simulation */}
            <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-300">Attach Geo-Tagged Evidence Photo</span>
                {hasPhoto && (
                  <span className="text-[10px] text-emerald-400 font-bold">GPS Verified</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setHasPhoto(!hasPhoto)}
                className={`w-full py-2 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 border ${
                  hasPhoto
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>{hasPhoto ? 'Photo Attached (GPS 25.317°N, 82.973°E)' : 'Upload Geo-Tagged Photo'}</span>
              </button>
            </div>

            {/* Credibility info */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center justify-between text-slate-300 font-semibold">
                <span>Your Citizen Credibility Score:</span>
                <span className="text-emerald-400 font-mono">4.8 / 5.0</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Reputation increases as your verified on-site reports are confirmed by technical audit inspectors.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition text-xs shadow"
            >
              Submit Ground Report to MoSPI Vigilance
            </button>
          </form>
        </div>

        {/* Right: Community Transparency Feed */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Verified Community Ground Reports</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Live citizen audit feed for your constituency</p>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300 font-mono">
              {communityReports.length} Reports
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[480px] pr-1">
            {communityReports.map((item) => (
              <div key={item.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 hover:border-slate-700 transition">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono">{item.id} • {item.date}</span>
                    <h4 className="font-bold text-white text-xs mt-0.5">{item.project_title}</h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{item.ward}</span>
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    item.status.includes('Ordered')
                      ? 'bg-red-950 text-red-300 border-red-800'
                      : item.status.includes('Verified')
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border-amber-800'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60 leading-relaxed">
                  "{item.issue}"
                </p>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-900">
                  <span className="text-slate-400">Reporter: <strong className="text-slate-200">{item.citizen_reputation}</strong></span>
                  <button
                    onClick={() => handleUpvote(item.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 transition"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Confirm ({item.upvotes})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
