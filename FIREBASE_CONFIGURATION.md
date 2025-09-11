# Firebase Configuration for HIVE Platform

## Active Firebase Project: `hive-9265c`

All Firebase references across the HIVE platform have been standardized to use the **`hive-9265c`** Firebase project.

## Configuration Files Updated

### Environment Templates
- ✅ `.env.example` - Updated to `hive-9265c`
- ✅ `.env.production` - Updated to `hive-9265c`
- ✅ `apps/web/.env.example` - Updated to `hive-9265c`
- ✅ `apps/web/.env.production` - Already using `hive-9265c`

### Firebase URLs
- **Auth Domain**: `hive-9265c.firebaseapp.com`
- **Storage Bucket**: `hive-9265c.appspot.com`
- **Project ID**: `hive-9265c`
- **Admin SDK Email**: `firebase-adminsdk-xxxxx@hive-9265c.iam.gserviceaccount.com`

## Required Environment Variables

### For Development (`.env.local`)
```bash
# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-9265c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-9265c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hive-9265c.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<your-measurement-id>

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=hive-9265c
FIREBASE_CLIENT_EMAIL=<your-service-account-email>
FIREBASE_PRIVATE_KEY=<your-private-key>
```

## Firebase Services Used

1. **Authentication** - Magic links, email auth
2. **Firestore** - Main database for all data
3. **Storage** - Image uploads, file storage
4. **Cloud Messaging** - Push notifications
5. **Analytics** - User behavior tracking

## Database Collections Structure

```
hive-9265c/
├── users/
│   ├── {userId}/
│   │   ├── preferences/
│   │   ├── privacy/
│   │   └── integrations/
├── spaces/
│   ├── {spaceId}/
│   │   ├── posts/
│   │   ├── events/
│   │   ├── members/
│   │   ├── tools/
│   │   └── rituals/
├── tools/
│   └── {toolId}/
│       ├── versions/
│       └── analytics/
├── rituals/
│   └── {ritualId}/
│       ├── instances/
│       └── participants/
└── feed/
    └── {userId}/
        └── items/
```

## Setup Instructions

1. **Get Your Firebase Credentials**:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select project `hive-9265c`
   - Go to Project Settings

2. **Client Configuration**:
   - In Project Settings, scroll to "Your apps"
   - Select your web app
   - Copy the configuration values

3. **Admin SDK Configuration**:
   - Go to Project Settings → Service Accounts
   - Generate a new private key
   - Download the JSON file
   - Extract the values for environment variables

4. **Create `.env.local`**:
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   # Edit .env.local with your credentials
   ```

5. **Verify Configuration**:
   ```bash
   npm run dev
   # Check console for "Firebase config loaded" message
   ```

## Security Notes

- **NEVER** commit `.env.local` or any file with real credentials
- **ALWAYS** use environment variables in production (Vercel, etc.)
- The project ID `hive-9265c` is safe to share
- Keep API keys, private keys, and service account emails secret

## Troubleshooting

If you see Firebase configuration errors:

1. **Check Environment Variables**:
   ```bash
   # Verify variables are loaded
   node -e "console.log(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)"
   ```

2. **Clear Next.js Cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Verify Firebase Project**:
   - Ensure `hive-9265c` project exists in your Firebase console
   - Check that all required services are enabled

## Migration Scripts

The following scripts are pre-configured for `hive-9265c`:
- `apps/web/src/scripts/migrate-database.ts`
- `apps/web/src/scripts/migrate-nested-collections.ts`

These can be run to set up initial data structures.

---

**Last Updated**: January 2025
**Firebase Project**: `hive-9265c`
**Status**: ✅ Configured and Ready