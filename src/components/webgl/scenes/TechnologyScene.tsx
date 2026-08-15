"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getPerformanceTier, type PerformanceTier } from "@/lib/performanceTier";
import { webglTheme, type WebGLThemeName } from "@/lib/webglTheme";
import { getWebGLState } from "@/store/webgl-state";

type TechnologySceneProps = {
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

function createSpherePoints(count: number, radius: number) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / Math.max(1, count - 1)) * 2;
    const xz = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = index * Math.PI * (3 - Math.sqrt(5));

    positions[index * 3] = Math.cos(angle) * xz * radius;
    positions[index * 3 + 1] = y * radius;
    positions[index * 3 + 2] = Math.sin(angle) * xz * radius;
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

  return new THREE.Mesh(new THREE.SphereGeometry(radius, 14, 10), material);
}

function countsForTier(tier: PerformanceTier) {
  if (tier === "high") return { particles: 1100, nodes: 10, orbits: 4 };
  if (tier === "medium") return { particles: 680, nodes: 7, orbits: 3 };
  return { particles: 320, nodes: 4, orbits: 2 };
}

function buildTechnologyGlobe(tier: PerformanceTier, theme: WebGLThemeName) {
  const counts = countsForTier(tier);
  const palette = webglTheme[theme];
  const group = new THREE.Group();

  const globe = new THREE.Group();
  globe.name = "globe";

  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute("position", new THREE.BufferAttribute(createSpherePoints(counts.particles, 1.46), 3));
  const pointsMaterial = new THREE.PointsMaterial({
    color: palette.secondary,
    size: tier === "low" ? 0.017 : 0.012,
    transparent: true,
    opacity: theme === "light" ? 0.42 : 0.5,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  pointsMaterial.userData.baseOpacity = theme === "light" ? 0.42 : 0.5;
  globe.add(new THREE.Points(pointsGeometry, pointsMaterial));

  const wireMaterial = new THREE.MeshBasicMaterial({
    color: palette.primary,
    wireframe: true,
    transparent: true,
    opacity: theme === "light" ? 0.18 : 0.13,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  wireMaterial.userData.baseOpacity = theme === "light" ? 0.18 : 0.13;
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.45, 36, 22), wireMaterial));

  const haloMaterial = new THREE.MeshBasicMaterial({
    color: palette.primary,
    transparent: true,
    opacity: theme === "light" ? 0.045 : 0.07,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  });
  haloMaterial.userData.baseOpacity = theme === "light" ? 0.045 : 0.07;
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.68, 32, 18), haloMaterial));
  group.add(globe);

  const orbits = new THREE.Group();
  orbits.name = "orbits";
  for (let index = 0; index < counts.orbits; index += 1) {
    const orbit = createOrbit(1.72 + index * 0.14, 0.38 + index * 0.055, index === 1 ? palette.line : palette.primary, theme === "light" ? 0.3 - index * 0.04 : 0.24 - index * 0.035);
    orbit.rotation.set(0.78 + index * 0.14, -0.34 + index * 0.1, index * 0.48);
    orbits.add(orbit);
  }
  group.add(orbits);

  const nodes = new THREE.Group();
  nodes.name = "nodes";
  for (let index = 0; index < counts.nodes; index += 1) {
    const angle = (index / counts.nodes) * Math.PI * 2;
    const node = createNode(index % 4 === 0 ? 0.048 : 0.032, index % 3 === 0 ? palette.node : palette.primary, theme === "light" ? 0.62 : 0.55);
    node.position.set(Math.cos(angle) * 1.72, Math.sin(angle * 1.18) * 0.82, ((index % 5) - 2) * 0.14);
    nodes.add(node);
  }
  group.add(nodes);

  return group;
}

export function TechnologyScene({ isPaused, theme }: TechnologySceneProps) {
  const rootRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Group>(null);
  const [tier, setTier] = useState<PerformanceTier>("medium");
  const globeSystem = useMemo(() => buildTechnologyGlobe(tier, theme), [theme, tier]);

  useEffect(() => {
    const updateTier = () => setTier(getPerformanceTier());

    updateTier();
    window.addEventListener("resize", updateTier);

    return () => window.removeEventListener("resize", updateTier);
  }, []);

  useFrame(({ clock }) => {
    if (isPaused || !rootRef.current || !globeRef.current) return;

    const progress = getWebGLState().technologyProgress;
    const time = clock.elapsedTime;
    const globeIn = range(progress, 0, 0.28);
    const centerIn = range(progress, 0.2, 0.45);
    const orbitIn = range(progress, 0.4, 0.75);

    rootRef.current.position.set(2.48, 0.18, -1.22);
    rootRef.current.scale.setScalar((tier === "low" ? 0.66 : tier === "medium" ? 0.82 : 0.93) * (0.9 + globeIn * 0.1));
    rootRef.current.rotation.y = -0.22;

    const globe = globeRef.current.getObjectByName("globe");
    if (globe) {
      globe.rotation.y = time * 0.018 + progress * 0.42;
      globe.rotation.x = -0.08 + progress * 0.14;
      setOpacity(globe, globeIn);
    }

    const orbits = globeRef.current.getObjectByName("orbits");
    if (orbits) {
      orbits.rotation.z = time * 0.01 + progress * 0.22;
      orbits.scale.setScalar(0.96 + orbitIn * 0.05);
      setOpacity(orbits, orbitIn);
    }

    const nodes = globeRef.current.getObjectByName("nodes");
    if (nodes) {
      nodes.rotation.z = progress * 0.16 + time * 0.006;
      setOpacity(nodes, Math.max(centerIn * 0.45, orbitIn));
    }
  });

  return (
    <group ref={rootRef}>
      <primitive
        object={globeSystem}
        ref={(node: THREE.Group | null) => {
          if (node) globeRef.current = node;
        }}
      />
    </group>
  );
}
