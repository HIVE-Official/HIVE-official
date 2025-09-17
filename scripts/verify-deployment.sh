#!/bin/bash

# HIVE Vercel Deployment Verification Script
# This script verifies that the HIVE project is ready for Vercel deployment

set -e

echo "🚀 HIVE Vercel Deployment Verification"
echo "======================================"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    if [ "$2" = "success" ]; then
        echo -e "${GREEN}✅ $1${NC}"
    elif [ "$2" = "warning" ]; then
        echo -e "${YELLOW}⚠️  $1${NC}"
    elif [ "$2" = "error" ]; then
        echo -e "${RED}❌ $1${NC}"
    else
        echo -e "${BLUE}ℹ️  $1${NC}"
    fi
}

# Check if we're in the correct directory
if [ ! -f "package.json" ] || [ ! -d "apps/web" ]; then
    print_status "Please run this script from the HIVE project root directory" "error"
    exit 1
fi

print_status "Checking project structure..." "info"

# Verify essential files exist
if [ -f "apps/web/vercel.json" ]; then
    print_status "Vercel configuration found" "success"
else
    print_status "Vercel configuration missing" "error"
    exit 1
fi

if [ -f "turbo.json" ]; then
    print_status "Turborepo configuration found" "success"
else
    print_status "Turborepo configuration missing" "error"
    exit 1
fi

if [ -f ".vercelignore" ]; then
    print_status "Vercel ignore file found" "success"
else
    print_status "Vercel ignore file missing" "warning"
fi

# Check Node.js and package manager
print_status "Checking runtime requirements..." "info"

NODE_VERSION=$(node --version)
if [[ $NODE_VERSION == v20* ]] || [[ $NODE_VERSION == v18* ]] || [[ $NODE_VERSION == v22* ]]; then
    print_status "Node.js version: $NODE_VERSION" "success"
else
    print_status "Node.js version $NODE_VERSION may not be supported" "warning"
fi

if command -v pnpm &> /dev/null; then
    PNPM_VERSION=$(pnpm --version)
    print_status "pnpm version: $PNPM_VERSION" "success"
else
    print_status "pnpm not found - will be installed during deployment" "warning"
fi

# Test installation
print_status "Testing package installation..." "info"
if pnpm install --frozen-lockfile > /dev/null 2>&1; then
    print_status "Package installation successful" "success"
else
    print_status "Package installation failed" "error"
    exit 1
fi

# Test Turborepo build
print_status "Testing Turborepo build..." "info"
if pnpm turbo build --filter=web > /dev/null 2>&1; then
    print_status "Turborepo build successful" "success"
else
    print_status "Turborepo build failed" "error"
    exit 1
fi

# Verify Next.js build output
if [ -d "apps/web/.next" ]; then
    print_status "Next.js build output found" "success"
else
    print_status "Next.js build output missing" "error"
    exit 1
fi

# Check environment variables
print_status "Checking environment configuration..." "info"

if [ -f "apps/web/.env.local" ]; then
    print_status "Local environment file found" "success"
    
    # Check for required Firebase variables
    if grep -q "NEXT_PUBLIC_FIREBASE_API_KEY" apps/web/.env.local; then
        print_status "Firebase API key configured" "success"
    else
        print_status "Firebase API key missing from .env.local" "warning"
    fi
    
    if grep -q "NEXT_PUBLIC_FIREBASE_PROJECT_ID" apps/web/.env.local; then
        print_status "Firebase project ID configured" "success"
    else
        print_status "Firebase project ID missing from .env.local" "warning"
    fi
else
    print_status "Local environment file not found" "warning"
    print_status "Ensure environment variables are configured in Vercel dashboard" "info"
fi

# Test API health endpoint
print_status "Testing application health..." "info"
cd apps/web

# Start Next.js in background for testing
npm run build > /dev/null 2>&1
timeout 30s npm run start > /dev/null 2>&1 &
SERVER_PID=$!

# Wait for server to start
sleep 5

# Test health endpoint
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    print_status "Health endpoint responding" "success"
else
    print_status "Health endpoint not responding" "warning"
fi

# Clean up
kill $SERVER_PID 2>/dev/null || true

cd ../..

# Verify Vercel configuration
print_status "Analyzing Vercel configuration..." "info"

# Check vercel.json structure
if grep -q "buildCommand.*turbo.*build.*filter=web" apps/web/vercel.json; then
    print_status "Build command correctly configured" "success"
else
    print_status "Build command may need verification" "warning"
fi

if grep -q "outputDirectory.*apps/web/.next" apps/web/vercel.json; then
    print_status "Output directory correctly configured" "success"
else
    print_status "Output directory may need verification" "warning"
fi

if grep -q "regions.*iad1" apps/web/vercel.json; then
    print_status "Region configuration found" "success"
else
    print_status "No specific region configured" "info"
fi

# Security headers check
if grep -q "X-Frame-Options" apps/web/vercel.json; then
    print_status "Security headers configured" "success"
else
    print_status "Security headers missing" "warning"
fi

# Final summary
echo ""
print_status "Deployment Verification Complete!" "info"
echo ""
print_status "Next Steps for Vercel Deployment:" "info"
echo "1. Connect your GitHub repository to Vercel"
echo "2. Set the root directory to the project root (leave empty)"
echo "3. Configure environment variables in Vercel dashboard:"
echo "   - NEXT_PUBLIC_FIREBASE_API_KEY"
echo "   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
echo "   - NEXT_PUBLIC_FIREBASE_PROJECT_ID"
echo "   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
echo "   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
echo "   - NEXT_PUBLIC_FIREBASE_APP_ID"
echo "   - NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"
echo "   - FIREBASE_PROJECT_ID (server-side)"
echo "   - FIREBASE_CLIENT_EMAIL (server-side)"
echo "   - FIREBASE_PRIVATE_KEY (server-side)"
echo "4. Deploy and verify all endpoints work correctly"
echo ""
print_status "HIVE is ready for production deployment! 🎉" "success" 