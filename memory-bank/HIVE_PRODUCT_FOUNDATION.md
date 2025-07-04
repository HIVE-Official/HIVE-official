# HIVE Product Foundation

**Living Document**: This serves as the comprehensive foundation for understanding HIVE's product architecture, user journeys, and technical implementation.

## Product Overview

HIVE is a **social discovery and networking platform** designed for college students and communities. The platform focuses on creating meaningful connections through interest-based spaces, events, and authentic social interactions.

### Core Product Philosophy
- **Community-First**: Every feature builds towards stronger community connections
- **Authentic Engagement**: Moving beyond surface-level social media to meaningful interactions
- **Interest-Based Discovery**: Connecting people through shared passions and activities
- **Academic Integration**: Tailored for college life and academic communities

---

## Product Architecture Slices

### 1. Onboarding & Authentication Slice

**Purpose**: Seamless user acquisition and identity verification with academic context

#### User Journey
```
School Selection → Email Entry → Magic Link Authentication → 
Display Name & Avatar → Academic Info (Level/Major/Year) → 
Leadership Role → Interest Selection → Onboarding Complete
```

#### Key Features & Implementation

##### **Authentication System**
- **School Selection**: Multi-school support (currently hardcoded to UB - needs implementation)
- **Email Domain Validation**: Validates email against selected school domain
- **Magic Link Flow**: Planned but not yet implemented (currently logs and redirects)
- **Firebase Auth Integration**: Production-ready with development mode bypass
- **Session Management**: JWT tokens with custom claims for onboarding status

**Files**: `apps/web/src/app/auth/AuthPageClient.tsx`, `packages/auth-logic/src/hooks/use-auth.ts`

##### **Multi-Step Onboarding Wizard**
**Step 1 - Welcome & Profile Creation** (`/onboarding/1`)
- Display name input with auto-generated handle
- Avatar upload with Firebase Storage integration
- Terms acceptance and consent management
- Handle availability checking via API

**Step 2 - Academic Information** (`/onboarding/2`) 
- Academic level selection (undergraduate, graduate, PhD, faculty, alumni)
- Multiple major selection support
- Graduation year picker (current year + 8 years)

**Step 3 - Leadership & Verification** (`/onboarding/3`)
- Student leader role selection (leaders can request spaces post-onboarding)
- Verification level assignment (verified → verified+)
- Builder program opt-in

**Step 4 - Interest Selection** (`/onboarding/4`)
- 8 categories with 67 total interests
- Multi-selection interface
- Interest-based recommendations for later space discovery

**Step 5 - Onboarding Complete** (`/onboarding/complete`)
- Welcome message and next steps
- Redirect to main application

**Files**: `apps/web/src/app/onboarding/[step]/onboarding-step-client.tsx`, `packages/ui/src/components/onboarding/`

**Note**: Space discovery happens POST-onboarding, not during the flow

##### **Interest System**
- **8 Categories**: Academic, Creative, Technology, Sports, Social, Career, Lifestyle, Entertainment
- **67 Total Interests**: From "Research" to "Pop Culture"
- **Multi-selection Interface**: Category-based selection UI
- **Interest Persistence**: Stored in user profile for space recommendations

**Files**: `packages/core/src/constants/interests.ts`

##### **Data Models & Storage**
```typescript
interface OnboardingState {
  // Identity
  displayName: string;
  handle: string; // Auto-generated from displayName
  avatarUrl?: string;
  
  // Academic
  academicLevel: "undergraduate" | "graduate" | "phd" | "faculty" | "alumni";
  majors: string[];
  graduationYear: number;
  
  // Leadership
  isStudentLeader: boolean;
  verificationLevel: "verified" | "verified+" | "faculty" | "alumni";
  spaceClaims?: SpaceClaim[];
  
  // Interests & Completion
  interests: string[];
  consentGiven: boolean;
  isComplete: boolean;
}
```

**Files**: `packages/core/src/types/onboarding.ts`, `apps/web/src/lib/stores/onboarding.ts`

#### Technical Implementation

##### **State Management**
- **Zustand Store**: `useOnboardingStore` for onboarding flow state
- **Persistence**: Local state during flow, Firestore on completion
- **Development Mode**: Mock data injection for local development
- **Validation**: Real-time form validation and error handling

##### **API Integration**
- **Completion Endpoint**: `POST /api/auth/complete-onboarding`
- **Handle Checking**: Real-time availability validation
- **Avatar Upload**: Firebase Functions integration for secure uploads
- **Transaction Safety**: Firestore transactions for data consistency

