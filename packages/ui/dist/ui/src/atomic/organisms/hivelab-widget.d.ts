import React from 'react';
/**
 * SPEC-Compliant HiveLab Widget
 * Per SPEC.md:
 * - Space Leaders ONLY get build access
 * - Locked with teaser for non-leaders
 * - Shows tools created and used
 * - Part of profile display
 */
export interface Tool {
    id: string;
    name: string;
    description: string;
    icon?: string;
    usageCount: number;
    spaceId: string;
    spaceName: string;
    category?: 'utility' | 'social' | 'coordination' | 'fun';
}
export interface HiveLabWidgetProps {
    isSpaceLeader: boolean;
    hasAccess: boolean;
    toolsCreated: number;
    toolsUsed: Tool[];
    leadingSpaces?: Array<{
        id: string;
        name: string;
        memberCount: number;
    }>;
    onRequestAccess?: () => void;
    onOpenStudio?: () => void;
    className?: string;
}
/**
 * HiveLab Widget - Build Anything
 *
 * SPEC Requirements:
 * - Space leaders get full access
 * - Non-leaders see teaser with examples
 * - Shows what weird things students actually build
 * - Creates FOMO for becoming a space leader
 */
export declare const HiveLabWidget: React.FC<HiveLabWidgetProps>;
//# sourceMappingURL=hivelab-widget.d.ts.map