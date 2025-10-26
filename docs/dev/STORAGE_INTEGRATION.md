**Storage Integration**

- Rules deployed: `storage.rules` (server-managed, safe-by-default).
- Paths:
  - `spaces/{spaceId}/pending/{uploaderId}/{filename}` — private; owner-only read/write; images/videos; <= 25MB
  - `spaces/{spaceId}/media/{filename}` — approved; server writes; authenticated read
  - `public/**` — read-only; for static/public assets
  - `uploads/{uid}/{filename}` — owner-private misc uploads; images/videos/PDF; <= 25MB

**Client Upload Pattern**

- Upload pending media directly with Firebase Storage Web SDK to:
  - `spaces/${spaceId}/pending/${auth.uid}/${filename}`
- Store the uploaded file’s URL or path on the post attachment and enqueue media approval (`SpaceMediaApprovalRepository.enqueue`).
- Do not write to `spaces/${spaceId}/media/**` from clients — server moves approved media.

**Approval Flow (Server)**

- When a leader/moderator approves:
  1. Copy file from `spaces/{spaceId}/pending/{uploaderId}/...` → `spaces/{spaceId}/media/...` via Admin SDK.
  2. Update post attachment URLs to the new approved path.
  3. Optionally delete the pending file.

**Admin SDK Helper**

- Use `firebaseStorageBucket()` from `@hive/firebase` to manipulate files on the server (Next.js route or Cloud Function).

**Notes**

- Campus isolation is enforced at application level; storage rules scope access (owner/private vs authenticated) but cannot check Firestore membership.
- Keep thumbnails/derivatives in `spaces/{spaceId}/media/**` only after approval.

