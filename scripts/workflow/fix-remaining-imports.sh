#!/bin/bash

# Fix remaining import issues after moving final files

set -e

echo "🔧 Fixing remaining import issues..."

cd /Users/laneyfraass/hive_ui

# Fix http-status imports
echo "Fixing http-status imports..."
find apps/web/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from '\./http-status'|from '../../utils/http-status'|g" \
  -e "s|from '\.\./http-status'|from '../../utils/http-status'|g" \
  -e "s|from '@/lib/http-status'|from '@/lib/utils/http-status'|g" {} \;

# Fix structured-logger imports
echo "Fixing structured-logger imports..."
find apps/web/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from '\./structured-logger'|from '../../utils/structured-logger'|g" \
  -e "s|from '\.\./structured-logger'|from '../../utils/structured-logger'|g" \
  -e "s|from '@/lib/structured-logger'|from '@/lib/utils/structured-logger'|g" {} \;

# Fix audit-logger imports
echo "Fixing audit-logger imports..."
find apps/web/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from '\./audit-logger'|from '../../services/audit-logger'|g" \
  -e "s|from '\.\./audit-logger'|from '../../services/audit-logger'|g" \
  -e "s|from '@/lib/audit-logger'|from '@/lib/services/audit-logger'|g" {} \;

# Fix admin-activity-logger imports
echo "Fixing admin-activity-logger imports..."
find apps/web/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from '\./admin-activity-logger'|from '../admin-activity-logger'|g" \
  -e "s|from '@/lib/admin-activity-logger'|from '@/lib/auth/middleware/admin-activity-logger'|g" {} \;

# Fix firebase-admin imports in auth.ts
echo "Fixing firebase-admin in auth.ts..."
sed -i '' "s|from '\./firebase-admin'|from '../firebase/admin/firebase-admin'|g" apps/web/src/lib/auth/auth.ts

# Fix firebase-client imports in admin-activity-logger
echo "Fixing firebase-client in admin-activity-logger..."
sed -i '' "s|from '\./firebase-client'|from '../../firebase/client/firebase-client'|g" apps/web/src/lib/auth/middleware/admin-activity-logger.ts

echo "✅ Remaining imports fixed!"