##### **Development Features**
- **Dev Mode Bypass**: Works without Firebase credentials
- **Mock User System**: Predefined test data for rapid development
- **Error Simulation**: Configurable error states for testing
- **Debug Logging**: Comprehensive logging throughout the flow

#### Success Metrics
- **Completion Rate**: % of users completing all 3 onboarding steps
- **Handle Availability**: Success rate of auto-generated handles
- **Academic Verification**: Distribution of verification levels achieved
- **Interest Engagement**: Correlation between selected interests and space participation
- **Leadership Adoption**: % of users claiming student leader roles

---

### 2. Feed & Rituals Slice

**Purpose**: Early Campus Pulse - curated content experience that grows organically through RSS and Rituals

#### User Journey (vBETA Reality)
```
RSS Discovery → Ritual Participation → First Light Posting → 
Community Q&A → Torch Passing → Organic Content Creation
```

#### Key Features & Implementation

##### **Feed: vBETA Early Campus Pulse**

**Vision**: Feed starts quiet and grows organically. During vBETA, it's primarily populated by RSS imports and Ritual participation, evolving into a rich stream as Spaces activate and Tools generate content.

**✅ Advanced Backend Foundation**
- **Sophisticated Feed Ranking Algorithm**: `MainFeedRanker` with content weighting and personalization
- **Complete API Infrastructure**: Full post creation, engagement, and feed management
- **Rich Content Models**: 6 post types with mentions, hashtags, media positioning
- **Comprehensive Analytics**: User engagement tracking and content performance metrics

**Files**: `packages/core/src/domain/feed/`, `apps/web/src/app/api/posts/`, `functions/src/feed/`

**🟡 vBETA Feed Reality** - Curated Bootstrap Experience

**Week 1 Feed Example:**
```
YOUR FEED - WEEK 1
━━━━━━━━━━━━━━━━━━━━━━━━

📅 CAMPUS EVENTS (via RSS)
Tomorrow: CS Department Mixer - 4pm
Friday: Summer Concert Series
[See all events →]

🕯️ FIRST LIGHTS TODAY
Sarah Chen just lit their flame
"Excited to shape campus with HIVE"
Marcus Rodriguez's first light
"Anyone else staying for summer session?"

❓ ORIENTATION Q&A
"What's something you wish you knew 
before starting at UB?"
[Answer to unlock] • 67 responses

🔔 NEW RITUAL DROPPING
Thursday 8pm: Campus Vibe Check
[Set reminder]
```

##### **RSS Integration Strategy** 🟡 Framework Ready, Content Missing

**Pre-Seeded Content Sources:**
- **Academic Departments**: Course announcements, hackathons, tech talks  
- **Residential Halls**: Dorm events, community programs
- **Student Organizations**: Meeting schedules, event announcements
- **Campus-Wide**: University calendar, dining specials, registration deadlines

**Smart Filtering Logic:**
- CS Major → See hackathons and department events
- Ellicott Resident → See dorm programming
- Greek Member → See philanthropy and social events

**❌ Implementation Gap**: RSS feeds not yet configured or integrated

**Files needed**: `packages/core/src/utils/rss-integration.ts`, RSS feed configuration

##### **Rituals: Platform Revelation Engine** 🟡 Backend Ready, UI Missing

**Philosophy**: HIVE-designed campus-wide experiences that drop every few weeks. Each Ritual serves dual purpose: create engagement moments and progressively reveal platform features.

**✅ Confirmed vBETA Rituals (Backend Ready)**

**1. 🕯️ First Light (Week 1)**
```
LIGHT YOUR FLAME
━━━━━━━━━━━━━━━━━━━━━━━━

Welcome to HIVE. Before you can build,
you must begin. Light your flame with
your first public words.

[Compose your first light]

✨ 127 flames lit today
```
- Breaks ice on public posting
- Creates founding moment for students
- Beautiful animation celebrates each participation
- Unlocks further platform participation

**2. ❓ Orientation Q&A (Week 1-2)**
```
TODAY'S QUESTION
━━━━━━━━━━━━━━━━━━━━━━━━

"What's one thing you wish someone
had told you before starting here?"

Your answer helps next year's freshmen.

[Share wisdom] • 234 answers
```
- Rotating prompts: Monday (advice), Wednesday (funny moments), Friday (hidden gems)
- Creates valuable content for future students
- Builds community through shared experiences

