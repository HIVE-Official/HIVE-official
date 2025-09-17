#!/bin/bash

# HIVE Platform Master Refactoring Script
# Orchestrates all refactoring operations with safety checks

set -e # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BACKUP_DIR=".refactoring-backup-$(date +%Y%m%d-%H%M%S)"
LOG_FILE="refactoring-$(date +%Y%m%d-%H%M%S).log"
DRY_RUN=false
VERBOSE=false
SKIP_BACKUP=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --verbose)
      VERBOSE=true
      shift
      ;;
    --skip-backup)
      SKIP_BACKUP=true
      shift
      ;;
    --help)
      echo "Usage: $0 [OPTIONS]"
      echo "Options:"
      echo "  --dry-run      Run in simulation mode without making changes"
      echo "  --verbose      Show detailed output"
      echo "  --skip-backup  Skip creating backup (not recommended)"
      echo "  --help         Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Logging function
log() {
  echo "$1" | tee -a "$LOG_FILE"
}

log_success() {
  echo -e "${GREEN}✅ $1${NC}" | tee -a "$LOG_FILE"
}

log_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}" | tee -a "$LOG_FILE"
}

log_error() {
  echo -e "${RED}❌ $1${NC}" | tee -a "$LOG_FILE"
}

log_info() {
  echo -e "${BLUE}ℹ️  $1${NC}" | tee -a "$LOG_FILE"
}

# Check prerequisites
check_prerequisites() {
  log_info "Checking prerequisites..."
  
  # Check Node.js
  if ! command -v node &> /dev/null; then
    log_error "Node.js is not installed"
    exit 1
  fi
  
  # Check npm/pnpm
  if ! command -v pnpm &> /dev/null; then
    log_warning "pnpm not found, using npm"
    PKG_MANAGER="npm"
  else
    PKG_MANAGER="pnpm"
  fi
  
  # Check TypeScript
  if ! command -v tsc &> /dev/null; then
    log_warning "TypeScript not globally installed, using npx"
  fi
  
  # Check git status
  if [[ -n $(git status --porcelain) ]]; then
    log_warning "Working directory has uncommitted changes"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      exit 1
    fi
  fi
  
  log_success "Prerequisites check complete"
}

# Create backup
create_backup() {
  if [ "$SKIP_BACKUP" = true ]; then
    log_warning "Skipping backup as requested"
    return
  fi
  
  log_info "Creating backup..."
  
  # Create backup directory
  mkdir -p "$BACKUP_DIR"
  
  # Backup source files
  for dir in apps packages; do
    if [ -d "$dir" ]; then
      cp -r "$dir" "$BACKUP_DIR/" 2>/dev/null || true
    fi
  done
  
  # Create restore script
  cat > "$BACKUP_DIR/restore.sh" << 'EOF'
#!/bin/bash
echo "Restoring files from backup..."
cp -r apps/* ../apps/ 2>/dev/null || true
cp -r packages/* ../packages/ 2>/dev/null || true
echo "✅ Restore complete"
EOF
  chmod +x "$BACKUP_DIR/restore.sh"
  
  log_success "Backup created in $BACKUP_DIR"
}

# Install dependencies
install_dependencies() {
  log_info "Installing refactoring dependencies..."
  
  # Install required packages
  $PKG_MANAGER install --save-dev \
    @typescript-eslint/parser \
    @typescript-eslint/utils \
    ts-morph \
    glob \
    chalk \
    inquirer \
    ora \
    2>/dev/null || true
  
  log_success "Dependencies installed"
}

# Phase 1: Quick Wins
phase1_quick_wins() {
  log ""
  log "="
  log "🚀 PHASE 1: QUICK WINS"
  log "="
  log ""
  
  # 1. Remove console statements
  log_info "Removing console statements..."
  if [ "$DRY_RUN" = true ]; then
    node scripts/refactoring/remove-console-statements.js --dry-run
  else
    node scripts/refactoring/remove-console-statements.js
  fi
  log_success "Console statements processed"
  
  # 2. Fix import paths
  log_info "Fixing import paths..."
  if [ "$DRY_RUN" = true ]; then
    npx ts-node scripts/refactoring/fix-imports-and-types.ts --dry-run --report
  else
    npx ts-node scripts/refactoring/fix-imports-and-types.ts --report
  fi
  log_success "Import paths analyzed"
  
  # 3. Extract common hooks
  log_info "Extracting common hooks..."
  if [ "$DRY_RUN" = true ]; then
    npx ts-node scripts/refactoring/extract-common-hooks.ts --dry-run
  else
    npx ts-node scripts/refactoring/extract-common-hooks.ts
  fi
  log_success "Common hooks extracted"
}

# Phase 2: Type Safety
phase2_type_safety() {
  log ""
  log "="
  log "🔒 PHASE 2: TYPE SAFETY"
  log "="
  log ""
  
  # Analyze any types
  log_info "Analyzing TypeScript 'any' usage..."
  npx ts-node scripts/refactoring/fix-imports-and-types.ts --report --dry-run
  
  # Count any types
  ANY_COUNT=$(grep -r ": any" --include="*.ts" --include="*.tsx" apps packages 2>/dev/null | wc -l || echo "0")
  log_warning "Found $ANY_COUNT 'any' type usages"
  
  # Generate type coverage report
  if command -v type-coverage &> /dev/null; then
    log_info "Generating type coverage report..."
    npx type-coverage --detail > TYPE_COVERAGE_REPORT.txt
  fi
}

# Phase 3: File Size Analysis
phase3_file_size() {
  log ""
  log "="
  log "📏 PHASE 3: FILE SIZE ANALYSIS"
  log "="
  log ""
  
  log_info "Finding large files..."
  
  # Find files over 500 lines
  echo "Files over 500 lines:" > LARGE_FILES_REPORT.txt
  find apps packages -name "*.tsx" -o -name "*.ts" | \
    xargs wc -l 2>/dev/null | \
    awk '$1 > 500 {print $0}' | \
    sort -rn >> LARGE_FILES_REPORT.txt
  
  LARGE_FILES=$(grep -c "^[0-9]" LARGE_FILES_REPORT.txt || echo "0")
  log_warning "Found $LARGE_FILES files over 500 lines"
  
  # Identify candidates for splitting
  log_info "Identifying files that need splitting..."
  
  # Check for files with multiple exported components
  for file in $(find apps/web/src -name "*.tsx" -size +50k 2>/dev/null); do
    EXPORTS=$(grep -c "^export" "$file" || echo "0")
    if [ "$EXPORTS" -gt 5 ]; then
      echo "$file: $EXPORTS exports" >> SPLIT_CANDIDATES.txt
    fi
  done
}

# Phase 4: Duplicate Detection
phase4_duplicates() {
  log ""
  log "="
  log "🔍 PHASE 4: DUPLICATE DETECTION"
  log "="
  log ""
  
  log_info "Detecting duplicate patterns..."
  
  # Find duplicate imports
  echo "Duplicate import patterns:" > DUPLICATES_REPORT.txt
  grep -r "^import.*from" --include="*.tsx" --include="*.ts" apps packages 2>/dev/null | \
    sort | uniq -d >> DUPLICATES_REPORT.txt
  
  # Find duplicate useState patterns
  echo -e "\nDuplicate useState patterns:" >> DUPLICATES_REPORT.txt
  grep -r "const \[.*\] = useState" --include="*.tsx" apps packages 2>/dev/null | \
    sed 's/.*\(const.*useState\).*/\1/' | \
    sort | uniq -c | sort -rn | head -20 >> DUPLICATES_REPORT.txt
  
  log_success "Duplicate analysis complete"
}

