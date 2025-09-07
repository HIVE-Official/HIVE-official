"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthLoading = exports.useIsAuthenticated = exports.useProfile = exports.useUser = exports.useAuthStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const initialState = {
    user: null,
    profile: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};
exports.useAuthStore = (0, zustand_1.create)()((0, middleware_1.devtools)((0, middleware_1.persist)((set) => ({
    ...initialState,
    setUser: (user) => set((_state) => ({
        user,
        isAuthenticated: !!user,
        isLoading: false,
        error: null,
    }), false, 'setUser'),
    setProfile: (profile) => set({ profile }, false, 'setProfile'),
    setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
    setError: (error) => set({ error, isLoading: false }, false, 'setError'),
    updateProfile: (updates) => set((state) => ({
        profile: state.profile
            ? { ...state.profile, ...updates, updatedAt: new Date() }
            : null,
    }), false, 'updateProfile'),
    logout: () => set({
        user: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
    }, false, 'logout'),
    reset: () => set(initialState, false, 'reset'),
}), {
    name: 'hive-auth',
    partialize: (state) => ({
        // Only persist non-sensitive data
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
    }),
}), {
    name: 'AuthStore',
}));
// Selectors for common use cases
const useUser = () => (0, exports.useAuthStore)((state) => state.user);
exports.useUser = useUser;
const useProfile = () => (0, exports.useAuthStore)((state) => state.profile);
exports.useProfile = useProfile;
const useIsAuthenticated = () => (0, exports.useAuthStore)((state) => state.isAuthenticated);
exports.useIsAuthenticated = useIsAuthenticated;
const useAuthLoading = () => (0, exports.useAuthStore)((state) => state.isLoading);
exports.useAuthLoading = useAuthLoading;
//# sourceMappingURL=auth-store.js.map