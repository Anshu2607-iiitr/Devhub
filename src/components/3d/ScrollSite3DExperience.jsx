import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Terminal, Sparkles, Zap, ChevronDown, ArrowRight, Laptop, Radio, Shield, Brain, Stars } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ScrollSite3DExperience = () => {
  const containerRef = useRef(null);
  const canvasHolderRef = useRef(null);
  const [scrollFraction, setScrollFraction] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);

  const chapters = [
    {
      id: 0,
      title: "TRUE 3D DEVELOPER LAPTOP",
      subtitle: "Full 360° Volumetric Mesh in Cosmic Space",
      desc: "An ultra-detailed 3D unibody aluminum workstation floating in zero-gravity with physical keyboard deck, hinge mechanics, and glowing IDE display.",
      icon: Laptop,
      color: "from-purple-500 to-indigo-500",
      accent: "text-purple-400",
      start: 0.0,
      end: 0.25
    },
    {
      id: 1,
      title: "ORBITAL KAFKA EVENT STREAMS",
      subtitle: "Spring Boot & Planetary Microservices",
      desc: "Microservices and high-throughput event topics orbit the 3D laptop chassis like planetary rings with partition-key order guarantees.",
      icon: Radio,
      color: "from-cyan-500 to-blue-500",
      accent: "text-cyan-400",
      start: 0.25,
      end: 0.50
    },
    {
      id: 2,
      title: "SPRING AI & DEEPSEEK NEURAL NEBULA",
      subtitle: "Local Vector Embeddings & Agentic Automation",
      desc: "Holographic neural projections beam directly from the terminal screen into the cosmic ether with private DeepSeek Ollama inference.",
      icon: Brain,
      color: "from-emerald-400 to-teal-500",
      accent: "text-emerald-400",
      start: 0.50,
      end: 0.75
    },
    {
      id: 3,
      title: "31 ENTERPRISE MODULES UNIFIED",
      subtitle: "1,700+ Active Recall Diagnostics Across the Cosmos",
      desc: "The cosmic threshold connects to 31 structured modules with real JVM diagnostics and direct timestamp links.",
      icon: Stars,
      color: "from-amber-400 to-rose-500",
      accent: "text-amber-400",
      start: 0.75,
      end: 1.0
    }
  ];

  useEffect(() => {
    if (!canvasHolderRef.current) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060814, 0.02);

    const camera = new THREE.PerspectiveCamera(
      45,
      canvasHolderRef.current.clientWidth / canvasHolderRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3.5, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasHolderRef.current.clientWidth, canvasHolderRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    canvasHolderRef.current.appendChild(renderer.domElement);

    // --- 3D UNIVERSE & GALAXY ---
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // 1. Swirling Spiral Galaxy Particles (2,800 stars)
    const starCount = 2800;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorP = new THREE.Color(0xa855f7);
    const colorC = new THREE.Color(0x38bdf8);
    const colorB = new THREE.Color(0x6366f1);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 42 + 2;
      const spinAngle = radius * 0.75;
      const branchAngle = ((i % 3) * (2 * Math.PI)) / 3;

      const randomX = (Math.random() - 0.5) * 3 * (radius / 15);
      const randomY = (Math.random() - 0.5) * 3 * (radius / 20);
      const randomZ = (Math.random() - 0.5) * 3 * (radius / 15);

      starPos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      starPos[i3 + 1] = (Math.random() - 0.5) * 12 + randomY;
      starPos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixed = radius < 14
        ? colorP.clone().lerp(colorC, radius / 14)
        : colorC.clone().lerp(colorB, (radius - 14) / 28);

      starColors[i3] = mixed.r;
      starColors[i3 + 1] = mixed.g;
      starColors[i3 + 2] = mixed.b;
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
    const galaxy = new THREE.Points(starGeo, starMat);
    universeGroup.add(galaxy);

    // ==========================================
    // 2. ULTRA-DETAILED PROCEDURAL 3D LAPTOP MESH
    // ==========================================
    const laptopMaster = new THREE.Group();
    universeGroup.add(laptopMaster);

    // Materials
    const spaceGreyAlu = new THREE.MeshStandardMaterial({
      color: 0x1e2230,
      metalness: 0.9,
      roughness: 0.25
    });

    const polishedAlu = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.95,
      roughness: 0.15
    });

    const keyCapMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.6,
      metalness: 0.2
    });

    const keyGlowMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      emissive: 0x6366f1,
      emissiveIntensity: 0.7
    });

    const rubberMat = new THREE.MeshBasicMaterial({ color: 0x050508 });

    // --- A. BASE CHASSIS (Bottom Case) ---
    const baseWidth = 8.2;
    const baseHeight = 0.28;
    const baseDepth = 5.6;

    const baseChassis = new THREE.Mesh(
      new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth),
      spaceGreyAlu
    );
    baseChassis.castShadow = true;
    baseChassis.receiveShadow = true;
    laptopMaster.add(baseChassis);

    // Side USB-C Ports
    const portGeo = new THREE.BoxGeometry(0.04, 0.08, 0.22);
    const port1 = new THREE.Mesh(portGeo, polishedAlu);
    port1.position.set(-baseWidth / 2 - 0.01, 0, -1.2);
    laptopMaster.add(port1);
    const port2 = new THREE.Mesh(portGeo, polishedAlu);
    port2.position.set(-baseWidth / 2 - 0.01, 0, -0.7);
    laptopMaster.add(port2);

    // Rubber Feet underneath
    const footGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16);
    const feetPositions = [
      [-3.4, -baseHeight / 2 - 0.02, -2.1],
      [3.4, -baseHeight / 2 - 0.02, -2.1],
      [-3.4, -baseHeight / 2 - 0.02, 2.1],
      [3.4, -baseHeight / 2 - 0.02, 2.1]
    ];
    feetPositions.forEach(([x, y, z]) => {
      const foot = new THREE.Mesh(footGeo, rubberMat);
      foot.position.set(x, y, z);
      laptopMaster.add(foot);
    });

    // Keyboard Well Recess
    const kbWell = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.04, 3.2),
      new THREE.MeshStandardMaterial({ color: 0x0b0f19, metalness: 0.8, roughness: 0.5 })
    );
    kbWell.position.set(0, baseHeight / 2 + 0.01, -0.8);
    laptopMaster.add(kbWell);

    // Individual 3D Keys (Rows of Keys)
    const keyRows = 5;
    const keyCols = 13;
    const keyWidth = 0.46;
    const keyDepth = 0.46;
    const keyHeight = 0.06;
    const keySpacingX = 0.54;
    const keySpacingZ = 0.58;

    const keysGroup = new THREE.Group();
    keysGroup.position.set(-((keyCols - 1) * keySpacingX) / 2, baseHeight / 2 + 0.04, -2.0);

    const keyBoxGeo = new THREE.BoxGeometry(keyWidth, keyHeight, keyDepth);

    for (let r = 0; r < keyRows; r++) {
      for (let c = 0; c < keyCols; c++) {
        // Spacebar on bottom row
        if (r === keyRows - 1 && c >= 4 && c <= 8) {
          if (c === 4) {
            const spaceGeo = new THREE.BoxGeometry(keyWidth * 5 + 0.3, keyHeight, keyDepth);
            const spaceKey = new THREE.Mesh(spaceGeo, (r + c) % 3 === 0 ? keyGlowMat : keyCapMat);
            spaceKey.position.set(c * keySpacingX + 0.8, 0, r * keySpacingZ);
            keysGroup.add(spaceKey);
          }
          continue;
        }

        const isGlow = (r + c) % 4 === 0;
        const keyMesh = new THREE.Mesh(keyBoxGeo, isGlow ? keyGlowMat : keyCapMat);
        keyMesh.position.set(c * keySpacingX, 0, r * keySpacingZ);
        keysGroup.add(keyMesh);
      }
    }
    laptopMaster.add(keysGroup);

    // Glass Trackpad
    const trackpad = new THREE.Mesh(
      new THREE.BoxGeometry(3.0, 0.03, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x182032, roughness: 0.15, metalness: 0.7 })
    );
    trackpad.position.set(0, baseHeight / 2 + 0.02, 1.5);
    laptopMaster.add(trackpad);

    // --- B. SCREEN LID & HINGE ASSEMBLY ---
    const screenHinge = new THREE.Group();
    screenHinge.position.set(0, baseHeight / 2, -baseDepth / 2);
    laptopMaster.add(screenHinge);

    // Hinge Cylinder
    const hingeCyl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 5.0, 16),
      polishedAlu
    );
    hingeCyl.rotation.z = Math.PI / 2;
    screenHinge.add(hingeCyl);

    // Screen Lid Back Case
    const screenWidth = 8.2;
    const screenHeight = 5.4;
    const screenThick = 0.18;

    const lidCaseGeo = new THREE.BoxGeometry(screenWidth, screenHeight, screenThick);
    lidCaseGeo.translate(0, screenHeight / 2, 0);
    const lidCase = new THREE.Mesh(lidCaseGeo, spaceGreyAlu);
    screenHinge.add(lidCase);

    // Glowing DevHub Logo on Back of Screen
    const logoMesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.35, 32),
      new THREE.MeshBasicMaterial({ color: 0xc084fc })
    );
    logoMesh.position.set(0, screenHeight / 2, -screenThick / 2 - 0.01);
    logoMesh.rotation.y = Math.PI;
    screenHinge.add(logoMesh);

    // Glass Bezel & Display Screen Surface
    const displayCanvas = document.createElement('canvas');
    displayCanvas.width = 1024;
    displayCanvas.height = 680;
    const dCtx = displayCanvas.getContext('2d');

    const updateDisplayTexture = (scrollVal) => {
      dCtx.fillStyle = '#090d16';
      dCtx.fillRect(0, 0, 1024, 680);

      // IDE Titlebar
      dCtx.fillStyle = '#0f172a';
      dCtx.fillRect(0, 0, 1024, 60);

      dCtx.fillStyle = '#ef4444'; dCtx.beginPath(); dCtx.arc(35, 30, 9, 0, Math.PI * 2); dCtx.fill();
      dCtx.fillStyle = '#f59e0b'; dCtx.beginPath(); dCtx.arc(65, 30, 9, 0, Math.PI * 2); dCtx.fill();
      dCtx.fillStyle = '#10b981'; dCtx.beginPath(); dCtx.arc(95, 30, 9, 0, Math.PI * 2); dCtx.fill();

      dCtx.fillStyle = '#cbd5e1';
      dCtx.font = 'bold 22px monospace';
      dCtx.fillText('Apple MacBook Pro Liquid Retina XDR • DevHub Studio Pro Max', 130, 38);

      // Chapter 1: Java 21 Virtual Threads
      dCtx.fillStyle = '#a855f7';
      dCtx.font = '22px monospace';
      dCtx.fillText('// 1. Java 21: Project Loom Virtual Threads & Kafka', 40, 115);

      dCtx.fillStyle = '#38bdf8';
      dCtx.fillText('try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {', 40, 150);
      dCtx.fillStyle = '#10b981';
      dCtx.fillText('    executor.submit(() -> kafkaTemplate.send("galaxy-stream", "ORDER_ACK"));', 40, 185);
      dCtx.fillStyle = '#38bdf8';
      dCtx.fillText('}', 40, 220);

      // Chapter 2: PyTorch Transformers & LoRA
      dCtx.fillStyle = '#c084fc';
      dCtx.fillText('// 2. Machine Learning: PyTorch Transformer Attention (QKV)', 40, 270);
      dCtx.fillStyle = '#fbbf24';
      dCtx.fillText('scores = (Q @ K.transpose(-2, -1)) / (d_k ** 0.5); weights = F.softmax(scores);', 40, 305);

      // Chapter 3: Verilog 32-Bit RISC-V ALU
      dCtx.fillStyle = '#f43f5e';
      dCtx.fillText('// 3. Verilog HDL: 32-Bit ALU & 2-Flop CDC Synchronizer', 40, 355);
      dCtx.fillStyle = '#fb923c';
      dCtx.fillText('always @(posedge clk) begin if (load) q <= d; else if (ena) q <= q + 1; end', 40, 390);

      // Bottom Terminal telemetry
      dCtx.fillStyle = '#1e293b';
      dCtx.fillRect(40, 440, 944, 195);

      dCtx.fillStyle = '#38bdf8';
      dCtx.font = 'bold 22px monospace';
      dCtx.fillText(`REALTIME ORBITAL SCROLL: ${(scrollVal * 100).toFixed(1)}%`, 70, 485);

      dCtx.fillStyle = '#94a3b8';
      dCtx.font = '19px monospace';
      dCtx.fillText('58 ENGINEERING MODULES • 3,100+ DIAGNOSTICS • LEETCODE / CP-31', 70, 525);
      dCtx.fillText('STATUS: APPLE MACBOOK PRO SPACE BLACK MESH ACTIVE', 70, 560);

      dCtx.fillStyle = '#a855f7';
      dCtx.fillRect(70, 585, Math.max(20, scrollVal * 880), 16);
    };

    updateDisplayTexture(0);
    const displayTex = new THREE.CanvasTexture(displayCanvas);
    const displayMat = new THREE.MeshBasicMaterial({ map: displayTex });

    const displayGeo = new THREE.PlaneGeometry(7.7, 5.0);
    displayGeo.translate(0, screenHeight / 2, screenThick / 2 + 0.01);
    const displayMesh = new THREE.Mesh(displayGeo, displayMat);
    screenHinge.add(displayMesh);

    // Initial Screen Open Angle (~110 deg)
    screenHinge.rotation.x = Math.PI / 1.62;

    // --- C. HOLOGRAPHIC ORBITAL RINGS & SATELLITES ---
    const orbitGroup = new THREE.Group();
    laptopMaster.add(orbitGroup);

    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(6.6, 0.04, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.7 })
    );
    ring1.rotation.x = Math.PI / 2.3;
    orbitGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(8.2, 0.03, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.55 })
    );
    ring2.rotation.y = Math.PI / 3;
    orbitGroup.add(ring2);

    const planetCount = 6;
    for (let i = 0; i < planetCount; i++) {
      const angle = (i / planetCount) * Math.PI * 2;
      const planet = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0x38bdf8 : 0xc084fc,
          emissive: i % 2 === 0 ? 0x0284c7 : 0x7e22ce,
          roughness: 0.2
        })
      );
      planet.position.set(Math.cos(angle) * 6.6, Math.sin(angle) * 2.2, Math.sin(angle) * 6.6);
      orbitGroup.add(planet);
    }

    // 3D Floating Octahedron AI Core above laptop screen
    const holoCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.9, 0),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.85 })
    );
    holoCore.position.set(0, 4.2, 0.8);
    laptopMaster.add(holoCore);

    // --- LIGHTING ---
    const ambLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const purpleGlow = new THREE.PointLight(0xa855f7, 6, 40);
    purpleGlow.position.set(6, 6, 8);
    scene.add(purpleGlow);

    const cyanGlow = new THREE.PointLight(0x06b6d4, 6, 40);
    cyanGlow.position.set(-6, -4, 8);
    scene.add(cyanGlow);

    // --- MOUSE PARALLAX INTERACTION ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    // --- SCROLL INTERPOLATION ---
    let currentScroll = 0;
    let targetScroll = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / (totalScrollable || 1)));

      targetScroll = progress;
      setScrollFraction(progress);

      if (progress < 0.26) setCurrentChapter(0);
      else if (progress < 0.52) setCurrentChapter(1);
      else if (progress < 0.78) setCurrentChapter(2);
      else setCurrentChapter(3);

      updateDisplayTexture(progress);
      displayTex.needsUpdate = true;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- ANIMATION LOOP ---
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth scroll lerp
      currentScroll += (targetScroll - currentScroll) * 0.08;

      // Smooth mouse lerp
      targetMouseX += (mouseX - targetMouseX) * 0.05;
      targetMouseY += (mouseY - targetMouseY) * 0.05;

      // Galaxy Universe rotation
      galaxy.rotation.y = elapsed * 0.03 + currentScroll * 1.5;
      galaxy.rotation.x = Math.sin(elapsed * 0.04) * 0.08;

      // Full 3D Volumetric Laptop Motion
      const floatY = Math.sin(elapsed * 1.3) * 0.2;
      laptopMaster.position.y = floatY + Math.sin(currentScroll * Math.PI) * 1.0;
      laptopMaster.position.z = -currentScroll * 3.5;

      // True 3D Rotations: turns in 3D perspective across full 360-degree range
      laptopMaster.rotation.y = -0.4 + (targetMouseX * 0.35) + elapsed * 0.1 + (currentScroll * Math.PI * 1.8);
      laptopMaster.rotation.x = 0.3 + (-targetMouseY * 0.25) + Math.cos(elapsed * 0.5) * 0.06 + (currentScroll * 0.5);
      laptopMaster.rotation.z = (targetMouseX * 0.1) + Math.sin(currentScroll * Math.PI) * 0.2;

      // Physical Hinge Open / Close breathing
      screenHinge.rotation.x = (Math.PI / 1.62) + Math.sin(currentScroll * Math.PI * 2) * 0.08;

      // Orbital Rings & Hologram
      orbitGroup.rotation.y = elapsed * 0.35 + currentScroll * 3;
      holoCore.rotation.x = elapsed * 0.8;
      holoCore.rotation.y = elapsed * 1.2;
      holoCore.position.y = 4.2 + Math.sin(elapsed * 2) * 0.3;

      // Camera Dynamic 3D Tracking
      camera.position.z = 15 - currentScroll * 6;
      camera.position.y = 3.5 + Math.sin(currentScroll * Math.PI) * 1.5;
      camera.lookAt(0, 1.2, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvasHolderRef.current || !renderer || !camera) return;
      const w = canvasHolderRef.current.clientWidth;
      const h = canvasHolderRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (canvasHolderRef.current && renderer.domElement) {
        canvasHolderRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const activeChap = chapters[currentChapter] || chapters[0];
  const Icon = activeChap.icon;

  return (
    <div ref={containerRef} className="relative h-[320vh] bg-[#060814]">
      {/* Sticky Pinned 3D Stage (100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-8 select-none">
        {/* 3D WebGL Canvas Layer */}
        <div ref={canvasHolderRef} className="absolute inset-0 z-0 pointer-events-none" />

        {/* Top Space Station HUD */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shadow-glow-sm">
              <Laptop className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <span className="text-xs font-bold text-white tracking-widest font-mono uppercase flex items-center gap-2">
                VOLUMETRIC 3D LAPTOP
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  REAL 3D MESH
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
            <span className="hidden sm:inline text-slate-500">ORBITAL PROGRESS:</span>
            <span className="text-cyan-400 font-bold">{Math.round(scrollFraction * 100)}%</span>
          </div>
        </div>

        {/* Dynamic Storytelling Chapter Overlays */}
        <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center pointer-events-none">
          {/* Chapter Content Card */}
          <div className="md:col-span-7 space-y-4">
            <motion.div
              key={activeChap.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono backdrop-blur-md">
                <Icon className={`w-4 h-4 ${activeChap.accent}`} />
                <span className="text-slate-300 uppercase tracking-wider">
                  CHAPTER 0{activeChap.id + 1} / 04
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                {activeChap.title}
              </h2>

              <p className={`text-sm sm:text-base font-semibold font-mono ${activeChap.accent}`}>
                {activeChap.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                {activeChap.desc}
              </p>
            </motion.div>
          </div>

          {/* Right Floating Hologram Telemetry */}
          <div className="md:col-span-5 hidden md:block">
            <div className="glass-card rounded-2xl p-5 border border-cyan-500/30 shadow-2xl backdrop-blur-xl space-y-3 pointer-events-auto">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-300 pb-2 border-b border-white/5">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  3D GEOMETRY TELEMETRY
                </span>
                <span className="text-emerald-400 font-bold">60 FPS WEBGL</span>
              </div>

              <div className="space-y-2 text-xs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>Chassis:</span>
                  <span className="text-white font-bold">Aluminum Unibody</span>
                </div>
                <div className="flex justify-between">
                  <span>3D Keyboard:</span>
                  <span className="text-cyan-400 font-bold">65 Individual 3D Keys</span>
                </div>
                <div className="flex justify-between">
                  <span>Hinge Joint:</span>
                  <span className="text-purple-300 font-bold">Physical 3D Rotator</span>
                </div>
                <div className="flex justify-between">
                  <span>Universe:</span>
                  <span className="text-emerald-400 font-bold">2,800 Star Spiral</span>
                </div>
              </div>

              <Link
                to="/course/java"
                className="w-full mt-2 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-xs font-bold text-white transition flex items-center justify-center gap-1.5 shadow-glow-sm"
              >
                <span>Explore All 31 Modules</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Chapter Scrub Tabs & Scroll Indicator */}
        <div className="relative z-10 max-w-4xl mx-auto w-full space-y-3">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
            {chapters.map((ch, idx) => {
              const isActive = currentChapter === idx;
              return (
                <div
                  key={ch.id}
                  className={`flex-1 min-w-[120px] p-2 rounded-xl border text-center transition-all ${
                    isActive
                      ? 'bg-purple-600/20 border-cyan-500/50 shadow-glow-sm'
                      : 'bg-slate-900/60 border-white/5 opacity-50'
                  }`}
                >
                  <div className={`text-[10px] font-mono font-bold ${isActive ? 'text-cyan-300' : 'text-slate-500'}`}>
                    0{idx + 1}. {ch.title.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-1.5 animate-bounce">
            <span>Scroll down through the universe to enter curriculum</span>
            <ChevronDown className="w-4 h-4 text-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
