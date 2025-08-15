import React from 'react';
export interface UBRitual {
    id: string;
    name: string;
    title: string;
    description: string;
    tagline: string;
    type: 'orientation' | 'finals' | 'homecoming' | 'spring_fest' | 'graduation' | 'move_in' | 'club_rush';
    status: 'upcoming' | 'active' | 'completed' | 'archived';
    startTime: string;
    endTime?: string;
    duration?: number;
    participationType: 'individual' | 'dorm' | 'class' | 'campus_wide' | 'club' | 'academic';
    maxParticipants?: number;
    campusLocation?: string;
    ubSpecific: {
        buildings?: string[];
        dorms?: string[];
        departments?: string[];
        campusAreas?: ('north' | 'south' | 'downtown')[];
    };
    metrics: {
        participationRate: number;
        completionRate: number;
        engagementScore: number;
        campusImpact: number;
    };
    rewards?: {
        points: number;
        badges: string[];
        swag?: string[];
    };
}
export interface UBRitualFeedPost {
    id: string;
    type: 'ritual_announcement' | 'ritual_milestone' | 'ritual_completion' | 'ritual_reminder';
    ritual: UBRitual;
    author: {
        id: string;
        name: string;
        handle: string;
        avatar?: string;
        role?: string;
    };
    content: string;
    timestamp: string;
    engagement: {
        likes: number;
        comments: number;
        shares: number;
        participants: number;
    };
    milestone?: {
        achievement: string;
        participantCount: number;
        completionRate: number;
    };
    isParticipating?: boolean;
    hasCompleted?: boolean;
}
export declare const UB_RITUAL_TYPES: {
    orientation: {
        icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        color: string;
        bgColor: string;
        label: string;
        campusArea: string;
    };
    finals: {
        icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        color: string;
        bgColor: string;
        label: string;
        campusArea: string;
    };
    homecoming: {
        icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        color: string;
        bgColor: string;
        label: string;
        campusArea: string;
    };
    spring_fest: {
        icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        color: string;
        bgColor: string;
        label: string;
        campusArea: string;
    };
    graduation: {
        icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        color: string;
        bgColor: string;
        label: string;
        campusArea: string;
    };
    move_in: {
        icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        color: string;
        bgColor: string;
        label: string;
        campusArea: string;
    };
    club_rush: {
        icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        color: string;
        bgColor: string;
        label: string;
        campusArea: string;
    };
};
export declare const UB_PARTICIPATION_TYPES: {
    individual: {
        label: string;
        icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    };
    dorm: {
        label: string;
        icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    };
    class: {
        label: string;
        icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    };
    campus_wide: {
        label: string;
        icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    };
    club: {
        label: string;
        icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    };
    academic: {
        label: string;
        icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    };
};
interface UBRitualFeedCardProps {
    post: UBRitualFeedPost;
    onLike?: (postId: string) => void;
    onComment?: (postId: string) => void;
    onShare?: (postId: string) => void;
    onJoinRitual?: (ritualId: string) => void;
    onViewRitual?: (ritualId: string) => void;
    className?: string;
}
export declare function UBRitualFeedCard({ post, onLike, onComment, onShare, onJoinRitual, onViewRitual, className }: UBRitualFeedCardProps): import("react/jsx-runtime").JSX.Element;
interface UBRitualsFeedIntegrationProps {
    ritualPosts: UBRitualFeedPost[];
    onLike?: (postId: string) => void;
    onComment?: (postId: string) => void;
    onShare?: (postId: string) => void;
    onJoinRitual?: (ritualId: string) => void;
    onViewRitual?: (ritualId: string) => void;
    showHeader?: boolean;
    maxPosts?: number;
    className?: string;
}
export declare function UBRitualsFeedIntegration({ ritualPosts, onLike, onComment, onShare, onJoinRitual, onViewRitual, showHeader, maxPosts, className }: UBRitualsFeedIntegrationProps): import("react/jsx-runtime").JSX.Element;
interface UBRitualFeedFiltersProps {
    selectedTypes: string[];
    selectedParticipation: string[];
    onTypeChange: (types: string[]) => void;
    onParticipationChange: (participation: string[]) => void;
    className?: string;
}
export declare function UBRitualFeedFilters({ selectedTypes, selectedParticipation, onTypeChange, onParticipationChange, className }: UBRitualFeedFiltersProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ub-rituals-feed-integration.d.ts.map