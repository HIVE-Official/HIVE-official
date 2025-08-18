interface RoleSelectionProps {
    onNext: (data: {
        isStudentLeader: boolean;
    }) => void;
    onBack?: () => void;
    isLoading?: boolean;
}
export declare function RoleSelection({ onNext, onBack, isLoading, }: RoleSelectionProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=role-selection.d.ts.map