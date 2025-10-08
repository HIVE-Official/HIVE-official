#!/bin/bash

###############################################################################
# HIVE TypeScript Error Auto-Fix Script
# Fixes ~600 remaining errors after manual fixes
#
# BACKUP: commit ebbbffd3 | branch backup/pre-bulk-fix-20251004_130222
# Usage:
#   ./scripts/fix-typescript-errors.sh --dry-run    # Preview changes
#   ./scripts/fix-typescript-errors.sh              # Apply fixes
#   ./scripts/fix-typescript-errors.sh --rollback   # Undo changes
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DRY_RUN=false
ROLLBACK=false
BACKUP_DIR=".typescript-fix-backup"
LOG_FILE="typescript-fix.log"

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --rollback)
      ROLLBACK=true
      shift
      ;;
    --help)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --dry-run    Preview changes without applying them"
      echo "  --rollback   Restore from backup"
      echo "  --help       Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

###############################################################################
# Functions
###############################################################################

log() {
  echo -e "${GREEN}[$(date +'%H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
  echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
  echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

info() {
  echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

create_backup() {
  if [ "$DRY_RUN" = true ]; then
    return
  fi

  log "Creating backup in $BACKUP_DIR..."
  mkdir -p "$BACKUP_DIR"

  # Create timestamped backup
  TIMESTAMP=$(date +%Y%m%d_%H%M%S)
  BACKUP_ARCHIVE="$BACKUP_DIR/pre-autofix-$TIMESTAMP.tar.gz"

  tar -czf "$BACKUP_ARCHIVE" \
    apps/web/src \
    packages/ui/src \
    apps/web/tailwind.config.ts \
    2>/dev/null || true

  log "✓ Backup created: $BACKUP_ARCHIVE"
}

restore_backup() {
  if [ ! -d "$BACKUP_DIR" ]; then
    error "No backup directory found!"
    exit 1
  fi

  LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/*.tar.gz 2>/dev/null | head -1)

  if [ -z "$LATEST_BACKUP" ]; then
    error "No backup archives found!"
    exit 1
  fi

  warn "Restoring from: $LATEST_BACKUP"
  read -p "Are you sure? This will overwrite current files [y/N]: " -n 1 -r
  echo

  if [[ $REPLY =~ ^[Yy]$ ]]; then
    tar -xzf "$LATEST_BACKUP" -C .
    log "✓ Restored from backup"
  else
    log "Rollback cancelled"
  fi
}

find_and_replace() {
  local search="$1"
  local replace="$2"
  local file_pattern="$3"
  local description="$4"

  info "Processing: $description"

  if [ "$DRY_RUN" = true ]; then
    # Dry run - just count matches
    local count=$(find apps/web/src packages/ui/src -type f -name "$file_pattern" -exec grep -l "$search" {} \; 2>/dev/null | wc -l | tr -d ' ')
    if [ "$count" -gt 0 ]; then
      echo "  → Would modify $count files"
    else
      echo "  → No matches found"
    fi
  else
    # Actually replace
    find apps/web/src packages/ui/src -type f -name "$file_pattern" -exec sed -i '' "s/$search/$replace/g" {} \; 2>/dev/null || true
    log "  ✓ Applied: $description"
  fi
}

find_and_replace_multiline() {
  local file="$1"
  local search="$2"
  local replace="$3"
  local description="$4"

  if [ ! -f "$file" ]; then
    return
  fi

  info "Processing: $description in $file"

  if [ "$DRY_RUN" = true ]; then
    if grep -q "$search" "$file" 2>/dev/null; then
      echo "  → Would modify $file"
    fi
  else
    perl -i -pe "s/$search/$replace/g" "$file" 2>/dev/null || true
    log "  ✓ Applied: $description"
  fi
}

###############################################################################
# Main Script
###############################################################################

clear
echo "═══════════════════════════════════════════════════════════════"
echo "  HIVE TypeScript Error Auto-Fix Script"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Handle rollback
if [ "$ROLLBACK" = true ]; then
  restore_backup
  exit 0
fi

# Initialize log
echo "Starting at $(date)" > "$LOG_FILE"

if [ "$DRY_RUN" = true ]; then
  warn "DRY RUN MODE - No changes will be made"
  echo ""
else
  create_backup
  echo ""
fi

###############################################################################
# Category 1: Fix Component Imports (HiveButton → Button)
###############################################################################

log "━━━ Category 1: Component Import Fixes ━━━"
echo ""

# Fix HiveButton imports
find_and_replace \
  "import.*HiveButton.*from '@hive/ui'" \
  "import { Button } from '@hive/ui'" \
  "*.tsx" \
  "HiveButton → Button imports"

# Fix HiveCard imports
find_and_replace \
  "import.*HiveCard.*from '@hive/ui'" \
  "import { Card } from '@hive/ui'" \
  "*.tsx" \
  "HiveCard → Card imports"

# Fix HiveInput imports
find_and_replace \
  "import.*HiveInput.*from '@hive/ui'" \
  "import { Input } from '@hive/ui'" \
  "*.tsx" \
  "HiveInput → Input imports"

# Fix HiveModal imports
find_and_replace \
  "import.*HiveModal.*from '@hive/ui'" \
  "import { Dialog } from '@hive/ui'" \
  "*.tsx" \
  "HiveModal → Dialog imports"

# Fix HiveProgress imports
find_and_replace \
  "import.*HiveProgress.*from '@hive/ui'" \
  "import { Progress } from '@hive/ui'" \
  "*.tsx" \
  "HiveProgress → Progress imports"

###############################################################################
# Category 2: Fix Component Usage (JSX)
###############################################################################

log "━━━ Category 2: Component Usage Fixes ━━━"
echo ""

# Replace component tags
find_and_replace \
  "<HiveButton" \
  "<Button" \
  "*.tsx" \
  "HiveButton JSX tags"

find_and_replace \
  "</HiveButton>" \
  "</Button>" \
  "*.tsx" \
  "HiveButton closing tags"

find_and_replace \
  "<HiveCard" \
  "<Card" \
  "*.tsx" \
  "HiveCard JSX tags"

find_and_replace \
  "</HiveCard>" \
  "</Card>" \
  "*.tsx" \
  "HiveCard closing tags"

find_and_replace \
  "<HiveInput" \
  "<Input" \
  "*.tsx" \
  "HiveInput JSX tags"

find_and_replace \
  "<HiveModal" \
  "<Dialog" \
  "*.tsx" \
  "HiveModal JSX tags"

find_and_replace \
  "</HiveModal>" \
  "</Dialog>" \
  "*.tsx" \
  "HiveModal closing tags"

find_and_replace \
  "<HiveProgress" \
  "<Progress" \
  "*.tsx" \
  "HiveProgress JSX tags"

###############################################################################
# Category 3: Fix Button Variants
###############################################################################

log "━━━ Category 3: Button Variant Fixes ━━━"
echo ""

# Fix primary variant
find_and_replace \
  'variant="primary"' \
  'variant="default"' \
  "*.tsx" \
  "primary → default variant"

# Fix secondary variant
find_and_replace \
  'variant="secondary"' \
  'variant="outline"' \
  "*.tsx" \
  "secondary → outline variant"

# Fix invalid academic year variants
find_and_replace \
  'variant="freshman"' \
  'variant="default"' \
  "*.tsx" \
  "freshman → default variant"

find_and_replace \
  'variant="sophomore"' \
  'variant="default"' \
  "*.tsx" \
  "sophomore → default variant"

# Fix skill-tag variant
find_and_replace \
  'variant="skill-tag"' \
  'variant="outline"' \
  "*.tsx" \
  "skill-tag → outline variant"

# Fix building-tools variant
find_and_replace \
  'variant="building-tools"' \
  'variant="outline"' \
  "*.tsx" \
  "building-tools → outline variant"

###############################################################################
# Category 4: Fix Logger Error Calls
###############################################################################

log "━━━ Category 4: Logger Error Call Fixes ━━━"
echo ""

# Fix logger.error calls with single string parameter (should have context)
# Pattern: logger.error('message', errorString) → logger.error('message', new Error(errorString))
find_and_replace \
  "logger\.error\(([^,]+), \('([^']+)'\)\)" \
  "logger.error(\1, new Error('\2'))" \
  "*.ts" \
  "String error → Error object"

###############################################################################
# Category 5: Fix Specific Type Issues
###############################################################################

log "━━━ Category 5: Specific Type Fixes ━━━"
echo ""

# Fix uid property access on User type (should use id)
find_and_replace \
  "\.uid" \
  ".id" \
  "*.ts" \
  "user.uid → user.id"

# Fix notification type assignments
find_and_replace \
  "type: 'error'" \
  "type: 'system'" \
  "*.ts" \
  "notification error type"

###############################################################################
# Results Summary
###############################################################################

echo ""
echo "═══════════════════════════════════════════════════════════════"
if [ "$DRY_RUN" = true ]; then
  log "DRY RUN COMPLETE - Review changes above"
  echo ""
  info "To apply these changes, run:"
  info "  ./scripts/fix-typescript-errors.sh"
else
  log "✓ AUTO-FIX COMPLETE"
  echo ""
  info "Next steps:"
  info "  1. Run typecheck: export NODE_OPTIONS='--max-old-space-size=4096' && npx tsc --noEmit --skipLibCheck"
  info "  2. Review changes: git diff"
  info "  3. If issues: ./scripts/fix-typescript-errors.sh --rollback"
fi
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Log saved to: $LOG_FILE"
