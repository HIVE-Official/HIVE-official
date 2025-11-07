"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../atoms/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "../atoms/sheet";
import { RailWidget } from "./rail-widget";
export function TodayDrawer({ trigger }) {
    return (_jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: trigger ?? (_jsx(Button, { variant: "secondary", type: "button", children: "Today" })) }), _jsxs(SheetContent, { side: "bottom", className: "h-[70vh] overflow-y-auto", children: [_jsxs(SheetHeader, { children: [_jsx(SheetTitle, { children: "Today" }), _jsx(SheetDescription, { children: "Quick access to now, widgets, and upcoming." })] }), _jsxs("div", { className: "mt-4 space-y-4", children: [_jsx(RailWidget, { variant: "eventNow", title: "Club Meeting", description: "UB Robotics \u2013 North Campus", ctaLabel: "Details" }), _jsx(RailWidget, { variant: "action", title: "Submit RSVP", description: "Tonight at 7pm" }), _jsx(RailWidget, { variant: "progress", title: "Onboarding", progress: 60, ctaLabel: "Resume" })] })] })] }));
}
//# sourceMappingURL=today-drawer.js.map