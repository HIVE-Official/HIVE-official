import React from 'react';
/**
 * SPEC-COMPLIANT PRESENCE INDICATOR
 *
 * Per SPEC.md:
 * - Online presence with ghost mode support
 * - Three states: Online (green), Away (yellow), Ghost (invisible)
 * - Real-time updates via Firebase presence
 *
 * Behavioral Hook: Creates FOMO when someone is online but you're not connecting
 */
export type PresenceStatus = 'online' | 'away' | 'ghost' | 'offline';
export interface PresenceIndicatorProps {
    status: PresenceStatus;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    lastSeen?: Date;
    className?: string;
}
export declare const PresenceIndicator: React.FC<PresenceIndicatorProps>;
//# sourceMappingURL=presence-indicator.d.ts.map