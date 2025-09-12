#!/bin/bash

# Fix Tailwind CSS ambiguous utility class warnings
echo "🔧 Fixing Tailwind CSS ambiguous utility classes..."

# Replace duration-[180ms] with duration-180
find . -name "*.tsx" -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./scripts/hive-legacy-backup*" -not -path "./storybook-*" -not -path "./final-auth-*" -exec sed -i '' 's/duration-\[180ms\]/duration-180/g' {} \;

# Replace duration-[50ms] with duration-50
find . -name "*.tsx" -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./scripts/hive-legacy-backup*" -not -path "./storybook-*" -not -path "./final-auth-*" -exec sed -i '' 's/duration-\[50ms\]/duration-50/g' {} \;

# Replace duration-[90ms] with duration-90
find . -name "*.tsx" -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./scripts/hive-legacy-backup*" -not -path "./storybook-*" -not -path "./final-auth-*" -exec sed -i '' 's/duration-\[90ms\]/duration-90/g' {} \;

# Replace duration-[240ms] with duration-240
find . -name "*.tsx" -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./scripts/hive-legacy-backup*" -not -path "./storybook-*" -not -path "./final-auth-*" -exec sed -i '' 's/duration-\[240ms\]/duration-240/g' {} \;

# Replace duration-[400ms] with duration-400
find . -name "*.tsx" -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./scripts/hive-legacy-backup*" -not -path "./storybook-*" -not -path "./final-auth-*" -exec sed -i '' 's/duration-\[400ms\]/duration-400/g' {} \;

# Replace duration-[var(--hive-duration-fast)] with duration-180 (standard HIVE duration)
find . -name "*.tsx" -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./scripts/hive-legacy-backup*" -not -path "./storybook-*" -not -path "./final-auth-*" -exec sed -i '' 's/duration-\[var(--hive-duration-fast)\]/duration-180/g' {} \;

# Replace ease-[cubic-bezier(0.33,0.65,0,1)] with ease-hive
find . -name "*.tsx" -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./scripts/hive-legacy-backup*" -not -path "./storybook-*" -not -path "./final-auth-*" -exec sed -i '' 's/ease-\[cubic-bezier(0\.33,0\.65,0,1)\]/ease-hive/g' {} \;

# Replace ease-[${HIVE_MOTION_CURVE_CSS}] with ease-hive
find . -name "*.tsx" -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./scripts/hive-legacy-backup*" -not -path "./storybook-*" -not -path "./final-auth-*" -exec sed -i '' 's/ease-\[\${HIVE_MOTION_CURVE_CSS}\]/ease-hive/g' {} \;

echo "✅ Fixed Tailwind CSS ambiguous utility classes"