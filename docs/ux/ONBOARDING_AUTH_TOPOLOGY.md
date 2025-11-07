# Onboarding & Auth Topology
**From Landing to First Value in < 90 Seconds (Web-First)**

> **Design Philosophy**: "SF polish meets campus chaos"
> **North Star**: Belong fast. Act fast. Feel safe.
> **Aesthetic**: Beautiful utility — Linear's smoothness meets real college life

---

## Vision Alignment

### Why This Onboarding Flow Wins

**Traditional onboarding (Instagram, Discord):**
- Generic profile setup
- Choose interests from 50 categories
- Browse content, maybe follow some accounts
- No immediate utility

**HIVE's approach:**
- **Auto-join based on facts**: Your dorm, your graduating class, your school
- **Immediate local value**: See posts from Ellicott Complex residents about laundry, rides, lost items
- **Zero decision paralysis**: No "pick 10 interests" screens
- **Campus trust**: @buffalo.edu verification = safe, verified network

### The Core Promise
- **Belong fast**: Connected to 3 communities in 60 seconds (Residential + Cohort + School)
- **Act fast**: First post in 90 seconds total
- **Feel safe**: Campus-verified, hyper-local, real students only

### Success Metrics (vBETA)
- **Time to first value**: < 90 seconds (landing → seeing Feed with real posts)
- **Profile completion**: 85%+ reach 100% completion
- **Auto-join success**: 100% (no opt-out during onboarding, can leave later)
- **First action**: 60%+ post or comment within first 5 minutes
- **Next-day retention**: 65%+ return within 24h

---

## User Journey Overview

### The Critical Path (90 seconds on desktop)
```
1. LAND (0s)
   ↓ School tease + email capture
2. VERIFY (20s)
   ↓ Magic link click
3. IDENTIFY (40s)
   ↓ Name, username, photo (optional)
4. USER TYPE (50s)
   ↓ Student / Alumni / Faculty
5. CONTEXTUALIZE (70s)
   ↓ Auto-join 3 spaces (Student: Year → Residence → School)
6. FEED (80s)
   ↓ See real posts from joined spaces
7. ACT (90s)
   ↓ First post to residential space
```

**Mobile:** Add ~30s for slower input, total < 120s target

---

## Design System Foundation (2025 SF/VC Aesthetic)

### Color Palette
```css
/* Backgrounds */
--bg-primary: #0A0A0A;           /* Near black, not pure */
--bg-secondary: #141414;         /* Cards base */
--bg-tertiary: #1A1A1A;          /* Elevated cards */

/* Text */
--text-primary: #FFFFFF;         /* 100% */
--text-secondary: #A0A0A0;       /* 70% */
--text-tertiary: #707070;        /* 50% */

/* Borders */
--border-subtle: #2A2A2A;
--border-medium: rgba(255, 255, 255, 0.1);
--border-gold: rgba(255, 215, 0, 0.2);

/* Accent (Gold Gradient) */
--gold-start: #FFD700;
--gold-end: #FFA500;
--gold-glow: rgba(255, 215, 0, 0.3);

/* Semantic */
--success: #10B981;
--error: #EF4444;
--warning: #F59E0B;
--info: #3B82F6;

/* Glass Morphism */
--glass-bg: rgba(26, 26, 26, 0.9);
--glass-border: rgba(255, 255, 255, 0.05);
--glass-blur: 20px;
```

### Typography
```css
/* Font Family */
font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;

/* Scale */
--text-xs: 12px / 16px;          /* Captions */
--text-sm: 14px / 20px;          /* Body */
--text-base: 16px / 24px;        /* Default */
--text-lg: 18px / 26px;          /* Headings */
--text-xl: 22px / 28px;          /* Titles */
--text-2xl: 28px / 32px;         /* Display */

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;

/* Letter Spacing */
--tracking-tight: -0.02em;       /* Display */
--tracking-normal: -0.01em;      /* Headings */
--tracking-wide: 0;              /* Body */
```

### Spacing (8px Grid)
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
```

### Border Radius
```css
--radius-sm: 8px;                /* Inputs */
--radius-md: 12px;               /* Cards */
--radius-lg: 16px;               /* Modals */
--radius-full: 9999px;           /* Pills, avatars */
```

### Elevation (Glass + Shadow)
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.4);
--shadow-gold: 0 4px 24px rgba(255, 215, 0, 0.4);
```

### Motion (Smooth, Premium)
```css
/* Timing */
--motion-instant: 0ms;           /* Optimistic updates */
--motion-quick: 100ms;           /* Button feedback */
--motion-standard: 160ms;        /* Default */
--motion-slow: 240ms;            /* Modals, sheets */

/* Easing */
--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);   /* Default */
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

---

## Step-by-Step Topology

---

## Step 1: Landing Page (Route: `/`)

### Purpose
Convert visitors to verified students in < 15 seconds. Premium first impression, minimal friction.

### Spatial Layout - Desktop (Primary)

```
┌─────────────────────────────────────────────────────────────────┐
│ HIVE                                                  [Sign In] │ <- Nav (sticky)
└─────────────────────────────────────────────────────────────────┘

        ┌─────────────────────────────────────────────┐
        │                                             │
        │          [HIVE Logo - Gold Hexagon]         │
        │              Subtle glow, 3D                │
        │                                             │
        │      Your campus, actually useful.          │ <- Display 2xl
        │                                             │
        │   Find rides. Organize spaces. Connect.     │ <- Text lg
        │            Verified students only.          │
        │                                             │
        │   ┌─────────────────────────────────┐      │
        │   │ your@buffalo.edu                │      │ <- Input (glass)
        │   └─────────────────────────────────┘      │
        │                                             │
        │   [Continue →]                              │ <- Gold gradient CTA
        │                                             │
        └─────────────────────────────────────────────┘

                ──────── Live Campus ────────

        🔒 Harvard (Opening Feb 2025)
        🔒 MIT (2,847 on waitlist)
        🔒 Stanford (Opening Spring)
        ✓ UB Buffalo (Live Now)

        [Other school? Join waitlist →]

        Privacy · Security · @buffalo.edu verified
```

### Spatial Layout - Mobile
```
┌─────────────────────────────┐
│ HIVE              [Sign In] │
├─────────────────────────────┤
│                             │
│      [HIVE Logo]            │
│                             │
│  Your campus,               │
│  actually useful.           │
│                             │
│  Find rides. Organize       │
│  spaces. Connect verified.  │
│                             │
│  [your@buffalo.edu]         │
│  [Continue →]               │
│                             │
│  ──── Live Campus ────      │
│                             │
│  🔒 Harvard (Feb)           │
│  🔒 MIT (2,847 wait)        │
│  ✓ UB Buffalo               │
│                             │
│  [Other? Waitlist →]        │
│                             │
│  Privacy · Security         │
└─────────────────────────────┘
```

### Visual Treatment

#### Hero Section (Desktop)
```css
.hero-container {
  max-width: 600px;
  margin: 120px auto 80px;
  text-align: center;
}

.hive-logo {
  width: 120px;
  height: 120px;
  margin: 0 auto 32px;
  filter: drop-shadow(0 8px 32px rgba(255, 215, 0, 0.4));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.hero-title {
  font-size: 28px;
  line-height: 32px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 18px;
  line-height: 26px;
  color: var(--text-secondary);
  margin-bottom: 48px;
}
```

#### Email Input (Glass Treatment)
```css
.email-input {
  width: 100%;
  height: 56px;
  padding: 0 24px;
  font-size: 16px;
  color: var(--text-primary);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  transition: all var(--motion-standard) var(--ease-smooth);
}

.email-input:focus {
  border-color: var(--border-gold);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
  outline: none;
}

.email-input::placeholder {
  color: var(--text-tertiary);
}
```

#### CTA Button (Gold Gradient)
```css
.cta-button {
  width: 100%;
  height: 56px;
  margin-top: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  background: linear-gradient(135deg, var(--gold-start), var(--gold-end));
  border: none;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-gold);
  cursor: pointer;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 32px rgba(255, 215, 0, 0.5);
}

