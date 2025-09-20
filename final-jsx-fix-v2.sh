#!/bin/bash

echo "🎯 FINAL JSX FIX - Targeting specific error patterns"
echo "=================================================="

# Fix specific patterns that are causing build failures

# 1. Fix file-input.tsx - extra semicolon after forEach
echo "Fixing file-input.tsx..."
sed -i '' 's/});}/})}/g' packages/ui/src/atomic/atoms/file-input.tsx

# 2. Fix navigation-variants.tsx - regexp literal issue
echo "Fixing navigation-variants.tsx..."
sed -i '' 's/})$$/})/g' packages/ui/src/atomic/molecules/navigation-variants.tsx

# 3. Fix profile-stats.tsx - method chaining issue
echo "Fixing profile-stats.tsx..."
sed -i '' 's/})$/.filter(Boolean)/g' packages/ui/src/atomic/molecules/profile-stats.tsx

# 4. Fix activity-feed.tsx - function call syntax
echo "Fixing activity-feed.tsx..."
sed -i '' 's/})}.catch(/}).catch(/g' packages/ui/src/atomic/organisms/activity-feed.tsx
sed -i '' 's/});}/})}/g' packages/ui/src/atomic/organisms/activity-feed.tsx

# 5. Check for any remaining issues
echo "📋 Checking for common error patterns..."

# Look for }) followed by }
echo "Checking for })}"
find packages/ui/src -name "*.tsx" -exec grep -l "})}" {} \; | head -3

# Look for })} patterns at end of lines
echo "Checking for })} at end of lines"
find packages/ui/src -name "*.tsx" -exec grep -l "})}$" {} \; | head -3

echo "✅ Final JSX fixes applied!"