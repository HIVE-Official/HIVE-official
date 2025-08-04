// HIVE UI PACKAGE EXPORTS - CLEANED BUILD
// Only exports components that actually exist and compile
import React from 'react';
// === UTILITIES & TYPES ===
export { cn } from "./src/lib/utils.js";
// === DESIGN SYSTEM ===
export * from "./src/design-system/index.js";
// === FOUNDATION SYSTEMS ===
export * from "./src/lib/responsive-foundation.js";
export * from "./src/lib/accessibility-foundation.js";
export * from "./src/lib/component-foundation.js";
// === VERIFIED EXISTING COMPONENTS ===
export { HiveLogo, HiveGlyphOnly, HiveLogoInteractive } from "./src/components/hive-logo.js";
export { HiveModal, HiveConfirmModal, HiveAlertModal } from "./src/components/hive-modal.js";
export { HiveProgress, HiveProgressBar, HiveCircularProgress, HiveStepProgress, HiveSpinner, HiveSkeleton } from "./src/components/hive-progress.js";
export { HiveButton, HiveButton as Button } from "./src/components/hive-button.js";
export { HiveInput, HiveInput as Input, HiveSearchInput } from "./src/components/hive-input.js";
export { HiveSelect } from "./src/components/hive-select.js";
export { HiveCard } from "./src/components/hive-card.js";
export { HiveBadge, HiveBadge as Badge } from "./src/components/hive-badge.js";
// Note: Label component added to stubs instead of individual export
export { HiveComingSoonModal } from "./src/components/hive-coming-soon-modal.js";
// === SHELL & NAVIGATION ===
// Temporarily disabled - depends on page-transition which uses Next.js
// export { EnhancedAppShell } from "./src/components/shell/enhanced-app-shell.js";
export { PageContainer } from "./src/components/shell/page-container.js";
// Temporarily disabled - these components depend on Next.js which breaks framework-agnostic use
// TODO: Refactor to be framework-agnostic or create separate Next.js-specific package
// export { 
//   UnifiedHeader,
//   LandingPageHeader,
//   SchoolsPageHeader,
//   AuthPageHeader,
//   DashboardPageHeader
// } from "./src/components/navigation/unified-header.js";
// === PROFILE SYSTEM ===
export { CalendarCard, adaptSmartCalendarProps } from "./src/components/profile/index.js";
// === COMPLETE HIVE SYSTEMS ===
export { CompleteHIVEProfileSystem } from "./src/components/profile/complete-hive-profile-system.js";
export { CompleteHIVESpacesSystem } from "./src/components/spaces/complete-hive-spaces-system.js";
export { CompleteHIVEToolsSystem } from "./src/components/tools/complete-hive-tools-system.js";
// === WELCOME SYSTEM ===
export { WelcomeMat, useWelcomeMat } from "./src/components/welcome/welcome-mat.js";
// === SHELL PROVIDERS & HOOKS ===
export { ShellProvider, useShell } from "./src/components/shell/shell-provider.js";
// === NAVIGATION PREFERENCES ===
export { NavigationPreferences } from "./src/atomic/atoms/navigation-preferences.js";
export { MinimalFloatingSidebar, CleanVerticalSidebar, TopHorizontalNav, BottomTabNav, CompactIconRail } from "./src/atomic/molecules/navigation-variants.js";
// === SURFACES ===
export { HivePostsSurface } from "./src/components/surfaces/hive-posts-surface.js";
export { HivePinnedSurface } from "./src/components/surfaces/hive-pinned-surface.js";
export { HiveEventsSurface } from "./src/components/surfaces/hive-events-surface.js";
export { HiveMembersSurface } from "./src/components/surfaces/hive-members-surface.js";
export { HiveToolsSurface } from "./src/components/surfaces/hive-tools-surface.js";
// === TOOLS ===
export { VisualToolBuilder, VisualToolBuilder as LiveToolRuntime } from "./src/components/creators/visual-tool-builder.js";
export { ToolMarketplace } from "./src/components/tools-marketplace-stub.js";
// === UI COMPONENTS ===
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./src/atomic/ui/card.js";
export { Alert, AlertDescription, AlertTitle } from "./src/components/ui/alert.js";
// === PRODUCTION COMPONENTS (replacing stubs) ===
export { Progress, LoadingProgress, SuccessProgress, ErrorProgress, CircularSpinner, CircularProgress } from "./src/atomic/atoms/progress.js";
export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./src/components/ui/select.js";
export { Label } from "./src/atomic/atoms/label.js";
export { Skeleton } from "./src/atomic/atoms/skeleton.js";
export { Separator } from "./src/atomic/atoms/separator.js";
// Dialog components from HiveModal system (using existing exports)
export { HiveModal as Dialog } from "./src/components/hive-modal.js";
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
export { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./src/components/ui/alert-dialog.js";
// Tabs components - using enhanced atoms
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./src/atomic/ui/tabs.js";
// TODO: Create these production components when needed
// For now, these are not exported to prevent build errors
// PersonalTools - will be implemented in profile system
// SpaceCard - use existing HiveSpaceCard component 
// ActivityFeed - will be implemented in feed system
// === BASIC ATOMS ===
export { Button as AtomicButton, buttonVariants, } from "./src/atomic/atoms/button-enhanced.js";
export { Input as AtomicInput, inputVariants, } from "./src/atomic/atoms/input-enhanced.js";
export { Switch, switchVariants, } from "./src/atomic/atoms/switch-enhanced.js";
//# sourceMappingURL=index.js.map