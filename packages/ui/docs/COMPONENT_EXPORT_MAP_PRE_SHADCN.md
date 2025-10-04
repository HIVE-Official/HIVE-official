# Component Export Map - Pre-shadcn Migration

**Date:** 2025-10-01
**Branch:** migration/shadcn-foundation
**Purpose:** Reference document for component locations and exports before shadcn migration

---

## Atoms (37 components)

### Standard UI Components (shadcn replaceable)
- Alert (packages/ui/src/atomic/atoms/alert.tsx)
- Avatar (packages/ui/src/atomic/atoms/avatar.tsx)
- Badge (packages/ui/src/atomic/atoms/badge.tsx)
- Button (packages/ui/src/atomic/atoms/button.tsx)
- Card (packages/ui/src/atomic/atoms/card.tsx)
- Checkbox (packages/ui/src/atomic/atoms/checkbox.tsx)
- Command (packages/ui/src/atomic/atoms/command.tsx)
- Dialog (packages/ui/src/atomic/atoms/dialog.tsx)
- Input (packages/ui/src/atomic/atoms/input.tsx)
- Label (packages/ui/src/atomic/atoms/label.tsx)
- Progress (packages/ui/src/atomic/atoms/progress.tsx)
- Select (packages/ui/src/atomic/atoms/select.tsx)
- Skeleton (packages/ui/src/atomic/atoms/skeleton.tsx)
- Slider (packages/ui/src/atomic/atoms/slider.tsx)
- Switch (packages/ui/src/atomic/atoms/switch.tsx)
- Tabs (packages/ui/src/atomic/atoms/tabs.tsx)
- Textarea (packages/ui/src/atomic/atoms/textarea.tsx)

### HIVE-Specific Wrappers (rebuild on shadcn)
- HiveButton (packages/ui/src/atomic/atoms/hive-button.tsx)
- HiveCard (packages/ui/src/atomic/atoms/hive-card.tsx)
- HiveConfirmModal (packages/ui/src/atomic/atoms/hive-confirm-modal.tsx)
- HiveInput (packages/ui/src/atomic/atoms/hive-input.tsx)
- HiveModal (packages/ui/src/atomic/atoms/hive-modal.tsx)
- HiveProgress (packages/ui/src/atomic/atoms/hive-progress.tsx)
- InputEnhanced (packages/ui/src/atomic/atoms/input-enhanced.tsx)
- TextareaEnhanced (packages/ui/src/atomic/atoms/textarea-enhanced.tsx)

### HIVE-Unique Components (keep as-is)
- CheckIcon (packages/ui/src/atomic/atoms/check-icon.tsx)
- Grid (packages/ui/src/atomic/atoms/grid.tsx)
- HiveLogo (packages/ui/src/atomic/atoms/hive-logo.tsx)
- HiveLogoDynamic (packages/ui/src/atomic/atoms/hive-logo-dynamic.tsx)
- NavigationPreferences (packages/ui/src/atomic/atoms/navigation-preferences.tsx)
- NotificationBell (packages/ui/src/atomic/atoms/notification-bell.tsx)
- NotificationItem (packages/ui/src/atomic/atoms/notification-item.tsx)
- PresenceIndicator (packages/ui/src/atomic/atoms/presence-indicator.tsx)
- SimpleAvatar (packages/ui/src/atomic/atoms/simple-avatar.tsx)
- SkipNav (packages/ui/src/atomic/atoms/skip-nav.tsx)
- SpaceBadge (packages/ui/src/atomic/atoms/space-badge.tsx)
- TechSleekShowcase (packages/ui/src/atomic/atoms/tech-sleek-showcase.tsx)
- TopBarNav (packages/ui/src/atomic/atoms/top-bar-nav.tsx)
- UniversalAtoms (packages/ui/src/atomic/atoms/universal-atoms.tsx)

---

## Molecules (26 components)

All molecules are HIVE-specific feature implementations - keep all

### Onboarding
- onboarding-email-verification.tsx
- onboarding-step-indicator.tsx

### Profile
- profile-bio-editor.tsx
- profile-social-links.tsx
- profile-stat-card.tsx

### Spaces
- space-card.tsx
- space-event-card.tsx
- space-member-card.tsx

### Feed
- feed-comment.tsx
- feed-comment-thread.tsx
- feed-post-card.tsx
- feed-search-bar.tsx

### Rituals
- ritual-card.tsx
- ritual-check-in-button.tsx
- ritual-progress-tracker.tsx
- ritual-reward-display.tsx
- ritual-streak-counter.tsx

