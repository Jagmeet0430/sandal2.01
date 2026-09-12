"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import type { WebGLRenderer } from "three";
import type { WebGLThemeName } from "@/lib/webglTheme";
import { detectWebGLSupport, type WebGLSupportResult } from "@/lib/webglSupport";
import { SceneController } from "@/components/webgl/SceneController";
import { WebGLFallback } from "@/components/webgl/WebGLFallback";
import { getActiveWebGLScene, subscribeWebGLScene } from "@/store/webgl-state";

function usePageVisibility() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsHidden(document.hidden);
    };

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  return isHidden;
}

function ContextLossHandlers({
  onContextLost,
  onContextRestored,
}: {
  onContextLost: () => void;
  onContextRestored: () => void;
}) {
  const gl = useThree((threeState) => threeState.gl);

  useEffect(() => {
    const canvas = gl.domElement;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      onContextLost();
    };

    const handleContextRestored = () => {
      onContextRestored();
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, [gl, onContextLost, onContextRestored]);

  return null;
}

export function GlobalWebGLCanvas() {
  const [support, setSupport] = useState<WebGLSupportResult | null>(null);
  const [contextLost, setContextLost] = useState(false);
  const { resolvedTheme } = useTheme();
  const isHidden = usePageVisibility();
  const activeScene = useSyncExternalStore(
    subscribeWebGLScene,
    getActiveWebGLScene,
    () => "none",
  );
  const theme: WebGLThemeName = resolvedTheme === "light" ? "light" : "dark";
  const shouldRender = !isHidden && activeScene !== "none";

  useEffect(() => {
    setSupport(detectWebGLSupport());
  }, []);

  useEffect(() => {
    if (!support?.supported || contextLost) {
      document.body.removeAttribute("data-webgl-ready");
      return;
    }

    document.body.setAttribute("data-webgl-ready", "true");

    return () => {
      document.body.removeAttribute("data-webgl-ready");
    };
  }, [contextLost, support?.supported]);

  if (!support) {
    return null;
  }

  if (!support.supported || contextLost) {
    return <WebGLFallback />;
  }

  return (
    <div
      aria-hidden="true"
      data-webgl-ready="true"
      className="pointer-events-none fixed inset-0 z-10"
    >
      <Canvas
        camera={{ fov: 42, position: [0, 0, 7.2], near: 0.1, far: 80 }}
        dpr={[1, 1.5]}
        frameloop={shouldRender ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }: { gl: WebGLRenderer }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ContextLossHandlers
          onContextLost={() => setContextLost(true)}
          onContextRestored={() => setContextLost(false)}
        />
        <SceneController isPaused={isHidden} theme={theme} />
      </Canvas>
    </div>
  );
}
