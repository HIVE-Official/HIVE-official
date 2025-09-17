# HIVE Platform API Documentation

**Version**: 1.0.0  
**Base URL**: `https://hive.buffalo.edu/api`  
**Authentication**: NextAuth session + Firebase Auth

---

## 🔐 Authentication

All protected endpoints require a valid session. Include credentials in fetch requests:
```javascript
fetch('/api/endpoint', {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' }
})
```

---

## 📚 API Endpoints

### Authentication & Onboarding

#### POST `/api/auth/send-magic-link`
Send magic link email for authentication
```json
Request:
{
  "email": "user@buffalo.edu",
  "redirectUrl": "https://hive.buffalo.edu/dashboard"
}

Response:
{
  "success": true,
  "message": "Magic link sent"
}
```

#### POST `/api/auth/verify-magic-link`
Verify magic link token
```json
Request:
{
  "token": "jwt-token-from-email"
}

Response:
{
  "success": true,
  "user": { ...userData },
  "session": { ...sessionData }
}
```

#### POST `/api/auth/complete-onboarding`
Complete user onboarding
```json
Request:
{
  "profileData": {
    "displayName": "John Doe",
    "major": "Computer Science",
    "year": "Junior",
    "interests": ["coding", "gaming"],
    "housing": "Ellicott Complex"
  }
}

Response:
{
  "success": true,
  "user": { ...updatedUser }
}
```

---

### Spaces

#### GET `/api/spaces`
Get all spaces (with optional filters)
```json
Query: ?campusId=ub-buffalo&type=academic&limit=20

Response:
{
  "success": true,
  "spaces": [...],
  "totalCount": 150,
  "hasMore": true
}
```

#### GET `/api/spaces/discovery`
Get personalized space recommendations
```json
Response:
{
  "success": true,
  "recommended": [...],
  "trending": [...],
  "new": [...]
}
```

#### GET `/api/spaces/suggested`
Get suggested spaces based on user profile
```json
Response:
{
  "success": true,
  "suggestions": [
    {
      "spaceId": "cs-220-fall-2025",
      "reason": "Based on your major",
      "matchScore": 0.95
    }
  ]
}
```

#### GET `/api/spaces/available`
Get available spaces user can join
```json
Response:
{
  "success": true,
  "spaces": [...],
  "categories": ["Academic", "Social", "Housing"]
}
```

#### POST `/api/spaces`
Create new space
```json
Request:
{
  "name": "Chess Club",
  "description": "UB Chess enthusiasts",
  "type": "interest",
  "privacy": "public",
  "settings": { ... }
}

Response:
{
  "success": true,
  "space": { ...newSpace }
}
```

#### GET `/api/spaces/[spaceId]`
Get specific space details
```json
Response:
{
  "success": true,
  "space": {
    "id": "space-id",
    "name": "Space Name",
    "memberCount": 250,
    "surfaces": { ... }
  }
}
```

#### POST `/api/spaces/[spaceId]/membership`
Join or leave a space
```json
Request:
{
  "action": "join" | "leave"
}

Response:
{
  "success": true,
  "membership": { ...membershipData }
}
```

#### GET `/api/spaces/[spaceId]/members`
Get space members
```json
Query: ?role=leader&limit=50

Response:
{
  "success": true,
  "members": [...],
  "totalCount": 250
}
```

#### GET `/api/spaces/[spaceId]/posts`
Get space posts
```json
Query: ?limit=20&before=timestamp

Response:
{
  "success": true,
  "posts": [...],
  "hasMore": true
}
```

#### POST `/api/spaces/[spaceId]/posts`
Create post in space
```json
Request:
{
  "content": "Post content",
  "type": "announcement",
  "media": ["imageUrl1", "imageUrl2"],
  "tags": ["important", "event"]
}

Response:
{
  "success": true,
  "post": { ...newPost }
}
```

#### GET `/api/spaces/[spaceId]/events/[eventId]`
Get space event details
```json
Response:
{
  "success": true,
  "event": {
    "id": "event-id",
    "title": "Study Session",
    "startTime": "2025-01-15T14:00:00Z",
    "attendees": [...]
  }
}
```

#### POST `/api/spaces/[spaceId]/events/[eventId]/rsvp`
RSVP to space event
```json
Request:
{
  "status": "attending" | "maybe" | "not_attending"
}

Response:
{
  "success": true,
  "rsvp": { ...rsvpData }
}
```

#### GET `/api/spaces/[spaceId]/pinned`
Get pinned items in space
```json
Response:
{
  "success": true,
  "pinned": [...]
}
```

#### POST `/api/spaces/[spaceId]/pinned`
Pin/unpin item in space
```json
Request:
{
  "itemId": "post-or-event-id",
  "itemType": "post" | "event",
  "action": "pin" | "unpin"
}

Response:
{
  "success": true
}
```

---

### Feed

#### GET `/api/feed`
Get personalized feed
```json
Query: ?limit=20&before=timestamp

Response:
{
  "success": true,
  "items": [...],
  "hasMore": true,
  "nextCursor": "cursor-token"
}
```

