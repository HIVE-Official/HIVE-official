/**
 * Space Tool Builder
 *
 * ON-BRAND wrapper around HiveLab for creating tools within a space context.
 * This is what space leaders see - NOT a generic builder.
 *
 * ## Design Philosophy
 * - HiveLab = infrastructure (low-level primitives)
 * - SpaceToolBuilder = branded interface (space-contextual)
 * - Always shows which space you're building for
 * - Tools auto-save to the space
 * - Uses space colors and branding
 */
import type { Tool as HiveLabTool } from '../../types/hivelab.types';
export interface SpaceContext {
    id: string;
    name: string;
    emoji: string;
    color: string;
    memberCount: number;
    leaderName: string;
}
export interface SpaceToolBuilderProps {
    /** Space context (REQUIRED - this is the whole point!) */
    space: SpaceContext;
    /** Initial tool being edited (optional for new tools) */
    initialTool?: HiveLabTool;
    /** Save handler - receives tool with spaceId set */
    onSave?: (tool: HiveLabTool) => void;
    /** Preview handler */
    onPreview?: (tool: HiveLabTool) => void;
    /** Exit handler (back to space) */
    onExit?: () => void;
    /** Additional class names */
    className?: string;
}
/**
 * Space Tool Builder with Context Provider
 *
 * THIS is the component spaces use, not HiveLabBuilderLayout.
 */
export declare function SpaceToolBuilder({ space, initialTool, onSave, onPreview, onExit, className, }: SpaceToolBuilderProps): import("react/jsx-runtime").JSX.Element;
export declare namespace SpaceToolBuilder {
    var displayName: string;
}
//# sourceMappingURL=space-tool-builder.d.ts.map