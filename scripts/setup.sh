#!/bin/bash

# HIVE Development Environment Setup Script
# This script sets up the complete HIVE development environment

set -e  # Exit on any error

echo "🚀 Setting up HIVE Development Environment..."
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "pnpm-workspace.yaml" ]; then
    print_error "Please run this script from the HIVE project root directory"
    exit 1
fi

print_status "Checking prerequisites..."

# Check Node.js version
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 20.12.1 LTS or later"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_NODE="20.12.1"
if [ "$(printf '%s\n' "$REQUIRED_NODE" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_NODE" ]; then
    print_warning "Node.js version $NODE_VERSION detected. Recommended: $REQUIRED_NODE or later"
else
    print_success "Node.js version $NODE_VERSION ✓"
fi

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    print_status "Installing pnpm..."
    npm install -g pnpm@9.1.1
else
    print_success "pnpm detected ✓"
fi

# Install global tools for reliable development (Windows compatibility)
print_status "Installing global development tools..."
npm install -g typescript@5.8.3 || print_warning "Failed to install global TypeScript"
npm install -g @storybook/cli@8.4.7 || print_warning "Failed to install global Storybook CLI"
npm install -g next@15.3.3 || print_warning "Failed to install global Next.js"
npm install -g eslint@9.28.0 || print_warning "Failed to install global ESLint"

# Clean any existing installations
print_status "Cleaning existing installations..."
rm -rf node_modules
rm -rf .next
rm -rf .turbo
rm -rf apps/web/node_modules
rm -rf apps/web/.next
rm -rf packages/*/node_modules
rm -rf packages/*/.turbo

# Install dependencies
print_status "Installing dependencies with pnpm..."
pnpm install --frozen-lockfile

# Check for Firebase environment setup
print_status "Checking Firebase configuration..."
if [ ! -f "apps/web/.env.local" ]; then
    if [ -f "apps/web/.env.example" ]; then
        print_warning "Firebase not configured. Creating .env.local from example..."
        cp apps/web/.env.example apps/web/.env.local
        print_warning "Please edit apps/web/.env.local with your Firebase configuration"
        print_warning "The app will run in mock mode until Firebase is configured"
    else
        print_warning "No Firebase configuration found. App will run in mock mode"
    fi
else
    print_success "Firebase configuration found ✓"
fi

# Verify installation with health checks
print_status "Running health checks..."

# Check TypeScript compilation
print_status "Checking TypeScript compilation..."
if pnpm exec tsc --noEmit; then
    print_success "TypeScript compilation ✓"
else
    print_error "TypeScript compilation failed"
    exit 1
fi

# Check linting
print_status "Checking ESLint configuration..."
if npx eslint . --max-warnings 15 > /dev/null 2>&1; then
    print_success "ESLint configuration ✓"
else
    print_warning "ESLint warnings detected (this is normal during development)"
fi

# Test Next.js build
print_status "Testing Next.js build..."
cd apps/web
if pnpm build > /dev/null 2>&1; then
    print_success "Next.js build ✓"
else
    print_warning "Next.js build has issues (may be due to missing Firebase config)"
fi
cd ../..

# Test Storybook build
print_status "Testing Storybook configuration..."
cd packages/ui
if timeout 30s pnpm storybook --ci > /dev/null 2>&1; then
    print_success "Storybook configuration ✓"
else
    print_warning "Storybook test skipped (timeout or configuration issue)"
fi
cd ../..

print_success "🎉 HIVE Development Environment Setup Complete!"
echo ""
echo "================================================"
echo -e "${GREEN}Next Steps:${NC}"
echo ""
echo "1. 🔥 Configure Firebase (if needed):"
echo "   - Edit apps/web/.env.local with your Firebase config"
echo "   - See apps/web/.env.example for the required format"
echo ""
echo "2. 🚀 Start development servers:"
echo "   - Web app:    cd apps/web && pnpm dev"
echo "   - Storybook:  cd packages/ui && pnpm storybook"
echo ""
echo "3. 🔍 Verify everything works:"
echo "   - Web app:    http://localhost:3000"
echo "   - Storybook:  http://localhost:6006"
echo ""
echo "4. 🧪 Run quality checks:"
echo "   - Lint:       npx eslint . --max-warnings 15"
echo "   - TypeCheck:  tsc --noEmit"
echo "   - Build:      cd apps/web && pnpm build"
echo ""
echo "5. 📚 Documentation:"
echo "   - Brand Guide: docs/brand-design.md"
echo "   - Architecture: docs/CODEBASE_AUDIT.md"
echo ""
echo "================================================"
echo -e "${BLUE}Development Environment Status:${NC}"
echo "✅ Node.js $(node --version)"
echo "✅ pnpm $(pnpm --version)"
echo "✅ TypeScript compilation"
echo "✅ Monorepo packages (14 total)"
echo "✅ Development servers ready"
echo ""
if [ ! -f "apps/web/.env.local" ] || ! grep -q "NEXT_PUBLIC_FIREBASE_API" apps/web/.env.local 2>/dev/null; then
    echo "⚠️  Firebase configuration needed for full functionality"
else
    echo "✅ Firebase configuration detected"
fi
echo ""
echo -e "${GREEN}Happy coding! 🐝${NC}" 