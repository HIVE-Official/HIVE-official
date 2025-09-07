import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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
  // Sidebar & Navigation
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  commandPaletteOpen: boolean;

  // Modals
  modals: Record<string, Modal>;

  // Confirmation Dialog
  confirmDialog: ConfirmDialog | null;

  // Toasts & Notifications
  toasts: Array<{
    id: string;
    title: string;
    description?: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
  }>;

  // Loading states
  globalLoading: boolean;
  loadingMessage: string | null;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;

  // Modal actions
  openModal: (modalId: string, data?: unknown) => void;
  closeModal: (modalId: string) => void;
  toggleModal: (modalId: string) => void;

  // Confirm dialog actions
  showConfirm: (config: Omit<ConfirmDialog, 'isOpen'>) => void;
  hideConfirm: () => void;

  // Toast actions
  addToast: (toast: Omit<UIState['toasts'][0], 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // Loading actions
  setGlobalLoading: (loading: boolean, message?: string | null) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
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
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'toggleSidebar'),
      
      setSidebarOpen: (sidebarOpen) =>
        set({ sidebarOpen }, false, 'setSidebarOpen'),

      toggleMobileMenu: () =>
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }), false, 'toggleMobileMenu'),
      
      setMobileMenuOpen: (mobileMenuOpen) =>
        set({ mobileMenuOpen }, false, 'setMobileMenuOpen'),

      toggleCommandPalette: () =>
        set(
          (state) => ({ commandPaletteOpen: !state.commandPaletteOpen }),
          false,
          'toggleCommandPalette'
        ),

      // Modal actions
      openModal: (modalId, data) =>
        set(
          (state) => ({
            modals: {
              ...state.modals,
              [modalId]: { id: modalId, isOpen: true, data },
            },
          }),
          false,
          'openModal'
        ),

      closeModal: (modalId) =>
        set(
          (state) => ({
            modals: {
              ...state.modals,
              [modalId]: { ...state.modals[modalId], isOpen: false },
            },
          }),
          false,
          'closeModal'
        ),

      toggleModal: (modalId) =>
        set(
          (state) => ({
            modals: {
              ...state.modals,
              [modalId]: {
                id: modalId,
                isOpen: !state.modals[modalId]?.isOpen,
                data: state.modals[modalId]?.data,
              },
            },
          }),
          false,
          'toggleModal'
        ),

      // Confirm dialog actions
      showConfirm: (config) =>
        set(
          {
            confirmDialog: {
              ...config,
              isOpen: true,
            },
          },
          false,
          'showConfirm'
        ),

      hideConfirm: () =>
        set(
          { confirmDialog: null },
          false,
          'hideConfirm'
        ),

      // Toast actions
      addToast: (toast) =>
        set(
          (state) => ({
            toasts: [
              ...state.toasts,
              {
                ...toast,
                id: `toast-${Date.now()}-${Math.random()}`,
              },
            ],
          }),
          false,
          'addToast'
        ),

      removeToast: (id) =>
        set(
          (state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
          }),
          false,
          'removeToast'
        ),

      clearToasts: () =>
        set({ toasts: [] }, false, 'clearToasts'),

      // Loading actions
      setGlobalLoading: (globalLoading, loadingMessage = null) =>
        set({ globalLoading, loadingMessage: loadingMessage ?? null }, false, 'setGlobalLoading'),
    }),
    {
      name: 'UIStore',
    }
  )
);

// Selectors
export const useSidebarOpen = () => useUIStore((state) => state.sidebarOpen);
export const useMobileMenuOpen = () => useUIStore((state) => state.mobileMenuOpen);
export const useModal = (modalId: string) => useUIStore((state) => state.modals[modalId]);
export const useToasts = () => useUIStore((state) => state.toasts);
export const useGlobalLoading = () => useUIStore((state) => state.globalLoading);