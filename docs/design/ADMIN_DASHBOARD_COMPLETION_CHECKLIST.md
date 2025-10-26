# HIVE Admin Dashboard — Completion Checklist (Non‑Technical)

Purpose
- Give the HIVE team a single place to view platform health, manage users and spaces, review flagged content, and adjust settings.
- Keep it safe (admin‑only), simple to use, and fast to navigate.

What’s Included (First Release)
- Admin app at `admin.hive` (separate from the main site)
- Clear left navigation and consistent header on every page
- Pages: Overview, Users, Spaces, Moderation, Analytics, Settings
- Read‑only metrics and lists to start; actions added where low‑risk

Access & Security
- [ ] Admin‑only access (sign‑in required)
- [ ] Admin role required for all pages
- [ ] Clear “Not authorized” message if access is denied
- [ ] Logged out users are redirected to sign‑in

Navigation & Layout
- [ ] Left sidebar with these items: Overview, Users, Spaces, Moderation, Analytics, Settings
- [ ] Current page is clearly highlighted
- [ ] Works on desktop and mobile (sidebar becomes a drawer on mobile)
- [ ] Header shows page title and optional search

Pages & Acceptance Criteria
1) Overview
- [ ] Shows key stats at a glance (last 24h signups; active users; spaces created; items in moderation queue)
- [ ] Data can be placeholder numbers initially, with a note when real data is connected
- [ ] Loads in under 2 seconds on normal Wi‑Fi

2) Users
- [ ] Search users by name or email
- [ ] List shows name, email/handle, status
- [ ] Optional filters (e.g., active, flagged) can be stubbed if data isn’t ready
- [ ] No destructive actions in v1; include “View profile” link

3) Spaces
- [ ] Browse spaces by name
- [ ] List shows name, owners/leaders, status (active/archived)
- [ ] Optional filters by status can be stubbed

4) Moderation
- [ ] List of flagged items with type (post, profile, space) and reason
- [ ] Actions can be “Review details” in v1, with an audit trail plan for v2
- [ ] Clearly marked as a sensitive area

5) Analytics
- [ ] Starter KPIs: new signups, daily active users, spaces created (time window is fine — 24h/7d)
- [ ] Charts may be simplified or replaced with number cards initially
- [ ] Note where full analytics pipeline will appear in v2

6) Settings
- [ ] Non‑destructive settings only in v1 (e.g., feature toggles, read‑only views of configuration)
- [ ] Clear labels and descriptions for each toggle

Usability & Accessibility
- [ ] Keyboard accessible (can navigate without a mouse)
- [ ] Text has sufficient contrast and readable sizes
- [ ] Clear error/empty states (e.g., “No results found”)
- [ ] No unnecessary popups or confirmations (keep it simple)

Performance & Reliability
- [ ] Loads reliably on standard office Wi‑Fi and recent phones
- [ ] No visible layout jumps; navigation feels instant
- [ ] Graceful fallbacks if data isn’t available (show placeholders)

Privacy & Compliance
- [ ] Admin pages are not indexed by search engines
- [ ] No personal data is exposed to non‑admins
- [ ] Basic usage is logged (page opens, actions) for audit readiness

Rollout Plan
- [ ] Internal beta (HIVE team only) with quick feedback loop
- [ ] Short usage guide with screenshots (1‑pager)
- [ ] Confirm support contact/Slack channel for issues

Success Criteria (Go/No‑Go)
- [ ] All pages render with clear navigation and titles
- [ ] Admin‑only access verified by at least 2 team members
- [ ] Overview and Users pages validated as useful by team
- [ ] No blocker‑level bugs found in a day of casual use

Out of Scope (for v1)
- Deep analytics dashboards and exports
- Destructive actions (deletes) and complex moderation workflows
- Billing and invoices

How to Access (Local)
- [ ] Run: `pnpm install`
- [ ] Run: `pnpm dev:admin`
- [ ] Visit: http://localhost:3001

Notes
- The admin app reuses our design system, ensuring consistent look and feel.
- Real data will appear progressively as backend connections are added; placeholders are acceptable in early v1.