.cta-button:active {
  transform: scale(0.98);
}

.cta-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

#### School Tease List
```css
.school-list {
  max-width: 400px;
  margin: 80px auto 0;
  text-align: center;
}

.school-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  margin-bottom: 8px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  font-size: 16px;
  color: var(--text-secondary);
  transition: all var(--motion-standard) var(--ease-smooth);
}

.school-item.live {
  border-color: rgba(16, 185, 129, 0.3);
  color: var(--text-primary);
}

.school-item.live::before {
  content: "✓";
  color: var(--success);
  font-weight: 600;
}
```

### Cognitive Budget
- **Headlines**: 2 lines max (10 words total)
- **Email input**: Single field
- **CTAs**: 1 primary (Continue), 1 secondary (Sign In)
- **School list**: 4 schools visible (3 locked, 1 live)
- **No scroll required**: Primary CTA above fold

### Emotional Mode
**Calm → Premium**
- Landing: Calm, professional, trustworthy
- Hover CTA: Gold glow intensifies, subtle lift
- Input focus: Gold border highlight
- Submit: Quick scale feedback (100ms)

### Components Needed
- `<LandingHero />` - Centered hero with floating logo
- `<GlassEmailInput />` - Glass morphism input with validation
- `<GoldGradientButton />` - Premium CTA with hover glow
- `<SchoolTeaseList />` - Lock/live indicators
- `<LandingFooter />` - Privacy, security links

### Interaction Timeline
```
1. Page load (0ms)
   - Hero fades in (400ms ease-smooth)
   - Logo float animation starts
   - Email input auto-focuses (desktop only)

2. User types email (realtime)
   - Auto-suggest @buffalo.edu domain
   - Validate format: /^[a-z0-9._%+-]+@buffalo\.edu$/i
   - Show inline validation (✓ Valid / ⚠️ Use @buffalo.edu)

3. Press Enter or click "Continue" (100ms scale feedback)
   - Disable button, show inline spinner
   - POST /api/auth/send-magic-link
   - Success: Navigate to /auth/check-email
   - Error: Inline message "Email already registered" or "Server error"

Total: ~10-15 seconds
```

### States to Handle
1. **Default**: Clean, premium, email focused
2. **Email typing**: Auto-suggest visible, realtime validation
3. **Email valid**: Subtle green checkmark, CTA enabled
4. **Email invalid**: Orange warning icon, "Use your @buffalo.edu email"
5. **Submitting**: CTA spinner, form disabled, maintain button size
6. **Error - Already registered**: "Email registered. [Sign in instead]"
7. **Error - Rate limited**: "Too many attempts. Try again in 5 minutes."
8. **Error - Server**: "Connection error. [Retry]"

### Performance Target
- **FCP**: < 600ms (First Contentful Paint)
- **LCP**: < 1.0s (Hero text + email input visible)
- **TTI**: < 1.2s (Email input interactive)
- **Total bundle**: < 150KB (landing page only)

### Edge Cases
- **Non-@buffalo.edu email**: Block with message "HIVE is currently for @buffalo.edu students only. [Join waitlist for other schools →]"
- **Already registered email**: Show "Already have an account? [Sign in →]"
- **Disposable email**: Detect common patterns, block with "Please use your official campus email"
- **Network offline**: Show offline banner, "Check connection and retry"

---

## Step 2: Email Verification (Routes: `/auth/check-email`, `/auth/verify`)

### Purpose
Confirm @buffalo.edu ownership, establish campus trust anchor.

### Spatial Layout - Check Email Screen (Desktop)

```
┌─────────────────────────────────────────────────────────────────┐
│ HIVE                                                  [Sign In] │
└─────────────────────────────────────────────────────────────────┘

        ┌─────────────────────────────────────────────┐
        │                                             │
        │          [Envelope Icon - Minimal]          │
        │                                             │
        │              Check email                    │
        │                                             │
        │   Verification sent to:                     │
        │   sarah.chen@buffalo.edu                    │
        │                                             │
        │   Click the link to verify your account.    │
        │   (Link expires in 15 minutes)              │
        │                                             │
        │   [Resend]      [Change email]              │
        │                                             │
        └─────────────────────────────────────────────┘
```

### Spatial Layout - Verify Success (After Magic Link Click)

```
        ┌─────────────────────────────────────────────┐
        │                                             │
        │          [Checkmark - Gold Glow]            │
        │                                             │
        │            Email verified                   │
        │                                             │
        │   Redirecting to setup...                   │
        │                                             │
        └─────────────────────────────────────────────┘
```

### Visual Treatment

#### Check Email Card
```css
.verification-card {
  max-width: 480px;
  margin: 160px auto;
  padding: 64px 48px;
  text-align: center;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.envelope-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 32px;
  color: var(--text-tertiary);
}

.verification-title {
  font-size: 22px;
  line-height: 28px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.email-display {
  display: inline-block;
  padding: 12px 20px;
  margin: 16px 0;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: var(--radius-sm);
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
  font-size: 14px;
  color: var(--gold-start);
}
```

#### Resend Button (Throttled)
```css
.resend-button {
  padding: 12px 24px;
  margin-top: 24px;
  font-size: 14px;
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.resend-button:hover:not(:disabled) {
  border-color: var(--border-gold);
  color: var(--gold-start);
}

.resend-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
```

### Cognitive Budget
- **Text blocks**: 3 lines max
- **CTAs**: 2 (Resend, Change email)
- **No distractions**: Focus on "check email" instruction

### Emotional Mode
**Focus**
- Minimal UI, spotlight on instruction
- Subtle pulse on resend button after 60s
- Calm reassurance ("Usually arrives in < 1 minute")

### Components Needed
- `<EmailCheckScreen />` - Waiting state with polling
- `<VerifySuccessScreen />` - Checkmark with auto-redirect
- `<ResendButton />` - Throttled, max 3 attempts
- `<ChangeEmailLink />` - Return to landing

### Interaction Timeline
```
1. Land on /auth/check-email (0s)
   - Show email address sent to
   - Start polling /api/auth/check-verification every 3s
   - If verified → auto-redirect to /onboarding/identity

2. User clicks "Resend" (optional)
   - Disable button for 60s
   - POST /api/auth/resend-magic-link
   - Show toast "Email sent"
   - Start 60s countdown on button label

3. User clicks magic link in email (~20s average)
   - GET /auth/verify?token=xxx
   - Verify token server-side
   - Set session cookie (httpOnly, secure, sameSite: lax)
   - Show success checkmark (800ms)
   - Redirect to /onboarding/identity

Total: ~20-40 seconds (depends on email provider speed)
```

### States to Handle
1. **Waiting**: Polling for verification, resend available after 60s
2. **Resending**: Button disabled with countdown "Resend (47s)"
3. **Resend success**: Toast "Email sent", reset countdown
4. **Resend limit**: After 3 attempts, "Too many requests. Contact support."
5. **Token verified**: Success checkmark, auto-redirect
6. **Token expired**: Error "Link expired. [Request new one →]"
7. **Token invalid**: Error "Invalid link. [Restart signup →]"
8. **Already verified**: Skip to next step

### Performance Target
- **Polling interval**: 3s (balance responsiveness + server load)
- **Token expiry**: 15 minutes
- **Max resend attempts**: 3
- **Auto-redirect delay**: 800ms (show success first)

### Edge Cases
- **Email not arriving**: After 2 min, show help text "Check spam folder, whitelist @hive.app"
- **User closes tab**: Magic link still works (stateless verification)
- **Multiple devices**: First device to verify wins, others redirect to app
- **Expired token**: Clear error, restart flow from landing
- **Network error during polling**: Retry with exponential backoff, max 30s

---

## Step 3: Identity Setup (Route: `/onboarding/identity`)

### Purpose
Capture essential identity (name, username, photo) for social features. Fast, minimal, 3 fields max.

### Spatial Layout - Desktop

