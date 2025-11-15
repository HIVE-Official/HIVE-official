#!/bin/bash

# Script to remove all console.log statements from production code
# This is a critical security fix - console.logs leak sensitive data

echo "🔒 Removing console.log statements from production code..."
echo "================================================"

# Counter for removed statements
TOTAL_REMOVED=0

# Function to clean a single file
clean_file() {
    local file="$1"
    local count_before=$(grep -c "console\.log" "$file" 2>/dev/null || echo 0)

    if [ "$count_before" -gt 0 ]; then
        # Create backup
        cp "$file" "${file}.backup.console"

        # Remove console.log statements (multiple patterns)
        sed -i '' \
            -e '/^[[:space:]]*console\.log/d' \
            -e 's/console\.log([^)]*);//g' \
            -e 's/console\.log([^)]*)[,;]*//g' \
            -e '/console\.log.*{$/,/^[[:space:]]*});*/d' \
            "$file"

        # Clean up any empty lines left behind
        sed -i '' '/^[[:space:]]*$/N;/\n[[:space:]]*$/d' "$file"

        local count_after=$(grep -c "console\.log" "$file" 2>/dev/null || echo 0)
        local removed=$((count_before - count_after))

        if [ "$removed" -gt 0 ]; then
            echo "✓ Removed $removed console.log statements from: $file"
            TOTAL_REMOVED=$((TOTAL_REMOVED + removed))
        fi
    fi
}

# Find all TypeScript and JavaScript files
echo "Scanning for console.log statements..."

# Apps directory
for file in $(find apps/web/src -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) 2>/dev/null); do
    clean_file "$file"
done

# Packages directory
for file in $(find packages -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) 2>/dev/null); do
    clean_file "$file"
done

echo ""
echo "================================================"
echo "✅ Security Fix Complete!"
echo "📊 Total console.log statements removed: $TOTAL_REMOVED"
echo ""
echo "Note: Backup files created with .backup.console extension"
echo "Review changes and delete backups when confirmed"
echo ""

# Optional: Clean up backup files after review
echo "To remove backup files after review, run:"
echo "find . -name '*.backup.console' -delete"