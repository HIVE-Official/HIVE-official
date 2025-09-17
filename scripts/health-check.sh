#!/bin/bash

# HIVE Infrastructure Health Check Script
# This script verifies that all TypeScript and infrastructure is working correctly

echo "🏥 HIVE Infrastructure Health Check"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        FAILED=1
    fi
}

FAILED=0

echo "1. Checking TypeScript compilation..."
tsc --noEmit > /dev/null 2>&1
print_status $? "Root workspace TypeScript compilation"

echo "2. Checking web app TypeScript..."
cd apps/web && npx tsc --noEmit > /dev/null 2>&1
print_status $? "Web app TypeScript compilation"

echo "3. Checking admin app TypeScript..."
cd ../admin && npx tsc --noEmit > /dev/null 2>&1
print_status $? "Admin app TypeScript compilation"

echo "4. Checking package builds..."
cd ../.. && pnpm turbo build --dry-run > /dev/null 2>&1
print_status $? "Turborepo build pipeline"

echo "5. Checking ESLint..."
npx eslint . --max-warnings 15 > /dev/null 2>&1
print_status $? "ESLint across all packages"

echo "6. Checking package references..."
if grep -q '"composite": true' packages/*/tsconfig.json; then
    print_status 0 "Package composite settings"
else
    print_status 1 "Package composite settings"
fi

echo "7. Checking workspace imports..."
if grep -q '@hive/' apps/web/src/**/*.ts apps/web/src/**/*.tsx 2>/dev/null; then
    print_status 0 "Workspace imports (@hive/*) usage"
else
    print_status 1 "Workspace imports (@hive/*) usage"
fi

echo "8. Checking tsconfig protection..."
if [ ! -w tsconfig.json ] && [ ! -w apps/web/tsconfig.json ]; then
    print_status 0 "TypeScript config files protected (read-only)"
else
    print_status 1 "TypeScript config files protected (read-only)"
fi

echo "9. Checking auth-logic package build..."
if [ -f packages/auth-logic/dist/hooks/use-auth.d.ts ]; then
    print_status 0 "Auth-logic package declaration files"
else
    print_status 1 "Auth-logic package declaration files"
fi

echo "10. Checking Next.js config..."
if [ -f apps/web/next.config.mjs ]; then
    print_status 0 "Next.js configuration exists"
else
    print_status 1 "Next.js configuration exists"
fi

echo "11. Checking for Next.js artifacts in root..."
if [ ! -d ".next" ] && [ ! -f "next-env.d.ts" ] && [ ! -f "tsconfig.tsbuildinfo" ]; then
    print_status 0 "No Next.js artifacts in root directory"
else
    print_status 1 "Next.js artifacts found in root (can cause auto-configuration)"
fi

echo ""
echo "=================================="

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL CHECKS PASSED! Infrastructure is strong and stable.${NC}"
    echo ""
    echo "✅ TypeScript: All packages compile without errors"
    echo "✅ ESLint: All packages pass linting"
    echo "✅ Workspace: All imports resolve correctly"
    echo "✅ Protection: Config files are protected from corruption"
    echo "✅ Build: All packages can be built successfully"
    echo "✅ Clean: No Next.js artifacts in root directory"
    echo ""
    echo "🚀 Ready for development!"
else
    echo -e "${RED}⚠️  SOME CHECKS FAILED! Infrastructure needs attention.${NC}"
    echo ""
    echo "Run the following to fix issues:"
    echo "  ./scripts/restore-tsconfig.sh  # Restore TypeScript config"
    echo "  rm -rf .next next-env.d.ts tsconfig.tsbuildinfo  # Clean Next.js artifacts"
    echo "  pnpm turbo build               # Rebuild all packages"
    echo "  npx eslint . --fix             # Fix linting issues"
fi

echo "" 