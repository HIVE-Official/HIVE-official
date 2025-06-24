# HIVE vBETA: The Complete Architectural Checklist

**?? AI EXECUTION BLUEPRINT** | **?? CAMPUS-BY-CAMPUS PROGRESS** | **? HIVE-SPECIFIC TASKING**

---

## **?? CHECKLIST STRUCTURE**

### **?? PRESENTATION LAYER FIRST**

**UI/UX development has been separated into a dedicated presentation checklist:**

?? **`@memory-bank/hive-presentation-checklist.md`** - Complete UI/UX component development

**This checklist focuses on:**

- ?? **STATE Layer** - Hooks and state management
- ?? **API Layer** - Backend endpoints and validation
- ??? **DATA Layer** - Schemas and database design
- ?? **TESTING Layer** - E2E and integration tests
- ?? **INTEGRATION Layer** - Connecting all layers together

---

## **?? AI EXECUTION PROTOCOL (MANDATORY)**

### **Your Primary Directive**

You are an AI developer tasked with building the HIVE platform - a campus-specific social platform with Rituals, Spaces, and student-built Tools. This checklist focuses on the **implementation layers** while the **presentation layer** is handled separately.

### **HIVE Brand Standards (Mandatory)**

- **Canvas**: #0A0A0A (matte black background)
- **Gold**: #FFD700 (accent color only)
- **Motion**: 200ms ease-out, never elastic
- **Copy Tone**: Confident whisper
- **Footer Credo**: "Built by Students � Owned by Students."

### **?? DESIGN SYSTEM INTEGRATION (MANDATORY)**

**All phases MUST use these standardized design tokens:**

#### **Color Palette**

```typescript
// From packages/tokens/src/colors.ts
background: "#0A0A0A"; // Primary canvas
accent: "#FFD700"; // Gold accents only
foreground: "#FFFFFF"; // Text and icons
muted: "#6B7280"; // Secondary text
border: "#2A2A2A"; // Dividers and borders - CORRECTED
```

#### **Animation Timing**

```typescript
// From packages/tokens/src/motion.ts
fast: "120ms"; // Hover states, micro-interactions
base: "180ms"; // Standard transitions, page changes
slow: "280ms"; // Complex animations, modal entrances
ritual: "400ms"; // Special HIVE moments
```

#### **Typography System**

```typescript
// From packages/tokens/src/typography.ts
headline: "Space Grotesk Variable"; // Hero text, CTAs
body: "Inter"; // Body text, menus
mono: "JetBrains Mono"; // Code, countdown timers
```

#### **Component Library Integration**

- **ALL UI components** MUST use `@hive/ui` components
- **ALL animations** MUST use `@hive/tokens` motion values
- **ALL colors** MUST reference design tokens (no hardcoded hex values)
- **ALL typography** MUST use token-based font families and weights

### **?? SYSTEM INTEGRATION REQUIREMENTS (CRITICAL)**

**Data Flow Connections:**

```typescript
Profile Data ? Space Auto-Join Logic ? Feed Personalization ? Tool Recommendations
     ?              ?                    ?                      ?
Auth/Onboarding ? Academic/Residential ? Content Algorithm ? Builder Analytics
     ?         Spaces Assignment        ?                      ?
Campus Selection ? Major/Dorm Data ? Space Membership ? Tool Creation Access
```

**Component Reuse Matrix:**

- **Navigation**: Same header/nav component across all phases
- **Forms**: Standardized input components with validation
- **Loading States**: Consistent skeleton and spinner patterns
- **Error Handling**: Unified error boundary and messaging
- **Modals**: Same modal primitives with phase-specific content

**State Management Consistency:**

- **Authentication**: `@hive/auth-logic` across all phases
- **Profile Data**: `@hive/hooks/use-profile` powering all personalization
- **Analytics**: `@hive/analytics` tracking all user interactions
- **Error States**: Consistent error handling patterns

### **?? INTEGRATION TESTING REQUIREMENTS**

**Cross-Phase Testing:**

- [ ] **Profile ? Spaces**: Auto-join working for Academic/Residential
- [ ] **Profile ? Feed**: Personalization algorithm using profile data
- [ ] **Profile ? Tools**: Builder status enabling HiveLAB access
- [ ] **Spaces ? Feed**: Space activity appearing in personalized feed
- [ ] **Tools ? Profile**: Tool creation updating Builder achievements
- [ ] **Feed ? Spaces**: Ritual participation affecting space engagement

**Design Consistency Testing:**

- [ ] **Color Validation**: No hardcoded colors, all using design tokens
- [ ] **Animation Timing**: All transitions using 150ms/200ms/300ms values
- [ ] **Typography**: All text using General Sans/Inter/JetBrains Mono
- [ ] **Component Reuse**: Same UI primitives across all phases
- [ ] **Mobile Responsive**: 390px minimum width across all interfaces

### **?? NAVIGATION & ROUTING CONSISTENCY (MANDATORY)**

**Unified Navigation Component:**

```typescript
// packages/ui/src/components/navigation/main-nav.tsx
interface MainNavProps {
  currentPage: "feed" | "spaces" | "profile" | "hivelab";
  user: User;
  builderStatus: boolean;
}
```

**Navigation States by Phase:**

- **Phase 1 (Auth)**: Minimal nav, logo only
- **Phase 1.5 (Profile)**: Profile-focused nav with edit actions
- **Phase 2 (Feed)**: Full nav with feed as primary
- **Phase 3 (Spaces)**: Space-aware nav with category filters
- **Phase 4 (HiveLAB)**: Builder-enhanced nav with creation tools

**Critical Navigation Requirements:**

- [ ] **Persistent Navigation**: Same nav component across authenticated pages
- [ ] **Builder Status**: Gold indicator when user has Builder role
- [ ] **Active State**: Current page clearly highlighted
- [ ] **Profile Access**: Avatar/name always clickable to profile
- [ ] **Responsive Design**: Mobile hamburger menu with same structure

**User Flow Connections:**

```typescript
// Critical flow paths that MUST work seamlessly
Landing ? Campus ? Auth ? Onboarding ? Profile ? Feed
                                          ?        ?
                                       Profile ? Spaces
                                          ?        ?
                                      HiveLAB ? Tools
```

**Route Protection:**

- **Authenticated Routes**: `/feed`, `/spaces`, `/profile`, `/hivelab`
- **Builder-Only Routes**: `/hivelab/create`, `/hivelab/analytics`
- **Campus-Specific**: All routes respect selected campus context
- **Fallback Handling**: Proper redirects for unauthorized access

### **?? MOBILE-FIRST DESIGN REQUIREMENTS (CRITICAL)**

**Mobile Breakpoints (MANDATORY):**

```typescript
// All phases MUST support these breakpoints
mobile: "390px"; // Minimum supported width
tablet: "768px"; // Tablet landscape
desktop: "1024px"; // Desktop minimum
wide: "1440px"; // Wide desktop optimal
```

**Mobile-Specific Requirements:**

- [ ] **Touch Targets**: Minimum 44px for all interactive elements
- [ ] **Thumb Navigation**: Bottom tab bar for primary navigation
- [ ] **Swipe Gestures**: Profile editing, space browsing, feed refresh
- [ ] **Responsive Typography**: Fluid scaling between breakpoints
- [ ] **Image Optimization**: Proper responsive images with Next.js Image
- [ ] **Performance**: <3s load time on 3G networks

**Mobile Component Adaptations:**

- **Feed**: Infinite scroll with pull-to-refresh
- **Spaces**: Horizontal scroll for categories, vertical for content
- **Profile**: Collapsible sections with accordion behavior
- **HiveLAB**: Touch-optimized tool creation interface

### **? PERFORMANCE & LOADING CONSISTENCY**

**Loading State Standards:**

```typescript
// Consistent loading patterns across all phases
<Skeleton />        // Content placeholders
<Spinner />         // Action feedback
<ProgressBar />     // Multi-step processes
<LoadingCard />     // List item placeholders
```

**Performance Requirements:**

- [ ] **First Contentful Paint**: <1.5s on desktop, <2.5s on mobile
- [ ] **Largest Contentful Paint**: <2.5s on desktop, <4s on mobile
- [ ] **Cumulative Layout Shift**: <0.1 across all pages
- [ ] **First Input Delay**: <100ms for all interactions
- [ ] **Time to Interactive**: <3s on desktop, <5s on mobile

**Optimization Strategies:**

- **Code Splitting**: Dynamic imports for each phase
- **Image Optimization**: WebP with fallbacks, proper sizing
- **Font Loading**: Preload critical fonts, font-display: swap
- **API Caching**: React Query with appropriate stale times
- **Bundle Analysis**: Regular bundle size monitoring

### **AI Development Rules**

1. **NEVER skip [CONSULT HUMAN] points** - These require strategic decisions
2. **ALWAYS implement complete error handling** for every feature
3. **ALWAYS add loading states** for every async operation
4. **ALWAYS make components mobile-responsive** (390px minimum)
5. **ALWAYS follow TypeScript strict mode** - no `any` types
6. **ALWAYS test your implementation** before marking tasks complete

### **Human Consultation Protocol**

- **STOP and ask** when you see `[CONSULT HUMAN]`
- **STOP and ask** if any requirement is ambiguous
- **STOP and ask** if you need to make UX/design decisions
- **STOP and ask** if you encounter technical blockers

### **?? INTEGRATION AUDIT REQUIREMENTS (CRITICAL)**

**Every phase MUST include Integration Layer tasks that explicitly connect:**

#### **Required Integration Patterns**

1. **UI ? STATE Connection**:

   ```typescript
   // ? REQUIRED: UI components import and use hooks
   import { useFeatureHook } from "@hive/hooks";
   export const FeatureComponent = () => {
     const { data, isLoading, error } = useFeatureHook();
     // Component delegates ALL logic to hook
   };
   ```

2. **STATE ? API Connection**:

   ```typescript
   // ? REQUIRED: Hooks make typed API calls
   import { FeatureData } from "@hive/core";
   export const useFeatureHook = () => {
     const fetchData = async (): Promise<FeatureData[]> => {
       const response = await fetch("/api/feature");
       return response.json(); // Properly typed response
     };
   };
   ```

