import * as React from "react";
import type { AvatarProps } from "./avatar";
export interface SimpleAvatarProps extends AvatarProps {
    src?: string;
    fallback?: string;
}
/**
 * SimpleAvatar - A convenience wrapper around the compound Avatar component
 * that accepts src and fallback props directly for common use cases.
 */
export declare const SimpleAvatar: React.ForwardRefExoticComponent<SimpleAvatarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=simple-avatar.d.ts.map