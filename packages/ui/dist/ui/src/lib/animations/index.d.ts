/**
 * HIVE Animation System (2025)
 *
 * Comprehensive animation library for modern, tech-sleek interfaces.
 * Inspired by Linear, Apple, Stripe, and Arc Browser.
 *
 * @see /packages/ui/HIVE_ANIMATION_SYSTEM.md
 */
export { springs, easings, transitions, fade, scale, slide, stagger, modal, micro, celebration, page, loading, gesture, } from './presets';
export { createSwipeHandlers, useSwipeToDismiss, dragToReorderProps, usePullToRefresh, useLongPress, pinchToZoomProps, triggerHaptic, gesturePresets, } from './gestures';
export type { SwipeConfig, SwipeToDismissConfig, DragToReorderConfig, PullToRefreshConfig, LongPressConfig, HapticFeedbackType, } from './gestures';
export { layoutTransitions, layoutProps, listItemProps, gridItemProps, accordionProps, tabUnderlineProps, tabContentProps, createSharedElement, collapseProps, notificationProps, flipCardProps, masonryItemProps, magicMoveProps, reorderArray, findIndexByPosition, } from './layout';
export { useScrollProgress, useElementScrollProgress, useParallax, useParallaxLayers, useScrollReveal, useScrollRevealStagger, useFadeOnScroll, useScaleOnScroll, useRotateOnScroll, useStickyScroll, useScrollDirection, useHideOnScroll, useScrollSnap, useScrollVelocity, } from './scroll';
export type { ParallaxConfig, ScrollRevealConfig, ScrollDirection, } from './scroll';
export { MotionDiv, MotionSpan, MotionButton, MotionLink, MotionNav, MotionAside, AnimatePresence, } from '../../shells/motion-safe';
//# sourceMappingURL=index.d.ts.map