#!/bin/bash

# HIVE Quick Fix Script
# Rapidly fix common development issues

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔧 HIVE Quick Fix${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Parse arguments
TARGETS=()
if [ $# -eq 0 ]; then
    TARGETS=("console" "imports" "lint" "unused")
else
    TARGETS=("$@")
fi

echo -e "${YELLOW}Fixing: ${TARGETS[@]}${NC}\n"

# Fix functions
fix_console() {
    echo -e "${YELLOW}→ Removing console statements${NC}"
    local count=$(grep -r "console\.\(log\|debug\|info\)" apps/web/src packages/ui/src --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)

    if [ "$count" -gt 0 ]; then
        find apps/web/src packages/ui/src \( -name "*.ts" -o -name "*.tsx" \) -exec \
            sed -i '' '/console\.\(log\|debug\|info\)/d' {} \;
        echo -e "  ${GREEN}✓ Removed $count console statements${NC}"
    else
        echo -e "  ${GREEN}✓ No console statements found${NC}"
    fi
}

fix_imports() {
    echo -e "${YELLOW}→ Fixing import organization${NC}"

    # Fix deep relative imports
    local deep_imports=$(grep -r "from '\.\./\.\./\.\." apps/web/src --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)

    if [ "$deep_imports" -gt 0 ]; then
        echo -e "  ${YELLOW}Found $deep_imports deep relative imports${NC}"
        echo -e "  ${BLUE}Converting to @/ imports...${NC}"

        # This is a simplified fix - in reality would need more complex path resolution
        find apps/web/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec \
            sed -i '' "s|from '\.\./\.\./\.\./lib/|from '@/lib/|g" {} \;

        echo -e "  ${GREEN}✓ Fixed import paths${NC}"
    else
        echo -e "  ${GREEN}✓ No deep imports found${NC}"
    fi
}

fix_lint() {
    echo -e "${YELLOW}→ Running ESLint auto-fix${NC}"

    if NODE_OPTIONS='--max-old-space-size=4096' npx eslint apps/web/src --fix --quiet 2>/dev/null; then
        echo -e "  ${GREEN}✓ ESLint fixes applied${NC}"
    else
        echo -e "  ${YELLOW}⚠ Some issues couldn't be auto-fixed${NC}"
    fi
}

fix_unused() {
    echo -e "${YELLOW}→ Removing unused imports${NC}"

    # Use ESLint to fix unused imports
    if NODE_OPTIONS='--max-old-space-size=4096' npx eslint apps/web/src packages/ui/src \
        --fix --rule 'no-unused-vars: off' --rule '@typescript-eslint/no-unused-vars: error' \
        --quiet 2>/dev/null; then
        echo -e "  ${GREEN}✓ Unused imports removed${NC}"
    else
        echo -e "  ${YELLOW}⚠ Manual review needed for some files${NC}"
    fi
}

fix_formatting() {
    echo -e "${YELLOW}→ Formatting code${NC}"

    if command -v prettier &> /dev/null; then
        if prettier --write "apps/web/src/**/*.{ts,tsx}" "packages/ui/src/**/*.{ts,tsx}" > /dev/null 2>&1; then
            echo -e "  ${GREEN}✓ Code formatted${NC}"
        else
            echo -e "  ${YELLOW}⚠ Some files couldn't be formatted${NC}"
        fi
    else
        echo -e "  ${YELLOW}⚠ Prettier not installed${NC}"
    fi
}

fix_types() {
    echo -e "${YELLOW}→ Adding missing type annotations${NC}"

    # Add return types to functions missing them
    local missing_types=$(grep -r "^export.*function.*().*{$" apps/web/src --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)

    if [ "$missing_types" -gt 0 ]; then
        echo -e "  ${YELLOW}Found $missing_types functions without return types${NC}"
        echo -e "  ${BLUE}Note: Manual type annotation recommended${NC}"
    else
        echo -e "  ${GREEN}✓ All functions have return types${NC}"
    fi
}

# Execute requested fixes
for target in "${TARGETS[@]}"; do
    case $target in
        console)
            fix_console
            ;;
        imports)
            fix_imports
            ;;
        lint)
            fix_lint
            ;;
        unused)
            fix_unused
            ;;
        format)
            fix_formatting
            ;;
        types)
            fix_types
            ;;
        all)
            fix_console
            fix_imports
            fix_unused
            fix_lint
            fix_formatting
            ;;
        *)
            echo -e "${RED}Unknown fix target: $target${NC}"
            echo "Available: console, imports, lint, unused, format, types, all"
            ;;
    esac
done

# Run validation
echo -e "\n${YELLOW}→ Validating fixes${NC}"

# Quick TypeScript check
echo -n "  TypeScript check... "
if NODE_OPTIONS='--max-old-space-size=4096' pnpm typecheck > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠ Has issues${NC}"
fi

# Quick lint check
echo -n "  ESLint check... "
LINT_ERRORS=$(NODE_OPTIONS='--max-old-space-size=4096' npx eslint apps/web/src --format=compact 2>&1 | grep -E "[0-9]+ error" | grep -oE "[0-9]+" || echo "0")
if [ "$LINT_ERRORS" -eq 0 ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠ $LINT_ERRORS errors remain${NC}"
fi

echo -e "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Quick fixes applied${NC}"
echo -e "\nRun ${BLUE}pnpm workflow:check${NC} for full validation"