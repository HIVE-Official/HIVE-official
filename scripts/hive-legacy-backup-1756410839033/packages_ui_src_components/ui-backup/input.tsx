/**
 * Input component - bridge to atomic design system
 * Maps standard input props to HIVE enhanced input
 */

import React from 'react';
import { Input as HiveInput, type InputProps as HiveInputProps } from '../../atomic/atoms/input-enhanced';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'default' | 'lg';
}

// Map standard sizes to HIVE sizes  
const mapSize = (size?: 'sm' | 'default' | 'lg'): HiveInputProps['size'] => {
  switch (size) {
    case 'sm': return 'sm';
    case 'default': return 'default';
    case 'lg': return 'lg';
    default: return 'default';
  }
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        size={mapSize(size)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';