import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      colors: {
        brand: {
          background: "rgb(var(--color-background) / <alpha-value>)",
          surface: "rgb(var(--color-surface) / <alpha-value>)",
          elevated: "rgb(var(--color-elevated) / <alpha-value>)",
          navy: "rgb(var(--color-navy) / <alpha-value>)",
          muted: "rgb(var(--color-muted) / <alpha-value>)",
          border: "rgb(var(--color-border) / <alpha-value>)",
          primary: "rgb(var(--color-primary) / <alpha-value>)",
          primaryDark: "rgb(var(--color-primary-dark) / <alpha-value>)",
          sky: "rgb(var(--color-sky) / <alpha-value>)",
        },
      },
      boxShadow: {
        soft: "0 18px 60px rgb(15 47 86 / 0.08)",
        button: "0 14px 30px rgb(0 102 255 / 0.18)",
      },
      borderRadius: {
        brand: "0.75rem",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
