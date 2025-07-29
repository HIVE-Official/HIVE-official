# HIVE Motion System Documentation

## **Motion Philosophy: Liquid Metal Luxury**

The HIVE motion system embodies the feeling of **liquid metal** - smooth, premium, and substantial. Every animation should feel like high-end hardware responding to touch, with subtle bounce and magnetic attraction that makes interactions feel **alive and responsive**.

---

## **🎭 Motion Personality**

### **Core Characteristics**
- **Liquid Metal Feel** - Smooth, flowing transitions with subtle elasticity
- **Premium Hardware** - Substantial weight and refined responsiveness  
- **Magnetic Attraction** - Elements feel drawn to interaction points
- **Subtle Bounce** - Gentle spring physics without being playful
- **Campus Infrastructure** - Reliable, trustworthy, professional motion

### **Emotional Goals**
- **Confidence** - Motions that inspire trust in the system
- **Sophistication** - Refined animations that feel premium
- **Responsiveness** - Immediate feedback that feels alive
- **Substance** - Animations with physical weight and presence
- **Focus** - Motion that guides attention without distraction

---

## **⚡ Motion System Architecture**

### **Core Motion Configuration**
```typescript
// packages/ui/src/motion/hive-motion-system.ts
export const liquidMetal = {
  // Primary easing curve - liquid metal feel
  easing: [0.23, 1, 0.32, 1] as const,
  
  // Secondary easing - magnetic attraction
  magnetic: [0.175, 0.885, 0.32, 1.275] as const,
  
  // Bounce easing - subtle elasticity
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  
  // Sharp easing - precise movements
  sharp: [0.4, 0, 0.2, 1] as const,
};

export const motionDurations = {
  instant: 0.1,      // Immediate feedback (100ms)
  quick: 0.2,        // Quick interactions (200ms)
  smooth: 0.4,       // Standard animations (400ms)
  flowing: 0.6,      // Flowing transitions (600ms)
  dramatic: 0.8,     // Dramatic effects (800ms)
  orchestrated: 1.2, // Complex sequences (1200ms)
};

export const motionConfig = {
  // Reduced motion support
  respectsReducedMotion: true,
  
  // Hardware acceleration
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  transformStyle: 'preserve-3d',
  
  // Performance optimization
  layoutId: 'auto-generate',
  optimizeForSpeed: true,
};
```

---

## **🎬 Standard Motion Patterns**

### **1. Hover Interactions**
```typescript
// Standard hover - subtle elevation
const standardHover = {
  whileHover: {
    scale: 1.02,
    y: -2,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing,
    },
  },
};

// Premium hover - magnetic attraction
const premiumHover = {
  whileHover: {
    scale: 1.03,
    y: -4,
    rotateX: 2,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.magnetic,
    },
  },
};

// Magnetic hover - follows cursor
const magneticHover = {
  whileHover: {
    scale: 1.02,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing,
    },
  },
  // Cursor tracking implemented via motion handlers
};
```

### **2. Tap/Click Interactions**
```typescript
// Standard tap - gentle compression
const standardTap = {
  whileTap: {
    scale: 0.98,
    y: 0,
    transition: {
      duration: motionDurations.instant,
      ease: liquidMetal.sharp,
    },
  },
};

// Premium tap - liquid metal compression
const premiumTap = {
  whileTap: {
    scale: 0.96,
    y: 1,
    rotateX: -1,
    transition: {
      duration: motionDurations.instant,
      ease: liquidMetal.bounce,
    },
  },
};

// Ripple effect - expanding circle
const rippleEffect = {
  whileTap: {
    scale: 0.98,
    transition: {
      duration: motionDurations.instant,
      ease: liquidMetal.sharp,
    },
  },
  // Ripple animation implemented as separate element
};
```

### **3. Entrance Animations**
```typescript
// Fade entrance - subtle opacity transition
const fadeEntrance = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: motionDurations.smooth,
    ease: liquidMetal.easing,
  },
};

// Slide up entrance - liquid metal emergence
const slideUpEntrance = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.95,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 0.95,
  },
  transition: {
    duration: motionDurations.smooth,
    ease: liquidMetal.easing,
  },
};

// Liquid metal entrance - morphing appearance
const liquidMetalEntrance = {
  initial: { 
    opacity: 0, 
    scale: 0.9,
    rotateX: 10,
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    rotateX: 0,
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    rotateX: -10,
  },
  transition: {
    duration: motionDurations.flowing,
    ease: liquidMetal.bounce,
  },
};
```

