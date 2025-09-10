import React from 'react';
interface MobileInputHandlerProps {
    children: React.ReactNode;
    className?: string;
    preventViewportShift?: boolean;
    autoScrollToInput?: boolean;
    onKeyboardShow?: () => void;
    onKeyboardHide?: () => void;
}
export declare function MobileInputHandler({ children, className, preventViewportShift, autoScrollToInput, onKeyboardShow, onKeyboardHide }: MobileInputHandlerProps): import("react/jsx-runtime").JSX.Element;
interface MobileOptimizedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helpText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClear?: () => void;
    showClearButton?: boolean;
}
export declare function MobileOptimizedInput({ label, error, helpText, leftIcon, rightIcon, onClear, showClearButton, className, value, ...props }: MobileOptimizedInputProps): import("react/jsx-runtime").JSX.Element;
interface MobileOptimizedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helpText?: string;
    autoResize?: boolean;
    maxHeight?: number;
}
export declare function MobileOptimizedTextarea({ label, error, helpText, autoResize, maxHeight, className, ...props }: MobileOptimizedTextareaProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=mobile-input-handler.d.ts.map