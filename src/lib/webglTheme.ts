export type WebGLThemeName = "light" | "dark";

export const webglTheme = {
  light: {
    primary: "#7C3AED",
    secondary: "#A855F7",
    line: "#7B6F8C",
    node: "#8B5CF6",
    surface: "#F3F0F8",
  },
  dark: {
    primary: "#A855F7",
    secondary: "#7C3AED",
    line: "#BCA7D8",
    node: "#C084FC",
    surface: "#0E0C14",
  },
} satisfies Record<WebGLThemeName, Record<string, string>>;
