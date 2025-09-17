#!/bin/bash

# HIVE Comprehensive Import Fix After Reorganization
# Fixes all import paths after lib directory reorganization

set -e

echo "🔧 Fixing all imports after reorganization..."

cd /Users/laneyfraass/hive_ui

# Create mapping of old to new paths
declare -A import_map=(
  # Auth
  ["auth-middleware"]="auth/middleware/auth-middleware"
  ["auth-rate-limiter"]="auth/middleware/auth-rate-limiter"
  ["auth-server"]="auth/providers/auth-server"
  ["auth-utils"]="auth/utils/auth-utils"
  ["auth"]="auth/auth"
  ["admin-auth"]="auth/middleware/admin-auth"
  
  # Firebase
  ["firebase-admin"]="firebase/admin/firebase-admin"
  ["firebase-client"]="firebase/client/firebase-client"
  ["firebase-collections"]="firebase/collections/firebase-collections"
  ["firebase-realtime"]="firebase/client/firebase-realtime"
  
  # API
  ["api-middleware"]="api/middleware/api-middleware"
  ["api-auth-middleware"]="api/middleware/api-auth-middleware"
  ["api-error-handler"]="api/utils/api-error-handler"
  ["api-response-types"]="api/response-types/api-response-types"
  ["rate-limit"]="api/middleware/rate-limit"
  ["rate-limit-simple"]="api/middleware/rate-limit-simple"
  
  # Services
  ["feed-service"]="services/feed/feed-service"
  ["notification-service"]="services/notifications/notification-service"
  ["realtime-service"]="services/realtime/realtime-service"
  ["search-service"]="services/search/search-service"
  ["content-moderation-service"]="services/moderation/content-moderation-service"
  
  # Utils
  ["config"]="utils/config"
  ["constants"]="utils/constants"
  ["cache-strategy"]="utils/cache-strategy"
)

# Function to fix imports in a file
fix_file_imports() {
  local file=$1
  local temp_file="${file}.tmp"
  
  # Skip non-source files
  if [[ "$file" == *"node_modules"* ]] || [[ "$file" == *".next"* ]] || [[ "$file" == *"dist"* ]]; then
    return
  fi
  
  cp "$file" "$temp_file"
  
  # Fix each import mapping
  for old_path in "${!import_map[@]}"; do
    new_path="${import_map[$old_path]}"
    
    # Fix @/lib imports
    sed -i '' "s|from '@/lib/${old_path}'|from '@/lib/${new_path}'|g" "$temp_file"
    sed -i '' "s|from \"@/lib/${old_path}\"|from \"@/lib/${new_path}\"|g" "$temp_file"
    
    # Fix relative imports from lib
    sed -i '' "s|from '\.\./lib/${old_path}'|from '../lib/${new_path}'|g" "$temp_file"
    sed -i '' "s|from \"\.\./lib/${old_path}\"|from \"../lib/${new_path}\"|g" "$temp_file"
    
    # Fix dynamic imports
    sed -i '' "s|import('\./src/lib/${old_path}')|import('./src/lib/${new_path}')|g" "$temp_file"
    sed -i '' "s|import(\"\./src/lib/${old_path}\")|import(\"./src/lib/${new_path}\")|g" "$temp_file"
  done
  
  # Only update file if changes were made
  if ! cmp -s "$file" "$temp_file"; then
    mv "$temp_file" "$file"
    echo "  ✓ Fixed: $file"
  else
    rm "$temp_file"
  fi
}

echo "📝 Processing TypeScript/JavaScript files..."

# Process all TypeScript and JavaScript files
find apps/web -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) | while read -r file; do
  fix_file_imports "$file"
done

echo ""
echo "✅ Import fixing complete!"
echo ""
echo "Next steps:"
echo "1. Run 'pnpm typecheck' to verify all imports"
echo "2. Run 'pnpm build' to ensure everything compiles"
echo "3. Test the application locally"