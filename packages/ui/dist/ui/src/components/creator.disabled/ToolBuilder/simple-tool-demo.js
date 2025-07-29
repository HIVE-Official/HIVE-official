"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { LiveToolRuntime } from "./live-tool-runtime";
// Simple demo instances for testing
const DEMO_INSTANCES = [
    {
        id: 'demo-text-input',
        elementId: 'textInput-v1',
        config: {
            label: 'Your Name',
            placeholder: 'Enter your name...',
            required: true
        },
        position: { x: 20, y: 20 },
        parentId: undefined,
        order: 1,
        isVisible: true,
        isLocked: false
    },
    {
        id: 'demo-text-block',
        elementId: 'textBlock-v1',
        config: {
            text: 'Welcome to HIVE Tool Runtime!',
            style: {
                fontSize: 'lg',
                fontWeight: 'bold',
                textColor: 'var(--hive-brand-secondary)'
            }
        },
        position: { x: 20, y: 100 },
        parentId: undefined,
        order: 2,
        isVisible: true,
        isLocked: false
    },
    {
        id: 'demo-button',
        elementId: 'button-v1',
        config: {
            text: 'Click Me!',
            variant: 'primary',
            onClick: {
                type: 'custom',
                data: { message: 'Button clicked!' }
            }
        },
        position: { x: 20, y: 180 },
        parentId: undefined,
        order: 3,
        isVisible: true,
        isLocked: false
    }
];
export const SimpleToolDemo = ({ className }) => {
    const handleAction = (instanceId, action, data) => {
        console.log('Demo action:', { instanceId, action, data });
        if (action === 'click' && data?.message) {
            alert(data.message);
        }
    };
    return (_jsx("div", { className: className, children: _jsx(LiveToolRuntime, { toolId: "demo-tool", spaceId: "demo-space", userId: "demo-user", instances: DEMO_INSTANCES, toolName: "Demo Tool", enablePersistence: false, enableRealTime: false, onAction: handleAction }) }));
};
export default SimpleToolDemo;
//# sourceMappingURL=simple-tool-demo.js.map