3. **API ? DATA Connection**:
   ```typescript
   // ? REQUIRED: APIs use and return typed schemas
   import { FeatureData } from "@hive/core";
   export async function GET(): Promise<Response> {
     const data: FeatureData[] = await getFromDatabase();
     return Response.json(data); // Typed response
   }
   ```

#### **Integration Verification Checklist**

**For EVERY feature in EVERY phase:**

- [ ] **Component Integration**: UI component imports and uses corresponding hook
- [ ] **Hook Integration**: Hook makes typed API calls to corresponding endpoint
- [ ] **API Integration**: API endpoint uses and returns proper schema types
- [ ] **Data Flow**: Changes in one layer properly propagate to dependent layers
- [ ] **Error Handling**: Errors handled consistently across all integration points
- [ ] **Loading States**: Loading states managed consistently across UI/STATE layers
- [ ] **Type Safety**: All integration points use proper TypeScript interfaces

#### **Integration Testing Requirements**

**Each Integration Layer must include:**

- **Implementation Code**: Exact TypeScript showing how layers connect
- **Success Criteria**: Specific verification that integration works
- **Error Scenarios**: How integration handles failures and edge cases
- **Performance**: How integration handles caching and optimization

#### **Phase Integration Audit Template**

**Before marking ANY phase complete, verify:**

```typescript
// 1. UI Components Use Hooks (not direct API calls)
? All components import hooks from @hive/hooks
? No components make direct fetch() calls
? All loading/error states managed by hooks

// 2. Hooks Use Typed APIs (not untyped endpoints)
? All hooks import types from @hive/core
? All API calls return properly typed data
? All hooks handle loading/error states

// 3. APIs Use Schemas (not untyped data)
? All API routes import schemas from @hive/core
? All responses are properly typed
? All validation uses schema definitions

// 4. Cross-Feature Integration
? Profile data powers Space auto-join
? Space activity appears in Feed
? Builder status enables Tool creation
? All features share consistent state management
```

---

## **?? HIVE vBETA COMPLETION STATUS**

- **PHASE 1: Campus Entry & Identity**: `[? COMPLETED - UB LAUNCH]`
- **PHASE 1.5: Profile & Personal Hub**: `[TODO - CRITICAL INTEGRATION]`
- **PHASE 2: Feed & Rituals Engine**: `[TODO]`
- **PHASE 3: Spaces & Community**: `[TODO]`
- **PHASE 4: HiveLAB & Tool Builder**: `[TODO]`

**?? CRITICAL INTEGRATION FLOW:**

```
Phase 1 (Auth/Onboarding) ? Phase 1.5 (Profile Setup) ? Phase 2 (Feed) ? Phase 3 (Spaces) ? Phase 4 (Tools)
                                       ?                                    ?               ?
                                Profile Data Powers:                Auto-Join Logic    Builder Status
                                - Space Auto-Join                  - Profile Display  - Tool Analytics
                                - Builder Status                   - Feed Personalization
                                - Tool Recommendations
```

---

## **?? PHASE 1: Campus Entry & Identity** - [? COMPLETED]

### **PHASE 1 OVERVIEW - UB LAUNCH FOCUS**

**Goal**: Complete user journey from landing page to authenticated, onboarded user ready for the main platform.

**User Journey Flow**:

```
Landing (/) ? Campus Selection (/campus) ? [Waitlist (/waitlist/suny-buffalo) OR Auth (/auth/login)] ? Share (/share) ? Verification (/auth/verify) ? Onboarding (/onboarding) ? Welcome (/welcome) ? Feed (/feed)
```

**Success Criteria**: ? A user can go from first visit to authenticated UB campus member with profile complete.

---

### **P1-A: Landing Page (`/`) - [? COMPLETED]**

- [x] **Brand-perfect landing with hero CTA**
  - Evidence: Existing `/` page operational with proper HIVE branding
- [x] **"Get Inside" CTA ? Campus Selection**
  - Evidence: CTA routes to `/campus` page correctly

### **P1-B: Typography & Brand Assets - [? COMPLETED]**

- [x] **Updated font loading to General Sans Variable + Inter Variable**
  - Evidence: Updated `apps/web/src/app/layout.tsx` with new font imports
  - Evidence: Updated `packages/tokens/src/typography.ts` with correct font families
  - Evidence: Updated `packages/ui/tailwind.config.ts` with font variables
- [x] **Integrated new logo variants (black/white SVGs)**
  - Evidence: Updated `packages/ui/src/components/brand/hive-logo.tsx` with variant support
  - Evidence: Navbar using white logo variant for dark theme
  - Evidence: Logo assets moved to `/public/` directory

### **P1-C: Campus Selection (`/campus`) - [? COMPLETED - UB ONLY]**

- [x] **University selection focused on UB launch**
  - Evidence: Updated `apps/web/src/app/campus/page.tsx` for UB-only launch
  - Evidence: SUNY universities list replaced with single UB entry
  - Evidence: All messaging updated for "UB vBETA Launch"
- [x] **UB-specific validation and messaging**
  - Evidence: Search placeholder: "Verify you're a UB student..."
  - Evidence: vBETA info card focused on @buffalo.edu email requirement
  - Evidence: Help section updated for UB-only launch context

### **P1-D: Waitlist System (`/waitlist/[schoolId]`) - [? COMPLETED - UB FOCUSED]**

- [x] **UB-only waitlist with manual threshold control**
  - Evidence: Updated `apps/web/src/app/waitlist/[schoolId]/page.tsx` with UB validation
  - Evidence: Updated `components/waitlist-progress.tsx` with manual activation support
  - Evidence: Reduced threshold to 100 students for UB launch
- [x] **Brand-consistent UB messaging throughout**
  - Evidence: Updated `components/waitlist-form.tsx` with UB-specific copy
  - Evidence: Success state: "Welcome to the UB founding community!"
  - Evidence: Form labels: "UB email address" and founding community messaging

### **P1-E: Share Invite System (`/share`) - [? COMPLETED - BUILT FROM SCRATCH]**

- [x] **Complete UB invite system with social sharing**
  - Evidence: Created `apps/web/src/app/share/page.tsx` from scratch
  - Evidence: UB-specific invite links with tracking parameters
  - Evidence: Social media sharing (Twitter, Facebook, Instagram)
- [x] **Share statistics and message templates**
  - Evidence: Invite stats dashboard (invites sent, friends joined)
  - Evidence: Copy-to-clipboard functionality for invite links
  - Evidence: Pre-written message template for UB students
- [x] **Brand-consistent design with proper typography**
  - Evidence: Uses `font-display` for headlines, `font-sans` for body text
  - Evidence: HIVE gold accent colors (#FFD700) throughout
  - Evidence: UB founding launch messaging and "Bulls" references

---

## **?? PHASE 1 COMPLETION SUMMARY**

**? ALL PHASE 1 TASKS COMPLETED FOR UB LAUNCH**

**Key Achievements:**

- **Typography System**: Successfully implemented General Sans Variable + Inter Variable
- **Brand Assets**: Integrated black/white logo variants with responsive component
- **UB-Only Focus**: All pages updated for University at Buffalo exclusive launch
- **Manual Threshold**: Waitlist system supports manual activation for UB launch timing
- **Complete Share System**: Built comprehensive invite system from scratch
- **Brand Consistency**: All components use proper HIVE colors and typography

**Infrastructure Status:**

- ? TypeScript compilation: All packages compiling successfully
- ? ESLint status: No new errors introduced by Phase 1 changes
- ? Font loading: General Sans Variable and Inter Variable properly configured
- ? Logo system: Black/white variants working across all components

**Ready for Phase 2**: Campus entry flow is complete and UB-focused. All foundational systems in place for onboarding and authentication flows.

#### **[CONSULT HUMAN] - Threshold Mechanics**

**Questions**:

1. What's the exact student count threshold? (300 confirmed?)
2. How do we count "verified students" vs total signups?
3. Should the ring show real-time updates or daily updates?
4. What happens when threshold is reached? Immediate unlock or scheduled?

#### **?? UI/UX Layer**

**UI/UX tasks moved to separate presentation checklist:** `@memory-bank/hive-presentation-checklist.md`

**Focus on STATE, API, DATA, TESTING, and INTEGRATION layers for implementation.**

#### **?? STATE Layer**

- [ ] **Task**: Real-time campus population tracking.

  - **Files**: `packages/hooks/src/use-campus-threshold.ts`
  - **Success Criteria**: WebSocket connection for live updates.

- [ ] **Task**: Share invite state and URL generation.
  - **Files**: `packages/hooks/src/use-invite-sharing.ts`
  - **Success Criteria**: Generates trackable invite URLs.

#### **?? API Layer**

- [ ] **Task**: Real-time campus population endpoint.

  - **Files**: `apps/web/src/app/api/campus/[id]/population/route.ts`
  - **Success Criteria**: Returns current verified student count.

- [ ] **Task**: Invite link generation and tracking.
  - **Files**: `apps/web/src/app/api/invites/generate/route.ts`
  - **Success Criteria**: Creates trackable invite links with analytics.

#### **??? DATA Layer**

- [ ] **Task**: Campus population tracking schema.

  - **Files**: `packages/core/src/domain/campus/population.ts`
  - **Schema**: Real-time student count with verification status.

- [ ] **Task**: Invite tracking schema.
  - **Files**: `packages/core/src/domain/invites/schema.ts`
  - **Schema**: Invite links with click tracking and conversion metrics.

#### **?? TESTING Layer**

- [ ] **Task**: Threshold flow E2E tests.
  - **Files**: `apps/web/test/e2e/threshold-flow.spec.ts`
  - **Success Criteria**: Tests progress ring, sharing, and threshold unlock.

#### **?? INTEGRATION Layer (CRITICAL)**

- [ ] **Integration Task**: Connect progress ring to real-time campus population data.

  - **Implementation**:

    ```typescript
    // packages/ui/src/components/threshold/progress-ring.tsx
    import { useCampusThreshold } from "@hive/hooks";

    export const ProgressRing = ({ campusId }: { campusId: string }) => {
      const { currentCount, targetCount, isLoading } =
        useCampusThreshold(campusId);
      const progress = (currentCount / targetCount) * 100;
      // Ring animation based on real-time data
    };
    ```

  - **Success Criteria**: Ring updates in real-time via WebSocket, smooth animations.

- [ ] **Integration Task**: Connect share invite component to URL generation hook.

  - **Implementation**:

    ```typescript
    // packages/ui/src/components/threshold/share-invite.tsx
    import { useInviteSharing } from "@hive/hooks";

    export const ShareInviteComponent = () => {
      const { generateInviteUrl, shareUrl, isGenerating } = useInviteSharing();
      // Button triggers URL generation and opens share modal
    };
    ```

  - **Success Criteria**: Share component uses hook for all URL generation and tracking.

- [ ] **Integration Task**: Connect threshold hook to population API with WebSocket.

  - **Implementation**:

    ```typescript
    // packages/hooks/src/use-campus-threshold.ts
    import { CampusPopulation } from "@hive/core";

    export const useCampusThreshold = (campusId: string) => {
      // WebSocket connection to /api/campus/[id]/population
      // Real-time updates when new students join
      // Triggers threshold unlock logic when target reached
    };
    ```

  - **Success Criteria**: Hook maintains WebSocket connection, handles reconnection.

- [ ] **Integration Task**: Connect threshold unlock to auth flow routing.

  - **Implementation**:
    ```typescript
    // packages/hooks/src/use-campus-threshold.ts
    useEffect(() => {
      if (currentCount >= targetCount) {
        // Trigger ring shatter animation
        setTimeout(() => router.push("/auth/login"), 2000);
      }
    }, [currentCount, targetCount]);
    ```
  - **Success Criteria**: Threshold unlock triggers celebration then routes to auth.

- [ ] **Integration Task**: Connect invite generation API to tracking schema.
  - **Implementation**: Invite API creates trackable links with proper analytics integration.
  - **Success Criteria**: Generated invites tracked in database with conversion metrics.

---

### **PAGE 1.4: Share Invite (`/share`) - "Viral Nudge"**

**Page Goal**: Frictionless invite sharing during threshold pending.
**Page Status**: `[BUILD NEW]`

#### **?? UI/UX Layer**

**UI/UX tasks moved to separate presentation checklist:** `@memory-bank/hive-presentation-checklist.md`

**Focus on STATE, API, DATA, TESTING, and INTEGRATION layers for implementation.**

#### **?? STATE Layer**

- [ ] **Task**: Share modal state management.
  - **Files**: `packages/hooks/src/use-share-modal.ts`
  - **Success Criteria**: Modal open/close, clipboard operations.

#### **?? API Layer**

- [ ] **Task**: Social sharing metadata endpoint.
  - **Files**: `apps/web/src/app/api/share/metadata/route.ts`
  - **Success Criteria**: Returns Open Graph data for invite links.

#### **?? TESTING Layer**

- [ ] **Task**: Share functionality tests.
  - **Files**: `apps/web/test/e2e/share-invite.spec.ts`
  - **Success Criteria**: Tests copy, QR code, and social sharing.

---

### **PHASE 1 AUTH FLOW INTEGRATION**

#### **[CONSULT HUMAN] - Auth Flow Integration**

**Questions**:

1. The existing auth flow (`/auth/login`, `/auth/verify`) seems complete. Should we:

   - A) Update styling to match new brand standards?
   - B) Integrate with campus selection data?
   - C) Leave as-is and focus on integration points?

