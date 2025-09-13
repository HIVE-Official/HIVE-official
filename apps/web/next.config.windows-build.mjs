// Removed unused imports and variables

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Minimal configuration for Windows builds
  distDir: '.next',
  
  // Skip all validation
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Essential packages only
  transpilePackages: ['@hive/ui'],
  
  // Disable image optimization
  images: {
    unoptimized: true,
  },
  
  // Disable source maps
  productionBrowserSourceMaps: false,
  
  // Windows-optimized settings
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  
  // Simplified webpack config
  webpack: (config) => {
    // Disable webpack cache for Windows
    config.cache = false;
    
    // Reduce parallelism
    config.parallelism = 1;
    
    return config;
  },
};

export default nextConfig;