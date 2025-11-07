"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCognitiveBudget = useCognitiveBudget;
const react_1 = require("react");
// Leverage monorepo JSON tokens directly
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - JSON import across packages; base tsconfig enables resolveJsonModule
const slot_kit_json_1 = __importDefault(require("../../../tokens/src/topology/slot-kit.json"));
const cognitiveBudgets = slot_kit_json_1.default.cognitiveBudgets;
function useCognitiveBudget(surface) {
    const budget = (0, react_1.useMemo)(() => cognitiveBudgets[surface], [surface]);
    const enforcePinCap = (items, maxPins = (slot_kit_json_1.default.capabilities?.pinned?.maxPins ?? 2)) => {
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
    const getMaxRailWidgets = () => budget?.maxRailWidgets ?? slot_kit_json_1.default.cognitiveBudgets.spaceBoard.maxRailWidgets;
    const getComposerActionCap = () => budget?.composerActions ?? slot_kit_json_1.default.cognitiveBudgets.spaceBoard.composerActions ?? 0;
    return {
        budget,
        enforcePinCap,
        dedupePinsAgainstRail,
        getMaxRailWidgets,
        getComposerActionCap,
    };
}
//# sourceMappingURL=use-cognitive-budget.js.map