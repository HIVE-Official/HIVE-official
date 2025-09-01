/**
 * HIVE Responsive Breakpoint Logic
 * Mobile-First Scaling Rules for Campus Environments
 */
export declare const breakpointValues: {
    readonly mobileSmall: 320;
    readonly mobileLarge: 480;
    readonly tablet: 768;
    readonly desktopSmall: 1024;
    readonly desktopLarge: 1200;
    readonly desktopXL: 1600;
};
export declare const mediaQueries: {
    readonly mobile: "screen and (min-width: 320px)";
    readonly tablet: "screen and (min-width: 768px)";
    readonly desktop: "screen and (min-width: 1024px)";
    readonly desktopLarge: "screen and (min-width: 1200px)";
    readonly desktopXL: "screen and (min-width: 1600px)";
    readonly mobileOnly: `screen and (max-width: ${number}px)`;
    readonly tabletOnly: `screen and (min-width: 768) and (max-width: ${number}px)`;
    readonly desktopOnly: "screen and (min-width: 1024)";
    readonly retina: "screen and (-webkit-min-device-pixel-ratio: 2), screen and (min-resolution: 192dpi)";
};
export declare const scalingRules: {
    readonly typography: {
        readonly mobile: {
            readonly scaleFactor: 0.9;
            readonly minimumBodySize: "14px";
            readonly lineHeightAdjustment: "maintain proportional relationships";
        };
        readonly tablet: {
            readonly scaleFactor: 1;
            readonly optimizeForReading: true;
        };
        readonly desktop: {
            readonly scaleFactor: 1.05;
            readonly maximumLineLength: "65ch";
        };
    };
    readonly spacing: {
        readonly mobile: {
            readonly scaleFactor: 0.75;
            readonly minimumTouchTarget: "44px";
            readonly containerPadding: "16px";
        };
        readonly tablet: {
            readonly scaleFactor: 1;
            readonly containerPadding: "24px";
        };
        readonly desktop: {
            readonly scaleFactor: 1;
            readonly containerPadding: "32px";
            readonly maxContentWidth: "1400px";
        };
    };
    readonly touchTargets: {
        readonly mobile: {
            readonly minimum: "44px";
            readonly recommended: "48px";
            readonly spacing: "8px";
        };
        readonly tablet: {
            readonly minimum: "44px";
            readonly recommended: "44px";
            readonly spacing: "4px";
        };
        readonly desktop: {
            readonly minimum: "40px";
            readonly recommended: "40px";
            readonly spacing: "4px";
        };
    };
};
export declare const deviceOptimizations: {
    readonly mobile: {
        readonly performance: {
            readonly reducedAnimations: "Shorter durations, simpler easing";
            readonly shadowReduction: "Lower blur radius and opacity";
            readonly imageOptimization: "WebP format, lazy loading";
        };
        readonly ux: {
            readonly thumbNavigation: "Bottom navigation for thumb reach";
            readonly swipeGestures: "Enable swipe for navigation";
            readonly pullToRefresh: "Standard mobile refresh pattern";
            readonly scrollBehavior: "Momentum scrolling enabled";
        };
        readonly layout: {
            readonly singleColumn: "Stack elements vertically";
            readonly fullWidth: "Maximize screen real estate";
            readonly cardSpacing: "16px vertical spacing";
        };
    };
    readonly tablet: {
        readonly layout: {
            readonly adaptiveColumns: "2-column layout where appropriate";
            readonly modalSizing: "Max 80% of viewport width";
            readonly navigationDrawer: "Side drawer for secondary navigation";
        };
        readonly interaction: {
            readonly hoverStates: "Support hover on trackpad";
            readonly contextMenus: "Right-click context menus";
            readonly dragAndDrop: "Enhanced drag interactions";
        };
    };
    readonly desktop: {
        readonly interaction: {
            readonly keyboardShortcuts: "Full keyboard navigation";
            readonly mouseInteractions: "Hover states, right-click menus";
            readonly multiWindow: "Support for multiple browser windows";
        };
        readonly layout: {
            readonly multiColumn: "3+ column layouts";
            readonly sidebarNavigation: "Persistent left sidebar";
            readonly detailPanels: "Right panels for additional info";
            readonly modalCentering: "Center modals in viewport";
        };
    };
};
export declare const containerSizes: {
    readonly content: {
        readonly mobile: "100%";
        readonly tablet: "100%";
        readonly desktop: "1200px";
        readonly desktopXL: "1400px";
    };
    readonly reading: {
        readonly mobile: "100%";
        readonly tablet: "65ch";
        readonly desktop: "65ch";
        readonly desktopXL: "70ch";
    };
    readonly form: {
        readonly mobile: "100%";
        readonly tablet: "600px";
        readonly desktop: "600px";
        readonly desktopXL: "600px";
    };
};
export declare const gridSystem: {
    readonly columns: {
        readonly mobile: 4;
        readonly tablet: 8;
        readonly desktop: 12;
        readonly desktopXL: 16;
    };
    readonly gutters: {
        readonly mobile: "16px";
        readonly tablet: "24px";
        readonly desktop: "32px";
        readonly desktopXL: "40px";
    };
    readonly spans: {
        readonly mobile: {
            readonly full: 4;
            readonly half: 2;
            readonly quarter: 1;
        };
        readonly tablet: {
            readonly full: 8;
            readonly half: 4;
            readonly third: 2;
            readonly quarter: 2;
        };
        readonly desktop: {
            readonly full: 12;
            readonly half: 6;
            readonly third: 4;
            readonly quarter: 3;
            readonly sixth: 2;
        };
    };
};
export declare const campusOptimizations: {
    readonly networkOptimizations: {
        readonly mobile: {
            readonly dataUsage: "Minimize data usage on cellular";
            readonly offlineSupport: "Cache critical content";
            readonly progressiveLoading: "Load content incrementally";
        };
        readonly campusWiFi: {
            readonly assumption: "Good bandwidth but variable latency";
            readonly optimization: "Aggressive caching, lazy loading";
            readonly fallback: "Graceful degradation for poor connections";
        };
    };
    readonly devicePatterns: {
        readonly primaryMobile: "Students primarily use phones";
        readonly laptopSecondary: "Laptops for serious work";
        readonly tabletRare: "Tablets less common in student population";
        readonly optimization: {
            readonly mobileFirst: "Design for mobile, enhance for desktop";
            readonly touchPrimary: "Assume touch interactions";
            readonly keyboardSecondary: "Support keyboard when available";
        };
    };
    readonly contextualUsage: {
        readonly walkingUsage: "Design for distracted, one-handed use";
        readonly classroomUsage: "Quick, silent interactions";
        readonly dormUsage: "Full-featured experience";
        readonly libraryUsage: "Focus-friendly, minimal distractions";
    };
};
export declare const breakpoints: {
    readonly breakpointValues: {
        readonly mobileSmall: 320;
        readonly mobileLarge: 480;
        readonly tablet: 768;
        readonly desktopSmall: 1024;
        readonly desktopLarge: 1200;
        readonly desktopXL: 1600;
    };
    readonly mediaQueries: {
        readonly mobile: "screen and (min-width: 320px)";
        readonly tablet: "screen and (min-width: 768px)";
        readonly desktop: "screen and (min-width: 1024px)";
        readonly desktopLarge: "screen and (min-width: 1200px)";
        readonly desktopXL: "screen and (min-width: 1600px)";
        readonly mobileOnly: `screen and (max-width: ${number}px)`;
        readonly tabletOnly: `screen and (min-width: 768) and (max-width: ${number}px)`;
        readonly desktopOnly: "screen and (min-width: 1024)";
        readonly retina: "screen and (-webkit-min-device-pixel-ratio: 2), screen and (min-resolution: 192dpi)";
    };
    readonly scalingRules: {
        readonly typography: {
            readonly mobile: {
                readonly scaleFactor: 0.9;
                readonly minimumBodySize: "14px";
                readonly lineHeightAdjustment: "maintain proportional relationships";
            };
            readonly tablet: {
                readonly scaleFactor: 1;
                readonly optimizeForReading: true;
            };
            readonly desktop: {
                readonly scaleFactor: 1.05;
                readonly maximumLineLength: "65ch";
            };
        };
        readonly spacing: {
            readonly mobile: {
                readonly scaleFactor: 0.75;
                readonly minimumTouchTarget: "44px";
                readonly containerPadding: "16px";
            };
            readonly tablet: {
                readonly scaleFactor: 1;
                readonly containerPadding: "24px";
            };
            readonly desktop: {
                readonly scaleFactor: 1;
                readonly containerPadding: "32px";
                readonly maxContentWidth: "1400px";
            };
        };
        readonly touchTargets: {
            readonly mobile: {
                readonly minimum: "44px";
                readonly recommended: "48px";
                readonly spacing: "8px";
            };
            readonly tablet: {
                readonly minimum: "44px";
                readonly recommended: "44px";
                readonly spacing: "4px";
            };
            readonly desktop: {
                readonly minimum: "40px";
                readonly recommended: "40px";
                readonly spacing: "4px";
            };
        };
    };
    readonly deviceOptimizations: {
        readonly mobile: {
            readonly performance: {
                readonly reducedAnimations: "Shorter durations, simpler easing";
                readonly shadowReduction: "Lower blur radius and opacity";
                readonly imageOptimization: "WebP format, lazy loading";
            };
            readonly ux: {
                readonly thumbNavigation: "Bottom navigation for thumb reach";
                readonly swipeGestures: "Enable swipe for navigation";
                readonly pullToRefresh: "Standard mobile refresh pattern";
                readonly scrollBehavior: "Momentum scrolling enabled";
            };
            readonly layout: {
                readonly singleColumn: "Stack elements vertically";
                readonly fullWidth: "Maximize screen real estate";
                readonly cardSpacing: "16px vertical spacing";
            };
        };
        readonly tablet: {
            readonly layout: {
                readonly adaptiveColumns: "2-column layout where appropriate";
                readonly modalSizing: "Max 80% of viewport width";
                readonly navigationDrawer: "Side drawer for secondary navigation";
            };
            readonly interaction: {
                readonly hoverStates: "Support hover on trackpad";
                readonly contextMenus: "Right-click context menus";
                readonly dragAndDrop: "Enhanced drag interactions";
            };
        };
        readonly desktop: {
            readonly interaction: {
                readonly keyboardShortcuts: "Full keyboard navigation";
                readonly mouseInteractions: "Hover states, right-click menus";
                readonly multiWindow: "Support for multiple browser windows";
            };
            readonly layout: {
                readonly multiColumn: "3+ column layouts";
                readonly sidebarNavigation: "Persistent left sidebar";
                readonly detailPanels: "Right panels for additional info";
                readonly modalCentering: "Center modals in viewport";
            };
        };
    };
    readonly containerSizes: {
        readonly content: {
            readonly mobile: "100%";
            readonly tablet: "100%";
            readonly desktop: "1200px";
            readonly desktopXL: "1400px";
        };
        readonly reading: {
            readonly mobile: "100%";
            readonly tablet: "65ch";
            readonly desktop: "65ch";
            readonly desktopXL: "70ch";
        };
        readonly form: {
            readonly mobile: "100%";
            readonly tablet: "600px";
            readonly desktop: "600px";
            readonly desktopXL: "600px";
        };
    };
    readonly gridSystem: {
        readonly columns: {
            readonly mobile: 4;
            readonly tablet: 8;
            readonly desktop: 12;
            readonly desktopXL: 16;
        };
        readonly gutters: {
            readonly mobile: "16px";
            readonly tablet: "24px";
            readonly desktop: "32px";
            readonly desktopXL: "40px";
        };
        readonly spans: {
            readonly mobile: {
                readonly full: 4;
                readonly half: 2;
                readonly quarter: 1;
            };
            readonly tablet: {
                readonly full: 8;
                readonly half: 4;
                readonly third: 2;
                readonly quarter: 2;
            };
            readonly desktop: {
                readonly full: 12;
                readonly half: 6;
                readonly third: 4;
                readonly quarter: 3;
                readonly sixth: 2;
            };
        };
    };
    readonly campusOptimizations: {
        readonly networkOptimizations: {
            readonly mobile: {
                readonly dataUsage: "Minimize data usage on cellular";
                readonly offlineSupport: "Cache critical content";
                readonly progressiveLoading: "Load content incrementally";
            };
            readonly campusWiFi: {
                readonly assumption: "Good bandwidth but variable latency";
                readonly optimization: "Aggressive caching, lazy loading";
                readonly fallback: "Graceful degradation for poor connections";
            };
        };
        readonly devicePatterns: {
            readonly primaryMobile: "Students primarily use phones";
            readonly laptopSecondary: "Laptops for serious work";
            readonly tabletRare: "Tablets less common in student population";
            readonly optimization: {
                readonly mobileFirst: "Design for mobile, enhance for desktop";
                readonly touchPrimary: "Assume touch interactions";
                readonly keyboardSecondary: "Support keyboard when available";
            };
        };
        readonly contextualUsage: {
            readonly walkingUsage: "Design for distracted, one-handed use";
            readonly classroomUsage: "Quick, silent interactions";
            readonly dormUsage: "Full-featured experience";
            readonly libraryUsage: "Focus-friendly, minimal distractions";
        };
    };
};
//# sourceMappingURL=breakpoints.d.ts.map