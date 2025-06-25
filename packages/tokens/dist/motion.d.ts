export declare const motion: {
    duration: {
        instant: string;
        fast: string;
        base: string;
        slow: string;
        ritual: string;
    };
    easing: {
        smooth: string;
        snap: string;
        elegant: string;
        brand: string;
        linear: string;
        ease: string;
    };
    scale: {
        none: string;
        micro: string;
        small: string;
        medium: string;
        large: string;
        ritual: string;
    };
    keyframes: {
        fadeIn: string;
        slideUp: string;
        slideDown: string;
        scaleIn: string;
        goldPulse: string;
        goldGlow: string;
        surfaceRise: string;
        embossReveal: string;
        ritualBurst: string;
        spaceJoin: string;
    };
    performance: {
        gpu: string[];
        layout: string[];
        willChange: {
            transform: string;
            opacity: string;
            filter: string;
            auto: string;
        };
    };
    accessibility: {
        reducedMotion: {
            duration: string;
            easing: string;
            scale: string;
        };
        focus: {
            ring: string;
            offset: string;
            duration: string;
        };
    };
};
export declare const createHiveTransition: (property?: string, duration?: keyof typeof motion.duration, easing?: keyof typeof motion.easing) => string;
export declare const createHiveHover: (scale?: keyof typeof motion.scale) => {
    transition: string;
    "&:hover": {
        transform: string;
    };
};
export declare const createGoldAccent: (duration?: keyof typeof motion.duration) => {
    transition: string;
    "&:hover": {
        boxShadow: string;
        borderColor: string;
    };
};
export declare const hiveAnimations: {
    cardHover: {
        transition: string;
        "&:hover": {
            transform: string;
            boxShadow: string;
        };
    };
    buttonPress: {
        transition: string;
        "&:active": {
            transform: string;
        };
        "&:hover": {
            transform: string;
            boxShadow: string;
        };
    };
    modalEnter: {
        animation: string;
    };
    ritualCelebration: {
        animation: string;
    };
};
export default motion;
//# sourceMappingURL=motion.d.ts.map