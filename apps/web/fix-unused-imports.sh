#!/bin/bash

# Fix unused imports by removing them from files
# This script processes ESLint warnings and removes unused imports

export NODE_OPTIONS="--max-old-space-size=4096"

# Get list of files with unused import warnings
FILES=$(pnpm lint 2>&1 | grep "is defined but never used" | grep -oP "^/[^:]+\.tsx?" | sort | uniq)

echo "Found files with unused imports/variables"
echo "$FILES" | wc -l
echo "---"

# For each file, run eslint with fix
for file in $FILES; do
  if [ -f "$file" ]; then
    echo "Processing: $file"
    npx eslint "$file" --fix --quiet 2>/dev/null || true
  fi
done

echo "---"
echo "Done! Run 'pnpm lint' to see remaining warnings"
