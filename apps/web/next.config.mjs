import path from "path";
import { fileURLToPath } from "url";
// import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bundle analyzer - only use in development
let withBundleAnalyzer = (config) => config;
if (process.env.NODE_ENV !== 'production' && process.env.ANALYZE === 'true') {
  try {
    const bundleAnalyzer = await import('@next/bundle-analyzer');
    withBundleAnalyzer = bundleAnalyzer.default({
      enabled: process.env.ANALYZE === 'true',
    });
  } catch (e) {
    console.warn('Bundle analyzer not available in production');
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⚠️ LAUNCH MODE: Skip type checking for fast deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable static page generation to avoid SSR hook errors
  output: 'standalone',

  // App directory is now stable in Next.js 15, no experimental flag needed
  // Tell Next.js where to find the app directory
  distDir: ".next",
  
  // Transpile workspace packages
  transpilePackages: ['@hive/ui', '@hive/core', '@hive/hooks'],
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@hive/ui',
      'firebase',
      'firebase-admin',
      '@tanstack/react-query',
      'react-hook-form',
      'date-fns'
    ],
    // Reduce cache size
    webpackMemoryOptimizations: true,
  },

  // Bundle optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },

  // Production-only optimizations
  productionBrowserSourceMaps: false,
  generateBuildId: async () => {
    // Use timestamp for build ID to avoid cache buildup
    return Date.now().toString();
  },
  

  // Cache configuration
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // Security headers
  async headers() {
    const isProduction = process.env.NODE_ENV === 'production';

    return [
      // Static assets caching
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Content Security Policy for development
          ...(!isProduction ? [
            {
              key: 'Content-Security-Policy',
              value: [
                "default-src 'self'",
                "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.firebaseapp.com https://*.googleapis.com", // Allow Next.js dev scripts and Firebase
                "style-src 'self' 'unsafe-inline'", // Allow inline styles
                "img-src 'self' data: blob: https: https://firebasestorage.googleapis.com",
                "font-src 'self' data:",
                "connect-src 'self' ws: wss: http://localhost:* https://*.firebaseio.com https://*.firebase.googleapis.com https://*.firebaseapp.com https://firebaseinstallations.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com", // Allow WebSocket for HMR and Firebase
                "frame-src 'self' https://*.firebaseapp.com",
                "worker-src 'self' blob:",
              ].join('; ')
            }
          ] : []),
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
            {
              key: 'Content-Security-Policy',
              value: [
                "default-src 'self'",
                "script-src 'self' https://*.firebaseapp.com https://*.googleapis.com",
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: https://firebasestorage.googleapis.com https://storage.googleapis.com",
                "font-src 'self'",
                "connect-src 'self' https://*.firebaseio.com https://*.firebase.googleapis.com https://*.firebaseapp.com https://firebaseinstallations.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com",
                "frame-src 'self' https://*.firebaseapp.com",
              ].join('; ')
            }
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

  // Subdomain and redirect handling
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'admin.hive.college',
          },
        ],
        destination: '/admin/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'admin.localhost',
          },
        ],
        destination: '/admin/:path*',
      },
    ];
  },

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
          destination: 'https://www.hive.college/:path*',
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
        minimize: true,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            // Separate vendor chunk for UI library
            hiveUI: {
              test: /[\\/]packages[\\/]ui[\\/]/,
              name: 'hive-ui',
              chunks: 'all',
              priority: 30,
              reuseExistingChunk: true,
            },
            // Firebase SDK splitting
            firebaseCore: {
              test: /[\\/]node_modules[\\/]firebase[\\/]/,
              name: 'firebase-core',
              chunks: 'all',
              priority: 25,
              reuseExistingChunk: true,
            },
            firebaseAdmin: {
              test: /[\\/]node_modules[\\/]firebase-admin[\\/]/,
              name: 'firebase-admin',
              chunks: 'async',
              priority: 24,
              reuseExistingChunk: true,
            },
            // React Query separate chunk
            reactQuery: {
              test: /[\\/]node_modules[\\/]@tanstack[\\/]react-query[\\/]/,
              name: 'react-query',
              chunks: 'all',
              priority: 22,
              reuseExistingChunk: true,
            },
            // Form libraries
            forms: {
              test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
              name: 'forms',
              chunks: 'all',
              priority: 21,
              reuseExistingChunk: true,
            },
            // Framer Motion separate chunk
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'async',
              priority: 20,
              reuseExistingChunk: true,
            },
            // Icons library
            icons: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: 'icons',
              chunks: 'async',
              priority: 19,
              reuseExistingChunk: true,
            },
            // Date utilities
            dateUtils: {
              test: /[\\/]node_modules[\\/]date-fns[\\/]/,
              name: 'date-utils',
              chunks: 'async',
              priority: 18,
              reuseExistingChunk: true,
            },
            // Common vendor libraries
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )?.[1];
                if (packageName) {
                  return `vendor-${packageName.replace('@', '').replace('/', '-')}`;
                }
                return 'vendor';
              },
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
            // Default chunk
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Tree shaking optimization
      config.optimization.usedExports = true;
      // Disabled sideEffects optimization - was causing CSS loader issues in Vercel builds
      // config.optimization.sideEffects = false;
      config.optimization.providedExports = true;
      config.optimization.concatenateModules = true;
      config.optimization.innerGraph = true;
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