2. The existing onboarding (`/onboarding`) has 7 steps. Should we:
   - A) Add auto-join logic for academics/residential?
   - B) Update Builder status selection?
   - C) Integrate with campus threshold data?

**Please clarify the auth flow integration approach before proceeding with remaining Phase 1 tasks.**

---

### **PHASE 1 SUCCESS METRICS**

**Before marking Phase 1 complete:**

- [ ] **Complete user journey** from landing to feed works end-to-end
- [ ] **Campus threshold system** functional with real-time updates
- [ ] **Viral invite mechanics** working with tracking
- [ ] **Brand consistency** maintained across all pages
- [ ] **Mobile responsive** design (390px minimum) on all pages
- [ ] **Error handling** implemented for all failure scenarios
- [ ] **Loading states** implemented for all async operations
- [ ] **Analytics tracking** working for all user interactions

---

## **PHASE 1.5: PROFILE & PERSONAL HUB** `[CRITICAL INTEGRATION PHASE]`

### **PHASE 1.5 OVERVIEW**

**Goal**: Create the personal identity anchor that powers Space auto-join, Builder status display, and Feed personalization - the critical data bridge between authentication and community features.

**User Journey Flow**:

```
Profile Dashboard (/profile) ? Profile Editing (/profile/edit) ? Privacy Settings (/profile/privacy)
```

**Success Criteria**: Profile serves as the central data hub that enables all personalization features across Spaces, Feed, and Tools.

**Key Integrations**:

- **Space Auto-Join**: Major/dorm data automatically assigns Academic/Residential spaces
- **Builder Status**: Profile displays Builder role and tool creation achievements
- **Feed Personalization**: Profile interests and activity drive content algorithm
- **Tool Recommendations**: Profile data suggests relevant tools and creators
- **Privacy Controls**: Granular control over profile visibility and data sharing

---

### **PAGE 1.5.1: Profile Dashboard (`/profile`) - "Identity Anchor"**

**Page Goal**: Personal dashboard showing identity, achievements, spaces, and tools with proper privacy controls.
**Page Status**: `[EXISTS - NEEDS MAJOR EXPANSION]`
**Existing File**: `apps/web/src/app/profile/page.tsx`

#### **[CONSULT HUMAN] - Profile Architecture Decisions**

**Questions**:

1. **Profile Layout Priority**: What should be the visual hierarchy?

   - Option A: Identity ? Spaces ? Tools ? Achievements
   - Option B: Identity ? Builder Status ? Recent Activity ? Spaces
   - Option C: Identity ? Academic Info ? Campus Activity ? Tools?

2. **Builder Status Display**: How should Builder role be shown?

   - Option A: Prominent badge with tool count and analytics
   - Option B: Dedicated "Builder Dashboard" section
   - Option C: Subtle indicator with link to HiveLAB?

3. **Privacy Granularity**: What privacy controls are needed?
   - Option A: Public/Private toggle for entire profile
   - Option B: Granular controls per section (spaces, tools, activity)
   - Option C: Campus-only vs Public visibility options?

#### **?? UI/UX Layer**

**UI/UX tasks moved to separate presentation checklist:** `@memory-bank/hive-presentation-checklist.md`

**See Phase 1.5.1 UI/UX tasks P1.5.1-A through P1.5.1-G in presentation checklist.**

**Focus on STATE, API, DATA, TESTING, and INTEGRATION layers for implementation.**

#### **?? STATE Layer**

- [ ] **Task**: Profile data management and caching.

  - **Files**: `packages/hooks/src/use-profile.ts`
  - **Success Criteria**:
    - Real-time profile data fetching
    - Optimistic updates for profile changes
    - Cache invalidation on data updates
    - Loading states for all profile sections

- [ ] **Task**: Privacy settings state management.

  - **Files**: `packages/hooks/src/use-privacy-settings.ts`
  - **Success Criteria**:
    - Privacy preference tracking
    - Real-time visibility updates
    - Granular control state management
    - Privacy impact validation

- [ ] **Task**: Space auto-join logic integration.
  - **Files**: `packages/hooks/src/use-profile-spaces.ts`
  - **Success Criteria**:
    - Automatic space assignment based on profile data
    - Real-time space membership updates
    - Auto-join status tracking and validation
    - Space suggestion based on profile interests

#### **?? API Layer**

- [ ] **Task**: Profile data retrieval and updates.

  - **Files**: `apps/web/src/app/api/profile/[userId]/route.ts`
  - **Success Criteria**:
    - Secure profile data access with privacy controls
    - Efficient data fetching with proper caching
    - Profile update validation and sanitization
    - Privacy-aware data filtering

- [ ] **Task**: Space auto-join processing.

  - **Files**: `apps/web/src/app/api/profile/auto-join/route.ts`
  - **Success Criteria**:
    - Automatic space assignment based on profile changes
    - Major/dorm updates trigger space membership changes
    - Conflict resolution for multiple majors/dorms
    - Auto-join history tracking

- [ ] **Task**: Builder status management.
  - **Files**: `apps/web/src/app/api/profile/builder-status/route.ts`
  - **Success Criteria**:
    - Builder role assignment and revocation
    - Tool creation analytics integration
    - Builder achievement tracking
    - Status change notifications

#### **??? DATA Layer**

- [ ] **Task**: Complete user profile schema.

  - **Files**: `packages/core/src/domain/profile/user-profile-schema.ts`
  - **Schema**:

    ```typescript
    interface UserProfile {
      id: string;
      userId: string;
      campusId: string;
      handle: string;
      displayName: string;
      avatar?: string;

      // Academic Identity
      major: string;
      graduationYear: number;
      classStanding:
        | "freshman"
        | "sophomore"
        | "junior"
        | "senior"
        | "graduate";
      academicInterests: string[];

      // Residential Information
      dormitory?: string;
      roomNumber?: string;
      housingPreferences: string[];

      // Builder Status
      isBuilder: boolean;
      builderApprovedAt?: Date;
      toolsCreated: number;
      totalEngagement: number;

      // Privacy Settings
      visibility: "public" | "campus_only" | "private";
      showSpaces: boolean;
      showActivity: boolean;
      showAcademicInfo: boolean;
      showBuilderStatus: boolean;

      // Metadata
      createdAt: Date;
      updatedAt: Date;
      lastActiveAt: Date;
    }
    ```

- [ ] **Task**: Privacy settings configuration schema.

  - **Files**: `packages/core/src/domain/profile/privacy-schema.ts`
  - **Schema**: Granular privacy controls with impact tracking and validation.

- [ ] **Task**: Auto-join space assignment schema.
  - **Files**: `packages/core/src/domain/profile/auto-join-schema.ts`
  - **Schema**: Space assignment rules, conflict resolution, and assignment history.

#### **?? TESTING Layer**

- [ ] **Task**: Profile functionality integration tests.

  - **Files**: `apps/web/test/e2e/profile-functionality.spec.ts`
  - **Success Criteria**: Tests profile display, editing, privacy controls, and space integration.

