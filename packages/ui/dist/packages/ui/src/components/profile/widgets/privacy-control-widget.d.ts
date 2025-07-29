import React from 'react';
import { BaseWidgetProps } from '../bento-grid/types';
interface PrivacySettings {
    ghostMode: {
        enabled: boolean;
        scheduledPrivacy: Array<{
            start: string;
            end: string;
            days: string[];
        }>;
        exceptions: string[];
        partialVisibility: {
            showInMemberLists: boolean;
            showInSearchResults: boolean;
            showActivityStatus: boolean;
            showLastSeen: boolean;
        };
    };
    socialBoundaries: {
        studyMode: boolean;
        officeHours: Array<{
            start: string;
            end: string;
            days: string[];
        }>;
        socialEnergyLevel: 'low' | 'medium' | 'high';
        coordinationPreferences: {
            preferredContactMethods: string[];
            responseTimeExpectation: 'immediate' | 'hourly' | 'daily';
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
interface PrivacyControlWidgetProps extends BaseWidgetProps {
    privacySettings: PrivacySettings;
    isLoading?: boolean;
    onPrivacyChange: (settings: PrivacySettings) => void;
    onOpenFullSettings: () => void;
}
export declare const PrivacyControlWidget: React.FC<PrivacyControlWidgetProps>;
export {};
//# sourceMappingURL=privacy-control-widget.d.ts.map