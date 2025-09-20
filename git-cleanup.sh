#!/bin/bash

# HIVE Git Repository Cleanup Script
# Purpose: Clean up test builds and obsolete files while preserving important work

echo "🧹 HIVE Git Repository Cleanup"
echo "================================"
echo ""

# Count deletions
TOTAL_DELETIONS=$(git status --porcelain | grep "^ D" | wc -l | xargs)
STORYBOOK_DELETIONS=$(git status --porcelain | grep "^ D" | awk '{print $2}' | grep -E "storybook-.*-test|error-fix-test|css-fix-test|bulk-ui-fix-test|comprehensive-fix-test|enhanced-|COMPLETE-SPACES|FINAL-SPACES|ULTIMATE-SPACES" | wc -l | xargs)
DOC_DELETIONS=$(git status --porcelain | grep "^ D" | awk '{print $2}' | grep -E "\.(md|MD)$" | wc -l | xargs)

echo "📊 Git Status Summary:"
echo "  - Total deletions: $TOTAL_DELETIONS files"
echo "  - Storybook test builds: $STORYBOOK_DELETIONS files"
echo "  - Documentation files: $DOC_DELETIONS files"
echo ""

# Category 1: Safe to delete - Storybook test builds
echo "📦 Category 1: Storybook Test Builds (SAFE TO DELETE)"
echo "These are temporary test build artifacts from Storybook integration work:"
git status --porcelain | grep "^ D" | awk '{print $2}' | cut -d'/' -f1 | grep -E "storybook-.*-test|.*-fix-test|.*-verification|.*-SUCCESS" | sort | uniq | head -10

echo ""
echo "🔧 Category 2: Build/Fix Scripts (REVIEW NEEDED)"
echo "These are temporary fix scripts that may no longer be needed:"
git status --porcelain | grep "^ D" | awk '{print $2}' | grep -E "\.(sh|js|mjs)$" | grep -E "fix|cleanup|test" | head -10

echo ""
echo "📄 Category 3: Documentation (REVIEW NEEDED)"
echo "These documentation files were deleted - verify they're obsolete:"
git status --porcelain | grep "^ D" | awk '{print $2}' | grep -E "\.md$" | grep -vE "node_modules|storybook-" | head -10

echo ""
echo "✅ Category 4: Modified Files (KEEP CHANGES)"
echo "These files have been modified and should be reviewed separately:"
echo "  - Modified files: $(git status --porcelain | grep "^ M" | wc -l | xargs)"
echo "  - Main areas: apps/web, packages/ui, API routes"

echo ""
echo "======================================"
echo "🎯 RECOMMENDED ACTIONS:"
echo "======================================"
echo ""
echo "1️⃣  Remove all Storybook test builds (4,449 files):"
echo "    git rm \$(git status --porcelain | grep '^ D' | awk '{print \$2}' | grep -E 'storybook-.*-test|.*-fix-test|.*-verification|.*-SUCCESS|COMPLETE-SPACES|FINAL-SPACES|ULTIMATE-SPACES')"
echo ""
echo "2️⃣  Remove obsolete fix scripts:"
echo "    git rm \$(git status --porcelain | grep '^ D' | awk '{print \$2}' | grep -E 'cleanup-debug|fix-jsx|fix-style|fix-syntax|fix-over')"
echo ""
echo "3️⃣  Review and selectively remove docs:"
echo "    # Review each doc file before removing"
echo "    git status --porcelain | grep '^ D' | awk '{print \$2}' | grep -E '\.md$' | less"
echo ""
echo "4️⃣  Stage all modified files for review:"
echo "    git add -u"
echo ""
echo "5️⃣  Create a cleanup commit:"
echo "    git commit -m '🧹 Clean up test builds and obsolete artifacts'"
echo ""

# Function to execute cleanup
cleanup_storybook() {
    echo "🗑️  Removing Storybook test builds..."
    git status --porcelain | grep '^ D' | awk '{print $2}' | grep -E 'storybook-.*-test|.*-fix-test|.*-verification|.*-SUCCESS|COMPLETE-SPACES|FINAL-SPACES|ULTIMATE-SPACES' | xargs -I {} git rm "{}" 2>/dev/null
    echo "✅ Storybook test builds removed"
}

cleanup_scripts() {
    echo "🗑️  Removing obsolete fix scripts..."
    git status --porcelain | grep '^ D' | awk '{print $2}' | grep -E '(cleanup-debug|fix-jsx|fix-style|fix-syntax|fix-over|comprehensive-jsx|ultimate-jsx|final-comprehensive).*\.(sh|js)$' | xargs -I {} git rm "{}" 2>/dev/null
    echo "✅ Obsolete scripts removed"
}

# Interactive mode
echo ""
echo "🤔 Would you like to proceed with automatic cleanup?"
echo "   This will remove all test builds and obsolete scripts."
echo "   Type 'yes' to proceed, or 'no' to exit and review manually:"
read -r response

if [ "$response" = "yes" ]; then
    cleanup_storybook
    cleanup_scripts
    echo ""
    echo "✅ Cleanup complete! Review remaining files with: git status"
    echo "   Then commit with: git commit -m '🧹 Clean up test builds and obsolete artifacts'"
else
    echo "👍 Manual review mode. Use the commands above to clean up selectively."
fi