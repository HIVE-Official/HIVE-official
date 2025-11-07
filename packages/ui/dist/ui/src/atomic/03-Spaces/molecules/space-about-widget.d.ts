import * as React from 'react';
export interface SpaceLeader {
    id: string;
    name: string;
    avatarUrl?: string;
    role: string;
}
export interface SpaceAboutData {
    spaceId: string;
    description: string;
    memberCount: number;
    leaders: SpaceLeader[];
    category?: string;
    createdDate?: string;
    isPublic: boolean;
    isMember?: boolean;
}
export interface SpaceAboutWidgetCallbacks {
    onJoin?: (spaceId: string) => void;
    onLeave?: (spaceId: string) => void;
    onLeaderClick?: (leaderId: string) => void;
}
export interface SpaceAboutWidgetProps extends SpaceAboutWidgetCallbacks, React.HTMLAttributes<HTMLDivElement> {
    data: SpaceAboutData;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
}
export declare const SpaceAboutWidget: React.ForwardRefExoticComponent<SpaceAboutWidgetProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=space-about-widget.d.ts.map