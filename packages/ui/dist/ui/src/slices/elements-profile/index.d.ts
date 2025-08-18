/**
 * Elements-Profile Slice - UI Elements & User Profiles
 *
 * This slice contains core UI elements, design system components,
 * user profile management, and personal dashboard functionality.
 */
export { Button } from '../../atomic/atoms/button';
export { ButtonEnhanced } from '../../atomic/atoms/button-enhanced';
export { Input } from '../../atomic/atoms/input';
export { InputEnhanced } from '../../atomic/atoms/input-enhanced';
export { Avatar } from '../../atomic/atoms/avatar';
export { Badge } from '../../atomic/atoms/badge';
export { Card } from '../../atomic/molecules/card';
export { Icon } from '../../atomic/atoms/icon';
export { Spinner } from '../../atomic/atoms/spinner';
export { Skeleton } from '../../atomic/atoms/skeleton';
export { FormField } from '../../atomic/molecules/form-field';
export { SearchBar } from '../../atomic/molecules/search-bar';
export { UserCard } from '../../atomic/molecules/user-card';
export { AvatarCard } from '../../atomic/molecules/avatar-card';
export { ProfileCard } from '../../atomic/organisms/profile-card';
export { ProfileDashboard } from '../../atomic/organisms/profile-dashboard';
export { ProfileHeader } from '../../atomic/molecules/profile-header';
export { ProfileStats } from '../../atomic/molecules/profile-stats';
export { HiveAvatarCard } from '../../components/profile/hive-avatar-card';
export { ProfileIdentityModal } from '../../components/profile/profile-identity-modal';
export { EnhancedPrivacyModal } from '../../components/profile/enhanced-privacy-modal';
export { PersonalToolsCard } from '../../components/profile/personal-tools-card';
export { ProfileLoadingSkeleton } from '../../components/profile/profile-loading-skeleton';
export { PersonalDashboard } from '../../components/profile/personal-dashboard';
export { HiveNavigation } from '../../atomic/molecules/hive-navigation';
export { NavigationVariants } from '../../atomic/molecules/navigation-variants';
export { TopNavLayout } from '../../components/navigation/top-nav-layout';
export { CommandNavLayout } from '../../components/navigation/command-nav-layout';
export { HiveBrand } from '../../atomic/atoms/hive-brand';
export { ColorSystem } from '../../atomic/atoms/color-system';
export { Typography } from '../../atomic/atoms/typography';
export { PlatformIcons } from '../../atomic/atoms/platform-icons';
export { CampusIdentityHeader } from '../../atomic/molecules/campus-identity-header';
export { Header } from '../../atomic/organisms/header';
export { AppLayout } from '../../components/app-layout';
export { Container } from '../../atomic/atoms/container';
export type { ProfileData, UserPreferences, DashboardMetrics } from './types';
export { useProfile } from './hooks/use-profile';
export { useEnhancedProfile } from './hooks/use-enhanced-profile';
export { useDashboardData } from './hooks/use-dashboard-data';
export { useUITheme } from './hooks/use-ui-theme';
export { PROFILE_FIELDS, UI_VARIANTS, THEME_CONFIG } from './constants';
//# sourceMappingURL=index.d.ts.map