import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UnseenCountState {
  count: number;
  increment: () => void;
  decrement: () => void;
  setCount: (count: number) => void;
  reset: () => void;
}

export const useUnseenCountStore = create<UnseenCountState>()(
  persist(
    (set: any) => ({
      count: 0,
      increment: () => set((state: any) => ({ count: state.count + 1 })),
      decrement: () =>
        set((state: any) => ({ count: Math.max(0, state.count - 1) })),
      setCount: (count) => set({ count }),
      reset: () => set({ count: 0 }),
    }),
    {
      name: "hive-unseen-count-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

