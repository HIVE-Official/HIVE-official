import React from 'react';
interface ResizablePanelGroupProps {
    direction: 'horizontal' | 'vertical';
    children: React.ReactNode;
    className?: string;
}
interface ResizablePanelProps {
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    children: React.ReactNode;
    className?: string;
}
interface ResizableHandleProps {
    className?: string;
}
export declare const ResizablePanelGroup: React.FC<ResizablePanelGroupProps>;
export declare const ResizablePanel: React.FC<ResizablePanelProps>;
export declare const ResizableHandle: React.FC<ResizableHandleProps>;
export {};
//# sourceMappingURL=resizable.d.ts.map