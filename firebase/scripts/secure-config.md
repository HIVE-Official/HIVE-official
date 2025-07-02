# 🔐 Secure Firebase Scripts Configuration

## ✅ **SECURE APPROACH**

Firebase scripts should **NEVER** use local service account files. Instead, use environment variables:

### **Environment Variable Configuration**

```bash
# For development (firebase/scripts/.env)
FIREBASE_PROJECT_ID="hive-dev-2025"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@hive-dev-2025.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# For production (Vercel environment variables)
FIREBASE_PROJECT_ID="hive-9265c"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@hive-9265c.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### **Script Implementation Pattern**

```javascript
// firebase/scripts/admin-init.js
const admin = require('firebase-admin');

const initializeFirebaseAdmin = () => {
  if (!admin.apps.length) {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID
    });
  }
  
  return admin;
};

module.exports = { initializeFirebaseAdmin };
```

## ❌ **INSECURE PATTERNS TO AVOID**

### **DON'T DO THIS:**
```json
// ❌ WRONG - Points to local file
{
  "serviceAccountPath": "./service-account-prod.json"
}
```

```javascript
// ❌ WRONG - Reads local file
const serviceAccount = require('./service-account-prod.json');
```

### **DO THIS INSTEAD:**
```javascript
// ✅ CORRECT - Uses environment variables
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
};
```

## 🛡️ **SECURITY BENEFITS**

1. **No credentials in version control**
2. **Environment-specific configuration**
3. **Vercel integration** (production credentials in dashboard)
4. **Development isolation** (separate Firebase project)
5. **Team security** (no shared credential files)

## 📋 **MIGRATION CHECKLIST**

- [x] Delete all `service-account*.json` files
- [x] Update `production-config.json` to use environment variables
- [x] Add service account patterns to `.gitignore`
- [ ] Update all Firebase scripts to use environment variables
- [ ] Test scripts with development environment variables
- [ ] Verify production deployment uses Vercel environment variables

---

**🔥 CRITICAL**: All Firebase scripts must use environment variables, never local credential files! 