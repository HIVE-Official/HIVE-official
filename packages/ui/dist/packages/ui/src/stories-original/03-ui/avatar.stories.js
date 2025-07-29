import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
const meta = {
    title: '03-UI/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'An image element with a fallback for representing the user.'
            }
        }
    },
    tags: ['autodocs'],
};
export default meta;
export const Default = {
    render: () => (_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "https://github.com/vercel.png", alt: "Vercel" }), _jsx(AvatarFallback, { children: "V" })] })),
};
export const Fallback = {
    render: () => (_jsx(Avatar, { children: _jsx(AvatarFallback, { children: "JD" }) })),
};
export const Sizes = {
    render: () => (_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Avatar, { className: "h-8 w-8", children: _jsx(AvatarFallback, { className: "text-xs", children: "XS" }) }), _jsx(Avatar, { children: _jsx(AvatarFallback, { children: "SM" }) }), _jsx(Avatar, { className: "h-12 w-12", children: _jsx(AvatarFallback, { children: "MD" }) }), _jsx(Avatar, { className: "h-16 w-16", children: _jsx(AvatarFallback, { children: "LG" }) })] })),
};
//# sourceMappingURL=avatar.stories.js.map