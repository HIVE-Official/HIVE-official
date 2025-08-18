import React from 'react';
export interface SearchBarProps {
    placeholder?: string;
    value?: string;
    loading?: boolean;
    clearable?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'ghost' | 'filled';
    className?: string;
    onSearch?: (query: string) => void;
    onChange?: (value: string) => void;
    onClear?: () => void;
}
export declare const SearchBar: React.FC<SearchBarProps>;
//# sourceMappingURL=search-bar.d.ts.map