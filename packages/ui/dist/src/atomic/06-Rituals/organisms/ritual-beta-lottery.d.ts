import * as React from 'react';
export interface LotteryFeature {
    id: string;
    name: string;
    description: string;
    teaser: {
        video?: string;
        images: string[];
        demo?: string;
    };
}
export interface RitualBetaLotteryProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    feature: LotteryFeature;
    slots: number;
    applicants: number;
    entryDeadline?: string;
    drawingDate?: string;
    hasEntered?: boolean;
    isWinner?: boolean;
    isDrawn?: boolean;
    onEnter?: () => void;
    onViewDemo?: () => void;
}
export declare const RitualBetaLottery: React.FC<RitualBetaLotteryProps>;
//# sourceMappingURL=ritual-beta-lottery.d.ts.map