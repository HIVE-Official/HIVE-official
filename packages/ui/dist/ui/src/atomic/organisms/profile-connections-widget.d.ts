import { type PrivacyLevel } from "../molecules/privacy-control";
export interface ProfileConnectionItem {
    id: string;
    name: string;
    avatarUrl?: string | null;
    isFriend?: boolean;
    sharedSpaces?: string[];
    connectionStrength?: number;
}
export interface ProfileConnectionsWidgetProps {
    connections: ProfileConnectionItem[];
    isOwnProfile?: boolean;
    privacyLevel?: PrivacyLevel;
    onPrivacyChange?: (level: PrivacyLevel) => void;
    className?: string;
}
export declare function ProfileConnectionsWidget({ connections, isOwnProfile, privacyLevel, onPrivacyChange, className, }: ProfileConnectionsWidgetProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=profile-connections-widget.d.ts.map