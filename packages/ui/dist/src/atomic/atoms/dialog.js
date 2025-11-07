import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { HiveModal, HiveModalHeader, HiveModalTitle, HiveModalDescription, HiveModalContent, HiveModalFooter } from './hive-modal';
// Dialog is just an alias for HiveModal
export const Dialog = HiveModal;
// DialogContent wraps the entire modal content
export const DialogContent = ({ children, className }) => {
    const props = {};
    if (className !== undefined)
        props.className = className;
    return _jsx(HiveModalContent, { ...props, children: children });
};
// DialogHeader maps to HiveModalHeader
export const DialogHeader = HiveModalHeader;
// DialogTitle maps to HiveModalTitle
export const DialogTitle = HiveModalTitle;
// DialogDescription maps to HiveModalDescription
export const DialogDescription = HiveModalDescription;
// DialogFooter maps to HiveModalFooter
export const DialogFooter = HiveModalFooter;
// DialogTrigger is a button that opens the dialog
export const DialogTrigger = ({ children, asChild: _asChild, ..._props }) => {
    // In a real implementation, this would integrate with Dialog state
    // For now, it's just a passthrough
    return _jsx(_Fragment, { children: children });
};
//# sourceMappingURL=dialog.js.map