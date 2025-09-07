# HIVE Development Authentication Guide

Complete guide for testing magic link authentication during development.

## 🚀 Quick Start

### 1. Start Development Server
```bash
pnpm dev  # or pnpm --filter web dev
```

### 2. Request a Magic Link
- Navigate to `http://localhost:3000/auth/login` or `http://localhost:3000/schools`
- Enter a `.edu` email address (e.g., `test@buffalo.edu`)
- Click "Send Magic Link"

### 3. Get Your Magic Link
- **Check your terminal** where the dev server is running
- Look for the boxed section with cyan-colored link
- Copy the magic link and paste it in your browser

### 4. Complete Authentication
- The link will verify and sign you into Firebase
- New users: Redirected to onboarding (`/onboarding`)
- Existing users: Redirected to dashboard (`/`)

## 🔗 How Magic Link Authentication Works

### Complete Flow Diagram
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User enters   │───▶│  POST /api/auth  │───▶│   Token stored  │
│   email in UI   │    │  /send-magic-    │    │   in Firestore  │
│                 │    │      link        │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │  Email sent      │
                       │  (Dev: Console   │
                       │   Prod: SendGrid)│
                       └──────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  User clicks    │───▶│  GET /auth/      │───▶│  POST /api/auth │
│  magic link     │    │     verify       │    │  /verify-magic- │
│                 │    │                  │    │      link       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │  Firebase Custom │
                       │  Token created & │
                       │  client signs in │
                       └──────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │  Redirect to:    │
                       │  - /onboarding   │
                       │  - / (dashboard) │
                       └──────────────────┘
```

### Technical Implementation

#### Step 1: Magic Link Request (`/api/auth/send-magic-link`)
1. **Rate limiting** - Prevents abuse (5 requests per 15 minutes)
2. **Email validation** - Must be `.edu` domain
3. **School detection** - Auto-detects school from email domain
4. **Token generation** - 64-character secure random token
5. **Firestore storage** - Token stored with metadata:
   ```typescript
   {
     email: string,
     schoolId: string | null,
     createdAt: Timestamp,
     expiresAt: Date,        // 1 hour dev, 15 min prod
     used: boolean,
     token: string
   }
   ```
6. **Email sending** - Dev: Console log, Prod: SendGrid

#### Step 2: Magic Link Verification (`/api/auth/verify-magic-link`)
1. **Token validation** - Checks existence, expiration, and usage
2. **Firebase user lookup** - Find existing or create new Firebase user
3. **HIVE profile check** - Determines if user needs onboarding
4. **Custom token creation** - Firebase admin creates custom token
5. **Client authentication** - Custom token used for Firebase signIn
6. **Token marking** - Mark as used only after successful auth

#### Step 3: Client-Side Authentication (`/auth/verify`)
1. **Parameter extraction** - Get token, email, schoolId from URL
2. **API call** - POST to verification endpoint
3. **Firebase sign-in** - Use custom token with Firebase Auth
4. **State management** - Auth context updates user state
5. **Redirect** - Based on onboarding status

## 🛠 Development Tools

### Dev Auth Helper Script

The `scripts/dev-auth-helper.cjs` script provides powerful token management:

#### List Recent Tokens
```bash
node scripts/dev-auth-helper.cjs
# or
node scripts/dev-auth-helper.cjs list
```

**Output:**
```
📋 Recent Magic Link Tokens:

Token: 1a2b3c4d5e6f7890...
  Email: test@buffalo.edu
  School: ub-buffalo
  Status: ✅ Valid
  Created: 9/6/2025, 2:30:45 PM
  Expires: 9/6/2025, 3:30:45 PM
  🔗 Link: http://localhost:3000/auth/verify?token=1a2b3c4d...

Token: 9z8y7x6w5v4u3t21...
  Email: demo@buffalo.edu
  School: ub-buffalo
  Status: ❌ Used
  Created: 9/6/2025, 1:15:22 PM
  Expires: 9/6/2025, 2:15:22 PM
```

#### Reset a Used Token
```bash
node scripts/dev-auth-helper.cjs reset 1a2b3c4d
# or use full token
node scripts/dev-auth-helper.cjs reset 1a2b3c4d5e6f7890abcdef...
```

#### Create Test Token
```bash
node scripts/dev-auth-helper.cjs create test@buffalo.edu
node scripts/dev-auth-helper.cjs create demo@test.edu
```

#### Clean Expired Tokens
```bash
node scripts/dev-auth-helper.cjs clean
```

### Firebase Console Access

Tokens are stored in Firestore collection `magicLinks`:
```
Collection: magicLinks
Document ID: {64-char-token}
Data: {
  email: "test@buffalo.edu",
  schoolId: "ub-buffalo",
  createdAt: Timestamp,
  expiresAt: Timestamp,
  used: false,
  token: "1a2b3c4d5e6f7890..."
}
```

## 🎯 Testing Scenarios

### New User Registration Flow
```bash
# 1. Create token for new email
node scripts/dev-auth-helper.cjs create newuser@buffalo.edu

# 2. Click the generated link
# 3. Should redirect to /onboarding
# 4. Complete onboarding steps
# 5. Verify redirect to dashboard
```

### Existing User Login Flow
```bash
# 1. Use email that completed onboarding previously
# 2. Request magic link from UI
# 3. Should skip onboarding, go directly to dashboard
```

### School-Specific vs Generic Testing
```bash
# UB Student (auto-detects school)
node scripts/dev-auth-helper.cjs create student@buffalo.edu

