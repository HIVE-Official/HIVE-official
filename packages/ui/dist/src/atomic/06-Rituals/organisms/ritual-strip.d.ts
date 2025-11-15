import * as React from 'react';
export interface RitualStripProps extends React.HTMLAttributes<HTMLDivElement> {
    ritual: {
        id: string;
        name: string;
        description: string;
        icon?: string;
        progress: number;
        participantCount: number;
        timeRemaining?: string;
        isParticipating: boolean;
    };
    onJoin?: () => void;
    onViewDetails?: () => void;
    variant?: 'default' | 'compact';
    showProgress?: boolean;
}
/**
 * RitualStrip
 *
 * Horizontal feed banner for active campus rituals.
 * Shows progress bar, participant count, and join/view CTA.
 * Gold gradient background with glow effect.
 */
export declare const RitualStrip: React.ForwardRefExoticComponent<RitualStripProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ritual-strip.d.ts.map