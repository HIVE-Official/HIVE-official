#!/bin/bash

# HIVE Firebase Setup Script
# This script helps you set up Firebase for production

set -e

echo "🔥 HIVE Firebase Setup"
echo "======================"
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

echo "✅ Firebase CLI found: $(firebase --version)"
echo ""

# Login to Firebase
echo "📝 Step 1: Login to Firebase"
echo "----------------------------"
firebase login

# Select or create project
echo ""
echo "📝 Step 2: Initialize Firebase Project"
echo "--------------------------------------"
echo "Choose an existing project or create a new one:"
firebase use --add

# Deploy Firestore indexes
echo ""
echo "📝 Step 3: Deploy Firestore Indexes"
echo "------------------------------------"
firebase deploy --only firestore:indexes

# Deploy Firestore security rules
echo ""
echo "📝 Step 4: Deploy Firestore Security Rules"
echo "-------------------------------------------"
firebase deploy --only firestore:rules

# Deploy Storage rules
echo ""
echo "📝 Step 5: Deploy Storage Security Rules"
echo "-----------------------------------------"
firebase deploy --only storage:rules

echo ""
echo "✅ Firebase setup complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to Firebase Console and get your configuration"
echo "2. Create .env.local and .env.production files"
echo "3. Add the Firebase configuration values"
echo "4. Enable Email/Password authentication"
echo "5. Download service account key for admin SDK"
echo ""
echo "🔗 Firebase Console: https://console.firebase.google.com"