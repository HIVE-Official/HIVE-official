"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card } from '../../ui/card.js';
import { Button } from '../../../index.js';
import { Input } from '../../../index.js';
import { Textarea } from '../../../index.js';
import { Badge } from '../../ui/badge.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs.js';
import { Settings, Code, Database, Zap, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../../lib/utils.js';
const ConditionalLogicEditor = ({ elementId, elements, rules, onUpdate }) => {
    const [expandedRules, setExpandedRules] = useState(new Set());
    const addRule = () => {
        const newRule = {
            id: `rule_${Date.now()}`,
            trigger: {
                elementId: '',
                property: 'value',
                operator: 'equals',
                value: ''
            },
            actions: []
        };
        onUpdate([...rules, newRule]);
        setExpandedRules(new Set([...expandedRules, newRule.id]));
    };
    const updateRule = (ruleId, updates) => {
        onUpdate(rules.map(rule => rule.id === ruleId ? { ...rule, ...updates } : rule));
    };
    const deleteRule = (ruleId) => {
        onUpdate(rules.filter(rule => rule.id !== ruleId));
        const newExpanded = new Set(expandedRules);
        newExpanded.delete(ruleId);
        setExpandedRules(newExpanded);
    };
    const addAction = (ruleId) => {
        const rule = rules.find(r => r.id === ruleId);
        if (rule) {
            const newAction = {
                type: 'show',
                targetId: '',
                value: ''
            };
            updateRule(ruleId, {
                actions: [...rule.actions, newAction]
            });
        }
    };
    const updateAction = (ruleId, actionIndex, updates) => {
        const rule = rules.find(r => r.id === ruleId);
        if (rule) {
            const newActions = [...rule.actions];
            newActions[actionIndex] = { ...newActions[actionIndex], ...updates };
            updateRule(ruleId, { actions: newActions });
        }
    };
    const deleteAction = (ruleId, actionIndex) => {
        const rule = rules.find(r => r.id === ruleId);
        if (rule) {
            updateRule(ruleId, {
                actions: rule.actions.filter((_, index) => index !== actionIndex)
            });
        }
    };
    const toggleExpanded = (ruleId) => {
        const newExpanded = new Set(expandedRules);
        if (newExpanded.has(ruleId)) {
            newExpanded.delete(ruleId);
        }
        else {
            newExpanded.add(ruleId);
        }
        setExpandedRules(newExpanded);
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Conditional Logic" }), _jsxs(Button, { size: "sm", onClick: addRule, className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)] hover:bg-[var(--hive-brand-secondary)]/90", children: [_jsx(Plus, { className: "h-4 w-4 mr-1" }), "Add Rule"] })] }), rules.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-[var(--hive-text-tertiary)]", children: [_jsx(Zap, { className: "h-8 w-8 mx-auto mb-2" }), _jsx("p", { children: "No conditional rules defined" }), _jsx("p", { className: "text-sm", children: "Add rules to create dynamic behavior" })] })) : (_jsx("div", { className: "space-y-3", children: rules.map(rule => {
                    const isExpanded = expandedRules.has(rule.id);
                    return (_jsxs(Card, { className: "p-4 bg-[var(--hive-bg-secondary)] border-[var(--hive-border-default)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("button", { onClick: () => toggleExpanded(rule.id), className: "flex items-center gap-2 text-[var(--hive-text-primary)] hover:text-[var(--hive-brand-secondary)] transition-colors duration-200", children: [isExpanded ? (_jsx(ChevronDown, { className: "h-4 w-4" })) : (_jsx(ChevronRight, { className: "h-4 w-4" })), _jsxs("span", { className: "font-medium", children: ["When ", rule.trigger.elementId || 'element', " ", rule.trigger.operator, " \"", rule.trigger.value, "\""] })] }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => deleteRule(rule.id), className: "text-red-400 hover:text-red-300", children: _jsx(Trash2, { className: "h-4 w-4" }) })] }), isExpanded && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-tertiary)] mb-1", children: "Element" }), _jsxs("select", { value: rule.trigger.elementId, onChange: (e) => updateRule(rule.id, {
                                                            trigger: { ...rule.trigger, elementId: e.target.value }
                                                        }), className: "w-full p-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-border-hover)] rounded text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "", children: "Select element..." }), elements.filter(el => el.id !== elementId).map(el => (_jsxs("option", { value: el.id, children: [el.label, " (", el.type, ")"] }, el.id)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-tertiary)] mb-1", children: "Property" }), _jsxs("select", { value: rule.trigger.property, onChange: (e) => updateRule(rule.id, {
                                                            trigger: { ...rule.trigger, property: e.target.value }
                                                        }), className: "w-full p-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-border-hover)] rounded text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "value", children: "Value" }), _jsx("option", { value: "visible", children: "Visible" }), _jsx("option", { value: "enabled", children: "Enabled" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-tertiary)] mb-1", children: "Operator" }), _jsxs("select", { value: rule.trigger.operator, onChange: (e) => updateRule(rule.id, {
                                                            trigger: { ...rule.trigger, operator: e.target.value }
                                                        }), className: "w-full p-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-border-hover)] rounded text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "equals", children: "Equals" }), _jsx("option", { value: "not_equals", children: "Not Equals" }), _jsx("option", { value: "contains", children: "Contains" }), _jsx("option", { value: "greater_than", children: "Greater Than" }), _jsx("option", { value: "less_than", children: "Less Than" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-tertiary)] mb-1", children: "Value" }), _jsx(Input, { value: rule.trigger.value, onChange: (e) => updateRule(rule.id, {
                                                            trigger: { ...rule.trigger, value: e.target.value }
                                                        }), className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]" })] })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h5", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Actions" }), _jsxs(Button, { size: "sm", variant: "outline", onClick: () => addAction(rule.id), className: "border-[var(--hive-border-default)] text-[var(--hive-text-tertiary)] hover:border-[var(--hive-border-hover)] hover:text-[var(--hive-text-secondary)]", children: [_jsx(Plus, { className: "h-3 w-3 mr-1" }), "Add Action"] })] }), _jsx("div", { className: "space-y-2", children: rule.actions.map((action, actionIndex) => (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-2 p-3 bg-[var(--hive-bg-tertiary)] rounded", children: [_jsxs("select", { value: action.type, onChange: (e) => updateAction(rule.id, actionIndex, { type: e.target.value }), className: "p-2 bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-default)] rounded text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "show", children: "Show" }), _jsx("option", { value: "hide", children: "Hide" }), _jsx("option", { value: "enable", children: "Enable" }), _jsx("option", { value: "disable", children: "Disable" }), _jsx("option", { value: "set_value", children: "Set Value" }), _jsx("option", { value: "trigger_api", children: "Trigger API" })] }), _jsxs("select", { value: action.targetId, onChange: (e) => updateAction(rule.id, actionIndex, { targetId: e.target.value }), className: "p-2 bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-default)] rounded text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "", children: "Select target..." }), elements.map(el => (_jsx("option", { value: el.id, children: el.label }, el.id)))] }), (action.type === 'set_value' || action.type === 'trigger_api') && (_jsx(Input, { value: action.value || '', onChange: (e) => updateAction(rule.id, actionIndex, { value: e.target.value }), placeholder: action.type === 'set_value' ? 'New value' : 'API endpoint', className: "bg-[var(--hive-bg-secondary)] border-[var(--hive-border-default)] text-[var(--hive-text-primary)]" })), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => deleteAction(rule.id, actionIndex), className: "text-red-400 hover:text-red-300", children: _jsx(Trash2, { className: "h-3 w-3" }) })] }, actionIndex))) })] })] }))] }, rule.id));
                }) }))] }));
};
const DataBindingEditor = ({ elementId, elements, bindings, onUpdate }) => {
    const addBinding = () => {
        const newBinding = {
            id: `binding_${Date.now()}`,
            sourceType: 'element',
            sourceId: '',
            targetProperty: 'value'
        };
        onUpdate([...bindings, newBinding]);
    };
    const updateBinding = (bindingId, updates) => {
        onUpdate(bindings.map(binding => binding.id === bindingId ? { ...binding, ...updates } : binding));
    };
    const deleteBinding = (bindingId) => {
        onUpdate(bindings.filter(binding => binding.id !== bindingId));
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Data Binding" }), _jsxs(Button, { size: "sm", onClick: addBinding, className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)] hover:bg-[var(--hive-brand-secondary)]/90", children: [_jsx(Plus, { className: "h-4 w-4 mr-1" }), "Add Binding"] })] }), bindings.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-[var(--hive-text-tertiary)]", children: [_jsx(Database, { className: "h-8 w-8 mx-auto mb-2" }), _jsx("p", { children: "No data bindings defined" }), _jsx("p", { className: "text-sm", children: "Connect element properties to data sources" })] })) : (_jsx("div", { className: "space-y-3", children: bindings.map(binding => (_jsxs(Card, { className: "p-4 bg-[var(--hive-bg-secondary)] border-[var(--hive-border-default)]", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-tertiary)] mb-1", children: "Source Type" }), _jsxs("select", { value: binding.sourceType, onChange: (e) => updateBinding(binding.id, { sourceType: e.target.value }), className: "w-full p-2 bg-[var(--hive-bg-tertiary)] border border-[var(--hive-border-default)] rounded text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "element", children: "Element" }), _jsx("option", { value: "api", children: "API Response" }), _jsx("option", { value: "variable", children: "Variable" }), _jsx("option", { value: "formula", children: "Formula" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-tertiary)] mb-1", children: "Source" }), binding.sourceType === 'element' ? (_jsxs("select", { value: binding.sourceId, onChange: (e) => updateBinding(binding.id, { sourceId: e.target.value }), className: "w-full p-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-border-hover)] rounded text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "", children: "Select element..." }), elements.filter(el => el.id !== elementId).map(el => (_jsx("option", { value: el.id, children: el.label }, el.id)))] })) : (_jsx(Input, { value: binding.sourceId, onChange: (e) => updateBinding(binding.id, { sourceId: e.target.value }), placeholder: binding.sourceType === 'api' ? 'API endpoint' :
                                                binding.sourceType === 'variable' ? 'Variable name' :
                                                    'Formula expression', className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]" }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-tertiary)] mb-1", children: "Target Property" }), _jsxs("select", { value: binding.targetProperty, onChange: (e) => updateBinding(binding.id, { targetProperty: e.target.value }), className: "w-full p-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-border-hover)] rounded text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "value", children: "Value" }), _jsx("option", { value: "label", children: "Label" }), _jsx("option", { value: "placeholder", children: "Placeholder" }), _jsx("option", { value: "visible", children: "Visible" }), _jsx("option", { value: "enabled", children: "Enabled" })] })] }), _jsx("div", { className: "flex items-end", children: _jsx(Button, { size: "sm", variant: "ghost", onClick: () => deleteBinding(binding.id), className: "text-red-400 hover:text-red-300", children: _jsx(Trash2, { className: "h-4 w-4" }) }) })] }), binding.sourceType === 'formula' && (_jsxs("div", { className: "mt-3 pt-3 border-t border-[var(--hive-interactive-active)]", children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-tertiary)] mb-1", children: "Formula" }), _jsx(Textarea, { value: binding.transform?.formula || '', onChange: (e) => updateBinding(binding.id, {
                                        transform: { ...binding.transform, formula: e.target.value }
                                    }), placeholder: "e.g., element1.value + element2.value", className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-border-hover)] text-[var(--hive-text-primary)] text-sm", rows: 2 })] }))] }, binding.id))) }))] }));
};
const APIIntegrationEditor = ({ integrations, onUpdate }) => {
    const [expandedIntegrations, setExpandedIntegrations] = useState(new Set());
    const addIntegration = () => {
        const newIntegration = {
            id: `api_${Date.now()}`,
            name: 'New API Integration',
            method: 'GET',
            url: '',
            headers: {},
            trigger: 'manual',
            responseMapping: {}
        };
        onUpdate([...integrations, newIntegration]);
        setExpandedIntegrations(new Set([...expandedIntegrations, newIntegration.id]));
    };
    const updateIntegration = (integrationId, updates) => {
        onUpdate(integrations.map(integration => integration.id === integrationId ? { ...integration, ...updates } : integration));
    };
    const deleteIntegration = (integrationId) => {
        onUpdate(integrations.filter(integration => integration.id !== integrationId));
        const newExpanded = new Set(expandedIntegrations);
        newExpanded.delete(integrationId);
        setExpandedIntegrations(newExpanded);
    };
    const toggleExpanded = (integrationId) => {
        const newExpanded = new Set(expandedIntegrations);
        if (newExpanded.has(integrationId)) {
            newExpanded.delete(integrationId);
        }
        else {
            newExpanded.add(integrationId);
        }
        setExpandedIntegrations(newExpanded);
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "API Integrations" }), _jsxs(Button, { size: "sm", onClick: addIntegration, className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)] hover:bg-[var(--hive-brand-secondary)]/90", children: [_jsx(Plus, { className: "h-4 w-4 mr-1" }), "Add API"] })] }), integrations.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-[var(--hive-text-tertiary)]", children: [_jsx(Database, { className: "h-8 w-8 mx-auto mb-2" }), _jsx("p", { children: "No API integrations defined" }), _jsx("p", { className: "text-sm", children: "Connect to external services and APIs" })] })) : (_jsx("div", { className: "space-y-3", children: integrations.map(integration => {
                    const isExpanded = expandedIntegrations.has(integration.id);
                    return (_jsxs(Card, { className: "p-4 bg-[var(--hive-bg-secondary)] border-[var(--hive-border-default)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("button", { onClick: () => toggleExpanded(integration.id), className: "flex items-center gap-2 text-[var(--hive-text-primary)] hover:text-[var(--hive-brand-secondary)] transition-colors duration-200", children: [isExpanded ? (_jsx(ChevronDown, { className: "h-4 w-4" })) : (_jsx(ChevronRight, { className: "h-4 w-4" })), _jsx("span", { className: "font-medium", children: integration.name }), _jsx(Badge, { variant: "outline", className: "border-[var(--hive-border-default)] text-[var(--hive-text-tertiary)]", children: integration.method })] }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => deleteIntegration(integration.id), className: "text-red-400 hover:text-red-300", children: _jsx(Trash2, { className: "h-4 w-4" }) })] }), isExpanded && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-tertiary)] mb-1", children: "Name" }), _jsx(Input, { value: integration.name, onChange: (e) => updateIntegration(integration.id, { name: e.target.value }), className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-tertiary)] mb-1", children: "Method" }), _jsxs("select", { value: integration.method, onChange: (e) => updateIntegration(integration.id, { method: e.target.value }), className: "w-full p-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-border-hover)] rounded text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "GET", children: "GET" }), _jsx("option", { value: "POST", children: "POST" }), _jsx("option", { value: "PUT", children: "PUT" }), _jsx("option", { value: "DELETE", children: "DELETE" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-tertiary)] mb-1", children: "URL" }), _jsx(Input, { value: integration.url, onChange: (e) => updateIntegration(integration.id, { url: e.target.value }), placeholder: "https://api.example.com/endpoint", className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-tertiary)] mb-1", children: "Headers (JSON)" }), _jsx(Textarea, { value: JSON.stringify(integration.headers, null, 2), onChange: (e) => {
                                                    try {
                                                        const headers = JSON.parse(e.target.value);
                                                        updateIntegration(integration.id, { headers });
                                                    }
                                                    catch (error) {
                                                        // Invalid JSON, ignore for now
                                                    }
                                                }, placeholder: '{"Authorization": "Bearer token", "Content-Type": "application/json"}', className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-border-hover)] text-[var(--hive-text-primary)] text-sm font-mono", rows: 3 })] }), (integration.method === 'POST' || integration.method === 'PUT') && (_jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-tertiary)] mb-1", children: "Request Body" }), _jsx(Textarea, { value: integration.body || '', onChange: (e) => updateIntegration(integration.id, { body: e.target.value }), placeholder: '{"key": "value"}', className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-border-hover)] text-[var(--hive-text-primary)] text-sm font-mono", rows: 3 })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-tertiary)] mb-1", children: "Trigger" }), _jsxs("select", { value: integration.trigger, onChange: (e) => updateIntegration(integration.id, { trigger: e.target.value }), className: "w-full p-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-border-hover)] rounded text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "manual", children: "Manual" }), _jsx("option", { value: "auto", children: "Auto (on load)" }), _jsx("option", { value: "element_change", children: "Element Change" })] })] })] }))] }, integration.id));
                }) }))] }));
};
export const AdvancedElementConfig = ({ elementId, elementType, elements, conditionalRules, dataBindings, apiIntegrations, onUpdateConditionalRules, onUpdateDataBindings, onUpdateAPIIntegrations, className }) => {
    return (_jsxs(Card, { className: cn("p-6 bg-[var(--hive-bg-secondary)] border-[var(--hive-border-default)]", className), children: [_jsxs("div", { className: "flex items-center gap-2 mb-6", children: [_jsx(Settings, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Advanced Configuration" })] }), _jsxs(Tabs, { defaultValue: "conditional", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-[var(--hive-bg-tertiary)]", children: [_jsxs(TabsTrigger, { value: "conditional", className: "data-[state=active]:bg-[var(--hive-brand-secondary)] data-[state=active]:text-[var(--hive-text-inverse)]", children: [_jsx(Zap, { className: "h-4 w-4 mr-2" }), "Logic"] }), _jsxs(TabsTrigger, { value: "data", className: "data-[state=active]:bg-[var(--hive-brand-secondary)] data-[state=active]:text-[var(--hive-text-inverse)]", children: [_jsx(Database, { className: "h-4 w-4 mr-2" }), "Data"] }), _jsxs(TabsTrigger, { value: "api", className: "data-[state=active]:bg-[var(--hive-brand-secondary)] data-[state=active]:text-[var(--hive-text-inverse)]", children: [_jsx(Code, { className: "h-4 w-4 mr-2" }), "APIs"] })] }), _jsx(TabsContent, { value: "conditional", className: "mt-6", children: _jsx(ConditionalLogicEditor, { elementId: elementId, elements: elements, rules: conditionalRules, onUpdate: onUpdateConditionalRules }) }), _jsx(TabsContent, { value: "data", className: "mt-6", children: _jsx(DataBindingEditor, { elementId: elementId, elements: elements, bindings: dataBindings, onUpdate: onUpdateDataBindings }) }), _jsx(TabsContent, { value: "api", className: "mt-6", children: _jsx(APIIntegrationEditor, { integrations: apiIntegrations, onUpdate: onUpdateAPIIntegrations }) })] })] }));
};
export default AdvancedElementConfig;
//# sourceMappingURL=advanced-element-config.js.map