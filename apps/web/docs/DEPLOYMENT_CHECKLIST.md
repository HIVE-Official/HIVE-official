# 🚀 HIVE Deployment Checklist - Complete Action Plan

## 📋 Pre-Deployment Checklist

### ✅ Code Preparation
- [x] Firebase Admin SDK configured
- [x] Firebase client SDK integrated
- [x] Magic link authentication implemented
- [x] Session management system created
- [x] Middleware updated for Firebase auth
- [x] Global auth provider integrated
- [x] Vercel configuration file updated
- [x] Environment variables documented

### ⚠️ Known Issues to Fix (Optional)
- [ ] Build warnings in @hive/ui package (case sensitivity)
- [ ] ESLint warnings (164 total)
- [ ] Storybook build failures (non-critical)

---

## 🔥 Firebase Console Setup (15 minutes)

### Step 1: Enable Authentication
**URL**: https://console.firebase.google.com/project/hive-9265c/authentication/providers

1. [ ] Click "Email/Password" provider
2. [ ] Enable "Email/Password" toggle
3. [ ] Enable "Email link (passwordless sign-in)" toggle
4. [ ] Click "Save"

### Step 2: Add Authorized Domains
**URL**: https://console.firebase.google.com/project/hive-9265c/authentication/settings

Add these domains:
- [ ] `localhost` (for development)
- [ ] `*.vercel.app` (for preview deployments)
- [ ] `your-app.vercel.app` (will be auto-generated)
- [ ] `hive.college` (or your custom domain)

### Step 3: Configure Dynamic Links
**URL**: https://console.firebase.google.com/project/hive-9265c/durablelinks

1. [ ] Click "Get Started"
2. [ ] Create URL prefix (e.g., `https://hive.page.link`)
3. [ ] Save the prefix

### Step 4: Customize Email Template
**URL**: https://console.firebase.google.com/project/hive-9265c/authentication/emails

1. [ ] Select "Email address verification" template
2. [ ] Update subject to: `🐝 Welcome to HIVE - Sign in to your account`
3. [ ] Keep default action URL
4. [ ] Save template

---

## 🚢 Vercel Deployment (10 minutes)

### Step 1: Connect Repository
1. [ ] Go to https://vercel.com/new
2. [ ] Import your Git repository
3. [ ] Select root directory: `/`
4. [ ] Framework: Next.js (auto-detected)

### Step 2: Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:

**Public Variables:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDMDHXJ8LcWGXz05ipPTNvA-fRi9nfdzbQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-9265c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-9265c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hive-9265c.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1055287671416
NEXT_PUBLIC_FIREBASE_APP_ID=1:1055287671416:web:ca93c99d674a59e31be11b
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-PQC1D60F6R
NEXT_PUBLIC_APP_URL=https://[your-app].vercel.app
```

**Private Variable (paste as single line):**
```
FIREBASE_SERVICE_ACCOUNT=[paste entire service account JSON as single line]
```

### Step 3: Deploy
1. [ ] Click "Deploy"
2. [ ] Wait for build to complete (5-10 minutes)
3. [ ] Note your production URL

---

## 🔍 Post-Deployment Verification

### Step 1: Update Firebase Domains
1. [ ] Go back to Firebase authorized domains
2. [ ] Add your Vercel production URL
3. [ ] Add any custom domains

### Step 2: Test Authentication Flow
1. [ ] Navigate to `https://your-app.vercel.app/schools`
2. [ ] Select "University at Buffalo"
3. [ ] Enter test email address
4. [ ] Check email for magic link
5. [ ] Click link and verify redirect
6. [ ] Complete onboarding (new users)
7. [ ] Access dashboard (existing users)

### Step 3: Verify Protected Routes
1. [ ] Try accessing `/dashboard` without login (should redirect)
2. [ ] Try accessing `/profile` without login (should redirect)
3. [ ] Login and verify access works

### Step 4: Check Session Persistence
1. [ ] Login successfully
2. [ ] Refresh page (should stay logged in)
3. [ ] Close and reopen browser (should stay logged in)
4. [ ] Logout and verify session cleared

---

## 📊 Monitoring Setup

### Vercel Analytics
1. [ ] Enable Analytics in Vercel Dashboard
2. [ ] Monitor Core Web Vitals
3. [ ] Check function execution times

### Firebase Console
1. [ ] Monitor Authentication → Users
2. [ ] Check Firestore → Data
3. [ ] Review Usage & Billing

---

## 🚨 Troubleshooting Guide

### Issue: Build Fails on Vercel
**Solution:**
```bash
# Check build logs for specific error
# Common fixes:
1. Ensure all env variables are set
2. Check for TypeScript errors
3. Verify package.json scripts
```

### Issue: Magic Links Not Sending
**Solution:**
1. Verify Email/Password auth is enabled
2. Check Dynamic Links configuration
3. Ensure domain is authorized
4. Check Firebase quotas

### Issue: Users Can't Login
**Solution:**
1. Check browser console for errors
2. Verify Firebase configuration
3. Check CORS settings
4. Review function logs in Vercel

### Issue: Session Not Persisting
**Solution:**
1. Check cookies are enabled
2. Verify session storage code
3. Check token refresh logic
4. Clear browser data and retry

---

## 📝 Final Steps

### Custom Domain (Optional)
1. [ ] Add custom domain in Vercel Dashboard
2. [ ] Update DNS records
3. [ ] Add to Firebase authorized domains
4. [ ] Update NEXT_PUBLIC_APP_URL

### Performance Optimization
1. [ ] Run Lighthouse audit
2. [ ] Optimize images with next/image
3. [ ] Enable ISR for static pages
4. [ ] Monitor bundle size

### Security Review
1. [ ] Verify all API routes are protected
2. [ ] Check Firebase security rules
3. [ ] Review middleware security headers
4. [ ] Test rate limiting

---

## ✅ Launch Checklist

Before going live:
- [ ] All Firebase setup complete
- [ ] Vercel deployment successful
- [ ] Authentication flow tested
- [ ] Protected routes verified
- [ ] Session management working
- [ ] Email delivery confirmed
- [ ] Custom domain configured (if applicable)
- [ ] Monitoring enabled
- [ ] Error tracking setup
- [ ] Team access configured

---

## 🎉 Congratulations!

Once all items are checked, HIVE is ready for production use!

**Support Resources:**
- Firebase Console: https://console.firebase.google.com/project/hive-9265c
- Vercel Dashboard: https://vercel.com/dashboard
- Documentation: `/apps/web/docs/`

**Estimated Total Time:** 30-45 minutes

---

**Created**: January 2025
**Platform**: HIVE v1.0.0
**Status**: Ready for Deployment