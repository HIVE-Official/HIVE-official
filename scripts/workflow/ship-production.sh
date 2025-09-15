#!/bin/bash

# HIVE Ship to Production Workflow
# Complete checks before deploying to production

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

echo -e "${MAGENTA}🚀 HIVE Production Deployment Checklist${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Track overall readiness
READY_TO_SHIP=true
WARNINGS=0
ERRORS=0

# Helper functions
check_pass() {
    echo -e "  ${GREEN}✓ $1${NC}"
}

check_warn() {
    echo -e "  ${YELLOW}⚠ $1${NC}"
    ((WARNINGS++))
}

check_fail() {
    echo -e "  ${RED}✗ $1${NC}"
    ((ERRORS++))
    READY_TO_SHIP=false
}

# 1. Branch Check
echo -e "\n${CYAN}📌 Branch & Git Status${NC}"
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "staging" ]; then
    check_pass "On production branch: $CURRENT_BRANCH"
else
    check_warn "Not on main/staging branch (current: $CURRENT_BRANCH)"
fi

if [ -z "$(git status --porcelain)" ]; then
    check_pass "Working directory clean"
else
    check_fail "Uncommitted changes present"
fi

# Check if up to date with remote
git fetch origin > /dev/null 2>&1
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/$CURRENT_BRANCH)
if [ "$LOCAL" = "$REMOTE" ]; then
    check_pass "Branch up to date with remote"
else
    check_fail "Branch not synced with remote"
fi

# 2. Code Quality Checks
echo -e "\n${CYAN}🔍 Code Quality${NC}"

# TypeScript
echo -n "  Checking TypeScript... "
if NODE_OPTIONS='--max-old-space-size=4096' pnpm typecheck > /dev/null 2>&1; then
    check_pass "TypeScript validation passed"
else
    check_fail "TypeScript errors found"
fi

# ESLint
echo -n "  Checking ESLint... "
LINT_OUTPUT=$(NODE_OPTIONS='--max-old-space-size=4096' npx eslint apps/web/src --format=compact 2>&1 | grep -E "problem|warning" | tail -1 || echo "0 problems")
if echo "$LINT_OUTPUT" | grep -q "0 problems"; then
    check_pass "No linting errors"
else
    LINT_ERRORS=$(echo "$LINT_OUTPUT" | grep -oE "[0-9]+ error" | grep -oE "[0-9]+" || echo "0")
    LINT_WARNINGS=$(echo "$LINT_OUTPUT" | grep -oE "[0-9]+ warning" | grep -oE "[0-9]+" || echo "0")
    if [ "$LINT_ERRORS" -gt 0 ]; then
        check_fail "ESLint: $LINT_ERRORS errors, $LINT_WARNINGS warnings"
    else
        check_warn "ESLint: $LINT_WARNINGS warnings"
    fi
fi

# 3. Build Validation
echo -e "\n${CYAN}🏗️ Build Status${NC}"
echo -n "  Running production build... "
if NODE_OPTIONS='--max-old-space-size=8192' pnpm build > /dev/null 2>&1; then
    check_pass "Production build successful"

    # Check bundle size
    if [ -d "apps/web/.next" ]; then
        BUNDLE_SIZE=$(du -sh apps/web/.next | cut -f1)
        check_pass "Bundle size: $BUNDLE_SIZE"
    fi
else
    check_fail "Production build failed"
fi

# 4. Security Checks
echo -e "\n${CYAN}🔒 Security${NC}"

# Check for exposed secrets
echo -n "  Checking for exposed secrets... "
SECRET_PATTERNS="(api[_-]?key|secret|password|token|private[_-]?key)"
if grep -rEi "$SECRET_PATTERNS" apps/web/src --include="*.ts" --include="*.tsx" | grep -v "process.env" | grep -v "// " > /dev/null 2>&1; then
    check_fail "Potential exposed secrets found"
else
    check_pass "No exposed secrets"
fi

# Check for console.log statements
CONSOLE_COUNT=$(grep -r "console\.\(log\|debug\)" apps/web/src packages/ui/src --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)
if [ "$CONSOLE_COUNT" -eq 0 ]; then
    check_pass "No console.log statements"
else
    check_warn "Found $CONSOLE_COUNT console statements"
fi

# Check environment variables
if [ -f ".env.production" ]; then
    check_pass "Production environment file exists"
else
    check_warn "No .env.production file"
fi

