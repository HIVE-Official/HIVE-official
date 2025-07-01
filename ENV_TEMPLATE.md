# 🔐 HIVE Environment Configuration Guide

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

# Development Environment
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD0aMEsznCtijDJBV8KcHS0KXrmS3DIXZc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-dev-2025.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-dev-2025
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hive-dev-2025.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=43961711178
NEXT_PUBLIC_FIREBASE_APP_ID=1:43961711178:web:d5cca76e45fc125bb484b3
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-9PJ6SQ8WVS

# ===========================================
# FIREBASE ADMIN SDK (PRIVATE)
# ===========================================
FIREBASE_PROJECT_ID=hive-dev-2025
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@hive-dev-2025.iam.gserviceaccount.com
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

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (hive-dev-2025, hive-staging-2025, or hive-9265c)
3. Go to **Project Settings** → **Service Accounts**
4. Click **"Generate new private key"**
5. Download the JSON file
6. Extract these values:
   - `client_email` → Use as `FIREBASE_CLIENT_EMAIL`
   - `private_key` → Use as `FIREBASE_PRIVATE_KEY`

### **2. Generate NextAuth Secret**

```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Online generator
# Visit: https://generate-secret.vercel.app/32
```

### **3. Set Vercel Environment Variables**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your HIVE project
3. Go to **Settings** → **Environment Variables**
4. Add each variable for the appropriate environment:
   - **Development**: For local testing
   - **Preview**: For staging deployments
   - **Production**: For production deployments

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