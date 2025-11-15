#!/bin/bash

# HIVE Firebase Production Deployment Script
# Run this script to deploy to Firebase production

set -e  # Exit on error

echo "🐝 HIVE Firebase Production Deployment"
echo "======================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}❌ Firebase CLI is not installed${NC}"
    echo "Install it with: npm install -g firebase-tools"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "firebase.json" ]; then
    echo -e "${RED}❌ Not in HIVE root directory${NC}"
    echo "Please run this script from the project root"
    exit 1
fi

# Function to confirm action
confirm() {
    read -p "$1 (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        return 1
    fi
    return 0
}

echo -e "${YELLOW}⚠️  Pre-deployment Checklist:${NC}"
echo "[ ] Have you tested in development?"
echo "[ ] Are all environment variables set in Vercel?"
echo "[ ] Have you backed up the database?"
echo "[ ] Is the domain configured?"
echo ""

if ! confirm "Ready to proceed with deployment?"; then
    echo "Deployment cancelled"
    exit 0
fi

# Select Firebase project
echo -e "\n${GREEN}1. Selecting Firebase project...${NC}"
firebase use hive-production || {
    echo -e "${YELLOW}Project not found. Setting up...${NC}"
    firebase use --add
}

# Deploy Firestore rules
echo -e "\n${GREEN}2. Deploying Firestore security rules...${NC}"
if [ -f "firestore.production.rules" ]; then
    cp firestore.production.rules firestore.rules
    echo "Using production rules"
fi
firebase deploy --only firestore:rules

# Deploy Storage rules
echo -e "\n${GREEN}3. Deploying Storage security rules...${NC}"
if [ -f "storage.production.rules" ]; then
    cp storage.production.rules storage.rules
    echo "Using production storage rules"
fi
firebase deploy --only storage:rules

# Deploy Firestore indexes
echo -e "\n${GREEN}4. Deploying Firestore indexes...${NC}"
firebase deploy --only firestore:indexes

# Deploy Firebase Functions (if any)
if [ -d "functions" ]; then
    echo -e "\n${GREEN}5. Deploying Firebase Functions...${NC}"
    cd functions
    npm install
    npm run build
    cd ..
    firebase deploy --only functions
else
    echo -e "\n${YELLOW}5. No Firebase Functions to deploy${NC}"
fi

# Deploy to Firebase Hosting (if using)
if confirm "Deploy to Firebase Hosting?"; then
    echo -e "\n${GREEN}6. Building Next.js app...${NC}"
    pnpm build --filter=web

    echo -e "\n${GREEN}7. Deploying to Firebase Hosting...${NC}"
    firebase deploy --only hosting
else
    echo -e "\n${YELLOW}Skipping Firebase Hosting deployment${NC}"
fi

# Run post-deployment tests
echo -e "\n${GREEN}8. Running post-deployment checks...${NC}"

# Test authentication
echo -n "Testing authentication endpoint... "
curl -s -o /dev/null -w "%{http_code}" https://yourdomain.com/api/auth/session | {
    read status
    if [ "$status" -eq 200 ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗ (Status: $status)${NC}"
    fi
}

# Test Firestore connection
echo -n "Testing Firestore connection... "
curl -s -o /dev/null -w "%{http_code}" https://yourdomain.com/api/health | {
    read status
    if [ "$status" -eq 200 ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗ (Status: $status)${NC}"
    fi
}

echo -e "\n${GREEN}✅ Deployment Complete!${NC}"
echo "======================================="
echo ""
echo "Next steps:"
echo "1. Monitor Firebase Console for errors"
echo "2. Check email delivery in Authentication"
echo "3. Verify security rules are working"
echo "4. Test critical user flows"
echo ""
echo "Dashboard: https://console.firebase.google.com/project/hive-production"
echo "Your app: https://yourdomain.com"