interface SpaceClaimingProps {
    onNext: (data: {
        spaceClaims?: Record<string, unknown>[];
    }) => void;
    onBack?: () => void;
    isLoading?: boolean;
    _schoolId: string;
}
export declare function SpaceClaiming({ onNext, onBack, isLoading, _schoolId, }: SpaceClaimingProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=space-claiming.d.ts.map