import React from 'react';
interface ConditionalRule {
    id: string;
    trigger: {
        elementId: string;
        property: string;
        operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
        value: any;
    };
    actions: Array<{
        type: 'show' | 'hide' | 'enable' | 'disable' | 'set_value' | 'trigger_api';
        targetId: string;
        value?: any;
        apiEndpoint?: string;
    }>;
}
interface DataBinding {
    id: string;
    sourceType: 'element' | 'api' | 'variable' | 'formula';
    sourceId: string;
    targetProperty: string;
    transform?: {
        type: 'text' | 'number' | 'date' | 'formula';
        formula?: string;
        format?: string;
    };
}
interface APIIntegration {
    id: string;
    name: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    headers: Record<string, string>;
    body?: string;
    trigger: 'manual' | 'auto' | 'element_change';
    triggerElementId?: string;
    responseMapping: Record<string, string>;
}
interface AdvancedElementConfigProps {
    elementId: string;
    elementType: string;
    elements: Array<{
        id: string;
        type: string;
        label: string;
    }>;
    conditionalRules: ConditionalRule[];
    dataBindings: DataBinding[];
    apiIntegrations: APIIntegration[];
    onUpdateConditionalRules: (rules: ConditionalRule[]) => void;
    onUpdateDataBindings: (bindings: DataBinding[]) => void;
    onUpdateAPIIntegrations: (integrations: APIIntegration[]) => void;
    className?: string;
}
export declare const AdvancedElementConfig: React.FC<AdvancedElementConfigProps>;
export default AdvancedElementConfig;
//# sourceMappingURL=advanced-element-config.d.ts.map