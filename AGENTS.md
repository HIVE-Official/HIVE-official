# AGENTS.md

Scope: Entire repository (web-first product direction)

Immediate Focus (Web UI/UX Build-Out)
- Treat `packages/ui` as the single source of truth for atoms → pages; promote any new UI from `apps/web` into the shared library.
- Advance the platform checklists in `docs/UX-UI-TAXONOMY.md` and `docs/UI-UX-CHECKLIST.md`; every shipped view must update these sources.
- Maintain Storybook parity (`packages/ui/src/stories/**`) with realistic fixtures, axe-ready stories, and reduced-motion safe interactions.
- Close duplication gaps in Feed, Spaces, Onboarding, Profile, and HiveLab so all surfaces share tokens, micro components, skeletons, and sheet-first navigation.

1) Product Direction (Web-First)
- We are pushing to the Web first. Prioritize the Next.js app at `apps/web` for all user-facing features and polish before any other surfaces.
- Optimize for desktop and mobile web responsiveness; do not add native/mobile-specific frameworks or code paths.

2) Platform Target and Constraints
- Framework: Next.js/React (Apps Router). Favor serverless/edge-safe code and SSR/ISR where helpful.
- Performance: p75 TTI < 2.5s on core views (Feed, Spaces). Use caching, prefetch, and light dependencies.
- Accessibility and UX polish are non-optional; treat skeletons/empty states as first-class.

3) Authentication and Security (Web)
- Default auth is HttpOnly session cookie. Accept Firebase Bearer tokens as a secondary path when present.
- Client fetches must include `credentials: 'include'` for same-origin API calls. Do not rely on localStorage tokens in production.
- Use the consolidated secure API wrapper (`withSecureAuth`) or the consolidated middleware in `apps/web/src/lib/middleware` for routes. Avoid adding new ad‑hoc auth layers.
- Admin endpoints must require CSRF (`X-CSRF-Token`) and stricter rate limits. Campus isolation is required on protected routes.

4) Networking and Fetch
- Prefer a single fetch helper that adds required headers and includes cookies by default. Avoid duplicating auth header logic.
- Do not introduce cross-origin dependencies without a clear reason and CORS review.

5) Routing, Middleware, and Flags
- Reuse the existing middleware utilities under `apps/web/src/lib/middleware/*` and `apps/web/middleware.ts` for auth/rate limiting/security headers.
- Gate risky or high-variance features behind feature flags (rituals, tools install, feed submissions).

6) Vertical Slice Priorities (in order)
- Feed/Rituals, Spaces, Onboarding & Auth, Profile, Hivelab (Tools). Ship end-to-end slices that “feel big” but remain operable and safe.

7) Campus Vision and Copy (Web Surfaces)
- Reinforce campus-first (UB) everywhere on web: section titles (e.g., “Tonight at UB”), badges (“Student‑run”, “Built by UB Students”), and space/event attribution.
- Keep moderation and safety rails invisible but real; expose student leadership and attribution.

8) Do / Don’t
- Do: prioritize web UX performance, SSR/edge safety, campus isolation, CSRF on admin, rate limiting.
- Don’t: add new mobile/native stacks; store auth tokens in localStorage for production; introduce new parallel auth systems.

9) Validation
- When adding/altering endpoints, ensure consistent auth, rate limiting, and error responses. Prefer Zod validation and unified response helpers.
