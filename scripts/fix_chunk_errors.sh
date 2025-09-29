#!/bin/bash

echo "Fixing chunk 2073 useRef errors by replacing problematic @hive/ui imports..."

# Pages that still have useRef errors - replace @hive/ui with temp-stubs for components causing issues
pages_with_errors=(
  "/Users/laneyfraass/hive_ui/apps/web/src/app/rituals/page.tsx"
  "/Users/laneyfraass/hive_ui/apps/web/src/app/feed/page.tsx"
  "/Users/laneyfraass/hive_ui/apps/web/src/app/admin/page.tsx"
  "/Users/laneyfraass/hive_ui/apps/web/src/app/spaces/page.tsx"
  "/Users/laneyfraass/hive_ui/apps/web/src/app/auth/login/page.tsx"
  "/Users/laneyfraass/hive_ui/apps/web/src/app/auth/verify/page.tsx"
)

for page in "${pages_with_errors[@]}"; do
  if [[ -f "$page" ]]; then
    echo "Fixing @hive/ui imports in: $page"

    # Replace commonly problematic @hive/ui imports with inline components
    sed -i.bak \
      -e 's/import { \([^}]*\)Card\([^}]*\) } from "@hive\/ui";/\/\/ Temp fix for chunk 2073 useRef errors\nconst Card = ({ children, className = "", ...props }: any) => <div className={`border rounded-lg p-4 ${className}`} {...props}>{children}<\/div>;\nimport { \1\2 } from "@hive\/ui";/' \
      -e 's/import { \([^}]*\)Button\([^}]*\) } from "@hive\/ui";/\/\/ Temp fix for chunk 2073 useRef errors\nconst Button = ({ children, variant = "default", className = "", ...props }: any) => <button className={`px-4 py-2 rounded ${className}`} {...props}>{children}<\/button>;\nimport { \1\2 } from "@hive\/ui";/' \
      "$page"
  fi
done

echo "Chunk 2073 fixes applied"