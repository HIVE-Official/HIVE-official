import { type ProfileActivityItem, type ProfileSpaceItem, type ProfileConnectionItem } from "../organisms/profile-widgets";
import type { ProfileSystem } from "@hive/core/types/profile-system";
import type { PrivacyLevel } from "../../00-Global/molecules/privacy-control";
export interface ProfileViewLayoutProps {
    profile: ProfileSystem;
    isOwnProfile?: boolean;
    activities?: ProfileActivityItem[];
    spaces?: ProfileSpaceItem[];
    connections?: ProfileConnectionItem[];
    isSpaceLeader?: boolean;
    hasHiveLabAccess?: boolean;
    toolsCreated?: number;
    leadingSpaces?: Array<{
        id: string;
        name: string;
    }>;
    onEditPhoto?: () => void;
    onPrivacyChange?: (widget: string, level: PrivacyLevel) => void;
    onStepClick?: (stepId: string) => void;
    onRequestHiveLabAccess?: () => void;
    onOpenHiveLab?: () => void;
    className?: string;
}
export declare function ProfileViewLayout({ profile, isOwnProfile, activities, spaces, connections, isSpaceLeader, hasHiveLabAccess, toolsCreated, leadingSpaces, onEditPhoto, onPrivacyChange, onStepClick, onRequestHiveLabAccess, onOpenHiveLab, className, }: ProfileViewLayoutProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=profile-view-layout.d.ts.map