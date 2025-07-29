import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, Button } from '../../components';
import { User, Settings, LogOut, Plus, Edit, Trash2, Share, Copy, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
const meta = {
    title: '03-UI/Dropdown Menu',
    component: DropdownMenu,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A dropdown menu component with comprehensive item types, shortcuts, and nested menus.',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const Basic = {
    render: () => (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Open Menu" }) }), _jsxs(DropdownMenuContent, { children: [_jsx(DropdownMenuLabel, { children: "My Account" }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { children: [_jsx(User, { className: "mr-2 h-4 w-4" }), "Profile"] }), _jsxs(DropdownMenuItem, { children: [_jsx(Settings, { className: "mr-2 h-4 w-4" }), "Settings"] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { children: [_jsx(LogOut, { className: "mr-2 h-4 w-4" }), "Log out"] })] })] })),
};
export const WithShortcuts = {
    render: () => (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { children: [_jsxs(DropdownMenuItem, { children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "New", _jsx(DropdownMenuShortcut, { children: "\u2318N" })] }), _jsxs(DropdownMenuItem, { children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), "Edit", _jsx(DropdownMenuShortcut, { children: "\u2318E" })] }), _jsxs(DropdownMenuItem, { children: [_jsx(Copy, { className: "mr-2 h-4 w-4" }), "Copy", _jsx(DropdownMenuShortcut, { children: "\u2318C" })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "text-red-600", children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), "Delete", _jsx(DropdownMenuShortcut, { children: "\u2318\u232B" })] })] })] })),
};
export const WithCheckboxes = {
    render: () => {
        const [showBookmarks, setShowBookmarks] = useState(true);
        const [showURLs, setShowURLs] = useState(false);
        const [showPerson, setShowPerson] = useState(false);
        return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "View Options" }) }), _jsxs(DropdownMenuContent, { children: [_jsx(DropdownMenuLabel, { children: "View" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuCheckboxItem, { checked: showBookmarks, onCheckedChange: setShowBookmarks, children: "Show Bookmarks Bar" }), _jsx(DropdownMenuCheckboxItem, { checked: showURLs, onCheckedChange: setShowURLs, children: "Show Full URLs" }), _jsx(DropdownMenuCheckboxItem, { checked: showPerson, onCheckedChange: setShowPerson, children: "Show People Names" })] })] }));
    },
};
export const WithRadioGroup = {
    render: () => {
        const [position, setPosition] = useState('bottom');
        return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Panel Position" }) }), _jsxs(DropdownMenuContent, { children: [_jsx(DropdownMenuLabel, { children: "Panel Position" }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuRadioGroup, { value: position, onValueChange: setPosition, children: [_jsx(DropdownMenuRadioItem, { value: "top", children: "Top" }), _jsx(DropdownMenuRadioItem, { value: "bottom", children: "Bottom" }), _jsx(DropdownMenuRadioItem, { value: "right", children: "Right" })] })] })] }));
    },
};
export const WithSubmenus = {
    render: () => (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "More Actions" }) }), _jsxs(DropdownMenuContent, { children: [_jsxs(DropdownMenuItem, { children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "New Item"] }), _jsxs(DropdownMenuSub, { children: [_jsxs(DropdownMenuSubTrigger, { children: [_jsx(Share, { className: "mr-2 h-4 w-4" }), "Share"] }), _jsxs(DropdownMenuSubContent, { children: [_jsx(DropdownMenuItem, { children: "Email" }), _jsx(DropdownMenuItem, { children: "Message" }), _jsx(DropdownMenuItem, { children: "Copy Link" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { children: "More Options" })] })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), "Edit"] }), _jsxs(DropdownMenuItem, { className: "text-red-600", children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), "Delete"] })] })] })),
};
export const KitchenSink = {
    render: () => {
        const [notifications, setNotifications] = useState(true);
        const [theme, setTheme] = useState('dark');
        return (_jsxs("div", { className: "flex gap-4", children: [_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Basic" }) }), _jsxs(DropdownMenuContent, { children: [_jsx(DropdownMenuLabel, { children: "Quick Actions" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { children: "Action 1" }), _jsx(DropdownMenuItem, { children: "Action 2" }), _jsx(DropdownMenuItem, { disabled: true, children: "Disabled Action" })] })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Kitchen Sink" }) }), _jsxs(DropdownMenuContent, { className: "w-56", children: [_jsx(DropdownMenuLabel, { children: "My Account" }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { children: [_jsx(User, { className: "mr-2 h-4 w-4" }), "Profile", _jsx(DropdownMenuShortcut, { children: "\u2318P" })] }), _jsx(DropdownMenuCheckboxItem, { checked: notifications, onCheckedChange: setNotifications, children: "Enable notifications" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuLabel, { children: "Theme" }), _jsxs(DropdownMenuRadioGroup, { value: theme, onValueChange: setTheme, children: [_jsx(DropdownMenuRadioItem, { value: "light", children: "Light" }), _jsx(DropdownMenuRadioItem, { value: "dark", children: "Dark" }), _jsx(DropdownMenuRadioItem, { value: "system", children: "System" })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuSub, { children: [_jsxs(DropdownMenuSubTrigger, { children: [_jsx(Settings, { className: "mr-2 h-4 w-4" }), "Advanced"] }), _jsxs(DropdownMenuSubContent, { children: [_jsx(DropdownMenuItem, { children: "Privacy" }), _jsx(DropdownMenuItem, { children: "Security" }), _jsx(DropdownMenuItem, { children: "Integrations" })] })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "text-red-600", children: [_jsx(LogOut, { className: "mr-2 h-4 w-4" }), "Log out"] })] })] })] }));
    },
};
//# sourceMappingURL=dropdown-menu.stories.js.map