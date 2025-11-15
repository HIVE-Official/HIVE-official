#!/bin/bash

# Find all page.tsx files that have 'use client' but missing 'export const dynamic'
files=$(find /Users/laneyfraass/hive_ui/apps/web/src/app -name "page.tsx" -exec grep -l "use client" {} \; | xargs grep -L "export const dynamic")

for file in $files; do
  if [[ -f "$file" ]]; then
    echo "Adding dynamic export to: $file"
    # Add the dynamic export after 'use client' directive
    sed -i.bak "/^['\"]use client['\"];$/a\\
\\
// Force dynamic rendering to avoid SSG issues\\
export const dynamic = 'force-dynamic';\\
" "$file"
  fi
done

echo "Dynamic exports added to client component pages"