import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is now stable in Next.js 15, no experimental flag needed
  // Tell Next.js where to find the app directory
  distDir: ".next",
  eslint: {
    // Re-enable ESLint during build
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Re-enable TypeScript checking during build
    ignoreBuildErrors: false,
  },
  // SVG handling and workspace resolution
  webpack: (config) => {
    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Resolve workspace packages using path resolution to source files
    config.resolve.alias = {
      ...config.resolve.alias,
      "@hive/core": path.resolve(__dirname, "../../packages/core/src"),
      "@hive/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@hive/hooks": path.resolve(__dirname, "../../packages/hooks/src"),
      "@hive/auth-logic": path.resolve(
        __dirname,
        "../../packages/auth-logic/src"
      ),
      "@": path.resolve(__dirname, "./src"),
    };

    // Add proper module resolution for React
    config.resolve.mainFields = ["browser", "module", "main"];

    return config;
  },
  // Ensure proper React resolution
  transpilePackages: [
    "@hive/ui",
    "@hive/core",
    "@hive/hooks",
    "@hive/auth-logic",
  ],
};

export default nextConfig;
