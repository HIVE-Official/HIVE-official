# Spaces Firestore Schema & Configuration

> Owner: Community Guild • Last updated: 2025-10-10

This guide describes the canonical Firestore layout for the Spaces slice, the composite indexes we must deploy, and the environment configuration needed to run against Firestore instead of the in-memory fixtures. Use this document alongside `docs/setup/FIRESTORE_INDEXES_GUIDE.md` when preparing new environments.

## 1. Collections & Documents

### 1.1 `spaces`

| Field                     | Type                                                                                                 | Notes                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `campusId`                | `string`                                                                                             | Required, used for campus isolation gates.         |
| `name`                    | `string`                                                                                             | 3–80 chars.                                        |
| `description`             | `string`                                                                                             | Minimum 10 chars.                                  |
| `type`                    | `"student_organization" \| "university_organization" \| "greek_life" \| "residential"`               | Matches Spaces v1 IA spec and domain enums.        |
| `visibility`              | `"public" \| "campus" \| "private"`                                                                  | Determines join policy.                            |
| `tags`                    | `string[]`                                                                                           | Normalised, lowercase, max 6 entries.              |
| `isActive`                | `boolean`                                                                                            | Soft delete flag.                                  |
| `createdAt` / `updatedAt` | `Timestamp`                                                                                          | Server timestamps.                                 |
| `leaderId`                | `string`                                                                                             | Profile ID of founding leader.                     |
| `settings`                | `{ maxMembers?: number; isInviteOnly: boolean }`                                                     | Domain settings.                                   |
| `members`                 | `{ profileId: string; role: "leader" \| "admin" \| "moderator" \| "member"; joinedAt: Timestamp }[]` | Embedded roster (optimised for membership checks). |
| `memberRoles`             | `{ [profileId: string]: "leader" \| "admin" \| "moderator" \| "member" }`                             | Map for security rules + policy enforcement.       |

**Subcollections**

- `spaces/{spaceId}/posts`
- `spaces/{spaceId}/events`
- (future) `spaces/{spaceId}/audits`

### 1.2 `spaces/{spaceId}/posts`

| Field                     | Type        | Notes                                    |
| ------------------------- | ----------- | ---------------------------------------- |
| `spaceId`                 | `string`    | Duplicated for collection group queries. |
| `authorId`                | `string`    | Profile ID.                              |
| `authorHandle`            | `string`    | Snapshot of handle.                      |
| `content`                 | `string`    | 1–2,000 chars, trimmed.                  |
| `createdAt` / `updatedAt` | `Timestamp` | Server timestamps.                       |
| `reactions`               | `number`    | Aggregate count (extend to map later).   |
| `commentCount`            | `number`    | Snapshot of comments.                    |
| `tags`                    | `string[]`  | Optional tags.                           |

### 1.3 `spaces/{spaceId}/events`

> Sync tip: run `pnpm ops:sync-space-events` after deploying new event posts to backfill these documents from the canonical post source.

| Field               | Type          | Notes                                                   |
| ------------------- | ------------- | ------------------------------------------------------- |
| `spaceId`           | `string`      | Duplicated for cross-space queries.                     |
| `postId`            | `string`      | Matches the source event post id.                       |
| `title`             | `string`      | 3–120 chars.                                            |
| `description`       | `string`      | Optional, 0–500 chars.                                  |
| `location`          | `string`      | Freeform.                                               |
| `startAt`           | `Timestamp`   | UTC start time.                                         |
| `endAt`             | `Timestamp`   | UTC end time; derives duration.                         |
| `durationMinutes`   | `number`      | Rounded difference between `startAt`/`endAt`.           |
| `maxAttendees`      | `number|null` | Capacity cap, optional.                                 |
| `enableWaitlist`    | `boolean`     | Waitlist toggle.                                        |
| `goingCount`        | `number`      | Snapshot of RSVPs.                                      |
| `maybeCount`        | `number`      | Snapshot of “maybe” RSVPs.                              |
| `waitlistCount`     | `number`      | Snapshot of waitlist count.                             |
| `checkInEnabled`    | `boolean`     | Whether check-in flow is active.                        |
| `checkInWindowBefore` | `number`   | Minutes before start the self check-in opens (nullable).|
| `checkInWindowAfter`  | `number`   | Minutes after start the self check-in closes (nullable).|
| `qrCodeEnabled`     | `boolean`     | QR code check-in toggle.                                |
| `checkedInCount`    | `number`      | Snapshot of check-ins.                                  |
| `coHostIds`         | `string[]`    | Co-host profile IDs.                                    |
| `coHostNames`       | `string[]`    | Display names for co-hosts.                             |
| `userRsvp`          | `string|null` | Current viewer RSVP (going/maybe/not_going/waitlist).   |
| `tags`              | `string[]`    | Tags mirrored from the source post.                     |
| `coverImageUrl`     | `string|null` | Optional cover asset.                                   |
| `coverImageAlt`     | `string|null` | Optional alt text.                                      |
| `isRssImported`     | `boolean`     | Flags RSS-sourced events.                               |
| `isDeleted`         | `boolean`     | Soft delete toggle.                                     |
| `lastSyncedAt`      | `Timestamp`   | Set by sync job, indicates freshness.                   |

