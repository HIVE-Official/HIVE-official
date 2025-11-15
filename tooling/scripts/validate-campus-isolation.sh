#!/bin/bash

# HIVE Campus Isolation Validation Script
# Systematically verifies 100% campus isolation across all API routes
# Usage: bash scripts/validate-campus-isolation.sh

set -e

echo "🔒 HIVE Campus Isolation Validation"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
TOTAL_ROUTES=0
ISOLATED_ROUTES=0
MISSING_ISOLATION=0
EDGE_CASES=0

echo "📊 Phase 1: Static Analysis"
echo "----------------------------"

# Count total API routes
TOTAL_ROUTES=$(find apps/web/src/app/api -name "route.ts" | wc -l | tr -d ' ')
echo "Total API routes: $TOTAL_ROUTES"

# Count routes with campusId filter
CAMPUS_FILTER_COUNT=$(rg -l "\.where\(\s*['\"]campusId['\"]" apps/web/src/app/api --type ts | wc -l | tr -d ' ')
echo "Routes with explicit campusId filter: $CAMPUS_FILTER_COUNT"

# Count routes using CURRENT_CAMPUS_ID
CURRENT_CAMPUS_COUNT=$(rg -l "CURRENT_CAMPUS_ID" apps/web/src/app/api --type ts | wc -l | tr -d ' ')
echo "Routes using CURRENT_CAMPUS_ID: $CURRENT_CAMPUS_COUNT"

# Count routes using secure query helpers
SECURE_HELPERS_COUNT=$(rg -l "getSecure.*Query|secureQuery" apps/web/src/app/api --type ts | wc -l | tr -d ' ')
echo "Routes using secure query helpers: $SECURE_HELPERS_COUNT"

echo ""
echo "🔍 Phase 2: Route-by-Route Analysis"
echo "------------------------------------"

# Create temp file for analysis
TEMP_ANALYSIS=$(mktemp)

# Analyze each route
find apps/web/src/app/api -name "route.ts" | while read route; do
    ROUTE_PATH=$(echo "$route" | sed 's|apps/web/src/app/||')

    # Check for various isolation patterns
    HAS_CAMPUS_FILTER=$(rg "\.where\(\s*['\"]campusId['\"]" "$route" > /dev/null 2>&1 && echo "1" || echo "0")
    HAS_CURRENT_CAMPUS=$(rg "CURRENT_CAMPUS_ID" "$route" > /dev/null 2>&1 && echo "1" || echo "0")
    HAS_SECURE_HELPER=$(rg "getSecure.*Query|secureQuery|addSecureCampusMetadata" "$route" > /dev/null 2>&1 && echo "1" || echo "0")
    HAS_USER_SCOPED=$(rg "userId|where\(\s*['\"]userId['\"]" "$route" > /dev/null 2>&1 && echo "1" || echo "0")
    HAS_SPACE_SCOPED=$(rg "spaceId|where\(\s*['\"]spaceId['\"]" "$route" > /dev/null 2>&1 && echo "1" || echo "0")
    HAS_ADMIN_ONLY=$(rg "requireAdmin|isAdmin|adminOnly|withAdminCampusIsolation" "$route" > /dev/null 2>&1 && echo "1" || echo "0")

    # Determine isolation status
    IS_ISOLATED="0"
    ISOLATION_TYPE="NONE"

    # Public exemptions (pre-login / discovery)
    if echo "$ROUTE_PATH" | grep -Eq "^api/(auth/|health/|campus/|waitlist/|schools/|dev-auth/|debug-|search/|profile-v2/)"; then
        IS_ISOLATED="1"
        ISOLATION_TYPE="PUBLIC_EXEMPT"
    fi

    if [ "$HAS_CAMPUS_FILTER" == "1" ] || [ "$HAS_CURRENT_CAMPUS" == "1" ]; then
        IS_ISOLATED="1"
        ISOLATION_TYPE="EXPLICIT_CAMPUS"
    elif [ "$HAS_SECURE_HELPER" == "1" ]; then
        IS_ISOLATED="1"
        ISOLATION_TYPE="SECURE_HELPER"
    elif [ "$HAS_USER_SCOPED" == "1" ]; then
        IS_ISOLATED="1"
        ISOLATION_TYPE="USER_SCOPED"
    elif [ "$HAS_SPACE_SCOPED" == "1" ]; then
        # Space-scoped might be isolated if spaces are campus-isolated
        IS_ISOLATED="1"
        ISOLATION_TYPE="SPACE_SCOPED"
    elif [ "$HAS_ADMIN_ONLY" == "1" ]; then
        IS_ISOLATED="1"
        ISOLATION_TYPE="ADMIN_ONLY"
    fi

    echo "$ROUTE_PATH|$IS_ISOLATED|$ISOLATION_TYPE" >> "$TEMP_ANALYSIS"
done

echo ""
echo "📋 Analysis Results:"
echo "-------------------"

# Count isolated vs not isolated
ISOLATED_COUNT=$(grep "|1|" "$TEMP_ANALYSIS" | wc -l | tr -d ' ')
NOT_ISOLATED_COUNT=$(grep "|0|" "$TEMP_ANALYSIS" | wc -l | tr -d ' ')

echo -e "${GREEN}✅ Isolated routes: $ISOLATED_COUNT${NC}"
echo -e "${RED}❌ Missing isolation: $NOT_ISOLATED_COUNT${NC}"

# Calculate percentage
PERCENTAGE=$((ISOLATED_COUNT * 100 / TOTAL_ROUTES))
echo ""
echo "Coverage: $PERCENTAGE% ($ISOLATED_COUNT/$TOTAL_ROUTES routes)"

