#!/bin/bash

# HIVE Firebase Quick Setup Script
# This script helps you set up Firebase for HIVE production

set -e

echo "🐝 HIVE Firebase Quick Setup"
echo "============================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${YELLOW}This script will help you set up Firebase for HIVE production.${NC}"
echo -e "${YELLOW}Make sure you have:${NC}"
echo "1. A Google account"
echo "2. A credit card (for Blaze plan)"
echo "3. About 15 minutes"
echo ""

read -p "Ready to continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 0
fi

# Install Firebase CLI if not installed
if ! command -v firebase &> /dev/null; then
    echo -e "\n${BLUE}Installing Firebase CLI...${NC}"
    npm install -g firebase-tools
fi

# Login to Firebase
echo -e "\n${BLUE}Step 1: Logging into Firebase${NC}"
firebase login

# Create new project
echo -e "\n${BLUE}Step 2: Creating Firebase Project${NC}"
echo "Suggested project ID: hive-production"
echo "Opening Firebase Console in browser..."

# Open Firebase Console
if [[ "$OSTYPE" == "darwin"* ]]; then
    open "https://console.firebase.google.com"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "https://console.firebase.google.com"
else
    echo "Please open: https://console.firebase.google.com"
fi

echo -e "\n${YELLOW}Please create a new project in Firebase Console with these settings:${NC}"
echo "- Project name: HIVE Production"
echo "- Project ID: hive-production (or similar)"
echo "- Enable Google Analytics: Yes"
echo "- Choose 'nam5 (United States)' for Firestore location"
echo ""
read -p "Press Enter when project is created..."

# Initialize Firebase in project
echo -e "\n${BLUE}Step 3: Initializing Firebase in project${NC}"
firebase init

echo -e "\n${YELLOW}Select the following options:${NC}"
echo "- Firestore: Yes"
echo "- Storage: Yes"
echo "- Hosting: No (using Vercel)"
echo "- Functions: No (unless needed)"
echo "- Use existing project: hive-production"
echo ""

# Set up environment file
echo -e "\n${BLUE}Step 4: Setting up environment variables${NC}"
if [ ! -f ".env.production" ]; then
    cp .env.production.template .env.production
    echo -e "${GREEN}Created .env.production from template${NC}"
else
    echo -e "${YELLOW}.env.production already exists${NC}"
fi

echo -e "\n${YELLOW}Now you need to:${NC}"
echo "1. Go to Firebase Console > Project Settings > General"
echo "2. Scroll down to 'Your apps' and click 'Add app' > Web"
echo "3. Register app with nickname 'HIVE Web'"
echo "4. Copy the configuration values to .env.production"
echo ""
read -p "Press Enter when configuration is copied..."

# Set up service account
echo -e "\n${BLUE}Step 5: Setting up service account${NC}"
echo "1. Go to Firebase Console > Project Settings > Service Accounts"
echo "2. Click 'Generate new private key'"
echo "3. Save the JSON file as 'service-account.json' in project root"
echo "4. Copy the values to .env.production (FIREBASE_PRIVATE_KEY, etc.)"
echo ""
read -p "Press Enter when service account is set up..."

# Enable services
echo -e "\n${BLUE}Step 6: Enabling Firebase services${NC}"
echo -e "${YELLOW}Please enable these services in Firebase Console:${NC}"
echo ""
echo "[ ] Authentication > Sign-in method > Email/Password"
echo "[ ] Authentication > Sign-in method > Email link"
echo "[ ] Authentication > Settings > Authorized domains > Add your domain"
echo "[ ] Firestore Database > Create database > Production mode"
echo "[ ] Storage > Get started"
echo "[ ] App Check > Register your app > reCAPTCHA v3"
echo ""
read -p "Press Enter when all services are enabled..."

# Deploy rules
echo -e "\n${BLUE}Step 7: Deploying security rules${NC}"
if [ -f "firestore.production.rules" ]; then
    cp firestore.production.rules firestore.rules
fi
firebase deploy --only firestore:rules,storage:rules

# Configure email templates
echo -e "\n${BLUE}Step 8: Email template setup${NC}"
echo -e "${YELLOW}Copy the templates from firebase-auth-templates.html to:${NC}"
echo "Firebase Console > Authentication > Templates"
echo ""
read -p "Press Enter when email templates are configured..."

# Final setup
echo -e "\n${BLUE}Step 9: Final configuration${NC}"
echo -e "${YELLOW}Add these to Vercel environment variables:${NC}"
echo ""
cat .env.production | grep "^NEXT_PUBLIC_" | cut -d'=' -f1
echo ""
echo -e "${YELLOW}And these as secret environment variables:${NC}"
cat .env.production | grep -v "^NEXT_PUBLIC_" | grep -v "^#" | cut -d'=' -f1
echo ""

# Test configuration
echo -e "\n${BLUE}Step 10: Testing configuration${NC}"
read -p "Would you like to run a test build? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    pnpm build --filter=web
fi

echo -e "\n${GREEN}✅ Firebase setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Deploy to Vercel: vercel --prod"
echo "2. Test authentication flow"
echo "3. Monitor Firebase Console for any issues"
echo "4. Set up budget alerts in Firebase Console"
echo ""
echo "Important URLs:"
echo "- Firebase Console: https://console.firebase.google.com/project/hive-production"
echo "- Firestore: https://console.firebase.google.com/project/hive-production/firestore"
echo "- Authentication: https://console.firebase.google.com/project/hive-production/authentication"
echo ""
echo -e "${GREEN}Good luck with your launch! 🚀${NC}"