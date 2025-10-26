# HIVE Firebase Production Setup Guide

## 🚀 Complete Firebase Production Configuration Checklist

### Prerequisites
- [ ] Firebase project created in Firebase Console
- [ ] Billing enabled (Blaze plan for production)
- [ ] Domain purchased (e.g., hive.app)

## 1. Firebase Console Setup

### 1.1 Create Production Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project: `hive-production`
3. Enable Google Analytics (optional but recommended)

### 1.2 Enable Services
Navigate to each service and enable:

#### Authentication
- [ ] Email/Password provider
- [ ] Configure action URL: `https://yourdomain.com/auth/action`
- [ ] Add authorized domains:
  - `yourdomain.com`
  - `*.vercel.app` (for preview deployments)
  - `localhost` (keep for development)

#### Firestore Database
- [ ] Create database in production mode
- [ ] Choose multi-region: `nam5 (United States)`
- [ ] Deploy security rules (see section 3)

#### Storage
- [ ] Create default bucket
- [ ] Deploy storage rules (see section 3)

#### Hosting (if using Firebase Hosting instead of Vercel)
- [ ] Initialize hosting
- [ ] Connect custom domain

## 2. Firebase Authentication Email Templates

### 2.1 Configure Email Templates
In Firebase Console > Authentication > Templates:

#### Password Reset Email
```html
Subject: Reset your HIVE password

Hi %DISPLAY_NAME%,

You requested to reset your password for HIVE at University at Buffalo.

Click the link below to reset your password:
%LINK%

If you didn't request this, please ignore this email.

Best,
The HIVE Team
```

#### Email Verification
```html
Subject: Verify your HIVE account

Welcome to HIVE!

Please verify your @buffalo.edu email to get started:
%LINK%

This link will expire in 24 hours.

See you on campus!
The HIVE Team
```

#### Email Address Change
```html
Subject: Confirm your new email for HIVE

Hi %DISPLAY_NAME%,

Please confirm your new email address:
%LINK%

If you didn't request this change, please contact support immediately.

The HIVE Team
```

### 2.2 Configure Magic Link Settings
```javascript
// In your auth configuration
const actionCodeSettings = {
  url: 'https://yourdomain.com/auth/verify',
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.hive.app'
  },
  android: {
    packageName: 'com.hive.app',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'hiveapp.page.link'
};
```

## 3. Security Rules Updates

### 3.1 Production Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Campus isolation for UB
    function isUBUser() {
      return request.auth != null &&
             request.auth.token.email.matches('.*@buffalo[.]edu$');
    }

    function isCampusIsolated() {
      return resource == null ||
             resource.data.campusId == 'ub-buffalo' ||
             request.resource.data.campusId == 'ub-buffalo';
    }

    // Rate limiting helper
    function rateLimit() {
      return request.time > resource.data.lastWrite + duration.value(1, 's');
    }

    // User documents
    match /users/{userId} {
      allow read: if request.auth != null && isUBUser();
      allow create: if request.auth.uid == userId && isUBUser();
      allow update: if request.auth.uid == userId && isUBUser() && rateLimit();
      allow delete: if false; // Soft delete only
    }

    // Spaces - campus isolated
    match /spaces/{spaceId} {
      allow read: if request.auth != null && isUBUser() && isCampusIsolated();
      allow create: if request.auth != null && isUBUser() &&
                      request.resource.data.campusId == 'ub-buffalo';
      allow update: if request.auth != null && isUBUser() && isCampusIsolated() &&
                      (resource.data.createdBy == request.auth.uid ||
                       resource.data.leaders[request.auth.uid] == true);

      // Nested collections
      match /posts/{postId} {
        allow read: if request.auth != null && isUBUser();
        allow write: if request.auth != null && isUBUser() &&
                       get(/databases/$(database)/documents/spaces/$(spaceId))
                         .data.members[request.auth.uid] != null;
      }
    }

    // Add remaining collections...
  }
}
```

### 3.2 Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User profile images
    match /users/{userId}/profile/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId &&
                     request.resource.size < 5 * 1024 * 1024 && // 5MB limit
                     request.resource.contentType.matches('image/.*');
    }

    // Space images
    match /spaces/{spaceId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
                     request.resource.size < 10 * 1024 * 1024 && // 10MB limit
                     request.resource.contentType.matches('image/.*');
    }
  }
}
```

## 4. Environment Variables Setup

### 4.1 Generate Service Account Key
1. Firebase Console > Project Settings > Service Accounts
2. Generate new private key
3. Store securely (never commit to git!)

