#!/bin/bash

# HIVE Import Path Update Script
# Updates all import paths after lib directory reorganization

set -e

echo "🔄 Updating import paths after lib reorganization..."

cd /Users/laneyfraass/hive_ui

# Function to update imports in a file
update_imports() {
  local file=$1
  
  # Skip node_modules and build directories
  if [[ "$file" == *"node_modules"* ]] || [[ "$file" == *".next"* ]] || [[ "$file" == *"dist"* ]]; then
    return
  fi
  
  # Auth imports
  sed -i '' 's|@/lib/auth-middleware|@/lib/auth/middleware/auth-middleware|g' "$file"
  sed -i '' 's|@/lib/auth-rate-limiter|@/lib/auth/middleware/auth-rate-limiter|g' "$file"
  sed -i '' 's|@/lib/auth-server|@/lib/auth/providers/auth-server|g' "$file"
  sed -i '' 's|@/lib/auth-utils|@/lib/auth/utils/auth-utils|g' "$file"
  sed -i '' 's|@/lib/auth"|@/lib/auth/auth"|g' "$file"
  sed -i '' 's|@/lib/admin-auth|@/lib/auth/middleware/admin-auth|g' "$file"
  
  # Firebase imports
  sed -i '' 's|@/lib/firebase-admin|@/lib/firebase/admin/firebase-admin|g' "$file"
  sed -i '' 's|@/lib/firebase-client|@/lib/firebase/client/firebase-client|g' "$file"
  sed -i '' 's|@/lib/firebase-collections|@/lib/firebase/collections/firebase-collections|g' "$file"
  sed -i '' 's|@/lib/firebase-realtime|@/lib/firebase/client/firebase-realtime|g' "$file"
  
  # API imports
  sed -i '' 's|@/lib/api-middleware|@/lib/api/middleware/api-middleware|g' "$file"
  sed -i '' 's|@/lib/api-auth-middleware|@/lib/api/middleware/api-auth-middleware|g' "$file"
  sed -i '' 's|@/lib/api-error-handler|@/lib/api/utils/api-error-handler|g' "$file"
  sed -i '' 's|@/lib/api-response-types|@/lib/api/response-types/api-response-types|g' "$file"
  sed -i '' 's|@/lib/api-client|@/lib/api/api-client|g' "$file"
  
  # Service imports
  sed -i '' 's|@/lib/feed-|@/lib/services/feed/feed-|g' "$file"
  sed -i '' 's|@/lib/notification|@/lib/services/notifications/notification|g' "$file"
  sed -i '' 's|@/lib/realtime|@/lib/services/realtime/realtime|g' "$file"
  sed -i '' 's|@/lib/search|@/lib/services/search/search|g' "$file"
  sed -i '' 's|@/lib/content-moderation|@/lib/services/moderation/content-moderation|g' "$file"
  sed -i '' 's|@/lib/automated-moderation|@/lib/services/moderation/automated-moderation|g' "$file"
  
  # Space imports
  sed -i '' 's|@/lib/space-|@/lib/spaces/space-|g' "$file"
  sed -i '' 's|@/lib/ritual|@/lib/spaces/rituals/ritual|g' "$file"
  
  # Tool imports
  sed -i '' 's|@/lib/tool-|@/lib/tools/tool-|g' "$file"
  sed -i '' 's|@/lib/campus-tools|@/lib/tools/templates/campus-tools|g' "$file"
  
  # Utils imports
  sed -i '' 's|@/lib/validation|@/lib/utils/validation/validation|g' "$file"
  sed -i '' 's|@/lib/config"|@/lib/utils/config"|g' "$file"
  sed -i '' 's|@/lib/constants|@/lib/utils/constants|g' "$file"
  sed -i '' 's|@/lib/cache|@/lib/utils/cache|g' "$file"
  sed -i '' 's|@/lib/avatar-generator|@/lib/utils/generators/avatar-generator|g' "$file"
  
  # Rate limiting
  sed -i '' 's|@/lib/rate-limit|@/lib/api/middleware/rate-limit|g' "$file"
}

# Find all TypeScript and JavaScript files
echo "📝 Finding all TypeScript and JavaScript files..."
files=$(find apps/web/src -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) 2>/dev/null)

total=$(echo "$files" | wc -l)
current=0

echo "🔄 Updating $total files..."

for file in $files; do
  current=$((current + 1))
  if [ $((current % 50)) -eq 0 ]; then
    echo "  Progress: $current/$total files..."
  fi
  update_imports "$file"
done

echo ""
echo "✅ Import paths updated successfully!"
echo ""
echo "📊 Summary:"
echo "- Updated $total files"
echo "- Reorganized imports to match new directory structure"
echo ""
echo "Next steps:"
echo "1. Run 'pnpm typecheck' to verify imports"
echo "2. Run 'pnpm build' to ensure everything compiles"
echo "3. Test the application"