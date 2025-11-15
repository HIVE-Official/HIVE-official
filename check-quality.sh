#!/bin/bash
# Quality Check Script - Always shows comprehensive results
# Run this to see ALL errors and warnings across ALL packages

echo "=================================================="
echo "🔍 HIVE CODEBASE QUALITY CHECK"
echo "=================================================="
echo ""

echo "📊 TypeScript Type Checking (All Packages)"
echo "--------------------------------------------------"
echo "Running: pnpm typecheck"
echo ""

NODE_OPTIONS="--max-old-space-size=4096" pnpm typecheck 2>&1 | tee /tmp/hive-typecheck.log

echo ""
echo "TypeScript Error Summary:"
TOTAL_TS_ERRORS=$(grep "error TS" /tmp/hive-typecheck.log | wc -l | xargs)
echo "  Total Errors: $TOTAL_TS_ERRORS"

# Count web errors
WEB_TS_ERRORS=$(grep "^web:typecheck.*error TS" /tmp/hive-typecheck.log | wc -l | xargs)
echo "  - apps/web: $WEB_TS_ERRORS errors"

# Count admin errors
ADMIN_TS_ERRORS=$(grep "^admin:typecheck.*error TS" /tmp/hive-typecheck.log | wc -l | xargs)
echo "  - apps/admin: $ADMIN_TS_ERRORS errors"

echo ""
echo "=================================================="
echo ""

echo "🎨 ESLint Linting (All Packages)"
echo "--------------------------------------------------"
echo "Running: pnpm lint"
echo ""

NODE_OPTIONS="--max-old-space-size=4096" pnpm lint 2>&1 | tee /tmp/hive-lint.log

echo ""
echo "ESLint Error/Warning Summary:"
WEB_LINT=$(grep "^web:lint.*✖" /tmp/hive-lint.log | tail -1)
ADMIN_LINT=$(grep "^admin:lint.*✖" /tmp/hive-lint.log | tail -1)

echo "  web: $WEB_LINT"
echo "  admin: $ADMIN_LINT"

echo ""
echo "=================================================="
echo "✅ Quality check complete!"
echo ""
echo "All packages are now being checked:"
echo "  - TypeScript: 13 packages"
echo "  - ESLint: 12 packages"
echo ""
echo "Logs saved to:"
echo "  - /tmp/hive-typecheck.log"
echo "  - /tmp/hive-lint.log"
echo "=================================================="
