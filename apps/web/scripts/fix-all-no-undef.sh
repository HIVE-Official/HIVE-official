#!/bin/bash

echo "🔧 Comprehensive no-undef fix..."

# First, revert incorrect data. prefixes that were added
echo "Reverting incorrect data. prefixes..."
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's/data\.submittedAt\.toDate/submittedAt?.toDate/g' \
  -e 's/data\.reviewedAt\.toDate/reviewedAt?.toDate/g' \
  -e 's/data\.lastActiveAt\.toDate/lastActiveAt?.toDate/g' \
  -e 's/data\.createdAt\.toDate/createdAt?.toDate/g' \
  -e 's/data\.expiresAt\.toDate/expiresAt?.toDate/g' \
  -e 's/data\.startDate\.toDate/startDate?.toDate/g' \
  -e 's/data\.pinnedAt\.toDate/pinnedAt?.toDate/g' \
  -e 's/data\.publishedAt\.toDate/publishedAt?.toDate/g' \
  -e 's/data\.joinedAt\.toDate/joinedAt?.toDate/g' \
  -e 's/data\.rsvpDeadline\.toDate/rsvpDeadline?.toDate/g' \
  -e 's/data\.nextOccurrence\.toDate/nextOccurrence?.toDate/g' \
  -e 's/data\.timestamp\.toDate/timestamp?.toDate/g' {} \;

echo "✅ Reverted incorrect prefixes"

# Now fix the actual issues properly
echo "Fixing type imports and definitions..."

# Add global type declarations file
cat > src/types/global.d.ts << 'EOF'
// Global type declarations to fix no-undef errors

// Web API types
declare global {
  type RequestInit = globalThis.RequestInit;
  type HeadersInit = globalThis.HeadersInit;
  type NotificationPermission = 'default' | 'denied' | 'granted';
  type NotificationOptions = any;
  type NotificationInit = any;
  type EventListenerOrEventListenerObject = EventListener | EventListenerObject;
}

export {};
EOF

echo "✅ Added global type declarations"

# Fix missing React component imports
echo "Adding missing component imports..."

# Fix AnimatePresence
for file in $(grep -l "AnimatePresence" src/**/*.tsx 2>/dev/null); do
  if ! grep -q "import.*AnimatePresence.*from.*framer-motion" "$file"; then
    # Add import at the top of the file after 'use client' if present
    if grep -q "^'use client'" "$file"; then
      sed -i '' "/^'use client'/a\\
import { AnimatePresence } from 'framer-motion';" "$file"
    else
      sed -i '' "1i\\
import { AnimatePresence } from 'framer-motion';" "$file"
    fi
  fi
done

# Fix missing icon imports
for file in $(grep -l "<X\s\|<X>" src/**/*.tsx 2>/dev/null); do
  if ! grep -q "import.*\bX\b.*from.*lucide-react" "$file"; then
    if grep -q "^'use client'" "$file"; then
      sed -i '' "/^'use client'/a\\
import { X } from 'lucide-react';" "$file"
    else
      sed -i '' "1i\\
import { X } from 'lucide-react';" "$file"
    fi
  fi
done

for file in $(grep -l "<Lock\s\|<Lock>" src/**/*.tsx 2>/dev/null); do
  if ! grep -q "import.*\bLock\b.*from.*lucide-react" "$file"; then
    if grep -q "^'use client'" "$file"; then
      sed -i '' "/^'use client'/a\\
import { Lock } from 'lucide-react';" "$file"
    else
      sed -i '' "1i\\
import { Lock } from 'lucide-react';" "$file"
    fi
  fi
done

for file in $(grep -l "<Upload\s\|<Upload>" src/**/*.tsx 2>/dev/null); do
  if ! grep -q "import.*\bUpload\b.*from.*lucide-react" "$file"; then
    if grep -q "^'use client'" "$file"; then
      sed -i '' "/^'use client'/a\\
import { Upload } from 'lucide-react';" "$file"
    else
      sed -i '' "1i\\
import { Upload } from 'lucide-react';" "$file"
    fi
  fi
done

for file in $(grep -l "<Search\s\|<Search>" src/**/*.tsx 2>/dev/null); do
  if ! grep -q "import.*\bSearch\b.*from.*lucide-react" "$file"; then
    if grep -q "^'use client'" "$file"; then
      sed -i '' "/^'use client'/a\\
import { Search } from 'lucide-react';" "$file"
    else
      sed -i '' "1i\\
import { Search } from 'lucide-react';" "$file"
    fi
  fi
done

echo "✅ Fixed component imports"

# Fix Firebase imports
echo "Fixing Firebase imports..."

for file in $(grep -l "setDoc\(" src/**/*.ts 2>/dev/null); do
  if ! grep -q "import.*setDoc.*from.*firebase/firestore" "$file"; then
    sed -i '' "1i\\
import { setDoc, doc } from 'firebase/firestore';" "$file"
  fi
done

echo "✅ Fixed Firebase imports"

# Fix specific undefined variables in context
echo "Fixing context-specific undefined variables..."

# Fix in route handlers where doc.data() is used
for file in src/app/api/**/*.ts; do
  if [ -f "$file" ]; then
    # Fix patterns like: submittedAt?.toDate() where submittedAt should be data.submittedAt
    sed -i '' \
      -e 's/\([^a-zA-Z0-9_\.]\)\(submittedAt\|reviewedAt\|lastActiveAt\|createdAt\|expiresAt\|startDate\|pinnedAt\|publishedAt\|joinedAt\|rsvpDeadline\|nextOccurrence\|timestamp\)\.toDate()/\1data.\2?.toDate()/g' \
      -e 's/new Date(\(submittedAt\|reviewedAt\|lastActiveAt\|createdAt\|expiresAt\|startDate\|pinnedAt\|publishedAt\|joinedAt\|rsvpDeadline\|nextOccurrence\|timestamp\))/new Date(data.\1)/g' \
      "$file"
      
    # But don't double-prefix if data. is already there
    sed -i '' \
      -e 's/data\.data\./data./g' \
      "$file"
  fi
done

echo "✅ Fixed context-specific variables"

# Fix membership references
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "membership\." {} \; 2>/dev/null | while read file; do
  # Only fix standalone membership references, not ones already with a prefix
  sed -i '' 's/\([^a-zA-Z0-9_\.]\)membership\./\1data?.membership?./g' "$file"
done

echo "✅ Fixed membership references"

echo "🎯 Final check..."
ERROR_COUNT=$(npx eslint src 2>&1 | grep -c "no-undef" || echo "0")
echo "Remaining no-undef errors: $ERROR_COUNT"

echo "✅ Script complete!"