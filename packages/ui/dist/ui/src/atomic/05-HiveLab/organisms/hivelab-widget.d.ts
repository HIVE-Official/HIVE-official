export interface HiveLabWidgetProps {
    hasAccess?: boolean;
    isSpaceLeader?: boolean;
    toolsCreated?: number;
    toolsUsed?: number;
    leadingSpaces?: Array<{
        id: string;
        name: string;
    }>;
    onRequestAccess?: () => void;
    onOpenStudio?: () => void;
    className?: string;
}
export declare function HiveLabWidget({ hasAccess, isSpaceLeader, toolsCreated, toolsUsed, leadingSpaces, onRequestAccess, onOpenStudio, className, }: HiveLabWidgetProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=hivelab-widget.d.ts.map