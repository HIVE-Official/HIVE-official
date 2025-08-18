type Theme = 'light' | 'dark' | 'system';
interface AppState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}
export declare const useAppStore: import("zustand").UseBoundStore<import("zustand").StoreApi<AppState>>;
export {};
//# sourceMappingURL=useAppStore.d.ts.map