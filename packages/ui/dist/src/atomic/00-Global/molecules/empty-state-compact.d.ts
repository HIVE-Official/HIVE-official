import * as React from 'react';
export interface EmptyStateCompactProps {
    /**
     * Optional icon shown above the text
     */
    icon?: React.ReactNode;
    /**
     * Primary heading copy
     */
    title: string;
    /**
     * Supporting copy below the title
     */
    description?: string;
    /**
     * Optional action button label
     */
    actionLabel?: string;
    /**
     * Handler fired when the action button is pressed
     */
    onAction?: () => void;
    /**
     * Additional class name overrides
     */
    className?: string;
}
export declare const EmptyStateCompact: React.ForwardRefExoticComponent<EmptyStateCompactProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=empty-state-compact.d.ts.map