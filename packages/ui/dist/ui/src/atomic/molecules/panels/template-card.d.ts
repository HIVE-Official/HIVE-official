/**
 * Template Card Component
 *
 * Card showing a pre-built tool template in the template browser.
 * Users can select templates to start building from.
 */
export interface ToolTemplate {
    /** Template ID */
    id: string;
    /** Template name */
    name: string;
    /** Description */
    description: string;
    /** Category */
    category: string;
    /** Thumbnail image URL */
    thumbnail?: string;
    /** Number of elements */
    elementCount: number;
    /** Number of pages */
    pageCount: number;
    /** Usage count (popularity) */
    usageCount?: number;
    /** Tags */
    tags?: string[];
    /** Created by (author) */
    createdBy?: string;
}
export interface TemplateCardProps {
    /** Template data */
    template: ToolTemplate;
    /** Is this template selected? */
    isSelected?: boolean;
    /** Click handler */
    onClick?: (template: ToolTemplate) => void;
    /** Preview handler */
    onPreview?: (template: ToolTemplate) => void;
    /** Use template handler */
    onUse?: (template: ToolTemplate) => void;
    /** Additional class names */
    className?: string;
}
export declare function TemplateCard({ template, isSelected, onClick, onPreview, onUse, className, }: TemplateCardProps): import("react/jsx-runtime").JSX.Element;
export declare namespace TemplateCard {
    var displayName: string;
}
//# sourceMappingURL=template-card.d.ts.map