import React from 'react';
interface GhostModeCardProps {
    userId?: string;
    isActive?: boolean;
    level?: 'invisible' | 'minimal' | 'selective' | 'normal';
    onToggle?: (enabled: boolean, level?: 'invisible' | 'minimal' | 'selective' | 'normal') => Promise<boolean>;
    onSettings?: () => void;
    className?: string;
}
export declare const GhostModeCard: React.FC<GhostModeCardProps>;
export default GhostModeCard;
//# sourceMappingURL=ghost-mode-card.d.ts.map