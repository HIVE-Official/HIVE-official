import { CampusCardProps } from './campus-card';
export type Campus = Omit<CampusCardProps, 'selected' | 'onClick' | 'className'>;
export interface CampusSelectorProps {
    campuses: Campus[];
    selectedCampusId?: string;
    onSelect: (campus: Campus) => void;
    className?: string;
}
export declare const CampusSelector: ({ campuses, selectedCampusId, onSelect, className }: CampusSelectorProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=campus-selector.d.ts.map