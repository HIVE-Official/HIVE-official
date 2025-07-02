# HIVE Environment Variables Setup Guide

## 📋 Overview

This document provides a complete guide for setting up environment variables for the HIVE project across all environments (development, preview, production).

## 🚀 Quick Setup for New Developers

1. **Copy the example files:**
   ```bash
   # Root level environment files
   cp .env.example .env.local
   
   # Web app environment files
   cp apps/web/.env.example apps/web/.env.local
   ```

2. **Fill in the actual values** (get these from team lead or Firebase console)

## 🔧 Environment Files Structure

```
hive_ui/
├── .env.local          # Local development (git ignored)
├── .env.example        # Template file (git tracked)
├── .env.development    # Vercel development environment (git ignored) 
├── .env.preview        # Vercel preview environment (git ignored)
├── .env.production     # Vercel production environment (git ignored)
└── apps/web/          # Web app environment files (mirrored structure)
    ├── .env.local      # Web app local development (git ignored)
    ├── .env.example    # Web app template (git tracked)
    ├── .env.development # Web app development environment (git ignored)
    ├── .env.preview    # Web app preview environment (git ignored)
    └── .env.production # Web app production environment (git ignored)
```

**Note:** The web app (`apps/web/`) maintains its own set of environment files that mirror the root configuration. This ensures proper environment variable access in both monorepo and web app contexts.

## 🔐 Required Environment Variables

### Firebase Configuration (Client-side)
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id  
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Firebase Admin (Server-side)
```bash
FIREBASE_CLIENT_EMAIL=service-account@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

### NextAuth Configuration
```bash
NEXTAUTH_SECRET=your_random_32_character_secret
NEXTAUTH_URL=http://localhost:3000  # Local dev URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🌍 Environment-Specific URLs

### Local Development
```bash
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production
```bash
NEXTAUTH_URL=https://hive.college
NEXT_PUBLIC_APP_URL=https://hive.college
```

### Preview/Staging
```bash
NEXTAUTH_URL=https://your-preview-url.vercel.app
NEXT_PUBLIC_APP_URL=https://your-preview-url.vercel.app
```

## 🔄 Syncing with Vercel

To pull the latest environment variables from Vercel:

```bash
# Pull production variables
vercel env pull .env.production --environment=production

# Pull preview variables  
vercel env pull .env.preview --environment=preview

# Pull development variables
vercel env pull .env.development --environment=development
```

## 🛡️ Security Considerations

### ✅ Safe to Share
- Template files (`.env.example`)
- Variable names and structure
- Documentation

### ❌ Never Share
- Actual environment files (`.env.local`, `.env.production`, etc.)
- Firebase private keys
- NextAuth secrets
- Any values with real credentials

## 🚨 Troubleshooting

### Firebase Configuration Errors
If you see "Missing environment variables" errors:

1. **Check all required variables are set:**
   ```bash
   # Check if variables are loaded
   echo $NEXT_PUBLIC_FIREBASE_PROJECT_ID
   ```

2. **Verify .env.local exists and has correct values**

3. **Restart your development server** after adding new variables

4. **For Vercel deployments**, ensure all environments have the variables set

### NextAuth Errors
- Make sure `NEXTAUTH_SECRET` is a random 32+ character string
- Verify `NEXTAUTH_URL` matches your actual domain/localhost
- Check that URLs don't have trailing slashes

## 📚 Additional Resources

- [Firebase Configuration Guide](https://firebase.google.com/docs/web/setup)
- [NextAuth.js Configuration](https://next-auth.js.org/configuration/options)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## 🔄 Updating Environment Variables

When environment variables change:

1. **Update Vercel first:**
   ```bash
   vercel env add VARIABLE_NAME
   ```

2. **Pull updates locally:**
   ```bash
   vercel env pull .env.local --environment=development
   ```

3. **Copy to web app if needed:**
   ```bash
   cp .env.local apps/web/.env.local
   ```

4. **Update documentation** if new variables are added

---

**Note:** Environment files are protected by `.gitignore` to prevent accidental commits of sensitive data. Only `.env.example` is tracked in git. 