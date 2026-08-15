"use client";

import { useMemo } from "react";
import * as THREE from "three";

type TechnicalNodesProps = {
  count: number;
  opacity: number;
  radius?: number;
};

export function TechnicalNodes({ count, opacity, radius = 2.2 }: TechnicalNodesProps) {
  const positions = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2;
        const depth = ((index % 5) - 2) * 0.16;

        return [
          Math.cos(angle) * (radius + (index % 3) * 0.18),
          Math.sin(angle * 1.36) * (radius * 0.42),
          depth,
        ] as [number, number, number];
      }),
    [count, radius],
  );

  return (
    <group>
      {positions.map((position, index) => (
        <mesh key={`${position.join("-")}-${index}`} position={position}>
          <sphereGeometry args={[index % 4 === 0 ? 0.035 : 0.025, 12, 8]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? "#d8b4fe" : "#8b3dff"}
            transparent
            opacity={opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
