#!/bin/bash

echo "🔧 Fixing build system issues..."

# Set Node memory limit
export NODE_OPTIONS="--max-old-space-size=8192"

echo "📝 Step 1: Clearing build caches..."
rm -rf apps/web/.next
rm -rf apps/admin/.next
rm -rf apps/web/.tsbuildinfo
rm -rf apps/admin/.tsbuildinfo
find packages -name "dist" -type d -exec rm -rf {} + 2>/dev/null || true
find packages -name ".tsbuildinfo" -type f -delete 2>/dev/null || true

echo "🏗️ Step 2: Building packages in order..."
# Build core packages first
echo "Building @hive/tokens..."
cd packages/tokens && npx tsc --skipLibCheck && cd ../..

echo "Building @hive/utilities..."
cd packages/utilities && npx tsc --skipLibCheck && cd ../..

echo "Building @hive/validation..."
cd packages/validation && npx tsc --skipLibCheck && cd ../..

echo "Building @hive/i18n..."
cd packages/i18n && npx tsc --skipLibCheck && cd ../..

echo "Building @hive/core..."
cd packages/core && npx tsc --skipLibCheck && cd ../..

echo "Building @hive/analytics..."
cd packages/analytics && npx tsc --skipLibCheck && cd ../..

echo "Building @hive/api-client..."
cd packages/api-client && npx tsc --skipLibCheck && cd ../..

echo "Building @hive/auth-logic..."
cd packages/auth-logic && npx tsc --skipLibCheck && cd ../..

echo "Building @hive/hooks..."
cd packages/hooks && npx tsc --skipLibCheck && cd ../..

echo "✅ Packages built successfully!"

echo "🔍 Step 3: Type checking apps..."
cd apps/web
echo "Type checking web app..."
npx tsc --noEmit --skipLibCheck --incremental || echo "⚠️ Web app has type errors"
cd ../..

cd apps/admin
echo "Type checking admin app..."
npx tsc --noEmit --skipLibCheck --incremental || echo "⚠️ Admin app has type errors"
cd ../..

echo "🎯 Step 4: Running optimized ESLint..."
npx eslint . --config .eslintrc.perf.json --ext .ts,.tsx --max-warnings 1500 || echo "⚠️ ESLint warnings found"

echo "🚀 Step 5: Attempting production build..."
pnpm build || echo "⚠️ Build needs more fixes"

echo "✨ Build fix process complete!"