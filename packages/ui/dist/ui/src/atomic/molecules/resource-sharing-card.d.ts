import * as React from 'react';
export interface SharedResource {
    id: string;
    title: string;
    type: 'textbook' | 'notes' | 'study-guide' | 'assignment' | 'lab' | 'project' | 'other';
    description: string;
    course: string;
    professor?: string;
    condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
    price?: number;
    availability: 'available' | 'reserved' | 'unavailable';
    image?: string;
    tags: string[];
    owner: {
        id: string;
        name: string;
        avatar?: string;
        rating: number;
        verified: boolean;
    };
    location: string;
    postedDate: Date;
    expiresDate?: Date;
    contactMethod: 'message' | 'email' | 'phone';
    views: number;
    favorites: number;
    isFavorited?: boolean;
}
export interface ResourceSharingCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'resource'> {
    resource: SharedResource;
    compact?: boolean;
    showOwnerInfo?: boolean;
    onContact?: (resourceId: string) => void;
    onFavorite?: (resourceId: string) => void;
    onShare?: (resourceId: string) => void;
    onReport?: (resourceId: string) => void;
    currentUserId?: string;
}
declare const ResourceSharingCard: React.ForwardRefExoticComponent<ResourceSharingCardProps & React.RefAttributes<HTMLDivElement>>;
export interface ResourceGridProps extends React.HTMLAttributes<HTMLDivElement> {
    resources: SharedResource[];
    compact?: boolean;
    columns?: 1 | 2 | 3 | 4;
    showOwnerInfo?: boolean;
    onContact?: (resourceId: string) => void;
    onFavorite?: (resourceId: string) => void;
    onShare?: (resourceId: string) => void;
    currentUserId?: string;
    loading?: boolean;
    emptyMessage?: string;
}
declare const ResourceGrid: React.ForwardRefExoticComponent<ResourceGridProps & React.RefAttributes<HTMLDivElement>>;
export { ResourceSharingCard, ResourceGrid };
//# sourceMappingURL=resource-sharing-card.d.ts.map