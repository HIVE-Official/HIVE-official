#!/bin/bash

# Script to fix syntax errors caused by overly aggressive regex replacements
# This will undo problematic changes and fix broken function parameters

echo "🔧 Fixing syntax errors from automated replacements..."

# Function to fix syntax errors
fix_syntax_errors() {
    local file="$1"

    # Skip if file doesn't exist
    if [[ ! -f "$file" ]]; then
        return
    fi

    # Fix broken function parameter destructuring in error boundaries
    sed -i.bak 's/{ error: error instanceof Error ? error : new Error(String(error)), retry, errorId }/{ error, retry, errorId }/g' "$file"
    sed -i.bak 's/{ error: error instanceof Error ? error : new Error(String(error)), retry }/{ error, retry }/g' "$file"
    sed -i.bak 's/{ error: error instanceof Error ? error : new Error(String(error))}/{ error }/g' "$file"

    # Fix broken property accesses that were incorrectly replaced
    sed -i.bak 's/(updateData as any)\./updateData\./g' "$file"

    # Fix broken window property issues in security middleware
    sed -i.bak 's/window: `${windowMs}ms`/windowMs/g' "$file"

    # Fix broken logger context that was over-corrected
    sed -i.bak 's/\/\/ feedUrl:/feedUrl:/g' "$file"
    sed -i.bak 's/\/\/ feedUrl,/feedUrl,/g' "$file"

    # Fix any broken const declarations
    sed -i.bak 's/`${windowMs}ms`: /windowMs: /g' "$file"

    # Fix broken parameter names that were incorrectly commented
    sed -i.bak 's/\/\/ elementId:/elementId:/g' "$file"

    # Fix broken spread operators
    sed -i.bak 's/\.\.\.\/\/ Type constraint issue/.../g' "$file"

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

# Find all TypeScript files and fix them
find apps/web/src -name "*.ts" -o -name "*.tsx" | while read -r file; do
    fix_syntax_errors "$file"
done

echo "✅ Completed fixing syntax errors"