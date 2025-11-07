# RITUALS TOPOLOGY

**Version:** 2.0
**Last Updated:** November 2024
**Status:** Authoritative Specification

---

## 🎯 **WHAT ARE RITUALS?**

### **Definition**

Rituals are **campus-wide behavioral events** that create shared moments and drive collective action.

Not gamification. Not task lists. Not badges.

**Rituals are:**
- 🏟️ **Events** - Time-bounded experiences (hours to weeks)
- 🎭 **Transformative** - Platform behaves differently during ritual
- 🌊 **Collective** - Entire campus participates together
- 📅 **Recurring** - Create traditions and anticipation
- 🚀 **Viral** - Drive "remember when..." moments

### **Mission Alignment**

**HIVE Mission:** "Make campus life easier, more fun, and more connected."

**Rituals deliver:**
- **Easier:** Coordinate group actions (study weeks, dining meetups)
- **More fun:** Drama, competition, mystery, chaos
- **More connected:** Shared experiences create bonds

### **Product Position**

Rituals are HIVE's **moat**.

- Instagram can't do campus-wide tournaments
- Facebook can't time-limit features to create scarcity
- Snapchat can't suspend platform rules temporarily

**Only a campus-focused platform can orchestrate campus-wide experiences.**

---

## 🏗️ **ARCHITECTURE OVERVIEW**

### **The Ritual Engine**

```
┌─────────────────────────────────────────────────┐
│                  RITUAL ENGINE                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐    ┌──────────────┐         │
│  │   ARCHETYPES │───▶│  LIFECYCLE   │         │
│  │              │    │   MANAGER    │         │
│  │ • Tournament │    │              │         │
│  │ • Feature    │    │ announced→   │         │
│  │ • Inversion  │    │ active→      │         │
│  │ • Founding   │    │ ended        │         │
│  │ • Countdown  │    └──────────────┘         │
│  │ • Lottery    │                              │
│  │ • Unlock     │    ┌──────────────┐         │
│  │ • Survival   │───▶│   RENDERER   │         │
│  │ • Leak       │    │              │         │
│  └──────────────┘    │ • Banner     │         │
│                      │ • Details    │         │
│                      │ • Stats      │         │
│                      └──────────────┘         │
│                                                 │
│  ┌──────────────────────────────────────┐     │
│  │         ADMIN COMPOSER               │     │
│  │                                      │     │
│  │  Template Library → Config Form →   │     │
│  │  Live Preview → Launch               │     │
│  └──────────────────────────────────────┘     │
│                                                 │
└─────────────────────────────────────────────────┘
```

### **Core Principle: Configuration > Code**

Rituals are **data-driven**, not hardcoded features.

```typescript
// Ritual = JSON config in Firestore
const ritual: RitualConfig = {
  archetype: 'TOURNAMENT',
  title: 'CAMPUS MADNESS',
  phase: 'active',
  // ... archetype-specific config
};

// Engine reads config, renders appropriate UI
<RitualRenderer ritual={ritual} />
```

**Benefits:**
- Admin creates rituals in 30 seconds (no dev time)
- New archetypes = new config schema (not new UI)
- A/B test ritual variations easily
- Clone successful rituals instantly

---

## 📊 **RITUAL TAXONOMY**

### **9 Ritual Archetypes**

```
RITUALS
├── COLD START (0-500 users)
│   ├── FOUNDING_CLASS      - Status + FOMO
│   ├── LAUNCH_COUNTDOWN    - Anticipation building
│   ├── BETA_LOTTERY        - Exclusive access drama
│   ├── UNLOCK_CHALLENGE    - Collective goal
│   ├── SURVIVAL            - Fast live event
│   └── LEAK                - Mystery hype
│
└── SCALE (500+ users)
    ├── TOURNAMENT          - Competition (spaces/majors/dorms)
    ├── FEATURE_DROP        - Limited edition features
    └── RULE_INVERSION      - Platform chaos
```

### **Classification Matrix**

| Archetype | Min Users | Duration | Interaction | Engagement | Complexity |
|-----------|-----------|----------|-------------|------------|------------|
| **FOUNDING_CLASS** | 1 | 1 week | Passive | One-time | Low |
| **LAUNCH_COUNTDOWN** | 0 | 1-2 weeks | Daily check | Anticipation | Low |
| **BETA_LOTTERY** | 20 | 3 days | Enter + Wait | Drama spike | Medium |
| **UNLOCK_CHALLENGE** | 20 | 3-7 days | Active posting | Sustained | Medium |
| **SURVIVAL** | 50 | 3 hours | Live voting | Intense burst | Medium |
| **LEAK** | 20 | 3-7 days | Speculation | Daily check | Low |
| **TOURNAMENT** | 200 | 1-2 weeks | Vote/post | Sustained | High |
| **FEATURE_DROP** | 100 | 1-7 days | Use feature | Varies | High |
| **RULE_INVERSION** | 500 | 1-2 days | Chaos | Intense | Very High |

---

## 🎭 **ARCHETYPE SPECIFICATIONS**

### **1. FOUNDING_CLASS** ❄️ Cold Start

**Purpose:** Create founding community with status + FOMO.

**Data Model:**
```typescript
interface FoundingClassRitual extends BaseRitual {
  archetype: 'FOUNDING_CLASS';

  founding: {
    // Scarcity
    limit: number;              // Max founders (e.g., 100)
    currentCount: number;       // Live count
    deadline: Date;             // Time limit

    // Rewards
    founderBadge: {
      permanent: true;
      visibleOn: 'profile';
      exclusive: true;
    };

    founderPerks: string[];     // Future benefits

    // Wall of Fame
    founderWall: {
      enabled: boolean;
      showOrder: boolean;       // #1, #2, #3...
      showTimestamp: boolean;
    };

    // Messaging
    urgency: string;            // "Only 53 spots left"
    socialProof: string;        // "47 students joined"
  };
}
```

