"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getPerformanceTier, type PerformanceTier } from "@/lib/performanceTier";
import { getWebGLState } from "@/store/webgl-state";

type ProcessSceneProps = {
  isPaused: boolean;
};

const stageRanges = [
  { start: 0, end: 0.2 },
  { start: 0.2, end: 0.4 },
  { start: 0.4, end: 0.6 },
  { start: 0.6, end: 0.8 },
  { start: 0.8, end: 1 },
];

function range(progress: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}

function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

function activeAmount(progress: number, index: number) {
  const { start, end } = stageRanges[index];
  const edge = 0.045;
  const incoming = index === 0 ? 1 : range(progress, start - edge, start + edge);
  const outgoing = index === stageRanges.length - 1 ? 1 : 1 - range(progress, end - edge, end + edge);

  return incoming * outgoing;
}

function createLine(points: THREE.Vector3[], color: string, opacity = 0.22) {
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  material.userData.baseOpacity = opacity;

  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
}

function createEllipse(radius: number, squash: number, color: string, opacity: number) {
  const points: THREE.Vector3[] = [];

  for (let index = 0; index <= 160; index += 1) {
    const angle = (index / 160) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * squash, 0));
  }

  const line = createLine(points, color, opacity);
  line.rotation.x = 0.62;

  return line;
}

function createNode(radius: number, color: string, opacity = 0.46) {
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  material.userData.baseOpacity = opacity;

  return new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 10), material);
}

function setMaterialOpacity(object: THREE.Object3D, opacity: number) {
  object.traverse((child) => {
    const material = (child as THREE.Object3D & {
      material?: THREE.Material | THREE.Material[];
    }).material;

    if (!material) {
      return;
    }

    const materials = Array.isArray(material) ? material : [material];
    materials.forEach((item) => {
      const baseOpacity = typeof item.userData.baseOpacity === "number" ? item.userData.baseOpacity : 1;
      item.transparent = true;
      item.opacity = baseOpacity * opacity;
    });
  });
}

function buildProcessSystem(tier: PerformanceTier) {
  const group = new THREE.Group();
  const centralMaterial = new THREE.MeshStandardMaterial({
    color: "#8b3dff",
    transparent: true,
    opacity: 0.26,
    roughness: 0.58,
    metalness: 0.12,
    depthWrite: false,
  });
  centralMaterial.userData.baseOpacity = 0.26;
  const central = new THREE.Mesh(new THREE.IcosahedronGeometry(0.46, tier === "high" ? 1 : 0), centralMaterial);
  central.name = "central";
  group.add(central);

  const ringCount = tier === "low" ? 3 : tier === "medium" ? 4 : 5;
  for (let index = 0; index < ringCount; index += 1) {
    const ring = createEllipse(1.05 + index * 0.24, 0.48 + index * 0.045, index % 2 ? "#d8b4fe" : "#8b3dff", 0.18);
    ring.name = `ring-${index}`;
    ring.rotation.z = index * 0.42;
    group.add(ring);
  }

  const stageNodes = new THREE.Group();
  stageNodes.name = "stage-nodes";
  for (let index = 0; index < 5; index += 1) {
    const angle = -Math.PI * 0.58 + index * (Math.PI * 1.16) / 4;
    const node = createNode(0.06, "#d8b4fe", 0.5);
    node.name = `stage-node-${index}`;
    node.position.set(Math.cos(angle) * 1.62, Math.sin(angle) * 0.84, 0.08);
    stageNodes.add(node);
    group.add(createLine([new THREE.Vector3(0, 0, 0), node.position.clone()], "#8b3dff", 0.13));
  }
  group.add(stageNodes);

  const supportCount = tier === "high" ? 28 : tier === "medium" ? 18 : 9;
  const supportNodes = new THREE.Group();
  supportNodes.name = "support-nodes";
  for (let index = 0; index < supportCount; index += 1) {
    const angle = (index / supportCount) * Math.PI * 2;
    const node = createNode(0.022, index % 6 === 0 ? "#67e8f9" : "#8b3dff", 0.32);
    node.position.set(Math.cos(angle) * (1.18 + (index % 4) * 0.16), Math.sin(angle * 1.15) * 0.66, ((index % 5) - 2) * 0.08);
    supportNodes.add(node);
  }
  group.add(supportNodes);

  return group;
}

export function ProcessScene({ isPaused }: ProcessSceneProps) {
  const rootRef = useRef<THREE.Group>(null);
  const systemRef = useRef<THREE.Group>(null);
  const [tier, setTier] = useState<PerformanceTier>("medium");
  const system = useMemo(() => buildProcessSystem(tier), [tier]);

  useEffect(() => {
    const updateTier = () => setTier(getPerformanceTier());

    updateTier();
    window.addEventListener("resize", updateTier);

    return () => window.removeEventListener("resize", updateTier);
  }, []);

  useFrame(({ clock }) => {
    if (isPaused || !rootRef.current || !systemRef.current) {
      return;
    }

    const progress = getWebGLState().processProgress;
    const currentStage = Math.min(4, Math.floor(progress / 0.2));
    const stageBlend = smooth(range(progress, stageRanges[currentStage].start, stageRanges[currentStage].end));
    const time = clock.elapsedTime;

    rootRef.current.position.set(2.12, -0.02, -0.95);
    rootRef.current.rotation.y = -0.32 + progress * 0.18;
    rootRef.current.scale.setScalar(0.96 + progress * 0.08);

    const central = systemRef.current.getObjectByName("central");
    if (central) {
      central.scale.setScalar(0.82 + progress * 0.34 + stageBlend * 0.04);
      central.rotation.x = progress * 1.4;
      central.rotation.y = time * 0.05 + progress * 1.2;
    }

    systemRef.current.children.forEach((child) => {
      if (child.name.startsWith("ring-")) {
        const index = Number(child.name.replace("ring-", ""));
        child.rotation.z = index * 0.42 + progress * (0.28 + index * 0.08) + time * 0.012;
        child.scale.setScalar(0.92 + progress * 0.16 + index * 0.012);
      }
    });

    setMaterialOpacity(systemRef.current, 0.72 + progress * 0.28);

    const supportNodes = systemRef.current.getObjectByName("support-nodes") as THREE.Group | undefined;
    if (supportNodes) {
      supportNodes.rotation.z = time * 0.018 + progress * 0.42;
      supportNodes.scale.setScalar(0.86 + progress * 0.18);
      setMaterialOpacity(supportNodes, 0.45 + progress * 0.72);
    }

    const stageNodes = systemRef.current.getObjectByName("stage-nodes") as THREE.Group | undefined;
    stageNodes?.children.forEach((node, index) => {
      const active = activeAmount(progress, index);
      node.scale.setScalar(0.9 + active * 0.7 + progress * 0.08);
      setMaterialOpacity(node, 0.45 + active * 1.35);
    });
  });

  return (
    <group ref={rootRef}>
      <primitive
        object={system}
        ref={(node: THREE.Group | null) => {
          if (node) systemRef.current = node;
        }}
      />
    </group>
  );
}
