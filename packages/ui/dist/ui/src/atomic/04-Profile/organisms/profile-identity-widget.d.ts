import { type PresenceStatus } from "../atoms/presence-indicator";
import { type PrivacyLevel } from "../molecules/privacy-control";
import type { UIProfile } from "./profile-types";
export interface ProfileIdentityWidgetProps {
    profile: UIProfile;
    isOwnProfile?: boolean;
    presenceStatus?: PresenceStatus;
    lastSeen?: Date | string | null;
    campusLabel?: string;
    completionPercentage?: number;
    onEditPhoto?: () => void;
    privacyLevel?: PrivacyLevel;
    onPrivacyChange?: (level: PrivacyLevel) => void;
    className?: string;
}
export declare function ProfileIdentityWidget({ profile, isOwnProfile, presenceStatus, lastSeen, campusLabel, completionPercentage, onEditPhoto, privacyLevel, onPrivacyChange, className, }: ProfileIdentityWidgetProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=profile-identity-widget.d.ts.map