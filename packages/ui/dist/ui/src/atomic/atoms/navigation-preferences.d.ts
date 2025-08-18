export type NavigationStyle = 'auto' | 'sidebar' | 'tabs';
interface NavigationPreferencesProps {
    value: NavigationStyle;
    onChange: (value: NavigationStyle) => void;
    className?: string;
}
export declare function NavigationPreferences({ value, onChange, className }: NavigationPreferencesProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=navigation-preferences.d.ts.map