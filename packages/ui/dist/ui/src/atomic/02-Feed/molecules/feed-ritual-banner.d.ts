/**
 * FeedRitualBanner - Ritual promotion banner for feed
 *
 * Features:
 * - Full-width ritual promotion card
 * - Gold accent (one of the allowed use cases!)
 * - Progress bar showing participation
 * - CTA button to join ritual
 * - Sparkles icon for ritual identity
 *
 * Usage:
 * ```tsx
 * import { FeedRitualBanner } from '@hive/ui';
 *
 * <FeedRitualBanner
 *   title="Morning Check-in"
 *   description="Start your day with 2 minutes of reflection"
 *   progress={65}
 *   totalParticipants={432}
 *   onJoin={() => handleJoinRitual()}
 *   isParticipating={false}
 * />
 * ```
 */
import * as React from 'react';
export interface FeedRitualBannerProps {
    /**
     * Ritual title
     */
    title: string;
    /**
     * Ritual description
     */
    description: string;
    /**
     * Participation progress (0-100)
     */
    progress: number;
    /**
     * Total number of participants
     */
    totalParticipants: number;
    /**
     * Whether current user is participating
     */
    isParticipating: boolean;
    /**
     * Callback when user clicks join/participate
     */
    onJoin: () => void;
    /**
     * Optional ritual icon URL
     */
    iconUrl?: string;
    /**
     * Additional class names
     */
    className?: string;
    /**
     * Loading state for join action
     */
    isLoading?: boolean;
}
export declare const FeedRitualBanner: React.ForwardRefExoticComponent<FeedRitualBannerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=feed-ritual-banner.d.ts.map