### **4. Cascade Animations**
```typescript
// Staggered entrance - orchestrated appearance
const createCascadeAnimation = (index: number, total: number) => ({
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.95,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
  },
  transition: {
    duration: motionDurations.smooth,
    delay: index * 0.1, // 100ms between each item
    ease: liquidMetal.easing,
  },
});

// Wave effect - flowing cascade
const createWaveAnimation = (index: number, total: number) => ({
  initial: { 
    opacity: 0, 
    x: -30,
    rotateY: 15,
  },
  animate: { 
    opacity: 1, 
    x: 0,
    rotateY: 0,
  },
  transition: {
    duration: motionDurations.flowing,
    delay: index * 0.05, // 50ms between each item
    ease: liquidMetal.magnetic,
  },
});
```

---

## **🧲 Magnetic Interactions**

### **Magnetic Hover System**
```typescript
// Magnetic hover component
const MagneticHover = ({ 
  children, 
  intensity = 1, 
  distance = 100,
  className,
  ...props 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (dist < distance) {
      const factor = (distance - dist) / distance * intensity;
      setPosition({
        x: deltaX * factor * 0.3,
        y: deltaY * factor * 0.3,
      });
    }
  };
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  return (
    <motion.div
      ref={elementRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
```

### **Magnetic Snap System**
```typescript
// Magnetic snap for drag interactions
const MagneticSnap = ({ 
  children, 
  snapTargets = [], 
  snapDistance = 50,
  ...props 
}) => {
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [snapTarget, setSnapTarget] = useState(null);
  
  const handleDrag = (_, info) => {
    const newPosition = { x: info.point.x, y: info.point.y };
    
    // Check for snap targets
    const closestTarget = snapTargets.reduce((closest, target) => {
      const distance = Math.sqrt(
        Math.pow(newPosition.x - target.x, 2) + 
        Math.pow(newPosition.y - target.y, 2)
      );
      
      if (distance < snapDistance && (!closest || distance < closest.distance)) {
        return { target, distance };
      }
      return closest;
    }, null);
    
    if (closestTarget) {
      setSnapTarget(closestTarget.target);
      setDragPosition(closestTarget.target);
    } else {
      setSnapTarget(null);
      setDragPosition(newPosition);
    }
  };
  
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDrag={handleDrag}
      animate={dragPosition}
      transition={{
        type: "spring",
        stiffness: snapTarget ? 500 : 300,
        damping: snapTarget ? 40 : 30,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
```

---

## **💧 Liquid Metal Effects**

### **Liquid Ripple Effect**
```typescript
// Liquid ripple component
const LiquidRipple = ({ 
  trigger, 
  color = 'var(--hive-brand-primary)', 
  size = 100,
  duration = 0.6,
  ...props 
}) => {
  const [ripples, setRipples] = useState([]);
  
  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, duration * 1000);
  };
  
  return (
    <div
      onClick={createRipple}
      className="relative overflow-hidden"
      {...props}
    >
      {trigger}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: color,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{
            duration,
            ease: liquidMetal.easing,
          }}
        />
      ))}
    </div>
  );
};
```

### **Liquid Transform Effect**
```typescript
// Morphing liquid metal effect
const LiquidTransform = ({ 
  children, 
  from, 
  to, 
  trigger = 'hover',
  ...props 
}) => {
  const [isTransformed, setIsTransformed] = useState(false);
  
  const variants = {
    initial: {
      ...from,
      transition: {
        duration: motionDurations.flowing,
        ease: liquidMetal.magnetic,
      },
    },
    transformed: {
      ...to,
      transition: {
        duration: motionDurations.flowing,
        ease: liquidMetal.magnetic,
      },
    },
  };
  
  const triggerProps = trigger === 'hover' ? {
    onMouseEnter: () => setIsTransformed(true),
    onMouseLeave: () => setIsTransformed(false),
  } : {
    onClick: () => setIsTransformed(!isTransformed),
  };
  
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={isTransformed ? "transformed" : "initial"}
      {...triggerProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};
```

---

## **🎯 Component Motion Integration**

