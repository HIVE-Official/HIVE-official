import React from 'react';
interface AlertProps {
    children: React.ReactNode;
    variant?: 'default' | 'destructive';
    className?: string;
}
export declare const Alert: React.FC<AlertProps>;
export declare const AlertTitle: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const AlertDescription: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export {};
//# sourceMappingURL=alert.d.ts.map