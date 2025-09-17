#!/bin/bash

# HIVE Import Path Fixer - Simplified Version
# Fixes all import paths after lib reorganization

set -e

echo "🔧 Fixing all lib imports after reorganization..."

cd /Users/laneyfraass/hive_ui

# Function to fix imports in a single file
fix_imports_in_file() {
  local file=$1
  
  # Skip non-source files
  if [[ "$file" == *"node_modules"* ]] || [[ "$file" == *".next"* ]] || [[ "$file" == *"dist"* ]]; then
    return
  fi
  
  # Auth imports
  sed -i '' "s|from '@/lib/auth-middleware'|from '@/lib/auth/middleware/auth-middleware'|g" "$file"
  sed -i '' "s|from '@/lib/auth-rate-limiter'|from '@/lib/auth/middleware/auth-rate-limiter'|g" "$file"
  sed -i '' "s|from '@/lib/auth-server'|from '@/lib/auth/providers/auth-server'|g" "$file"
  sed -i '' "s|from '@/lib/auth-utils'|from '@/lib/auth/utils/auth-utils'|g" "$file"
  sed -i '' "s|from '@/lib/auth'|from '@/lib/auth/auth'|g" "$file"
  sed -i '' "s|from '@/lib/admin-auth'|from '@/lib/auth/middleware/admin-auth'|g" "$file"
  
  # Firebase imports
  sed -i '' "s|from '@/lib/firebase-admin'|from '@/lib/firebase/admin/firebase-admin'|g" "$file"
  sed -i '' "s|from '@/lib/firebase-client'|from '@/lib/firebase/client/firebase-client'|g" "$file"
  sed -i '' "s|from '@/lib/firebase-collections'|from '@/lib/firebase/collections/firebase-collections'|g" "$file"
  sed -i '' "s|from '@/lib/firebase-realtime'|from '@/lib/firebase/client/firebase-realtime'|g" "$file"
  
  # API imports  
  sed -i '' "s|from '@/lib/api-middleware'|from '@/lib/api/middleware/api-middleware'|g" "$file"
  sed -i '' "s|from '@/lib/api-auth-middleware'|from '@/lib/api/middleware/api-auth-middleware'|g" "$file"
  sed -i '' "s|from '@/lib/api-error-handler'|from '@/lib/api/utils/api-error-handler'|g" "$file"
  sed -i '' "s|from '@/lib/api-response-types'|from '@/lib/api/response-types/api-response-types'|g" "$file"
  sed -i '' "s|from '@/lib/rate-limit'|from '@/lib/api/middleware/rate-limit'|g" "$file"
  
  # Fix relative imports from scripts or other locations
  sed -i '' "s|from '\.\./src/lib/firebase-admin'|from '../src/lib/firebase/admin/firebase-admin'|g" "$file"
  sed -i '' "s|from '\.\./lib/firebase-admin'|from '../lib/firebase/admin/firebase-admin'|g" "$file"
  
  # Fix dynamic imports (for middleware)
  sed -i '' "s|import('\./src/lib/rate-limit-simple')|import('./src/lib/api/middleware/rate-limit-simple')|g" "$file"
  
  # Utils imports
  sed -i '' "s|from '@/lib/config'|from '@/lib/utils/config'|g" "$file"
  sed -i '' "s|from '@/lib/constants'|from '@/lib/utils/constants'|g" "$file"
  sed -i '' "s|from '@/lib/cache-strategy'|from '@/lib/utils/cache-strategy'|g" "$file"
}

echo "📝 Finding and fixing all TypeScript/JavaScript files..."

# Find all TypeScript and JavaScript files and process them
total_files=0
fixed_files=0

for file in $(find apps/web -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \)); do
  total_files=$((total_files + 1))
  
  # Create backup
  cp "$file" "${file}.bak" 2>/dev/null || true
  
  # Fix imports
  fix_imports_in_file "$file"
  
  # Check if file was modified
  if ! cmp -s "$file" "${file}.bak" 2>/dev/null; then
    fixed_files=$((fixed_files + 1))
    echo "  ✓ Fixed: $(basename $file)"
  fi
  
  # Remove backup
  rm -f "${file}.bak"
  
  # Progress indicator
  if [ $((total_files % 50)) -eq 0 ]; then
    echo "  Progress: $total_files files processed..."
  fi
done

echo ""
echo "✅ Import fixing complete!"
echo ""
echo "📊 Summary:"
echo "- Processed: $total_files files"
echo "- Fixed: $fixed_files files"
echo ""
echo "Next steps:"
echo "1. Run 'pnpm typecheck' to verify imports"
echo "2. Run 'pnpm build' to ensure compilation"
echo "3. Test the application"