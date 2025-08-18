import { colors, semantic } from './colors';
export declare function generateCSSCustomProperties(): string;
export declare function generateTailwindColorConfig(): Record<string, string | Record<string, string>>;
export declare function generateUtilityClasses(): string;
export type CSSToken = keyof typeof colors;
export type SemanticCSSToken = keyof typeof semantic;
//# sourceMappingURL=css-generator.d.ts.map