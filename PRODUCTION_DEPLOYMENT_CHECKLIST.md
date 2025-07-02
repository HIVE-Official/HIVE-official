# 🚀 HIVE PRODUCTION DEPLOYMENT CHECKLIST

## ✅ **PRE-DEPLOYMENT REQUIREMENTS**

### **1. Environment Variables Configuration**

#### **🔥 Firebase Configuration**
- [ ] ✅ Generate Firebase service account key from [Firebase Console](https://console.firebase.google.com)
- [ ] ✅ Extract `client_email` and `private_key` from service account JSON
- [ ] ✅ Set production Firebase client config in Vercel environment variables:

```bash
# Production Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDMDHXJ8LcWGXz05ipPTNvA-fRi9nfdzbQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-9265c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-9265c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hive-9265c.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=573191826528
NEXT_PUBLIC_FIREBASE_APP_ID=1:573191826528:web:1d5eaeb8531276e4c1a705
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-NK3E12MSFD

# Production Firebase Admin (Private)
FIREBASE_PROJECT_ID=hive-9265c
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@hive-9265c.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRODUCTION_KEY\n-----END PRIVATE KEY-----\n"
```

#### **🔐 Application Security**
- [ ] ✅ Generate NextAuth secret: `openssl rand -base64 32`
- [ ] ✅ Set production application URLs:

```bash
# Application Security
NEXTAUTH_SECRET=your-32-character-production-secret
NEXTAUTH_URL=https://your-production-domain.com
NEXT_PUBLIC_APP_URL=https://your-production-domain.com

# Environment Settings
NODE_ENV=production
VERCEL_ENV=production
```

#### **⚡ Turborepo (Optional)**
- [ ] ✅ Set Turborepo remote caching (for faster builds):

```bash
TURBO_TOKEN=your-vercel-turbo-token
TURBO_TEAM=your-vercel-team-slug
```

### **2. Vercel Dashboard Configuration**

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Select your HIVE project**
3. **Navigate to Settings → Environment Variables**
4. **Add each variable above for Production environment**
5. **Ensure sensitive variables (FIREBASE_PRIVATE_KEY, NEXTAUTH_SECRET) are marked as Production only**

### **3. Security Verification**

#### **🔒 Check for Hardcoded Values**
- [ ] ✅ Verify no hardcoded Firebase configs in code
- [ ] ✅ Verify all sensitive data uses environment variables
- [ ] ✅ Check `.gitignore` includes `.env*` files
- [ ] ✅ Verify no service account keys committed to git

#### **🛡️ Security Headers**
- [ ] ✅ Verify Vercel security headers are configured (in `vercel.json`)
- [ ] ✅ Test CSP, XSS protection, and frame options

## 🚨 **DEPLOYMENT STEPS**

### **Step 1: Pre-deployment Testing**

```bash
# 1. Test local build
cd apps/web
npm run build

# 2. Test production environment locally
npm run start

# 3. Verify health endpoint
curl http://localhost:3000/api/health
```

### **Step 2: Environment Validation**

Create a pre-deployment validation script:

```bash
# Test Firebase connection
node -e "
const admin = require('firebase-admin');
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\\\n/g, '\\n')
    })
  });
  console.log('✅ Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('❌ Firebase Admin SDK initialization failed:', error.message);
  process.exit(1);
}
"
```

### **Step 3: Deploy to Staging First**

```bash
# 1. Deploy to preview branch first
git checkout -b deployment-test
git push origin deployment-test

# 2. Test preview deployment
# 3. Verify health endpoint on preview URL
curl https://your-preview-url.vercel.app/api/health
```

### **Step 4: Production Deployment**

```bash
# 1. Merge to main branch
git checkout main
git merge deployment-test
git push origin main

# 2. Verify deployment in Vercel Dashboard
# 3. Test production URL
curl https://your-production-domain.com/api/health
```

## 🔍 **POST-DEPLOYMENT VERIFICATION**

### **1. Health Check Verification**

Expected health check response:
```json
{
  "status": "healthy",
  "timestamp": "2024-12-XX...",
  "version": "1.0.0",
  "environment": "production",
  "checks": {
    "firebase": {
      "clientConfigured": true,
      "adminConfigured": true,
      "projectId": "hive-9265c"
    },
    "vercel": {
      "environment": "production",
      "region": "iad1"
    }
  }
}
```

### **2. Authentication Flow Testing**

- [ ] ✅ Test email authentication flow
- [ ] ✅ Verify .edu email validation
- [ ] ✅ Test auth state persistence
- [ ] ✅ Verify logout functionality

### **3. Firebase Services Testing**

- [ ] ✅ Test Firestore read/write operations
- [ ] ✅ Verify security rules are enforced
- [ ] ✅ Test file upload to Storage (if implemented)
- [ ] ✅ Verify Analytics tracking (if implemented)

### **4. Performance & Security Testing**

- [ ] ✅ Run Lighthouse audit (target: 90+ performance)
- [ ] ✅ Verify Core Web Vitals
- [ ] ✅ Test security headers with [securityheaders.com](https://securityheaders.com)
- [ ] ✅ Verify HTTPS enforcement
- [ ] ✅ Test CSP policies

## 🚨 **ROLLBACK PROCEDURE**

If deployment fails:

### **Quick Rollback**
1. **Go to Vercel Dashboard → Deployments**
2. **Find last known good deployment**
3. **Click "Promote to Production"**

### **Emergency Fix**
```bash
# 1. Revert problematic commit
git revert <commit-hash>
git push origin main

# 2. Force new deployment
git commit --allow-empty -m "Force redeploy"
git push origin main
```

## 📞 **SUPPORT CONTACTS**

- **Vercel Issues**: [Vercel Support](https://vercel.com/support)
- **Firebase Issues**: [Firebase Support](https://firebase.google.com/support)
- **Environment Template**: See `ENV_TEMPLATE.md`
- **Security Audit**: See `SECURITY_DEPLOYMENT_AUDIT.md`

## 🎉 **SUCCESS CRITERIA**

Deployment is successful when:
- [ ] ✅ All health checks return 200 status
- [ ] ✅ Authentication flow works end-to-end
- [ ] ✅ No console errors in production
- [ ] ✅ Firebase services operational
- [ ] ✅ Performance metrics meet targets
- [ ] ✅ Security headers properly configured

---

**📋 CHECKLIST COMPLETE** - HIVE is ready for production! 🚀 