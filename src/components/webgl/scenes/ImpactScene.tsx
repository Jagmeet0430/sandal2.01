"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getPerformanceTier, type PerformanceTier } from "@/lib/performanceTier";
import { webglTheme, type WebGLThemeName } from "@/lib/webglTheme";
import { getWebGLState } from "@/store/webgl-state";

type ImpactSceneProps = {
  isPaused: boolean;
  theme: WebGLThemeName;
};

function range(progress: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}

function setOpacity(object: THREE.Object3D, opacity: number) {
  object.traverse((child) => {
    const material = (child as THREE.Object3D & {
      material?: THREE.Material | THREE.Material[];
    }).material;

    if (!material) return;

    const materials = Array.isArray(material) ? material : [material];
    materials.forEach((item) => {
      const baseOpacity = typeof item.userData.baseOpacity === "number" ? item.userData.baseOpacity : 1;
      item.transparent = true;
      item.opacity = baseOpacity * opacity;
    });
  });
}

function createSphereParticles(count: number, radius: number) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / Math.max(1, count - 1)) * 2;
    const horizontalRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = index * Math.PI * (3 - Math.sqrt(5));

    positions[index * 3] = Math.cos(angle) * horizontalRadius * radius;
    positions[index * 3 + 1] = y * radius;
    positions[index * 3 + 2] = Math.sin(angle) * horizontalRadius * radius;
  }

  return positions;
}

function createOrbit(radius: number, squash: number, color: string, opacity: number) {
  const points: THREE.Vector3[] = [];

  for (let index = 0; index <= 180; index += 1) {
    const angle = (index / 180) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * squash, 0));
  }

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

function createNode(radius: number, color: string, opacity: number) {
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

function particleCountForTier(tier: PerformanceTier) {
  if (tier === "high") return 1800;
  if (tier === "medium") return 900;
  return 360;
}

function nodeCountForTier(tier: PerformanceTier) {
  if (tier === "high") return 12;
  if (tier === "medium") return 8;
  return 5;
}

function buildImpactSphere(tier: PerformanceTier, theme: WebGLThemeName) {
  const palette = webglTheme[theme];
  const group = new THREE.Group();
  const sphere = new THREE.Group();
  sphere.name = "sphere";
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(createSphereParticles(particleCountForTier(tier), 1.52), 3),
  );
  const particleMaterial = new THREE.PointsMaterial({
    color: palette.secondary,
    size: tier === "low" ? 0.018 : 0.014,
    transparent: true,
    opacity: theme === "light" ? 0.38 : 0.5,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  particleMaterial.userData.baseOpacity = theme === "light" ? 0.38 : 0.5;
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  sphere.add(particles);

  const wireMaterial = new THREE.MeshBasicMaterial({
    color: palette.primary,
    wireframe: true,
    transparent: true,
    opacity: theme === "light" ? 0.16 : 0.115,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  wireMaterial.userData.baseOpacity = theme === "light" ? 0.16 : 0.115;
  sphere.add(new THREE.Mesh(new THREE.SphereGeometry(1.5, 36, 20), wireMaterial));

  const haloMaterial = new THREE.MeshBasicMaterial({
    color: palette.primary,
    transparent: true,
    opacity: theme === "light" ? 0.04 : 0.06,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  });
  haloMaterial.userData.baseOpacity = theme === "light" ? 0.04 : 0.06;
  sphere.add(new THREE.Mesh(new THREE.SphereGeometry(1.72, 32, 18), haloMaterial));
  group.add(sphere);

  const orbits = new THREE.Group();
  orbits.name = "orbits";
  const orbitCount = tier === "low" ? 3 : 4;
  for (let index = 0; index < orbitCount; index += 1) {
    const orbit = createOrbit(1.78 + index * 0.14, 0.38 + index * 0.045, index === 1 ? palette.line : palette.primary, theme === "light" ? 0.28 - index * 0.035 : 0.23 - index * 0.03);
    orbit.rotation.set(0.82 + index * 0.18, -0.3 + index * 0.14, index * 0.46);
    orbits.add(orbit);
  }
  group.add(orbits);

  const nodes = new THREE.Group();
  nodes.name = "nodes";
  const nodeCount = nodeCountForTier(tier);
  for (let index = 0; index < nodeCount; index += 1) {
    const angle = (index / nodeCount) * Math.PI * 2;
    const node = createNode(index % 4 === 0 ? 0.048 : 0.032, index % 3 === 0 ? "#67e8f9" : palette.node, theme === "light" ? 0.52 : 0.58);
    node.position.set(Math.cos(angle) * 1.88, Math.sin(angle * 1.18) * 0.88, ((index % 5) - 2) * 0.16);
    nodes.add(node);
  }
  group.add(nodes);

  return group;
}

export function ImpactScene({ isPaused, theme }: ImpactSceneProps) {
  const rootRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Group>(null);
  const [tier, setTier] = useState<PerformanceTier>("medium");
  const impactSystem = useMemo(() => buildImpactSphere(tier, theme), [theme, tier]);

  useEffect(() => {
    const updateTier = () => setTier(getPerformanceTier());

    updateTier();
    window.addEventListener("resize", updateTier);

    return () => window.removeEventListener("resize", updateTier);
  }, []);

  useFrame(({ clock }) => {
    if (isPaused || !rootRef.current || !sphereRef.current) return;

    const progress = getWebGLState().impactProgress;
    const time = clock.elapsedTime;
    const entrance = range(progress, 0, 0.18);
    const rings = range(progress, 0.15, 0.38);
    const intensity = range(progress, 0.35, 0.68);
    const complete = range(progress, 0.65, 0.86);

    rootRef.current.position.set(0, -0.1 + progress * -0.06, -1.18);
    rootRef.current.scale.setScalar((tier === "low" ? 0.8 : tier === "medium" ? 0.9 : 1) * (0.86 + entrance * 0.16 + complete * 0.04));
    rootRef.current.rotation.y = -0.08 + progress * 0.16;

    const sphere = sphereRef.current.getObjectByName("sphere");
    if (sphere) {
      sphere.rotation.y = time * 0.018 + progress * 0.72;
      sphere.rotation.x = -0.08 + progress * 0.24;
      setOpacity(sphere, entrance * (0.68 + intensity * 0.28));
    }

    const orbits = sphereRef.current.getObjectByName("orbits");
    if (orbits) {
      orbits.rotation.z = time * 0.012 + progress * 0.32;
      orbits.scale.setScalar(0.94 + rings * 0.08 + complete * 0.04);
      setOpacity(orbits, rings * (0.62 + complete * 0.2));
    }

    const nodes = sphereRef.current.getObjectByName("nodes");
    if (nodes) {
      nodes.rotation.z = progress * 0.22 + time * 0.01;
      nodes.scale.setScalar(0.92 + intensity * 0.12);
      setOpacity(nodes, intensity * 0.82);
    }
  });

  return (
    <group ref={rootRef}>
      <primitive
        object={impactSystem}
        ref={(node: THREE.Group | null) => {
          if (node) sphereRef.current = node;
        }}
      />
    </group>
  );
}
