import { AnimatePresence, type MotionProps } from "framer-motion";
import type * as React from "react";
type MotionComponent<E extends Element, P> = React.ForwardRefExoticComponent<MotionProps & P & React.RefAttributes<E>>;
export declare const MotionDiv: MotionComponent<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>;
export declare const MotionSpan: MotionComponent<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>;
export declare const MotionButton: MotionComponent<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>;
export declare const MotionLink: MotionComponent<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>;
export declare const MotionNav: MotionComponent<HTMLElement, React.HTMLAttributes<HTMLElement>>;
export declare const MotionAside: MotionComponent<HTMLElement, React.HTMLAttributes<HTMLElement>>;
export { AnimatePresence };
//# sourceMappingURL=motion-safe.d.ts.map