## 2. Composite Indexes

Add these to the existing production indexes (see `FIRESTORE_INDEXES_GUIDE.md`). Export via `firebase firestore:indexes` once deployed.

| Collection                | Fields                                                | Purpose                                                                |
| ------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------- |
| `spaces`                  | `campusId ASC`, `isActive ASC`, `createdAt DESC`      | Discovery lists / admin views.                                         |
| `spaces`                  | `campusId ASC`, `isActive ASC`, `memberCount DESC`    | Popular spaces Dock. _(Member count is computed & stored separately.)_ |
| `spaces`                  | `campusId ASC`, `type ASC`, `memberCount DESC`        | Category filter on discovery page.                                     |
| `spaces/{spaceId}/posts`  | `spaceId ASC`, `createdAt DESC` _(collection group)_  | Space timeline + feed aggregletation.                                  |
| `spaces/{spaceId}/posts`  | `spaceId ASC`, `pinnedAt DESC`, `createdAt DESC` _(collection group)_ | Pin management queries (limit 2, auto-expiry sweeps).                  |
| `spaces/{spaceId}/posts`  | `spaceId ASC`, `audience ASC`, `createdAt DESC` _(collection group)_ | Audience-aware campus surfacing + safety queue.                        |
| `spaces/{spaceId}/posts`  | `authorId ASC`, `createdAt DESC` _(collection group)_ | Profile activity lookups.                                              |
| `spaces/{spaceId}/events` | `spaceId ASC`, `startAt DESC` _(collection group)_    | Events tab ordering.                                                   |

> **Tip**: When running locally with the emulator, import the indexes via the generated `firestore.indexes.json` file to avoid manual creation.

## 3. Security Rules

