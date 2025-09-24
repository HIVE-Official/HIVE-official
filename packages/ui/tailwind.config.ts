import type { Config } from "tailwindcss";
import masterConfig from "../tokens/tailwind.config.master";

// HIVE UI Package Tailwind Config - Extends Master Configuration
const config: Config = {
  ...masterConfig,

  // Override content paths for UI package specific files
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    ...masterConfig.theme,
    extend: {
      ...masterConfig.theme?.extend,

      // UI package specific theme extensions
      // (Keep minimal - most should be in master config)
    },
  },
};

export default config;