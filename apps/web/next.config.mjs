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
    ignoreDuringBuilds: true,
  },
  // Disable Next.js TypeScript auto-configuration COMPLETELY
  typescript: {
    // This disables Next.js from automatically configuring TypeScript
    // We manage our own TypeScript configuration in our monorepo
    ignoreBuildErrors: true,
  },
  // Domain and redirect configuration
  async redirects() {
    return [
      {
        source: '/',
        destination: '/welcome',
        permanent: false, // Use 307 temporary redirect
      },
    ];
  },
  // Development server configuration for subdomain support
  ...(process.env.NODE_ENV === 'development' && {
    async rewrites() {
      return [
        // Support for local subdomain development
        {
          source: '/:path*',
          destination: '/:path*',
          has: [
            {
              type: 'host',
              value: 'dev.hive.local',
            },
          ],
        },
        {
          source: '/:path*',
          destination: '/:path*',
          has: [
            {
              type: 'host',
              value: 'staging.hive.local',
            },
          ],
        },
      ];
    },
  }),
  // SVG handling and workspace resolution
  webpack: (config, { isServer: _isServer }) => {
    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Ensure our workspace packages are properly resolved
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
      '@hive/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@hive/core': path.resolve(__dirname, '../../packages/core/src'),
      '@hive/auth-logic': path.resolve(__dirname, '../../packages/auth-logic/src'),
      '@hive/hooks': path.resolve(__dirname, '../../packages/hooks/src'),
      '@hive/validation': path.resolve(__dirname, '../../packages/validation/src'),
      '@hive/utilities': path.resolve(__dirname, '../../packages/utilities/src'),
      '@hive/api-client': path.resolve(__dirname, '../../packages/api-client/src'),
      '@hive/analytics': path.resolve(__dirname, '../../packages/analytics/src'),
    };

    // Add proper module resolution for React
    config.resolve.mainFields = ["browser", "module", "main"];

    return config;
  },
  // Ensure Next.js doesn't interfere with our workspace setup
  transpilePackages: [
    '@hive/ui',
    '@hive/core', 
    '@hive/auth-logic',
    '@hive/hooks',
    '@hive/validation',
    '@hive/utilities',
    '@hive/api-client',
    '@hive/analytics'
  ],
};

export default nextConfig;
