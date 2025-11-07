import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const avatarVariants: (props?: {
    size?: "sm" | "lg" | "xl" | "default" | "2xl";
    variant?: "outline" | "default" | "brand";
    shape?: "circle" | "rounded" | "portrait";
} & import("class-variance-authority/types").ClassProp) => string;
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;
declare const AvatarImage: React.ForwardRefExoticComponent<React.ImgHTMLAttributes<HTMLImageElement> & {
    onLoadingStatusChange?: (status: "idle" | "loading" | "loaded" | "error") => void;
} & React.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const ShadcnAvatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;
declare const ShadcnAvatarImage: React.ForwardRefExoticComponent<React.ImgHTMLAttributes<HTMLImageElement> & {
    onLoadingStatusChange?: (status: "idle" | "loading" | "loaded" | "error") => void;
} & React.RefAttributes<HTMLImageElement>>;
declare const ShadcnAvatarFallback: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { Avatar, AvatarImage, AvatarFallback, ShadcnAvatar, ShadcnAvatarImage, ShadcnAvatarFallback, avatarVariants, };
//# sourceMappingURL=avatar.d.ts.map