High-level rules (add to your `firestore.rules`):

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() { return request.auth != null; }
    function campusMatches(resource) { return resource.data.campusId == request.auth.token.campusId; }

    match /spaces/{spaceId} {
      allow read: if isAuthenticated() && campusMatches(resource);
      allow create: if isAuthenticated() && request.resource.data.leaderId == request.auth.uid;
      allow update, delete: if isAuthenticated() && campusMatches(resource) &&
        resource.data.leaderId == request.auth.uid;

      match /posts/{postId} {
        allow read: if isAuthenticated() && campusMatches(get(/databases/{database}/documents/spaces/{spaceId}));
        allow create: if isAuthenticated()
          && campusMatches(get(/databases/{database}/documents/spaces/{spaceId}))
          && request.resource.data.authorId == request.auth.uid;
        allow delete: if request.auth.uid == resource.data.authorId
          || request.auth.uid == get(/databases/{database}/documents/spaces/{spaceId}).data.leaderId;
      }

      match /events/{eventId} {
        allow read: if isAuthenticated() && campusMatches(get(/databases/{database}/documents/spaces/{spaceId}));
        allow write: if isAuthenticated()
          && campusMatches(get(/databases/{database}/documents/spaces/{spaceId}))
          && request.auth.uid == get(/databases/{database}/documents/spaces/{spaceId}).data.leaderId;
      }
    }
  }
}
```

Adjust leader/admin logic once the governance slice introduces moderator roles.

## 4. Environment Configuration

Set the following in each environment (`.env.local`, Vercel, Cloud Functions, etc.):

| Key                     | Description                                                                 |
| ----------------------- | --------------------------------------------------------------------------- |
| `FIREBASE_PROJECT_ID`   | Firebase project ID.                                                        |
| `FIREBASE_CLIENT_EMAIL` | Service account client email.                                               |
| `FIREBASE_PRIVATE_KEY`  | Service account private key _(escape newlines as `\n`)_.                    |
| `USE_FIRESTORE_SPACES`  | `true` to enable Firestore repositories, omit/false for in-memory fixtures. |

For local development you can run `firebase emulators:start --only firestore` and point `FIREBASE_*` to the emulator credentials.

## 5. Migration & Seeding

1. **Initial import**: Run a one-off script to upsert the legacy fixture data (`seedSpaceSnapshots`, `seedSpacePostSnapshots`, `seedSpaceEvents`) into the live collections.
2. **Member counts**: Store `memberCount` on the space document (aggregate) to keep discovery queries cheap. Update inside the repository when joining/leaving.
3. **Backups**: Schedule a nightly export (`gcloud firestore export`) scoped to `spaces` and `spaces/*/posts` to avoid data loss.

## 6. Operational Checklist

- [ ] `USE_FIRESTORE_SPACES=true` applied in target environment.
- [ ] Firestore indexes deployed (`firebase deploy --only firestore:indexes`).
- [ ] Security rules published (`firebase deploy --only firestore:rules`).
- [ ] Service account configured for Cloud Run / Next.js runtime.
- [ ] Migration script executed and verified via the hub `/spaces` page.
- [ ] Run `pnpm audit:spaces` to verify seed data and live documents include `memberRoles` and posting policy defaults before promoting a new environment.

Keep this document updated as additional collections (audit logs, invites) ship with the governance work.

## 7. Monitoring & Background Jobs

### 7.1 Post Throughput & Safety Dashboards
- The Next.js API layer now emits structured logs through `ConsoleSpacePostTelemetry` (`apps/web/src/server/spaces/telemetry/console-space-post-telemetry.ts:1`). Each call logs JSON envelopes named `spaces.posts.create.success` and `spaces.posts.list.latency_ms` with labels for `spaceId`, `surface`, latency, and attachment/pin context.
- Create two log-based metrics in Cloud Monitoring that filter on `jsonPayload.metric="spaces.posts.create.success"` and `jsonPayload.metric="spaces.posts.list.latency_ms"`. Use distribution aggregations for latency and set alerting policies: create rate error >2 % over 5 minutes, list latency P95 >1500 ms over 5 minutes (PagerDuty target: Community Guild engineer-on-call).
- Run `pnpm ops:spaces-observability` (requires `GCP_PROJECT_ID` and credentials) to provision log-based metrics, alerting policies, and the pin expiry scheduler job automatically.
- Dashboard widgets: (1) per-campus throughput (stacked area by `surface`), (2) latency heatmap by `spaceId`, (3) weekly pinned count vs. expirations (combine with Function logs below), (4) moderation auto-hide trend once policy ports land.

### 7.2 Pin Expiry Sweep
- Cloud Scheduler (5-minute cadence) hits the HTTPS endpoint `spacesPinsExpiry` (`functions/src/index.ts:24`) with header `x-hive-cron-secret=$SPACE_PIN_SWEEP_SECRET`. Keep the secret in Secret Manager and inject via scheduler.
- Handler implementation: `functions/src/pin-expiry.ts:1`. It queries `collectionGroup('posts')` with `pinnedAt != null` and `pinExpiresAt <= now`, chunks updates into batches of 400, and nulls `pinnedAt`/`pinExpiresAt` before stamping `updatedAt`.
- Each expired post is logged as `spaces.posts.pins.expired` with `{ spaceId, postId, expiredAt }`. Add a third log-based metric to chart expirations and wire an alert when more than 20 pins expire within 10 minutes (signal stale governance).
- Follow-up: append audit log entry once the governance/audit slice lands (`spaces/{spaceId}/audits`).
