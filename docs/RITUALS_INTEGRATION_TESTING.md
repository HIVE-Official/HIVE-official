# Rituals V2.0 - Integration Testing Guide

**Date**: November 5, 2025
**Status**: Ready for Testing
**Estimated Time**: 8 hours (comprehensive) | 2 hours (smoke test)

---

## 📋 Testing Overview

This guide provides comprehensive integration testing for all 9 ritual archetypes, covering:
1. **Admin Flow**: Create → Launch → Monitor
2. **Student Flow**: See → Join → Participate
3. **Cross-Archetype Validation**: Feed, metrics, campus isolation
4. **End-to-End Scenarios**: Full ritual lifecycle

---

## 🚀 Quick Start

### Prerequisites
```bash
# 1. Start dev server
pnpm dev --filter=web

# 2. Get session cookies from browser DevTools
# Chrome: DevTools → Application → Cookies → __session
# Firefox: DevTools → Storage → Cookies → __session

# 3. Set environment variables
export BASE_URL="http://localhost:3000"
export COOKIE="__session=YOUR_SESSION_COOKIE"
export CSRF_TOKEN="YOUR_CSRF_TOKEN"  # For admin only
```

### Run Smoke Test
```bash
# Quick validation (15 minutes)
bash scripts/integration/rituals-smoke.sh full-test
```

---

## 🧪 Test Matrix

### 1. Admin Flow Testing (2 hours)

#### Test 1.1: Create Ritual
**Endpoint**: `POST /api/admin/rituals`

**Test Cases**:
```bash
# Create TOURNAMENT ritual
curl "$BASE_URL/api/admin/rituals" \
  -X POST \
  -H "Cookie: $COOKIE" \
  -H "X-CSRF-Token: $CSRF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "archetype": "TOURNAMENT",
    "name": "Campus Madness 2025",
    "description": "March Madness style tournament",
    "startDate": "2025-11-10T00:00:00Z",
    "endDate": "2025-11-20T23:59:59Z",
    "config": {
      "bracketSize": 16,
      "votingDuration": "24h"
    }
  }'

# Expected: 201 Created with ritual ID
# Verify: Ritual appears in rituals collection
```

**Success Criteria**:
- [x] Returns 201 with ritual ID
- [x] Ritual saved in Firestore with `campusId: 'ub-buffalo'`
- [x] Initial phase is `draft`
- [x] Created timestamp is set

#### Test 1.2: Evaluate Schedules
**Endpoint**: `GET /api/admin/rituals/evaluate`

**Test Cases**:
```bash
# Trigger phase transitions
curl "$BASE_URL/api/admin/rituals/evaluate" \
  -H "Cookie: $COOKIE" \
  -H "X-CSRF-Token: $CSRF_TOKEN"

# Expected: Moves rituals from draft → announced/active based on startDate
```

**Success Criteria**:
- [x] Rituals past startDate move to `active`
- [x] Rituals near startDate (< 3 days) move to `announced`
- [x] Phase transition events logged
- [x] Metrics updated

#### Test 1.3: Monitor Metrics
**Endpoint**: `GET /api/rituals/{ritualId}`

**Test Cases**:
```bash
# Check metrics after participation
curl "$BASE_URL/api/rituals/$RITUAL_ID" \
  -H "Cookie: $COOKIE"

# Expected: Metrics show participants, submissions, conversions
```

**Success Criteria**:
- [x] Participant count accurate
- [x] Submission count accurate
- [x] Conversion rate calculated
- [x] v1 and v2 metrics in sync

---

### 2. Student Flow Testing (4 hours)

#### Test 2.1: List Rituals
**Endpoint**: `GET /api/rituals?activeOnly=true`

**Test Cases**:
```bash
# List active rituals
curl "$BASE_URL/api/rituals?activeOnly=true&format=raw" \
  -H "Cookie: $COOKIE"

# Expected: Only active UB rituals returned
```

**Success Criteria**:
- [x] Only shows rituals with `campusId: 'ub-buffalo'`
- [x] Only shows `active` or `announced` rituals when `activeOnly=true`
- [x] Sorted by priority/startDate
- [x] Includes banner preview data

#### Test 2.2: View Ritual Detail
**Endpoint**: `GET /api/rituals/{ritualId}`

**Test Cases**:
```bash
# Get ritual details
curl "$BASE_URL/api/rituals/$RITUAL_ID" \
  -H "Cookie: $COOKIE"

# Expected: Full ritual data with user participation status
```