**Feed Integration:**
```
┌─────────────────────────────────────┐
│ 🏆 FOUNDING CLASS                   │
│                                     │
│ Be part of HIVE history.            │
│ First 100 students get permanent    │
│ Founder status.                     │
│                                     │
│ ⚡ ONLY 53 SPOTS LEFT                │
│ 47 students already joined          │
│                                     │
│ [Claim Founder Status]              │
└─────────────────────────────────────┘
```

**Use Cases:**
- Platform launch (first 100 users)
- New campus rollout
- Major feature launch
- Semester kickoff

---

### **2. LAUNCH_COUNTDOWN** ❄️ Cold Start

**Purpose:** Build anticipation for upcoming ritual.

**Data Model:**
```typescript
interface LaunchCountdownRitual extends BaseRitual {
  archetype: 'LAUNCH_COUNTDOWN';

  countdown: {
    // Target
    targetRitual: string;       // Ritual being hyped
    launchDate: Date;

    // Daily Unlocks
    dailyUnlocks: {
      daysRemaining: number;
      reveal: string;           // What gets revealed
      content?: {
        image?: string;
        video?: string;
        text: string;
      };
    }[];

    // Pre-Registration
    preRegistration?: {
      enabled: boolean;
      entity: 'spaces' | 'users';
      goal: number;             // Target registrations
      current: number;          // Live count
    };

    // Engagement
    activities: {
      predictions: boolean;      // Predict outcome
      trashTalk: boolean;        // Hype posts
      teamSelection: boolean;    // Pick sides
    };

    // Viral
    shareables: {
      countdownWidget: boolean;
      teaserVideo: boolean;
      bracketPreview: boolean;
    };
  };
}
```

**Feed Integration:**
```
┌─────────────────────────────────────┐
│ 🏆 CAMPUS MADNESS • 7 DAYS          │
│                                     │
│ The biggest tournament ever.        │
│ 32 spaces compete. Students vote.   │
│                                     │
│ 🔓 DAY 7 UNLOCK:                    │
│ Full bracket revealed!              │
│                                     │
│ 📊 12 spaces registered (need 20)   │
│                                     │
│ [Register Your Space]               │
│ [View Bracket Preview]              │
└─────────────────────────────────────┘
```

**Use Cases:**
- Hype tournaments
- Feature launches
- Major events
- Semester transitions

---

### **3. BETA_LOTTERY** ❄️ Cold Start

**Purpose:** Distribute limited feature access via lottery.

**Data Model:**
```typescript
interface BetaLotteryRitual extends BaseRitual {
  archetype: 'BETA_LOTTERY';

  lottery: {
    // Feature
    feature: {
      id: string;
      name: string;
      description: string;
      teaser: {
        video?: string;
        images: string[];
        demo?: string;
      };
    };

    // Scarcity
    slots: number;              // Winner count (e.g., 25)
    applicants: number;         // Live count

    // Entry
    entry: {
      requirement: 'click' | 'referral' | 'action';
      deadline: Date;
      multipleEntries: boolean;
    };

    // Drawing
    drawing: {
      date: Date;
      format: 'instant' | 'live_event' | 'scheduled';
      notification: boolean;
      publicAnnouncement: boolean;
    };

    // Winner Experience
    winnerAccess: {
      duration: number;         // Hours
      featureFlags: string[];
      badge?: string;           // Winner badge
      feedback: boolean;
    };

    // Loser Experience
    loserFlow: {
      consolationMessage: string;
      waitlist: boolean;
      nextLottery?: Date;
    };
  };
}
```

**Feed Integration:**
```
┌─────────────────────────────────────┐
│ 💬 DM BETA LOTTERY                  │
│                                     │
│ We built Direct Messages.           │
│ 25 students will win 24h access.    │
│                                     │
│ 🎟️ 47 students entered              │
│ ⏰ Drawing Friday 6pm               │
│                                     │
│ [Enter Lottery]                     │
│ [Watch Demo Video]                  │
└─────────────────────────────────────┘
```

**Use Cases:**
- Test features before full launch
- Create FOMO for new features
- Gather targeted feedback
- Build hype for launches

---

### **4. UNLOCK_CHALLENGE** ❄️ Cold Start

**Purpose:** Campus works toward collective goal to unlock reward.

**Data Model:**
```typescript
interface UnlockChallengeRitual extends BaseRitual {
  archetype: 'UNLOCK_CHALLENGE';

  unlock: {
    // Goal
    goal: {
      metric: 'posts' | 'comments' | 'votes' | 'joins' | 'custom';
      target: number;
      current: number;          // Live progress
      deadline: Date;
    };

    // Locked Reward
    reward: {
      type: 'ritual' | 'feature' | 'content' | 'prize';
      name: string;
      description: string;
      teaser: string;           // Mystery description
      preview?: string;         // Preview image/video
    };

    // Progress Visualization
    visualization: {
      progressBar: boolean;
      percentage: boolean;
      countdown: boolean;
      recentActivity: boolean;  // Show recent contributions
      leaderboard: boolean;     // Top contributors
    };

    // Milestones
    milestones: {
      threshold: number;
      unlock: string;           // What unlocks at milestone
      message: string;
    }[];

    // Messaging
    urgency: {
      remaining: string;        // "Need 373 more posts"
      timeLeft: string;         // "2 days left"
      encouragement: string;    // "We can do this!"
    };
  };
}
```

