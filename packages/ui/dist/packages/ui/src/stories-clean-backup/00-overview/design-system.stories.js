import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text, Heading, Caption } from '../../atomic/atoms';
const meta = {
    title: '00-Overview/HIVE Design System',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
# HIVE Design System Overview

This is the complete HIVE design system - a clean, atomic approach to building our student social platform.

## Our Philosophy
- **Atomic Design**: Atoms → Molecules → Organisms → Templates → Pages
- **Zero Hardcoded Values**: 100% semantic tokens (var(--hive-*))
- **Mobile-First**: Web-first experience that runs beautifully on mobile
- **Student-Focused**: Built for university social experiences

## Color System
- **Monochrome Foundation**: Vercel-inspired blacks, grays, whites
- **Single Gold Accent**: #FFD700 only - no champagne or other metals
- **High Contrast**: Optimized for accessibility and dark-mode preference

## Typography
- **Space Grotesk**: Display font for headings and impact
- **Geist Sans**: Body font for readability and interface

## Components Architecture
Our system follows strict atomic design principles with 100% token compliance.
        `,
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const Welcome = {
    render: () => (_jsxs("div", { className: "space-y-12", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx(Heading, { level: 1, className: "bg-gradient-to-r from-[var(--hive-text-primary)] to-[var(--hive-brand-secondary)] bg-clip-text text-transparent", children: "HIVE Design System" }), _jsx(Text, { size: "lg", color: "secondary", className: "max-w-2xl mx-auto", children: "Complete atomic design system for student social experiences. Built with zero hardcoded values and 100% semantic token compliance." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-6 bg-[var(--hive-background-secondary)]", children: [_jsx(Heading, { level: 3, color: "brand", className: "mb-3", children: "Foundation" }), _jsx(Text, { size: "sm", color: "secondary", children: "Colors, typography, logos, and icons" })] }), _jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-6 bg-[var(--hive-background-secondary)]", children: [_jsx(Heading, { level: 3, color: "brand", className: "mb-3", children: "Atoms" }), _jsx(Text, { size: "sm", color: "secondary", children: "Basic building blocks - buttons, inputs, text" })] }), _jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-6 bg-[var(--hive-background-secondary)]", children: [_jsx(Heading, { level: 3, color: "brand", className: "mb-3", children: "Molecules" }), _jsx(Text, { size: "sm", color: "secondary", children: "Simple combinations - forms, cards, navigation" })] })] }), _jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-8 bg-[var(--hive-background-secondary)]", children: [_jsx(Heading, { level: 3, className: "mb-4", children: "Design Principles" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx(Text, { weight: "medium", className: "mb-2", children: "\uD83C\uDFAF Student-First" }), _jsx(Caption, { children: "Every component optimized for university social experiences" })] }), _jsxs("div", { children: [_jsx(Text, { weight: "medium", className: "mb-2", children: "\u26A1 Zero Hardcoded" }), _jsx(Caption, { children: "100% semantic tokens ensure perfect consistency" })] }), _jsxs("div", { children: [_jsx(Text, { weight: "medium", className: "mb-2", children: "\uD83D\uDCF1 Mobile-Ready" }), _jsx(Caption, { children: "Web-first that runs beautifully on mobile devices" })] }), _jsxs("div", { children: [_jsx(Text, { weight: "medium", className: "mb-2", children: "\uD83C\uDFA8 Atomic Design" }), _jsx(Caption, { children: "Clean component hierarchy following atomic principles" })] })] })] })] })),
};
//# sourceMappingURL=design-system.stories.js.map