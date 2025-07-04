# Profile Slice Completion Checklist

## 🎯 **Vision**: Campus Command Center with Utility-First Design

**Target**: Bento grid profile system with progressive social disclosure and behind-the-scenes reputation tracking

---

## 📊 **Current State Assessment**

### ✅ **What's Working**
- Basic profile API (GET/PATCH `/api/profile/me`)
- Profile header with avatar and academic info
- Calendar widget with monthly view
- Basic activity tracking display
- Development mode with mock data
- Responsive card layout foundation

### ❌ **Major Gaps**
- **No bento grid layout** - Current layout is basic 2-3 column grid
- **No social layer** - Missing locked features and progressive disclosure
- **No tool integration** - Placeholder cards only
- **No privacy controls** - Ghost mode and granular settings missing
- **No builder system** - HiveLAB access not implemented
- **No reputation tracking** - Behind-the-scenes quality signals missing

---

## 🏗️ **Implementation Roadmap**

### **Phase 1: Bento Grid Foundation (Week 1-2)**

#### 1.1 **Bento Grid Layout System**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Create 4-column responsive CSS Grid system
- [ ] Implement card sizing system (1x1, 2x1, 2x2)
- [ ] Add card positioning and gap management
- [ ] Mobile-responsive breakpoints
- [ ] Visual hierarchy with proper spacing

**Files to create/modify**:
- `packages/ui/src/components/profile/bento-grid.tsx`
- `packages/ui/src/components/profile/profile-card.tsx`
- Update `profile-dashboard.tsx` to use bento layout

#### 1.2 **Avatar Card Enhancement**
**Status**: 🟡 Partially Implemented

**Missing features**:
- [ ] Tinder-style card design
- [ ] "Profile Views: Private" display (locked)
- [ ] "Make Public" toggle (disabled)
- [ ] Builder status badge
- [ ] Social evolution hints

**Files to modify**:
- `profile-header.tsx` → Convert to card format
- Add social preview elements

#### 1.3 **Calendar Card Enhancement**  
**Status**: 🟡 Basic Implementation

**Missing features**:
- [ ] Multi-source event integration (personal, Spaces, RSS)
- [ ] Color-coded time blocks
- [ ] "Share Availability" locked feature
- [ ] Personal tool reminders integration
- [ ] Event RSVP integration

**Files to modify**:
- `calendar-widget.tsx`
- Add Space events API integration (pending Team 2)

---

### **Phase 2: Core Cards Implementation (Week 3-4)**

#### 2.1 **HiveLAB Card**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Non-builder state: Countdown timer with lock icon
- [ ] Builder state: Tool creation gateway
- [ ] Usage statistics display
- [ ] Impact metrics (tools created, usage)
- [ ] Gradient overlay for visual appeal
- [ ] Notification signup for non-builders

**Files to create**:
- `packages/ui/src/components/profile/hivelab-card.tsx`
- Builder status detection logic

#### 2.2 **Your Tools Card (Featured 2x2)**
**Status**: ❌ Not Implemented  

**Requirements**:
- [ ] 3x3 tool grid display
- [ ] Tool icon and name display
- [ ] Empty slots with dashed borders
- [ ] Tool creation invitation
- [ ] Locked social features: "Tool sharing: Coming soon"
- [ ] Hidden usage statistics with lock icons

**Files to create**:
- `packages/ui/src/components/profile/tools-card.tsx`
- Tool data integration (pending Team 3)

#### 2.3 **Your Spaces Card**
**Status**: 🟡 Placeholder

**Requirements**:
- [ ] Categorized Space memberships (Academic, Residential, Social, Greek, University)
- [ ] Membership count display per category
- [ ] Space reputation previews (locked)
- [ ] Link to Space management
- [ ] Discovery integration

**Files to modify**:
- `my-spaces.tsx`
- Space data integration (pending Team 2)

---

### **Phase 3: Social Layer & Privacy (Week 5-6)**

#### 3.1 **Ghost Mode Card**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Privacy toggle for platform invisibility
- [ ] Remove from member lists when active
- [ ] Disable activity tracking
- [ ] Pause notifications
- [ ] "Currently: Always private" status message
- [ ] Visual indicators for privacy state

**Files to create**:
- `packages/ui/src/components/profile/ghost-mode-card.tsx`
- Privacy state management

#### 3.2 **Social Preview Card**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Showcase upcoming social features
- [ ] "Build privately, share when ready" messaging
- [ ] Feature previews: Public Profiles, Tool Sharing, Builder Connections
- [ ] Notification signup for updates
- [ ] Progressive disclosure hints

**Files to create**:
- `packages/ui/src/components/profile/social-preview-card.tsx`

#### 3.3 **Activity Log Enhancement**
**Status**: 🟡 Basic Implementation

**Missing features**:
- [ ] Public/private toggle (locked but visible)
- [ ] Real activity data integration
- [ ] Export functionality
- [ ] Activity filtering and search
- [ ] Privacy controls per activity type

**Files to modify**:
- `profile-activity.tsx`

