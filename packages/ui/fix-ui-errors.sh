#!/bin/bash

echo "🔧 Fixing UI Package ESLint Errors..."

# Fix console is not defined errors in Storybook files
echo "Fixing console is not defined in Storybook files..."

# Fix files with console errors - these are Storybook story files that need global console
files_with_console=(
  "src/stories/00-System-Overview/ATOMS-COMPONENT-LIBRARY.stories.tsx"
  "src/stories/00-System-Overview/HIVE-SYSTEM-INDEX.stories.tsx"
)

for file in "${files_with_console[@]}"; do
  if [ -f "$file" ]; then
    # Add /* global console */ at the top of the file if it doesn't exist
    if ! grep -q "/\* global console \*/" "$file"; then
      sed -i '' '1s/^/\/* global console *\/\n/' "$file"
      echo "✓ Fixed console in $file"
    fi
  fi
done

# Fix unnecessary escape in regex pattern
echo "Fixing unnecessary escape characters..."
file="src/stories/01-Atoms/Interactive-Elements/Input-Enhanced.stories.tsx"
if [ -f "$file" ]; then
  # Remove unnecessary escape from \-
  sed -i '' 's/\\-/-/g' "$file"
  echo "✓ Fixed escape character in $file"
fi

# Fix no-case-declarations by adding block scopes
echo "Fixing no-case-declarations errors..."
files_with_case=(
  "src/stories/04-Organisms/Social-Feed-Systems/Feed-Components/PostComposer.stories.tsx"
  "src/stories/04-Organisms/Social-Feed-Systems/Feed-Components/RitualCard.stories.tsx"
)

for file in "${files_with_case[@]}"; do
  if [ -f "$file" ]; then
    # This is complex, we'll handle it in the code
    echo "⚠️  Need to manually fix case declarations in $file"
  fi
done

# Fix Storybook component property errors
echo "Fixing Storybook component property errors..."
storybook_files=(
  "src/stories/01-Components/ComponentAlternatives.stories.tsx"
  "src/stories/02-Patterns/RefinedShowcase.stories.tsx"
  "src/stories/03-Features/SpaceActivationForm.stories.tsx"
)

for file in "${storybook_files[@]}"; do
  if [ -f "$file" ]; then
    echo "⚠️  Need to manually fix Storybook meta in $file"
  fi
done

# Fix any type errors in specific files
echo "Fixing explicit any type errors..."
files_with_any=(
  "src/lib/accessibility-foundation.ts"
  "src/lib/api-client.ts"
)

for file in "${files_with_any[@]}"; do
  if [ -f "$file" ]; then
    echo "⚠️  Need to manually fix any types in $file"
  fi
done

echo "✅ Script completed. Manual fixes still needed for complex cases."