#### GET `/api/feed/search`
Search feed content
```json
Query: ?q=study+group&type=post&spaceId=cs-220

Response:
{
  "success": true,
  "results": [...],
  "facets": { ... }
}
```

#### POST `/api/feed/cache`
Update feed cache
```json
Request:
{
  "userId": "user-id",
  "action": "refresh" | "clear"
}

Response:
{
  "success": true,
  "cacheUpdated": true
}
```

---

### Posts & Interactions

#### POST `/api/posts/[postId]/like`
Like or unlike a post
```json
Request:
{
  "action": "like" | "unlike"
}

Response:
{
  "success": true,
  "likes": 42
}
```

#### POST `/api/posts/[postId]/share`
Share a post
```json
Request:
{
  "shareType": "feed" | "space" | "external",
  "targetId": "space-id",
  "message": "Check this out!"
}

Response:
{
  "success": true,
  "shareId": "share-id"
}
```

#### GET `/api/posts/[postId]/comments`
Get post comments
```json
Response:
{
  "success": true,
  "comments": [...],
  "totalCount": 15
}
```

#### POST `/api/posts/[postId]/comments`
Add comment to post
```json
Request:
{
  "content": "Great idea!",
  "parentId": null
}

Response:
{
  "success": true,
  "comment": { ...newComment }
}
```

---

### Events

#### GET `/api/events`
Get all events
```json
Query: ?upcoming=true&spaceId=space-id&limit=20

Response:
{
  "success": true,
  "events": [...],
  "totalCount": 50
}
```

#### POST `/api/events`
Create new event
```json
Request:
{
  "title": "Study Session",
  "description": "CS 220 Midterm prep",
  "startTime": "2025-01-15T14:00:00Z",
  "endTime": "2025-01-15T16:00:00Z",
  "location": "Capen Library",
  "spaceId": "cs-220-fall-2025",
  "maxAttendees": 20
}

Response:
{
  "success": true,
  "event": { ...newEvent }
}
```

#### GET `/api/events/[eventId]/attendees`
Get event attendees
```json
Response:
{
  "success": true,
  "attendees": [...],
  "waitlist": [...],
  "totalCount": 15
}
```

#### POST `/api/events/[eventId]/rsvp`
RSVP to event
```json
Request:
{
  "status": "attending" | "maybe" | "not_attending"
}

Response:
{
  "success": true,
  "rsvp": { ...rsvpData }
}
```

---

### Tools & HiveLab

#### GET `/api/tools/browse`
Browse available tools
```json
Query: ?category=productivity&sort=popular

Response:
{
  "success": true,
  "tools": [...],
  "categories": [...],
  "totalCount": 100
}
```

#### GET `/api/tools/marketplace`
Get marketplace tools
```json
Response:
{
  "success": true,
  "featured": [...],
  "trending": [...],
  "new": [...],
  "categories": [...]
}
```

#### GET `/api/tools/[toolId]`
Get tool details
```json
Response:
{
  "success": true,
  "tool": {
    "id": "tool-id",
    "name": "Grade Calculator",
    "elements": [...],
    "installs": 500,
    "rating": 4.5
  }
}
```

#### POST `/api/tools/[toolId]/install`
Install tool in space
```json
Request:
{
  "spaceId": "space-id",
  "configuration": { ... }
}

Response:
{
  "success": true,
  "installation": { ...installData }
}
```

#### GET `/api/tools/[toolId]/analytics`
Get tool analytics
```json
Query: ?period=7d

Response:
{
  "success": true,
  "analytics": {
    "views": 1000,
    "installs": 50,
    "activeUsers": 200,
    "usage": [...]
  }
}
```

#### POST `/api/tools/[toolId]/share`
Share tool
```json
Request:
{
  "targetSpaces": ["space-id-1", "space-id-2"],
  "message": "Check out this tool!"
}

Response:
{
  "success": true,
  "shared": true
}
```

---

### Profile

#### GET `/api/profile/[userId]`
Get user profile
```json
Response:
{
  "success": true,
  "profile": {
    "id": "user-id",
    "displayName": "John Doe",
    "major": "Computer Science",
    "year": "Junior",
    "spaces": [...],
    "achievements": [...]
  }
}
```

#### PUT `/api/profile/[userId]`
Update user profile
```json
Request:
{
  "displayName": "Jane Doe",
  "bio": "CS student, gamer",
  "interests": ["coding", "gaming", "music"]
}

Response:
{
  "success": true,
  "profile": { ...updatedProfile }
}
```

#### GET `/api/profile/spaces`
Get user's spaces
```json
Response:
{
  "success": true,
  "spaces": [...],
  "roles": { ... }
}
```

#### GET `/api/profile/milestones`
Get user milestones
```json
Response:
{
  "success": true,
  "milestones": [...],
  "progress": { ... }
}
```

---

### Privacy

#### GET `/api/privacy`
Get privacy settings
```json
Response:
{
  "success": true,
  "settings": {
    "profileVisibility": "public",
    "ghostMode": false,
    "showActivity": true
  }
}
```

