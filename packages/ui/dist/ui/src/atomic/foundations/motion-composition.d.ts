/**
 * HIVE Motion Composition System - PRODUCTION READY
 * Apple-like, tech sleek motion for social platform
 *
 * Web-first approach with mobile readiness.
 * Two-tier animation system: Fast interactions + Ultra-slow liquid morphing
 *
 * Status: ✅ COMPLETE - See MOTION_SYSTEM_COMPLETE.md for full documentation
 * Version: v1.0.0
 * Date: August 26, 2025
 */
export declare const motionPrinciples: {
    readonly philosophy: "Apple-like tech sleek motion for social interactions";
    readonly rules: readonly ["Respect prefers-reduced-motion universally", "GPU-accelerated transforms only", "Purposeful motion that enhances social context", "Web-first with mobile readiness"];
};
export declare const durationSystem: {
    readonly micro: {
        readonly value: "var(--hive-duration-instant)";
        readonly use: "Button press feedback, toggle states";
        readonly ms: "100ms";
    };
    readonly fast: {
        readonly value: "var(--hive-duration-fast)";
        readonly use: "Hover states, focus transitions";
        readonly ms: "150ms";
    };
    readonly standard: {
        readonly value: "var(--hive-duration-base)";
        readonly use: "Card expansions, modal appearances";
        readonly ms: "200ms";
    };
    readonly deliberate: {
        readonly value: "var(--hive-duration-slow)";
        readonly use: "Page transitions, important state changes";
        readonly ms: "300ms";
    };
    readonly cinematic: {
        readonly value: "var(--hive-duration-slower)";
        readonly use: "Onboarding, major workflow completions";
        readonly ms: "500ms";
    };
    readonly morphing: {
        readonly subtle: {
            readonly value: "700ms";
            readonly use: "Ghost button radius changes, subtle shape morphing";
        };
        readonly standard: {
            readonly value: "800ms";
            readonly use: "Primary button radius changes, standard morphing";
        };
        readonly deliberate: {
            readonly value: "1000ms";
            readonly use: "Share button morphing, social interaction shapes";
        };
        readonly cinematic: {
            readonly value: "1200ms";
            readonly use: "Card border-radius morphing, major shape changes";
        };
        readonly liquid: {
            readonly value: "2000ms";
            readonly use: "Ultra-slow liquid card morphing, organic transformations";
        };
    };
};
export declare const springPhysics: {
    readonly gentle: {
        readonly tension: 120;
        readonly friction: 14;
        readonly description: "Subtle spring - gentle interactions";
        readonly use: readonly ["Button hovers", "Card lifts", "Micro-interactions"];
        readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    };
    readonly bouncy: {
        readonly tension: 200;
        readonly friction: 12;
        readonly description: "Bouncy spring - social feedback";
        readonly use: readonly ["Like animations", "Social actions", "Success states"];
        readonly cssApproximation: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    };
    readonly fluid: {
        readonly tension: 300;
        readonly friction: 25;
        readonly description: "Fluid spring - smooth content motion";
        readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
        readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
    };
    readonly liquid: {
        readonly tension: 400;
        readonly friction: 30;
        readonly description: "Liquid spring - organic feeling motion";
        readonly use: readonly ["Drag interactions", "Complex animations", "Organic responses"];
        readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1)";
    };
    readonly snap: {
        readonly tension: 500;
        readonly friction: 20;
        readonly description: "Snappy spring - immediate response";
        readonly use: readonly ["Quick actions", "Toggle states", "Immediate feedback"];
        readonly cssApproximation: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    };
};
export declare const liquidMotion: {
    readonly ripple: {
        readonly description: "Liquid ripple effect from interaction point";
        readonly animation: "Expanding circle with spring physics";
        readonly use: readonly ["Button presses", "Touch feedback", "Social actions"];
    };
    readonly morphBlob: {
        readonly description: "Organic shape morphing";
        readonly animation: "CSS clip-path with spring transitions";
        readonly use: readonly ["Loading states", "Background elements", "Hover effects"];
    };
    readonly fluidScale: {
        readonly description: "Non-uniform scaling that feels organic";
        readonly animation: "Different scale values on X/Y with spring physics";
        readonly use: readonly ["Card interactions", "Image reveals", "Content emphasis"];
    };
    readonly liquidFlow: {
        readonly description: "Content flows like liquid between states";
        readonly animation: "Staggered spring animations with varying delays";
        readonly use: readonly ["List animations", "Page transitions", "Content reveals"];
    };
};
export declare const componentMotion: {
    readonly button: {
        readonly idle: {
            readonly transform: "scale(1)";
            readonly borderRadius: "var(--hive-radius-base)";
        };
        readonly hover: {
            readonly transform: "scale(1.02) translateY(-1px)";
            readonly borderRadius: "calc(var(--hive-radius-base) * 1.2)";
            readonly spring: {
                readonly tension: 120;
                readonly friction: 14;
                readonly description: "Subtle spring - gentle interactions";
                readonly use: readonly ["Button hovers", "Card lifts", "Micro-interactions"];
                readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            };
            readonly ripple: {
                readonly description: "Liquid ripple effect from interaction point";
                readonly animation: "Expanding circle with spring physics";
                readonly use: readonly ["Button presses", "Touch feedback", "Social actions"];
            };
        };
        readonly press: {
            readonly transform: "scale(0.98) scaleX(1.02)";
            readonly borderRadius: "calc(var(--hive-radius-base) * 0.8)";
            readonly spring: {
                readonly tension: 500;
                readonly friction: 20;
                readonly description: "Snappy spring - immediate response";
                readonly use: readonly ["Quick actions", "Toggle states", "Immediate feedback"];
                readonly cssApproximation: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            };
            readonly duration: "var(--hive-duration-instant)";
        };
        readonly release: {
            readonly transform: "scale(1.05) scaleX(0.98)";
            readonly spring: {
                readonly tension: 200;
                readonly friction: 12;
                readonly description: "Bouncy spring - social feedback";
                readonly use: readonly ["Like animations", "Social actions", "Success states"];
                readonly cssApproximation: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
            };
            readonly duration: "var(--hive-duration-fast)";
        };
    };
    readonly card: {
        readonly idle: {
            readonly transform: "scale(1)";
            readonly borderRadius: "var(--hive-radius-lg)";
            readonly clipPath: "inset(0% 0% 0% 0% round var(--hive-radius-lg))";
        };
        readonly hover: {
            readonly transform: "scale(1.02) translateY(-4px) rotateX(2deg)";
            readonly borderRadius: "calc(var(--hive-radius-lg) * 1.1)";
            readonly clipPath: "inset(0% 0% 0% 0% round calc(var(--hive-radius-lg) * 1.1))";
            readonly shadow: "var(--hive-shadow-xl)";
            readonly spring: {
                readonly tension: 300;
                readonly friction: 25;
                readonly description: "Fluid spring - smooth content motion";
                readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
                readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
            };
        };
        readonly press: {
            readonly transform: "scale(0.98) translateY(-1px)";
            readonly spring: {
                readonly tension: 500;
                readonly friction: 20;
                readonly description: "Snappy spring - immediate response";
                readonly use: readonly ["Quick actions", "Toggle states", "Immediate feedback"];
                readonly cssApproximation: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            };
        };
        readonly morphOnLoad: {
            readonly clipPath: readonly ["inset(50% 50% 50% 50% round 50%)", "inset(0% 0% 0% 0% round var(--hive-radius-lg))"];
            readonly spring: {
                readonly tension: 400;
                readonly friction: 30;
                readonly description: "Liquid spring - organic feeling motion";
                readonly use: readonly ["Drag interactions", "Complex animations", "Organic responses"];
                readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1)";
            };
            readonly duration: "var(--hive-duration-slow)";
        };
    };
    readonly modal: {
        readonly backdrop: {
            readonly opacity: "from 0 to 1";
            readonly backdropFilter: "blur(from 0px to 20px)";
            readonly spring: {
                readonly tension: 300;
                readonly friction: 25;
                readonly description: "Fluid spring - smooth content motion";
                readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
                readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
            };
        };
        readonly content: {
            readonly opacity: "from 0 to 1";
            readonly transform: readonly ["scale(0.8) translateY(20px)", "scale(1.05) translateY(-5px)", "scale(1) translateY(0px)"];
            readonly borderRadius: readonly ["calc(var(--hive-radius-xl) * 2)", "var(--hive-radius-xl)"];
            readonly spring: {
                readonly tension: 200;
                readonly friction: 12;
                readonly description: "Bouncy spring - social feedback";
                readonly use: readonly ["Like animations", "Social actions", "Success states"];
                readonly cssApproximation: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
            };
            readonly stagger: "50ms";
        };
    };
    readonly navigation: {
        readonly pageTransition: {
            readonly exit: {
                readonly opacity: "from 1 to 0";
                readonly transform: "translateX(from 0 to -20px)";
                readonly duration: "var(--hive-duration-fast)";
                readonly easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            };
            readonly enter: {
                readonly opacity: "from 0 to 1";
                readonly transform: "translateX(from 20px to 0)";
                readonly duration: "var(--hive-duration-base)";
                readonly easing: "cubic-bezier(0.175, 0.885, 0.32, 1)";
            };
        };
        readonly mobileSwipe: {
            readonly gesture: {
                readonly transform: "translateX(var(--gesture-x))";
                readonly duration: "0ms";
                readonly easing: "linear";
            };
            readonly snap: {
                readonly duration: "var(--hive-duration-fast)";
                readonly easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            };
        };
    };
};
export declare const socialMotion: {
    readonly like: {
        readonly sequence: readonly [{
            readonly transform: "scale(0.8)";
            readonly spring: {
                readonly tension: 500;
                readonly friction: 20;
                readonly description: "Snappy spring - immediate response";
                readonly use: readonly ["Quick actions", "Toggle states", "Immediate feedback"];
                readonly cssApproximation: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            };
        }, {
            readonly transform: "scale(1.3) rotate(5deg)";
            readonly spring: {
                readonly tension: 200;
                readonly friction: 12;
                readonly description: "Bouncy spring - social feedback";
                readonly use: readonly ["Like animations", "Social actions", "Success states"];
                readonly cssApproximation: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
            };
        }, {
            readonly transform: "scale(1) rotate(0deg)";
            readonly spring: {
                readonly tension: 300;
                readonly friction: 25;
                readonly description: "Fluid spring - smooth content motion";
                readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
                readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
            };
        }];
        readonly rippleEffect: {
            readonly clipPath: "circle(0% at 50% 50%)";
            readonly clipPathEnd: "circle(150% at 50% 50%)";
            readonly spring: {
                readonly tension: 400;
                readonly friction: 30;
                readonly description: "Liquid spring - organic feeling motion";
                readonly use: readonly ["Drag interactions", "Complex animations", "Organic responses"];
                readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1)";
            };
        };
        readonly stagger: "100ms";
    };
    readonly share: {
        readonly morph: {
            readonly borderRadius: readonly ["var(--hive-radius-base)", "calc(var(--hive-radius-base) * 3)", "var(--hive-radius-base)"];
            readonly transform: readonly ["scale(1)", "scale(1.1) scaleX(0.9)", "scale(1)"];
            readonly spring: {
                readonly tension: 300;
                readonly friction: 25;
                readonly description: "Fluid spring - smooth content motion";
                readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
                readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
            };
        };
        readonly pulse: {
            readonly description: "Liquid ripple effect from interaction point";
            readonly animation: "Expanding circle with spring physics";
            readonly use: readonly ["Button presses", "Touch feedback", "Social actions"];
        };
    };
    readonly connect: {
        readonly celebration: {
            readonly transform: readonly ["scale(1) rotate(0deg)", "scale(1.2) rotate(10deg) translateY(-10px)", "scale(0.95) rotate(-5deg) translateY(5px)", "scale(1) rotate(0deg) translateY(0px)"];
            readonly spring: {
                readonly tension: 200;
                readonly friction: 12;
                readonly description: "Bouncy spring - social feedback";
                readonly use: readonly ["Like animations", "Social actions", "Success states"];
                readonly cssApproximation: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
            };
            readonly duration: "var(--hive-duration-slower)";
        };
        readonly particles: "Burst effect with staggered spring physics";
    };
    readonly comment: {
        readonly appear: {
            readonly clipPath: readonly ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"];
            readonly spring: {
                readonly tension: 300;
                readonly friction: 25;
                readonly description: "Fluid spring - smooth content motion";
                readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
                readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
            };
            readonly stagger: "150ms";
        };
        readonly typing: {
            readonly transform: "scaleY(0.95) scaleX(1.02)";
            readonly spring: {
                readonly tension: 120;
                readonly friction: 14;
                readonly description: "Subtle spring - gentle interactions";
                readonly use: readonly ["Button hovers", "Card lifts", "Micro-interactions"];
                readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            };
            readonly repeat: "infinite";
            readonly repeatDelay: "800ms";
        };
    };
    readonly notifications: {
        readonly liquidDrop: {
            readonly clipPath: readonly ["circle(10% at 90% 20%)", "circle(120% at 50% 50%)"];
            readonly spring: {
                readonly tension: 400;
                readonly friction: 30;
                readonly description: "Liquid spring - organic feeling motion";
                readonly use: readonly ["Drag interactions", "Complex animations", "Organic responses"];
                readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1)";
            };
            readonly backdropFilter: "blur(0px) to blur(10px)";
        };
        readonly bounce: {
            readonly transform: readonly ["translateY(-100%) scale(0.8)", "translateY(10px) scale(1.1)", "translateY(0px) scale(1)"];
            readonly spring: {
                readonly tension: 200;
                readonly friction: 12;
                readonly description: "Bouncy spring - social feedback";
                readonly use: readonly ["Like animations", "Social actions", "Success states"];
                readonly cssApproximation: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
            };
        };
    };
};
export declare const performanceMotion: {
    readonly optimization: {
        readonly gpuAcceleration: readonly ["transform: translateZ(0)", "will-change: transform, opacity", "backface-visibility: hidden"];
        readonly avoidance: readonly ["Never animate: width, height, padding, margin", "Never animate: box-shadow directly (use pseudo-elements)", "Never animate: border-width, font-size"];
        readonly preferred: readonly ["transform: translate3d(), scale(), rotate()", "opacity: 0 to 1", "clip-path for complex reveals"];
    };
    readonly budgets: {
        readonly mobileCPU: "16ms per frame (60fps)";
        readonly animationLimit: "Maximum 3 concurrent animations";
        readonly memoryUsage: "Auto-cleanup after animation complete";
    };
};
export declare const accessibilityMotion: {
    readonly reducedMotionSupport: {
        readonly respectPreference: "prefers-reduced-motion: reduce";
        readonly fallbacks: {
            readonly animations: "Instant state changes";
            readonly transitions: "Crossfade only";
            readonly parallax: "Static positioning";
            readonly autoplay: "Disabled completely";
        };
    };
    readonly vestigialMotion: {
        readonly description: "Minimal motion that preserves UX even with reduced-motion";
        readonly allowed: readonly ["Focus ring appearance", "Loading state indication", "Error state feedback", "Form validation signals"];
        readonly implementation: "duration: 100ms, easing: ease-out";
    };
};
export declare const motionComposition: {
    readonly principles: {
        readonly philosophy: "Apple-like tech sleek motion for social interactions";
        readonly rules: readonly ["Respect prefers-reduced-motion universally", "GPU-accelerated transforms only", "Purposeful motion that enhances social context", "Web-first with mobile readiness"];
    };
    readonly durations: {
        readonly micro: {
            readonly value: "var(--hive-duration-instant)";
            readonly use: "Button press feedback, toggle states";
            readonly ms: "100ms";
        };
        readonly fast: {
            readonly value: "var(--hive-duration-fast)";
            readonly use: "Hover states, focus transitions";
            readonly ms: "150ms";
        };
        readonly standard: {
            readonly value: "var(--hive-duration-base)";
            readonly use: "Card expansions, modal appearances";
            readonly ms: "200ms";
        };
        readonly deliberate: {
            readonly value: "var(--hive-duration-slow)";
            readonly use: "Page transitions, important state changes";
            readonly ms: "300ms";
        };
        readonly cinematic: {
            readonly value: "var(--hive-duration-slower)";
            readonly use: "Onboarding, major workflow completions";
            readonly ms: "500ms";
        };
        readonly morphing: {
            readonly subtle: {
                readonly value: "700ms";
                readonly use: "Ghost button radius changes, subtle shape morphing";
            };
            readonly standard: {
                readonly value: "800ms";
                readonly use: "Primary button radius changes, standard morphing";
            };
            readonly deliberate: {
                readonly value: "1000ms";
                readonly use: "Share button morphing, social interaction shapes";
            };
            readonly cinematic: {
                readonly value: "1200ms";
                readonly use: "Card border-radius morphing, major shape changes";
            };
            readonly liquid: {
                readonly value: "2000ms";
                readonly use: "Ultra-slow liquid card morphing, organic transformations";
            };
        };
    };
    readonly springs: {
        readonly gentle: {
            readonly tension: 120;
            readonly friction: 14;
            readonly description: "Subtle spring - gentle interactions";
            readonly use: readonly ["Button hovers", "Card lifts", "Micro-interactions"];
            readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        };
        readonly bouncy: {
            readonly tension: 200;
            readonly friction: 12;
            readonly description: "Bouncy spring - social feedback";
            readonly use: readonly ["Like animations", "Social actions", "Success states"];
            readonly cssApproximation: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        };
        readonly fluid: {
            readonly tension: 300;
            readonly friction: 25;
            readonly description: "Fluid spring - smooth content motion";
            readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
            readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
        };
        readonly liquid: {
            readonly tension: 400;
            readonly friction: 30;
            readonly description: "Liquid spring - organic feeling motion";
            readonly use: readonly ["Drag interactions", "Complex animations", "Organic responses"];
            readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1)";
        };
        readonly snap: {
            readonly tension: 500;
            readonly friction: 20;
            readonly description: "Snappy spring - immediate response";
            readonly use: readonly ["Quick actions", "Toggle states", "Immediate feedback"];
            readonly cssApproximation: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        };
    };
    readonly liquid: {
        readonly ripple: {
            readonly description: "Liquid ripple effect from interaction point";
            readonly animation: "Expanding circle with spring physics";
            readonly use: readonly ["Button presses", "Touch feedback", "Social actions"];
        };
        readonly morphBlob: {
            readonly description: "Organic shape morphing";
            readonly animation: "CSS clip-path with spring transitions";
            readonly use: readonly ["Loading states", "Background elements", "Hover effects"];
        };
        readonly fluidScale: {
            readonly description: "Non-uniform scaling that feels organic";
            readonly animation: "Different scale values on X/Y with spring physics";
            readonly use: readonly ["Card interactions", "Image reveals", "Content emphasis"];
        };
        readonly liquidFlow: {
            readonly description: "Content flows like liquid between states";
            readonly animation: "Staggered spring animations with varying delays";
            readonly use: readonly ["List animations", "Page transitions", "Content reveals"];
        };
    };
    readonly components: {
        readonly button: {
            readonly idle: {
                readonly transform: "scale(1)";
                readonly borderRadius: "var(--hive-radius-base)";
            };
            readonly hover: {
                readonly transform: "scale(1.02) translateY(-1px)";
                readonly borderRadius: "calc(var(--hive-radius-base) * 1.2)";
                readonly spring: {
                    readonly tension: 120;
                    readonly friction: 14;
                    readonly description: "Subtle spring - gentle interactions";
                    readonly use: readonly ["Button hovers", "Card lifts", "Micro-interactions"];
                    readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                };
                readonly ripple: {
                    readonly description: "Liquid ripple effect from interaction point";
                    readonly animation: "Expanding circle with spring physics";
                    readonly use: readonly ["Button presses", "Touch feedback", "Social actions"];
                };
            };
            readonly press: {
                readonly transform: "scale(0.98) scaleX(1.02)";
                readonly borderRadius: "calc(var(--hive-radius-base) * 0.8)";
                readonly spring: {
                    readonly tension: 500;
                    readonly friction: 20;
                    readonly description: "Snappy spring - immediate response";
                    readonly use: readonly ["Quick actions", "Toggle states", "Immediate feedback"];
                    readonly cssApproximation: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                };
                readonly duration: "var(--hive-duration-instant)";
            };
            readonly release: {
                readonly transform: "scale(1.05) scaleX(0.98)";
                readonly spring: {
                    readonly tension: 200;
                    readonly friction: 12;
                    readonly description: "Bouncy spring - social feedback";
                    readonly use: readonly ["Like animations", "Social actions", "Success states"];
                    readonly cssApproximation: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
                };
                readonly duration: "var(--hive-duration-fast)";
            };
        };
        readonly card: {
            readonly idle: {
                readonly transform: "scale(1)";
                readonly borderRadius: "var(--hive-radius-lg)";
                readonly clipPath: "inset(0% 0% 0% 0% round var(--hive-radius-lg))";
            };
            readonly hover: {
                readonly transform: "scale(1.02) translateY(-4px) rotateX(2deg)";
                readonly borderRadius: "calc(var(--hive-radius-lg) * 1.1)";
                readonly clipPath: "inset(0% 0% 0% 0% round calc(var(--hive-radius-lg) * 1.1))";
                readonly shadow: "var(--hive-shadow-xl)";
                readonly spring: {
                    readonly tension: 300;
                    readonly friction: 25;
                    readonly description: "Fluid spring - smooth content motion";
                    readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
                    readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
                };
            };
            readonly press: {
                readonly transform: "scale(0.98) translateY(-1px)";
                readonly spring: {
                    readonly tension: 500;
                    readonly friction: 20;
                    readonly description: "Snappy spring - immediate response";
                    readonly use: readonly ["Quick actions", "Toggle states", "Immediate feedback"];
                    readonly cssApproximation: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                };
            };
            readonly morphOnLoad: {
                readonly clipPath: readonly ["inset(50% 50% 50% 50% round 50%)", "inset(0% 0% 0% 0% round var(--hive-radius-lg))"];
                readonly spring: {
                    readonly tension: 400;
                    readonly friction: 30;
                    readonly description: "Liquid spring - organic feeling motion";
                    readonly use: readonly ["Drag interactions", "Complex animations", "Organic responses"];
                    readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1)";
                };
                readonly duration: "var(--hive-duration-slow)";
            };
        };
        readonly modal: {
            readonly backdrop: {
                readonly opacity: "from 0 to 1";
                readonly backdropFilter: "blur(from 0px to 20px)";
                readonly spring: {
                    readonly tension: 300;
                    readonly friction: 25;
                    readonly description: "Fluid spring - smooth content motion";
                    readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
                    readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
                };
            };
            readonly content: {
                readonly opacity: "from 0 to 1";
                readonly transform: readonly ["scale(0.8) translateY(20px)", "scale(1.05) translateY(-5px)", "scale(1) translateY(0px)"];
                readonly borderRadius: readonly ["calc(var(--hive-radius-xl) * 2)", "var(--hive-radius-xl)"];
                readonly spring: {
                    readonly tension: 200;
                    readonly friction: 12;
                    readonly description: "Bouncy spring - social feedback";
                    readonly use: readonly ["Like animations", "Social actions", "Success states"];
                    readonly cssApproximation: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
                };
                readonly stagger: "50ms";
            };
        };
        readonly navigation: {
            readonly pageTransition: {
                readonly exit: {
                    readonly opacity: "from 1 to 0";
                    readonly transform: "translateX(from 0 to -20px)";
                    readonly duration: "var(--hive-duration-fast)";
                    readonly easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                };
                readonly enter: {
                    readonly opacity: "from 0 to 1";
                    readonly transform: "translateX(from 20px to 0)";
                    readonly duration: "var(--hive-duration-base)";
                    readonly easing: "cubic-bezier(0.175, 0.885, 0.32, 1)";
                };
            };
            readonly mobileSwipe: {
                readonly gesture: {
                    readonly transform: "translateX(var(--gesture-x))";
                    readonly duration: "0ms";
                    readonly easing: "linear";
                };
                readonly snap: {
                    readonly duration: "var(--hive-duration-fast)";
                    readonly easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                };
            };
        };
    };
    readonly social: {
        readonly like: {
            readonly sequence: readonly [{
                readonly transform: "scale(0.8)";
                readonly spring: {
                    readonly tension: 500;
                    readonly friction: 20;
                    readonly description: "Snappy spring - immediate response";
                    readonly use: readonly ["Quick actions", "Toggle states", "Immediate feedback"];
                    readonly cssApproximation: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                };
            }, {
                readonly transform: "scale(1.3) rotate(5deg)";
                readonly spring: {
                    readonly tension: 200;
                    readonly friction: 12;
                    readonly description: "Bouncy spring - social feedback";
                    readonly use: readonly ["Like animations", "Social actions", "Success states"];
                    readonly cssApproximation: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
                };
            }, {
                readonly transform: "scale(1) rotate(0deg)";
                readonly spring: {
                    readonly tension: 300;
                    readonly friction: 25;
                    readonly description: "Fluid spring - smooth content motion";
                    readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
                    readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
                };
            }];
            readonly rippleEffect: {
                readonly clipPath: "circle(0% at 50% 50%)";
                readonly clipPathEnd: "circle(150% at 50% 50%)";
                readonly spring: {
                    readonly tension: 400;
                    readonly friction: 30;
                    readonly description: "Liquid spring - organic feeling motion";
                    readonly use: readonly ["Drag interactions", "Complex animations", "Organic responses"];
                    readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1)";
                };
            };
            readonly stagger: "100ms";
        };
        readonly share: {
            readonly morph: {
                readonly borderRadius: readonly ["var(--hive-radius-base)", "calc(var(--hive-radius-base) * 3)", "var(--hive-radius-base)"];
                readonly transform: readonly ["scale(1)", "scale(1.1) scaleX(0.9)", "scale(1)"];
                readonly spring: {
                    readonly tension: 300;
                    readonly friction: 25;
                    readonly description: "Fluid spring - smooth content motion";
                    readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
                    readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
                };
            };
            readonly pulse: {
                readonly description: "Liquid ripple effect from interaction point";
                readonly animation: "Expanding circle with spring physics";
                readonly use: readonly ["Button presses", "Touch feedback", "Social actions"];
            };
        };
        readonly connect: {
            readonly celebration: {
                readonly transform: readonly ["scale(1) rotate(0deg)", "scale(1.2) rotate(10deg) translateY(-10px)", "scale(0.95) rotate(-5deg) translateY(5px)", "scale(1) rotate(0deg) translateY(0px)"];
                readonly spring: {
                    readonly tension: 200;
                    readonly friction: 12;
                    readonly description: "Bouncy spring - social feedback";
                    readonly use: readonly ["Like animations", "Social actions", "Success states"];
                    readonly cssApproximation: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
                };
                readonly duration: "var(--hive-duration-slower)";
            };
            readonly particles: "Burst effect with staggered spring physics";
        };
        readonly comment: {
            readonly appear: {
                readonly clipPath: readonly ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"];
                readonly spring: {
                    readonly tension: 300;
                    readonly friction: 25;
                    readonly description: "Fluid spring - smooth content motion";
                    readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
                    readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
                };
                readonly stagger: "150ms";
            };
            readonly typing: {
                readonly transform: "scaleY(0.95) scaleX(1.02)";
                readonly spring: {
                    readonly tension: 120;
                    readonly friction: 14;
                    readonly description: "Subtle spring - gentle interactions";
                    readonly use: readonly ["Button hovers", "Card lifts", "Micro-interactions"];
                    readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                };
                readonly repeat: "infinite";
                readonly repeatDelay: "800ms";
            };
        };
        readonly notifications: {
            readonly liquidDrop: {
                readonly clipPath: readonly ["circle(10% at 90% 20%)", "circle(120% at 50% 50%)"];
                readonly spring: {
                    readonly tension: 400;
                    readonly friction: 30;
                    readonly description: "Liquid spring - organic feeling motion";
                    readonly use: readonly ["Drag interactions", "Complex animations", "Organic responses"];
                    readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1)";
                };
                readonly backdropFilter: "blur(0px) to blur(10px)";
            };
            readonly bounce: {
                readonly transform: readonly ["translateY(-100%) scale(0.8)", "translateY(10px) scale(1.1)", "translateY(0px) scale(1)"];
                readonly spring: {
                    readonly tension: 200;
                    readonly friction: 12;
                    readonly description: "Bouncy spring - social feedback";
                    readonly use: readonly ["Like animations", "Social actions", "Success states"];
                    readonly cssApproximation: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
                };
            };
        };
    };
    readonly performance: {
        readonly optimization: {
            readonly gpuAcceleration: readonly ["transform: translateZ(0)", "will-change: transform, opacity", "backface-visibility: hidden"];
            readonly avoidance: readonly ["Never animate: width, height, padding, margin", "Never animate: box-shadow directly (use pseudo-elements)", "Never animate: border-width, font-size"];
            readonly preferred: readonly ["transform: translate3d(), scale(), rotate()", "opacity: 0 to 1", "clip-path for complex reveals"];
        };
        readonly budgets: {
            readonly mobileCPU: "16ms per frame (60fps)";
            readonly animationLimit: "Maximum 3 concurrent animations";
            readonly memoryUsage: "Auto-cleanup after animation complete";
        };
    };
    readonly accessibility: {
        readonly reducedMotionSupport: {
            readonly respectPreference: "prefers-reduced-motion: reduce";
            readonly fallbacks: {
                readonly animations: "Instant state changes";
                readonly transitions: "Crossfade only";
                readonly parallax: "Static positioning";
                readonly autoplay: "Disabled completely";
            };
        };
        readonly vestigialMotion: {
            readonly description: "Minimal motion that preserves UX even with reduced-motion";
            readonly allowed: readonly ["Focus ring appearance", "Loading state indication", "Error state feedback", "Form validation signals"];
            readonly implementation: "duration: 100ms, easing: ease-out";
        };
    };
};
export type MotionComposition = typeof motionComposition;
export type SpringPhysics = typeof springPhysics;
export type LiquidMotion = typeof liquidMotion;
export type ComponentMotion = typeof componentMotion;
export type SocialMotion = typeof socialMotion;
//# sourceMappingURL=motion-composition.d.ts.map