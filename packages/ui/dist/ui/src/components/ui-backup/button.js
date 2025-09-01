import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Button component - bridge to atomic design system
 * Maps standard button props to HIVE enhanced button variants
 */
import React from 'react';
// Map standard variants to HIVE variants
const mapVariant = (variant) => {
    switch (variant) {
        case 'default': return 'primary';
        case 'secondary': return 'secondary';
        case 'outline': return 'secondary'; // No direct outline in HIVE, use secondary
        case 'ghost': return 'ghost';
        case 'destructive': return 'destructive';
        default: return 'primary';
    }
};
// Map standard sizes to HIVE sizes
const mapSize = (size) => {
    switch (size) {
        case 'xs': return 'xs';
        case 'sm': return 'sm';
        case 'default': return 'default';
        case 'lg': return 'lg';
        default: return 'default';
    }
};
export const Button = React.forwardRef(({ variant, size, ...props }, ref) => {
    return (_jsx(Button, { ref: ref, variant: mapVariant(variant), size: mapSize(size), ...props }));
});
Button.displayName = 'Button';
//# sourceMappingURL=button.js.map