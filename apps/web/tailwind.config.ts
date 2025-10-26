// Bounded Context Owner: Identity & Access Management Guild
import type { Config } from "tailwindcss";
import tokensPreset from "@hive/tokens/tailwind";
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
        // Map brand gold role to CSS variable for Tailwind utilities (e.g., from-gold-role/20)
        'gold-role': 'hsl(var(--gold) / <alpha-value>)',
      },
    }
  },
  plugins: [tailwindcssAnimate, tailwindcssForms]
};

export default config;
