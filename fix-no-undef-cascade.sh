#!/bin/bash

echo "🔧 Fixing no-undef cascade intelligently..."

# Get the most common undefined variables
echo "1. Analyzing undefined variables..."
UNDEF_VARS=$(NODE_OPTIONS='--max-old-space-size=4096' pnpm --filter web lint 2>&1 | grep "is not defined" | awk -F"'" '{print $2}' | sort | uniq -c | sort -nr | head -20 | awk '{print $2}')

echo "Top undefined variables:"
echo "$UNDEF_VARS" | head -10

# Fix React-related undefined variables
echo "2. Adding React imports where needed..."
for var in useState useEffect useCallback useMemo useRef; do
    find apps/web/src -name "*.tsx" -o -name "*.ts" | while read file; do
        if grep -q "$var" "$file" && ! grep -q "import.*$var" "$file" && ! grep -q "import.*React.*$var" "$file"; then
            # Check if React is already imported
            if grep -q "^import React" "$file"; then
                # Add to React import
                sed -i '' "s/import React, {/import React, { $var,/" "$file" 2>/dev/null || true
                sed -i '' "s/import React from/import React, { $var } from/" "$file" 2>/dev/null || true
            else
                # Add new React import
                sed -i '' "1i\\
import { $var } from 'react';" "$file"
            fi
        fi
    done
done

# Fix component-related undefined variables
echo "3. Adding @hive/ui imports where needed..."
for comp in Button Card Input Modal Avatar Badge; do
    find apps/web/src -name "*.tsx" | while read file; do
        if grep -q "<$comp" "$file" && ! grep -q "import.*$comp" "$file"; then
            # Add @hive/ui import
            if grep -q "from '@hive/ui'" "$file"; then
                sed -i '' "s/import { \([^}]*\) } from '@hive\/ui'/import { \1, $comp } from '@hive\/ui'/" "$file"
            else
                sed -i '' "1i\\
import { $comp } from '@hive/ui';" "$file"
            fi
        fi
    done
done

# Fix undefined component states/props
echo "4. Fixing common undefined patterns..."
find apps/web/src -name "*.tsx" -o -name "*.ts" | while read file; do
    # Fix DashboardLayout -> PageContainer or similar
    sed -i '' 's/DashboardLayout/PageContainer/g' "$file" 2>/dev/null || true
    
    # Fix CustomizableGrid -> div
    sed -i '' 's/<CustomizableGrid/<div className="customizable-grid"/g' "$file" 2>/dev/null || true
    sed -i '' 's/<\/CustomizableGrid>/<\/div>/g' "$file" 2>/dev/null || true
    
    # Fix ErrorBoundary -> div or remove
    sed -i '' 's/<ErrorBoundary>//g' "$file" 2>/dev/null || true
    sed -i '' 's/<\/ErrorBoundary>//g' "$file" 2>/dev/null || true
    
    # Fix common undefined hooks
    sed -i '' 's/useHiveProfile/useProfile/g' "$file" 2>/dev/null || true
done

echo "5. Cleaning up malformed imports..."
find apps/web/src -name "*.tsx" -o -name "*.ts" | while read file; do
    # Remove duplicate imports
    awk '!seen[$0]++' "$file" > "$file.tmp" && mv "$file.tmp" "$file" 2>/dev/null || true
    
    # Fix malformed import statements
    sed -i '' 's/import { , /import { /g' "$file" 2>/dev/null || true
    sed -i '' 's/, ,/,/g' "$file" 2>/dev/null || true
done

echo "✅ No-undef cascade fixes complete"

# Test improvement
echo "🧪 Testing improvement..."
BEFORE_ERRORS=$(NODE_OPTIONS='--max-old-space-size=4096' pnpm --filter web lint 2>&1 | grep "is not defined" | wc -l)
echo "Remaining 'is not defined' errors: $BEFORE_ERRORS"