**3. 🔗 Torch Pass (Week 2)**
```
PASS THE TORCH
━━━━━━━━━━━━━━━━━━━━━━━━

You've been granted 3 invitation torches.
Pass them to students who'll help build
our campus community.

Time remaining: 47:23:16

[Generate invite link] 
Torches remaining: 🔥🔥🔥
```
- Limited quantity creates invitation value
- Time pressure drives immediate action
- "Torch" metaphor reinforces builder identity

**❌ Missing Implementation:**
- Ritual announcement system
- Participation UI components  
- Progress tracking and celebrations
- Collective visualization displays

**Files**: `packages/core/src/domain/feed/top-strip.ts`, `functions/src/feed/joinRitual.ts`

##### **Ritual Calendar & Mechanics** ❌ Not Implemented

**Summer vBETA Schedule:**
```
JULY
Week 1: 🕯️ First Light + ❓ Q&A
Week 2: 🔗 Torch Pass  
Week 3: 🎯 Space Hunt (Space discovery ritual)
Week 4: 🌟 Builder Spotlight

AUGUST  
Week 1: 🏆 Space Wars Begin
Week 2: 🎲 Tool Roulette  
Week 3: 🌊 Wave (viral challenge)
Week 4: 🎓 Summer Finale
```

**Participation Rewards** (Not gamification, but access):
- Complete First Light → Can post in Spaces
- Answer Q&A → See all community responses  
- Pass torches → Early access badge
- Win competitions → Platform influence

#### Current Implementation Status

##### **✅ Strong Foundation**
- Advanced feed ranking algorithm ready for content
- Complete API layer for posts, rituals, and engagement
- Comprehensive analytics and tracking systems
- Rich content models supporting all planned features

##### **❌ Critical vBETA Gaps**
- **No RSS Integration**: Campus event feeds not connected
- **No Ritual UI**: Backend exists but no user interface
- **No Feed Bootstrap**: Empty state instead of curated experience
- **No Announcement System**: No way to launch new Rituals
- **No Progress Tracking**: Participation and collective progress not visible

#### Integration with Other Slices

**🔗 Spaces Integration**: ✅ Ready for Activation
- Space activation creates feed moments
- Space events appear in personalized feed
- Builder activities generate community content

**🔗 Profile Integration**: ✅ Activity Tracking
- Ritual participation appears in activity log
- First Light becomes profile milestone
- Engagement metrics integrated into profile analytics

**🔗 Authentication Integration**: ✅ Complete
- All ritual participation requires authentication
- Progress tied to verified student accounts
- Permission validation for posting and engagement

#### Success Metrics (vBETA Focus)

**Feed Evolution Goals:**
- Week 1: 90% RSS/Ritual content, 10% organic
- Week 4: 70% RSS/Ritual content, 30% organic  
- Week 8: 40% RSS/Ritual content, 60% organic
- Fall Launch: 20% RSS/Ritual content, 80% organic

**Ritual Health:**
- **Participation Rate**: 60%+ of active users join rituals
- **Completion Rate**: 80% of users who start complete the ritual
- **Feature Adoption**: 70% of users continue using unlocked features
- **Community Building**: 50% of First Light participants still active in Week 8

---

### 3. Spaces Slice

**Purpose**: Pre-seeded campus communities with leader-driven activation (vBETA Preview Mode)

#### User Journey (vBETA Vision)
```
Browse Preview Spaces → Request to Lead Space → Quick Verification → 
Space Handoff → Leader Plants Tools → Space Goes Live → Members Join
```

#### Key Features & Implementation

##### **Current Implementation Status**

**✅ Space Data Architecture**
- **Dual Space Models**: Two different implementations exist
  - Simple model: `dormant | activated | frozen` status (`domain/firestore/space.ts`)
  - Complex model: `preview_locked | open | invite_only | auto_join | builder_opening` (`domain/space/discovery.ts`)
- **Space Types**: Major, residential, interest, creative, organization
- **Nested Collections**: `spaces/{type}/spaces/{spaceId}` structure
- **Member Management**: Full membership system with roles

**Files**: `packages/core/src/domain/space.ts`, `packages/core/src/domain/space/discovery.ts`

