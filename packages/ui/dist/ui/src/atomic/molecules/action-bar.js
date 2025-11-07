import { jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../atoms/button.js';
export function ActionBar({ onLike, onComment, onShare, counts }) {
    return (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsxs(Button, { size: "sm", variant: "secondary", onClick: onLike, "aria-label": "Like", children: ["\uD83D\uDC4D ", counts?.likes ?? ''] }), _jsxs(Button, { size: "sm", variant: "secondary", onClick: onComment, "aria-label": "Comment", children: ["\uD83D\uDCAC ", counts?.comments ?? ''] }), _jsxs(Button, { size: "sm", variant: "secondary", onClick: onShare, "aria-label": "Share", children: ["\u2197 ", counts?.shares ?? ''] })] }));
}
//# sourceMappingURL=action-bar.js.map