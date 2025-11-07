Spaces API Smoke Tests (Development)

Use these cURL commands to quickly verify the Spaces backend in development. The API middleware accepts a dev token format: set Authorization: Bearer dev_token_<userId>.

Prerequisites
- Running Next.js app with API routes available
- Firebase Admin configured for the app (development)

Environment
- TOKEN: dev_token_test-user (example)
- SPACE_ID: replace with an existing space id (e.g. ub-computer-science)
- TOOL_ID: replace with an existing tool id

1) Seed Sample Spaces (dev only)
curl -X POST http://localhost:3000/api/spaces/seed

2) Browse Spaces
curl -H "Authorization: Bearer dev_token_test-user" \
  "http://localhost:3000/api/spaces/browse?limit=10&includeActivity=true"

3) Join Space (v2)
curl -X POST -H "Authorization: Bearer dev_token_test-user" \
  -H "Content-Type: application/json" \
  -d '{"spaceId":"SPACE_ID","joinMethod":"manual"}' \
  http://localhost:3000/api/spaces/join-v2

4) Get My Spaces
curl -H "Authorization: Bearer dev_token_test-user" \
  http://localhost:3000/api/spaces/my

5) Builder Status
curl -H "Authorization: Bearer dev_token_test-user" \
  http://localhost:3000/api/spaces/SPACE_ID/builder-status

6) List Members
curl -H "Authorization: Bearer dev_token_test-user" \
  "http://localhost:3000/api/spaces/SPACE_ID/members?limit=20"

7) Invite Member
curl -X POST -H "Authorization: Bearer dev_token_test-user" \
  -H "Content-Type: application/json" \
  -d '{"userId":"another-user-id","role":"member"}' \
  http://localhost:3000/api/spaces/SPACE_ID/members

8) Update Member Role
curl -X PATCH -H "Authorization: Bearer dev_token_test-user" \
  -H "Content-Type: application/json" \
  -d '{"userId":"another-user-id","role":"moderator"}' \
  http://localhost:3000/api/spaces/SPACE_ID/members

9) Remove Member
curl -X DELETE -H "Authorization: Bearer dev_token_test-user" \
  "http://localhost:3000/api/spaces/SPACE_ID/members?userId=another-user-id&reason=test"

10) Tools in Space
curl -H "Authorization: Bearer dev_token_test-user" \
 http://localhost:3000/api/spaces/SPACE_ID/tools

11) Feature Tool (server API)
curl -X POST -H "Authorization: Bearer dev_token_test-user" \
  -H "Content-Type: application/json" \
  -d '{"toolId":"TOOL_ID"}' \
  http://localhost:3000/api/spaces/SPACE_ID/tools/feature

12) Feature Tool (callable function)
// From a client: call functions().httpsCallable('featureToolInSpace')({ spaceId: 'SPACE_ID', toolId: 'TOOL_ID' })

13) React To Post (toggle heart)
curl -X POST -H "Authorization: Bearer dev_token_test-user" \
  -H "Content-Type: application/json" \
  -d '{"type":"heart","action":"toggle"}' \
  http://localhost:3000/api/spaces/SPACE_ID/posts/POST_ID/reactions

14) Get Post Comments
curl -H "Authorization: Bearer dev_token_test-user" \
  "http://localhost:3000/api/spaces/SPACE_ID/posts/POST_ID/comments"

15) Create Comment
curl -X POST -H "Authorization: Bearer dev_token_test-user" \
  -H "Content-Type: application/json" \
  -d '{"content":"Nice!"}' \
  http://localhost:3000/api/spaces/SPACE_ID/posts/POST_ID/comments
