import React from 'react';
export interface HiveSpace {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    type: 'university' | 'residential' | 'greek' | 'student';
    status: 'active' | 'pending' | 'archived';
    logoUrl?: string;
    bannerUrl?: string;
    primaryColor?: string;
    location?: string;
    building?: string;
    createdAt: string;
    updatedAt: string;
}
export interface UniversitySpace extends HiveSpace {
    type: 'university';
    academic: {
        department: string;
        courseCode?: string;
        credits?: number;
        semester?: string;
        professor?: string;
        schedule?: string;
        isOfficial: boolean;
    };
    enrollment: {
        capacity?: number;
        enrolled: number;
        waitlist?: number;
        status: 'open' | 'waitlist' | 'closed' | 'approval_required';
    };
}
export interface GreekSpace extends HiveSpace {
    type: 'greek';
    organization: {
        council: string;
        chapter: string;
        founded?: number;
        motto?: string;
        colors: string[];
    };
    rush: {
        isActive: boolean;
        startDate?: string;
        endDate?: string;
        nextEvent?: {
            name: string;
            date: string;
            type: 'social' | 'info' | 'interview';
        };
    };
    community: {
        activeMembers: number;
        pledges?: number;
        averageGPA?: number;
        philanthropy?: {
            cause: string;
            raised?: number;
        };
    };
}
export interface ResidentialSpace extends HiveSpace {
    type: 'residential';
    housing: {
        buildingName: string;
        floor?: number;
        wing?: string;
        buildingType: 'dorm' | 'apartment' | 'house';
        capacity: number;
    };
    community: {
        residents: number;
        ra?: {
            name: string;
            contact: string;
        };
        amenities: string[];
    };
}
export interface StudentSpace extends HiveSpace {
    type: 'student';
    creator: {
        name: string;
        year?: string;
        major?: string;
    };
    category: 'club' | 'study' | 'social' | 'hobby' | 'professional';
    requirements?: string[];
}
export type AnySpace = UniversitySpace | GreekSpace | ResidentialSpace | StudentSpace;
export interface HiveSpaceCardProps {
    space: AnySpace;
    currentUser?: {
        id: string;
        major?: string;
        year?: string;
        building?: string;
    };
    mutualConnections?: Array<{
        id: string;
        name: string;
        avatar?: string;
        role?: string;
    }>;
    onJoin?: (space: AnySpace) => void;
    onView?: (space: AnySpace) => void;
    showSocialProof?: boolean;
    variant?: 'default' | 'compact' | 'featured';
    className?: string;
}
export declare const HiveSpaceCard: React.FC<HiveSpaceCardProps>;
export default HiveSpaceCard;
//# sourceMappingURL=hive-space-card.d.ts.map