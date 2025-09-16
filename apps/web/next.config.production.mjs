import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  distDir: '.next',
  
  // Skip linting and type checking for faster builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip TypeScript errors in production build
    ignoreBuildErrors: true,
  },
  
  // Transpile workspace packages
  transpilePackages: ['@hive/ui', '@hive/core', '@hive/hooks', '@hive/auth-logic'],
  
  // Image optimization
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'storage.googleapis.com',
      'lh3.googleusercontent.com',
    ],
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
  
  // Production output
  output: 'standalone',
  
  // Disable source maps for faster build
  productionBrowserSourceMaps: false,
  
  // Server external packages
  serverExternalPackages: [
    'firebase-admin',
    'googleapis',
    '@google-cloud/firestore',
  ],
  
  // Build performance optimizations
  experimental: {
    optimizePackageImports: ['@hive/ui', 'lucide-react', 'framer-motion'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module) {
                return module.size() > 160000 &&
                  /node_modules[/\\]/.test(module.nameForCondition() || '');
              },
              name(module) {
                const hash = crypto.createHash('sha1');
                hash.update(module.nameForCondition() || '');
                return hash.digest('hex').substring(0, 8);
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              priority: 20,
            },
          },
        },
      };
    }
    
    // Ignore optional dependencies that cause warnings
    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': false,
      encoding: false,
    };
    
    return config;
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NODE_ENV || 'production',
  },
};

export default nextConfig;