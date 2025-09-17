#!/bin/bash

# Fix console.log statements in admin app
echo "Fixing console.log statements in admin app..."

# Files with console.log warnings
FILES=(
  "apps/admin/src/components/enhanced-space-control-dashboard.tsx"
  "apps/admin/src/components/hive-admin-notification-management.tsx"
  "apps/admin/src/components/hive-admin-space-system.tsx"
  "apps/admin/src/components/hive-admin-user-management.tsx"
  "apps/admin/src/components/hive-space-surface-manager.tsx"
  "apps/admin/src/lib/admin-activity-logger.ts"
  "apps/admin/src/lib/admin-auth.ts"
  "apps/admin/src/lib/admin-notifications.ts"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  Processing: $file"
    # Comment out console.log statements that aren't error or warn
    sed -i.bak 's/^[[:space:]]*console\.log(/      \/\/ console.log(/g' "$file"
    rm "${file}.bak"
  fi
done

echo "Console.log statements fixed!"