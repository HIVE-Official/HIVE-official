# Database Setup Scripts

## One-Time Database Initialization

This directory contains scripts and data for setting up the HIVE Firestore database with schools, authentication, and onboarding collections.

### Files

- `schools-data.json` - Contains initial school data, system config, and metrics
- `init-schools-auth.ts` - TypeScript initialization script (requires Firebase credentials)
- `setup-README.md` - This file

### Setup Options

#### Option 1: Manual Import via Firebase Console (Recommended for one-time setup)

1. Go to the [Firebase Console](https://console.firebase.google.com)
2. Navigate to your project > Firestore Database
3. Use the Import/Export feature to import `schools-data.json`

#### Option 2: Firebase CLI Import

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Import the data
firebase firestore:import ./scripts/schools-data.json --project hive-9265c
```

#### Option 3: Script Execution (Requires Firebase Admin Credentials)

```bash
# Set up Firebase Admin SDK credentials first
export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"

# Run the initialization script
pnpm init-db
```

### What Gets Created

**Schools Collection:**
- `schools/nyu` - New York University (open)
- `schools/columbia` - Columbia University (waitlist)
- `schools/stanford` - Stanford University (coming-soon)

**System Collections:**
- `school_metrics/{schoolId}` - Usage metrics for each school
- `app_config/system` - System-wide configuration
- `version/current` - Database version tracking

**Security Rules:**
- Updated rules for onboarding sessions
- Waitlist entry permissions
- School invitation management

### Collections Ready for Use

These collections are defined in the security rules and data models but will be created as needed:

- `onboarding_sessions/{sessionId}` - User onboarding progress
- `waitlist_entries/{entryId}` - School waitlist management
- `school_invitations/{invitationId}` - Early access invitations

### Existing Collections Preserved

All existing collections remain untouched:
- Spaces (all types and structures)
- Users and authentication
- Posts and feed data
- Tools and creation engine
- Analytics collections

## Notes

- This is designed as a **one-time setup**
- The script checks for existing data and won't overwrite
- All new data models include proper TypeScript types and Zod validation
- Security rules are designed to be secure by default