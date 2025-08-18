"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useCallback, useState, useMemo } from 'react';
import { Toast } from './toast';
const ToastContext = createContext(null);
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        message: '',
        isVisible: false,
    });
    const hideToast = useCallback(() => {
        setToast(prev => ({ ...prev, isVisible: false }));
    }, []);
    const showToast = useCallback((message, options) => {
        setToast({
            message,
            isVisible: true,
            options,
        });
    }, []);
    const value = useMemo(() => ({
        showToast,
        hideToast,
    }), [showToast, hideToast]);
    return (_jsxs(ToastContext.Provider, { value: value, children: [children, _jsx(Toast, { message: toast.message, isVisible: toast.isVisible, onClose: hideToast, ...toast.options })] }));
};
//# sourceMappingURL=toast-provider.js.map