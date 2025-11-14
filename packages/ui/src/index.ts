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
export { Button } from "./atomic/00-Global/atoms/button";
export { Input } from "./atomic/00-Global/atoms/input";
export { Label } from "./atomic/00-Global/atoms/label";
export { Textarea } from "./atomic/00-Global/atoms/textarea";
export { Skeleton } from "./atomic/00-Global/atoms/skeleton";
export { Badge } from "./atomic/00-Global/atoms/badge";
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./atomic/00-Global/atoms/card";
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "./atomic/00-Global/atoms/avatar";
export {
  HiveCard,
  HiveCardHeader,
  HiveCardFooter,
  HiveCardTitle,
  HiveCardDescription,
  HiveCardContent,
} from "./atomic/00-Global/atoms/hive-card";
export { HiveLogo } from "./atomic/00-Global/atoms/hive-logo";
export { Grid } from "./atomic/00-Global/atoms/grid";
export { Switch } from "./atomic/00-Global/atoms/switch";
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from "./components/ui/input-otp";
export {
  CheckCircleIcon,
  MegaphoneIcon,
  AlertTriangleIcon,
  InfoIcon,
  XIcon,
} from "./atomic/00-Global/atoms/icon-library";
export {
  Alert,
  AlertTitle,
  AlertDescription,
} from "./atomic/00-Global/atoms/alert";
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./atomic/00-Global/atoms/dialog";
export { AriaLiveRegion } from "./atomic/00-Global/atoms/aria-live-region";
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./atomic/00-Global/atoms/tabs";
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./atomic/00-Global/atoms/command";

// Additional atoms
export { MediaThumb } from "./atomic/02-Feed/atoms/media-thumb";
export { PercentBar, VoteBar } from "./atomic/02-Feed/atoms/percent-bar";
export {
  PostCardListItem,
  PostCardSkeleton,
  PostOverlay
} from "./atomic/02-Feed/atoms/post-card";
export type {
  HivePost,
  HivePostComment,
  HivePostMedia,
  PostCardListItemProps,
  PostOverlayProps
} from "./atomic/02-Feed/atoms/post-card";
export { KeyboardShortcutsOverlay } from "./atomic/00-Global/molecules/keyboard-shortcuts-overlay";

// Layout molecules
export {
  PageContainer,
  PageHeader,
  PageTitle,
  PageDescription,
  PageContent,
  PageFooter,
} from "./atomic/00-Global/molecules/page-container";

// Modal molecules
export { HiveConfirmModal } from "./atomic/00-Global/molecules/hive-confirm-modal";

// Universal Shell (navigation) - Removed (not used in production)
// export {
//   UniversalShell,
//   useShell,
//   DEFAULT_SIDEBAR_NAV_ITEMS,
//   DEFAULT_MOBILE_NAV_ITEMS,
// } from "./shells/UniversalShell";
// export type {
//   ShellNavItem,
//   ShellMobileNavItem,
//   ShellSpaceLink,
//   ShellSpaceSection,
//   ShellBreadcrumbItem,
//   UniversalShellProps,
// } from "./shells/UniversalShell";

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
export { SpaceHeader } from "./atomic/03-Spaces/molecules/space-header";
export type {
  SpaceHeaderProps,
  SpaceHeaderSpace,
  SpaceMembershipState,
} from "./atomic/03-Spaces/molecules/space-header";

// NOTE: All molecules were deleted per cleanup directive.
// Storybook imports from dist/ will continue to work (compiled code exists).
// New components should be atoms (primitives) placed in atomic/atoms/

// New P0 Components - Feed, Spaces, Rituals (Nov 2024)

// Feed Organisms
export { FeedCardSystem } from "./atomic/02-Feed/organisms/feed-card-system";
export type {
  FeedCardSystemProps,
  FeedCardSystemData,
  FeedCardSystemMeta,
  FeedSystemVariant,
} from "./atomic/02-Feed/organisms/feed-card-system";

export { FeedCardPost } from "./atomic/02-Feed/organisms/feed-card-post";
export type {
  FeedCardPostProps,
  FeedCardPostData,
  FeedCardPostCallbacks,
  FeedCardAuthor,
  FeedCardSpace,
  FeedCardPostStats,
  FeedCardPostContent,
  FeedCardPostMeta,
} from "./atomic/02-Feed/organisms/feed-card-post";