### **Standard Motion Hook**
```typescript
// useHiveMotion hook for consistent motion patterns
const useHiveMotion = (config: MotionConfig) => {
  const [isReducedMotion] = useReducedMotion();
  
  const motionProps = useMemo(() => {
    if (isReducedMotion) {
      return {
        initial: false,
        animate: false,
        exit: false,
        transition: { duration: 0 },
      };
    }
    
    return {
      whileHover: config.hover || standardHover.whileHover,
      whileTap: config.tap || standardTap.whileTap,
      initial: config.entrance?.initial || slideUpEntrance.initial,
      animate: config.entrance?.animate || slideUpEntrance.animate,
      exit: config.entrance?.exit || slideUpEntrance.exit,
      transition: config.transition || {
        duration: motionDurations.smooth,
        ease: liquidMetal.easing,
      },
    };
  }, [config, isReducedMotion]);
  
  return motionProps;
};
```

### **Component Motion Template**
```typescript
// Template for adding motion to HIVE components
const HiveMotionComponent = React.forwardRef<HTMLDivElement, HiveMotionProps>(
  ({ 
    children,
    motionType = 'standard',
    animateEntrance = 'slideUp',
    cascadeIndex = 0,
    magneticHover = false,
    className,
    ...props 
  }, ref) => {
    
    // Generate motion configuration
    const motionConfig = useHiveMotion({
      hover: motionType === 'premium' ? premiumHover : standardHover,
      tap: motionType === 'premium' ? premiumTap : standardTap,
      entrance: animateEntrance ? entranceAnimations[animateEntrance] : null,
      cascade: cascadeIndex,
    });
    
    // Conditional magnetic hover wrapper
    const MotionComponent = magneticHover ? MagneticHover : motion.div;
    
    return (
      <MotionComponent
        ref={ref}
        className={className}
        {...motionConfig}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);
```

---

## **📱 Responsive Motion**

### **Motion Breakpoints**
```typescript
// Responsive motion configuration
const responsiveMotion = {
  mobile: {
    // Reduced motion on mobile for performance
    hover: { scale: 1.01, y: -1 },
    tap: { scale: 0.99 },
    duration: motionDurations.quick,
  },
  tablet: {
    // Standard motion on tablets
    hover: { scale: 1.02, y: -2 },
    tap: { scale: 0.98 },
    duration: motionDurations.smooth,
  },
  desktop: {
    // Full motion on desktop
    hover: { scale: 1.02, y: -2, rotateX: 2 },
    tap: { scale: 0.98, rotateX: -1 },
    duration: motionDurations.smooth,
  },
};

// Responsive motion hook
const useResponsiveMotion = () => {
  const [screenSize] = useScreenSize();
  
  return useMemo(() => {
    switch (screenSize) {
      case 'mobile':
        return responsiveMotion.mobile;
      case 'tablet':
        return responsiveMotion.tablet;
      default:
        return responsiveMotion.desktop;
    }
  }, [screenSize]);
};
```

---

## **⚡ Performance Optimization**

### **Motion Performance Guidelines**
```typescript
// Performance optimization patterns
const performanceOptimizations = {
  // Use transform instead of changing layout properties
  preferred: {
    x: 100,           // transform: translateX(100px)
    y: 50,            // transform: translateY(50px)
    scale: 1.1,       // transform: scale(1.1)
    rotate: 45,       // transform: rotate(45deg)
    opacity: 0.8,     // opacity: 0.8
  },
  
  // Avoid these - they cause layout recalculation
  avoided: {
    left: 100,        // Causes layout shift
    top: 50,          // Causes layout shift
    width: 200,       // Causes layout shift
    height: 100,      // Causes layout shift
  },
  
  // Hardware acceleration
  hardwareAccelerated: {
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    perspective: 1000,
  },
};

// Performance monitoring
const useMotionPerformance = () => {
  const [fps, setFps] = useState(60);
  const [isOptimized, setIsOptimized] = useState(true);
  
  useEffect(() => {
    // Monitor animation performance
    const performanceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      // Analyze performance entries
    });
    
    performanceObserver.observe({ entryTypes: ['measure'] });
    
    return () => performanceObserver.disconnect();
  }, []);
  
  return { fps, isOptimized };
};
```

---

## **♿ Accessibility Considerations**

