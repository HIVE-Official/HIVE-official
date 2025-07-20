import type { ElementConfigSchema } from './types';
export declare const ELEMENT_CONFIG_SCHEMAS: Record<string, ElementConfigSchema>;
export declare function getElementConfigSchema(elementType: string): ElementConfigSchema | null;
export declare function getAllElementConfigSchemas(): ElementConfigSchema[];
