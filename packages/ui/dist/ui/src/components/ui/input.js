import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Input component - bridge to atomic design system
 * Maps standard input props to HIVE enhanced input
 */
import React from 'react';
import { Input as HiveInput } from '../../atomic/atoms/input-enhanced.js';
// Map standard sizes to HIVE sizes  
const mapSize = (size) => {
    switch (size) {
        case 'sm': return 'sm';
        case 'default': return 'default';
        case 'lg': return 'lg';
        default: return 'default';
    }
};
export const Input = React.forwardRef(({ size, ...props }, ref) => {
    return (_jsx(HiveInput, { ref: ref, size: mapSize(size), ...props }));
});
Input.displayName = 'Input';
//# sourceMappingURL=input.js.map