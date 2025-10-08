#!/bin/bash

# Script to fix logger error property issues in apps/web
# This fixes the most common error: "Object literal may only specify known properties, and 'error' does not exist in type 'Error'"

echo "🔧 Fixing logger error property issues..."

# Function to fix logger calls with error property
fix_logger_errors() {
    local file="$1"

    # Skip if file doesn't exist
    if [[ ! -f "$file" ]]; then
        return
    fi

    # Pattern 1: Fix logger calls with incorrect error property assignment
    # Change: error: error instanceof Error ? error.message : String(error)
    # To: error: error instanceof Error ? error : new Error(String(error))
    sed -i.bak 's/error: error instanceof Error ? error\.message : String(error)/error: error instanceof Error ? error : new Error(String(error))/g' "$file"

    # Pattern 2: Fix logger calls with string error assignments
    # Change: error: error instanceof Error ? error : 'Unknown error'
    # To: error: error instanceof Error ? error : new Error('Unknown error')
    sed -i.bak "s/error: error instanceof Error ? error : 'Unknown error'/error: error instanceof Error ? error : new Error('Unknown error')/g" "$file"
    sed -i.bak 's/error: error instanceof Error ? error : "Unknown error"/error: error instanceof Error ? error : new Error("Unknown error")/g' "$file"

    # Pattern 3: Fix logger calls with generic string fallbacks
    sed -i.bak 's/error: error instanceof Error ? error\.message : [^,}]*/error: error instanceof Error ? error : new Error(String(error))/g' "$file"

    # Pattern 4: Fix direct error.message assignments
    sed -i.bak 's/{ error: error\.message,/{ error: error instanceof Error ? error : new Error(String(error)),/g' "$file"

    # Pattern 5: Fix logger calls where we have just 'error,' as property
    sed -i.bak 's/{ error,/{ error: error instanceof Error ? error : new Error(String(error)),/g' "$file"

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
    fix_logger_errors "$file"
done

echo "✅ Completed fixing logger error properties"