#### 3.4 **Request Access Card**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Display exclusive Spaces requiring approval
- [ ] Prerequisites and invitation requirements
- [ ] CS Honors, Research Labs, Greek organizations
- [ ] Link to full Space directory
- [ ] Application status tracking

**Files to create**:
- `packages/ui/src/components/profile/request-access-card.tsx`
- Space discovery integration

---

### **Phase 4: Behind-the-Scenes Systems (Week 7-8)**

#### 4.1 **Builder Stats Card**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Hidden impact metrics with lock icons
- [ ] Tools Created, Students Helped, Viral Coefficient
- [ ] Builder Rank at UB (blurred/locked)
- [ ] "Unlocks with public profile" messaging
- [ ] Quality signal collection for algorithms

**Files to create**:
- `packages/ui/src/components/profile/builder-stats-card.tsx`
- Analytics integration

#### 4.2 **Reputation System (Algorithmic)**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Tool usage pattern tracking
- [ ] Cross-Space tool effectiveness metrics
- [ ] User retention on specific tools
- [ ] Tool complexity and innovation scoring
- [ ] Quality signals for discovery algorithms
- [ ] **No visible scores** - purely backend intelligence

**Files to create**:
- `packages/core/src/domain/reputation/quality-signals.ts`
- `apps/web/src/app/api/analytics/tool-usage/route.ts`
- Background tracking infrastructure

#### 4.3 **Privacy-First Architecture**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Progressive disclosure system
- [ ] All features default to private
- [ ] Explicit opt-in for public features
- [ ] Granular privacy controls
- [ ] Data portability and deletion
- [ ] Social feature interest tracking (clicks on locked features)

**Files to create**:
- `packages/core/src/domain/privacy/settings.ts`
- Privacy state management
- Social readiness analytics

---

## 🔧 **Technical Requirements**

### **Data Models**

#### Enhanced Profile Model
```typescript
interface ProfileState {
  // Current
  basic: UserProfile;
  
  // New additions
  social: {
    visibility: "private" | "campus-only" | "public";
    profileViews: number;
    socialFeaturesEnabled: boolean;
    ghostMode: boolean;
  };
  
  builder: {
    isBuilder: boolean;
    toolsCreated: number;
    impactMetrics: QualitySignals; // Hidden from user
    builderRank?: number; // Locked until public
  };
  
  privacy: {
    activityVisibility: "private" | "public";
    shareAvailability: boolean;
    allowDirectMessages: boolean;
    dataExportRequested?: Date;
  };
}
```

#### Quality Signals (Backend Only)
```typescript
interface QualitySignals {
  toolUsageMetrics: {
    adoptionRate: number;
    retentionRate: number;
    crossSpaceUsage: number;
  };
  
  userEngagement: {
    sessionDepth: number;
    featureUtilization: number;
    organicSpread: number;
  };
  
  qualityIndicators: {
    toolComplexity: number;
    innovationScore: number;
    communityImpact: number;
  };
}
```

### **Component Architecture**

#### Bento Grid System
```typescript
interface BentoCard {
  id: string;
  size: "1x1" | "2x1" | "2x2";
  priority: number;
  component: React.ComponentType;
  permissions?: string[];
  isLocked?: boolean;
}
```

### **API Endpoints**

#### New Routes Needed
- [ ] `GET /api/profile/social-readiness` - Track clicks on locked features
- [ ] `POST /api/profile/privacy-settings` - Granular privacy controls
- [ ] `GET /api/profile/quality-signals` - Backend analytics (admin only)
- [ ] `POST /api/profile/ghost-mode` - Privacy toggle
- [ ] `GET /api/profile/builder-stats` - Impact metrics (locked/unlocked)

---

## ✅ **Definition of Done**

### **User Experience**
- [ ] Users can navigate bento grid intuitively on all devices
- [ ] All social features are locked but discoverable
- [ ] Privacy controls are comprehensive and clear
- [ ] Builder journey from locked to unlocked is smooth
- [ ] Calendar integration works with multiple sources

### **Technical**
- [ ] Bento grid responsive across all breakpoints
- [ ] Behind-the-scenes analytics collect quality signals
- [ ] Privacy settings persist and enforce correctly
- [ ] All cards load independently with proper error states
- [ ] Progressive disclosure works without surprising users

### **Integration**
- [ ] Spaces integration displays memberships correctly
- [ ] Tools integration shows creation and usage
- [ ] Calendar syncs with Space events
- [ ] Social readiness signals inform platform algorithms

---

## 🎯 **Success Metrics**

### **Utility Engagement**
- Daily calendar usage: >70%
- Profile completion rate: >85%
- Tool card interaction: >40%

### **Social Readiness** 
- Clicks on locked features: Track interest
- Ghost mode adoption: Measure privacy consciousness
- Builder progression: Time from locked to unlocked

### **Platform Intelligence**
- Quality signal collection: 100% of tool interactions
- Algorithmic recommendations improve by 25%
- Cross-Space tool discovery increases by 40%

---

*Last Updated: [Current Date]*  
*Focus: Utility-first design with progressive social disclosure*