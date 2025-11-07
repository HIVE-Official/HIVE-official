// Curated, stable top-level exports for @hive/ui (package root)
// Utilities
export { cn } from "./src/lib/utils";
export { useToast } from "./src/systems/modal-toast-system";
export { useWelcomeMat } from "./src/hooks/use-welcome-mat";

// Core atoms used by e2e and web
export { Button } from "./src/atomic/atoms/button";
export { Input } from "./src/atomic/atoms/input";
export { Label } from "./src/atomic/atoms/label";
export { Textarea } from "./src/atomic/atoms/textarea";
export { Skeleton } from "./src/atomic/atoms/skeleton";
export { Avatar, AvatarImage, AvatarFallback } from "./src/atomic/atoms/avatar";

// Data Display
export { DescriptionList } from "./src/atomic/molecules/description-list";
export { ProgressList } from "./src/atomic/molecules/progress-list";
export { SimpleTable as Table } from "./src/atomic/molecules/table";
export { MediaThumb } from "./src/atomic/atoms/media-thumb";
export { PercentBar, VoteBar } from "./src/atomic/atoms/percent-bar";

// Spaces rail/mobile + feed
export { RailWidget } from "./src/atomic/molecules/rail-widget";
export { NowCard } from "./src/atomic/molecules/now-card";
export { TodayDrawer } from "./src/atomic/molecules/today-drawer";
export { SpacePostComposer } from "./src/atomic/organisms/space-post-composer";
export type { SpacePostComposerProps } from "./src/atomic/organisms/space-post-composer";
export { FeedComposerSheet } from "./src/atomic/organisms/feed-composer-sheet";
export type { FeedComposerSheetProps, ComposerSpace, MediaFile } from "./src/atomic/organisms/feed-composer-sheet";
export { FeedVirtualizedList } from "./src/atomic/organisms/feed-virtualized-list";
export type { FeedVirtualizedListProps, FeedItem } from "./src/atomic/organisms/feed-virtualized-list";
export {
  FeedCardPost,
  FeedCardEvent,
  FeedCardTool,
  FeedCardSystem,
  WelcomeMat,
  NotificationSystem,
} from "./src/atomic/organisms";
export type {
  FeedCardPostProps,
  FeedCardPostData,
  FeedCardPostStats,
  FeedCardPostContent,
  FeedCardAuthor,
  FeedCardSpace,
  FeedCardPostCallbacks,
  FeedCardEventProps,
  FeedCardEventData,
  FeedCardEventStats,
  FeedCardEventMeta,
  FeedEventStatus,
  FeedCardToolProps,
  FeedCardToolData,
  FeedCardToolStats,
  FeedCardToolMeta,
  FeedCardSystemProps,
  FeedCardSystemData,
  FeedCardSystemMeta,
  FeedSystemVariant,
  WelcomeMatProps,
  NotificationSystemProps,
  NotificationListItem,
} from "./src/atomic/organisms";
export { PostCardListItem } from "./src/atomic/atoms/post-card";
export type { HivePost, HivePostComment, HivePostMedia, PostCardListItemProps, PostOverlayProps } from "./src/atomic/atoms/post-card";

// Other molecules used in e2e
export { SearchBar } from "./src/atomic/molecules/search-bar";

// Page templates
export { FeedLoadingSkeleton } from "./src/atomic/templates/feed-loading-skeleton";
export type { FeedLoadingSkeletonProps } from "./src/atomic/templates/feed-loading-skeleton";
export { FeedPageLayout } from "./src/atomic/templates/feed-page-layout";
export type { FeedPageLayoutProps } from "./src/atomic/templates/feed-page-layout";
export { SpaceBoardTemplate } from "./src/atomic/templates/space-board-template";
export type { SpaceBoardTemplateProps, PinnedPost } from "./src/atomic/templates/space-board-template";
export { RitualsPageLayout } from "./src/atomic/templates/rituals-page-layout";
export type { RitualsPageLayoutProps, RitualData } from "./src/atomic/templates/rituals-page-layout";

// Universal Shell
export { UniversalShell, useShell } from "./src/shells/UniversalShell";
export type { ShellNavItem, ShellMobileNavItem, ShellBreadcrumbItem, UniversalShellProps } from "./src/shells/UniversalShell";
