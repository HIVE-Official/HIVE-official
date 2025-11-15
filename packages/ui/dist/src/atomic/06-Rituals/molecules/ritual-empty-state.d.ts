import * as React from 'react';
export interface RitualEmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: string;
    title?: string;
    message?: string;
    actionLabel?: string;
    onAction?: () => void;
}
export declare const RitualEmptyState: React.FC<RitualEmptyStateProps>;
//# sourceMappingURL=ritual-empty-state.d.ts.map