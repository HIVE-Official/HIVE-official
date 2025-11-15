# Firestore Indexes Documentation

## Overview

This document explains the Firestore composite indexes required for HIVE platform queries. These indexes are **critical** for production performance and functionality.

## 🚨 Critical Importance

**Without these indexes:**
- ❌ Complex queries will FAIL with "missing index" errors
- ❌ API routes will return 500 errors
- ❌ Feed, spaces, notifications, and rituals won't work
- ❌ Users will experience complete platform failure

**With proper indexes:**
- ✅ Queries execute in <1 second
- ✅ Platform scales to millions of documents
- ✅ Campus isolation enforced at database level
- ✅ Real-time features work efficiently

---

## 📁 Index Configuration File

**Location**: `/firebase/firestore.indexes.json`

This file contains 36 composite indexes covering all complex queries in the platform.

### Index Categories

#### 1. **Spaces Collection** (4 indexes)
Critical for browsing, searching, and discovering spaces.

```
- campusId + isActive + createdAt (DESC)      → Recent spaces
- campusId + isActive + name_lowercase (ASC)  → Alphabetical sorting
- campusId + isActive + memberCount (DESC)    → Popular spaces
- type + campusId + name_lowercase (ASC)      → Category filtering
```

**Why needed**: Spaces are filtered by campus, active status, then sorted by different criteria.

#### 2. **Space Members** (3 indexes)
Essential for membership validation and user space lists.

```
- spaceId + userId + isActive         → Check if user is member
- userId + isActive                   → Get all user memberships
- spaceId + isActive + joinedAt (DESC)→ List space members
```

**Why needed**: Multiple where clauses with different sort orders.

#### 3. **Posts Collection** (4 indexes)
Powers the feed and space post listings.

```
- createdAt (DESC) + isPromotedToFeed + isDeleted          → Auto-promotion
- campusId + isActive + isDeleted + createdAt (DESC)       → Campus feed
- spaceId + isDeleted + createdAt (DESC)                   → Space posts
- authorId + createdAt (DESC)                              → User posts
```

**Why needed**: Post queries combine multiple filters with sorting.

#### 4. **Rituals & Participation** (4 indexes)
Campus-wide campaigns and user engagement.

```
- ritualId + userId + campusId                    → User participation check
- userId + ritualId                               → User's rituals
- ritualId + userId + completedAt (DESC)          → Completion tracking
- status + type + createdAt (DESC)                → Browse rituals
- status + startDate (ASC)                        → Upcoming rituals
```

**Why needed**: Complex ritual queries with campus isolation.

#### 5. **Notifications** (2 indexes)
User notification streams.

```
- userId + isRead + createdAt (DESC)          → Unread notifications
- userId + category + createdAt (DESC)        → Filtered notifications
```

**Why needed**: Notifications filtered by user and read status.

#### 6. **Activity Tracking** (3 indexes)
User engagement analytics.

```
- userId + date (ASC)                         → Activity history (forward)
- userId + date (DESC)                        → Activity history (reverse)
- userId + type + date (DESC)                 → Activity by type
```

**Why needed**: Date range queries on user activity.

#### 7. **Calendar & Events** (5 indexes)
Personal and space event management.

```
- userId + type + startDate (ASC)             → User calendar by type
- userId + startDate (ASC)                    → All user events
- userId + status                             → Active events
- spaceId + state + startDate (ASC)           → Space events
- campusId + state + startDate (ASC)          → Campus events
```

**Why needed**: Event queries with date ranges and status filters.

#### 8. **Analytics & Metrics** (3 indexes)
Platform analytics and reporting.

```
- userId + type + timestamp (DESC)            → User metrics by type
- spaceId + timestamp (DESC)                  → Space analytics
- userId + timestamp (ASC)                    → User timeline
```

**Why needed**: Analytics queries with type filtering and sorting.

#### 9. **Connections & Social** (2 indexes)
Friend connections and requests.

```
- userId + status + createdAt (DESC)          → User connections
- toUserId + status + createdAt (DESC)        → Incoming requests
```

**Why needed**: Connection filtering by status.

#### 10. **Tools** (2 indexes)
Campus tool marketplace.

```
- campusId + isPublished + createdAt (DESC)   → Published tools
- createdBy + createdAt (DESC)                → User's tools
```

**Why needed**: Tool discovery with campus isolation.

#### 11. **Miscellaneous** (4 indexes)
Supporting queries for various features.

```
- error_reports: userId + timestamp (DESC)
- user_space_preferences: userId + spaceId + date (DESC)
- feed_items: sourcePostId + sourceSpaceId
```

---

## 🚀 Deployment Instructions

### Prerequisites

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Verify you're in the project root
cd /Users/laneyfraass/hive_ui
```

### Step 1: Validate Configuration

```bash
# Check indexes file syntax and structure
node scripts/check-firestore-indexes.js
```

Expected output:
```
🔍 Validating Firestore Indexes Configuration...

✅ Found 36 index definitions

📊 Index Summary by Collection:
  spaces (4 indexes)
  spaceMembers (3 indexes)
  ...

✅ Configuration is valid and ready to deploy!
```

### Step 2: Select Firebase Project

```bash
# List available projects
firebase projects:list

