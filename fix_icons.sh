#!/bin/bash
set -e

echo "Fixing Lucide icon ForwardRef errors..."

# Find all TSX files with icon patterns and fix them
FILES=$(grep -rl "icon:\s*[A-Z][a-zA-Z]*\s*[,}]" /Users/laneyfraass/hive_ui/apps/web/src --include="*.tsx")

for file in $FILES; do
    echo "Processing: $file"
    
    # Fix patterns like: icon: IconName, -> icon: <IconName />,
    sed -i '' 's/icon:\s*\([A-Z][a-zA-Z0-9]*\)\s*,/icon: <\1 \/>,/g' "$file"
    
    # Fix patterns like: icon: IconName } -> icon: <IconName /> }
    sed -i '' 's/icon:\s*\([A-Z][a-zA-Z0-9]*\)\s*}/icon: <\1 \/> }/g' "$file"
    
    # Fix patterns like: icon: IconName\n -> icon: <IconName />\n
    sed -i '' 's/icon:\s*\([A-Z][a-zA-Z0-9]*\)\s*$/icon: <\1 \/>/g' "$file"
done

echo "Fixed icon patterns in $(echo "$FILES" | wc -l) files"

# Also fix any remaining patterns where icons are passed as variables
echo "Fixing remaining icon prop patterns..."

# Fix breadcrumb patterns
grep -rl "icon:\s*[A-Z][a-zA-Z]*\s*}" /Users/laneyfraass/hive_ui/apps/web/src --include="*.tsx" | while read file; do
    echo "Processing breadcrumbs in: $file"
    sed -i '' 's/icon:\s*\([A-Z][a-zA-Z0-9]*\)\s*}/icon: <\1 \/> }/g' "$file"
done

echo "Icon fixes completed!"