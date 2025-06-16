# HIVE Deployment Guide

## 🚀 **VERCEL DEPLOYMENT SETUP**

### **Environment Variables Configuration**

#### **Development Environment Variables**

Set these in your local `.env.local` file:

```env
# Development Environment
NODE_ENV=development

# Firebase Client Configuration (already configured via code)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD0aMEsznCtijDJBV8KcHS0KXrmS3DIXZc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-dev-2025.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-dev-2025
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hive-dev-2025.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=43961711178
NEXT_PUBLIC_FIREBASE_APP_ID=1:43961711178:web:d5cca76e45fc125bb484b3
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-9PJ6SQ8WVS

# Firebase Admin SDK (Required for API routes)
FIREBASE_PROJECT_ID=hive-dev-2025
FIREBASE_CLIENT_EMAIL=your-dev-service-account-email@hive-dev-2025.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_DEV_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# NextAuth Configuration
NEXTAUTH_SECRET=your-32-character-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

#### **Staging Environment Variables (Vercel Preview)**

Add these to Vercel environment variables for **Preview** deployments:

```env
# Staging Environment
NODE_ENV=staging
VERCEL_ENV=preview

# Firebase Admin SDK for Staging
FIREBASE_PROJECT_ID=hive-staging-2025
FIREBASE_CLIENT_EMAIL=your-staging-service-account-email@hive-staging-2025.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_STAGING_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# NextAuth Configuration
NEXTAUTH_SECRET=your-staging-32-character-secret-key
NEXTAUTH_URL=https://your-staging-url.vercel.app
```

#### **Production Environment Variables (Vercel Production)**

Add these to Vercel environment variables for **Production** deployments:

```env
# Production Environment
NODE_ENV=production
VERCEL_ENV=production

# Firebase Admin SDK for Production
FIREBASE_PROJECT_ID=hive-9265c
FIREBASE_CLIENT_EMAIL=your-production-service-account-email@hive-9265c.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRODUCTION_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# NextAuth Configuration
NEXTAUTH_SECRET=your-production-32-character-secret-key
NEXTAUTH_URL=https://your-production-domain.com
```

---

## 🔧 **VERCEL PROJECT SETUP**

### **1. Connect Repository**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link
```

### **2. Configure Build Settings**

- **Framework Preset**: Next.js
- **Build Command**: `cd apps/web && npm run build`
- **Output Directory**: `apps/web/.next`
- **Install Command**: `npm install -g pnpm && pnpm install --frozen-lockfile`

### **3. Set Environment Variables**

In Vercel Dashboard → Project → Settings → Environment Variables:

| Variable                | Development             | Preview (Staging)       | Production                 |
| ----------------------- | ----------------------- | ----------------------- | -------------------------- |
| `FIREBASE_CLIENT_EMAIL` | Dev service account     | Staging service account | Production service account |
| `FIREBASE_PRIVATE_KEY`  | Dev private key         | Staging private key     | Production private key     |
| `NEXTAUTH_SECRET`       | Random 32+ chars        | Random 32+ chars        | Random 32+ chars           |
| `NEXTAUTH_URL`          | `http://localhost:3000` | Staging URL             | Production URL             |

---

## 📋 **FIREBASE SERVICE ACCOUNT SETUP**

### **To get your Firebase Admin SDK credentials:**

1. **Go to Firebase Console** → Project Settings → Service Accounts
2. **Generate New Private Key**
3. **Download the JSON file**
4. **Extract these values from the JSON:**

```json
{
  "project_id": "hive-dev-2025",
  "client_email": "firebase-adminsdk-xxxxx@hive-dev-2025.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
}
```

5. **Set as Vercel Environment Variables:**
   - `FIREBASE_PROJECT_ID` = `project_id` from JSON
   - `FIREBASE_CLIENT_EMAIL` = `client_email` from JSON
   - `FIREBASE_PRIVATE_KEY` = `private_key` from JSON (include the quotes and newlines)

---

## 🚦 **DEPLOYMENT WORKFLOW**

### **Development → Staging → Production**

1. **Local Development:**

   ```bash
   # Work locally with dev Firebase
   npm run dev
   ```

2. **Deploy to Staging:**

   ```bash
   # Push to feature branch or main (creates preview deployment)
   git push origin feature-branch
   # Vercel automatically deploys with staging environment
   ```

3. **Deploy to Production:**
   ```bash
   # Merge to main and deploy
   git checkout main
   git merge feature-branch
   git push origin main
   # Vercel automatically deploys with production environment
   ```

---

## 🛡️ **SECURITY BEST PRACTICES**

### **Environment Variable Security**

- ✅ Never commit `.env*` files to git
- ✅ Use different service accounts for each environment
- ✅ Rotate keys regularly (quarterly)
- ✅ Use minimal permissions for service accounts

### **Firebase Security Rules**

Ensure your Firestore security rules are environment-appropriate:

```javascript
// Development: More permissive for testing
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}

// Production: Strict security rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /spaces/{spaceId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && isSpaceMember(spaceId);
    }
  }
}
```

---

## 🔍 **TESTING DEPLOYMENT**

### **Verify Each Environment:**

1. **Development:**

   ```bash
   curl http://localhost:3000/api/schools
   # Should return mock data or real data if Firebase configured
   ```

2. **Staging:**

   ```bash
   curl https://your-staging-url.vercel.app/api/schools
   # Should return data from staging Firebase
   ```

3. **Production:**
   ```bash
   curl https://your-production-domain.com/api/schools
   # Should return data from production Firebase
   ```

---

## 📞 **NEED HELP?**

### **Missing Information Needed:**

1. **Firebase Service Account Keys** for each environment
2. **Custom domain** for production (if applicable)
3. **NextAuth secret keys** (I can generate these for you)

### **Ready to Deploy:**

Once you provide the Firebase service account credentials, you can deploy immediately:

1. **Set Vercel environment variables**
2. **Push to main branch**
3. **Verify deployment works**

The application is **production-ready** - it just needs the Firebase credentials to connect to your databases!
