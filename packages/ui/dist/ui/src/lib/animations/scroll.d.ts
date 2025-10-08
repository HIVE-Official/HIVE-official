/**
 * HIVE Scroll-Linked Animation System
 *
 * Modern scroll-driven animations inspired by Linear, Apple, and Stripe.
 * Performance-optimized with IntersectionObserver and requestAnimationFrame.
 *
 * @see https://scroll-driven-animations.style/
 */
import { type MotionValue } from 'framer-motion';
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SCROLL PROGRESS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Get scroll progress (0 to 1) for entire page
 *
 * @example
 * ```tsx
 * const { scrollYProgress } = useScrollProgress();
 *
 * <motion.div style={{ scaleX: scrollYProgress }} />
 * ```
 */
export declare function useScrollProgress(): {
    scrollYProgress: MotionValue<number>;
};
/**
 * Get scroll progress for specific element
 *
 * @example
 * ```tsx
 * const ref = useRef(null);
 * const { scrollYProgress } = useElementScrollProgress(ref);
 *
 * <div ref={ref}>
 *   <motion.div style={{ opacity: scrollYProgress }} />
 * </div>
 * ```
 */
export declare function useElementScrollProgress(targetRef: React.RefObject<HTMLElement>): {
    scrollYProgress: MotionValue<number>;
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PARALLAX EFFECTS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export interface ParallaxConfig {
    /** Speed multiplier (default: 0.5) */
    speed?: number;
    /** Direction: 'up' | 'down' (default: 'up') */
    direction?: 'up' | 'down';
    /** Offset range (default: [-100, 100]) */
    range?: [number, number];
}
/**
 * Create parallax effect
 *
 * @example
 * ```tsx
 * const ref = useRef(null);
 * const y = useParallax(ref, { speed: 0.3 });
 *
 * <motion.div ref={ref} style={{ y }}>
 *   Parallax content
 * </motion.div>
 * ```
 */
export declare function useParallax(targetRef: React.RefObject<HTMLElement>, config?: ParallaxConfig): MotionValue<number>;
/**
 * Multi-layer parallax (depth effect)
 *
 * @example
 * ```tsx
 * const layers = useParallaxLayers(ref, 3);
 *
 * <div ref={ref}>
 *   <motion.div style={{ y: layers[0] }}>Background</motion.div>
 *   <motion.div style={{ y: layers[1] }}>Middle</motion.div>
 *   <motion.div style={{ y: layers[2] }}>Foreground</motion.div>
 * </div>
 * ```
 */
export declare function useParallaxLayers(targetRef: React.RefObject<HTMLElement>, layerCount?: number): MotionValue<number>[];
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SCROLL REVEAL (Intersection Observer)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export interface ScrollRevealConfig {
    /** Threshold (0-1, default: 0.1) */
    threshold?: number;
    /** Root margin (default: '0px') */
    rootMargin?: string;
    /** Trigger once only (default: true) */
    once?: boolean;
}
/**
 * Reveal element when scrolled into view
 *
 * @example
 * ```tsx
 * const { ref, isInView } = useScrollReveal();
 *
 * <motion.div
 *   ref={ref}
 *   initial={{ opacity: 0, y: 50 }}
 *   animate={isInView ? { opacity: 1, y: 0 } : {}}
 * >
 *   Reveal on scroll
 * </motion.div>
 * ```
 */
export declare function useScrollReveal<T extends HTMLElement = HTMLDivElement>(config?: ScrollRevealConfig): {
    ref: import("react").MutableRefObject<T>;
    isInView: boolean;
};
/**
 * Staggered scroll reveal (for lists)
 *
 * @example
 * ```tsx
 * const items = useScrollRevealStagger(4, { delay: 0.1 });
 *
 * {data.map((item, i) => (
 *   <motion.div
 *     ref={items[i].ref}
 *     animate={items[i].isInView ? 'visible' : 'hidden'}
 *     variants={fadeUp}
 *   >
 *     {item.content}
 *   </motion.div>
 * ))}
 * ```
 */
export declare function useScrollRevealStagger(count: number, config?: ScrollRevealConfig & {
    delay?: number;
}): {
    delay: number;
    ref: import("react").MutableRefObject<HTMLDivElement>;
    isInView: boolean;
}[];
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SCROLL-LINKED TRANSFORMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Fade in on scroll
 *
 * @example
 * ```tsx
 * const opacity = useFadeOnScroll(ref);
 * <motion.div ref={ref} style={{ opacity }} />
 * ```
 */
export declare function useFadeOnScroll(targetRef: React.RefObject<HTMLElement>): MotionValue<number>;
/**
 * Scale on scroll
 *
 * @example
 * ```tsx
 * const scale = useScaleOnScroll(ref);
 * <motion.div ref={ref} style={{ scale }} />
 * ```
 */
export declare function useScaleOnScroll(targetRef: React.RefObject<HTMLElement>, scaleRange?: [number, number]): MotionValue<number>;
/**
 * Rotate on scroll
 *
 * @example
 * ```tsx
 * const rotate = useRotateOnScroll(ref, [0, 360]);
 * <motion.div ref={ref} style={{ rotate }} />
 * ```
 */
export declare function useRotateOnScroll(targetRef: React.RefObject<HTMLElement>, rotateRange?: [number, number]): MotionValue<number>;
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * STICKY SCROLL (Pinned sections)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Sticky scroll progress (for pinned sections)
 *
 * @example
 * ```tsx
 * const { containerRef, progress } = useStickyScroll();
 *
 * <div ref={containerRef} className="h-[300vh]">
 *   <motion.div
 *     className="sticky top-0"
 *     style={{ opacity: progress }}
 *   >
 *     Sticky content
 *   </motion.div>
 * </div>
 * ```
 */
export declare function useStickyScroll(): {
    containerRef: import("react").MutableRefObject<HTMLDivElement>;
    progress: MotionValue<number>;
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SCROLL DIRECTION
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export type ScrollDirection = 'up' | 'down' | null;
/**
 * Detect scroll direction
 *
 * @example
 * ```tsx
 * const direction = useScrollDirection();
 *
 * <motion.nav
 *   animate={{
 *     y: direction === 'down' ? -100 : 0,
 *   }}
 * >
 *   Hide nav on scroll down
 * </motion.nav>
 * ```
 */
export declare function useScrollDirection(): ScrollDirection;
/**
 * Hide header on scroll down
 *
 * @example
 * ```tsx
 * const isVisible = useHideOnScroll();
 *
 * <motion.header
 *   animate={{ y: isVisible ? 0 : -100 }}
 * >
 *   Header
 * </motion.header>
 * ```
 */
export declare function useHideOnScroll(threshold?: number): boolean;
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SCROLL SNAP SECTIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Get current snap section index
 *
 * @example
 * ```tsx
 * const { activeSection, sections } = useScrollSnap(4);
 *
 * <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
 *   {sections.map((_, i) => (
 *     <section
 *       key={i}
 *       className="snap-start h-screen"
 *       data-active={activeSection === i}
 *     >
 *       Section {i}
 *     </section>
 *   ))}
 * </div>
 * ```
 */
export declare function useScrollSnap(sectionCount: number): {
    activeSection: number;
    sections: number[];
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SCROLL VELOCITY
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Get scroll velocity (for momentum-based effects)
 *
 * @example
 * ```tsx
 * const velocity = useScrollVelocity();
 *
 * <motion.div
 *   style={{
 *     scale: useTransform(velocity, [-1000, 0, 1000], [0.8, 1, 0.8]),
 *   }}
 * >
 *   Scales based on scroll speed
 * </motion.div>
 * ```
 */
export declare function useScrollVelocity(): MotionValue<number>;
//# sourceMappingURL=scroll.d.ts.map