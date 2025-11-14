"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCognitiveBudget = useCognitiveBudget;
const react_1 = require("react");
const tokens_1 = require("@hive/tokens");
const cognitiveBudgets = tokens_1.slotKit.cognitiveBudgets;
function useCognitiveBudget(surface) {
    const budget = (0, react_1.useMemo)(() => cognitiveBudgets[surface], [surface]);
    const enforcePinCap = (items, maxPins = (tokens_1.slotKit.capabilities?.pinned?.maxPins ?? 2)) => {
        const allowed = items.slice(0, maxPins);
        const trimmed = Math.max(items.length - allowed.length, 0);
        const reasons = [];
        if (trimmed > 0)
            reasons.push(`pin-cap-exceeded:${maxPins}`);
        return { items: allowed, trimmed, reasons };
    };
    const dedupePinsAgainstRail = (pins, railWidgets) => {
        const railIds = new Set(railWidgets.map(w => w.id).filter(Boolean));
        return pins.filter(p => (p?.id ? !railIds.has(p.id) : true));
    };
    const getMaxRailWidgets = () => budget?.maxRailWidgets ?? tokens_1.slotKit.cognitiveBudgets.spaceBoard.maxRailWidgets;
    const getComposerActionCap = () => budget?.composerActions ?? tokens_1.slotKit.cognitiveBudgets.spaceBoard.composerActions ?? 0;
    return {
        budget,
        enforcePinCap,
        dedupePinsAgainstRail,
        getMaxRailWidgets,
        getComposerActionCap,
    };
}
//# sourceMappingURL=use-cognitive-budget.js.map