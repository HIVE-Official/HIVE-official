#!/bin/bash

# UI/UX Polish - Critical Path Audit Script
# Usage: bash scripts/polish/audit-critical-paths.sh

echo "🎨 HIVE UI/UX Polish - Critical Path Audit"
echo "=========================================="
echo ""
echo "This script will guide you through testing critical paths"
echo "and documenting friction points for polish work."
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Create audit log
AUDIT_LOG="docs/polish/audit-$(date +%Y%m%d-%H%M%S).md"
mkdir -p docs/polish

echo "# HIVE UI/UX Polish Audit" > "$AUDIT_LOG"
echo "**Date**: $(date)" >> "$AUDIT_LOG"
echo "**Auditor**: $USER" >> "$AUDIT_LOG"
echo "" >> "$AUDIT_LOG"

echo -e "${YELLOW}📋 Instructions:${NC}"
echo "1. Open http://localhost:3000 on your mobile device"
echo "2. Follow the prompts to test each critical path"
echo "3. Document issues as you find them"
echo ""

# Function to test a path
test_path() {
  local path_name="$1"
  local path_description="$2"

  echo "" >> "$AUDIT_LOG"
  echo "## $path_name" >> "$AUDIT_LOG"
  echo "" >> "$AUDIT_LOG"

  echo -e "${GREEN}Testing: $path_name${NC}"
  echo "$path_description"
  echo ""

  read -p "Press ENTER when you've completed this path..."

  echo -e "${YELLOW}Did you encounter any issues? (y/n)${NC}"
  read -r has_issues

  if [ "$has_issues" = "y" ]; then
    echo -e "${YELLOW}Describe the issue:${NC}"
    read -r issue_description

    echo -e "${YELLOW}Impact (high/medium/low):${NC}"
    read -r impact

    echo -e "${YELLOW}Estimated fix time (hours):${NC}"
    read -r fix_time

    # Log issue
    echo "### ❌ Issue Found" >> "$AUDIT_LOG"
    echo "- **Description**: $issue_description" >> "$AUDIT_LOG"
    echo "- **Impact**: $impact" >> "$AUDIT_LOG"
    echo "- **Fix Time**: $fix_time hours" >> "$AUDIT_LOG"
    echo "- **Priority**: $([ "$impact" = "high" ] && echo "P0" || echo "P1")" >> "$AUDIT_LOG"
    echo "" >> "$AUDIT_LOG"
  else
    echo "### ✅ No Issues" >> "$AUDIT_LOG"
    echo "" >> "$AUDIT_LOG"
  fi
}

echo -e "${GREEN}Starting Critical Path Tests...${NC}"
echo ""

# Test 1: Core Loop
test_path "Test 1: Core Loop (< 3 seconds)" \
"1. Open app (not logged in)
2. Sign up with @buffalo.edu email
3. Verify email
4. See feed with content
5. Measure total time from open → feed visible

Target: < 3 seconds"

# Test 2: Feed Interaction
test_path "Test 2: Feed Interaction" \
"1. Scroll through feed
2. Tap upvote on a post
3. Tap comment
4. Submit a comment
5. Go back to feed

Look for: Loading states, feedback, smooth animations"

# Test 3: Space Flow
test_path "Test 3: Space Flow" \
"1. Tap 'Spaces' in navigation
2. Browse spaces
3. Join a space
4. View space detail
5. Create a post

Look for: Loading states, optimistic updates, empty states"

# Test 4: Profile View
test_path "Test 4: Profile View" \
"1. Tap your profile in navigation
2. Wait for profile to load
3. Tap 'Edit Profile'
4. Upload a photo
5. Save changes

Look for: Loading states, upload progress, success feedback"

# Test 5: HiveLab
test_path "Test 5: HiveLab Tools" \
"1. Tap 'HiveLab' in navigation
2. Browse tool library
3. Run a tool
4. View results

Look for: Loading states, empty states, error handling"

# Test 6: Error Cases
test_path "Test 6: Error Handling" \
"1. Turn on airplane mode
2. Try to create a post
3. Try to join a space
4. Try to load feed
5. Turn off airplane mode

Look for: Error messages, retry options, recovery"

# Test 7: Mobile Responsiveness
test_path "Test 7: Mobile Experience" \
"1. Test on small screen (iPhone SE)
2. Test on large screen (iPhone Pro Max)
3. Rotate device (portrait/landscape)
4. Test touch targets (are they big enough?)

Look for: Layout issues, tiny buttons, text overflow"

# Summarize
echo "" >> "$AUDIT_LOG"
echo "---" >> "$AUDIT_LOG"
echo "" >> "$AUDIT_LOG"
echo "## Summary" >> "$AUDIT_LOG"
echo "" >> "$AUDIT_LOG"

# Count issues
issue_count=$(grep -c "❌ Issue Found" "$AUDIT_LOG" || echo "0")

echo "- **Total Issues Found**: $issue_count" >> "$AUDIT_LOG"
echo "- **Next Steps**: Prioritize P0 issues and create polish backlog" >> "$AUDIT_LOG"
echo "" >> "$AUDIT_LOG"

echo ""
echo -e "${GREEN}✅ Audit Complete!${NC}"
echo ""
echo "Audit log saved to: $AUDIT_LOG"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Review the audit log: $AUDIT_LOG"
echo "2. Prioritize issues (P0 = must fix, P1 = should fix)"
echo "3. Add to TODO.md under 'Week 6: UI/UX Polish'"
echo "4. Start with P0 loading states"
echo ""
