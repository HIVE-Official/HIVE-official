export type CountdownParts = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
};
export declare function useCountdown(target: number): CountdownParts;
export declare function Countdown({ target, className, label, }: {
    target: number;
    className?: string;
    label?: [string, string, string, string];
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=countdown.d.ts.map