**🟡 Space Discovery System** - Sophisticated but Limited
- ✅ **Advanced Discovery Engine**: Personalization algorithm with relevance scoring
- ✅ **Section-Based Discovery**: Academic, Greek Life, University Orgs, Residential, Student Orgs
- ✅ **Smart Filtering**: Member count, activity, search, personalization
- ❌ **Preview Mode Display**: Only shows "activated" spaces, not dormant preview
- ❌ **Potential Member Counts**: No calculation of potential membership

**Files**: `apps/web/src/app/api/spaces/discovery/route.ts`, `packages/core/src/domain/space/discovery.ts`

**🟡 Space Browsing & Joining** - Basic Implementation
- ✅ **Browse API**: Paginated space listing with search/filter
- ✅ **Join System**: Full join/leave functionality with validation
- ✅ **School Validation**: Users can only join spaces from their school
- ❌ **Preview State Handling**: Browse API filters out dormant spaces
- ❌ **Preview Interface**: No "Request Activation" buttons or preview cards

**Files**: `apps/web/src/app/api/spaces/browse/route.ts`, `apps/web/src/app/api/spaces/join/route.ts`

**❌ vBETA Preview Mode** - Not Implemented

**Missing Core Features:**
- **Preview Interface**: Spaces visible but not joinable until activated
- **Request Activation System**: "Request to Lead this Space" functionality  
- **Leader Verification**: Quick verification process for activation requests
- **Activation Flow**: Space handoff from preview to active state
- **Preview Directory**: Directory showing all 360+ spaces in preview mode
- **Potential Member Calculation**: Algorithm to show "1,247 potential members"

##### **vBETA Vision vs. Current Reality**

**Vision**: **Preview Mode Summer 2025**
```
CS MAJORS
━━━━━━━━━━━━━━━━━━━━━━━━
📍 Academic Space
👥 Potential members: 1,247
📅 Upcoming events: 3 (via RSS)

STATUS: Preview Mode

This Space will activate when a 
student leader requests access.

[Request to Lead this Space]
```

**Current Reality**: 
- Basic space detail pages for activated spaces only
- No preview state UI components
- Dormant spaces are hidden from discovery
- No activation request system

#### **Current API Endpoints**

**✅ Implemented:**
- `GET /api/spaces/browse` - List activated spaces with filters
- `GET /api/spaces/discovery` - Advanced discovery with personalization  
- `GET /api/spaces/{spaceId}` - Individual space details
- `POST /api/spaces/join` - Join activated spaces
- `POST /api/spaces/leave` - Leave spaces
- `GET /api/spaces/{spaceId}/membership` - Check membership status
- `GET /api/spaces/{spaceId}/feed` - Space content feed

**❌ Missing for vBETA:**
- `GET /api/spaces/preview` - List all spaces including dormant preview
- `POST /api/spaces/{spaceId}/request-activation` - Leader activation requests
- `GET /api/spaces/activation-requests` - Admin review queue
- `POST /api/spaces/{spaceId}/activate` - Approve activation
- `GET /api/spaces/{spaceId}/potential-members` - Calculate potential membership

#### **Component Status**

**✅ Basic Components:**
- Space detail page with banner, description, membership
- Space status badges (dormant → "Coming Soon", activated → "Active")
- Member count display
- Basic space listing

**❌ Missing vBETA Components:**
- Preview mode space cards
- "Request to Lead" activation interface
- Potential member count calculation
- Preview directory with category filtering
- Activation request form
- Leader verification flow

#### **Data Models Gap**

**Current Simple Model:**
```typescript
interface Space {
  status: 'dormant' | 'activated' | 'frozen';
  memberCount: number;
  // Basic space properties
}
```

**Needed for vBETA:**
```typescript
interface SpacePreview {
  status: 'preview' | 'activated';
  potentialMembers: number; // Calculated from user profiles
  rssEvents: Event[]; // Pre-seeded events
  activationRequests: ActivationRequest[];
  approvedLeader?: string;
  activatedAt?: Date;
}

interface ActivationRequest {
  userId: string;
  connection: string; // "I'm a CS major"
  reason: string; // Why they want to activate
  firstTool: string; // Tool they'll plant
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}
```

#### Technical Implementation Gaps

##### **Preview Mode System**
- **Space Seeding**: Pre-populate 360+ spaces across all categories
- **Potential Member Calculation**: Algorithm using user academic/residential data
- **RSS Integration**: Pre-seed events from external sources
- **Preview UI**: Cards showing potential vs. actual membership

##### **Activation Request System**
- **Request Interface**: Form for leaders to claim spaces
- **Verification Logic**: Academic/residential matching
- **Approval Workflow**: 24-hour SLA for review
- **Notification System**: Alert potential members when spaces activate

