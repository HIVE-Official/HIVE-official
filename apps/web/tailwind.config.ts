import type { Config } from "tailwindcss";
import { designTokens } from "@hive/tokens";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: designTokens.colors,
      fontFamily: {
        sans: ["var(--font-sans)", ...designTokens.typography.fontFamily.sans],
        display: [
          "var(--font-display)",
          ...designTokens.typography.fontFamily.display,
        ],
        mono: ["var(--font-mono)", ...designTokens.typography.fontFamily.mono],
      },
      fontSize: designTokens.tailwindFontSizes,
      spacing: designTokens.spacing,
      animation: designTokens.motion,
      boxShadow: designTokens.effects,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
