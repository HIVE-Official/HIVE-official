interface WelcomeMatProps {
    /** Whether to show the welcome mat */
    isVisible: boolean;
    /** Callback when the welcome mat is dismissed */
    onDismiss: () => void;
    /** User's name for personalization */
    userName?: string;
    /** Custom className for styling */
    className?: string;
}
export declare const WelcomeMat: ({ isVisible, onDismiss, userName, className, }: WelcomeMatProps) => import("react/jsx-runtime").JSX.Element;
export declare const useWelcomeMat: () => {
    isVisible: boolean;
    dismissWelcomeMat: () => void;
    hasCheckedStorage: boolean;
};
export {};
//# sourceMappingURL=welcome-mat.d.ts.map