##### **Leader Handoff Process**
- **Activation Checklist**: Guide leaders through first steps
- **Tool Planting**: Integration with HiveLab for first tool
- **Member Migration**: Convert potential to actual members
- **Success Tracking**: Metrics for activated space health

#### Success Metrics (vBETA Focus)
- **Activation Goals**: 50+ spaces activated during vBETA
- **Request Quality**: Leader connection and activation plan quality
- **Activation Speed**: Time from request to activation (target: <24hrs)
- **Space Health**: % of activated spaces with tools and weekly activity
- **Leader Retention**: Activated leaders still active in fall launch

---

### 4. Profile Slice

**Purpose**: Campus command center with utility-first design and optional social presence

#### User Journey  
```
Profile Creation → Utility Building (Calendar/Tools) → Space Memberships → 
Activity Tracking → Optional Social Features → Reputation Building (BTS)
```

#### Key Features & Implementation

##### **Current Implementation Status**

**✅ Basic Profile System**
- **Profile Header**: Avatar, name, handle, academic info display
- **API Integration**: GET/PATCH `/api/profile/me` with Firestore backend
- **Data Models**: Comprehensive user types with school, preferences, notifications
- **Development Mode**: Mock profile data for local development

**Files**: `apps/web/src/app/(wip)/profile/`, `packages/core/src/domain/auth/user-types.ts`

##### **Bento Grid Layout System (PLANNED)**

**Vision**: 4-column responsive modular grid with cards sized by importance
- **Standard Cards** (1x1): Avatar, Calendar, My Spaces, Ghost Mode
- **Wide Cards** (2x1): Activity Log, Builder Stats, Social Preview  
- **Featured Cards** (2x2): Your Tools (main creation hub)

**Current Reality**: Basic 2-3 column grid with placeholder cards

##### **Core Cards - Implementation Status**

**🟡 Avatar Card** - Partially Implemented
- ✅ Basic identity display (name, handle, academic info)
- ❌ Social evolution elements ("Profile Views: Private", "Make Public" toggle)
- ❌ Tinder-style card design
- **File**: `profile-header.tsx`

**🟡 Calendar Card** - Basic Implementation  
- ✅ Monthly calendar widget with navigation
- ✅ Upcoming events list (mock data)
- ❌ Multi-source integration (personal calendar, Space events, RSS)
- ❌ "Share Availability" locked feature
- **File**: `calendar-widget.tsx`

**❌ HiveLAB Card** - Not Implemented
- ❌ Builder countdown timer for non-builders
- ❌ Tool creation gateway for builders
- ❌ Usage statistics and impact metrics

**🟡 Your Spaces Card** - Placeholder
- ✅ Basic "My Spaces" card structure
- ❌ Categorized memberships (Academic, Residential, Social, Greek)
- ❌ Membership counts and reputation previews
- **File**: `my-spaces.tsx` (commented out, pending Team 2 integration)

**❌ Your Tools Card** - Placeholder  
- ✅ Basic "My Tools" card structure  
- ❌ 3x3 tool grid display
- ❌ Tool creation slots and impact statistics
- ❌ Social sharing features
- **File**: `profile-overview.tsx` (basic placeholder)

**🟡 Activity Log Card** - Basic Implementation
- ✅ Mock activity display with timestamps
- ✅ Activity summary metrics (hardcoded)
- ❌ Public/private toggle (locked)
- ❌ Real activity data integration
- **File**: `profile-activity.tsx`

**❌ Request Access Card** - Not Implemented
- ❌ Exclusive Spaces discovery
- ❌ Prerequisites and invitation requirements

**❌ Ghost Mode Card** - Not Implemented  
- ❌ Privacy control toggle
- ❌ Platform invisibility features

**❌ Social Preview Card** - Not Implemented
- ❌ Upcoming social features showcase
- ❌ "Build privately, share when ready" messaging

**❌ Builder Stats Card** - Not Implemented
- ❌ Hidden impact metrics with lock icons
- ❌ Reputation tracking (algorithmic, behind-the-scenes)

##### **Data Architecture**

**Current Profile Model**:
```typescript
interface UserProfile {
  bio?: string;
  major?: string;
  graduationYear?: number;
  interests: string[];
  visibility: "public" | "campus-only" | "private";
  onboardingCompleted: boolean;
  profilePicture?: string;
  coverPhoto?: string;
}
```

