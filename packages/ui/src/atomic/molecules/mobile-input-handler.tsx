'use client';

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

// Mobile-optimized input handling to prevent keyboard issues
interface MobileInputHandlerProps {
  children: React.ReactNode;
  className?: string;
  preventViewportShift?: boolean;
  autoScrollToInput?: boolean;
  onKeyboardShow?: () => void;
  onKeyboardHide?: () => void;
}

export function MobileInputHandler({
  children,
  className,
  preventViewportShift = true,
  autoScrollToInput = true,
  onKeyboardShow,
  onKeyboardHide
}: MobileInputHandlerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [initialViewportHeight, setInitialViewportHeight] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setInitialViewportHeight(window.innerHeight);

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDifference = initialViewportHeight - currentHeight;
      
      // Keyboard is likely visible if viewport shrunk by more than 150px
      const keyboardVisible = heightDifference > 150;
      
      if (keyboardVisible !== isKeyboardVisible) {
        setIsKeyboardVisible(keyboardVisible);
        
        if (keyboardVisible) {
          onKeyboardShow?.();
          
          // Auto-scroll to focused input
          if (autoScrollToInput) {
            setTimeout(() => {
              const focusedElement = document.activeElement as HTMLElement;
              if (focusedElement && (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA')) {
                focusedElement.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'center' 
                });
              }
            }, 300);
          }
        } else {
          onKeyboardHide?.();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Also listen for visual viewport changes (better for modern browsers)
    if ('visualViewport' in window && window.visualViewport) {
      const visualViewport = window.visualViewport;
      visualViewport.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        visualViewport.removeEventListener('resize', handleResize);
      };
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [initialViewportHeight, isKeyboardVisible, autoScrollToInput, onKeyboardShow, onKeyboardHide]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative',
        preventViewportShift && isKeyboardVisible && 'pb-safe-area-inset-bottom',
        className
      )}
      style={{
        // Prevent zoom on input focus (iOS Safari)
        fontSize: '16px'
      }}
    >
      {children}
      
      {/* Keyboard spacer */}
      {isKeyboardVisible && preventViewportShift && (
        <div className="h-64" aria-hidden="true" />
      )}
    </div>
  );
}

// Enhanced input component with mobile optimizations
interface MobileOptimizedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
  showClearButton?: boolean;
}

export function MobileOptimizedInput({
  label,
  error,
  helpText,
  leftIcon,
  rightIcon,
  onClear,
  showClearButton = false,
  className,
  value,
  ...props
}: MobileOptimizedInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
    
    // Prevent zoom on iOS
    if (inputRef.current) {
      inputRef.current.style.fontSize = '16px';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    onClear?.();
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={inputRef}
          className={cn(
            'w-full px-4 py-3 text-base border border-gray-300 rounded-lg',
            'focus:ring-2 focus:ring-hive-primary focus:border-transparent',
            'transition-colors duration-200',
            'min-h-[44px]', // Ensure minimum touch target
            leftIcon && 'pl-10',
            (rightIcon || showClearButton) && 'pr-10',
            error && 'border-red-500 focus:ring-red-500',
            isFocused && 'ring-2 ring-hive-primary border-transparent',
            className
          )}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          // Prevent zoom on iOS
          style={{ fontSize: '16px' }}
          // Better mobile keyboard
          autoCapitalize={props.type === 'email' ? 'none' : 'sentences'}
          autoCorrect={props.type === 'email' || props.type === 'password' ? 'off' : 'on'}
          spellCheck={props.type === 'email' || props.type === 'password' ? false : true}
          {...props}
        />
        
        {(rightIcon || (showClearButton && value)) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {showClearButton && value && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                aria-label="Clear input"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            {rightIcon && !showClearButton && rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
}

// Mobile-optimized textarea
interface MobileOptimizedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  autoResize?: boolean;
  maxHeight?: number;
}

export function MobileOptimizedTextarea({
  label,
  error,
  helpText,
  autoResize = false,
  maxHeight = 200,
  className,
  ...props
}: MobileOptimizedTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const scrollHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [props.value, autoResize, maxHeight]);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <textarea
        ref={textareaRef}
        className={cn(
          'w-full px-4 py-3 text-base border border-gray-300 rounded-lg',
          'focus:ring-2 focus:ring-hive-primary focus:border-transparent',
          'transition-colors duration-200 resize-none',
          error && 'border-red-500 focus:ring-red-500',
          isFocused && 'ring-2 ring-hive-primary border-transparent',
          className
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ 
          fontSize: '16px', // Prevent zoom on iOS
          minHeight: '44px' // Minimum touch target
        }}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
}