/**
 * HiveLab Element Library
 *
 * Complete library of 48 v1 elements organized by category.
 * These are the building blocks for creating custom tools.
 */
import type { ElementDefinition, ElementCategory } from '../types/hivelab.types';
export declare const TRIGGER_ELEMENTS: ElementDefinition[];
export declare const COLLECTOR_ELEMENTS: ElementDefinition[];
export declare const TRANSFORMER_ELEMENTS: ElementDefinition[];
export declare const ROUTER_ELEMENTS: ElementDefinition[];
export declare const STORAGE_ELEMENTS: ElementDefinition[];
export declare const DISPLAY_ELEMENTS: ElementDefinition[];
export declare const ACTION_ELEMENTS: ElementDefinition[];
export declare const CONNECTOR_ELEMENTS: ElementDefinition[];
/**
 * Complete element library (48 total)
 */
export declare const ELEMENT_LIBRARY: ElementDefinition[];
/**
 * Get all elements (48 total)
 */
export declare function getAllElements(): ElementDefinition[];
/**
 * Get elements by category
 */
export declare function getElementsByCategory(category: ElementCategory): ElementDefinition[];
/**
 * Get element by ID
 */
export declare function getElementDefinition(id: string): ElementDefinition | undefined;
//# sourceMappingURL=hivelab-element-library.d.ts.map