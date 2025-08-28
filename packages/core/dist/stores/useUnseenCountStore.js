"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUnseenCountStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
exports.useUnseenCountStore = (0, zustand_1.create)()((0, middleware_1.persist)((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: Math.max(0, state.count - 1) })),
    setCount: (count) => set({ count }),
    reset: () => set({ count: 0 }),
}), {
    name: "hive-unseen-count-storage",
    storage: (0, middleware_1.createJSONStorage)(() => localStorage),
}));
//# sourceMappingURL=useUnseenCountStore.js.map