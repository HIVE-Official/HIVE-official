// === ATOMIC DESIGN SYSTEM (PRIMARY) ===
// Complete HIVE UI/UX foundation - atoms, molecules, organisms, templates
// These are the primary exports following HIVE design system
// Note: Commented out to avoid export conflicts - individual components are exported from main index.ts
// export * from '../atomic';

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

// Layout Components
// Layout components moved to main index to avoid ambiguous imports
// export * from "./Stack";
export * from "./Grid"; 
// export * from "./Box";

// Typography Components
export * from "./Typography";
export { Heading, Text } from "./Typography";

// Animation Components
export * from "./framer-motion-proxy";
export * from "./hive-motion-wrapper";

// HIVE Space Components - temporarily disabled due to import errors
// export * from "./hive-space-card"; // Conflicts with atomic/organisms/hive-space-card - using atomic version
// export * from "./hive-space-directory";
// export * from "./hive-space-layout";

// HIVE Spaces Organisms - temporarily disabled due to import errors
// export { 
//   CategoryGridOrganism,
//   SPACE_CATEGORIES,
//   type CategoryGridOrganismProps 
// } from "./spaces/category-grid-organism";
// export { 
//   HeroSearchOrganism,
//   type HeroSearchOrganismProps,
//   type CampusVisualizationProps,
//   type EnhancedSearchBarProps,
//   type QuickActionButtonsProps
// } from "./spaces/hero-search-organism";
// export { 
//   PersonalizationFeedOrganism,
//   type PersonalizationFeedOrganismProps,
//   type UserSpace,
//   type RecommendedSpace,
//   type ActivityStats
// } from "./spaces/personalization-feed-organism";

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

// Navigation System - temporarily disabled due to import errors
// export * from "./navigation";

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
// export { ElementRuntimeRenderer } from "./creator/ToolBuilder/element-runtime-renderer"; // Temporarily disabled for atomic deployment
// export { ElementStateManager, useElementState, useElementInstanceState, useConditionalLogic } from "./creator/ToolBuilder/element-state-manager"; // Temporarily disabled for atomic deployment
// export { LiveToolRuntime } from "./creator/ToolBuilder/live-tool-runtime"; // Temporarily disabled for atomic deployment
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

// Enhanced Profile Tools Card
// export { EnhancedProfileToolsCard } from "./profile/enhanced-profile-tools-card"; // Temporarily disabled for atomic deployment
// export type { ProfileToolInstallation, ProfileToolsData } from "./profile/enhanced-profile-tools-card"; // Temporarily disabled for atomic deployment

// HIVE Tools System - Complete Event System and Infrastructure
// export * from "./tools"; // Temporarily disabled for atomic deployment

// Tools Re-exports for convenience - temporary stubs
export { 
  ToolMarketplace,
  LiveToolRuntime
} from "./tools-marketplace-stub";
// export type {
//   EventSystemConfig,
//   EventSystemState,
//   EventData,
//   EventCreatorConfig,
//   RSVPResponse,
//   EventDetails,
//   RSVPManagerConfig,
//   ToolConfiguration,
//   ToolState,
//   MarketplaceTool,
//   EventSystemShowcase,
//   PersonalTool,
//   PersonalToolsData
// } from "./tools"; // Temporarily disabled for atomic deployment
