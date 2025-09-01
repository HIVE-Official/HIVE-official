/**
 * HIVE Unified Card System Architecture
 *
 * This system provides a consistent foundation for all card components,
 * ensuring design token consistency, unified APIs, and cohesive interactions.
 */
import React from 'react';
import type { MotionProps } from 'framer-motion';
import { type VariantProps } from 'class-variance-authority';
/**
 * Base card variants following HIVE design system
 * All cards inherit from this foundation
 */
declare const hiveCardBaseVariants: (props?: ({
    variant?: "error" | "warning" | "default" | "selected" | "academic" | "social" | "active" | "builder" | "minimal" | "elevated" | "interactive" | "premium" | null | undefined;
    size?: "sm" | "default" | "lg" | "xl" | null | undefined;
    shadow?: "none" | "strong" | "medium" | "dramatic" | "glow" | "subtle" | null | undefined;
    border?: "default" | "none" | "strong" | "gold" | "subtle" | "gold-strong" | null | undefined;
    motionType?: "none" | "strong" | "medium" | "magnetic" | "subtle" | null | undefined;
    glass?: "none" | "strong" | "medium" | "subtle" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Unified motion configurations for all cards
 */
declare const cardMotionConfig: {
    subtle: {
        whileHover: {
            scale: number;
            y: number;
        };
        whileTap: {
            scale: number;
        };
        transition: {
            duration: 0.2;
            ease: readonly [0.23, 1, 0.32, 1];
        };
    };
    medium: {
        whileHover: {
            scale: number;
            y: number;
        };
        whileTap: {
            scale: number;
        };
        transition: {
            duration: 0.4;
            ease: readonly [0.23, 1, 0.32, 1];
        };
    };
    strong: {
        whileHover: {
            scale: number;
            y: number;
        };
        whileTap: {
            scale: number;
        };
        transition: {
            duration: 0.4;
            ease: readonly [0.23, 1, 0.32, 1];
        };
    };
    magnetic: {
        whileHover: {
            scale: number;
            y: number;
        };
        whileTap: {
            scale: number;
        };
        transition: {
            duration: 0.2;
            ease: readonly [0.23, 1, 0.32, 1];
        };
    };
    none: {};
};
/**
 * Entrance animation configurations
 */
declare const entranceAnimations: {
    fade: {
        initial: {
            opacity: number;
        };
        animate: {
            opacity: number;
        };
        transition: {
            duration: 0.4;
        };
    };
    slideUp: {
        initial: {
            opacity: number;
            y: number;
        };
        animate: {
            opacity: number;
            y: number;
        };
        transition: {
            duration: 0.4;
            ease: readonly [0.23, 1, 0.32, 1];
        };
    };
    cascade: (index: number) => {
        initial: {
            opacity: number;
            y: number;
        };
        animate: {
            opacity: number;
            y: number;
        };
        transition: {
            duration: 0.4;
            delay: number;
            ease: readonly [0.23, 1, 0.32, 1];
        };
    };
    liquidMetal: {
        initial: {
            opacity: number;
            scale: number;
        };
        animate: {
            opacity: number;
            scale: number;
        };
        transition: {
            duration: 0.6;
            ease: readonly [0.23, 1, 0.32, 1];
        };
    };
};
/**
 * Base props that all cards should inherit from
 */
export interface HiveCardBaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>, VariantProps<typeof hiveCardBaseVariants> {
    className?: string;
    interactive?: boolean;
    selected?: boolean;
    disabled?: boolean;
    loading?: boolean;
    magneticHover?: boolean;
    magneticIntensity?: number;
    animateEntrance?: 'fade' | 'slideUp' | 'cascade' | 'liquidMetal' | false;
    cascadeIndex?: number;
    goldAccent?: boolean;
    glowEffect?: boolean;
    role?: string;
    'aria-label'?: string;
    'aria-selected'?: boolean;
    'aria-disabled'?: boolean;
}
/**
 * Extended props for structured cards
 */
export interface HiveStructuredCardProps extends Omit<HiveCardBaseProps, 'title' | 'content'> {
    header?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    actions?: React.ReactNode;
}
/**
 * Props for entity-specific cards (courses, spaces, users, etc.)
 */
export interface HiveEntityCardProps extends HiveCardBaseProps {
    entity: {
        id: string;
        type: 'course' | 'space' | 'user' | 'tool' | 'project';
        name: string;
        description?: string;
        image?: string;
        status?: 'active' | 'inactive' | 'pending';
        metadata?: Record<string, any>;
    };
    onEntityAction?: (action: string, entityId: string) => void;
    entityActions?: Array<{
        id: string;
        label: string;
        icon?: React.ReactNode;
        variant?: 'primary' | 'secondary' | 'danger';
    }>;
    showStatus?: boolean;
    showMetadata?: boolean;
    showActions?: boolean;
}
/**
 * Utility to generate consistent card animations
 */
export declare const createCardAnimation: (motionType: "subtle" | "medium" | "strong" | "magnetic" | "none", entrance?: "fade" | "slideUp" | "cascade" | "liquidMetal" | false, cascadeIndex?: number) => MotionProps;
/**
 * Utility to generate consistent card variants
 */
export declare const createCardVariant: (baseVariant: string, entity?: {
    type: string;
    status?: string;
}, interactive?: boolean, selected?: boolean) => string;
/**
 * Utility to generate consistent card styles
 */
export declare const createCardStyles: ({ variant, size, shadow, border, motionType, glass, goldAccent, glowEffect, className, }: HiveCardBaseProps & {
    className?: string;
    motionType?: string;
}) => string;
/**
 * Base card component that all other cards inherit from
 */
declare const HiveCardBase: React.ForwardRefExoticComponent<HiveCardBaseProps & React.RefAttributes<HTMLDivElement>>;
export { HiveCardBase, hiveCardBaseVariants, cardMotionConfig, entranceAnimations, };
//# sourceMappingURL=hive-card-system.d.ts.map