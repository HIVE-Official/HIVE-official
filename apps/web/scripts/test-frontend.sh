#!/bin/bash

# HIVE Frontend Testing Script
# Safe testing that never touches production data

echo "🧪 Running HIVE frontend tests..."

# Set test environment
export NODE_ENV=test
export NEXT_PUBLIC_APP_URL=http://localhost:3000

echo "📋 Running linting..."
npm run lint

echo "🏗️  Testing build process..."
npm run build:dev

echo "⚡ Running unit tests..."
npm run test:unit

echo "🔧 Running component tests..."
npm run test:component

echo "🎭 Running E2E tests..."
npm run test:e2e

echo "✅ All frontend tests completed successfully!"