// === ATOMIC DESIGN SYSTEM (PRIMARY) ===
// Complete HIVE UI/UX foundation - atoms, molecules, organisms, templates
// These are the primary exports following HIVE design system
export * from '../atomic';

// === BRANDED HIVE COMPONENTS (STREAMLINED) ===
// Premium HIVE components - use atomic design system as primary foundation
export { 
  HiveButton,
  type HiveButtonProps 
} from "./hive-button";
export { 
  HivePremiumButton,
  HivePremiumButtonGroup,
  hivePremiumButtonVariants,
  type HivePremiumButtonProps
} from "./hive-button-premium";
export { 
  HiveCard,
  HiveCardContent,
  HiveCardHeader, 
  HiveCardTitle,
  HiveCardDescription,
  HiveCardFooter,
  hiveCardVariants,
  type HiveCardProps
} from "./hive-card";
export { 
  HivePremiumCard,
  hivePremiumCardVariants,
  HivePostCard,
  HiveAnnouncementCard,
  HiveFeaturedCard,
  HiveGlassCard,
  type HivePremiumCardProps
} from "./hive-card-premium";
export { 
  HiveInput,
  type HiveInputProps 
} from "./hive-input";
export { 
  HiveTextarea,
  type HiveTextareaProps 
} from "./hive-textarea";
export { 
  HiveBadge,
  type HiveBadgeProps 
} from "./hive-badge";
export { 
  HiveTooltip,
  HiveTooltipContent,
  HiveTooltipProvider,
  HiveTooltipTrigger,
  HiveMotionTooltip,
  HiveHelpTooltip,
  HiveErrorTooltip,
  HiveSuccessTooltip,
  HiveGoldTooltip,
  HiveMinimalTooltip,
  hiveTooltipVariants
} from "./hive-tooltip";
export { 
  HiveSwitch,
  type HiveSwitchProps 
} from "./hive-switch";
export { 
  HiveSlider,
  type HiveSliderProps 
} from "./hive-slider";

