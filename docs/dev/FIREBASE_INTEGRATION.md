**Firebase Integration**

- Project files: `firestore.rules`, `firestore.indexes.json`, `database.rules.json`, `storage.rules`, `.firebaserc`, `firebase.json`.
- Admin SDK usage: server code initializes Firebase via `firebase-admin` for Firestore access.
- Local emulators: optional; CI-safe validation provided via scripts.

**Required Env Vars**

- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` for Admin SDK (server). See `.env.example` and `.env.production.template`.
- Public client keys (if using client SDK/Data Connect): `NEXT_PUBLIC_FIREBASE_*`.

**Deploy**

- Rules: `pnpm rules:deploy [projectId]`
- Indexes: `pnpm indexes:deploy [projectId]`

If `projectId` is omitted, the default from `.firebaserc` is used.

**Validate**

- Index file sanity: `pnpm indexes:validate`
- Rules unit test (emulator): `pnpm test:rules` (requires Firebase CLI).

**How to Verify (no UI required)**

- Health endpoint: `apps/web/src/app/api/health/firebase/route.ts:1` → GET `/api/health/firebase` returns `{ connectivity: "available"|"unavailable" }`.
- Spaces read path (server): `apps/web/src/server/spaces/firestore-space.repository.ts:1` → ensure `FIREBASE_*` are set; try `/api/spaces/recommended`.
- Schema audit: `pnpm audit:spaces` validates seed and (optionally) live Firestore `spaces/*` docs.

**Notes**

- Security rules are strict-by-default; Admin SDK bypasses rules as intended for server-side.
- Presence uses Firestore collection `presence` (see `firestore.rules`), not RTDB by default.
- Storage rules currently deny all writes until media flow is finalized.

