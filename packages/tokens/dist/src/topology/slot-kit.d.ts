/**
 * Cognitive Budget Tokens - Production UX Constraints
 *
 * Defines maximum counts for UI slots to prevent cognitive overload.
 * These tokens enforce the "slot kit" pattern across HIVE surfaces.
 *
 * @see docs/ux/SPACES_TOPOLOGY.md - Feed-first minimalism principles
 * @see docs/ux/HIVELAB_TOOLS_TOPOLOGY.md - Tool field constraints
 */
export declare const slotKit: {
    readonly cognitiveBudgets: {
        readonly spaceBoard: {
            readonly maxPins: 2;
            readonly maxRailWidgets: 3;
            readonly railNowItems: 5;
            readonly composerActions: 4;
            readonly cardPrimaryCtas: 2;
            readonly sheetQuickActions: 3;
            readonly recommendationCtas: 3;
            readonly toolFields: 8;
            readonly proofExportsPerDay: 1;
        };
        readonly feed: {
            readonly maxRailWidgets: 3;
            readonly recommendationCtas: 3;
        };
        readonly profile: {
            readonly maxRailWidgets: 3;
            readonly cardPrimaryCtas: 2;
        };
        readonly hivelab: {
            readonly toolFields: 12;
            readonly sheetQuickActions: 5;
        };
    };
    readonly capabilities: {
        readonly pinned: {
            readonly maxPins: 2;
        };
    };
};
export type SlotKit = typeof slotKit;
export type CognitiveBudgetSurface = keyof typeof slotKit.cognitiveBudgets;
//# sourceMappingURL=slot-kit.d.ts.map