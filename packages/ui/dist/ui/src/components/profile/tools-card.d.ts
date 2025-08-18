interface Tool {
    id: string;
    name: string;
    icon?: string;
    description?: string;
    users?: number;
    category?: string;
}
interface ToolsCardProps {
    tools: Tool[];
    className?: string;
}
export declare function ToolsCard({ tools, className }: ToolsCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=tools-card.d.ts.map