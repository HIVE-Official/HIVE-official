// HIVE UI PACKAGE EXPORTS - CLEANED BUILD
// Only exports components that actually exist and compile
import React from 'react';
// === UTILITIES & TYPES ===
export { cn } from "./src/lib/utils";
// === DESIGN SYSTEM ===
export * from "./src/design-system";
// === FOUNDATION SYSTEMS ===
export * from "./src/lib/responsive-foundation";
export * from "./src/lib/accessibility-foundation";
export * from "./src/lib/component-foundation";
// === ANIMATION SYSTEMS ===
export * from "./src/components/animations";
export { motion, AnimatePresence, MotionDiv, MotionButton, MotionSpan, MotionSection } from "./src/components/framer-motion-proxy";
// === VERIFIED EXISTING COMPONENTS ===
export { HiveLogo, HiveGlyphOnly, HiveLogoInteractive } from "./src/components/hive-logo";
export { HiveModal, HiveConfirmModal, HiveAlertModal } from "./src/components/hive-modal";
export { HiveProgress, HiveProgressBar, HiveCircularProgress, HiveStepProgress, HiveSpinner, HiveSkeleton } from "./src/components/hive-progress";
export { HiveButton, HiveButton as Button } from "./src/components/hive-button";
export { HiveInput, HiveInput as Input, HiveSearchInput } from "./src/components/hive-input";
export { HiveSelect } from "./src/components/hive-select";
export { HiveCard } from "./src/components/hive-card";
export { HiveBadge, HiveBadge as Badge } from "./src/components/hive-badge";
// Note: Label component added to stubs instead of individual export
export { HiveComingSoonModal } from "./src/components/hive-coming-soon-modal";
// === SHELL & NAVIGATION ===
// Temporarily disabled - depends on page-transition which uses Next.js
// export { EnhancedAppShell } from "./src/components/shell/enhanced-app-shell";
export { PageContainer } from "./src/components/shell/page-container";
// Temporarily disabled - these components depend on Next.js which breaks framework-agnostic use
// TODO: Refactor to be framework-agnostic or create separate Next.js-specific package
// export { 
//   UnifiedHeader,
//   LandingPageHeader,
//   SchoolsPageHeader,
//   AuthPageHeader,
//   DashboardPageHeader
// } from "./src/components/navigation/unified-header";
// === PROFILE SYSTEM ===
export { CalendarCard, adaptSmartCalendarProps } from "./src/components/profile";
export { UnifiedProfileDashboard } from "./src/atomic/organisms/unified-profile-dashboard";
// === CAMPUS MOLECULE COMPONENTS ===
export { CampusIdentityHeader } from "./src/atomic/molecules/campus-identity-header";
export { CampusSpacesCard } from "./src/atomic/molecules/campus-spaces-card";
export { CampusActivityFeed } from "./src/atomic/molecules/campus-activity-feed";
export { CampusBuilderTools } from "./src/atomic/molecules/campus-builder-tools";
// === SPACES SYSTEM ===
export { SpaceDetailsWidget } from "./src/components/spaces/space-details-widget";
// === TOOLS SYSTEM ===
export { ToolDetailsWidget } from "./src/components/tools/tool-details-widget";
// === COMPLETE HIVE SYSTEMS ===
export { CompleteHIVEProfileSystem } from "./src/components/profile/complete-hive-profile-system";
export { CompleteHIVESpacesSystem } from "./src/components/spaces/complete-hive-spaces-system";
export { CompleteHIVEToolsSystem } from "./src/components/tools/complete-hive-tools-system";
// === WELCOME SYSTEM ===
export { WelcomeMat, useWelcomeMat } from "./src/components/welcome/welcome-mat";
// === SHELL PROVIDERS & HOOKS ===
export { ShellProvider, useShell } from "./src/components/shell/shell-provider";
// === AUTH & ONBOARDING HOOKS ===
export * from "./src/hooks";
export { useOnboardingBridge } from "./src/hooks/use-onboarding-bridge";
// === AUTH CONTEXT ===
export * from "./src/contexts/unified-auth-context";
export { UnifiedAuthProvider, useUnifiedAuth } from "./src/contexts/unified-auth-context";
// === NAVIGATION PREFERENCES ===
export { NavigationPreferences } from "./src/atomic/atoms/navigation-preferences";
export { MinimalFloatingSidebar, CleanVerticalSidebar, TopHorizontalNav, BottomTabNav, CompactIconRail } from "./src/atomic/molecules/navigation-variants";
// === SURFACES ===
export { HivePostsSurface } from "./src/components/surfaces/hive-posts-surface";
export { HivePinnedSurface } from "./src/components/surfaces/hive-pinned-surface";
export { HiveEventsSurface } from "./src/components/surfaces/hive-events-surface";
export { HiveMembersSurface } from "./src/components/surfaces/hive-members-surface";
export { HiveToolsSurface } from "./src/components/surfaces/hive-tools-surface";
// === TOOLS ===
export { VisualToolBuilder, VisualToolBuilder as LiveToolRuntime } from "./src/components/creators/visual-tool-builder";
export { ToolMarketplace } from "./src/components/tools-marketplace-stub";
// === UI COMPONENTS ===
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./src/atomic/ui/card";
export { Alert, AlertDescription, AlertTitle } from "./src/components/ui/alert";
// === PRODUCTION COMPONENTS (replacing stubs) ===
export { Progress, LoadingProgress, SuccessProgress, ErrorProgress, CircularSpinner, CircularProgress } from "./src/atomic/atoms/progress";
export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./src/components/ui/select";
export { Label } from "./src/atomic/atoms/label";
export { Skeleton } from "./src/atomic/atoms/skeleton";
export { Separator } from "./src/atomic/atoms/separator";
// Dialog components from HiveModal system (using existing exports)
export { HiveModal as Dialog } from "./src/components/hive-modal";
// Basic dialog component system (temporary compatibility)
export const DialogHeader = ({ children }) => React.createElement('div', { className: 'modal-header' }, children);
export const DialogContent = ({ children }) => React.createElement('div', { className: 'modal-content' }, children);
export const DialogFooter = ({ children }) => React.createElement('div', { className: 'modal-footer' }, children);
export const DialogTitle = ({ children }) => React.createElement('h2', { className: 'modal-title' }, children);
export const DialogDescription = ({ children }) => React.createElement('p', { className: 'modal-description' }, children);
export const DialogTrigger = ({ children }) => React.createElement('div', { className: 'modal-trigger' }, children);
// Export the HiveModal sub-components that were in stubs
export const HiveModalContent = DialogContent;
export const HiveModalHeader = DialogHeader;
export const HiveModalTitle = DialogTitle;
export const HiveModalFooter = DialogFooter;
export { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./src/components/ui/alert-dialog";
// Tabs components - using enhanced atoms
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./src/atomic/ui/tabs";
// TODO: Create these production components when needed
// For now, these are not exported to prevent build errors
// PersonalTools - will be implemented in profile system
// SpaceCard - use existing HiveSpaceCard component 
// ActivityFeed - will be implemented in feed system
// === BASIC ATOMS ===
export { Button as AtomicButton, buttonVariants, } from "./src/atomic/atoms/button-enhanced";
export { Input as AtomicInput, inputVariants, } from "./src/atomic/atoms/input-enhanced";
export { Switch, switchVariants, } from "./src/atomic/atoms/switch-enhanced";
// === MOBILE INTERACTION HOOKS ===
export { useHapticFeedback, useSwipeGestures, usePullToRefresh, useLongPress, useTouchRipple, useMobileViewport } from "./src/hooks/use-mobile-interactions";
// === MOBILE COMPONENTS ===
export { MobileFeed } from "./src/components/mobile/mobile-feed";
// === MOBILE UTILITIES & PERFORMANCE ===
export { MobilePerformanceManager, useMobilePerformance, BatteryEfficientAnimations, MemoryManager, AdaptiveLoader, PerformanceBudget, mobilePerformanceManager } from "./src/utils/mobile-performance";
export { MobileNative, shareContent, capturePhoto, selectFiles, getCurrentLocation, vibrate, WakeLock, watchOrientation, getNetworkInfo, getBatteryInfo, InstallPrompt, selectContacts, getDeviceMemory, getHardwareConcurrency } from "./src/utils/mobile-native-features";
export { MobileServiceWorker, useServiceWorker, CacheStrategies, OfflineStorage, mobileServiceWorker } from "./src/utils/mobile-service-worker";
export { MobileTester, mobileTester, useMobileTesting, DEVICE_PROFILES, MOBILE_TEST_SCENARIOS } from "./src/utils/mobile-testing";
//# sourceMappingURL=index.js.map