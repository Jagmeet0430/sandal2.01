export type WebGLSupportResult = {
  supported: boolean;
  webgl2: boolean;
  reason?: string;
};

export function detectWebGLSupport(): WebGLSupportResult {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return {
      supported: false,
      webgl2: false,
      reason: "client-unavailable",
    };
  }

  try {
    const canvas = document.createElement("canvas");
    const webgl2 = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    }) as WebGL2RenderingContext | null;
    const webgl =
      webgl2 ??
      (canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }) as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl", {
        alpha: true,
        antialias: true,
      }) as WebGLRenderingContext | null);

    if (!webgl) {
      return {
        supported: false,
        webgl2: false,
        reason: "context-unavailable",
      };
    }

    const loseContext = webgl.getExtension("WEBGL_lose_context");
    loseContext?.loseContext();

    return {
      supported: true,
      webgl2: Boolean(webgl2),
    };
  } catch (error) {
    return {
      supported: false,
      webgl2: false,
      reason: error instanceof Error ? error.message : "renderer-creation-failed",
    };
  }
}
