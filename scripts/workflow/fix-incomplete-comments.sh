#!/bin/bash

# Fix incomplete comment blocks in TypeScript files
# These are causing syntax errors

set -e

echo "🔧 Fixing incomplete comment blocks..."

cd /Users/laneyfraass/hive_ui

# Fix event-creation-modal.tsx
file="apps/web/src/components/events/event-creation-modal.tsx"

if [ -f "$file" ]; then
  echo "Fixing $file..."
  
  # Create a temporary file with fixes
  cp "$file" "${file}.bak"
  
  # Fix pattern: // showToast({ followed by properties not properly commented
  perl -i -pe 'BEGIN{undef $/;} s/\/\/ showToast\(\{[^}]*\}\)/
    $& =~ s{^(\s*)(.*)$}{$1\/\/ $2}gmr/ge' "$file"
  
  # Alternative approach - comment out the entire block properly
  sed -i '' '/\/\/ showToast({/,/})/{s/^[[:space:]]*\([^\/]\)/      \/\/ \1/;}' "$file" 2>/dev/null || true
  
  echo "✅ Fixed incomplete comments in $file"
fi

echo "✅ Incomplete comment blocks fixed!"