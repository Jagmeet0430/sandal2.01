"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const HeroPlanet = dynamic(
  () => import("@/components/three/HeroPlanet").then((module) => module.HeroPlanet),
  {
    ssr: false,
    loading: () => null,
  },
);

export function GlobalBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        "transition-colors duration-500",
        isDark ? "bg-[#050508]" : "bg-[#f5f3fa]",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 transition-opacity duration-500",
          isDark
            ? "bg-[radial-gradient(circle_at_50%_65%,rgba(124,44,255,0.24),transparent_38%)]"
            : "bg-[radial-gradient(circle_at_50%_65%,rgba(113,53,220,0.16),transparent_42%)]",
        ].join(" ")}
      />

      <div
        className={[
          "absolute inset-0 transition-opacity duration-500",
          isDark
            ? "opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]"
            : "opacity-[0.35] [background-image:linear-gradient(rgba(36,25,55,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(36,25,55,0.09)_1px,transparent_1px)]",
          "[background-size:75px_75px]",
        ].join(" ")}
      />

      <div
        className={[
          "absolute inset-0 transition-opacity duration-500",
          isDark ? "opacity-100" : "opacity-40",
        ].join(" ")}
      >
        <HeroPlanet lightMode={!isDark} />
      </div>

      <div
        className={[
          "absolute bottom-[-160px] left-1/2 h-[420px] w-[900px]",
          "-translate-x-1/2 rounded-[50%] blur-[110px]",
          "transition-colors duration-500",
          isDark ? "bg-purple-600/25" : "bg-purple-400/15",
        ].join(" ")}
      />

      <div
        className={[
          "absolute inset-0 transition-colors duration-500",
          isDark
            ? "bg-gradient-to-b from-black/10 via-transparent to-black/40"
            : "bg-gradient-to-b from-white/10 via-transparent to-white/40",
        ].join(" ")}
      />
    </div>
  );
}
