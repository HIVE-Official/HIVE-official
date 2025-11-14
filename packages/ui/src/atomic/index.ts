/**
 * HIVE UI Component Library - Vertical Slice Exports
 *
 * Organized by feature slice for better domain boundaries:
 * - 00-Global: Foundation components used across all slices
 * - 02-Feed: Feed discovery & engagement
 * - 03-Spaces: Community hubs
 * - 04-Profile: Campus identity
 * - 05-HiveLab: No-code builder
 * - 06-Rituals: Campus-wide events
 * - 07-Admin: Admin dashboard
 */

// === 00-GLOBAL (Foundation Components) ===
// Atoms
// export * from './00-Global/atoms/action-sheet'; // TODO: Create action-sheet component
export * from './00-Global/atoms/alert';
export * from './00-Global/atoms/aria-live-region';
export * from './00-Global/atoms/avatar';
export * from './00-Global/atoms/badge';
export * from './00-Global/atoms/button';
export * from './00-Global/atoms/card';
export * from './00-Global/atoms/check-icon';
export * from './00-Global/atoms/checkbox';
export * from './00-Global/atoms/command';
export * from './00-Global/atoms/context-menu';
export * from './00-Global/atoms/date-time-picker';
export * from './00-Global/atoms/dialog';
export * from './00-Global/atoms/file-upload';
export * from './00-Global/atoms/grid';
export * from './00-Global/atoms/hive-card';
export * from './00-Global/atoms/hive-confirm-modal';
export * from './00-Global/atoms/hive-logo';
export * from './00-Global/atoms/hive-modal';
export * from './00-Global/atoms/icon-library';
export * from './00-Global/atoms/input';
export * from './00-Global/atoms/label';
export * from './00-Global/atoms/popover';
export * from './00-Global/atoms/progress';
export * from './00-Global/atoms/select';
export * from './00-Global/atoms/sheet';
export * from './00-Global/atoms/simple-avatar';
export * from './00-Global/atoms/skeleton';
export * from './00-Global/atoms/slider';
export * from './00-Global/atoms/switch';
export * from './00-Global/atoms/tabs';
export * from './00-Global/atoms/textarea';
export * from './00-Global/atoms/toast';
export * from './00-Global/atoms/tooltip';

// Molecules
export * from './00-Global/molecules/description-list';
export * from './00-Global/molecules/dropdown-menu';
export * from './00-Global/molecules/empty-state-compact';
export * from './00-Global/molecules/filter-chips';
export * from './00-Global/molecules/keyboard-shortcuts-overlay';
export * from './00-Global/molecules/kpi-delta';
export * from './00-Global/molecules/notification-card';
export * from './00-Global/molecules/notification-dropdown';
export * from './00-Global/molecules/progress-list';
export * from './00-Global/molecules/search-bar';
export * from './00-Global/molecules/stat-card';
export * from './00-Global/molecules/table';
export * from './00-Global/molecules/tag-list';
export * from './00-Global/molecules/user-avatar-group';

// Organisms
export * from './00-Global/organisms/notification-system';
export * from './00-Global/organisms/notification-toast-container';
export * from './00-Global/organisms/welcome-mat';

// === 02-FEED (Feed Discovery & Engagement) ===
// Atoms
export * from './02-Feed/atoms/media-thumb';
export * from './02-Feed/atoms/media-viewer';
export * from './02-Feed/atoms/notification-bell';
export * from './02-Feed/atoms/notification-item';
export * from './02-Feed/atoms/percent-bar';
export * from './02-Feed/atoms/post-card';
export * from './02-Feed/atoms/presence-indicator';

// Molecules
export * from './02-Feed/molecules/feed-filter-bar';
export * from './02-Feed/molecules/feed-media-preview';
export * from './02-Feed/molecules/feed-post-actions';
export * from './02-Feed/molecules/feed-ritual-banner';
export * from './02-Feed/molecules/feed-space-chip';

// Organisms
export * from './02-Feed/organisms/feed-card-event';
export * from './02-Feed/organisms/feed-card-post';
export * from './02-Feed/organisms/feed-card-system';
export * from './02-Feed/organisms/feed-card-tool';
export * from './02-Feed/organisms/feed-composer-sheet';
export * from './02-Feed/organisms/feed-virtualized-list';

