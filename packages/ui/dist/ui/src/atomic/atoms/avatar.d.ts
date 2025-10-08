import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
declare const Avatar: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React.RefAttributes<HTMLImageElement>, "ref"> & React.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarGroup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    size?: "xs" | "sm" | "md" | "lg";
    max?: number;
} & React.RefAttributes<HTMLDivElement>>;
export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
//# sourceMappingURL=avatar.d.ts.map