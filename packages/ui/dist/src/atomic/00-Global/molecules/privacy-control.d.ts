type PrivacyLevel = "public" | "connections" | "private" | "ghost";
export interface PrivacyControlProps {
    level: PrivacyLevel;
    onLevelChange: (level: PrivacyLevel) => void;
    widgetName?: string;
    compact?: boolean;
    showDescription?: boolean;
    className?: string;
}
export declare function PrivacyControl({ level, onLevelChange, widgetName, compact, showDescription, className, }: PrivacyControlProps): import("react/jsx-runtime").JSX.Element;
export interface BulkPrivacyControlWidget {
    id: string;
    name: string;
    level: PrivacyLevel;
}
export interface BulkPrivacyControlProps {
    widgets: BulkPrivacyControlWidget[];
    onBulkChange: (levels: Record<string, PrivacyLevel>) => void;
    className?: string;
}
export declare function BulkPrivacyControl({ widgets, onBulkChange, className }: BulkPrivacyControlProps): import("react/jsx-runtime").JSX.Element;
export type { PrivacyLevel };
//# sourceMappingURL=privacy-control.d.ts.map