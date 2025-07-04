# Feed & Rituals Slice Completion Checklist

## 🎯 **Vision**: Early Campus Pulse with Platform Revelation Engine

**Target**: Curated bootstrap experience that grows from RSS + Rituals → Organic community content

---

## 📊 **Current State Assessment**

### ✅ **Exceptional Backend Foundation**
- Advanced feed ranking algorithm with sophisticated personalization
- Complete API infrastructure for posts, rituals, and engagement
- Rich content models with comprehensive analytics
- Top strip ritual system with participation tracking
- User engagement scoring and activity logging

### ❌ **Critical vBETA Implementation Gaps**
- **No RSS Integration**: Campus event feeds not connected to platform
- **No Ritual UI**: Backend exists but no user interface for participation
- **No Feed Bootstrap**: Empty feed instead of curated early experience
- **No Announcement System**: No way to launch and promote new Rituals
- **No Progress Visualization**: Participation and collective progress not visible

---

## 🏗️ **Implementation Roadmap**

### **Phase 1: RSS Integration & Feed Bootstrap (Week 1-2)**

#### 1.1 **Campus RSS Feed Integration**
**Status**: ❌ Critical for vBETA Launch

**Requirements**:
- [ ] RSS feed ingestion system for campus sources
- [ ] Academic department event parsing (CS, Biology, etc.)
- [ ] Residential hall programming feeds (Ellicott, Governors, etc.)
- [ ] Student organization announcement parsing
- [ ] University calendar integration (dining, registration, campus events)
- [ ] Smart filtering based on user's academic and residential profile

**RSS Sources to Configure**:
- [ ] UB Computer Science Department calendar
- [ ] UB Student Activities event feed
- [ ] Campus dining specials and hours
- [ ] Residence hall programming calendars
- [ ] Academic calendar (registration deadlines, finals, etc.)
- [ ] Library events and workshops

**Files to create**:
- `packages/core/src/utils/rss-integration.ts`
- `apps/web/src/app/api/feed/rss-import/route.ts`
- `functions/src/feed/rss-processor.ts`
- RSS feed configuration files for each source

#### 1.2 **Feed Bootstrap Experience**
**Status**: ❌ Critical Gap

**Requirements**:
- [ ] Week 1 feed layout with RSS events prominently displayed
- [ ] "Campus Events" section with expandable event details
- [ ] Smart event filtering based on user's spaces and interests
- [ ] "See all events" expansion for full campus calendar
- [ ] RSS content cards with proper branding and attribution
- [ ] Real-time RSS content updates

**Week 1 Feed Components**:
```
📅 CAMPUS EVENTS (via RSS)
Tomorrow: CS Department Mixer - 4pm
Friday: Summer Concert Series
[See all events →]
```

**Files to create**:
- `packages/ui/src/components/feed/rss-events-section.tsx`
- `packages/ui/src/components/feed/campus-event-card.tsx`
- `packages/ui/src/components/feed/events-expansion.tsx`

#### 1.3 **Feed Evolution Tracking**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Content source analytics (RSS vs. organic vs. ritual)
- [ ] Weekly feed composition reporting
- [ ] User engagement with RSS content tracking
- [ ] Gradual RSS prominence reduction algorithm
- [ ] Organic content growth metrics

**Files to create**:
- `packages/core/src/analytics/feed-evolution.ts`
- `apps/web/src/app/api/analytics/feed-composition/route.ts`

---

### **Phase 2: Core Ritual UI Implementation (Week 3-4)**

#### 2.1 **🕯️ First Light Ritual**
**Status**: ❌ Backend Ready, UI Missing

**Requirements**:
- [ ] First Light announcement card in feed
- [ ] "Light Your Flame" composer interface
- [ ] First Light post template with special styling
- [ ] Flame lighting animation and celebration
- [ ] Daily First Light counter and social proof
- [ ] "First Light unlocks posting" messaging

**First Light Experience**:
```
LIGHT YOUR FLAME
━━━━━━━━━━━━━━━━━━━━━━━━

Welcome to HIVE. Before you can build,
you must begin. Light your flame with
your first public words.

[Compose your first light]

✨ 127 flames lit today
```

**Files to create**:
- `packages/ui/src/components/rituals/first-light-announcement.tsx`
- `packages/ui/src/components/rituals/first-light-composer.tsx`
- `packages/ui/src/components/rituals/flame-animation.tsx`
- `packages/ui/src/components/feed/first-light-posts.tsx`

#### 2.2 **❓ Orientation Q&A Ritual**
**Status**: ❌ Backend Ready, UI Missing

**Requirements**:
- [ ] Daily Q&A prompt display in feed
- [ ] Rotating question schedule (Monday/Wednesday/Friday themes)
- [ ] Q&A response composer with character limits
- [ ] "Answer to unlock responses" mechanic
- [ ] Response feed with proper threading
- [ ] Weekly Q&A archive and highlights

