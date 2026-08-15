export type WebGLSceneName = "none" | "hero" | "capabilities" | "process" | "technology" | "impact";

export type WebGLProgressKey =
  | "heroProgress"
  | "capabilitiesProgress"
  | "processProgress"
  | "technologyProgress"
  | "impactProgress";

export type WebGLState = {
  activeScene: WebGLSceneName;
  heroProgress: number;
  capabilitiesProgress: number;
  processProgress: number;
  technologyProgress: number;
  impactProgress: number;
};

const state: WebGLState = {
  activeScene: "none",
  heroProgress: 0,
  capabilitiesProgress: 0,
  processProgress: 0,
  technologyProgress: 0,
  impactProgress: 0,
};

const listeners = new Set<() => void>();

function clampProgress(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(1, Math.max(0, value));
}

function emitSceneChange() {
  listeners.forEach((listener) => listener());
}

export function getWebGLState() {
  return state;
}

export function getActiveWebGLScene() {
  return state.activeScene;
}

export function subscribeWebGLScene(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function setWebGLActiveScene(activeScene: WebGLSceneName) {
  if (state.activeScene === activeScene) {
    return;
  }

  state.activeScene = activeScene;
  emitSceneChange();
}

export function setWebGLProgress(key: WebGLProgressKey, value: number) {
  state[key] = clampProgress(value);
}

export function resetWebGLScene(scene: WebGLSceneName) {
  if (state.activeScene === scene) {
    setWebGLActiveScene("none");
  }
}
