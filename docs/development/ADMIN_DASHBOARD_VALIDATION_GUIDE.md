# Admin Dashboard Validation Guide

**Status**: Admin vertical slice complete (Nov 4, 2025)
**Next Steps**: Execute validation tests before PR packaging
**Owner**: Integration pod (Laney + QA)

---

## ✅ What's Complete

### Sprint Deliverables (Nov 4-12)
- ✅ Ritual creation wizard (5-step flow)
- ✅ Real-time monitoring dashboard
- ✅ Campus-isolated overview metrics
- ✅ Sheet-first navigation pattern
- ✅ Feature flag gating
- ✅ Security: `withSecureAuth` + CSRF protection
- ✅ Mobile viewport support
- ✅ Accessibility: keyboard navigation, reduced motion
- ✅ Integration tests (campus isolation, HiveLab actions)

### What Ships Now
**Admin Dashboard Vertical Slice**: The focused ritual management interface that admins need to launch and monitor campus-wide rituals.

### Deferred to Month 3
**Full 10-Tab Control Center**: Overview, Campaigns, Rituals, HiveLab, Moderation, Analytics, Infrastructure, Users, Spaces, Feature Flags.

---

## 🧪 Validation Checklist

### 1. Integration Tests (Vitest)

Run these tests to verify campus isolation and backend logic:

```bash
# Test 1: Admin Dashboard Overview (campus isolation)
pnpm vitest --run apps/web/src/test/integration/admin-dashboard-overview.test.ts

# Test 2: Admin HiveLab Backend (catalog, reviews, deployments)
pnpm vitest --run apps/web/src/test/integration/admin-hivelab-backend.test.ts
```

**Expected Results**:
- ✅ All tests pass
- ✅ Campus isolation verified (only ub-buffalo data returned)
- ✅ Schema validation passes (users, spaces, builder requests)
- ✅ HiveLab actions work (catalog export, status changes, deployments)

**Test Coverage**:
- `admin-dashboard-overview.test.ts`:
  - Campus-isolated user metrics (active/inactive)
  - Campus-isolated space metrics (active/dormant)
  - Builder request metrics (pending/approved/urgent)
  - System health (collection counts)
- `admin-hivelab-backend.test.ts`:
  - Catalog CSV export with filters
  - Review queue CSV export (pending only)
  - Deployment CSV export
  - Quality run requests
  - Tool status updates
  - Deployment state changes

### 2. Manual Smoke Tests (Browser)