**Q&A Experience**:
```
TODAY'S QUESTION
━━━━━━━━━━━━━━━━━━━━━━━━

"What's one thing you wish someone
had told you before starting here?"

Your answer helps next year's freshmen.

[Share wisdom] • 234 answers
```

**Files to create**:
- `packages/ui/src/components/rituals/qa-prompt.tsx`
- `packages/ui/src/components/rituals/qa-composer.tsx`
- `packages/ui/src/components/rituals/qa-responses.tsx`
- `packages/ui/src/components/rituals/qa-unlock-gate.tsx`

#### 2.3 **🔗 Torch Pass Ritual**
**Status**: ❌ Backend Ready, UI Missing

**Requirements**:
- [ ] Torch Pass announcement with countdown timer
- [ ] Invitation torch management interface
- [ ] Torch allocation tracking (3 per user)
- [ ] Invitation link generation and sharing
- [ ] Real-time torch countdown display
- [ ] Torch passing social proof and celebrations

**Torch Pass Experience**:
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

**Files to create**:
- `packages/ui/src/components/rituals/torch-pass-announcement.tsx`
- `packages/ui/src/components/rituals/torch-counter.tsx`
- `packages/ui/src/components/rituals/invitation-generator.tsx`
- `packages/ui/src/components/rituals/torch-countdown.tsx`

---

### **Phase 3: Ritual System & Scheduling (Week 5-6)**

#### 3.1 **Ritual Announcement System**
**Status**: ❌ Critical Gap

**Requirements**:
- [ ] Ritual scheduling and announcement framework
- [ ] 3-day ritual teaser system ("New Ritual dropping Thursday")
- [ ] Ritual launch notifications and feed prioritization
- [ ] Active ritual status display in top strip
- [ ] Ritual conclusion and results display
- [ ] Next ritual preview and anticipation building

**Files to create**:
- `packages/core/src/domain/rituals/ritual-scheduler.ts`
- `packages/ui/src/components/rituals/ritual-announcements.tsx`
- `packages/ui/src/components/rituals/ritual-teaser.tsx`
- `apps/web/src/app/api/rituals/schedule/route.ts`

#### 3.2 **Collective Progress Visualization**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Campus-wide participation tracking display
- [ ] Real-time progress bars and counters
- [ ] Space-level and friend-level participation comparison
- [ ] Momentum building messaging and social proof
- [ ] Participation milestone celebrations
- [ ] "Trending rituals" and viral moment detection

**Progress Display Example**:
```
RITUAL PARTICIPATION
━━━━━━━━━━━━━━━━━━━━━━━━
UB Campus: ▓▓▓▓▓▓▓░░░ 73%
Your Spaces: ▓▓▓▓▓▓▓▓░░ 81%
Your Friends: ▓▓▓▓▓░░░░░ 52%

🔥 Momentum building...
```

**Files to create**:
- `packages/ui/src/components/rituals/participation-tracker.tsx`
- `packages/ui/src/components/rituals/collective-progress.tsx`
- `packages/ui/src/components/rituals/momentum-indicator.tsx`

#### 3.3 **Ritual Calendar Interface**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Summer vBETA ritual schedule display
- [ ] Ritual reminder system and notifications
- [ ] Past ritual archive and highlights
- [ ] Future ritual teasers and anticipation
- [ ] Personal ritual participation history
- [ ] Ritual impact and unlock tracking

**Calendar Display**:
```
SUMMER RITUAL SCHEDULE
━━━━━━━━━━━━━━━━━━━━━━━━

JULY
Week 1: 🕯️ First Light + ❓ Q&A
Week 2: 🔗 Torch Pass  
Week 3: 🎯 Space Hunt
Week 4: 🌟 Builder Spotlight

[Set reminders] [Learn more]
```

**Files to create**:
- `apps/web/src/app/rituals/page.tsx`
- `packages/ui/src/components/rituals/ritual-calendar.tsx`
- `packages/ui/src/components/rituals/ritual-history.tsx`

---

### **Phase 4: Advanced Ritual Features (Week 7-8)**

#### 4.1 **Future Ritual Implementation**
**Status**: ❌ vBETA Extension

**Requirements for Later Rituals**:
- [ ] 🎯 Space Hunt ritual (Space discovery gamification)
- [ ] 🌟 Builder Spotlight (Showcase student builders)
- [ ] 🏆 Space Wars (Inter-space competitions)
- [ ] 🎲 Tool Roulette (Random tool challenges)
- [ ] 🌊 Wave (Viral challenge mechanics)

**Files to create**:
- `packages/ui/src/components/rituals/space-hunt.tsx`
- `packages/ui/src/components/rituals/builder-spotlight.tsx`
- `packages/ui/src/components/rituals/space-wars.tsx`

