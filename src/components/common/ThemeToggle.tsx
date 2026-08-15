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
        className="h-10 w-[116px] shrink-0 rounded-full border border-[var(--border-color)] bg-[var(--surface)]"
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
        group relative flex h-10 w-[116px] shrink-0 items-center
        rounded-full border border-[var(--border-color)]
        bg-[var(--surface)] p-1
        text-[var(--text-primary)]
        shadow-[0_12px_32px_var(--shadow-color)]
        transition-[background-color,border-color,color,box-shadow]
        duration-200
        ease-out
        focus-visible:outline-none
        focus-visible:ring-4
        focus-visible:ring-purple-500/20
      "
    >
      <span className="sr-only">
        {isDark ? "Use light mode" : "Use dark mode"}
      </span>

      <span
        className={[
          "absolute left-1 grid size-8 place-items-center rounded-full",
          "shadow-[0_8px_25px_rgba(0,0,0,0.22)]",
          "transition-[transform,background-color,color] duration-200 ease-out",
          isDark
            ? "translate-x-[74px] bg-purple-600 text-white"
            : "translate-x-0 bg-white text-amber-500",
        ].join(" ")}
      >
        {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </span>

      <span className="ml-9 mr-8 flex-1 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-secondary)] transition-colors duration-200 ease-out group-hover:text-[var(--text-primary)]">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
