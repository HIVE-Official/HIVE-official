// Export default
// Export all components from the components directory
export * from "./components";

// Export utilities
export * from "./lib/utils";
export * from "./lib/motion";

// Export special animation components
export { RitualUnlock, RitualSuccess } from "./components/ritual-unlock";

// Export Bento Grid Profile System
export { BentoProfileDashboard } from "./components/profile/bento-profile-dashboard";
export { GridContainer } from "./components/profile/grid/grid-container";

// Motion System
// export {
//   PageTransition,
//   HivePage,
//   SharedElement,
//   hiveRouteTransitions,
// } from "./components/motion/page-transition";
export {
  MotionProvider,
  useMotion,
  AdaptiveMotion,
  useMotionAware,
} from "./components/motion/motion-provider";

// Welcome components
export { WelcomeMat } from "./components/welcome/welcome-mat";
export { WelcomeCard } from "./components/welcome/welcome-card";
export { SchoolSearchInput } from "./components/welcome/school-search-input";

// Feed components
export {
  TopStrip,
  createSampleTopStripItems,
} from "./components/feed/top-strip";
export { PostCard } from "./components/feed/post-card";
export { SpaceFeed } from "./components/feed/space-feed";

// Profile components
export { IdentityHero } from "./components/profile/tiles/identity-hero";
export { AcademicCard } from "./components/profile/tiles/academic-card";
export { ResidentialCard } from "./components/profile/tiles/residential-card";
export { SpacesGrid } from "./components/profile/tiles/spaces-grid";
export { ActivityTimeline } from "./components/profile/tiles/activity-timeline";

// Profile grid system
export { TileWrapper } from "./components/profile/grid/tile-wrapper";
export { EditModeOverlay } from "./components/profile/grid/edit-mode-overlay";
export { useGridState } from "./components/profile/grid/grid-state-manager";
export {
  TILE_REGISTRY,
  getAvailableTiles,
  generateDefaultLayout,
  getTileMeta,
} from "./components/profile/grid/tile-registry";

// Profile grid types
export type {
  TileLayout,
  TileData,
  TileMeta,
  TileProps,
  TileSize,
  ResizeHandle,
  MobileSizePreset,
} from "./components/profile/grid/types";

// Onboarding Components
export { HiveOnboardingV3 } from "./components/onboarding/hive-onboarding-v3";
export type {
  OnboardingData,
  OnboardingProps,
} from "./components/onboarding/hive-onboarding-v3";
