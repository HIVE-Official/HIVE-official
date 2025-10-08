/**
 * HIVE Scroll-Linked Animation System
 *
 * Modern scroll-driven animations inspired by Linear, Apple, and Stripe.
 * Performance-optimized with IntersectionObserver and requestAnimationFrame.
 *
 * @see https://scroll-driven-animations.style/
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, type MotionValue } from 'framer-motion';

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
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return { scrollYProgress };
}

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
export function useElementScrollProgress(
  targetRef: React.RefObject<HTMLElement>
) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  return { scrollYProgress };
}

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
export function useParallax(
  targetRef: React.RefObject<HTMLElement>,
  config: ParallaxConfig = {}
): MotionValue<number> {
  const { speed = 0.5, direction = 'up', range = [-100, 100] } = config;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [range[0] * speed, range[1] * speed] : [range[1] * speed, range[0] * speed]
  );

  return y;
}

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
export function useParallaxLayers(
  targetRef: React.RefObject<HTMLElement>,
  layerCount: number = 3
): MotionValue<number>[] {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const layers: MotionValue<number>[] = [];
  for (let i = 0; i < layerCount; i++) {
    const speed = (i + 1) / layerCount;
    const offset = 100 - i * 30;
    layers.push(
      useTransform(scrollYProgress, [0, 1], [-offset * speed, offset * speed])
    );
  }

  return layers;
}

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
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  config: ScrollRevealConfig = {}
) {
  const { threshold = 0.1, rootMargin = '0px', once = true } = config;

  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}

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
export function useScrollRevealStagger(
  count: number,
  config: ScrollRevealConfig & { delay?: number } = {}
) {
  const items = Array.from({ length: count }, (_, i) => {
    const reveal = useScrollReveal(config);
    return {
      ...reveal,
      delay: (config.delay ?? 0.1) * i,
    };
  });

  return items;
}

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
export function useFadeOnScroll(targetRef: React.RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return opacity;
}

/**
 * Scale on scroll
 *
 * @example
 * ```tsx
 * const scale = useScaleOnScroll(ref);
 * <motion.div ref={ref} style={{ scale }} />
 * ```
 */
export function useScaleOnScroll(
  targetRef: React.RefObject<HTMLElement>,
  scaleRange: [number, number] = [0.8, 1]
) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  return scale;
}

/**
 * Rotate on scroll
 *
 * @example
 * ```tsx
 * const rotate = useRotateOnScroll(ref, [0, 360]);
 * <motion.div ref={ref} style={{ rotate }} />
 * ```
 */
export function useRotateOnScroll(
  targetRef: React.RefObject<HTMLElement>,
  rotateRange: [number, number] = [0, 180]
) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);
  return rotate;
}

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
export function useStickyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return {
    containerRef,
    progress: scrollYProgress,
  };
}

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
export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setDirection('up');
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return direction;
}

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
export function useHideOnScroll(threshold: number = 10): boolean {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      if (Math.abs(diff) < threshold) return;

      if (diff > 0 && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isVisible;
}

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
export function useScrollSnap(sectionCount: number) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newSection = Math.round(scrollPosition / windowHeight);
      setActiveSection(Math.min(newSection, sectionCount - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionCount]);

  return {
    activeSection,
    sections: Array.from({ length: sectionCount }, (_, i) => i),
  };
}

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
export function useScrollVelocity(): MotionValue<number> {
  const { scrollY } = useScroll();
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      const now = Date.now();
      const timeDelta = now - lastTime.current;
      const scrollDelta = latest - lastScrollY.current;

      if (timeDelta > 0) {
        const newVelocity = (scrollDelta / timeDelta) * 1000; // px/s
        setVelocity(newVelocity);
      }

      lastScrollY.current = latest;
      lastTime.current = now;
    });

    return unsubscribe;
  }, [scrollY]);

  return useTransform(() => velocity);
}
