export declare const SPACE_CATEGORIES: {
    readonly student: {
        readonly id: "student_organizations";
        readonly title: "Student Spaces";
        readonly subtitle: "Student-led communities & clubs";
        readonly icon: ({ className }: {
            className?: string;
        }) => import("react/jsx-runtime").JSX.Element;
        readonly defaultCount: 120;
    };
    readonly university: {
        readonly id: "university_organizations";
        readonly title: "University Spaces";
        readonly subtitle: "Academic programs & official groups";
        readonly icon: ({ className }: {
            className?: string;
        }) => import("react/jsx-runtime").JSX.Element;
        readonly defaultCount: 180;
    };
    readonly greek: {
        readonly id: "greek_life";
        readonly title: "Greek Life";
        readonly subtitle: "Fraternities & sororities";
        readonly icon: ({ className }: {
            className?: string;
        }) => import("react/jsx-runtime").JSX.Element;
        readonly defaultCount: 23;
    };
    readonly residential: {
        readonly id: "campus_living";
        readonly title: "Residential Life";
        readonly subtitle: "Dorms & living communities";
        readonly icon: ({ className }: {
            className?: string;
        }) => import("react/jsx-runtime").JSX.Element;
        readonly defaultCount: 37;
    };
};
export interface CategoryGridOrganismProps {
    /** Category breakdown data from API */
    categoryBreakdown?: Record<string, number>;
    /** Total spaces count for header */
    totalSpaces?: number;
    /** Custom title override */
    title?: string;
    /** Custom subtitle override */
    subtitle?: string;
    /** Show statistics in header */
    showStats?: boolean;
    /** Grid layout variant */
    variant?: "default" | "compact" | "featured";
    /** Click handler for category selection */
    onCategoryClick?: (categoryId: string) => void;
    /** Loading state */
    isLoading?: boolean;
    /** Custom className */
    className?: string;
}
export declare function CategoryGridOrganism({ categoryBreakdown, totalSpaces, title, subtitle, showStats, variant, onCategoryClick, isLoading, className }: CategoryGridOrganismProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=category-grid-organism.d.ts.map