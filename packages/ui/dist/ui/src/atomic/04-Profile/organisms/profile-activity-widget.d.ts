import { type PrivacyLevel } from "../../00-Global/molecules/privacy-control";
export type ProfileActivityType = "post" | "comment" | "connection" | "space_join" | "ritual" | "other";
export interface ProfileActivityItem {
    id: string;
    type?: ProfileActivityType;
    title: string;
    spaceName?: string;
    timestamp: string | number | Date;
    engagementCount?: number;
}
export interface ProfileActivityWidgetProps {
    activities: ProfileActivityItem[];
    isOwnProfile?: boolean;
    privacyLevel?: PrivacyLevel;
    onPrivacyChange?: (level: PrivacyLevel) => void;
    onViewAll?: () => void;
    className?: string;
}
export declare function ProfileActivityWidget({ activities, isOwnProfile, privacyLevel, onPrivacyChange, onViewAll, className, }: ProfileActivityWidgetProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=profile-activity-widget.d.ts.map