import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useUnseenCountStore = create()(persist((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: Math.max(0, state.count - 1) })),
    setCount: (count) => set({ count }),
    reset: () => set({ count: 0 }),
}), {
    name: "hive-unseen-count-storage",
    storage: createJSONStorage(() => localStorage),
}));
//# sourceMappingURL=useUnseenCountStore.js.map