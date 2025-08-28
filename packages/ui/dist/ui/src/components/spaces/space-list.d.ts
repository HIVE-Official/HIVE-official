/**
 * SpaceList - Simple, purpose-built space browsing
 *
 * Replaces the AI "CompleteHIVESpacesSystem" with focused components.
 * Students just want to find and join spaces - that's it.
 */
import { Space } from './simple-space-card';
export interface SpaceListProps {
    spaces: Space[];
    loading?: boolean;
    onJoinSpace?: (spaceId: string) => void;
    onViewSpace?: (spaceId: string) => void;
    userSpaceIds?: string[];
    showSearch?: boolean;
    showViewToggle?: boolean;
    className?: string;
}
export declare function SpaceList({ spaces, loading, onJoinSpace, onViewSpace, userSpaceIds, showSearch, showViewToggle, className }: SpaceListProps): import("react/jsx-runtime").JSX.Element;
export declare function SpaceQuickList({ title, spaces, onViewAll, ...props }: SpaceListProps & {
    title: string;
    onViewAll?: () => void;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=space-list.d.ts.map