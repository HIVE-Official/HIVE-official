#!/bin/bash

# Final import fixes for reorganized lib structure

set -e

echo "🔧 Fixing final import issues..."

cd /Users/laneyfraass/hive_ui

# Fix spaces page - relative import
echo "Fixing spaces/[spaceId]/page.tsx..."
sed -i '' "s|from '\.\./\.\./\.\./\.\./lib/space-permissions'|from '@/lib/spaces/space-permissions'|g" apps/web/src/app/\(dashboard\)/spaces/\[spaceId\]/page.tsx

# Fix double directory in search service  
echo "Fixing search service imports..."
find apps/web/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|@/lib/services/search/search/search-service|@/lib/services/search/search-service|g" {} \;

# Fix api-client relative imports
echo "Fixing api-client.ts..."
sed -i '' "s|from '\./auth-utils'|from '../auth/utils/auth-utils'|g" apps/web/src/lib/api/api-client.ts

# Fix auth-utils relative imports
echo "Fixing auth-utils.ts config import..."
sed -i '' "s|from '\./config'|from '../../utils/config'|g" apps/web/src/lib/auth/utils/auth-utils.ts

# Fix any other relative imports in lib directory
echo "Fixing remaining relative imports in lib..."
find apps/web/src/lib -type f \( -name "*.ts" -o -name "*.tsx" \) | while read file; do
  # Fix relative imports to config
  sed -i '' "s|from '\./config'|from '../utils/config'|g" "$file"
  sed -i '' "s|from '\.\./config'|from '../../utils/config'|g" "$file"
  
  # Fix relative imports to constants
  sed -i '' "s|from '\./constants'|from '../utils/constants'|g" "$file"
  sed -i '' "s|from '\.\./constants'|from '../../utils/constants'|g" "$file"
done

echo "✅ Final import fixes complete!"