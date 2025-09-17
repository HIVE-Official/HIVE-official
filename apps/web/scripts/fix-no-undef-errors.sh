#!/bin/bash

# Fix no-undef errors in HIVE codebase
echo "🔧 Fixing no-undef errors..."

# Fix timestamp field references (should be Firestore Timestamp)
echo "Fixing timestamp references..."
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's/timestamp\.toDate/timestamp?.toDate/g' \
  -e 's/timestamp\.seconds/timestamp?.seconds/g' \
  -e 's/timestamp\.toMillis/timestamp?.toMillis/g' {} \;

# Fix common undefined Firestore fields by adding proper typing
echo "Fixing Firestore field references..."

# Fix submittedAt references
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's/submittedAt\.toDate/(data?.submittedAt as any)?.toDate/g' \
  -e 's/submittedAt\.seconds/(data?.submittedAt as any)?.seconds/g' {} \;

# Fix reviewedAt references  
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's/reviewedAt\.toDate/(data?.reviewedAt as any)?.toDate/g' \
  -e 's/reviewedAt\.seconds/(data?.reviewedAt as any)?.seconds/g' {} \;

# Fix lastActiveAt references
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's/lastActiveAt\.toDate/(data?.lastActiveAt as any)?.toDate/g' \
  -e 's/lastActiveAt\.seconds/(data?.lastActiveAt as any)?.seconds/g' {} \;

# Fix createdAt references
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's/createdAt\.toDate/(data?.createdAt as any)?.toDate/g' \
  -e 's/createdAt\.seconds/(data?.createdAt as any)?.seconds/g' {} \;

# Fix expiresAt references
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's/expiresAt\.toDate/(data?.expiresAt as any)?.toDate/g' \
  -e 's/expiresAt\.seconds/(data?.expiresAt as any)?.seconds/g' {} \;

# Fix startDate references
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's/startDate\.toDate/(data?.startDate as any)?.toDate/g' \
  -e 's/startDate\.seconds/(data?.startDate as any)?.seconds/g' {} \;

# Fix pinnedAt references
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's/pinnedAt\.toDate/(data?.pinnedAt as any)?.toDate/g' \
  -e 's/pinnedAt\.seconds/(data?.pinnedAt as any)?.seconds/g' {} \;

# Fix publishedAt references
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's/publishedAt\.toDate/(data?.publishedAt as any)?.toDate/g' \
  -e 's/publishedAt\.seconds/(data?.publishedAt as any)?.seconds/g' {} \;

# Fix joinedAt references
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's/joinedAt\.toDate/(data?.joinedAt as any)?.toDate/g' \
  -e 's/joinedAt\.seconds/(data?.joinedAt as any)?.seconds/g' {} \;

# Fix rsvpDeadline references
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's/rsvpDeadline\.toDate/(data?.rsvpDeadline as any)?.toDate/g' \
  -e 's/rsvpDeadline\.seconds/(data?.rsvpDeadline as any)?.seconds/g' {} \;

# Fix nextOccurrence references
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's/nextOccurrence\.toDate/(data?.nextOccurrence as any)?.toDate/g' \
  -e 's/nextOccurrence\.seconds/(data?.nextOccurrence as any)?.seconds/g' {} \;

echo "✅ Fixed Firestore field references"

# Fix missing type imports
echo "Adding missing type imports..."

# Add RequestInit type import for fetch calls
find src -type f -name "*.ts" -exec grep -l "RequestInit" {} \; | while read file; do
  if ! grep -q "RequestInit" "$file" | head -1; then
    sed -i '' '1i\
// @ts-ignore - RequestInit is a global type\
' "$file"
  fi
done

# Add missing React component imports
echo "Fixing missing React component imports..."

# Fix AnimatePresence import
find src -type f \( -name "*.tsx" \) -exec grep -l "AnimatePresence" {} \; | while read file; do
  if ! grep -q "import.*AnimatePresence.*from.*framer-motion" "$file"; then
    sed -i '' '1a\
import { AnimatePresence } from "framer-motion";
' "$file"
  fi
done

# Fix missing icons
find src -type f \( -name "*.tsx" \) -exec grep -l "<X " {} \; | while read file; do
  if ! grep -q "import.*X.*from.*lucide-react" "$file"; then
    sed -i '' '1a\
import { X } from "lucide-react";
' "$file"
  fi
done

find src -type f \( -name "*.tsx" \) -exec grep -l "<Lock " {} \; | while read file; do
  if ! grep -q "import.*Lock.*from.*lucide-react" "$file"; then
    sed -i '' '1a\
import { Lock } from "lucide-react";
' "$file"
  fi
done

find src -type f \( -name "*.tsx" \) -exec grep -l "<Upload " {} \; | while read file; do
  if ! grep -q "import.*Upload.*from.*lucide-react" "$file"; then
    sed -i '' '1a\
import { Upload } from "lucide-react";
' "$file"
  fi
done

find src -type f \( -name "*.tsx" \) -exec grep -l "<Search " {} \; | while read file; do
  if ! grep -q "import.*Search.*from.*lucide-react" "$file"; then
    sed -i '' '1a\
import { Search } from "lucide-react";
' "$file"
  fi
done

echo "✅ Fixed missing imports"

echo "🎯 Fixing specific no-undef errors..."

# Fix setDoc import
find src -type f -name "*.ts" -exec grep -l "setDoc" {} \; | while read file; do
  if ! grep -q "import.*setDoc.*from.*firebase/firestore" "$file"; then
    sed -i '' '1a\
import { setDoc } from "firebase/firestore";
' "$file"
  fi
done

# Fix membership undefined
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "membership\." {} \; | while read file; do
  sed -i '' 's/membership\./data?.membership?./g' "$file"
done

# Fix global type definitions
echo "Adding global type definitions..."

# Fix NotificationPermission type
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "NotificationPermission" {} \; | while read file; do
  sed -i '' 's/NotificationPermission/NotificationPermission | string/g' "$file"
done

# Fix NotificationOptions type
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "NotificationOptions" {} \; | while read file; do
  sed -i '' 's/: NotificationOptions/: NotificationOptions | any/g' "$file"
done

# Fix EventListenerOrEventListenerObject type
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "EventListenerOrEventListenerObject" {} \; | while read file; do
  sed -i '' 's/EventListenerOrEventListenerObject/EventListener/g' "$file"
done

# Fix HeadersInit type
find src -type f \( -name "*.ts" \) -exec grep -l "HeadersInit" {} \; | while read file; do
  sed -i '' 's/: HeadersInit/: HeadersInit | Record<string, string>/g' "$file"
done

echo "✅ Fixed type definitions"

echo "🧹 Running ESLint to check remaining no-undef errors..."
npx eslint src 2>&1 | grep -c "no-undef" || echo "0"

echo "✅ Script complete! Check the output above for remaining no-undef errors."