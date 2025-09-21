import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const hiveModalOverlayVariants = cva("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0");
const hiveModalContentVariants = cva("fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border border-[var(--hive-border-default)] bg-[var(--hive-background-primary)] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg", {
    variants: {
        size: {
            sm: "max-w-sm",
            default: "max-w-lg",
            lg: "max-w-2xl",
            xl: "max-w-4xl",
            full: "max-w-[95vw] max-h-[95vh]",
        },
    },
    defaultVariants: {
        size: "default",
    },
});
const HiveModalContext = React.createContext(null);
function HiveModal({ open = false, onOpenChange, onClose, children, size, className }) {
    const [internalOpen, setInternalOpen] = React.useState(open);
    const isControlled = onOpenChange !== undefined;
    const modalOpen = isControlled ? open : internalOpen;
    const setModalOpen = React.useCallback((newOpen) => {
        if (isControlled) {
            onOpenChange?.(newOpen);
        }
        else {
            setInternalOpen(newOpen);
        }
        // Call onClose when modal is being closed
        if (!newOpen && onClose) {
            onClose();
        }
    }, [isControlled, onOpenChange, onClose]);
    // Handle escape key
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setModalOpen(false);
            }
        };
        if (modalOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [modalOpen, setModalOpen]);
    if (!modalOpen)
        return null;
    return (_jsx(HiveModalContext.Provider, { value: { open: modalOpen, onOpenChange: setModalOpen }, children: _jsxs("div", { className: "fixed inset-0 z-50", children: [_jsx("div", { className: hiveModalOverlayVariants(), onClick: () => setModalOpen(false), "data-state": modalOpen ? "open" : "closed" }), _jsx("div", { className: cn(hiveModalContentVariants({ size }), className), "data-state": modalOpen ? "open" : "closed", onClick: (e) => e.stopPropagation(), children: children })] }) }));
}
function HiveModalHeader({ children, className }) {
    return (_jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), children: children }));
}
function HiveModalTitle({ children, className }) {
    return (_jsx("h3", { className: cn("text-lg font-semibold leading-none tracking-tight text-[var(--hive-text-primary)]", className), children: children }));
}
function HiveModalDescription({ children, className }) {
    return (_jsx("p", { className: cn("text-sm text-[var(--hive-text-secondary)]", className), children: children }));
}
function HiveModalContent({ children, className }) {
    return (_jsx("div", { className: cn("flex-1", className), children: children }));
}
function HiveModalFooter({ children, className }) {
    return (_jsx("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), children: children }));
}
function HiveModalClose({ children, className, asChild }) {
    const context = React.useContext(HiveModalContext);
    if (!context) {
        throw new Error("HiveModalClose must be used within HiveModal");
    }
    const handleClick = () => {
        context.onOpenChange(false);
    };
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onClick: handleClick,
            className: cn(children.props.className, className),
        });
    }
    return (_jsxs("button", { onClick: handleClick, className: cn("absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--hive-interactive-focus)] focus:ring-offset-2 disabled:pointer-events-none", className), children: [children || (_jsx("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", children: _jsx("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }) })), _jsx("span", { className: "sr-only", children: "Close" })] }));
}
export { HiveModal, HiveModalHeader, HiveModalTitle, HiveModalDescription, HiveModalContent, HiveModalFooter, HiveModalClose, hiveModalContentVariants, hiveModalOverlayVariants, };
//# sourceMappingURL=hive-modal.js.map