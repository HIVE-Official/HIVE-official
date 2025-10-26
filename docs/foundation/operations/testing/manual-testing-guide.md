# HIVE Manual Testing Guide

**Purpose**: Verify all critical user flows work before launch
**Time Required**: 60-90 minutes
**Prerequisites**: Production deployment complete, test account ready

---

## 🧪 Test Environment Setup

### Before You Start

1. **Clear browser data** (avoid cached issues)
   - Chrome: Settings → Privacy → Clear browsing data
   - Safari: Develop → Empty Caches
   - Firefox: Options → Privacy → Clear Data

2. **Prepare test account**
   - Email: `test@buffalo.edu` (or your @buffalo.edu email)
   - Have access to email inbox

3. **Open developer tools**
   - Press F12 (Chrome/Firefox) or Cmd+Option+I (Safari)
   - Monitor Console tab for errors

4. **Test on multiple devices**
   - Desktop: Chrome, Firefox, Safari
   - Mobile: iOS Safari, Android Chrome
   - Tablet: iPad if available

---

## ✅ Test Suite 1: Authentication Flow (15 minutes)

### Test 1.1: Sign Up with Magic Link

**Goal**: New user can sign up and authenticate

**Steps:**
1. Navigate to https://hive.college
2. Click "Sign Up" or "Get Started"
3. Enter email: `test@buffalo.edu`
4. Click "Send Magic Link"

**Expected Results:**
- [ ] Loading indicator appears
- [ ] Success message: "Check your email!"
- [ ] No errors in console
- [ ] Email arrives within 60 seconds
- [ ] Email subject contains "HIVE"
- [ ] Email has clickable magic link

**Steps (continued):**
5. Open email
6. Click magic link
7. Observe redirect

**Expected Results:**
- [ ] Redirects to hive.college/auth/verify
- [ ] Shows "Verifying..." loading state
- [ ] Redirects to onboarding wizard
- [ ] No errors in console
- [ ] Session cookie set (check DevTools → Application → Cookies)

**Pass/Fail**: ___________

**Notes/Issues**: _________________________________

---

### Test 1.2: Session Persistence

**Goal**: User stays logged in across page refreshes

**Steps:**
1. After successful login, refresh page (Cmd+R / Ctrl+R)
2. Navigate away and come back
3. Close tab and reopen https://hive.college

**Expected Results:**
- [ ] User remains authenticated after refresh
- [ ] No login prompt appears
- [ ] User data loads correctly
- [ ] Session persists for 7 days (check cookie expiry)

**Pass/Fail**: ___________

---

### Test 1.3: Invalid Email Rejection

**Goal**: System rejects non-@buffalo.edu emails

**Steps:**
1. Log out
2. Try to sign up with: `test@gmail.com`

**Expected Results:**
- [ ] Error message: "Please use your @buffalo.edu email"
- [ ] Email not sent
- [ ] Cannot proceed
- [ ] Error styling visible (red border, error text)

**Pass/Fail**: ___________

---

### Test 1.4: Logout

**Goal**: User can log out and session ends

**Steps:**
1. Click profile menu (top right)
2. Click "Log Out"

**Expected Results:**
- [ ] Confirmation dialog appears (optional)
- [ ] Redirects to login page
- [ ] Session cookie removed
- [ ] Cannot access protected pages
- [ ] Trying to visit /feed redirects to login

**Pass/Fail**: ___________

---

## 🎓 Test Suite 2: Onboarding Wizard (20 minutes)

### Test 2.1: Complete Onboarding Flow

**Goal**: New user completes all onboarding steps

**Steps:**
1. Sign up with new email
2. Complete Step 1: Welcome
   - Read welcome message
   - Click "Get Started"

**Expected Results:**
- [ ] Welcome screen displays
- [ ] "Get Started" button works
- [ ] Progresses to Step 2

**Steps (continued):**
3. Complete Step 2: Full Name
   - Enter first name: "Test"
   - Enter last name: "User"
   - Click "Next"

**Expected Results:**
- [ ] Name fields validate (not empty)
- [ ] Progress indicator shows Step 2/8
- [ ] Advances to Step 3

