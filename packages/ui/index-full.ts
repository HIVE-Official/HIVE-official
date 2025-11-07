// MINIMAL WORKING BUILD - ESSENTIAL COMPONENTS ONLY
// This is a temporary minimal build to get the package working

// === UTILITIES & TYPES ===
export { cn } from "./src/lib/utils";

// === ESSENTIAL COMPONENTS ===
export { PageContainer } from "./src/components/shell/page-container";
export { CalendarCard, adaptSmartCalendarProps } from "./src/components/profile";
export { WelcomeMat, useWelcomeMat } from "./src/components/welcome/welcome-mat";
// TEMPORARILY COMMENTED OUT FOR DEBUGGING
// export { UniversalProfileSystem } from "./src/components/profile/universal-profile-system";
// export type { UniversalProfileUser } from "./src/components/profile/universal-profile-system";

// === DASHBOARD SYSTEM ===
// TEMPORARILY COMMENTED OUT FOR DEBUGGING
// export * from "./src/components/dashboard";
// export { AnalyticsDashboard } from "./src/components/analytics-dashboard/analytics-dashboard";

// === CARD COMPONENTS ===
export { 
  HiveCard as Card, 
  HiveCard,
  HiveCardContent as CardContent,
  HiveCardHeader as CardHeader,
  HiveCardTitle as CardTitle
} from "./src/components/hive-card";

// === SHELL COMPONENTS ===
export { EnhancedAppShell } from "./src/components/shell/enhanced-app-shell";

// === BASIC HIVE COMPONENTS ===
export { Button, buttonVariants } from "./src/atomic/atoms/button";
export { Input, inputVariants } from "./src/atomic/atoms/input";
export { HiveSelect, hiveSelectVariants, type HiveSelectProps } from "./src/components/hive-select";
export { HiveComingSoonModal } from "./src/components/hive-coming-soon-modal";
export { HiveModal } from "./src/components/hive-modal";
export { HiveLogo } from "./src/components/hive-logo";
export { HiveBadge, HiveBadge as Badge } from "./src/components/hive-badge";

// === PROGRESS COMPONENTS ===
export {
  Progress,
  CircularProgress,
  type ProgressProps
} from "./src/atomic/atoms/progress";

// Search Input Components
export { SchoolSearchInput } from "./src/components/welcome/school-search-input";

// === BASIC ATOMS ===
export { Button as AtomicButton } from "./src/atomic/atoms/button";

// Layout components for compatibility
export { Stack } from "./src/components/elements/stack";

export { Input, inputVariants } from "./src/atomic/atoms/input";

export {
  Switch,
  switchVariants,
} from "./src/atomic/atoms/switch-enhanced";

// Badge is exported above as HiveBadge

// === LAYOUT COMPONENTS ===
export { Grid } from "./src/components/Grid";

// === ATOMIC CARD COMPONENTS ===
export { 
  Card as AtomicCard,
  CardHeader as AtomicCardHeader,
  CardContent as AtomicCardContent,
  CardTitle as AtomicCardTitle,
  CardDescription
} from "./src/atomic/ui/card";

// === FORM COMPONENTS ===
export { Label } from "./src/atomic/atoms/label";
export { Textarea } from "./src/atomic/atoms/textarea";

// === FILE UPLOAD ===
export { HiveFileUpload } from "./src/components/hive-file-upload";

// === SURFACE COMPONENTS ===
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
} from "./src/components/surfaces";

// === ALERT COMPONENTS ===
export { 
  Alert,
  AlertDescription
} from "./src/components/ui/alert";

// === HIVE LAB EXPERIENCE ===
export * from "./src/atomic/templates";

// === HIVE LAB SYSTEM ===
export {
  VisualToolComposer,
  type VisualToolComposerProps,
} from "./src/components/hivelab/visual-tool-composer";
export {
  renderElement,
  SearchInputElement,
  FilterSelectorElement,
  ResultListElement,
  DatePickerElement,
  UserSelectorElement,
  TagCloudElement,
  MapViewElement,
  ChartDisplayElement,
  FormBuilderElement,
  NotificationCenterElement,
} from "./src/components/hivelab/element-renderers";
export {
  ElementRegistry,
  ElementEngine,
  CORE_ELEMENTS,
  TOOL_TEMPLATES,
  initializeElementSystem,
  type ElementDefinition,
  type ToolComposition,
  type ElementProps,
} from "./src/lib/hivelab/element-system";

// === STYLES ===
// Note: CSS is imported separately in consuming applications

// === CREATOR COMPONENTS - HIVE TOOL BUILDER SYSTEM - TEMPORARILY DISABLED ===
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
// } from "./src/components/creators";

// Creator Types - TEMPORARILY DISABLED
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
// } from "./src/components/creators";

// === NAVIGATION HOOKS ===
export { useNavigation, useKeyboardNavigation, useRouteTransitions } from "./src/hooks";

// === TOOL COMPONENTS (TEMPORARY STUBS) ===
export { 
  ToolMarketplace,
  LiveToolRuntime
} from "./src/components/tools-marketplace-stub.js";
