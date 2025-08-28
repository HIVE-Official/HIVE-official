#!/bin/bash

# HIVE Production Deployment Script
# This script deploys the HIVE application to Vercel

echo "🚀 Starting HIVE deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: vercel.json not found. Please run this script from the root directory."
    exit 1
fi

# Check if we have the required env files
if [ ! -f "apps/web/.env.local" ] && [ ! -f "apps/web/.env.production" ]; then
    echo "⚠️  Warning: No environment files found. Make sure to set up Vercel environment variables."
fi

# Make sure we're on the latest code
echo "🔄 Ensuring we have the latest code..."
git fetch origin
git status

# Build the project locally first to check for errors
echo "🏗️  Building project to check for errors..."
cd apps/web
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi

# Go back to root directory
cd ../..

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your application is now live on Vercel."
    echo ""
    echo "📋 Next steps:"
    echo "1. Test the authentication flow"
    echo "2. Verify the onboarding process"
    echo "3. Check the landing page animations"
    echo "4. Test the schools selection"
    echo ""
    echo "🔧 If you encounter issues, check:"
    echo "- Vercel environment variables are set correctly"
    echo "- Firebase configuration is properly configured"
    echo "- All required API endpoints are working"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi

echo "🎉 HIVE deployment complete!"