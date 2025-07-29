import React from 'react';
export interface PrivacySettings {
    ghostMode: {
        enabled: boolean;
        scheduledPrivacy: ScheduledPrivacy[];
        exceptions: PrivacyException[];
        partialVisibility: {
            showInMemberLists: boolean;
            showInSearchResults: boolean;
            showActivityStatus: boolean;
            showLastSeen: boolean;
        };
    };
    socialBoundaries: {
        studyMode: boolean;
        officeHours: OfficeHours[];
        socialEnergyLevel: 'low' | 'medium' | 'high';
        coordinationPreferences: {
            preferredContactMethods: ContactMethod[];
            responseTimeExpectation: 'immediate' | 'hourly' | 'daily' | 'weekly';
            availableForEmergencies: boolean;
        };
    };
    dataControl: {
        activitySharing: {
            shareSpaceActivity: boolean;
            shareCalendarBusy: boolean;
            shareLocationStatus: boolean;
            shareToolUsage: boolean;
        };
        crossCommunityVisibility: boolean;
        searchableProfile: boolean;
        analyticsOptOut: boolean;
    };
}
interface ScheduledPrivacy {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    days: string[];
    privacyLevel: 'ghost' | 'minimal' | 'normal';
}
interface PrivacyException {
    id: string;
    type: 'space' | 'user' | 'emergency';
    target: string;
    permissions: string[];
}
interface OfficeHours {
    start: string;
    end: string;
    days: string[];
}
type ContactMethod = 'hive-message' | 'email' | 'phone' | 'in-person';
interface PrivacyDashboardProps {
    settings: PrivacySettings;
    onSettingsChange: (settings: PrivacySettings) => void;
    className?: string;
}
export declare const PrivacyDashboard: React.FC<PrivacyDashboardProps>;
export default PrivacyDashboard;
//# sourceMappingURL=privacy-dashboard.d.ts.map