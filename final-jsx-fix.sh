#!/bin/bash

# Final JSX syntax fix - replace '})}}}' patterns
echo "🔧 Final JSX syntax cleanup..."

# Fix the specific patterns found
find packages/ui/src -name "*.tsx" -exec sed -i '' 's/})}}}/})/g' {} \;
find packages/ui/src -name "*.tsx" -exec sed -i '' 's/})}}/})/g' {} \;

echo "✅ Final JSX syntax cleanup complete!"