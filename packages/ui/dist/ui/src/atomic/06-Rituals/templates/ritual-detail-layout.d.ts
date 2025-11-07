import * as React from 'react';
import type { RitualDetailView } from '@hive/core';
export interface RitualDetailLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    ritual: RitualDetailView;
    onPrimaryAction?: (href: string) => void;
    onBack?: () => void;
    onTournamentVote?: (matchupId: string, choice: 'a' | 'b') => void;
    onFeatureUnlock?: () => void;
    onLeakReveal?: (clueId: string) => void;
    onLotteryEnter?: () => void;
    onUnlockContribute?: () => void;
    onSurvivalVote?: (matchupId: string, competitorId: string) => void;
}
export declare const RitualDetailLayout: React.ForwardRefExoticComponent<RitualDetailLayoutProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ritual-detail-layout.d.ts.map