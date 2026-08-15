export function WebGLFallback() {
  return (
    <div
      aria-hidden="true"
      data-webgl-fallback
      className="pointer-events-none fixed inset-0 z-10 opacity-0"
    />
  );
}
