import * as React from "react";
export interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    onClear?: () => void;
    suggestions?: SearchSuggestion[];
    onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
    isLoading?: boolean;
    debounceMs?: number;
    className?: string;
    disabled?: boolean;
    autoFocus?: boolean;
}
export interface SearchSuggestion {
    id: string;
    label: string;
    description?: string;
    type?: string;
    metadata?: Record<string, any>;
}
export declare const SearchBar: React.ForwardRefExoticComponent<SearchBarProps & React.RefAttributes<HTMLInputElement>>;
export declare const SearchBarPresets: {
    GlobalSearch: (props: Omit<SearchBarProps, "placeholder">) => import("react/jsx-runtime").JSX.Element;
    SpaceSearch: (props: Omit<SearchBarProps, "placeholder">) => import("react/jsx-runtime").JSX.Element;
    ToolSearch: (props: Omit<SearchBarProps, "placeholder">) => import("react/jsx-runtime").JSX.Element;
    MemberSearch: (props: Omit<SearchBarProps, "placeholder">) => import("react/jsx-runtime").JSX.Element;
};
export { SearchBar as SearchBarMolecule };
//# sourceMappingURL=search-bar.d.ts.map