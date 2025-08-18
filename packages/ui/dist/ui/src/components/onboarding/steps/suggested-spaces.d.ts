interface SuggestedSpacesProps {
    onNext: (data: {
        joinedSpaces: string[];
    }) => void;
    onBack?: () => void;
    isLoading?: boolean;
}
export declare function SuggestedSpaces({ onNext, onBack, isLoading, }: SuggestedSpacesProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=suggested-spaces.d.ts.map