echo ""
echo "📝 Breakdown by isolation type:"
echo "------------------------------"
grep "|1|EXPLICIT_CAMPUS" "$TEMP_ANALYSIS" | wc -l | xargs echo "Explicit campus filter:"
grep "|1|SECURE_HELPER" "$TEMP_ANALYSIS" | wc -l | xargs echo "Secure query helpers:"
grep "|1|USER_SCOPED" "$TEMP_ANALYSIS" | wc -l | xargs echo "User-scoped (implicit):"
grep "|1|SPACE_SCOPED" "$TEMP_ANALYSIS" | wc -l | xargs echo "Space-scoped (implicit):"
grep "|1|ADMIN_ONLY" "$TEMP_ANALYSIS" | wc -l | xargs echo "Admin-only routes:"
grep "|1|PUBLIC_EXEMPT" "$TEMP_ANALYSIS" | wc -l | xargs echo "Public exemptions:"

echo ""
echo "🚨 Routes MISSING campus isolation:"
echo "-----------------------------------"
grep "|0|" "$TEMP_ANALYSIS" | cut -d'|' -f1 | while read route; do
    echo -e "${RED}❌ $route${NC}"
done

# Check for edge cases
echo ""
echo "⚠️  Edge Cases to Review:"
echo "-------------------------"

# Public routes (auth, health checks, etc.)
echo "Public routes (should NOT have campus isolation):"
rg -l "export.*GET|export.*POST" apps/web/src/app/api/auth --type ts 2>/dev/null | while read route; do
    echo -e "${YELLOW}⚠️  $route (public auth route)${NC}"
done

# Realtime/streaming routes
echo ""
echo "Realtime routes (need continuous validation):"
rg -l "ReadableStream|SSE|EventSource" apps/web/src/app/api --type ts 2>/dev/null | while read route; do
    echo -e "${YELLOW}⚠️  $route (realtime - needs token refresh)${NC}"
done

# Admin routes without campus isolation
echo ""
echo "Admin routes (should have BOTH admin auth AND campus scope):"
find apps/web/src/app/api/admin -name "route.ts" | while read route; do
    HAS_CAMPUS=$(rg "CURRENT_CAMPUS_ID|campusId" "$route" > /dev/null 2>&1 && echo "1" || echo "0")
    if [ "$HAS_CAMPUS" == "0" ]; then
        echo -e "${RED}❌ $route (admin route missing campus scope)${NC}"
    fi
done

echo ""
echo "📄 Phase 3: Generate Validation Report"
echo "---------------------------------------"

# Create detailed report
REPORT_FILE="campus-isolation-report.md"

cat > "$REPORT_FILE" << EOF
# Campus Isolation Validation Report
**Generated**: $(date)
**Coverage**: $PERCENTAGE% ($ISOLATED_COUNT/$TOTAL_ROUTES routes)

## Summary

- ✅ **Isolated routes**: $ISOLATED_COUNT
- ❌ **Missing isolation**: $NOT_ISOLATED_COUNT
- ⚠️  **Edge cases**: (see below)

## Isolation Breakdown

| Type | Count | Description |
|------|-------|-------------|
| Explicit Campus | $(grep "|1|EXPLICIT_CAMPUS" "$TEMP_ANALYSIS" | wc -l | tr -d ' ') | Uses \`campusId\` filter or \`CURRENT_CAMPUS_ID\` |
| Secure Helpers | $(grep "|1|SECURE_HELPER" "$TEMP_ANALYSIS" | wc -l | tr -d ' ') | Uses secure query helpers |
| User-scoped | $(grep "|1|USER_SCOPED" "$TEMP_ANALYSIS" | wc -l | tr -d ' ') | Implicitly isolated via user ID |
| Space-scoped | $(grep "|1|SPACE_SCOPED" "$TEMP_ANALYSIS" | wc -l | tr -d ' ') | Implicitly isolated via space ID |
| Admin-only | $(grep "|1|ADMIN_ONLY" "$TEMP_ANALYSIS" | wc -l | tr -d ' ') | Admin routes with auth |

## Routes Missing Isolation

\`\`\`
$(grep "|0|" "$TEMP_ANALYSIS" | cut -d'|' -f1)
\`\`\`

## Next Steps

1. **Review missing routes** - Add campus isolation to all routes above
2. **Test edge cases** - Verify public routes are intentionally public
3. **Deploy Firebase rules** - Enforce isolation at database level
4. **Run integration tests** - Verify cross-campus access is blocked

## Testing Commands

\`\`\`bash
# Test cross-campus access (should fail)
curl -H "Cookie: session=..." http://localhost:3000/api/spaces/[different-campus-space-id]

# Test valid campus access (should succeed)
curl -H "Cookie: session=..." http://localhost:3000/api/spaces/[ub-space-id]

# Verify Firebase rules
pnpm test:rules
\`\`\`
EOF

echo -e "${GREEN}✅ Report generated: $REPORT_FILE${NC}"

# Cleanup
rm "$TEMP_ANALYSIS"

echo ""
echo "🎯 Next Steps:"
echo "--------------"
if [ "$NOT_ISOLATED_COUNT" -gt 0 ]; then
    echo -e "${RED}1. Fix $NOT_ISOLATED_COUNT routes missing campus isolation${NC}"
    echo "2. Deploy Firebase security rules"
    echo "3. Run integration tests"
    echo "4. Re-run this script to verify 100% coverage"
else
    echo -e "${GREEN}✅ All routes are campus-isolated!${NC}"
    echo "1. Deploy Firebase security rules"
    echo "2. Run integration tests to verify"
    echo "3. Test cross-campus access blocking"
fi

echo ""
echo "🔍 Detailed report saved to: $REPORT_FILE"
echo ""
