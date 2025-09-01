import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
export const LoadingOrchestrator = ({ isLoading = false, children }) => {
    if (isLoading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary" }) }));
    }
    return _jsx(_Fragment, { children: children });
};
//# sourceMappingURL=LoadingOrchestrator.js.map