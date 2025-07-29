// ==========================================================================
// HIVE DESIGN SYSTEM - BRANDED COMPONENTS (Primary Exports)
// ==========================================================================

// Layout Components
export { Box } from "./src/components/Box";
export { Stack } from "./src/components/Stack";
export { Grid } from "./src/components/Grid";
export { BentoGrid } from "./src/components/bento-grid";
export type { BentoCard, BentoCardSize, BentoCardType, BentoGridProps } from "./src/components/bento-grid";

// HIVE Core Components  
export { HiveButton, Button, hiveButtonVariants, buttonVariants } from "./src/components/hive-button";
export { HiveCard, Card, hiveCardVariants, cardVariants, HiveCardHeader, CardHeader, HiveCardTitle, CardTitle, HiveCardDescription, CardDescription, HiveCardContent, CardContent, HiveCardFooter, CardFooter } from "./src/components/hive-card";
export { HivePremiumCard } from "./src/components/hive-card-premium";
export { HiveInput, Input, InputAdvanced, HiveToolNameInput, HiveSpaceNameInput, HiveSearchInput, HivePasswordInput, hiveInputVariants } from "./src/components/hive-input";
export { HiveBadge } from "./src/components/hive-badge";
export { HiveModal } from "./src/components/hive-modal";
export { HiveComingSoonModal, type HiveComingSoonModalProps } from "./src/components/hive-coming-soon-modal";
export { HiveSelect } from "./src/components/hive-select";
export { HiveFileUpload } from "./src/components/hive-file-upload";
export { HiveProgressBar, HiveCircularProgress, HiveStepProgress } from "./src/components/hive-progress";
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
} from "./src/atomic/atoms/progress";
export { HiveCommandPalette, useHiveCommandPalette, builderCategories } from "./src/components/hive-command-palette";
export { 
  EnhancedHiveCommandPalette, 
  comprehensiveSearchCategories,
  defaultSearchItems,
  type SearchableItem,
  type SearchCategory 
} from "./src/components/enhanced-hive-command-palette";
export { HiveBreadcrumbs } from "./src/components/hive-breadcrumbs";
export { QuickActionsMenu, useQuickActionsMenu, type QuickAction } from "./src/components/quick-actions-menu";
export { FloatingActionButton, ContextFloatingActionButton, type FloatingAction } from "./src/components/floating-action-button";
export { HiveMenu } from "./src/components/hive-menu";
export { HiveSidebar } from "./src/components/hive-sidebar";
export { HiveTable } from "./src/components/hive-table";
export { HiveForm } from "./src/components/hive-form";
// export { HiveIcons } from "./src/components/hive-icons"; // Temporarily disabled due to build issues
export { HiveBarChart, HiveDonutChart, HiveLineChart } from "./src/components/hive-charts";

// HIVE Modular Components
export { 
  ModularCard, 
  moduleVariants,
  HeaderModule,
  ContentModule, 
  FooterModule,
  AccentModule,
  ActionModule,
  ModularStack,
  ModularGrid
} from "./src/components/hive-modular-card";

// HIVE Logo System
export { HiveLogo, HiveLogoInteractive } from "./src/components/hive-logo";
export { 
  HiveLogoAnimated, 
  HiveLogoSpinner, 
  HiveLogoPulse, 
  HiveLogoAssembly,
  HiveGlyphSimple,
  HiveLogoOutlined,
  HiveMonogram,
  HiveLogoGlass,
  HiveLogoNeon,
  HiveLogoHolographic,
  HiveLogoParticles,
  HiveLogoProgress,
  HiveLogoContextual
} from "./src/components/hive-logo-variants";
export { 
  HiveLogoResponsive,
  HiveLogoNavigation, 
  HiveLogofavicon,
  HiveLogoThemeAdaptive,
  HiveLogoLoading,
  HiveLogoUserStatus,
  HiveLogoApp
} from "./src/components/hive-logo-responsive";
export { HiveLogoHighPerformance } from "./src/components/hive-logo-performance";
export { HiveLogoAccessible, HiveLogoAccessibilityTest } from "./src/components/hive-logo-accessibility";
export { HiveLogoEnterprise, HiveLogoProvider, useHiveLogoConfig } from "./src/components/hive-logo-enterprise";

// Typography Components
export { Heading, Muted, Text } from "./src/components/Typography";

// Form Components
export { WaitlistForm } from "./src/components/waitlist-form";

// ==========================================================================
// SHELL SYSTEM - APPLICATION LAYOUT
// ==========================================================================

export * from "./src/components/shell";
export { ShellPageContainer as PageContainer, EnhancedAppShell } from "./src/components/shell";
export { PageTransition } from "./src/components/page-transition";

// Navigation System
export * from "./src/components/navigation";
export { UniversalBottomNav, MobileNavigationMenu, useUniversalBottomNav } from "./src/components/navigation";

// Notification System  
export { NotificationSystem, NotificationBell, useNotifications as useNotificationSystem } from "./src/components/notifications/notification-system";
export type { Notification } from "./src/components/notifications/notification-system";

// ==========================================================================
// SURFACE SYSTEM - SPACE COMPONENTS
// ==========================================================================

export * from "./src/components/surfaces";

// ==========================================================================
// BUILDER SYSTEM - TOOL CREATION (UNIFIED)
// ==========================================================================

// Export only the unified ToolBuilder system
export { 
  ToolBuilder, 
  TemplateMode, 
  WizardMode, 
  PropertiesPanel, 
  JsonViewer, 
  UnifiedDesignCanvas 
} from "./src/components/creator/ToolBuilder";

