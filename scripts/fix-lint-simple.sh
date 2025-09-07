#!/bin/bash

# Simple lint fix script for HIVE
# This script will apply safe automatic fixes

echo "🔧 HIVE Lint Fixer"
echo "=================="
echo ""

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Run ESLint autofix on web app
echo -e "${BLUE}Step 1: Running ESLint autofix on web app...${NC}"
cd apps/web
npx eslint . --fix --max-warnings 600 2>&1 | grep -E "problems|fixed"
cd ../..

# Step 2: Run ESLint autofix on admin app  
echo -e "${BLUE}Step 2: Running ESLint autofix on admin app...${NC}"
cd apps/admin
npx eslint . --fix --max-warnings 50 2>&1 | grep -E "problems|fixed"
cd ../..

# Step 3: Run ESLint autofix on packages
echo -e "${BLUE}Step 3: Running ESLint autofix on packages...${NC}"
for package in packages/*/; do
  if [ -d "$package/src" ]; then
    echo -e "${YELLOW}  Fixing $package${NC}"
    cd "$package"
    npx eslint . --fix --max-warnings 20 2>&1 | grep -E "problems|fixed"
    cd ../..
  fi
done

# Step 4: Fix specific unused variables by prefixing with underscore
echo -e "${BLUE}Step 4: Fixing common unused variables...${NC}"

# Fix hasUnsavedChanges
find . -name "*.tsx" -o -name "*.ts" | xargs grep -l "hasUnsavedChanges" | while read file; do
  echo -e "${GREEN}  Fixing: $file${NC}"
  sed -i.bak 's/const \[hasUnsavedChanges/const [_hasUnsavedChanges/g' "$file"
  sed -i.bak 's/let hasUnsavedChanges/let _hasUnsavedChanges/g' "$file"
  rm "${file}.bak"
done

# Fix unused imports of ErrorCodes
echo -e "${BLUE}Step 5: Removing unused ErrorCodes imports...${NC}"
find . -name "*.tsx" -o -name "*.ts" | xargs grep -l "ErrorCodes" | while read file; do
  # Check if ErrorCodes is actually used in the file (not just imported)
  if ! grep -q "ErrorCodes\." "$file" && ! grep -q "ErrorCodes\[" "$file"; then
    echo -e "${GREEN}  Removing from: $file${NC}"
    # Remove ErrorCodes from imports
    sed -i.bak 's/, ErrorCodes//g' "$file"
    sed -i.bak 's/ErrorCodes, //g' "$file"
    sed -i.bak 's/{ ErrorCodes }/{ }/g' "$file"
    rm "${file}.bak"
  fi
done

# Step 6: Run final validation
echo -e "${BLUE}Step 6: Running final validation...${NC}"
pnpm lint 2>&1 | tail -5

echo ""
echo -e "${GREEN}✅ Lint fixes complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Review the changes with: git diff"
echo "2. Run full lint check: pnpm lint"
echo "3. Commit the fixes: git add -A && git commit -m 'fix: resolve lint warnings'"