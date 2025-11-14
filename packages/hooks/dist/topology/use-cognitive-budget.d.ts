import { slotKit } from '@hive/tokens';
type SurfaceKey = keyof typeof slotKit.cognitiveBudgets;
export interface PinEnforcementResult<T> {
    items: T[];
    trimmed: number;
    reasons: string[];
}
export declare function useCognitiveBudget(surface: SurfaceKey): {
    readonly budget: Partial<{
        maxPins: number;
        maxRailWidgets: number;
        railNowItems: number;
        composerActions: number;
        cardPrimaryCtas: number;
        sheetQuickActions: number;
        recommendationCtas: number;
        toolFields: number;
        proofExportsPerDay: number;
    }>;
    readonly enforcePinCap: <T>(items: T[], maxPins?: 2) => PinEnforcementResult<T>;
    readonly dedupePinsAgainstRail: <T extends {
        id?: string;
    }>(pins: T[], railWidgets: Array<{
        id?: string;
    }>) => T[];
    readonly getMaxRailWidgets: () => number;
    readonly getComposerActionCap: () => number;
};
export {};
//# sourceMappingURL=use-cognitive-budget.d.ts.map