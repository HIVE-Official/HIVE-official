import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bundle analyzer
import bundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is now stable in Next.js 15, no experimental flag needed
  // Tell Next.js where to find the app directory
  distDir: ".next",
  
  // Experimental features for Next.js 15
  experimental: {
    // instrumentationHook is now default in Next.js 15
    serverComponentsExternalPackages: ['framer-motion'],
  },
  
  transpilePackages: ['@hive/ui', '@hive/core', '@hive/hooks'],
  
  eslint: {
    // Disable ESLint during build due to Windows path resolution issues
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Temporarily disable TypeScript checking during build due to Windows path issues
    ignoreBuildErrors: true,
  },

  // Security headers (backup to middleware)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options', 
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
        ],
      },
    ];
  },

  // Redirect HTTP to HTTPS in production
  async redirects() {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/:path*',
          has: [
            {
              type: 'header',
              key: 'x-forwarded-proto',
              value: 'http',
            },
          ],
          destination: 'https://hive.io/:path*',
          permanent: true,
        },
      ];
    }
    return [];
  },

  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.NODE_ENV,
  },

  // SVG handling and workspace resolution
  webpack: (config, { isServer }) => {
    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Handle Framer Motion server-side rendering
    if (isServer) {
      config.externals = [...(config.externals || []), 'framer-motion'];
    }

    // Resolve workspace packages to built dist files for proper exports
    config.resolve.alias = {
      ...config.resolve.alias,
      "@hive/ui": path.resolve(__dirname, "../../packages/ui/dist/ui"), // Use built UI dist
      "@hive/core": path.resolve(__dirname, "../../packages/core/dist"), // Use built core
      "@hive/hooks": path.resolve(__dirname, "../../packages/hooks/dist"), // Use built hooks
      "@hive/auth-logic": path.resolve(
        __dirname,
        "../../packages/auth-logic/src" // Auth-logic uses source (TypeScript only)
      ),
    };

    return config;
  },

  // Image optimization security
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com', // Google profile images
      'avatars.githubusercontent.com', // GitHub profile images
    ],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Output configuration for better security
  output: 'standalone',
  
  // Compress responses
  compress: true,

  // Security-focused build configuration
  // swcMinify is default in Next.js 15
  poweredByHeader: false, // Remove X-Powered-By header
  
  // Development security (less strict CSP)
  ...(process.env.NODE_ENV === 'development' && {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            // More permissive headers for development
          ],
        },
      ];
    },
  }),
};

export default withBundleAnalyzer(nextConfig);