**Feed Integration:**
```
┌─────────────────────────────────────┐
│ 🎭 UNLOCK BANG ANONYMOUS DAY        │
│                                     │
│ Campus goal: 500 posts this week    │
│ Reward: Anonymous posting Friday    │
│                                     │
│ ████████░░░░░░░░ 347/500 (69%)     │
│                                     │
│ ⏰ 2 DAYS LEFT                      │
│ 🔥 Need 153 more posts              │
│                                     │
│ Recent posts: [thumbnails]          │
│                                     │
│ [Post Now to Help]                  │
└─────────────────────────────────────┘
```

**Use Cases:**
- Unlock chaos rituals
- Activate new features
- Drive content creation
- Build collective achievement

---

### **5. SURVIVAL** ❄️ Cold Start

**Purpose:** Fast-paced live elimination tournament.

**Data Model:**
```typescript
interface SurvivalRitual extends BaseRitual {
  archetype: 'SURVIVAL';

  survival: {
    // Tournament
    format: 'instant_elimination';
    participants: number;       // e.g., 8 spaces

    // Speed rounds
    rounds: {
      number: number;
      duration: number;         // Minutes (e.g., 60)
      matchups: number;
      startTime: Date;
    }[];

    // Live dynamics
    liveUpdates: {
      realTime: boolean;
      updateInterval: number;   // Seconds
      notifications: boolean;
      commentary: string[];     // Admin commentary
    };

    // Elimination
    elimination: {
      instant: boolean;
      messaging: string;        // "X ELIMINATED"
      soundEffect?: string;
    };

    // Event timing
    eventWindow: {
      start: Date;              // e.g., Friday 6pm
      end: Date;                // e.g., Friday 9pm
      duration: number;         // 3 hours
    };

    // Voting
    voting: {
      method: 'direct_vote';
      showLiveCount: boolean;
      speed: 'urgent';
    };
  };
}
```

**Feed Integration:**
```
┌─────────────────────────────────────┐
│ ⚡ SURVIVAL MODE • LIVE NOW         │
│                                     │
│ Round 1: Quarterfinals              │
│ ⏰ 47 minutes remaining              │
│                                     │
│ CS Club 🆚 Debate Team              │
│ 89 votes    67 votes                │
│ [VOTE NOW]                          │
│                                     │
│ ❌ 4 spaces eliminated              │
│ ✅ 4 spaces advancing               │
│                                     │
│ [Watch Live]                        │
└─────────────────────────────────────┘
```

**Use Cases:**
- Quick tournament with small user base
- Friday night live events
- High-intensity competitions
- Short attention span friendly

---

### **6. LEAK** ❄️ Cold Start

**Purpose:** Build mystery hype with cryptic reveals.

**Data Model:**
```typescript
interface LeakRitual extends BaseRitual {
  archetype: 'LEAK';

  leak: {
    // Mystery
    hiddenRitual: {
      name: string;             // Hidden until reveal
      archetype: string;        // Hidden until reveal
      launchDate: Date;         // Partial reveal
    };

    // Daily clues
    clues: {
      day: number;              // Days until reveal
      clue: string;             // Cryptic hint
      hint?: string;            // Optional explanation
      media?: string;           // Image/video
    }[];

    // Full reveal
    reveal: {
      date: Date;
      method: 'instant' | 'gradual' | 'live_event';
      announcement: string;
    };

    // Community engagement
    speculation: {
      enabled: boolean;
      discussionSpace: string;  // Where to speculate
      prompt: string;
      voting: boolean;          // Vote on theories
    };

    // Viral
    shareables: {
      mysteryPoster: boolean;
      clueCards: boolean;
      countdown: boolean;
    };
  };
}
```

**Feed Integration:**
```
┌─────────────────────────────────────┐
│ 🔮 SOMETHING IS COMING...           │
│                                     │
│ Day 5 Clue:                         │
│ 🎭                                  │
│ "Identity is optional"              │
│                                     │
│ Previous clues:                     │
│ • Rules will break                  │
│ • November 8th                      │
│                                     │
│ 3 days until full reveal            │
│                                     │
│ [Discuss Theories]                  │
│ [View All Clues]                    │
└─────────────────────────────────────┘
```

**Use Cases:**
- Build hype for major rituals
- Generate speculation/discussion
- Create shareable mystery
- ARG-style engagement

---

### **7. TOURNAMENT** 🚀 Scale

**Purpose:** Competitive bracket-style events.

**Data Model:**
```typescript
interface TournamentRitual extends BaseRitual {
  archetype: 'TOURNAMENT';

  tournament: {
    // Format
    format: 'single_elimination' | 'double_elimination' | 'round_robin';

    // Participants
    participants: {
      type: 'spaces' | 'majors' | 'dorms' | 'years' | 'custom';
      count: number;
      selection: 'all' | 'opt_in' | 'admin_pick';
      seeding: 'random' | 'by_size' | 'by_activity' | 'manual';
    };

    // Rounds
    rounds: {
      id: string;
      name: string;              // "Sweet 16", "Finals"
      startDate: Date;
      endDate: Date;
      matchups: Matchup[];
    }[];

    currentRound: string;
    liveMatchups: string[];

    // Voting
    voting: {
      mechanism: 'direct_vote' | 'posts_as_votes' | 'reactions';
      postsAsVotes?: {
        countMechanism: 'any_mention' | 'hashtag' | 'space_posts';
        hashtag?: string;
        voteWeight: {
          post: number;
          withMedia: number;
          upvoted: number;
        };
      };
      directVote?: {
        allowMultiple: boolean;
        voteChanging: boolean;
      };
    };

    // Prize
    prize: {
      title: string;
      badge: string;
      featuredDuration: number;  // Days
      specialPerks?: string[];
    };
  };
}

interface Matchup {
  id: string;
  roundId: string;
  competitor1: { id: string; name: string; votes: number };
  competitor2: { id: string; name: string; votes: number };
  status: 'upcoming' | 'active' | 'completed';
  winner?: string;
  featuredInFeed: boolean;
}
```

