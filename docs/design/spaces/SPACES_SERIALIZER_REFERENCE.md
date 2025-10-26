# Spaces Serializer Reference (v1)

Purpose
- Freeze the server payload shapes that the UI consumes for Spaces and Posts.
- Provide copyable examples to verify routes quickly without a local dev setup.

Status
- Source of truth is the server implementation in `apps/web/src/server/spaces/service.ts:600` and the contract tests in `apps/web/src/server/spaces/__tests__/space-serializer.contract.test.ts:1`.
- Backend complete for v1. Any changes must update this doc and the contract tests.

## Post (SpacePostSerialized)

Example (event):

```
GET /api/spaces/space-robotics/posts

{
  "id": "post-robotics-event",
  "spaceId": "space-robotics",
  "authorId": "profile-jwrhineh",
  "authorHandle": "@jacob",
  "content": "Autonomous Rover Test Night",
  "createdAt": "2025-02-01T18:00:00.000Z",
  "updatedAt": "2025-02-01T18:00:00.000Z",
  "kind": "event",
  "audience": "campus",
  "origin": "member",
  "shareToCampus": true,
  "qualityScore": null,
  "pinnedAt": null,
  "pinExpiresAt": null,
  "moderationStatus": "active",
  "attachments": [
    { "type": "image", "url": "https://cdn.hive.so/spaces/robotics/rover-test.jpg", "title": "Rover test flyer", "description": null }
  ],
  "event": {
    "title": "Autonomous Rover Test Night",
    "description": null,
    "location": "Foundry Lab",
    "startAt": "2025-02-02T00:00:00.000Z",
    "endAt": "2025-02-02T01:00:00.000Z",
    "maxAttendees": 40,
    "enableWaitlist": false,
    "goingCount": 12,
    "maybeCount": 4,
    "waitlistCount": 0,
    "checkInEnabled": false,
    "checkedInCount": 0,
    "checkInWindowBefore": null,
    "checkInWindowAfter": null,
    "qrCodeEnabled": false,
    "coHostIds": ["profile-luca"],
    "coHostNames": ["Luca Nguyen"],
    "isRssImported": false,
    "userRsvp": null,
    "userCheckedIn": false,
    "coverImageUrl": null,
    "coverImageAlt": null
  },
  "toolContext": null,
  "engagementSummary": null
}
```

Example (standard): see contract test `space-serializer.contract.test.ts` case "serializes standard posts without leaking tool metadata".

## Space (SerializedSpace)

Returned by multiple routes (`/api/spaces/recommended`, join/leave):

Fields:
- `id`, `campusId`, `name`, `description`, `type`, `visibility`, `tags`, `isActive`.
- `memberCount`, `onlineNow`, `activityScore`, `urgency`.
- `membership` (nullable): `{ profileId, role, joinedAt }` when viewer is known.
- `settings`: `{ maxMembers, isInviteOnly, postingPolicy, joinPolicy, mediaApprovalPolicy }`.
- `tagline`, `accentIcon`, `pattern` (optional, brand metadata).
- `tools` (optional; requires `includeTools=true`).
- `postingPolicy`, `shareToCampusAllowed`.
- When `includeMeta=true`: `helperIds`, `upcomingEvents`, `calendarViewPreferences`, `calendarGeneratedAt`, `guidelines`.
- When `includePosts=true`: `posts` (array of `SpacePostSerialized`).

Notes
- Activity metrics (`onlineNow`, `activityScore`, `urgency`) are computed from persisted signals when available; otherwise from a small post sample.
- Recommendation ranking uses `activityScore`, `urgency`, and member count with an optional blend flag.

## Verification Snippets

- Recommended: `GET /api/spaces/recommended?campusId=ub-buffalo&profileId=demo&limit=5`
- Join: `POST /api/spaces/join` (body: `{ spaceId, profileId }`) → returns trimmed `SerializedSpace` with `members` and without `posts`.
- Leave: `POST /api/spaces/leave` (body: `{ spaceId, profileId }`).
- Moderation: `POST /api/spaces/{spaceId}/posts/{postId}/moderation`.

Feature Flags
- `NEXT_PUBLIC_RECO_BLEND_READY`, `NEXT_PUBLIC_RECO_BLEND`, `NEXT_PUBLIC_RECO_BLEND_FORCE`.
- `RECO_CACHE_TTL_MS`/`NEXT_PUBLIC_RECO_CACHE_TTL_MS`, `NEXT_PUBLIC_RECO_REPEAT_CAP`.