### **Reduced Motion Support**
```typescript
// Respect user preferences for reduced motion
const useReducedMotion = () => {
  const [prefersReducedMotion] = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  return [prefersReducedMotion];
};

// Conditional motion wrapper
const AccessibleMotion = ({ children, ...motionProps }) => {
  const [isReducedMotion] = useReducedMotion();
  
  if (isReducedMotion) {
    return <div {...motionProps}>{children}</div>;
  }
  
  return <motion.div {...motionProps}>{children}</motion.div>;
};
```

### **Motion Accessibility Guidelines**
```typescript
// Accessible motion patterns
const accessibleMotion = {
  // Duration limits
  maxDuration: 0.5,        // Max 500ms for accessibility
  minDuration: 0.1,        // Min 100ms for perceivability
  
  // Reduced motion alternatives
  reducedMotion: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  
  // Focus indicators
  focusMotion: {
    scale: 1.05,
    transition: { duration: 0.15 },
  },
  
  // Screen reader considerations
  screenReader: {
    // Avoid rapid changes that disrupt screen readers
    minInterval: 100,
    announceChanges: true,
  },
};
```

---

## **🎨 Motion Design Tokens**

### **Motion Token System**
```css
/* Motion duration tokens */
--hive-motion-instant: 0.1s;
--hive-motion-quick: 0.2s;
--hive-motion-smooth: 0.4s;
--hive-motion-flowing: 0.6s;
--hive-motion-dramatic: 0.8s;
--hive-motion-orchestrated: 1.2s;

/* Motion easing tokens */
--hive-motion-easing: cubic-bezier(0.23, 1, 0.32, 1);
--hive-motion-magnetic: cubic-bezier(0.175, 0.885, 0.32, 1.275);
--hive-motion-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--hive-motion-sharp: cubic-bezier(0.4, 0, 0.2, 1);

/* Motion scale tokens */
--hive-motion-scale-hover: 1.02;
--hive-motion-scale-tap: 0.98;
--hive-motion-scale-entrance: 0.95;

/* Motion distance tokens */
--hive-motion-distance-hover: -2px;
--hive-motion-distance-tap: 0px;
--hive-motion-distance-entrance: 20px;
```

---

## **📊 Motion Testing**

### **Motion Testing Guidelines**
```typescript
// Motion testing utilities
const motionTestUtils = {
  // Test motion duration
  testDuration: (element, expectedDuration) => {
    const animation = element.getAnimations()[0];
    expect(animation.effect.timing.duration).toBe(expectedDuration);
  },
  
  // Test motion easing
  testEasing: (element, expectedEasing) => {
    const animation = element.getAnimations()[0];
    expect(animation.effect.timing.easing).toBe(expectedEasing);
  },
  
  // Test reduced motion
  testReducedMotion: (component) => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      value: () => ({ matches: true }),
    });
    
    const { container } = render(component);
    // Assert no animations are running
    expect(container.getAnimations()).toHaveLength(0);
  },
  
  // Test performance
  testPerformance: async (component) => {
    performance.mark('motion-start');
    render(component);
    performance.mark('motion-end');
    
    const measure = performance.measure('motion-test', 'motion-start', 'motion-end');
    expect(measure.duration).toBeLessThan(16); // 60fps threshold
  },
};
```

---

## **🚀 Motion System Checklist**

### **Component Motion Requirements**
- [ ] **Liquid Metal Feel** - Smooth, premium animations
- [ ] **Consistent Timing** - Uses standard durations
- [ ] **Hardware Acceleration** - Optimized transforms
- [ ] **Reduced Motion Support** - Respects user preferences
- [ ] **Performance Optimized** - Maintains 60fps
- [ ] **Accessibility Compliant** - Meets WCAG guidelines
- [ ] **Responsive Behavior** - Adapts to screen size
- [ ] **Campus Context** - Appropriate for educational environment

### **Motion Implementation Steps**
1. **Choose Motion Type** - Standard, premium, or magnetic
2. **Configure Timing** - Select appropriate duration
3. **Add Entrance Animation** - Fade, slide, or cascade
4. **Implement Hover/Tap** - Consistent interaction feedback
5. **Test Performance** - Ensure smooth 60fps
6. **Test Accessibility** - Verify reduced motion support
7. **Document Usage** - Add to component documentation

---

**The HIVE motion system creates a cohesive, premium experience that feels like liquid metal responding to touch - smooth, substantial, and sophisticated, perfectly suited for campus infrastructure that empowers students as builders.**