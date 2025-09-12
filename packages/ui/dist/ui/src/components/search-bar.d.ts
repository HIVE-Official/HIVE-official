import * as React from 'react';
export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    onSearch?: (query: string) => void;
    placeholder?: string;
    showIcon?: boolean;
}
export declare const SearchBar: React.FC<SearchBarProps>;
//# sourceMappingURL=search-bar.d.ts.map