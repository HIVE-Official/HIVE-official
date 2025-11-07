import * as React from 'react';
export interface FoundingMember {
    id: string;
    name: string;
    avatarUrl?: string;
}
export interface RitualFoundingClassProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    members: FoundingMember[];
}
export declare const RitualFoundingClass: React.FC<RitualFoundingClassProps>;
//# sourceMappingURL=ritual-founding-class.d.ts.map