#### PUT `/api/privacy`
Update privacy settings
```json
Request:
{
  "ghostMode": true,
  "profileVisibility": "friends"
}

Response:
{
  "success": true,
  "settings": { ...updatedSettings }
}
```

#### POST `/api/privacy/ghost-mode`
Toggle ghost mode
```json
Request:
{
  "enabled": true
}

Response:
{
  "success": true,
  "ghostMode": true
}
```

---

### Search

#### GET `/api/search`
Universal search
```json
Query: ?q=computer+science&type=all&limit=20

Response:
{
  "success": true,
  "results": {
    "spaces": [...],
    "posts": [...],
    "events": [...],
    "users": [...],
    "tools": [...]
  }
}
```

#### GET `/api/users/search`
Search users
```json
Query: ?q=john&major=cs&year=junior

Response:
{
  "success": true,
  "users": [...],
  "totalCount": 25
}
```

---

### Upload

#### POST `/api/upload/image`
Upload image
```json
Request: FormData with image file

Response:
{
  "success": true,
  "url": "https://storage.googleapis.com/...",
  "metadata": { ... }
}
```

#### GET `/api/upload/[fileId]`
Get upload details
```json
Response:
{
  "success": true,
  "file": {
    "id": "file-id",
    "url": "https://...",
    "type": "image/jpeg",
    "size": 1024000
  }
}
```

---

### Admin

#### GET `/api/admin/dashboard`
Get admin dashboard data
```json
Response:
{
  "success": true,
  "stats": {
    "totalUsers": 5000,
    "activeSpaces": 150,
    "dailyPosts": 500
  },
  "reports": [...]
}
```

#### GET `/api/admin/spaces/analytics`
Get space analytics
```json
Query: ?spaceId=all&period=30d

Response:
{
  "success": true,
  "analytics": {
    "growth": [...],
    "engagement": [...],
    "topSpaces": [...]
  }
}
```

#### GET `/api/admin/builder-requests`
Get HiveLab builder requests
```json
Response:
{
  "success": true,
  "requests": [...],
  "pendingCount": 10
}
```

---

### Schools

#### GET `/api/schools`
Get list of schools
```json
Response:
{
  "success": true,
  "schools": [
    {
      "id": "ub-buffalo",
      "name": "University at Buffalo",
      "emailDomain": "buffalo.edu"
    }
  ]
}
```

#### GET `/api/schools/[schoolId]/majors`
Get school majors
```json
Response:
{
  "success": true,
  "majors": [
    "Computer Science",
    "Engineering",
    "Business"
  ]
}
```

---

### Feedback

#### POST `/api/feedback`
Submit user feedback
```json
Request:
{
  "type": "bug" | "feature" | "general",
  "message": "Great platform!",
  "metadata": { ... }
}

Response:
{
  "success": true,
  "feedbackId": "feedback-id"
}
```

---

## 🔒 Error Responses

All endpoints return consistent error format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": { ... }
  }
}
```

### Common Error Codes
- `UNAUTHORIZED`: Not authenticated
- `FORBIDDEN`: No permission
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid input
- `RATE_LIMITED`: Too many requests
- `SERVER_ERROR`: Internal error

---

## 🚦 Rate Limiting

Default limits:
- **Authenticated**: 100 requests/minute
- **Unauthenticated**: 20 requests/minute
- **Upload endpoints**: 10 requests/minute
- **Search endpoints**: 30 requests/minute

Headers returned:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642089600
```

---

## 📝 Request Guidelines

### Headers
```javascript
{
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
}
```

### Authentication
```javascript
// Include credentials for session
fetch('/api/endpoint', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
```

### File Upload
```javascript
const formData = new FormData();
formData.append('file', fileBlob);

fetch('/api/upload/image', {
  method: 'POST',
  credentials: 'include',
  body: formData
})
```

---

## 🧪 Testing Endpoints

### Health Check
```bash
curl https://hive.buffalo.edu/api/health
```

### Test Authentication
```bash
curl -X POST https://hive.buffalo.edu/api/auth/send-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@buffalo.edu"}'
```

---

## 📚 SDK Examples

### JavaScript/TypeScript
```typescript
class HiveAPI {
  private baseURL = 'https://hive.buffalo.edu/api';
  
  async getSpaces() {
    const response = await fetch(`${this.baseURL}/spaces`, {
      credentials: 'include'
    });
    return response.json();
  }
  
  async createPost(spaceId: string, content: string) {
    const response = await fetch(
      `${this.baseURL}/spaces/${spaceId}/posts`,
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      }
    );
    return response.json();
  }
}
```

---

## 🔄 Webhooks (Future)

Planned webhook events:
- `space.created`
- `space.member_joined`
- `post.created`
- `event.created`
- `tool.installed`

---

## 📞 Support

- **API Issues**: api-support@hive.buffalo.edu
- **Documentation**: https://docs.hive.buffalo.edu
- **Status Page**: https://status.hive.buffalo.edu

---

*API Version: 1.0.0*  
*Last Updated: January 2025*  
*Total Endpoints: 100+*