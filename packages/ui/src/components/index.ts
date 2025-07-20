// === FOUNDATION ===
// Primary HIVE Components - Use HIVE branded versions as primary exports
export * from "./hive-button";
export * from "./hive-card"; 
export * from "./hive-input";
export * from "./hive-badge";
export * from "./hive-button-premium";
export * from "./hive-card-premium";

// Base UI Components (shadcn/ui) - Available with specific names to avoid conflicts
export { 
  Button as BaseButton, 
  buttonVariants as baseButtonVariants 
} from "./ui/button";
export { 
  Card as BaseCard, 
  CardContent as BaseCardContent,
  CardDescription as BaseCardDescription,
  CardFooter as BaseCardFooter,
  CardHeader as BaseCardHeader,
  CardTitle as BaseCardTitle,
  cardVariants as baseCardVariants
} from "./ui/card";
export { 
  Input as BaseInput 
} from "./ui/input";
export * from "./ui/badge";
export * from "./ui/textarea";
export * from "./ui/tabs";
export * from "./ui/avatar";
export * from "./ui/dropdown-menu";
export * from "./ui/alert-dialog";
export * from "./ui/switch";
export * from "./ui/resizable";
export * from "./ui/scroll-area";
export * from "./ui/alert";

// Root level UI components (alternative implementations)
export { Alert as HiveAlert } from "./alert";
export { Label as HiveLabel } from "./label";

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
export * from "./Stack";
export * from "./Grid";
export * from "./Box";

// Typography Components
export * from "./Typography";
export { Heading, Text } from "./Typography";

// Animation Components
export * from "./framer-motion-proxy";
export * from "./hive-motion-wrapper";

// HIVE Space Components
export * from "./hive-space-card";
export * from "./hive-space-directory";
export * from "./hive-space-layout";

// HIVE UI Components
export * from "./hive-charts";
export * from "./hive-command-palette";
export * from "./hive-breadcrumbs";
export * from "./hive-menu";
export * from "./hive-modal";
export * from "./hive-coming-soon-modal";
export * from "./hive-sidebar";
export * from "./hive-select";
export * from "./hive-multi-select";
export * from "./hive-rich-text-editor";
export * from "./hive-course-card";

// HIVE Unified Card System
export * from "./card-system";
export * from "./hive-file-upload";
export * from "./hive-form";
export * from "./hive-table";
export * from "./hive-progress";
export * from "./hive-modular-card";
// export * from "./hive-icons"; // Commented out to avoid HiveLogo conflict with hive-logo

// Additional UI Components (shadcn/ui) - non-conflicting ones
export * from "./ui/checkbox";
export * from "./ui/label";
export * from "./ui/popover";
export * from "./ui/radio-group";
export * from "./ui/separator";
export * from "./ui/skeleton";
export * from "./ui/slider";
export * from "./ui/toast";
export * from "./ui/tooltip";

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

// Shell Components
export * from "./shell";

// Navigation System - New Unified System
export * from "./navigation";

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

// Creator Components
export * from "./creator";
export * from "./builders";

// Welcome Components  
export * from "./welcome";
// Individual welcome components for specific use cases
export { SchoolSearchInput } from "./welcome/school-search-input";
export { WelcomeCard } from "./welcome/welcome-card";

// Feed Components
export * from "./feed";

// Analytics Components
export * from "./analytics-dashboard";

// Dashboard Components
export * from "./dashboard";

// Profile Components
export { 
  ProfileSystem, 
  ProfileHeader, 
  MySpacesFeed, 
  SmartCalendar, 
  CampusConnections, 
  HiveLabSection, 
  ProfileStats 
} from "./profile";
export type { 
  User as ProfileUser, 
  Space as ProfileSpace, 
  Event as CalendarEvent, 
  Connection 
} from "./profile";
