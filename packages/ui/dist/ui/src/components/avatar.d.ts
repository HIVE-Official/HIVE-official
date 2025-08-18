import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { type VariantProps } from "class-variance-authority";
declare const avatarVariants: (props?: {
    size?: "default" | "xs" | "sm" | "lg" | "xl" | "2xl";
    status?: "none" | "online" | "offline" | "away";
    interactive?: boolean;
} & import("class-variance-authority/types").ClassProp) => string;
declare const Avatar: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarProps & React.RefAttributes<HTMLSpanElement>, "ref"> & VariantProps<(props?: {
    size?: "default" | "xs" | "sm" | "lg" | "xl" | "2xl";
    status?: "none" | "online" | "offline" | "away";
    interactive?: boolean;
} & import("class-variance-authority/types").ClassProp) => string> & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React.RefAttributes<HTMLImageElement>, "ref"> & React.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarPresence: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    status: "online" | "away" | "offline";
    size?: "sm" | "default" | "lg";
} & React.RefAttributes<HTMLDivElement>>;
declare const AvatarWithPresence: React.ForwardRefExoticComponent<Omit<Omit<AvatarPrimitive.AvatarProps & React.RefAttributes<HTMLSpanElement>, "ref"> & VariantProps<(props?: {
    size?: "default" | "xs" | "sm" | "lg" | "xl" | "2xl";
    status?: "none" | "online" | "offline" | "away";
    interactive?: boolean;
} & import("class-variance-authority/types").ClassProp) => string> & React.RefAttributes<HTMLSpanElement>, "ref"> & {
    src?: string;
    alt?: string;
    fallback?: string;
    presence?: "online" | "away" | "offline";
} & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarGroup: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    max?: number;
    size?: VariantProps<typeof avatarVariants>["size"];
} & React.RefAttributes<HTMLDivElement>>;
export declare const getInitials: (name: string) => string;
export { Avatar, AvatarImage, AvatarFallback, AvatarPresence, AvatarWithPresence, AvatarGroup, avatarVariants };
//# sourceMappingURL=avatar.d.ts.map