import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
export const Avatar = ({ children, className }) => {
    return (_jsx("div", { className: cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className), children: children }));
};
export const AvatarImage = ({ src, alt, className }) => {
    if (!src)
        return null;
    return (_jsx("img", { src: src, alt: alt, className: cn('aspect-square h-full w-full', className) }));
};
export const AvatarFallback = ({ children, className }) => {
    return (_jsx("div", { className: cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className), children: children }));
};
//# sourceMappingURL=avatar.js.map