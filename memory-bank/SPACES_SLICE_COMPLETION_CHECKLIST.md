# Spaces Slice Completion Checklist

## 🎯 **Vision**: vBETA Preview Mode with Leader-Driven Activation

**Target**: 360+ pre-seeded spaces in preview mode, waiting for student leaders to request activation

---

## 📊 **Current State Assessment**

### ✅ **Strong Foundation**
- Advanced discovery engine with personalization
- Complete space data architecture with nested collections
- Full membership management system
- Join/leave functionality with validation
- Space browsing with filtering and search
- Sophisticated space detail pages

### ❌ **Major Vision Gap**
- **No preview mode system** - All dormant spaces are hidden
- **No activation request flow** - No way for leaders to claim spaces
- **No potential member calculation** - Can't show "1,247 potential members"
- **No RSS event integration** - No pre-seeded events in preview
- **No leader verification** - No 24-hour approval workflow
- **No space seeding** - No 360+ pre-populated spaces

---

## 🏗️ **Implementation Roadmap**

### **Phase 1: Preview Mode Foundation (Week 1-2)**

#### 1.1 **Space Seeding System**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Create space seeding script for 360+ spaces across all categories
- [ ] Academic spaces: CS Majors, Biology Dept, Math Majors, etc. (47 spaces)
- [ ] Residential spaces: Ellicott Complex, Governors Hall, etc. (28 spaces)
- [ ] Student organizations: Debate Club, Gaming Society, etc. (150+ spaces)
- [ ] Greek life: Fraternities, sororities, professional orgs (80+ spaces)
- [ ] University organizations: Official departments, services (55+ spaces)

**Files to create**:
- `scripts/seed-spaces/seed-all-spaces.ts`
- `scripts/seed-spaces/academic-spaces.json`
- `scripts/seed-spaces/residential-spaces.json`
- `scripts/seed-spaces/student-orgs.json`
- Data files for each category

#### 1.2 **Potential Member Calculation**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Algorithm to calculate potential members from user profiles
- [ ] Academic spaces: Count users with matching majors
- [ ] Residential spaces: Count users in matching dorms/areas
- [ ] Interest spaces: Count users with matching interests
- [ ] Real-time updates when user profiles change

**Files to create**:
- `packages/core/src/utils/potential-members-calculator.ts`
- `apps/web/src/app/api/spaces/[spaceId]/potential-members/route.ts`

#### 1.3 **RSS Event Integration**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] RSS feed ingestion for academic departments
- [ ] University calendar integration
- [ ] Event categorization by space relevance
- [ ] Preview display of upcoming events (read-only)

**Files to create**:
- `packages/core/src/utils/rss-ingestion.ts`
- `apps/web/src/app/api/spaces/[spaceId]/events/route.ts`

---

### **Phase 2: Preview Mode Interface (Week 3-4)**

#### 2.1 **Preview Directory**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Directory showing all spaces including dormant preview
- [ ] Category filtering: Academic, Residential, Greek, Student Orgs, University
- [ ] "Active" vs "Preview" status filtering
- [ ] Search across all spaces (not just activated)
- [ ] Recently activated spaces showcase

**Files to create/modify**:
- `apps/web/src/app/api/spaces/preview/route.ts`
- Update `apps/web/src/app/(wip)/spaces/page.tsx` for preview mode
- `packages/ui/src/components/spaces/preview-directory.tsx`

#### 2.2 **Preview Space Cards**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Preview mode space card design
- [ ] Potential member count display
- [ ] RSS events preview (next 3-5 events)
- [ ] "Request to Lead this Space" button
- [ ] Status badges: "Preview Mode" vs "Active"
- [ ] Leader information for activated spaces

**Files to create**:
- `packages/ui/src/components/spaces/preview-space-card.tsx`
- `packages/ui/src/components/spaces/space-status-badge.tsx`

#### 2.3 **Enhanced Space Detail Page**
**Status**: 🟡 Basic Implementation

**Missing features**:
- [ ] Preview mode detection and UI
- [ ] Potential member count display
- [ ] "Waiting for student leader" messaging
- [ ] RSS events section (read-only)
- [ ] Request activation button
- [ ] Activation request status tracking

**Files to modify**:
- `apps/web/src/app/(wip)/spaces/[spaceId]/page.tsx`
- `apps/web/src/app/(wip)/spaces/[spaceId]/components/space-action-button.tsx`

---

### **Phase 3: Activation Request System (Week 5-6)**

#### 3.1 **Request Activation Interface**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Request form with connection validation
- [ ] Connection dropdown: "I'm a CS major", "I'm a TA", "I lead a group", "Other"
- [ ] Reason text field (2-3 sentences)
- [ ] First tool selection dropdown
- [ ] Form validation and submission
- [ ] Request status tracking UI

**Files to create**:
- `packages/ui/src/components/spaces/activation-request-form.tsx`
- `apps/web/src/app/api/spaces/[spaceId]/request-activation/route.ts`

#### 3.2 **Leader Verification System**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Automatic verification for obvious matches (CS major → CS Majors space)
- [ ] Manual verification queue for ambiguous requests
- [ ] 24-hour SLA tracking
- [ ] Email notifications for approval/rejection
- [ ] Conflict resolution for multiple requests

**Files to create**:
- `apps/web/src/app/api/spaces/activation-requests/route.ts`
- `packages/core/src/utils/leader-verification.ts`
- `apps/admin/src/app/activation-requests/page.tsx` (admin interface)