# 5. Testing Status
echo -e "\n${CYAN}🧪 Testing${NC}"

# Unit tests
if [ -f "package.json" ] && grep -q "\"test\":" "package.json"; then
    echo -n "  Running tests... "
    if pnpm test > /dev/null 2>&1; then
        check_pass "All tests passing"
    else
        check_warn "Some tests failing"
    fi
else
    check_warn "No test suite configured"
fi

# 6. Performance Checks
echo -e "\n${CYAN}⚡ Performance${NC}"

# Check for large files
LARGE_FILES=$(find apps/web/src -type f -name "*.ts" -o -name "*.tsx" | xargs wc -l | awk '$1 > 500 {print $2}' | wc -l)
if [ "$LARGE_FILES" -eq 0 ]; then
    check_pass "No overly large components"
else
    check_warn "Found $LARGE_FILES files > 500 lines"
fi

# Check image optimization
UNOPTIMIZED_IMAGES=$(find apps/web/public -type f \( -name "*.jpg" -o -name "*.png" \) -size +500k 2>/dev/null | wc -l)
if [ "$UNOPTIMIZED_IMAGES" -eq 0 ]; then
    check_pass "All images optimized"
else
    check_warn "Found $UNOPTIMIZED_IMAGES unoptimized images (>500KB)"
fi

# 7. Database & Firebase
echo -e "\n${CYAN}🔥 Firebase Status${NC}"

# Check Firebase configuration
if [ -f "firebase.json" ]; then
    check_pass "Firebase configuration present"
else
    check_fail "Missing firebase.json"
fi

# Check Firestore rules
if [ -f "firestore.rules" ]; then
    RULES_DATE=$(date -r firestore.rules +%s)
    NOW=$(date +%s)
    DAYS_OLD=$(( (NOW - RULES_DATE) / 86400 ))
    if [ "$DAYS_OLD" -lt 30 ]; then
        check_pass "Firestore rules recently updated"
    else
        check_warn "Firestore rules not updated in $DAYS_OLD days"
    fi
else
    check_warn "No Firestore rules file"
fi

# 8. Documentation
echo -e "\n${CYAN}📚 Documentation${NC}"

if [ -f "README.md" ]; then
    check_pass "README.md exists"
else
    check_warn "Missing README.md"
fi

if [ -f "CHANGELOG.md" ]; then
    check_pass "CHANGELOG.md exists"
else
    check_warn "No CHANGELOG.md"
fi

# 9. Monitoring Setup
echo -e "\n${CYAN}📊 Monitoring${NC}"

# Check for error boundary
if grep -r "ErrorBoundary" apps/web/src --include="*.tsx" > /dev/null 2>&1; then
    check_pass "Error boundaries implemented"
else
    check_warn "No error boundaries found"
fi

# Check for analytics
if grep -r "analytics\|gtag\|posthog" apps/web/src --include="*.ts" --include="*.tsx" > /dev/null 2>&1; then
    check_pass "Analytics tracking present"
else
    check_warn "No analytics implementation found"
fi

# 10. Final Summary
echo -e "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${CYAN}📋 Deployment Summary${NC}"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo -e "Errors:   ${RED}$ERRORS${NC}"
echo -e "Warnings: ${YELLOW}$WARNINGS${NC}"

if [ "$READY_TO_SHIP" = true ]; then
    if [ "$WARNINGS" -eq 0 ]; then
        echo -e "\n${GREEN}✅ READY TO DEPLOY!${NC}"
        echo -e "All checks passed perfectly."
    else
        echo -e "\n${GREEN}✅ Ready to deploy${NC} ${YELLOW}(with $WARNINGS warnings)${NC}"
        echo -e "Review warnings above before deploying."
    fi

    echo -e "\n${CYAN}Deployment commands:${NC}"
    echo -e "  ${BLUE}firebase deploy${NC}          - Deploy to Firebase"
    echo -e "  ${BLUE}vercel --prod${NC}            - Deploy to Vercel"
    echo -e "  ${BLUE}git tag -a v1.0.0 -m \"Release v1.0.0\"${NC}"
    echo -e "  ${BLUE}git push origin --tags${NC}"
else
    echo -e "\n${RED}❌ NOT READY TO DEPLOY${NC}"
    echo -e "Fix the $ERRORS errors above before deploying."
    echo -e "\nRun ${BLUE}pnpm workflow:fix${NC} to attempt auto-fixes."
fi

echo ""