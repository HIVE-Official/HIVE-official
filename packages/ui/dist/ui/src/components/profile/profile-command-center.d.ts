/**
 * ProfileCommandCenter - Campus Command Center for UB Students
 *
 * The Profile is NOT a social media profile - it's a functional command center
 * that connects students to their campus communities through:
 * 1. Active spaces with quick access
 * 2. Tools they've built and their community impact
 * 3. Recent activity and coordination opportunities
 * 4. Calendar integration for campus events
 */
export interface ProfileUser {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    major?: string;
    year?: string;
    location?: string;
}
export interface ActiveSpace {
    id: string;
    name: string;
    memberCount: number;
    recentActivity?: string;
    unreadCount?: number;
}
export interface BuiltTool {
    id: string;
    name: string;
    category: string;
    usageCount: number;
    spaceContext?: string;
}
export interface RecentActivity {
    id: string;
    type: 'post' | 'tool_shared' | 'space_joined' | 'event_created';
    content: string;
    timestamp: string;
    spaceContext?: string;
}
export interface UpcomingEvent {
    id: string;
    title: string;
    time: string;
    location?: string;
    spaceContext?: string;
}
export interface ProfileCommandCenterProps {
    user: ProfileUser;
    activeSpaces: ActiveSpace[];
    builtTools: BuiltTool[];
    recentActivity: RecentActivity[];
    upcomingEvents: UpcomingEvent[];
    onViewSpace?: (spaceId: string) => void;
    onViewTool?: (toolId: string) => void;
    onJoinSpace?: () => void;
    onCreateTool?: () => void;
    onViewAllActivity?: () => void;
    onViewCalendar?: () => void;
    className?: string;
}
export declare function ProfileCommandCenter({ user, activeSpaces, builtTools, recentActivity, upcomingEvents, onViewSpace, onViewTool, onJoinSpace, onCreateTool, onViewAllActivity, onViewCalendar, className }: ProfileCommandCenterProps): import("react/jsx-runtime").JSX.Element;
export declare function ProfileCommandCenterCompact({ user, activeSpaces, builtTools, className }: Pick<ProfileCommandCenterProps, 'user' | 'activeSpaces' | 'builtTools' | 'className'>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=profile-command-center.d.ts.map