/**
 * Elements-Profile Slice - UI Elements & User Profiles
 *
 * This slice contains core UI elements, design system components,
 * user profile management, and personal dashboard functionality.
 */
// Core UI Elements (Atoms)
export { Button } from '../../atomic/atoms/button.js';
export { ButtonEnhanced } from '../../atomic/atoms/button-enhanced.js';
export { Input } from '../../atomic/atoms/input.js';
export { InputEnhanced } from '../../atomic/atoms/input-enhanced.js';
export { Avatar } from '../../atomic/atoms/avatar.js';
export { Badge } from '../../atomic/atoms/badge.js';
export { Card } from '../../atomic/molecules/card.js';
export { Icon } from '../../atomic/atoms/icon.js';
export { Spinner } from '../../atomic/atoms/spinner.js';
export { Skeleton } from '../../atomic/atoms/skeleton.js';
// Enhanced UI Components (Molecules)
export { FormField } from '../../atomic/molecules/form-field.js';
export { SearchBar } from '../../atomic/molecules/search-bar.js';
export { UserCard } from '../../atomic/molecules/user-card.js';
export { AvatarCard } from '../../atomic/molecules/avatar-card.js';
// Profile Management Components
export { ProfileCard } from '../../atomic/organisms/profile-card.js';
export { ProfileDashboard } from '../../atomic/organisms/profile-dashboard.js';
export { ProfileHeader } from '../../atomic/molecules/profile-header.js';
export { ProfileStats } from '../../atomic/molecules/profile-stats.js';
export { HiveAvatarCard } from '../../components/profile/hive-avatar-card';
export { ProfileIdentityModal } from '../../components/profile/profile-identity-modal';
export { EnhancedPrivacyModal } from '../../components/profile/enhanced-privacy-modal';
// Personal Dashboard & Tools
export { PersonalToolsCard } from '../../components/profile/personal-tools-card';
export { ProfileLoadingSkeleton } from '../../components/profile/profile-loading-skeleton';
export { PersonalDashboard } from '../../components/profile/personal-dashboard';
// Navigation Components
export { HiveNavigation } from '../../atomic/molecules/hive-navigation.js';
export { NavigationVariants } from '../../atomic/molecules/navigation-variants.js';
export { TopNavLayout } from '../../components/navigation/top-nav-layout';
export { CommandNavLayout } from '../../components/navigation/command-nav-layout';
// Brand System Components
export { HiveBrand } from '../../atomic/atoms/hive-brand.js';
export { ColorSystem } from '../../atomic/atoms/color-system.js';
export { Typography } from '../../atomic/atoms/typography.js';
export { PlatformIcons } from '../../atomic/atoms/platform-icons.js';
// Campus Identity Components
export { CampusIdentityHeader } from '../../atomic/molecules/campus-identity-header.js';
// Layout and Structure
export { Header } from '../../atomic/organisms/header.js';
export { AppLayout } from '../../components/app-layout';
export { Container } from '../../atomic/atoms/container.js';
// Hooks for profile and UI state
export { useProfile } from './hooks/use-profile';
export { useEnhancedProfile } from './hooks/use-enhanced-profile';
export { useDashboardData } from './hooks/use-dashboard-data';
export { useUITheme } from './hooks/use-ui-theme';
// Constants and configuration
export { PROFILE_FIELDS, UI_VARIANTS, THEME_CONFIG } from './constants';
//# sourceMappingURL=index.js.map