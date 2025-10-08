what# 🔍 HIVE Component Gap Analysis

**Status:** Identifies missing/backed-up components vs SPEC.md requirements
**Date:** 2025-10-02
**Finding:** Major components exist but are in backup - need restoration & integration

---

## 🚨 Critical Finding

**Many components exist but were backed up during shadcn migration:**

- Location: `packages/ui/src/.atomic-backup/`
- Status: Not currently integrated
- Impact: Features in SPEC.md cannot be built without these

---

## 📊 Gap Summary

### Currently Active

- ✅ **84 components** in production (atoms/molecules/organisms/templates)
- ✅ **120+ Storybook stories** documented
- ✅ **Core features** covered (Auth, Feed basics, Spaces basics, Profile)

### In Backup (Need Restoration)

- 🔄 **~30+ components** in `.atomic-backup/`
- 🔄 **Rituals system** (9 components)
- 🔄 **Onboarding flows** (4 components)
- 🔄 **Profile features** (12 components)
- 🔄 **Space features** (8 components)

---

## 🎯 Missing Components by Feature

### 1. RITUALS SYSTEM (High Priority - Core Feature)

**Required by SPEC.md:** Campus-wide behavioral campaigns
**Status:** Components exist in backup, not integrated

#### Missing Molecules (5 components)

- [ ] **RitualCard** - Individual ritual display
  - Location: `.atomic-backup/molecules/ritual-card.tsx`
  - Story: `.atomic-backup/molecules/ritual-card.stories.tsx`
  - Purpose: Display ritual info, progress, CTA

- [ ] **RitualCheckInButton** - Check-in action button
  - Location: `.atomic-backup/molecules/ritual-check-in-button.tsx`
  - Purpose: Daily check-in CTA with state

- [ ] **RitualProgressTracker** - Progress visualization
  - Location: `.atomic-backup/molecules/ritual-progress-tracker.tsx`
  - Purpose: Show completion progress, streaks

- [ ] **RitualRewardDisplay** - Reward/achievement display
  - Location: `.atomic-backup/molecules/ritual-reward-display.tsx`
  - Purpose: Show earned rewards, badges

- [ ] **RitualStreakCounter** - Streak visualization
  - Location: `.atomic-backup/molecules/ritual-streak-counter.tsx`
  - Purpose: Current streak, best streak, fire icons

#### Missing Organisms (3 components)

- [ ] **RitualParticipationUI** - Full participation interface
  - Location: `.atomic-backup/organisms/ritual-participation-ui.tsx`
  - Purpose: Complete ritual interaction (check-in, progress, rewards)

- [ ] **RitualLeaderboard** - Competitive leaderboard
  - Location: `.atomic-backup/organisms/ritual-leaderboard.tsx`
  - Purpose: Top participants, social proof, rankings

- [ ] **RitualCreationModal** - Admin ritual creator
  - Location: `.atomic-backup/organisms/ritual-creation-modal.tsx`
  - Purpose: Create new rituals (admin only)

#### Currently Active (Partial)

- ✅ **RitualsCardStrip** - Horizontal ritual cards (Feed integration)
  - Location: `molecules/rituals-card-strip.tsx`
  - Status: Active but needs ritual detail components

---

### 2. ONBOARDING FLOWS (Medium Priority)

**Required by SPEC.md:** Multi-step onboarding wizard
**Status:** Partial - basic components exist, advanced flows in backup

#### Missing Molecules

- [ ] **OnboardingEmailVerification**
  - `.atomic-backup/molecules/onboarding-email-verification.tsx`
  - Purpose: Email verification step with code input

- [ ] **OnboardingStepIndicator**
  - `.atomic-backup/molecules/onboarding-step-indicator.tsx`
  - Purpose: Progress dots, step labels

#### Missing Organisms

- [ ] **OnboardingWizard**
  - `.atomic-backup/organisms/onboarding-wizard.tsx`
  - Purpose: Multi-step flow container, navigation

- [ ] **OnboardingConnectionSuggestions**
  - `.atomic-backup/organisms/onboarding-connection-suggestions.tsx`
  - Purpose: Friend suggestions during onboarding

- [ ] **OnboardingProfileSetup**
  - `.atomic-backup/organisms/onboarding-profile-setup.tsx`
  - Purpose: Initial profile creation step

