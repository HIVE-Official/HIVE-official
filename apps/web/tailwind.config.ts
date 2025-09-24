import type { Config } from "tailwindcss";
import masterConfig from "../../packages/tokens/tailwind.config.master";

// HIVE Web App Tailwind Config - Extends Master Configuration
const config: Config = {
  ...masterConfig,

  // Override content paths for web app specific files
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Include shared packages
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    ...masterConfig.theme,
    extend: {
      ...masterConfig.theme?.extend,

      // Web app specific theme extensions can go here
      // (Keep minimal - most should be in master config)
    },
  },
};

export default config;