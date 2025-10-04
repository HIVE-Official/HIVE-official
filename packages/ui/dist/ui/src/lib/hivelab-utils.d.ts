/**
 * HiveLab Builder Utility Functions
 *
 * Helper functions for canvas calculations, connections, and element management.
 */
import type { DataType, Element, Port, Position, BoundingBox, Page, Viewport } from '@/types/hivelab.types';
export type { DataType, Element, Port, Position, Connection } from '@/types/hivelab.types';
/**
 * Check if two data types are compatible for connections
 */
export declare function isCompatibleTypes(sourceType: DataType | DataType[], targetType: DataType | DataType[]): boolean;
/**
 * Get primary data type (for display/color)
 */
export declare function getPrimaryType(type: DataType | DataType[]): DataType;
/**
 * Get Y offset for a port on an element
 */
export declare function getPortYOffset(element: Element, port: Port): number;
/**
 * Get absolute position of a port on canvas
 */
export declare function getPortPosition(element: Element, port: Port): Position;
/**
 * Get port by ID from element
 */
export declare function getPortById(element: Element, portId: string): Port | undefined;
/**
 * Generate Bézier curve path for connection
 */
export declare function generateConnectionPath(sourceElement: Element, sourcePort: Port, targetElement: Element, targetPort: Port): string;
/**
 * Generate Bézier curve path from two points
 */
export declare function generateBezierPath(start: Position, end: Position): string;
/**
 * Generate connection path from element to mouse position (while dragging)
 */
export declare function generateDraftConnectionPath(sourceElement: Element, sourcePort: Port, mousePosition: Position): string;
/**
 * Get bounding box for an element
 */
export declare function getElementBoundingBox(element: Element): BoundingBox;
/**
 * Check if point is inside bounding box
 */
export declare function isPointInBox(point: Position, box: BoundingBox): boolean;
/**
 * Check if two bounding boxes intersect
 */
export declare function boxesIntersect(box1: BoundingBox, box2: BoundingBox): boolean;
/**
 * Get bounding box that contains all elements
 */
export declare function getBoundingBoxForElements(elements: Element[]): BoundingBox | null;
/**
 * Find elements within selection box
 */
export declare function findElementsInSelectionBox(selectionBox: BoundingBox, elements: Element[]): string[];
/**
 * Snap position to grid
 */
export declare function snapToGrid(position: Position): Position;
/**
 * Snap value to grid
 */
export declare function snapValueToGrid(value: number): number;
/**
 * Convert screen coordinates to canvas coordinates
 */
export declare function screenToCanvas(screenPos: Position, viewport: Viewport): Position;
/**
 * Convert canvas coordinates to screen coordinates
 */
export declare function canvasToScreen(canvasPos: Position, viewport: Viewport): Position;
/**
 * Calculate viewport to fit bounding box
 */
export declare function calculateViewportToFit(box: BoundingBox, containerWidth: number, containerHeight: number, padding?: number): Viewport;
/**
 * Calculate viewport to show specific page
 */
export declare function calculateViewportForPage(page: Page, containerWidth: number, containerHeight: number): Viewport;
/**
 * Generate unique element ID
 */
export declare function generateElementId(type: string): string;
/**
 * Generate unique connection ID
 */
export declare function generateConnectionId(): string;
/**
 * Generate unique page ID
 */
export declare function generatePageId(): string;
/**
 * Calculate position for new element (offset from existing)
 */
export declare function calculateNewElementPosition(existingElements: Element[], viewport: Viewport, containerWidth: number, containerHeight: number): Position;
/**
 * Calculate drop position for dragged element from library
 */
export declare function calculateDropPosition(dropScreenPos: Position, viewport: Viewport, elementWidth: number, elementHeight: number, snapToGridEnabled: boolean): Position;
/**
 * Clamp zoom value to acceptable range
 */
export declare function clampZoom(zoom: number): number;
/**
 * Calculate zoom delta for mouse wheel
 */
export declare function calculateZoomDelta(wheelDelta: number): number;
/**
 * Calculate distance between two points
 */
export declare function distance(p1: Position, p2: Position): number;
/**
 * Check if point is near another point (for port snapping)
 */
export declare function isNearPoint(p1: Position, p2: Position, threshold?: number): boolean;
/**
 * Deep clone element with new ID
 */
export declare function cloneElement(element: Element, offsetX?: number, offsetY?: number): Element;
/**
 * Validate if element has all required input connections
 */
export declare function validateElementConnections(element: Element, connections: {
    sourcePortId: string;
    targetPortId: string;
    targetElementId: string;
}[]): {
    valid: boolean;
    missingInputs: Port[];
};
/**
 * Find circular dependencies in element connections
 */
export declare function findCircularDependencies(elements: Element[], connections: {
    sourceElementId: string;
    targetElementId: string;
}[]): string[][];
//# sourceMappingURL=hivelab-utils.d.ts.map