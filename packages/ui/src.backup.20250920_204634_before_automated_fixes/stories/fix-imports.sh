#!/bin/bash

# Fix import errors across all story files
STORIES_DIR="/Users/laneyfraass/hive_ui/packages/ui/src/stories"

echo "Fixing import errors in all story files..."

# Fix common import patterns
for file in "$STORIES_DIR"/*.stories.tsx; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        
        # Fix basic UI component imports
        sed -i '' "s|from '../components/hive-badge'|from '../components/ui/badge'|g" "$file"
        sed -i '' "s|from '../components/badge'|from '../components/ui/badge'|g" "$file"
        sed -i '' "s|from '../components/hive-button'|from '../components/ui/button'|g" "$file" 
        sed -i '' "s|from '../components/button'|from '../components/ui/button'|g" "$file"
        sed -i '' "s|from '../components/card'|from '../components/ui/card'|g" "$file"
        sed -i '' "s|from '../components/input'|from '../components/ui/input'|g" "$file"
        sed -i '' "s|from '../components/label'|from '../components/ui/label'|g" "$file"
        sed -i '' "s|from '../components/avatar'|from '../components/ui/avatar'|g" "$file"
        sed -i '' "s|from '../components/checkbox'|from '../components/ui/checkbox'|g" "$file"
        sed -i '' "s|from '../components/switch'|from '../components/ui/switch'|g" "$file"
        sed -i '' "s|from '../components/separator'|from '../components/ui/separator'|g" "$file"
        sed -i '' "s|from '../components/tabs'|from '../components/ui/tabs'|g" "$file"
        sed -i '' "s|from '../components/select'|from '../components/ui/select'|g" "$file"
        sed -i '' "s|from '../components/alert'|from '../components/ui/alert'|g" "$file"
        sed -i '' "s|from '../components/toast'|from '../components/ui/toast'|g" "$file"
        sed -i '' "s|from '../components/skeleton'|from '../components/ui/skeleton'|g" "$file"
        sed -i '' "s|from '../components/slider'|from '../components/ui/slider'|g" "$file"
        sed -i '' "s|from '../components/tooltip'|from '../components/ui/tooltip'|g" "$file"
        sed -i '' "s|from '../components/dropdown-menu'|from '../components/ui/dropdown-menu'|g" "$file"
        sed -i '' "s|from '../components/popover'|from '../components/ui/popover'|g" "$file"
        sed -i '' "s|from '../components/scroll-area'|from '../components/ui/scroll-area'|g" "$file"
        
        # Fix specific Hive component imports that should remain as hive-
        sed -i '' "s|from '../components/hive-input'|from '../components/ui/input'|g" "$file"
        
        # Replace component usage in code
        sed -i '' 's/HiveButton/Button/g' "$file"
        sed -i '' 's/HiveInput/Input/g' "$file"
        
        # Fix textarea and progress imports (use Hive versions for enhanced functionality)
        sed -i '' "s|from '../components/textarea'|from '../components/hive-textarea'|g" "$file"
        sed -i '' "s|from '../components/progress'|from '../components/hive-progress'|g" "$file"
    fi
done

echo "Import fixes completed!"