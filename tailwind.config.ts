import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
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
        apex: {
          purple: {
            base: "var(--ds-primary)",
            hover: "var(--ds-primary-hover)",
            light: "var(--ds-primary-light)",
            glow: "var(--ds-primary-glow)",
          },
          neutral: {
            bg: "var(--ds-neutral-bg)",
            surface: "var(--ds-neutral-surface)",
            text: "var(--ds-neutral-text)",
            secondary: "var(--ds-neutral-secondary)",
            border: "var(--ds-neutral-border)",
          },
          dark: {
            bg: "var(--ds-dark-bg)",
            surface: "var(--ds-dark-surface)",
            elevated: "var(--ds-dark-elevated)",
            text: "var(--ds-dark-text)",
            secondary: "var(--ds-dark-secondary)",
            border: "var(--ds-dark-border)",
          },
          status: "var(--ds-status)",
        },
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
          footerMuted: "rgb(var(--color-footer-muted) / <alpha-value>)",
        },
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        button: "var(--shadow-button)",
        "card-shadow": "var(--ds-card-shadow)",
        "card-glow": "var(--ds-card-glow)",
      },
      fontSize: {
        display: ["var(--ds-text-display)", { lineHeight: "var(--ds-leading-display)" }],
        h1: ["var(--ds-text-h1)", { lineHeight: "var(--ds-leading-h1)" }],
        h2: ["var(--ds-text-h2)", { lineHeight: "var(--ds-leading-h2)" }],
        body: ["var(--ds-text-body)", { lineHeight: "var(--ds-leading-body)" }],
        small: ["var(--ds-text-small)", { lineHeight: "var(--ds-leading-small)" }],
      },
      fontWeight: {
        regular: "var(--ds-weight-regular)",
        semibold: "var(--ds-weight-semibold)",
        bold: "var(--ds-weight-bold)",
      },
      spacing: {
        "section-y": "var(--ds-section-padding-y)",
      },
      borderRadius: {
        brand: "0.75rem",
        pill: "99px",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};

export default config;
