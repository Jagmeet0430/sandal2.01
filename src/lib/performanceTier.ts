export type PerformanceTier = "high" | "medium" | "low";

export function getPerformanceTier(): PerformanceTier {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return "medium";
  }

  const width = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;
  const cores = navigator.hardwareConcurrency || 4;
  const isMobile =
    width < 768 ||
    /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile || width < 640 || cores <= 4 || dpr > 2.25) {
    return "low";
  }

  if (width < 1180 || cores <= 6 || dpr > 1.75) {
    return "medium";
  }

  return "high";
}