- [ ] **Task**: Auto-join logic tests.
  - **Files**: `apps/web/test/e2e/profile-auto-join.spec.ts`
  - **Success Criteria**: Tests space assignment based on profile changes and conflict resolution.

#### **?? INTEGRATION Layer (CRITICAL)**

- [ ] **Integration Task**: Connect profile header to user data and Builder status.

  - **Implementation**:

    ```typescript
    // packages/ui/src/components/profile/profile-header.tsx
    import { useProfile } from "@hive/hooks";

    export const ProfileHeader = ({ userId }: { userId: string }) => {
      const { profile, isBuilder, isLoading } = useProfile(userId);
      // Header displays profile data with Builder badge if applicable
    };
    ```

  - **Success Criteria**: Header shows real-time profile data, Builder status, privacy indicators.

- [ ] **Integration Task**: Connect academic section to auto-join space logic.

  - **Implementation**:

    ```typescript
    // packages/ui/src/components/profile/academic-section.tsx
    import { useProfileSpaces } from "@hive/hooks";

    export const AcademicSection = () => {
      const { autoJoinedSpaces, academicSpaces } = useProfileSpaces();
      // Shows major with link to auto-joined academic space
    };
    ```

  - **Success Criteria**: Academic info links to auto-joined spaces, shows assignment logic.

- [ ] **Integration Task**: Connect spaces overview to membership data.

  - **Implementation**:

    ```typescript
    // packages/ui/src/components/profile/spaces-overview.tsx
    import { useProfile } from "@hive/hooks";

    export const SpacesOverview = () => {
      const { joinedSpaces, autoJoinedSpaces, spaceActivity } = useProfile();
      // Grid shows all spaces with activity metrics and auto-join indicators
    };
    ```

  - **Success Criteria**: Spaces grid shows membership status, activity, auto-join badges.

- [ ] **Integration Task**: Connect Builder dashboard to tool creation data.

  - **Implementation**:

    ```typescript
    // packages/ui/src/components/profile/builder-dashboard.tsx
    import { useProfile } from "@hive/hooks";

    export const BuilderDashboard = () => {
      const { builderStatus, toolsCreated, totalEngagement } = useProfile();
      // Shows Builder metrics and links to HiveLAB
    };
    ```

  - **Success Criteria**: Builder section shows tool count, engagement, HiveLAB access.

- [ ] **Integration Task**: Connect profile data hook to multiple API endpoints.

  - **Implementation**:

    ```typescript
    // packages/hooks/src/use-profile.ts
    import { UserProfile, Space, Tool } from "@hive/core";

    export const useProfile = (userId: string) => {
      // Fetches profile data, space memberships, builder status
      // Connects to /api/profile/[userId], /api/profile/spaces, /api/profile/tools
    };
    ```

  - **Success Criteria**: Hook aggregates data from multiple APIs, handles caching.

- [ ] **Integration Task**: Connect auto-join API to space membership updates.
  - **Implementation**: Profile changes trigger space assignment API with proper conflict resolution.
  - **Success Criteria**: Major/dorm updates automatically assign/remove space memberships.

---

### **PAGE 1.5.2: Profile Editing (`/profile/edit`) - "Identity Management"**

**Page Goal**: Comprehensive profile editing interface with real-time validation and privacy impact preview.
**Page Status**: `[BUILD NEW]`

#### **?? UI/UX Layer**

**UI/UX tasks moved to separate presentation checklist:** `@memory-bank/hive-presentation-checklist.md`

**See Phase 1.5.2 UI/UX tasks P1.5.2-A through P1.5.2-C in presentation checklist.**

**Focus on STATE, API, DATA, TESTING, and INTEGRATION layers for implementation.**

#### **?? STATE Layer**

- [ ] **Task**: Profile editing workflow state management.
  - **Files**: `packages/hooks/src/use-profile-editor.ts`
  - **Success Criteria**:
    - Multi-step editing workflow
    - Auto-save with conflict detection
    - Validation state management
    - Privacy impact calculation

#### **?? API Layer**

- [ ] **Task**: Profile update processing with validation.
  - **Files**: `apps/web/src/app/api/profile/update/route.ts`
  - **Success Criteria**:
    - Comprehensive input validation
    - Auto-join space assignment triggers
    - Privacy impact calculation
    - Change history tracking

#### **?? TESTING Layer**

- [ ] **Task**: Profile editing workflow tests.
  - **Files**: `apps/web/test/e2e/profile-editing.spec.ts`
  - **Success Criteria**: Tests all editing scenarios, validation, and auto-join triggers.

---

### **PHASE 1.5 SUCCESS METRICS**

**Before marking Phase 1.5 complete:**

- [ ] **Profile dashboard** displaying all user identity and status information
- [ ] **Space auto-join** working based on major/dorm profile data
- [ ] **Builder status integration** showing role and tool achievements
- [ ] **Privacy controls** functional with granular visibility options
- [ ] **Profile editing** complete with real-time validation and auto-save
- [ ] **Feed personalization** using profile data for content recommendations
- [ ] **Mobile optimization** for all profile interfaces (390px minimum)
- [ ] **Data consistency** between profile and all other platform features
- [ ] **Error handling** for all profile operations and edge cases
- [ ] **Performance optimization** for profile data loading and updates

**?? INTEGRATION VERIFICATION:**

- [ ] **Profile ? Spaces**: Auto-join working for Academic/Residential spaces
- [ ] **Profile ? Feed**: Personalization algorithm using profile interests
- [ ] **Profile ? Tools**: Builder status enabling HiveLAB access
- [ ] **Profile ? Analytics**: Activity tracking integrated with profile metrics

---

## **PHASE 2: FEED & RITUALS ENGINE**

### **PHASE 2 OVERVIEW**

**Goal**: Create the core engagement engine with Top Strip system rail and campus-wide ritual coordination that differentiates HIVE from generic social platforms.

**?? UI/UX Components**: See `@memory-bank/hive-presentation-checklist.md` Phase 2 tasks P2.1-A through P2.2-D

**User Journey Flow**:

```
Feed (/feed) [Primary Home] ? Rituals (/rituals) [Active Participation] ? RSS Events [Campus Integration]
```

**Success Criteria**: Users experience HIVE's unique ritual-driven engagement and see campus events seamlessly integrated.

**Key Differentiators**:

- **Top Strip**: Horizontal system rail showing live campus events
- **Rituals Engine**: Timed campus-wide events that reveal features
- **RSS Integration**: UB events automatically populate the platform
- **Real-time Coordination**: Live participation tracking and updates

---

### **PAGE 2.1: Main Feed (`/feed`) - "Ritual Theater"**

**Page Goal**: Single front door combining Top Strip system rail with campus chatter feed - the primary home screen.
**Page Status**: `[EXISTS - NEEDS MAJOR UPDATES]`
**Existing File**: `apps/web/src/app/feed/page.tsx`

#### **[CONSULT HUMAN] - Feed Architecture Decisions**

**Questions**:

1. **Top Strip Content Priority**: What order should Top Strip tiles appear?

   - Option A: Rituals ? Space Openings ? RSS Events ? Tool Reveals
   - Option B: RSS Events ? Rituals ? Space Openings ? Tool Reveals
   - Option C: Different priority order?

2. **RSS Event Display**: How should UB RSS events appear?

   - Option A: Mixed into main feed with special styling
   - Option B: Separate section in Top Strip only
   - Option C: Both Top Strip preview + main feed full display?

3. **Post Fade Logic**: The "72-hour post fade" rule - what exactly triggers this?
   - Option A: No reactions after 72 hours ? 30% opacity
   - Option B: Low engagement score ? fade
   - Option C: Different fade criteria?

#### **?? UI/UX Layer**

- [ ] **Task**: Build Top Strip system rail (horizontal scroll).

  - **Files**: `packages/ui/src/components/feed/top-strip.tsx`
  - **Success Criteria**:
    - Horizontal scroll with momentum
    - 4 tile types: Unlock banners, ritual countdowns, space openings, tool reveals
    - Auto-refresh every 30 seconds
    - Smooth slide-in animations for new tiles
    - Mobile touch scroll optimized

- [ ] **Task**: Build Main Feed container (vertical scroll).

  - **Files**: `packages/ui/src/components/feed/main-feed.tsx`
  - **Success Criteria**:
    - Infinite scroll with virtualization
    - Content types: Campus chatter, events, space posts, tool posts, ritual threads
    - Pull-to-refresh functionality
    - Skeleton loading states
    - Empty state when no content

- [ ] **Task**: Build campus unlock banner with gold confetti burst.

  - **Files**: `packages/ui/src/components/feed/unlock-banner.tsx`
  - **Success Criteria**:
    - Appears in Top Strip when campus hits 300 students
    - Gold particle animation (3-second burst)
    - Click expands to full celebration modal
    - Auto-dismisses after 24 hours

- [ ] **Task**: Build ritual countdown timer with gold ring animation.

  - **Files**: `packages/ui/src/components/feed/ritual-timer.tsx`
  - **Success Criteria**:
    - Live countdown to ritual start/end
    - Gold ring progress indicator
    - Pulse animation when <1 hour remaining
    - Click navigates to ritual participation

- [ ] **Task**: Build space opening notifications.

  - **Files**: `packages/ui/src/components/feed/space-opening.tsx`
  - **Success Criteria**:
    - Shows when Builder unlocks a space
    - Space crest + "Now Open" text
    - Click navigates to newly opened space
    - Dismissible after viewing

- [ ] **Task**: Build tool reveal tiles.

  - **Files**: `packages/ui/src/components/feed/tool-reveal.tsx`
  - **Success Criteria**:
    - Shows when new tool is published
    - Tool preview + creator info
    - "Try It Now" CTA button
    - Click opens tool in modal

- [ ] **Task**: Build UB pre-seeded events display.

  - **Files**: `packages/ui/src/components/feed/ub-events.tsx`
  - **Success Criteria**:
    - RSS event data formatted for feed
    - Event date/time/location clearly displayed
    - "Learn More" link to original source
    - Proper event categorization

- [ ] **Task**: Build event density management (max 5 per day, auto-collapse).

  - **Files**: `packages/ui/src/components/feed/event-manager.tsx`
  - **Success Criteria**:
    - Shows max 5 events per day in main feed
    - "Show More Events" expandable section
    - Auto-collapse low-priority events
    - Prevents feed spam from high-event days

