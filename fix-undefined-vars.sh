#!/bin/bash

# Fix undefined variable cascades that are preventing ESLint from working
# Focus on the most common patterns: _user, _tool, _index, etc.

echo "🔧 Fixing undefined variable cascades..."

# Fix _user variables
find apps/web/src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/\b_user\b/user/g'

# Fix __user variables (double underscore)
find apps/web/src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/\b__user\b/user/g'

# Fix _tool variables
find apps/web/src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/\b_tool\b/tool/g'

# Fix __tool variables
find apps/web/src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/\b__tool\b/tool/g'

# Fix _index variables
find apps/web/src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/\b_index\b/index/g'

# Fix other common undefined vars
find apps/web/src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/\b_tools\b/tools/g'
find apps/web/src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/\b_userSpaces\b/userSpaces/g'
find apps/web/src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/\b_toolsError\b/toolsError/g'

echo "✅ Fixed undefined variable patterns"

# Quick test to see if we reduced errors
echo "🧪 Testing error reduction..."
NODE_OPTIONS='--max-old-space-size=4096' npx eslint apps/web/src --format=compact 2>&1 | grep -c "is not defined" || echo "0 undefined variable errors remaining"