export declare const motion: {
    readonly easing: {
        readonly liquid: "cubic-bezier(0.23, 1, 0.32, 1)";
        readonly magnetic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        readonly silk: "cubic-bezier(0.16, 1, 0.3, 1)";
        readonly steel: "cubic-bezier(0.34, 1.56, 0.64, 1)";
        readonly molten: "cubic-bezier(0.19, 1, 0.22, 1)";
        readonly snap: "cubic-bezier(0.25, 0.1, 0.25, 1)";
        readonly orchestrated: "cubic-bezier(0.215, 0.61, 0.355, 1)";
        readonly cinematic: "cubic-bezier(0.165, 0.84, 0.44, 1)";
        readonly cascade: "cubic-bezier(0.19, 1, 0.22, 1)";
        readonly toolSnap: "cubic-bezier(0.68, -0.6, 0.32, 1.6)";
        readonly toolFloat: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        readonly toolPlant: "cubic-bezier(0.34, 1.56, 0.64, 1)";
        readonly easeIn: "cubic-bezier(0.4, 0, 1, 1)";
        readonly easeOut: "cubic-bezier(0, 0, 0.2, 1)";
        readonly easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        readonly bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    };
    readonly duration: {
        readonly instant: "0.1s";
        readonly snap: "0.15s";
        readonly quick: "0.2s";
        readonly smooth: "0.25s";
        readonly liquid: "0.35s";
        readonly flowing: "0.5s";
        readonly cascade: "0.75s";
        readonly dramatic: "1.0s";
        readonly orchestrated: "1.2s";
        readonly cinematic: "1.0s";
    };
    readonly cascade: {
        readonly wave: "0.03s";
        readonly ripple: "0.05s";
        readonly stagger: "0.08s";
        readonly sequence: "0.12s";
        readonly milestone: "0.15s";
        readonly cinematic: "0.2s";
    };
    readonly orchestration: {
        readonly toolCreation: {
            readonly elementAppear: "0.1s";
            readonly elementConnect: "0.08s";
            readonly toolComplete: "0.15s";
            readonly plantDelay: "0.3s";
        };
        readonly spaceActivation: {
            readonly rippleStart: "0s";
            readonly connectedElements: "0.05s";
            readonly secondaryWave: "0.3s";
            readonly celebration: "0.8s";
        };
        readonly feedUpdate: {
            readonly newItemAppear: "0.1s";
            readonly existingItemShift: "0.05s";
            readonly readIndicator: "0.2s";
        };
        readonly builderProgression: {
            readonly skillUnlock: "0.2s";
            readonly badgeAppear: "0.15s";
            readonly rightsPropagation: "0.1s";
        };
    };
    readonly transform: {
        readonly scaleHover: "1.02";
        readonly scaleTap: "0.98";
        readonly scaleModal: "1.05";
        readonly moveHover: "-2px";
        readonly movePress: "0px";
        readonly moveSlide: "20px";
        readonly rotateSubtle: "1deg";
        readonly rotateMedium: "3deg";
        readonly rotateFull: "360deg";
    };
    readonly spring: {
        readonly light: "0.5";
        readonly normal: "0.8";
        readonly heavy: "1.2";
        readonly soft: "200";
        readonly medium: "400";
        readonly firm: "600";
        readonly snap: "800";
        readonly loose: "15";
        readonly balanced: "25";
        readonly tight: "30";
        readonly overdamped: "40";
    };
    readonly magnetic: {
        readonly near: "20px";
        readonly snap: "8px";
        readonly release: "40px";
    };
};
export declare const performance: {
    readonly willChange: {
        readonly transform: "transform";
        readonly opacity: "opacity";
        readonly auto: "auto";
        readonly scroll: "scroll-position";
    };
    readonly transformOrigin: {
        readonly center: "center";
        readonly top: "top";
        readonly bottom: "bottom";
        readonly left: "left";
        readonly right: "right";
    };
    readonly backfaceVisibility: {
        readonly visible: "visible";
        readonly hidden: "hidden";
    };
};
export type MotionToken = keyof typeof motion;
export type MotionEasing = keyof typeof motion.easing;
export type MotionDuration = keyof typeof motion.duration;
export type MotionCascade = keyof typeof motion.cascade;
//# sourceMappingURL=motion.d.ts.map