#### 3.3 **Activation Request Data Models**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] ActivationRequest Firestore collection
- [ ] Request status tracking (pending, approved, rejected)
- [ ] User connection validation
- [ ] Request queue management
- [ ] Notification system integration

**Files to create**:
- `packages/core/src/domain/space/activation-request.ts`
- Firestore security rules for activation requests

---

### **Phase 4: Space Activation Flow (Week 7-8)**

#### 4.1 **Space Handoff Process**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Approval workflow: dormant → activated status change
- [ ] Leader assignment and permissions
- [ ] Activation notification to potential members
- [ ] "Founding Builder" badge assignment
- [ ] Member migration from potential to actual

**Files to create**:
- `apps/web/src/app/api/spaces/[spaceId]/activate/route.ts`
- `packages/core/src/utils/space-activation.ts`

#### 4.2 **Activation Checklist**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Welcome checklist for new space leaders
- [ ] "Plant your first Tool" step
- [ ] "Pin important resources" step
- [ ] "Configure Events settings" step
- [ ] "Send activation announcement" step
- [ ] Progress tracking and completion rewards

**Files to create**:
- `packages/ui/src/components/spaces/activation-checklist.tsx`
- `apps/web/src/app/(wip)/spaces/[spaceId]/activate/page.tsx`

#### 4.3 **Notification System**
**Status**: ❌ Not Implemented

**Requirements**:
- [ ] Activation notifications to potential members
- [ ] Leader approval/rejection emails
- [ ] Recently activated spaces feed
- [ ] Social proof messaging ("Sarah Chen just activated CS Majors")

**Files to create**:
- `packages/core/src/utils/space-notifications.ts`
- Email templates for activation workflow

---

## 🔧 **Data Model Updates**

### **Enhanced Space Model**
```typescript
interface SpacePreview extends Space {
  // Preview mode additions
  potentialMembers: number;
  rssEvents: RSSEvent[];
  activationRequests: ActivationRequest[];
  approvedLeader?: string;
  activatedAt?: Date;
  
  // Preview mode status
  isPreviewMode: boolean;
  canRequestActivation: boolean;
}

interface ActivationRequest {
  id: string;
  spaceId: string;
  userId: string;
  connection: 'major' | 'ta' | 'leader' | 'other';
  connectionText?: string; // For "other"
  reason: string;
  firstTool: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  reviewNotes?: string;
}

interface RSSEvent {
  title: string;
  date: Date;
  source: string;
  url?: string;
  description?: string;
}
```

### **API Endpoints Needed**

#### New Routes Required
- [ ] `GET /api/spaces/preview` - List all spaces including dormant
- [ ] `POST /api/spaces/{spaceId}/request-activation` - Submit activation request
- [ ] `GET /api/spaces/activation-requests` - Admin review queue
- [ ] `POST /api/spaces/activation-requests/{requestId}/approve` - Approve request
- [ ] `POST /api/spaces/activation-requests/{requestId}/reject` - Reject request
- [ ] `GET /api/spaces/{spaceId}/potential-members` - Calculate potential membership
- [ ] `GET /api/spaces/{spaceId}/rss-events` - Get pre-seeded events
- [ ] `POST /api/spaces/{spaceId}/activate` - Complete activation process

---

## ✅ **Definition of Done**

### **vBETA Preview Mode Ready**
- [ ] 360+ spaces pre-seeded across all categories
- [ ] All spaces visible in preview directory
- [ ] Potential member counts calculated accurately
- [ ] RSS events display for preview spaces
- [ ] "Request to Lead" functionality works end-to-end

### **Activation System Working**
- [ ] Students can request space activation
- [ ] Verification workflow completes within 24 hours
- [ ] Approved leaders receive activation checklist
- [ ] Space transitions from preview to active seamlessly
- [ ] Members get notified when spaces activate

### **Technical Quality**
- [ ] All API endpoints handle preview and activated states
- [ ] Preview UI components work across all devices
- [ ] Real-time potential member calculations
- [ ] Proper error handling for activation conflicts
- [ ] Admin interface for managing activation queue

---

## 🎯 **vBETA Success Metrics**

### **Activation Goals**
- **50+ spaces activated** during vBETA period
- **80% of activated spaces** have planted tools within 72 hours
- **60% weekly activity** in activated spaces
- **24-hour average** activation approval time

### **Quality Indicators**
- **90% request approval rate** (well-matched leaders)
- **Leader retention**: 80% still active after 1 month
- **Member conversion**: 60% of potential members join when activated
- **Tool diversity**: Average 3 different tools per activated space

### **User Experience**
- **Clear preview state** - Users understand spaces are waiting for activation
- **Smooth activation flow** - No confusion during leader handoff
- **Visible impact** - Potential members see immediate value when spaces activate
- **Natural growth** - Organic leader emergence without forced participation

---

## 🚀 **Implementation Phases Summary**

**Phase 1 (Weeks 1-2)**: Space seeding, potential member calculation, RSS integration
**Phase 2 (Weeks 3-4)**: Preview directory, preview cards, enhanced space pages  
**Phase 3 (Weeks 5-6)**: Activation request system, verification workflow
**Phase 4 (Weeks 7-8)**: Space handoff, activation checklist, notifications

**Total Timeline**: 8 weeks to complete vBETA preview mode system

---

*Last Updated: [Current Date]*  
*Focus: Leader-driven activation with quality control and community investment*