**Behind-the-Scenes Reputation System** (Planned):
- Tool usage patterns and adoption rates
- Cross-Space tool effectiveness  
- Quality signals for algorithmic recommendations
- No visible scores/gamification - purely for platform intelligence

##### **Privacy-First Architecture**

**Current**: Basic profile visibility settings
**Planned**: Progressive disclosure system
- All features default to private
- Social elements locked but visible as future options  
- Explicit opt-in for any public features
- "Build privately, share when ready" philosophy

#### Technical Implementation

##### **State Management**
- **API Routes**: GET/PATCH profile data with authentication
- **Mock System**: Development mode with realistic test data
- **Error Handling**: Graceful fallbacks and user feedback

##### **Component Architecture**  
- **Modular Cards**: Independent components for each profile section
- **Responsive Grid**: CSS Grid layout adapting to screen size
- **Loading States**: Skeleton screens and progressive enhancement

##### **Integration Points**
- **Spaces**: Membership display and management (pending Team 2)
- **Tools**: Creation hub and usage tracking (pending Team 3)  
- **Calendar**: Multi-source event aggregation
- **Analytics**: Behind-the-scenes quality signal collection

#### Success Metrics
- **Utility Engagement**: Daily calendar and tool usage
- **Profile Completion**: Academic info and interest completion rates
- **Privacy Adoption**: Ghost mode usage and visibility settings
- **Social Readiness**: Clicks on locked social features (interest signals)
- **Tool Creation**: Builder adoption and tool development velocity

#### Key Gaps Between Vision and Reality

**Missing Features:**
1. **Bento Grid Layout**: Current grid is basic, not the designed modular system
2. **Social Layer**: Locked features, progressive disclosure, reputation tracking
3. **Tool Integration**: No tool creation or management interface
4. **Advanced Privacy**: Ghost mode, granular visibility controls  
5. **Space Integration**: Membership display and categorization
6. **Builder System**: HiveLAB access, impact metrics, quality signals

**Implementation Priority:**
1. **Phase 1**: Bento grid layout and core utility cards
2. **Phase 2**: Social layer with locked features and progressive disclosure
3. **Phase 3**: Behind-the-scenes reputation and algorithmic quality signals

---

## Cross-Slice Integrations

### Authentication → All Slices
- **Session Management**: Persistent login across all features
- **Permission System**: Role-based access to spaces and features
- **Security**: Data protection and privacy enforcement

### Feed → Spaces
- **Content Aggregation**: Space content appearing in main feed
- **Cross-Space Discovery**: Finding new spaces through feed content
- **Community Engagement**: Seamless transition between feed and spaces

### Spaces → Profile
- **Membership Display**: Space affiliations on user profiles
- **Activity Attribution**: Space activities in user timeline
- **Reputation System**: Space-based achievements and recognition

### Profile → Feed
- **Content Personalization**: Profile interests influencing feed algorithm
- **Social Signals**: Friend activity affecting content visibility
- **Identity Integration**: Profile information in post interactions

---

## Technical Foundation

### Architecture Principles
- **Modular Design**: Each slice operates independently with clear interfaces
- **Real-time Sync**: Live updates across all product areas
- **Scalable Data**: Firestore-based architecture for growth
- **Performance First**: Optimized loading and caching strategies

### Shared Systems
- **Analytics**: Event tracking across all user interactions
- **Notifications**: Real-time alerts for all product areas
- **Search**: Unified search across content, spaces, and users
- **Content Moderation**: Safety and community guidelines enforcement

### Data Models
- **User**: Central identity with profile, preferences, permissions
- **Space**: Community container with members, content, tools
- **Post**: Content unit with metadata, engagement, permissions
- **Event**: Activity with time, location, participants, space context

---

## Future Evolution

### Planned Enhancements
- **Mobile App**: Native iOS/Android applications
- **Advanced Analytics**: Personal and community insights
- **Monetization**: Premium features and space tools
- **AI Integration**: Smarter recommendations and content curation
- **Campus Integration**: University system connections
- **Creator Economy**: Tools for content creators and community leaders

### Success Indicators
- **User Retention**: Long-term engagement across all slices
- **Community Health**: Active, growing spaces with regular participation
- **Content Quality**: High-value, engaging user-generated content
- **Network Effects**: User growth driving more user growth
- **Platform Stickiness**: Daily active usage and feature adoption

---

*Last Updated: [Current Date]*
*Next Review: [Monthly]*