export { FeedCardEvent } from "./atomic/02-Feed/organisms/feed-card-event";
export type {
  FeedCardEventProps,
  FeedCardEventData,
  FeedCardEventCallbacks,
  FeedCardEventMeta,
  FeedCardEventStats,
  FeedEventStatus,
} from "./atomic/02-Feed/organisms/feed-card-event";

export { FeedCardTool } from "./atomic/02-Feed/organisms/feed-card-tool";
export type {
  FeedCardToolProps,
  FeedCardToolData,
  FeedCardToolCallbacks,
  FeedCardToolMeta,
  FeedCardToolStats,
} from "./atomic/02-Feed/organisms/feed-card-tool";

export { FeedComposerSheet } from "./atomic/02-Feed/organisms/feed-composer-sheet";
export type {
  FeedComposerSheetProps,
  ComposerSpace,
  MediaFile,
} from "./atomic/02-Feed/organisms/feed-composer-sheet";

export { FeedVirtualizedList } from "./atomic/02-Feed/organisms/feed-virtualized-list";
export type {
  FeedVirtualizedListProps,
  FeedItem,
} from "./atomic/02-Feed/organisms/feed-virtualized-list";

export { NotificationToastContainer } from "./atomic/00-Global/organisms/notification-toast-container";
export type {
  NotificationToastContainerProps,
  ToastNotification,
} from "./atomic/00-Global/organisms/notification-toast-container";

// HiveLab: Visual composer (desktop-first)
export { VisualToolComposer } from "./components/hivelab/visual-tool-composer";
export type { VisualToolComposerProps } from "./components/hivelab/visual-tool-composer";

// Space Molecules
export { SpaceAboutWidget } from "./atomic/03-Spaces/molecules/space-about-widget";
export type {
  SpaceAboutWidgetProps,
  SpaceAboutData,
  SpaceLeader,
} from "./atomic/03-Spaces/molecules/space-about-widget";

export { SpaceToolsWidget } from "./atomic/03-Spaces/molecules/space-tools-widget";
export type {
  SpaceToolsWidgetProps,
  SpaceToolsWidgetData,
  SpaceTool,
} from "./atomic/03-Spaces/molecules/space-tools-widget";

// Ritual Molecules
export { RitualProgressBar } from "./atomic/06-Rituals/molecules/ritual-progress-bar";
export type {
  RitualProgressBarProps,
  RitualMilestone,
} from "./atomic/06-Rituals/molecules/ritual-progress-bar";

export { PrivacyControl, BulkPrivacyControl } from "./atomic/00-Global/molecules/privacy-control";
export type {
  PrivacyControlProps,
  PrivacyLevel,
  BulkPrivacyControlProps,
  BulkPrivacyControlWidget,
} from "./atomic/00-Global/molecules/privacy-control";

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
} from "./atomic/00-Global/atoms/sheet";
export type { SheetContentProps } from "./atomic/00-Global/atoms/sheet";

// Admin dashboard primitives
export {
  AdminShell,
  AdminTopBar,
  AdminNavRail,
  AdminMetricCard,
  StatusPill,
  AuditLogList,
  ModerationQueue,
} from "./atomic/07-Admin/organisms";
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
} from "./atomic/07-Admin/organisms";

export {
  // AdminRitualComposer,
  // type AdminRitualComposerProps,
} from "./atomic/07-Admin/organisms";

// export {
//   RitualFeedBannerCard,
//   type RitualFeedBannerCardProps,
// } from "./atomic/06-Rituals/organisms/ritual-feed-banner";

// Profile Molecules
export { ProfileBentoGrid } from "./atomic/04-Profile/molecules/profile-bento-grid";
export type { ProfileBentoGridProps } from "./atomic/04-Profile/molecules/profile-bento-grid";

// Feed Templates
export { FeedPageLayout } from "./atomic/02-Feed/templates/feed-page-layout";
export type { FeedPageLayoutProps } from "./atomic/02-Feed/templates/feed-page-layout";


export { FeedLoadingSkeleton } from "./atomic/02-Feed/templates/feed-loading-skeleton";
export type { FeedLoadingSkeletonProps } from "./atomic/02-Feed/templates/feed-loading-skeleton";
export { FeedLoadingSkeleton as FeedPageSkeleton } from "./atomic/02-Feed/templates/feed-loading-skeleton";

