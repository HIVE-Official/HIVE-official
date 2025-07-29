import React from 'react';
export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: 'primary' | 'secondary' | 'gold' | 'white';
    variant?: 'spin' | 'pulse' | 'bounce';
}
export declare const Spinner: React.FC<SpinnerProps>;
//# sourceMappingURL=spinner.d.ts.map