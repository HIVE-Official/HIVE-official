#!/bin/bash

echo "Fixing spaceId parameter issues in API routes..."

cd /Users/laneyfraass/hive_ui

# Fix all [spaceId] route files
files=(
  "apps/web/src/app/api/spaces/[spaceId]/route.ts"
  "apps/web/src/app/api/spaces/[spaceId]/feed/route.ts"
  "apps/web/src/app/api/spaces/[spaceId]/tools/route.ts"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."
    
    # Fix the parameter destructuring - change _spaceId back to spaceId
    sed -i '' 's/{ params: Promise<{ _spaceId: string }> }/{ params: Promise<{ spaceId: string }> }/g' "$file"
    
    # Fix the variable declaration
    sed -i '' 's/let _spaceId: string | undefined;/let spaceId: string | undefined;/g' "$file"
    
    # Make sure we're not using _spaceId where we should use spaceId
    sed -i '' 's/_spaceId || "unknown"/spaceId || "unknown"/g' "$file"
  fi
done

echo "Done fixing spaceId parameter issues!"