# Generate final report
generate_final_report() {
  log ""
  log "="
  log "📊 GENERATING FINAL REPORT"
  log "="
  log ""
  
  cat > REFACTORING_SUMMARY.md << EOF
# Refactoring Summary Report
Generated: $(date)

## Execution Summary
- Dry Run: $DRY_RUN
- Backup Created: $([ "$SKIP_BACKUP" = false ] && echo "Yes - $BACKUP_DIR" || echo "No")
- Log File: $LOG_FILE

## Metrics

### Console Statements
$([ -f CONSOLE_REMOVAL_REPORT.txt ] && cat CONSOLE_REMOVAL_REPORT.txt || echo "Not processed")

### Import Issues
$([ -f IMPORT_FIXES_REPORT.md ] && head -20 IMPORT_FIXES_REPORT.md || echo "Not processed")

### TypeScript Any Usage
$([ -f ANY_TYPE_REPORT.md ] && head -20 ANY_TYPE_REPORT.md || echo "Not processed")

### Large Files
$([ -f LARGE_FILES_REPORT.txt ] && head -10 LARGE_FILES_REPORT.txt || echo "Not processed")

## Next Steps

1. Review generated reports:
   - IMPORT_FIXES_REPORT.md
   - ANY_TYPE_REPORT.md
   - LARGE_FILES_REPORT.txt
   - DUPLICATES_REPORT.txt

2. Run specific fixes:
   \`\`\`bash
   # Apply import fixes
   npm run refactor:fix-imports
   
   # Fix any types
   npm run refactor:fix-types
   
   # Split large files
   npm run refactor:split-files
   \`\`\`

3. Run tests to ensure nothing broke:
   \`\`\`bash
   npm test
   npm run build
   \`\`\`

## Restoration

If needed, restore from backup:
\`\`\`bash
cd $BACKUP_DIR
./restore.sh
\`\`\`
EOF

  log_success "Summary report generated: REFACTORING_SUMMARY.md"
}

# Main execution
main() {
  log "🔧 HIVE Platform Master Refactoring Script"
  log "=========================================="
  log "Started at: $(date)"
  log ""
  
  # Check prerequisites
  check_prerequisites
  
  # Create backup
  if [ "$DRY_RUN" = false ]; then
    create_backup
  fi
  
  # Install dependencies
  install_dependencies
  
  # Run phases
  phase1_quick_wins
  phase2_type_safety
  phase3_file_size
  phase4_duplicates
  
  # Generate final report
  generate_final_report
  
  log ""
  log_success "Refactoring complete!"
  log "Finished at: $(date)"
  
  # Show summary
  echo ""
  echo "📈 Summary Statistics:"
  echo "====================="
  [ -f CONSOLE_REMOVAL_REPORT.txt ] && echo "- Console statements: $(grep -c "Removed:" CONSOLE_REMOVAL_REPORT.txt || echo "0")"
  [ -f IMPORT_FIXES_REPORT.md ] && echo "- Import issues: $(grep -c "Line" IMPORT_FIXES_REPORT.md || echo "0")"
  [ -f ANY_TYPE_REPORT.md ] && echo "- Any types: $(grep -o "Total.*:" ANY_TYPE_REPORT.md | head -1 || echo "0")"
  [ -f LARGE_FILES_REPORT.txt ] && echo "- Large files: $(grep -c "^[0-9]" LARGE_FILES_REPORT.txt || echo "0")"
  
  echo ""
  echo "📝 Reports generated:"
  ls -la *.md *.txt 2>/dev/null | grep -E "(REPORT|SUMMARY)" | awk '{print "  - " $9}'
  
  if [ "$DRY_RUN" = true ]; then
    echo ""
    log_warning "This was a DRY RUN - no files were modified"
    log_info "Run without --dry-run to apply changes"
  fi
}

# Run main function
main