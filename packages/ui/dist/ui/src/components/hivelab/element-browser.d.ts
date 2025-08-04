import React from 'react';
export interface ElementDefinition {
    id: string;
    name: string;
    description: string;
    category: ElementCategory;
    type: ElementType;
    version: string;
    author: string;
    authorType: 'hive_team' | 'student' | 'faculty' | 'community';
    props: ElementProp[];
    defaultProps: Record<string, any>;
    icon: React.ComponentType<any>;
    previewComponent: React.ComponentType<any>;
    configComponent: React.ComponentType<any>;
    downloads: number;
    likes: number;
    rating: number;
    ratingCount: number;
    tags: string[];
    complexity: 'beginner' | 'intermediate' | 'advanced';
    isVerified: boolean;
    isPremium: boolean;
    createdAt: Date;
    updatedAt: Date;
    documentation?: string;
    examples?: ElementExample[];
}
export type ElementCategory = 'input' | 'display' | 'action' | 'logic' | 'layout' | 'data' | 'social' | 'media';
export type ElementType = 'text_input' | 'number_input' | 'date_input' | 'button' | 'link' | 'text_display' | 'image' | 'chart' | 'table' | 'list' | 'conditional' | 'loop' | 'api_call' | 'database_query' | 'user_profile' | 'space_feed';
export interface ElementProp {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'select' | 'color' | 'file' | 'array' | 'object';
    label: string;
    description: string;
    required: boolean;
    defaultValue?: any;
    options?: {
        value: any;
        label: string;
    }[];
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        custom?: (value: any) => boolean | string;
    };
}
export interface ElementExample {
    id: string;
    title: string;
    description: string;
    props: Record<string, any>;
    code?: string;
}
interface ElementBrowserProps {
    onElementSelect?: (element: ElementDefinition) => void;
    onElementPreview?: (element: ElementDefinition) => void;
    onElementInstall?: (elementId: string) => void;
    selectedCategories?: ElementCategory[];
    showInstalled?: boolean;
}
export declare function ElementBrowser({ onElementSelect, onElementPreview, onElementInstall, selectedCategories, showInstalled }: ElementBrowserProps): import("react/jsx-runtime").JSX.Element;
export default ElementBrowser;
//# sourceMappingURL=element-browser.d.ts.map