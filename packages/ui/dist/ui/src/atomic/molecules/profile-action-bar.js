"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Button } from "../atoms/button.js";
import { ArrowLeft, Edit, MessageCircle, UserPlus, Share2, Settings, UserMinus } from "lucide-react";
/**
 * Profile Action Bar
 *
 * Context-aware action bar that shows different buttons based on relationship:
 * - Own Profile: Back, Edit, Settings, Share
 * - Connected: Back, Message, Disconnect, Share
 * - Stranger: Back, Connect (primary), Share
 *
 * Design Pattern: Modal-first IA
 * - Actions trigger modals/sheets (not route changes)
 * - Back button preserves navigation context
 * - Primary action is visually prominent
 */
const ProfileActionBar = React.forwardRef(({ className, relationship, userName, userHandle, backLabel = "Back", onBack, onEdit, onMessage, onConnect, onDisconnect, onShare, onSettings, isConnecting = false, isDisconnecting = false, ...props }, ref) => {
    // Default share handler if not provided
    const handleShare = React.useCallback(() => {
        if (onShare) {
            onShare();
        }
        else {
            // Fallback to Web Share API
            if (navigator.share) {
                navigator.share({
                    title: `${userName} on HIVE`,
                    text: `Check out ${userName}'s profile on HIVE`,
                    url: `${window.location.origin}/profile/${userHandle}`,
                }).catch(() => {
                    // User cancelled or share failed
                });
            }
            else {
                // Copy to clipboard fallback
                navigator.clipboard.writeText(`${window.location.origin}/profile/${userHandle}`);
            }
        }
    }, [onShare, userName, userHandle]);
    return (_jsxs("div", { ref: ref, className: cn("flex items-center justify-between gap-3 p-4 bg-background/95 backdrop-blur-sm border-b", className), ...props, children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: onBack, className: "gap-2", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), _jsx("span", { className: "hidden sm:inline", children: backLabel })] }), _jsxs("div", { className: "flex items-center gap-2", children: [relationship === "own" && (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: onEdit, className: "gap-2", children: [_jsx(Edit, { className: "h-4 w-4" }), _jsx("span", { className: "hidden sm:inline", children: "Edit" })] }), onSettings && (_jsx(Button, { variant: "ghost", size: "sm", onClick: onSettings, children: _jsx(Settings, { className: "h-4 w-4" }) })), _jsx(Button, { variant: "ghost", size: "sm", onClick: handleShare, children: _jsx(Share2, { className: "h-4 w-4" }) })] })), relationship === "connected" && (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "default", size: "sm", onClick: onMessage, className: "gap-2", children: [_jsx(MessageCircle, { className: "h-4 w-4" }), _jsx("span", { className: "hidden sm:inline", children: "Message" })] }), onDisconnect && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onDisconnect, disabled: isDisconnecting, className: "gap-2 text-destructive hover:text-destructive", children: [_jsx(UserMinus, { className: "h-4 w-4" }), _jsx("span", { className: "hidden sm:inline", children: isDisconnecting ? "Disconnecting..." : "Disconnect" })] })), _jsx(Button, { variant: "ghost", size: "sm", onClick: handleShare, children: _jsx(Share2, { className: "h-4 w-4" }) })] })), relationship === "stranger" && (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "default", size: "sm", onClick: onConnect, disabled: isConnecting, className: "gap-2", children: [_jsx(UserPlus, { className: "h-4 w-4" }), _jsx("span", { children: isConnecting ? "Connecting..." : "Connect" })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: handleShare, children: _jsx(Share2, { className: "h-4 w-4" }) })] }))] })] }));
});
ProfileActionBar.displayName = "ProfileActionBar";
export { ProfileActionBar };
//# sourceMappingURL=profile-action-bar.js.map