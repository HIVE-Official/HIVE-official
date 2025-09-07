#!/bin/bash

# HIVE Error Counting Script
# Provides detailed breakdown of all errors and warnings

echo "🔍 HIVE Codebase Health Check - $(date)"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to count errors in a specific package
count_package_errors() {
    local package_name=$1
    local filter_name=$2
    
    echo -e "${BLUE}📦 Checking $package_name...${NC}"
    
    # TypeScript errors
    ts_errors=$(NODE_OPTIONS='--max-old-space-size=4096' pnpm --filter $filter_name typecheck 2>&1 | grep "error TS" | wc -l || echo "0")
    
    # ESLint errors
    lint_errors=$(NODE_OPTIONS='--max-old-space-size=4096' pnpm --filter $filter_name lint --quiet 2>&1 | grep "error" | wc -l || echo "0")
    
    # ESLint warnings
    lint_warnings=$(NODE_OPTIONS='--max-old-space-size=4096' pnpm --filter $filter_name lint 2>&1 | grep "warning" | wc -l || echo "0")
    
    echo "  TypeScript Errors: $ts_errors"
    echo "  ESLint Errors: $lint_errors"
    echo "  ESLint Warnings: $lint_warnings"
    echo ""
    
    # Add to totals
    total_ts_errors=$((total_ts_errors + ts_errors))
    total_lint_errors=$((total_lint_errors + lint_errors))
    total_lint_warnings=$((total_lint_warnings + lint_warnings))
}

# Initialize counters
total_ts_errors=0
total_lint_errors=0
total_lint_warnings=0

# Check each package
count_package_errors "Web App" "web"
count_package_errors "Admin App" "admin"  
count_package_errors "UI Package" "@hive/ui"
count_package_errors "Core Package" "@hive/core"
count_package_errors "Hooks Package" "@hive/hooks"
count_package_errors "Analytics Package" "@hive/analytics"
count_package_errors "Auth Logic Package" "@hive/auth-logic"

# Calculate severity levels
critical_errors=$((total_ts_errors + total_lint_errors))

echo "=============================================="
echo "📊 SUMMARY REPORT"
echo "=============================================="

if [ $critical_errors -gt 100 ]; then
    echo -e "${RED}🚨 CRITICAL STATUS: $critical_errors critical errors${NC}"
    echo -e "${RED}❌ DEPLOYMENT BLOCKED${NC}"
    status="CRITICAL"
elif [ $critical_errors -gt 50 ]; then
    echo -e "${YELLOW}⚠️  HIGH RISK: $critical_errors critical errors${NC}"
    echo -e "${YELLOW}⚠️  REVIEW REQUIRED${NC}"
    status="HIGH"
elif [ $critical_errors -gt 10 ]; then
    echo -e "${YELLOW}📝 MEDIUM RISK: $critical_errors critical errors${NC}"
    echo -e "${YELLOW}📋 PLAN FIXES${NC}"
    status="MEDIUM"
else
    echo -e "${GREEN}✅ HEALTHY: $critical_errors critical errors${NC}"
    echo -e "${GREEN}🚀 READY FOR DEVELOPMENT${NC}"
    status="HEALTHY"
fi

echo ""
echo "Breakdown:"
echo "  TypeScript Errors: $total_ts_errors"
echo "  ESLint Errors: $total_lint_errors"  
echo "  ESLint Warnings: $total_lint_warnings"
echo "  Total Critical: $critical_errors"

# Build test
echo ""
echo -e "${BLUE}🔨 Testing Build Process...${NC}"
build_result=$(NODE_OPTIONS='--max-old-space-size=4096' pnpm build --dry-run > /dev/null 2>&1 && echo "PASS" || echo "FAIL")

if [ "$build_result" = "PASS" ]; then
    echo -e "${GREEN}✅ Build: PASS${NC}"
else
    echo -e "${RED}❌ Build: FAIL${NC}"
    status="CRITICAL"
fi

# Save results to log
echo "$(date),TypeScript,$total_ts_errors,ESLint,$total_lint_errors,Warnings,$total_lint_warnings,Status,$status,Build,$build_result" >> error-history.csv

echo ""
echo "=============================================="
echo "📝 RECOMMENDATIONS"
echo "=============================================="

if [ "$status" = "CRITICAL" ]; then
    echo "1. 🛑 STOP all feature development"
    echo "2. 🔧 Focus on fixing critical errors immediately"
    echo "3. 🚨 Consider reverting to last stable commit"
    echo "4. 📋 Run: pnpm fix-critical-errors"
elif [ "$status" = "HIGH" ]; then
    echo "1. ⚠️  Review errors before continuing development"
    echo "2. 🔧 Plan error resolution this session"
    echo "3. 📋 Run: pnpm fix-high-priority-errors"
elif [ "$status" = "MEDIUM" ]; then
    echo "1. 📝 Document current errors"
    echo "2. 🔧 Include fixes in current sprint"
    echo "3. 📋 Run: pnpm fix-medium-priority-errors"
else
    echo "1. ✅ Codebase is healthy for development"
    echo "2. 🚀 Continue with planned features"
    echo "3. 📋 Monitor for new errors during development"
fi

echo ""
echo "Run 'pnpm error-details' for specific error locations"