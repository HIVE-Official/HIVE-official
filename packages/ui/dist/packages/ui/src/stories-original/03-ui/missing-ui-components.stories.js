import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox, Label, Popover, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem, Separator, Skeleton, Slider, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from '../../components/ui';
import { Button } from '../../components/ui/button';
import { useState } from 'react';
import { Info, Settings } from 'lucide-react';
const meta = {
    title: '03-UI/Missing UI Components',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Additional UI components that complete the base component library.',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const CheckboxExamples = {
    render: () => (_jsxs("div", { className: "space-y-4 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Checkbox Components" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "terms" }), _jsx(Label, { htmlFor: "terms", children: "Accept terms and conditions" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "notifications", defaultChecked: true }), _jsx(Label, { htmlFor: "notifications", children: "Enable notifications" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "disabled", disabled: true }), _jsx(Label, { htmlFor: "disabled", children: "Disabled option" })] })] })] })),
};
export const PopoverExample = {
    render: () => (_jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Popover Component" }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", children: [_jsx(Settings, { className: "w-4 h-4 mr-2" }), "Open Settings"] }) }), _jsx(PopoverContent, { className: "w-80", children: _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium", children: "Settings" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "username", children: "Username" }), _jsx("input", { id: "username", className: "w-full p-2 rounded border", placeholder: "Enter username" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx("input", { id: "email", className: "w-full p-2 rounded border", placeholder: "Enter email" })] })] }) })] })] })),
};
export const RadioGroupExample = {
    render: () => (_jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Radio Group" }), _jsxs(RadioGroup, { defaultValue: "option-one", className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(RadioGroupItem, { value: "option-one", id: "option-one" }), _jsx(Label, { htmlFor: "option-one", children: "Option One" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(RadioGroupItem, { value: "option-two", id: "option-two" }), _jsx(Label, { htmlFor: "option-two", children: "Option Two" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(RadioGroupItem, { value: "option-three", id: "option-three" }), _jsx(Label, { htmlFor: "option-three", children: "Option Three" })] })] })] })),
};
export const SkeletonExample = {
    render: () => (_jsxs("div", { className: "p-6 space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Skeleton Loading" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Skeleton, { className: "h-12 w-12 rounded-full" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-[250px]" }), _jsx(Skeleton, { className: "h-4 w-50" })] })] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-3/4" })] })] })] })),
};
export const SliderExample = {
    render: () => {
        const [value, setValue] = useState([50]);
        return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Slider Component" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs(Label, { children: ["Volume: ", value[0], "%"] }), _jsx(Slider, { value: value, onValueChange: setValue, max: 100, step: 1, className: "mt-2" })] }), _jsxs("div", { children: [_jsx(Label, { children: "Range Slider" }), _jsx(Slider, { defaultValue: [20, 80], max: 100, step: 1, className: "mt-2" })] })] })] }));
    },
};
export const TooltipExample = {
    render: () => (_jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Tooltip Component" }), _jsx("div", { className: "space-x-4", children: _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", children: [_jsx(Info, { className: "w-4 h-4 mr-2" }), "Hover me"] }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "This is a helpful tooltip" }) })] }) }) })] })),
};
export const SeparatorExample = {
    render: () => (_jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Separator Component" }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { children: _jsx("p", { className: "text-gray-300", children: "Section One" }) }), _jsx(Separator, {}), _jsx("div", { children: _jsx("p", { className: "text-gray-300", children: "Section Two" }) }), _jsx(Separator, { orientation: "vertical", className: "h-12 mx-4 inline-block" }), _jsx("div", { children: _jsx("p", { className: "text-gray-300", children: "Vertical separator example" }) })] })] })),
};
//# sourceMappingURL=missing-ui-components.stories.js.map