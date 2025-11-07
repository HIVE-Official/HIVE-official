/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['@hive/ui', '@hive/core', '@hive/hooks', '@hive/tokens', 'react-easy-crop'],
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@hive/ui',
      '@tanstack/react-query',
      'react-hook-form',
      'date-fns'
    ],
  },
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  // Security headers
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
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    // Ensure explicit resolution for react-easy-crop from workspace root
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-easy-crop': require.resolve('react-easy-crop'),
    };
    return config;
  },
}

module.exports = nextConfig
