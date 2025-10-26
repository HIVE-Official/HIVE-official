import type { Config } from "tailwindcss";
// Use relative import to avoid module resolution issues before install
import tokensPreset from "../../packages/tokens/src/tailwind.preset";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssForms from "@tailwindcss/forms";

const config: Config = {
  darkMode: ["class"],
  presets: [tokensPreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/core/src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'gold-role': 'hsl(var(--gold) / <alpha-value>)'
      }
    }
  },
  plugins: [tailwindcssAnimate, tailwindcssForms]
};

export default config;