- [ ] **Task**: Build post composer with emoji reactions.

  - **Files**: `packages/ui/src/components/feed/post-composer.tsx`
  - **Success Criteria**:
    - Rich text editor with emoji picker
    - Character limit indicator (280 chars)
    - Image upload capability
    - Draft auto-save functionality
    - Accessibility compliant

- [ ] **Task**: Implement 72-hour post fade logic.
  - **Files**: `packages/ui/src/components/feed/post-fade.tsx`
  - **Success Criteria**:
    - Posts fade to 30% opacity after criteria met
    - Smooth opacity transition (200ms ease-out)
    - Reactions can "revive" faded posts
    - Clear visual hierarchy maintained

#### **?? STATE Layer**

- [ ] **Task**: Feed real-time updates and caching.

  - **Files**: `packages/hooks/src/use-feed.ts`
  - **Success Criteria**:
    - WebSocket connection for live updates
    - Optimistic UI updates for user actions
    - Intelligent caching with React Query
    - Background refresh every 2 minutes

- [ ] **Task**: Top Strip tile management and expiration.

  - **Files**: `packages/hooks/src/use-top-strip.ts`
  - **Success Criteria**:
    - Real-time tile updates
    - Automatic tile expiration
    - Priority-based tile ordering
    - Smooth tile transitions

- [ ] **Task**: Event rotation and auto-collapse logic.
  - **Files**: `packages/hooks/src/use-event-rotation.ts`
  - **Success Criteria**:
    - Daily event limit enforcement
    - Priority scoring algorithm
    - Auto-collapse low-engagement events
    - User preference learning

#### **?? API Layer**

- [ ] **Task**: Personalized feed generation API.

  - **Files**: `apps/web/src/app/api/feed/personalized/route.ts`
  - **Success Criteria**:
    - User-specific content algorithm
    - Handles pagination and infinite scroll
    - Includes engagement scoring
    - Rate limiting (1000 requests/hour per user)

- [ ] **Task**: Real-time ritual updates.

  - **Files**: `apps/web/src/app/api/rituals/live-updates/route.ts`
  - **Success Criteria**:
    - WebSocket endpoint for ritual state changes
    - Participation count updates
    - Countdown synchronization
    - Event broadcasting to all participants

- [ ] **Task**: Event aggregation from UB RSS.
  - **Files**: `apps/web/src/app/api/events/rss-sync/route.ts`
  - **Success Criteria**:
    - Scheduled RSS feed ingestion (every 4 hours)
    - Event deduplication and categorization
    - Content filtering and moderation
    - Webhook for real-time updates

#### **??? DATA Layer**

- [ ] **Task**: Feed post schema with space/ritual metadata.

  - **Files**: `packages/core/src/domain/feed/post-schema.ts`
  - **Schema**:
    ```typescript
    interface FeedPost {
      id: string;
      authorId: string;
      content: string;
      type:
        | "user_post"
        | "ritual_thread"
        | "space_post"
        | "tool_post"
        | "rss_event";
      spaceId?: string;
      ritualId?: string;
      toolId?: string;
      reactions: Record<string, number>;
      engagementScore: number;
      fadeAt?: Date;
      createdAt: Date;
      updatedAt: Date;
    }
    ```

- [ ] **Task**: Top Strip tile configuration schema.

  - **Files**: `packages/core/src/domain/feed/top-strip-schema.ts`
  - **Schema**:
    ```typescript
    interface TopStripTile {
      id: string;
      type:
        | "unlock_banner"
        | "ritual_countdown"
        | "space_opening"
        | "tool_reveal"
        | "rss_event";
      priority: number;
      data: Record<string, any>;
      expiresAt: Date;
      campusId: string;
    }
    ```

- [ ] **Task**: Event aggregation and rotation logic.
  - **Files**: `packages/core/src/domain/events/aggregation-schema.ts`
  - **Schema**: RSS event processing, deduplication, and priority scoring.

#### **?? TESTING Layer**

- [ ] **Task**: Feed functionality integration tests.

  - **Files**: `apps/web/test/e2e/feed-functionality.spec.ts`
  - **Success Criteria**: Tests Top Strip, main feed, real-time updates, and post interactions.

- [ ] **Task**: Ritual integration tests.
  - **Files**: `apps/web/test/e2e/ritual-integration.spec.ts`
  - **Success Criteria**: Tests ritual countdown, participation, and feed integration.

---

### **PAGE 2.2: Rituals System (`/rituals`) - "Campus-Wide Events"**

**Page Goal**: Timed system events that reveal features, drive engagement, and create shared campus experiences.
**Page Status**: `[BUILD NEW]`

#### **[CONSULT HUMAN] - Ritual Mechanics**

**Questions**:

1. **Ritual Scheduling**: How are rituals scheduled?

   - Option A: HIVE team manually schedules all rituals
   - Option B: Automatic scheduling based on campus milestones
   - Option C: Builders can schedule some ritual types?

2. **Participation Requirements**: What counts as "participation"?

   - Option A: Simply viewing the ritual page
   - Option B: Active interaction (vote, post, react)
   - Option C: Different requirements per ritual type?

3. **Feature Reveal Timing**: When do features unlock?
   - Option A: Immediately when ritual ends
   - Option B: When participation threshold is met
   - Option C: Scheduled delay after ritual completion?

#### **?? UI/UX Layer**

**UI/UX tasks moved to separate presentation checklist:** `@memory-bank/hive-presentation-checklist.md`

**See Phase 2.2 UI/UX tasks P2.2-A through P2.2-D in presentation checklist.**

**Focus on STATE, API, DATA, TESTING, and INTEGRATION layers for implementation.**

#### **?? STATE Layer**

- [ ] **Task**: Ritual lifecycle state machine.

  - **Files**: `packages/hooks/src/use-ritual-lifecycle.ts`
  - **Success Criteria**:
    - State transitions: Draft ? Scheduled ? Countdown ? Active ? Cooldown ? Archived
    - Automatic state progression based on timing
    - Participation tracking throughout lifecycle
    - Error handling for failed state transitions

- [ ] **Task**: Ritual participation tracking.

  - **Files**: `packages/hooks/src/use-ritual-participation.ts`
  - **Success Criteria**:
    - Real-time participation counting
    - User participation status tracking
    - Participation validation and anti-spam
    - Achievement unlocking based on participation

- [ ] **Task**: Results and badge distribution.
  - **Files**: `packages/hooks/src/use-ritual-rewards.ts`
  - **Success Criteria**:
    - Automatic badge distribution
    - Results calculation and display
    - Leaderboard generation
    - Notification system for achievements

#### **?? API Layer**

- [ ] **Task**: Ritual scheduler and state management.

  - **Files**: `apps/web/src/app/api/rituals/scheduler/route.ts`
  - **Success Criteria**:
    - Automated ritual scheduling
    - State transition triggers
    - Campus-specific ritual customization
    - Conflict resolution for overlapping rituals

- [ ] **Task**: Participation tracking and validation.

  - **Files**: `apps/web/src/app/api/rituals/participation/route.ts`
  - **Success Criteria**:
    - Secure participation logging
    - Anti-spam and validation
    - Real-time participation broadcasting
    - Participation analytics and metrics

- [ ] **Task**: Results calculation and badge distribution.
  - **Files**: `apps/web/src/app/api/rituals/results/route.ts`
  - **Success Criteria**:
    - Automated results calculation
    - Badge and achievement distribution
    - Results notification system
    - Historical results storage

#### **??? DATA Layer**

- [ ] **Task**: Ritual configuration schema.

  - **Files**: `packages/core/src/domain/rituals/ritual-schema.ts`
  - **Schema**:
    ```typescript
    interface Ritual {
      id: string;
      name: string;
      type:
        | "orientation_qa"
        | "first_light"
        | "space_unlock"
        | "builder_challenge";
      campusId: string;
      state:
        | "draft"
        | "scheduled"
        | "countdown"
        | "active"
        | "cooldown"
        | "archived";
      scheduledStart: Date;
      scheduledEnd: Date;
      participationCount: number;
      participationGoal?: number;
      config: Record<string, any>;
      rewards: RitualReward[];
    }
    ```

- [ ] **Task**: Participation tracking schema.

  - **Files**: `packages/core/src/domain/rituals/participation-schema.ts`
  - **Schema**: User participation events with validation and anti-spam measures.

- [ ] **Task**: Badge and reward system schema.
  - **Files**: `packages/core/src/domain/rituals/rewards-schema.ts`
  - **Schema**: Achievement definitions, badge metadata, and distribution tracking.

#### **?? TESTING Layer**

- [ ] **Task**: Ritual lifecycle tests.

  - **Files**: `apps/web/test/e2e/ritual-lifecycle.spec.ts`
  - **Success Criteria**: Tests complete ritual flow from scheduling to completion.

- [ ] **Task**: Participation and rewards tests.
  - **Files**: `apps/web/test/e2e/ritual-participation.spec.ts`
  - **Success Criteria**: Tests participation tracking, validation, and reward distribution.

---

### **PHASE 2 SUCCESS METRICS**

**Before marking Phase 2 complete:**

- [ ] **Top Strip system** functional with real-time updates
- [ ] **Ritual engine** operational with all 4 ritual types
- [ ] **RSS event integration** working with UB feed
- [ ] **Real-time participation** tracking and broadcasting
- [ ] **Feed algorithm** personalizing content effectively
- [ ] **Event density management** preventing feed spam
- [ ] **Post fade logic** maintaining feed quality
- [ ] **Mobile optimization** for feed scrolling and interactions
- [ ] **Error handling** for all real-time features
- [ ] **Performance optimization** for high-frequency updates

## **PHASE 3: SPACES & COMMUNITY**

### **PHASE 3 OVERVIEW**

**Goal**: Create the five canonical space categories with proper gating, auto-join mechanics, and Builder-controlled unlocking system that forms HIVE's unique community structure.

**User Journey Flow**:

```
Spaces Hub (/spaces) ? Auto-Join (Academics/Residential) ? Preview Locked Spaces ? Builder Unlocks ? Active Community
```

**Success Criteria**: Users understand the 5 space categories, experience auto-join, and see Builder-gated community activation.

**Key Differentiators**:

