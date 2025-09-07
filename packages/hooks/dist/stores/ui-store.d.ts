interface Modal {
    id: string;
    isOpen: boolean;
    data?: unknown;
}
interface ConfirmDialog {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    variant: 'default' | 'warning' | 'destructive';
    onConfirm: () => void;
    onCancel?: () => void;
}
interface UIState {
    sidebarOpen: boolean;
    mobileMenuOpen: boolean;
    commandPaletteOpen: boolean;
    modals: Record<string, Modal>;
    confirmDialog: ConfirmDialog | null;
    toasts: Array<{
        id: string;
        title: string;
        description?: string;
        type: 'success' | 'error' | 'info' | 'warning';
        duration?: number;
    }>;
    globalLoading: boolean;
    loadingMessage: string | null;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    toggleMobileMenu: () => void;
    setMobileMenuOpen: (open: boolean) => void;
    toggleCommandPalette: () => void;
    openModal: (modalId: string, data?: unknown) => void;
    closeModal: (modalId: string) => void;
    toggleModal: (modalId: string) => void;
    showConfirm: (config: Omit<ConfirmDialog, 'isOpen'>) => void;
    hideConfirm: () => void;
    addToast: (toast: Omit<UIState['toasts'][0], 'id'>) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
    setGlobalLoading: (loading: boolean, message?: string | null) => void;
}
export declare const useUIStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<UIState>, "setState" | "devtools"> & {
    setState(partial: UIState | Partial<UIState> | ((state: UIState) => UIState | Partial<UIState>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: UIState | ((state: UIState) => UIState), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}>;
export declare const useSidebarOpen: () => boolean;
export declare const useMobileMenuOpen: () => boolean;
export declare const useModal: (modalId: string) => Modal;
export declare const useToasts: () => {
    id: string;
    title: string;
    description?: string;
    type: "success" | "error" | "info" | "warning";
    duration?: number;
}[];
export declare const useGlobalLoading: () => boolean;
export {};
//# sourceMappingURL=ui-store.d.ts.map