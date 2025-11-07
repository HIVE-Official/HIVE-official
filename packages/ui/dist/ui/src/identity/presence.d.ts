import * as React from "react";
import type { PresenceStatus } from "@hive/core";
import { type VariantProps } from "class-variance-authority";
declare const presenceVariants: (props?: {
    size?: "sm" | "md" | "lg";
    tone?: "inverse" | "neutral";
    emphasis?: boolean;
} & import("class-variance-authority/types").ClassProp) => string;
type PresenceVariantProps = VariantProps<typeof presenceVariants>;
export interface PresenceDotProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">, PresenceVariantProps {
    status?: PresenceStatus;
    lastActiveAt?: Date;
    showLabel?: boolean;
    label?: React.ReactNode;
}
export declare const PresenceDot: React.ForwardRefExoticComponent<PresenceDotProps & React.RefAttributes<HTMLSpanElement>>;
export { presenceVariants };
export type { PresenceStatus };
//# sourceMappingURL=presence.d.ts.map