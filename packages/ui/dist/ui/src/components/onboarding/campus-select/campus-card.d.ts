export interface CampusCardProps {
    id: string;
    name: string;
    domain: string;
    status: 'active' | 'coming_soon';
    remainingSpots?: number;
    selected?: boolean;
    onClick?: () => void;
    className?: string;
}
export declare const CampusCard: ({ name, domain, status, remainingSpots, selected, onClick, className }: CampusCardProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=campus-card.d.ts.map