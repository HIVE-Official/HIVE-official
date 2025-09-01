import React from 'react';
export interface UBSpaceTemplate {
    id: string;
    name: string;
    category: 'residential' | 'academic' | 'social' | 'athletic' | 'cultural';
    description: string;
    expectedMembers: number;
    icon: React.ComponentType<any>;
    isActive: boolean;
    activationRequest?: {
        requesterName: string;
        requesterEmail: string;
        dateRequested: string;
        leadershipExperience: string;
    };
}
export declare const UB_SPACE_TEMPLATES: UBSpaceTemplate[];
interface UBSpaceTemplateCardProps {
    space: UBSpaceTemplate;
    onRequestActivation?: (spaceId: string) => void;
    onViewDetails?: (spaceId: string) => void;
    className?: string;
}
export declare function UBSpaceTemplateCard({ space, onRequestActivation, onViewDetails, className }: UBSpaceTemplateCardProps): import("react/jsx-runtime").JSX.Element;
interface UBSpacesDirectoryProps {
    spaces?: UBSpaceTemplate[];
    onRequestActivation?: (spaceId: string) => void;
    onViewDetails?: (spaceId: string) => void;
    filterCategory?: string;
    className?: string;
}
export declare function UBSpacesDirectory({ spaces, onRequestActivation, onViewDetails, filterCategory, className }: UBSpacesDirectoryProps): import("react/jsx-runtime").JSX.Element;
interface SpaceActivationModalProps {
    spaceId: string;
    spaceName: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ActivationRequestData) => void;
}
export interface ActivationRequestData {
    leadershipExperience: string;
    communityVision: string;
    commitmentLevel: string;
    contactInfo: string;
}
export declare function SpaceActivationModal({ spaceId, spaceName, isOpen, onClose, onSubmit }: SpaceActivationModalProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=ub-space-templates.d.ts.map