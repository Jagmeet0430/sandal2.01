"use client";

import { useSyncExternalStore } from "react";
import { SceneLights } from "@/components/webgl/objects/SceneLights";
import { HeroScene } from "@/components/webgl/scenes/HeroScene";
import { CapabilityScene } from "@/components/webgl/scenes/CapabilityScene";
import { ImpactScene } from "@/components/webgl/scenes/ImpactScene";
import { ProcessScene } from "@/components/webgl/scenes/ProcessScene";
import { TechnologyScene } from "@/components/webgl/scenes/TechnologyScene";
import { getActiveWebGLScene, subscribeWebGLScene } from "@/store/webgl-state";
import type { WebGLThemeName } from "@/lib/webglTheme";

type SceneControllerProps = {
  isPaused: boolean;
  theme: WebGLThemeName;
};

export function SceneController({ isPaused, theme }: SceneControllerProps) {
  const activeScene = useSyncExternalStore(
    subscribeWebGLScene,
    getActiveWebGLScene,
    () => "none",
  );

  return (
    <>
      <SceneLights />
      {activeScene === "hero" ? <HeroScene isPaused={isPaused} /> : null}
      {activeScene === "capabilities" ? <CapabilityScene isPaused={isPaused} /> : null}
      {activeScene === "process" ? <ProcessScene isPaused={isPaused} /> : null}
      {activeScene === "technology" ? <TechnologyScene isPaused={isPaused} theme={theme} /> : null}
      {activeScene === "impact" ? <ImpactScene isPaused={isPaused} theme={theme} /> : null}
    </>
  );
}
