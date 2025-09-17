#!/bin/bash

# HIVE Pre-commit Hook
# Ensures code quality before every commit

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 HIVE Pre-commit Checks${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Get list of staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx)$' || true)

if [ -z "$STAGED_FILES" ]; then
    echo -e "${GREEN}✓ No TypeScript/JavaScript files to check${NC}"
    exit 0
fi

echo -e "${YELLOW}Checking ${NC}$(echo "$STAGED_FILES" | wc -l)${YELLOW} staged files...${NC}\n"

# 1. Check for console statements in staged files
echo -e "${YELLOW}→ Console statements${NC}"
CONSOLE_FOUND=false
for file in $STAGED_FILES; do
    if grep -q "console\.\(log\|debug\|info\)" "$file" 2>/dev/null; then
        echo -e "  ${RED}✗ Found in: $file${NC}"
        CONSOLE_FOUND=true
    fi
done

if [ "$CONSOLE_FOUND" = false ]; then
    echo -e "  ${GREEN}✓ No console statements${NC}"
fi

# 2. Check for TypeScript errors in staged files
echo -e "\n${YELLOW}→ TypeScript validation${NC}"
ERROR_COUNT=0
for file in $STAGED_FILES; do
    if [[ "$file" == *.ts || "$file" == *.tsx ]]; then
        if ! NODE_OPTIONS='--max-old-space-size=2048' npx tsc --noEmit --skipLibCheck "$file" 2>/dev/null; then
            echo -e "  ${RED}✗ Error in: $file${NC}"
            ((ERROR_COUNT++))
        fi
    fi
done

if [ $ERROR_COUNT -eq 0 ]; then
    echo -e "  ${GREEN}✓ All files pass TypeScript${NC}"
else
    echo -e "  ${RED}✗ $ERROR_COUNT files have TypeScript errors${NC}"
fi

# 3. Check for TODO comments
echo -e "\n${YELLOW}→ TODO comments${NC}"
TODO_COUNT=$(grep -n "TODO\|FIXME\|HACK" $STAGED_FILES 2>/dev/null | wc -l || echo 0)
if [ "$TODO_COUNT" -gt 0 ]; then
    echo -e "  ${YELLOW}⚠ Found $TODO_COUNT TODO/FIXME/HACK comments${NC}"
    grep -n "TODO\|FIXME\|HACK" $STAGED_FILES 2>/dev/null | head -5 || true
else
    echo -e "  ${GREEN}✓ No TODO comments${NC}"
fi

# 4. Check for hardcoded values
echo -e "\n${YELLOW}→ Hardcoded values${NC}"
HARDCODED_FOUND=false

# Check for hardcoded URLs
if echo "$STAGED_FILES" | xargs grep -E "(http://localhost|https://localhost|127\.0\.0\.1)" 2>/dev/null | grep -v "env\|config" > /dev/null; then
    echo -e "  ${YELLOW}⚠ Found hardcoded localhost URLs${NC}"
    HARDCODED_FOUND=true
fi

# Check for hardcoded Firebase project IDs
if echo "$STAGED_FILES" | xargs grep -E "hive-[0-9a-f]+" 2>/dev/null | grep -v "env\|config" > /dev/null; then
    echo -e "  ${YELLOW}⚠ Found hardcoded Firebase project IDs${NC}"
    HARDCODED_FOUND=true
fi

if [ "$HARDCODED_FOUND" = false ]; then
    echo -e "  ${GREEN}✓ No hardcoded values${NC}"
fi

# 5. Check file sizes
echo -e "\n${YELLOW}→ File sizes${NC}"
LARGE_FILES=false
for file in $STAGED_FILES; do
    SIZE=$(wc -l < "$file")
    if [ "$SIZE" -gt 500 ]; then
        echo -e "  ${YELLOW}⚠ Large file: $file ($SIZE lines)${NC}"
        LARGE_FILES=true
    fi
done

if [ "$LARGE_FILES" = false ]; then
    echo -e "  ${GREEN}✓ All files reasonable size${NC}"
fi

# 6. Run quick lint on staged files
echo -e "\n${YELLOW}→ ESLint check${NC}"
if NODE_OPTIONS='--max-old-space-size=2048' npx eslint $STAGED_FILES --max-warnings 0 > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓ All files pass linting${NC}"
else
    LINT_WARNINGS=$(NODE_OPTIONS='--max-old-space-size=2048' npx eslint $STAGED_FILES --format=compact 2>/dev/null | wc -l)
    echo -e "  ${YELLOW}⚠ $LINT_WARNINGS linting warnings${NC}"
fi

# Final decision
echo -e "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$CONSOLE_FOUND" = true ] || [ $ERROR_COUNT -gt 0 ]; then
    echo -e "${RED}❌ Commit blocked - Fix errors above${NC}"
    echo -e "Run ${BLUE}pnpm workflow:fix${NC} to auto-fix issues"
    exit 1
else
    echo -e "${GREEN}✅ Pre-commit checks passed${NC}"
    echo -e "Proceeding with commit..."
fi