import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cva } from "class-variance-authority";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../lib/utils";
const dropdownMenuContentVariants = cva("z-50 min-w-[8rem] overflow-hidden rounded-xl border bg-background p-1 text-white shadow-lg transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]", {
    variants: {
        variant: {
            default: [
                "border-border bg-background",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            ],
            elevated: [
                "border-accent bg-background shadow-xl",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            ],
            minimal: [
                "border-border/50 bg-surface backdrop-blur-sm",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            ]
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const dropdownMenuItemVariants = cva("relative flex cursor-default select-none items-center rounded-lg px-2 py-1.5 text-sm outline-none transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] focus:bg-border focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50", {
    variants: {
        variant: {
            default: "text-muted hover:bg-border hover:text-white",
            destructive: [
                "text-muted hover:bg-surface hover:text-muted",
                "focus:bg-surface focus:text-muted"
            ],
            accent: [
                "text-muted hover:bg-accent/10 hover:text-accent",
                "focus:bg-accent/10 focus:text-accent"
            ]
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const DropdownMenuContext = React.createContext({
    isOpen: false,
    setIsOpen: () => { },
});
export const DropdownMenu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsx(DropdownMenuContext.Provider, { value: { isOpen, setIsOpen }, children: _jsx("div", { className: "relative inline-block text-left", children: children }) }));
};
export const DropdownMenuTrigger = ({ children, asChild = false, className, }) => {
    const { setIsOpen } = React.useContext(DropdownMenuContext);
    if (asChild) {
        return React.cloneElement(children, {
            onClick: () => setIsOpen(true),
        });
    }
        > (({ className, inset, children, ...props }, ref) => (_jsxs(DropdownMenuPrimitive.SubTrigger, { ref: ref, className: cn("flex cursor-default select-none items-center rounded-lg px-2 py-1.5 text-sm outline-none text-muted focus:bg-border focus:text-white data-[state=open]:bg-border data-[state=open]:text-white transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]", inset && "pl-8", className), ...props, children: [children, _jsx(ChevronRight, { className: "ml-auto h-4 w-4" })] })));
    DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
    const DropdownMenuSubContent = React.forwardRef(({ className, variant, ...props }, ref) => (_jsx(DropdownMenuPrimitive.SubContent, { ref: ref, className: cn(dropdownMenuContentVariants({ variant }), "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props })));
    DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
    const DropdownMenuContent = React.forwardRef(({ className, variant, sideOffset = 4, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Portal, { children: _jsx(DropdownMenuPrimitive.Content, { ref: ref, sideOffset: sideOffset, className: cn(dropdownMenuContentVariants({ variant }), "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), onClick: handleClick, children: children }) })));
};
const DropdownMenuItem = React.forwardRef(({ className, variant, inset, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Item, { ref: ref, className: cn(dropdownMenuItemVariants({ variant }), inset && "pl-8", className), ...props })));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (_jsxs(DropdownMenuPrimitive.CheckboxItem, { ref: ref, className: cn("relative flex cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-sm outline-none transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] text-muted focus:bg-border focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className), checked: checked, ...props, children: [_jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: _jsx(DropdownMenuPrimitive.ItemIndicator, { children: _jsx(Check, { className: "h-4 w-4 text-accent" }) }) }), children] })));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (_jsxs(DropdownMenuPrimitive.RadioItem, { ref: ref, className: cn("relative flex cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-sm outline-none transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] text-muted focus:bg-border focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className), ...props, children: [_jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: _jsx(DropdownMenuPrimitive.ItemIndicator, { children: _jsx(Circle, { className: "h-2 w-2 fill-accent text-accent" }) }) }), children] })));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Label, { ref: ref, className: cn("px-2 py-1.5 text-sm font-semibold text-muted", inset && "pl-8", className), ...props })));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Separator, { ref: ref, className: cn("-mx-1 my-1 h-px bg-border", className), ...props })));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const DropdownMenuShortcut = ({ className, ...props }) => {
    return (_jsx("span", { className: cn("ml-auto text-xs tracking-widest text-muted", className), ...props }));
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
export { DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup, dropdownMenuContentVariants, dropdownMenuItemVariants };
//# sourceMappingURL=dropdown-menu.js.map