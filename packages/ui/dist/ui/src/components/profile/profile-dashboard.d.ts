import { type UserProfile } from './cards/avatar-card';
import { type CalendarEvent } from './cards/calendar-card';
import { type Notification } from './cards/notifications-card';
import { type Space } from './cards/spaces-card';
import { type GhostModeSettings } from './cards/ghost-mode-card';
import { type Tool, type BuilderStats } from './cards/hive-lab-card';
export interface ProfileDashboardProps {
    userId: string;
    isOwnProfile: boolean;
    className?: string;
}
export interface ProfileData {
    user: UserProfile;
    events: CalendarEvent[];
    notifications: Notification[];
    spaces: Space[];
    recommendedSpaces: Space[];
    ghostModeSettings: GhostModeSettings;
    tools: Tool[];
    builderStats: BuilderStats;
    isBuilder: boolean;
}
export declare function ProfileDashboard({ userId, isOwnProfile, className }: ProfileDashboardProps): import("react/jsx-runtime").JSX.Element;
export declare const defaultProfileDashboardProps: ProfileDashboardProps;
//# sourceMappingURL=profile-dashboard.d.ts.map