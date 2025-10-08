import * as React from "react";
export interface InlineToolMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Trigger element (usually a button) */
    trigger?: React.ReactNode;
    /** Tool click handler */
    onToolSelect?: (toolId: "poll" | "event" | "task" | "resource") => void;
    /** Position of the menu (desktop vs mobile) */
    position?: "above" | "below";
    /** Whether menu is open */
    open?: boolean;
    /** Open state change handler */
    onOpenChange?: (open: boolean) => void;
}
declare const InlineToolMenu: React.ForwardRefExoticComponent<InlineToolMenuProps & React.RefAttributes<HTMLDivElement>>;
export { InlineToolMenu };
//# sourceMappingURL=inline-tool-menu.d.ts.map