# Firebase Production Setup Guide

## ✅ What's Already Configured
- Firebase Admin SDK with service account
- Firestore database connection
- Project ID: `hive-9265c`
- Development environment working

## 🔧 Required Setup Steps

### 1. Enable Firebase Email Authentication
**Go to Firebase Console:** https://console.firebase.google.com/project/hive-9265c/authentication/providers

1. Click "Email/Password" provider
2. Enable "Email/Password" (first toggle)
3. Enable "Email link (passwordless sign-in)" (second toggle)
4. Click "Save"

### 2. Customize Email Templates
**Go to Templates:** https://console.firebase.google.com/project/hive-9265c/authentication/emails

Customize these templates with HIVE branding:
- **Email address verification** - Used for magic links
- **Password reset** - If you add password auth later
- **Email address change** - For profile updates

Variables you can use:
- `%APP_NAME%` → "HIVE"
- `%LINK%` → The magic link URL
- `%EMAIL%` → User's email

Example template:
```html
<p>Hi there!</p>
<p>Click the link below to sign in to HIVE at University at Buffalo:</p>
<p><a href='%LINK%'>Sign in to HIVE</a></p>
<p>This link expires in 15 minutes.</p>
<p>If you didn't request this, please ignore this email.</p>
```

### 3. Configure Action URL (Important!)
**In Authentication Settings:** https://console.firebase.google.com/project/hive-9265c/authentication/settings

1. Scroll to "Authorized domains"
2. Add your production domain: `yourdomain.com`
3. Add your staging domain if you have one

### 4. Create Required Firestore Indexes

**Click these direct links to create the indexes:**

1. **Tools Collection Index** (for browsing tools):
   https://console.firebase.google.com/v1/r/project/hive-9265c/firestore/indexes?create_composite=Ckhwcm9qZWN0cy9oaXZlLTkyNjVjL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy90b29scy9pbmRleGVzL18QARoMCghpc1B1YmxpYxABGgoKBnN0YXR1cxABGg0KCWNyZWF0ZWRBdBACGgwKCF9fbmFtZV9fEAI

2. **Members Collection Index** (for feed queries):
   - Collection ID: `members`
   - Fields to index:
     - `userId` (Ascending)
     - `joinedAt` (Descending)

To create manually:
1. Go to: https://console.firebase.google.com/project/hive-9265c/firestore/indexes
2. Click "Create Index"
3. Collection ID: `members`
4. Add fields as listed above
5. Query scope: "Collection group"
6. Click "Create"

### 5. Set Email Sending Limits (Optional)
**In Firebase Console > Authentication > Settings:**
- Set daily email quota (default is usually fine)
- Configure rate limiting if needed

## 🚀 Deployment Environment Variables

Add these to your production environment (Vercel):

```env
# Already configured in .env.local - copy these values
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDMDHXJ8LcWGXz05ipPTNvA-fRi9nfdzbQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-9265c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-9265c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hive-9265c.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=573191826528
NEXT_PUBLIC_FIREBASE_APP_ID=1:573191826528:web:1d5eaeb8531276e4c1a705

# Production-specific
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production

# IMPORTANT: Disable dev bypass in production!
NEXT_PUBLIC_ENABLE_DEV_AUTO_LOGIN=false
NEXT_PUBLIC_DEV_BYPASS=false

# Keep your service account credentials secure
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@hive-9265c.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="<your-private-key>"
```

## 🧪 Testing Firebase Email Auth

1. **Test in Development:**
   ```bash
   # The app will log magic links to console in development
   pnpm dev
   ```

2. **Test Email Delivery:**
   - Go to http://localhost:3000/auth/login
   - Enter a test email
   - Check console for the magic link (in dev mode)
   - Click the link to verify it works

3. **Production Test:**
   - Deploy to staging first
   - Test with real email addresses
   - Verify emails arrive within 1-2 minutes

## 📊 Monitoring

**Firebase Console provides:**
- Email delivery stats
- Authentication metrics
- Error logs
- User sign-in methods

**Monitor at:** https://console.firebase.google.com/project/hive-9265c/authentication/users

## ⚠️ Important Security Notes

1. **Never commit private keys** - Use environment variables
2. **Domain whitelist** - Only add your actual domains to Firebase
3. **Rate limiting** - Firebase has built-in protections
4. **Link expiry** - Magic links expire after 1 hour by default
5. **Email verification** - Users are automatically verified via magic link

## 🐛 Troubleshooting

### "Email provider not enabled"
→ Enable Email/Password in Firebase Console

### "Dynamic links not activated"
→ Normal in development, Firebase will use simple links

### "Indexes not ready"
→ Wait 5-10 minutes after creating indexes

### "Emails not sending"
→ Check Firebase email quota and authorized domains

## 📚 Additional Resources

- [Firebase Auth Documentation](https://firebase.google.com/docs/auth/web/email-link-auth)
- [Firestore Indexes Guide](https://firebase.google.com/docs/firestore/query-data/indexing)
- [Firebase Email Templates](https://firebase.google.com/docs/auth/custom-email-handler)

## ✨ Next Steps After Setup

1. **Test full auth flow** with @buffalo.edu emails
2. **Monitor initial signups** in Firebase Console
3. **Set up alerting** for auth failures
4. **Consider adding** SMS backup authentication
5. **Plan for** social auth providers (Google, Apple)

---

**Ready to launch!** Once these steps are complete, HIVE will use Firebase's robust email authentication system with automatic delivery, link validation, and security built-in.