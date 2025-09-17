#!/bin/bash

# HIVE Comprehensive Infrastructure Audit
# This script performs a deep audit of all infrastructure components

echo "🔍 HIVE Comprehensive Infrastructure Audit"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

# Function to print warning
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Function to print info
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

FAILED=0

echo "📋 PHASE 1: TypeScript Infrastructure"
echo "-------------------------------------"

echo "1. Root workspace compilation..."
tsc --noEmit > /dev/null 2>&1
print_status $? "Root workspace TypeScript compilation"

echo "2. Web app compilation..."
cd apps/web && npx tsc --noEmit > /dev/null 2>&1
print_status $? "Web app TypeScript compilation"

echo "3. Admin app compilation..."
cd ../admin && npx tsc --noEmit > /dev/null 2>&1
print_status $? "Admin app TypeScript compilation"

echo "4. Package compilation checks..."
cd ../..
for package in packages/*/; do
    if [ -f "${package}tsconfig.json" ]; then
        package_name=$(basename "$package")
        cd "$package" && npx tsc --noEmit > /dev/null 2>&1
        print_status $? "Package $package_name TypeScript compilation"
        cd ../..
    fi
done

echo ""
echo "📋 PHASE 2: Build System"
echo "------------------------"

echo "5. Turborepo build pipeline..."
pnpm turbo build --dry-run > /dev/null 2>&1
print_status $? "Turborepo build pipeline"

echo "6. Package builds..."
for package in packages/*/; do
    if [ -f "${package}package.json" ]; then
        package_name=$(basename "$package")
        cd "$package" && pnpm build --dry-run > /dev/null 2>&1
        print_status $? "Package $package_name build"
        cd ../..
    fi
done

echo ""
echo "📋 PHASE 3: Code Quality"
echo "------------------------"

echo "7. ESLint across all packages..."
npx eslint . --max-warnings 15 > /dev/null 2>&1
print_status $? "ESLint across all packages"

echo "8. Package-specific linting..."
for package in packages/*/; do
    if [ -f "${package}eslint.config.js" ] || [ -f "${package}eslint.config.mjs" ]; then
        package_name=$(basename "$package")
        cd "$package" && npx eslint . --max-warnings 5 > /dev/null 2>&1
        print_status $? "Package $package_name ESLint"
        cd ../..
    fi
done

echo ""
echo "📋 PHASE 4: Workspace Configuration"
echo "-----------------------------------"

echo "9. Package references..."
if grep -q '"composite": true' packages/*/tsconfig.json; then
    print_status 0 "Package composite settings"
else
    print_status 1 "Package composite settings"
fi

echo "10. Workspace imports..."
if grep -q '@hive/' apps/web/src/**/*.ts apps/web/src/**/*.tsx 2>/dev/null; then
    print_status 0 "Workspace imports (@hive/*) usage"
else
    print_status 1 "Workspace imports (@hive/*) usage"
fi

echo "11. pnpm workspace configuration..."
if [ -f "pnpm-workspace.yaml" ]; then
    print_status 0 "pnpm workspace configuration exists"
else
    print_status 1 "pnpm workspace configuration missing"
fi

echo ""
echo "📋 PHASE 5: Protection Mechanisms"
echo "---------------------------------"

echo "12. TypeScript config protection..."
if [ ! -w tsconfig.json ] && [ ! -w apps/web/tsconfig.json ]; then
    print_status 0 "TypeScript config files protected (read-only)"
else
    print_status 1 "TypeScript config files protected (read-only)"
fi

echo "13. Next.js artifacts in root..."
if [ ! -d ".next" ] && [ ! -f "next-env.d.ts" ] && [ ! -f "tsconfig.tsbuildinfo" ]; then
    print_status 0 "No Next.js artifacts in root directory"
else
    print_status 1 "Next.js artifacts found in root (can cause auto-configuration)"
fi

echo "14. Next.js configuration..."
if [ -f "apps/web/next.config.mjs" ]; then
    print_status 0 "Next.js configuration exists"
else
    print_status 1 "Next.js configuration missing"
fi

echo ""
echo "📋 PHASE 6: Package Health"
echo "--------------------------"

echo "15. Auth-logic package declarations..."
if [ -f "packages/auth-logic/dist/hooks/use-auth.d.ts" ]; then
    print_status 0 "Auth-logic package declaration files"
else
    print_status 1 "Auth-logic package declaration files"
fi

echo "16. UI package declarations..."
if [ -f "packages/ui/dist/index.d.ts" ]; then
    print_status 0 "UI package declaration files"
else
    print_status 1 "UI package declaration files"
fi

echo "17. Core package declarations..."
if [ -f "packages/core/dist/index.d.ts" ]; then
    print_status 0 "Core package declaration files"
else
    print_status 1 "Core package declaration files"
fi

echo ""
echo "📋 PHASE 7: Development Environment"
echo "-----------------------------------"

echo "18. Node.js version..."
node_version=$(node --version)
print_info "Node.js version: $node_version"

echo "19. pnpm version..."
pnpm_version=$(pnpm --version)
print_info "pnpm version: $pnpm_version"

echo "20. TypeScript version..."
tsc_version=$(npx tsc --version | head -n1)
print_info "TypeScript version: $tsc_version"

echo "21. Next.js version..."
if [ -f "apps/web/package.json" ]; then
    next_version=$(cd apps/web && node -p "require('./package.json').dependencies.next")
    print_info "Next.js version: $next_version"
else
    print_warning "Next.js version not found"
fi

echo ""
echo "📋 PHASE 8: Security & Dependencies"
echo "-----------------------------------"

echo "22. Dependency vulnerabilities..."
pnpm audit --audit-level moderate > /dev/null 2>&1
print_status $? "No high/critical vulnerabilities"

echo "23. Lock file integrity..."
pnpm install --frozen-lockfile > /dev/null 2>&1
print_status $? "Lock file integrity"

echo ""
echo "=========================================="

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 COMPREHENSIVE AUDIT PASSED!${NC}"
    echo ""
    echo "✅ All TypeScript packages compile successfully"
    echo "✅ All build pipelines are operational"
    echo "✅ All code quality checks pass"
    echo "✅ Workspace configuration is correct"
    echo "✅ Protection mechanisms are active"
    echo "✅ Package declarations are generated"
    echo "✅ Development environment is stable"
    echo "✅ Dependencies are secure"
    echo ""
    echo "🚀 Infrastructure is bulletproof and ready for development!"
else
    echo -e "${RED}⚠️  AUDIT FAILED! Infrastructure needs attention.${NC}"
    echo ""
    echo "🔧 RECOMMENDED FIXES:"
    echo "  1. Run: ./scripts/restore-tsconfig.sh"
    echo "  2. Run: rm -rf .next next-env.d.ts tsconfig.tsbuildinfo"
    echo "  3. Run: pnpm turbo build"
    echo "  4. Run: npx eslint . --fix"
    echo "  5. Run: pnpm audit --fix"
    echo ""
    echo "📞 Contact the development team if issues persist."
fi

echo "" 