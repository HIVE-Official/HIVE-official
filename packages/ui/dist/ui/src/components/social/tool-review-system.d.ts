/**
 * HIVE Tool Review System
 * Complete reviews and ratings for tools in the marketplace
 */
import React from 'react';
export interface ToolReview {
    id: string;
    toolId: string;
    userId: string;
    author: {
        id: string;
        name: string;
        handle: string;
        avatar?: string;
        isVerified?: boolean;
        reviewsCount?: number;
        helpfulVotes?: number;
    };
    rating: number;
    title: string;
    content: string;
    pros?: string[];
    cons?: string[];
    useCase?: string;
    wouldRecommend: boolean;
    timestamp: string;
    lastUpdated?: string;
    isEdited?: boolean;
    helpfulVotes: number;
    unhelpfulVotes: number;
    userVote?: 'helpful' | 'unhelpful' | null;
    replies?: ToolReviewReply[];
    isVerifiedPurchase?: boolean;
    usageDuration?: '1week' | '1month' | '3months' | '6months' | '1year+';
    categories?: string[];
    attachments?: {
        id: string;
        type: 'image' | 'video';
        url: string;
        caption?: string;
    }[];
}
export interface ToolReviewReply {
    id: string;
    reviewId: string;
    userId: string;
    author: {
        id: string;
        name: string;
        handle: string;
        avatar?: string;
        isVerified?: boolean;
        isDeveloper?: boolean;
    };
    content: string;
    timestamp: string;
    isEdited?: boolean;
}
export interface ToolRatingsSummary {
    averageRating: number;
    totalReviews: number;
    distribution: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
    recommendationRate: number;
    verifiedPurchaseRate: number;
    categories: {
        usability: number;
        performance: number;
        design: number;
        value: number;
        support: number;
    };
}
interface ToolReviewSystemProps {
    toolId: string;
    reviews: ToolReview[];
    summary: ToolRatingsSummary;
    currentUserId?: string;
    userReview?: ToolReview;
    onSubmitReview?: (review: Omit<ToolReview, 'id' | 'timestamp' | 'author'>) => Promise<void>;
    onUpdateReview?: (reviewId: string, updates: Partial<ToolReview>) => Promise<void>;
    onDeleteReview?: (reviewId: string) => Promise<void>;
    onVoteReview?: (reviewId: string, vote: 'helpful' | 'unhelpful') => Promise<void>;
    onReplyToReview?: (reviewId: string, content: string) => Promise<void>;
    onReportReview?: (reviewId: string, reason: string) => Promise<void>;
    canReview?: boolean;
    isLoading?: boolean;
    enableFeatureFlag?: boolean;
}
export declare const ToolReviewSystem: React.FC<ToolReviewSystemProps>;
export {};
//# sourceMappingURL=tool-review-system.d.ts.map