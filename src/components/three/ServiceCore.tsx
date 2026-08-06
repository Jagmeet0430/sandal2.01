"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";

type ServiceCoreProps = {
  activeIndex: number;
};

function CoreObject({ activeIndex }: ServiceCoreProps) {
  const groupRef = useRef<Group>(null);
  const innerRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !innerRef.current) return;

    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;

    innerRef.current.rotation.x += delta * 0.18;
    innerRef.current.rotation.z += delta * 0.12;
  });

  const colors = ["#8A2BFF", "#A970FF", "#5B16C9", "#B18CFF"];
  const activeColor = colors[activeIndex] ?? colors[0];

  return (
    <Float speed={1.1} floatIntensity={0.35} rotationIntensity={0.08}>
      <group ref={groupRef}>
        <mesh>
          <icosahedronGeometry args={[2.1, 4]} />
          <meshStandardMaterial
            color="#08050f"
            metalness={0.65}
            roughness={0.28}
            emissive={activeColor}
            emissiveIntensity={0.38}
          />
        </mesh>

        <mesh scale={1.08}>
          <icosahedronGeometry args={[2.1, 2]} />
          <meshBasicMaterial color={activeColor} wireframe transparent opacity={0.2} />
        </mesh>

        <mesh ref={innerRef} scale={0.58}>
          <octahedronGeometry args={[2, 1]} />
          <meshStandardMaterial
            color={activeColor}
            metalness={0.45}
            roughness={0.15}
            emissive={activeColor}
            emissiveIntensity={0.8}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.8, 0.014, 8, 160]} />
          <meshBasicMaterial color={activeColor} transparent opacity={0.55} />
        </mesh>

        <mesh rotation={[1.2, 0.6, 0.2]}>
          <torusGeometry args={[3.15, 0.01, 8, 160]} />
          <meshBasicMaterial color="#D7C2FF" transparent opacity={0.28} />
        </mesh>
      </group>
    </Float>
  );
}

export function ServiceCore({ activeIndex }: ServiceCoreProps) {
  return (
    <div className="h-full min-h-[420px] w-full">
      <Canvas camera={{ position: [0, 0.2, 7.5], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.28} />
        <directionalLight position={[4, 5, 4]} intensity={1.1} color="#E8DEFF" />
        <pointLight position={[0, -3, 3]} intensity={20} color="#7C2CFF" distance={10} />
        <pointLight position={[-4, 2, 2]} intensity={7} color="#A970FF" distance={9} />
        <Sparkles count={45} scale={8} size={1.6} speed={0.22} color="#CBB5FF" />
        <CoreObject activeIndex={activeIndex} />
      </Canvas>
    </div>
  );
}
