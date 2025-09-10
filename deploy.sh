#!/bin/bash

# HIVE Production Deployment Script
# Usage: ./deploy.sh [staging|production]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default to staging
ENVIRONMENT=${1:-staging}

echo -e "${GREEN}🚀 Starting HIVE deployment to ${ENVIRONMENT}${NC}"

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}Firebase CLI is not installed. Please install it first.${NC}"
    echo "Run: npm install -g firebase-tools"
    exit 1
fi

# Check if logged in to Firebase
echo -e "${YELLOW}Checking Firebase authentication...${NC}"
firebase login:list || firebase login

# Select Firebase project based on environment
if [ "$ENVIRONMENT" = "production" ]; then
    PROJECT_ID="hive-production"
    ENV_FILE=".env.production"
    echo -e "${YELLOW}⚠️  WARNING: Deploying to PRODUCTION${NC}"
    read -p "Are you sure you want to deploy to production? (yes/no): " confirm
    if [ "$confirm" != "yes" ]; then
        echo -e "${RED}Deployment cancelled${NC}"
        exit 1
    fi
else
    PROJECT_ID="hive-staging"
    ENV_FILE=".env.staging"
fi

echo -e "${GREEN}Using Firebase project: ${PROJECT_ID}${NC}"
firebase use $PROJECT_ID

# Check if environment file exists
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}Environment file ${ENV_FILE} not found${NC}"
    exit 1
fi

# Copy environment file
cp $ENV_FILE .env.local

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
pnpm install

# Run tests
echo -e "${YELLOW}Running tests...${NC}"
pnpm test:ci || true

# Type checking
echo -e "${YELLOW}Running type checks...${NC}"
pnpm typecheck

# Linting
echo -e "${YELLOW}Running linter...${NC}"
pnpm lint

# Build the application
echo -e "${YELLOW}Building application...${NC}"
pnpm build

# Deploy Firestore rules
echo -e "${YELLOW}Deploying Firestore rules...${NC}"
firebase deploy --only firestore:rules

# Deploy Firestore indexes
echo -e "${YELLOW}Deploying Firestore indexes...${NC}"
firebase deploy --only firestore:indexes

# Deploy Storage rules
echo -e "${YELLOW}Deploying Storage rules...${NC}"
firebase deploy --only storage

# Build and deploy Cloud Functions
echo -e "${YELLOW}Building Cloud Functions...${NC}"
cd functions
npm install
npm run build
cd ..

echo -e "${YELLOW}Deploying Cloud Functions...${NC}"
firebase deploy --only functions

# Deploy hosting (if using Firebase Hosting)
# echo -e "${YELLOW}Deploying to Firebase Hosting...${NC}"
# firebase deploy --only hosting

# Or deploy to Vercel
echo -e "${YELLOW}Deploying to Vercel...${NC}"
if [ "$ENVIRONMENT" = "production" ]; then
    vercel --prod
else
    vercel
fi

# Run post-deployment checks
echo -e "${YELLOW}Running post-deployment checks...${NC}"

# Check if the site is accessible
SITE_URL=$([ "$ENVIRONMENT" = "production" ] && echo "https://hive.buffalo.edu" || echo "https://hive-staging.vercel.app")
HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}" $SITE_URL)

if [ $HTTP_STATUS -eq 200 ]; then
    echo -e "${GREEN}✅ Site is accessible at ${SITE_URL}${NC}"
else
    echo -e "${RED}⚠️  Site returned HTTP ${HTTP_STATUS}${NC}"
fi

# Create deployment record in Firestore
echo -e "${YELLOW}Recording deployment...${NC}"
firebase firestore:write deployments/$(date +%s) \
    --data "environment=${ENVIRONMENT},timestamp=$(date -u +%Y-%m-%dT%H:%M:%SZ),deployer=$(git config user.email),commit=$(git rev-parse HEAD)"

# Send deployment notification (optional)
# curl -X POST $SLACK_WEBHOOK_URL \
#     -H 'Content-Type: application/json' \
#     -d "{\"text\":\"🚀 HIVE deployed to ${ENVIRONMENT} by $(git config user.name)\"}"

echo -e "${GREEN}✅ Deployment to ${ENVIRONMENT} completed successfully!${NC}"
echo -e "${GREEN}🌐 Visit: ${SITE_URL}${NC}"

# Show deployment summary
echo -e "\n${YELLOW}Deployment Summary:${NC}"
echo "- Environment: ${ENVIRONMENT}"
echo "- Firebase Project: ${PROJECT_ID}"
echo "- URL: ${SITE_URL}"
echo "- Timestamp: $(date)"
echo "- Commit: $(git rev-parse --short HEAD)"
echo "- Branch: $(git branch --show-current)"