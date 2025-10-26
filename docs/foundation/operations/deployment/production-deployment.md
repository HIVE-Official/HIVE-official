# HIVE Production Deployment Guide

**Last Updated**: September 29, 2025
**Status**: Ready for deployment
**Estimated Time**: 2-3 hours

---

## 🎯 Pre-Deployment Checklist

Before starting deployment, verify:

- [ ] All P0 tasks completed (see TODO.md)
- [ ] TypeScript compilation passes: `NODE_OPTIONS="--max-old-space-size=4096" pnpm typecheck`
- [ ] Build succeeds: `NODE_OPTIONS="--max-old-space-size=4096" pnpm build`
- [ ] Critical tests pass: `pnpm test`
- [ ] Git committed and pushed to main branch
- [ ] Team notified of deployment

---

## 🔥 Step 1: Firebase Production Setup (60 minutes)

### 1.1 Create Production Project

```bash
# Login to Firebase
firebase login

# Create new production project
firebase projects:create hive-prod-ub --display-name "HIVE - UB Production"

# Select the project
firebase use hive-prod-ub

# Get project details
firebase projects:list
```

### 1.2 Enable Required Services

Go to [Firebase Console](https://console.firebase.google.com):

1. **Authentication**
   - Enable Email/Password provider
   - Enable Email Link (passwordless) sign-in
   - Add authorized domain: `hive.college`
   - Add authorized domain: `*.vercel.app` (for preview)

2. **Firestore Database**
   - Create database in `us-east1` (closest to UB)
   - Start in production mode
   - Deploy security rules (next step)

3. **Storage**
   - Enable Firebase Storage
   - Set up CORS for image uploads
   - Deploy storage rules

4. **Functions** (if using)
   - Enable Cloud Functions
   - Set Node.js 18 runtime

### 1.3 Deploy Security Rules

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Verify rules deployed
firebase firestore:rules get

# Deploy Firestore indexes
firebase deploy --only firestore:indexes

# Or use the helper script
pnpm indexes:deploy
```

### 1.4 Configure SendGrid for Email

1. Create SendGrid account: https://sendgrid.com
2. Generate API key with Mail Send permissions
3. Add sender verification for `noreply@hive.college`
4. Save API key for Vercel environment variables

### 1.5 Export Firebase Config

```bash
# Get Firebase config
firebase apps:sdkconfig web

# Save the output - you'll need these for Vercel:
# - apiKey
# - authDomain
# - projectId
# - storageBucket
# - messagingSenderId
# - appId
```

### 1.6 Generate Service Account

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Download JSON file
4. **IMPORTANT**: Keep this file secure, never commit to git
5. You'll upload this to Vercel as an environment variable

---

## ☁️ Step 2: Vercel Deployment (45 minutes)

### 2.1 Install Vercel CLI

```bash
# Install globally
npm install -g vercel@latest

# Login
vercel login
```

### 2.2 Link Project

```bash
# From project root
cd /Users/laneyfraass/hive_ui

# Link to Vercel (or create new project)
vercel link

# When prompted:
# - Set up and deploy: Yes
# - Scope: Your team/personal
# - Link to existing project: No (or Yes if already created)
# - Project name: hive-prod
# - Directory: ./
```

### 2.3 Configure Environment Variables

Create `.env.production.local` file:

```bash
# Copy from template
cp apps/web/.env.production.template apps/web/.env.production.local

# Edit with production values
nano apps/web/.env.production.local
```

Required environment variables:

```bash
# Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=<from Step 1.5>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-prod-ub.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-prod-ub
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hive-prod-ub.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<from Step 1.5>
NEXT_PUBLIC_FIREBASE_APP_ID=<from Step 1.5>

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=hive-prod-ub
FIREBASE_CLIENT_EMAIL=<from service account JSON>
FIREBASE_PRIVATE_KEY="<from service account JSON - keep newlines>"

# Or use the entire service account JSON as one variable:
FIREBASE_ADMIN_SERVICE_ACCOUNT='<entire JSON from Step 1.6>'

# SendGrid Email
SENDGRID_API_KEY=<from Step 1.4>
SENDGRID_FROM_EMAIL=noreply@hive.college
SENDGRID_FROM_NAME=HIVE

# Application Config
NEXT_PUBLIC_APP_URL=https://hive.college
NODE_ENV=production

# Campus Config
NEXT_PUBLIC_CAMPUS_ID=ub-buffalo
NEXT_PUBLIC_CAMPUS_NAME="University at Buffalo"

# Magic Link Config
MAGIC_LINK_DOMAIN=hive.college
MAGIC_LINK_EXPIRY=3600000

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=<create at upstash.com>
UPSTASH_REDIS_REST_TOKEN=<from upstash>

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_SENTRY=false
```

### 2.4 Add Environment Variables to Vercel

```bash
# Add each variable (production only)
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production
# ... repeat for all variables

# Or upload service account as file
vercel env add FIREBASE_ADMIN_SERVICE_ACCOUNT production < service-account.json

# List to verify
vercel env ls
```

### 2.5 Configure Custom Domain

```bash
# Add domain
vercel domains add hive.college

# Add www subdomain (optional)
vercel domains add www.hive.college

# Vercel will provide DNS records to add:
# - A record: 76.76.21.21
# - CNAME record: cname.vercel-dns.com
```

Add these DNS records at your domain registrar:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

Wait 5-10 minutes for DNS propagation.

### 2.6 Deploy to Production

```bash
# Deploy to production
vercel --prod

# Monitor deployment
vercel logs --follow

# Get deployment URL
vercel inspect
```

---

## ✅ Step 3: Post-Deployment Verification (30 minutes)

### 3.1 Smoke Tests

Visit https://hive.college and verify:

- [ ] **Homepage loads** (no errors in console)
- [ ] **Auth flow works**
  - Enter @buffalo.edu email
  - Receive magic link email
  - Click link, get authenticated
  - Session persists after refresh
- [ ] **Feed loads** with proper data
- [ ] **Spaces page loads** with recommendations
- [ ] **Profile page accessible**
- [ ] **Mobile responsive** (test on phone or DevTools)

### 3.2 API Health Checks

```bash
# Health endpoint
curl https://hive.college/api/health

# Expected: {"status":"ok","timestamp":"..."}

# Auth session (should return 401 if not logged in)
curl https://hive.college/api/auth/session

# Spaces endpoint (should return 401 if not logged in)
curl https://hive.college/api/spaces
```

### 3.3 Monitor Errors

```bash
# Watch Vercel logs
vercel logs --follow

# Check for:
# - Authentication errors
# - Database connection errors
# - API rate limiting issues
# - JavaScript errors
```

### 3.4 Performance Check

Use [PageSpeed Insights](https://pagespeed.web.dev/):

```
https://pagespeed.web.dev/analysis?url=https://hive.college
```

Target metrics:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Performance Score**: > 80

---

## 🚨 Step 4: Emergency Procedures

### 4.1 Rollback Deployment

```bash
# List recent deployments
vercel ls

# Rollback to previous deployment
vercel rollback <deployment-url>

# Or promote a specific deployment
vercel promote <deployment-url> --prod
```

### 4.2 Scale Down (if needed)

If experiencing issues:

```bash
# Disable specific API routes
# Edit vercel.json to set maxDuration: 0

# Redeploy
vercel --prod
```

### 4.3 Emergency Contacts

- **Technical Lead**: [Your contact]
- **Firebase Support**: https://firebase.google.com/support
- **Vercel Support**: https://vercel.com/support
- **SendGrid Support**: https://support.sendgrid.com

---

## 📊 Step 5: Monitoring Setup (20 minutes)

### 5.1 Firebase Console

Monitor at: https://console.firebase.google.com/project/hive-prod-ub

- **Authentication**: User signups, login failures
- **Firestore**: Read/write operations, errors
- **Storage**: Upload rates, storage usage

### 5.2 Vercel Analytics

Enable at: https://vercel.com/[team]/hive-prod/analytics

- **Real User Monitoring**: Page load times
- **Web Vitals**: Core Web Vitals tracking
- **Traffic**: Requests per second, bandwidth

### 5.3 Custom Metrics

Monitor these in Firebase Analytics or custom dashboard:

- **Signups per hour**
- **Onboarding completion rate**
- **Spaces joined per user**
- **Posts created per day**
- **Error rate**
- **API latency (p95)**

---

## 🎉 Launch Announcement

Once verified (Steps 1-3 complete):

1. **Internal announcement** (team Slack/Discord)
2. **Beta tester invite** (50 students)
3. **Monitor for 2 hours** before public launch
4. **Public announcement** (email, social media)

---

## 📝 Troubleshooting

### Common Issues

**Build fails on Vercel:**
```bash
# Increase memory
# Add to vercel.json
{
  "build": {
    "env": {
      "NODE_OPTIONS": "--max-old-space-size=4096"
    }
  }
}
```

**Firebase auth not working:**
- Check authorized domains in Firebase Console
- Verify environment variables are set correctly
- Check browser console for CORS errors

**Images not loading:**
- Verify Firebase Storage CORS configuration
- Check Storage security rules
- Ensure image URLs are using HTTPS

**API rate limiting:**
- Check Upstash Redis connection
- Verify rate limit configuration
- Consider increasing limits for launch

---

## ✅ Deployment Complete!

When all steps are done:

- [ ] Production URL live: https://hive.college
- [ ] All smoke tests passing
- [ ] Monitoring dashboards active
- [ ] Team notified
- [ ] Ready for beta launch!

**Next**: Follow `LAUNCH_DAY_RUNBOOK.md` for launch procedures.