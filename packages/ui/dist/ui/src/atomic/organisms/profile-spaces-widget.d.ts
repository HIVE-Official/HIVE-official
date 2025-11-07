import { type PrivacyLevel } from "../molecules/privacy-control";
export interface ProfileSpaceItem {
    id: string;
    name: string;
    role?: string;
    memberCount?: number;
    lastActivityAt?: string | number | Date;
    headline?: string;
}
export interface ProfileSpacesWidgetProps {
    spaces: ProfileSpaceItem[];
    isOwnProfile?: boolean;
    privacyLevel?: PrivacyLevel;
    onPrivacyChange?: (level: PrivacyLevel) => void;
    className?: string;
}
export declare function ProfileSpacesWidget({ spaces, isOwnProfile, privacyLevel, onPrivacyChange, className, }: ProfileSpacesWidgetProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=profile-spaces-widget.d.ts.map