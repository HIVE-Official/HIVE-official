#!/bin/bash

echo "Fixing unused variables in web app..."

cd /Users/laneyfraass/hive_ui

# Fix ErrorCodes imports - prefix with underscore
find apps/web/src -name "*.ts" -o -name "*.tsx" | while read file; do
  if grep -q "import.*ErrorCodes.*from '@hive/core'" "$file"; then
    echo "Fixing ErrorCodes in $file"
    sed -i '' "s/import { ErrorCodes/import { ErrorCodes as _ErrorCodes/g" "$file"
  fi
done

# Fix unused function parameters in API routes
echo "Fixing unused parameters in API routes..."

# Fix spaces API routes
files=(
  "apps/web/src/app/api/spaces/route.ts"
  "apps/web/src/app/api/spaces/[spaceId]/route.ts" 
  "apps/web/src/app/api/spaces/[spaceId]/feed/route.ts"
  "apps/web/src/app/api/spaces/[spaceId]/tools/route.ts"
  "apps/web/src/app/api/spaces/[spaceId]/events/sync-rss/route.ts"
  "apps/web/src/app/api/spaces/auto-join/route.ts"
  "apps/web/src/app/api/spaces/recommendations/route.ts"
  "apps/web/src/app/api/spaces/social-proof/route.ts"
  "apps/web/src/app/api/spaces/search/route.ts"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    
    # Replace unused parameters in function signatures
    sed -i '' 's/userId: string/_userId: string/g' "$file"
    sed -i '' 's/spaceId: string/_spaceId: string/g' "$file"
    sed -i '' 's/currentSpaceIds:/_currentSpaceIds:/g' "$file"
    sed -i '' 's/, context:/, _context:/g' "$file"
  fi
done

# Fix other API routes
echo "Fixing other API routes..."
sed -i '' 's/feedType: string/_feedType: string/g' "apps/web/src/app/api/feed/route.ts" 2>/dev/null || true
sed -i '' 's/timeRange:/_timeRange:/g' "apps/web/src/app/api/analytics/[type]/route.ts" 2>/dev/null || true
sed -i '' 's/ritual:/_ritual:/g' "apps/web/src/app/api/rituals/route.ts" 2>/dev/null || true
sed -i '' 's/, request:/, _request:/g' "apps/web/src/app/api/auth/dev/bypass/route.ts" 2>/dev/null || true

# Fix profile dashboard client
echo "Fixing profile dashboard client..."
sed -i '' 's/const hasUnsavedChanges/const _hasUnsavedChanges/g' "apps/web/src/app/(dashboard)/profile/dashboard/profile-dashboard-client.tsx" 2>/dev/null || true

# Fix integrations page
echo "Fixing integrations page..."
sed -i '' 's/category\]/\_category\]/g' "apps/web/src/app/(dashboard)/profile/integrations/page.tsx" 2>/dev/null || true
sed -i '' 's/, index)/, _index)/g' "apps/web/src/app/(dashboard)/profile/integrations/page.tsx" 2>/dev/null || true

# Fix enhanced spaces system
echo "Fixing enhanced spaces system..."
sed -i '' 's/config)/_config)/g' "apps/web/src/app/(dashboard)/spaces/components/enhanced-spaces-system.tsx" 2>/dev/null || true
sed -i '' 's/recentActivity/_recentActivity/g' "apps/web/src/app/(dashboard)/spaces/components/enhanced-spaces-system.tsx" 2>/dev/null || true

echo "Done fixing unused variables!"