import React from 'react';
interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: 'horizontal' | 'vertical';
    spacing?: number | string;
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}
export declare const Stack: React.FC<StackProps>;
export {};
//# sourceMappingURL=Stack.d.ts.map