**Steps (continued):**
4. Complete Step 3: Handle
   - Enter handle: "testuser123"
   - Click "Check Availability"
   - Click "Next"

**Expected Results:**
- [ ] Handle validation works
- [ ] Uniqueness check runs
- [ ] Shows "✓ Available" or error if taken
- [ ] Cannot proceed without available handle

**Steps (continued):**
5. Complete Step 4: Photo
   - Click "Upload Photo" OR "Skip"
   - If uploading: Select image < 5MB
   - Click "Next"

**Expected Results:**
- [ ] File picker opens
- [ ] Image preview appears after selection
- [ ] Upload progress indicator
- [ ] Can skip if desired
- [ ] Advances to Step 5

**Steps (continued):**
6. Complete Step 5: Academic Info
   - Select year: "Junior"
   - Select major: "Computer Science"
   - Click "Next"

**Expected Results:**
- [ ] Dropdowns populate with options
- [ ] Selections save
- [ ] Advances to Step 6

**Steps (continued):**
7. Complete Step 6: Builder Status
   - Select "I'm a builder" or "Just browsing"
   - If builder: Enter faculty sponsor
   - Click "Next"

**Expected Results:**
- [ ] Options selectable
- [ ] Conditional fields appear if builder selected
- [ ] Advances to Step 7

**Steps (continued):**
8. Complete Step 7: Interests (optional)
   - Select 3-5 interests
   - Click "Next"

**Expected Results:**
- [ ] Interest tags selectable
- [ ] Selected interests highlighted
- [ ] Can skip
- [ ] Advances to Step 8

**Steps (continued):**
9. Complete Step 8: Legal Agreements
   - Read Privacy Policy
   - Read Terms of Service
   - Check "I agree"
   - Click "Complete"

**Expected Results:**
- [ ] Agreements display
- [ ] Cannot proceed without checking
- [ ] Loading indicator after submit
- [ ] Redirects to /feed
- [ ] Profile created in Firestore

**Pass/Fail**: ___________

**Notes**: _________________________________

---

### Test 2.2: Onboarding Resume

**Goal**: User can resume onboarding if interrupted

**Steps:**
1. Start onboarding
2. Complete Steps 1-3
3. Close browser
4. Reopen and log in

**Expected Results:**
- [ ] Redirects to onboarding Step 4
- [ ] Progress restored
- [ ] Previous answers saved
- [ ] Can continue from where left off

**Pass/Fail**: ___________

---

## 🏠 Test Suite 3: Feed Experience (15 minutes)

### Test 3.1: Feed Loads

**Goal**: User sees personalized feed after login

**Steps:**
1. Log in successfully
2. Navigate to /feed (or redirected automatically)

**Expected Results:**
- [ ] Feed loads within 3 seconds
- [ ] Shows loading skeleton first
- [ ] Posts appear (if data exists)
- [ ] Or empty state with clear CTA
- [ ] No errors in console

**Pass/Fail**: ___________

---

### Test 3.2: Feed Interactions

**Goal**: User can interact with posts

**Steps:**
1. Find a post in feed
2. Click "Like" (heart icon)
3. Click "Comment"
4. Enter comment text: "Great post!"
5. Submit comment

**Expected Results:**
- [ ] Like button animates
- [ ] Like count increments
- [ ] Comment modal/box appears
- [ ] Can type comment
- [ ] Comment posts successfully
- [ ] Appears in post's comments
- [ ] Toast notification on success

**Pass/Fail**: ___________

---

### Test 3.3: Feed Filters

**Goal**: User can filter feed by type

**Steps:**
1. Click "All" filter tab
2. Click "Following" tab
3. Click "Spaces" tab
4. Click "Academic" tab

**Expected Results:**
- [ ] Active tab highlighted
- [ ] Feed updates with filtered content
- [ ] Loading indicator during fetch
- [ ] Empty state if no content
- [ ] URL updates (optional)

**Pass/Fail**: ___________

---

### Test 3.4: Infinite Scroll

**Goal**: More posts load as user scrolls

**Steps:**
1. Scroll to bottom of feed
2. Wait for more posts