#### 4.2 **Ritual Analytics & Optimization**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Ritual participation analytics dashboard
- [ ] A/B testing framework for ritual designs
- [ ] Engagement pattern analysis
- [ ] Optimal timing and frequency analysis
- [ ] User feedback collection system
- [ ] Ritual effectiveness measurement

**Files to create**:
- `packages/core/src/analytics/ritual-analytics.ts`
- `apps/web/src/app/admin/rituals/analytics/page.tsx`

#### 4.3 **Integration with Space Activation**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Space activation creates feed moments
- [ ] Space Wars ritual integration with space system
- [ ] Builder activities generate feed content
- [ ] Tool planting becomes ritual content
- [ ] Space milestone celebrations in feed

**Files to create**:
- `packages/ui/src/components/feed/space-activation-posts.tsx`
- `packages/ui/src/components/feed/builder-activity-feed.tsx`

---

## 🔧 **Data Models & API Updates**

### **RSS Integration Models**
```typescript
interface RSSEvent {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  location?: string;
  source: 'academic' | 'residential' | 'student-org' | 'university';
  department?: string;
  relevanceScore: number;
  imageUrl?: string;
}

interface FeedComposition {
  date: Date;
  rssContent: number;
  ritualContent: number;
  organicContent: number;
  totalPosts: number;
  engagementBySource: Record<string, number>;
}
```

### **Ritual System Models**
```typescript
interface RitualSchedule {
  id: string;
  name: string;
  emoji: string;
  startDate: Date;
  endDate: Date;
  status: 'teaser' | 'active' | 'concluded';
  participationCount: number;
  unlocks: string[];
}

interface RitualParticipation {
  userId: string;
  ritualId: string;
  participatedAt: Date;
  completionStatus: 'started' | 'completed';
  unlocks: string[];
}
```

---

## ✅ **Definition of Done**

### **vBETA Feed Experience Ready**
- [ ] Week 1 feed shows proper mix of RSS events and ritual content
- [ ] Campus events intelligently filtered based on user profile
- [ ] RSS content updates regularly and displays attractively
- [ ] Feed evolution tracking shows gradual shift to organic content

### **Core Rituals Functional**
- [ ] First Light ritual works end-to-end with proper celebrations
- [ ] Q&A ritual rotates questions and manages response unlocking
- [ ] Torch Pass ritual creates urgency and manages invitation flow
- [ ] All rituals properly unlock platform features

### **Ritual System Complete**
- [ ] Ritual scheduling and announcement system operational
- [ ] Collective progress visualization encourages participation
- [ ] Ritual calendar builds anticipation for future experiences
- [ ] Analytics track ritual effectiveness and engagement

### **Integration Success**
- [ ] Ritual participation integrates with profile activity
- [ ] Space activation creates feed moments
- [ ] RSS content personalizes based on space memberships
- [ ] Platform feature unlocks work correctly

---

## 🎯 **vBETA Success Metrics**

### **Feed Evolution Goals**
- **Week 1**: 90% RSS/Ritual content, 10% organic posts
- **Week 4**: 70% RSS/Ritual content, 30% organic posts
- **Week 8**: 40% RSS/Ritual content, 60% organic posts
- **Fall Launch**: 20% RSS/Ritual content, 80% organic posts

### **Ritual Participation**
- **First Light**: 80% of new users complete within 72 hours
- **Q&A Participation**: 60% of users answer at least one question
- **Torch Passing**: 70% of users pass at least one torch
- **Overall Ritual Engagement**: 75% of users participate in 3+ rituals

### **Content Quality & Engagement**
- **RSS Event Engagement**: 30% of users click through to event details
- **Ritual Content**: 60% engagement rate on ritual posts
- **Feature Unlocking**: 85% of users use features unlocked by rituals
- **Community Building**: 50% of First Light participants still active at Week 8

---

## 🚀 **Implementation Phases Summary**

**Phase 1 (Weeks 1-2)**: RSS integration, feed bootstrap, content source tracking
**Phase 2 (Weeks 3-4)**: Core ritual UI (First Light, Q&A, Torch Pass)
**Phase 3 (Weeks 5-6)**: Ritual scheduling, progress visualization, calendar system
**Phase 4 (Weeks 7-8)**: Advanced rituals, analytics, space integration

**Total Timeline**: 8 weeks to transform sophisticated backend into curated vBETA experience

---

**Key Insight**: This approach acknowledges the vBETA cold start reality while using RSS content and designed Rituals as the bridge to organic engagement. Each Ritual teaches students what HIVE can do while creating reasons to return during critical early weeks.

---

*Last Updated: [Current Date]*  
*Focus: Curated bootstrap experience that reveals platform value progressively*