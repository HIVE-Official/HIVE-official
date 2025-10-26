import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    externalDir: true
  },
  env: {
    NEXT_PUBLIC_AUTH_MODE: "sandbox",
    NEXT_PUBLIC_ONBOARDING_DM: "false",
    NEXT_PUBLIC_ONBOARDING_PICK_SPACES: "false"
  },
  webpack: (config) => {
    const webSrc = path.resolve(__dirname, "../web/src");
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@": path.resolve(__dirname, "../../packages/ui/src"),
      "@web": webSrc,
      "@hive/ui": path.resolve(__dirname, "../../packages/ui/src/index.ts"),
      "@hive/ui/src": path.resolve(__dirname, "../../packages/ui/src"),
      "@hive/ui/styles.css": path.resolve(__dirname, "../../packages/ui/styles.css"),
      "@hive/tokens": path.resolve(__dirname, "../../packages/tokens/src/tokens.ts"),
      "@hive/tokens/styles.css": path.resolve(__dirname, "../../packages/tokens/src/styles.css"),
      "@core": path.resolve(__dirname, "src/stubs/core/index.ts"),
      "@core/hivelab/catalog": path.resolve(__dirname, "src/stubs/core/hivelab/catalog.ts"),
      "@core/hivelab/contracts": path.resolve(__dirname, "src/stubs/core/hivelab/contracts.ts"),
      "@auth": path.resolve(webSrc, "contexts/auth"),
      "@onboarding": path.resolve(webSrc, "contexts/onboarding"),
      "@profile": path.resolve(webSrc, "contexts/profile"),
      "@profile/contract": path.resolve(webSrc, "profile/profile.contract.ts"),
      "@profile/sample": path.resolve(webSrc, "profile/profile.sample.ts")
    };
    return config;
  }
};

export default nextConfig;