**Expected Results:**
- [ ] Loading indicator appears near bottom
- [ ] New posts load automatically
- [ ] Smooth scrolling experience
- [ ] "No more posts" message at true end

**Pass/Fail**: ___________

---

## 🏢 Test Suite 4: Spaces Discovery (15 minutes)

### Test 4.1: Browse Spaces

**Goal**: User can discover spaces

**Steps:**
1. Navigate to /spaces
2. Wait for page to load

**Expected Results:**
- [ ] Page loads within 3 seconds
- [ ] Shows loading skeleton first
- [ ] Three sections appear:
  - [ ] Panic Relief spaces
  - [ ] Where Your Friends Are
  - [ ] Insider Access
- [ ] Each section has 3-5 spaces
- [ ] Space cards display:
  - [ ] Space name
  - [ ] Description
  - [ ] Member count
  - [ ] Online count
  - [ ] Join button

**Pass/Fail**: ___________

---

### Test 4.2: Search Spaces

**Goal**: User can search for specific spaces

**Steps:**
1. Click search box
2. Type: "computer science"
3. Press Enter or click search

**Expected Results:**
- [ ] Search initiates
- [ ] Loading indicator appears
- [ ] Results display matching spaces
- [ ] Highlights search terms (optional)
- [ ] Shows "No results" if none found

**Pass/Fail**: ___________

---

### Test 4.3: Join Space

**Goal**: User can join a space

**Steps:**
1. Find a space with "Join" button
2. Click "Join"
3. Wait for confirmation

**Expected Results:**
- [ ] Loading indicator on button
- [ ] Toast notification: "Successfully joined!"
- [ ] Button changes to "Joined" or "Leave"
- [ ] Redirects to space page
- [ ] Space appears in "My Spaces"

**Pass/Fail**: ___________

---

### Test 4.4: View Space Details

**Goal**: User can view space content

**Steps:**
1. Click on a space card
2. Explore space page

**Expected Results:**
- [ ] Space page loads
- [ ] Shows banner image
- [ ] Displays member count, description
- [ ] Shows recent posts
- [ ] Can create post (if member)
- [ ] Can leave space (if member)
- [ ] Can see members list

**Pass/Fail**: ___________

---

## 👤 Test Suite 5: Profile Management (10 minutes)

### Test 5.1: View Own Profile

**Goal**: User can view their profile

**Steps:**
1. Click profile menu (top right)
2. Click "Profile" or "View Profile"

**Expected Results:**
- [ ] Profile page loads
- [ ] Shows user's avatar
- [ ] Displays full name, handle
- [ ] Shows bio (if set)
- [ ] Shows academic info
- [ ] Shows spaces joined
- [ ] Shows posts created
- [ ] "Edit Profile" button visible

**Pass/Fail**: ___________

---

### Test 5.2: Edit Profile

**Goal**: User can update profile information

**Steps:**
1. Click "Edit Profile"
2. Change bio to: "Testing HIVE profile"
3. Change major
4. Click "Save"

**Expected Results:**
- [ ] Edit form appears
- [ ] Fields pre-populated with current data
- [ ] Can modify fields
- [ ] Save button enabled
- [ ] Loading indicator during save
- [ ] Toast notification: "Profile updated!"
- [ ] Changes reflected on profile
- [ ] No data loss

**Pass/Fail**: ___________

---

### Test 5.3: Upload Profile Photo

**Goal**: User can change profile photo

**Steps:**
1. Click "Edit Profile"
2. Click "Change Photo"
3. Select image file
4. Crop/adjust (if feature exists)
5. Save

**Expected Results:**
- [ ] File picker opens
- [ ] Image preview shows
- [ ] Can crop/resize (if implemented)
- [ ] Upload progress visible
- [ ] New photo appears immediately
- [ ] Old photo replaced

**Pass/Fail**: ___________

---

## 📱 Test Suite 6: Mobile Experience (10 minutes)

### Test 6.1: Mobile Navigation

**Device**: iPhone or Android phone

**Steps:**
1. Open https://hive.college on mobile
2. Log in
3. Navigate between pages

