#!/bin/bash

# HIVE Infrastructure Protection Script
# Prevents Next.js from being run from the root directory

set -e

echo "🚨 HIVE Infrastructure Protection"
echo "=================================="

# Check if we're in the root directory
if [[ -f "package.json" && -f "turbo.json" ]]; then
    echo "✅ Detected HIVE monorepo root"
    
    # Check if Next.js is being run from root
    if [[ "$1" == "next" || "$1" == "dev" ]]; then
        echo "❌ ERROR: Next.js should not be run from the root directory!"
        echo ""
        echo "📋 CORRECT USAGE:"
        echo "  cd apps/web && npx next dev     # For web app"
        echo "  cd apps/admin && npx next dev   # For admin app"
        echo "  pnpm web                        # Using Turborepo (recommended)"
        echo "  pnpm admin                      # Using Turborepo (recommended)"
        echo ""
        echo "🔧 WHY: Running Next.js from root can corrupt workspace TypeScript configs"
        exit 1
    fi
fi

echo "✅ Safe to proceed" 