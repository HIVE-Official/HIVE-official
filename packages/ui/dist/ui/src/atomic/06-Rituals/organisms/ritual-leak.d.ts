import * as React from 'react';
export interface LeakSubmission {
    id: string;
    hint: string;
    revealed?: boolean;
}
export interface RitualLeakProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    clues: LeakSubmission[];
    onReveal?: (id: string) => void;
}
export declare const RitualLeak: React.FC<RitualLeakProps>;
//# sourceMappingURL=ritual-leak.d.ts.map