# Generic .edu (manual school selection during onboarding)
node scripts/dev-auth-helper.cjs create student@test.edu
```

### Error Scenarios
```bash
# Test expired token
node scripts/dev-auth-helper.cjs create test@buffalo.edu
# Wait 1+ hours, then try to use it

# Test used token
# Use a magic link once, then try to use it again

# Test invalid token
# Manually modify token in URL
```

### Rate Limiting Testing
```bash
# Send 6 magic link requests quickly
# Should get 429 error on 6th request
# Wait 15 minutes for rate limit reset
```

## 🐛 Common Issues & Solutions

### "Token already used" Error
**Cause:** Magic link was already consumed  
**Solution:** 
```bash
node scripts/dev-auth-helper.cjs list
node scripts/dev-auth-helper.cjs reset <token-prefix>
```

### "Token not found" Error
**Cause:** Token expired (1 hour in dev) or invalid  
**Solution:** Create a new token
```bash
node scripts/dev-auth-helper.cjs create your@email.edu
```

### "Invalid email domain" Error
**Cause:** Non-.edu email address  
**Solution:** Use a valid `.edu` email

### Magic Link Not Showing in Console
**Cause:** Looking in wrong terminal or process not running  
**Solution:** 
1. Ensure `pnpm dev` is running
2. Check the correct terminal window
3. Look for boxed section with cyan-colored link
4. If still missing, check server logs for errors

### "Too many requests" (429 Error)
**Cause:** Rate limit exceeded (5 requests per 15 minutes)  
**Solution:** 
- Wait 15 minutes for automatic reset
- Or use the helper script to create tokens directly

### "Network error" or Verification Failed
**Cause:** API endpoint issues or Firebase connection problems  
**Solution:**
1. Check Firebase emulator status
2. Verify environment variables are loaded
3. Check network connectivity
4. Review server console for detailed errors

### User Already Signed In Error
**Cause:** Firebase user already authenticated  
**Solution:** Sign out first or allow auto-signout (happens automatically after 2 seconds)

## ⚙️ Configuration Details

### Environment Variables Required
```bash
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/...

# Optional: Email (Production only)
SENDGRID_API_KEY=SG.your-sendgrid-api-key
FROM_EMAIL=auth@yourdomain.com

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Dev default
```

### Token Expiration Times
- **Development:** 1 hour (3600000ms)
- **Production:** 15 minutes (900000ms)

### Rate Limits
```typescript
MAGIC_LINK: {
  maxRequests: 5,     // requests
  windowMs: 900000    // 15 minutes
}

MAGIC_LINK_VERIFY: {
  maxRequests: 10,    // requests  
  windowMs: 300000    // 5 minutes
}
```

### School Auto-Detection
Currently configured schools:
- `buffalo.edu` → `ub-buffalo`
- Other `.edu` domains → Manual selection during onboarding

## 🔒 Security Features

### Development vs Production
| Feature | Development | Production |
|---------|-------------|------------|
| Email sending | Console log | SendGrid API |
| Token expiration | 1 hour | 15 minutes |
| Rate limiting | Enabled | Enabled |
| HTTPS required | No | Yes |

### Token Security
- **Single-use:** Tokens are marked as used after authentication
- **Time-limited:** Automatic expiration prevents replay attacks
- **Email-bound:** Tokens are tied to specific email addresses
- **Secure generation:** 32-byte random tokens (64 hex chars)
- **Automatic cleanup:** Expired tokens are removed

### Firebase Security
- **Custom tokens:** Server-side token creation with limited claims
- **Email verification:** Email verification status tracked
- **User isolation:** Each user can only access their own data

## 💡 Advanced Tips

### Rapid Testing Workflow
```bash
# Terminal 1: Keep helper ready
alias hive-auth="node scripts/dev-auth-helper.cjs"

# Quick commands
hive-auth create test@buffalo.edu
hive-auth list
hive-auth reset 1a2b3c4d
hive-auth clean
```

### Debugging Authentication Issues
1. **Enable verbose logging:**
   - Check browser network tab for API responses
   - Monitor server console for detailed error messages
   - Use Firebase Auth debugging in browser console

2. **Common debug points:**
   ```javascript
   // In browser console
   import { auth } from './lib/firebase';
   console.log('Current user:', auth.currentUser);
   
   // Check auth state
   auth.onAuthStateChanged(user => console.log('Auth state:', user));
   ```

3. **Firestore debugging:**
   - Use Firebase console to inspect stored tokens
   - Check user documents for onboarding status
   - Verify school documents exist and are active

### Testing with Multiple Users
```bash
# Create tokens for different scenarios
node scripts/dev-auth-helper.cjs create alice@buffalo.edu
node scripts/dev-auth-helper.cjs create bob@test.edu
node scripts/dev-auth-helper.cjs create admin@buffalo.edu

# Test concurrent sessions in different browsers
# Verify user isolation and data access
```

### Performance Testing
```bash
# Test token lookup performance
time node scripts/dev-auth-helper.cjs list

# Monitor Firestore operations
# Check rate limiter memory usage
# Verify cleanup operations run efficiently
```

---

## 📚 Related Documentation

- [Firebase Auth Setup](./firebase-auth-setup.md)
- [Email Templates](./firebase-auth-email-template-setup-instructions.md)
- [Firestore Structure](./firestore-structure.md)

---

**Development Note:** This authentication system is designed for rapid development and testing. In production, all magic links are sent via email with proper security headers and tracking.