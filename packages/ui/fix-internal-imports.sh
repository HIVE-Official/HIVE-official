#!/bin/bash

# Fix @/ imports to use relative paths for Next.js compatibility
# This is needed because Next.js transpiles source files directly and @/ aliases don't work

echo "Fixing internal @/ imports to relative paths..."

# Function to calculate relative path depth
get_relative_prefix() {
  local file_path=$1
  local depth=$(echo "$file_path" | grep -o "/" | wc -l)
  local prefix=""

  # Subtract 3 for packages/ui/src
  depth=$((depth - 3))

  for ((i=0; i<depth; i++)); do
    prefix="../$prefix"
  done

  echo "$prefix"
}

# Files to fix
files=(
  "src/atomic/atoms/canvas/grid-background.tsx"
  "src/atomic/atoms/canvas/mini-map.tsx"
  "src/atomic/atoms/canvas/zoom-controls.tsx"
  "src/atomic/molecules/canvas/inter-page-arrow.tsx"
  "src/atomic/molecules/canvas/page-frame.tsx"
  "src/atomic/molecules/canvas/selection-box.tsx"
  "src/atomic/molecules/panels/data-mapping-row.tsx"
  "src/atomic/molecules/panels/element-library-item.tsx"
  "src/atomic/molecules/panels/floating-panel.tsx"
  "src/atomic/molecules/panels/property-field.tsx"
  "src/atomic/molecules/panels/template-card.tsx"
  "src/atomic/organisms/hivelab/hivelab-canvas.tsx"
  "src/atomic/organisms/hivelab/hivelab-element-library.tsx"
  "src/atomic/organisms/hivelab/hivelab-properties-panel.tsx"
  "src/atomic/organisms/hivelab/hivelab-toolbar.tsx"
  "src/atomic/templates/hivelab/hivelab-builder-layout.tsx"
  "src/contexts/hivelab-context.tsx"
  "src/hooks/use-canvas-viewport.ts"
  "src/hooks/use-connection-creation.ts"
  "src/lib/hivelab-element-library.ts"
  "src/lib/hivelab-utils.ts"
)

for file in "${files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "Skipping $file (not found)"
    continue
  fi

  echo "Processing $file..."

  # Calculate relative prefix based on depth
  prefix=$(get_relative_prefix "$file")

  # Replace @/ imports with relative paths
  sed -i.bak \
    -e "s|from '@/lib/|from '${prefix}lib/|g" \
    -e "s|from '@/types/|from '${prefix}types/|g" \
    -e "s|from '@/atomic/atoms/|from '${prefix}atomic/atoms/|g" \
    -e "s|from '@/atomic/molecules/|from '${prefix}atomic/molecules/|g" \
    -e "s|from '@/atomic/organisms/|from '${prefix}atomic/organisms/|g" \
    -e "s|from '@/contexts/|from '${prefix}contexts/|g" \
    -e "s|from '@/hooks/|from '${prefix}hooks/|g" \
    "$file"
done

echo "Done! Created .bak files for safety."
