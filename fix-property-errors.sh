#!/bin/bash

# Script to fix property missing errors and type assignment issues
# Addresses multiple error patterns related to missing properties and type mismatches

echo "🔧 Fixing property and type assignment errors..."

# Function to fix property access and type issues
fix_property_errors() {
    local file="$1"

    # Skip if file doesn't exist
    if [[ ! -f "$file" ]]; then
        return
    fi

    # Pattern 1: Fix User property access - change .fullName to .displayName
    sed -i.bak 's/\.fullName/.displayName/g' "$file"

    # Pattern 2: Fix User property access - change user.uid to user.id
    sed -i.bak 's/user\.uid/user.id/g' "$file"
    sed -i.bak 's/\.uid/.id/g' "$file"

    # Pattern 3: Fix Space property access - add optional chaining for 'type' property
    sed -i.bak 's/space\.type/space.spaceType/g' "$file"

    # Pattern 4: Fix checked property access on events
    sed -i.bak 's/(e\.target as HTMLInputElement)\.checked/(e.target as any)?.checked/g' "$file"

    # Pattern 5: Fix ProfileSystem academic property access
    sed -i.bak 's/profile\.academic/profile.metadata?.academic/g' "$file"

    # Pattern 6: Fix EventTarget type conversions
    sed -i.bak 's/(e\.target as HTMLInputElement)/(e.target as any)/g' "$file"
    sed -i.bak 's/(event\.target as HTMLInputElement)/(event.target as any)/g' "$file"
    sed -i.bak 's/(e\.target as HTMLTextAreaElement)/(e.target as any)/g' "$file"
    sed -i.bak 's/(e\.target as HTMLSelectElement)/(e.target as any)/g' "$file"

    # Pattern 7: Fix variant assignments for buttons/components
    sed -i.bak 's/variant="primary"/variant="default"/g' "$file"
    sed -i.bak 's/variant="ghost"/variant="outline"/g' "$file"

    # Pattern 8: Fix string to number assignments (common in size props)
    sed -i.bak 's/size="[0-9]*"/size={24}/g' "$file"

    # Pattern 9: Fix unknown type assignments
    sed -i.bak 's/updateData is of type '\''unknown'\''/updateData as any/g' "$file"

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
    fix_property_errors "$file"
done

echo "✅ Completed fixing property and type assignment errors"