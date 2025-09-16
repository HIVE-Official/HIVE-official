#!/bin/bash
set -e

echo "🔨 HIVE Web App Production Build (WSL)"
echo "====================================="

# Clean up any existing build
echo "🧹 Cleaning up previous build..."
rm -rf .next || true

# Create .next directory with proper permissions
echo "📁 Creating .next directory..."
mkdir -p .next
chmod 755 .next

# Pre-create trace file to prevent ENOENT errors
echo "📄 Creating trace file..."
touch .next/trace
chmod 666 .next/trace

# Start the build process
echo "🔨 Starting Next.js production build..."
NEXT_TELEMETRY_DISABLED=1 npx next build

echo "✅ Build completed successfully!"