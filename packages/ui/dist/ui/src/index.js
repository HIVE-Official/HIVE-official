export { isHiveUser, mapFirebaseUserToHiveUser } from './types/user.js';
// === CORE UI COMPONENTS ===
// Button system
export { ButtonEnhanced } from './atomic/atoms/button-enhanced.js';
export { ButtonEnhanced as Button } from './atomic/atoms/button-enhanced.js';
// Input system
export { InputEnhanced } from './atomic/atoms/input-enhanced.js';
export { InputEnhanced as Input } from './atomic/atoms/input-enhanced.js';
export { TextareaEnhanced } from './atomic/atoms/textarea-enhanced.js';
export { TextareaEnhanced as Textarea } from './atomic/atoms/textarea-enhanced.js';
// Card system
export { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './atomic/ui/card.js';
// Typography
export { Text } from './atomic/atoms/text.js';
export { Text as Typography } from './atomic/atoms/text.js';
// Avatar
export { Avatar, AvatarImage, AvatarFallback } from './atomic/atoms/avatar.js';
// Badge
export { Badge } from './atomic/atoms/badge.js';
// Checkbox
export { Checkbox as CheckboxEnhanced } from './atomic/atoms/checkbox-enhanced.js';
// Radio Group
export { Radio as RadioGroup, Radio as RadioGroupItem, RadioGroup as RadioEnhanced } from './atomic/atoms/radio-enhanced.js';
// Alert system
export { Alert, AlertTitle, AlertDescription } from './atomic/atoms/alert.js';
export { Alert as AlertDialog, AlertTitle as AlertDialogAction, AlertDescription as AlertDialogCancel } from './atomic/atoms/alert.js';
export { AlertDescription as AlertDialogFooter } from './atomic/atoms/alert.js';
// Dropdown components
export { Dropdown, DropdownTrigger, DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger, DropdownItem } from './components/dropdown.js';
// Container
export { Container, PageContainer } from './atomic/atoms/container.js';
// Tabs
export { Tabs, TabsContent, TabsList, TabsTrigger } from './atomic/ui/tabs.js';
// === AUTH SYSTEM ===
export { FirebaseAuthProvider, FirebaseAuthProvider as UnifiedAuthProvider, useFirebaseAuth, useUnifiedAuth, useUnifiedAuth as useAuth, useUnifiedAuth as useHiveAuth } from './contexts/unified-auth-context.js';
// === AUTH COMPONENTS ===
export { CheckEmailInfo } from './components/auth/CheckEmailInfo.js';
export { LoadingOrchestrator as PageLoader } from './components/Loading/LoadingOrchestrator.js';
export { SchoolPick } from './components/auth/school-pick.js';
// === MODALS ===
export { HiveModal, HiveConfirmModal, HiveAlertModal } from './components/hive-modal.js';
export { HiveModal as Modal, HiveModal as Dialog } from './components/hive-modal.js';
export { HiveModal as DialogContent, HiveModal as DialogHeader, HiveModal as DialogTitle, HiveModal as DialogTrigger, HiveModal as DialogDescription, HiveModal as DialogFooter, HiveModal as DialogOverlay } from './components/hive-modal.js';
export { HiveModal as ModalContent, HiveModal as ModalHeader, HiveModal as ModalTitle, HiveModal as ModalFooter } from './components/hive-modal.js';
// === FORM COMPONENTS ===
export { FormField } from './atomic/molecules/form-field.js';
export { ComprehensiveFormField } from './atomic/molecules/form-field-comprehensive.js';
export { UniversityEmailFieldMolecule, StudentIDFieldMolecule, MajorSelectionFieldMolecule } from './atomic/molecules/form-comprehensive.js';
export { Label } from './atomic/atoms/label.js';
// === SELECT COMPONENTS ===
export { SelectEnhanced as Select } from './atomic/atoms/select-enhanced.js';
export { SelectTrigger, SelectValue, SelectContent, SelectItem } from './atomic/atoms/select-radix.js';
// === LAYOUT COMPONENTS ===
export { Grid } from './components/Grid.js';
export { Stack } from './components/Stack.js';
export { AppHeader } from './components/AppHeader.js';
export { BottomNavBar } from './components/BottomNavBar.js';
// Search
export { SearchBar } from './components/search-bar.js';
// ScrollArea (using div as fallback for now)
import * as React from 'react';
export const ScrollArea = ({ children, className }) => React.createElement('div', { className }, children);
// === PROFILE COMPONENTS ===
export { ProfileDashboard as BentoProfileDashboard } from './atomic/organisms/profile-dashboard.js';
export { UnifiedProfileDashboard } from './atomic/organisms/unified-profile-dashboard.js';
// === BRAND COMPONENTS ===
export { HiveLogo } from './components/hive-logo.js';
export { HiveInput } from './components/hive-input.js';
// === UTILITIES ===
export * from './lib/utils.js';
export { cn } from './lib/utils.js';
export { logger } from './lib/logger.js';
// === MOTION ===
export { hiveVariants } from './lib/motion.js';
// === BRAND COMPONENTS ===
// Note: HiveLogo component deleted in nuclear rebuild
// === HIVE ALIASES ===
export { ButtonEnhanced as HiveButton } from './atomic/atoms/button-enhanced.js';
export { HiveBadge } from './components/hive-badge.js';
export { HiveCard } from './components/hive-card.js';
// === ADDITIONAL EXPORTS ===
// Academic constants
export { UB_MAJORS } from './constants/academics.js';
export { UB_ACADEMIC_YEARS } from './constants/academic-years.js';
// Firebase admin utilities
export { adminFirestore } from './lib/firebase-admin.js';
// Additional UI Components
export { Checkbox } from './atomic/atoms/checkbox.js';
export { Switch } from './atomic/atoms/switch.js';
export { Slider } from './atomic/atoms/slider.js';
export { Progress } from './atomic/atoms/progress.js';
export { Separator } from './atomic/atoms/separator.js';
export { Skeleton } from './atomic/atoms/skeleton.js';
export { Spinner } from './atomic/atoms/spinner.js';
export { Tooltip } from './atomic/atoms/tooltip.js';
// Navigation components
export { NavigationPreferences } from './atomic/atoms/navigation-preferences.js';
export { useShell, ShellProvider } from './contexts/shell-context.js';
// Hooks
export { useDebounce } from './hooks/use-debounce.js';
// === PROFILE COMPONENTS ===
// Profile Atoms
export { ProfileAvatar } from './atomic/atoms/profile-avatar.js';
export { ProfileBadge } from './atomic/atoms/profile-badge.js';
export { ProfileAction } from './atomic/atoms/profile-action.js';
export { ProfileStatistic } from './atomic/atoms/profile-statistic.js';
// Profile Molecules
export { ProfileHeader } from './atomic/molecules/profile-header.js';
export { ProfileStats } from './atomic/molecules/profile-stats.js';
// Profile Organisms
export { ProfileDashboard } from './atomic/organisms/profile-dashboard.js';
export { ProfileAvatarWidget } from './atomic/organisms/profile-avatar-widget.js';
export { ProfileStatsWidget } from './atomic/organisms/profile-stats-widget.js';
export { ProfileSpacesWidget } from './atomic/organisms/profile-spaces-widget.js';
export { ProfileToolsWidget } from './atomic/organisms/profile-tools-widget.js';
export { ProfileActivityWidget } from './atomic/organisms/profile-activity-widget.js';
export { ProfileCalendarWidget } from './atomic/organisms/profile-calendar-widget.js';
export { ProfileGhostModeWidget } from './atomic/organisms/profile-ghost-mode-widget.js';
export { ProfileHiveLabWidget } from './atomic/organisms/profile-hivelab-widget.js';
export { ProfileCard } from './atomic/organisms/profile-card.js';
export { ProfileSystem } from './atomic/organisms/profile-system.js';
// === SPACES SYSTEM ===
// Space Surface Components
export { HivePostsSurface } from './atomic/organisms/hive-posts-surface.js';
export { HiveMembersSurface } from './atomic/organisms/hive-members-surface.js';
export { HiveEventsSurface } from './atomic/organisms/hive-events-surface.js';
export { HivePinnedSurface } from './atomic/organisms/hive-pinned-surface.js';
export { HiveToolsSurface } from './atomic/organisms/hive-tools-surface.js';
// Space Dashboard
export { SpaceDashboard } from './atomic/organisms/space-dashboard.js';
export { CompleteHIVEToolsSystem } from './atomic/organisms/complete-hive-tools-system.js';
// Space Utilities
export { SpaceExploreHub } from './atomic/organisms/space-explore-hub.js';
export { SpaceSurfaceErrorBoundary, useSpaceSurfaceErrorHandler } from './atomic/organisms/space-surface-error-boundary.js';
export { SpaceSurfaceSkeleton } from './atomic/organisms/space-surface-skeleton.js';
//# sourceMappingURL=index.js.map