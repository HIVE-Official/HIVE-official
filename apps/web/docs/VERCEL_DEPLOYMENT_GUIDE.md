# 🚀 Vercel Deployment Guide for HIVE

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub/GitLab/Bitbucket repository with HIVE code
- Firebase project configured (hive-9265c)

---

## 📝 Step 1: Import Project to Vercel

1. **Go to** https://vercel.com/new
2. **Import** your Git repository
3. **Select** the root directory (`/`)
4. **Framework Preset**: Next.js (auto-detected)
5. **Root Directory**: Leave as `.` (monorepo root)
6. **Build Command**: Already configured in vercel.json
7. **Output Directory**: Already configured in vercel.json

---

## 🔐 Step 2: Environment Variables

Add these environment variables in Vercel Dashboard → Settings → Environment Variables:

### Public Variables (Client-side)
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDMDHXJ8LcWGXz05ipPTNvA-fRi9nfdzbQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-9265c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-9265c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hive-9265c.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1055287671416
NEXT_PUBLIC_FIREBASE_APP_ID=1:1055287671416:web:ca93c99d674a59e31be11b
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-PQC1D60F6R
```

### Production URL (Update after first deployment)
```bash
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Private Variables (Server-side)
```bash
# Firebase Admin Service Account (paste entire JSON as single line)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"hive-9265c","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-7mq5c@hive-9265c.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}

# OR use separate variables (alternative approach)
FIREBASE_PROJECT_ID=hive-9265c
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-7mq5c@hive-9265c.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Optional Variables
```bash
# Sentry (if using error tracking)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
SENTRY_AUTH_TOKEN=your-sentry-auth-token

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

---

## 🌐 Step 3: Configure Firebase Authorized Domains

After deployment, add your Vercel domains to Firebase:

1. **Go to** [Firebase Console](https://console.firebase.google.com/project/hive-9265c/authentication/settings)
2. **Add these domains** to Authorized Domains:
   - `your-app.vercel.app` (auto-generated)
   - `your-custom-domain.com` (if using custom domain)
   - `*.vercel.app` (for preview deployments)

---

## 🔧 Step 4: Update Firebase Admin SDK

Update the firebase-admin initialization to handle Vercel's environment:

The code already handles this in `apps/web/src/lib/firebase-admin.ts`:
- Checks for `FIREBASE_SERVICE_ACCOUNT` environment variable
- Falls back to individual credential variables
- Handles both local file and environment variable approaches

---

## 📦 Step 5: Deploy

### Initial Deployment
```bash
# Push to your Git repository
git add .
git commit -m "Configure for Vercel deployment"
git push origin main

# Vercel will auto-deploy from your repository
```

### Manual Deployment (Optional)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from local
vercel --prod
```

---

## ✅ Step 6: Post-Deployment Checklist

### Update Environment Variables
1. **Get your production URL** from Vercel dashboard
2. **Update** `NEXT_PUBLIC_APP_URL` with the production URL
3. **Redeploy** to apply the change

### Test Authentication Flow
1. Navigate to `https://your-app.vercel.app/schools`
2. Select University at Buffalo
3. Enter test email
4. Check email for magic link
5. Verify authentication works
6. Complete onboarding flow

### Configure Custom Domain (Optional)
1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Add custom domain to Firebase authorized domains

---

## 🚨 Common Issues & Solutions

### Build Fails
```bash
# Check build logs for specific errors
# Common issues:
- Missing environment variables
- TypeScript errors
- Package resolution issues

# Fix: Ensure all env vars are set in Vercel
```

### Authentication Not Working
```bash
# Check:
1. Firebase authorized domains includes Vercel URL
2. FIREBASE_SERVICE_ACCOUNT is properly formatted
3. Dynamic Links are configured in Firebase
```

### CORS Errors
```bash
# Already handled in vercel.json
# If issues persist, check API route headers
```

### Function Timeouts
```bash
# Auth functions configured for 30s timeout
# Can increase in vercel.json if needed
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics
- Enable in Dashboard → Analytics
- Zero-config performance monitoring

### Function Logs
- View in Dashboard → Functions
- Real-time logs for debugging

### Error Tracking
- Consider adding Sentry integration
- Set SENTRY_DSN environment variable

---

## 🔄 Continuous Deployment

### Branch Deployments
- `main` branch → Production
- Other branches → Preview deployments
- Each PR gets unique preview URL

### Environment Variables per Environment
Set different values for:
- Production
- Preview
- Development (local)

---

## 📱 Progressive Web App (PWA)

The app is PWA-ready. After deployment:
1. Test installation on mobile devices
2. Verify offline functionality
3. Check push notifications (if enabled)

---

## 🎯 Performance Optimization

Vercel automatically provides:
- Edge caching
- Image optimization
- Static regeneration
- API route optimization

Monitor performance:
- Lighthouse scores
- Core Web Vitals
- Vercel Analytics

---

## 🔗 Important Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Firebase Console**: https://console.firebase.google.com/project/hive-9265c
- **Deployment Logs**: Check Vercel dashboard for real-time logs
- **Function Logs**: https://vercel.com/[your-team]/[your-project]/functions

---

## 📞 Support

- **Vercel Support**: https://vercel.com/support
- **Firebase Support**: https://firebase.google.com/support
- **Next.js Docs**: https://nextjs.org/docs

---

**Last Updated**: January 2025
**Platform Version**: 1.0.0
**Deployment Target**: Vercel