- [ ] **OnboardingSpaceRecommendations**
  - `.atomic-backup/organisms/onboarding-space-recommendations.tsx`
  - Purpose: Space suggestions for new users

---

### 3. PROFILE FEATURES (Medium Priority)

**Required by SPEC.md:** Rich profile functionality
**Status:** Basic components exist, advanced features in backup

#### Missing Molecules

- [ ] **ProfileBioEditor**
  - `.atomic-backup/molecules/profile-bio-editor.tsx`
  - Purpose: Rich bio editing with formatting

- [ ] **ProfileSocialLinks**
  - `.atomic-backup/molecules/profile-social-links.tsx`
  - Purpose: Social media link management

- [ ] **ProfileStatCard**
  - `.atomic-backup/molecules/profile-stat-card.tsx`
  - Purpose: Individual stat display (posts, connections, etc.)

#### Missing Organisms

- [ ] **ProfileActivityTimeline**
  - `.atomic-backup/organisms/profile-activity-timeline.tsx`
  - Purpose: Full activity feed with filters

- [ ] **ProfileBentoGrid**
  - `.atomic-backup/organisms/profile-bento-grid.tsx`
  - Purpose: Bento box layout for profile content

- [ ] **ProfileCalendarView**
  - `.atomic-backup/organisms/profile-calendar-view.tsx`
  - Purpose: Activity calendar heatmap

- [ ] **ProfileConnectionsList**
  - `.atomic-backup/organisms/profile-connections-list.tsx`
  - Purpose: Full connections list with search

- [ ] **ProfileEditForm**
  - `.atomic-backup/organisms/profile-edit-form.tsx`
  - Purpose: Complete profile editing interface

- [ ] **ProfileStatsDashboard**
  - `.atomic-backup/organisms/profile-stats-dashboard.tsx`
  - Purpose: Analytics dashboard for profile

- [ ] **ProfileToolsWidget**
  - `.atomic-backup/organisms/profile-tools-widget.tsx`
  - Purpose: User's created/used tools display

#### Missing Templates

- [ ] **ProfileViewLayout**
  - `.atomic-backup/templates/profile-view-layout.tsx`
  - Purpose: Full profile page layout

---

### 4. SPACE FEATURES (Medium Priority)

**Required by SPEC.md:** Advanced space functionality
**Status:** Core features exist, advanced features in backup

#### Missing Molecules

- [ ] **SpaceBadge** (custom, different from Badge atom)
  - `.atomic-backup/atoms/space-badge.tsx`
  - Purpose: Space-specific status badges

- [ ] **SpaceEventCard**
  - `.atomic-backup/molecules/space-event-card.tsx`
  - Purpose: Event display in spaces (different from FeedEventCard)

- [ ] **SpaceMemberCard**
  - `.atomic-backup/molecules/space-member-card.tsx`
  - Purpose: Member cards with roles, actions

#### Missing Organisms

- [ ] **SpaceCreationModal**
  - `.atomic-backup/organisms/space-creation-modal.tsx`
  - Purpose: Create new space flow (currently teased/locked per SPEC)

- [ ] **SpaceDiscoveryHub**
  - `.atomic-backup/organisms/space-discovery-hub.tsx`
  - Purpose: Advanced discovery with filters, trending

- [ ] **SpaceSettingsModal**
  - `.atomic-backup/organisms/space-settings-modal.tsx`
  - Purpose: Space settings (leaders only)

- [ ] **SpaceSidebar** (different from panel components)
  - `.atomic-backup/organisms/space-sidebar.tsx`
  - Purpose: Full sidebar layout with tabs

#### Currently Active (Partial Coverage)

- ✅ SpaceCard, SpaceHeader, SpacePostFeed, etc. (8 organisms)
- ⚠️ Missing advanced features from backup

---

### 5. FEED FEATURES (Low Priority - Mostly Complete)

**Status:** Core feed complete, advanced features in backup

#### Missing Molecules

- [ ] **FeedCommentThread**
  - `.atomic-backup/molecules/feed-comment-thread.tsx`
  - Purpose: Threaded comment display (currently have CommentCard only)

- [ ] **FeedComment** (duplicate/alternate version?)
  - `.atomic-backup/molecules/feed-comment.tsx`

