interface PlantNewToolButtonProps {
    space: any;
    onToolInstall?: (elementId: string, configuration?: any) => Promise<void>;
    variant?: 'default' | 'compact' | 'floating';
    className?: string;
    disabled?: boolean;
    showLabel?: boolean;
}
export declare function PlantNewToolButton({ space, onToolInstall, variant, className, disabled, showLabel }: PlantNewToolButtonProps): import("react/jsx-runtime").JSX.Element;
export default PlantNewToolButton;
//# sourceMappingURL=plant-new-tool-button.d.ts.map