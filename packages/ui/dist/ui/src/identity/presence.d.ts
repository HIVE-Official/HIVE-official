import * as React from "react";
import { type VariantProps } from "class-variance-authority";
export type PresenceStatus = "online" | "away" | "offline" | "ghost";
export declare const presenceVariants: (props?: {
    status?: "online" | "away" | "offline" | "ghost";
    size?: "sm" | "md" | "lg";
} & import("class-variance-authority/types").ClassProp) => string;
export interface PresenceDotProps extends VariantProps<typeof presenceVariants> {
    className?: string;
}
export declare const PresenceDot: React.FC<PresenceDotProps>;
//# sourceMappingURL=presence.d.ts.map