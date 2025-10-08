/**
 * Port Component
 *
 * Connection point on an element (input or output).
 * Handles hover states, connection creation, and type compatibility indication.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../../lib/utils.js';
import { DATA_TYPE_COLORS } from '../../../types/hivelab.types.js';
export function Port({ port, isHovered = false, isCompatible = false, isConnected = false, isConnecting = false, onMouseDown, onClick, onMouseEnter, onMouseLeave, className, showLabel = false, }) {
    // Get primary data type for color
    const primaryType = Array.isArray(port.type) ? port.type[0] : port.type;
    const color = DATA_TYPE_COLORS[primaryType];
    // Port size based on state
    const baseSize = 12;
    const hoverSize = 16;
    const size = isHovered || isConnecting ? hoverSize : baseSize;
    return (_jsxs("div", { className: cn('flex items-center gap-2', port.side === 'input' ? 'flex-row' : 'flex-row-reverse', className), children: [_jsxs("button", { type: "button", className: cn('relative rounded-full border-2 transition-all duration-200', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', 'cursor-pointer', isHovered && 'scale-110', isCompatible && 'scale-125 animate-pulse', !isCompatible && isConnecting && 'opacity-30 cursor-not-allowed'), style: {
                    width: size,
                    height: size,
                    backgroundColor: isConnected ? color : 'transparent',
                    borderColor: color,
                }, onMouseDown: onMouseDown, onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, title: `${port.name} (${port.side === 'input' ? 'Input' : 'Output'}): ${primaryType}${port.required ? ' - Required' : ''}`, children: [!isConnected && (_jsx("div", { className: "absolute inset-0 m-auto rounded-full transition-all", style: {
                            width: size / 3,
                            height: size / 3,
                            backgroundColor: color,
                            opacity: isHovered ? 1 : 0.5,
                        } })), isCompatible && (_jsx("div", { className: "absolute inset-0 rounded-full blur-sm", style: {
                            backgroundColor: color,
                            opacity: 0.6,
                            transform: 'scale(1.5)',
                        } }))] }), showLabel && (_jsxs("span", { className: cn('text-xs font-medium transition-opacity', isHovered ? 'opacity-100' : 'opacity-70', port.side === 'input' ? 'text-left' : 'text-right'), children: [port.name, port.required && _jsx("span", { className: "text-destructive ml-0.5", children: "*" })] }))] }));
}
Port.displayName = 'Port';
//# sourceMappingURL=port.js.map