import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text } from '../../../atomic/atoms/text';
import { HiveCard } from '../../../components/hive-card';
const meta = {
    title: '02-atoms/Core Foundation/Text',
    component: Text,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Text Component** - A comprehensive typography system with semantic color tokens

Part of the HIVE Atomic Design System providing consistent text rendering across all applications.

## Features
- **14 Typography Variants**: Display, heading, and body scales with proper sizing
- **9 Semantic Colors**: Primary, secondary, muted variants, and accent colors
- **5 Font Weights**: Light to bold with proper hierarchy
- **3 Text Alignments**: Left, center, right alignment options
- **Semantic HTML**: Proper heading hierarchy with customizable rendering
- **Responsive**: Automatic scaling for mobile devices
- **Truncation**: Built-in text overflow handling
- **Design Token Integration**: Uses HIVE semantic color tokens

## Typography Scale
- **Display**: For hero sections and large headings (2xl to sm)
- **Heading**: For section titles and content hierarchy (xl to sm)
- **Body**: For paragraph text and UI labels (lg to 2xs)

## Color System
Uses semantic HIVE color tokens for consistent theming and accessibility.
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        as: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
            description: 'HTML element to render'
        },
        variant: {
            control: 'select',
            options: [
                'display-2xl', 'display-xl', 'display-lg', 'display-md', 'display-sm',
                'heading-xl', 'heading-lg', 'heading-md', 'heading-sm',
                'body-lg', 'body-md', 'body-sm', 'body-xs', 'body-2xs'
            ],
            description: 'Typography variant (size and styling)'
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'mutedLight', 'mutedDark', 'subtle', 'gold', 'ruby', 'emerald'],
            description: 'Semantic color variant'
        },
        weight: {
            control: 'select',
            options: ['light', 'normal', 'medium', 'semibold', 'bold'],
            description: 'Font weight override'
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right'],
            description: 'Text alignment'
        },
        truncate: {
            control: 'boolean',
            description: 'Enable text truncation with ellipsis'
        }
    }
};
export default meta;
// Default Text
export const Default = {
    args: {
        children: 'The quick brown fox jumps over the lazy dog'
    }
};
// Display Scale
export const DisplayScale = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-4xl", children: [_jsx(Text, { variant: "display-2xl", as: "h1", children: "Display 2XL - Hero Headlines" }), _jsx(Text, { variant: "display-xl", as: "h1", children: "Display XL - Major Announcements" }), _jsx(Text, { variant: "display-lg", as: "h1", children: "Display LG - Section Heroes" }), _jsx(Text, { variant: "display-md", as: "h2", children: "Display MD - Page Titles" }), _jsx(Text, { variant: "display-sm", as: "h2", children: "Display SM - Content Sections" })] }))
};
// Heading Scale
export const HeadingScale = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-4xl", children: [_jsx(Text, { variant: "heading-xl", as: "h2", children: "Heading XL - Primary Sections" }), _jsx(Text, { variant: "heading-lg", as: "h3", children: "Heading LG - Secondary Sections" }), _jsx(Text, { variant: "heading-md", as: "h4", children: "Heading MD - Subsections" }), _jsx(Text, { variant: "heading-sm", as: "h5", children: "Heading SM - Minor Headings" })] }))
};
// Body Scale
export const BodyScale = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-2xl", children: [_jsx(Text, { variant: "body-lg", children: "Body LG - Large paragraph text for enhanced readability and emphasis. Perfect for introductory content and important descriptions." }), _jsx(Text, { variant: "body-md", children: "Body MD - Standard paragraph text for most content. This is the default size for body copy, articles, and general text content throughout the application." }), _jsx(Text, { variant: "body-sm", children: "Body SM - Smaller text for secondary information, captions, and supporting details. Good for metadata and less prominent content." }), _jsx(Text, { variant: "body-xs", children: "Body XS - Small text for fine print, labels, and compact UI elements." }), _jsx(Text, { variant: "body-2xs", children: "Body 2XS - Minimal text for timestamps and micro-labels." })] }))
};
// Color Variants
export const ColorVariants = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-2xl", children: [_jsx(Text, { color: "primary", children: "Primary - Main text color for primary content and headings" }), _jsx(Text, { color: "secondary", children: "Secondary - Secondary text color for supporting information" }), _jsx(Text, { color: "muted", children: "Muted - Muted text color for less important content" }), _jsx(Text, { color: "mutedLight", children: "Muted Light - Lighter muted color for subtle text" }), _jsx(Text, { color: "mutedDark", children: "Muted Dark - Darker muted color for emphasis within muted content" }), _jsx(Text, { color: "subtle", children: "Subtle - Very subtle text for background information" }), _jsx(Text, { color: "gold", children: "Gold - Brand accent color for premium features and highlights" }), _jsx(Text, { color: "ruby", children: "Ruby - Error color for warnings and critical information" }), _jsx(Text, { color: "emerald", children: "Emerald - Success color for positive feedback and confirmations" })] }))
};
// Font Weights
export const FontWeights = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-2xl", children: [_jsx(Text, { weight: "light", children: "Light Weight - Delicate and refined appearance for special use cases" }), _jsx(Text, { weight: "normal", children: "Normal Weight - Standard text weight for body content and readable text" }), _jsx(Text, { weight: "medium", children: "Medium Weight - Slightly emphasized text for subtle importance" }), _jsx(Text, { weight: "semibold", children: "Semibold Weight - Strong emphasis for headings and important information" }), _jsx(Text, { weight: "bold", children: "Bold Weight - Maximum emphasis for critical information and strong headings" })] }))
};
// Text Alignment
export const TextAlignment = {
    render: () => (_jsxs("div", { className: "space-y-6 w-full max-w-2xl", children: [_jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-4", children: [_jsx(Text, { align: "left", variant: "heading-sm", className: "mb-2", children: "Left Aligned" }), _jsx(Text, { align: "left", children: "This text is aligned to the left side of its container. This is the default alignment for most text content and provides natural reading flow for left-to-right languages." })] }), _jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-4", children: [_jsx(Text, { align: "center", variant: "heading-sm", className: "mb-2", children: "Center Aligned" }), _jsx(Text, { align: "center", children: "This text is centered within its container. Center alignment is often used for headings, callouts, and content that needs visual balance and emphasis." })] }), _jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-4", children: [_jsx(Text, { align: "right", variant: "heading-sm", className: "mb-2", children: "Right Aligned" }), _jsx(Text, { align: "right", children: "This text is aligned to the right side of its container. Right alignment is useful for numerical data, timestamps, and creating visual hierarchy." })] })] }))
};
// Text Truncation
export const TextTruncation = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-xs", children: [_jsxs("div", { children: [_jsx(Text, { variant: "heading-sm", className: "mb-2", children: "Normal Text" }), _jsx(Text, { children: "This is a long text that will wrap to multiple lines when it exceeds the container width, showing the natural text flow behavior." })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-sm", className: "mb-2", children: "Truncated Text" }), _jsx(Text, { truncate: true, children: "This is a long text that will be truncated with an ellipsis when it exceeds the container width, keeping it on a single line." })] })] }))
};
// Semantic HTML Elements
export const SemanticElements = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-2xl", children: [_jsx(Text, { as: "h1", variant: "display-lg", children: "H1 - Main Page Title" }), _jsx(Text, { as: "h2", variant: "heading-xl", children: "H2 - Major Section" }), _jsx(Text, { as: "h3", variant: "heading-lg", children: "H3 - Subsection" }), _jsx(Text, { as: "h4", variant: "heading-md", children: "H4 - Content Group" }), _jsx(Text, { as: "h5", variant: "heading-sm", children: "H5 - Minor Heading" }), _jsx(Text, { as: "h6", variant: "heading-sm", weight: "medium", children: "H6 - Smallest Heading" }), _jsx(Text, { as: "p", variant: "body-md", children: "Paragraph - Standard body text content with proper semantic meaning for screen readers and SEO." }), _jsx(Text, { as: "span", variant: "body-sm", color: "secondary", children: "Span - Inline text element for styling portions of text within other elements." }), _jsx(Text, { as: "div", variant: "body-xs", color: "muted", children: "Div - Block element for structural text content that needs specific styling." })] }))
};
// Content Hierarchy Example
export const ContentHierarchy = {
    render: () => (_jsxs(HiveCard, { className: "p-6 space-y-6 max-w-2xl", children: [_jsx(Text, { as: "h1", variant: "display-md", color: "primary", children: "Getting Started with HIVE" }), _jsx(Text, { variant: "body-lg", color: "secondary", children: "Welcome to the HIVE ecosystem. This guide will help you understand the core concepts and get you up and running quickly." }), _jsx(Text, { as: "h2", variant: "heading-xl", color: "primary", children: "Core Concepts" }), _jsx(Text, { variant: "body-md", children: "HIVE is built around three main concepts that work together to create powerful collaborative experiences." }), _jsx(Text, { as: "h3", variant: "heading-lg", color: "primary", children: "1. Spaces" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Spaces are collaborative environments where teams can work together on projects, share resources, and build tools." }), _jsx(Text, { as: "h3", variant: "heading-lg", color: "primary", children: "2. Tools" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Tools are custom applications built within spaces to solve specific problems and automate workflows." }), _jsx(Text, { as: "h3", variant: "heading-lg", color: "primary", children: "3. Community" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "The HIVE community connects creators, sharing knowledge and collaborating on innovative solutions." }), _jsxs("div", { className: "mt-8 p-4 bg-gray-800 rounded-lg", children: [_jsx(Text, { variant: "body-sm", color: "gold", weight: "medium", children: "\uD83D\uDCA1 Pro Tip" }), _jsx(Text, { variant: "body-sm", color: "muted", className: "mt-2", children: "Start by exploring existing spaces to understand how others are using HIVE, then create your own space to begin building." })] })] }))
};
// Typography Combinations
export const TypographyCombinations = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-4xl", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx(Text, { as: "h1", variant: "display-xl", color: "primary", children: "Build the Future" }), _jsx(Text, { variant: "body-lg", color: "secondary", className: "max-w-2xl mx-auto", children: "Create powerful tools and collaborate with innovators in the HIVE ecosystem. Join thousands of creators building the next generation of digital experiences." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "p-6 border border-[var(--hive-border-default)] rounded-lg space-y-3", children: [_jsx(Text, { as: "h3", variant: "heading-md", color: "gold", children: "Create" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Build custom tools and applications with our visual builder and powerful APIs." }), _jsx(Text, { variant: "body-xs", color: "muted", children: "Available in Pro plan" })] }), _jsxs("div", { className: "p-6 border border-[var(--hive-border-default)] rounded-lg space-y-3", children: [_jsx(Text, { as: "h3", variant: "heading-md", color: "emerald", children: "Collaborate" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Work together in real-time with advanced collaboration features and shared workspaces." }), _jsx(Text, { variant: "body-xs", color: "muted", children: "Free for all users" })] }), _jsxs("div", { className: "p-6 border border-[var(--hive-border-default)] rounded-lg space-y-3", children: [_jsx(Text, { as: "h3", variant: "heading-md", color: "ruby", children: "Scale" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Deploy and scale your tools to serve thousands of users with enterprise-grade infrastructure." }), _jsx(Text, { variant: "body-xs", color: "muted", children: "Enterprise only" })] })] })] }))
};
// Interactive Demo
export const Interactive = {
    render: (args) => (_jsx("div", { className: "max-w-2xl", children: _jsx(Text, { ...args }) })),
    args: {
        as: 'p',
        variant: 'body-md',
        color: 'primary',
        weight: undefined,
        align: 'left',
        truncate: false,
        children: 'Customize this text using the controls below to see how different combinations of props affect the appearance and semantic meaning.'
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo - use the controls below to test different text configurations including variant, color, weight, alignment, and semantic HTML elements.'
            }
        }
    }
};
//# sourceMappingURL=text.stories.js.map