**Feed Integration:**
```
┌─────────────────────────────────────┐
│ 🏆 CAMPUS MADNESS • SWEET 16        │
│                                     │
│ 🔥 Featured Matchup                 │
│                                     │
│ CS Club          🆚    Debate Team  │
│ 1,247 votes           892 votes     │
│ ████████░░░░     ██████░░░░         │
│                                     │
│ ⏰ 6 hours left in round            │
│                                     │
│ 3,201 students voting               │
│                                     │
│ [Vote CS Club] [Vote Debate Team]   │
│ [View Full Bracket]                 │
└─────────────────────────────────────┘
```

**Use Cases:**
- CAMPUS MADNESS (spaces compete)
- MAJOR WARS (majors compete)
- DORM WARS (dorms compete)
- CLASS SHOWDOWN (graduation years compete)
- PROFESSOR PLAYOFFS (best professors)

---

### **8. FEATURE_DROP** 🚀 Scale

**Purpose:** Time-limited feature testing with scarcity framing.

**Data Model:**
```typescript
interface FeatureDropRitual extends BaseRitual {
  archetype: 'FEATURE_DROP';

  featureDrop: {
    // Feature
    feature: {
      id: string;
      name: string;
      description: string;
      demo?: { video: string; images: string[] };
    };

    // Framing
    framingStrategy: 'limited_edition' | 'exclusive_access' | 'beta_test' | 'game';
    urgencyMessage: string;      // "TODAY ONLY", "48 HOURS"

    // Feature flags
    featureFlags: {
      flagName: string;
      enabledDuring: 'announced' | 'active';
      autoDisable: boolean;
      fallbackBehavior: 'hide' | 'show_teaser' | 'waitlist';
    }[];

    // Access
    eligibility: {
      scope: 'all' | 'early_adopters' | 'space_leaders' | 'custom';
      maxParticipants?: number;
    };

    // Analytics
    analytics: {
      trackUsage: boolean;
      metrics: {
        key: string;             // 'dm_sent', 'poll_created'
        displayName: string;
        aggregation: 'count' | 'unique_users' | 'avg';
      }[];
      realTimeUpdates: boolean;
    };

    // Feedback
    feedback: {
      enabled: boolean;
      timing: 'during' | 'after' | 'both';
      questions: SurveyQuestion[];
      incentive?: string;
    };

    // Post-ritual
    postRitualPlan: {
      strategy: 'permanent_enable' | 'recurring_ritual' | 'waitlist' | 'sunset';
      nextDate?: Date;
      threshold?: { metric: string; value: number };
    };

    // Live state
    currentParticipants: number;
    totalUsageEvents: number;
  };
}
```

**Feed Integration:**
```
┌─────────────────────────────────────┐
│ 💬 DM GAME • ACTIVE NOW             │
│                                     │
│ Direct messages are LIVE!           │
│ Limited edition - 24 hours only.    │
│                                     │
│ ⏰ 18 hours remaining                │
│                                     │
│ 📊 2,156 students using DMs         │
│    8,493 messages sent              │
│                                     │
│ [Send a DM]                         │
│ [Give Feedback]                     │
└─────────────────────────────────────┘
```

**Use Cases:**
- DM GAME (test direct messages)
- POLL PARTY (test polls)
- STORY MODE (test ephemeral content)
- LIVE STREAM NIGHT (test video)
- VOICE NOTE DAY (test audio messages)

---

### **9. RULE_INVERSION** 🚀 Scale

**Purpose:** Temporarily suspend platform rules for controlled chaos.

**Data Model:**
```typescript
interface RuleInversionRitual extends BaseRitual {
  archetype: 'RULE_INVERSION';

  ruleInversion: {
    // Inversions
    inversions: {
      ruleId: string;
      ruleName: string;
      normalBehavior: string;
      invertedBehavior: string;
      featureFlags: string[];
      middlewareOverrides: {
        endpoint: string;
        normalValidation: string;
        invertedValidation: string;
      }[];
      canInvert: boolean;
      safetyNotes?: string;
    }[];

    // Anonymity (if applicable)
    anonymity?: {
      enabled: boolean;
      scope: 'posts' | 'comments' | 'reactions' | 'all';
      identityStripping: {
        removeAvatar: boolean;
        removeHandle: boolean;
        removeName: boolean;
        pseudonym: 'random' | 'consistent_per_ritual' | 'consistent_forever';
      };
      accountabilityLayer: {
        logRealIdentity: boolean;     // REQUIRED
        moderatorCanUnmask: boolean;
        postRitualReveal: boolean;
        abuseHandling: 'immediate_ban' | 'post_ritual_action';
      };
      anonymousDisplayName: string;
      anonymousAvatarStyle: string;
    };

    // Moderation
    moderation: {
      strategy: 'increased_capacity' | 'pre_moderation' | 'community_flags';
      autoModRules: {
        enabled: boolean;
        sensitivity: 'low' | 'medium' | 'high';
        keywords: string[];
      };
      postRitualCleanup: {
        enabled: boolean;
        reviewAll: boolean;
        deleteViolations: boolean;
      };
    };

    // Guardrails (never inverted)
    permanentRules: {
      ruleId: string;
      ruleName: string;
      enforcement: 'strict';
    }[];

    // Live state
    currentInversions: {
      ruleId: string;
      invertedAt: Date;
      revertedAt?: Date;
      status: 'inverted' | 'reverted' | 'error';
    }[];

    contentCreated: { posts: number; comments: number };
    moderationActivity: { flagged: number; removed: number };
  };
}
```

