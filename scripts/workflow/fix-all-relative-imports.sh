#!/bin/bash

# Comprehensive fix for all relative imports based on file location
# This script calculates the correct relative path based on each file's depth in the directory structure

set -e

echo "🔧 Fixing all relative imports based on file locations..."

cd /Users/laneyfraass/hive_ui

fix_file_imports() {
  local file=$1
  local file_dir=$(dirname "$file")
  local relative_to_lib=$(echo "$file_dir" | sed "s|apps/web/src/lib||" | sed "s|^/||")
  
  # Count directory depth from lib root
  local depth=0
  if [ -n "$relative_to_lib" ]; then
    depth=$(echo "$relative_to_lib" | grep -o "/" | wc -l)
    depth=$((depth + 1))
  fi
  
  # Build the correct relative path prefix based on depth
  local path_prefix=""
  if [ $depth -eq 0 ]; then
    # File is in lib root
    path_prefix="."
  elif [ $depth -eq 1 ]; then
    # File is one level deep (e.g., lib/auth/)
    path_prefix=".."
  elif [ $depth -eq 2 ]; then
    # File is two levels deep (e.g., lib/auth/providers/)
    path_prefix="../.."
  elif [ $depth -eq 3 ]; then
    # File is three levels deep
    path_prefix="../../.."
  fi
  
  echo "  Fixing: $(basename $file) (depth: $depth, prefix: $path_prefix)"
  
  # Fix structured-logger imports
  sed -i '' "s|from '\.\./\.\./utils/structured-logger'|from '${path_prefix}/utils/structured-logger'|g" "$file"
  sed -i '' "s|from '\.\./\.\./\.\./utils/structured-logger'|from '${path_prefix}/utils/structured-logger'|g" "$file"
  
  # Fix firebase-admin imports
  sed -i '' "s|from '\.\./firebase/admin/firebase-admin'|from '${path_prefix}/firebase/admin/firebase-admin'|g" "$file"
  sed -i '' "s|from '\.\./\.\./firebase/admin/firebase-admin'|from '${path_prefix}/firebase/admin/firebase-admin'|g" "$file"
  
  # Fix firebase-client imports
  sed -i '' "s|from '\.\./\.\./firebase/client/firebase-client'|from '${path_prefix}/firebase/client/firebase-client'|g" "$file"
  
  # Fix config imports
  sed -i '' "s|from '\.\./\.\./utils/config'|from '${path_prefix}/utils/config'|g" "$file"
  
  # Fix logger imports
  sed -i '' "s|from '\.\./\.\./logger'|from '${path_prefix}/logger'|g" "$file"
  sed -i '' "s|from '\.\./logger'|from '${path_prefix}/logger'|g" "$file"
}

# Process each file that might have import issues
echo "Processing files with relative imports..."

for file in $(find apps/web/src/lib -type f -name "*.ts" -o -name "*.tsx"); do
  if grep -q "\.\./\.\./utils/structured-logger\|\.\./firebase/admin/firebase-admin\|\.\./\.\./firebase/\|\.\./\.\./utils/\|\.\./\.\./logger" "$file" 2>/dev/null; then
    fix_file_imports "$file"
  fi
done

echo "✅ All relative imports fixed based on file locations!"