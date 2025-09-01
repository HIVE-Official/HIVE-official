import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
declare const profileActionVariants: (props?: ({
    size?: "xs" | "sm" | "md" | "lg" | null | undefined;
    variant?: "primary" | "secondary" | "ghost" | "destructive" | "success" | "outline" | null | undefined;
    shape?: "square" | "rounded" | "pill" | null | undefined;
    width?: "icon" | "full" | "auto" | null | undefined;
    interactive?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const ACTION_TYPES: {
    readonly edit: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Edit Profile";
        readonly variant: "outline";
    };
    readonly settings: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Settings";
        readonly variant: "ghost";
    };
    readonly share: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Share";
        readonly variant: "ghost";
    };
    readonly message: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Message";
        readonly variant: "primary";
    };
    readonly connect: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Connect";
        readonly variant: "outline";
    };
    readonly follow: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Follow";
        readonly variant: "outline";
    };
    readonly bookmark: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Save";
        readonly variant: "ghost";
    };
    readonly camera: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Change Photo";
        readonly variant: "secondary";
    };
    readonly privacy: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Privacy";
        readonly variant: "ghost";
    };
    readonly notifications: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Notifications";
        readonly variant: "ghost";
    };
    readonly visibility: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Visibility";
        readonly variant: "ghost";
    };
    readonly ghost: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Ghost Mode";
        readonly variant: "ghost";
    };
    readonly copy: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Copy Link";
        readonly variant: "ghost";
    };
    readonly download: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Download";
        readonly variant: "ghost";
    };
    readonly upload: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Upload";
        readonly variant: "secondary";
    };
    readonly more: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "More";
        readonly variant: "ghost";
    };
};
export type ActionType = keyof typeof ACTION_TYPES;
export interface ProfileActionProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>, VariantProps<typeof profileActionVariants> {
    actionType?: ActionType;
    type?: "button" | "submit" | "reset";
    label?: string;
    icon?: LucideIcon;
    iconOnly?: boolean;
    loading?: boolean;
    badge?: string | number;
    tooltip?: string;
    href?: string;
    external?: boolean;
}
export declare function ProfileAction({ actionType, type, label, icon: CustomIcon, iconOnly, loading, badge, tooltip, href, external, onClick, size, variant, shape, width, interactive, disabled, className, children, ...props }: ProfileActionProps): import("react/jsx-runtime").JSX.Element;
export declare function EditAction({ ...props }: Omit<ProfileActionProps, 'actionType'>): import("react/jsx-runtime").JSX.Element;
export declare function ShareAction({ ...props }: Omit<ProfileActionProps, 'actionType'>): import("react/jsx-runtime").JSX.Element;
export declare function MessageAction({ ...props }: Omit<ProfileActionProps, 'actionType'>): import("react/jsx-runtime").JSX.Element;
export declare function ConnectAction({ ...props }: Omit<ProfileActionProps, 'actionType'>): import("react/jsx-runtime").JSX.Element;
export declare function SettingsAction({ ...props }: Omit<ProfileActionProps, 'actionType'>): import("react/jsx-runtime").JSX.Element;
export declare function CameraAction({ ...props }: Omit<ProfileActionProps, 'actionType'>): import("react/jsx-runtime").JSX.Element;
export declare function MoreAction({ ...props }: Omit<ProfileActionProps, 'actionType'>): import("react/jsx-runtime").JSX.Element;
export { profileActionVariants };
//# sourceMappingURL=profile-action.d.ts.map