#!/bin/bash
set -e

echo "Fixing remaining Lucide icon ForwardRef errors..."

# Fix multiline icon patterns
FILES=(
    "src/app/(dashboard)/spaces/[spaceId]/analytics/page.tsx"
    "src/app/(dashboard)/spaces/[spaceId]/collaboration/page.tsx"
    "src/app/(dashboard)/spaces/[spaceId]/members/page.tsx"
    "src/app/(dashboard)/spaces/[spaceId]/page.tsx"
    "src/app/(dashboard)/spaces/[spaceId]/resources/page.tsx"
    "src/app/(dashboard)/spaces/[spaceId]/tools/page.tsx"
    "src/app/profile/[handle]/page.tsx"
)

cd /Users/laneyfraass/hive_ui/apps/web

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        
        # Fix patterns on separate lines: icon: IconName\n without comma
        sed -i '' -E '/icon:[[:space:]]*[A-Z][a-zA-Z0-9]*[[:space:]]*$/ s/icon:[[:space:]]*([A-Z][a-zA-Z0-9]*)[[:space:]]*$/icon: <\1 \/>/g' "$file"
        
        # Fix patterns at end of object: icon: IconName }
        sed -i '' -E 's/icon:[[:space:]]*([A-Z][a-zA-Z0-9]*)[[:space:]]*([}])/icon: <\1 \/> \2/g' "$file"
    fi
done

echo "Remaining icon fixes completed!"

# Check how many we fixed
echo "Checking remaining ForwardRef errors..."
cd /Users/laneyfraass/hive_ui
NODE_OPTIONS='--max-old-space-size=8192' npx tsc --noEmit 2>&1 | grep "ForwardRefExoticComponent.*ReactNode" | wc -l