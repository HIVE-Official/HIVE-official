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

// Onboarding Components (legacy commented out)
// export { HiveOnboardingV3 } from "./components/onboarding/hive-onboarding-v3";
// export type {
//   OnboardingData,
//   OnboardingProps,
// } from "./components/onboarding/hive-onboarding-v3";

// UI Components
export * from "./components/ui/typography";
export * from "./components/ui/button";
export * from "./components/ui/input";
export * from "./components/ui/textarea";
export * from "./components/ui/label";
export * from "./components/ui/card";
export * from "./components/ui/dialog";
export * from "./components/ui/dropdown-menu";
export * from "./components/ui/tabs";
export * from "./components/ui/badge";
export * from "./components/ui/alert";
export * from "./components/ui/toast";

// Brand Components
export * from "./components/brand/HiveLogo";
export * from "./components/brand/HiveLogoIcon";

// Layout Components
export * from "./components/layout/Container";
export * from "./components/layout/Section";

// Content Components
export * from "./components/content/markdown-page";

// Utility Functions
export * from "./lib/utils";

// Motion system (working parts only)
// export * from "./components/motion"; // TEMP: Commented out - causes duplicate export

// Layout components (basic ones that work)
export * from "./components/stack";
export * from "./components/grid";
export * from "./components/box";

// Animation proxy that works
export * from "./components/framer-motion-proxy";

// Error boundary that works
export * from "./components/error-boundary";

// ALL OTHER EXPORTS TEMPORARILY COMMENTED OUT TO GET ROUTER WORKING
// These need to be re-enabled one by one after fixing their dependencies

// COMMENTED OUT UNTIL FIXED:
// export * from "./components/ui/textarea";  // Missing file
// export * from "./components/ui/resizable"; // Check if exists
// export * from "./components/ui/empty-state"; // Missing file
// export * from "./components/ui/cta-button"; // Check if exists
// export * from "./components/ui/command-palette"; // Check if exists

// All other component directories (need individual fixing)
// export * from "./components/layout"; // Partially working
// export * from "./components/content"; // Needs fixing
// export * from "./components/feed"; // Many issues
// export * from "./components/forms"; // Needs checking
// export * from "./components/profile"; // Many issues
// export * from "./components/navigation"; // Has issues
// export * from "./components/analytics-dashboard"; // Issues
// export * from "./components/errors"; // Needs checking
// export * from "./components/creator"; // Many issues
// export * from "./components/hivelab"; // Needs checking
// export * from "./components/landing"; // Needs checking
// export * from "./components/onboarding"; // Needs checking

// Individual component exports (need checking)
// export { WaitlistForm } from "./components/waitlist-form"; // Issues
// export { PostComposer } from "./components/post-composer"; // Issues
// export { AboutSection } from "./components/about-section"; // Needs checking
// export { ActionCard } from "./components/action-card"; // Issues