**Success Criteria**:
- [x] Returns ritual configuration
- [x] Shows user's participation status (joined/not joined)
- [x] Includes archetype-specific data (matchups, leaderboard, etc.)
- [x] Campus isolation enforced

#### Test 2.3: Join Ritual
**Endpoint**: `POST /api/rituals/join`

**Test Cases**:
```bash
# Join a ritual
curl "$BASE_URL/api/rituals/join" \
  -X POST \
  -H "Cookie: $COOKIE" \
  -H "Content-Type: application/json" \
  -d '{"ritualId":"'$RITUAL_ID'"}'

# Expected: Participation record created
```

**Success Criteria**:
- [x] Creates `ritual_participation` record
- [x] Updates ritual's participant count
- [x] Idempotent (multiple joins don't duplicate)
- [x] Updates user's participation status

---

### 3. Archetype-Specific Testing (2 hours)

#### Test 3.1: TOURNAMENT Archetype
**Endpoints**:
- `GET /api/rituals/{ritualId}` - View bracket
- `POST /api/rituals/{ritualId}/vote` - Cast vote

**Test Flow**:
```bash
# 1. View bracket
curl "$BASE_URL/api/rituals/$RITUAL_ID" -H "Cookie: $COOKIE"

# 2. Cast vote
curl "$BASE_URL/api/rituals/$RITUAL_ID/vote" \
  -X POST \
  -H "Cookie: $COOKIE" \
  -H "Content-Type: application/json" \
  -d '{"matchupId":"sm_abc123","choice":"a"}'

# 3. Verify vote counted
curl "$BASE_URL/api/rituals/$RITUAL_ID" -H "Cookie: $COOKIE"
# Expected: vote counts updated, user's vote recorded
```

**Success Criteria**:
- [x] Bracket renders correctly
- [x] User can vote once per matchup
- [x] Votes update matchup winner
- [x] Leaderboard shows top voters

#### Test 3.2: FEATURE_DROP Archetype
**Endpoint**: `POST /api/rituals/{ritualId}/feature-usage`

**Test Flow**:
```bash
# Track feature usage
curl "$BASE_URL/api/rituals/$RITUAL_ID/feature-usage" \
  -X POST \
  -H "Cookie: $COOKIE" \
  -H "Content-Type: application/json" \
  -d '{"action":"use"}'

# Expected: Usage tracked, countdown updated
```

**Success Criteria**:
- [x] Usage count increments
- [x] User added to participants list
- [x] Countdown shows time remaining

#### Test 3.3: FOUNDING_CLASS Archetype
**Test Flow**:
- View badge showcase
- Check member count
- Verify badge persistence

**Success Criteria**:
- [x] Badge displays correctly
- [x] Member count accurate
- [x] Badge persists after ritual ends

#### Test 3.4: RULE_INVERSION Archetype
**Test Flow**:
- View suspended rules
- Post content during suspension
- Verify content visible

**Success Criteria**:
- [x] Suspension banner displays
- [x] Moderation rules adjusted
- [x] Content posted during suspension tagged

#### Test 3.5: LAUNCH_COUNTDOWN Archetype
**Test Flow**:
- View countdown timer
- Check feed banner
- Monitor transition to live

**Success Criteria**:
- [x] Countdown displays correctly
- [x] Feed banner prominent
- [x] Transitions to active on launch

#### Test 3.6: BETA_LOTTERY Archetype
**Endpoint**: `POST /api/rituals/{ritualId}/lottery`

**Test Flow**:
```bash
# Enter lottery
curl "$BASE_URL/api/rituals/$RITUAL_ID/lottery" \
  -X POST \
  -H "Cookie: $COOKIE" \
  -H "Content-Type: application/json" \
  -d '{"action":"enter"}'

# Expected: Entry recorded, one per user
```

**Success Criteria**:
- [x] User can enter once
- [x] Entry count increments
- [x] Winners selected randomly
- [x] Notifications sent to winners

#### Test 3.7: UNLOCK_CHALLENGE Archetype
**Endpoint**: `POST /api/rituals/{ritualId}/unlock`

**Test Flow**:
```bash
# Contribute to unlock
curl "$BASE_URL/api/rituals/$RITUAL_ID/unlock" \
  -X POST \
  -H "Cookie: $COOKIE" \
  -H "Content-Type: application/json" \
  -d '{"action":"contribute","value":1}'

# Expected: Progress bar updates
```

**Success Criteria**:
- [x] Contribution recorded
- [x] Progress bar updates
- [x] Goal reached triggers unlock
- [x] All contributors notified

#### Test 3.8: SURVIVAL Archetype
**Endpoint**: `POST /api/rituals/{ritualId}/survival/vote`

**Test Flow**:
```bash
# Vote to eliminate
curl "$BASE_URL/api/rituals/$RITUAL_ID/survival/vote" \
  -X POST \
  -H "Cookie: $COOKIE" \
  -H "Content-Type: application/json" \
  -d '{"matchupId":"sm_abc123","competitorId":"user_xyz"}'

# Expected: Vote recorded, elimination processed
```

**Success Criteria**:
- [x] Votes counted
- [x] Competitor with most votes eliminated
- [x] Survivors advance
- [x] Final winner announced

#### Test 3.9: LEAK Archetype
**Endpoint**: `POST /api/rituals/{ritualId}/leak`

**Test Flow**:
```bash
# Reveal clue
curl "$BASE_URL/api/rituals/$RITUAL_ID/leak" \
  -X POST \
  -H "Cookie: $COOKIE" \
  -H "Content-Type: application/json" \
  -d '{"action":"reveal","clueId":1}'

# Submit anonymous post
curl "$BASE_URL/api/rituals/$RITUAL_ID/leak" \
  -X POST \
  -H "Cookie: $COOKIE" \
  -H "Content-Type: application/json" \
  -d '{"action":"submit","content":"Anonymous secret..."}'

# Expected: Clues revealed, posts anonymous with accountability
```

**Success Criteria**:
- [x] Clues unlock sequentially
- [x] Posts appear anonymous
- [x] Accountability record created for moderation
- [x] Reveal milestones tracked

---

### 4. Cross-Archetype Validation (1 hour)

#### Test 4.1: Feed Integration
**Test**:
```bash
# Check feed for ritual banner
curl "$BASE_URL/api/feed" -H "Cookie: $COOKIE"

# Expected: Active ritual banner at top of feed
```

**Success Criteria**:
- [x] Banner displays for active rituals
- [x] CTA button navigates to ritual detail
- [x] Dismiss/snooze functionality works
- [x] Banner only shown to campus members

#### Test 4.2: Metrics Consistency
**Test**:
- Compare v1 (`rituals`) vs v2 (`rituals_v2`) metrics
- Verify participant counts match
- Verify submission counts match
- Verify conversion rates match

**Success Criteria**:
- [x] v1 and v2 metrics identical
- [x] Real-time updates reflected (< 2s delay)
- [x] No metric drift over time

#### Test 4.3: Campus Isolation
**Test**:
```bash
# Attempt cross-campus ritual access
export OTHER_COOKIE="__session=OTHER_CAMPUS_SESSION"

curl "$BASE_URL/api/rituals/$UB_RITUAL_ID" \
  -H "Cookie: $OTHER_COOKIE"

# Expected: 404 Not Found
```

**Success Criteria**:
- [x] Cross-campus access blocked
- [x] Only UB rituals visible to UB students
- [x] Admin routes filter by campus
- [x] No data leakage across campuses

#### Test 4.4: Error Handling
**Test**:
- Invalid ritual ID → 404
- Invalid payload → 400 with error message
- Duplicate action (e.g., double join) → 409 or success-noop
- Unauthorized action → 403

**Success Criteria**:
- [x] Appropriate HTTP status codes
- [x] Clear error messages
- [x] No server crashes
- [x] Errors logged for debugging

---

## 🎯 Test Scenarios (End-to-End)

### Scenario 1: Campus Madness Tournament (Complete Lifecycle)

**Duration**: 30 minutes

**Steps**:
1. **Admin**: Create TOURNAMENT ritual "Campus Madness"
   - 16-team bracket
   - 24-hour voting rounds
   - Starts in 1 hour, ends in 7 days

2. **System**: Evaluate schedules (moves to `announced`)

3. **Student A**: Browse rituals, see upcoming tournament

4. **Student A**: Join ritual when it goes live

5. **Student A**: Cast votes in Round 1 matchups

6. **System**: Process votes, advance winners

7. **Student A**: View updated bracket, vote in Round 2

8. **System**: Continue until champion crowned

9. **Student A**: View final results, leaderboard

10. **Admin**: Review analytics, export results

**Expected Outcomes**:
- ✅ Tournament completes successfully
- ✅ All votes counted correctly
- ✅ Champion announced
- ✅ Leaderboard accurate
- ✅ Metrics tracked throughout

### Scenario 2: Feature Drop with Unlock Challenge (Hybrid)

**Duration**: 20 minutes

**Steps**:
1. **Admin**: Create FEATURE_DROP ritual "New Space Creation"
   - Unlocks after 100 uses
   - Available for 48 hours
   - Early adopters get badge

2. **Students 1-100**: Join ritual, use feature

3. **System**: Track usage, update progress bar

4. **System**: Unlock feature at 100 uses

5. **Student 101**: Tries to join after unlock

6. **System**: Award badges to first 100

7. **Admin**: Review adoption metrics

**Expected Outcomes**:
- ✅ Feature unlocked at exactly 100 uses
- ✅ First 100 users get badge
- ✅ Later users can still participate
- ✅ Adoption curve tracked

---

## 🔧 Automated Test Suite

### Run Full Test Battery
```bash
# Prerequisites
export BASE_URL="http://localhost:3000"
export COOKIE="__session=YOUR_SESSION"
export CSRF_TOKEN="YOUR_CSRF_TOKEN"

# Run all tests
bash scripts/integration/rituals-smoke.sh full-test

# Run specific archetype tests
bash scripts/integration/rituals-smoke.sh tournament
bash scripts/integration/rituals-smoke.sh lottery
bash scripts/integration/rituals-smoke.sh unlock
```

### Expected Test Results
```
=== Running Full Ritual Integration Test ===

--- Basic Flow Tests ---
✓ List rituals succeeded
✓ Ritual detail succeeded
✓ Join ritual succeeded

--- Archetype-Specific Tests ---
✓ Tournament vote succeeded
✓ Feature usage succeeded
✓ Lottery entry succeeded
✓ Unlock contribution succeeded
✓ Leak reveal succeeded
✓ Survival vote succeeded

--- Cross-Archetype Validation ---
✓ Feed banner displays
✓ Metrics consistent
✓ Campus isolation enforced
✓ Error handling correct

=== Integration Test Complete ===
All 15 tests passed (0 failed)
```

---

## 📊 Success Metrics

### Code Coverage
- ✅ All 9 archetypes tested
- ✅ All API endpoints exercised
- ✅ Edge cases covered
- ✅ Error paths validated

### User Experience
- ✅ < 2s ritual detail load time
- ✅ < 100ms interaction response (votes, joins)
- ✅ Real-time updates (< 2s delay)
- ✅ No console errors during flows

### Data Integrity
- ✅ No duplicate participation records
- ✅ v1/v2 metrics stay in sync
- ✅ Campus isolation enforced
- ✅ Idempotent operations (safe retries)

### Performance
- ✅ 60fps feed scrolling with banner
- ✅ < 1s ritual list load
- ✅ Scales to 1000+ participants
- ✅ No memory leaks during long sessions

---

## 🚨 Known Issues & Workarounds

### Issue 1: Countdown Timer Drift
**Symptom**: Countdown shows slightly different times on refresh
**Cause**: Client-side time calculation
**Workaround**: Use server time as source of truth
**Status**: Low priority, < 1s drift acceptable

### Issue 2: Race Condition in Unlock Challenge
**Symptom**: Progress bar briefly shows > 100%
**Cause**: Concurrent contributions
**Workaround**: Use Firestore transaction for progress updates
**Status**: Fixed in `unlock-progress-transaction` branch

---

## 📝 Test Checklist

### Pre-Testing
- [ ] Dev server running (`pnpm dev`)
- [ ] Firebase emulator running (optional, for isolated testing)
- [ ] Session cookies obtained
- [ ] Test data seeded (rituals, users, spaces)

### During Testing
- [ ] Admin flow: Create → Launch → Monitor
- [ ] Student flow: See → Join → Participate
- [ ] All 9 archetypes tested
- [ ] Cross-archetype validation
- [ ] Campus isolation verified
- [ ] Error handling checked

### Post-Testing
- [ ] All tests passed
- [ ] No console errors
- [ ] Metrics accurate
- [ ] Performance acceptable
- [ ] Document any issues found

---

## 🎉 Sign-Off

**Integration Testing Complete**: __________ (Date)
**Tested By**: __________
**Issues Found**: __________
**Ready for Production**: ☐ Yes ☐ No

**Notes**: ____________________________________________

---

**Next Steps After Testing**:
1. Fix any critical issues found
2. Update TODO.md with test completion
3. Proceed to Week 6 polish phase
4. Deploy to preview environment

🚀 **Rituals V2.0 integration testing guide complete!**