- [ ] **FeedSearchBar** (duplicate of SearchBar?)
  - `.atomic-backup/molecules/feed-search-bar.tsx`

#### Missing Organisms

- [ ] **FeedComposer** (main post composer)
  - `.atomic-backup/organisms/feed-composer.tsx`
  - Purpose: Create posts on main feed (currently using SpaceComposerWithTools)

- [ ] **FeedEmptyState**
  - `.atomic-backup/organisms/feed-empty-state.tsx`
  - Purpose: Empty feed state (no posts)

- [ ] **FeedPostFull** (full post detail view)
  - `.atomic-backup/organisms/feed-post-full.tsx`
  - Purpose: Post detail page view

- [ ] **FeedSkeletonLoader**
  - `.atomic-backup/organisms/feed-skeleton-loader.tsx`
  - Purpose: Loading skeletons for feed

#### Missing Templates

- [ ] **FeedLayout**
  - `.atomic-backup/templates/feed-layout.tsx`
  - Purpose: Main feed page layout

---

### 6. HIVELAB TOOLS (Medium Priority)

**Required by SPEC.md:** No-code tool builder system
**Status:** Core builder exists, some features in backup

#### Missing Organisms

- [ ] **ToolBrowseGrid**
  - `.atomic-backup/organisms/tool-browse-grid.tsx`
  - Purpose: Browse created tools

- [ ] **ToolBuilderCanvas** (might be renamed?)
  - `.atomic-backup/organisms/tool-builder-canvas.tsx`
  - Compare with active: HiveLabBuilderCanvas

- [ ] **ToolBuilderPalette**
  - `.atomic-backup/organisms/tool-builder-palette.tsx`
  - Compare with active: HiveLabElementLibrary

- [ ] **ToolBuilderProperties**
  - `.atomic-backup/organisms/tool-builder-properties.tsx`
  - Compare with active: HiveLabPropertiesPanel

- [ ] **ToolRuntimeExecutor**
  - `.atomic-backup/organisms/tool-runtime-executor.tsx`
  - Purpose: Execute/run created tools

#### Currently Active (Core Features)

- ✅ HiveLabBuilderCanvas
- ✅ HiveLabElementLibrary
- ✅ HiveLabPropertiesPanel
- ✅ HiveLabTemplateBrowser
- ✅ HiveLabAnalyticsDashboard
- ⚠️ May be duplicates with different names in backup

---

### 7. SHARED COMPONENTS (Low Priority)

#### Missing Molecules

- [ ] **FormField** (might exist as different implementation)
  - `.atomic-backup/molecules/form-field.tsx`
  - Compare with: Form atom from shadcn/ui

- [ ] **PageContainer**
  - `.atomic-backup/molecules/page-container.tsx`
  - Purpose: Standard page wrapper with padding/max-width

#### Missing Atoms (Custom HIVE versions)

- [ ] **HiveButton** (custom Button variant)
  - `.atomic-backup/atoms/hive-button.tsx`
  - May have different styling than shadcn Button

- [ ] **HiveCard** (custom Card variant)
  - `.atomic-backup/atoms/hive-card.tsx`

- [ ] **HiveConfirmModal** (custom Dialog variant)
  - `.atomic-backup/atoms/hive-confirm-modal.tsx`

- [ ] **HiveInput** (custom Input variant)
  - `.atomic-backup/atoms/hive-input.tsx`

- [ ] **HiveModal** (custom Dialog variant)
  - `.atomic-backup/atoms/hive-modal.tsx`

- [ ] **HiveProgress** (custom Progress variant)
  - `.atomic-backup/atoms/hive-progress.tsx`

- [ ] **InputEnhanced** (enhanced Input)
  - `.atomic-backup/atoms/input-enhanced.tsx`

- [ ] **TextareaEnhanced** (enhanced Textarea)
  - `.atomic-backup/atoms/textarea-enhanced.tsx`

- [ ] **TechSleekShowcase** (?)
  - `.atomic-backup/atoms/tech-sleek-showcase.tsx`

- [ ] **UniversalAtoms** (?)
  - `.atomic-backup/atoms/universal-atoms.tsx`

---

### 8. NAVIGATION (Low Priority - Mostly Complete)