```
┌─────────────────────────────────────────────────────────────────┐
│ HIVE                                                       [2/6] │
└─────────────────────────────────────────────────────────────────┘

        ┌─────────────────────────────────────────────┐
        │                                             │
        │                Identity                     │
        │                                             │
        │        [Avatar Upload Circle - 96px]        │
        │              Optional                       │
        │                                             │
        │   First name                                │
        │   ┌─────────────────────────────────┐      │
        │   │ Sarah                           │      │
        │   └─────────────────────────────────┘      │
        │                                             │
        │   Last name                                 │
        │   ┌─────────────────────────────────┐      │
        │   │ Chen                            │      │
        │   └─────────────────────────────────┘      │
        │                                             │
        │   Username                                  │
        │   ┌─────────────────────────────────┐      │
        │   │ @sarahchen              ✓       │      │
        │   └─────────────────────────────────┘      │
        │   Available                                 │
        │                                             │
        │                            [Continue →]     │
        │                                             │
        └─────────────────────────────────────────────┘
```

### Visual Treatment

#### Identity Card
```css
.identity-card {
  max-width: 540px;
  margin: 80px auto;
  padding: 64px 48px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 48px;
}
```

#### Avatar Upload Circle
```css
.avatar-upload {
  position: relative;
  width: 96px;
  height: 96px;
  margin: 0 auto 48px;
  cursor: pointer;
}

.avatar-circle {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, #2A2A2A, #1A1A1A);
  border: 2px dashed var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--motion-standard) var(--ease-smooth);
  overflow: hidden;
}

.avatar-circle:hover {
  border-color: var(--border-gold);
  border-style: solid;
}

.avatar-placeholder {
  font-size: 14px;
  color: var(--text-tertiary);
  text-align: center;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-upload-label {
  display: block;
  margin-top: 12px;
  font-size: 12px;
  color: var(--text-tertiary);
  text-align: center;
}
```

#### Glass Input Fields
```css
.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.glass-input {
  width: 100%;
  height: 56px;
  padding: 0 20px;
  font-size: 16px;
  color: var(--text-primary);
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  transition: all var(--motion-standard) var(--ease-smooth);
}

.glass-input:focus {
  border-color: var(--border-gold);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
  outline: none;
}

.glass-input.valid {
  border-color: rgba(16, 185, 129, 0.3);
}

.glass-input.invalid {
  border-color: rgba(239, 68, 68, 0.3);
}
```

#### Username Input with Validation
```css
.username-group {
  position: relative;
}

.username-status {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--success);
}

.username-status.checking {
  color: var(--text-tertiary);
}

.username-status.taken {
  color: var(--error);
}

.username-helper {
  margin-top: 8px;
  font-size: 12px;
  color: var(--text-tertiary);
}

.username-helper.available {
  color: var(--success);
}

.username-helper.taken {
  color: var(--error);
}
```

### Cognitive Budget
- **Fields**: 3 total (First name, Last name, Username)
- **Photo**: Optional, not blocking
- **Validation**: Inline, realtime
- **No other questions**: Major, bio, interests come later

### Emotional Mode
**Calm → Premium**
- Clean form, generous spacing
- Username availability = subtle green indicator
- Photo upload success = 160ms scale animation
- Focus states = gold border glow

### Components Needed
- `<ProgressIndicator />` - [2/6] top-right
- `<AvatarUploadCircle />` - Click to upload, crop modal
- `<GlassInput />` - Labeled input with validation states
- `<UsernameInput />` - Special input with realtime availability check
- `<GoldGradientButton />` - Continue CTA

### Interaction Timeline
```
1. Page load (0s)
   - Card fades in (400ms)
   - Auto-focus first name input
   - Pre-fill from email if possible (sarah.chen@buffalo.edu → First: Sarah, Last: Chen)

2. User types name (~5s)
   - Realtime validation (letters/spaces only, max 50 chars)
   - Auto-suggest username (@sarahchen) after both names filled

3. User types username (~5s)
   - Remove @ if user types it (auto-prepend)
   - Debounced check /api/auth/check-username?q=sarahchen (300ms delay)
   - Show status: [Loading...] → [✓ Available] or [✗ Taken]
   - If taken, suggest alternatives: @sarahchen1, @sarah_chen, @schen

4. User uploads photo (optional, ~10s)
   - Click avatar circle
   - File picker (accept: image/jpeg, image/png, max 2MB)
   - Open crop modal (1:1 square, drag to reposition)
   - POST /api/profile/upload-avatar (FormData)
   - Show progress bar
   - Update avatar circle with uploaded image

5. Click "Continue" (100ms scale feedback)
   - Validate all required fields
   - POST /api/onboarding/complete-identity
   - Navigate to /onboarding/user-type

Total: ~20-30 seconds
```

### States to Handle
1. **Default**: Clean form, first name focused, all empty
2. **Name typing**: Realtime validation, suggestions appear
3. **Username typing**: Debounced check, [Loading...] → [✓ Available] / [✗ Taken]
4. **Username available**: Green checkmark, "Available" helper text
5. **Username taken**: Red X, "Taken. Try: @sarahchen1, @sarah_chen"
6. **Username invalid**: Orange warning, "3-20 characters, letters/numbers/underscore only"
7. **Photo uploading**: Progress bar, disable "Continue"
8. **Photo uploaded**: Avatar circle shows image, 160ms scale animation
9. **Photo error**: Toast "Upload failed, try again (max 2MB)"
10. **Submitting**: Button disabled with spinner
11. **Validation errors**: Red borders, inline error messages

### Performance Target
- **Username check**: < 200ms API response
- **Photo upload**: < 3s for 2MB image
- **Form validation**: Instant (<50ms)
- **Auto-suggest**: Triggered immediately after both names filled

### Edge Cases
- **No photo uploaded**: Use initials avatar (gold background, white letters "SC")
- **Photo too large**: Auto-compress client-side before upload (target: 500KB)
- **Photo wrong format**: Accept only JPG/PNG, show error "Please upload JPG or PNG"
- **Username unavailable**: Show 3 suggestions algorithmically generated
- **Offensive username**: Blocklist check server-side, reject with "Username not allowed"
- **Network error during upload**: Retry with exponential backoff (3 attempts)
- **User refreshes mid-flow**: Form data saved to localStorage, restore on load

### Validation Rules
```typescript
const validationRules = {
  firstName: {
    required: true,
    minLength: 1,
    maxLength: 50,
    pattern: /^[a-zA-Z\s\-']+$/,  // Letters, spaces, hyphens, apostrophes
    errorMessages: {
      required: "First name is required",
      pattern: "Only letters allowed",
      maxLength: "Max 50 characters"
    }
  },

  lastName: {
    required: true,
    minLength: 1,
    maxLength: 50,
    pattern: /^[a-zA-Z\s\-']+$/,
    errorMessages: {
      required: "Last name is required",
      pattern: "Only letters allowed",
      maxLength: "Max 50 characters"
    }
  },

  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-z0-9_]+$/,       // Lowercase, numbers, underscore
    unique: true,                   // Server-side check
    errorMessages: {
      required: "Username is required",
      minLength: "Min 3 characters",
      maxLength: "Max 20 characters",
      pattern: "Only letters, numbers, underscore",
      unique: "Username taken"
    }
  },

  avatar: {
    required: false,
    maxSize: 2 * 1024 * 1024,      // 2MB
    allowedTypes: ['image/jpeg', 'image/png'],
    errorMessages: {
      maxSize: "Max file size: 2MB",
      allowedTypes: "Only JPG and PNG allowed"
    }
  }
};
```

---

## Step 4: User Type Selection (Route: `/onboarding/user-type`)

### Purpose
Fork onboarding based on user type. Students, alumni, and faculty have different value props and flows.

### Spatial Layout - Desktop

```
┌─────────────────────────────────────────────────────────────────┐
│ HIVE                                                       [3/6] │
└─────────────────────────────────────────────────────────────────┘

        ┌─────────────────────────────────────────────┐
        │                                             │
        │            Account type                     │
        │                                             │
        │   ○ Student                                 │
        │     Current enrollment                      │
        │                                             │
        │   ○ Alumni                                  │
        │     UB graduate                             │
        │                                             │
        │   ○ Faculty                                 │
        │     Staff or instructor                     │
        │                                             │
        │                                             │
        │                            [Continue →]     │
        │                                             │
        └─────────────────────────────────────────────┘
```