### 4.2 Production .env Configuration
```bash
# Production Environment Variables for Vercel

# Firebase Client (Public - safe to expose)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-production.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-production
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hive-production.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123XYZ

# Firebase Admin (Secret - server-side only)
FIREBASE_PROJECT_ID=hive-production
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@hive-production.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# App Configuration
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=https://yourdomain.com

# Feature Flags
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_CAMPUS_ID=ub-buffalo
NEXT_PUBLIC_CAMPUS_EMAIL_DOMAIN=buffalo.edu
```

## 5. Firebase Performance & Monitoring

### 5.1 Enable Performance Monitoring
```javascript
// In your Firebase initialization
import { getPerformance } from 'firebase/performance';
import { getAnalytics, logEvent } from 'firebase/analytics';

// Initialize Performance Monitoring
const perf = getPerformance(app);

// Initialize Analytics
const analytics = getAnalytics(app);

// Track custom events
logEvent(analytics, 'space_created', {
  campus_id: 'ub-buffalo',
  space_type: 'study_group'
});
```

### 5.2 Set Up Crashlytics (Optional)
```bash
npm install firebase-admin firebase-functions
```

## 6. Firebase App Check (Security)

### 6.1 Enable App Check
1. Firebase Console > App Check
2. Register your app
3. Choose reCAPTCHA v3 for web

### 6.2 Implement in Code
```javascript
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// Initialize App Check
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_SITE_KEY'),
  isTokenAutoRefreshEnabled: true
});
```

## 7. Deployment Configuration

### 7.1 Vercel Environment Variables
In Vercel Dashboard > Settings > Environment Variables:

1. Add all NEXT_PUBLIC_* variables
2. Add secret variables (without NEXT_PUBLIC prefix)
3. Set up different values for:
   - Production
   - Preview
   - Development

### 7.2 Firebase Deploy Commands
```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage:rules

# Deploy everything
firebase deploy

# Deploy to specific project
firebase use hive-production
firebase deploy
```

## 8. Testing Checklist

### 8.1 Authentication Flow
- [ ] Magic link sends to @buffalo.edu emails
- [ ] Email arrives within 2 minutes
- [ ] Link correctly authenticates user
- [ ] Session persists across page refreshes
- [ ] Logout works correctly

### 8.2 Data Operations
- [ ] Users can only access UB data
- [ ] Campus isolation enforced
- [ ] Rate limiting prevents spam
- [ ] Image uploads work (< size limits)
- [ ] Real-time updates function

### 8.3 Performance Targets
- [ ] Initial page load < 3s
- [ ] Firestore queries < 500ms
- [ ] Image uploads < 5s
- [ ] Authentication < 2s

## 9. Launch Day Checklist

### Pre-Launch (1 day before)
- [ ] All environment variables set in Vercel
- [ ] Security rules deployed
- [ ] Email templates configured
- [ ] Domain DNS configured
- [ ] SSL certificates active

### Launch Day
- [ ] Monitor Firebase Console dashboard
- [ ] Check email delivery rates
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Have rollback plan ready

### Post-Launch Monitoring
- [ ] Set up alerts for:
  - Error rate > 1%
  - Response time > 3s
  - Failed authentications > 5%
  - Storage usage > 80%

## 10. Cost Management

### Estimated Costs (10k users)
- Firestore: ~$50/month
- Authentication: Free (50k/month included)
- Storage: ~$25/month (100GB)
- Hosting: Use Vercel (separate billing)
- Total Firebase: ~$75-100/month

### Cost Optimization
1. Enable budget alerts at $100
2. Set daily spending limit at $10
3. Use Firestore indexes efficiently
4. Implement caching strategies
5. Clean up old data regularly

## 11. Emergency Contacts

- Firebase Support: https://firebase.google.com/support
- Status Page: https://status.firebase.google.com
- Vercel Support: https://vercel.com/support

## Quick Start Commands

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project
firebase init

# List projects
firebase projects:list

# Switch to production
firebase use hive-production

# Deploy all
firebase deploy

# Monitor logs
firebase functions:log
```

---

## IMMEDIATE NEXT STEPS

1. **Today**: Create Firebase production project
2. **Today**: Configure authentication and email templates
3. **Today**: Set up Firestore and deploy security rules
4. **Tomorrow**: Configure Vercel environment variables
5. **Day 3**: Run full testing checklist
6. **Day 4**: Final deployment and monitoring setup
7. **Oct 1**: Launch! 🚀

Remember: Test everything in a staging environment first!