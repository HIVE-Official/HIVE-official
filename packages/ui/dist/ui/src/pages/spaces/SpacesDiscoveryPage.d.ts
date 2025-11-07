import { type SpaceCardData } from "./SpaceCard";
export interface SpacesDiscoveryPageProps {
    featuredSpaces?: SpaceCardData[];
    recommendedSpaces?: SpaceCardData[];
    campusName?: string;
    categories?: Array<{
        id: string;
        label: string;
        count?: number;
    }>;
}
export declare function SpacesDiscoveryPage({ campusName, featuredSpaces, recommendedSpaces, categories, }: SpacesDiscoveryPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SpacesDiscoveryPage.d.ts.map