// === BASE UI COMPONENTS (SHADCN/UI) ===
// Available with explicit naming to avoid atomic system conflicts
// NOTE: Button, Switch, Select moved to atomic enhanced system
// export { 
//   Button as ShadcnButton, 
//   buttonVariants as shadcnButtonVariants 
// } from "./ui/button";
export { 
  Card as ShadcnCard, 
  CardContent as ShadcnCardContent,
  CardDescription as ShadcnCardDescription,
  CardFooter as ShadcnCardFooter,
  CardHeader as ShadcnCardHeader,
  CardTitle as ShadcnCardTitle,
  cardVariants as shadcnCardVariants,
  // Also export without prefix for convenience
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";
// export { 
//   Input as ShadcnInput 
// } from "./ui/input";
export { 
  Badge as ShadcnBadge,
  Badge 
} from "./ui/badge";
// export { 
//   Textarea as ShadcnTextarea 
// } from "./ui/textarea";
export * from "./ui/tabs";
export { 
  Avatar as ShadcnAvatar,
  AvatarFallback as ShadcnAvatarFallback,
  AvatarImage as ShadcnAvatarImage
} from "./ui/avatar";
export * from "./ui/dropdown-menu";
export * from "./ui/alert-dialog";
// export { 
//   Switch as ShadcnSwitch 
// } from "./ui/switch";
export * from "./ui/resizable";
export * from "./ui/scroll-area";
export { 
  Alert as ShadcnAlert,
  AlertDescription as ShadcnAlertDescription,
  AlertTitle as ShadcnAlertTitle
} from "./ui/alert";


// HIVE Logo System
export * from "./hive-logo";
export * from "./hive-logo-variants";
export * from "./hive-logo-patterns";
export * from "./hive-logo-responsive";
export * from "./hive-logo-production";

// HIVE Motion System
export * from "./hive-motion-wrapper";
export {
  HiveMagneticHover as MagneticHover,
  HiveLiquidRipple,
  HiveMagneticSnap,
  HiveMagneticTarget,
  HiveLiquidTransform
} from "./hive-magnetic-interactions";
// Individual logo components for specific use cases (others exported from hive-logo-production)
export * from "./hive-logo-performance";

// Layout Components - using atomic design system versions to avoid conflicts
// export * from "./Grid"; // Using atomic version
// export * from "./Stack"; // Using atomic version
// export * from "./Box"; // Using atomic version

// Typography Components - using atomic design system versions to avoid conflicts
// export * from "./Typography"; // Using atomic version
// export { Heading, Text } from "./Typography"; // Using atomic version

// Animation Components
export * from "./framer-motion-proxy";
export * from "./hive-motion-wrapper";

// HIVE Space Components - using atomic design system as primary
// export * from "./hive-space-card"; // Conflicts with atomic/organisms/hive-space-card - using atomic version
// export * from "./hive-space-directory";
// export * from "./hive-space-layout";

// HIVE Spaces Organisms - production ready
export { 
  CategoryGridOrganism,
  SPACE_CATEGORIES,
  type CategoryGridOrganismProps 
} from "./spaces/category-grid-organism";
export { 
  HeroSearchOrganism,
  type HeroSearchOrganismProps,
  type CampusVisualizationProps,
  type EnhancedSearchBarProps,
  type QuickActionButtonsProps
} from "./spaces/hero-search-organism";
export { 
  PersonalizationFeedOrganism,
  type PersonalizationFeedOrganismProps,
  type UserSpace,
  type RecommendedSpace,
  type ActivityStats
} from "./spaces/personalization-feed-organism";

// HIVE UI Components
export * from "./hive-charts";
export * from "./hive-command-palette";
export * from "./hive-breadcrumbs";
export * from "./hive-menu";
export * from "./hive-modal";
export * from "./hive-coming-soon-modal";
export * from "./hive-sidebar";
export { 
  HiveSelect,
  hiveSelectVariants,
  type HiveSelectProps
} from "./hive-select";
export { 
  HiveMultiSelect,
  hiveMultiSelectVariants,
  type HiveMultiSelectProps,
  type MultiSelectOption
} from "./hive-multi-select";
export * from "./hive-rich-text-editor";
export * from "./hive-course-card";

// HIVE Unified Card System
export * from "./card-system";
export * from "./hive-file-upload";
export * from "./hive-form";
export * from "./hive-table";
// Progress components - using atomic design system
export { 
  Progress as HiveProgress,
  Progress,
  CircularProgress,
  LoadingProgress,
  SuccessProgress,
  ErrorProgress,
  CircularSpinner,
  type ProgressProps as HiveProgressProps,
  type ProgressProps
} from "../atomic/atoms/progress";
export * from "./hive-modular-card";
// export * from "./hive-icons"; // Commented out to avoid HiveLogo conflict with hive-logo

// Additional UI Components (shadcn/ui) - explicitly namespaced to avoid atomic conflicts
// export { 
//   Checkbox as ShadcnCheckbox 
// } from "./ui/checkbox";  // File does not exist
export { 
  Label as ShadcnLabel 
} from "./ui/label";
export * from "./ui/popover";
// export * from "./ui/radio-group";  // File does not exist
// export { 
//   Separator as ShadcnSeparator 
// } from "./ui/separator";  // File does not exist
export { 
  Skeleton as ShadcnSkeleton 
} from "./ui/skeleton";
export { 
  Slider as BaseSlider 
} from "./ui/slider";
export * from "./ui/toast";
export { 
  Tooltip as ShadcnTooltip,
  TooltipContent as ShadcnTooltipContent,
  TooltipProvider as ShadcnTooltipProvider,
  TooltipTrigger as ShadcnTooltipTrigger
} from "./ui/tooltip";

// Surface Components - explicit exports to avoid conflicts
export { 
  HivePinnedSurface, 
  HivePostsSurface, 
  HiveEventsSurface, 
  HiveToolsSurface, 
  HiveChatSurface, 
  HiveMembersSurface,
  type PinnedContent,
  type Post,
  type Event as HiveEvent,
  type Tool,
  type ChatMessage,
  type Member,
  pinnedContentTypes,
  postTypes,
  eventTypes,
  rsvpStatuses,
  toolCategories,
  toolStatuses,
  messageTypes,
  messageStatuses,
  memberRoles,
  memberStatuses
} from "./surfaces";

// Shell Components - essential ones exported
export {
  AppShell,
  EnhancedAppShell,
  NavigationHeader,
  NavigationSidebar,
  UserMenu,
  BreadcrumbNavigation,
  CommandPalette,
  NotificationCenter,
  ShellPageContainer,
  ShellProvider,
  useShell,
  NotificationProvider,
  useNotifications,
  type Notification,
  type HivePlatformSection,
  type HiveLayoutType
} from "./shell";

// Navigation System - New YC-Quality Navigation
export * from "../navigation";

// Notification System - temporarily disabled due to import errors
// export * from "./notifications/notification-system";

// State Management System - Social-First with Tool Permissions
export * from "./state";

// Responsive System - Mobile-First Breakpoint Strategy
export * from "./responsive";

// Authentication Components
export { HiveAuthFlow, AuthProvider } from "./auth";
export type { AuthStep, AuthState, AuthContextType } from "./auth";

// Onboarding Components
export { HiveOnboardingWizard, OnboardingProvider } from "./onboarding";
export type { OnboardingStep, OnboardingState, OnboardingContextType } from "./onboarding";

// Error Handling Components
export * from "./error-boundary";

// Core System Components
export * from "./theme-provider";
export * from "./waitlist-form";

// Legacy Components (now consolidated)

// Creator Components - HIVE Tool Builder System - temporarily disabled due to TypeScript errors
// export {
//   VisualToolBuilder,
//   TemplateToolBuilder,
//   WizardToolBuilder,
//   ElementPicker,
//   ElementConfig,
//   ToolPreview,
//   createEmptyTool,
//   createElementInstance,
//   createDeploymentOptions,
//   validateTool,
//   getBuilderComponent,
//   HiveCreators,
//   ELEMENT_CATEGORIES,
//   HIVE_CREATORS_VERSION,
//   SUPPORTED_BUILDER_MODES,
//   CREATOR_FEATURES
// } from "./creators";

// Creator Types - temporarily disabled due to TypeScript errors
// export type {
//   Element as CreatorElement,
//   ElementInstance as CreatorElementInstance,
//   Tool as CreatorTool,
//   ToolTemplate,
//   BuilderMode,
//   DeploymentOptions,
//   VisualBuilderProps,
//   TemplateBuilderProps,
//   WizardBuilderProps,
//   ElementPickerProps,
//   ElementConfigProps,
//   ToolPreviewProps,
//   ElementCategory,
//   ToolCategory,
//   ToolConfig,
//   ToolMetadata,
//   HiveElement,
//   HiveElementInstance,
//   HiveTool,
//   HiveToolTemplate,
//   HiveBuilderMode,
//   HiveDeploymentOptions
// } from "./creators";

// Tool Builder Components - Complete runtime system
export { LiveToolRuntime } from "./live-tool-runtime";
export type { LiveToolRuntimeProps } from "./live-tool-runtime";

// Element Renderers - Core tool execution components
export { TextInputRenderer } from "./elements/text-input-renderer";
export { ButtonRenderer } from "./elements/button-renderer";
export { TextBlockRenderer } from "./elements/text-block-renderer";
export { ImageBlockRenderer } from "./elements/image-block-renderer";
export { DividerRenderer } from "./elements/divider-renderer";
export { StackRenderer } from "./elements/stack-renderer";
export { ChoiceSelectRenderer } from "./elements/choice-select-renderer";
export { RatingStarsRenderer } from "./elements/rating-stars-renderer";
export { CountdownTimerRenderer } from "./elements/countdown-timer-renderer";
export { ProgressBarRenderer } from "./elements/progress-bar-renderer";

// HiveLab - Visual Tool Builder System
export { VisualToolBuilder } from "./hivelab/visual-tool-builder";
export type { VisualToolBuilderProps } from "./hivelab/visual-tool-builder";
export { ElementConfigPanel } from "./hivelab/element-config-panel";

// Community Tools System - Community integration and permissions
export { SpaceToolDeployment } from "./community/space-tool-deployment";
export { CommunityToolBrowser } from "./community/community-tool-browser";
export { ToolPermissionsManager } from "./community/tool-permissions-manager";
export { ToolUsageTracker } from "./community/tool-usage-tracker";

// Legacy components (temporarily disabled for atomic deployment)
// export { ElementRuntimeRenderer } from "./creator/ToolBuilder/element-runtime-renderer"; // Temporarily disabled for atomic deployment
// export { ElementStateManager, useElementState, useElementInstanceState, useConditionalLogic } from "./creator/ToolBuilder/element-state-manager"; // Temporarily disabled for atomic deployment
// export { SimpleToolDemo } from "./creator/ToolBuilder/simple-tool-demo"; // Temporarily disabled for atomic deployment
// export { ElementPropertiesPanel } from "./creator/ToolBuilder/element-properties-panel"; // Disabled - has missing dependencies

// Welcome Components  
export * from "./welcome";
// Individual welcome components for specific use cases
export { SchoolSearchInput } from "./welcome/school-search-input";
export { WelcomeCard } from "./welcome/welcome-card";

// Feed Components - temporarily disabled due to import errors
// export * from "./feed";

// Analytics Components - temporarily disabled due to import errors  
// export * from "./analytics-dashboard";

// Dashboard Components - temporarily disabled due to import errors
// export * from "./dashboard";

// Profile Components - some temporarily disabled due to import errors
export { 
  ProfileSystem, 
  // EnhancedProfileSystem, // temporarily disabled
  // UniversalProfileSystem, // temporarily disabled
  ProfileHeader, 
  MySpacesFeed, 
  SmartCalendar, 
  CampusConnections, 
  HiveLabSection, 
  ProfileStats,
  CalendarCard,
  adaptSmartCalendarProps
} from "./profile";
export type { 
  User as ProfileUser, 
  // UniversalProfileUser, // temporarily disabled
  Space as ProfileSpace, 
  Event as CalendarEvent, 
  Connection 
} from "./profile";

// Complete HIVE Profile System - Production Integration
export { 
  CompleteHIVEProfileSystem,
  type CompleteHIVEProfileSystemProps
} from "./profile/complete-hive-profile-system";

// Enhanced Profile Tools Card
// export { EnhancedProfileToolsCard } from "./profile/enhanced-profile-tools-card"; // Temporarily disabled for atomic deployment
// export type { ProfileToolInstallation, ProfileToolsData } from "./profile/enhanced-profile-tools-card"; // Temporarily disabled for atomic deployment

// HIVE Tools System - Complete vBETA Production System
export { 
  ToolRuntimeEngine,
  createSampleTool,
  type ToolDefinition,
  type ToolElement,
  type ToolAction,
  type ToolStyle
} from "./tools/tool-runtime-engine";

// HIVE Tools & Widgets - Professional tools wrapped in social interfaces
export { MemberDirectoryTool } from "./tools/member-directory-tool";
export { MemberDirectoryWidget } from "./widgets/member-directory-widget";
export { EventManagerTool } from "./tools/event-manager-tool";
export { EventManagerWidget } from "./widgets/event-manager-widget";

export { 
  ToolMarketplace
} from "./tools/tool-marketplace";

export { 
  SpaceToolsTab
} from "./tools/space-tools-tab";

export { 
  MobileToolWrapper
} from "./tools/mobile-tool-wrapper";

export { 
  PerformanceMonitor,
  VirtualScroll,
  LazyComponent,
  DebouncedInput,
  OptimizedImage,
  usePerformanceMonitor,
  useToolCache,
  memoize,
  ToolCache
} from "./tools/performance-optimizer";

export { 
  HiveLabIntegration
} from "./tools/hive-lab-integration";

// Tools Dual Interface System - Interface (utility) vs Surface (informational)
export { 
  ToolDualInterfaceSystem,
  PollDualInterface
} from "./tools";

// Spaces with Library Integration
export { 
  SpaceToolGridWithLibrary
} from "./spaces/space-tool-grid-with-library";

// Complete HIVE Spaces System - Production Integration
export { 
  CompleteHIVESpacesSystem,
  type CompleteHIVESpacesSystemProps
} from "./spaces/complete-hive-spaces-system";

// Complete HIVE Tools System - Production Integration
export { 
  CompleteHIVEToolsSystem,
  type CompleteHIVEToolsSystemProps
} from "./tools/complete-hive-tools-system";

// Event System - Complete 24-Element Library
export { 
  EventSystemDashboard
} from "./events/event-system-dashboard";

export {
  TextInputElement,
  DatePickerElement,
  LocationElement,
  SelectElement,
  NumberInputElement,
  CheckboxElement,
  RadioElement,
  EventCardElement,
  CounterElement,
  QRCodeElement,
  RSVPElement,
  ConditionalElement,
  FilterElement,
  AttendeeListElement,
  CalendarViewElement,
  NotificationElement,
  AnalyticsChartElement,
  FeedbackFormElement,
  ShareElement,
  RecurrenceElement,
  TagsElement,
  StatusElement,
  type ElementProps,
  type EventLocation,
  type RSVPOption
} from "./events/event-elements";

// HIVE Event Management Tools - Production ready
export { 
  RSVPManagerTool
} from "./events/rsvp-manager-tool";

export { 
  EventCheckinTool
} from "./events/event-checkin-tool";

export { 
  EventFeedbackTool
} from "./events/event-feedback-tool";

// HiveLAB Components - Element Discovery & Interactive Playground
export { 
  ElementBrowser,
  InteractivePlayground,
  type ElementDefinition,
  type ElementCategory,
  type ElementType,
  type ElementProp,
  type ElementExample
} from "./hivelab";

// Library System - Contextual Tool Discovery
// Temporarily commented out due to missing dependencies
// export { 
//   LibraryContextualAccess,
//   PlantNewToolButton
// } from "./library";
