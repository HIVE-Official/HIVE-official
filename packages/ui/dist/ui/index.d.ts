import React from 'react';
export { cn } from "./src/lib/utils";
export * from "./src/design-system";
export * from "./src/lib/responsive-foundation";
export * from "./src/lib/accessibility-foundation";
export * from "./src/lib/component-foundation";
export * from "./src/components/animations";
export { motion, AnimatePresence, MotionDiv, MotionButton, MotionSpan, MotionSection } from "./src/components/framer-motion-proxy";
export { HiveLogo, HiveGlyphOnly, HiveLogoInteractive } from "./src/components/hive-logo";
export { HiveModal, HiveConfirmModal, HiveAlertModal } from "./src/components/hive-modal";
export { HiveProgress, HiveProgressBar, HiveCircularProgress, HiveStepProgress, HiveSpinner, HiveSkeleton } from "./src/components/hive-progress";
export { HiveButton, HiveButton as Button } from "./src/components/hive-button";
export { HiveInput, HiveInput as Input, HiveSearchInput } from "./src/components/hive-input";
export { HiveSelect } from "./src/components/hive-select";
export { HiveCard } from "./src/components/hive-card";
export { HiveBadge, HiveBadge as Badge } from "./src/components/hive-badge";
export { HiveComingSoonModal } from "./src/components/hive-coming-soon-modal";
export { PageContainer } from "./src/components/shell/page-container";
export { CalendarCard, adaptSmartCalendarProps } from "./src/components/profile";
export { UnifiedProfileDashboard } from "./src/atomic/organisms/unified-profile-dashboard";
export { CampusIdentityHeader } from "./src/atomic/molecules/campus-identity-header";
export { CampusSpacesCard } from "./src/atomic/molecules/campus-spaces-card";
export { CampusActivityFeed } from "./src/atomic/molecules/campus-activity-feed";
export { CampusBuilderTools } from "./src/atomic/molecules/campus-builder-tools";
export { SpaceDetailsWidget } from "./src/components/spaces/space-details-widget";
export { ToolDetailsWidget } from "./src/components/tools/tool-details-widget";
export { CompleteHIVEProfileSystem, type CompleteHIVEProfileSystemProps } from "./src/components/profile/complete-hive-profile-system";
export { CompleteHIVESpacesSystem, type CompleteHIVESpacesSystemProps } from "./src/components/spaces/complete-hive-spaces-system";
export { CompleteHIVEToolsSystem, type CompleteHIVEToolsSystemProps } from "./src/components/tools/complete-hive-tools-system";
export { WelcomeMat, useWelcomeMat } from "./src/components/welcome/welcome-mat";
export { ShellProvider, useShell } from "./src/components/shell/shell-provider";
export * from "./src/hooks";
export { useOnboardingBridge } from "./src/hooks/use-onboarding-bridge";
export * from "./src/contexts/unified-auth-context";
export { UnifiedAuthProvider, useUnifiedAuth } from "./src/contexts/unified-auth-context";
export { NavigationPreferences } from "./src/atomic/atoms/navigation-preferences";
export { MinimalFloatingSidebar, CleanVerticalSidebar, TopHorizontalNav, BottomTabNav, CompactIconRail } from "./src/atomic/molecules/navigation-variants";
export { HivePostsSurface, type Comment } from "./src/components/surfaces/hive-posts-surface";
export { HivePinnedSurface } from "./src/components/surfaces/hive-pinned-surface";
export { HiveEventsSurface } from "./src/components/surfaces/hive-events-surface";
export { HiveMembersSurface } from "./src/components/surfaces/hive-members-surface";
export { HiveToolsSurface } from "./src/components/surfaces/hive-tools-surface";
export { VisualToolBuilder, VisualToolBuilder as LiveToolRuntime } from "./src/components/creators/visual-tool-builder";
export { ToolMarketplace } from "./src/components/tools-marketplace-stub";
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./src/atomic/ui/card";
export { Alert, AlertDescription, AlertTitle } from "./src/components/ui/alert";
export { Progress, LoadingProgress, SuccessProgress, ErrorProgress, CircularSpinner, CircularProgress } from "./src/atomic/atoms/progress";
export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./src/components/ui/select";
export { Label } from "./src/atomic/atoms/label";
export { Skeleton } from "./src/atomic/atoms/skeleton";
export { Separator } from "./src/atomic/atoms/separator";
export { HiveModal as Dialog } from "./src/components/hive-modal";
export declare const DialogHeader: ({ children }: {
    children: React.ReactNode;
}) => React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
export declare const DialogContent: ({ children }: {
    children: React.ReactNode;
}) => React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
export declare const DialogFooter: ({ children }: {
    children: React.ReactNode;
}) => React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
export declare const DialogTitle: ({ children }: {
    children: React.ReactNode;
}) => React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
export declare const DialogDescription: ({ children }: {
    children: React.ReactNode;
}) => React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
export declare const DialogTrigger: ({ children }: {
    children: React.ReactNode;
}) => React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
export declare const HiveModalContent: ({ children }: {
    children: React.ReactNode;
}) => React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
export declare const HiveModalHeader: ({ children }: {
    children: React.ReactNode;
}) => React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
export declare const HiveModalTitle: ({ children }: {
    children: React.ReactNode;
}) => React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
export declare const HiveModalFooter: ({ children }: {
    children: React.ReactNode;
}) => React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
export { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./src/components/ui/alert-dialog";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./src/atomic/ui/tabs";
export { Button as AtomicButton, buttonVariants, } from "./src/atomic/atoms/button-enhanced";
export { Input as AtomicInput, inputVariants, } from "./src/atomic/atoms/input-enhanced";
export { Switch, switchVariants, } from "./src/atomic/atoms/switch-enhanced";
export { useHapticFeedback, useSwipeGestures, usePullToRefresh, useLongPress, useTouchRipple, useMobileViewport } from "./src/hooks/use-mobile-interactions";
export { MobileFeed } from "./src/components/mobile/mobile-feed";
export { MobilePerformanceManager, useMobilePerformance, BatteryEfficientAnimations, MemoryManager, AdaptiveLoader, PerformanceBudget, mobilePerformanceManager } from "./src/utils/mobile-performance";
export { MobileNative, shareContent, capturePhoto, selectFiles, getCurrentLocation, vibrate, WakeLock, watchOrientation, getNetworkInfo, getBatteryInfo, InstallPrompt, selectContacts, getDeviceMemory, getHardwareConcurrency } from "./src/utils/mobile-native-features";
export { MobileServiceWorker, useServiceWorker, CacheStrategies, OfflineStorage, mobileServiceWorker } from "./src/utils/mobile-service-worker";
export { MobileTester, mobileTester, useMobileTesting, DEVICE_PROFILES, MOBILE_TEST_SCENARIOS } from "./src/utils/mobile-testing";
//# sourceMappingURL=index.d.ts.map