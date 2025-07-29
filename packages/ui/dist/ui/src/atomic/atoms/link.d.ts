import React from 'react';
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: 'default' | 'ghost' | 'underline' | 'button';
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'secondary' | 'gold' | 'muted';
    external?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}
export declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
//# sourceMappingURL=link.d.ts.map