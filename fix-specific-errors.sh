#!/bin/bash

# Script to fix specific remaining TypeScript errors
# Focuses on malformed type annotations and syntax issues

echo "🔧 Fixing specific remaining TypeScript errors..."

# Fix malformed React.ReactNode type annotations
sed -i.bak 's/{ children: children, render: () => children, React\.ReactNode }/{ children: React.ReactNode }/g' apps/web/src/app/universal-shell-provider.tsx
sed -i.bak 's/{ children: children, render: () => children, React\.ReactNode }/{ children: React.ReactNode }/g' apps/web/src/components/auth/simple-auth-provider.tsx

# Fix error provider syntax
sed -i.bak 's/error: error instanceof Error ? error : new Error(String(error)),/error,/g' apps/web/src/components/error-provider.tsx

# Fix temp stubs malformed types
sed -i.bak 's/children, render: () => children, React\.ReactNode/React.ReactNode/g' apps/web/src/components/temp-stubs.tsx

# Fix tool renderer issues
sed -i.bak 's/elementId:/id:/g' apps/web/src/components/tools/element-renderers.tsx
sed -i.bak 's/updateData\./updateData\./g' apps/web/src/components/tools/visual-tool-composer.tsx

# Fix test utils
sed -i.bak 's/error instanceof Error ? error : new Error(String(error)),/error,/g' apps/web/src/test/utils/test-utils.tsx

# Fix permission system
sed -i.bak 's/userId:/id:/g' apps/web/src/lib/permission-system.ts

# Clean up backup files
find apps/web/src -name "*.bak" -delete

echo "✅ Completed fixing specific errors"