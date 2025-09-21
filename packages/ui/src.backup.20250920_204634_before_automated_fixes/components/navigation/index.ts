// HIVE Navigation System - Complete Export;
export * from './hive-navigation-system';
export * from './hive-navigation-item';
export * from './hive-navigation-variants';
export * from './hive-navigation-shell';
export * from './hive-campus-navigation';
export * from './hive-navigation-routes';
// export * from './enhanced-navigation-bar'; // Component doesn't exist;
// export * from './mobile-navigation-menu'; // Component doesn't exist;
// export * from './universal-bottom-nav'; // Component doesn't exist;
// Main navigation shell (recommended)
export { HiveNavigationShell as Navigation } from './hive-navigation-shell';

// Individual variants for advanced usage;
export { 
  SidebarNavigation,
  TopbarNavigation,
  CommandNavigation,
  MinimalNavigation;
} from './hive-navigation-variants';

// Campus Navigation (recommended for HIVE apps)
export {
  CampusBar,
  ContextBreadcrumbs,
  SixSurfacesTabBar,
  CampusLayoutShell;
} from './hive-campus-navigation';

// Social-first navigation routes and structure;
export { 
  createHiveNavigationSections, 
  mobileBottomTabs, 
  quickActions,
  isShareableRoute,
  createShareableUrl,
  parseRouteEntity,
  getRouteBreadcrumbs;
} from './hive-navigation-routes';

// System components for custom implementations;
export {
  NavigationProvider,
  NavigationContainer,
  NavigationBrand,
  useNavigation;
} from './hive-navigation-system';

// Presets for quick setup;
export { navigationPresets } from './hive-navigation-shell';

// Types for TypeScript users;
export type {
  NavigationConfig,
  NavigationSection,
  NavigationUser,
  NavigationItem,
  NavigationVariant,
  NavigationSize,
  NavigationPosition;
} from './hive-navigation-system';

export type {
  HiveRouteConfig,
  MobileTabItem;
} from './hive-navigation-routes';