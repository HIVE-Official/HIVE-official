/**
 * HiveLab Builder Layout
 *
 * Complete full-screen visual no-code tool builder.
 * Combines toolbar, canvas, element library, and properties panel
 * into a cohesive Figma-like building experience.
 */
import type { Tool } from '../../../../types/hivelab.types';
export interface HiveLabBuilderLayoutProps {
    /** Initial tool (optional, will create empty tool if not provided) */
    initialTool?: Tool;
    /** On save handler */
    onSave?: (tool: Tool) => void;
    /** On run/preview handler */
    onRun?: (tool: Tool) => void;
    /** On export handler */
    onExport?: (tool: Tool) => void;
    /** On import handler */
    onImport?: () => void;
    /** On delete handler */
    onDelete?: (tool: Tool) => void;
    /** Additional class names */
    className?: string;
}
/**
 * HiveLab Builder Layout with Context Provider
 */
export declare function HiveLabBuilderLayout({ initialTool, onSave, onRun, onExport, onImport, onDelete, className, }: HiveLabBuilderLayoutProps): import("react/jsx-runtime").JSX.Element;
export declare namespace HiveLabBuilderLayout {
    var displayName: string;
}
//# sourceMappingURL=hivelab-builder-layout.d.ts.map