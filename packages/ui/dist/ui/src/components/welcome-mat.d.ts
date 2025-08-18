type WelcomeMatProps = {
    isVisible: boolean;
    onDismiss: () => void;
    userName?: string;
    className?: string;
};
export declare function WelcomeMat({ isVisible, onDismiss, userName, className, }: WelcomeMatProps): import("react/jsx-runtime").JSX.Element;
export declare function useWelcomeMat(): {
    isVisible: boolean;
    dismissWelcomeMat: () => void;
    hasCheckedStorage: boolean;
};
export {};
//# sourceMappingURL=welcome-mat.d.ts.map