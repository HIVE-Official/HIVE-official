export interface LoginSchool {
    id: string;
    name: string;
    domain: string;
    location?: string | null;
}
export interface LoginSchoolSelectionCardProps {
    schools: LoginSchool[];
    isLoading?: boolean;
    onSelect?: (school: LoginSchool) => void;
    emptyState?: React.ReactNode;
    subtitle?: string;
}
export declare function LoginSchoolSelectionCard({ schools, isLoading, onSelect, emptyState, subtitle, }: LoginSchoolSelectionCardProps): import("react/jsx-runtime").JSX.Element;
export default LoginSchoolSelectionCard;
//# sourceMappingURL=LoginSchoolSelectionCard.d.ts.map