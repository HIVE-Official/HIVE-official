import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import preset from "@hive/config/tailwind/preset.js"

const config = {
  presets: [preset],
  darkMode: ["class", "[data-mode='dark']"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  plugins: [tailwindcssAnimate],
} satisfies Config

export default config