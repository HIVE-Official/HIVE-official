import React from 'react';
interface Space {
    id: string;
    name: string;
    description: string;
    type: string;
    memberCount: number;
    location?: string;
    status: 'active' | 'dormant' | 'frozen';
    coverImage?: string;
    tags?: string[];
    createdAt: string;
    lastActivity: string;
}
interface SpaceDetailsWidgetProps {
    space: Space;
    membershipRole?: 'member' | 'admin' | 'owner' | null;
    onJoin?: (spaceId: string) => void;
    onLeave?: (spaceId: string) => void;
    onMessage?: (spaceId: string) => void;
    onSettings?: (spaceId: string) => void;
}
export declare const SpaceDetailsWidget: React.FC<SpaceDetailsWidgetProps>;
export default SpaceDetailsWidget;
//# sourceMappingURL=space-details-widget.d.ts.map