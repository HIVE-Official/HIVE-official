#!/bin/bash

echo "🔧 Comprehensive fix for packages/ui warnings..."

cd /Users/laneyfraass/hive_ui/packages/ui

# Fix all remaining any types in the entire packages/ui directory
echo "Fixing all any types..."

# Find and fix common patterns
find src -name "*.tsx" -o -name "*.ts" | while read file; do
  # Fix onClick handlers with any
  sed -i '' 's/onClick={(e: any)/onClick={(e: React.MouseEvent)/g' "$file"
  
  # Fix onChange handlers  
  sed -i '' 's/onChange={(e: any)/onChange={(e: React.ChangeEvent<HTMLInputElement>)/g' "$file"
  sed -i '' 's/onChange={(value: any)/onChange={(value: string | number)/g' "$file"
  
  # Fix onKeyDown handlers
  sed -i '' 's/onKeyDown={(e: any)/onKeyDown={(e: React.KeyboardEvent)/g' "$file"
  
  # Fix map callbacks
  sed -i '' 's/\.map((item: any)/\.map((item)/g' "$file"
  sed -i '' 's/\.filter((item: any)/\.filter((item)/g' "$file"
  sed -i '' 's/\.forEach((item: any)/\.forEach((item)/g' "$file"
  
  # Fix Record<string, any>
  sed -i '' 's/Record<string, any>/Record<string, unknown>/g' "$file"
  
  # Fix as any casts
  sed -i '' 's/ as any/ as unknown/g' "$file"
  
  # Fix any[] arrays
  sed -i '' 's/: any\[\]/: unknown[]/g' "$file"
  
  # Fix function params
  sed -i '' 's/(data: any)/(data: unknown)/g' "$file"
  sed -i '' 's/(value: any)/(value: unknown)/g' "$file"
  sed -i '' 's/(error: any)/(error: unknown)/g' "$file"
done

# Fix unused variables by prefixing with underscore
echo "Fixing unused variables..."

find src -name "*.tsx" -o -name "*.ts" | while read file; do
  # Common unused params in destructuring
  sed -i '' 's/{[[:space:]]*\([a-zA-Z_][a-zA-Z0-9_]*\)[[:space:]]*:[[:space:]]*_/{_\1: _/g' "$file"
done

# Remove .eslintignore reference
echo "Updating ESLint config..."
if [ -f "eslint.config.mjs" ]; then
  # Add ignores property if not present
  if ! grep -q "ignores:" eslint.config.mjs; then
    sed -i '' '/export default/a\
  ignores: ["dist/**", "node_modules/**", "*.config.js", "*.config.mjs"],' eslint.config.mjs
  fi
fi

# Remove .eslintignore if it exists
if [ -f ".eslintignore" ]; then
  rm .eslintignore
  echo "Removed deprecated .eslintignore file"
fi

echo "✅ Applied comprehensive fixes"