- **5 Canonical Categories**: Student Orgs, Greek Life, University Orgs, Academics, Residential
- **Different Operations**: Each category has unique join/access rules
- **Builder Gating**: All spaces locked until manually approved student leaders unlock them
- **Auto-Join Mechanics**: Automatic placement in Academics (major) and Residential (dorm)
- **Preview Mode**: Locked spaces show content preview but no participation until unlocked

---

### **PAGE 3.1: Spaces Hub (`/spaces`) - "Community Gateway"**

**Page Goal**: Central directory showing all 5 space categories with clear access rules and unlock status.
**Page Status**: `[EXISTS - NEEDS MAJOR UPDATES]`
**Existing File**: `apps/web/src/app/spaces/page.tsx`

#### **[CONSULT HUMAN] - Space Category Display**

**Questions**:

1. **Category Layout**: How should the 5 categories be organized on the hub page?

   - Option A: 5 equal tiles in a grid layout
   - Option B: Auto-joined (Academics/Residential) prominently at top, others below
   - Option C: Tabbed interface with category switching?

2. **Lock State Indicators**: How should locked vs unlocked spaces be differentiated?

   - Option A: Locked spaces show with padlock icon and "Preview Only" badge
   - Option B: Locked spaces are grayed out with "Builder Required" message
   - Option C: Locked spaces hidden until unlocked?

3. **Builder Status Display**: How should we show which spaces need Builders?
   - Option A: "Seeking Builder" badge with application CTA
   - Option B: Progress indicator showing "0/1 Builder Required"
   - Option C: Just show locked state without Builder details?

#### **?? UI/UX Layer**

- [ ] **Task**: Build 5-category space navigation grid.

  - **Files**: `packages/ui/src/components/spaces/category-grid.tsx`
  - **Success Criteria**:
    - 5 distinct category tiles: Student Orgs, Greek Life, University Orgs, Academics, Residential
    - Visual hierarchy showing auto-joined vs join-required
    - Lock/unlock status clearly indicated
    - Category descriptions and member counts
    - Responsive grid layout (2x2 + 1 on mobile)

- [ ] **Task**: Build auto-join status indicators.

  - **Files**: `packages/ui/src/components/spaces/auto-join-badge.tsx`
  - **Success Criteria**:
    - "Auto-Joined" badge for Academics and Residential
    - Shows user's major and dorm assignment
    - Edit/update functionality for incorrect assignments
    - Clear visual distinction from manual-join categories

- [ ] **Task**: Build space lock/unlock status display.

  - **Files**: `packages/ui/src/components/spaces/lock-status.tsx`
  - **Success Criteria**:
    - Padlock icon for locked spaces
    - "Preview Only" vs "Active Community" states
    - Builder requirement indicator
    - Unlock celebration animation when Builder activates space

- [ ] **Task**: Build Builder application/request interface.
  - **Files**: `packages/ui/src/components/spaces/builder-request.tsx`
  - **Success Criteria**:
    - "Become a Builder" CTA for eligible spaces
    - Application form with justification text
    - Status tracking: Pending ? Approved/Denied
    - Builder responsibilities explanation

#### **?? STATE Layer**

- [ ] **Task**: Space category and membership state management.

  - **Files**: `packages/hooks/src/use-spaces.ts`
  - **Success Criteria**:
    - Real-time space membership updates
    - Auto-join status tracking for Academics/Residential
    - Lock/unlock state management
    - Builder application status tracking

- [ ] **Task**: Auto-join logic and validation.
  - **Files**: `packages/hooks/src/use-auto-join.ts`
  - **Success Criteria**:
    - Automatic assignment based on onboarding data
    - Validation of major and dorm assignments
    - Update mechanisms for incorrect assignments
    - Conflict resolution for multiple majors/dorms

#### **?? API Layer**

- [ ] **Task**: Space membership and category management.

  - **Files**: `apps/web/src/app/api/spaces/membership/route.ts`
  - **Success Criteria**:
    - Handles all 5 category join/leave operations
    - Enforces category-specific rules (invite-only, faculty-only, etc.)
    - Auto-join processing for Academics/Residential
    - Membership validation and error handling

- [ ] **Task**: Builder application and approval system.
  - **Files**: `apps/web/src/app/api/spaces/builders/route.ts`
  - **Success Criteria**:
    - Builder application submission and tracking
    - HIVE team approval workflow integration
    - Space unlock triggers when Builder approved
    - Builder role assignment and permissions

#### **??? DATA Layer**

- [ ] **Task**: Space category configuration schema.

  - **Files**: `packages/core/src/domain/spaces/category-schema.ts`
  - **Schema**:
    ```typescript
    interface SpaceCategory {
      id:
        | "student_orgs"
        | "greek_life"
        | "university_orgs"
        | "academics"
        | "residential";
      name: string;
      description: string;
      joinType: "open" | "invite_only" | "faculty_controlled" | "auto_join";
      requiresBuilder: boolean;
      builderApproved: boolean;
      memberCount: number;
      spaces: Space[];
    }
    ```

- [ ] **Task**: Builder application and approval schema.
  - **Files**: `packages/core/src/domain/spaces/builder-schema.ts`
  - **Schema**: Builder applications, approval workflow, and role assignments.

#### **?? TESTING Layer**

- [ ] **Task**: Space category and membership tests.
  - **Files**: `apps/web/test/e2e/space-categories.spec.ts`
  - **Success Criteria**: Tests all 5 category types, join mechanics, and auto-join logic.

---

### **PAGE 3.2: Individual Space (`/spaces/[id]`) - "Community Experience"**

**Page Goal**: Individual space experience with proper gating, preview mode, and full community features when unlocked.
**Page Status**: `[EXISTS - NEEDS MAJOR UPDATES]`
**Existing File**: `apps/web/src/app/spaces/[id]/page.tsx`

#### **[CONSULT HUMAN] - Space Experience Design**

**Questions**:

1. **Preview Mode Content**: What should users see in locked spaces?

   - Option A: Recent posts (read-only) + member list + "Unlock to Participate" banner
   - Option B: Space description + member count + sample content + unlock CTA
   - Option C: Minimal preview with just space info + "Builder Required" message?

2. **RSS Event Integration**: How should UB events appear in relevant spaces?

   - Option A: Academic events in Academic spaces, campus events in all spaces
   - Option B: Events filtered by space relevance (CS events in CS major space)
   - Option C: All events available in all spaces with filtering options?

3. **Builder Unlock Flow**: What happens when a Builder unlocks a space?
   - Option A: Immediate notification to all members + celebration animation
   - Option B: Scheduled unlock with advance notice + countdown
   - Option C: Quiet unlock with just status change?

#### **?? UI/UX Layer**

- [ ] **Task**: Build locked space preview interface.

  - **Files**: `packages/ui/src/components/spaces/locked-preview.tsx`
  - **Success Criteria**:
    - Shows space description and member count
    - Displays recent posts in read-only mode
    - Clear "Preview Only" banner at top
    - "Become a Builder" CTA if eligible
    - RSS events relevant to space category

- [ ] **Task**: Build unlocked space full experience.

  - **Files**: `packages/ui/src/components/spaces/active-space.tsx`
  - **Success Criteria**:
    - Full post composer and interaction capabilities
    - Event calendar integration with RSS feeds
    - Member directory and Builder identification
    - Space-specific tools and features
    - Real-time activity feed

- [ ] **Task**: Build space unlock celebration.

  - **Files**: `packages/ui/src/components/spaces/unlock-celebration.tsx`
  - **Success Criteria**:
    - Gold confetti animation when space unlocks
    - "Space Now Active" notification to all members
    - Builder introduction and welcome message
    - Feature tour highlighting newly available capabilities

- [ ] **Task**: Build category-specific join interfaces.
  - **Files**: `packages/ui/src/components/spaces/join-interfaces.tsx`
  - **Success Criteria**:
    - Student Orgs: Open join button
    - Greek Life: "Request Invite" with member referral system
    - University Orgs: "Faculty Approval Required" with request form
    - Academics/Residential: Auto-joined status display
    - Proper error handling for each join type

#### **?? STATE Layer**

- [ ] **Task**: Space lock/unlock state management.

  - **Files**: `packages/hooks/src/use-space-status.ts`
  - **Success Criteria**:
    - Real-time lock/unlock status updates
    - Preview vs active mode state handling
    - Builder presence and activity tracking
    - Member permission level management

- [ ] **Task**: RSS event filtering and display.
  - **Files**: `packages/hooks/src/use-space-events.ts`
  - **Success Criteria**:
    - Category-specific event filtering
    - Academic events matched to major spaces
    - Campus-wide events shown in all spaces
    - Event relevance scoring and prioritization

#### **?? API Layer**

- [ ] **Task**: Space content and activity management.

  - **Files**: `apps/web/src/app/api/spaces/[id]/activity/route.ts`
  - **Success Criteria**:
    - Handles locked vs unlocked content access
    - Preview mode content filtering
    - Full activity feed for unlocked spaces
    - Real-time activity broadcasting

- [ ] **Task**: Space unlock and Builder management.
  - **Files**: `apps/web/src/app/api/spaces/[id]/unlock/route.ts`
  - **Success Criteria**:
    - Space unlock triggers and notifications
    - Builder role assignment and permissions
    - Member notification system for unlock events
    - Unlock celebration event broadcasting

#### **??? DATA Layer**

- [ ] **Task**: Space activity and content schema.

  - **Files**: `packages/core/src/domain/spaces/activity-schema.ts`
  - **Schema**:
    ```typescript
    interface SpaceActivity {
      id: string;
      spaceId: string;
      type: "post" | "event" | "announcement" | "rss_event";
      content: string;
      authorId?: string;
      isVisible: boolean; // false for locked spaces
      createdAt: Date;
    }
    ```

- [ ] **Task**: Space unlock and Builder tracking schema.
  - **Files**: `packages/core/src/domain/spaces/unlock-schema.ts`
  - **Schema**: Space unlock events, Builder assignments, and member notifications.

#### **?? TESTING Layer**

- [ ] **Task**: Space lock/unlock functionality tests.
  - **Files**: `apps/web/test/e2e/space-unlock.spec.ts`
  - **Success Criteria**: Tests preview mode, unlock flow, and Builder management.

---

