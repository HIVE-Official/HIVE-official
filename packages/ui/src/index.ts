// === CORE UI COMPONENTS ===
// Button system
export { ButtonEnhanced, type ButtonProps } from './atomic/atoms/button-enhanced';
export { ButtonEnhanced as Button } from './atomic/atoms/button-enhanced';

// Input system
export { InputEnhanced, type InputProps } from './atomic/atoms/input-enhanced';
export { InputEnhanced as Input } from './atomic/atoms/input-enhanced';
export { TextareaEnhanced, type TextareaProps } from './atomic/atoms/textarea-enhanced';
export { TextareaEnhanced as Textarea } from './atomic/atoms/textarea-enhanced';

// Card system
export { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './atomic/ui/card';

// Typography
export { Text, type TextProps } from './atomic/atoms/text';
export { Text as Typography } from './atomic/atoms/text';

// Avatar
export { Avatar, AvatarImage, AvatarFallback } from './atomic/atoms/avatar';

// Badge
export { Badge } from './atomic/atoms/badge';

// Alert system
export { Alert, AlertTitle, AlertDescription } from './atomic/atoms/alert';

// Container
export { Container, PageContainer } from './atomic/atoms/container';

// Tabs
export { Tabs, TabsContent, TabsList, TabsTrigger } from './atomic/ui/tabs';

// === AUTH SYSTEM ===
export { 
  FirebaseAuthProvider, 
  FirebaseAuthProvider as UnifiedAuthProvider,
  useFirebaseAuth,
  useUnifiedAuth,
  useUnifiedAuth as useAuth
} from './contexts/unified-auth-context';

// === AUTH COMPONENTS ===
// TODO: Auth components need to be recreated or paths fixed

// === MODALS ===
export { HiveModal, HiveConfirmModal, HiveAlertModal } from './components/hive-modal';
export { HiveModal as Modal, HiveModal as Dialog } from './components/hive-modal';
export { 
  HiveModal as DialogContent,
  HiveModal as DialogHeader,
  HiveModal as DialogTitle,
  HiveModal as DialogTrigger 
} from './components/hive-modal';

// === FORM COMPONENTS ===
export { FormField } from './atomic/molecules/form-field';
export { ComprehensiveFormField, type ComprehensiveFormFieldProps } from './atomic/molecules/form-field-comprehensive';
export { 
  UniversityEmailFieldMolecule,
  StudentIDFieldMolecule,
  MajorSelectionFieldMolecule,
  type UniversityEmailFieldProps,
  type StudentIDFieldProps,
  type MajorSelectionFieldProps
} from './atomic/molecules/form-comprehensive';
export { Label } from './atomic/atoms/label';

// === SELECT COMPONENTS ===
export { SelectEnhanced as Select } from './atomic/atoms/select-enhanced';
export { 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from './atomic/atoms/select-radix';

// === LAYOUT COMPONENTS ===
export { Grid } from './components/Grid';
export { Stack } from './components/Stack';
export { AppHeader } from './components/AppHeader';
export { BottomNavBar } from './components/BottomNavBar';

// === BRAND COMPONENTS ===
export { HiveLogo } from './components/hive-logo';
export { HiveInput } from './components/hive-input';

// === UTILITIES ===
export * from './lib/utils';
export { cn } from './lib/utils';
export { logger } from './lib/logger';

// === MOTION ===
export { hiveVariants } from './lib/motion';


// === BRAND COMPONENTS ===
// Note: HiveLogo component deleted in nuclear rebuild

// === HIVE ALIASES ===
export { ButtonEnhanced as HiveButton } from './atomic/atoms/button-enhanced';
export { HiveBadge } from './components/hive-badge';
export { HiveCard } from './components/hive-card';

// === ADDITIONAL EXPORTS ===
// Academic constants
export { UB_MAJORS } from './constants/academics';
export { UB_ACADEMIC_YEARS } from './constants/academic-years';

// Firebase admin utilities
export { adminFirestore } from './lib/firebase-admin';

// Additional UI Components
export { Checkbox } from './atomic/atoms/checkbox';
export { Switch } from './atomic/atoms/switch';
export { Slider } from './atomic/atoms/slider';
export { Progress } from './atomic/atoms/progress';
export { Separator } from './atomic/atoms/separator';
export { Skeleton } from './atomic/atoms/skeleton';
export { Spinner } from './atomic/atoms/spinner';
export { Tooltip } from './atomic/atoms/tooltip';

// Navigation components
export { NavigationPreferences } from './atomic/atoms/navigation-preferences';
export { useShell, ShellProvider } from './contexts/shell-context';

// Hooks
export { useDebounce } from './hooks/use-debounce';

// === PROFILE COMPONENTS ===
// Profile Atoms
export { ProfileAvatar, type ProfileAvatarProps } from './atomic/atoms/profile-avatar';
export { ProfileBadge, type ProfileBadgeProps } from './atomic/atoms/profile-badge';
export { ProfileAction, type ProfileActionProps } from './atomic/atoms/profile-action';
export { ProfileStatistic, type ProfileStatisticProps } from './atomic/atoms/profile-statistic';

// Profile Molecules
export { ProfileHeader, type ProfileHeaderProps } from './atomic/molecules/profile-header';
export { ProfileStats, type ProfileStatsProps } from './atomic/molecules/profile-stats';

// Profile Organisms
export { ProfileDashboard, type ProfileDashboardProps } from './atomic/organisms/profile-dashboard';
export { ProfileAvatarWidget, type ProfileAvatarWidgetProps } from './atomic/organisms/profile-avatar-widget';
export { ProfileStatsWidget, type ProfileStatsWidgetProps } from './atomic/organisms/profile-stats-widget';
export { ProfileSpacesWidget, type ProfileSpacesWidgetProps } from './atomic/organisms/profile-spaces-widget';
export { ProfileToolsWidget, type ProfileToolsWidgetProps } from './atomic/organisms/profile-tools-widget';
export { ProfileActivityWidget, type ProfileActivityWidgetProps } from './atomic/organisms/profile-activity-widget';
export { ProfileCalendarWidget, type ProfileCalendarWidgetProps } from './atomic/organisms/profile-calendar-widget';
export { ProfileGhostModeWidget, type ProfileGhostModeWidgetProps } from './atomic/organisms/profile-ghost-mode-widget';
export { ProfileHiveLabWidget, type ProfileHiveLabWidgetProps } from './atomic/organisms/profile-hivelab-widget';
export { ProfileCard, type ProfileCardProps } from './atomic/organisms/profile-card';
export { ProfileSystem, type ProfileSystemProps } from './atomic/organisms/profile-system';

// === SPACES SYSTEM ===
// Space Surface Components
export { HivePostsSurface, type HivePostsSurfaceProps, type HiveSpacePost, type HivePostType } from './atomic/organisms/hive-posts-surface';

// Comment type for posts
export type Comment = {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  parentId?: string;
  replies?: Comment[];
};
export { HiveMembersSurface, type HiveMembersSurfaceProps, type HiveSpaceMember, type HiveMemberRole } from './atomic/organisms/hive-members-surface';
export { HiveEventsSurface, type HiveEventsSurfaceProps, type SpaceEvent, type EventType } from './atomic/organisms/hive-events-surface';
export { HivePinnedSurface, type HivePinnedSurfaceProps, type PinnedItem, type PinnedItemType } from './atomic/organisms/hive-pinned-surface';
export { HiveToolsSurface, type HiveToolsSurfaceProps, type SpaceTool, type ToolType } from './atomic/organisms/hive-tools-surface';

// Space Dashboard
export { SpaceDashboard, type SpaceDashboardProps } from './atomic/organisms/space-dashboard';

// Space Utilities
export { SpaceExploreHub, type SpaceExploreHubProps } from './atomic/organisms/space-explore-hub';
export { SpaceSurfaceErrorBoundary, useSpaceSurfaceErrorHandler } from './atomic/organisms/space-surface-error-boundary';
export { SpaceSurfaceSkeleton } from './atomic/organisms/space-surface-skeleton'; 
