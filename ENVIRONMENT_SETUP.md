# HIVE Environment Setup Guide

## Environment File Structure

All environment files should be located in the Next.js application directory (`apps/web/`):

```
apps/web/
├── .env.local          # Local development (not tracked in git)
├── .env.example        # Template (tracked in git)
├── .env.development    # Vercel development environment
├── .env.preview        # Vercel preview environment
└── .env.production     # Vercel production environment
```

**Important**: Environment files should ONLY exist in `apps/web/`. Do not place environment files in the monorepo root.

## Setting Up Your Development Environment

1. Navigate to the web app directory:
   ```bash
   cd apps/web
   ```

2. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

3. Fill in your environment variables in `.env.local`

4. For Vercel environments, use the Vercel CLI:
   ```bash
   vercel env pull .env.production --environment=production
   vercel env pull .env.preview --environment=preview
   vercel env pull .env.development --environment=development
   ```

## Required Environment Variables

### Firebase Configuration
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

### Firebase Admin (Server-side)
```bash
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

### NextAuth Configuration
```bash
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_APP_URL=
```

## Development Configuration (Optional)
```bash
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_IS_DEVELOPMENT=true
NEXT_PUBLIC_ENABLE_DEBUG=true
```

## Security Considerations

1. Never commit environment files to git (except `.env.example`)
2. Keep your Firebase Admin private key secure
3. Use different values for each environment
4. Regularly rotate sensitive credentials

## Troubleshooting

### Missing Environment Variables
If you see errors about missing environment variables:

1. Check that you're in `apps/web/` directory
2. Verify `.env.local` exists and has all required variables
3. For Vercel environments, re-pull using the CLI
4. Restart your development server

### Firebase Configuration Issues
If Firebase fails to initialize:

1. Verify all NEXT_PUBLIC_FIREBASE_* variables are set
2. Check Firebase Console for correct values
3. Ensure FIREBASE_PRIVATE_KEY includes newlines
4. Verify FIREBASE_CLIENT_EMAIL matches your service account

## Deployment

### Vercel
Environment variables are managed through the Vercel dashboard. After adding or updating variables:

1. Pull latest variables to local environment:
   ```bash
   cd apps/web
   vercel env pull .env.production --environment=production
   ```

2. Verify configuration:
   ```bash
   vercel env ls
   ```

Remember: Changes to environment variables require a redeploy to take effect. 