Execute the 7-step smoke script from [INTEGRATION_TEST_PLAN_NOV4-8.md](./INTEGRATION_TEST_PLAN_NOV4-8.md#admin-dashboard-smoke-script):

#### Step 1: Admin Access Verification
```
1. Sign in as an admin-capable UB account (@buffalo.edu)
2. Open browser devtools console
3. Run: `await fetch('/api/feature-flags').then(r => r.json())`
4. Verify: `adminDashboard: true` in response
```
**Expected**: Admin flag enabled for authorized account

---

#### Step 2: Page Load Performance
```
1. Visit http://localhost:3000/admin
2. Record timing (devtools Performance tab):
   - Skeleton display: <500ms
   - Metrics populated: <2s
3. Capture screenshot of loaded dashboard
```
**Expected**: Fast skeleton → smooth transition to metrics grid

---

#### Step 3: Reduced Motion Accessibility
```
1. Enable reduced motion:
   - macOS: System Settings → Accessibility → Display → Reduce motion
   - Chrome DevTools: Cmd+Shift+P → "Emulate CSS prefers-reduced-motion"
2. Reload /admin page
3. Verify: No slide/scale animations in metrics grid or audit list
```
**Expected**: Animations respect `prefers-reduced-motion` media query

---

#### Step 4: Sheet Navigation (Desktop)
```
1. Click each nav item: Campaigns, Rituals, HiveLab, Moderation
2. For each, verify:
   - Sheet overlay opens from right
   - Contextual copy + CTA links visible
   - Keyboard focus trapped in sheet (Tab cycles within)
   - Background dimmed/locked
```
**Expected**: Sheet-first pattern with proper focus management

---

#### Step 5: Dismissal & Focus Restoration
```
1. Open any sheet (e.g., Rituals)
2. Dismiss via:
   - Close button (X icon)
   - ESC key
3. Verify:
   - Sheet closes smoothly
   - Focus returns to nav rail
   - Active item resets to "Overview"
```
**Expected**: Clean dismissal with focus restoration to nav rail

---

#### Step 6: Feature Flag Gating
```
1. Disable admin flag:
   - Option A: Toggle feature flag to false in Firebase
   - Option B: Sign in as non-admin account
2. Visit /admin
3. Verify:
   - Gating screen displayed ("Access Restricted")
   - No admin API requests in Network tab
   - No data leakage
```
**Expected**: Proper gating for unauthorized users

---

#### Step 7: Mobile Viewport
```
1. Resize browser to ≤600px width (or use device emulator)
2. Verify:
   - Mobile nav pills displayed (not desktop rail)
   - Tapping pills opens same sheet overlay
   - Swipe gesture closes sheet
   - Keyboard navigation still works (Tab, ESC)
```
**Expected**: Mobile-optimized navigation with touch + keyboard support

---

### 3. Evidence Capture

For each smoke test step, capture:

```markdown
### Admin Dashboard – <Step Name>
- Date: 2025-11-04
- Environment: Local (apps/web)
- Result: ✅ / ⚠️ / ❌
- Evidence:
  - Screenshot: `docs/development/integration-artifacts/2025-11-04/admin-<step>.png`
  - Performance: <skeleton_ms>, <metrics_ms>
  - Notes: <any issues or observations>
- Follow-ups: <action items if needed>
```

**Storage**: Create folder if needed:
```bash
mkdir -p docs/development/integration-artifacts/2025-11-04
```

---

## 📋 Pre-PR Checklist

Before packaging the Admin Dashboard PR, verify:

- [ ] Both vitest integration tests pass
- [ ] All 7 smoke test steps complete with ✅
- [ ] Screenshots captured and stored in `integration-artifacts/`
- [ ] Performance metrics recorded (skeleton, metrics load times)
- [ ] No console errors in browser devtools
- [ ] Feature flag gating works (tested with non-admin account)
- [ ] Mobile viewport tested (≤600px)
- [ ] Accessibility verified (keyboard nav, reduced motion)
- [ ] No security regressions (admin APIs use `withSecureAuth`)
- [ ] Documentation updated:
  - [ ] `TODO.md` Admin section marked complete
  - [ ] `docs/UX-UI-TOPOLOGY.md` §2.10 Admin Dashboard
  - [ ] `docs/UI-UX-CHECKLIST.md` Admin row
  - [ ] `SECURITY-CHECKLIST.md` Admin section

---

## 🚀 PR Packaging

Once all validation passes, package the PR:

### PR Title
```
feat(admin): Admin Dashboard vertical slice (ritual management)
```

### PR Description Template
```markdown
## Summary
Implements focused Admin Dashboard vertical slice for ritual management:
- ✅ Ritual creation wizard (5-step flow)
- ✅ Real-time monitoring dashboard
- ✅ Campus-isolated overview metrics
- ✅ Sheet-first navigation pattern
- ✅ Feature flag gating + security

## Testing
- [x] Integration tests pass (vitest)
- [x] Smoke tests complete (7 steps)
- [x] Performance: skeleton <500ms, metrics <2s
- [x] Accessibility: keyboard nav + reduced motion
- [x] Mobile viewport tested (≤600px)

## Evidence
- Screenshots: `docs/development/integration-artifacts/2025-11-04/`
- Test results: All vitest tests passing
- Smoke test log: [Link to execution log]

## Security
- [x] All admin routes use `withSecureAuth`
- [x] Campus isolation enforced (`campusId: 'ub-buffalo'`)
- [x] Feature flag gating verified
- [x] No data leakage to non-admin users

## Documentation
- Updated: `TODO.md`, `docs/UX-UI-TOPOLOGY.md`, `docs/UI-UX-CHECKLIST.md`
- Added: `docs/development/ADMIN_DASHBOARD_VALIDATION_GUIDE.md`

## Scope Notes
**Ships now**: Focused vertical slice (ritual wizard + monitoring)
**Deferred to Month 3**: Full 10-tab control center (Campaigns, Analytics, Infrastructure, etc.)

## Next Steps
After merge:
1. Monitor admin dashboard usage analytics
2. Gather feedback from first ritual launch
3. Plan Month 3 expansion (full control center)
```

### Files to Include

Core implementation:
```
apps/web/src/app/admin/
apps/web/src/app/api/admin/
apps/web/src/components/admin/
apps/web/src/lib/admin-*
```

Tests:
```
apps/web/src/test/integration/admin-dashboard-overview.test.ts
apps/web/src/test/integration/admin-hivelab-backend.test.ts
```

Documentation:
```
docs/development/ADMIN_DASHBOARD_VALIDATION_GUIDE.md
docs/development/integration-artifacts/2025-11-04/
```

Updated checklists:
```
TODO.md (Admin section)
docs/UX-UI-TOPOLOGY.md (§2.10)
docs/UI-UX-CHECKLIST.md (Admin row)
SECURITY-CHECKLIST.md (Admin section)
```

---

## ⚠️ Known Limitations

### Out of Scope (Deferred)
- Full 10-tab control center (Month 3)
- Advanced analytics charts (Month 3)
- Bulk moderation actions (Month 3)
- Campus expansion tools (Month 3)
- Infrastructure monitoring (Month 3)

### Current Scope (Vertical Slice)
- ✅ Ritual creation wizard
- ✅ Real-time monitoring dashboard
- ✅ Overview metrics (users, spaces, builder requests)
- ✅ Sheet-first navigation pattern

---

## 📊 Success Metrics

After launch, track:
- **Ritual Creation**: Time to create first ritual (<5 min target)
- **Monitoring**: Time to identify active ritual status (<10s target)
- **Performance**: Dashboard load time (<2s target)
- **Adoption**: % of admins using dashboard weekly (>80% target)

---

## 🔗 Related Documentation

- [Admin Dashboard Topology](../ux/ADMIN_DASHBOARD_TOPOLOGY.md) - Complete feature spec
- [Integration Test Plan](./INTEGRATION_TEST_PLAN_NOV4-8.md) - Full testing strategy
- [Security Checklist](../../SECURITY-CHECKLIST.md) - Security requirements
- [TODO.md](../../TODO.md) - Project roadmap

---

**Last Updated**: November 4, 2025
**Next Review**: After PR merge + first ritual launch
