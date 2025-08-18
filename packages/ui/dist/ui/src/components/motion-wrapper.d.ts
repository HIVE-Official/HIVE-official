import React, { type CSSProperties } from "react";
export declare function MotionProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
interface MotionWrapperProps {
    children?: React.ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    [key: string]: any;
}
export declare const MotionDiv: React.ForwardRefExoticComponent<Omit<MotionWrapperProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface MotionSpanWrapperProps {
    children?: React.ReactNode;
    className?: string;
    style?: CSSProperties;
    [key: string]: any;
}
interface MotionButtonWrapperProps {
    children?: React.ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    [key: string]: any;
}
export declare const MotionSpan: React.ForwardRefExoticComponent<Omit<MotionSpanWrapperProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;
export declare const MotionButton: React.ForwardRefExoticComponent<Omit<MotionButtonWrapperProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=motion-wrapper.d.ts.map