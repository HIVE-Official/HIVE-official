/**
 * HiveLab Builder Utility Functions
 *
 * Helper functions for canvas calculations, connections, and element management.
 */
// ============================================================================
// Type Compatibility
// ============================================================================
/**
 * Check if two data types are compatible for connections
 */
export function isCompatibleTypes(sourceType, targetType) {
    const sourceTypes = Array.isArray(sourceType) ? sourceType : [sourceType];
    const targetTypes = Array.isArray(targetType) ? targetType : [targetType];
    // 'any' type accepts everything
    if (targetTypes.includes('any'))
        return true;
    if (sourceTypes.includes('any'))
        return true;
    // Check if any source type matches any target type
    return sourceTypes.some(st => targetTypes.includes(st));
}
/**
 * Get primary data type (for display/color)
 */
export function getPrimaryType(type) {
    return Array.isArray(type) ? type[0] : type;
}
// ============================================================================
// Port Calculations
// ============================================================================
/**
 * Get Y offset for a port on an element
 */
export function getPortYOffset(element, port) {
    const ports = port.side === 'input' ? element.inputs : element.outputs;
    const portIndex = ports.findIndex(p => p.id === port.id);
    if (portIndex === -1)
        return element.height / 2;
    const portSpacing = element.height / (ports.length + 1);
    return portSpacing * (portIndex + 1);
}
/**
 * Get absolute position of a port on canvas
 */
export function getPortPosition(element, port) {
    const yOffset = getPortYOffset(element, port);
    return {
        x: port.side === 'input' ? element.x : element.x + element.width,
        y: element.y + yOffset
    };
}
/**
 * Get port by ID from element
 */
export function getPortById(element, portId) {
    return [...element.inputs, ...element.outputs].find(p => p.id === portId);
}
// ============================================================================
// Connection Path Generation
// ============================================================================
/**
 * Generate Bézier curve path for connection
 */
export function generateConnectionPath(sourceElement, sourcePort, targetElement, targetPort) {
    const start = getPortPosition(sourceElement, sourcePort);
    const end = getPortPosition(targetElement, targetPort);
    return generateBezierPath(start, end);
}
/**
 * Generate Bézier curve path from two points
 */
export function generateBezierPath(start, end) {
    const controlOffset = Math.abs(end.x - start.x) * 0.5;
    const cp1x = start.x + controlOffset;
    const cp1y = start.y;
    const cp2x = end.x - controlOffset;
    const cp2y = end.y;
    return `M ${start.x},${start.y} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${end.x},${end.y}`;
}
/**
 * Generate connection path from element to mouse position (while dragging)
 */
export function generateDraftConnectionPath(sourceElement, sourcePort, mousePosition) {
    const start = getPortPosition(sourceElement, sourcePort);
    return generateBezierPath(start, mousePosition);
}
// ============================================================================
// Bounding Box Calculations
// ============================================================================
/**
 * Get bounding box for an element
 */
export function getElementBoundingBox(element) {
    return {
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height
    };
}
/**
 * Check if point is inside bounding box
 */
export function isPointInBox(point, box) {
    return (point.x >= box.x &&
        point.x <= box.x + box.width &&
        point.y >= box.y &&
        point.y <= box.y + box.height);
}
/**
 * Check if two bounding boxes intersect
 */
export function boxesIntersect(box1, box2) {
    return !(box1.x + box1.width < box2.x ||
        box2.x + box2.width < box1.x ||
        box1.y + box1.height < box2.y ||
        box2.y + box2.height < box1.y);
}
/**
 * Get bounding box that contains all elements
 */
export function getBoundingBoxForElements(elements) {
    if (elements.length === 0)
        return null;
    const boxes = elements.map(getElementBoundingBox);
    const minX = Math.min(...boxes.map(b => b.x));
    const minY = Math.min(...boxes.map(b => b.y));
    const maxX = Math.max(...boxes.map(b => b.x + b.width));
    const maxY = Math.max(...boxes.map(b => b.y + b.height));
    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
    };
}
/**
 * Find elements within selection box
 */
export function findElementsInSelectionBox(selectionBox, elements) {
    return elements
        .filter(element => {
        const elementBox = getElementBoundingBox(element);
        return boxesIntersect(selectionBox, elementBox);
    })
        .map(element => element.id);
}
// ============================================================================
// Grid Snapping
// ============================================================================
const GRID_SIZE = 20; // pixels
/**
 * Snap position to grid
 */
export function snapToGrid(position) {
    return {
        x: Math.round(position.x / GRID_SIZE) * GRID_SIZE,
        y: Math.round(position.y / GRID_SIZE) * GRID_SIZE
    };
}
/**
 * Snap value to grid
 */
export function snapValueToGrid(value) {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
}
// ============================================================================
// Viewport Calculations
// ============================================================================
/**
 * Convert screen coordinates to canvas coordinates
 */
export function screenToCanvas(screenPos, viewport) {
    return {
        x: (screenPos.x - viewport.x) / viewport.zoom,
        y: (screenPos.y - viewport.y) / viewport.zoom
    };
}
/**
 * Convert canvas coordinates to screen coordinates
 */
