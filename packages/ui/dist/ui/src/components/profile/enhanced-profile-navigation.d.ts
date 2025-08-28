/**
 * Enhanced Profile Navigation - Campus Command Center
 * Integrates NavigationMenu molecule with profile-specific navigation patterns
 *
 * Built using HIVE foundation systems and molecules:
 * - NavigationMenu molecule for consistent navigation patterns
 * - Campus-specific navigation presets and features
 * - Cross-slice integration for Profile as Campus Command Center
 */
import React from 'react';
import { type NavigationItem, type NavigationGroup } from '../../atomic/molecules/navigation-menu';
export type ProfileSection = 'overview' | 'activity' | 'spaces' | 'tools' | 'connections' | 'calendar' | 'analytics' | 'settings' | 'privacy';
export interface EnhancedProfileNavigationProps {
    activeSection: ProfileSection;
    onSectionChange: (section: ProfileSection) => void;
    user: {
        isBuilder?: boolean;
        ghostMode?: boolean;
        unreadNotifications?: number;
    };
    showAnalytics?: boolean;
    showBuilderFeatures?: boolean;
    showCampusIntegration?: boolean;
    variant?: 'tabs' | 'sidebar' | 'pills' | 'floating';
    layout?: 'horizontal' | 'vertical';
    size?: 'small' | 'base' | 'large';
    campusOptimized?: boolean;
    className?: string;
}
declare const profileNavigationPresets: {
    readonly mainTabs: (user: {
        isBuilder?: boolean;
        ghostMode?: boolean;
        unreadNotifications?: number;
    }) => NavigationItem[];
    readonly settingsSidebar: (user: {
        ghostMode?: boolean;
    }) => NavigationGroup[];
    readonly mobileNav: (user: {
        isBuilder?: boolean;
    }) => NavigationItem[];
    readonly quickActions: () => NavigationItem[];
    readonly builderTabs: () => NavigationItem[];
};
declare const sectionMetadata: Record<ProfileSection, {
    title: string;
    description: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    campusFeature?: boolean;
}>;
export declare const EnhancedProfileNavigation: React.ForwardRefExoticComponent<EnhancedProfileNavigationProps & React.RefAttributes<HTMLElement>>;
export interface ProfileSectionHeaderProps {
    section: ProfileSection;
    showDescription?: boolean;
    className?: string;
}
export declare const ProfileSectionHeader: React.ForwardRefExoticComponent<ProfileSectionHeaderProps & React.RefAttributes<HTMLDivElement>>;
export type { EnhancedProfileNavigationProps, ProfileSection };
export { profileNavigationPresets, sectionMetadata };
//# sourceMappingURL=enhanced-profile-navigation.d.ts.map