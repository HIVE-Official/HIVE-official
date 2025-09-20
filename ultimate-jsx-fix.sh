#!/bin/bash

echo "🔧 ULTIMATE JSX SYNTAX FIX SCRIPT"
echo "==============================="

# Count of files processed
processed=0

# Fix patterns across all TSX files in the UI package
find packages/ui/src -name "*.tsx" -type f | while read file; do
    if [ -f "$file" ]; then
        echo "Processing: $file"

        # Fix pattern 1: Extra closing braces in cn() calls - })}, should be }),
        sed -i '' 's/})},/}),/g' "$file"

        # Fix pattern 2: Extra closing braces in map functions - })}} should be })}
        sed -i '' 's/})}}/})}/g' "$file"

        # Fix pattern 3: Extra semicolon after closing braces - });} should be })
        sed -i '' 's/});}$/})}/g' "$file"

        # Fix pattern 4: React.createElement extra braces - })}} should be })}
        sed -i '' 's/React\.createElement([^,]*,[^}]*})}/React.createElement(\1,\2})/g' "$file"

        # Fix pattern 5: Function call syntax - })}} should be })}
        sed -i '' 's/})}} *$/})} /g' "$file"

        # Fix pattern 6: Object method calls with extra braces
        sed -i '' 's/\.\([a-zA-Z]*\)([^)]*})}/.\1(\1})/g' "$file"

        processed=$((processed + 1))
    fi
done

echo "✅ Processed $processed files"
echo "🔍 Checking for remaining issues..."

# Quick scan for common JSX syntax error patterns
echo "Scanning for })}, patterns:"
find packages/ui/src -name "*.tsx" -exec grep -l "})}, *$" {} \; | head -5

echo "Scanning for })}} patterns:"
find packages/ui/src -name "*.tsx" -exec grep -l "})}}" {} \; | head -5

echo "Scanning for });} patterns:"
find packages/ui/src -name "*.tsx" -exec grep -l "});}" {} \; | head -5

echo "🎯 Ultimate JSX fix complete!"