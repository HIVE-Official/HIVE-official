#!/bin/bash

# HIVE Feature Development Workflow
# Start a new feature with proper branch and setup

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Check if feature name provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Please provide a feature name${NC}"
    echo "Usage: ./scripts/workflow/start-feature.sh <feature-name>"
    echo "Example: ./scripts/workflow/start-feature.sh add-notification-system"
    exit 1
fi

FEATURE_NAME=$1
BRANCH_NAME="feature/$FEATURE_NAME"

echo -e "${BLUE}🚀 Starting Feature: ${CYAN}$FEATURE_NAME${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. Ensure working directory is clean
echo -e "\n${YELLOW}→ Checking working directory${NC}"
if [ -n "$(git status --porcelain)" ]; then
    echo -e "  ${RED}✗ Working directory not clean${NC}"
    echo -e "  ${YELLOW}Uncommitted changes:${NC}"
    git status --short
    echo ""
    read -p "Stash changes and continue? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git stash push -m "WIP: Before starting $FEATURE_NAME"
        echo -e "  ${GREEN}✓ Changes stashed${NC}"
    else
        echo -e "  ${RED}Aborting...${NC}"
        exit 1
    fi
else
    echo -e "  ${GREEN}✓ Working directory clean${NC}"
fi

# 2. Update main branch
echo -e "\n${YELLOW}→ Updating main branch${NC}"
git checkout main > /dev/null 2>&1
git pull origin main > /dev/null 2>&1
echo -e "  ${GREEN}✓ Main branch updated${NC}"

# 3. Create feature branch
echo -e "\n${YELLOW}→ Creating feature branch${NC}"
if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
    echo -e "  ${RED}✗ Branch '$BRANCH_NAME' already exists${NC}"
    read -p "Switch to existing branch? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout "$BRANCH_NAME"
        echo -e "  ${GREEN}✓ Switched to $BRANCH_NAME${NC}"
    else
        exit 1
    fi
else
    git checkout -b "$BRANCH_NAME"
    echo -e "  ${GREEN}✓ Created branch: $BRANCH_NAME${NC}"
fi

# 4. Install dependencies
echo -e "\n${YELLOW}→ Installing dependencies${NC}"
pnpm install > /dev/null 2>&1
echo -e "  ${GREEN}✓ Dependencies up to date${NC}"

# 5. Run initial checks
echo -e "\n${YELLOW}→ Running initial checks${NC}"
if NODE_OPTIONS='--max-old-space-size=4096' pnpm typecheck > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓ TypeScript validation passed${NC}"
else
    echo -e "  ${YELLOW}⚠ TypeScript has existing issues${NC}"
fi

if NODE_OPTIONS='--max-old-space-size=4096' pnpm lint --quiet > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓ ESLint validation passed${NC}"
else
    echo -e "  ${YELLOW}⚠ ESLint has existing warnings${NC}"
fi

# 6. Create feature documentation
echo -e "\n${YELLOW}→ Feature documentation${NC}"
FEATURE_DOC="docs/features/$FEATURE_NAME.md"
mkdir -p docs/features

if [ ! -f "$FEATURE_DOC" ]; then
    cat > "$FEATURE_DOC" << EOF
# Feature: ${FEATURE_NAME}

## Overview
Brief description of what this feature does.

## User Story
As a [user type]
I want to [action]
So that [benefit]

## Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2
- [ ] Criteria 3

## Technical Implementation

### Components
- List key components

### API Endpoints
- List API routes

### Database Changes
- List any Firestore changes

### Dependencies
- List new packages or dependencies

## Testing Plan
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Manual testing

## Rollout Plan
- [ ] Development
- [ ] Testing
- [ ] Code review
- [ ] Deployment

## Notes
Additional implementation notes.

---
Created: $(date +"%Y-%m-%d")
Branch: $BRANCH_NAME
EOF
    echo -e "  ${GREEN}✓ Created $FEATURE_DOC${NC}"
    echo -e "  ${YELLOW}Edit this file to document your feature${NC}"
else
    echo -e "  ${BLUE}ℹ Feature doc already exists${NC}"
fi

# 7. Start development server
echo -e "\n${YELLOW}→ Development environment${NC}"
echo -e "  ${CYAN}Commands available:${NC}"
echo -e "  ${BLUE}pnpm dev${NC}           - Start development server"
echo -e "  ${BLUE}pnpm workflow:check${NC} - Run all quality checks"
echo -e "  ${BLUE}pnpm workflow:fix${NC}   - Auto-fix issues"
echo -e "  ${BLUE}pnpm test${NC}          - Run tests"
echo ""

# 8. Set up git hooks for this branch
echo -e "${YELLOW}→ Git hooks${NC}"
if [ -f .git/hooks/pre-commit ]; then
    echo -e "  ${GREEN}✓ Pre-commit hook active${NC}"
else
    echo -e "  ${YELLOW}Installing pre-commit hook...${NC}"
    cp scripts/workflow/pre-commit.sh .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
    echo -e "  ${GREEN}✓ Pre-commit hook installed${NC}"
fi

# Summary
echo -e "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Feature environment ready!${NC}"
echo ""
echo -e "Branch: ${CYAN}$BRANCH_NAME${NC}"
echo -e "Documentation: ${CYAN}$FEATURE_DOC${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Edit ${CYAN}$FEATURE_DOC${NC} to plan your feature"
echo -e "2. Start coding with ${BLUE}pnpm dev${NC}"
echo -e "3. Check your work with ${BLUE}pnpm workflow:check${NC}"
echo -e "4. Commit often with meaningful messages"
echo -e "5. Push and create PR when ready"
echo ""

# Ask if they want to start dev server
read -p "Start development server now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "\n${GREEN}Starting development server...${NC}"
    pnpm dev
fi