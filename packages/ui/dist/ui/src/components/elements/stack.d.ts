import React from 'react';
import type { StackConfigSchema } from '@hive/core';
import { z } from 'zod';
type StackConfig = z.infer<typeof StackConfigSchema>;
interface StackProps {
    config: StackConfig;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Stack: React.FC<StackProps>;
interface StackItemProps {
    children: React.ReactNode;
    grow?: boolean;
    shrink?: boolean;
    basis?: string | number;
    align?: 'start' | 'center' | 'end' | 'stretch';
    className?: string;
    style?: React.CSSProperties;
}
export declare const StackItem: React.FC<StackItemProps>;
export default Stack;
//# sourceMappingURL=stack.d.ts.map