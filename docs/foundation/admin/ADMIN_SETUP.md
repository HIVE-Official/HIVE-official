# HIVE Admin System Setup

## 🔐 Admin Users Configured

The following users have been configured with admin access:

1. **Jacob Rhinehart** (`jwrhineh@buffalo.edu`)
   - Role: `super_admin`
   - Permissions: All system permissions
   - Access: Full platform control

2. **Noah** (`noahowsh@gmail.com`)
   - Role: `admin`
   - Permissions: Read, Write, Delete, Moderate, Manage Users, Manage Spaces, Feature Flags
   - Access: Full admin dashboard

## ✅ How Admin Access Works

### Automatic Grant on Login
When either of these email addresses signs into HIVE, the system will:

1. **Automatically detect** their email address
2. **Grant admin permissions** on their first login
3. **Create admin records** in Firebase
4. **Enable access** to the `/admin` dashboard

### No Manual Setup Required
- **No environment variables needed** - Emails are hardcoded for security
- **No Firebase console changes needed** - Permissions granted automatically
- **No scripts to run** - Everything happens on login

## 🚀 Accessing the Admin Dashboard

### For Jacob and Noah:

1. **Sign in normally** at `/auth/login` with your email
2. **Verify your email** with the magic link
3. **Navigate to `/admin`** - You'll have full access
4. **Start managing** the platform immediately

### Admin Dashboard Features Available:

- **Overview Tab**: Platform statistics and health metrics
- **Algorithm Tab**: Feed algorithm configuration
- **Rituals Tab**: Manage engagement campaigns
- **Moderation Tab**: Content moderation queue and actions
- **Analytics Tab**: Deep platform analytics
- **Users Tab**: User management and permissions
- **Spaces Tab**: Space management and configuration
- **Features Tab**: Feature flags and rollout control
- **System Tab**: System health and logs

## 🔧 Technical Implementation

### Security Layers:

1. **Email Verification**: Hardcoded in multiple locations
   - `/lib/admin-auth.ts` - Core admin check
   - `/lib/api-auth-middleware.ts` - API protection
   - `/api/auth/verify-magic-link/route.ts` - Auto-grant on login

2. **Firebase Custom Claims**: Set automatically
   - `isAdmin: true`
   - `role: 'super_admin'` or `'admin'`
   - `permissions: [array]`
   - `adminSince: timestamp`

3. **Firestore Records**: Created for audit trail
   - `users/{uid}` - User document with admin fields
   - `admins/{uid}` - Dedicated admin record

## 📊 Admin API Endpoints

All admin endpoints are protected and available at:

- `/api/admin/dashboard` - Platform overview data
- `/api/admin/moderation` - Content moderation
- `/api/admin/feature-flags` - Feature flag management
- `/api/admin/users` - User management
- `/api/admin/spaces` - Space management
- `/api/admin/feed-algorithm` - Feed configuration
- `/api/admin/activity-logs` - Audit logs
- `/api/admin/builder-requests` - Builder approvals
- And 13 more endpoints...

## 🛡️ Security Notes

- **Emails are hardcoded** - Cannot be changed via environment variables
- **Multiple validation layers** - Email, Firebase claims, Firestore records
- **Audit logging** - All admin actions are logged
- **Session security** - Admin sessions expire after 24 hours
- **Rate limiting** - Admin APIs have rate limits to prevent abuse

## 🚨 Important

- **First login grants admin** - The system will automatically detect and grant admin rights
- **No manual intervention needed** - Just sign in with your configured email
- **Production ready** - This system works in both development and production

## 📝 Adding New Admins

To add new admin users:

1. Add their email to `ADMIN_EMAILS` arrays in:
   - `/lib/admin-auth.ts`
   - `/lib/api-auth-middleware.ts`
   - `/api/auth/verify-magic-link/route.ts`

2. Choose their role:
   - `super_admin` - Full system control
   - `admin` - Standard admin access
   - `moderator` - Content moderation only

3. They'll receive admin rights on first login

## ✨ Status: READY

The admin system is **fully configured and ready to use**. Jacob and Noah can sign in and access the admin dashboard immediately.