// Space Organisms
export { SpaceBoardLayout } from "./atomic/03-Spaces/organisms/space-board-layout";
export type {
  SpaceBoardLayoutProps,
  PinnedPost as SpacePinnedPost,
} from "./atomic/03-Spaces/organisms/space-board-layout";

export { SpacePostComposer } from "./atomic/03-Spaces/organisms/space-post-composer";
export type { SpacePostComposerProps } from "./atomic/03-Spaces/organisms/space-post-composer";

// Space Templates
export { SpaceBoardTemplate } from "./atomic/03-Spaces/templates/space-board-template";
export type {
  SpaceBoardTemplateProps,
  PinnedPost,
} from "./atomic/03-Spaces/templates/space-board-template";

// Ritual Organisms
export { RitualStrip } from "./atomic/06-Rituals/organisms/ritual-strip";
export type { RitualStripProps } from "./atomic/06-Rituals/organisms/ritual-strip";

export { RitualCard } from "./atomic/06-Rituals/organisms/ritual-card";
export type { RitualCardProps } from "./atomic/06-Rituals/organisms/ritual-card";

// Ritual Templates
export { RitualsPageLayout } from "./atomic/06-Rituals/templates/rituals-page-layout";
export type {
  RitualsPageLayoutProps,
  RitualData,
} from "./atomic/06-Rituals/templates/rituals-page-layout";

// export { RitualDetailLayout } from "./atomic/06-Rituals/templates/ritual-detail-layout";
// export type {
//   RitualDetailLayoutProps,
// } from "./atomic/06-Rituals/templates/ritual-detail-layout";

export { ProfileViewLayout } from "./atomic/04-Profile/templates/profile-view-layout";
export type { ProfileViewLayoutProps } from "./atomic/04-Profile/templates/profile-view-layout";

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
export { HiveLabStudio } from "./atomic/05-HiveLab/organisms/hivelab-studio";
export type { HiveLabStudioProps } from "./atomic/05-HiveLab/organisms/hivelab-studio";
export { HiveLabElementPalette } from "./atomic/05-HiveLab/molecules/hivelab-element-palette";
export type { HiveLabElementPaletteProps } from "./atomic/05-HiveLab/molecules/hivelab-element-palette";
export { HiveLabInspectorPanel } from "./atomic/05-HiveLab/molecules/hivelab-inspector-panel";
export type { HiveLabInspectorPanelProps } from "./atomic/05-HiveLab/molecules/hivelab-inspector-panel";
export { HiveLabLintPanel } from "./atomic/05-HiveLab/molecules/hivelab-lint-panel";
export type { HiveLabLintPanelProps } from "./atomic/05-HiveLab/molecules/hivelab-lint-panel";
export { HiveLabToolLibraryCard } from "./atomic/05-HiveLab/molecules/hivelab-tool-library-card";
export type { HiveLabToolLibraryCardProps } from "./atomic/05-HiveLab/molecules/hivelab-tool-library-card";

export { ProfileIdentityWidget } from "./atomic/04-Profile/organisms/profile-identity-widget";
export type { ProfileIdentityWidgetProps } from "./atomic/04-Profile/organisms/profile-identity-widget";
export { ProfileActivityWidget } from "./atomic/04-Profile/organisms/profile-activity-widget";
export type { ProfileActivityWidgetProps, ProfileActivityItem } from "./atomic/04-Profile/organisms/profile-activity-widget";
export { ProfileSpacesWidget } from "./atomic/04-Profile/organisms/profile-spaces-widget";
export type { ProfileSpacesWidgetProps, ProfileSpaceItem } from "./atomic/04-Profile/organisms/profile-spaces-widget";
export { ProfileConnectionsWidget } from "./atomic/04-Profile/organisms/profile-connections-widget";
export type { ProfileConnectionsWidgetProps, ProfileConnectionItem } from "./atomic/04-Profile/organisms/profile-connections-widget";
export { ProfileCompletionCard } from "./atomic/04-Profile/organisms/profile-completion-card";
export type { ProfileCompletionCardProps, ProfileCompletionStep } from "./atomic/04-Profile/organisms/profile-completion-card";
export { HiveLabWidget } from "./atomic/05-HiveLab/organisms/hivelab-widget";
export type { HiveLabWidgetProps } from "./atomic/05-HiveLab/organisms/hivelab-widget";
