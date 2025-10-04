/**
 * Lottie Auth State Animations
 *
 * Pre-configured Lottie animations for auth flow states
 */
interface LottieAuthProps {
    variant: 'emailSent' | 'verifying' | 'success' | 'error' | 'loading' | 'clock';
    size?: number;
    loop?: boolean;
    autoplay?: boolean;
    className?: string;
}
export declare function LottieAuthAnimation({ variant, size, loop, autoplay, className, }: LottieAuthProps): import("react/jsx-runtime").JSX.Element;
export declare function EmailSentAnimation({ size }: {
    size?: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function VerifyingAnimation({ size }: {
    size?: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function SuccessAnimation({ size }: {
    size?: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function ErrorAnimation({ size }: {
    size?: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function LoadingAnimation({ size }: {
    size?: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function ClockAnimation({ size }: {
    size?: number;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=lottie-auth-states.d.ts.map