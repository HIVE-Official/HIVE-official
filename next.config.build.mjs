/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Optimize build performance
  experimental: {
    cpus: 1,
    workerThreads: false,
    optimizeCss: false,
  },
  
  // Skip type checking during build (run separately)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip ESLint during build (run separately)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Reduce memory usage
  webpack: (config, { isServer }) => {
    config.cache = false;
    config.optimization = {
      ...config.optimization,
      minimize: false,
    };
    return config;
  },
};

export default nextConfig;