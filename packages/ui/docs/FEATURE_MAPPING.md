# HIVE Storybook Feature Mapping

This document maps components to HIVE's vertical slices (product features).

## Vertical Slice Organization

Stories are organized by **product feature**, not component complexity:

```
src/features/
├── 01-Onboarding/          # User signup and onboarding flow
├── 02-Profile/             # User identity and settings
├── 03-Spaces/              # Communities and space management
├── 04-Feed/                # Content discovery and engagement
├── 05-HiveLab/             # No-code tool builder
├── 06-Rituals/             # Campus-wide campaigns
├── 07-Notifications/       # Alert and notification system
├── 08-Navigation/          # App navigation and routing
├── 09-Social/              # Connections and interactions
├── 10-Forms/               # Form inputs and validation
└── 11-Shared/              # Shared UI components (buttons, cards, etc.)
```

## Component-to-Feature Mapping

### 01-Onboarding
Components for user signup and profile creation:
- `hive-onboarding-wizard` - Multi-step onboarding flow
- `interest-selector` - Select user interests
- `welcome-mat` - Welcome screen
- `completion-psychology-enhancer` - Progress motivation
- `hive-progress` - Onboarding progress bar

### 02-Profile
User identity and profile management:
- `profile-bento-grid` - Profile layout system
- `profile-identity-widget` - User identity display
- `profile-activity-widget` - Activity timeline
- `profile-connections-widget` - Connection list
- `profile-spaces-widget` - User's spaces
- `profile-completion-card` - Profile completion status
- `profile-view-layout` - Full profile page layout
- `hive-avatar-upload-with-crop` - Avatar upload
- `simple-avatar` - Avatar display
- `avatar` - Avatar component
- `presence-indicator` - Online status

### 03-Spaces
Community spaces and management:
- `space-*` components (from atomic/organisms)
- `photo-carousel` - Space photos
- `privacy-control` - Space privacy settings

### 04-Feed
Content discovery and engagement:
- Feed-related components (to be added)
- `card` - Content cards
- `badge` - Status badges

### 05-HiveLab
No-code tool builder:
- `complete-hive-tools-system` - Tool builder interface
- `hivelab-widget` - Tool widget display

### 06-Rituals
Campus campaigns and rituals:
- Ritual components (to be identified)

### 07-Notifications
Notification system:
- `notification-system` - Complete notification system
- `notification-dropdown` - Notification dropdown menu
- `notification-toast-manager` - Toast notifications
- `notification-bell` - Notification bell icon
- `notification-item` - Individual notification

### 08-Navigation
App navigation:
- `navigation-shell` - Main app navigation
- `navigation-preferences` - Nav settings
- `top-bar-nav` - Top navigation bar
- `skip-nav` - Accessibility skip links

### 09-Social
Social interactions and connections:
- `friend-request-manager` - Friend request handling
- `social-proof-accelerator` - Social proof elements
- `crisis-relief-interface` - Support features

### 10-Forms
Form inputs and validation:
- `form-field` - Form field wrapper
- `input` - Text input
- `input-enhanced` - Enhanced text input
- `hive-input` - HIVE-styled input
- `textarea` - Multi-line input
- `textarea-enhanced` - Enhanced textarea
- `checkbox` - Checkbox input
- `select` - Select dropdown
- `slider` - Range slider
- `switch` - Toggle switch
- `label` - Form label
- `command` - Command palette

### 11-Shared
Reusable UI components:
- `button` - Button component
- `hive-button` - HIVE-styled button
- `card` - Card component
- `hive-card` - HIVE-styled card
- `alert` - Alert messages
- `dialog` - Modal dialogs
- `hive-modal` - HIVE-styled modal
- `hive-confirm-modal` - Confirmation modal
- `badge` - Status badges
- `progress` - Progress bars
- `skeleton` - Loading skeletons
- `tabs` - Tab navigation
- `grid` - Grid layout
- `page-container` - Page wrapper
- `hive-logo` - HIVE logo
- `hive-logo-dynamic` - Animated logo
- `check-icon` - Checkmark icon
- `tech-sleek-showcase` - Tech showcase
- `universal-atoms` - Universal UI elements

## Migration Strategy

### Phase 1: Create Feature Folders ✅
- Create feature directories
- Keep atomic structure for reference

### Phase 2: Copy Stories to Features
- Copy (don't move) stories to feature folders
- Update story titles to feature-based paths
- Keep original stories for atomic reference

### Phase 3: Update Story Titles
Example transformation:
```typescript
// Before (atomic)
title: 'Atoms/Button'

// After (feature)
title: '11-Shared/Button'
```

### Phase 4: Update Storybook Config
- Update story glob patterns
- Prioritize feature stories
- Keep design system at top

### Phase 5: Remove Atomic Stories (Optional)
- Once features are stable
- Archive atomic stories
- Keep atomic components (just remove .stories files)

## Storybook Navigation

After reorganization, Storybook will show:

```
📖 Introduction
├── 00-Design-System
│   ├── Colors
│   ├── Typography
│   └── Spacing
├── 01-Onboarding
│   ├── Onboarding Wizard
│   ├── Interest Selector
│   └── Welcome Mat
├── 02-Profile
│   ├── Profile Grid
│   ├── Identity Widget
│   └── Connections Widget
├── 03-Spaces
│   └── ...
├── 04-Feed
│   └── ...
├── 05-HiveLab
│   ├── Tool Builder
│   └── HiveLab Widget
├── 06-Rituals
│   └── ...
├── 07-Notifications
│   ├── Notification System
│   ├── Notification Dropdown
│   └── Notification Bell
├── 08-Navigation
│   ├── Navigation Shell
│   └── Top Bar Nav
├── 09-Social
│   ├── Friend Requests
│   └── Social Proof
├── 10-Forms
│   ├── Form Field
│   ├── Input
│   └── Select
└── 11-Shared
    ├── Button
    ├── Card
    └── Modal
```

## Benefits of Vertical Slices

1. **Product-Centric** - Organized by user features, not technical structure
2. **Context-Rich** - See all components for a feature together
3. **Easier Discovery** - Find components by what they do, not how they're built
4. **Better Documentation** - Feature context is clearer
5. **Team Alignment** - Matches how product team thinks
6. **Faster Development** - See all related components at once

## Development Workflow

### Adding New Components
1. Identify the feature (Onboarding, Profile, Spaces, etc.)
2. Create component in appropriate feature folder
3. Create story in same feature folder
4. Story title starts with feature number (e.g., "02-Profile/...")

### Cross-Feature Components
If a component is used in multiple features:
1. Place in `11-Shared/`
2. Reference from feature stories
3. Create feature-specific stories if needed

---

**Organization Philosophy**: Components are organized by **product feature** (vertical slice), not by technical complexity (atomic design). This matches how product teams think and makes it easier to find components when building features.
