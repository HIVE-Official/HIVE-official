# HIVE PRODUCT DEVELOPMENT BLUEPRINT

**🎯 PAGE-DRIVEN DEVELOPMENT** | **🚀 USER-JOURNEY FOCUSED** | **✅ FEATURE-COMPLETE**

We are shifting from a component-first checklist to a page-driven product blueprint. This aligns our development with shippable user-facing features. We build what the user sees, deriving component needs from real product pages.

---

## **🚀 PHASE 1: CORE USER JOURNEY**

### [ ] **VIEW-1: Onboarding & Authentication**
- **User Story**: As a new user, I need a seamless way to sign up, create my profile, and understand the platform's basics so I can get started.
- **Pages/Routes**:
  - `/welcome` - Landing/invitation page.
  - `/auth/login` - Magic link entry.
  - `/auth/verify` - Magic link verification.
  - `/onboarding` - Multi-step profile setup.
- **Required Components**:
  - `AP-1A`: Button (Login, Continue) **✅ DONE**
  - `AP-1B`: Input (Email, Handle, Name) **✅ DONE**
  - `CD-1A`: Card (for steps) **✅ DONE**
  - `CD-1B`: Avatar/Profile components (for profile picture upload) 🚧 TODO
  - `SC-1C`: Toast/Notification (for success/error messages) 🚧 TODO
- **States**: Loading, error, success for each step.

### [ ] **VIEW-2: The Main Feed**
- **User Story**: As a user, I want to see a central feed of relevant activity from the spaces I'm in to stay updated.
- **Pages/Routes**: `/feed`
- **Required Components**:
  - `NL-1B`: Main Header/Nav Bar 🚧 TODO
  - `FC-1A`: Post Card Component 🚧 TODO
  - `FC-1B`: Event Listing Component 🚧 TODO
  - `FC-1C`: Comment Thread System 🚧 TODO
  - `CD-1A`: AdaptiveCard (to render different content types) **✅ DONE**
  - `SC-1A`: Skeleton loaders for feed 🚧 TODO
- **States**: Loading, empty feed, error loading feed.

### [ ] **VIEW-3: Space Discovery & Details**
- **User Story**: As a user, I want to discover new spaces and view their content and members to decide if I want to join.
- **Pages/Routes**:
  - `/campus` (or `/spaces/browse`)
  - `/spaces/[spaceId]`
- **Required Components**:
  - `NL-1C`: Space Header **🚧 IN PROGRESS**
  - `CD-1A`: SpaceShowcaseCard (for discovery) **✅ DONE**
  - `NL-1A`: Tab Navigation (Feed, Members, About) 🚧 TODO
  - `FC-1A`: Post Card 🚧 TODO
  - `CD-1B`: Avatar/Profile (for member list) 🚧 TODO
  - `AP-1A`: Button (Join/Leave/Settings) **✅ DONE**
  - `CD-1C`: Badges (for space status/verification) **✅ DONE**
- **States**: Public vs Private, Member vs Non-member, Loading, Empty, Error.

### [ ] **VIEW-4: User Profile**
- **User Story**: As a user, I want to view my own profile or other users' profiles to see their activity, spaces, and information.
- **Pages/Routes**: `/profile/[userId]`
- **Required Components**:
  - `NL-1D`: Profile Header 🚧 TODO
  - `CD-1B`: Avatar and profile components 🚧 TODO
  - A grid for showing user's posts or created content.
  - `AP-1A`: Button (Follow, Message) **✅ DONE**
- **States**: Own profile vs other's profile, Loading, Error.

---

## **COMPONENT INVENTORY & STATUS**

This section tracks the status of individual, reusable components referenced in the views above. Overall progress: 33% (9/27 tasks).

### **🎨 DESIGN FOUNDATIONS (100% Complete)**
- [x] **DT-1A**: Complete color system implementation
- [x] **DT-1B**: Typography scale and implementation
- [x] **DT-1C**: Motion and timing system
- [x] **DT-1D**: Spacing and layout grid

### **🧱 ATOMIC PRIMITIVES (67% Complete)**
- [x] **AP-1A**: Button component system
- [x] **AP-1B**: Input and form controls
- [ ] **AP-1C**: Layout and container components

### **🧩 CONTENT COMPONENTS (67% Complete)**
- [x] **CD-1A**: Card component system
- [ ] **CD-1B**: Avatar and profile components
- [x] **CD-1C**: Badge and status indicators

### **🎛 INTERACTIVE ELEMENTS (33% Complete)**
- [x] **LE-1A**: Counter component
- [ ] **LE-1B**: Timer component
- [ ] **LE-1C**: Toggle and switch components

### **📱 FEED & SOCIAL COMPONENTS (0% Complete)**
- [ ] **FC-1A**: Post card component
- [ ] **FC-1B**: Event listing component
- [ ] **FC-1C**: Comment thread system
- [ ] **FC-1D**: RSVP and attendance tracking

### **🌐 NAVIGATION & LAYOUT (0% Complete)**
- [ ] **NL-1A**: Tab navigation component
- [ ] **NL-1B**: Header and navigation bars
- [ ] **NL-1C**: Space header component **🚧 IN PROGRESS**
- [ ] **NL-1D**: Profile header component

### **🔥 SYSTEM COMPONENTS (0% Complete)**
- [ ] **SC-1A**: Loading and skeleton states
- [ ] **SC-1B**: Error boundary and error states
- [ ] **SC-1C**: Toast and notification system
- [ ] **SC-1D**: Achievement and unlock displays

### **🔧 BUILDER TOOLS (0% Complete)**
- [ ] **BT-1A**: Element palette for Tool building
- [ ] **BT-1B**: Tool composition canvas
- [ ] **BT-1C**: Tool settings panel

---
*This blueprint guides building a shippable product through page-driven development, leveraging a comprehensive component inventory developed in Storybook.* 