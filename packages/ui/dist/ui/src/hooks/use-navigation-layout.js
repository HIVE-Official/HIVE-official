// Simple navigation layout hook to fix dependency issues
export function useNavigationLayout({ userPreference = 'auto', onPreferenceChange } = {}) {
    // Simple implementation that defaults to sidebar
    // This can be enhanced later with responsive logic
    const resolvedMode = userPreference === 'tabs' ? 'bottom-tabs' : 'sidebar';
    return {
        resolvedMode,
        canUsePreference: true,
        reasons: []
    };
}
//# sourceMappingURL=use-navigation-layout.js.map