### Visual Treatment

#### Radio Options
```css
.user-type-option {
  padding: 24px;
  margin-bottom: 16px;
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.user-type-option:hover {
  border-color: var(--border-gold);
  background: rgba(26, 26, 26, 0.8);
}

.user-type-option.selected {
  border-color: var(--gold-start);
  background: rgba(255, 215, 0, 0.05);
}

.option-label {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.option-description {
  font-size: 14px;
  color: var(--text-secondary);
  margin-left: 36px;
}

.radio-circle {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  border: 2px solid var(--border-subtle);
  position: relative;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.radio-circle::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--gold-start);
  transition: transform var(--motion-quick) var(--ease-smooth);
}

.user-type-option.selected .radio-circle {
  border-color: var(--gold-start);
}

.user-type-option.selected .radio-circle::after {
  transform: translate(-50%, -50%) scale(1);
}
```

### Cognitive Budget
- **Options**: 3 (Student, Alumni, Faculty)
- **CTAs**: 1 (Continue)
- **No multi-select**: Single choice, can change in settings later

### Emotional Mode
**Calm**
- Simple selection, no pressure
- Clear descriptions
- Smooth selection animation

### Components Needed
- `<RadioOption />` - Custom radio with description
- `<GoldGradientButton />` - Continue CTA

### Interaction Timeline
```
1. Page load (0s)
   - Card fades in (400ms)
   - No pre-selection (force intentional choice)

2. User clicks option (~3s)
   - 100ms scale feedback
   - Radio dot animates in (160ms)
   - Enable "Continue" button

3. Click "Continue" (100ms scale feedback)
   - POST /api/onboarding/set-user-type { type: 'student' }
   - Navigate based on type:
     - Student → /onboarding/student-context
     - Alumni → /onboarding/alumni-context
     - Faculty → /onboarding/faculty-request

Total: ~5 seconds
```

### States to Handle
1. **Default**: No selection, Continue disabled
2. **Option selected**: Radio filled, Continue enabled
3. **Submitting**: Button disabled with spinner

### Performance Target
- **Selection feedback**: < 100ms
- **API call**: < 300ms

---

## Step 5A: Student Contextualization (Routes: `/onboarding/student-context`)

### Purpose
Auto-join students to 3 spaces based on objective facts: Graduation year → Residential → School

### 5A-1: Graduation Year → Class Cohort

```
┌─────────────────────────────────────────────────────────────────┐
│ HIVE                                                       [4/6] │
└─────────────────────────────────────────────────────────────────┘

        ┌─────────────────────────────────────────────┐
        │                                             │
        │          Graduation year                    │
        │                                             │
        │   ┌─────────────────────────────────┐      │
        │   │ 2025 ▼                          │      │
        │   └─────────────────────────────────┘      │
        │                                             │
        │   Options:                                  │
        │   • 2025                                    │
        │   • 2026                                    │
        │   • 2027                                    │
        │   • 2028                                    │
        │   • Graduate Student                        │
        │                                             │
        │   Joining                                   │
        │   Class of 2025                             │
        │   1,847 students                            │
        │                                             │
        │                            [Continue →]     │
        │                                             │
        └─────────────────────────────────────────────┘
```

### 5A-2: Residential Location → Local Space

```
┌─────────────────────────────────────────────────────────────────┐
│ HIVE                                                       [5/6] │
└─────────────────────────────────────────────────────────────────┘

        ┌─────────────────────────────────────────────┐
        │                                             │
        │             Residence                       │
        │                                             │
        │   On Campus                                 │
        │   ○ Ellicott Complex                        │
        │   ○ Governors                               │
        │   ○ South Campus Apartments                 │
        │   ○ Creekside Village                       │
        │                                             │
        │   Off Campus                                │
        │   ○ Off-campus (general)                    │
        │                                             │
        │   Joining                                   │
        │   Ellicott Complex                          │
        │   342 residents                             │
        │                                             │
        │                            [Continue →]     │
        │                                             │
        └─────────────────────────────────────────────┘
```

### 5A-3: School/College → Academic Space

```
┌─────────────────────────────────────────────────────────────────┐
│ HIVE                                                       [6/6] │
└─────────────────────────────────────────────────────────────────┘

        ┌─────────────────────────────────────────────┐
        │                                             │
        │               School                        │
        │                                             │
        │   ○ School of Engineering                   │
        │   ○ College of Arts & Sciences              │
        │   ○ School of Management                    │
        │   ○ School of Nursing                       │
        │   ○ School of Architecture                  │
        │   ... 7 more                                │
        │                                             │
        │   Joining                                   │
        │   School of Engineering                     │
        │   2,134 students                            │
        │                                             │
        │                            [Continue →]     │
        │                                             │
        └─────────────────────────────────────────────┘
```

**Total student onboarding: 3 auto-joins (Cohort + Residential + School)**

### Visual Treatment - Dropdown (Year)
```css
.dropdown-select {
  width: 100%;
  height: 56px;
  padding: 0 20px;
  font-size: 16px;
  color: var(--text-primary);
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  cursor: pointer;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=UTF-8,...'); /* Chevron down */
  background-repeat: no-repeat;
  background-position: right 20px center;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.dropdown-select:focus {
  border-color: var(--border-gold);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
  outline: none;
}
```

### Visual Treatment - Radio List (Residence, School)
```css
.radio-list-option {
  padding: 20px 24px;
  margin-bottom: 12px;
  background: rgba(20, 20, 20, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.radio-list-option:hover {
  border-color: rgba(255, 215, 0, 0.3);
  background: rgba(20, 20, 20, 0.6);
}

.radio-list-option.selected {
  border-color: var(--gold-start);
  background: rgba(255, 215, 0, 0.05);
}
```

### Visual Treatment - Join Confirmation
```css
.join-confirmation {
  margin-top: 32px;
  padding: 24px;
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: var(--radius-md);
}

.join-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--gold-start);
  margin-bottom: 8px;
}

.join-space-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.join-member-count {
  font-size: 14px;
  color: var(--text-secondary);
}
```

### Cognitive Budget (Per Step)
- **Options**: 5-12 (Year: 5, Residence: 5, School: 12)
- **Selection**: Radio (single choice)
- **Confirmation**: 1 line (space name + member count)
- **No explanations**: Straightforward, no help text needed

### Emotional Mode
**Calm → Warm**
- Simple selections
- Gold highlight on selected option
- Join confirmation = warm gold accent

### Components Needed
- `<DropdownSelect />` - Graduation year picker
- `<RadioListOption />` - Residential/school options
- `<JoinConfirmation />` - Gold-bordered preview of space
- `<GoldGradientButton />` - Continue CTA

### Interaction Timeline
```
STEP 1: Graduation Year
1. Page load (0s)
   - Card fades in
   - Dropdown focused

2. User selects year (~5s)
   - Dropdown opens with 5 options
   - User clicks "2025"
   - Join confirmation appears (160ms fade in)
   - "Joining: Class of 2025 (1,847 students)"

3. Click Continue (100ms feedback)
   - POST /api/onboarding/join-cohort { year: 2025 }
   - Navigate to residence step

STEP 2: Residential Location
1. Page load (0s)
   - Card fades in
   - 5 radio options visible

2. User selects residence (~5s)
   - Click "Ellicott Complex"
   - 100ms selection animation
   - Join confirmation updates
   - "Joining: Ellicott Complex (342 residents)"

3. Click Continue
   - POST /api/spaces/ellicott-complex/join
   - Navigate to school step

STEP 3: School/College
1. Page load (0s)
   - Card fades in
   - 12 radio options (scrollable if needed)

2. User selects school (~5s)
   - Click "School of Engineering"
   - Join confirmation updates
   - "Joining: School of Engineering (2,134 students)"

3. Click Continue
   - POST /api/spaces/school-of-engineering/join
   - POST /api/onboarding/complete
   - Navigate to /feed with welcome banner

Total for all 3 steps: ~20 seconds
```

