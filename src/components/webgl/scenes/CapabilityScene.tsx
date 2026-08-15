"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getPerformanceTier, type PerformanceTier } from "@/lib/performanceTier";
import { getWebGLState } from "@/store/webgl-state";

type CapabilitySceneProps = {
  isPaused: boolean;
};

type CapabilityKind = "ai" | "cloud" | "automation" | "intelligence";

const capabilityRanges = [
  { start: 0, end: 0.25 },
  { start: 0.25, end: 0.5 },
  { start: 0.5, end: 0.75 },
  { start: 0.75, end: 1 },
];

function range(progress: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}

function sceneOpacity(progress: number, index: number) {
  const { start, end } = capabilityRanges[index];
  const fade = 0.045;
  const inOpacity = index === 0 ? 1 : range(progress, start - fade, start + fade);
  const outOpacity = index === capabilityRanges.length - 1 ? 1 : 1 - range(progress, end - fade, end + fade);

  return inOpacity * outOpacity;
}

function setMaterialOpacity(group: THREE.Group, opacity: number) {
  group.visible = opacity > 0.015;
  group.traverse((object) => {
    const material = (object as THREE.Object3D & {
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

function createLine(points: THREE.Vector3[], color: string, opacity = 0.3) {
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

function createNode(radius: number, color: string, opacity = 0.54) {
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

function createBox(width: number, height: number, depth: number, color: string, opacity = 0.22) {
  const material = new THREE.MeshStandardMaterial({
    color,
    transparent: true,
    opacity,
    roughness: 0.62,
    metalness: 0.1,
    depthWrite: false,
  });
  material.userData.baseOpacity = opacity;

  return new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
}

function buildAIGroup(tier: PerformanceTier) {
  const group = new THREE.Group();
  const satelliteCount = tier === "high" ? 12 : tier === "medium" ? 9 : 6;
  const central = createNode(0.13, "#d8b4fe", 0.76);
  group.add(central);

  for (let index = 0; index < satelliteCount; index += 1) {
    const angle = (index / satelliteCount) * Math.PI * 2;
    const radius = 0.8 + (index % 3) * 0.28;
    const node = createNode(index % 4 === 0 ? 0.055 : 0.038, index % 3 === 0 ? "#67e8f9" : "#8b3dff", 0.5);
    node.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.16) * 0.58, ((index % 5) - 2) * 0.12);
    group.add(node);
    group.add(createLine([new THREE.Vector3(0, 0, 0), node.position.clone()], "#b794ff", 0.22));
  }

  return group;
}

function buildCloudGroup(tier: PerformanceTier) {
  const group = new THREE.Group();
  const layerCount = tier === "low" ? 2 : 3;

  for (let index = 0; index < layerCount; index += 1) {
    const box = createBox(1.35 + index * 0.32, 0.72 + index * 0.22, 0.1, index === 1 ? "#8b3dff" : "#d8b4fe", 0.13);
    box.position.z = -index * 0.22;
    group.add(box);
  }

  for (let index = 0; index < 8; index += 1) {
    const angle = (index / 8) * Math.PI * 2;
    const node = createNode(0.035, index % 2 ? "#67e8f9" : "#8b3dff", 0.55);
    node.position.set(Math.cos(angle) * 1.2, Math.sin(angle) * 0.62, -0.18 + (index % 3) * 0.1);
    group.add(node);
  }

  group.add(createLine([new THREE.Vector3(-1.45, -0.78, 0), new THREE.Vector3(1.45, -0.78, 0)], "#67e8f9", 0.22));
  group.add(createLine([new THREE.Vector3(-1.45, 0.78, 0), new THREE.Vector3(1.45, 0.78, 0)], "#8b3dff", 0.24));

  return group;
}

function buildAutomationGroup() {
  const group = new THREE.Group();
  const points = [
    new THREE.Vector3(-1.25, -0.2, 0),
    new THREE.Vector3(-0.42, 0.36, 0.08),
    new THREE.Vector3(0.45, -0.18, 0.02),
    new THREE.Vector3(1.28, 0.22, -0.04),
  ];

  points.forEach((point, index) => {
    const node = createNode(index === 1 ? 0.075 : 0.058, index === 3 ? "#67e8f9" : "#d8b4fe", 0.62);
    node.position.copy(point);
    group.add(node);
  });

  for (let index = 0; index < points.length - 1; index += 1) {
    group.add(createLine([points[index], points[index + 1]], index === 1 ? "#67e8f9" : "#8b3dff", 0.34));
  }

  return group;
}

function buildIntelligenceGroup(tier: PerformanceTier) {
  const group = new THREE.Group();
  const points = tier === "high" ? 18 : tier === "medium" ? 12 : 8;
  const insight = createNode(0.11, "#d8b4fe", 0.72);
  insight.position.set(0.48, 0.06, 0.12);
  group.add(insight);

  let previous = new THREE.Vector3(-1.35, -0.62, 0);
  for (let index = 0; index < points; index += 1) {
    const x = -1.35 + (index / Math.max(1, points - 1)) * 2.45;
    const y = Math.sin(index * 0.75) * 0.34 + index * 0.022 - 0.16;
    const point = new THREE.Vector3(x, y, ((index % 4) - 2) * 0.06);
    const node = createNode(0.026, index % 5 === 0 ? "#67e8f9" : "#8b3dff", 0.46);
    node.position.copy(point);
    group.add(node);

    if (index > 0) {
      group.add(createLine([previous, point], "#b794ff", 0.24));
    }

    previous = point;
  }

  group.add(createBox(2.75, 0.02, 0.02, "#d8b4fe", 0.12));
  group.add(createBox(0.02, 1.4, 0.02, "#d8b4fe", 0.12));

  return group;
}

function createCapabilityGroup(kind: CapabilityKind, tier: PerformanceTier) {
  if (kind === "ai") return buildAIGroup(tier);
  if (kind === "cloud") return buildCloudGroup(tier);
  if (kind === "automation") return buildAutomationGroup();
  return buildIntelligenceGroup(tier);
}

export function CapabilityScene({ isPaused }: CapabilitySceneProps) {
  const rootRef = useRef<THREE.Group>(null);
  const groupRefs = useRef<THREE.Group[]>([]);
  const [tier, setTier] = useState<PerformanceTier>("medium");
  const groups = useMemo(
    () =>
      (["ai", "cloud", "automation", "intelligence"] as CapabilityKind[]).map((kind) =>
        createCapabilityGroup(kind, tier),
      ),
    [tier],
  );

  useEffect(() => {
    const updateTier = () => setTier(getPerformanceTier());

    updateTier();
    window.addEventListener("resize", updateTier);

    return () => window.removeEventListener("resize", updateTier);
  }, []);

  useFrame(({ clock }) => {
    if (isPaused || !rootRef.current) {
      return;
    }

    const progress = getWebGLState().capabilitiesProgress;
    const time = clock.elapsedTime;
    rootRef.current.position.set(2.15, -0.06, -0.9);
    rootRef.current.rotation.y = -0.26;

    groupRefs.current.forEach((group, index) => {
      const opacity = sceneOpacity(progress, index);
      const localProgress = range(progress, capabilityRanges[index].start, capabilityRanges[index].end);
      group.position.x = (0.5 - opacity) * 0.2;
      group.position.y = -0.02 + (index - 1.5) * 0.012;
      group.rotation.y = (index - 1.5) * 0.08 + localProgress * 0.12 + time * 0.012;
      group.rotation.z = (index % 2 ? -1 : 1) * (0.04 + localProgress * 0.035);
      group.scale.setScalar(0.94 + opacity * 0.08);
      setMaterialOpacity(group, opacity);
    });
  });

  return (
    <group ref={rootRef} scale={0.95}>
      {groups.map((group, index) => (
        <primitive
          key={index}
          object={group}
          ref={(node: THREE.Group | null) => {
            if (node) groupRefs.current[index] = node;
          }}
        />
      ))}
    </group>
  );
}
