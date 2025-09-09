/**
 * Element Registry - Central registry for all HIVE elements
 */
import { Element, ElementType, ElementCategory } from './tool';
/**
 * Built-in HIVE Elements Library
 */
export declare const HIVE_ELEMENTS: Element[];
/**
 * Element Registry Class
 */
export declare class ElementRegistry {
    private static instance;
    private elements;
    private constructor();
    static getInstance(): ElementRegistry;
    private registerBuiltInElements;
    registerElement(element: Element): void;
    getElement(id: string): Element | undefined;
    getElementsByCategory(category: ElementCategory): Element[];
    getElementsByType(type: ElementType): Element[];
    searchElements(query: string): Element[];
    getAllElements(): Element[];
    getCategories(): ElementCategory[];
    canConnect(fromElement: string, fromPort: string, toElement: string, toPort: string): boolean;
    private areTypesCompatible;
}
//# sourceMappingURL=element-registry.d.ts.map