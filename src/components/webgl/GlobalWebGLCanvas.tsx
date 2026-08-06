"use client";

import { Component, type ReactNode, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { canUseWebGL } from "@/lib/webglSupport";
import { WebGLFallback } from "@/components/webgl/WebGLFallback";

const sections = ["hero", "capabilities", "technology", "process", "work", "contact"];

type BoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type BoundaryState = {
  failed: boolean;
};

class WebGLBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function GlobalWebGLCanvas() {
  const [supported, setSupported] = useState(false);
  const [lost, setLost] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [heroProgress, setHeroProgress] = useState(0);

  useEffect(() => {
    setSupported(canUseWebGL());
  }, []);

  useEffect(() => {
    const targets = sections
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!targets.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.1],
      },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleHeroProgress = (event: Event) => {
      const progress = (event as CustomEvent<{ progress?: number }>).detail?.progress;

      if (typeof progress === "number" && Number.isFinite(progress)) {
        setHeroProgress(Math.min(1, Math.max(0, progress)));
      }
    };

    window.addEventListener("apexmind:hero-progress", handleHeroProgress as EventListener);

    return () => {
      window.removeEventListener("apexmind:hero-progress", handleHeroProgress as EventListener);
    };
  }, []);

  if (!supported || lost) {
    return <WebGLFallback />;
  }

  return (
    <WebGLBoundary fallback={<WebGLFallback />}>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 7.2], fov: 45 }}
          dpr={[1, 1.5]}
          frameloop="always"
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            const canvas = gl.domElement;
            const handleLoss = (event: Event) => {
              event.preventDefault();
              setLost(true);
            };
            canvas.addEventListener("webglcontextlost", handleLoss, false);
          }}
        >
          <SceneController activeSection={activeSection} heroProgress={heroProgress} />
        </Canvas>
      </div>
    </WebGLBoundary>
  );
}

function SceneController({ activeSection, heroProgress }: { activeSection: string; heroProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[2.5, 2.5, 4]} intensity={2.5} color="#9f65ff" />
      <pointLight position={[-4, -2, 2]} intensity={1.2} color="#65eaf2" />
      {activeSection === "hero" && heroProgress < 0.24 ? <HeroSatellites progress={heroProgress} /> : null}
      {activeSection === "capabilities" ? <CapabilityConstellation mode={activeSection} /> : null}
      {activeSection === "technology" ? <TechnologyGlobe /> : null}
      {activeSection === "process" ? <ProcessOrbital /> : null}
      {activeSection === "work" ? <ImpactSphere /> : null}
    </>
  );
}

function HeroSatellites({ progress }: { progress: number }) {
  const group = useFrameGroup(0.08);
  const opacity = smoothWindow(progress, 0, 0.08, 0.2, 0.24);
  const scale = 0.86 + opacity * 0.14;

  return (
    <group ref={group} position={[3.7, 1.45, 0]} rotation={[0.16, -0.2, -0.12]} scale={scale}>
      {[
        [-0.32, 0, 0],
        [0, 0.05, 0.05],
        [0.32, 0, 0],
      ].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <boxGeometry args={[0.26, 0.15, 0.06]} />
          <meshBasicMaterial color={index === 1 ? "#f4eaff" : "#8b3dff"} wireframe transparent opacity={opacity * (index === 1 ? 0.28 : 0.38)} />
        </mesh>
      ))}
      <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.42, 6]} />
        <meshBasicMaterial color="#f4eaff" transparent opacity={opacity * 0.2} />
      </mesh>
    </group>
  );
}

function smoothWindow(progress: number, fadeInStart: number, fadeInEnd: number, fadeOutStart: number, fadeOutEnd: number) {
  const fadeIn = THREE.MathUtils.smoothstep(progress, fadeInStart, fadeInEnd);
  const fadeOut = 1 - THREE.MathUtils.smoothstep(progress, fadeOutStart, fadeOutEnd);

  return Math.max(0, Math.min(1, fadeIn * fadeOut));
}