### States to Handle
1. **Default**: No selection, Continue disabled
2. **Option selected**: Radio filled, join confirmation visible, Continue enabled
3. **Submitting**: Button spinner, optimistic join (show space immediately)
4. **Join error**: Rollback, show toast "Failed to join, try again"

### Performance Target
- **Selection feedback**: < 100ms
- **Join API**: < 500ms (optimistic update, no waiting)
- **Step transitions**: 160ms fade

### Auto-Join Rules
**Student gets 3 spaces:**
1. **Class cohort** (e.g., `spaces/class-of-2025`)
2. **Residential** (e.g., `spaces/ellicott-complex`)
3. **School** (e.g., `spaces/school-of-engineering`)

**Important notes:**
- Cannot skip any step
- Can leave spaces later from Profile settings
- Spaces auto-created if they don't exist (admin-seeded on platform launch)

---

## Step 5B: Alumni Contextualization (Route: `/onboarding/alumni-context`)

### Purpose
Minimal onboarding for alumni. Cohort only, big "More coming soon" banner.

### Spatial Layout - Desktop

```
┌─────────────────────────────────────────────────────────────────┐
│ HIVE                                                       [4/4] │
└─────────────────────────────────────────────────────────────────┘

        ┌─────────────────────────────────────────────┐
        │                                             │
        │          Graduation year                    │
        │                                             │
        │   ┌─────────────────────────────────┐      │
        │   │ 2015 ▼                          │      │
        │   └─────────────────────────────────┘      │
        │                                             │
        │   Joining                                   │
        │   Class of 2015 Alumni                      │
        │   1,247 members                             │
        │                                             │
        │   ┌─────────────────────────────────┐      │
        │   │ 🚀 More Coming Soon             │      │
        │   │                                 │      │
        │   │ • Regional networks             │      │
        │   │ • Career groups                 │      │
        │   │ • Mentorship portal             │      │
        │   │                                 │      │
        │   │ Spring 2025                     │      │
        │   └─────────────────────────────────┘      │
        │                                             │
        │                  [Continue to Feed →]       │
        │                                             │
        └─────────────────────────────────────────────┘
```

### Visual Treatment - Coming Soon Banner
```css
.coming-soon-banner {
  margin-top: 32px;
  padding: 32px 24px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: var(--radius-md);
}

.banner-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.banner-list {
  list-style: none;
  margin-bottom: 20px;
}

.banner-list-item {
  padding: 8px 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.banner-list-item::before {
  content: "•";
  margin-right: 12px;
  color: #3B82F6;
}

.banner-date {
  font-size: 14px;
  font-weight: 600;
  color: #3B82F6;
}
```

### Alumni Capabilities
```
✅ Browse campus Feed (read-only)
✅ Post/comment in alumni cohort space only
❌ No access to student residential/school spaces
✅ See "Alumni Early Access" banner on Feed
```

### Alumni Feed Banner (After Onboarding)
```
┌─────────────────────────────────────────────────────────────────┐
│ 🎖️ Alumni Early Access                                          │
│ You're in! Full alumni features launching Spring 2025.          │
│ For now, stay connected with your cohort.          [Dismiss]    │
└─────────────────────────────────────────────────────────────────┘
```

### Interaction Timeline
```
1. Select graduation year (~5s)
   - Dropdown: 2024, 2023, ..., 1990s, 1980s
   - Join confirmation appears
   - "More coming soon" banner visible

2. Click Continue (100ms feedback)
   - POST /api/onboarding/join-alumni-cohort { year: 2015 }
   - POST /api/onboarding/complete
   - Navigate to /feed with alumni banner

Total: ~8 seconds
```

---

## Step 5C: Faculty Request Flow (Route: `/onboarding/faculty-request`)

### Purpose
Collect faculty space requests. Zero product functionality, pure data collection.

### Spatial Layout - Desktop

```
┌─────────────────────────────────────────────────────────────────┐
│ HIVE                                                       [4/4] │
└─────────────────────────────────────────────────────────────────┘

        ┌─────────────────────────────────────────────┐
        │                                             │
        │         Faculty Space Request               │
        │                                             │
        │   HIVE is student-focused for now.          │
        │   Faculty spaces coming soon!               │
        │                                             │
        │   Request early access:                     │
        │                                             │
        │   Full name                                 │
        │   ┌─────────────────────────────────┐      │
        │   │ Dr. Jane Smith              │      │
        │   └─────────────────────────────────┘      │
        │                                             │
        │   Department                                │
        │   ┌─────────────────────────────────┐      │
        │   │ Computer Science                │      │
        │   └─────────────────────────────────┘      │
        │                                             │
        │   Space purpose                             │
        │   ○ Course (e.g., CSE 115)                  │
        │   ○ Research lab                            │
        │   ○ Department hub                          │
        │   ○ Office hours                            │
        │   ○ Other: __________                       │
        │                                             │
        │   Expected members                          │
        │   ┌─────────────────────────────────┐      │
        │   │ ~50 students                    │      │
        │   └─────────────────────────────────┘      │
        │                                             │
        │   Why do you need this?                     │
        │   ┌─────────────────────────────────┐      │
        │   │ [Textarea]                      │      │
        │   └─────────────────────────────────┘      │
        │                                             │
        │                    [Submit Request →]       │
        │                                             │
        └─────────────────────────────────────────────┘
```

### After Submission

```
        ┌─────────────────────────────────────────────┐
        │                                             │
        │          ✓ Request Submitted                │
        │                                             │
        │          Thanks, Dr. Smith!                 │
        │                                             │
        │   We're prioritizing faculty spaces         │
        │   for Spring 2025.                          │
        │                                             │
        │   You'll get an email when:                 │
        │   • Your space is approved                  │
        │   • Faculty features launch                 │
        │                                             │
        │   In the meantime, bookmark HIVE            │
        │   for your students!                        │
        │                                             │
        │                        [Done]               │
        │                                             │
        └─────────────────────────────────────────────┘
```

### Faculty Capabilities
```
✅ Submit space request
❌ No Feed access (until space approved)
❌ No posting capabilities
✅ Email notification when faculty features launch
```

### Interaction Timeline
```
1. Fill form (~30s)
   - Name, department, purpose, size, justification

2. Click Submit (100ms feedback)
   - POST /api/faculty/request-space
   - Show success screen

3. Click Done
   - Navigate to confirmation page or close

Total: ~35 seconds
```

---

## Step 6: Welcome to Feed (Route: `/feed`)

### Purpose
**First value delivery**: Show real posts from auto-joined spaces within 90 seconds of landing.

### Spatial Layout - Desktop (Web-First)

```
┌─────────────────────────────────────────────────────────────────┐
│ HIVE      [Search ⌘K]                      [Notif]  [@sarahchen]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ Welcome. You're connected to 3 spaces.      [Dismiss]   │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   [All]  [My Spaces]  [Events]                                 │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ @mike • 2h • Photography                                │  │
│   │                                                         │  │
│   │ Sunset at Lake LaSalle                                  │  │
│   │                                                         │  │
│   │ [Image - 16:9]                                          │  │
│   │                                                         │  │
│   │ ↑ 24   💬 5   ⤴ 2                            [Share]    │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ @alex • 4h • Ellicott Complex                           │  │
│   │                                                         │  │
│   │ Who's going to Wegmans? I have a car, room for 3        │  │
│   │                                                         │  │
│   │ ↑ 12   💬 8                                  [Share]    │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   (Infinite scroll...)                                          │
│                                                                 │
│   [Floating Composer FAB - Gold]                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Visual Treatment - Welcome Banner
```css
.welcome-banner {
  padding: 20px 32px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.1));
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.welcome-text {
  font-size: 16px;
  color: var(--text-primary);
}

