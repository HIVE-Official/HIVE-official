import { useMemo } from 'react';
import { slotKit } from '@hive/tokens';

type SurfaceKey = keyof typeof slotKit.cognitiveBudgets;
type CognitiveBudget = Partial<{
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
const cognitiveBudgets = slotKit.cognitiveBudgets as Record<SurfaceKey, CognitiveBudget>;

export interface PinEnforcementResult<T> {
  items: T[];
  trimmed: number;
  reasons: string[];
}

export function useCognitiveBudget(surface: SurfaceKey) {
  const budget = useMemo(() => cognitiveBudgets[surface], [surface]);

  const enforcePinCap = <T,>(items: T[], maxPins = (slotKit.capabilities?.pinned?.maxPins ?? 2)): PinEnforcementResult<T> => {
    const allowed = items.slice(0, maxPins);
    const trimmed = Math.max(items.length - allowed.length, 0);
    const reasons: string[] = [];
    if (trimmed > 0) reasons.push(`pin-cap-exceeded:${maxPins}`);
    return { items: allowed, trimmed, reasons };
  };

  const dedupePinsAgainstRail = <T extends { id?: string }>(pins: T[], railWidgets: Array<{ id?: string }>): T[] => {
    const railIds = new Set(railWidgets.map(w => w.id).filter(Boolean));
    return pins.filter(p => (p?.id ? !railIds.has(p.id) : true));
  };

  const getMaxRailWidgets = () => budget?.maxRailWidgets ?? slotKit.cognitiveBudgets.spaceBoard.maxRailWidgets;
  const getComposerActionCap = () => budget?.composerActions ?? slotKit.cognitiveBudgets.spaceBoard.composerActions ?? 0;

  return {
    budget,
    enforcePinCap,
    dedupePinsAgainstRail,
    getMaxRailWidgets,
    getComposerActionCap,
  } as const;
}
