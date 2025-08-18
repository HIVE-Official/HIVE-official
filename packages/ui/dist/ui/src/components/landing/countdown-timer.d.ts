import React from 'react';
interface CountdownTimerProps {
    targetDate: Date;
    onComplete?: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'accent' | 'minimal';
}
export declare const CountdownTimer: React.FC<CountdownTimerProps>;
export {};
//# sourceMappingURL=countdown-timer.d.ts.map