**Feed Integration:**
```
┌─────────────────────────────────────┐
│ 🎭 BANG ANONYMOUS • ACTIVE NOW      │
│                                     │
│ Rules suspended for 24 hours:       │
│ ✗ Feed read-only → ✓ Direct posts  │
│ ✗ Identity → ✓ Anonymous           │
│                                     │
│ ⏰ 12 hours left                    │
│                                     │
│ 1,837 anonymous posts               │
│ 4,281 comments                      │
│                                     │
│ ⚠️ Accountability logs active       │
│                                     │
│ [Post Anonymously]                  │
└─────────────────────────────────────┘
```

**Use Cases:**
- BANG ANONYMOUS (anonymous posting)
- OPPOSITE DAY (reverse everything)
- COMMENT-ONLY DAY (disable posts)
- NO LIKES DAY (hide reactions)
- SPEED MODE (posts expire fast)
- CHAOS DAY (no rate limits)

---

## 🔄 **RITUAL LIFECYCLE**

### **Three Universal Phases**

```typescript
type RitualPhase = 'announced' | 'active' | 'ended';

interface RitualLifecycle {
  phase: RitualPhase;

  // Timestamps
  announceDate: Date;        // Becomes visible
  startDate: Date;           // Behavior begins
  endDate: Date;             // Behavior ends

  // Auto-transition
  autoTransition: boolean;

  // Emergency controls
  canManuallyEnd: boolean;
  canExtend: boolean;
}
```

### **Phase Behaviors**

#### **ANNOUNCED** (Pre-Launch)
- ✅ Ritual visible in feed
- ✅ Details page accessible
- ✅ Countdown timer
- ❌ No participation actions
- 🎯 **Goal:** Build anticipation

#### **ACTIVE** (In Progress)
- ✅ Ritual behavior enabled
- ✅ Participation actions available
- ✅ Live stats updating
- ✅ Banner prominent
- 🎯 **Goal:** Drive participation

#### **ENDED** (Completed)
- ✅ Recap visible
- ✅ Results displayed
- ❌ Participation disabled
- ✅ Archive accessible
- 🎯 **Goal:** Celebrate results

### **Automatic Transitions**

```typescript
// Lifecycle manager runs every 60 seconds
class RitualLifecycleManager {
  async processPhaseTransitions() {
    const now = new Date();
    const rituals = await this.getRitualsNeedingTransition(now);

    for (const ritual of rituals) {
      // announced → active
      if (ritual.phase === 'announced' && now >= ritual.startDate) {
        await this.startRitual(ritual);
      }

      // active → ended
      if (ritual.phase === 'active' && now >= ritual.endDate) {
        await this.endRitual(ritual);
      }
    }
  }
}
```

---

## 📱 **FEED INTEGRATION**

### **Banner Placement Strategy**

| Phase | Position | Frequency | Prominence | Dismissible |
|-------|----------|-----------|------------|-------------|
| **Announced** | Inline | Every 10 posts | Minimal | Yes (24h) |
| **Active** | Sticky top | Always | Maximized | No |
| **Ended** | Feed top | Once | Standard | Yes |

### **Universal Banner Component**

```typescript
// packages/ui/src/atomic/molecules/feed-ritual-banner.tsx

interface FeedRitualBannerProps {
  ritual: Ritual;
  liveData: RitualLiveData;
  onPrimaryAction: () => void;
  onViewDetails: () => void;
}

export function FeedRitualBanner({ ritual, liveData }: FeedRitualBannerProps) {
  // Adapts to archetype automatically
  return (
    <div className="ritual-banner">
      <BannerHeader ritual={ritual} />
      <BannerContent archetype={ritual.archetype} data={liveData} />
      <BannerCTA ritual={ritual} phase={ritual.phase} />
      <BannerStats data={liveData} />
    </div>
  );
}
```

### **Mobile Optimization**

```typescript
mobileFeedIntegration: {
  bannerPosition: 'sticky_top',
  bannerCollapsible: true,        // Collapse on scroll down
  expandOnScroll: 'up',           // Expand on scroll up
  tapBanner: 'expand_inline',     // Don't navigate away
  swipeBanner: 'dismiss_temporary'
}
```

---

## 🗄️ **DATA ARCHITECTURE**

### **Firestore Schema**

