import * as React from 'react';
export interface DropdownProps {
    children: React.ReactNode;
    className?: string;
}
export declare const Dropdown: React.FC<DropdownProps>;
export declare const DropdownTrigger: React.FC<DropdownProps>;
export interface DropdownMenuProps extends DropdownProps {
    open?: boolean;
}
export declare const DropdownMenu: React.FC<DropdownMenuProps>;
export declare const DropdownMenuItem: React.FC<DropdownProps & {
    onClick?: () => void;
}>;
export declare const DropdownMenuContent: React.FC<DropdownMenuProps>;
export declare const DropdownMenuTrigger: React.FC<DropdownProps>;
export declare const DropdownItem: React.FC<DropdownProps & {
    onClick?: () => void;
}>;
//# sourceMappingURL=dropdown.d.ts.map