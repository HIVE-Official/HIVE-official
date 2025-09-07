#!/bin/bash

# Fix Vercel build issues for monorepo deployment

echo "🔧 Fixing Vercel build issues..."

cd /Users/laneyfraass/hive_ui/apps/web

# Remove vitest temporarily from package.json
echo "📦 Removing vitest from dependencies..."
npm pkg delete devDependencies.vitest
npm pkg delete devDependencies.@vitest/plugin-react
npm pkg delete devDependencies.@vitest/coverage-v8

# Clean node_modules and reinstall
echo "🧹 Cleaning node_modules..."
rm -rf node_modules
rm -f package-lock.json

# Install dependencies without workspace protocol
echo "📥 Installing dependencies..."
npm install --legacy-peer-deps

# Try building
echo "🏗️ Running production build..."
npm run build

echo "✅ Build fix complete!"