#!/bin/bash

# Add 'use client' directive to all @hive/ui components that need it

echo "Adding 'use client' directives to @hive/ui components..."

# Find all TSX files in the UI package
find packages/ui/src -name "*.tsx" -type f | while read file; do
  # Check if file already has 'use client' directive
  if ! head -1 "$file" | grep -q "use client"; then
    # Check if file uses React hooks or client-only features
    if grep -E "(useState|useEffect|useRef|useCallback|useMemo|useContext|onClick|onChange|onSubmit)" "$file" > /dev/null; then
      echo "Adding 'use client' to: $file"
      # Add 'use client' at the beginning
      {
        echo "'use client';"
        echo ""
        cat "$file"
      } > "$file.tmp" && mv "$file.tmp" "$file"
    fi
  fi
done

echo "Done! Added 'use client' directives where needed."