**Expected Results:**
- [ ] Site loads properly on mobile
- [ ] Navigation menu accessible
- [ ] Hamburger menu works (if present)
- [ ] Bottom nav works (if present)
- [ ] No horizontal scroll
- [ ] Text readable without zooming
- [ ] Images scale correctly

**Pass/Fail**: ___________

---

### Test 6.2: Mobile Touch Targets

**Goal**: All interactive elements tappable

**Steps:**
1. Try tapping all buttons
2. Try tapping links
3. Try tapping form inputs

**Expected Results:**
- [ ] All buttons at least 44px × 44px
- [ ] Easy to tap without mistakes
- [ ] No accidental taps on nearby elements
- [ ] Tap feedback visible (color change, ripple)
- [ ] Forms usable on mobile keyboard

**Pass/Fail**: ___________

---

### Test 6.3: Mobile Performance

**Goal**: Site performs well on mobile

**Steps:**
1. Clear cache
2. Load pages on mobile
3. Time page loads with stopwatch

**Expected Results:**
- [ ] Feed loads < 4s on 4G
- [ ] Spaces page loads < 4s
- [ ] Profile loads < 3s
- [ ] Images lazy load
- [ ] No layout shifts during load
- [ ] Scrolling smooth (60fps)

**Pass/Fail**: ___________

---

## 🚨 Test Suite 7: Error Handling (10 minutes)

### Test 7.1: Network Error

**Goal**: App handles offline gracefully

**Steps:**
1. Open DevTools
2. Network tab → Throttling → Offline
3. Try to load feed
4. Reconnect network

**Expected Results:**
- [ ] Error message appears
- [ ] Clear instructions provided
- [ ] "Retry" button available
- [ ] No crash or blank screen
- [ ] Recovers when connection restored

**Pass/Fail**: ___________

---

### Test 7.2: API Error

**Goal**: App handles server errors

**Steps:**
1. (This requires creating a scenario)
2. Break an API endpoint temporarily
3. Try to use that feature

**Expected Results:**
- [ ] Toast notification with error
- [ ] User-friendly message (not tech jargon)
- [ ] Option to retry
- [ ] No data corruption
- [ ] App remains stable

**Pass/Fail**: ___________

---

### Test 7.3: Form Validation

**Goal**: Forms prevent invalid submissions

**Steps:**
1. Go to profile edit
2. Try to save empty required field
3. Try to submit invalid data

**Expected Results:**
- [ ] Inline validation errors
- [ ] Submit button disabled if invalid
- [ ] Clear error messages
- [ ] Error styling visible (red borders)
- [ ] Errors clear when corrected

**Pass/Fail**: ___________

---

## 📊 Test Results Summary

**Date Tested**: _______________
**Tester Name**: _______________
**Environment**: Production / Staging
**Device(s)**: _______________

### Overall Results

| Test Suite | Total Tests | Passed | Failed | Notes |
|------------|-------------|--------|--------|-------|
| Authentication | 4 | ___ | ___ | |
| Onboarding | 2 | ___ | ___ | |
| Feed | 4 | ___ | ___ | |
| Spaces | 4 | ___ | ___ | |
| Profile | 3 | ___ | ___ | |
| Mobile | 3 | ___ | ___ | |
| Error Handling | 3 | ___ | ___ | |
| **TOTAL** | **23** | ___ | ___ | |

### Pass Rate: _____ %

**Minimum to launch**: 90% pass rate (21/23 tests)

---

## 🐛 Bug Report Template

For any failed test, create a bug report:

**Test ID**: [e.g., Test 1.1]
**Title**: [Short description]
**Priority**: P0 / P1 / P2 / P3
**Steps to Reproduce**:
1.
2.
3.

**Expected**: [What should happen]
**Actual**: [What actually happened]
**Screenshots**: [If applicable]
**Browser/Device**: [Chrome 120, iPhone 15]
**Notes**: [Additional context]

---

## ✅ Launch Readiness

**Can we launch?**

- [ ] **YES** - All critical tests passing (≥ 90%)
- [ ] **NO** - Critical issues found, must fix first
- [ ] **DELAY** - Multiple issues, need more time

**Blocker Issues**: _________________________________

**Go/No-Go Decision**: ___________

**Signed off by**: _______________  **Date**: ___________