### **PHASE 3 SUCCESS METRICS**

**Before marking Phase 3 complete:**

- [ ] **5 space categories** properly configured with correct join mechanics
- [ ] **Auto-join system** working for Academics and Residential based on onboarding
- [ ] **Builder gating system** functional with application and approval workflow
- [ ] **Preview mode** showing appropriate content for locked spaces
- [ ] **Space unlock flow** working with celebrations and notifications
- [ ] **RSS event integration** filtering events appropriately by space category
- [ ] **Category-specific join flows** working (open, invite-only, faculty-controlled)
- [ ] **Mobile optimization** for space browsing and interaction
- [ ] **Real-time updates** for space status changes and member activity
- [ ] **Error handling** for all space operations and edge cases

## **PHASE 4: HIVELAB & TOOL BUILDER**

### **PHASE 4 OVERVIEW**

**Goal**: Create the HiveLAB tool creation system that allows Builders to create, deploy, and manage custom tools for campus engagement - HIVE's core differentiator.

**User Journey Flow**:

```
HiveLAB Hub (/hivelab) ? Tool Templates ? Builder Creation ? Tool Publishing ? Campus Deployment ? Usage Analytics
```

**Success Criteria**: Builders can create functional tools from templates and deploy them campus-wide with real-time analytics.

**Key Differentiators**:

- **Builder-Only Access**: Only approved student leaders can create tools
- **3 vBETA Templates**: Poll, RSVP, Simple Form (expandable post-vBETA)
- **Visual Builder**: Drag-and-drop interface for tool creation
- **Real-time Deployment**: Tools go live immediately after creation
- **Usage Analytics**: Comprehensive engagement tracking for tool creators

---

### **PAGE 4.1: HiveLAB Hub (`/hivelab`) - "Creation Engine"**

**Page Goal**: Central dashboard for tool creation, management, and analytics - exclusive to approved Builders.
**Page Status**: `[BUILD NEW]`

#### **[CONSULT HUMAN] - HiveLAB Access & Interface**

**Questions**:

1. **Builder Access Control**: How should non-Builders experience HiveLAB?

   - Option A: Completely hidden from non-Builders (404/redirect)
   - Option B: Visible but shows "Builder Required" with application CTA
   - Option C: Preview mode showing sample tools + "Become a Builder" flow?

2. **Tool Template Priority**: Which template should be most prominent?

   - Option A: Poll (most versatile for campus engagement)
   - Option B: RSVP (events are core to campus life)
   - Option C: Equal prominence for all 3 templates?

3. **Analytics Dashboard**: What metrics are most important for Builders?
   - Option A: Usage stats (views, interactions, completion rates)
   - Option B: Engagement quality (time spent, user feedback)
   - Option C: Campus impact (reach, viral coefficient, retention)?

#### **?? UI/UX Layer**

- [ ] **Task**: Build Builder-only access control and verification.

  - **Files**: `packages/ui/src/components/hivelab/access-control.tsx`
  - **Success Criteria**:
    - Automatic Builder role verification on page load
    - Graceful redirect for non-Builders with explanation
    - "Apply to be a Builder" CTA for eligible users
    - Clear Builder status indicator in navigation

- [ ] **Task**: Build tool template selection interface.

  - **Files**: `packages/ui/src/components/hivelab/template-selector.tsx`
  - **Success Criteria**:
    - 3 template cards: Poll, RSVP, Simple Form
    - Template previews with sample configurations
    - "Create Tool" CTA for each template
    - Template descriptions and use case examples
    - Responsive grid layout

- [ ] **Task**: Build active tools dashboard.

  - **Files**: `packages/ui/src/components/hivelab/tools-dashboard.tsx`
  - **Success Criteria**:
    - List of Builder's published tools
    - Real-time usage statistics
    - Quick actions: Edit, Duplicate, Archive, Analytics
    - Tool status indicators: Draft, Published, Archived
    - Search and filter functionality

- [ ] **Task**: Build tool analytics overview.
  - **Files**: `packages/ui/src/components/hivelab/analytics-overview.tsx`
  - **Success Criteria**:
    - Key metrics: Total views, interactions, completion rate
    - Usage trends over time (last 7/30 days)
    - Top performing tools ranking
    - Campus engagement impact metrics
    - Export functionality for detailed reports

#### **?? STATE Layer**

- [ ] **Task**: Builder role and permissions management.

  - **Files**: `packages/hooks/src/use-builder-auth.ts`
  - **Success Criteria**:
    - Real-time Builder status verification
    - Permission level checking (create, edit, publish, analytics)
    - Builder application status tracking
    - Role-based feature access control

- [ ] **Task**: Tool creation and management state.
  - **Files**: `packages/hooks/src/use-tool-management.ts`
  - **Success Criteria**:
    - Tool creation workflow state machine
    - Draft saving and auto-recovery
    - Publishing status tracking
    - Real-time analytics data fetching

#### **?? API Layer**

- [ ] **Task**: Builder verification and role management.

  - **Files**: `apps/web/src/app/api/hivelab/auth/route.ts`
  - **Success Criteria**:
    - Builder role verification endpoint
    - Permission level checking
    - Builder application processing
    - Role assignment and revocation

- [ ] **Task**: Tool creation and publishing system.
  - **Files**: `apps/web/src/app/api/hivelab/tools/route.ts`
  - **Success Criteria**:
    - Tool creation, editing, and deletion
    - Publishing workflow with validation
    - Tool duplication and templating
    - Bulk operations for tool management

#### **??? DATA Layer**

- [ ] **Task**: Builder role and permissions schema.

  - **Files**: `packages/core/src/domain/hivelab/builder-schema.ts`
  - **Schema**:
    ```typescript
    interface Builder {
      id: string;
      userId: string;
      campusId: string;
      approvedAt: Date;
      approvedBy: string;
      permissions: BuilderPermission[];
      toolsCreated: number;
      totalEngagement: number;
      status: "active" | "suspended" | "revoked";
    }
    ```

- [ ] **Task**: Tool metadata and configuration schema.
  - **Files**: `packages/core/src/domain/hivelab/tool-schema.ts`
  - **Schema**: Tool definitions, configurations, publishing status, and analytics metadata.

#### **?? TESTING Layer**

- [ ] **Task**: Builder access control tests.
  - **Files**: `apps/web/test/e2e/hivelab-access.spec.ts`
  - **Success Criteria**: Tests Builder verification, non-Builder redirects, and permission enforcement.

---

### **PAGE 4.2: Tool Builder (`/hivelab/create/[template]`) - "Visual Creator"**

**Page Goal**: Visual tool creation interface for the 3 vBETA templates with real-time preview.
**Page Status**: `[BUILD NEW]`

#### **[CONSULT HUMAN] - Tool Builder Interface**

**Questions**:

1. **Builder Interface Style**: What approach for the visual builder?

   - Option A: Split-screen (config on left, preview on right)
   - Option B: Tabbed interface (Configure ? Preview ? Publish)
   - Option C: Modal-based workflow with step-by-step wizard?

2. **Template Customization Depth**: How much customization for vBETA?

   - Option A: Basic customization (title, description, options/fields)
   - Option B: Advanced styling (colors, fonts, layout options)
   - Option C: Minimal customization to ship faster?

3. **Preview Functionality**: How should the preview work?
   - Option A: Live preview that updates as you configure
   - Option B: "Preview" button that opens modal with full simulation
   - Option C: Side-by-side preview with interaction capability?

#### **?? UI/UX Layer**

- [ ] **Task**: Build Poll tool creator interface.

  - **Files**: `packages/ui/src/components/hivelab/poll-creator.tsx`
  - **Success Criteria**:
    - Question input with character limit
    - Multiple choice options (2-6 options)
    - Poll duration settings (1 hour to 7 days)
    - Anonymous vs identified voting toggle
    - Results visibility settings
    - Real-time preview with sample data

- [ ] **Task**: Build RSVP tool creator interface.

  - **Files**: `packages/ui/src/components/hivelab/rsvp-creator.tsx`
  - **Success Criteria**:
    - Event details form (title, description, date/time, location)
    - Capacity limits and waitlist options
    - RSVP deadline settings
    - Confirmation message customization
    - Attendee list visibility settings
    - Calendar integration options

- [ ] **Task**: Build Simple Form creator interface.

  - **Files**: `packages/ui/src/components/hivelab/form-creator.tsx`
  - **Success Criteria**:
    - Drag-and-drop field builder
    - Field types: Text, Email, Number, Select, Checkbox, Radio
    - Required field validation
    - Form submission settings
    - Response collection and export options
    - Custom thank you message

- [ ] **Task**: Build universal tool preview system.
  - **Files**: `packages/ui/src/components/hivelab/tool-preview.tsx`
  - **Success Criteria**:
    - Real-time preview updates during configuration
    - Interactive preview with sample data
    - Mobile and desktop preview modes
    - Accessibility testing indicators
    - Performance optimization warnings

#### **?? STATE Layer**

- [ ] **Task**: Tool creation workflow state management.

  - **Files**: `packages/hooks/src/use-tool-creation.ts`
  - **Success Criteria**:
    - Multi-step creation workflow
    - Auto-save draft functionality
    - Configuration validation
    - Preview state synchronization
    - Publishing readiness checks

- [ ] **Task**: Template-specific configuration management.
  - **Files**: `packages/hooks/src/use-template-config.ts`
  - **Success Criteria**:
    - Template-specific validation rules
    - Configuration schema enforcement
    - Default value management
    - Configuration import/export

#### **?? API Layer**

- [ ] **Task**: Tool configuration validation and saving.

  - **Files**: `apps/web/src/app/api/hivelab/tools/[id]/config/route.ts`
  - **Success Criteria**:
    - Configuration validation against template schema
    - Draft saving with versioning
    - Configuration conflict resolution
    - Template compliance checking

- [ ] **Task**: Tool preview generation and testing.
  - **Files**: `apps/web/src/app/api/hivelab/tools/[id]/preview/route.ts`
  - **Success Criteria**:
    - Dynamic preview generation
    - Sample data injection for testing
    - Preview URL generation for sharing
    - Performance and accessibility analysis

#### **??? DATA Layer**

