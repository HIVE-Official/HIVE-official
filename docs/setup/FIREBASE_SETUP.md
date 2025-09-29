# 🔥 Firebase Setup Guide for HIVE

## Quick Start

### 1. Run the Setup Script
```bash
./scripts/setup-firebase.sh
```

This will:
- Login to Firebase
- Initialize your project
- Deploy security rules
- Deploy indexes

### 2. Manual Steps in Firebase Console

#### A. Enable Authentication
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Authentication** → **Sign-in method**
4. Enable **Email/Password**
5. Enable **Email link (passwordless)**

#### B. Get Your Configuration

**Web App Config** (Firebase Console → Project Settings → General):
```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
};
```

**Admin SDK** (Firebase Console → Project Settings → Service Accounts):
1. Click "Generate new private key"
2. Save the downloaded JSON securely
3. Extract the values for your `.env` file

### 3. Configure Environment Variables

Create `.env.local` (for development):
```bash
# Copy from Firebase Console
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# From Service Account JSON
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Security (generate these)
NEXTAUTH_SECRET=$(openssl rand -hex 32)
JWT_SECRET=$(openssl rand -hex 32)

# Campus Config
NEXT_PUBLIC_CAMPUS_ID=ub-buffalo
NEXT_PUBLIC_CAMPUS_DOMAIN=buffalo.edu
```

### 4. Test Your Setup

```bash
# Test Firebase connection
pnpm test:firebase-auth

# Test security implementation
pnpm test:security

# Start development server
pnpm dev
```

## Firebase Console Checklist

- [ ] **Authentication**
  - [ ] Email/Password enabled
  - [ ] Email link enabled
  - [ ] Authorized domains configured

- [ ] **Firestore Database**
  - [ ] Created in production mode
  - [ ] Location set (us-east1 recommended)
  - [ ] Security rules deployed
  - [ ] Indexes deployed

- [ ] **Storage**
  - [ ] Bucket created
  - [ ] Security rules deployed

- [ ] **Project Settings**
  - [ ] Web app registered
  - [ ] Service account key downloaded
  - [ ] API keys restricted (production)

## Initial Data Setup

### Create Admin Users
In Firestore, create document: `admins/{userId}`
```json
{
  "email": "jwrhineh@buffalo.edu",
  "role": "super_admin",
  "createdAt": "2024-09-28T00:00:00Z"
}
```

### Create Initial Spaces
Run this in Firebase Console or via script:
```javascript
// Sample spaces for testing
const initialSpaces = [
  {
    name: "UB Computer Science",
    handle: "ub-cs",
    category: "academic",
    campusId: "ub-buffalo",
    isActive: true
  },
  {
    name: "Ellicott Complex",
    handle: "ellicott",
    category: "residential",
    campusId: "ub-buffalo",
    isActive: true
  }
];
```

## Security Reminders

### ⚠️ NEVER commit to git:
- `.env.local`
- `.env.production`
- Service account JSON files
- Any file with API keys

### ✅ ALWAYS in production:
- Use environment variables
- Enable all security rules
- Set up monitoring
- Configure rate limiting
- Use HTTPS only

## Troubleshooting

### "Permission Denied" Errors
- Check Firestore security rules
- Verify user has @buffalo.edu email
- Ensure campusId is set correctly

### "Invalid API Key" Errors
- Verify environment variables are loaded
- Check Firebase project ID matches
- Ensure not using emulator in production

### Rate Limiting Not Working
- Set up Redis/Upstash
- Configure REDIS_URL in env
- Check Redis connection

## Deploy Commands

```bash
# Deploy everything
firebase deploy

# Deploy only rules
firebase deploy --only firestore:rules,storage:rules

# Deploy only indexes
firebase deploy --only firestore:indexes

# Deploy to specific project
firebase use production
firebase deploy --only firestore:rules
```

## Support

- Firebase Documentation: https://firebase.google.com/docs
- Firebase Status: https://status.firebase.google.com
- HIVE Team: security@hive.college

---

**Last Updated**: September 28, 2024
**Firebase SDK Version**: 11.0.0
**Security Rules Version**: 2