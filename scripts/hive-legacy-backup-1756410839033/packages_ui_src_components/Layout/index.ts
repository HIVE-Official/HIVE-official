// HIVE Layout System - Complete Architecture
// Production-ready components for responsive, accessible, performant layouts

export { ResponsiveLayout } from './ResponsiveLayout';
export { PageHeader } from './PageHeader';
export { ContentArea } from './ContentArea';

// Utilities and hooks
export { 
  useAdvancedViewport, 
  calculateDynamicSpacing, 
  calculateMaxWidth 
} from './ResponsiveLayout';

export { 
  calculateActionPlacement, 
  generateContextualContent, 
  sortActionsByPriority 
} from './PageHeader';

export { 
  useSmartScroll, 
  useFocusManagement, 
  getPerformanceConfig 
} from './ContentArea';

// TypeScript types
export type { 
  ResponsiveLayoutProps,
  ViewportState,
  ContentDensity,
  LayoutStrategy
} from './ResponsiveLayout';

export type {
  PageHeaderProps,
  PageType,
  PageAction,
  BreadcrumbItem,
  ActionPlacement,
  HeaderBehavior
} from './PageHeader';

export type {
  ContentAreaProps,
  ContentStrategy,
  ContentScrollBehavior,
  FocusStrategy,
  PerformanceLevel
} from './ContentArea';