// Templates
export * from './02-Feed/templates/feed-loading-skeleton';
export * from './02-Feed/templates/feed-page-layout';

// === 03-SPACES (Community Hubs) ===
// Atoms
export * from './03-Spaces/atoms/top-bar-nav';

// Molecules
export * from './03-Spaces/molecules/navigation-primitives';
export * from './03-Spaces/molecules/now-card';
export * from './03-Spaces/molecules/pinned-posts-stack';
export * from './00-Global/molecules/privacy-control';
export * from './03-Spaces/molecules/rail-widget';
export * from './03-Spaces/molecules/space-about-widget';
export * from './03-Spaces/molecules/space-composer';
export * from './03-Spaces/molecules/space-header';
export * from './03-Spaces/molecules/space-tools-widget';
export * from './03-Spaces/molecules/today-drawer';

// Organisms
export type { SpaceBoardLayoutProps } from './03-Spaces/organisms/space-board-layout';
export * from './03-Spaces/organisms/space-post-composer';

// Templates
export type { SpaceBoardTemplateProps } from './03-Spaces/templates/space-board-template';

// === 04-PROFILE (Campus Identity) ===
// Molecules
export * from './04-Profile/molecules/profile-bento-grid';

// Organisms
export * from './04-Profile/organisms/profile-activity-widget';
export * from './04-Profile/organisms/profile-completion-card';
export * from './04-Profile/organisms/profile-connections-widget';
export * from './04-Profile/organisms/profile-identity-widget';
export * from './04-Profile/organisms/profile-spaces-widget';

// Templates
export * from './04-Profile/templates/profile-view-layout';

// === 05-HIVELAB (No-Code Builder) ===
// Molecules
export * from './05-HiveLab/molecules/hivelab-element-palette';
export * from './05-HiveLab/molecules/hivelab-inspector-panel';
export * from './05-HiveLab/molecules/hivelab-lint-panel';
export * from './05-HiveLab/molecules/hivelab-tool-library-card';

// Organisms
export * from './05-HiveLab/organisms/hivelab-studio';
export * from './05-HiveLab/organisms/hivelab-widget';

// === 06-RITUALS (Campus-Wide Events) ===
// Molecules
export * from './06-Rituals/molecules/ritual-empty-state';
export * from './06-Rituals/molecules/ritual-error-state';
export * from './06-Rituals/molecules/ritual-loading-skeleton';
export * from './06-Rituals/molecules/ritual-progress-bar';

// Organisms
export * from './06-Rituals/organisms/ritual-beta-lottery';
export * from './06-Rituals/organisms/ritual-card';
export * from './06-Rituals/organisms/ritual-feature-drop';
// export * from './06-Rituals/organisms/ritual-feed-banner';
export * from './06-Rituals/organisms/ritual-founding-class';
export * from './06-Rituals/organisms/ritual-launch-countdown';
export * from './06-Rituals/organisms/ritual-leak';
export * from './06-Rituals/organisms/ritual-rule-inversion';
export * from './06-Rituals/organisms/ritual-strip';
export * from './06-Rituals/organisms/ritual-survival';
export * from './06-Rituals/organisms/ritual-tournament-bracket';
export * from './06-Rituals/organisms/ritual-unlock-challenge';

// Templates
// export * from './06-Rituals/templates/ritual-detail-layout';
export * from './06-Rituals/templates/rituals-page-layout';

// === 07-ADMIN (Admin Dashboard) ===
// Organisms
export * from './07-Admin/organisms/admin-dashboard-primitives';
// export * from './07-Admin/organisms/admin-ritual-composer';
export * from './07-Admin/organisms/admin-shell';

// === RE-EXPORTS (for backward compatibility) ===
// This section can be removed once all imports are updated
export type { FeedCardPostData, FeedCardPostCallbacks } from './02-Feed/organisms/feed-card-post';
export type { FeedCardEventData, FeedCardEventCallbacks } from './02-Feed/organisms/feed-card-event';
export type { SpaceMembershipState } from './03-Spaces/molecules/space-header';
