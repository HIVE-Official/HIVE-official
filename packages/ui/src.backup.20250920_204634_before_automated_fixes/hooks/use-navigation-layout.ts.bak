// Simple navigation layout hook to fix dependency issues

export type NavigationStyle = 'auto' | 'sidebar' | 'tabs';
export type NavigationMode = 'sidebar' | 'topbar' | 'bottom-tabs' | 'drawer';

interface UseNavigationLayoutProps {
  userPreference?: NavigationStyle;
  onPreferenceChange?: (preference: NavigationStyle) => void;
}

interface UseNavigationLayoutReturn {
  resolvedMode: NavigationMode;
  canUsePreference: boolean;
  reasons: string[];
}

export function useNavigationLayout({
  userPreference = 'auto',
  onPreferenceChange
}: UseNavigationLayoutProps = {}): UseNavigationLayoutReturn {
  // Simple implementation that defaults to sidebar
  // This can be enhanced later with responsive logic
  
  const resolvedMode: NavigationMode = userPreference === 'tabs' ? 'bottom-tabs' : 'sidebar';
  
  return {
    resolvedMode,
    canUsePreference: true,
    reasons: []
  };
}