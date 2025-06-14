import { create } from 'zustand';
export const useAppStore = create((set) => ({
    theme: 'system',
    setTheme: (theme) => set({ theme }),
}));
//# sourceMappingURL=useAppStore.js.map