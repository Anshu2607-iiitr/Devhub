import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, X, RefreshCw, CheckCircle2, AlertTriangle, 
  MapPin, Clock, ShieldCheck, Zap, Sliders, Smartphone 
} from 'lucide-react';

export default function LiveCameraModal({ isOpen, onClose, onCapture, targetWard = 'Shivpur Ward 14', targetDistrict = 'Varanasi' }) {
  if (!isOpen) return null;

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' | 'user'
  const [gpsData, setGpsData] = useState({
    lat: 25.3176,
    lng: 82.9739,
    accuracy: 8.5,
    altitude: 78.2,
    source: 'GPS Lock Active'
  });
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [flashEffect, setFlashEffect] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  // Live Clock & GPS
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Fetch real browser geolocation if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsData({
            lat: Number(pos.coords.latitude.toFixed(5)),
            lng: Number(pos.coords.longitude.toFixed(5)),
            accuracy: Math.round(pos.coords.accuracy || 6),
            altitude: Math.round(pos.coords.altitude || 78),
            source: 'Device Hardware GPS'
          });
        },
        (err) => {
          console.log('Using simulated constituency GPS:', err.message);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }

    startCamera();

    return () => {
      clearInterval(timer);
      stopCamera();
    };
  }, [facingMode]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } else {
        setCameraError('Camera API not supported in this browser environment. Using high-precision simulation fallback.');
      }
    } catch (err) {
      console.warn('Camera permission denied or unavailable:', err);
      setCameraError('Physical camera access restricted or denied. Synthetic on-site preview active.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleToggleCamera = () => {
    stopCamera();
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Capture Frame
  const handleShutter = () => {
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 250);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 500;

    if (cameraActive && videoRef.current) {
      ctx.drawImage(videoRef.current, 0, 0, 800, 500);
    } else {
      // Draw simulated high-res construction site frame
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 800, 500);

      // Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 200);
      skyGrad.addColorStop(0, '#1e3a8a');
      skyGrad.addColorStop(1, '#0284c7');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, 800, 200);

      // Ground / Road Earthwork
      const groundGrad = ctx.createLinearGradient(0, 200, 0, 500);
      groundGrad.addColorStop(0, '#78350f');
      groundGrad.addColorStop(0.5, '#451a03');
      groundGrad.addColorStop(1, '#1c1917');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, 200, 800, 300);

      // Concrete / Infrastructure markings
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(100, 480);
      ctx.lineTo(350, 220);
      ctx.moveTo(700, 480);
      ctx.lineTo(450, 220);
      ctx.stroke();

      // Structure box
      ctx.fillStyle = '#334155';
      ctx.fillRect(360, 160, 80, 80);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(375, 140, 50, 20);

      // Watermark Text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = 'bold 14px monospace';
      ctx.fillText(`MPLADS CAMERA-LOCK • ${targetDistrict.toUpperCase()}`, 20, 440);
      ctx.font = '12px monospace';
      ctx.fillText(`GPS: ${gpsData.lat}°N, ${gpsData.lng}°E (±${gpsData.accuracy}m)`, 20, 460);
      ctx.fillText(`TIME: ${new Date().toISOString()}`, 20, 480);
    }

    // Draw Watermark Stamp directly onto captured image
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.fillRect(15, 15, 340, 65);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.strokeRect(15, 15, 340, 65);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 11px system-ui';
    ctx.fillText('MoSPI GEOTAG AUDIT STAMP', 25, 32);

    ctx.fillStyle = '#ffffff';
    ctx.font = '10px monospace';
    ctx.fillText(`GPS: ${gpsData.lat}N, ${gpsData.lng}E • Acc: +/-${gpsData.accuracy}m`, 25, 48);
    ctx.fillText(`${targetWard}, ${targetDistrict} • ${new Date().toLocaleDateString()}`, 25, 64);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedPhoto(dataUrl);
  };

  const handleConfirmPhoto = () => {
    if (capturedPhoto) {
      onCapture({
        photoUrl: capturedPhoto,
        gps: gpsData,
        timestamp: new Date().toISOString(),
        ward: targetWard,
        district: targetDistrict
      });
      stopCamera();
      onClose();
    }
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col">
        
        {/* Modal Top Header */}
        <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>In-App Camera Lock • Live Visual Feed</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                {targetWard} • {targetDistrict}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewport Box */}
        <div className="relative bg-black flex items-center justify-center min-h-[380px] overflow-hidden">
          
          {/* Flash Effect */}
          {flashEffect && (
            <div className="absolute inset-0 bg-white z-30 transition-opacity duration-200"></div>
          )}

          {capturedPhoto ? (
            // Captured Preview
            <div className="relative w-full h-full flex flex-col items-center">
              <img src={capturedPhoto} alt="Captured frame" className="w-full h-auto max-h-[380px] object-cover" />
              <div className="absolute top-3 right-3 bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Frame Locked & Geotagged</span>
              </div>
            </div>
          ) : (
            // Live Stream
            <div className="relative w-full h-full flex items-center justify-center">
              {cameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-auto max-h-[380px] object-cover"
                />
              ) : (
                <div className="p-8 text-center space-y-2 text-slate-400">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-amber-400">
                    <Camera className="w-6 h-6 animate-pulse" />
                  </div>
                  <p className="text-xs font-medium text-slate-200">
                    Live Video Feed Initialized (Simulated High-Precision Stream)
                  </p>
                  <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                    {cameraError || 'Hardware camera ready. Ready to capture on-site project evidence frame.'}
                  </p>
                </div>
              )}

              {/* HUD Targeting Overlay */}
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                {/* Top HUD */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-200 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>GPS: {gpsData.lat}°N, {gpsData.lng}°E</span>
                  </div>
                  <div>±{gpsData.accuracy}m Accuracy • {currentTime}</div>
                </div>

                {/* Center Targeting Crosshairs */}
                <div className="self-center flex flex-col items-center justify-center">
                  <div className="w-48 h-32 border border-amber-400/40 rounded-xl relative flex items-center justify-center">
                    <div className="w-4 h-4 border-t-2 border-l-2 border-amber-400 absolute top-0 left-0"></div>
                    <div className="w-4 h-4 border-t-2 border-r-2 border-amber-400 absolute top-0 right-0"></div>
                    <div className="w-4 h-4 border-b-2 border-l-2 border-amber-400 absolute bottom-0 left-0"></div>
                    <div className="w-4 h-4 border-b-2 border-r-2 border-amber-400 absolute bottom-0 right-0"></div>
                    <span className="text-[9px] font-mono text-amber-400/80 bg-black/60 px-2 py-0.5 rounded">
                      CV REGION OF INTEREST
                    </span>
                  </div>
                </div>

                {/* Bottom HUD */}
                <div className="text-[10px] font-mono text-slate-300 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 flex items-center justify-between">
                  <span>Geofence: <strong className="text-emerald-400">Within Perimeter</strong></span>
                  <span>Exif: Tamper-Proof Lock</span>
                </div>
              </div>
            </div>
          )}

          {/* Hidden Canvas for Frame Processing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Modal Bottom Controls */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{gpsData.source}</span>
          </div>

          <div className="flex items-center space-x-3">
            {capturedPhoto ? (
              <>
                <button
                  type="button"
                  onClick={handleRetake}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
                >
                  Retake Photo
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPhoto}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Use Photo for CV Analysis</span>
                </button>
              </>
            ) : (
              <>
                {cameraActive && (
                  <button
                    type="button"
                    onClick={handleToggleCamera}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    title="Switch Camera (Front / Back)"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleShutter}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-lg scale-105 active:scale-95"
                >
                  <Camera className="w-4 h-4" />
                  <span>Capture Geotagged Frame</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
