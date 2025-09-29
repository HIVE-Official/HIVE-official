import type { Config } from "tailwindcss";
import masterConfig from "../../packages/tokens/tailwind.config.master";

// HIVE Web App Tailwind Config - Extends Master Configuration with Optimizations
const config: Config = {
  // Override content paths for web app specific files
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Include shared packages
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: masterConfig.darkMode as 'class' | 'media',
  theme: masterConfig.theme,
  plugins: masterConfig.plugins,
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    // Remove unused CSS in production
    corePlugins: {
      // Disable unused features to reduce CSS size
      float: false,
      clear: false,
      skew: false,
      caretColor: false,
      sepia: false,
    },
  }),
};

export default config;