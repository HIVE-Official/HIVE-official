"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "../atoms/skeleton.js";
export const ProfileViewLoadingSkeleton = () => {
    return (_jsx("div", { className: "min-h-screen bg-black", children: _jsxs("div", { className: "max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Skeleton, { className: "h-10 w-64" }), _jsx(Skeleton, { className: "h-4 w-96" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "space-y-6", children: [_jsx(Skeleton, { className: "h-56 w-full rounded-2xl" }), _jsx(Skeleton, { className: "h-40 w-full rounded-2xl" })] }), _jsxs("div", { className: "space-y-6", children: [_jsx(Skeleton, { className: "h-64 w-full rounded-2xl" }), _jsx(Skeleton, { className: "h-64 w-full rounded-2xl" })] }), _jsxs("div", { className: "space-y-6", children: [_jsx(Skeleton, { className: "h-64 w-full rounded-2xl" }), _jsx(Skeleton, { className: "h-56 w-full rounded-2xl" })] })] }), _jsx("div", { className: "h-20 lg:h-0" })] }) }));
};
export default ProfileViewLoadingSkeleton;
//# sourceMappingURL=profile-view-loading-skeleton.js.map