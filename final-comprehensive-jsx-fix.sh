#!/bin/bash

# Final comprehensive JSX syntax fix for ALL remaining issues
echo "🔧 Starting FINAL comprehensive JSX fix..."

# Search for all files with potential map function syntax issues
echo "🔍 Finding all files with map function syntax issues..."

# Find all TypeScript/JSX files with }) patterns that need fixing
find packages/ui/src -name "*.tsx" -type f | while read file; do
  if grep -q "          })" "$file" || grep -q "        })" "$file" || grep -q "      })" "$file"; then
    echo "Fixing: $file"

    # Fix map function closures - add missing closing parentheses
    sed -i '' 's/          })/          })}/g' "$file"
    sed -i '' 's/        })/        })}/g' "$file"
    sed -i '' 's/      })/      })}/g' "$file"

    # Then fix over-corrections
    sed -i '' 's/})}}/})/g' "$file"
    sed -i '' 's/})}}}/})/g' "$file"
    sed -i '' 's/}})}}/})/g' "$file"

    echo "✅ Fixed: $file"
  fi
done

# Fix specific closing brace issues from error messages
echo "🔧 Fixing specific closing brace issues..."

# ritual-discover-workflow.tsx line 426
if [ -f "packages/ui/src/atomic/organisms/ritual-discover-workflow.tsx" ]; then
  sed -i '' 's/onClick={() => onComplete({ selectedSpaces }}/onClick={() => onComplete({ selectedSpaces })}/g' "packages/ui/src/atomic/organisms/ritual-discover-workflow.tsx"
fi

# rituals-hub.tsx line 216 - React.createElement issue
if [ -f "packages/ui/src/atomic/organisms/rituals-hub.tsx" ]; then
  sed -i '' 's/                })/                })}/g' "packages/ui/src/atomic/organisms/rituals-hub.tsx"
fi

echo "🎯 FINAL comprehensive JSX syntax fixes complete!"