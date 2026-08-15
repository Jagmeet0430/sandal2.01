"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function HeroObject() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const accentNodes = useMemo(
    () => [
      [-0.9, 0.68, 0.28],
      [0.82, -0.42, 0.14],
      [0.52, 0.78, -0.24],
      [-0.42, -0.74, 0.36],
    ] as const,
    [],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const time = clock.elapsedTime;
    const targetX = THREE.MathUtils.clamp(pointer.y * 0.17, -0.17, 0.17);
    const targetY = THREE.MathUtils.clamp(pointer.x * 0.17, -0.17, 0.17);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.045);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, time * 0.13 + targetY, 0.035);
    groupRef.current.rotation.z = Math.sin(time * 0.24) * 0.045;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.46, 2]} />
        <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.32} />
      </mesh>
      <mesh rotation={[0.45, -0.35, 0.2]}>
        <torusGeometry args={[1.75, 0.004, 8, 96]} />
        <meshBasicMaterial color="#C4A7FF" transparent opacity={0.34} />
      </mesh>
      <mesh rotation={[1.05, 0.25, -0.45]}>
        <torusGeometry args={[1.96, 0.003, 8, 96]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.24} />
      </mesh>
      {accentNodes.map(([x, y, z], index) => (
        <mesh key={`${x}-${y}-${z}`} position={[x, y, z]}>
          <sphereGeometry args={[index === 0 ? 0.045 : 0.032, 12, 8]} />
          <meshBasicMaterial color={index === 1 ? "#67E8F9" : "#D8B4FE"} transparent opacity={0.68} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroThreeCenterpiece() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <HeroObject />
    </Canvas>
  );
}
