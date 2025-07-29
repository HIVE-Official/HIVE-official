import React from 'react';
interface Template {
    id: string;
    name: string;
    description: string;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    usageCount: number;
    rating: number;
    estimatedTime: number;
    tags: string[];
    author: {
        name: string;
        handle: string;
    };
    featured: boolean;
    icon: React.ElementType;
}
interface TemplateModeProps {
    onSelectTemplate: (template: Template) => void;
    className?: string;
}
export declare const TemplateMode: React.FC<TemplateModeProps>;
export default TemplateMode;
//# sourceMappingURL=template-mode.d.ts.map