```
rituals/
  {ritualId}/
    // Universal fields
    id: string
    campusId: string
    archetype: 'TOURNAMENT' | 'FEATURE_DROP' | ...
    phase: 'announced' | 'active' | 'ended'
    title: string
    description: string
    announceDate: Date
    startDate: Date
    endDate: Date

    // Archetype-specific (conditionally present)
    tournament?: { ... }
    featureDrop?: { ... }
    ruleInversion?: { ... }
    founding?: { ... }
    countdown?: { ... }
    lottery?: { ... }
    unlock?: { ... }
    survival?: { ... }
    leak?: { ... }

    // Metadata
    createdBy: string
    createdAt: Date
    updatedAt: Date

ritual_participation/
  {participationId}/
    ritualId: string
    userId: string
    campusId: string
    joinedAt: Date
    completedAt?: Date

ritual_votes/              # Tournament votes
  {voteId}/
    ritualId: string
    userId: string
    matchupId: string
    spaceId: string
    timestamp: Date
    campusId: string

ritual_matchups/           # Tournament matchups
  {matchupId}/
    ritualId: string
    roundId: string
    competitor1: { id, votes }
    competitor2: { id, votes }
    winner?: string
    status: string
    campusId: string

ritual_usage/              # Feature drop usage
  {eventId}/
    ritualId: string
    userId: string
    eventType: string
    metadata: object
    timestamp: Date
    campusId: string

ritual_feedback/           # Feature drop feedback
  {responseId}/
    ritualId: string
    userId: string
    responses: array
    submittedAt: Date
    campusId: string

anonymous_content_accountability/  # PRIVATE - Rule inversion
  {contentId}/
    realUserId: string      # NEVER exposed to client
    contentId: string
    ritualId: string
    campusId: string
    createdAt: Date
    moderatorUnmasked: boolean
```

### **Security Rules**

```javascript
// Firestore security rules

// Public read, admin write
match /rituals/{ritualId} {
  allow read: if request.auth != null;
  allow write: if request.auth.token.admin == true;
}

// User can read own participation
match /ritual_participation/{participationId} {
  allow read: if request.auth.uid == resource.data.userId;
  allow create: if request.auth.uid == request.resource.data.userId;
}

// CRITICAL: Anonymous accountability logs
match /anonymous_content_accountability/{contentId} {
  allow read: if request.auth.token.admin == true
              || request.auth.token.moderator == true;
  allow write: if false;  // Only server-side writes
}
```

---

## 🔌 **API ENDPOINTS**

### **Core Ritual APIs**

```typescript
// Public endpoints
GET    /api/rituals                     // List all rituals
GET    /api/rituals/[id]                // Get ritual details
GET    /api/rituals/[id]/live-stats     // Real-time stats (30s cache)
POST   /api/rituals/[id]/participate    // Join ritual

// Tournament endpoints
POST   /api/rituals/[id]/vote           // Cast vote
GET    /api/rituals/[id]/bracket        // Get bracket
GET    /api/rituals/[id]/matchup/[mid]  // Get matchup details

// Feature drop endpoints
POST   /api/rituals/[id]/track-usage    // Track feature usage
POST   /api/rituals/[id]/feedback       // Submit feedback

// Rule inversion endpoints
POST   /api/rituals/[id]/anonymous-post // Create anonymous post
POST   /api/rituals/[id]/report         // Report abuse

// Lottery endpoints
POST   /api/rituals/[id]/enter-lottery  // Enter beta lottery
GET    /api/rituals/[id]/lottery-status // Check if won

// Admin endpoints
POST   /api/admin/rituals/create        // Create ritual
PATCH  /api/admin/rituals/[id]          // Update ritual
DELETE /api/admin/rituals/[id]          // Delete ritual
POST   /api/admin/rituals/[id]/end      // Emergency end
POST   /api/admin/rituals/[id]/extend   // Extend duration
POST   /api/admin/rituals/[id]/moderate // Moderation actions
```

### **Real-Time Updates**

```typescript
// Client-side polling for live stats
export function useRitualLiveData(ritualId: string) {
  const [liveData, setLiveData] = useState<RitualLiveData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/rituals/${ritualId}/live-stats`);
      const data = await res.json();
      setLiveData(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // 30s

    return () => clearInterval(interval);
  }, [ritualId]);

  return liveData;
}
```

---

## 🎨 **UI COMPONENT LIBRARY**

### **Core Components**

```
packages/ui/src/atomic/

molecules/
  ├── feed-ritual-banner.tsx           # Universal banner
  ├── ritual-progress-bar.tsx          # Progress visualization
  ├── ritual-countdown-timer.tsx       # Time remaining
  ├── ritual-stats-display.tsx         # Participants, votes, etc.
  └── ritual-cta-button.tsx            # Primary action

organisms/
  ├── ritual-card.tsx                  # Card for rituals page
  ├── tournament-bracket.tsx           # Bracket visualization
  ├── tournament-matchup-card.tsx      # Individual matchup
  ├── feature-drop-demo.tsx            # Feature showcase
  ├── rule-inversion-rules-list.tsx    # What's inverted
  ├── lottery-entry-form.tsx           # Enter lottery
  ├── unlock-progress-tracker.tsx      # Goal progress
  └── founding-wall.tsx                # Founder list

templates/
  ├── ritual-details-page.tsx          # Full details layout
  ├── tournament-page-layout.tsx       # Tournament view
  └── rituals-browse-page.tsx          # Browse all rituals
```

### **Design System Integration**

```css
/* Ritual-specific tokens */
--ritual-gold-start: #FFD700;
--ritual-gold-end: #FFA500;
--ritual-urgent: #FF6B6B;
--ritual-success: #51CF66;

/* Banner styles */
.ritual-banner {
  background: gradient(from var(--ritual-gold-start) to var(--ritual-gold-end));
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-ritual);
}

/* Phase-specific styles */
.ritual-announced { opacity: 0.9; }
.ritual-active {
  animation: pulse 2s infinite;
  box-shadow: 0 0 24px var(--ritual-gold-start);
}
.ritual-ended { opacity: 0.75; }
```

---

## 🛠️ **ADMIN COMPOSER**

### **5-Step Creation Flow**

```
Step 1: Archetype Selection
├─ Template library (9 pre-built templates)
├─ Or create custom
└─ Shows min user requirements

Step 2: Basic Configuration
├─ Name, description, dates
├─ Banner icon and style
└─ Campus selection