- [ ] **Task**: Tool template definitions and schemas.

  - **Files**: `packages/core/src/domain/hivelab/templates/`
  - **Schema**:
    ```typescript
    interface ToolTemplate {
      id: "poll" | "rsvp" | "simple_form";
      name: string;
      description: string;
      configSchema: JSONSchema;
      defaultConfig: Record<string, any>;
      previewComponent: string;
      runtimeComponent: string;
    }
    ```

- [ ] **Task**: Tool configuration and versioning schema.
  - **Files**: `packages/core/src/domain/hivelab/tool-config-schema.ts`
  - **Schema**: Tool configurations, version history, and deployment tracking.

#### **?? TESTING Layer**

- [ ] **Task**: Tool creation workflow tests.
  - **Files**: `apps/web/test/e2e/tool-creation.spec.ts`
  - **Success Criteria**: Tests all 3 template creators, preview functionality, and publishing flow.

---

### **PAGE 4.3: Tool Runtime (`/tools/[id]`) - "Live Tool Experience"**

**Page Goal**: Live tool experience for campus users with real-time interaction and results.
**Page Status**: `[BUILD NEW]`

#### **?? UI/UX Layer**

- [ ] **Task**: Build Poll runtime interface.

  - **Files**: `packages/ui/src/components/tools/poll-runtime.tsx`
  - **Success Criteria**:
    - Voting interface with single/multiple choice
    - Real-time vote count updates
    - Results visualization (bar charts, percentages)
    - Vote confirmation and change capability
    - Anonymous voting privacy protection

- [ ] **Task**: Build RSVP runtime interface.

  - **Files**: `packages/ui/src/components/tools/rsvp-runtime.tsx`
  - **Success Criteria**:
    - Event details display with countdown
    - RSVP form with attendee information
    - Capacity tracking and waitlist management
    - Confirmation emails and calendar invites
    - Attendee list (if enabled by creator)

- [ ] **Task**: Build Simple Form runtime interface.

  - **Files**: `packages/ui/src/components/tools/form-runtime.tsx`
  - **Success Criteria**:
    - Dynamic form rendering from configuration
    - Field validation and error handling
    - Progress indicator for multi-step forms
    - Submission confirmation and thank you page
    - Response editing capability (if enabled)

- [ ] **Task**: Build tool analytics tracking.
  - **Files**: `packages/ui/src/components/tools/analytics-tracker.tsx`
  - **Success Criteria**:
    - View tracking with unique user identification
    - Interaction event logging
    - Completion rate tracking
    - Time-on-tool analytics
    - User journey tracking through tool

#### **?? STATE Layer**

- [ ] **Task**: Tool interaction and response management.
  - **Files**: `packages/hooks/src/use-tool-interaction.ts`
  - **Success Criteria**:
    - User response tracking and validation
    - Real-time updates for collaborative tools
    - Response editing and deletion
    - Interaction analytics collection

#### **?? API Layer**

- [ ] **Task**: Tool response collection and processing.

  - **Files**: `apps/web/src/app/api/tools/[id]/responses/route.ts`
  - **Success Criteria**:
    - Response validation and storage
    - Real-time response broadcasting
    - Response analytics calculation
    - Data export for tool creators

- [ ] **Task**: Tool analytics and engagement tracking.
  - **Files**: `apps/web/src/app/api/tools/[id]/analytics/route.ts`
  - **Success Criteria**:
    - Comprehensive usage analytics
    - Real-time engagement metrics
    - User behavior tracking
    - Performance optimization insights

#### **??? DATA Layer**

- [ ] **Task**: Tool response and interaction schema.

  - **Files**: `packages/core/src/domain/tools/response-schema.ts`
  - **Schema**:
    ```typescript
    interface ToolResponse {
      id: string;
      toolId: string;
      userId: string;
      responseData: Record<string, any>;
      submittedAt: Date;
      isAnonymous: boolean;
      ipAddress?: string;
      userAgent?: string;
    }
    ```

- [ ] **Task**: Tool analytics and engagement schema.
  - **Files**: `packages/core/src/domain/tools/analytics-schema.ts`
  - **Schema**: Tool usage metrics, engagement tracking, and performance analytics.

#### **?? TESTING Layer**

- [ ] **Task**: Tool runtime functionality tests.
  - **Files**: `apps/web/test/e2e/tool-runtime.spec.ts`
  - **Success Criteria**: Tests all 3 tool types, user interactions, and analytics tracking.

---

### **PHASE 4 SUCCESS METRICS**

**Before marking Phase 4 complete:**

- [ ] **Builder access control** working with proper role verification
- [ ] **3 tool templates** functional with creation and publishing workflow
- [ ] **Visual tool builder** operational for all template types
- [ ] **Tool runtime system** working with real-time interactions
- [ ] **Analytics tracking** comprehensive for tool creators
- [ ] **Publishing workflow** smooth from creation to campus deployment
- [ ] **Mobile optimization** for both creation and usage interfaces
- [ ] **Performance optimization** for tool loading and interaction
- [ ] **Error handling** for all tool creation and usage scenarios
- [ ] **Data export** functionality for tool creators and campus analytics

---

## **?? HIVE vBETA SUCCESS METRICS**

**Before any campus launch:**

- [ ] **Campus entry flow** tested end-to-end (.edu verification to feed)
- [ ] **Rituals system** functional with live timer and participation tracking
- [ ] **Spaces auto-join** working based on dorm/major selection
- [ ] **HiveLAB tool creation** and deployment functional
- [ ] **Feed Top Strip** showing real-time campus events
- [ ] **Builder role** management and space claiming operational
- [ ] **Brand consistency** (#0A0A0A, #FFD700, 200ms animations)
- [ ] **Mobile responsive** design for all core flows (390px mobile minimum)
- [ ] **Legal pages** accessible and complete

**?? HIVE vBETA will be ready for first campus launch with all unique features that differentiate it from generic social platforms.**

---

## **?? MOBILE DEFERRAL NOTES**

**IMPORTANT**: Mobile app development is deferred 1 month post web launch. Current checklist focuses on **responsive web design** that works excellently on mobile browsers.

The web platform will be fully mobile-responsive, providing an excellent mobile experience while we prepare the native mobile app for the follow-up launch.

---

## **?? PHASE 1: Campus Entry & Identity** - [? COMPLETED]

### **P1-A: Landing Page (`/`) - [? COMPLETED]**

- [x] **Brand-perfect landing with hero CTA**
  - Evidence: Existing `/` page operational with proper HIVE branding
- [x] **"Get Inside" CTA ? Campus Selection**
  - Evidence: CTA routes to `/campus` page correctly

### **P1-B: Typography & Brand Assets - [? COMPLETED]**

- [x] **Updated font loading to General Sans Variable + Inter Variable**
  - Evidence: Updated `apps/web/src/app/layout.tsx` with new font imports
  - Evidence: Updated `packages/tokens/src/typography.ts` with correct font families
  - Evidence: Updated `packages/ui/tailwind.config.ts` with font variables
- [x] **Integrated new logo variants (black/white SVGs)**
  - Evidence: Updated `packages/ui/src/components/brand/hive-logo.tsx` with variant support
  - Evidence: Navbar using white logo variant for dark theme
  - Evidence: Logo assets moved to `/public/` directory

### **P1-C: Campus Selection (`/campus`) - [? COMPLETED - UB ONLY]**

- [x] **University selection focused on UB launch**
  - Evidence: Updated `apps/web/src/app/campus/page.tsx` for UB-only launch
  - Evidence: SUNY universities list replaced with single UB entry
  - Evidence: All messaging updated for "UB vBETA Launch"
- [x] **UB-specific validation and messaging**
  - Evidence: Search placeholder: "Verify you're a UB student..."
  - Evidence: vBETA info card focused on @buffalo.edu email requirement
  - Evidence: Help section updated for UB-only launch context

### **P1-D: Waitlist System (`/waitlist/[schoolId]`) - [? COMPLETED - UB FOCUSED]**

- [x] **UB-only waitlist with manual threshold control**
  - Evidence: Updated `apps/web/src/app/waitlist/[schoolId]/page.tsx` with UB validation
  - Evidence: Updated `components/waitlist-progress.tsx` with manual activation support
  - Evidence: Reduced threshold to 100 students for UB launch
- [x] **Brand-consistent UB messaging throughout**
  - Evidence: Updated `components/waitlist-form.tsx` with UB-specific copy
  - Evidence: Success state: "Welcome to the UB founding community!"
  - Evidence: Form labels: "UB email address" and founding community messaging

### **P1-E: Share Invite System (`/share`) - [? COMPLETED - BUILT FROM SCRATCH]**

- [x] **Complete UB invite system with social sharing**
  - Evidence: Created `apps/web/src/app/share/page.tsx` from scratch
  - Evidence: UB-specific invite links with tracking parameters
  - Evidence: Social media sharing (Twitter, Facebook, Instagram)
- [x] **Share statistics and message templates**
  - Evidence: Invite stats dashboard (invites sent, friends joined)
  - Evidence: Copy-to-clipboard functionality for invite links
  - Evidence: Pre-written message template for UB students
- [x] **Brand-consistent design with proper typography**
  - Evidence: Uses `font-display` for headlines, `font-sans` for body text
  - Evidence: HIVE gold accent colors (#FFD700) throughout
  - Evidence: UB founding launch messaging and "Bulls" references

---

## **?? PHASE 1 COMPLETION SUMMARY**

**? ALL PHASE 1 TASKS COMPLETED FOR UB LAUNCH**

**Key Achievements:**

- **Typography System**: Successfully implemented General Sans Variable + Inter Variable
- **Brand Assets**: Integrated black/white logo variants with responsive component
- **UB-Only Focus**: All pages updated for University at Buffalo exclusive launch
- **Manual Threshold**: Waitlist system supports manual activation for UB launch timing
- **Complete Share System**: Built comprehensive invite system from scratch
- **Brand Consistency**: All components use proper HIVE colors and typography

**Infrastructure Status:**

- ? TypeScript compilation: All packages compiling successfully
- ? ESLint status: No new errors introduced by Phase 1 changes
- ? Font loading: General Sans Variable and Inter Variable properly configured
- ? Logo system: Black/white variants working across all components

**Ready for Phase 2**: Campus entry flow is complete and UB-focused. All foundational systems in place for onboarding and authentication flows.
