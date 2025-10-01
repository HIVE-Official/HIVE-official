import * as React from "react";
declare const sizeClasses: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
};
export interface SimpleAvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
    src?: string;
    fallback?: string;
    size?: keyof typeof sizeClasses;
}
/**
 * SimpleAvatar - A convenience wrapper around the compound Avatar component
 * that accepts src, fallback, and size props directly for common use cases.
 */
export declare const SimpleAvatar: React.ForwardRefExoticComponent<SimpleAvatarProps & React.RefAttributes<HTMLSpanElement>>;
export {};
//# sourceMappingURL=simple-avatar.d.ts.map