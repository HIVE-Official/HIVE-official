import React from 'react';
/**
 * SPEC-COMPLIANT PRIVACY CONTROL
 *
 * Per SPEC.md:
 * - Three-tier privacy system: Visible, Private, Ghost
 * - Per-widget granular controls
 * - Psychological safety through perceived control
 *
 * Behavioral Design: Giving control reduces anxiety about sharing
 */
export type PrivacyLevel = 'public' | 'connections' | 'private' | 'ghost';
export interface PrivacyControlProps {
    level: PrivacyLevel;
    onLevelChange: (level: PrivacyLevel) => void;
    widgetName?: string;
    compact?: boolean;
    showDescription?: boolean;
    className?: string;
}
export declare const PrivacyControl: React.FC<PrivacyControlProps>;
/**
 * Bulk privacy controls for managing multiple widgets at once
 */
export interface BulkPrivacyControlProps {
    widgets: Array<{
        id: string;
        name: string;
        level: PrivacyLevel;
    }>;
    onBulkChange: (updates: Record<string, PrivacyLevel>) => void;
    className?: string;
}
export declare const BulkPrivacyControl: React.FC<BulkPrivacyControlProps>;
//# sourceMappingURL=privacy-control.d.ts.map