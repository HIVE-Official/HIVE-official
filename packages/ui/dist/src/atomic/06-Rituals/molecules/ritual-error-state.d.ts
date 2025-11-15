import * as React from 'react';
export interface RitualErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    message?: string;
    onRetry?: () => void;
}
export declare const RitualErrorState: React.FC<RitualErrorStateProps>;
//# sourceMappingURL=ritual-error-state.d.ts.map