function CapabilityConstellation({ mode }: { mode: string }) {
  const group = useFrameGroup();
  const cubePositions = mode === "hero" ? [[3.55, 1.4, 0], [3.85, 1.42, 0.1], [4.16, 1.37, 0]] : [[2.35, 0.3, 0], [2.65, 0.52, 0.15], [2.95, 0.22, -0.1]];

  return (
    <group ref={group} rotation={[0.15, 0, -0.2]}>
      <mesh position={[2.65, -0.1, -0.25]} rotation={[0.35, -0.4, 0.25]}>
        <torusKnotGeometry args={[0.8, 0.01, 150, 6, 2, 3]} />
        <meshBasicMaterial color="#8b3dff" transparent opacity={0.26} />
      </mesh>
      {cubePositions.map((position, index) => (
        <mesh key={index} position={position as [number, number, number]} rotation={[0.18, index * 0.3, 0.12]}>
          <boxGeometry args={[0.32, 0.18, 0.08]} />
          <meshBasicMaterial color={index === 1 ? "#f4eaff" : "#8b3dff"} wireframe transparent opacity={index === 1 ? 0.35 : 0.5} />
        </mesh>
      ))}
    </group>
  );
}

function TechnologyGlobe() {
  const group = useFrameGroup();
  const points = useSpherePoints(900, 1.72);

  return (
    <group ref={group} position={[1.55, 0.06, 0]} rotation={[0.15, -0.35, 0.05]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#a855f7" size={0.015} transparent opacity={0.55} sizeAttenuation />
      </points>
      <mesh>
        <sphereGeometry args={[1.68, 44, 24]} />
        <meshBasicMaterial color="#8b3dff" wireframe transparent opacity={0.34} />
      </mesh>
      {[0, 1, 2].map((index) => (
        <mesh key={index} rotation={[Math.PI / 2 + index * 0.5, index * 0.7, index * 0.22]}>
          <torusGeometry args={[1.95, 0.006, 8, 180]} />
          <meshBasicMaterial color={index === 1 ? "#c4a5ff" : "#8b3dff"} transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function ProcessOrbital() {
  const group = useFrameGroup();

  return (
    <group ref={group} position={[1.7, -0.2, 0]}>
      <mesh rotation={[0.8, 0.1, 0.75]}>
        <torusGeometry args={[1.42, 0.012, 8, 180]} />
        <meshBasicMaterial color="#c4a5ff" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[0.8, 0.1, 0.75]} scale={[0.96, 0.96, 0.96]}>
        <boxGeometry args={[1.35, 1.35, 0.02]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.34} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.86, 0.86, 0.08]} />
        <meshBasicMaterial color="#8b3dff" wireframe transparent opacity={0.45} />
      </mesh>
      {[
        [-1.25, 1.05, 0],
        [1.35, 0.6, 0],
        [-0.72, -1.32, 0],
      ].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <sphereGeometry args={[index === 1 ? 0.035 : 0.055, 12, 12]} />
          <meshBasicMaterial color={index === 1 ? "#65eaf2" : "#f4eaff"} />
        </mesh>
      ))}
    </group>
  );
}

function ImpactSphere() {
  const group = useFrameGroup(0.28);
  const points = useSpherePoints(1500, 1.9);

  return (
    <group ref={group} position={[0, 0.2, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#a855f7" size={0.018} transparent opacity={0.75} sizeAttenuation />
      </points>
      <mesh>
        <sphereGeometry args={[1.88, 40, 22]} />
        <meshBasicMaterial color="#8b3dff" wireframe transparent opacity={0.18} />
      </mesh>
      {[0, 1, 2].map((index) => (
        <mesh key={index} rotation={[Math.PI / 2 + index * 0.38, index * 0.8, index * 0.3]}>
          <torusGeometry args={[2.15 + index * 0.08, 0.007, 8, 160]} />
          <meshBasicMaterial color="#8b3dff" transparent opacity={0.35 - index * 0.08} />
        </mesh>
      ))}
    </group>
  );
}

function useFrameGroup(speed = 0.12) {
  const ref = useMemo(() => ({ current: null as THREE.Group | null }), []);

  useFrame(({ clock }) => {
    if (!ref.current) {
      return;
    }

    const t = clock.getElapsedTime();
    ref.current.rotation.y += speed * 0.01;
    ref.current.position.y += Math.sin(t * 0.75) * 0.0008;
  });

  return ref;
}

function useSpherePoints(count: number, radius: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const y = 1 - (index / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = index * Math.PI * (3 - Math.sqrt(5));
      positions[index * 3] = Math.cos(theta) * r * radius;
      positions[index * 3 + 1] = y * radius;
      positions[index * 3 + 2] = Math.sin(theta) * r * radius;
    }

    return positions;
  }, [count, radius]);
}
