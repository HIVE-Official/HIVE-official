#!/bin/bash

# Fix over-corrected JSX syntax
echo "🔧 Fixing over-corrected JSX syntax..."

find packages/ui/src -name "*.tsx" -exec sed -i '' 's/})}}/})}/g' {} \;

echo "✅ Over-correction fixes complete!"