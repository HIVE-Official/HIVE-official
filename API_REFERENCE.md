# HIVE API Reference

## Overview
HIVE's API architecture consists of 120+ endpoints organized by domain. All endpoints follow RESTful conventions and return JSON responses.

## Authentication
All protected endpoints require a valid session token from Firebase Auth.

```typescript
headers: {
  'Authorization': 'Bearer <firebase-token>',
  'Content-Type': 'application/json'
}
```

## Core API Endpoints

### Authentication (`/api/auth/*`)
- `POST /api/auth/send-magic-link` - Send magic link email
- `POST /api/auth/verify-magic-link` - Verify magic link token
- `GET /api/auth/session` - Get current session
- `POST /api/auth/logout` - End session
- `POST /api/auth/complete-onboarding` - Complete onboarding flow

### Profile (`/api/profile/*`)
- `GET /api/profile` - Get current user profile
- `POST /api/profile` - Create/update profile
- `GET /api/profile/[userId]` - Get public profile
- `GET /api/profile/my-spaces` - Get user's spaces
- `POST /api/profile/upload-photo` - Upload profile photo
- `GET /api/profile/completion` - Get profile completion status
- `GET /api/profile/spaces/recommendations` - Get space recommendations

### Spaces (`/api/spaces/*`)
- `GET /api/spaces` - List all spaces
- `GET /api/spaces/recommended` - Recommended spaces (campus‑isolated, excludes joined)
- `GET /api/spaces/search` - Search spaces with facets (q, type, tags)
- `POST /api/spaces` - Create new space
- `GET /api/spaces/[spaceId]` - Get space details
- `POST /api/spaces/[spaceId]` - Update space
- `DELETE /api/spaces/[spaceId]` - Delete space
- `GET /api/spaces/browse` - Browse spaces with filters
- `GET /api/spaces/my` - Get user's spaces
- `POST /api/spaces/join` - Join a space
- `POST /api/spaces/leave` - Leave a space
- `GET /api/spaces/search` - Search spaces
- `POST /api/spaces/request-to-lead` - Request leadership role
- `POST /api/spaces/transfer` - Transfer space ownership

### Space Content (`/api/spaces/[spaceId]/*`)
- `GET /api/spaces/[spaceId]/posts` - Get space posts
- `POST /api/spaces/[spaceId]/posts` - Create post
- `GET /api/spaces/[spaceId]/posts/[postId]` - Get post details
- `POST /api/spaces/[spaceId]/posts/[postId]/comments` - Add comment
- `GET /api/spaces/[spaceId]/members` - Get space members
- `POST /api/spaces/[spaceId]/membership` - Update membership
- `GET /api/spaces/[spaceId]/events` - Get space events
- `POST /api/spaces/[spaceId]/events` - Create event
- `POST /api/spaces/[spaceId]/events/[eventId]/rsvp` - RSVP to event
- `GET /api/spaces/[spaceId]/feed` - Get space feed
- `GET /api/spaces/[spaceId]/tools` - Get space tools

### Tools (`/api/tools/*`)
- `GET /api/tools` - List all tools
- `POST /api/tools` - Create new tool
- `GET /api/tools/[toolId]` - Get tool details
- `POST /api/tools/[toolId]` - Update tool
- `DELETE /api/tools/[toolId]` - Delete tool
- `GET /api/tools/personal` - Get user's tools
- `GET /api/tools/search` - Search tools
- `POST /api/tools/[toolId]/deploy` - Deploy tool
- `POST /api/tools/[toolId]/share` - Share tool
- `GET /api/tools/[toolId]/analytics` - Get tool analytics
- `POST /api/tools/[toolId]/state` - Save tool state

### Feed (`/api/feed/*`)
- `GET /api/feed` - Get main feed
- `GET /api/feed/search` - Search feed content
- `GET /api/feed/updates` - Get real-time updates

