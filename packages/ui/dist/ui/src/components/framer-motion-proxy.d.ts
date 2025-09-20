import React from "react";
export declare const motion: {
    div: (props: any) => import("react/jsx-runtime").JSX.Element;
    button: (props: any) => import("react/jsx-runtime").JSX.Element;
    span: (props: any) => import("react/jsx-runtime").JSX.Element;
    section: (props: any) => import("react/jsx-runtime").JSX.Element;
    nav: (props: any) => import("react/jsx-runtime").JSX.Element;
    a: (props: any) => import("react/jsx-runtime").JSX.Element;
    h1: (props: any) => import("react/jsx-runtime").JSX.Element;
    h2: (props: any) => import("react/jsx-runtime").JSX.Element;
    h3: (props: any) => import("react/jsx-runtime").JSX.Element;
    h4: (props: any) => import("react/jsx-runtime").JSX.Element;
    p: (props: any) => import("react/jsx-runtime").JSX.Element;
    header: (props: any) => import("react/jsx-runtime").JSX.Element;
};
export declare const AnimatePresence: React.FC<{
    children: React.ReactNode;
    mode?: string;
    initial?: boolean;
    exitBeforeEnter?: boolean;
    onExitComplete?: () => void;
}>;
export declare const MotionDiv: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const MotionButton: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const useAnimation: () => {
    start: () => Promise<void>;
    stop: () => void;
    set: () => void;
    subscribe: () => () => void;
    mount: () => () => void;
};
export declare const useMotionValue: (initialValue: any) => {
    get: () => any;
    set: (value: any) => void;
    onChange: (callback: any) => () => void;
};
export declare const useTransform: (motionValue: any, input?: any, output?: any) => {
    get: () => any;
    set: (value: any) => void;
    onChange: (callback: any) => () => void;
};
export declare const MotionSpan: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const MotionSection: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const Reorder: {
    Group: ({ children, ...props }: any) => import("react/jsx-runtime").JSX.Element;
    Item: ({ children, ...props }: any) => import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=framer-motion-proxy.d.ts.map