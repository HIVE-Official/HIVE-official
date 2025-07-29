// HIVE Element Library - Complete Implementation
// All 12 elements following HIVE design system standards
// Export all element components
export { default as ChoiceSelect } from './choice-select';
export { default as Stack, StackItem } from './stack';
export { default as ConditionGate, useConditionGate } from './condition-gate';
export { default as PingTrigger, usePingTriggerManager } from './ping-trigger';
// Export existing elements (assumed to be implemented)
export { default as TextBlock } from './text-block';
export { default as Button } from './button';
export { default as TextInput } from './text-input';
export { default as Divider } from './divider';
export { default as ImageBlock } from './image-block';
export { default as ProgressBar } from './progress-bar';
export { default as CountdownTimer } from './countdown-timer';
export { default as RatingStars } from './rating-stars';
// Element registry for dynamic loading
export const ELEMENT_REGISTRY = {
    // Display & Layout
    'textBlock-v1': () => import('./text-block'),
    'imageBlock-v1': () => import('./image-block'),
    'divider-v1': () => import('./divider'),
    'stack-v1': () => import('./stack'),
    // Inputs & Choices
    'button-v1': () => import('./button'),
    'choiceSelect-v1': () => import('./choice-select'),
    'textInput-v1': () => import('./text-input'),
    'ratingStars-v1': () => import('./rating-stars'),
    // Logic & Dynamics
    'countdownTimer-v1': () => import('./countdown-timer'),
    'progressBar-v1': () => import('./progress-bar'),
    'conditionGate-v1': () => import('./condition-gate'),
    'pingTrigger-v1': () => import('./ping-trigger'),
};
// Element metadata for builder UI
export const ELEMENT_METADATA = {
    'textBlock-v1': {
        name: 'Text Block',
        category: 'Display & Layout',
        description: 'Rich text display with formatting options',
        icon: 'Type',
        tags: ['text', 'content', 'display']
    },
    'imageBlock-v1': {
        name: 'Image Block',
        category: 'Display & Layout',
        description: 'Image display with captions and styling',
        icon: 'Image',
        tags: ['image', 'media', 'visual']
    },
    'divider-v1': {
        name: 'Divider',
        category: 'Display & Layout',
        description: 'Visual separator with customizable styling',
        icon: 'Minus',
        tags: ['separator', 'layout', 'spacing']
    },
    'stack-v1': {
        name: 'Stack',
        category: 'Display & Layout',
        description: 'Layout container for organizing elements',
        icon: 'Layers',
        tags: ['layout', 'container', 'organization']
    },
    'button-v1': {
        name: 'Button',
        category: 'Inputs & Choices',
        description: 'Interactive button with click handling',
        icon: 'MousePointer',
        tags: ['button', 'action', 'interactive']
    },
    'choiceSelect-v1': {
        name: 'Choice Select',
        category: 'Inputs & Choices',
        description: 'Multi-select dropdown with search',
        icon: 'ChevronDown',
        tags: ['select', 'dropdown', 'choice']
    },
    'textInput-v1': {
        name: 'Text Input',
        category: 'Inputs & Choices',
        description: 'Text input field with validation',
        icon: 'Edit3',
        tags: ['input', 'text', 'form']
    },
    'ratingStars-v1': {
        name: 'Rating Stars',
        category: 'Inputs & Choices',
        description: 'Star rating component with interaction',
        icon: 'Star',
        tags: ['rating', 'feedback', 'stars']
    },
    'countdownTimer-v1': {
        name: 'Countdown Timer',
        category: 'Logic & Dynamics',
        description: 'Real-time countdown with completion events',
        icon: 'Clock',
        tags: ['timer', 'countdown', 'time']
    },
    'progressBar-v1': {
        name: 'Progress Bar',
        category: 'Logic & Dynamics',
        description: 'Progress indicator with animations',
        icon: 'BarChart3',
        tags: ['progress', 'indicator', 'status']
    },
    'conditionGate-v1': {
        name: 'Condition Gate',
        category: 'Logic & Dynamics',
        description: 'Conditional logic controller for dynamic behavior',
        icon: 'GitBranch',
        tags: ['logic', 'conditional', 'control']
    },
    'pingTrigger-v1': {
        name: 'Ping Trigger',
        category: 'Logic & Dynamics',
        description: 'Event trigger for integrations and actions',
        icon: 'Zap',
        tags: ['trigger', 'event', 'integration']
    }
};
// Element categories for organization
export const ELEMENT_CATEGORIES = {
    'Display & Layout': [
        'textBlock-v1',
        'imageBlock-v1',
        'divider-v1',
        'stack-v1'
    ],
    'Inputs & Choices': [
        'button-v1',
        'choiceSelect-v1',
        'textInput-v1',
        'ratingStars-v1'
    ],
    'Logic & Dynamics': [
        'countdownTimer-v1',
        'progressBar-v1',
        'conditionGate-v1',
        'pingTrigger-v1'
    ]
};
// Utility functions
export const getElementsByCategory = (category) => {
    return ELEMENT_CATEGORIES[category];
};
export const getElementMetadata = (elementId) => {
    return ELEMENT_METADATA[elementId];
};
export const loadElement = async (elementId) => {
    const loader = ELEMENT_REGISTRY[elementId];
    if (!loader) {
        throw new Error(`Element ${elementId} not found in registry`);
    }
    return await loader();
};
// Element validation utilities
export const isValidElementId = (elementId) => {
    return elementId in ELEMENT_REGISTRY;
};
export const getAllElements = () => {
    return Object.keys(ELEMENT_REGISTRY);
};
export const getAllCategories = () => {
    return Object.keys(ELEMENT_CATEGORIES);
};
//# sourceMappingURL=index.js.map