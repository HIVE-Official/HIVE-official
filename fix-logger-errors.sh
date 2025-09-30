#!/bin/bash

# Fix logger.error patterns in all API routes
echo "Fixing logger.error patterns in API routes..."

# Find all files with the problematic pattern
find apps/web/src/app/api -name "*.ts" -type f | while read file; do
  # Check if file contains the pattern
  if grep -q "logger\.error.*{[[:space:]]*error:" "$file" 2>/dev/null; then
    echo "Fixing: $file"

    # Create a temporary file
    temp_file=$(mktemp)

    # Process the file with perl for multiline replacements
    perl -0pe 's/logger\.error\(['\''"]([^'\''"]*)['\''"]\s*,\s*\{\s*error:\s*([^}]+)\s*,([^}]*)\}\s*\)/logger.error(
      '"'"'$1'"'"',
      $2 instanceof Error ? $2 : new Error(String($2)),
      {$3}
    )/gms' "$file" > "$temp_file"

    # Check if changes were made
    if ! diff -q "$file" "$temp_file" > /dev/null; then
      mv "$temp_file" "$file"
      echo "  ✓ Fixed logger.error calls"
    else
      rm "$temp_file"
    fi
  fi
done

echo "Fixing logger.warn patterns with error in data field..."
find apps/web/src/app/api -name "*.ts" -type f | while read file; do
  if grep -q "logger\.warn.*data:.*error" "$file" 2>/dev/null; then
    echo "Fixing: $file"
    sed -i.bak 's/data: error instanceof Error ? error : new Error(String(error))/errorMessage: error instanceof Error ? error.message : String(error)/g' "$file"
    rm "${file}.bak"
  fi
done

echo "Done!"