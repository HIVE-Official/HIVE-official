#!/bin/bash

echo "🔧 Fixing TypeScript and ESLint issues in apps/web..."

# Fix destructive variant to error in Alert components
echo "Fixing Alert variant issues..."
find src -name "*.tsx" -type f -exec sed -i '' 's/variant="destructive"/variant="error"/g' {} \;
find src -name "*.tsx" -type f -exec sed -i '' "s/variant='destructive'/variant='error'/g" {} \;

# Fix unused variables by prefixing with underscore
echo "Fixing unused variables..."
# Common patterns
find src -name "*.tsx" -type f -exec sed -i '' 's/const \[error,/const [_error,/g' {} \;
find src -name "*.tsx" -type f -exec sed -i '' 's/const \[isLoading,/const [_isLoading,/g' {} \;
find src -name "*.tsx" -type f -exec sed -i '' 's/const { error/const { _error/g' {} \;

# Fix imports - remove unused ones
echo "Cleaning up imports..."
# Remove completely unused imports (be careful with this)
find src -name "*.tsx" -type f -exec sed -i '' '/^import.*Target.*from.*lucide-react/d' {} \;

# Fix user.uid to user.id
echo "Fixing HiveUser property references..."
find src -name "*.tsx" -type f -exec sed -i '' 's/user\.uid/user.id/g' {} \;
find src -name "*.tsx" -type f -exec sed -i '' 's/user\?\.\uid/user?.id/g' {} \;

# Fix PageContainer props
echo "Fixing PageContainer usage..."
# This is more complex and needs manual intervention for each case

echo "✅ Automated fixes applied. Running type check..."
npx tsc --noEmit 2>&1 | head -20

echo ""
echo "📊 Summary:"
echo "TypeScript errors: $(npx tsc --noEmit 2>&1 | grep 'error TS' | wc -l)"
echo "ESLint warnings: $(pnpm lint 2>&1 | grep 'warning' | wc -l)"