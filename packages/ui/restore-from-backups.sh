#!/bin/bash

# Emergency batch restoration script for broken UI files
# This script systematically restores working files from .bak backups

echo "🚨 EMERGENCY UI PACKAGE RESTORATION"
echo "Restoring working files from .bak backups..."

# Counter for restorations
count=0

# Find all .bak files and restore their corresponding broken files
find . -name "*.tsx.bak" -o -name "*.ts.bak" | while read backup_file; do
    # Get the original file path (remove .bak extension)
    original_file="${backup_file%.bak}"

    # Check if original file exists
    if [ -f "$original_file" ]; then
        echo "Restoring: $original_file"
        cp "$backup_file" "$original_file"
        ((count++))
    fi
done

echo "✅ Restoration complete!"
echo "📊 Files restored: $count"
echo ""
echo "Testing build..."

# Test the build
npm run build

echo "🔍 Build test complete"