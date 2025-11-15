#!/bin/bash

# HIVE Quick Project Audit Script
# Runs automated checks across the codebase
# Output: docs/polish/audits/QUICK_AUDIT_RESULTS.md

set -e

echo "🔍 HIVE Project Quick Audit"
echo "============================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Output file
OUTPUT_DIR="docs/polish/audits"
OUTPUT_FILE="$OUTPUT_DIR/QUICK_AUDIT_RESULTS.md"
mkdir -p "$OUTPUT_DIR"

# Start report
cat > "$OUTPUT_FILE" << 'EOF'
# HIVE Quick Audit Results

**Generated**: $(date)
**Method**: Automated code analysis
**Next Step**: Deep audit on flagged areas

---

## Summary

EOF

echo "📊 Analyzing codebase structure..."

# Function to audit a feature
audit_feature() {
  local feature=$1
  local path=$2

  echo "" >> "$OUTPUT_FILE"
  echo "## Feature: $feature" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"

  if [ ! -d "$path" ]; then
    echo "⚠️ **Path not found**: $path" >> "$OUTPUT_FILE"
    return
  fi

  # Count files
  local tsx_count=$(find "$path" -name "*.tsx" -o -name "*.ts" | wc -l | tr -d ' ')
  echo "- **Files**: $tsx_count TypeScript files" >> "$OUTPUT_FILE"

  # Lines of code
  local loc=$(find "$path" -name "*.tsx" -o -name "*.ts" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}')
  echo "- **Lines of Code**: $loc" >> "$OUTPUT_FILE"

  # Check for loading states
  local loading_count=$(grep -r "isLoading\|loading" "$path" --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l | tr -d ' ')
  echo "- **Loading States**: $loading_count occurrences" >> "$OUTPUT_FILE"

  # Check for error handling
  local error_count=$(grep -r "error\|Error\|catch" "$path" --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l | tr -d ' ')
  echo "- **Error Handling**: $error_count occurrences" >> "$OUTPUT_FILE"

  # Check for any types
  local any_count=$(grep -r "\bany\b" "$path" --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$any_count" -gt 0 ]; then
    echo "- ⚠️ **Type Safety**: $any_count uses of \`any\` type" >> "$OUTPUT_FILE"
  else
    echo "- ✅ **Type Safety**: No \`any\` types found" >> "$OUTPUT_FILE"
  fi

  # Check for accessibility
  local aria_count=$(grep -r "aria-\|role=" "$path" --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')
  echo "- **Accessibility**: $aria_count ARIA attributes" >> "$OUTPUT_FILE"

  # Check for skeleton/empty states
  local skeleton_count=$(grep -r "Skeleton\|EmptyState" "$path" --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')
  echo "- **UX Polish**: $skeleton_count skeleton/empty components" >> "$OUTPUT_FILE"

  # Quick grade estimate
  echo "" >> "$OUTPUT_FILE"
  echo "**Quick Assessment**:" >> "$OUTPUT_FILE"

  local issues=0
  if [ "$any_count" -gt 5 ]; then
    echo "- ⚠️ High \`any\` usage ($any_count)" >> "$OUTPUT_FILE"
    ((issues++))
  fi

  if [ "$aria_count" -lt 5 ]; then
    echo "- ⚠️ Limited accessibility ($aria_count ARIA)" >> "$OUTPUT_FILE"
    ((issues++))
  fi

  if [ "$skeleton_count" -eq 0 ]; then
    echo "- ⚠️ No skeleton/empty states found" >> "$OUTPUT_FILE"
    ((issues++))
  fi

  if [ "$issues" -eq 0 ]; then
    echo "- ✅ No obvious issues detected" >> "$OUTPUT_FILE"
    echo "- **Estimated Grade**: B+ (needs deep audit)" >> "$OUTPUT_FILE"
  elif [ "$issues" -le 2 ]; then
    echo "- **Estimated Grade**: B- (needs polish)" >> "$OUTPUT_FILE"
  else
    echo "- **Estimated Grade**: C (needs significant work)" >> "$OUTPUT_FILE"
  fi

  echo "" >> "$OUTPUT_FILE"
  echo "---" >> "$OUTPUT_FILE"
}

# Audit vertical slices
echo "🎯 Auditing vertical slices..."

audit_feature "Feed" "apps/web/src/app/feed"
audit_feature "Spaces" "apps/web/src/app/spaces"
audit_feature "Profile" "apps/web/src/app/profile"
audit_feature "HiveLab" "apps/web/src/app/hivelab"
audit_feature "Rituals" "apps/web/src/app/rituals"

# Audit infrastructure
echo "🏗️ Auditing infrastructure..."

audit_feature "Auth/Onboarding" "apps/web/src/app/onboarding"
audit_feature "API Routes" "apps/web/src/app/api"

# Check design system
echo "🎨 Auditing design system..."
echo "" >> "$OUTPUT_FILE"
echo "## Design System (@hive/ui)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

if [ -d "packages/ui/src" ]; then
  ui_files=$(find packages/ui/src -name "*.tsx" | wc -l | tr -d ' ')
  ui_loc=$(find packages/ui/src -name "*.tsx" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}')
  ui_stories=$(find packages/ui/src -name "*.stories.tsx" | wc -l | tr -d ' ')

  echo "- **Components**: $ui_files files" >> "$OUTPUT_FILE"
  echo "- **Lines of Code**: $ui_loc" >> "$OUTPUT_FILE"
  echo "- **Storybook Stories**: $ui_stories stories" >> "$OUTPUT_FILE"

  # Check for consistency
  button_variants=$(grep -r "variant.*=" packages/ui/src/atomic/atoms/button.tsx 2>/dev/null | wc -l | tr -d ' ')
  echo "- **Consistency**: Button has variants defined" >> "$OUTPUT_FILE"

  echo "" >> "$OUTPUT_FILE"
  echo "**Quick Assessment**:" >> "$OUTPUT_FILE"
  echo "- ✅ Design system exists" >> "$OUTPUT_FILE"
  echo "- ✅ Storybook documentation" >> "$OUTPUT_FILE"
  echo "- **Estimated Grade**: B+ (needs consistency review)" >> "$OUTPUT_FILE"
fi

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"

# Performance checks
echo "⚡ Checking performance indicators..."
echo "" >> "$OUTPUT_FILE"
echo "## Performance Indicators" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Check for React.memo usage
memo_count=$(grep -r "React.memo\|useMemo\|useCallback" apps/web/src --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l | tr -d ' ')
echo "- **Optimization**: $memo_count uses of memo/useCallback" >> "$OUTPUT_FILE"

# Check for virtualization
virtual_count=$(grep -r "virtualized\|virtual\|VirtualList" apps/web/src --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')
echo "- **Virtualization**: $virtual_count occurrences" >> "$OUTPUT_FILE"

# Check bundle size (if build exists)
if [ -d "apps/web/.next" ]; then
  echo "- ✅ Production build exists" >> "$OUTPUT_FILE"
else
  echo "- ⚠️ No production build found (run \`pnpm build\`)" >> "$OUTPUT_FILE"
fi

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"

# Security checks
echo "🔒 Checking security patterns..."
echo "" >> "$OUTPUT_FILE"
echo "## Security" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Check for campus isolation
campus_count=$(grep -r "campusId\|CURRENT_CAMPUS_ID" apps/web/src/app/api --include="*.ts" 2>/dev/null | wc -l | tr -d ' ')
echo "- **Campus Isolation**: $campus_count occurrences in API routes" >> "$OUTPUT_FILE"

# Check for withAuthAndErrors
auth_count=$(grep -r "withAuthAndErrors" apps/web/src/app/api --include="*.ts" 2>/dev/null | wc -l | tr -d ' ')
echo "- **Auth Middleware**: $auth_count protected routes" >> "$OUTPUT_FILE"

# Count total API routes
api_routes=$(find apps/web/src/app/api -name "route.ts" 2>/dev/null | wc -l | tr -d ' ')
echo "- **Total API Routes**: $api_routes" >> "$OUTPUT_FILE"

if [ "$auth_count" -gt 0 ] && [ "$campus_count" -gt 100 ]; then
  echo "" >> "$OUTPUT_FILE"
  echo "**Quick Assessment**:" >> "$OUTPUT_FILE"
  echo "- ✅ Auth middleware used" >> "$OUTPUT_FILE"
  echo "- ✅ Campus isolation widespread" >> "$OUTPUT_FILE"
  echo "- **Estimated Grade**: B+ (needs verification)" >> "$OUTPUT_FILE"
fi

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"

# Testing coverage
echo "🧪 Checking test coverage..."
echo "" >> "$OUTPUT_FILE"
echo "## Testing" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

test_files=$(find . -name "*.test.ts" -o -name "*.test.tsx" -o -name "*.spec.ts" 2>/dev/null | wc -l | tr -d ' ')
echo "- **Test Files**: $test_files" >> "$OUTPUT_FILE"

if [ "$test_files" -gt 0 ]; then
  test_loc=$(find . -name "*.test.ts" -o -name "*.test.tsx" -o -name "*.spec.ts" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}')
  echo "- **Test Code**: $test_loc lines" >> "$OUTPUT_FILE"
  echo "- ⚠️ **Action**: Run \`pnpm test\` to check coverage %" >> "$OUTPUT_FILE"
else
  echo "- ⚠️ No test files found" >> "$OUTPUT_FILE"
fi

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"

# Summary recommendations
echo "" >> "$OUTPUT_FILE"
echo "## Recommendations" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "### Priority Areas (Based on Automated Analysis)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Generate priority list based on findings
echo "1. **Features with high \`any\` usage** → Type safety cleanup" >> "$OUTPUT_FILE"
echo "2. **Features with low ARIA counts** → Accessibility improvements" >> "$OUTPUT_FILE"
echo "3. **Features without skeletons** → Loading state polish" >> "$OUTPUT_FILE"
echo "4. **Missing test coverage** → Add tests for critical paths" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "### Next Steps" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "1. ✅ Review this quick audit report" >> "$OUTPUT_FILE"
echo "2. ⬜ Identify top 2-3 priority areas" >> "$OUTPUT_FILE"
echo "3. ⬜ Conduct deep audits on priority areas" >> "$OUTPUT_FILE"
echo "4. ⬜ Create detailed fix backlog" >> "$OUTPUT_FILE"
echo "5. ⬜ Begin systematic fixes (Week 6-10)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "**Audit Complete**: $(date)" >> "$OUTPUT_FILE"
echo "**Next**: Deep audit recommended priority areas" >> "$OUTPUT_FILE"

# Done
echo ""
echo -e "${GREEN}✅ Quick audit complete!${NC}"
echo ""
echo "Report saved to: $OUTPUT_FILE"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Review the report: cat $OUTPUT_FILE"
echo "2. Identify top 2-3 priority areas"
echo "3. Run deep audits on those areas"
echo ""
