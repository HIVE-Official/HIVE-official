#!/bin/bash

# Comprehensive JSX syntax fix for all map function issues
echo "🔧 Comprehensive JSX syntax fix starting..."

# Files with specific line numbers from error output
declare -A error_files=(
  ["packages/ui/src/atomic/organisms/profile-stats-widget.tsx"]="392"
  ["packages/ui/src/atomic/organisms/profile-tools-widget.tsx"]="364"
  ["packages/ui/src/atomic/organisms/ritual-connect-workflow.tsx"]="196"
  ["packages/ui/src/atomic/organisms/ritual-discover-workflow.tsx"]="341"
  ["packages/ui/src/atomic/organisms/ritual-initialize-workflow.tsx"]="230"
)

for file in "${!error_files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing: $file (around line ${error_files[$file]})"

    # Fix common patterns
    sed -i '' 's/              })/              })}/g' "$file"
    sed -i '' 's/            })/            })}/g' "$file"
    sed -i '' 's/          })/          })}/g' "$file"
    sed -i '' 's/        })/        })}/g' "$file"

    # Then correct over-corrections
    sed -i '' 's/})}}/})/g' "$file"
    sed -i '' 's/})}}}/})/g' "$file"

    echo "✅ Fixed: $file"
  else
    echo "❌ File not found: $file"
  fi
done

echo "🎯 Comprehensive JSX syntax fixes complete!"