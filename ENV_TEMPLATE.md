# 🔐 HIVE Environment Configuration Guide

## 🚨 **CRITICAL SECURITY NOTICE**

**NEVER commit real credentials to version control!** 
- Use environment variables for all secrets
- Rotate credentials immediately if exposed
- Use separate credentials for each environment

## 📋 **REQUIRED ENVIRONMENT VARIABLES**

Copy the appropriate variables below to your `.env.local` file or Vercel environment variables.

### **Local Development (.env.local)**

```bash
# ===========================================
# ENVIRONMENT SETTINGS
# ===========================================
NODE_ENV=development
VERCEL_ENV=development

# ===========================================
# FIREBASE CLIENT CONFIGURATION (PUBLIC)
# ===========================================

# Development Environment (Using Production Firebase)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDMDHXJ8LcWGXz05ipPTNvA-fRi9nfdzbQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-9265c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-9265c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hive-9265c.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=573191826528
NEXT_PUBLIC_FIREBASE_APP_ID=1:573191826528:web:1d5eaeb8531276e4c1a705
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-NK3E12MSFD

# ===========================================
# FIREBASE ADMIN SDK (PRIVATE)
# ===========================================
FIREBASE_PROJECT_ID=hive-9265c
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@hive-9265c.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# ===========================================
# APPLICATION CONFIGURATION
# ===========================================
NEXTAUTH_SECRET=your-32-character-random-secret-key-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Vercel Staging Environment Variables**

```bash
# Environment
NODE_ENV=staging
VERCEL_ENV=preview

# Firebase Client (Staging)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDj7dO4DHmGMFGMZouGQVjRDPbDF026NG4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-staging-2025.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-staging-2025
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hive-staging-2025.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=32403978665
NEXT_PUBLIC_FIREBASE_APP_ID=1:32403978665:web:5779609cc83680e0486cb8
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-TD0JEBTKHP

# Firebase Admin (Staging)
FIREBASE_PROJECT_ID=hive-staging-2025
FIREBASE_CLIENT_EMAIL=your-staging-service-account@hive-staging-2025.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_STAGING_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"

# Application
NEXTAUTH_SECRET=your-staging-32-character-secret
NEXTAUTH_URL=https://your-staging-url.vercel.app
NEXT_PUBLIC_APP_URL=https://your-staging-url.vercel.app
```

### **Vercel Production Environment Variables**

```bash
# Environment
NODE_ENV=production
VERCEL_ENV=production

# Firebase Client (Production)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDMDHXJ8LcWGXz05ipPTNvA-fRi9nfdzbQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-9265c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-9265c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hive-9265c.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=573191826528
NEXT_PUBLIC_FIREBASE_APP_ID=1:573191826528:web:1d5eaeb8531276e4c1a705
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-NK3E12MSFD

# Firebase Admin (Production)
FIREBASE_PROJECT_ID=hive-9265c
FIREBASE_CLIENT_EMAIL=your-production-service-account@hive-9265c.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRODUCTION_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"

# Application
NEXTAUTH_SECRET=your-production-32-character-secret
NEXTAUTH_URL=https://your-production-domain.com
NEXT_PUBLIC_APP_URL=https://your-production-domain.com

# Turborepo (Optional)
TURBO_TOKEN=your-vercel-turbo-token
TURBO_TEAM=your-vercel-team-slug
```

## 🚨 **CRITICAL SECURITY INSTRUCTIONS**

### **1. Get Firebase Service Account Credentials**

🔒 **SECURITY: Handle credentials securely**

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (hive-9265c)
3. Go to **Project Settings** → **Service Accounts**
4. Click **"Generate new private key"**
5. Download the JSON file to a secure location
6. Extract these values:
   - `client_email` → Use as `FIREBASE_CLIENT_EMAIL`
   - `private_key` → Use as `FIREBASE_PRIVATE_KEY`
7. **IMPORTANT**: Delete the downloaded JSON file after extracting values
8. Store credentials in your password manager or secure vault

### **2. Generate NextAuth Secret**

🔒 **SECURITY: Use cryptographically secure random values**

```bash
# Option 1: Using OpenSSL (recommended)
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online generator (use with caution)
# Visit: https://generate-secret.vercel.app/32
```

### **3. Set Environment Variables Securely**

#### **For Local Development:**
1. Create `.env.local` in `apps/web/` directory
2. Copy template values and replace with real credentials
3. **NEVER commit this file to git** (already in .gitignore)

#### **For Vercel Deployment:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your HIVE project
3. Go to **Settings** → **Environment Variables**
4. Add each variable for the appropriate environment:
   - **Development**: For preview deployments
   - **Preview**: For staging deployments  
   - **Production**: For production deployments
5. Use different credentials for each environment when possible

### **4. Security Best Practices**

🔒 **MANDATORY SECURITY MEASURES:**

- **Rotate credentials monthly** or immediately after any potential exposure
- **Use least-privilege principles** - only grant necessary permissions
- **Monitor access logs** for unusual activity
- **Enable 2FA** on Firebase Console and Vercel accounts
- **Use separate Firebase projects** for production vs development (recommended)
- **Never share credentials** via email, Slack, or other insecure channels
- **Review Firebase Security Rules** regularly
- **Monitor error logs** for credential-related failures

## ⚠️ **DEPLOYMENT CHECKLIST**

Before deploying to production:

- [ ] ✅ All environment variables set in Vercel Dashboard
- [ ] ✅ Firebase service account credentials configured
- [ ] ✅ NextAuth secret generated and set
- [ ] ✅ Domain URLs updated for production
- [ ] ✅ Test deployment in staging environment
- [ ] ✅ Verify `/api/health` endpoint returns 200

## 🔧 **Local Development Setup**

1. **Create `.env.local` file** in `apps/web/`:
   ```bash
   cd apps/web
   touch .env.local
   ```

2. **Copy development variables** from the template above

3. **Get Firebase credentials** for development project

4. **Test the setup**:
   ```bash
   npm run dev
   # Visit http://localhost:3000/api/health
   ```

## 📞 **Need Help?**

- **Firebase Setup**: See `DEPLOYMENT.md` for detailed instructions
- **Environment Issues**: Check the health endpoint at `/api/health`
- **Vercel Configuration**: Verify in Vercel Dashboard → Settings → Environment Variables 