import React from 'react';
interface ToolReview {
    id: string;
    toolId: string;
    userId: string;
    rating: number;
    title: string;
    content: string;
    pros?: string[];
    cons?: string[];
    useCase?: string;
    verified: boolean;
    helpful: number;
    reported: number;
    status: 'published' | 'pending' | 'hidden';
    createdAt: string;
    updatedAt: string;
    version?: string;
    user?: {
        id: string;
        displayName: string;
        avatar?: string;
        verified: boolean;
    };
}
interface RatingSummary {
    average: number;
    total: number;
    distribution: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
    verifiedCount: number;
}
interface ToolRatingSystemProps {
    toolId: string;
    toolName: string;
    ratingSummary?: RatingSummary;
    reviews?: ToolReview[];
    canReview?: boolean;
    onReviewSubmit?: (review: Partial<ToolReview>) => Promise<void>;
    onReviewHelpful?: (reviewId: string, helpful: boolean) => Promise<void>;
    onReviewReport?: (reviewId: string, reason: string) => Promise<void>;
    className?: string;
}
export declare const ToolRatingSystem: React.FC<ToolRatingSystemProps>;
export default ToolRatingSystem;
//# sourceMappingURL=tool-rating-system.d.ts.map