"use client";

import { useMemo } from "react";
import * as THREE from "three";

type OrbitalLinesProps = {
  count?: number;
  opacity: number;
  radius?: number;
  scale?: number;
  rotationZ?: number;
};

function createEllipseGeometry(radius: number, squash: number) {
  const points: THREE.Vector3[] = [];

  for (let index = 0; index <= 160; index += 1) {
    const angle = (index / 160) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * squash, 0));
  }

  return new THREE.BufferGeometry().setFromPoints(points);
}

export function OrbitalLines({
  count = 3,
  opacity,
  radius = 1.5,
  scale = 1,
  rotationZ = 0,
}: OrbitalLinesProps) {
  const lines = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const geometry = createEllipseGeometry(radius + index * 0.26, 0.44 + index * 0.055);
        const material = new THREE.LineBasicMaterial({
          color: index === 1 ? "#d8b4fe" : "#8b3dff",
          transparent: true,
          opacity,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const line = new THREE.Line(geometry, material);
        line.rotation.z = index * 0.34;

        return line;
      }),
    [count, opacity, radius],
  );

  return (
    <group scale={scale} rotation={[0.34, -0.18, rotationZ]}>
      {lines.map((line, index) => (
        <primitive key={`${radius}-${index}`} object={line} />
      ))}
    </group>
  );
}
