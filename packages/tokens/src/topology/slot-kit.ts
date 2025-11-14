/**
 * Cognitive Budget Tokens - Production UX Constraints
 *
 * Defines maximum counts for UI slots to prevent cognitive overload.
 * These tokens enforce the "slot kit" pattern across HIVE surfaces.
 *
 * @see docs/ux/SPACES_TOPOLOGY.md - Feed-first minimalism principles
 * @see docs/ux/HIVELAB_TOOLS_TOPOLOGY.md - Tool field constraints
 */

export const slotKit = {
  cognitiveBudgets: {
    spaceBoard: {
      maxPins: 2,
      maxRailWidgets: 3,
      railNowItems: 5,
      composerActions: 4,
      cardPrimaryCtas: 2,
      sheetQuickActions: 3,
      recommendationCtas: 3,
      toolFields: 8,
      proofExportsPerDay: 1,
    },
    feed: {
      maxRailWidgets: 3,
      recommendationCtas: 3,
    },
    profile: {
      maxRailWidgets: 3,
      cardPrimaryCtas: 2,
    },
    hivelab: {
      toolFields: 12,
      sheetQuickActions: 5,
    },
  },
  capabilities: {
    pinned: {
      maxPins: 2,
    },
  },
} as const;

export type SlotKit = typeof slotKit;
export type CognitiveBudgetSurface = keyof typeof slotKit.cognitiveBudgets;
