export declare const designTokens: {
    readonly colors: {
        readonly background: "#0A0A0A";
        readonly surface: "#111111";
        readonly border: "#2A2A2A";
        readonly foreground: "#FFFFFF";
        readonly muted: "#6B7280";
        readonly disabled: "#3F3F46";
        readonly accent: {
            readonly DEFAULT: "#FFD700";
            readonly 600: "#EAC200";
            readonly 700: "#C4A500";
        };
        readonly "surface-01": "#111111";
        readonly "surface-02": "#181818";
        readonly "surface-03": "#1F1F1F";
        readonly ring: "#FFD700";
        readonly "ring-offset": "#0A0A0A";
        readonly "bg-canvas": "#0A0A0A";
        readonly "bg-card": "#111111";
        readonly "accent-gold": "#FFD700";
        readonly "accent-gold-hover": "#EAC200";
        readonly "accent-gold-pressed": "#C4A500";
        readonly "text-primary": "#FFFFFF";
        readonly "text-muted": "#6B7280";
        readonly "border-primary": "#2A2A2A";
    };
    readonly shadcnColors: {
        readonly background: "#0A0A0A";
        readonly foreground: "#FFFFFF";
        readonly primary: {
            readonly DEFAULT: "#FFD700";
            readonly foreground: "#0A0A0A";
        };
        readonly secondary: {
            readonly DEFAULT: "#111111";
            readonly foreground: "#FFFFFF";
        };
        readonly muted: {
            readonly DEFAULT: "#6B7280";
            readonly foreground: "#FFFFFF";
        };
        readonly accent: {
            readonly DEFAULT: "#FFD700";
            readonly foreground: "#0A0A0A";
        };
        readonly destructive: {
            readonly DEFAULT: "#111111";
            readonly foreground: "#FFFFFF";
        };
        readonly border: "#2A2A2A";
        readonly input: "#2A2A2A";
        readonly ring: "#FFD700";
        readonly card: {
            readonly DEFAULT: "#111111";
            readonly foreground: "#FFFFFF";
        };
        readonly popover: {
            readonly DEFAULT: "#181818";
            readonly foreground: "#FFFFFF";
        };
    };
    readonly typography: {
        readonly fontFamily: {
            readonly sans: readonly ["Inter Variable", "Inter", "system-ui", "sans-serif"];
            readonly display: readonly ["Space Grotesk Variable", "Space Grotesk", "system-ui", "sans-serif"];
            readonly mono: readonly ["JetBrains Mono", "Consolas", "Monaco", "monospace"];
        };
        readonly fontWeight: {
            readonly light: "300";
            readonly normal: "400";
            readonly medium: "500";
            readonly semibold: "600";
            readonly bold: "700";
        };
        readonly fontSize: {
            readonly display: {
                readonly size: "64px";
                readonly lineHeight: "72px";
                readonly fontWeight: "600";
                readonly fontFamily: "Space Grotesk Variable";
                readonly usage: "Hero headlines, marketing pages";
            };
            readonly h1: {
                readonly size: "48px";
                readonly lineHeight: "56px";
                readonly fontWeight: "600";
                readonly fontFamily: "Space Grotesk Variable";
                readonly usage: "Page titles, primary headings";
            };
            readonly h2: {
                readonly size: "32px";
                readonly lineHeight: "40px";
                readonly fontWeight: "600";
                readonly fontFamily: "Space Grotesk Variable";
                readonly usage: "Section headers, secondary headings";
            };
            readonly h3: {
                readonly size: "24px";
                readonly lineHeight: "32px";
                readonly fontWeight: "600";
                readonly fontFamily: "Space Grotesk Variable";
                readonly usage: "Subsection headers";
            };
            readonly h4: {
                readonly size: "20px";
                readonly lineHeight: "28px";
                readonly fontWeight: "600";
                readonly fontFamily: "Space Grotesk Variable";
                readonly usage: "Card titles, minor headings";
            };
            readonly body: {
                readonly size: "16px";
                readonly lineHeight: "24px";
                readonly fontWeight: "400";
                readonly fontFamily: "Inter Variable";
                readonly usage: "Body text, paragraphs, default text";
            };
            readonly bodySmall: {
                readonly size: "14px";
                readonly lineHeight: "20px";
                readonly fontWeight: "400";
                readonly fontFamily: "Inter Variable";
                readonly usage: "Smaller body text, captions";
            };
            readonly caption: {
                readonly size: "12px";
                readonly lineHeight: "18px";
                readonly fontWeight: "400";
                readonly fontFamily: "Inter Variable";
                readonly usage: "Labels, metadata, micro-copy";
            };
            readonly button: {
                readonly size: "14px";
                readonly lineHeight: "20px";
                readonly fontWeight: "500";
                readonly fontFamily: "Inter Variable";
                readonly usage: "Button text, CTAs";
            };
            readonly code: {
                readonly size: "14px";
                readonly lineHeight: "20px";
                readonly fontWeight: "400";
                readonly fontFamily: "JetBrains Mono";
                readonly usage: "Code snippets, technical content";
            };
        };
        readonly lineHeight: {
            readonly none: "1";
            readonly tight: "1.25";
            readonly snug: "1.375";
            readonly normal: "1.5";
            readonly relaxed: "1.625";
            readonly loose: "2";
        };
        readonly letterSpacing: {
            readonly tight: "-0.025em";
            readonly normal: "0em";
            readonly wide: "0.025em";
        };
    };
    readonly tailwindFontSizes: {
        readonly display: readonly ["64px", "72px"];
        readonly h1: readonly ["48px", "56px"];
        readonly h2: readonly ["32px", "40px"];
        readonly h3: readonly ["24px", "32px"];
        readonly h4: readonly ["20px", "28px"];
        readonly body: readonly ["16px", "24px"];
        readonly "body-sm": readonly ["14px", "20px"];
        readonly caption: readonly ["12px", "18px"];
        readonly button: readonly ["14px", "20px"];
        readonly code: readonly ["14px", "20px"];
    };
    readonly spacing: {
        readonly "0": "0px";
        readonly "1": "8px";
        readonly "2": "16px";
        readonly "3": "24px";
        readonly "4": "32px";
        readonly "5": "40px";
        readonly "6": "48px";
        readonly "7": "56px";
        readonly "8": "64px";
        readonly "9": "72px";
        readonly "10": "80px";
        readonly xs: "8px";
        readonly sm: "16px";
        readonly md: "24px";
        readonly lg: "32px";
        readonly xl: "48px";
    };
    readonly motion: {
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
    readonly effects: {
        readonly shadow: {
            readonly "elevation-1": "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)";
            readonly "elevation-2": "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)";
            readonly "elevation-3": "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)";
            readonly "elevation-4": "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)";
        };
        readonly emboss: {
            readonly DEFAULT: "0px 1px 1px rgba(0,0,0,0.5), inset 0px 1px 1px rgba(255,255,255,0.1)";
        };
        readonly blur: {
            readonly sm: "4px";
            readonly md: "12px";
            readonly lg: "24px";
        };
    };
};
export * from "./colors";
export * from "./spacing";
export * from "./typography";
export * from "./motion";
export * from "./effects";
export default designTokens;
//# sourceMappingURL=index.d.ts.map