Step 3: Archetype Configuration
├─ Dynamic form (changes per archetype)
├─ Tournament: bracket, voting, prize
├─ Feature Drop: flags, analytics, feedback
├─ Rule Inversion: inversions, moderation
└─ Validation inline

Step 4: Presentation
├─ Banner messaging (announced/active/ended)
├─ CTA button text
├─ Live preview
└─ Shareable graphics

Step 5: Review & Launch
├─ Full config preview
├─ Safety checklist (for inversions)
├─ Launch options (now, scheduled, draft)
└─ One-click launch
```

### **Template Library**

```typescript
export const RITUAL_TEMPLATES: Record<string, RitualTemplate> = {

  // Cold Start
  FOUNDING_CLASS: { archetype: 'FOUNDING_CLASS', minUsers: 1 },
  LAUNCH_COUNTDOWN: { archetype: 'LAUNCH_COUNTDOWN', minUsers: 0 },
  BETA_LOTTERY: { archetype: 'BETA_LOTTERY', minUsers: 20 },
  UNLOCK_CHALLENGE: { archetype: 'UNLOCK_CHALLENGE', minUsers: 20 },
  SURVIVAL: { archetype: 'SURVIVAL', minUsers: 50 },
  LEAK: { archetype: 'LEAK', minUsers: 20 },

  // Scale
  CAMPUS_MADNESS: { archetype: 'TOURNAMENT', minUsers: 200 },
  DM_GAME: { archetype: 'FEATURE_DROP', minUsers: 100 },
  BANG_ANONYMOUS: { archetype: 'RULE_INVERSION', minUsers: 500 },

  // Variants
  MAJOR_WARS: { archetype: 'TOURNAMENT', minUsers: 200 },
  DORM_WARS: { archetype: 'TOURNAMENT', minUsers: 200 },
  POLL_PARTY: { archetype: 'FEATURE_DROP', minUsers: 100 },
  OPPOSITE_DAY: { archetype: 'RULE_INVERSION', minUsers: 500 }
};
```

### **Smart Availability**

```typescript
// Admin board gates rituals by current user count

function getAvailableRituals(currentUsers: number): RitualTemplate[] {
  return Object.values(RITUAL_TEMPLATES)
    .filter(template => currentUsers >= template.minUsers)
    .sort((a, b) => a.minUsers - b.minUsers);
}

// UI shows:
// ✅ Available Now (73 users)
// 🔒 Unlock at 100 users
// 🔒 Unlock at 200 users
// 🔒 Unlock at 500 users
```

---

## 📊 **SUCCESS METRICS**

### **Per-Archetype KPIs**

| Archetype | Key Metric | Success Threshold | Retention Impact |
|-----------|------------|-------------------|------------------|
| **FOUNDING_CLASS** | Completion rate | >80% reach limit | High (status) |
| **LAUNCH_COUNTDOWN** | Daily opens | >30% check daily | Medium |
| **BETA_LOTTERY** | Application rate | >50% enter | Medium |
| **UNLOCK_CHALLENGE** | Goal achievement | >70% hit goal | High (collective) |
| **SURVIVAL** | Live attendance | >40% watch live | Medium |
| **LEAK** | Speculation posts | >20% post theory | Low |
| **TOURNAMENT** | Participation | >30% vote | Very High |
| **FEATURE_DROP** | Try rate | >20% use feature | Medium |
| **RULE_INVERSION** | Participation | >15% post | High (memorable) |

### **Platform-Level Goals**

```
Weekly Active Users (WAU)
├─ Baseline (no rituals): 100 WAU
├─ With cold start rituals: 150 WAU (+50%)
└─ With scale rituals: 250 WAU (+150%)

Daily Active Users (DAU)
├─ Baseline: 30 DAU
├─ During active ritual: 80 DAU (+167%)
└─ Ritual live event: 120 DAU (+300%)

Content Creation
├─ Baseline: 50 posts/week
├─ Unlock challenge: 500 posts/week (+900%)
└─ Tournament: 300 posts/week (+500%)

Network Growth
├─ Baseline: 10 new users/week
├─ Founding class: 50 new users/week (+400%)
└─ Lottery referrals: 30 new users/week (+200%)
```

---

## 🚀 **LAUNCH SEQUENCING**

### **Week 1: Foundation (50-100 users)**

```
Day 1-7: FOUNDING_CLASS
├─ First 100 students get founder status
├─ Creates FOMO + urgency
└─ Target: 100 founders

Day 3: LAUNCH_COUNTDOWN begins
├─ "CAMPUS MADNESS in 12 days"
├─ Daily unlocks start
└─ Hype building
```

### **Week 2: Engagement (100-200 users)**

```
Monday: BETA_LOTTERY opens
├─ DM Game lottery (25 winners)
├─ 3-day entry period
└─ Drives anticipation

Tuesday: UNLOCK_CHALLENGE begins
├─ Goal: 500 posts = unlock BANG ANONYMOUS
├─ Campus works together
└─ Content creation spike

Friday 6pm: LOTTERY DRAWING (live event)
├─ 25 winners announced
├─ DM access for 24h
└─ FOMO for next lottery

Friday 8pm: UNLOCK SUCCESS
├─ Hit 500 posts!
├─ BANG ANONYMOUS unlocks
└─ First rule inversion
```

### **Week 3: Scale (200-500 users)**

```
Monday: LEAK begins
├─ Mystery ritual teased
├─ Daily clues
└─ Speculation builds

Friday 6-9pm: SURVIVAL MODE (live)
├─ 8 spaces, 3 hours
├─ Fast-paced tournament
└─ First live event success

