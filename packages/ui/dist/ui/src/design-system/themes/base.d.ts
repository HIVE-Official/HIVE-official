/**
 * HIVE Base Theme
 * Core theme foundation for HIVE campus platform
 */
export declare const baseTheme: {
    name: string;
    colors: {
        primary: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        neutral: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        semantic: {
            success: string;
            warning: string;
            error: string;
            info: string;
        };
    };
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
    };
    typography: {
        fontFamily: {
            sans: string;
            heading: string;
            mono: string;
        };
        fontSize: {
            xs: string;
            sm: string;
            base: string;
            lg: string;
            xl: string;
            '2xl': string;
            '3xl': string;
        };
    };
    radius: {
        none: string;
        sm: string;
        md: string;
        lg: string;
        full: string;
    };
    shadows: {
        sm: string;
        md: string;
        lg: string;
        brand: string;
        gold: string;
    };
};
export type BaseTheme = {
    name: string;
    colors: {
        primary: Record<string, string>;
        neutral: Record<string, string>;
        semantic: Record<string, string>;
    };
    typography: {
        fontFamily: Record<string, string>;
        fontSize: Record<string, string>;
    };
    radius: Record<string, string>;
    shadows: Record<string, string>;
};
//# sourceMappingURL=base.d.ts.map