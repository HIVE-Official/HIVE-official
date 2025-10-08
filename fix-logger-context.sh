#!/bin/bash

# Script to fix logger context property issues
# Fixes properties that don't exist in LogContext interface

echo "🔧 Fixing logger context property issues..."

# Function to fix logger context properties
fix_logger_context() {
    local file="$1"

    # Skip if file doesn't exist
    if [[ ! -f "$file" ]]; then
        return
    fi

    # Pattern 1: Fix feedUrl property - doesn't exist in LogContext
    sed -i.bak 's/feedUrl,/\/\/ feedUrl,/g' "$file"
    sed -i.bak 's/feedUrl:/\/\/ feedUrl:/g' "$file"

    # Pattern 2: Fix userId property conflicts in logger context
    # Change userId to use existing userId property or remove if conflicts
    sed -i.bak 's/{ userId: error,/{ error: error instanceof Error ? error : new Error(String(error)),/g' "$file"

    # Pattern 3: Fix action property conflicts
    sed -i.bak 's/{ action: error,/{ error: error instanceof Error ? error : new Error(String(error)),/g' "$file"

    # Pattern 4: Fix elementId property - doesn't exist in LogContext
    sed -i.bak 's/elementId:/\/\/ elementId:/g' "$file"

    # Pattern 5: Fix variant property in toast context
    sed -i.bak 's/variant: "error"/description: "Error occurred"/g' "$file"
    sed -i.bak 's/variant: "success"/description: "Success"/g' "$file"

    # Pattern 6: Fix messageId property - should use id instead
    sed -i.bak 's/messageId:/id:/g' "$file"

    # Pattern 7: Fix operation property - should use action instead
    sed -i.bak 's/operation:/action:/g' "$file"

    # Pattern 8: Fix reset property - doesn't exist in LogContext
    sed -i.bak 's/reset,/\/\/ reset,/g' "$file"

    # Pattern 9: Fix windowMs property - should use window instead
    sed -i.bak 's/windowMs/window: `${windowMs}ms`/g' "$file"

    # Remove backup file if changes were made
    if [[ -f "$file.bak" ]]; then
        if diff -q "$file" "$file.bak" > /dev/null; then
            rm "$file.bak"
        else
            echo "Fixed: $file"
            rm "$file.bak"
        fi
    fi
}

# Find all TypeScript files in apps/web and fix them
find apps/web/src -name "*.ts" -o -name "*.tsx" | while read -r file; do
    fix_logger_context "$file"
done

echo "✅ Completed fixing logger context properties"