.dismiss-button {
  padding: 8px 16px;
  font-size: 14px;
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.dismiss-button:hover {
  color: var(--text-primary);
  border-color: var(--border-gold);
}
```

### Visual Treatment - Filter Chips
```css
.filter-chips {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.filter-chip {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.filter-chip:hover {
  color: var(--text-primary);
  border-color: var(--border-gold);
}

.filter-chip.active {
  color: #000;
  background: linear-gradient(135deg, var(--gold-start), var(--gold-end));
  border-color: transparent;
  box-shadow: var(--shadow-gold);
}
```

### Visual Treatment - Post Cards (Already Built!)
The PostCard component already has the correct aesthetic:
- Glass morphism background
- Subtle borders
- Smooth hover animations (120ms lift)
- Gold accents on upvoted state
- 160ms entry animations with stagger

```css
/* From post-card.tsx - already correct! */
.post-card {
  background: rgba(26, 26, 26, 0.3);
  backdrop-filter: blur-sm;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 24px;
  transition: all 200ms ease-out;
}

.post-card:hover {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(26, 26, 26, 0.5);
  transform: translateY(-2px);
}
```

### Visual Treatment - Floating Composer FAB
```css
.composer-fab {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--gold-start), var(--gold-end));
  border: none;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-gold);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--motion-standard) var(--ease-smooth);
  z-index: 100;
}

.composer-fab:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 40px rgba(255, 215, 0, 0.6);
}

.composer-fab:active {
  transform: scale(0.95);
}

.composer-fab-icon {
  width: 24px;
  height: 24px;
  color: #000;
}
```

### Cognitive Budget
- **Welcome banner**: 1 line, dismissible
- **Filter chips**: 3 max (All, My Spaces, Events)
- **Posts**: 5 visible before scroll
- **Primary CTA**: FAB (gold, bottom-right)

### Emotional Mode
**Celebrate → Calm**
- Welcome banner: Subtle gold gradient (no confetti unless first post)
- Posts animate in: Stagger 160ms
- Transitions to calm browsing

### Components Needed
- `<WelcomeBanner />` - One-time, dismissible
- `<FilterChips />` - All, My Spaces, Events
- `<PostCard />` - **Already built with animations!** ✅
- `<FloatingComposerFAB />` - Gold gradient button
- `<InfiniteScroll />` - Lazy load, prefetch at 70%

### Interaction Timeline
```
1. Navigate to /feed (0s)
   - Show welcome banner (160ms fade in)
   - Fetch first 10 posts: GET /api/feed?limit=10
   - Show skeletons while loading

2. Posts load (~500ms)
   - Stagger animate in (160ms each, 50ms delay between)
   - Banner auto-dismisses after 10s (or user clicks Dismiss)

3. User scrolls (~10s browsing)
   - At 70% scroll, prefetch next 10 posts
   - Infinite scroll until exhausted

4. User clicks FAB (~20s)
   - Open Composer sheet (240ms slide up)
   - Dim background with scrim (backdrop-filter)
   - [User makes first post - Step 7]

Total: Feed visible at ~80-90s from landing
```

### States to Handle
1. **Loading first batch**: Skeleton cards (5 placeholders)
2. **Loaded**: Posts visible, welcome banner showing
3. **Banner dismissed**: User clicks X or auto-dismiss after 10s
4. **Empty feed**: "No posts yet! Join more spaces or be the first to post"
5. **End of feed**: "You're all caught up ✓" footer
6. **Error loading**: "Failed to load posts. [Retry]"
7. **Offline**: Cached posts visible, banner "You're offline"

### Performance Target
- **Feed load**: < 1.0s (warm cache), < 1.5s (cold)
- **Infinite scroll**: < 400ms for next batch
- **Post interactions**: < 150ms (upvote, comment tap)
- **FAB tap to Composer open**: 240ms total

---

## Step 7: First Post (Composer Sheet, Z1 Overlay)

### Purpose
Complete onboarding with a **real action**: First post to residential space. This locks in engagement.

### Spatial Layout - Composer Sheet (Desktop)

```
[Scrim - Dimmed Background, backdrop-filter: blur(4px)]

        ┌─────────────────────────────────────────────┐
        │ [X]  New post                               │ <- Sheet header
        ├─────────────────────────────────────────────┤
        │                                             │
        │ Posting to                                  │
        │ ┌─────────────────────────────────┐        │
        │ │ Ellicott Complex ▼              │        │
        │ └─────────────────────────────────┘        │
        │                                             │
        │ ┌─────────────────────────────────┐        │
        │ │ [Textarea - auto-focused]       │        │
        │ │                                 │        │
        │ │                                 │        │
        │ │                                 │        │
        │ └─────────────────────────────────┘        │
        │                                             │
        │ [+ Add tool]                                │
        │                                             │
        │ Visibility                                  │
        │ [Space] [Campus]                            │
        │                                             │
        │                            [Post →]         │ <- Gold gradient
        │                                             │
        └─────────────────────────────────────────────┘
```

### Visual Treatment - Sheet Overlay
```css
.composer-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 640px;
  margin: 0 auto;
  max-height: 80vh;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  box-shadow: var(--shadow-lg);
  transform: translateY(100%);
  transition: transform var(--motion-slow) var(--ease-smooth);
  z-index: 1000;
}

.composer-sheet.open {
  transform: translateY(0);
}

.composer-scrim {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity var(--motion-slow) var(--ease-smooth);
  z-index: 999;
}

.composer-scrim.visible {
  opacity: 1;
}
```

### Visual Treatment - Composer Content
```css
.composer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-subtle);
}

