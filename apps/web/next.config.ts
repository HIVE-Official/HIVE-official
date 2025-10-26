// Bounded Context Owner: Identity & Access Management Guild
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allow production builds to succeed even if ESLint errors are present in unrelated areas.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to complete while we migrate test/type surfaces.
    ignoreBuildErrors: true,
  },
  experimental: {
    // Allow importing shared packages within the monorepo.
    externalDir: true
  }
};

export default nextConfig;