// ==========================================================================
// CREATOR SYSTEM - LEGACY (Backwards Compatibility)
// ==========================================================================

export {
  ElementPicker,
  ElementCard,
} from "./src/components/creator/ElementPicker";
export type {
  ElementPickerProps,
  ElementCardProps,
} from "./src/components/creator/ElementPicker";
export {
  DesignCanvas,
  ElementLibrary,
} from "./src/components/creator/ToolBuilder";
export type {
  CanvasState,
  DragData,
  ElementInstance,
  ToolBuilderCanvasProps,
  ElementInstanceProps,
} from "./src/components/creator/ToolBuilder";
export {
  getAllElementConfigSchemas,
  getElementConfigSchema,
} from "./src/components/creator/ElementConfig";
export type {
  PropertyInputProps,
  PropertySchema,
  ElementConfigSchema,
} from "./src/components/creator/ElementConfig";

// ==========================================================================
// PROFILE SYSTEM - PHASE 3 COMPONENTS
// ==========================================================================

export { EnhancedProfileDashboard } from "./src/components/profile-cards/enhanced-profile-dashboard";
export type { 
  EnhancedProfileUser, 
  PersonalTool, 
  ActivityLogItem, 
  EnhancedProfileDashboardProps 
} from "./src/components/profile-cards/enhanced-profile-dashboard";

export { AvatarCard } from "./src/components/profile-cards/avatar-card";
export type { ProfileCompletionStatus, AvatarCardProps } from "./src/components/profile-cards/avatar-card";

export { GhostModeCard } from "./src/components/profile-cards/ghost-mode-card";

// Profile Components
export { 
  ProfileSystem,
  EnhancedProfileSystem,
  UniversalProfileSystem,
  ProfileHeader,
  ProfileStats,
  MySpacesFeed,
  SmartCalendar,
  CampusConnections,
  HiveLabSection,
  CalendarCard
} from "./src/components/profile";
export { adaptSmartCalendarProps } from "./src/components/profile/calendar-data-adapter";
export type { 
  CalendarCardProps, 
  CalendarCardData, 
  CalendarCardState,
  CalendarConnection,
  CalendarConflict,
  User,
  UniversalProfileUser,
  Space,
  Event,
  Connection,
  HiveLabSection as HiveLabSectionType,
  ProfileSystemProps,
  ProfileHeaderProps,
  MySpacesFeedProps,
  SmartCalendarProps,
  CampusConnectionsProps,
  HiveLabSectionProps,
  ProfileStatsProps
} from "./src/components/profile/types";

// ==========================================================================
// SOCIAL COMPONENTS
// ==========================================================================

export { HiveSpaceCard } from "./src/components/hive-space-card";
export { HiveSpaceDirectory } from "./src/components/hive-space-directory";

// ==========================================================================
// SPACE CARD ORGANISMS - ATOMIC DESIGN SYSTEM
// ==========================================================================

export { SpaceCardOrganismUniversity } from "./src/atomic/organisms/space-card-organism-university";
export { SpaceCardOrganismResidential } from "./src/atomic/organisms/space-card-organism-residential";
export { SpaceCardOrganismGreek } from "./src/atomic/organisms/space-card-organism-greek";
export type { 
  UniversitySpaceData, 
  SpaceCardOrganismUniversityProps
} from "./src/atomic/organisms/space-card-organism-university";
export type { 
  ResidentialSpaceData, 
  SpaceCardOrganismResidentialProps
} from "./src/atomic/organisms/space-card-organism-residential";
export type { 
  GreekSpaceData, 
  SpaceCardOrganismGreekProps 
} from "./src/atomic/organisms/space-card-organism-greek";

// ==========================================================================
// WELCOME & ONBOARDING
// ==========================================================================

export { WelcomeMat, useWelcomeMat } from "./src/components/welcome";

// ==========================================================================
// THEME & MOTION SYSTEM
// ==========================================================================

export { ThemeProvider } from "./src/components/theme-provider";

// Unified HIVE Motion System - Temporarily disabled due to NextJS client boundary issues with framer-motion
// export * from "./src/motion";
// Instead, export specific motion utilities without framer-motion dependency
export { HiveMotionWrapper } from "./src/components/hive-motion-wrapper";

// Legacy motion exports (deprecated)
// export { motion, AnimatePresence } from "framer-motion"; // Use HIVE motion system instead

// ==========================================================================
// BASE UI COMPONENTS (Legacy Support - Use HIVE components instead)
// ==========================================================================

// Note: These are provided for backwards compatibility only.
// New code should use HIVE-prefixed components above.

// export {
//   Card,
//   CardHeader,
//   CardFooter,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "./src/components/ui/card"; // DEPRECATED: Use HiveCard instead
// export { Button } from "./src/components/ui/button"; // DEPRECATED: Use HiveButton instead
// export { Input } from "./src/components/ui/input"; // DEPRECATED: Use HiveInput instead
export { Badge } from "./src/components/ui/badge";
export { Alert, AlertTitle, AlertDescription } from "./src/components/ui/alert";
export { Label } from "./src/components/ui/label";
export { Textarea } from "./src/components/ui/textarea";
export { Switch } from "./src/components/ui/switch";
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "./src/components/ui/avatar";
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./src/components/ui/tabs";
export { ScrollArea } from "./src/components/ui/scroll-area";
export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./src/components/ui/resizable";

// Utility Functions
export { cn } from "./src/lib/utils";
export * from "./src/lib/motion-utils";
