import * as React from "react";
export interface NowCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
    when?: string;
    where?: string;
    ctaLabel?: string;
    onCta?: () => void;
}
export declare function NowCard({ title, subtitle, when, where, ctaLabel, onCta, className, ...props }: NowCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=now-card.d.ts.map