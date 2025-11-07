import * as React from "react";
export interface WelcomeMatProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Optional callback fired when the welcome mat is dismissed.
     * If not provided the underlying welcome mat hook will close the flow.
     */
    onDismiss?: () => void;
    /**
     * Optional user name to personalize copy.
     */
    userName?: string;
}
export declare const WelcomeMat: React.ForwardRefExoticComponent<WelcomeMatProps & React.RefAttributes<HTMLDivElement>>;
export default WelcomeMat;
//# sourceMappingURL=welcome-mat.d.ts.map