### Core Features
- completion-psychology-enhancer.tsx
- crisis-relief-interface.tsx
- form-field.tsx
- friend-request-manager.tsx
- hive-avatar-upload-with-crop.tsx
- interest-selector.tsx
- notification-dropdown.tsx
- notification-toast-manager.tsx
- page-container.tsx
- photo-carousel.tsx
- privacy-control.tsx
- social-proof-accelerator.tsx

---

## Organisms (78 components)

All organisms are HIVE-specific feature systems - keep all

### Feed System
- feed-composer.tsx
- feed-empty-state.tsx
- feed-filters.tsx
- feed-post-full.tsx
- feed-skeleton-loader.tsx

### Spaces System
- space-about-section.tsx
- space-creation-modal.tsx
- space-discovery-hub.tsx
- space-events-panel.tsx
- space-header.tsx
- space-leader-toolbar.tsx
- space-member-list.tsx
- space-members-panel.tsx
- space-post-feed.tsx
- space-resources-panel.tsx
- space-settings-modal.tsx
- space-sidebar.tsx

### Profile System
- profile-activity-timeline.tsx
- profile-activity-widget.tsx
- profile-bento-grid.tsx
- profile-calendar-view.tsx
- profile-completion-card.tsx
- profile-connections-list.tsx
- profile-connections-widget.tsx
- profile-edit-form.tsx
- profile-header.tsx
- profile-identity-widget.tsx
- profile-spaces-widget.tsx
- profile-stats-dashboard.tsx
- profile-tools-widget.tsx

### Rituals System
- ritual-creation-modal.tsx
- ritual-leaderboard.tsx
- ritual-participation-ui.tsx

### Onboarding System
- onboarding-connection-suggestions.tsx
- onboarding-profile-setup.tsx
- onboarding-space-recommendations.tsx
- onboarding-wizard.tsx

### Tools System
- tool-browse-grid.tsx
- tool-builder-canvas.tsx
- tool-builder-palette.tsx
- tool-builder-properties.tsx
- tool-runtime-executor.tsx

### Core Systems
- complete-hive-tools-system.tsx
- hivelab-widget.tsx
- navigation-shell.tsx
- notification-system.tsx
- welcome-mat.tsx

---

## Templates (1 component)

- profile-view-layout.tsx

---

## Migration Strategy Summary

### Replace with shadcn (18 components)
Alert, Avatar, Badge, Button, Card, Checkbox, Command, Dialog, Input, Label, Progress, Select, Skeleton, Slider, Switch, Tabs, Textarea

### Rebuild on shadcn (8 components)
HiveButton, HiveCard, HiveConfirmModal, HiveInput, HiveModal, HiveProgress, InputEnhanced, TextareaEnhanced

### Keep as-is (111 components)
- 11 HIVE-unique atoms
- 26 HIVE-specific molecules
- 73 HIVE-specific organisms
- 1 template

---

## Export Map (packages/ui/src/atomic/atoms/index.ts)

```typescript
export { Alert } from './alert';
export { Avatar } from './avatar';
export { Badge } from './badge';
export { Button } from './button';
export { Card } from './card';
export { CheckIcon } from './check-icon';
export { Checkbox } from './checkbox';
export { Command } from './command';
export { Dialog } from './dialog';
export { Grid } from './grid';
export { HiveButton } from './hive-button';
export { HiveCard } from './hive-card';
export { HiveConfirmModal } from './hive-confirm-modal';
export { HiveInput } from './hive-input';
export { HiveLogoDynamic } from './hive-logo-dynamic';
export { HiveLogo } from './hive-logo';
export { HiveModal } from './hive-modal';
export { HiveProgress } from './hive-progress';
export { InputEnhanced } from './input-enhanced';
export { Input } from './input';
export { Label } from './label';
export { NavigationPreferences } from './navigation-preferences';
export { NotificationBell } from './notification-bell';
export { NotificationItem } from './notification-item';
export { PresenceIndicator } from './presence-indicator';
export { Progress } from './progress';
export { Select } from './select';
export { SimpleAvatar } from './simple-avatar';
export { Skeleton } from './skeleton';
export { SkipNav } from './skip-nav';
export { Slider } from './slider';
export { SpaceBadge } from './space-badge';
export { Switch } from './switch';
export { Tabs } from './tabs';
export { TechSleekShowcase } from './tech-sleek-showcase';
export { TextareaEnhanced } from './textarea-enhanced';
export { Textarea } from './textarea';
export { TopBarNav } from './top-bar-nav';
export { UniversalAtoms } from './universal-atoms';
```

---

## Backup Location

Full backup: `packages/ui/src/atomic.backup/`

---

**This document serves as the reference for restoring components if needed during migration.**
