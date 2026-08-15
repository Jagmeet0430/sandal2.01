"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { getPerformanceTier, type PerformanceTier } from "@/lib/performanceTier";
import { OrbitalLines } from "@/components/webgl/objects/OrbitalLines";
import { TechnicalNodes } from "@/components/webgl/objects/TechnicalNodes";
import { getWebGLState } from "@/store/webgl-state";

type HeroSceneProps = {
  isPaused: boolean;
};

function range(progress: number, start: number, end: number) {
  const span = end - start;

  if (span <= 0) {
    return 0;
  }

  return Math.min(1, Math.max(0, (progress - start) / span));
}

function fadeInOut(progress: number, inStart: number, inEnd: number, outStart: number, outEnd: number) {
  return range(progress, inStart, inEnd) * (1 - range(progress, outStart, outEnd));
}

function setGroupOpacity(group: THREE.Group, opacity: number) {
  group.traverse((object) => {
    const material = (object as THREE.Object3D & {
      material?: THREE.Material | THREE.Material[];
    }).material;

    if (!material) {
      return;
    }

    const materials = Array.isArray(material) ? material : [material];
    materials.forEach((item) => {
      item.transparent = true;
      item.opacity = opacity;
    });
  });
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

export function HeroScene({ isPaused }: HeroSceneProps) {
  const rootRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const depthRef = useRef<THREE.Group>(null);
  const [tier, setTier] = useState<PerformanceTier>("medium");
  const reducedMotion = useReducedMotion();
  const config = useMemo(() => {
    if (tier === "high") {
      return { nodes: 22, orbitLines: 4 };
    }

    if (tier === "medium") {
      return { nodes: 14, orbitLines: 3 };
    }

    return { nodes: 8, orbitLines: 2 };
  }, [tier]);

  useEffect(() => {
    const updateTier = () => {
      setTier(getPerformanceTier());
    };

    updateTier();
    window.addEventListener("resize", updateTier);

    return () => {
      window.removeEventListener("resize", updateTier);
    };
  }, []);

  useFrame(({ clock }) => {
    if (isPaused) {
      return;
    }

    const progress = getWebGLState().heroProgress;
    const time = reducedMotion ? 0 : clock.elapsedTime;
    const fadeAway = 1 - range(progress, 0.67, 0.92);
    const atmosphericOpacity = fadeInOut(progress, 0, 0.18, 0.38, 0.58) * 0.08 * fadeAway;
    const orbitOpacity = fadeInOut(progress, 0.2, 0.5, 0.67, 0.86) * 0.13;
    const depthOpacity = 0;

    if (rootRef.current) {
      rootRef.current.position.y = -0.16 + progress * 0.24;
      rootRef.current.rotation.z = Math.sin(time * 0.08) * 0.035 + progress * 0.05;
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.visible = atmosphericOpacity > 0.01;
      atmosphereRef.current.position.set(0, -2.88 + progress * 0.12, -2.4);
      atmosphereRef.current.scale.setScalar(1.3);
      setGroupOpacity(atmosphereRef.current, atmosphericOpacity);
    }

    if (orbitRef.current) {
      orbitRef.current.visible = orbitOpacity > 0.01;
      orbitRef.current.position.set(3.55, 1.78, -1.35);
      orbitRef.current.rotation.z = -0.1 + progress * 0.16 + time * 0.01;
      orbitRef.current.scale.setScalar(0.62 + progress * 0.06);
      setGroupOpacity(orbitRef.current, orbitOpacity);
    }

    if (depthRef.current) {
      depthRef.current.visible = depthOpacity > 0.01;
      depthRef.current.position.set(1.8, -0.25, -0.2);
      depthRef.current.rotation.y = -0.28 + progress * 0.35 + time * 0.04;
      depthRef.current.rotation.z = 0.18;
      depthRef.current.scale.setScalar(0.86 + progress * 0.2);
      setGroupOpacity(depthRef.current, depthOpacity);
    }
  });

  return (
    <group ref={rootRef}>
      <group ref={atmosphereRef}>
        <TechnicalNodes count={Math.max(3, Math.round(config.nodes * 0.25))} opacity={0.06} radius={1.9} />
      </group>

      <group ref={orbitRef}>
        <OrbitalLines count={Math.max(2, config.orbitLines - 1)} opacity={0.09} radius={1.48} scale={1.1} rotationZ={0.08} />
      </group>

      <group ref={depthRef}>
        <OrbitalLines count={1} opacity={0.04} radius={1.32} scale={0.78} rotationZ={0.18} />
      </group>
    </group>
  );
}
