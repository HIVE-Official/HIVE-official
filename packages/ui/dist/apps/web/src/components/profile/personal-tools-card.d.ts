interface PersonalToolsCardProps {
    className?: string;
    variant?: 'desktop' | 'mobile';
    onToolClick?: (toolId: string) => void;
    onManageTools?: () => void;
    onAddTools?: () => void;
}
export declare function PersonalToolsCard({ className, variant, onToolClick, onManageTools, onAddTools }: PersonalToolsCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=personal-tools-card.d.ts.map