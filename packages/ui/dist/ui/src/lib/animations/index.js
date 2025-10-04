/**
 * HIVE Animation System (2025)
 *
 * Comprehensive animation library for modern, tech-sleek interfaces.
 * Inspired by Linear, Apple, Stripe, and Arc Browser.
 *
 * @see /packages/ui/HIVE_ANIMATION_SYSTEM.md
 */
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ANIMATION PRESETS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { 
// Spring physics
springs, 
// Easing curves
easings, 
// Transition presets
transitions, 
// Fade animations
fade, 
// Scale animations
scale, 
// Slide animations
slide, 
// Stagger animations
stagger, 
// Modal animations
modal, 
// Micro-interactions
micro, 
// Celebration animations
celebration, 
// Page transitions
page, 
// Loading animations
loading, 
// Gesture presets
gesture, } from './presets';
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GESTURE SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { 
// Swipe gestures
createSwipeHandlers, useSwipeToDismiss, 
// Drag to reorder
dragToReorderProps, 
// Pull to refresh
usePullToRefresh, 
// Long press
useLongPress, 
// Pinch to zoom
pinchToZoomProps, 
// Haptic feedback
triggerHaptic, 
// Gesture presets
gesturePresets, } from './gestures';
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LAYOUT ANIMATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { 
// Layout transitions
layoutTransitions, 
// Layout props
layoutProps, 
// List animations
listItemProps, gridItemProps, 
// Accordion
accordionProps, 
// Tabs
tabUnderlineProps, tabContentProps, 
// Shared elements
createSharedElement, 
// Collapse/expand
collapseProps, 
// Notifications
notificationProps, 
// Card flip
flipCardProps, 
// Masonry
masonryItemProps, 
// Magic move
magicMoveProps, 
// Utilities
reorderArray, findIndexByPosition, } from './layout';
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCROLL ANIMATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { 
// Scroll progress
useScrollProgress, useElementScrollProgress, 
// Parallax
useParallax, useParallaxLayers, 
// Scroll reveal
useScrollReveal, useScrollRevealStagger, 
// Transformations
useFadeOnScroll, useScaleOnScroll, useRotateOnScroll, 
// Sticky scroll
useStickyScroll, 
// Scroll direction
useScrollDirection, useHideOnScroll, 
// Scroll snap
useScrollSnap, 
// Scroll velocity
useScrollVelocity, } from './scroll';
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RE-EXPORTS FROM SHELLS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { MotionDiv, MotionSpan, MotionButton, MotionLink, MotionNav, MotionAside, AnimatePresence, } from '../../shells/motion-safe';
//# sourceMappingURL=index.js.map