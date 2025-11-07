#!/bin/bash
# Admin Dashboard Validation Commands
# Run these when pnpm runtime is available
# Date: November 4, 2025

set -e

echo "================================================"
echo "Admin Dashboard Integration Test Suite"
echo "================================================"
echo ""

# Test 1: Admin Dashboard Overview (campus isolation)
echo "▶ Running admin-dashboard-overview.test.ts..."
pnpm vitest --run apps/web/src/test/integration/admin-dashboard-overview.test.ts
echo "✅ Admin dashboard overview tests complete"
echo ""

# Test 2: Admin HiveLab Backend (catalog, reviews, deployments)
echo "▶ Running admin-hivelab-backend.test.ts..."
pnpm vitest --run apps/web/src/test/integration/admin-hivelab-backend.test.ts
echo "✅ Admin HiveLab backend tests complete"
echo ""

echo "================================================"
echo "All integration tests passed! ✅"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Execute manual smoke tests (see ADMIN_DASHBOARD_VALIDATION_GUIDE.md)"
echo "2. Capture screenshots and performance metrics"
echo "3. Package PR with test evidence"
echo ""
