import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-dropdown-menu';
declare const ContextMenu: React.FC<ContextMenuPrimitive.DropdownMenuProps>;
declare const ContextMenuTrigger: React.ForwardRefExoticComponent<ContextMenuPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const ContextMenuGroup: React.ForwardRefExoticComponent<ContextMenuPrimitive.DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuPortal: React.FC<ContextMenuPrimitive.DropdownMenuPortalProps>;
declare const ContextMenuSub: React.FC<ContextMenuPrimitive.DropdownMenuSubProps>;
declare const Content: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SubContent: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.DropdownMenuSubContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const Item: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CheckboxItem: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.DropdownMenuCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SubTrigger: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.DropdownMenuSubTriggerProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const Label: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.DropdownMenuLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const Separator: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const Shortcut: {
    ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { ContextMenu, ContextMenuTrigger, ContextMenuGroup, ContextMenuPortal, ContextMenuSub, Content as ContextMenuContent, SubContent as ContextMenuSubContent, Item as ContextMenuItem, CheckboxItem as ContextMenuCheckboxItem, SubTrigger as ContextMenuSubTrigger, Label as ContextMenuLabel, Separator as ContextMenuSeparator, Shortcut as ContextMenuShortcut };
//# sourceMappingURL=context-menu.d.ts.map