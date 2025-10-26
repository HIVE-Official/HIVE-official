# Firebase Email Authentication Setup

## ✅ Code Implementation (COMPLETE)
- Magic link generation in `/api/auth/send-magic-link/route.ts`
- Firebase email service in `/lib/firebase-auth-email.ts`
- Verification handling in `/api/auth/verify-magic-link/route.ts`

## 📋 Firebase Console Configuration Required

### 1. Enable Email Link Authentication
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your HIVE project
3. Navigate to **Authentication** → **Sign-in method**
4. Enable **Email/Password** provider
5. Enable **Email link (passwordless sign-in)**

### 2. Configure Authorized Domains
Add these domains to **Authentication** → **Settings** → **Authorized domains**:
- `localhost` (already added by default)
- `hive-official.vercel.app`
- `hive-official-pv5r8lxbk-rhinehart514-gmailcoms-projects.vercel.app`
- Your custom domain (when ready)

### 3. Customize Email Template (Optional)
1. Go to **Authentication** → **Templates**
2. Select **Email address verification**
3. Customize with HIVE branding:
   - Subject: "Sign in to HIVE 🐝"
   - Sender name: "HIVE Team"

### 4. Configure Action URL
The action URL is already set in code:
```typescript
url: `${redirectUrl}/auth/verify?school=${encodeURIComponent(schoolName)}`
```

## 🔒 Security Settings (Already Implemented)
- ✅ Rate limiting on email sends
- ✅ Domain validation (@buffalo.edu only)
- ✅ School ID verification
- ✅ Audit logging for auth events

## 📊 Firebase Email Limits (Free Tier)
- **Daily Limit**: 100 emails/day for password auth
- **Magic Links**: No specific limit documented
- **Verification Emails**: Unlimited for verified domains

## 🚀 Production Checklist
- [ ] Enable Email Link in Firebase Console
- [ ] Add production domains to authorized list
- [ ] Test magic link flow with @buffalo.edu email
- [ ] Verify emails are being delivered
- [ ] Check spam folder guidance for users

## 📈 Monitoring
Monitor email delivery in Firebase Console:
- **Authentication** → **Usage** tab
- Shows daily active users
- Email authentication events
- Sign-in methods breakdown

## 🐛 Troubleshooting

### Emails not sending?
1. Check Firebase Console for errors
2. Verify domain is authorized
3. Check rate limits haven't been exceeded

### Links not working?
1. Ensure redirect URL matches authorized domain
2. Check `handleCodeInApp: true` is set
3. Verify the link hasn't expired (6 hours default)

### Emails going to spam?
- This is rare with Firebase's service
- Tell users to check spam/junk folders
- Add "noreply@hive-official.firebaseapp.com" to contacts

## 📝 Notes
- Firebase handles all email delivery infrastructure
- No SendGrid or SMTP configuration needed
- Emails come from `noreply@[your-project-id].firebaseapp.com`
- Custom domain sender requires SendGrid/SMTP (future enhancement)