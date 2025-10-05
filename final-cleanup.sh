#!/bin/bash

# Final cleanup script to fix remaining syntax errors
echo "🔧 Running final cleanup for remaining syntax errors..."

# Fix broken function declarations with missing parameters
sed -i.bak 's/function renderElement(.* \/\/ /function renderElement(/g' apps/web/src/components/tools/element-renderers.tsx

# Fix malformed parameter lists
sed -i.bak 's/updateData is of type '\''unknown'\''/updateData as any/g' apps/web/src/components/tools/visual-tool-composer.tsx

# Fix broken destructuring in space tool renderer
sed -i.bak 's/{ error,/{ error: err,/g' apps/web/src/components/spaces/space-tool-renderer.tsx

# Fix test utils malformed types
sed -i.bak 's/{ children: children, render: () => children, React\.ReactNode }/{ children: React.ReactNode }/g' apps/web/src/test/utils/test-utils.tsx

# Fix any remaining comment syntax errors
sed -i.bak 's/\/\/ Type constraint issue/\/\* Type constraint issue \*\//g' apps/web/src/**/*.ts
sed -i.bak 's/\/\/ Type constraint issue/\/\* Type constraint issue \*\//g' apps/web/src/**/*.tsx

# Clean up any malformed arrow function types
find apps/web/src -name "*.tsx" -exec sed -i.bak 's/: () => children,//g' {} \;
find apps/web/src -name "*.tsx" -exec sed -i.bak 's/, render: () => children//g' {} \;

# Remove all backup files
find apps/web/src -name "*.bak" -delete

echo "✅ Final cleanup completed"