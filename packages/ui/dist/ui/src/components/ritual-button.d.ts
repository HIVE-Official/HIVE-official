import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const ritualButtonVariants: (props?: ({
    variant?: "ritual" | "celebration" | "energy" | null | undefined;
    size?: "md" | "lg" | "xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface RitualButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ritualButtonVariants> {
    asChild?: boolean;
    loading?: boolean;
}
declare const RitualButton: React.ForwardRefExoticComponent<RitualButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { RitualButton, ritualButtonVariants };
//# sourceMappingURL=ritual-button.d.ts.map