#!/bin/bash

# Fix incorrect _request references in API routes
echo "Fixing incorrect _request references in API routes..."

# Find all TypeScript files in the API directory
API_DIR="/Users/laneyfraass/hive_ui/apps/web/src/app/api"

# Replace _request with request in all API routes
find "$API_DIR" -name "*.ts" -type f | while read -r file; do
  # Check if file contains _request
  if grep -q "_request" "$file"; then
    echo "Fixing $file"
    # Use sed to replace _request with request
    sed -i.bak 's/\b_request\b/request/g' "$file"
    # Remove backup file
    rm "${file}.bak"
  fi
done

echo "Completed fixing _request references"

# Also fix any undefined 'user' variables (should be userData or similar)
echo "Checking for undefined 'user' variable references..."
find "$API_DIR" -name "*.ts" -type f | while read -r file; do
  # This is more complex and needs manual review, so just report
  if grep -q "const.*userData.*=.*userDoc\.data()" "$file"; then
    if grep -q "user\?\." "$file"; then
      echo "WARNING: $file may have undefined 'user' references after userData assignment"
    fi
  fi
done

echo "Script completed!"