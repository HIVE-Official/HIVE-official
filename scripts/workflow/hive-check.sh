#!/bin/bash

# HIVE Development Workflow Check
# Run this before committing or pushing code
# Usage: ./scripts/workflow/hive-check.sh [--fix]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse arguments
FIX_MODE=false
if [[ "$1" == "--fix" ]]; then
    FIX_MODE=true
fi

echo -e "${BLUE}🔧 HIVE Development Workflow Check${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Track overall status
OVERALL_STATUS=0

# Function to run a check
run_check() {
    local name=$1
    local command=$2
    local fix_command=$3

    echo -e "\n${YELLOW}→ ${name}${NC}"

    if eval "$command" > /dev/null 2>&1; then
        echo -e "  ${GREEN}✓ Passed${NC}"
        return 0
    else
        echo -e "  ${RED}✗ Failed${NC}"

        if [ "$FIX_MODE" = true ] && [ -n "$fix_command" ]; then
            echo -e "  ${BLUE}Attempting auto-fix...${NC}"
            if eval "$fix_command"; then
                echo -e "  ${GREEN}✓ Fixed${NC}"
                return 0
            else
                echo -e "  ${RED}✗ Auto-fix failed${NC}"
                OVERALL_STATUS=1
                return 1
            fi
        else
            OVERALL_STATUS=1
            return 1
        fi
    fi
}

# 1. TypeScript Check
run_check "TypeScript Validation" \
    "NODE_OPTIONS='--max-old-space-size=4096' pnpm typecheck" \
    ""

# 2. ESLint Check
run_check "ESLint (Linting)" \
    "NODE_OPTIONS='--max-old-space-size=4096' pnpm lint" \
    "NODE_OPTIONS='--max-old-space-size=4096' pnpm lint --fix"

# 3. Build Check (dry run)
run_check "Build Validation" \
    "NODE_OPTIONS='--max-old-space-size=4096' pnpm build --dry-run" \
    ""

# 4. Import Organization Check
echo -e "\n${YELLOW}→ Import Organization${NC}"
IMPORT_ISSUES=$(grep -r "from '\.\./\.\./\.\." apps/web/src --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)
if [ "$IMPORT_ISSUES" -eq 0 ]; then
    echo -e "  ${GREEN}✓ No deep relative imports${NC}"
else
    echo -e "  ${RED}✗ Found $IMPORT_ISSUES deep relative imports${NC}"
    OVERALL_STATUS=1
fi

# 5. Console Statement Check
echo -e "\n${YELLOW}→ Console Statements${NC}"
CONSOLE_COUNT=$(grep -r "console\.\(log\|debug\|info\)" apps/web/src packages/ui/src --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)
if [ "$CONSOLE_COUNT" -eq 0 ]; then
    echo -e "  ${GREEN}✓ No console statements${NC}"
else
    echo -e "  ${YELLOW}⚠ Found $CONSOLE_COUNT console statements${NC}"
    if [ "$FIX_MODE" = true ]; then
        echo -e "  ${BLUE}Removing console statements...${NC}"
        find apps/web/src packages/ui/src -name "*.ts" -o -name "*.tsx" | \
            xargs sed -i '' '/console\.\(log\|debug\|info\)/d'
        echo -e "  ${GREEN}✓ Removed${NC}"
    fi
fi

# 6. Unused Variables Check
echo -e "\n${YELLOW}→ Unused Variables${NC}"
UNUSED_VARS=$(NODE_OPTIONS='--max-old-space-size=4096' npx eslint apps/web/src --format=compact 2>/dev/null | grep "no-unused-vars" | wc -l)
if [ "$UNUSED_VARS" -eq 0 ]; then
    echo -e "  ${GREEN}✓ No unused variables${NC}"
else
    echo -e "  ${YELLOW}⚠ Found $UNUSED_VARS unused variables${NC}"
fi

# 7. Package Dependency Check
echo -e "\n${YELLOW}→ Package Dependencies${NC}"
if pnpm list --depth=0 > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓ All dependencies installed${NC}"
else
    echo -e "  ${RED}✗ Missing dependencies${NC}"
    if [ "$FIX_MODE" = true ]; then
        echo -e "  ${BLUE}Installing dependencies...${NC}"
        pnpm install
        echo -e "  ${GREEN}✓ Installed${NC}"
    else
        OVERALL_STATUS=1
    fi
fi

# 8. Git Status Check
echo -e "\n${YELLOW}→ Git Status${NC}"
if [ -z "$(git status --porcelain)" ]; then
    echo -e "  ${GREEN}✓ Working directory clean${NC}"
else
    MODIFIED_COUNT=$(git status --porcelain | wc -l)
    echo -e "  ${YELLOW}⚠ $MODIFIED_COUNT files modified${NC}"
fi

# Summary
echo -e "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $OVERALL_STATUS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo -e "Ready to commit and push."
else
    echo -e "${RED}❌ Some checks failed.${NC}"
    if [ "$FIX_MODE" = false ]; then
        echo -e "Run with ${BLUE}--fix${NC} to attempt auto-fixes."
    fi
    exit 1
fi

echo ""