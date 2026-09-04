import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Zap, Sparkles, ChevronRight, Laptop, Stars, Cpu, Brain, Coffee } from 'lucide-react';

export const OpeningAnimation3D = ({ onComplete }) => {
  const containerRef = useRef(null);
  const [phaseText, setPhaseText] = useState("INITIALIZING APPLE MACBOOK PRO RETINA CORE...");
  const [progress, setProgress] = useState(20);
  const [isDismissing, setIsDismissing] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060814, 0.025);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    containerRef.current.appendChild(renderer.domElement);

    // --- COSMIC PARTICLES & NEBULA LIGHTS ---
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // 1. Particle Galaxy
    const starCount = 3000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorP = new THREE.Color(0xa855f7);
    const colorC = new THREE.Color(0x38bdf8);
    const colorA = new THREE.Color(0xf59e0b);

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 5 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPos[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPos[i + 2] = radius * Math.cos(phi);

      const mixed = Math.random() < 0.4 ? colorP : Math.random() < 0.7 ? colorC : colorA;
      starColors[i] = mixed.r;
      starColors[i + 1] = mixed.g;
      starColors[i + 2] = mixed.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const starfield = new THREE.Points(starGeo, starMat);
    universeGroup.add(starfield);

    // 2. Photorealistic MacBook Pro 3D Mesh with Texture
    const macbookGroup = new THREE.Group();
    universeGroup.add(macbookGroup);

    // Texture Loader for Real MacBook Pro Space Black
    const textureLoader = new THREE.TextureLoader();
    const macbookTexture = textureLoader.load('/assets/real_macbook_space.jpg');
    macbookTexture.generateMipmaps = true;
    macbookTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // Realistic Floating MacBook Billboard Mesh
    const planeGeo = new THREE.PlaneGeometry(16, 9);
    const planeMat = new THREE.MeshBasicMaterial({
      map: macbookTexture,
      transparent: true,
      opacity: 0.96,
      side: THREE.DoubleSide
    });
    const macbookMesh = new THREE.Mesh(planeGeo, planeMat);
    macbookGroup.add(macbookMesh);

    // Orbiting Glowing Laser Ring around MacBook
    const ringGeo = new THREE.RingGeometry(8.2, 8.35, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    macbookGroup.add(ringMesh);

    // Studio Key Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const cyanSpot = new THREE.PointLight(0x38bdf8, 3, 25);
    cyanSpot.position.set(6, 4, 8);
    scene.add(cyanSpot);

    const purpleSpot = new THREE.PointLight(0xa855f7, 3.5, 25);
    purpleSpot.position.set(-6, -3, 8);
    scene.add(purpleSpot);

    // Mouse Tracking Physics
    let mouseX = 0, mouseY = 0;
    let targetRotX = 0, targetRotY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating zero-gravity levitation
      macbookGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.25;

      // Mouse responsive 3D tilt
      targetRotY = mouseX * 0.18;
      targetRotX = -mouseY * 0.12;
      macbookGroup.rotation.y += (targetRotY - macbookGroup.rotation.y) * 0.05;
      macbookGroup.rotation.x += (targetRotX - macbookGroup.rotation.x) * 0.05;

      // Starfield slow orbit
      starfield.rotation.y = elapsedTime * 0.03;
      ringMesh.rotation.z = elapsedTime * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    // Timeline Phase Text Updates
    const t1 = setTimeout(() => {
      setPhaseText("CALIBRATING LIQUID RETINA XDR DISPLAY (120Hz PROMOTION)...");
      setProgress(55);
    }, 700);

    const t2 = setTimeout(() => {
      setPhaseText("SYNTHESIZING JAVA 21, PYTORCH ML & VERILOG HARDWARE MATRICES...");
      setProgress(88);
    }, 1600);

    const t3 = setTimeout(() => {
      setPhaseText("58 MODULES SYNTHESIZED. ENTERING WORKSPACE.");
      setProgress(100);
    }, 2400);

    const t4 = setTimeout(() => {
      handleSkip();
    }, 3200);

    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleSkip = () => {
    setIsDismissing(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  };

  return (
    <AnimatePresence>
      {!isDismissing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#060814] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden"
        >
          {/* 3D WebGL Canvas Layer */}
          <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />

          {/* Top Info Strip */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shadow-glow-sm">
                <Laptop className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-wider flex items-center gap-2">
                  DevHub Studio
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    MACBOOK PRO MAX
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  JAVA 21 • PYTORCH ML • VERILOG VLSI • CP-31
                </div>
              </div>
            </div>

            <button
              onClick={handleSkip}
              className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-purple-600/30 border border-white/10 hover:border-purple-500/40 text-xs font-mono text-slate-300 hover:text-white transition flex items-center gap-1.5 shadow-lg backdrop-blur-md"
            >
              <span>Skip Intro</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center Holographic Title HUD */}
          <div className="relative z-10 text-center max-w-xl mx-auto space-y-3 pointer-events-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium backdrop-blur-md shadow-lg"
            >
              <Stars className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>Apple MacBook Pro • Liquid Retina XDR</span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-400 tracking-tight"
            >
              DevHub
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs sm:text-sm text-slate-300 font-mono tracking-wide"
            >
              {phaseText}
            </motion.p>
          </div>

          {/* Bottom Hologram Progress Gauge */}
          <div className="relative z-10 max-w-md mx-auto w-full space-y-2">
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                SPACE BLACK RETINA MESH: 100%
              </span>
              <span className="text-cyan-400 font-bold">{progress}%</span>
            </div>

            <div className="w-full bg-slate-900/80 rounded-full h-2 overflow-hidden border border-white/10 p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="text-center text-[10px] font-mono text-slate-500">
              58 MODULES • 3,100+ DIAGNOSTICS • LEETCODE / CP-31 / VERILOG ARENA
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
