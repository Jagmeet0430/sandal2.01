"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function Globe() {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
  });

  return (
    <Float speed={1.1} floatIntensity={0.25} rotationIntensity={0.08}>
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[2.3, 32, 32]} />
          <meshBasicMaterial color="#9b63ff" wireframe transparent opacity={0.32} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.55, 0.012, 8, 160]} />
          <meshBasicMaterial color="#c4a5ff" transparent opacity={0.55} />
        </mesh>

        <mesh rotation={[Math.PI / 2.8, 0.3, 0.4]}>
          <torusGeometry args={[2.85, 0.009, 8, 160]} />
          <meshBasicMaterial color="#7c2cff" transparent opacity={0.35} />
        </mesh>

        <mesh rotation={[1.1, -0.4, 0.1]}>
          <torusGeometry args={[2.65, 0.008, 8, 160]} />
          <meshBasicMaterial color="#a970ff" transparent opacity={0.28} />
        </mesh>

        <points>
          <sphereGeometry args={[2.38, 28, 28]} />
          <pointsMaterial color="#d8c5ff" size={0.025} transparent opacity={0.65} />
        </points>
      </group>
    </Float>
  );
}

export function WireframeGlobe() {
  return (
    <div className="h-full min-h-[420px] w-full">
      <Canvas camera={{ position: [0, 0, 7], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, -3, 3]} color="#7c2cff" intensity={14} distance={10} />
        <pointLight position={[3, 2, 3]} color="#c4a5ff" intensity={6} distance={9} />
        <Globe />
      </Canvas>
    </div>
  );
}
