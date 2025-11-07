/**
 * SearchBar - Global search input component
 *
 * Features:
 * - Fuzzy search across posts/spaces/people
 * - Debounced input (300ms)
 * - Keyboard shortcut (Cmd+F) support
 * - Loading state indicator
 * - Clear button
 *
 * Usage:
 * ```tsx
 * import { SearchBar } from '@hive/ui';
 *
 * const [query, setQuery] = useState('');
 * const [isLoading, setIsLoading] = useState(false);
 *
 * <SearchBar
 *   value={query}
 *   onChange={setQuery}
 *   onSearch={(q) => performSearch(q)}
 *   placeholder="Search posts, spaces, people..."
 *   isLoading={isLoading}
 * />
 * ```
 */
import * as React from 'react';
export interface SearchBarProps {
    /**
     * Current search value
     */
    value: string;
    /**
     * Callback when value changes (immediate)
     */
    onChange: (value: string) => void;
    /**
     * Callback when search is executed (debounced)
     */
    onSearch?: (query: string) => void;
    /**
     * Placeholder text
     * @default "Search posts, spaces, people..."
     */
    placeholder?: string;
    /**
     * Loading state
     */
    isLoading?: boolean;
    /**
     * Debounce delay in ms
     * @default 300
     */
    debounceMs?: number;
    /**
     * Additional class names
     */
    className?: string;
    /**
     * Size variant
     */
    size?: 'sm' | 'md' | 'lg';
}
export declare const SearchBar: React.ForwardRefExoticComponent<SearchBarProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=search-bar.d.ts.map