import React from 'react';
export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
    src: string;
    alt: string;
    fallback?: React.ReactNode;
    aspectRatio?: 'square' | 'video' | 'photo' | 'wide' | 'portrait' | number;
    fit?: 'cover' | 'contain' | 'fill' | 'scale-down';
    loading?: 'lazy' | 'eager';
    placeholder?: 'blur' | 'skeleton' | 'none';
    sizes?: string;
    priority?: boolean;
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    bordered?: boolean;
    grayscale?: boolean;
    blur?: boolean;
}
export declare const Image: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<HTMLImageElement>>;
export declare const ProfileImage: React.ForwardRefExoticComponent<Omit<ImageProps, "rounded" | "aspectRatio"> & React.RefAttributes<HTMLImageElement>>;
export declare const ThumbnailImage: React.ForwardRefExoticComponent<Omit<ImageProps, "aspectRatio"> & React.RefAttributes<HTMLImageElement>>;
export declare const HeroImage: React.ForwardRefExoticComponent<Omit<ImageProps, "aspectRatio" | "fit"> & React.RefAttributes<HTMLImageElement>>;
//# sourceMappingURL=image.d.ts.map