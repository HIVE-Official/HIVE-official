import React from 'react';
export declare const AppHeader: {
    Root: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
        variant?: "default" | "minimal" | "floating";
        transparent?: boolean;
        hideOnScroll?: boolean;
    } & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
    Logo: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
    Nav: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
    Actions: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
    Search: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
        placeholder?: string;
        variant?: "chip" | "minimal" | "command";
        shortcut?: string;
        onSearchClick?: () => void;
    } & React.RefAttributes<HTMLDivElement>>;
    MenuButton: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
        isOpen?: boolean;
        variant?: "chip" | "minimal";
    } & React.RefAttributes<HTMLButtonElement>>;
    Notifications: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
        count?: number;
        variant?: "chip" | "minimal";
        showDot?: boolean;
    } & React.RefAttributes<HTMLButtonElement>>;
};
//# sourceMappingURL=AppHeader.d.ts.map