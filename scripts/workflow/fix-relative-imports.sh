#!/bin/bash

# Fix relative imports after lib reorganization

set -e

echo "🔧 Fixing relative lib imports..."

cd /Users/laneyfraass/hive_ui

# Fix relative imports in spaces pages
echo "Fixing spaces pages..."
find apps/web/src -name "*.tsx" -o -name "*.ts" | while read file; do
  # Auth utils
  sed -i '' "s|from '\.\./\.\./\.\./\.\./lib/auth-utils'|from '@/lib/auth/utils/auth-utils'|g" "$file"
  sed -i '' "s|from '\.\./\.\./\.\./lib/auth-utils'|from '@/lib/auth/utils/auth-utils'|g" "$file"
  sed -i '' "s|from '\.\./\.\./lib/auth-utils'|from '@/lib/auth/utils/auth-utils'|g" "$file"
  
  # Space permissions
  sed -i '' "s|from '\.\./\.\./\.\./\.\./lib/space-permissions'|from '@/lib/spaces/permissions/space-permissions'|g" "$file"
  sed -i '' "s|from '\.\./\.\./\.\./lib/space-permissions'|from '@/lib/spaces/permissions/space-permissions'|g" "$file"
  sed -i '' "s|from '\.\./\.\./lib/space-permissions'|from '@/lib/spaces/permissions/space-permissions'|g" "$file"
  
  # Campus tools templates
  sed -i '' "s|from '\.\./\.\./\.\./lib/campus-tools-templates'|from '@/lib/tools/templates/campus-tools-templates'|g" "$file"
  sed -i '' "s|from '\.\./\.\./lib/campus-tools-templates'|from '@/lib/tools/templates/campus-tools-templates'|g" "$file"
  
  # Template deployment
  sed -i '' "s|from '\.\./\.\./\.\./lib/template-deployment'|from '@/lib/tools/templates/template-deployment'|g" "$file"
  sed -i '' "s|from '\.\./\.\./lib/template-deployment'|from '@/lib/tools/templates/template-deployment'|g" "$file"
  
  # Generic relative imports - convert to @/ imports
  sed -i '' "s|from '\.\./\.\./\.\./\.\./lib/\([^']*\)'|from '@/lib/\1'|g" "$file"
  sed -i '' "s|from '\.\./\.\./\.\./lib/\([^']*\)'|from '@/lib/\1'|g" "$file"
  sed -i '' "s|from '\.\./\.\./lib/\([^']*\)'|from '@/lib/\1'|g" "$file"
  sed -i '' "s|from '\.\./lib/\([^']*\)'|from '@/lib/\1'|g" "$file"
done

echo "✅ Relative imports fixed!"