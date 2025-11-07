// Curated, stable top-level exports for @hive/ui
// RUTHLESS CLEANUP: Only atoms (with Storybook) + navigation shell

// Utilities
export { cn } from "./lib/utils";
export { useToast } from "./systems/modal-toast-system";
export type { PresenceStatus } from "./identity";
// HiveLab element system exports
export type {
  ToolComposition,
  ElementDefinition,
  ElementProps,
} from "./lib/hivelab/element-system";
export {
  VisuallyHidden,
  SkipToContent,
  FocusRing,
  FocusTrap,
  LiveRegion,
  Portal,
  ClickAwayListener,
  useMeasure,
  Measure,
  VirtualList,
} from "./a11y";
export type {
  VisuallyHiddenProps,
  SkipToContentProps,
  FocusRingProps,
  FocusTrapProps,
  LiveRegionProps,
  PortalProps,
  ClickAwayListenerProps,
  MeasureProps,
  MeasureRenderProps,
  MeasureBounds,
  UseMeasureOptions,
  VirtualListProps,
} from "./a11y";

// Core atoms
export { Button } from "./atomic/atoms/button";
export { Input } from "./atomic/atoms/input";
export { Label } from "./atomic/atoms/label";
export { Textarea } from "./atomic/atoms/textarea";
export { Skeleton } from "./atomic/atoms/skeleton";
export { Badge } from "./atomic/atoms/badge";
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./atomic/atoms/card";
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "./atomic/atoms/avatar";
export {
  CheckCircleIcon,
  MegaphoneIcon,
  AlertTriangleIcon,
  InfoIcon,
  XIcon,
} from "./atomic/atoms/icon-library";

// Additional atoms
export { MediaThumb } from "./atomic/atoms/media-thumb";
export { PercentBar, VoteBar } from "./atomic/atoms/percent-bar";
export {
  PostCardListItem,
  PostCardSkeleton,
  PostOverlay
} from "./atomic/atoms/post-card";
export type {
  HivePost,
  HivePostComment,
  HivePostMedia,
  PostCardListItemProps,
  PostOverlayProps
} from "./atomic/atoms/post-card";

// Universal Shell (navigation)
export {
  UniversalShell,
  useShell,
  DEFAULT_SIDEBAR_NAV_ITEMS,
  DEFAULT_MOBILE_NAV_ITEMS,
} from "./shells/UniversalShell";
export type {
  ShellNavItem,
  ShellMobileNavItem,
  ShellSpaceLink,
  ShellSpaceSection,
  ShellBreadcrumbItem,
  UniversalShellProps,
} from "./shells/UniversalShell";

// Page-level surfaces
export {
  FeedPage,
  SpacesDiscoveryPage,
  SpaceCard,
  ProfileOverviewPage,
  ProfileViewLoadingSkeleton,
  HiveLabToolsPage,
  OnboardingFlowPage,
  ToolAnalyticsPage,
  ToolPreviewPage,
  ToolEditPage,
} from "./pages";
export type {
  FeedPageProps,
  SpacesDiscoveryPageProps,
  SpaceCardProps,
  SpaceCardData,
  ProfileOverviewPageProps,
  HiveLabToolsPageProps,
  OnboardingFlowPageProps,
  ToolAnalyticsPageProps,
  ToolAnalyticsData,
  ToolPreviewPageProps,
  ToolEditPageProps,
} from "./pages";

// Spaces - shared molecules
export { SpaceHeader } from "./atomic/molecules/space-header";
export type {
  SpaceHeaderProps,
  SpaceHeaderSpace,
  SpaceMembershipState,
} from "./atomic/molecules/space-header";

// NOTE: All molecules were deleted per cleanup directive.
// Storybook imports from dist/ will continue to work (compiled code exists).
// New components should be atoms (primitives) placed in atomic/atoms/

// New P0 Components - Feed, Spaces, Rituals (Nov 2024)

// Feed Organisms
export { FeedCardSystem } from "./atomic/organisms/feed-card-system";
export type {
  FeedCardSystemProps,
  FeedCardSystemData,
  FeedCardSystemMeta,
  FeedSystemVariant,
} from "./atomic/organisms/feed-card-system";

export { FeedComposerSheet } from "./atomic/organisms/feed-composer-sheet";
export type {
  FeedComposerSheetProps,
  ComposerSpace,
  MediaFile,
} from "./atomic/organisms/feed-composer-sheet";

export { FeedVirtualizedList } from "./atomic/organisms/feed-virtualized-list";
export type {
  FeedVirtualizedListProps,
  FeedItem,
} from "./atomic/organisms/feed-virtualized-list";

export { NotificationToastContainer } from "./atomic/organisms/notification-toast-container";
export type {
  NotificationToastContainerProps,
  ToastNotification,
} from "./atomic/organisms/notification-toast-container";

// HiveLab: Visual composer (desktop-first)
export { VisualToolComposer } from "./components/hivelab/visual-tool-composer";
export type { VisualToolComposerProps } from "./components/hivelab/visual-tool-composer";

// Space Molecules
export { SpaceAboutWidget } from "./atomic/molecules/space-about-widget";
export type {
  SpaceAboutWidgetProps,
  SpaceAboutData,
  SpaceLeader,
} from "./atomic/molecules/space-about-widget";

export { SpaceToolsWidget } from "./atomic/molecules/space-tools-widget";
export type {
  SpaceToolsWidgetProps,
  SpaceToolsWidgetData,
  SpaceTool,
} from "./atomic/molecules/space-tools-widget";