.composer-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.composer-close {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.composer-close:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.composer-body {
  padding: 24px;
  max-height: 60vh;
  overflow-y: auto;
}

.composer-textarea {
  width: 100%;
  min-height: 120px;
  padding: 16px;
  font-size: 16px;
  line-height: 1.5;
  color: var(--text-primary);
  background: rgba(20, 20, 20, 0.4);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  resize: vertical;
  font-family: inherit;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.composer-textarea:focus {
  border-color: var(--border-gold);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
  outline: none;
}

.composer-textarea::placeholder {
  color: var(--text-tertiary);
}
```

### Visual Treatment - Visibility Toggle
```css
.visibility-toggle {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.visibility-option {
  flex: 1;
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: var(--text-secondary);
  background: rgba(20, 20, 20, 0.4);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.visibility-option:hover {
  border-color: var(--border-gold);
  color: var(--text-primary);
}

.visibility-option.active {
  color: var(--gold-start);
  border-color: var(--gold-start);
  background: rgba(255, 215, 0, 0.05);
}
```

### Cognitive Budget
- **Textarea**: 1 field, 500 char limit (show at 400+)
- **Space selector**: Dropdown of 3 joined spaces
- **Visibility**: 2 options (Space, Campus)
- **Tools**: Collapsed by default, max 6 if expanded
- **Primary CTA**: 1 (Post)

### Emotional Mode
**Focus → Celebrate (First Post Only)**
- Sheet opens: 240ms slide up, dim background
- Typing: Focus mode, minimal distractions
- Post success: **ONE-TIME** subtle gold flash (100ms), no confetti
- Auto-close sheet, post appears at top of Feed

### Components Needed
- `<ComposerSheet />` - Full overlay component
- `<SpaceDropdown />` - Selector of joined spaces
- `<ComposerTextarea />` - Auto-growing, char counter
- `<VisibilityToggle />` - Space vs Campus radio
- `<ToolPicker />` - Collapsed by default, 6 tools max
- `<PostButton />` - Gold gradient CTA

### Interaction Timeline
```
1. User clicks FAB (0ms)
   - Scrim fades in (240ms)
   - Sheet slides up (240ms)
   - Textarea auto-focuses
   - Space pre-selected (Ellicott Complex or last active)
   - Visibility default: Space

2. User types content (~10s)
   - Character count shows at 400/500
   - Draft auto-saves every 2s to localStorage

3. (Optional) User adds tool (~5s)
   - Click "+ Add tool"
   - Tool picker grid expands (160ms)
   - Select "Poll" tool
   - Poll config UI appears below textarea

4. User taps "Post" (100ms scale feedback)
   - Validate: min 1 char or tool configured
   - POST /api/spaces/ellicott-complex/posts
   - Optimistic update: Post appears at top of Feed instantly
   - Sheet closes (240ms slide down)
   - Scrim fades out (240ms)
   - **FIRST POST ONLY**: 100ms gold flash on new post card
   - Update profile completion to 100%

Total: ~90 seconds from landing (mission accomplished!)
```

### States to Handle
1. **Empty composer**: "Post" button disabled
2. **Typing**: "Post" button enabled, char count visible (if > 400)
3. **Tool selected**: Tool config UI visible
4. **Posting**: Button disabled with spinner
5. **Success**: Sheet closes, post appears, subtle celebration
6. **Error**: "Failed to post, try again" toast, sheet stays open
7. **Network offline**: "You're offline. Post will send when connected."

### Performance Target
- **Sheet open**: 240ms slide animation
- **Post submit**: < 500ms server response
- **Optimistic update**: 0ms perceived lag
- **Sheet close**: 240ms total

### First Post Celebration (ONE TIME ONLY)
```typescript
if (isFirstPost) {
  // Subtle 100ms gold flash on new post card
  postCard.classList.add('first-post-flash');
  setTimeout(() => postCard.classList.remove('first-post-flash'), 100);

  // Update profile completion
  updateProfileCompletion(100);

  // Analytics
  trackEvent('onboarding_completed', {
    timeToComplete: 92, // seconds from landing
    spacesJoined: 3,
    hasAvatar: true,
    firstPostSpace: 'ellicott-complex'
  });
}
```

```css
.first-post-flash {
  animation: goldFlash 100ms ease-out;
}

@keyframes goldFlash {
  0%, 100% { background: rgba(26, 26, 26, 0.3); }
  50% { background: rgba(255, 215, 0, 0.1); }
}
```

### Edge Cases
- **Network error**: Keep sheet open, show retry button
- **User closes sheet without posting**: Save draft to localStorage
- **Space selector empty**: Shouldn't happen (auto-joined 3 spaces)
- **Offensive content detected**: Block post, show moderation warning
- **Image upload fails**: Allow text-only post

---

## Profile Completion Tracker

### Students
```
Email verified:     20%
Identity setup:     +20% = 40%
Photo uploaded:     +10% = 50% (optional)
User type selected: +10% = 60%
Grad year:          +10% = 70%
Residential:        +10% = 80%
School:             +10% = 90%
First post:         +10% = 100%
```

### Alumni
```
Email verified:     20%
Identity setup:     +20% = 40%
Photo uploaded:     +10% = 50% (optional)
User type selected: +10% = 60%
Grad year (alumni): +40% = 100%
```

### Faculty
```
Email verified:     20%
Identity setup:     +20% = 40%
User type selected: +10% = 50%
Space request:      +50% = 100%
```

---

## System Architecture

### API Endpoints

#### Auth Flow
```typescript
POST   /api/auth/send-magic-link        { email }
POST   /api/auth/resend-magic-link      { email }
GET    /api/auth/check-verification     { email }
GET    /auth/verify?token=xxx           (verifies & creates session)
POST   /api/auth/sign-out
```

#### Onboarding Flow
```typescript
GET    /api/auth/check-username         ?q=sarahchen
POST   /api/onboarding/complete-identity { firstName, lastName, username }
POST   /api/profile/upload-avatar        (FormData: avatar file)
POST   /api/onboarding/set-user-type     { type: 'student' | 'alumni' | 'faculty' }
POST   /api/onboarding/join-cohort       { year: 2025 }
POST   /api/spaces/:spaceId/join         (Residential, School)
POST   /api/onboarding/join-alumni-cohort { year: 2015 }
POST   /api/faculty/request-space        { fullName, department, purpose, ... }
POST   /api/onboarding/complete          (Mark onboarding done)
GET    /api/profile/completion-status
```

#### Feed & Posts
```typescript
GET    /api/feed                         ?limit=10&offset=0
POST   /api/spaces/:spaceId/posts        { content, visibility, toolId?, toolData? }
POST   /api/posts/:postId/upvote
POST   /api/posts/:postId/comments       { content }
```

### Database Schema

#### users collection
```typescript
{
  uid: string;                    // Firebase Auth UID
  email: string;                  // @buffalo.edu
  campusId: 'ub-buffalo';         // REQUIRED, always set

  // Identity
  firstName: string;
  lastName: string;
  username: string;               // Unique per campus
  avatarUrl?: string;

  // User Type
  userType: 'student' | 'alumni' | 'faculty';

  // Student-specific
  graduationYear?: number;        // 2025, 2026, etc.
  residentialSpaceId?: string;    // 'ellicott-complex'
  schoolSpaceId?: string;         // 'school-of-engineering'

  // Alumni-specific
  alumniGradYear?: number;        // 2015, etc.

  // Faculty-specific
  department?: string;
  facultyRole?: string;

  // Onboarding
  profileCompletion: number;      // 0-100
  onboardingStep: 'identity' | 'user-type' | 'context' | 'complete';
  onboardedAt?: Date;

  // Spaces
  spacesJoined: string[];         // Space IDs
  defaultSpace?: string;          // Last active space

  // Metadata
  createdAt: Date;
  emailVerifiedAt: Date;
  lastActiveAt: Date;
}
```

#### magic_links collection
```typescript
{
  email: string;
  tokenHash: string;              // SHA-256 of token
  expiresAt: Date;                // +15 minutes
  usedAt?: Date;
  createdAt: Date;
}
```

#### faculty_requests collection
```typescript
{
  requestId: string;
  userId: string;
  campusId: 'ub-buffalo';

  fullName: string;
  department: string;
  purpose: 'course' | 'research' | 'department' | 'office_hours' | 'other';
  purposeDetail?: string;
  expectedMembers: number;
  justification: string;

  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: Date;
  rejectionReason?: string;
  spaceId?: string;               // If approved

  createdAt: Date;
}
```

#### spaces collection (auto-seeded for vBETA)
```typescript
{
  spaceId: string;
  campusId: 'ub-buffalo';

  name: string;
  type: 'cohort' | 'residential' | 'school' | 'club' | 'faculty';

  memberCount: number;
  createdAt: Date;

  // Cohort spaces
  graduationYear?: number;        // For class cohorts
  alumniYear?: number;            // For alumni cohorts

  // Residential spaces
  residenceHall?: string;

  // School spaces
  schoolName?: string;
}
```

### Security Rules

#### Campus Isolation (CRITICAL)
```typescript
// EVERY query must filter by campusId
const users = await db.collection('users')
  .where('campusId', '==', 'ub-buffalo')
  .where('uid', '==', userId)
  .get();
```

#### Username Uniqueness (Per Campus)
```typescript
// Firestore index: (campusId, username) - unique
const usernameExists = await db.collection('users')
  .where('campusId', '==', 'ub-buffalo')
  .where('username', '==', username.toLowerCase())
  .limit(1)
  .get();

return usernameExists.empty; // true if available
```

#### Magic Link Security
```typescript
// 1. Generate cryptographically secure token
const token = crypto.randomBytes(32).toString('hex');

// 2. Hash before storing
const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

// 3. Send unhashed token via email
const magicLink = `https://hive.app/auth/verify?token=${token}`;

// 4. Verify by hashing incoming token and comparing
const incomingHash = crypto.createHash('sha256').update(incomingToken).digest('hex');
const match = await db.collection('magic_links')
  .where('tokenHash', '==', incomingHash)
  .where('expiresAt', '>', new Date())
  .where('usedAt', '==', null)
  .get();

if (!match.empty) {
  // Mark token as used
  await match.docs[0].ref.update({ usedAt: new Date() });
  // Create session...
}
```

---

## Analytics & Tracking

### Key Events
```typescript
// Landing
track('landing_page_view');
track('email_submitted', { email_domain: 'buffalo.edu' });

// Verification
track('email_sent');
track('email_verified', { time_to_verify: 22 });
track('magic_link_clicked');

// Identity
track('identity_step_started');
track('username_checked', { username: 'sarahchen', available: true });
track('avatar_uploaded');
track('identity_completed', { has_avatar: true });

// User Type
track('user_type_selected', { type: 'student' });

// Student Context
track('cohort_joined', { year: 2025, member_count: 1847 });
track('residential_joined', { space: 'ellicott-complex', member_count: 342 });
track('school_joined', { space: 'school-of-engineering', member_count: 2134 });

// Feed
track('feed_first_view', { time_from_landing: 85 });
track('post_viewed', { post_id: 'abc123' });
track('post_upvoted', { post_id: 'abc123' });

// First Post
track('composer_opened', { context: 'fab' });
track('first_post_created', {
  space: 'ellicott-complex',
  has_tool: false,
  visibility: 'space',
  char_count: 42
});

track('onboarding_completed', {
  total_time: 92,
  user_type: 'student',
  spaces_joined: 3,
  has_avatar: true,
  first_action: 'post'
});
```

### Funnel Metrics (vBETA Targets)
```
Landing → Email Submit:          65% (goal: 60%)
Email Submit → Verified:         88% (goal: 85%)
Verified → Identity Complete:    92% (goal: 90%)
Identity → User Type:            98% (goal: 95%)
User Type → Context Complete:    95% (goal: 90%)
Context → Feed:                  100% (auto-redirect)
Feed → First Post:               60% (goal: 55%)

Overall: Landing → First Post = ~32% (goal: 30%)
Time to First Value: 85s avg (goal: <90s)
```

---

## Testing Checklist

### Unit Tests
- [ ] Email validation regex
- [ ] Username validation (3-20 chars, alphanumeric + underscore)
- [ ] Token generation (crypto.randomBytes secure)
- [ ] Token expiry logic (15 minutes)
- [ ] Avatar upload (max 2MB, JPG/PNG only)

### Integration Tests
- [ ] Full student flow (landing → first post < 90s)
- [ ] Alumni flow (landing → feed < 40s)
- [ ] Faculty flow (landing → request submitted < 45s)
- [ ] Magic link verification (create → send → verify → session)
- [ ] Auto-join 3 spaces (cohort + residential + school)
- [ ] Profile completion updates correctly

### E2E Tests (Playwright)
```typescript
test('Student onboarding happy path', async ({ page }) => {
  // 1. Landing
  await page.goto('/');
  await page.fill('input[type="email"]', 'test@buffalo.edu');
  await page.click('button:has-text("Continue")');

  // 2. Mock magic link
  await page.goto('/auth/verify?token=mock-token');
  await expect(page).toHaveURL('/onboarding/identity');

  // 3. Identity
  await page.fill('[name="firstName"]', 'Sarah');
  await page.fill('[name="lastName"]', 'Chen');
  await page.fill('[name="username"]', 'sarahchen');
  await page.click('button:has-text("Continue")');

  // 4. User type
  await page.click('text=Student');
  await page.click('button:has-text("Continue")');

  // 5. Graduation year
  await page.selectOption('select', '2025');
  await page.click('button:has-text("Continue")');

  // 6. Residential
  await page.click('text=Ellicott Complex');
  await page.click('button:has-text("Continue")');

  // 7. School
  await page.click('text=School of Engineering');
  await page.click('button:has-text("Continue")');

  // 8. Feed
  await expect(page).toHaveURL('/feed');
  await expect(page.locator('article')).toHaveCount(5); // Posts visible

  // 9. First post
  await page.click('[data-testid="composer-fab"]');
  await page.fill('textarea', 'My first post!');
  await page.click('button:has-text("Post")');
  await expect(page.locator('article').first()).toContainText('My first post!');

  // Total time: <90s (simulated)
});

test('Username unavailable shows suggestions', async ({ page }) => {
  await page.goto('/onboarding/identity');
  await page.fill('[name="username"]', 'admin'); // Taken
  await expect(page.locator('text=✗ Taken')).toBeVisible();
  await expect(page.locator('text=@admin1')).toBeVisible();
});

test('Alumni sees "More coming soon" banner', async ({ page }) => {
  // ... identity setup
  await page.click('text=Alumni');
  await page.click('button:has-text("Continue")');
  await expect(page.locator('text=More Coming Soon')).toBeVisible();
  await expect(page.locator('text=Spring 2025')).toBeVisible();
});

test('Faculty sees request form', async ({ page }) => {
  // ... identity setup
  await page.click('text=Faculty');
  await page.click('button:has-text("Continue")');
  await expect(page.locator('text=Faculty Space Request')).toBeVisible();
});
```

### Performance Tests
- [ ] Landing LCP < 1.0s
- [ ] Email submit response < 500ms
- [ ] Username check < 200ms
- [ ] Avatar upload < 3s (2MB file)
- [ ] Feed first load < 1.5s cold, < 1.0s warm
- [ ] Total onboarding < 90s (95th percentile)

---

## Mobile Responsiveness (Web-First, Mobile Companion)

### Breakpoints
```css
$mobile: 0-767px;        // Phone (companion experience)
$tablet: 768px-1023px;   // Tablet
$desktop: 1024px+;       // Primary experience
```

### Desktop → Mobile Adaptations

#### Landing Page
- Desktop: Centered 600px card, floating logo
- Mobile: Full-width, logo smaller (80px), compact spacing

#### Identity Setup
- Desktop: 540px card, generous padding (64px)
- Mobile: Full-width, reduced padding (24px), smaller inputs (48px)

#### Student Context
- Desktop: Single-column centered cards
- Mobile: Same (already optimized)

#### Feed
- Desktop: Max-width 800px, generous margins
- Mobile: Full-width, remove margins, sticky filter chips

#### Composer
- Desktop: 640px sheet, 80vh max height
- Mobile: Full-screen sheet, safe area insets

### Mobile-Specific Patterns
- **Touch targets**: 48px minimum (all buttons, radios)
- **Auto-zoom prevention**: `maximum-scale=1` in viewport meta
- **Keyboard handling**: Auto-scroll when keyboard opens
- **Gesture support**: Swipe down to dismiss composer sheet
- **Safe areas**: iOS notch/home indicator spacing

---

## Launch Readiness Checklist

### Pre-Launch (T-1 week)
- [ ] Usability testing with 10 UB students
- [ ] Load test: 100 concurrent signups
- [ ] Email deliverability (Gmail, Outlook, Apple Mail)
- [ ] Mobile testing: iOS 15+, Android 11+
- [ ] Desktop testing: Chrome, Safari, Firefox, Edge
- [ ] Accessibility audit: WCAG 2.1 AA
- [ ] Analytics: All 30 events firing correctly
- [ ] Error monitoring: Sentry configured
- [ ] Performance: < 90s onboarding on 4G

### Launch Day
- [ ] Feature flag: Onboarding enabled @buffalo.edu only
- [ ] Monitoring dashboard active
- [ ] Support team ready
- [ ] Rate limits configured (5 emails/min/IP)
- [ ] Database snapshots automated

### Post-Launch (T+1 week)
- [ ] Funnel analysis: Identify drop-offs
- [ ] A/B test: Different residential prompts
- [ ] User interviews: 20 new signups
- [ ] Iterate: Fix top 3 friction points

---

## Success Criteria (vBETA)

### Quantitative
- **Onboarding completion**: 32%+ (landing → first post)
- **Time to first value**: < 90s average, < 120s 95th percentile
- **Profile completion**: 85%+ users reach 100%
- **Auto-joins**: 100% success rate (3 spaces per student)
- **Next-day retention**: 65%+ return within 24h
- **Email verification**: 88%+ click link within 15 min

### Qualitative
- **User sentiment**: "That was fast and beautiful"
- **Zero confusion**: No support tickets for onboarding flow
- **No dead ends**: Every error has recovery path
- **Premium feel**: "This feels like a real product"

---

**Remember**: This is the first 90 seconds where we prove HIVE is worth choosing over Instagram. Premium polish + campus utility = inevitable adoption.

**The golden rule**: Beautiful, fast, useful. In that order.
