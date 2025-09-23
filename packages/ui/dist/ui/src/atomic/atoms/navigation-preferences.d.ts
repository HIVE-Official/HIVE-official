import * as React from "react";
export interface NavigationPreference {
    id: string;
    label: string;
    description?: string;
    value: boolean | string;
    type: 'boolean' | 'select';
    options?: Array<{
        value: string;
        label: string;
    }>;
}
export interface NavigationPreferencesProps {
    preferences: NavigationPreference[];
    onPreferenceChange: (id: string, value: boolean | string) => void;
    className?: string;
}
declare const NavigationPreferences: React.ForwardRefExoticComponent<NavigationPreferencesProps & React.RefAttributes<HTMLDivElement>>;
export { NavigationPreferences };
//# sourceMappingURL=navigation-preferences.d.ts.map