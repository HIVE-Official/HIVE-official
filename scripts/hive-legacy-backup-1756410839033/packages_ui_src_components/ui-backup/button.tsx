/**
 * Button component - bridge to atomic design system
 * Maps standard button props to HIVE enhanced button variants
 */

import React from 'react';
import { Button as HiveButton, type ButtonProps as HiveButtonProps } from '../../atomic/atoms/button-enhanced';

// Standard button variants that tools expect
type StandardVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type StandardSize = 'xs' | 'sm' | 'default' | 'lg';

export interface ButtonProps extends Omit<HiveButtonProps, 'variant' | 'size'> {
  variant?: StandardVariant;
  size?: StandardSize;
}

// Map standard variants to HIVE variants
const mapVariant = (variant?: StandardVariant): HiveButtonProps['variant'] => {
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
const mapSize = (size?: StandardSize): HiveButtonProps['size'] => {
  switch (size) {
    case 'xs': return 'xs';
    case 'sm': return 'sm';
    case 'default': return 'default';
    case 'lg': return 'lg';
    default: return 'default';
  }
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={mapVariant(variant)}
        size={mapSize(size)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';