# Select production project
firebase use hive-production

# Or for staging
firebase use hive-staging
```

### Step 3: Deploy Indexes

```bash
# Deploy indexes only
firebase deploy --only firestore:indexes

# Or deploy both rules and indexes
firebase deploy --only firestore
```

Expected output:
```
=== Deploying to 'hive-production'...

i  firestore: reading indexes from firestore.indexes.json...
✔  firestore: deployed indexes successfully

✔  Deploy complete!
```

### Step 4: Monitor Build Status

1. Open Firebase Console: https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/indexes
2. Watch the "Status" column for each index
3. Wait for all indexes to show "Enabled" (green)

**Timeline:**
- Simple indexes (2 fields): 2-5 minutes
- Complex indexes (3+ fields): 5-15 minutes
- Large collections (10k+ docs): Up to 30 minutes

### Step 5: Validate Runtime Performance

```bash
# Run query validation (requires Firebase Admin SDK setup)
node scripts/validate-firestore-indexes.js
```

This script tests actual queries against your database to ensure indexes are working.

---

## 🔧 Troubleshooting

### Issue: "Index already exists" Error

**Cause**: Attempting to create a duplicate index.

**Solution**:
1. Go to Firebase Console → Firestore → Indexes
2. Delete the existing index
3. Re-deploy: `firebase deploy --only firestore:indexes`

### Issue: "Index build failed"

**Cause**: Invalid field names or unsupported query patterns.

**Solution**:
1. Check Firebase Console for error details
2. Verify field names match your Firestore documents
3. Ensure index fields exist in your collection

### Issue: Queries still failing after deployment

**Cause**: Indexes still building or not matching query pattern.

**Solution**:
1. Check Firebase Console - indexes must show "Enabled" status
2. Compare query in error message to indexes in `firestore.indexes.json`
3. Look for the exact field order and sort direction

### Issue: "The query requires an index"

**Cause**: A new query pattern was added that isn't in indexes file.

**Solution**:
1. Copy the index definition from the error message
2. Add to `firestore.indexes.json`
3. Re-deploy: `firebase deploy --only firestore:indexes`

**Example error:**
```
The query requires an index. You can create it here:
https://console.firebase.google.com/...
```

Click the link, Firebase will auto-generate the index.

---

## 📊 Performance Benchmarks

With proper indexes, these are target query times:

| Query Type | Expected Time | Notes |
|------------|---------------|-------|
| Simple filter + sort | <100ms | e.g., recent posts |
| Multiple filters + sort | <500ms | e.g., space browse with filters |
| Collection group query | <1s | e.g., all posts across spaces |
| Analytics aggregation | <2s | e.g., user activity dashboard |

**Red flags:**
- ⚠️ Query taking >3 seconds → Likely missing index
- ⚠️ Error mentioning "index" → Definitely missing index
- ⚠️ Timeout errors → Collection too large, needs pagination

---

## 🔄 Maintenance

### Adding New Indexes

When adding new complex queries:

1. Write the Firestore query in your code
2. Run the query in development
3. If you see "requires an index" error:
   - Copy the index definition from error
   - Add to `firestore.indexes.json`
   - Deploy: `firebase deploy --only firestore:indexes`

### Removing Unused Indexes

Indexes consume storage and build time. Periodically audit:

```bash
# Firebase Console → Indexes → Usage column
# Delete indexes with 0 usage after 30 days
```

### Index Size Limits

Firestore limits:
- **200 composite indexes per database** (we use 36)
- **40,000 index entries per document** (rarely hit)

We have plenty of headroom for expansion.

---

## 🎯 Critical Indexes (Don't Delete!)

These indexes are ABSOLUTELY REQUIRED for core features:

1. **spaces**: `campusId + isActive + name_lowercase`
   - Used by: Space browse, search, discovery
   - Failure impact: Spaces page breaks

2. **spaceMembers**: `spaceId + userId + isActive`
   - Used by: Membership validation, join checks
   - Failure impact: Can't join/leave spaces

3. **posts**: `campusId + isActive + isDeleted + createdAt`
   - Used by: Main feed
   - Failure impact: Feed breaks completely

4. **notifications**: `userId + isRead + createdAt`
   - Used by: Notification center
   - Failure impact: Notifications don't load

5. **ritual_participation**: `ritualId + userId + campusId`
   - Used by: Ritual participation tracking
   - Failure impact: Can't join rituals

---

## 📚 Additional Resources

- **Firebase Indexes Documentation**: https://firebase.google.com/docs/firestore/query-data/indexing
- **Index Best Practices**: https://firebase.google.com/docs/firestore/best-practices
- **Query Patterns**: See `/apps/web/src/app/api/` for all query implementations
- **Campus Isolation**: See `/apps/web/src/lib/secure-firebase-queries.ts`

---

## 🤝 Questions?

If you encounter issues not covered here:

1. Check Firebase Console for index status
2. Review error messages carefully (they usually contain the solution)
3. Run `node scripts/check-firestore-indexes.js` to validate config
4. Check Firestore documentation for query limitations

---

**Last Updated**: 2025-09-29
**Index Count**: 36 composite indexes
**Collections Covered**: 18 collections + collection groups