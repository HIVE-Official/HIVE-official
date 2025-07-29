import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image, ProfileImage, ThumbnailImage, HeroImage } from '../../../atomic/atoms/image';
import { HiveCard } from '../../../components/hive-card';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { ImageIcon, AlertTriangle } from 'lucide-react';
const meta = {
    title: '02-atoms/Content Media/Image',
    component: Image,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Image Component** - Advanced image display with loading states, aspect ratios, and error handling

Part of the HIVE Atomic Design System providing consistent image rendering with enhanced UX features.

## Features
- **5 Aspect Ratios**: Square, video, photo, wide, portrait + custom ratios
- **4 Object Fit Options**: Cover, contain, fill, scale-down for responsive images
- **3 Loading Modes**: Lazy, eager, with priority support for critical images
- **3 Placeholder Types**: Skeleton, blur, none for loading states
- **6 Border Radius**: None to full rounding options
- **Visual Effects**: Grayscale, blur, border styling
- **Error Handling**: Graceful fallbacks and error states
- **Performance**: Lazy loading, sizes attribute, priority loading
- **Accessibility**: Proper alt text and semantic structure

## Preset Components
- **ProfileImage**: Square, rounded, optimized for profile photos
- **ThumbnailImage**: Square thumbnails for galleries and lists
- **HeroImage**: Video aspect ratio for hero sections and banners

## Use Cases
- **Hero Sections**: Large banner images with video aspect ratio
- **Profile Photos**: Circular or rounded profile images
- **Content Images**: Article and blog post illustrations
- **Thumbnails**: Product and content preview images
- **Galleries**: Grid layouts with consistent aspect ratios
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        src: {
            control: 'text',
            description: 'Image source URL'
        },
        alt: {
            control: 'text',
            description: 'Alternative text for accessibility'
        },
        aspectRatio: {
            control: 'select',
            options: ['square', 'video', 'photo', 'wide', 'portrait'],
            description: 'Image aspect ratio preset'
        },
        fit: {
            control: 'select',
            options: ['cover', 'contain', 'fill', 'scale-down'],
            description: 'How image should fit within container'
        },
        loading: {
            control: 'select',
            options: ['lazy', 'eager'],
            description: 'Image loading strategy'
        },
        placeholder: {
            control: 'select',
            options: ['blur', 'skeleton', 'none'],
            description: 'Loading placeholder type'
        },
        rounded: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
            description: 'Border radius variant'
        },
        bordered: {
            control: 'boolean',
            description: 'Add border around image'
        },
        grayscale: {
            control: 'boolean',
            description: 'Apply grayscale filter'
        },
        blur: {
            control: 'boolean',
            description: 'Apply blur effect'
        },
        priority: {
            control: 'boolean',
            description: 'Load image with high priority'
        }
    }
};
export default meta;
// Sample image URLs for demos
const sampleImages = {
    landscape: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    portrait: 'https://images.unsplash.com/photo-1494790108755-2616b2c0c3ee?w=400&h=600&fit=crop',
    square: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    wide: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop',
    hero: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=675&fit=crop',
    tech: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
};
// Default Image
export const Default = {
    args: {
        src: sampleImages.landscape,
        alt: 'Beautiful landscape',
        aspectRatio: 'photo'
    }
};
// All Aspect Ratios
export const AllAspectRatios = {
    render: () => (_jsx("div", { className: "space-y-8 max-w-4xl", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Square (1:1)" }), _jsx(Image, { src: sampleImages.square, alt: "Square aspect ratio", aspectRatio: "square", className: "w-full max-w-xs" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Video (16:9)" }), _jsx(Image, { src: sampleImages.hero, alt: "Video aspect ratio", aspectRatio: "video", className: "w-full max-w-xs" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Photo (4:3)" }), _jsx(Image, { src: sampleImages.landscape, alt: "Photo aspect ratio", aspectRatio: "photo", className: "w-full max-w-xs" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Wide (21:9)" }), _jsx(Image, { src: sampleImages.wide, alt: "Wide aspect ratio", aspectRatio: "wide", className: "w-full max-w-xs" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Portrait (3:4)" }), _jsx(Image, { src: sampleImages.portrait, alt: "Portrait aspect ratio", aspectRatio: "portrait", className: "w-full max-w-xs" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Custom (2:1)" }), _jsx(Image, { src: sampleImages.wide, alt: "Custom aspect ratio", aspectRatio: 2, className: "w-full max-w-xs" })] })] }) }))
};
// Object Fit Options
export const ObjectFitOptions = {
    render: () => (_jsxs("div", { className: "grid grid-cols-2 gap-6 max-w-2xl", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Cover (Default)" }), _jsx(Image, { src: sampleImages.landscape, alt: "Cover fit", aspectRatio: "square", fit: "cover", className: "w-full max-w-xs" }), _jsx(Text, { variant: "body-xs", color: "muted", children: "Scales image to cover container, may crop" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Contain" }), _jsx(Image, { src: sampleImages.landscape, alt: "Contain fit", aspectRatio: "square", fit: "contain", className: "w-full max-w-xs" }), _jsx(Text, { variant: "body-xs", color: "muted", children: "Scales image to fit inside container" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Fill" }), _jsx(Image, { src: sampleImages.landscape, alt: "Fill fit", aspectRatio: "square", fit: "fill", className: "w-full max-w-xs" }), _jsx(Text, { variant: "body-xs", color: "muted", children: "Stretches image to fill container exactly" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Scale Down" }), _jsx(Image, { src: sampleImages.landscape, alt: "Scale down fit", aspectRatio: "square", fit: "scale-down", className: "w-full max-w-xs" }), _jsx(Text, { variant: "body-xs", color: "muted", children: "Acts like contain but never scales up" })] })] }))
};
// Border Radius Options
export const BorderRadiusOptions = {
    render: () => (_jsxs("div", { className: "grid grid-cols-3 gap-4 max-w-2xl", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "None" }), _jsx(Image, { src: sampleImages.square, alt: "No border radius", aspectRatio: "square", rounded: "none", className: "w-full max-w-24" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Small" }), _jsx(Image, { src: sampleImages.square, alt: "Small border radius", aspectRatio: "square", rounded: "sm", className: "w-full max-w-24" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Medium" }), _jsx(Image, { src: sampleImages.square, alt: "Medium border radius", aspectRatio: "square", rounded: "md", className: "w-full max-w-24" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Large" }), _jsx(Image, { src: sampleImages.square, alt: "Large border radius", aspectRatio: "square", rounded: "lg", className: "w-full max-w-24" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "XL" }), _jsx(Image, { src: sampleImages.square, alt: "Extra large border radius", aspectRatio: "square", rounded: "xl", className: "w-full max-w-24" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Full" }), _jsx(Image, { src: sampleImages.square, alt: "Full border radius", aspectRatio: "square", rounded: "full", className: "w-full max-w-24" })] })] }))
};
// Visual Effects
export const VisualEffects = {
    render: () => (_jsxs("div", { className: "grid grid-cols-2 gap-6 max-w-2xl", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Normal" }), _jsx(Image, { src: sampleImages.landscape, alt: "Normal image", aspectRatio: "photo", className: "w-full max-w-xs" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Grayscale" }), _jsx(Image, { src: sampleImages.landscape, alt: "Grayscale image", aspectRatio: "photo", grayscale: true, className: "w-full max-w-xs" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Blur" }), _jsx(Image, { src: sampleImages.landscape, alt: "Blurred image", aspectRatio: "photo", blur: true, className: "w-full max-w-xs" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Bordered" }), _jsx(Image, { src: sampleImages.landscape, alt: "Bordered image", aspectRatio: "photo", bordered: true, className: "w-full max-w-xs" })] })] }))
};
// Loading States
export const LoadingStates = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-2xl", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Placeholder Types" }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Skeleton (Default)" }), _jsx(Image, { src: sampleImages.landscape, alt: "Skeleton placeholder", aspectRatio: "photo", placeholder: "skeleton", className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Blur" }), _jsx(Image, { src: sampleImages.landscape, alt: "Blur placeholder", aspectRatio: "photo", placeholder: "blur", className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "None" }), _jsx(Image, { src: sampleImages.landscape, alt: "No placeholder", aspectRatio: "photo", placeholder: "none", className: "w-full" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Loading Priority" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Lazy Loading" }), _jsx(Image, { src: sampleImages.tech, alt: "Lazy loaded image", aspectRatio: "photo", loading: "lazy", className: "w-full" }), _jsx(Text, { variant: "body-xs", color: "muted", children: "Loads when scrolled into view" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Priority Loading" }), _jsx(Image, { src: sampleImages.office, alt: "Priority loaded image", aspectRatio: "photo", priority: true, className: "w-full" }), _jsx(Text, { variant: "body-xs", color: "muted", children: "Loads immediately for critical images" })] })] })] })] }))
};
// Error Handling
export const ErrorHandling = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-2xl", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Error States" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Default Error" }), _jsx(Image, { src: "https://invalid-url-that-will-fail.jpg", alt: "Broken image", aspectRatio: "photo", className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Custom Fallback" }), _jsx(Image, { src: "https://another-invalid-url.jpg", alt: "Broken image with fallback", aspectRatio: "photo", fallback: _jsxs("div", { className: "flex flex-col items-center justify-center h-full text-gray-400", children: [_jsx(ImageIcon, { className: "w-8 h-8 mb-2" }), _jsx(Text, { variant: "body-sm", children: "Custom fallback content" })] }), className: "w-full" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Fallback Variations" }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Icon Fallback" }), _jsx(Image, { src: "https://fail1.jpg", alt: "Icon fallback", aspectRatio: "square", fallback: _jsx("div", { className: "flex items-center justify-center h-full", children: _jsx(AlertTriangle, { className: "w-8 h-8 text-yellow-400" }) }), className: "w-full max-w-32" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Text Fallback" }), _jsx(Image, { src: "https://fail2.jpg", alt: "Text fallback", aspectRatio: "square", fallback: "Image not available", className: "w-full max-w-32" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Badge Fallback" }), _jsx(Image, { src: "https://fail3.jpg", alt: "Badge fallback", aspectRatio: "square", fallback: _jsx("div", { className: "flex items-center justify-center h-full", children: _jsx(Badge, { variant: "error", children: "Error" }) }), className: "w-full max-w-32" })] })] })] })] }))
};
// Preset Components
export const PresetComponents = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-4xl", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "ProfileImage" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(ProfileImage, { src: sampleImages.square, alt: "Profile image", className: "w-16 h-16" }), _jsx(ProfileImage, { src: sampleImages.portrait, alt: "Profile image", className: "w-24 h-24" }), _jsx(ProfileImage, { src: sampleImages.square, alt: "Profile image", className: "w-32 h-32" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "ThumbnailImage" }), _jsxs("div", { className: "grid grid-cols-4 gap-4 max-w-md", children: [_jsx(ThumbnailImage, { src: sampleImages.landscape, alt: "Thumbnail 1" }), _jsx(ThumbnailImage, { src: sampleImages.tech, alt: "Thumbnail 2" }), _jsx(ThumbnailImage, { src: sampleImages.office, alt: "Thumbnail 3" }), _jsx(ThumbnailImage, { src: sampleImages.hero, alt: "Thumbnail 4" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "HeroImage" }), _jsx(HeroImage, { src: sampleImages.hero, alt: "Hero banner", className: "w-full max-w-2xl" })] })] }))
};
// Gallery Example
export const GalleryExample = {
    render: () => (_jsx(HiveCard, { className: "p-6 max-w-4xl", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", children: "Project Gallery" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Showcase of recent work and achievements" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Image, { src: sampleImages.tech, alt: "Technology project", aspectRatio: "photo", className: "w-full" }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-sm", children: "Tech Dashboard" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Modern analytics platform with real-time data visualization" }), _jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx(Badge, { variant: "primary", size: "sm", children: "React" }), _jsx(Badge, { variant: "secondary", size: "sm", children: "TypeScript" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Image, { src: sampleImages.office, alt: "Office collaboration", aspectRatio: "photo", className: "w-full" }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-sm", children: "Team Workspace" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Collaborative environment for remote team productivity" }), _jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx(Badge, { variant: "success", size: "sm", children: "Vue.js" }), _jsx(Badge, { variant: "info", size: "sm", children: "Node.js" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Image, { src: sampleImages.landscape, alt: "Mobile application", aspectRatio: "photo", className: "w-full" }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-sm", children: "Mobile App" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Cross-platform mobile application for field operations" }), _jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx(Badge, { variant: "warning", size: "sm", children: "React Native" }), _jsx(Badge, { variant: "ghost", size: "sm", children: "GraphQL" })] })] })] })] })] }) }))
};
// Responsive Image Example
export const ResponsiveImageExample = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-4xl", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Responsive Behavior" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Images automatically adapt to different screen sizes and containers" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Mobile (Square)" }), _jsx(Image, { src: sampleImages.square, alt: "Mobile optimized", aspectRatio: "square", className: "w-full md:hidden" }), _jsx(Image, { src: sampleImages.landscape, alt: "Desktop optimized", aspectRatio: "photo", className: "w-full hidden md:block" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Tablet (Photo)" }), _jsx(Image, { src: sampleImages.landscape, alt: "Tablet optimized", aspectRatio: "photo", className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Desktop (Wide)" }), _jsx(Image, { src: sampleImages.wide, alt: "Desktop optimized", aspectRatio: "wide", className: "w-full hidden lg:block" }), _jsx(Image, { src: sampleImages.landscape, alt: "Fallback", aspectRatio: "photo", className: "w-full lg:hidden" })] })] }), _jsx("div", { className: "p-4 bg-blue-50 rounded-lg border border-blue-200", children: _jsxs(Text, { variant: "body-sm", className: "text-blue-800", children: [_jsx("strong", { children: "Performance Tip:" }), " Use the `sizes` attribute to help the browser choose the best image size for each viewport. Combine with `priority` for above-the-fold images and `loading=\"lazy\"` for images below the fold."] }) })] }))
};
// Interactive Demo
export const Interactive = {
    render: (args) => (_jsx("div", { className: "max-w-md", children: _jsx(Image, { ...args, className: "w-full" }) })),
    args: {
        src: sampleImages.landscape,
        alt: 'Interactive image demo',
        aspectRatio: 'photo',
        fit: 'cover',
        loading: 'lazy',
        placeholder: 'skeleton',
        rounded: 'md',
        bordered: false,
        grayscale: false,
        blur: false,
        priority: false
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo - use the controls below to test different image configurations including aspect ratios, object fit, visual effects, and loading options.'
            }
        }
    }
};
//# sourceMappingURL=image.stories.js.map