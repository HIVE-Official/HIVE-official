#!/bin/bash

# Fix internal imports within lib directory after reorganization

set -e

echo "🔧 Fixing internal lib imports..."

cd /Users/laneyfraass/hive_ui

# Fix structured-logger relative imports
echo "Fixing structured-logger relative imports..."
find apps/web/src/lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from '\.\./\.\./structured-logger'|from '../../utils/structured-logger'|g" \
  -e "s|from '\.\./structured-logger'|from '../utils/structured-logger'|g" \
  -e "s|from '\./structured-logger'|from './utils/structured-logger'|g" {} \;

# Fix firebase-admin relative imports  
echo "Fixing firebase-admin relative imports..."
find apps/web/src/lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from '\./firebase-admin'|from '../firebase/admin/firebase-admin'|g" \
  -e "s|from '\.\./firebase-admin'|from '../../firebase/admin/firebase-admin'|g" \
  -e "s|from '\.\./\.\./firebase-admin'|from '../../../firebase/admin/firebase-admin'|g" {} \;

# Fix firebase-client relative imports
echo "Fixing firebase-client relative imports..."
find apps/web/src/lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from '\./firebase-client'|from './firebase/client/firebase-client'|g" \
  -e "s|from '\.\./firebase-client'|from '../firebase/client/firebase-client'|g" \
  -e "s|from '\.\./\.\./firebase-client'|from '../../firebase/client/firebase-client'|g" {} \;

# Fix specific files with known issues
echo "Fixing specific file imports..."

# auth.ts firebase-admin import
sed -i '' "s|from '\./firebase-admin'|from '../firebase/admin/firebase-admin'|g" apps/web/src/lib/auth/auth.ts

# auth-server.ts firebase-admin import  
sed -i '' "s|from '\./firebase-admin'|from '../../firebase/admin/firebase-admin'|g" apps/web/src/lib/auth/providers/auth-server.ts

# api-auth-middleware structured-logger import
sed -i '' "s|from '\.\./\.\./structured-logger'|from '../../utils/structured-logger'|g" apps/web/src/lib/api/middleware/api-auth-middleware.ts

# rate-limit-simple structured-logger import
sed -i '' "s|from '\.\./\.\./structured-logger'|from '../../utils/structured-logger'|g" apps/web/src/lib/api/middleware/rate-limit-simple.ts

# calendar-sync firebase-client import
sed -i '' "s|from '\./firebase-client'|from './firebase/client/firebase-client'|g" apps/web/src/lib/calendar-sync.ts

echo "✅ Internal lib imports fixed!"