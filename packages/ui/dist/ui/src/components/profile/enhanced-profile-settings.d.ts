/**
 * Enhanced Profile Settings - Campus Command Center
 * Integrates ComprehensiveFormField molecule with campus-specific settings
 *
 * Built using HIVE foundation systems and molecules:
 * - ComprehensiveFormField molecule for consistent form patterns
 * - ComprehensiveCard molecule for organized settings sections
 * - NavigationMenu molecule for settings navigation
 * - Campus-specific validation and features
 */
import React from 'react';
export interface ProfileFormData {
    fullName: string;
    handle: string;
    bio: string;
    email: string;
    phone?: string;
    website?: string;
    major: string;
    graduationYear: number;
    dorm?: string;
    roomNumber?: string;
    profileVisibility: 'public' | 'campus' | 'connections' | 'private';
    showEmail: boolean;
    showPhone: boolean;
    showDorm: boolean;
    ghostMode: boolean;
    emailNotifications: boolean;
    spacesNotifications: boolean;
    toolsNotifications: boolean;
    eventsNotifications: boolean;
    connectionRequests: boolean;
    weeklyDigest: boolean;
    enableCalendarSync: boolean;
    enableLocationSharing: boolean;
    enableMutualConnections: boolean;
    enableActivityTracking: boolean;
}
export interface EnhancedProfileSettingsProps {
    user: ProfileFormData;
    isValidating?: boolean;
    validationErrors?: Partial<Record<keyof ProfileFormData, string>>;
    isSaving?: boolean;
    saveSuccess?: boolean;
    saveError?: string;
    showCampusFeatures?: boolean;
    showAdvancedPrivacy?: boolean;
    showNotificationSettings?: boolean;
    onSave: (data: ProfileFormData) => Promise<void>;
    onUploadAvatar?: (file: File) => Promise<string>;
    onDeleteAccount?: () => void;
    className?: string;
}
declare const validationRules: {
    fullName: {
        required: boolean;
        minLength: number;
        pattern: RegExp;
        message: string;
    };
    handle: {
        required: boolean;
        minLength: number;
        maxLength: number;
        pattern: RegExp;
        message: string;
    };
    email: {
        required: boolean;
        pattern: RegExp;
        message: string;
    };
    phone: {
        pattern: RegExp;
        message: string;
    };
    website: {
        pattern: RegExp;
        message: string;
    };
    bio: {
        maxLength: number;
        message: string;
    };
};
declare const validateField: (fieldName: keyof ProfileFormData, value: any) => string | undefined;
declare const privacyLevels: readonly [{
    readonly value: "public";
    readonly label: "Public";
    readonly description: "Visible to everyone on the internet";
    readonly icon: any;
}, {
    readonly value: "campus";
    readonly label: "Campus Only";
    readonly description: "Visible to all UB students and faculty";
    readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}, {
    readonly value: "connections";
    readonly label: "Connections Only";
    readonly description: "Visible only to your campus connections";
    readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}, {
    readonly value: "private";
    readonly label: "Private";
    readonly description: "Only visible to you";
    readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}];
export declare const EnhancedProfileSettings: React.ForwardRefExoticComponent<EnhancedProfileSettingsProps & React.RefAttributes<HTMLDivElement>>;
export type { EnhancedProfileSettingsProps, ProfileFormData };
export { validationRules, validateField, privacyLevels };
//# sourceMappingURL=enhanced-profile-settings.d.ts.map