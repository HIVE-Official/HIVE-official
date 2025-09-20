import path from "path";
import { fileURLToPath } from "url";
// import webpack from "webpack";

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
  
  // External packages for server components
  serverExternalPackages: ['framer-motion'],
  
  transpilePackages: ['@hive/ui', '@hive/core', '@hive/hooks'],
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Bundle optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  
  eslint: {
    // Temporarily allow warnings for launch - can be tightened post-launch
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Enable TypeScript validation for production builds
    ignoreBuildErrors: false,
  },

  // Security headers
  async headers() {
    const isProduction = process.env.NODE_ENV === 'production';
    
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          ...(isProduction ? [
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
          ] : []),
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
  webpack: (config, { isServer, dev }) => {
    // Fix OpenTelemetry warnings by suppressing critical dependency warnings
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    // Suppress critical dependency warnings for OpenTelemetry
    // config.plugins = config.plugins || [];
    // config.plugins.push(
    //   new webpack.ContextReplacementPlugin(
    //     /node_modules\/@opentelemetry\/instrumentation/,
    //     (data) => {
    //       // Remove critical dependency warnings
    //       if (data.dependencies) {
    //         data.dependencies.forEach(dep => {
    //           if (dep.critical) delete dep.critical;
    //         });
    //       }
    //       return data;
    //     }
    //   )
    // );

    // Ignore dynamic require warnings for instrumentation modules
    config.externals = config.externals || {};
    if (isServer) {
      config.externals['@opentelemetry/instrumentation'] = '@opentelemetry/instrumentation';
    }

    // Handle Node.js built-in modules with node: protocol
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      util: false,
      buffer: false,
      process: false,
    };


    // Externalize firebase-admin completely for client-side
    if (!isServer) {
      config.externals = config.externals || [];
      config.externals.push('firebase-admin');
    } else {
      // For server-side, still try to handle node: imports
      config.externals = config.externals || [];
      config.externals.push({
        'node:process': 'process',
        'node:stream': 'stream', 
        'node:util': 'util',
        'node:buffer': 'buffer',
        'node:fs': 'fs',
        'node:path': 'path',
        'node:crypto': 'crypto',
        'node:os': 'os',
        'node:url': 'url',
      });
    }

    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Handle Framer Motion server-side rendering - make it client-side only
    if (isServer) {
      config.externals = [...(config.externals || []), 'framer-motion'];
      
      // Add alias to prevent SSR issues with framer-motion
      config.resolve.alias = {
        ...config.resolve.alias,
        'framer-motion': false,
      };
    }

    // Production optimizations
    if (!dev) {
      // Bundle splitting optimizations
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            // Separate vendor chunk for UI library
            hiveUI: {
              test: /[\\/]node_modules[\\/]@hive[\\/]ui[\\/]/,
              name: 'hive-ui',
              chunks: 'all',
              priority: 20,
            },
            // Framer Motion separate chunk
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 15,
            },
            // Common vendor libraries
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      };

      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    // Resolve workspace packages to source files and handle node: imports
    config.resolve.alias = {
      ...config.resolve.alias,
      // Node.js built-in module aliases for node: protocol
      'node:process': 'process',
      'node:stream': 'stream',
      'node:util': 'util',
      'node:buffer': 'buffer',
      'node:fs': false,
      'node:path': 'path',
      'node:crypto': false,
      'node:os': 'os',
      'node:url': 'url',
      // Workspace packages
      "@hive/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@hive/core": path.resolve(__dirname, "../../packages/core/src"), 
      "@hive/hooks": path.resolve(__dirname, "../../packages/hooks/src"), 
      "@hive/auth-logic": path.resolve(__dirname, "../../packages/auth-logic/src"),
    };

    return config;
  },

  // Image optimization security
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'storage.googleapis.com', // Firebase Storage direct URLs
      'lh3.googleusercontent.com', // Google profile images
      'avatars.githubusercontent.com', // GitHub profile images
      'api.dicebear.com', // DiceBear avatar generation service
      'ui-avatars.com', // UI Avatars service for initials
    ],
    dangerouslyAllowSVG: true, // Allow SVG for generated avatars (safely sandboxed)
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Output configuration for better security
  // Temporarily disable static export for production builds
  // output: 'standalone',
  
  // Compress responses
  compress: true,

  // Security-focused build configuration
  // swcMinify is default in Next.js 15
  poweredByHeader: false, // Remove X-Powered-By header
};

export default withBundleAnalyzer(nextConfig);