export function canvasToScreen(canvasPos, viewport) {
    return {
        x: canvasPos.x * viewport.zoom + viewport.x,
        y: canvasPos.y * viewport.zoom + viewport.y
    };
}
/**
 * Calculate viewport to fit bounding box
 */
export function calculateViewportToFit(box, containerWidth, containerHeight, padding = 40) {
    // Calculate zoom to fit
    const zoomX = (containerWidth - padding * 2) / box.width;
    const zoomY = (containerHeight - padding * 2) / box.height;
    const zoom = Math.min(zoomX, zoomY, 1); // Max zoom 1x
    // Center the box
    const x = (containerWidth - box.width * zoom) / 2 - box.x * zoom;
    const y = (containerHeight - box.height * zoom) / 2 - box.y * zoom;
    return { x, y, zoom };
}
/**
 * Calculate viewport to show specific page
 */
export function calculateViewportForPage(page, containerWidth, containerHeight) {
    return calculateViewportToFit({ x: page.x, y: page.y, width: page.width, height: page.height }, containerWidth, containerHeight);
}
// ============================================================================
// Element ID Generation
// ============================================================================
/**
 * Generate unique element ID
 */
export function generateElementId(type) {
    return `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
/**
 * Generate unique connection ID
 */
export function generateConnectionId() {
    return `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
/**
 * Generate unique page ID
 */
export function generatePageId() {
    return `page-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
// ============================================================================
// Element Positioning
// ============================================================================
/**
 * Calculate position for new element (offset from existing)
 */
export function calculateNewElementPosition(existingElements, viewport, containerWidth, containerHeight) {
    if (existingElements.length === 0) {
        // First element: center in viewport
        return screenToCanvas({ x: containerWidth / 2, y: containerHeight / 2 }, viewport);
    }
    // Find rightmost element and place new one to the right
    const rightmost = existingElements.reduce((max, el) => {
        return el.x + el.width > max.x + max.width ? el : max;
    }, existingElements[0]);
    return {
        x: rightmost.x + rightmost.width + 50,
        y: rightmost.y
    };
}
/**
 * Calculate drop position for dragged element from library
 */
export function calculateDropPosition(dropScreenPos, viewport, elementWidth, elementHeight, snapToGridEnabled) {
    // Convert to canvas coordinates
    let canvasPos = screenToCanvas(dropScreenPos, viewport);
    // Center element on mouse position
    canvasPos = {
        x: canvasPos.x - elementWidth / 2,
        y: canvasPos.y - elementHeight / 2
    };
    // Snap to grid if enabled
    if (snapToGridEnabled) {
        canvasPos = snapToGrid(canvasPos);
    }
    return canvasPos;
}
// ============================================================================
// Zoom Helpers
// ============================================================================
/**
 * Clamp zoom value to acceptable range
 */
export function clampZoom(zoom) {
    return Math.max(0.1, Math.min(4, zoom));
}
/**
 * Calculate zoom delta for mouse wheel
 */
export function calculateZoomDelta(wheelDelta) {
    return -wheelDelta / 1000;
}
// ============================================================================
// Distance Calculations
// ============================================================================
/**
 * Calculate distance between two points
 */
export function distance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}
/**
 * Check if point is near another point (for port snapping)
 */
export function isNearPoint(p1, p2, threshold = 20) {
    return distance(p1, p2) <= threshold;
}
// ============================================================================
// Copy/Paste Helpers
// ============================================================================
/**
 * Deep clone element with new ID
 */
export function cloneElement(element, offsetX = 20, offsetY = 20) {
    return {
        ...element,
        id: generateElementId(element.type),
        x: element.x + offsetX,
        y: element.y + offsetY,
        inputs: element.inputs.map(port => ({
            ...port,
            id: `${generateElementId(element.type)}-${port.name}`
        })),
        outputs: element.outputs.map(port => ({
            ...port,
            id: `${generateElementId(element.type)}-${port.name}`
        }))
    };
}
// ============================================================================
// Validation
// ============================================================================
/**
 * Validate if element has all required input connections
 */
export function validateElementConnections(element, connections) {
    const connectedInputIds = connections
        .filter(conn => conn.targetElementId === element.id)
        .map(conn => conn.targetPortId);
    const missingInputs = element.inputs.filter(input => input.required && !connectedInputIds.includes(input.id));
    return {
        valid: missingInputs.length === 0,
        missingInputs
    };
}
/**
 * Find circular dependencies in element connections
 */
export function findCircularDependencies(elements, connections) {
    const visited = new Set();
    const recursionStack = new Set();
    const cycles = [];
    function dfs(elementId, path) {
        visited.add(elementId);
        recursionStack.add(elementId);
        path.push(elementId);
        // Find all connections from this element
        const outgoing = connections.filter(c => c.sourceElementId === elementId);
        for (const conn of outgoing) {
            const targetId = conn.targetElementId;
            if (!visited.has(targetId)) {
                dfs(targetId, [...path]);
            }
            else if (recursionStack.has(targetId)) {
                // Found a cycle
                const cycleStartIndex = path.indexOf(targetId);
                cycles.push(path.slice(cycleStartIndex));
            }
        }
        recursionStack.delete(elementId);
    }
    for (const element of elements) {
        if (!visited.has(element.id)) {
            dfs(element.id, []);
        }
    }
    return cycles;
}
//# sourceMappingURL=hivelab-utils.js.map