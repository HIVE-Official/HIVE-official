#!/bin/bash

# Script to remove console.log statements from the codebase
# and replace with structured logging where appropriate

echo "🟡 TEAM YELLOW: Removing console.log statements from web app..."
echo "============================================"

# Count initial console.logs
INITIAL_COUNT=$(grep -r "console\.log" apps/web/src --include="*.ts" --include="*.tsx" | wc -l | tr -d ' ')
echo "📊 Found $INITIAL_COUNT console.log statements to remove"

# Create backup directory
BACKUP_DIR="apps/web/.console-log-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📁 Created backup directory: $BACKUP_DIR"

# Process TypeScript and TSX files
echo ""
echo "🔄 Processing files..."

# Find all files with console.log
FILES_WITH_CONSOLE=$(grep -rl "console\.log" apps/web/src --include="*.ts" --include="*.tsx")

for file in $FILES_WITH_CONSOLE; do
    # Create backup
    cp "$file" "$BACKUP_DIR/$(basename $file)"

    # Determine appropriate replacement based on context
    # For now, we'll remove simple console.logs and comment out complex ones

    # Remove simple console.log statements (single line)
    sed -i '' '/^[[:space:]]*console\.log(/d' "$file"

    # Comment out multi-line console.log statements
    sed -i '' 's/console\.log(/\/\/ REMOVED: console.log(/g' "$file"

    # Remove console.error, console.warn, console.debug
    sed -i '' '/^[[:space:]]*console\.error(/d' "$file"
    sed -i '' '/^[[:space:]]*console\.warn(/d' "$file"
    sed -i '' '/^[[:space:]]*console\.debug(/d' "$file"

    echo "✅ Processed: $(basename $file)"
done

# Count remaining console statements
FINAL_COUNT=$(grep -r "console\." apps/web/src --include="*.ts" --include="*.tsx" | wc -l | tr -d ' ')
REMOVED=$((INITIAL_COUNT - FINAL_COUNT))

echo ""
echo "============================================"
echo "✨ Console.log Removal Complete!"
echo "📊 Removed: $REMOVED statements"
echo "📊 Remaining: $FINAL_COUNT statements (commented or in special contexts)"
echo "💾 Backups saved to: $BACKUP_DIR"
echo ""
echo "🔍 To review remaining console statements:"
echo "grep -r 'REMOVED: console' apps/web/src --include='*.ts' --include='*.tsx'"
echo ""
echo "📝 Next steps:"
echo "1. Review commented console.logs and replace with structured logging"
echo "2. Import logger where needed: import { logInfo, logError } from '@/lib/structured-logger'"
echo "3. Run tests to ensure nothing broke"
echo "============================================"