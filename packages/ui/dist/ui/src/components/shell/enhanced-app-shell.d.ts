import React from 'react';
interface User {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    builderStatus?: 'none' | 'pending' | 'active';
    role?: 'student' | 'faculty' | 'admin';
}
interface EnhancedAppShellProps {
    children: React.ReactNode;
    user?: User | null;
    className?: string;
}
export declare function EnhancedAppShell({ children, user, className }: EnhancedAppShellProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=enhanced-app-shell.d.ts.map