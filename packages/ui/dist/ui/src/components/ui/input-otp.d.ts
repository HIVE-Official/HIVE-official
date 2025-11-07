import * as React from "react";
declare const InputOTP: React.ForwardRefExoticComponent<{
    value: string;
    onChange: (value: string) => void;
    maxLength?: number;
    className?: string;
    containerClassName?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    autoComplete?: string;
    pattern?: string;
    children?: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
declare const InputOTPGroup: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const InputOTPSlot: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    index: number;
} & React.RefAttributes<HTMLDivElement>>;
declare const InputOTPSeparator: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
//# sourceMappingURL=input-otp.d.ts.map