/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['@hive/ui', '@hive/core', '@hive/hooks'],
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'storage.googleapis.com',
      'lh3.googleusercontent.com',
    ],
  },
  // Skip static optimization for faster builds
  output: 'standalone',
};

export default nextConfig;