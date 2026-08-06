"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";
import type { Group, Mesh } from "three";

type HeroPlanetProps = {
  lightMode?: boolean;
};

function Planet({ lightMode = false }: HeroPlanetProps) {
  const planetRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!planetRef.current) return;
    planetRef.current.rotation.y += delta * 0.08;
    planetRef.current.rotation.x += delta * 0.015;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.35}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[2.4, 96, 96]} />
        <meshStandardMaterial
          color={lightMode ? "#ded5ed" : "#09050f"}
          roughness={lightMode ? 0.58 : 0.72}
          metalness={0.35}
          emissive={lightMode ? "#8c5bd6" : "#26074d"}
          emissiveIntensity={lightMode ? 0.18 : 0.4}
        />
      </mesh>

      <mesh scale={1.025}>
        <sphereGeometry args={[2.4, 72, 72]} />
        <meshBasicMaterial
          color={lightMode ? "#7135dc" : "#7c2cff"}
          transparent
          opacity={lightMode ? 0.13 : 0.07}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function PlanetScene({ lightMode = false }: HeroPlanetProps) {
  const groupRef = useRef<Group>(null);
  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => {
        const angle = (index / 34) * Math.PI * 2;
        const radius = 1.95 + (index % 5) * 0.18;
        return {
          position: [
            Math.cos(angle) * radius,
            Math.sin(angle * 1.7) * 0.72,
            Math.sin(angle) * radius * 0.32,
          ] as [number, number, number],
          scale: 0.018 + (index % 4) * 0.006,
        };
      }),
    [],
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.00018) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, -0.08, 0]} rotation={[0.12, -0.18, -0.06]}>
      <Planet lightMode={lightMode} />
      <mesh rotation={[Math.PI / 2.22, 0, 0.12]}>
        <torusGeometry args={[2.22, 0.006, 12, 160]} />
        <meshBasicMaterial
          color={lightMode ? "#7135dc" : "#d8c8ff"}
          transparent
          opacity={lightMode ? 0.22 : 0.34}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.75, 0.42, -0.18]}>
        <torusGeometry args={[1.38, 0.005, 12, 132]} />
        <meshBasicMaterial
          color={lightMode ? "#9364ef" : "#8664ff"}
          transparent
          opacity={lightMode ? 0.2 : 0.26}
        />
      </mesh>

      <mesh rotation={[0.32, 0.58, 0.2]}>
        <boxGeometry args={[0.92, 0.92, 0.92, 4, 4, 4]} />
        <meshBasicMaterial
          color={lightMode ? "#7135dc" : "#7c2cff"}
          wireframe
          transparent
          opacity={lightMode ? 0.26 : 0.38}
        />
      </mesh>

      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position}>
          <sphereGeometry args={[particle.scale, 12, 12]} />
          <meshBasicMaterial
            color={index % 5 === 0 ? "#67e8f9" : lightMode ? "#7135dc" : "#f3e8ff"}
            transparent
            opacity={lightMode ? 0.52 : 0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HeroPlanet({ lightMode = false }: HeroPlanetProps) {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        className="!h-full !w-full"
        camera={{
          position: [0, 0.4, 7],
          fov: 42,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
        }}
        style={{
          background: "transparent",
        }}
      >
        <ambientLight intensity={lightMode ? 0.7 : 0.3} />
        <directionalLight
          position={[4, 5, 4]}
          intensity={lightMode ? 1.5 : 1.1}
          color={lightMode ? "#ffffff" : "#d8c6ff"}
        />
        <pointLight
          position={[0, -3, 3]}
          intensity={lightMode ? 12 : 22}
          color={lightMode ? "#9364ef" : "#7c2cff"}
          distance={9}
        />
        <pointLight
          position={[-4, 0, 1]}
          intensity={lightMode ? 4 : 8}
          color={lightMode ? "#c5a8f2" : "#4410a0"}
          distance={10}
        />
        <Stars radius={35} depth={25} count={lightMode ? 250 : 900} factor={2} fade speed={0.25} />
        <Sparkles
          count={lightMode ? 25 : 55}
          scale={9}
          size={1.7}
          speed={0.25}
          color={lightMode ? "#7135dc" : "#b18cff"}
        />
        <PlanetScene lightMode={lightMode} />
      </Canvas>
    </div>
  );
}
