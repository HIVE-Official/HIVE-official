import * as React from "react";
export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onSearch?: (value: string) => void;
    isLoading?: boolean;
    showShortcut?: boolean;
}
declare const SearchBar: React.ForwardRefExoticComponent<SearchBarProps & React.RefAttributes<HTMLInputElement>>;
export { SearchBar };
//# sourceMappingURL=search-bar.d.ts.map