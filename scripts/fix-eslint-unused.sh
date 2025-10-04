#!/bin/bash

# Script to fix common ESLint unused variable warnings
# This script uses eslint --fix to automatically remove unused imports

set -e

echo "🔧 Fixing ESLint unused import/variable warnings..."

# Set Node options for memory
export NODE_OPTIONS="--max-old-space-size=4096"

# Run eslint with --fix flag on apps/web
echo "📦 Fixing apps/web..."
cd apps/web
npx eslint . --fix --max-warnings 1000 2>&1 | tee /tmp/eslint-fix.log || true

# Count remaining warnings
echo ""
echo "📊 Checking remaining warnings..."
npx eslint . --max-warnings 1000 2>&1 | grep -c "warning" || echo "0"

echo "✅ ESLint fix complete!"