Saturday: LEAK reveals
├─ Full CAMPUS MADNESS details
└─ Registration opens
```

### **Week 4: The Big One (500+ users)**

```
Monday: CAMPUS MADNESS begins
├─ 32 spaces competing
├─ Week-long tournament
├─ All previous hype pays off
└─ Platform-defining moment
```

---

## 🔐 **SECURITY & MODERATION**

### **Rule Inversion Safety**

```typescript
// CRITICAL: Accountability for anonymous content

interface AnonymousContentLog {
  contentId: string;
  realUserId: string;        // NEVER exposed to client
  ritualId: string;
  timestamp: Date;
  moderatorUnmasked: boolean;

  // Stored in highly restricted collection
  // Only admin + moderation system can read
}

// Moderation workflow
1. Content flagged (auto or user report)
2. Moderator reviews with unmask capability
3. If violation: immediate ban + content removal
4. Accountability log retained forever
```

### **Moderation Requirements**

| Archetype | Moderation Need | Strategy |
|-----------|----------------|----------|
| **FOUNDING_CLASS** | None | Automated |
| **LAUNCH_COUNTDOWN** | Low | Community flags |
| **BETA_LOTTERY** | Low | Automated |
| **UNLOCK_CHALLENGE** | Medium | Community flags + spot check |
| **SURVIVAL** | Low | Automated |
| **LEAK** | Low | Community flags |
| **TOURNAMENT** | Medium | Anti-fraud detection |
| **FEATURE_DROP** | Varies | Depends on feature |
| **RULE_INVERSION** | **HIGH** | Active moderation required |

### **Emergency Controls**

All rituals support:
- ✅ **Manual end** (terminate early)
- ✅ **Extension** (add time if needed)
- ✅ **Pause** (temporary hold)
- ✅ **Rollback** (revert rule inversions immediately)
- ✅ **Kill switch** (nuclear option)

---

## 📈 **GROWTH MECHANICS**

### **How Rituals Drive Growth**

```
1. FOUNDING_CLASS
   └─ FOMO → Invite friends for founder status

2. LAUNCH_COUNTDOWN
   └─ Anticipation → Share countdown with friends

3. BETA_LOTTERY
   └─ Referral entries → More entries = better odds

4. UNLOCK_CHALLENGE
   └─ Need more posts → Invite friends to help

5. SURVIVAL
   └─ Support your space → Recruit space members

6. TOURNAMENT
   └─ Vote for your space → Bring all space members

7. FEATURE_DROP
   └─ Cool feature → Tell friends about it

8. RULE_INVERSION
   └─ Chaos stories → "You had to be there" FOMO
```

### **Viral Loop**

```
Student experiences ritual
    ↓
Creates memorable moment
    ↓
Shares on IG/Snap ("check out HIVE")
    ↓
Friends join to participate
    ↓
Friends experience next ritual
    ↓
[Loop repeats]
```

---

## 🎯 **PRODUCT ROADMAP**

### **Phase 1: MVP (2 weeks)**
- [ ] Core ritual engine
- [ ] Lifecycle manager
- [ ] 3 cold start archetypes (Founding, Countdown, Lottery)
- [ ] Basic admin composer
- [ ] Feed banner integration

### **Phase 2: Cold Start Complete (Week 3-4)**
- [ ] 3 more cold start archetypes (Unlock, Survival, Leak)
- [ ] Template library
- [ ] Enhanced admin dashboard
- [ ] Mobile optimization

### **Phase 3: Scale Archetypes (Week 5-8)**
- [ ] Tournament system
- [ ] Feature drop infrastructure
- [ ] Rule inversion system
- [ ] Full moderation tools
- [ ] Advanced analytics

### **Phase 4: Scale & Polish (Month 3+)**
- [ ] Additional tournament variants
- [ ] Feature drop automation
- [ ] Rule inversion safety enhancements
- [ ] A/B testing framework
- [ ] Press/marketing integrations

---

## 🏁 **CONCLUSION**

Rituals are HIVE's **strategic differentiator**.

They solve the core problem: **How do you create campus culture at scale?**

Not through features. Not through algorithms. Through **shared experiences**.

**The 9 archetypes provide:**
- ✅ Cold start solution (works with 50 users)
- ✅ Growth mechanics (invite friends, unlock together)
- ✅ Retention drivers (daily habits, recurring events)
- ✅ Viral moments (memorable, shareable)
- ✅ Platform moat (competitors can't copy)

**Next Step:** Build the ritual engine. Ship FOUNDING_CLASS Week 1.

**The Goal:** Replace Instagram for campus content by creating experiences Instagram can't.

---

## 📚 **APPENDIX**

### **Related Documentation**
- [/docs/ux/UX-UI-TOPOLOGY.md](./UX-UI-TOPOLOGY.md) - Platform-wide patterns
- [/docs/ux/FEED_TOPOLOGY.md](./FEED_TOPOLOGY.md) - Feed integration
- [/docs/ux/SPACES_TOPOLOGY.md](./SPACES_TOPOLOGY.md) - Space rituals
- [/HIVE.md](/HIVE.md) - Product vision

### **Technical References**
- [/apps/web/src/lib/ritual-engine/](../../apps/web/src/lib/ritual-engine/) - Implementation
- [/packages/ui/src/atomic/organisms/ritual-*.tsx](../../packages/ui/src/atomic/organisms/) - Components
- [/apps/admin/src/app/rituals/](../../apps/admin/src/app/rituals/) - Admin tools

### **Template Examples**
See [/docs/rituals/templates/](../rituals/templates/) for full template configs.

---

**Document Owner:** Product Team
**Last Review:** November 2024
**Next Review:** After first ritual launch
