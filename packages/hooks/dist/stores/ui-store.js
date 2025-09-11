"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGlobalLoading = exports.useToasts = exports.useModal = exports.useMobileMenuOpen = exports.useSidebarOpen = exports.useUIStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
exports.useUIStore = (0, zustand_1.create)()((0, middleware_1.devtools)((set, get) => ({
    // Initial state
    sidebarOpen: true,
    mobileMenuOpen: false,
    commandPaletteOpen: false,
    modals: {},
    confirmDialog: null,
    toasts: [],
    globalLoading: false,
    loadingMessage: null,
    // Sidebar actions
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'toggleSidebar'),
    setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }, false, 'setSidebarOpen'),
    toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }), false, 'toggleMobileMenu'),
    setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }, false, 'setMobileMenuOpen'),
    toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen }), false, 'toggleCommandPalette'),
    // Modal actions
    openModal: (modalId, data) => set((state) => ({
        modals: {
            ...state.modals,
            [modalId]: { id: modalId, isOpen: true, data },
        },
    }), false, 'openModal'),
    closeModal: (modalId) => set((state) => ({
        modals: {
            ...state.modals,
            [modalId]: { ...state.modals[modalId], isOpen: false },
        },
    }), false, 'closeModal'),
    toggleModal: (modalId) => set((state) => ({
        modals: {
            ...state.modals,
            [modalId]: {
                id: modalId,
                isOpen: !state.modals[modalId]?.isOpen,
                data: state.modals[modalId]?.data,
            },
        },
    }), false, 'toggleModal'),
    // Confirm dialog actions
    showConfirm: (config) => set({
        confirmDialog: {
            ...config,
            isOpen: true,
        },
    }, false, 'showConfirm'),
    hideConfirm: () => set({ confirmDialog: null }, false, 'hideConfirm'),
    // Toast actions
    addToast: (toast) => set((state) => ({
        toasts: [
            ...state.toasts,
            {
                ...toast,
                id: `toast-${Date.now()}-${Math.random()}`,
            },
        ],
    }), false, 'addToast'),
    removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
    }), false, 'removeToast'),
    clearToasts: () => set({ toasts: [] }, false, 'clearToasts'),
    // Loading actions
    setGlobalLoading: (globalLoading, loadingMessage = null) => set({ globalLoading, loadingMessage: loadingMessage ?? null }, false, 'setGlobalLoading'),
}), {
    name: 'UIStore',
}));
// Selectors
const useSidebarOpen = () => (0, exports.useUIStore)((state) => state.sidebarOpen);
exports.useSidebarOpen = useSidebarOpen;
const useMobileMenuOpen = () => (0, exports.useUIStore)((state) => state.mobileMenuOpen);
exports.useMobileMenuOpen = useMobileMenuOpen;
const useModal = (modalId) => (0, exports.useUIStore)((state) => state.modals[modalId]);
exports.useModal = useModal;
const useToasts = () => (0, exports.useUIStore)((state) => state.toasts);
exports.useToasts = useToasts;
const useGlobalLoading = () => (0, exports.useUIStore)((state) => state.globalLoading);
exports.useGlobalLoading = useGlobalLoading;
//# sourceMappingURL=ui-store.js.map