import { ElementDefinition } from './element-browser';
interface InteractivePlaygroundProps {
    element: ElementDefinition;
    onSave?: (configuration: ElementConfiguration) => void;
    onClose?: () => void;
    className?: string;
}
interface ElementConfiguration {
    elementId: string;
    props: Record<string, any>;
    metadata: {
        name: string;
        description: string;
        tags: string[];
    };
}
export declare function InteractivePlayground({ element, onSave, onClose, className }: InteractivePlaygroundProps): import("react/jsx-runtime").JSX.Element;
export default InteractivePlayground;
//# sourceMappingURL=interactive-playground.d.ts.map