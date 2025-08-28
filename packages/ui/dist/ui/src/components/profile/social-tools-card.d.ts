/**
 * Social Tools Card - Utility + Social Discovery
 * Grid of tools with social context and usage sharing
 */
import '../../styles/social-profile.css';
interface Tool {
    id: string;
    name: string;
    icon: string;
    category: 'academic' | 'productivity' | 'social' | 'finance' | 'health';
    rating: number;
    usageCount?: number;
    socialProof?: {
        friendsUsed: string[];
        totalUsers: number;
        trending?: boolean;
    };
    isCreated?: boolean;
    isNew?: boolean;
    isFavorite?: boolean;
    lastUsed?: string;
    creator?: string;
}
interface SocialToolsCardProps {
    tools: Tool[];
    createdTools?: Tool[];
    totalCreated?: number;
    campusImpact?: number;
    averageRating?: number;
    isBuilder?: boolean;
    onToolClick?: (toolId: string) => void;
    onCreateTool?: () => void;
    onBrowseTools?: () => void;
    onShareTools?: () => void;
    className?: string;
}
export declare function SocialToolsCard({ tools, createdTools, totalCreated, campusImpact, averageRating, isBuilder, onToolClick, onCreateTool, onBrowseTools, onShareTools, className }: SocialToolsCardProps): import("react/jsx-runtime").JSX.Element;
export default SocialToolsCard;
//# sourceMappingURL=social-tools-card.d.ts.map