// Ritual Molecules
export { RitualProgressBar } from "./atomic/molecules/ritual-progress-bar";
export type {
  RitualProgressBarProps,
  RitualMilestone,
} from "./atomic/molecules/ritual-progress-bar";

export { PrivacyControl, BulkPrivacyControl } from "./atomic/molecules/privacy-control";
export type {
  PrivacyControlProps,
  PrivacyLevel,
  BulkPrivacyControlProps,
  BulkPrivacyControlWidget,
} from "./atomic/molecules/privacy-control";

// Sheets
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./atomic/atoms";
export type { SheetContentProps } from "./atomic/atoms";

// Admin dashboard primitives
export {
  AdminShell,
  AdminTopBar,
  AdminNavRail,
  AdminMetricCard,
  StatusPill,
  AuditLogList,
  ModerationQueue,
} from "./atomic/organisms/admin";
export type {
  AdminShellProps,
  AdminNavItem,
  AdminTopBarProps,
  AdminNavRailProps,
  AdminMetricCardProps,
  StatusPillProps,
  AuditLogEvent,
  AuditLogListProps,
  ModerationQueueItem,
  ModerationQueueProps,
} from "./atomic/organisms/admin";

export {
  AdminRitualComposer,
  type AdminRitualComposerProps,
} from "./atomic/organisms/admin";

export {
  RitualFeedBannerCard,
  type RitualFeedBannerCardProps,
} from "./atomic/organisms/ritual-feed-banner";

// Profile Molecules
export { ProfileBentoGrid } from "./atomic/molecules/profile-bento-grid";
export type { ProfileBentoGridProps } from "./atomic/molecules/profile-bento-grid";

// Feed Templates
export { FeedPageLayout } from "./atomic/templates/feed-page-layout";
export type { FeedPageLayoutProps } from "./atomic/templates/feed-page-layout";


export { FeedLoadingSkeleton } from "./atomic/templates/feed-loading-skeleton";
export type { FeedLoadingSkeletonProps } from "./atomic/templates/feed-loading-skeleton";
export { FeedLoadingSkeleton as FeedPageSkeleton } from "./atomic/templates/feed-loading-skeleton";

// Space Organisms
export { SpaceBoardLayout } from "./atomic/organisms/space-board-layout";
export type {
  SpaceBoardLayoutProps,
  PinnedPost as SpacePinnedPost,
} from "./atomic/organisms/space-board-layout";

export { SpacePostComposer } from "./atomic/organisms/space-post-composer";
export type { SpacePostComposerProps } from "./atomic/organisms/space-post-composer";

// Space Templates
export { SpaceBoardTemplate } from "./atomic/templates/space-board-template";
export type {
  SpaceBoardTemplateProps,
  PinnedPost,
} from "./atomic/templates/space-board-template";

// Ritual Organisms
export { RitualStrip } from "./atomic/organisms/ritual-strip";
export type { RitualStripProps } from "./atomic/organisms/ritual-strip";

export { RitualCard } from "./atomic/organisms/ritual-card";
export type { RitualCardProps } from "./atomic/organisms/ritual-card";

// Ritual Templates
export { RitualsPageLayout } from "./atomic/templates/rituals-page-layout";
export type {
  RitualsPageLayoutProps,
  RitualData,
} from "./atomic/templates/rituals-page-layout";

export { RitualDetailLayout } from "./atomic/templates/ritual-detail-layout";
export type {
  RitualDetailLayoutProps,
} from "./atomic/templates/ritual-detail-layout";

export { ProfileViewLayout } from "./atomic/templates/profile-view-layout";
export type { ProfileViewLayoutProps } from "./atomic/templates/profile-view-layout";

// HiveLab: Deployment modal
export {
  ToolDeployModal,
} from "./components/hivelab/ToolDeployModal";
export type {
  ToolDeployModalProps,
  DeploymentConfig as ToolDeploymentConfig,
  DeploymentTarget as ToolDeploymentTarget,
} from "./components/hivelab/ToolDeployModal";

// HiveLab: Studio + panels
export { HiveLabStudio } from "./atomic/organisms/hivelab-studio";
export type { HiveLabStudioProps } from "./atomic/organisms/hivelab-studio";
export { HiveLabElementPalette } from "./atomic/molecules/hivelab-element-palette";
export type { HiveLabElementPaletteProps } from "./atomic/molecules/hivelab-element-palette";
export { HiveLabInspectorPanel } from "./atomic/molecules/hivelab-inspector-panel";
export type { HiveLabInspectorPanelProps } from "./atomic/molecules/hivelab-inspector-panel";
export { HiveLabLintPanel } from "./atomic/molecules/hivelab-lint-panel";
export type { HiveLabLintPanelProps } from "./atomic/molecules/hivelab-lint-panel";
export { HiveLabToolLibraryCard } from "./atomic/molecules/hivelab-tool-library-card";
export type { HiveLabToolLibraryCardProps } from "./atomic/molecules/hivelab-tool-library-card";

export {
  ProfileIdentityWidget,
  ProfileActivityWidget,
  ProfileSpacesWidget,
  ProfileConnectionsWidget,
  ProfileCompletionCard,
  HiveLabWidget,
} from "./atomic/organisms/profile-widgets";
export type {
  ProfileIdentityWidgetProps,
  ProfileActivityWidgetProps,
  ProfileActivityItem,
  ProfileSpacesWidgetProps,
  ProfileSpaceItem,
  ProfileConnectionsWidgetProps,
  ProfileConnectionItem,
  ProfileCompletionCardProps,
  ProfileCompletionStep,
  HiveLabWidgetProps,
} from "./atomic/organisms/profile-widgets";
