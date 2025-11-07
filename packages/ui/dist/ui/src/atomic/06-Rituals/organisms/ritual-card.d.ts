import * as React from 'react';
export interface RitualCardProps extends React.HTMLAttributes<HTMLDivElement> {
    ritual: {
        id: string;
        name: string;
        description: string;
        icon?: string;
        progress: number;
        participantCount: number;
        duration: string;
        startDate?: string;
        endDate?: string;
        frequency: string;
        isParticipating: boolean;
        isCompleted?: boolean;
    };
    onJoin?: () => void;
    onViewDetails?: () => void;
    variant?: 'default' | 'featured';
}
/**
 * RitualCard
 *
 * Vertical card for displaying ritual details.
 * Used in grid layouts on rituals page.
 * - Gold gradient for featured
 * - Progress bar
 * - Participant count
 * - Duration and frequency
 */
export declare const RitualCard: React.ForwardRefExoticComponent<RitualCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ritual-card.d.ts.map