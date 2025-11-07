export type ActionBarProps = {
    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
    counts?: {
        likes?: number;
        comments?: number;
        shares?: number;
    };
};
export declare function ActionBar({ onLike, onComment, onShare, counts }: ActionBarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=action-bar.d.ts.map