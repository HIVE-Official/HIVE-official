interface UnseenCountState {
    count: number;
    increment: () => void;
    decrement: () => void;
    setCount: (count: number) => void;
    reset: () => void;
}
export declare const useUnseenCountStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<UnseenCountState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<UnseenCountState, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: UnseenCountState) => void) => () => void;
        onFinishHydration: (fn: (state: UnseenCountState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<UnseenCountState, unknown>>;
    };
}>;
export {};
//# sourceMappingURL=useUnseenCountStore.d.ts.map