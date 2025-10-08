# HIVE Design System - Component Audit

**Date:** October 2, 2025
**Status:** Migration to shadcn foundation in progress

## Current State

### ✅ Atoms (Base Components) - 46 total
**With Stories (16):**
- accordion
- alert-dialog
- badge
- button
- card
- checkbox
- dialog
- dropdown-menu
- label
- select
- separator
- skeleton
- switch
- tabs
- textarea
- input

**Missing Stories (30):**
- alert ⚠️
- aspect-ratio
- avatar ⚠️
- breadcrumb
- calendar
- carousel
- chart
- collapsible
- command
- context-menu
- drawer
- form ⚠️
- hover-card
- input-otp
- menubar
- navigation-menu
- pagination
- popover
- progress ⚠️
- radio-group
- resizable
- scroll-area
- sheet
- sidebar
- slider ⚠️
- sonner (toast)
- table ⚠️
- toggle
- toggle-group
- tooltip

⚠️ = High priority for HIVE platform

### ❌ Molecules (Composed Components) - 0 total
**Needed for HIVE:**
- SearchBar (Input + Command)
- FormField (Label + Input + Error)
- StatCard (Card + Badge + Progress)
- UserCard (Avatar + Card + Button)
- NotificationItem (Avatar + Card + Badge)
- CommentInput (Avatar + Textarea + Button)
- FilterGroup (Select + Checkbox + Button)
- DatePicker (Calendar + Popover + Input)
- RangeSlider (Slider + Input)
- TagInput (Input + Badge)

### ❌ Organisms (Complex HIVE Components) - 0 total
**From apps/web/src/components:**

**Profile:**
- ProfileCard (hive-avatar-card.tsx)
- ProfileHeader
- ProfileBio
- PersonalToolsCard
- PhotoUploadModal
- ProfileIdentityModal
- CardCustomizationModal

**Feed:**
- PostCard (post-card.tsx)
- EventCard (enhanced-event-card.tsx)
- RitualCards (ritual-horizontal-cards.tsx)
- FeedFilters
- FeedComposer

**Spaces:**
- SpaceCard
- SpaceHeader
- CreateSpaceModal
- SpaceSettingsModal

**Social:**
- ConnectionList
- FriendRequests
- MessageThread

**Modals:**
- SearchModal
- ReportContentModal
- CreateEventModal
- EventDetailsModal
- ConfirmationModal
- IntegrationConnectionModal
- ToolConfigModal

### ❌ Templates (Page Layouts) - 0 total
**Needed for HIVE:**

**Core Layouts:**
- DashboardLayout (sidebar + header + main)
- FeedLayout (feed + sidebar widgets)
- ProfileLayout (header + tabs + content)
- SpaceLayout (space header + tabs + feed)
- SettingsLayout (sidebar nav + content)

**Specialty Layouts:**
- AuthLayout (centered card + background)
- OnboardingLayout (progress + content + sidebar)
- ModalLayout (overlay + card + actions)
- EmptyStateLayout (icon + message + action)
- ErrorLayout (error icon + message + retry)

## Platform-Wide Patterns

### Navigation Patterns
1. **Top Navigation** - Global app navigation
2. **Sidebar Navigation** - Feature-specific navigation
3. **Tab Navigation** - Content switching within pages
4. **Breadcrumbs** - Hierarchical navigation
5. **Bottom Navigation** - Mobile primary nav

### Content Patterns
1. **Card Grids** - Spaces, profiles, events
2. **Feed Streams** - Infinite scroll posts
3. **List Views** - Connections, notifications
4. **Detail Views** - Full content pages
5. **Split Views** - List + detail side-by-side

### Interaction Patterns
1. **Modals** - Create, edit, confirm actions
2. **Sheets** - Mobile-friendly side panels
3. **Popovers** - Quick actions, menus
4. **Tooltips** - Contextual help
5. **Toasts** - Feedback notifications

### Form Patterns
1. **Inline Forms** - Comment, reply
2. **Modal Forms** - Create space, event
3. **Multi-Step Forms** - Onboarding wizard
4. **Filter Forms** - Search, discovery
5. **Settings Forms** - Preferences, privacy

## Missing Documentation

### Critical (Needed for MVP)
1. ⚠️ **Form** - All forms use this
2. ⚠️ **Table** - Admin dashboards, data views
3. ⚠️ **Progress** - Onboarding, loading states
4. ⚠️ **Avatar** - Everywhere on platform
5. ⚠️ **Alert** - Error states, warnings

### High Priority (Common Patterns)
6. **Popover** - Menus, quick actions
7. **Sheet** - Mobile navigation, filters
8. **Command** - Search, keyboard shortcuts
9. **Calendar** - Event creation, scheduling
10. **Tooltip** - Contextual help throughout

### Medium Priority (Feature-Specific)
11. **Carousel** - Photo galleries, onboarding
12. **Chart** - Analytics dashboards
13. **Pagination** - Long lists, search results
14. **Navigation-menu** - Complex nav patterns
15. **Sidebar** - Dashboard layouts

### Layout Templates Needed
1. **Dashboard Template** - Main app layout
2. **Profile Template** - User profile pages
3. **Feed Template** - Main feed view
4. **Space Template** - Space pages
5. **Settings Template** - Settings pages
6. **Empty State Template** - No content states
7. **Error Template** - Error pages

## Action Items

### Phase 1: Complete Base Components (Week 1)
- [ ] Create stories for 30 missing atoms
- [ ] Priority: Form, Table, Progress, Avatar, Alert
- [ ] Add interactive examples
- [ ] Document props and variants

### Phase 2: Build Molecules (Week 2)
- [ ] Create 10 common molecule components
- [ ] SearchBar, FormField, StatCard, UserCard
- [ ] Document composition patterns
- [ ] Show real HIVE use cases

### Phase 3: Document Organisms (Week 3)
- [ ] Extract organisms from apps/web
- [ ] Refactor to use shadcn base
- [ ] Create comprehensive stories
- [ ] ProfileCard, PostCard, SpaceCard, EventCard

### Phase 4: Define Templates (Week 4)
- [ ] Create 7 core layout templates
- [ ] Document responsive behaviors
- [ ] Show mobile vs desktop variants
- [ ] Include accessibility patterns

## Success Metrics

- ✅ 100% of atoms have stories (46/46)
- ⬜ 10+ molecules documented
- ⬜ 20+ organisms documented
- ⬜ 7+ templates documented
- ⬜ All HIVE motion tokens used consistently
- ⬜ Mobile-first responsive patterns
- ⬜ WCAG 2.1 AA accessibility compliance

## Notes

- All components should use HIVE motion tokens
- Maintain dark theme as default
- Follow atomic design methodology strictly
- Components must work on mobile (320px+)
- Use real HIVE content, not Lorem Ipsum
- Include empty states, loading states, error states
