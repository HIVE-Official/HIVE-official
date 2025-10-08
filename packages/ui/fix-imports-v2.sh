#!/bin/bash

# Fix @/ imports with proper relative paths based on file depth

echo "Fixing @/ imports to relative paths..."

# Atoms (3 levels deep: src/atomic/atoms/)
echo "Fixing atoms/canvas..."
sed -i '' \
  -e "s|from '@/lib/|from '../../../lib/|g" \
  -e "s|from '@/types/|from '../../../types/|g" \
  src/atomic/atoms/canvas/*.tsx

# Molecules (3 levels deep: src/atomic/molecules/)
echo "Fixing molecules/canvas..."
sed -i '' \
  -e "s|from '@/atomic/atoms/|from '../../atoms/|g" \
  -e "s|from '@/lib/|from '../../../lib/|g" \
  -e "s|from '@/types/|from '../../../types/|g" \
  src/atomic/molecules/canvas/*.tsx

echo "Fixing molecules/panels..."
sed -i '' \
  -e "s|from '@/atomic/atoms/|from '../../atoms/|g" \
  -e "s|from '@/lib/|from '../../../lib/|g" \
  -e "s|from '@/types/|from '../../../types/|g" \
  src/atomic/molecules/panels/*.tsx

# Organisms (3 levels deep: src/atomic/organisms/)
echo "Fixing organisms/hivelab..."
sed -i '' \
  -e "s|from '@/atomic/atoms/|from '../../atoms/|g" \
  -e "s|from '@/atomic/molecules/|from '../../molecules/|g" \
  -e "s|from '@/contexts/|from '../../../contexts/|g" \
  -e "s|from '@/hooks/|from '../../../hooks/|g" \
  -e "s|from '@/lib/|from '../../../lib/|g" \
  -e "s|from '@/types/|from '../../../types/|g" \
  src/atomic/organisms/hivelab/*.tsx

# Templates (4 levels deep: src/atomic/templates/hivelab/)
echo "Fixing templates/hivelab..."
sed -i '' \
  -e "s|from '@/atomic/organisms/|from '../../organisms/|g" \
  -e "s|from '@/contexts/|from '../../../../contexts/|g" \
  -e "s|from '@/hooks/|from '../../../../hooks/|g" \
  -e "s|from '@/lib/|from '../../../../lib/|g" \
  -e "s|from '@/types/|from '../../../../types/|g" \
  src/atomic/templates/hivelab/*.tsx

# Contexts (2 levels deep: src/contexts/)
echo "Fixing contexts..."
sed -i '' \
  -e "s|from '@/types/|from '../types/|g" \
  -e "s|from '@/lib/|from '../lib/|g" \
  src/contexts/hivelab-context.tsx

# Hooks (2 levels deep: src/hooks/)
echo "Fixing hooks..."
sed -i '' \
  -e "s|from '@/contexts/|from '../contexts/|g" \
  -e "s|from '@/lib/|from '../lib/|g" \
  -e "s|from '@/types/|from '../types/|g" \
  src/hooks/use-canvas-viewport.ts \
  src/hooks/use-connection-creation.ts

# Lib (2 levels deep: src/lib/)
echo "Fixing lib files..."
sed -i '' \
  -e "s|from '@/types/|from '../types/|g" \
  src/lib/hivelab-element-library.ts \
  src/lib/hivelab-utils.ts

echo "Done!"
