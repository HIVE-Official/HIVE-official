# 🔐 HIVE Environment File Structure - CLEANED UP

## ✅ **CURRENT CLEAN STRUCTURE** (Post-Cleanup)

After removing dangerous duplicate files, here's the **correct** environment file structure:

```
hive_ui/
├── .env.local                    # ✅ Auth.js secrets only (root level)
├── apps/web/.env.local          # ✅ Main development environment
└── firebase/scripts/.env        # ✅ Firebase admin scripts (development)
```

## 🎯 **FILE PURPOSES & RULES**

### **1. `.env.local` (Root Level)**
```bash
# PURPOSE: Auth.js secrets only
# SCOPE: Workspace-wide authentication
# ENVIRONMENT: Development only

AUTH_SECRET="UmdcF2Lps8QxuPYEgt8uVvNoeSGvinLWETy8yYFAyRU="
```

**Rules:**
- ✅ Only Auth.js related secrets
- ✅ Committed to `.gitignore`
- ❌ No Firebase credentials here
- ❌ No application-specific config

### **2. `apps/web/.env.local` (Main Application)**
```bash
# PURPOSE: Next.js application development environment
# SCOPE: apps/web only
# ENVIRONMENT: Development (hive-dev-2025)

# Environment Settings
NODE_ENV=development
VERCEL_ENV=development

# Firebase Client (Development)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD0aMEsznCtijDJBV8KcHS0KXrmS3DIXZc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-dev-2025.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-dev-2025
# ... other development Firebase config

# Firebase Admin (Development)
FIREBASE_PROJECT_ID=hive-dev-2025
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@hive-dev-2025.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Application URLs
NEXTAUTH_SECRET=your-32-character-random-secret-key-here-development
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Rules:**
- ✅ Complete Next.js application environment
- ✅ Development Firebase project only (hive-dev-2025)
- ✅ Local URLs (localhost:3000)
- ❌ Never production credentials

### **3. `firebase/scripts/.env` (Firebase Scripts)**
```bash
# PURPOSE: Firebase admin scripts and utilities
# SCOPE: Firebase operations only
# ENVIRONMENT: Development (hive-dev-2025)

FIREBASE_PROJECT_ID="hive-dev-2025"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-fbsvc@hive-dev-2025.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Rules:**
- ✅ Firebase admin operations only
- ✅ Development project credentials only
- ✅ Used by Firebase scripts and functions
- ❌ Not for Next.js application

## 🚫 **WHAT WAS REMOVED** (Security Cleanup)

### **Dangerous Files Deleted:**
- ❌ `.env.production` (root) - **CONTAINED PRODUCTION SECRETS**
- ❌ `.env.check` (root) - **CONTAINED PRODUCTION SECRETS**  
- ❌ `apps/web/.env.production` - **CONTAINED PRODUCTION SECRETS**
- ❌ `firebase/scripts/service-account-prod.json` - **PRODUCTION FIREBASE CREDENTIALS**
- ❌ `firebase/scripts/service-account.json` - **DEVELOPMENT FIREBASE CREDENTIALS**

### **Why These Were Dangerous:**
1. **Production credentials in local files** - Firebase private keys exposed
2. **Version control risk** - Secrets that shouldn't be committed
3. **Confusion for developers** - Multiple conflicting environment files
4. **Security breach potential** - Production access in development environment

## 🎯 **ENVIRONMENT STRATEGY BY DEPLOYMENT TARGET**

### **🟢 Development (Local)**
- **Files Used**: `apps/web/.env.local`, `firebase/scripts/.env`
- **Firebase Project**: `hive-dev-2025`
- **URLs**: `http://localhost:3000`
- **Security**: Development credentials only

### **🟡 Staging/Preview (Vercel)**
- **Files Used**: Vercel Environment Variables only
- **Firebase Project**: `hive-staging-2025`
- **URLs**: `https://your-staging-url.vercel.app`
- **Security**: Staging credentials in Vercel dashboard

### **🔴 Production (Vercel)**
- **Files Used**: Vercel Environment Variables only
- **Firebase Project**: `hive-9265c`
- **URLs**: `https://hive.college`
- **Security**: Production credentials in Vercel dashboard

## ⚠️ **CRITICAL SECURITY RULES**

### **✅ DO:**
1. Use **development credentials** in local `.env.local` files
2. Store **production credentials** only in Vercel dashboard
3. Use **different Firebase projects** for each environment
4. Keep **root `.env.local`** minimal (Auth.js secrets only)
5. Use **`apps/web/.env.local`** for main application development

### **❌ NEVER:**
1. Store production credentials in local files
2. Commit `.env.*` files to version control
3. Share environment files between developers
4. Use production Firebase project for development
5. Create `.env.production` files locally

## 🔧 **DEVELOPER SETUP INSTRUCTIONS**

### **For New Developers:**

1. **Copy the development template**:
   ```bash
   cd apps/web
   cp .env.local.template .env.local  # (if template exists)
   ```

2. **Get development Firebase credentials**:
   - Go to Firebase Console → hive-dev-2025
   - Generate service account key
   - Add credentials to `apps/web/.env.local`

3. **Generate NextAuth secret**:
   ```bash
   openssl rand -base64 32
   ```

4. **Test the setup**:
   ```bash
   npm run dev
   # Visit http://localhost:3000/api/health
   ```

## 📋 **ENVIRONMENT VARIABLE CHECKLIST**

### **Required in `apps/web/.env.local`:**
- [ ] `NODE_ENV=development`
- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY` (development)
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-dev-2025`
- [ ] `FIREBASE_CLIENT_EMAIL` (development service account)
- [ ] `FIREBASE_PRIVATE_KEY` (development service account)
- [ ] `NEXTAUTH_SECRET` (32-character random string)
- [ ] `NEXTAUTH_URL=http://localhost:3000`
- [ ] `NEXT_PUBLIC_APP_URL=http://localhost:3000`

### **Required in Vercel (Production):**
- [ ] All Firebase production credentials
- [ ] Production domain URLs
- [ ] Production NextAuth secret
- [ ] `NODE_ENV=production`
- [ ] `VERCEL_ENV=production`

## 🎉 **BENEFITS OF CLEAN STRUCTURE**

1. **Security**: No production secrets in local files
2. **Clarity**: Clear purpose for each environment file
3. **Isolation**: Development and production completely separated
4. **Maintainability**: Easy to understand and modify
5. **Team Onboarding**: Clear instructions for new developers
6. **Version Control Safety**: Only development configs locally

---

**🔥 CRITICAL**: After this cleanup, HIVE's environment configuration is now **secure, organized, and maintainable**. No more production credential leaks! 