#### Missing Atoms

- [ ] **NavigationPreferences**
  - `.atomic-backup/atoms/navigation-preferences.tsx`

- [ ] **SkipNav** (accessibility)
  - `.atomic-backup/atoms/skip-nav.tsx`

- [ ] **TopBarNav**
  - `.atomic-backup/atoms/top-bar-nav.tsx`

---

### 9. NOTIFICATIONS (Medium Priority)

**Required by SPEC.md:** Real-time notification system
**Status:** Basic components exist via Sonner, custom features in backup

#### Missing Atoms

- [ ] **NotificationBell** (custom bell icon/badge)
  - `.atomic-backup/atoms/notification-bell.tsx`

- [ ] **NotificationItem** (might be different from active)
  - `.atomic-backup/atoms/notification-item.tsx`
  - Compare with active: molecules/notification-item.tsx

#### Missing Molecules

- [ ] **NotificationDropdown**
  - `.atomic-backup/molecules/notification-dropdown.tsx`
  - Purpose: Full dropdown UI (vs Sonner toasts)

- [ ] **NotificationToastManager**
  - `.atomic-backup/molecules/notification-toast-manager.tsx`

---

### 10. PRESENCE & SOCIAL (Medium Priority)

#### Missing Atoms

- [ ] **PresenceIndicator**
  - `.atomic-backup/atoms/presence-indicator.tsx`
  - Purpose: Online/offline status dots

- [ ] **SimpleAvatar** (simplified Avatar)
  - `.atomic-backup/atoms/simple-avatar.tsx`

#### Missing Molecules

- [ ] **CompletionPsychologyEnhancer** (gamification)
  - `.atomic-backup/molecules/completion-psychology-enhancer.tsx`

- [ ] **CrisisReliefInterface** (mental health)
  - `.atomic-backup/molecules/crisis-relief-interface.tsx`

- [ ] **FriendRequestManager**
  - `.atomic-backup/molecules/friend-request-manager.tsx`

- [ ] **SocialProofAccelerator** (social proof UI)
  - `.atomic-backup/molecules/social-proof-accelerator.tsx`

#### Missing Organisms

- [ ] **WelcomeMat** (onboarding welcome)
  - `.atomic-backup/organisms/welcome-mat.tsx`

---

### 11. PROFILE SPECIFIC (Low Priority)

#### Missing Molecules

- [ ] **HiveAvatarUploadWithCrop**
  - `.atomic-backup/molecules/hive-avatar-upload-with-crop.tsx`

- [ ] **InterestSelector**
  - `.atomic-backup/molecules/interest-selector.tsx`

- [ ] **PrivacyControl**
  - `.atomic-backup/molecules/privacy-control.tsx`

#### Missing Organisms (Already listed in Profile section above)

- See Profile Features section

---

## 📈 Restoration Priority

### P0 - Critical (Block Features)

Must restore before launch:

1. **Rituals System** (9 components)
   - RitualCard, RitualCheckInButton, RitualProgressTracker
   - RitualRewardDisplay, RitualStreakCounter
   - RitualParticipationUI, RitualLeaderboard, RitualCreationModal
   - **Impact:** Cannot launch rituals feature without these

2. **Main Feed Composer** (1 component)
   - FeedComposer
   - **Impact:** Users can only post in spaces, not main feed

### P1 - High Priority (UX Impact)

Restore soon after launch:

3. **Onboarding Flows** (6 components)
   - OnboardingWizard, OnboardingConnectionSuggestions
   - OnboardingProfileSetup, OnboardingSpaceRecommendations
   - OnboardingEmailVerification, OnboardingStepIndicator
   - **Impact:** Basic onboarding works, but missing polish

4. **Profile Features** (12 components)
   - ProfileBentoGrid, ProfileEditForm, ProfileStatsDashboard
   - ProfileActivityTimeline, ProfileCalendarView, etc.
   - **Impact:** Profiles work but missing advanced features

5. **Notifications** (4 components)
   - NotificationBell, NotificationDropdown, NotificationToastManager
   - **Impact:** Basic notifications work via Sonner, missing rich UI

### P2 - Medium Priority (Nice to Have)

Restore when bandwidth allows:

6. **Space Advanced Features** (6 components)
   - SpaceCreationModal (teased/locked per SPEC anyway)
   - SpaceDiscoveryHub, SpaceSettingsModal, SpaceSidebar
   - **Impact:** Core spaces work, missing advanced discovery

7. **Feed Advanced Features** (6 components)
   - FeedPostFull, FeedEmptyState, FeedSkeletonLoader
   - FeedCommentThread, FeedLayout
   - **Impact:** Feed works, missing polish

8. **Social Features** (4 components)
   - FriendRequestManager, PresenceIndicator
   - SocialProofAccelerator, CrisisReliefInterface
   - **Impact:** Basic social works, missing rich features

### P3 - Low Priority (Optional)

Restore if needed:

9. **Custom HIVE Atoms** (10 components)
   - HiveButton, HiveCard, HiveInput, etc.
   - **Impact:** shadcn/ui components work, these may have brand-specific styling

10. **Navigation Extras** (3 components)
    - NavigationPreferences, SkipNav, TopBarNav
    - **Impact:** Core navigation works

11. **Misc Shared** (5 components)
    - PageContainer, FormField variants, etc.
    - **Impact:** Can be rebuilt as needed

---

## 🔄 Restoration Strategy

### Phase 1: Audit Backed-Up Components

1. Review each component in `.atomic-backup/`
2. Check for duplicates with active components
3. Identify which are truly needed vs redundant
4. Document dependencies

### Phase 2: Restore P0 Components

1. **Rituals System** - Move from backup to active
   - Update imports in molecules/organisms index
   - Restore Storybook stories
   - Test integration with Feed

2. **FeedComposer** - Evaluate vs SpaceComposerWithTools
   - May be duplicate functionality
   - Decide: restore or enhance existing

### Phase 3: Restore P1 Components

1. **Onboarding Flows** - Systematic restoration
2. **Profile Features** - Phase in advanced features
3. **Notifications** - Rich notification UI

### Phase 4: Evaluate P2/P3

1. Determine actual need vs duplication
2. Restore selectively based on user feedback
3. May rebuild some from scratch with shadcn/ui

---

## 📊 Revised Component Count

### Currently Active

- Atoms: 47
- Molecules: 18
- Organisms: 18
- Templates: 1
- **Total: 84 components**

### In Backup (Need Evaluation)

- Atoms: ~15
- Molecules: ~20
- Organisms: ~20
- Templates: ~2
- **Total: ~57 backed-up components**

### True System Total (After Restoration)

- **Estimated: 120-140 components** (after de-duplication)
- **Current Dashboard shows: 84** (only active components)

---

## 🎯 Updated Action Plan

### Immediate (This Week)

1. ✅ Create this gap analysis
2. [ ] Audit `.atomic-backup/` for duplicates
3. [ ] Prioritize restoration list
4. [ ] Create restoration workflow

### Short-term (Next 2 Weeks)

1. [ ] Restore P0: Rituals System (9 components)
2. [ ] Restore P0: FeedComposer (1 component)
3. [ ] Update ATOMIC_DESIGN_DASHBOARD.md with restored components
4. [ ] Test restored components in Storybook

### Medium-term (Next Month)

1. [ ] Restore P1: Onboarding Flows (6 components)
2. [ ] Restore P1: Profile Features (12 components)
3. [ ] Restore P1: Notifications (4 components)
4. [ ] Update documentation

### Long-term (2+ Months)

1. [ ] Evaluate P2/P3 components
2. [ ] Selective restoration or rebuild
3. [ ] Final documentation update
4. [ ] Component library v2.0 release

---

## 📝 Key Takeaways

1. **Current dashboard is accurate** for ACTIVE components (84)
2. **Major gap:** ~57 components in backup need evaluation
3. **Rituals system** is high priority - 9 components needed
4. **Many duplicates likely** - need de-duplication audit
5. **True component count** will be 120-140 after restoration

**Bottom Line:** We're not at 100% - more like 60% if we count backup components as required features per SPEC.md

---

**Next Steps:**

1. Read this gap analysis
2. Decide restoration priority
3. Begin systematic restoration
4. Update ATOMIC_DESIGN_DASHBOARD.md as we restore

_Created: 2025-10-02_
_Status: Initial gap analysis complete_
