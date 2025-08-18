#!/bin/bash

# HIVE Development Setup Script
# Ensures safe development environment that won't affect production

echo "🐝 Setting up HIVE development environment..."

# Check if we're in development mode
if [ "$NODE_ENV" = "production" ]; then
    echo "❌ ERROR: Cannot run development setup in production mode"
    echo "   Unset NODE_ENV or set it to 'development'"
    exit 1
fi

# Check if .env.local exists and is configured for development
if [ ! -f ".env.local" ]; then
    echo "❌ ERROR: .env.local file not found"
    echo "   Copy .env.local.example to .env.local and configure it"
    exit 1
fi

# Verify development URLs in .env.local
if ! grep -q "localhost:3000" .env.local; then
    echo "⚠️  WARNING: .env.local may not be configured for development"
    echo "   Ensure NEXT_PUBLIC_APP_URL=http://localhost:3000"
fi

echo "✅ Development environment verified"
echo "🚀 Starting development server..."

# Start development server with explicit development settings
NODE_ENV=development npm run dev