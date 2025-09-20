interface ToolMarketplaceProps {
    spaceId?: string;
    userId: string;
    onInstallTool?: (toolId: string, spaceId?: string) => Promise<void>;
    onViewTool?: (toolId: string) => void;
    className?: string;
}
export declare function ToolMarketplace({ spaceId, userId, onInstallTool, onViewTool, className }: ToolMarketplaceProps): void;
export default ToolMarketplace;
//# sourceMappingURL=tool-marketplace.d.ts.map