### Rituals (`/api/rituals/*`)
- `GET /api/rituals` - List active rituals
- `GET /api/rituals/[ritualId]` - Get ritual details
- `POST /api/rituals/[ritualId]/join` - Join ritual
- `POST /api/rituals/[ritualId]/action` - Record ritual action
- `GET /api/rituals/[ritualId]/progress` - Get user progress
- `GET /api/rituals/campus-state` - Get campus-wide ritual state

### Admin (`/api/admin/*`)
- `GET /api/admin/users` - List all users
- `GET /api/admin/spaces` - List all spaces with admin view
- `GET /api/admin/spaces/analytics` - Get platform analytics
- `POST /api/admin/spaces/bulk` - Bulk space operations
- `GET /api/admin/builder-requests` - Get builder role requests
- `POST /api/admin/grant-role` - Grant role to user
- `POST /api/admin/lookup-user` - Look up user details

### Real-time (`/api/realtime/*`)
- `GET /api/realtime/sse` - Server-sent events stream

### Analytics (`/api/analytics/*`)
- `GET /api/analytics/metrics` - Get platform metrics

### Content Moderation (`/api/content/*`)
- `POST /api/content/reports` - Report content

### User Search (`/api/users/*`)
- `GET /api/users/search` - Search users

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

## Rate Limiting
- Authentication endpoints: 5 requests per minute
- Write operations: 30 requests per minute
- Read operations: 100 requests per minute

## Campus Isolation
All data operations are automatically filtered by `campusId: 'ub-buffalo'` for vBETA.

## Pagination
List endpoints support pagination:
```
GET /api/spaces?page=1&limit=20
```

## Filtering
Many endpoints support filtering:
```
GET /api/spaces/browse?type=student_organizations&tags=engineering
```

## Sorting
List endpoints support sorting:
```
GET /api/spaces?sort=memberCount&order=desc
```

## HiveLab Tools (App Router)

These endpoints power the HiveLab tools system in the web app. All return `{ success, data }` or `{ success:false, error }`.

- Create tool
  - `POST /api/tools` — body `{ name, description, campusId?, spaceId?, templateId? }` (auth required)
- Get tool
  - `GET /api/tools/{toolId}` — returns serialized tool (countdown when applicable)
- Run Test (gates publish)
  - `POST /api/tools/{toolId}/test` — body `{ health: looks_good|heads_up|fix_required, blockingIssueCount }`
- Publish
  - `POST /api/tools/{toolId}/publish` — body `{ stage: limited_run|certified }` (auth required)
  - Returns 400 with codes `RUN_TEST_REQUIRED`, `RUN_TEST_STALE`, or `BLOCKING_LINTS` when gates fail
- Visibility
  - `POST /api/tools/{toolId}/visibility` — body `{ visibility: private|space|campus|public }` (auth required)
- Elements (authoring)
  - `PUT /api/tools/{toolId}/elements` — body `{ elements: [...] }` (draft only; auth required)
  - `GET /api/tools/{toolId}/elements/{elementId}/attachable-events?spaceId=...&query=&cursor=&limit=&windowDays=` — list future events for attachment (auth; dev bypass allowed in seeds)
  - `POST /api/tools/{toolId}/elements/{elementId}/attach` — body `{ eventId: string | null }` to persist event attachment (auth required)
- Deploy
  - `POST /api/tools/{toolId}/deploy` — body `{ spaceIds: string[] }` (auth required)
- Usage
  - `POST /api/tools/{toolId}/use` — records usage (auth required; no dev bypass)
- Campus catalog (leaders)
  - `GET /api/tools/campus?campusId=...&visibility=campus|public|all` (auth required)
- Lab (space context)
  - `GET /api/lab/spaces/{spaceId}/tools`
  - `POST /api/lab/spaces/{spaceId}/tools/{toolId}/publish`
  - `POST /api/lab/spaces/{spaceId}/tools/{toolId}/execute` — creates a board post with `toolContext` in the space (auth required)
- Jobs (dev only)
  - `POST /api/tools/jobs/reconcile` — disabled unless `ENABLE_DEV_SEEDS=true`
