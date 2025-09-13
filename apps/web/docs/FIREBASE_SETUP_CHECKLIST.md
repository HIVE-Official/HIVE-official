# 🔥 Firebase Console Setup Checklist - HIVE Authentication

## Project: hive-9265c

This checklist contains ALL required steps to enable Firebase Authentication for HIVE. Each step is critical for the auth system to work properly.

---

## ✅ Firebase Console Setup Steps

### 1. Enable Authentication Methods
**Location**: [Firebase Console](https://console.firebase.google.com/project/hive-9265c/authentication/providers)

- [ ] **Email Link (Passwordless sign-in)**
  1. Click "Email/Password" provider
  2. Enable "Email/Password" toggle
  3. Enable "Email link (passwordless sign-in)" toggle
  4. Click "Save"

### 2. Configure Authorized Domains
**Location**: [Firebase Console - Settings](https://console.firebase.google.com/project/hive-9265c/authentication/settings)

Add these domains to the "Authorized domains" list:
- [ ] `localhost` (for development)
- [ ] `hive.college` (production domain)
- [ ] `hive-9265c.firebaseapp.com` (default Firebase domain)
- [ ] `hive-9265c.web.app` (Firebase hosting domain)

### 3. Configure Email Templates
**Location**: [Firebase Console - Templates](https://console.firebase.google.com/project/hive-9265c/authentication/emails)

Customize the "Email address verification" template:
- [ ] **Subject**: `🐝 Welcome to HIVE - Verify your email`
- [ ] **From name**: `HIVE Campus`
- [ ] **Reply-to email**: `noreply@hive.college`
- [ ] **Action URL**: Keep default (Firebase handles this)
- [ ] **Message body**: 
```html
<p>Welcome to HIVE!</p>
<p>Click the link below to sign in to your account:</p>
<p><a href="%LINK%">Sign in to HIVE</a></p>
<p>This link will expire in 1 hour.</p>
<p>If you didn't request this email, you can safely ignore it.</p>
<br>
<p>— The HIVE Team</p>
```

### 4. Set Up Dynamic Links (Required for Email Links)
**Location**: [Firebase Console - Dynamic Links](https://console.firebase.google.com/project/hive-9265c/durablelinks)

- [ ] Click "Get Started" if not already configured
- [ ] Create a URL prefix (e.g., `https://hive.page.link`)
- [ ] Note: This is required for email link authentication to work

### 5. Configure Security Rules
**Location**: [Firebase Console - Firestore Rules](https://console.firebase.google.com/project/hive-9265c/firestore/rules)

Ensure these collections have proper auth rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Schools are public read
    match /schools/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Spaces require authentication
    match /spaces/{spaceId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/spaces/$(spaceId)/members/$(request.auth.uid)).data.role in ['leader', 'admin'];
    }
  }
}
```

### 6. Enable Firebase Admin SDK
**Location**: [Firebase Console - Project Settings](https://console.firebase.google.com/project/hive-9265c/settings/serviceaccounts/adminsdk)

- [ ] Service account is already configured (firebase-service-account.json)
- [ ] Verify the service account has proper IAM roles:
  - Firebase Authentication Admin
  - Cloud Datastore User
  - Firebase Rules System

---

## 🧪 Testing the Auth Flow

### Local Testing Steps:
1. **Start the development server**:
   ```bash
   cd C:\hive
   pnpm dev
   ```

2. **Navigate to**: http://localhost:3000/schools

3. **Select "University at Buffalo"**

4. **Enter a @buffalo.edu email** (or use test mode)

5. **Check console for magic link** (in dev mode, link is logged)

6. **Click the magic link** to verify authentication

7. **Verify redirect**:
   - New users → `/onboarding`
   - Existing users → `/dashboard`

### Production Testing:
1. Deploy to production domain
2. Ensure all domains are authorized in Firebase
3. Test with real @buffalo.edu email
4. Verify email delivery and link functionality

---

## 🔍 Verification Checklist

After setup, verify these are working:
- [ ] Magic link emails are being sent
- [ ] Email links redirect to correct verify page
- [ ] Session tokens are stored in cookies
- [ ] Protected routes redirect unauthenticated users
- [ ] Onboarding flow creates user profile in Firestore
- [ ] Dashboard loads user data correctly
- [ ] Logout clears all session data

---

## 🚨 Common Issues & Solutions

### Issue: "auth/configuration-not-found"
**Solution**: Enable Email/Password authentication in Firebase Console

### Issue: Magic links not being sent
**Solution**: 
1. Check authorized domains list
2. Verify Dynamic Links are configured
3. Check Firebase quota limits

### Issue: "auth/invalid-action-code"
**Solution**: Magic link has expired (1 hour limit) or was already used

### Issue: Session not persisting
**Solution**: Check cookies are enabled and not blocked by browser

### Issue: Redirect loop on protected pages
**Solution**: Clear browser cookies and localStorage, then re-authenticate

---

## 📝 Current Implementation Status

### ✅ Completed:
- Firebase Admin SDK configured
- Service account credentials added
- Magic link generation API endpoint
- Email verification flow
- Session management system
- Token refresh mechanism
- Middleware auth checks
- Global auth provider integrated
- Onboarding flow connected

### ⚠️ Requires Manual Setup (Firebase Console):
- Enable Email/Password authentication
- Configure authorized domains
- Set up Dynamic Links
- Customize email templates

### 🔄 Next Steps:
1. Complete Firebase Console configuration (follow checklist above)
2. Test complete auth flow with real emails
3. Monitor Firebase Authentication dashboard for issues
4. Set up error tracking and analytics

---

## 📞 Support Contacts

- **Firebase Support**: https://firebase.google.com/support
- **HIVE Dev Team**: dev@hive.college
- **Documentation**: https://firebase.google.com/docs/auth/web/email-link-auth

---

**Last Updated**: January 2025
**Platform Version**: 1.0.0
**Firebase Project**: hive-9265c