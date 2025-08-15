import React from 'react';
export interface HiveIconProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}
export interface PlatformIconProps {
    icon: keyof typeof PlatformIcons;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    color?: string;
}
export declare const HiveIcon: React.FC<HiveIconProps>;
export declare const PlatformIcons: {
    Hive: React.FC<HiveIconProps>;
    Profile: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    Spaces: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    Tools: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    Feed: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    Lab: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    Calendar: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    Ghost: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    University: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    Builder: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    Beta: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
};
export declare const PlatformIcon: React.FC<PlatformIconProps>;
//# sourceMappingURL=platform-icons.d.ts.map