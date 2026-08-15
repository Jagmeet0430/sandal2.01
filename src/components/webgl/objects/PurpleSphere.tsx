"use client";

import * as THREE from "three";

type PurpleSphereProps = {
  opacity?: number;
  scale?: number;
  position?: [number, number, number];
};

export function PurpleSphere({ opacity = 0.16, scale = 1, position = [0, 0, 0] }: PurpleSphereProps) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 24]} />
      <meshBasicMaterial
        color="#8b3dff"
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
