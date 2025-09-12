import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use default .next directory
  distDir: '.next',
  
  // Enable strict validation for production safety
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
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
    unoptimized: true, // Skip image optimization for faster builds
  },
  
  // Skip static optimization for faster builds
  output: 'standalone',
  
  // Disable source maps in production for faster builds
  productionBrowserSourceMaps: false,
  
  // Reduce build parallelism and disable tracing
  experimental: {
    workerThreads: false,
    cpus: 1,
    // Removed deprecated isrMemoryCacheSize
    // Removed unrecognized disableOptimizedLoading
  },
  
  // Webpack configuration
  webpack: (config) => {
    // Add aliases for workspace packages
    config.resolve.alias = {
      ...config.resolve.alias,
      '@hive/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@hive/core': path.resolve(__dirname, '../../packages/core/src'),
      '@hive/hooks': path.resolve(__dirname, '../../packages/hooks/src'),
      '@hive/auth-logic': path.resolve(__dirname, '../../packages/auth-logic/src'),
    };
    
    return config;
  },
};

export default nextConfig;