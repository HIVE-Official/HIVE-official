// Minimal working component exports - Emergency Router Fix

// Core UI Components (only the ones that work)
export * from "./ui/button";
export * from "./ui/card";
export * from "./ui/input";
export * from "./ui/badge";
export * from "./ui/tabs";
export * from "./ui/scroll-area";
export * from "./ui/avatar";
export * from "./ui/dropdown-menu";
export * from "./ui/alert-dialog";
export * from "./ui/switch";
export * from "./ui/slider";
export * from "./ui/separator";
export * from "./ui/checkbox";
export * from "./ui/radio-group";
export * from "./ui/label";
export * from "./ui/select";
export * from "./ui/skeleton";
export * from "./ui/toast";
export * from "./ui/toaster";
export * from "./ui/form";
export * from "./ui/enhanced-cards";
export * from "./alert";
export * from "./progress";

// Layout Components (basic working ones)
export * from "./stack";
export * from "./grid";
export * from "./box";

// Brand Components
export * from "./brand/hive-logo";
export * from "./brand/HiveLogoIcon";

// Error boundary
export * from "./error-boundary";

// Animation proxy
export * from "./framer-motion-proxy";

// Basic working components
export * from "./space-card";

// ALL OTHER EXPORTS COMMENTED OUT UNTIL FIXED
// The following have dependency issues and need to be fixed one by one:

// PROBLEMATIC EXPORTS (commented out):
// export * from "./ui/textarea"; // Missing file
// export * from "./ui/empty-state"; // Missing file
// export * from "./ui/typography"; // Missing file
// export * from "./ui/cta-button"; // Issues
// export * from "./ui/command-palette"; // Issues
// export * from "./layout/AppHeader"; // Issues
// export * from "./creator"; // Many dependency issues
// export * from "./welcome"; // Import issues
// export * from "./analytics-dashboard"; // Dependency issues
// export * from "./errors"; // Issues
// export * from "./landing"; // Issues
// export * from "./navigation/navbar"; // Issues
// export type { NavItem, NavbarProps } from "./navigation/navbar"; // Issues
// export * from "./navigation/BottomNavBar"; // Issues
// export * from "./profile-dashboard"; // Issues
// export * from "./profile-sidebar"; // Issues
// export * from "./calendar-widget"; // Issues
// export * from "./about-section"; // Issues
// export * from "./progress-section"; // Issues
// export * from "./action-card"; // Issues
// export * from "./onboarding"; // Issues
// export * from "./feed/top-strip"; // Issues
// export * from "./feed/main-feed"; // Issues
// export * from "./feed/campus-unlock-banner"; // Issues
// export * from "./feed/post-composer"; // Issues
// export * from "./feed/feed-composer"; // Issues
// export * from "./feed/space-feed"; // Issues
// export * from "./feed/post-card"; // Issues
// export * from "./profile/profile-header"; // Issues
// export * from "./profile/academic-section"; // Issues
// export * from "./profile/builder-dashboard"; // Issues
// export * from "./rituals/ritual-timer"; // Issues
// export * from "./spaces/category-grid"; // Issues
// export * from "./spaces/SpaceHeader"; // Issues
// export * from "./hivelab/template-selector"; // Issues
// Enhanced Cards with complex types
// export { ProfileCard, EventCard } from "./ui/enhanced-cards"; // Already exported above
// Command Palette with type issues
// export {
//   CommandPalette,
//   useCommandPalette,
//   type Command,
//   type CommandCategory,
// } from "./ui/command-palette"; // Issues
// Complex content exports
// export {
//   AdaptiveCard,
//   SpaceShowcaseCard,
//   EventAnnouncementCard,
//   UGCPostCard,
//   type AdaptiveCardProps,
//   type SpaceShowcaseData,
//   type SpaceShowcaseCardProps,
//   type EventAnnouncementData,
//   type EventAnnouncementCardProps,
//   type UGCPostData,
//   type UGCPostCardProps,
// } from "./content"; // Issues
// Badge system exports
// export {
//   Badge as HIVEBadge,
//   StatusBadge,
//   PriorityBadge,
//   CountBadge,
//   DotBadge,
//   BadgeGroup,
//   badgeVariants,
//   type BadgeProps as HIVEBadgeProps,
//   type StatusBadgeProps,
//   type PriorityBadgeProps,
//   type CountBadgeProps,
//   type DotBadgeProps,
//   type BadgeGroupProps,
// } from "./content"; // Issues
