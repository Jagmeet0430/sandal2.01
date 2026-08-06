"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="h-10 w-[74px] rounded-full border border-white/10 bg-white/5"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        relative flex h-10 w-[74px] shrink-0 items-center
        rounded-full border border-black/10
        bg-black/5 p-1
        transition duration-300
        focus-visible:outline-none
        focus-visible:ring-4
        focus-visible:ring-purple-500/20
        dark:border-white/10
        dark:bg-white/[0.06]
      "
    >
      <span className="sr-only">
        {isDark ? "Use light mode" : "Use dark mode"}
      </span>

      <span
        className={[
          "absolute grid size-8 place-items-center rounded-full",
          "shadow-[0_8px_25px_rgba(0,0,0,0.25)]",
          "transition-all duration-300",
          isDark
            ? "translate-x-8 bg-purple-600 text-white"
            : "translate-x-0 bg-white text-amber-500",
        ].join(" ")}
      >
        {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </span>

      <Sun
        className={[
          "ml-1 size-4 transition",
          isDark ? "text-white/25" : "text-amber-500",
        ].join(" ")}
      />

      <Moon
        className={[
          "ml-auto mr-1 size-4 transition",
          isDark ? "text-purple-300" : "text-slate-400",
        ].join(" ")}
      />
    </button>
  );
}
