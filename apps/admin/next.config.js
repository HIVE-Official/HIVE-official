/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Remove appDir experimental flag (it's stable in Next.js 14)
  trailingSlash: false,
  // Remove output: 'standalone' for now to avoid build issues
  transpilePackages: ['@hive/ui', '@hive/core', '@hive/hooks', '@hive/tokens'],
  webpack: (config) => {
    // Ensure proper handling of client-side modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
}

module.exports = nextConfig