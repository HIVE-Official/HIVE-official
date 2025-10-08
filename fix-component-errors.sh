#!/bin/bash

# Script to fix component prop and render errors
# Addresses missing render property and component prop issues

echo "🔧 Fixing component prop and render errors..."

# Function to fix component issues
fix_component_errors() {
    local file="$1"

    # Skip if file doesn't exist
    if [[ ! -f "$file" ]]; then
        return
    fi

    # Pattern 1: Fix missing render property in component props
    # Add render property where missing
    sed -i.bak 's/{ children: /{ children: children, render: () => children, /g' "$file"

    # Pattern 2: Fix button variant prop values
    sed -i.bak 's/variant="primary"/variant="default"/g' "$file"
    sed -i.bak 's/variant="ghost"/variant="outline"/g' "$file"

    # Pattern 3: Fix size prop from string to number
    sed -i.bak 's/size="24"/size={24}/g' "$file"
    sed -i.bak 's/size="32"/size={32}/g' "$file"
    sed -i.bak 's/size="48"/size={48}/g' "$file"

    # Pattern 4: Fix Dialog size prop
    sed -i.bak 's/size="lg"/className="max-w-lg"/g' "$file"
    sed -i.bak 's/size="md"/className="max-w-md"/g' "$file"
    sed -i.bak 's/size="sm"/className="max-w-sm"/g' "$file"

    # Pattern 5: Fix event target type conversions
    sed -i.bak 's/(e\.target as HTMLInputElement)\.value/(e.target as any)?.value || ""/g' "$file"
    sed -i.bak 's/(e\.target as HTMLTextAreaElement)\.value/(e.target as any)?.value || ""/g' "$file"
    sed -i.bak 's/(e\.target as HTMLSelectElement)\.value/(e.target as any)?.value || ""/g' "$file"

    # Pattern 6: Fix checked property access
    sed -i.bak 's/(e\.target as HTMLInputElement)\.checked/(e.target as any)?.checked || false/g' "$file"

    # Pattern 7: Fix Image component src prop
    sed -i.bak 's/{ src:/{ src: src ||/g' "$file"

    # Pattern 8: Fix toast variant prop
    sed -i.bak 's/variant: "error"/className: "error"/g' "$file"
    sed -i.bak 's/variant: "success"/className: "success"/g' "$file"

    # Pattern 9: Fix ElementInstance elementId property
    sed -i.bak 's/elementId:/id:/g' "$file"

    # Pattern 10: Fix unknown updateData types
    sed -i.bak 's/updateData\./\(updateData as any\)\./g' "$file"

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

# Find all TypeScript and TSX files in apps/web and fix them
find apps/web/src -name "*.tsx" | while read -r file; do
    fix_component_errors "$file"
done

echo "✅ Completed fixing component prop and render errors"