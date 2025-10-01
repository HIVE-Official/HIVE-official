import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Tool Runtime Executor
 *
 * Tool runtime execution interface
 */
declare const toolruntimeexecutorVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ToolRuntimeExecutorProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toolruntimeexecutorVariants> {
    tool?: any;
    onRun?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ToolRuntimeExecutor: React.ForwardRefExoticComponent<ToolRuntimeExecutorProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=tool-runtime-executor.d.ts.map