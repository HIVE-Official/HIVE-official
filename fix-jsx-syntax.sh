#!/bin/bash

# Fix JSX syntax errors - missing closing parentheses in map functions
echo "🔧 Fixing JSX syntax errors in UI package..."

# List of files with syntax errors from build output
files=(
  "packages/ui/src/atomic/molecules/navigation-variants.tsx"
  "packages/ui/src/atomic/organisms/profile-ghost-mode-widget.tsx"
  "packages/ui/src/atomic/organisms/profile-hivelab-widget.tsx"
  "packages/ui/src/atomic/organisms/profile-spaces-widget.tsx"
  "packages/ui/src/atomic/organisms/profile-stats-widget.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing: $file"
    # Replace }) with })} when it's likely a map function
    sed -i '' 's/              })/              })}/g' "$file"
    sed -i '' 's/            })/            })}/g' "$file"
    sed -i '' 's/          })/          })}/g' "$file"
    sed -i '' 's/        })/        })}/g' "$file"
    echo "✅ Fixed: $file"
  else
    echo "❌ File not found: $file"
  fi
done

echo "🎯 JSX syntax fixes complete!"