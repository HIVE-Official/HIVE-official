export { default as ChoiceSelect } from './choice-select';
export { default as Stack, StackItem } from './stack';
export { default as ConditionGate, useConditionGate } from './condition-gate';
export { default as PingTrigger, usePingTriggerManager } from './ping-trigger';
export { default as TextBlock } from './text-block';
export { default as Button } from './button';
export { default as TextInput } from './text-input';
export { default as Divider } from './divider';
export { default as ImageBlock } from './image-block';
export { default as ProgressBar } from './progress-bar';
export { default as CountdownTimer } from './countdown-timer';
export { default as RatingStars } from './rating-stars';
export declare const ELEMENT_REGISTRY: {
    readonly 'textBlock-v1': () => Promise<any>;
    readonly 'imageBlock-v1': () => Promise<any>;
    readonly 'divider-v1': () => Promise<any>;
    readonly 'stack-v1': () => Promise<typeof import("./stack")>;
    readonly 'button-v1': () => Promise<any>;
    readonly 'choiceSelect-v1': () => Promise<typeof import("./choice-select")>;
    readonly 'textInput-v1': () => Promise<any>;
    readonly 'ratingStars-v1': () => Promise<any>;
    readonly 'countdownTimer-v1': () => Promise<any>;
    readonly 'progressBar-v1': () => Promise<any>;
    readonly 'conditionGate-v1': () => Promise<typeof import("./condition-gate")>;
    readonly 'pingTrigger-v1': () => Promise<typeof import("./ping-trigger")>;
};
export declare const ELEMENT_METADATA: {
    readonly 'textBlock-v1': {
        readonly name: "Text Block";
        readonly category: "Display & Layout";
        readonly description: "Rich text display with formatting options";
        readonly icon: "Type";
        readonly tags: readonly ["text", "content", "display"];
    };
    readonly 'imageBlock-v1': {
        readonly name: "Image Block";
        readonly category: "Display & Layout";
        readonly description: "Image display with captions and styling";
        readonly icon: "Image";
        readonly tags: readonly ["image", "media", "visual"];
    };
    readonly 'divider-v1': {
        readonly name: "Divider";
        readonly category: "Display & Layout";
        readonly description: "Visual separator with customizable styling";
        readonly icon: "Minus";
        readonly tags: readonly ["separator", "layout", "spacing"];
    };
    readonly 'stack-v1': {
        readonly name: "Stack";
        readonly category: "Display & Layout";
        readonly description: "Layout container for organizing elements";
        readonly icon: "Layers";
        readonly tags: readonly ["layout", "container", "organization"];
    };
    readonly 'button-v1': {
        readonly name: "Button";
        readonly category: "Inputs & Choices";
        readonly description: "Interactive button with click handling";
        readonly icon: "MousePointer";
        readonly tags: readonly ["button", "action", "interactive"];
    };
    readonly 'choiceSelect-v1': {
        readonly name: "Choice Select";
        readonly category: "Inputs & Choices";
        readonly description: "Multi-select dropdown with search";
        readonly icon: "ChevronDown";
        readonly tags: readonly ["select", "dropdown", "choice"];
    };
    readonly 'textInput-v1': {
        readonly name: "Text Input";
        readonly category: "Inputs & Choices";
        readonly description: "Text input field with validation";
        readonly icon: "Edit3";
        readonly tags: readonly ["input", "text", "form"];
    };
    readonly 'ratingStars-v1': {
        readonly name: "Rating Stars";
        readonly category: "Inputs & Choices";
        readonly description: "Star rating component with interaction";
        readonly icon: "Star";
        readonly tags: readonly ["rating", "feedback", "stars"];
    };
    readonly 'countdownTimer-v1': {
        readonly name: "Countdown Timer";
        readonly category: "Logic & Dynamics";
        readonly description: "Real-time countdown with completion events";
        readonly icon: "Clock";
        readonly tags: readonly ["timer", "countdown", "time"];
    };
    readonly 'progressBar-v1': {
        readonly name: "Progress Bar";
        readonly category: "Logic & Dynamics";
        readonly description: "Progress indicator with animations";
        readonly icon: "BarChart3";
        readonly tags: readonly ["progress", "indicator", "status"];
    };
    readonly 'conditionGate-v1': {
        readonly name: "Condition Gate";
        readonly category: "Logic & Dynamics";
        readonly description: "Conditional logic controller for dynamic behavior";
        readonly icon: "GitBranch";
        readonly tags: readonly ["logic", "conditional", "control"];
    };
    readonly 'pingTrigger-v1': {
        readonly name: "Ping Trigger";
        readonly category: "Logic & Dynamics";
        readonly description: "Event trigger for integrations and actions";
        readonly icon: "Zap";
        readonly tags: readonly ["trigger", "event", "integration"];
    };
};
export declare const ELEMENT_CATEGORIES: {
    readonly 'Display & Layout': readonly ["textBlock-v1", "imageBlock-v1", "divider-v1", "stack-v1"];
    readonly 'Inputs & Choices': readonly ["button-v1", "choiceSelect-v1", "textInput-v1", "ratingStars-v1"];
    readonly 'Logic & Dynamics': readonly ["countdownTimer-v1", "progressBar-v1", "conditionGate-v1", "pingTrigger-v1"];
};
export type ElementId = keyof typeof ELEMENT_REGISTRY;
export type ElementCategory = keyof typeof ELEMENT_CATEGORIES;
export declare const getElementsByCategory: (category: ElementCategory) => readonly ["textBlock-v1", "imageBlock-v1", "divider-v1", "stack-v1"] | readonly ["button-v1", "choiceSelect-v1", "textInput-v1", "ratingStars-v1"] | readonly ["countdownTimer-v1", "progressBar-v1", "conditionGate-v1", "pingTrigger-v1"];
export declare const getElementMetadata: (elementId: ElementId) => {
    readonly name: "Text Block";
    readonly category: "Display & Layout";
    readonly description: "Rich text display with formatting options";
    readonly icon: "Type";
    readonly tags: readonly ["text", "content", "display"];
} | {
    readonly name: "Image Block";
    readonly category: "Display & Layout";
    readonly description: "Image display with captions and styling";
    readonly icon: "Image";
    readonly tags: readonly ["image", "media", "visual"];
} | {
    readonly name: "Divider";
    readonly category: "Display & Layout";
    readonly description: "Visual separator with customizable styling";
    readonly icon: "Minus";
    readonly tags: readonly ["separator", "layout", "spacing"];
} | {
    readonly name: "Stack";
    readonly category: "Display & Layout";
    readonly description: "Layout container for organizing elements";
    readonly icon: "Layers";
    readonly tags: readonly ["layout", "container", "organization"];
} | {
    readonly name: "Button";
    readonly category: "Inputs & Choices";
    readonly description: "Interactive button with click handling";
    readonly icon: "MousePointer";
    readonly tags: readonly ["button", "action", "interactive"];
} | {
    readonly name: "Choice Select";
    readonly category: "Inputs & Choices";
    readonly description: "Multi-select dropdown with search";
    readonly icon: "ChevronDown";
    readonly tags: readonly ["select", "dropdown", "choice"];
} | {
    readonly name: "Text Input";
    readonly category: "Inputs & Choices";
    readonly description: "Text input field with validation";
    readonly icon: "Edit3";
    readonly tags: readonly ["input", "text", "form"];
} | {
    readonly name: "Rating Stars";
    readonly category: "Inputs & Choices";
    readonly description: "Star rating component with interaction";
    readonly icon: "Star";
    readonly tags: readonly ["rating", "feedback", "stars"];
} | {
    readonly name: "Countdown Timer";
    readonly category: "Logic & Dynamics";
    readonly description: "Real-time countdown with completion events";
    readonly icon: "Clock";
    readonly tags: readonly ["timer", "countdown", "time"];
} | {
    readonly name: "Progress Bar";
    readonly category: "Logic & Dynamics";
    readonly description: "Progress indicator with animations";
    readonly icon: "BarChart3";
    readonly tags: readonly ["progress", "indicator", "status"];
} | {
    readonly name: "Condition Gate";
    readonly category: "Logic & Dynamics";
    readonly description: "Conditional logic controller for dynamic behavior";
    readonly icon: "GitBranch";
    readonly tags: readonly ["logic", "conditional", "control"];
} | {
    readonly name: "Ping Trigger";
    readonly category: "Logic & Dynamics";
    readonly description: "Event trigger for integrations and actions";
    readonly icon: "Zap";
    readonly tags: readonly ["trigger", "event", "integration"];
};
export declare const loadElement: (elementId: ElementId) => Promise<any>;
export declare const isValidElementId: (elementId: string) => elementId is ElementId;
export declare const getAllElements: () => ElementId[];
export declare const getAllCategories: () => ElementCategory[];
//# sourceMappingURL=index.d.ts.map