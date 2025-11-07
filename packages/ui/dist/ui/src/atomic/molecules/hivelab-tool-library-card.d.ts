export interface HiveLabToolLibraryCardProps {
    name: string;
    description: string;
    category?: string;
    installs?: number;
    rating?: number;
    onUse?: () => void;
}
export declare function HiveLabToolLibraryCard({ name, description, category, installs, rating, onUse }: HiveLabToolLibraryCardProps): import("react/jsx-runtime").JSX.Element;
export declare namespace HiveLabToolLibraryCard {
    var displayName: string;
}
//# sourceMappingURL=hivelab-tool-library-card.d.ts.map