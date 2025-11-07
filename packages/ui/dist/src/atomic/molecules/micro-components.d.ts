import * as React from "react";
type ChipProps = React.ComponentPropsWithoutRef<"span">;
export interface ChipBaseProps extends ChipProps {
    asChild?: boolean;
    interactive?: boolean;
}
export declare const ChipBase: React.ForwardRefExoticComponent<ChipBaseProps & React.RefAttributes<HTMLSpanElement>>;
export interface DotProps extends React.HTMLAttributes<HTMLSpanElement> {
    pulse?: boolean;
}
export declare function Dot({ className, pulse, ...props }: DotProps): import("react/jsx-runtime").JSX.Element;
export declare function AnimatedNumber({ value }: {
    value: number;
}): import("react/jsx-runtime").JSX.Element;
export interface ExplainabilityChipProps {
    label?: string;
    onClick?: () => void;
}
export declare function ExplainabilityChip({ label, onClick }: ExplainabilityChipProps): import("react/jsx-runtime").JSX.Element;
type ReasonTone = "neutral" | "pro" | "con";
export declare function ReasonChip({ text, tone }: {
    text: string;
    tone?: ReasonTone;
}): import("react/jsx-runtime").JSX.Element;
export declare function ReasonBadgeStack({ reasons, max }: {
    reasons: string[];
    max?: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function TimePill({ label }: {
    label: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function VerificationBadge({ leader, className }: {
    leader?: boolean;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function RoleBadge({ role }: {
    role?: string;
}): import("react/jsx-runtime").JSX.Element;
type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";
export declare function StatusChip({ status, label, }: {
    status?: StatusTone;
    label: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function RSVPChip({ going, onToggle }: {
    going?: boolean;
    onToggle?: () => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function CapacityBar({ value, max }: {
    value?: number;
    max?: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function NowIndicator({ label }: {
    label?: string;
}): import("react/jsx-runtime").JSX.Element;
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;
export declare function CounterChip({ icon: Icon, value, label, }: {
    icon?: IconComponent;
    value?: number;
    label?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function InlineProgress({ value }: {
    value?: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function CharacterCounter({ value, max }: {
    value?: number;
    max?: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function AttachmentChip({ name, size, onRemove, }: {
    name: string;
    size?: string;
    onRemove?: () => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function RSVPStatusSummary({ going, capacity, label, }: {
    going?: number;
    capacity?: number;
    label?: string;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=micro-components.d.ts.map