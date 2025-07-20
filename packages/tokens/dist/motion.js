// Motion design tokens - Liquid Metal Motion System
export const motion = {
    // Liquid Metal Easing - Signature HIVE feel (orchestrated curves)
    easing: {
        // Primary HIVE signature curves
        liquid: 'cubic-bezier(0.23, 1, 0.32, 1)', // Main easing curve - liquid mercury
        magnetic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Gravitational pull
        silk: 'cubic-bezier(0.16, 1, 0.3, 1)', // Silk touch
        steel: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Steel spring
        molten: 'cubic-bezier(0.19, 1, 0.22, 1)', // Molten flow
        snap: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Premium snap
        // Orchestrated sequence curves
        orchestrated: 'cubic-bezier(0.215, 0.61, 0.355, 1)', // For milestone sequences
        cinematic: 'cubic-bezier(0.165, 0.84, 0.44, 1)', // For major moments
        cascade: 'cubic-bezier(0.19, 1, 0.22, 1)', // For ripple effects
        // Tool-specific curves
        toolSnap: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', // Magnetic tool assembly
        toolFloat: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Floating tools
        toolPlant: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Tool planting
        // Legacy support
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)', // Entrance
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)', // Exit
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // Bidirectional
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Spring feel
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bounce back
    },
    // Duration Scale - Orchestrated timing (aligned with hive-motion.ts)
    duration: {
        instant: '0.1s', // Micro-interactions
        snap: '0.15s', // Button presses
        quick: '0.2s', // Button press, toggle
        smooth: '0.25s', // Hover states
        liquid: '0.35s', // Card movements
        flowing: '0.5s', // Layout changes
        cascade: '0.75s', // Sequential animations
        dramatic: '1.0s', // Space activation, major state change
        orchestrated: '1.2s', // Full sequences, achievement moments
        cinematic: '1.0s', // Cinematic moments
    },
    // Cascade Timing - For ripple effects and orchestrated sequences
    cascade: {
        wave: '0.03s', // Ultra-fast wave effects (18ms)
        ripple: '0.05s', // Standard ripple spread (30ms)
        stagger: '0.08s', // Sequential element reveals (48ms)
        sequence: '0.12s', // Deliberate orchestrated sequences (72ms)
        milestone: '0.15s', // Major milestone celebrations (90ms)
        cinematic: '0.2s', // Epic space activation moments (120ms)
    },
    // Orchestration timing patterns for complex sequences
    orchestration: {
        // Tool creation sequence timing
        toolCreation: {
            elementAppear: '0.1s', // Individual elements appear
            elementConnect: '0.08s', // Elements connect magnetically
            toolComplete: '0.15s', // Tool completion celebration
            plantDelay: '0.3s', // Delay before planting
        },
        // Space activation sequence timing
        spaceActivation: {
            rippleStart: '0s', // Immediate ripple from activation point
            connectedElements: '0.05s', // Connected UI elements respond
            secondaryWave: '0.3s', // Secondary wave for distant elements
            celebration: '0.8s', // Celebration sequence starts
        },
        // Feed update sequence timing
        feedUpdate: {
            newItemAppear: '0.1s', // New feed item appears
            existingItemShift: '0.05s', // Existing items shift
            readIndicator: '0.2s', // Read/unread indicators update
        },
        // Builder progression timing
        builderProgression: {
            skillUnlock: '0.2s', // New skill unlocks
            badgeAppear: '0.15s', // Achievement badge appears
            rightsPropagation: '0.1s', // New rights propagate through UI
        }
    },
    // Transform Values - Consistent scaling and movement
    transform: {
        // Scale transforms
        scaleHover: '1.02', // Subtle hover scale
        scaleTap: '0.98', // Press down scale
        scaleModal: '1.05', // Modal entrance scale
        // Translation values
        moveHover: '-2px', // Upward hover movement
        movePress: '0px', // Return to baseline
        moveSlide: '20px', // Slide in/out distance
        // Rotation values
        rotateSubtle: '1deg', // Subtle rotation
        rotateMedium: '3deg', // Medium rotation
        rotateFull: '360deg', // Full rotation
    },
    // Spring Physics - For realistic motion feel
    spring: {
        // Mass - weight feeling
        light: '0.5', // Light, snappy elements
        normal: '0.8', // Standard weight
        heavy: '1.2', // Substantial elements
        // Stiffness - responsiveness
        soft: '200', // Gentle, flowing
        medium: '400', // Balanced response
        firm: '600', // Quick, decisive
        snap: '800', // Immediate snap
        // Damping - settle behavior
        loose: '15', // Some overshoot
        balanced: '25', // Smooth settle
        tight: '30', // Quick settle
        overdamped: '40', // No overshoot
    },
    // Magnetic Zones - Tool assembly physics
    magnetic: {
        near: '20px', // Detection zone
        snap: '8px', // Snap threshold
        release: '40px', // Release distance
    },
};
// Performance optimization constants
export const performance = {
    willChange: {
        transform: 'transform',
        opacity: 'opacity',
        auto: 'auto',
        scroll: 'scroll-position',
    },
    transformOrigin: {
        center: 'center',
        top: 'top',
        bottom: 'bottom',
        left: 'left',
        right: 'right',
    },
    backfaceVisibility: {
        visible: 'visible',
        hidden: 'hidden',
    },
};
//# sourceMappingURL=motion.js.map